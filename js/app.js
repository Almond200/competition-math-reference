// Competition Math Reference — navigation, rendering, tag-based search, filters, sorting.
(function () {
  const SECTIONS = window.MATH_SECTIONS || [];
  const LEVELS = ["MATHCOUNTS", "AMC10", "AMC12", "AIME", "Olympiad"];
  const LEVEL_LABELS = {
    MATHCOUNTS: "MATHCOUNTS",
    AMC10: "AMC 10",
    AMC12: "AMC 12",
    AIME: "AIME",
    Olympiad: "Olympiad"
  };

  // Query-token synonyms expanded before matching against tags.
  const SYNONYMS = {
    pie: ["inclusion", "exclusion"],
    gcf: ["gcd"],
    hcf: ["gcd"],
    mod: ["modular", "modulus", "remainder"],
    prob: ["probability"],
    perm: ["permutation"],
    combo: ["combination"],
    ev: ["expected", "value"],
    quad: ["quadratic", "quadrilateral"],
    tri: ["triangle"],
    ineq: ["inequality"],
    seq: ["sequence"],
    nt: ["number", "theory"],
    circ: ["circle", "circumradius"],
    // words people type vs. words the entries use
    height: ["altitude"],
    altitude: ["height"],
    mean: ["average"],
    average: ["mean"],
    avg: ["average", "mean"],
    middle: ["midpoint", "median"],
    center: ["centroid", "circumcenter", "incenter"],
    corner: ["vertex"],
    edge: ["side"],
    leg: ["side", "right"],
    count: ["number", "counting"],
    number: ["count"],
    way: ["count", "choose", "arrangements"],
    choose: ["combination", "binomial"],
    pick: ["choose", "combination"],
    arrange: ["permutation", "arrangement"],
    remainder: ["mod", "modular"],
    divisible: ["divides", "divisibility"],
    divisor: ["factor"],
    factor: ["divisor", "factorization"],
    zero: ["root"],
    solution: ["root", "solutions"],
    biggest: ["maximum"],
    largest: ["maximum"],
    max: ["maximum"],
    maximize: ["maximum"],
    smallest: ["minimum"],
    min: ["minimum"],
    minimize: ["minimum"],
    shortest: ["minimum", "distance"],
    distance: ["length"],
    length: ["distance"],
    speed: ["rate"],
    velocity: ["speed", "rate"],
    chance: ["probability"],
    select: ["choose", "combination"],
    row: ["line", "adjacent"],
    sqrt: ["square", "root", "radical"],
    radical: ["root"],
    sum: ["series", "total"],
    total: ["sum"],
    product: ["multiply", "prod"],
    split: ["divides", "ratio", "bisector"],
    cut: ["divide", "regions"],
    piece: ["region", "parts"],
    region: ["pieces"],
    inscribed: ["incircle", "cyclic"],
    circumscribed: ["circumcircle", "tangential"],
    shoestring: ["shoelace"],
    flip: ["coin"],
    die: ["dice"],
    spinner: ["random"],
    slope: ["line", "angle"],
    perp: ["perpendicular"],
    perpendicular: ["altitude", "normal"],
    intersect: ["intersection", "concurrent"],
    touching: ["tangent", "tangency"],
    touch: ["tangent", "tangency"]
  };

  // Competition abbreviations → full phrase, so "PoP", "FTA", "CRT", ... resolve.
  const ABBREV = {
    pop: "power of a point",
    fta: "fundamental theorem of algebra",
    crt: "chinese remainder theorem",
    lte: "lifting the exponent",
    flt: "fermat little theorem",
    rrt: "rational root theorem",
    sfft: "simon favorite factoring trick",
    amgm: "am gm inequality",
    cs: "cauchy schwarz inequality",
    pie: "inclusion exclusion"
  };

  // Grammar words dropped from queries before scoring — they carry no signal
  // and would otherwise sink descriptive searches into "partial match" mode.
  const STOPWORDS = new Set([
    "the", "an", "of", "to", "in", "on", "for", "and", "or", "is", "are", "be",
    "was", "it", "its", "as", "by", "at", "we", "you", "my", "me", "do", "does",
    "can", "could", "should", "would", "will", "how", "what", "which", "that",
    "this", "these", "those", "there", "then", "than", "when", "where", "who",
    "why", "not", "no", "if", "into", "onto", "from", "with", "within",
    "between", "about", "over", "under", "each", "every", "all", "any", "some",
    "such", "other", "using", "use", "used", "get", "gets", "find", "finding",
    "given", "relationship", "something", "thing"
  ]);

  const state = {
    query: "",
    levels: new Set(),           // empty set = all levels
    starredOnly: false,          // ★ chip: show only starred within the active section
    sort: "default",             // "Show" dropdown: default (all) | high | medium | low importance
    activeSectionId: SECTIONS.length ? SECTIONS[0].id : null
  };

  const $sidebar = document.getElementById("sidebar");
  const $content = document.getElementById("content");
  const $search = document.getElementById("search-input");
  const $levelFilters = document.getElementById("level-filters");
  const $sortSelect = document.getElementById("sort-select");

  // ---------- Search index ----------

  function normWord(w) {
    w = w.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (w.length > 3 && w.endsWith("es")) w = w.slice(0, -2);
    else if (w.length > 3 && w.endsWith("s")) w = w.slice(0, -1);
    return w;
  }

  function wordsOf(text) {
    return text.split(/[\s,;:\-–—'’().\/]+/).map(normWord).filter(w => w.length > 1);
  }

  // Index-side tokenization keeps both the raw word and its stem, so queries
  // like "exradius" match "exradii" and vice versa.
  function indexWordsOf(text) {
    const out = [];
    text.split(/[\s,;:\-–—'’().\/]+/).forEach(w => {
      const raw = w.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (raw.length > 1) {
        out.push(raw);
        const st = normWord(w);
        if (st !== raw && st.length > 1) out.push(st);
      }
    });
    return out;
  }

  // Tokenize the LaTeX itself so symbol-flavored queries like "4R" or "abc"
  // hit the formulas that contain them. Commands (\frac, \sqrt) are dropped;
  // what survives is the letters and numbers the user actually sees.
  function latexTokens(tex) {
    return (tex || "")
      .replace(/\\[a-zA-Z]+/g, " ")
      .replace(/[^a-zA-Z0-9]+/g, " ")
      .toLowerCase()
      .split(/\s+/)
      .filter(w => w.length >= 2 && w.length <= 10);
  }

  // ---------- Math-shape matching ----------
  // Lets a typed formula ("2sqrtab", "b^2-4ac", "n(n+1)/2") find the entry even
  // when the variable letters differ, by comparing normalized formula shapes.

  const MATH_FNS = ["arcsin", "arccos", "arctan", "sqrt", "sin", "cos", "tan", "cot", "sec", "csc",
    "log", "ln", "gcd", "lcm", "min", "max", "binom", "sum", "prod", "pi",
    "theta", "alpha", "beta", "gamma", "phi", "varphi", "omega", "lambda", "mu", "sigma", "tau"];

  // LaTeX → compact form: \frac{a}{b} → (a)/(b), \sqrt → sqrt, commands dropped,
  // braces/spaces/^/_ stripped. "t = 2\sqrt{r_1 r_2}" → "t=2sqrtr1r2".
  function latexToCompact(tex) {
    let s = tex;
    s = s.replace(/\\(?:left|right|big|Big|bigg|Bigg|displaystyle|quad|qquad|cdot|times)\b/g, "");
    s = s.replace(/\\[,;!]/g, "");
    s = s.replace(/\\text\{[^{}]*\}/g, " ");
    s = s.replace(/\\operatorname\{([^{}]*)\}/g, "$1");
    for (let i = 0; i < 8; i++) {
      const t = s.replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, "($1)/($2)");
      if (t === s) break;
      s = t;
    }
    s = s.replace(/\\sqrt\[[^\]]*\]/g, " sqrt");
    s = s.replace(new RegExp("\\\\(" + MATH_FNS.join("|") + ")\\b", "g"), " $1 ");
    s = s.replace(/\\[a-zA-Z]+/g, " ");
    return s.toLowerCase().replace(/[{}_\s\\^]/g, "").replace(/[^a-z0-9+\-/()=.]/g, "");
  }

  // Compact → skeleton: each variable (letter + optional subscript digits)
  // becomes "x", so 2sqrtr1r2 and 2sqrtab both read "2sqrtxx".
  function skeletonOf(compact) {
    let out = "", i = 0;
    while (i < compact.length) {
      const ch = compact[i];
      if (/[a-z]/.test(ch)) {
        let fn = null;
        for (const f of MATH_FNS) if (compact.startsWith(f, i)) { fn = f; break; }
        if (fn) { out += fn; i += fn.length; continue; }
        i++;
        while (i < compact.length && /[0-9]/.test(compact[i])) i++;
        out += "x";
      } else {
        out += ch;
        i++;
      }
    }
    return out;
  }

  // Matchable fragments of a latex string: the whole compact form plus each
  // "="/comma-separated piece. Each fragment keeps a paren-less canonical form
  // (cn) — \frac conversion inserts parens the user would never type — and a
  // variable-blind skeleton (s).
  function mathFragments(tex) {
    const frags = [];
    const seen = new Set();
    const push = c => {
      c = c.replace(/^[(]+|[)]+$/g, "");
      if (c.length < 3 || seen.has(c)) return;
      seen.add(c);
      const cn = c.replace(/[()]/g, "");
      frags.push({ cn, s: skeletonOf(cn) });
    };
    const compact = latexToCompact(tex);
    compact.split(/[=,;]/).forEach(push);
    push(compact);
    return frags;
  }

  // The query's math forms, or null when the query doesn't look like a formula
  // (needs a digit, an operator, or "sqrt" — plain words stay in word search).
  function queryMathForms(rawQuery) {
    const qc = rawQuery.toLowerCase().replace(/\s+/g, "").replace(/[\^{}_\\]/g, "")
      .replace(/[^a-z0-9+\-/()=.]/g, "");
    if (qc.length < 3) return null;
    if (!/[0-9+\-/()=]/.test(qc) && qc.indexOf("sqrt") === -1) return null;
    const qcn = qc.replace(/[()=]/g, "");
    return { qcn, qs: skeletonOf(qcn) };
  }

  function mathMatchScore(entry, mf) {
    if (!mf) return 0;
    let best = 0;
    for (const f of entry.mathFrags) {
      if (f.cn === mf.qcn) best = Math.max(best, 60);
      else if (mf.qcn.length >= 4 && (f.cn.includes(mf.qcn) || mf.qcn.includes(f.cn))) best = Math.max(best, 34);
      if (f.s === mf.qs && mf.qs.length >= 4) best = Math.max(best, 30);
      else if (mf.qs.length >= 5 && (f.s.includes(mf.qs) || mf.qs.includes(f.s))) best = Math.max(best, 16);
    }
    return best;
  }

  // ---------- Topics (derived tags for filtering & bulk study-list building) ----------
  // Every formula is auto-tagged with the topics its name / keywords / subsection
  // match. Topics drive the clickable "#topic" chips and the topic dimension of the
  // study-list builder, so "add everything about circles" is one action.
  const TOPIC_RULES = [
    // Geometry
    { id: "triangles", label: "triangles", sec: ["geometry"], re: /triangl|cevian|incircle|incenter|circumcenter|centroid|orthocenter|median|altitude|angle bisector|law of (sines|cosines)|heron|stewart|ceva|menelaus|euler line|inradius|circumradius|exradi|similar|proportional|intercept|thales|midsegment/ },
    { id: "circles", label: "circles", sec: ["geometry"], re: /circle|circular|circum|chord|arc|tangent|inscribed|cyclic|incircle|circumcircle|radical|power of a point|secant|ptolemy|inversion/ },
    { id: "quadrilaterals", label: "quadrilaterals", sec: ["geometry"], re: /quadrilateral|trapezoid|parallelogram|rectangle|rhombus|brahmagupta|pitot|bretschneider|varignon|\bkite\b/ },
    { id: "polygons", label: "polygons", sec: ["geometry"], re: /polygon|pentagon|hexagon|octagon|decagon|n-gon|apothem/ },
    { id: "solid-geometry", label: "3D geometry", sec: ["geometry"], re: /sphere|\bcone\b|cylinder|tetrahedron|prism|pyramid|volume|surface area|dihedral|\bsolid\b|octahedron|\bcube\b|frustum|skew/ },
    { id: "coordinate-geometry", label: "coordinates", sec: ["geometry"], re: /coordinate|shoelace|distance formula|\bslope\b|lattice|pick|section formula|vector|dot product|cross product|barycentric/ },
    { id: "angles", label: "angles", sec: ["geometry"], re: /\bangle|inscribed|degree|bisector|directed/ },
    // Algebra
    { id: "polynomials", label: "polynomials", sec: ["algebra"], re: /polynomial|vieta|factor|quadratic|discriminant|remainder theorem|rational root|symmetric function|newton|conjugate root|descartes|palindrom/ },
    { id: "sequences-series", label: "sequences & series", sec: ["algebra"], re: /sequence|series|arithmetic|geometric|telescop|recurrence|fibonacci|progression|summation|partial sum/ },
    { id: "inequalities", label: "inequalities", sec: ["algebra"], re: /inequalit|am.?gm|cauchy|schwarz|jensen|rearrangement|bernoulli|muirhead|maclaurin|smoothing|tangent line trick|trivial inequality|power mean|normalization/ },
    { id: "exponents-logs", label: "exponents & logs", sec: ["algebra"], re: /logarithm|\blog\b|exponent|power law/ },
    { id: "complex-numbers", label: "complex numbers", sec: ["algebra"], re: /complex|imaginary|argand|de moivre|root of unity|roots of unity|conjugate|\bcis\b/ },
    { id: "trigonometry", label: "trigonometry", re: /trig|sine|cosine|tangent ratio|angle addition|double angle|half angle|product.to.sum|sum.to.product|law of (sines|cosines)|\bsin\b|\bcos\b|\btan\b|pythagorean identity|common-angle/ },
    { id: "radicals", label: "radicals", sec: ["algebra"], re: /radical|square root|denest|\bsurd\b|nested radical/ },
    { id: "rates", label: "rates & work", sec: ["algebra"], re: /\brate\b|work rate|mixture|\bspeed\b|average speed/ },
    { id: "functions", label: "functions", sec: ["algebra"], re: /functional equation|\bfunction\b|composition|involution/ },
    // Number Theory
    { id: "primes", label: "primes", sec: ["number-theory"], re: /prime|factoriz|sieve|valuation|legendre|factorial|wilson/ },
    { id: "modular-arithmetic", label: "modular arithmetic", sec: ["number-theory"], re: /\bmod|congru|residue|fermat|euler|totient|\border\b|primitive root|chinese remainder|\bcrt\b|quadratic residue|lifting the exponent/ },
    { id: "divisors", label: "divisors", sec: ["number-theory"], re: /divisor|totient|\btau\b|sigma|multiplicative|number of divisors|sum of divisors/ },
    { id: "gcd", label: "gcd & divisibility", sec: ["number-theory"], re: /\bgcd\b|\blcm\b|divisib|bezout|euclid|coprime/ },
    { id: "diophantine", label: "diophantine", sec: ["number-theory"], re: /diophantine|\bpell\b|pythagorean triple|frobenius|chicken mcnugget|sum of two squares|vieta jumping|\bcoin\b/ },
    { id: "digits", label: "digits & bases", sec: ["number-theory"], re: /digit|\bbase\b|decimal|repunit|repeating/ },
    // Counting
    { id: "combinatorics", label: "combinatorics", sec: ["counting"], re: /combination|permutation|binomial|choose|factorial|arrangement|counting|hockey stick|vandermonde|multinomial|catalan/ },
    { id: "probability", label: "probability", sec: ["counting"], re: /probab|expected|random|\bodds\b|variance|distribution|\bbayes\b/ },
    { id: "expected-value", label: "expected value", sec: ["counting"], re: /expected value|expectation|linearity of expectation/ },
    { id: "recursion", label: "recursion", re: /recursi|recurrence|fibonacci|catalan/ },
    { id: "generating-functions", label: "generating functions", re: /generating function/ },
    { id: "stars-bars", label: "stars & bars", sec: ["counting"], re: /stars and bars|distribut|partition|balls|boxes|composition/ },
    { id: "pigeonhole", label: "pigeonhole", re: /pigeonhole|double counting|handshake/ },
    { id: "graph-theory", label: "graphs", sec: ["counting"], re: /\bgraph|vertex|vertices|\bedge|euler.{0,3}formula|planar|region|\btree\b|degree sum/ }
  ];
  const TOPICS_BY_ID = {};
  TOPIC_RULES.forEach(t => { TOPICS_BY_ID[t.id] = t; });
  // "methods" is a virtual topic keyed off the card type, not a pattern.
  const METHODS_TOPIC = { id: "methods", label: "methods" };
  TOPICS_BY_ID.methods = METHODS_TOPIC;

  const ALL = [];
  const BY_ID = {};
  SECTIONS.forEach(section => {
    section.subsections.forEach(sub => {
      sub.formulas.forEach(f => {
        const entry = { formula: f, section, subsection: sub };
        entry.nameWords = new Set(indexWordsOf(f.name));
        entry.tagWords = new Set(f.keywords.flatMap(indexWordsOf));
        entry.tagPhrases = f.keywords.map(k => k.toLowerCase());
        entry.ctxWords = new Set(indexWordsOf(sub.title + " " + section.title));
        entry.descWords = new Set(indexWordsOf(f.description));
        entry.latexWords = new Set(latexTokens(f.latex));
        entry.mathFrags = mathFragments(f.latex);
        entry.nameLower = f.name.toLowerCase();
        const hay = (f.name + " " + f.keywords.join(" ") + " " + sub.title).toLowerCase();
        entry.topics = TOPIC_RULES.filter(t =>
          (!t.sec || t.sec.indexOf(section.id) !== -1) && t.re && t.re.test(hay));
        if (f.type === "method") entry.topics = entry.topics.concat(METHODS_TOPIC);
        ALL.push(entry);
        BY_ID[f.id] = entry;
      });
    });
  });
  function entriesForTopic(topicId) {
    return ALL.filter(e => e.topics.some(t => t.id === topicId));
  }

  function getRoute() {
    let m = location.hash.match(/^#\/f\/([\w-]+)$/);
    if (m && BY_ID[m[1]]) return { type: "formula", entry: BY_ID[m[1]] };
    m = location.hash.match(/^#\/list\/([\w-]+)$/);
    if (m && anyList(m[1])) return { type: "list", listId: m[1] };
    if (/^#\/lists$/.test(location.hash)) return { type: "lists" };
    m = location.hash.match(/^#\/topic\/([\w-]+)$/);
    if (m && TOPICS_BY_ID[m[1]]) return { type: "topic", topicId: m[1] };
    return { type: "home" };
  }

  // Remember where the reader was in the list so "back" from a detail page
  // returns them there instead of jumping to the top.
  let listScrollY = 0;
  function openFormula(id) {
    if (getRoute().type !== "formula") listScrollY = window.scrollY;
    location.hash = "#/f/" + id;
  }

  // ---------- Study lists (named collections, persisted per-browser) ----------
  // One data structure holds every list; "starred" is a built-in list so the
  // one-click star and the named study lists share the same storage. Older
  // installs kept a bare "mq-stars" array — migrate it into the Starred list.
  let lists;
  function loadLists() {
    try { lists = JSON.parse(localStorage.getItem("mq-lists") || "null"); } catch (e) { lists = null; }
    if (!lists || !Array.isArray(lists.items)) {
      let migrated = [];
      try { migrated = JSON.parse(localStorage.getItem("mq-stars") || "[]"); } catch (e) { migrated = []; }
      lists = { items: [{ id: "starred", name: "Starred", ids: migrated, builtin: true }] };
      saveLists();
    }
    if (!lists.items.some(l => l.id === "starred")) {
      lists.items.unshift({ id: "starred", name: "Starred", ids: [], builtin: true });
    }
    // Drop ids that no longer exist in the library (e.g. a renamed formula).
    lists.items.forEach(l => { l.ids = l.ids.filter(id => BY_ID[id]); });
  }
  function saveLists() { try { localStorage.setItem("mq-lists", JSON.stringify(lists)); } catch (e) {} }
  function getList(id) { return lists.items.find(l => l.id === id); }
  function inList(listId, fid) { const l = getList(listId); return !!l && l.ids.indexOf(fid) !== -1; }
  function listCountFor(fid) { return lists.items.reduce((n, l) => n + (l.ids.indexOf(fid) !== -1 ? 1 : 0), 0); }
  function toggleMembership(listId, fid) {
    const l = getList(listId); if (!l) return;
    const i = l.ids.indexOf(fid);
    if (i === -1) l.ids.push(fid); else l.ids.splice(i, 1);
    saveLists();
  }
  function addManyToList(listId, fids) {
    const l = getList(listId); if (!l) return 0;
    let n = 0;
    fids.forEach(f => { if (BY_ID[f] && l.ids.indexOf(f) === -1) { l.ids.push(f); n++; } });
    saveLists();
    return n;
  }
  function createList(name) {
    const id = "l_" + Math.random().toString(36).slice(2, 8);
    lists.items.push({ id, name: (name || "").trim() || "Untitled list", ids: [] });
    saveLists();
    return id;
  }
  function renameList(id, name) { const l = getList(id); if (l && name.trim()) { l.name = name.trim(); saveLists(); } }
  function deleteList(id) { const l = getList(id); if (l && !l.builtin) { lists.items = lists.items.filter(x => x.id !== id); saveLists(); } }

  loadLists();

  // Curated built-in study sets (read-only), sorted by subject for a tidy grid.
  // Unknown ids are dropped so the data file can be edited without breaking the app.
  const SUBJECT_ORDER = { "Geometry": 0, "Algebra": 1, "Number Theory": 2, "Counting": 3, "Methods": 4, "Mixed": 5 };
  const BUILTIN_LISTS = (window.MATH_BUILTIN_LISTS || [])
    .map((l, i) => ({ id: l.id, name: l.name, subject: l.subject, ids: (l.ids || []).filter(id => BY_ID[id]), builtinSet: true, _i: i }))
    .filter(l => l.ids.length)
    .sort((a, b) => ((SUBJECT_ORDER[a.subject] ?? 9) - (SUBJECT_ORDER[b.subject] ?? 9)) || a._i - b._i);
  const BUILTIN_BY_ID = {};
  BUILTIN_LISTS.forEach(l => { BUILTIN_BY_ID[l.id] = l; });
  function anyList(id) { return getList(id) || BUILTIN_BY_ID[id]; }

  function starBtnHtml(id) {
    const on = inList("starred", id);
    return `<button class="star-btn${on ? " starred" : ""}" data-star="${id}" title="${on ? "Starred" : "Star for later"}">${on ? "★" : "☆"}</button>`;
  }
  // Add-to-list opener: a plain "+".
  function addListBtnHtml(id) {
    return `<button class="addlist-btn" data-addlist="${id}" title="Add to a study list" aria-label="Add to a study list">+</button>`;
  }
  function refreshAddListButtons() { /* the button is a static "+"; nothing to refresh */ }

  // ---------- Add-to-list popover + toast ----------
  let menuEl = null;
  function closeListMenu() {
    if (!menuEl) return;
    menuEl.remove();
    menuEl = null;
    document.removeEventListener("mousedown", onDocDown, true);
    document.removeEventListener("keydown", onMenuKey, true);
  }
  function onDocDown(e) {
    if (menuEl && !menuEl.contains(e.target) && !e.target.closest("[data-addlist],[data-bulkadd]")) closeListMenu();
  }
  function onMenuKey(e) { if (e.key === "Escape") closeListMenu(); }

  // Plain text glyphs, never emoji: gold star for the built-in Starred list, a
  // small accent diamond for every other list.
  function listGlyph(l) {
    return l.id === "starred" ? `<span class="list-star">&#9733;</span>` : `<span class="list-ico">&#9670;</span>`;
  }
  // Add-to-list popover for one formula: membership checkboxes + create-new.
  // (Bulk selections create their own new list instead of piling into an existing one.)
  function openListMenu(anchor, fid) {
    const wasOpen = menuEl && menuEl._anchor === anchor;
    closeListMenu();
    if (wasOpen) return;   // a second click on the same opener closes it
    const rows = lists.items.map(l =>
      `<li><label class="lm-row"><input type="checkbox" data-lm-toggle="${l.id}"${inList(l.id, fid) ? " checked" : ""}><span class="lm-emoji">${listGlyph(l)}</span><span class="lm-name">${escapeAttr(l.name)}</span></label></li>`
    ).join("");
    menuEl = document.createElement("div");
    menuEl.className = "listmenu";
    menuEl._anchor = anchor; menuEl._fid = fid;
    menuEl.innerHTML = `
      <div class="lm-title">Add to study list</div>
      <ul class="lm-list">${rows}</ul>
      <form class="lm-new"><input type="text" placeholder="New list name&hellip;" maxlength="40" autocomplete="off"><button type="submit">Create</button></form>`;
    document.body.appendChild(menuEl);
    positionMenu(menuEl, anchor);
    menuEl.addEventListener("change", onMenuChange);
    menuEl.addEventListener("submit", onMenuSubmit);
    setTimeout(() => {
      document.addEventListener("mousedown", onDocDown, true);
      document.addEventListener("keydown", onMenuKey, true);
    }, 0);
  }
  function positionMenu(el, anchor) {
    const r = anchor.getBoundingClientRect();
    const w = 244, vw = document.documentElement.clientWidth;
    let left = r.left + window.scrollX;
    if (left + w > window.scrollX + vw - 8) left = window.scrollX + vw - w - 8;
    el.style.width = w + "px";
    el.style.top = (r.bottom + window.scrollY + 6) + "px";
    el.style.left = Math.max(8 + window.scrollX, left) + "px";
  }
  function syncStarButtons(fid) {
    const on = inList("starred", fid);
    document.querySelectorAll(`.star-btn[data-star="${fid}"]`).forEach(b => {
      b.classList.toggle("starred", on); b.textContent = on ? "★" : "☆";
      b.title = on ? "Starred" : "Star for later";
    });
  }
  function onMenuChange(e) {
    const cb = e.target.closest("[data-lm-toggle]");
    if (!cb || !menuEl) return;
    const fid = menuEl._fid;
    toggleMembership(cb.dataset.lmToggle, fid);   // toggle = can never add twice
    refreshAddListButtons(fid);
    syncStarButtons(fid);
  }
  function onMenuSubmit(e) {
    e.preventDefault();
    if (!menuEl) return;
    const inp = menuEl.querySelector(".lm-new input");
    const name = inp ? inp.value.trim() : "";
    if (!name) { if (inp) inp.focus(); return; }
    const fid = menuEl._fid;
    const id = createList(name);
    const l = getList(id);
    addManyToList(id, [fid]);
    refreshAddListButtons(fid);
    toast(`Created ${listGlyph(l)} ${escapeAttr(l.name)} &middot; added 1`);
    closeListMenu();
    const rt = getRoute();
    if (rt.type === "list" || rt.type === "lists") render();
  }

  let toastTimer = null;
  function toast(msg) {
    let t = document.getElementById("mq-toast");
    if (!t) { t = document.createElement("div"); t.id = "mq-toast"; t.className = "toast"; document.body.appendChild(t); }
    t.innerHTML = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 1900);
  }

  // Entries whose formula line is hard to parse without the picture — these
  // show their diagram on the preview card, not just the detail page.
  const CARD_DIAGRAM_IDS = new Set([
    "altitude-hypotenuse", "incircle-tangent-lengths", "shared-angle-area-ratio", "exradii",
    "angle-bisector-theorem", "angle-bisector-length", "stewarts-theorem", "cevas-theorem",
    "menelaus-theorem", "ratio-lemma", "apollonius-theorem", "rouths-theorem", "trig-ceva",
    "symmedian-lemoine", "incenter-excenter-lemma", "orthocenter-properties", "fermat-point",
    "simson-line", "butterfly-theorem", "radical-axis", "miquels-theorem", "ptolemys-theorem",
    "cyclic-quad-diagonals", "varignons-theorem", "van-aubel", "napoleons-theorem",
    "trapezoid-special-segments", "intercept-theorem", "british-flag-theorem", "mass-points",
    "reflection-shortest-path", "rotation-trick", "spiral-similarity", "de-guas-theorem",
    "skew-lines-distance", "circular-segment", "feuerbach-theorem", "nine-point-circle",
    "common-tangent-lengths", "angle-chord-secant", "centroid-division", "cevian-area-ratio",
    "midsegment-theorem", "euler-line-ratio", "euler-distance-theorem", "tangent-facts",
    "law-of-sines", "circumradius-area", "angle-chasing"
  ]);

  function stripHash() {
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  }

  function sectionCount(section) {
    return section.subsections.reduce((n, sub) => n + sub.formulas.length, 0);
  }

  function passesLevel(f) {
    const levelOk = state.levels.size === 0 || f.level.some(l => state.levels.has(l));
    const impOk = state.sort === "default" || f.importance === state.sort;
    return levelOk && impOk;
  }

  // ---------- Search ----------

  // Each query token must match the entry somewhere (AND semantics).
  // Returns a positive score if the token hits, 0 if it misses.
  function tokenScore(entry, tok) {
    let score = 0;
    if (entry.nameWords.has(tok)) score += 22;
    if (entry.tagWords.has(tok)) score += 16;
    if (entry.ctxWords.has(tok)) score += 8;
    if (entry.latexWords.has(tok)) score += 7;
    if (entry.descWords.has(tok)) score += 5;
    if (score === 0 && tok.length >= 3) {
      // Prefix matching: "circum" hits "circumradius", "tan" hits "tangent".
      for (const w of entry.nameWords) if (w.startsWith(tok)) { score += 11; break; }
      for (const w of entry.tagWords) if (w.startsWith(tok)) { score += 9; break; }
      if (score === 0) {
        for (const w of entry.ctxWords) if (w.startsWith(tok)) { score += 5; break; }
        for (const w of entry.descWords) if (w.startsWith(tok)) { score += 3; break; }
      }
    }
    if (score === 0 && tok.length >= 5) {
      // Typo tolerance: allow one edit ("stewert" still finds Stewart).
      for (const w of entry.nameWords) if (fuzzy(w, tok)) { score += 8; break; }
      if (score === 0) for (const w of entry.tagWords) if (fuzzy(w, tok)) { score += 6; break; }
    }
    return score;
  }

  // Levenshtein distance with an early-exit cap (returns cap+1 once exceeded).
  function levBounded(a, b, cap) {
    const m = a.length, n = b.length;
    if (Math.abs(m - n) > cap) return cap + 1;
    let prev = []; for (let j = 0; j <= n; j++) prev[j] = j;
    for (let i = 1; i <= m; i++) {
      const cur = [i]; let best = i;
      for (let j = 1; j <= n; j++) {
        const c = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + c);
        if (cur[j] < best) best = cur[j];
      }
      if (best > cap) return cap + 1;
      prev = cur;
    }
    return prev[n];
  }

  // Typo tolerance: same first 3 letters and a small edit distance that scales
  // with length, so "stewert"→"stewart" and "bretschinder"→"bretschneider" match
  // without pulling in unrelated words.
  function fuzzy(a, b) {
    if (a.length < 5 || b.length < 5) return false;
    if (a.slice(0, 3) !== b.slice(0, 3)) return false;
    const cap = Math.max(a.length, b.length) >= 10 ? 3 : 2;
    return levBounded(a, b, cap) <= cap;
  }

  function expandToken(tok) {
    return SYNONYMS[tok] ? [tok, ...SYNONYMS[tok].map(normWord)] : [tok];
  }

  function scoreEntry(entry, queryLower, tokens, mathForms) {
    let total = 0;
    let hits = 0;
    let allInNameOrTags = tokens.length > 0;

    for (const tok of tokens) {
      const variants = expandToken(tok);
      const best = Math.max(...variants.map(t => tokenScore(entry, t)));
      if (best > 0) hits++;
      total += best;
      if (!variants.some(t => entry.nameWords.has(t) || entry.tagWords.has(t))) allInNameOrTags = false;
    }

    // Longer descriptive queries tolerate one dead word — otherwise a single
    // word the entry never uses ("people", "thing") exiles the best match.
    let matchedAll = hits === tokens.length || (tokens.length >= 4 && hits >= tokens.length - 1);

    // Precision bonus: every word hit the name or tags directly — this is
    // what the entry is *about*, not a stray mention in its description.
    if (allInNameOrTags && tokens.length >= 2) total += 25;

    // Whole-query bonuses: exact name or exact tag phrase.
    if (entry.nameLower === queryLower) total += 80;
    else if (entry.nameLower.includes(queryLower) && queryLower.length >= 4) total += 30;
    if (entry.tagPhrases.includes(queryLower)) total += 40;

    // Typed-formula match against the entry's own math.
    const mScore = mathMatchScore(entry, mathForms);
    total += mScore;
    if (mScore >= 30) matchedAll = true;

    return { total, matchedAll };
  }

  const IMP_RANK = { high: 0, medium: 1, low: 2 };

  function searchFormulas(rawQuery) {
    let raw = rawQuery.trim();
    if (ABBREV[raw.toLowerCase()]) raw = ABBREV[raw.toLowerCase()];   // whole query is an abbreviation
    const queryLower = raw.toLowerCase();
    let tokens = wordsOf(queryLower).filter(t => !STOPWORDS.has(t));
    if (!tokens.length) tokens = wordsOf(queryLower);
    // expand any abbreviation that appears as its own token (mixed queries)
    tokens = tokens.flatMap(t => ABBREV[t] ? wordsOf(ABBREV[t]).filter(w => !STOPWORDS.has(w)) : [t]);
    const mathForms = queryMathForms(rawQuery);
    if (!tokens.length && !mathForms) return { results: [], partial: false };

    const strict = [];
    const loose = [];
    for (const entry of ALL) {
      if (!passesLevel(entry.formula)) continue;
      const { total, matchedAll } = scoreEntry(entry, queryLower, tokens, mathForms);
      if (total <= 0) continue;
      (matchedAll ? strict : loose).push({ entry, score: total });
    }

    // Prefer entries matching every keyword; fall back to partial matches.
    // Ties break toward higher-importance formulas, then names.
    const cmp = (a, b) => b.score - a.score ||
      IMP_RANK[a.entry.formula.importance] - IMP_RANK[b.entry.formula.importance] ||
      a.entry.formula.name.localeCompare(b.entry.formula.name);
    const pool = strict.length ? strict : loose;
    pool.sort(cmp);
    // Trim the weak tail: keep the clearly-relevant matches (always at least the
    // top handful), then drop entries scoring far below the leader so a growing
    // library doesn't bury the answer under near-misses.
    const topScore = pool.length ? pool[0].score : 0;
    const kept = pool.filter((r, i) => i < 6 || r.score >= topScore * 0.3);
    return {
      results: kept.slice(0, 60).map(r => r.entry),
      partial: !strict.length && loose.length > 0
    };
  }

  // ---------- Sorting ----------

  // The "Show" dropdown filters by importance tier rather than reordering;
  // curated order (or search relevance) is always preserved.
  function sortEntries(entries) {
    return entries;
  }

  // ---------- Rendering ----------

  // Split a multi-formula latex string into its separate formulas.
  // Separators: any "\qquad", or "\quad" directly after a comma/semicolon.
  function splitLatexParts(latex) {
    return latex
      .split(/\s*(?:[,;]\s*\\q?quad|\\qquad)\s*/)
      .map(p => p.trim())
      .filter(Boolean);
  }

  // Stack a multi-formula string into rows instead of one long row (for display).
  function toDisplayLatex(latex) {
    const parts = splitLatexParts(latex);
    if (parts.length < 2) return latex;
    return "\\begin{gathered}" + parts.join(" \\\\[0.55em] ") + "\\end{gathered}";
  }

  // The exact LaTeX the reader sees, formatted for the clipboard: single-formula
  // cards copy as-is; multi-formula cards copy the same stacked `gathered`
  // environment that's rendered, with real newlines for readability.
  function toCopyLatex(latex) {
    const parts = splitLatexParts(latex);
    if (parts.length < 2) return latex;
    return "\\begin{gathered}\n" + parts.join(" \\\\[0.55em]\n") + "\n\\end{gathered}";
  }

  function renderMath(container) {
    container.querySelectorAll(".formula-display[data-latex]").forEach(el => {
      try {
        katex.render(toDisplayLatex(el.dataset.latex), el, { throwOnError: false, displayMode: true });
      } catch (err) {
        el.textContent = el.dataset.latex;
      }
    });
    if (window.renderMathInElement) {
      container.querySelectorAll(".card-desc, .card-name, .card-example, .detail-body, .related-item, .problem-q, .problem-sol").forEach(el => {
        renderMathInElement(el, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      });
    }
    tidyDiagrams(container);
  }

  // ---------- Diagram legibility pass ----------
  // Computed SVG figures are geometrically exact but can crowd: point dots
  // hidden under strokes and (in dense figures) labels overlapping each other.
  // This runs once per render and, without touching the geometry, raises dots
  // and labels above the lines, then nudges apart labels that actually overlap.
  function tidyDiagrams(container) {
    container.querySelectorAll(".diagram svg").forEach(svg => {
      try { tidyDiagram(svg); } catch (e) { /* getBBox can throw if the svg isn't laid out */ }
    });
  }

  function tidyDiagram(svg) {
    const texts = [...svg.querySelectorAll("text")];
    if (!texts.length) return;

    // raise point dots (small filled circles) above the lines, then labels on top
    svg.querySelectorAll("circle").forEach(c => {
      const r = parseFloat(c.getAttribute("r") || "0");
      const fill = (c.getAttribute("fill") || "").toLowerCase();
      if (r > 0 && r <= 7 && fill && fill !== "none") svg.appendChild(c);
    });
    texts.forEach(t => svg.appendChild(t));

    // (3) push apart labels that genuinely overlap (SVG y-down coordinates)
    const badges = [...svg.querySelectorAll("circle")].map(c => ({
      cx: +c.getAttribute("cx"), cy: +c.getAttribute("cy"), r: parseFloat(c.getAttribute("r") || "0"),
      fill: (c.getAttribute("fill") || "").toLowerCase()
    })).filter(c => c.r >= 9 && c.fill && c.fill !== "none");
    const L = texts.map(t => {
      const b = t.getBBox();
      const o = { t, w: b.width, h: b.height, x: b.x + b.width / 2, y: b.y + b.height / 2, dx: 0, dy: 0 };
      o.fixed = /^\d+$/.test((t.textContent || "").trim()) &&
        badges.some(c => Math.hypot(o.x - c.cx, o.y - c.cy) < c.r * 0.7);   // a weight centered in a badge — leave put
      return o;
    }).filter(o => o.w > 0);
    for (let i = 0; i < L.length; i++) {
      if (L[i].fixed) continue;
      for (let it = 0; it < 12; it++) {
        let moved = false;
        for (let j = 0; j < L.length; j++) {
          if (i === j) continue;
          const a = L[i], b = L[j];
          const ox = (a.w + b.w) / 2 - Math.abs((a.x + a.dx) - (b.x + b.dx));
          const oy = (a.h + b.h) / 2 - Math.abs((a.y + a.dy) - (b.y + b.dy));
          if (ox > 2 && oy > Math.min(a.h, b.h) * 0.4) {      // real overlap only
            moved = true;
            let vx = (a.x + a.dx) - (b.x + b.dx), vy = (a.y + a.dy) - (b.y + b.dy);
            if (!vx && !vy) vy = 1;
            const n = Math.hypot(vx, vy) || 1, step = Math.min(oy, a.h * 0.5);
            a.dx += vx / n * step; a.dy += vy / n * step;
          }
        }
        if (!moved) break;
      }
    }
    const vb = (svg.getAttribute("viewBox") || "0 0 400 300").split(/\s+/).map(Number);
    const ctr = [(vb[2] || 400) / 2, (vb[3] || 300) / 2];
    L.forEach(o => {
      const cap = o.h * 1.7, d = Math.hypot(o.dx, o.dy);
      if (d > cap) { o.dx *= cap / d; o.dy *= cap / d; }
      // keep letter labels off weight-badge disks (badges sit outside the figure,
      // so push the label inward, toward the figure's center, until it clears)
      if (!o.fixed) {
        for (const c of badges) {
          if (Math.hypot(o.x + o.dx - c.cx, o.y + o.dy - c.cy) < c.r + o.h * 0.35) {
            let ix = ctr[0] - c.cx, iy = ctr[1] - c.cy; const n = Math.hypot(ix, iy) || 1;
            o.dx = c.cx + ix / n * (c.r + o.h * 0.6) - o.x;
            o.dy = c.cy + iy / n * (c.r + o.h * 0.6) - o.y;
          }
        }
      }
      if (Math.abs(o.dx) > 0.5 || Math.abs(o.dy) > 0.5) {
        const x = parseFloat(o.t.getAttribute("x") || "0"), y = parseFloat(o.t.getAttribute("y") || "0");
        o.t.setAttribute("x", (x + o.dx).toFixed(1));
        o.t.setAttribute("y", (y + o.dy).toFixed(1));
      }
    });
  }

  const IMPORTANCE_LABELS = {
    high: ["HIGH", "High importance — core: you could solve most problems at this level with these"],
    medium: ["MED", "Medium importance — builds on the core to greatly simplify or speed up solutions"],
    low: ["LOW", "Low importance — rarely necessary; almost never the intended solution"]
  };

  function badgeHtml(f) {
    const method = f.type === "method" ? `<span class="badge badge-method">METHOD</span>` : "";
    return method + f.level.map(l => `<span class="badge badge-${l}">${LEVEL_LABELS[l]}</span>`).join("");
  }

  // Importance sits beside the title, separate from the level badges on the right.
  function impBadgeHtml(f) {
    const lab = IMPORTANCE_LABELS[f.importance];
    return lab ? `<span class="badge badge-imp-${f.importance}" title="${lab[1]}">${lab[0]}</span>` : "";
  }

  function tagRowHtml(f, queryTokens, topics) {
    const tchips = (topics || []).map(t =>
      `<span class="topic-chip" data-topic="${escapeAttr(t.id)}" title="Browse everything tagged &ldquo;${escapeAttr(t.label)}&rdquo;">${escapeAttr(t.label)}</span>`);
    const tags = f.keywords.slice(0, 6).map(k => {
      const hit = queryTokens && queryTokens.some(tok =>
        wordsOf(k).some(w => w === tok || (tok.length >= 3 && w.startsWith(tok))));
      return `<span class="tag${hit ? " tag-hit" : ""}" data-tag="${escapeAttr(k)}">${escapeAttr(k)}</span>`;
    });
    return `<div class="tag-row">${tchips.join("")}${tags.join("")}</div>`;
  }

  function cardHtml(entry, showCrumb, queryTokens) {
    const f = entry.formula;
    const crumb = showCrumb
      ? `<span class="card-crumb">${entry.section.title} &rsaquo; ${entry.subsection.title}</span>`
      : "";
    return `
      <article class="card" data-id="${f.id}" id="f-${f.id}">
        <div class="card-head">
          <h4 class="card-name">${f.name}</h4>
          ${impBadgeHtml(f)}
          ${crumb}
          <span class="badges">${badgeHtml(f)}</span>
          ${starBtnHtml(f.id)}
          ${addListBtnHtml(f.id)}
          <button class="copy-btn" data-latex="${escapeAttr(f.latex)}" title="Copy LaTeX">copy tex</button>
        </div>
        <div class="formula-display" data-latex="${escapeAttr(f.latex)}"></div>
        <p class="card-desc">${f.description}</p>
        ${extraHtml(f)}
        ${tagRowHtml(f, queryTokens, entry.topics)}
        <div class="more-hint">open full page &rsaquo;</div>
      </article>`;
  }

  // Cards preview only the diagram; examples and questions live on the detail
  // page. Entries in CARD_DIAGRAM_IDS borrow their first detail diagram at a
  // reduced size so the statement is parseable at a glance.
  function extraHtml(f) {
    const glance = CARD_DIAGRAM_IDS.has(f.id) ? ((window.MATH_DIAGRAMS || {})[f.id] || [])[0] : null;
    const dia = f.diagram || glance;
    if (!dia) return "";
    return `
      <div class="card-extra">
        <div class="diagram${glance && !f.diagram ? " card-glance" : ""}">${dia}</div>
      </div>`;
  }

  function practiceHtml(f) {
    // Uniform format: numbered examples, each a question with a hidden solution.
    // MATH_EXAMPLES holds { q, s } pairs; legacy inline strings are a fallback.
    const items = [];
    const lead = (window.MATH_EXAMPLES || {})[f.id];
    if (lead && lead.q) items.push(lead);
    else if (f.example) items.push({ q: f.example, s: null });
    ((window.MATH_PROBLEMS || {})[f.id] || []).forEach(p => items.push(p));
    if (!items.length) return "";
    const blocks = items.map((p, i) => `
      <div class="problem">
        <p class="problem-q"><strong>Example ${i + 1}.</strong> ${p.q}</p>
        ${p.s ? `<button class="sol-toggle" data-target="sol-${f.id}-${i}">Show solution</button>
        <div class="problem-sol" id="sol-${f.id}-${i}" hidden>${p.s}</div>` : ""}
      </div>`);
    return `<div class="practice"><h4>Examples</h4>${blocks.join("")}</div>`;
  }

  // A contest reference like "2007 AIME II, Problem 15" maps deterministically
  // to its Art of Problem Solving wiki page, where the full solution lives.
  // "1997 AIME, Problem 1"      -> .../1997_AIME_Problems/Problem_1
  // "2021 Fall AMC 12B, Prob 23"-> .../2021_Fall_AMC_12B_Problems/Problem_23
  function aopsUrl(ref) {
    const m = ref.match(/^(.*),\s*Problem\s+(\d+)\s*$/);
    if (!m) return null;
    const slug = m[1].trim().replace(/\s+/g, "_") + "_Problems/Problem_" + m[2];
    return "https://artofproblemsolving.com/wiki/index.php/" + slug;
  }

  // Contest problems that use this formula. Each links out to its AoPS wiki
  // page — the site teaches the idea, then hands you off to practice it there.
  function contestHtml(f) {
    const refs = (window.MATH_CONTEST || {})[f.id] || [];
    if (!refs.length) return "";
    const items = refs.map(r => {
      const url = aopsUrl(r);
      return url
        ? `<li><a class="ref-link" href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">${r}<span class="ref-ext" aria-hidden="true">&#8599;</span></a></li>`
        : `<li>${r}</li>`;
    }).join("");
    return `
      <div class="practice contest-refs">
        <h4>Practice problems</h4>
        <ul class="ref-list">${items}</ul>
      </div>`;
  }

  // ---------- Asymptote export ----------
  // The geometry figures are exact computed SVG; this reconstructs equivalent
  // Asymptote so a reader can drop the figure into AoPS/Overleaf and tweak it.
  // SVG is y-down, Asymptote is y-up, so every y flips through the viewBox
  // height. Stroke/fill colors are resolved (through CSS vars) and carried over;
  // fonts are sized proportionally (as in the SVG) and labels de-overlapped so
  // Asymptote's fixed-size text does not collide the way the SVG's scaled text
  // never does.
  function svgToAsy(svg) {
    const vb = (svg.getAttribute("viewBox") || "0 0 300 300").split(/\s+/).map(Number);
    const W = vb[2] || 300, H = vb[3] || 300;
    const u = Math.round((300 / W) * 1000) / 1000;   // pt per SVG unit (~300pt figure)
    const r1 = v => Math.round(v * 10) / 10;
    const c3 = v => Math.round(v * 1000) / 1000;
    const fx = x => r1(+x), fy = y => r1(H - +y);
    const P = (x, y) => `(${fx(x)},${fy(y)})`;
    const nums = s => (s.match(/-?\d*\.?\d+(?:e-?\d+)?/g) || []).map(Number);
    const rootStyle = getComputedStyle(document.documentElement);
    const out = [];

    // ----- color: resolve a stroke/fill (possibly a CSS var) to an asy pen -----
    function rawColor(el, prop) {
      let c = getComputedStyle(el)[prop];
      if (!c || /var\(/.test(c)) {
        let raw = el.getAttribute(prop) || c || "";
        const vm = raw.match(/var\((--[\w-]+)\)/);
        if (vm) raw = rootStyle.getPropertyValue(vm[1]).trim();
        c = raw;
      }
      return c;
    }
    function parseColor(c) {
      c = (c || "").trim();
      let m = c.match(/rgba?\(([^)]+)\)/);
      if (m) { const p = m[1].split(",").map(parseFloat); return { r: p[0], g: p[1], b: p[2], a: p.length >= 4 ? p[3] : 1 }; }
      m = c.match(/^#([0-9a-f]{3})$/i);
      if (m) { const h = m[1]; return { r: parseInt(h[0] + h[0], 16), g: parseInt(h[1] + h[1], 16), b: parseInt(h[2] + h[2], 16), a: 1 }; }
      m = c.match(/^#([0-9a-f]{6})$/i);
      if (m) { const h = m[1]; return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: 1 }; }
      return null;
    }
    // { expr:"rgb(..)"|"" (""=black default), a:alpha, none:true if invisible }
    function pen(el, prop) {
      const col = parseColor(rawColor(el, prop));
      if (!col || col.a === 0) return { expr: "", a: 0, none: true };
      const black = col.r === 0 && col.g === 0 && col.b === 0;
      return { expr: black ? "" : `rgb(${c3(col.r / 255)},${c3(col.g / 255)},${c3(col.b / 255)})`, a: col.a, none: false };
    }
    const dashed = el => el.getAttribute("stroke-dasharray") ? "dashed" : "";
    function strokeSuffix(el) {
      const s = pen(el, "stroke"), parts = [s.expr, dashed(el)].filter(Boolean);
      return parts.length ? ", " + parts.join("+") : "";
    }
    // a fillable shape: fill / draw / filldraw depending on which are visible
    function shape(pathStr, el, canFill) {
      const s = pen(el, "stroke"), f = pen(el, "fill");
      const strokeVisible = !s.none, fillVisible = canFill && !f.none;
      const strokePen = [s.expr, dashed(el)].filter(Boolean).join("+");
      const fillPen = fillVisible ? (f.expr || "black") + (f.a < 1 ? `+opacity(${c3(f.a)})` : "") : "";
      if (fillVisible && strokeVisible) return `filldraw(${pathStr}, ${fillPen}, ${strokePen || "black"});`;
      if (fillVisible) return `fill(${pathStr}, ${fillPen});`;
      if (strokeVisible) return strokePen ? `draw(${pathStr}, ${strokePen});` : `draw(${pathStr});`;
      return null;
    }

    // ----- label text -> LaTeX so Asymptote can typeset it -----
    // Unicode sub/superscripts become _{..}/^{..}; degree signs are dropped;
    // other math glyphs map to LaTeX macros; anything unmapped is dropped so it
    // can never break the compile.
    const SUB = { "₀":"0","₁":"1","₂":"2","₃":"3","₄":"4","₅":"5","₆":"6","₇":"7","₈":"8","₉":"9","₊":"+","₋":"-","ₐ":"a","ᵢ":"i","ⱼ":"j","ₖ":"k","ₘ":"m","ₙ":"n","ₚ":"p" };
    const SUP = { "⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","ⁿ":"n" };
    const SYM = {
      "−":"-", "·":" \\cdot ", "×":" \\times ", "√":"\\sqrt ", "′":"'", "″":"''",
      "½":"1/2", "⅓":"1/3", "⅔":"2/3", "¼":"1/4", "¾":"3/4", "⁄":"/",
      "θ":"\\theta ", "π":"\\pi ", "α":"\\alpha ", "β":"\\beta ", "γ":"\\gamma ",
      "φ":"\\varphi ", "ω":"\\omega ", "Δ":"\\Delta ", "Ω":"\\Omega ", "Σ":"\\Sigma ",
      "ℓ":"\\ell ", "∠":"\\angle ", "⊥":"\\perp ", "∥":"\\parallel ", "∩":"\\cap ",
      "∪":"\\cup ", "△":"\\triangle ", "⇒":"\\Rightarrow ", "⟺":"\\iff ", "→":"\\to ",
      "≥":"\\ge ", "≤":"\\le ", "≈":"\\approx ", "≠":"\\ne ", "—":"-", "–":"-"
    };
    function mathText(s) {
      let o = "", i = 0;
      while (i < s.length) {
        const ch = s[i];
        if (ch === "°" || ch === "​") { i++; continue; }               // drop degree / zero-width
        if (SUB[ch]) { let g = ""; while (i < s.length && SUB[s[i]]) g += SUB[s[i++]]; o += g.length > 1 ? `_{${g}}` : `_${g}`; continue; }
        if (SUP[ch]) { let g = ""; while (i < s.length && SUP[s[i]]) g += SUP[s[i++]]; o += g.length > 1 ? `^{${g}}` : `^${g}`; continue; }
        if (SYM[ch]) { o += SYM[ch]; i++; continue; }
        if (ch.charCodeAt(0) > 127) { i++; continue; }                      // drop anything else non-ASCII
        o += ch; i++;
      }
      return o.replace(/"/g, "").replace(/\s+/g, " ").trim();
    }

    // SVG arc (equal radii, no rotation) -> asy arc(center, r, a1, a2) minor arc.
    function arcCmd(S, E, r, la, sw) {
      const [x1, y1] = S, [x2, y2] = E;
      const hx = (x2 - x1) / 2, hy = (y2 - y1) / 2, d2 = hx * hx + hy * hy;
      let R = r; if (d2 > R * R) R = Math.sqrt(d2);
      const h = Math.sqrt(Math.max(0, R * R - d2));
      let ux = -hy, uy = hx; const ul = Math.hypot(ux, uy) || 1; ux /= ul; uy /= ul;
      const sign = (la !== sw) ? 1 : -1;
      const cx = (x1 + x2) / 2 + sign * h * ux, cy = (y1 + y2) / 2 + sign * h * uy;
      const cX = fx(cx), cY = fy(cy);
      let a1 = Math.atan2(fy(y1) - cY, fx(x1) - cX) * 180 / Math.PI;
      let a2 = Math.atan2(fy(y2) - cY, fx(x2) - cX) * 180 / Math.PI;
      while (a2 - a1 > 180) a2 -= 360;
      while (a1 - a2 > 180) a2 += 360;
      return `arc((${cX},${cY}), ${r1(R)}, ${r1(Math.min(a1, a2))}, ${r1(Math.max(a1, a2))})`;
    }

    function pathCmds(d, suffix) {
      const t = d.match(/[MLAZmlaz]|-?\d*\.?\d+/g) || [];
      let i = 0, cur = null, start = null, run = [];
      const flush = () => { if (run.length >= 2) out.push(`draw(${run.join("--")}${suffix});`); run = []; };
      while (i < t.length) {
        const c = t[i++];
        if (c === "M" || c === "m") { flush(); const x = +t[i++], y = +t[i++]; cur = [x, y]; start = [x, y]; run = [P(x, y)]; }
        else if (c === "L" || c === "l") { const x = +t[i++], y = +t[i++]; cur = [x, y]; run.push(P(x, y)); }
        else if (c === "A" || c === "a") {
          const rr = +t[i++]; i++; i++; const la = +t[i++], sw = +t[i++], x = +t[i++], y = +t[i++];
          flush(); out.push(`draw(${arcCmd(cur, [x, y], rr, la, sw)}${suffix});`); cur = [x, y]; run = [P(x, y)];
        } else if (c === "Z" || c === "z") { if (start) run.push(P(start[0], start[1])); flush(); cur = start; }
      }
      flush();
    }

    const labels = [];
    svg.querySelectorAll("line,polyline,polygon,rect,circle,ellipse,path,text").forEach(el => {
      const tag = el.tagName.toLowerCase();
      if (tag === "line") {
        out.push(`draw(${P(el.getAttribute("x1"), el.getAttribute("y1"))}--${P(el.getAttribute("x2"), el.getAttribute("y2"))}${strokeSuffix(el)});`);
      } else if (tag === "polyline" || tag === "polygon") {
        const n = nums(el.getAttribute("points")), pts = [];
        for (let i = 0; i + 1 < n.length; i += 2) pts.push(P(n[i], n[i + 1]));
        if (pts.length < 2) return;
        if (tag === "polyline") out.push(`draw(${pts.join("--")}${strokeSuffix(el)});`);
        else { const st = shape(`${pts.join("--")}--cycle`, el, true); if (st) out.push(st); }
      } else if (tag === "rect") {
        const x = +el.getAttribute("x"), y = +el.getAttribute("y"), w = +el.getAttribute("width"), h = +el.getAttribute("height");
        const st = shape(`${P(x, y)}--${P(x + w, y)}--${P(x + w, y + h)}--${P(x, y + h)}--cycle`, el, true);
        if (st) out.push(st);
      } else if (tag === "circle") {
        const cx = +el.getAttribute("cx"), cy = +el.getAttribute("cy"), r = +el.getAttribute("r");
        const f = pen(el, "fill");
        if (!f.none && r <= 6) out.push(`dot(${P(cx, cy)}${f.expr ? ", " + f.expr : ""});`);
        else { const st = shape(`shift(${P(cx, cy)})*scale(${r1(r)})*unitcircle`, el, true); if (st) out.push(st); }
      } else if (tag === "ellipse") {
        const cx = +el.getAttribute("cx"), cy = +el.getAttribute("cy"), rx = +el.getAttribute("rx"), ry = +el.getAttribute("ry");
        const st = shape(`shift(${P(cx, cy)})*scale(${r1(rx)},${r1(ry)})*unitcircle`, el, true);
        if (st) out.push(st);
      } else if (tag === "path") {
        pathCmds(el.getAttribute("d") || "", strokeSuffix(el));
      } else if (tag === "text") {
        const text = mathText((el.textContent || "").trim());
        if (!text) return;
        labels.push({
          x: +el.getAttribute("x"), y: H - +el.getAttribute("y"),
          fs: parseFloat(el.getAttribute("font-size")) || 13,
          pen: pen(el, "fill").expr, text
        });
      }
    });

    // Estimated label boxes, then nudge overlapping labels apart. The SVG never
    // overlaps because its text scales with the drawing; Asymptote's text does
    // not, so equal figures can collide — separate them in figure space.
    labels.forEach(L => {
      const vis = (L.text.replace(/\\[a-zA-Z]+/g, "x").replace(/[\\^_{}]/g, "")) || "x";
      L.w = vis.length * L.fs * 0.6; L.h = L.fs;
    });
    for (let i = 0; i < labels.length; i++) {
      const a = labels[i];
      for (let iter = 0; iter < 16; iter++) {
        let hit = false;
        for (let j = 0; j < labels.length; j++) {
          if (j === i) continue;
          const b = labels[j];
          const ox = (a.w + b.w) / 2 - Math.abs(a.x - b.x), oy = (a.h + b.h) / 2 - Math.abs(a.y - b.y);
          if (ox > 0.5 && oy > 0.5) {
            hit = true;
            let dx = a.x - b.x, dy = a.y - b.y;
            if (!dx && !dy) dy = 1;
            const Ln = Math.hypot(dx, dy) || 1, step = a.fs * 0.4;
            a.x += dx / Ln * step; a.y += dy / Ln * step;
          }
        }
        if (!hit) break;
      }
    }
    labels.forEach(L => {
      const size = `fontsize(${r1(L.fs * u)}pt)`;
      out.push(`label("$${L.text}$", (${r1(L.x)},${r1(L.y)}), ${L.pen ? `${L.pen}+${size}` : size});`);
    });

    return `// Asymptote for this figure - generated by Competition Math Reference.\n`
      + `// Coordinates are exact; paste into an Asymptote-enabled editor (e.g. AoPS).\n`
      + `unitsize(${u}pt);\ndefaultpen(fontsize(${r1(13 * u)}pt));\n\n` + out.join("\n") + "\n";
  }

  // ---------- Detail pages ----------

  function relatedEntries(entry, max) {
    const scored = [];
    for (const other of ALL) {
      if (other === entry) continue;
      let score = 0;
      for (const w of other.tagWords) if (entry.tagWords.has(w)) score += 2;
      if (other.subsection === entry.subsection) score += 3;
      else if (other.section === entry.section) score += 1;
      if (score >= 3) scored.push({ other, score });
    }
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, max).map(r => r.other);
  }

  // Details are plain text blocks separated by blank lines; a block may start
  // with a "## Heading" line — only that first line is the heading, the rest
  // of the block is an ordinary paragraph.
  function detailBodyHtml(body) {
    return body.split(/\n\s*\n/).map(block => {
      block = block.trim();
      if (!block) return "";
      if (block.startsWith("## ")) {
        const nl = block.indexOf("\n");
        if (nl === -1) return `<h4>${block.slice(3)}</h4>`;
        return `<h4>${block.slice(3, nl).trim()}</h4><p>${block.slice(nl + 1).trim()}</p>`;
      }
      return `<p>${block}</p>`;
    }).join("");
  }

  function renderDetail(entry) {
    const f = entry.formula;
    state.activeSectionId = entry.section.id;
    const body = (window.MATH_DETAILS || {})[f.id];
    const related = relatedEntries(entry, 6);
    const hasDiagram = !!(f.diagram || ((window.MATH_DIAGRAMS || {})[f.id] || []).length);
    const asyBtn = entry.section.id === "geometry" && hasDiagram
      ? `<button class="copy-btn copy-asy-btn" title="Copy Asymptote code for the figure">copy asy</button>`
      : "";
    $content.innerHTML = `
      <div class="detail">
        <a class="back-link" href="#">&larr; Back to ${entry.section.title}</a>
        <p class="detail-crumb">${entry.section.title} &rsaquo; ${entry.subsection.title}</p>
        <div class="detail-head">
          <h2 class="card-name">${f.name}</h2>
          ${impBadgeHtml(f)}
          <span class="badges">${badgeHtml(f)}</span>
          ${starBtnHtml(f.id)}
          ${addListBtnHtml(f.id)}
          <button class="copy-btn" data-latex="${escapeAttr(f.latex)}" title="Copy LaTeX">copy tex</button>
          ${asyBtn}
        </div>
        <div class="formula-display detail-formula" data-latex="${escapeAttr(f.latex)}"></div>
        <p class="card-desc detail-summary">${f.description}</p>
        ${f.diagram ? `<div class="diagram">${f.diagram}</div>` : ""}
        ${((window.MATH_DIAGRAMS || {})[f.id] || []).map(d => `<div class="diagram detail-diagram">${d}</div>`).join("")}
        ${body ? `<div class="detail-body">${detailBodyHtml(body)}</div>` : ""}
        ${practiceHtml(f)}
        ${contestHtml(f)}
        ${related.length ? `
          <div class="related">
            <h4>Related</h4>
            <div class="related-grid">
              ${related.map(r => `<a class="related-item" href="#/f/${r.formula.id}">${r.formula.name}</a>`).join("")}
            </div>
          </div>` : ""}
        ${tagRowHtml(f, null, entry.topics)}
      </div>`;
    renderMath($content);
  }

  function escapeAttr(s) {
    return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }

  // Ids of the formulas in the current list-style view (used for the empty check).
  let shownIds = [];

  function renderSection(section) {
    const parts = [];
    parts.push(`
      <div class="section-header">
        <h2>${section.title}</h2>
        <p>${section.blurb}</p>
      </div>`);

    shownIds = [];
    const subParts = [];
    section.subsections.forEach((sub, i) => {
      const visible = sortEntries(sub.formulas.filter(passesLevel).map(f => BY_ID[f.id]));
      if (!visible.length) return;
      visible.forEach(e => shownIds.push(e.formula.id));
      subParts.push(`
        <div class="subsection" id="sub-${section.id}-${i}">
          <h3>${sub.title}</h3>
          <div class="cards">
            ${visible.map(e => cardHtml(e, false, null)).join("")}
          </div>
        </div>`);
    });

    if (!shownIds.length) {
      parts.push(`<div class="empty-state"><div class="big">&#8709;</div>No ${section.title} formulas match the selected level filters.</div>`);
    } else {
      parts.push(subParts.join(""));
    }
    $content.innerHTML = parts.join("");
    renderMath($content);
  }

  function renderSearchResults() {
    const { results, partial } = searchFormulas(state.query);
    const sorted = sortEntries(results);
    const queryTokens = wordsOf(state.query.toLowerCase());
    const levelNote = state.levels.size === 0
      ? ""
      : ` &middot; levels: <strong>${[...state.levels].map(l => LEVEL_LABELS[l]).join(", ")}</strong>`;
    const partialNote = partial
      ? ` <em>(no formula matched every keyword &mdash; showing closest matches)</em>`
      : "";
    shownIds = sorted.map(e => e.formula.id);
    const parts = [];
    parts.push(`<p class="results-meta"><strong>${sorted.length}</strong> result${sorted.length === 1 ? "" : "s"} for &ldquo;<strong>${escapeAttr(state.query.trim())}</strong>&rdquo;${levelNote}${partialNote}</p>`);
    if (!sorted.length) {
      parts.push(`<div class="empty-state"><div class="big">&#8709;</div>No matches. Try broader keywords &mdash; e.g. &ldquo;area&rdquo;, &ldquo;mod&rdquo;, &ldquo;roots&rdquo;, &ldquo;probability&rdquo; &mdash; or click a tag on any card.</div>`);
    } else {
      parts.push(`<div class="cards">${sorted.map(e => cardHtml(e, true, queryTokens)).join("")}</div>`);
    }
    $content.innerHTML = parts.join("");
    renderMath($content);
  }

  // The "★ Starred" filter chip narrows the currently selected section down
  // to just its starred formulas — it's a filter within the section, not a
  // separate cross-section page.
  function renderStarred(section) {
    const entries = [];
    section.subsections.forEach(sub => sub.formulas.forEach(f => {
      if (inList("starred", f.id) && passesLevel(f)) entries.push(BY_ID[f.id]);
    }));
    $content.innerHTML = `
      <div class="section-header">
        <h2>${section.title} &mdash; Starred</h2>
        <p class="section-blurb">${section.blurb}</p>
      </div>
      ${entries.length
        ? `<div class="cards">${entries.map(e => cardHtml(e, false, null)).join("")}</div>`
        : `<div class="empty-state"><div class="big">&#9734;</div>Nothing starred in this section yet. Click the &#9734; on any card, and it'll be waiting here.</div>`}`;
    renderMath($content);
  }

  // ---------- Topic view: every formula tagged with a topic, across sections ----------
  function renderTopic(topicId) {
    const topic = TOPICS_BY_ID[topicId];
    const entries = entriesForTopic(topicId).filter(e => passesLevel(e.formula));
    shownIds = entries.map(e => e.formula.id);
    const parts = [`
      <div class="section-header">
        <a class="back-link" href="#/lists">&larr; Study lists</a>
        <h2>${escapeAttr(topic.label)}</h2>
        <p>Every formula tagged <strong>${escapeAttr(topic.label)}</strong>. To turn a topic into a study list, use the filter builder under Study Lists.</p>
      </div>`];
    if (!entries.length) {
      parts.push(`<div class="empty-state"><div class="big">&#8709;</div>No formulas match this topic at the current level filter.</div>`);
    } else {
      parts.push(`<div class="cards">${entries.map(e => cardHtml(e, true, null)).join("")}</div>`);
    }
    $content.innerHTML = parts.join("");
    renderMath($content);
  }

  // ---------- Lists overview: built-in sets + your lists + a filter builder ----------
  function listPreview(l) {
    return l.ids.slice(0, 3).map(id => BY_ID[id] && BY_ID[id].formula.name).filter(Boolean).join(", ");
  }
  function subjectClass(s) { return (s || "").toLowerCase().replace(/[^a-z]+/g, "-"); }

  function listCardHtml(l) {
    const preview = listPreview(l);
    return `
      <a class="list-card" href="#/list/${l.id}">
        <div class="list-card-top">
          <span class="list-emoji">${listGlyph(l)}</span>
          <span class="list-name">${escapeAttr(l.name)}</span>
          ${l.builtin ? `<span class="list-builtin">built-in</span>` : ""}
        </div>
        <div class="list-card-count">${l.ids.length} formula${l.ids.length === 1 ? "" : "s"}</div>
        ${preview ? `<div class="list-card-preview">${escapeAttr(preview)}${l.ids.length > 3 ? "&hellip;" : ""}</div>` : `<div class="list-card-preview empty">Empty &mdash; add formulas with the &ldquo;+ list&rdquo; button.</div>`}
      </a>`;
  }
  function builtinCardHtml(l) {
    const preview = listPreview(l);
    return `
      <a class="list-card builtin-card" href="#/list/${l.id}">
        <div class="list-card-top">
          <span class="list-name">${escapeAttr(l.name)}</span>
          <span class="list-subject sub-${subjectClass(l.subject)}">${escapeAttr(l.subject)}</span>
        </div>
        <div class="list-card-count">${l.ids.length} formulas</div>
        ${preview ? `<div class="list-card-preview">${escapeAttr(preview)}${l.ids.length > 3 ? "&hellip;" : ""}</div>` : ""}
      </a>`;
  }
  let builtinExpanded = false;
  const BUILTIN_PREVIEW_N = 4;
  function builtinGridInner() {
    const shown = builtinExpanded ? BUILTIN_LISTS : BUILTIN_LISTS.slice(0, BUILTIN_PREVIEW_N);
    return shown.map(builtinCardHtml).join("");
  }
  function builtinToggleLabel() {
    return builtinExpanded ? "Show less" : ("Show all " + BUILTIN_LISTS.length + " &#9662;");
  }

  const IMP_OPTS = [["", "any importance"], ["high", "high"], ["medium", "medium"], ["low", "low"]];
  // Topics available inside a section (empty = every topic). Cross-cutting topics
  // (methods, trig, recursion…) show up wherever a formula in that section carries them.
  function topicsInSection(secId) {
    const all = TOPIC_RULES.concat(METHODS_TOPIC);
    if (!secId) return all;
    const present = {};
    ALL.forEach(e => { if (e.section.id === secId) e.topics.forEach(t => { present[t.id] = 1; }); });
    return all.filter(t => present[t.id]);
  }
  function topicOptionsHtml(secId, current) {
    return `<option value="">any topic</option>` + topicsInSection(secId)
      .map(t => `<option value="${t.id}"${t.id === current ? " selected" : ""}>${t.label}</option>`).join("");
  }
  function builderHtml() {
    const secOpts = [`<option value="">any section</option>`]
      .concat(SECTIONS.map(s => `<option value="${s.id}">${s.title}</option>`)).join("");
    const impOpts = IMP_OPTS.map(o => `<option value="${o[0]}">${o[1]}</option>`).join("");
    const lvlChips = LEVELS.map(l => `<button type="button" class="b-lvl-chip" data-blvl="${l}">${LEVEL_LABELS[l]}</button>`).join("");
    const listOpts = `<option value="__new">&#43; new list&hellip;</option>` +
      lists.items.map(l => `<option value="${l.id}">${escapeAttr(l.name)}</option>`).join("");
    return `
      <div class="builder">
        <h3>Build a list from filters</h3>
        <p class="builder-sub">Pick any combination &mdash; e.g. <em>Geometry &middot; low</em>, or topic <em>circles</em> &mdash; then add every match to a new or existing list.</p>
        <div class="builder-row">
          <select id="b-sec">${secOpts}</select>
          <select id="b-topic">${topicOptionsHtml("", "")}</select>
          <select id="b-imp">${impOpts}</select>
        </div>
        <div class="builder-row builder-levels">
          <span class="builder-lbl">Levels</span>
          ${lvlChips}
        </div>
        <div class="builder-row builder-act">
          <span class="builder-count" id="b-count">&mdash;</span>
          <label class="builder-into">Add to
            <select id="b-list">${listOpts}</select>
          </label>
          <input id="b-newname" type="text" placeholder="New list name&hellip;" maxlength="40" autocomplete="off">
          <button id="b-add" class="builder-add">Add matches</button>
        </div>
      </div>`;
  }

  function renderLists() {
    shownIds = [];
    const userCards = lists.items.map(listCardHtml).join("");
    const moreBtn = BUILTIN_LISTS.length > BUILTIN_PREVIEW_N
      ? `<button class="show-more-btn" id="builtin-toggle">${builtinToggleLabel()}</button>` : "";
    $content.innerHTML = `
      <div class="section-header">
        <h2>Study Lists</h2>
        <p>Curated study sets to learn a theme end to end, plus your own compilations. Add any formula to a list with the &ldquo;+ list&rdquo; button on its card.</p>
      </div>

      <section class="lists-section">
        <h3 class="lists-subhead">Built-in study sets</h3>
        <p class="lists-subnote">Ready-made, medium-length compilations &mdash; one focused theme each, labeled by subject.</p>
        <div class="list-grid" id="builtin-grid">${builtinGridInner()}</div>
        ${moreBtn}
      </section>

      <section class="lists-section">
        <h3 class="lists-subhead">Your lists</h3>
        <div class="lists-toolbar">
          <form class="lists-new" id="lists-new-form">
            <input type="text" id="lists-new-name" placeholder="Name a new list&hellip;" maxlength="40" autocomplete="off">
            <button type="submit">Create list</button>
          </form>
        </div>
        <div class="list-grid">${userCards}</div>
        ${builderHtml()}
      </section>`;
    renderMath($content);
    updateBuilderCount();
  }

  function renderListDetail(listId) {
    const userL = getList(listId);
    const l = userL || BUILTIN_BY_ID[listId];
    if (!l) { location.hash = "#/lists"; return; }
    const isBuiltin = !userL;
    const entries = l.ids.map(id => BY_ID[id]).filter(Boolean);
    shownIds = entries.map(e => e.formula.id);
    const tools = isBuiltin ? "" : `
      <div class="list-detail-tools">
        ${l.builtin ? "" : `<button class="list-tool" data-list-rename="${l.id}">Rename</button>`}
        ${entries.length ? `<button class="list-tool danger" data-list-clear="${l.id}">Clear</button>` : ""}
        ${l.builtin ? "" : `<button class="list-tool danger" data-list-delete="${l.id}">Delete list</button>`}
      </div>`;
    const glyph = isBuiltin ? `<span class="list-ico">&#9670;</span>` : `<span class="list-emoji">${listGlyph(l)}</span>`;
    $content.innerHTML = `
      <div class="detail">
        <a class="back-link" href="#/lists">&larr; All study lists</a>
        <div class="list-detail-head">
          <h2>${glyph} ${escapeAttr(l.name)}</h2>
          <span class="list-detail-count">${entries.length} formula${entries.length === 1 ? "" : "s"}</span>
          ${isBuiltin ? `<span class="list-subject sub-${subjectClass(l.subject)}">${escapeAttr(l.subject)}</span>` : ""}
        </div>
        ${isBuiltin ? `<p class="detail-crumb builtin-note">Built-in study set &mdash; hit &ldquo;+ list&rdquo; on any card to copy it into one of your own lists.</p>` : ""}
        ${tools}
        ${entries.length
          ? `<div class="cards">${entries.map(e => cardHtml(e, true, null)).join("")}</div>`
          : `<div class="empty-state"><div class="big">${glyph}</div>This list is empty. Open any formula and hit &ldquo;+ list&rdquo;, or use the builder in <a href="#/lists">Study Lists</a>.</div>`}
      </div>`;
    renderMath($content);
  }

  function render() {
    const route = getRoute();
    const section = SECTIONS.find(s => s.id === state.activeSectionId) || SECTIONS[0];
    closeListMenu();
    if (route.type === "formula") {
      renderDetail(route.entry);
    } else if (route.type === "topic") {
      renderTopic(route.topicId);
    } else if (route.type === "lists") {
      renderLists();
    } else if (route.type === "list") {
      renderListDetail(route.listId);
    } else if (state.starredOnly) {
      if (section) renderStarred(section);
    } else if (state.query.trim()) {
      renderSearchResults();
    } else {
      if (section) renderSection(section);
    }
    updateNavActive();
  }

  // ---------- Sidebar ----------

  function buildSidebar() {
    $sidebar.innerHTML = SECTIONS.map(section => `
      <div class="nav-section" data-section="${section.id}">
        <button class="nav-section-btn" data-section="${section.id}">
          <span>${section.title}</span>
          <span class="nav-count">${sectionCount(section)}</span>
        </button>
        <div class="nav-subs">
          ${section.subsections.map((sub, i) =>
            `<a class="nav-sub-link" data-section="${section.id}" data-sub="${i}">${sub.title}</a>`
          ).join("")}
        </div>
      </div>`).join("");

    $sidebar.addEventListener("click", e => {
      const btn = e.target.closest(".nav-section-btn");
      const link = e.target.closest(".nav-sub-link");
      if (btn) {
        clearSearch();
        clearStarredFilter();
        stripHash();
        state.activeSectionId = btn.dataset.section;
        render();
        window.scrollTo({ top: 0 });
      } else if (link) {
        clearSearch();
        clearStarredFilter();
        stripHash();
        state.activeSectionId = link.dataset.section;
        render();
        const target = document.getElementById(`sub-${link.dataset.section}-${link.dataset.sub}`);
        if (target) target.scrollIntoView({ block: "start" });
      }
    });
  }

  function updateNavActive() {
    const onHome = getRoute().type === "home";
    $sidebar.querySelectorAll(".nav-section").forEach(el => {
      const isActive = onHome && !state.query.trim() && !state.starredOnly && el.dataset.section === state.activeSectionId;
      el.classList.toggle("open", isActive);
      el.querySelector(".nav-section-btn").classList.toggle("active", isActive);
    });
  }

  function clearSearch() {
    state.query = "";
    $search.value = "";
  }

  function clearStarredFilter() {
    if (!state.starredOnly) return;
    state.starredOnly = false;
    syncFilterChips();
  }

  // ---------- Level filter chips (multi-select) + Starred chip ----------

  function syncFilterChips() {
    $levelFilters.querySelectorAll(".level-chip").forEach(c => {
      const l = c.dataset.level;
      const on = l === "All" ? (state.levels.size === 0 && !state.starredOnly)
        : l === "Starred" ? state.starredOnly
        : state.levels.has(l);
      c.classList.toggle("active", on);
    });
  }

  function buildLevelFilters() {
    const chips = [`<button class="level-chip active" data-level="All">All Levels</button>`]
      .concat(LEVELS.map(l => `<button class="level-chip" data-level="${l}">${LEVEL_LABELS[l]}</button>`))
      .concat([`<button class="level-chip star-chip" data-level="Starred">&#9733; Starred</button>`]);
    $levelFilters.innerHTML = chips.join("");

    $levelFilters.addEventListener("click", e => {
      const chip = e.target.closest(".level-chip");
      if (!chip) return;
      const level = chip.dataset.level;
      if (level === "All") {
        state.levels.clear();
        state.starredOnly = false;
      } else if (level === "Starred") {
        state.starredOnly = !state.starredOnly;
      } else {
        if (state.levels.has(level)) state.levels.delete(level);
        else state.levels.add(level);
      }
      syncFilterChips();
      if (state.starredOnly || level === "Starred") stripHash();
      render();
      window.scrollTo({ top: 0 });
    });
  }

  // ---------- Events ----------

  let searchTimer = null;
  $search.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.query = $search.value;
      if (state.query.trim()) stripHash();
      render();
    }, 120);
  });

  $sortSelect.addEventListener("change", () => {
    state.sort = $sortSelect.value;
    render();
  });

  // Enter in the search box jumps straight to the top hit's full page.
  $search.addEventListener("keydown", e => {
    if (e.key !== "Enter") return;
    const q = $search.value.trim();
    if (!q) return;
    state.query = q;
    const { results } = searchFormulas(q);
    const sorted = sortEntries(results);
    if (sorted.length) openFormula(sorted[0].formula.id);
  });

  // Brand → back to the start (top of the first section).
  const $brand = document.getElementById("brand-home");
  if ($brand) $brand.addEventListener("click", () => {
    clearSearch();
    clearStarredFilter();
    stripHash();
    state.activeSectionId = SECTIONS[0].id;
    render();
    window.scrollTo({ top: 0 });
  });

  // Lists → the study-lists overview.
  const $listsBtn = document.getElementById("lists-btn");
  if ($listsBtn) $listsBtn.addEventListener("click", () => {
    clearSearch();
    clearStarredFilter();
    if (getRoute().type === "lists") return;
    if (location.hash === "#/lists") render(); else location.hash = "#/lists";
    window.scrollTo({ top: 0 });
  });

  // Top → smooth-scroll back to the top of the current page.
  const $top = document.getElementById("top-btn");
  if ($top) $top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Light / dark theme toggle (persisted; default dark). The early inline script
  // in index.html applies the saved choice before paint to avoid a flash.
  const $theme = document.getElementById("theme-btn");
  function syncThemeBtn() {
    if (!$theme) return;
    const light = document.documentElement.getAttribute("data-theme") === "light";
    $theme.textContent = light ? "☀" : "☾";   // ☀ in light mode, ☾ in dark
    $theme.title = light ? "Switch to dark theme" : "Switch to light theme";
  }
  if ($theme) {
    syncThemeBtn();
    $theme.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
      syncThemeBtn();
    });
  }

  // Random → a random formula's detail page.
  const $random = document.getElementById("random-btn");
  if ($random) $random.addEventListener("click", () => {
    const pick = ALL[Math.floor(Math.random() * ALL.length)];
    openFormula(pick.formula.id);
    window.scrollTo({ top: 0 });
  });

  document.addEventListener("keydown", e => {
    if (e.key === "/" && document.activeElement !== $search) {
      e.preventDefault();
      $search.focus();
      $search.select();
    } else if (e.key === "Escape" && document.activeElement === $search) {
      clearSearch();
      render();
      $search.blur();
    }
  });

  $content.addEventListener("click", e => {
    const asyBtn = e.target.closest(".copy-asy-btn");
    if (asyBtn) {
      const svg = $content.querySelector(".detail .diagram svg");
      if (svg) {
        navigator.clipboard.writeText(svgToAsy(svg)).then(() => {
          asyBtn.textContent = "copied!";
          asyBtn.classList.add("copied");
          setTimeout(() => {
            asyBtn.textContent = "copy asy";
            asyBtn.classList.remove("copied");
          }, 1200);
        });
      }
      return;
    }
    const btn = e.target.closest(".copy-btn");
    if (btn) {
      navigator.clipboard.writeText(toCopyLatex(btn.dataset.latex)).then(() => {
        btn.textContent = "copied!";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = "copy tex";
          btn.classList.remove("copied");
        }, 1200);
      });
      return;
    }
    const starBtn = e.target.closest(".star-btn");
    if (starBtn) {
      const id = starBtn.dataset.star;
      toggleMembership("starred", id);
      const route = getRoute();
      if (state.starredOnly || route.type === "list" || route.type === "lists") {
        render();
      } else {
        syncStarButtons(id);
        refreshAddListButtons(id);
      }
      return;
    }
    const sol = e.target.closest(".sol-toggle");
    if (sol) {
      const panel = document.getElementById(sol.dataset.target);
      panel.hidden = !panel.hidden;
      sol.textContent = panel.hidden ? "Show solution" : "Hide solution";
      return;
    }
    const tag = e.target.closest(".tag");
    if (tag) {
      $search.value = tag.dataset.tag;
      state.query = tag.dataset.tag;
      stripHash();
      render();
      window.scrollTo({ top: 0 });
      return;
    }
    const addlistBtn = e.target.closest(".addlist-btn");
    if (addlistBtn) { openListMenu(addlistBtn, addlistBtn.dataset.addlist); return; }
    const topicChip = e.target.closest(".topic-chip");
    if (topicChip) { location.hash = "#/topic/" + topicChip.dataset.topic; window.scrollTo({ top: 0 }); return; }
    const btoggle = e.target.closest("#builtin-toggle");
    if (btoggle) {
      builtinExpanded = !builtinExpanded;
      const grid = document.getElementById("builtin-grid");
      if (grid) { grid.innerHTML = builtinGridInner(); renderMath(grid); }
      btoggle.innerHTML = builtinToggleLabel();
      return;
    }
    const blvl = e.target.closest(".b-lvl-chip");
    if (blvl) { blvl.classList.toggle("active"); updateBuilderCount(); return; }
    const badd = e.target.closest("#b-add");
    if (badd) { runBuilderAdd(); return; }
    const rn = e.target.closest("[data-list-rename]");
    if (rn) {
      const l = getList(rn.dataset.listRename);
      if (l) { const name = prompt("Rename list:", l.name); if (name && name.trim()) { renameList(l.id, name); render(); } }
      return;
    }
    const del = e.target.closest("[data-list-delete]");
    if (del) {
      const l = getList(del.dataset.listDelete);
      if (l && confirm(`Delete the list “${l.name}”? The formulas themselves are not affected.`)) { deleteList(l.id); location.hash = "#/lists"; }
      return;
    }
    const clr = e.target.closest("[data-list-clear]");
    if (clr) {
      const l = getList(clr.dataset.listClear);
      if (l && confirm(`Remove all ${l.ids.length} formulas from “${l.name}”?`)) { l.ids = []; saveLists(); render(); }
      return;
    }
    if (e.target.closest("a")) return; // let real links (related items, back link) navigate
    const card = e.target.closest(".card[data-id]");
    if (card) {
      openFormula(card.dataset.id);
    }
  });

  // ---------- Bulk save (browsing / search / topic → a brand-new list) ----------
  // ---------- Study-list builder (filters → a new or existing list) ----------
  function builderMatchIds() {
    const val = id => { const el = document.getElementById(id); return el ? el.value : ""; };
    const sec = val("b-sec"), topic = val("b-topic"), imp = val("b-imp");
    const levels = [].slice.call(document.querySelectorAll(".b-lvl-chip.active")).map(c => c.dataset.blvl);
    return ALL.filter(e => {
      const f = e.formula;
      if (sec && e.section.id !== sec) return false;
      if (topic && !e.topics.some(t => t.id === topic)) return false;
      if (imp && f.importance !== imp) return false;
      if (levels.length && !levels.some(l => f.level.indexOf(l) !== -1)) return false;
      return true;
    }).map(e => e.formula.id);
  }
  function updateBuilderCount() {
    const el = document.getElementById("b-count");
    if (!el) return;
    const n = builderMatchIds().length;
    el.textContent = n + " match" + (n === 1 ? "" : "es");
    el.classList.toggle("none", n === 0);
  }
  function runBuilderAdd() {
    const ids = builderMatchIds();
    if (!ids.length) { toast("No formulas match those filters"); return; }
    const sel = document.getElementById("b-list");
    let listId = sel ? sel.value : "__new";
    if (listId === "__new") {
      const nn = document.getElementById("b-newname");
      const name = nn ? nn.value.trim() : "";
      if (!name) { if (nn) nn.focus(); toast("Name the new list first"); return; }
      listId = createList(name);
    }
    const l = getList(listId);
    if (!l) { toast("Pick a list to add to"); return; }
    const n = addManyToList(listId, ids);   // dedup: already-present ids aren't re-added
    const dup = ids.length - n;
    toast(`Added ${n} to ${listGlyph(l)} ${escapeAttr(l.name)}${dup ? ` &middot; ${dup} already there` : ""}`);
    location.hash = "#/list/" + listId;
    window.scrollTo({ top: 0 });
  }

  $content.addEventListener("change", e => {
    if (e.target.id === "b-sec") {
      const topicSel = document.getElementById("b-topic");
      if (topicSel) {
        const cur = topicSel.value;
        const stillValid = topicsInSection(e.target.value).some(t => t.id === cur);
        topicSel.innerHTML = topicOptionsHtml(e.target.value, stillValid ? cur : "");
      }
      updateBuilderCount();
      return;
    }
    if (e.target.id === "b-list") {
      const nn = document.getElementById("b-newname");
      if (nn) { const isNew = e.target.value === "__new"; nn.hidden = !isNew; if (isNew) nn.focus(); }
      return;
    }
    if (e.target.closest("#b-topic, #b-imp")) updateBuilderCount();
  });

  $content.addEventListener("submit", e => {
    const nf = e.target.closest("#lists-new-form");
    if (nf) {
      e.preventDefault();
      const inp = document.getElementById("lists-new-name");
      const name = inp ? inp.value.trim() : "";
      if (!name) { if (inp) inp.focus(); return; }
      location.hash = "#/list/" + createList(name);
    }
  });

  window.addEventListener("hashchange", () => {
    const route = getRoute();
    render();
    // Detail pages start at the top; returning to the list restores the
    // reader's previous scroll position.
    window.scrollTo({ top: route.type === "formula" ? 0 : listScrollY });
  });

  // ---------- Init ----------

  // We manage scroll position ourselves (see hashchange), so stop the browser
  // from also restoring scroll on back/forward and fighting us.
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  buildSidebar();
  buildLevelFilters();
  render();
})();
