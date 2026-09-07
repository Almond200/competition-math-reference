// Semantic search channel: a static word -> vector table plus one vector per card
// section, both built offline by tools/build-search-index.py.
//
// This exists because no lexical ranker can connect "the triangle formed by
// connecting the midpoints" to a card whose text says "joining the side
// midpoints". Embeddings can. A real sentence transformer would cost 20-30 MB
// and a cold start in the browser; distilled static vectors give most of the
// benefit as a table lookup and a weighted mean.
//
// The card vectors and the query MUST come from the same table or the cosine is
// meaningless, so the query encoder here is deliberately the same lookup-and-mean
// used at build time, including the SIF weighting and principal-component removal.
//
// Everything is lazy: nothing is fetched until the first search, and until the
// data lands `rank()` returns null so the caller simply stays lexical-only.
window.MathSemantic = (function () {
  "use strict";

  var state = "idle";          // idle | loading | ready | failed
  var H = null;                // header (vocab, scales, principal component)
  var WORD = null;             // Int8Array, vocab x dims
  var CARD = null;             // Int8Array, (cards * perCard) x dims
  var index = null;            // word -> row
  var weight = null;           // word -> SIF weight
  var waiting = [];

  var BASE = "js/data/search-vectors";

  function begin(onReady) {
    if (state === "ready") { if (onReady) onReady(true); return; }
    if (onReady) waiting.push(onReady);
    if (state === "loading" || state === "failed") {
      if (state === "failed") flush(false);
      return;
    }
    state = "loading";
    Promise.all([
      fetch(BASE + ".json").then(function (r) { if (!r.ok) throw 0; return r.json(); }),
      fetch(BASE + ".bin").then(function (r) { if (!r.ok) throw 0; return r.arrayBuffer(); })
    ]).then(function (res) {
      H = res[0];
      var buf = res[1], d = H.dims;
      var nW = H.words.length, nC = H.ids.length * H.vectorsPerCard;
      if (buf.byteLength < (nW + nC) * d) throw new Error("vector file truncated");
      WORD = new Int8Array(buf, 0, nW * d);
      CARD = new Int8Array(buf, nW * d, nC * d);
      index = new Map();
      for (var i = 0; i < nW; i++) index.set(H.words[i], i);
      // SIF weights, recomputed here so the query is weighted exactly as the
      // cards were: a / (a + p(word)).
      weight = new Map();
      var a = H.sifA || 1e-3, total = H.totalTokens || 1;
      for (var j = 0; j < nW; j++) {
        var w = H.words[j];
        weight.set(w, a / (a + (H.wordFreq[w] || 0) / total));
      }
      state = "ready";
      flush(true);
    })["catch"](function () {
      // No index built yet, or it failed to load: stay lexical-only forever.
      state = "failed";
      flush(false);
    });
  }

  function flush(ok) {
    var q = waiting; waiting = [];
    for (var i = 0; i < q.length; i++) { try { q[i](ok); } catch (e) {} }
  }

  function rowDot(arr, row, vec, d, scale) {
    var off = row * d, s = 0;
    for (var i = 0; i < d; i++) s += arr[off + i] * vec[i];
    return s * scale / 127;
  }

  // Encode a query with the same recipe the cards used: SIF-weighted mean of the
  // word vectors, minus the shared principal component, normalized. Tokens absent
  // from the table are skipped — those are still handled by the lexical channel.
  function encode(tokens) {
    if (state !== "ready") return null;
    var d = H.dims, v = new Float32Array(d), n = 0;
    for (var i = 0; i < tokens.length; i++) {
      var row = index.get(tokens[i]);
      if (row === undefined) continue;
      var wgt = weight.get(tokens[i]) || 1, sc = H.wordScales[row] / 127;
      var off = row * d;
      for (var k = 0; k < d; k++) v[k] += wgt * WORD[off + k] * sc;
      n++;
    }
    if (!n) return null;
    for (var k2 = 0; k2 < d; k2++) v[k2] /= n;
    if (H.pc && H.pc.length === d) {          // remove the first principal component
      var proj = 0;
      for (var p = 0; p < d; p++) proj += v[p] * H.pc[p];
      for (var p2 = 0; p2 < d; p2++) v[p2] -= proj * H.pc[p2];
    }
    var norm = 0;
    for (var m = 0; m < d; m++) norm += v[m] * v[m];
    norm = Math.sqrt(norm);
    if (!norm) return null;
    for (var m2 = 0; m2 < d; m2++) v[m2] /= norm;
    return v;
  }

  // -> [{ id, score }] sorted best-first, or null when the index is not loaded.
  // A card scores as its BEST section: a name, a one-line description and a long
  // essay are different kinds of text, and averaging them into one vector washes
  // out whichever one the query actually resembles.
  function rank(tokens, limit) {
    var v = encode(tokens);
    if (!v) return null;
    var d = H.dims, per = H.vectorsPerCard, out = [];
    for (var c = 0; c < H.ids.length; c++) {
      var best = -2;
      for (var s = 0; s < per; s++) {
        var row = c * per + s;
        var sim = rowDot(CARD, row, v, d, H.cardScales[row]);
        if (sim > best) best = sim;
      }
      if (best > 0.12) out.push({ id: H.ids[c], score: best });
    }
    out.sort(function (a, b) { return b.score - a.score; });
    return limit ? out.slice(0, limit) : out;
  }

  return {
    load: begin,
    rank: rank,
    ready: function () { return state === "ready"; },
    status: function () { return state; },
    info: function () {
      return state === "ready"
        ? { dims: H.dims, words: H.words.length, cards: H.ids.length,
            perCard: H.vectorsPerCard, backend: H.backend }
        : { state: state };
    }
  };
})();
