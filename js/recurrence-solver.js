// Exact solver for first-order linear recurrences  a_n = r*a_{n-1} + f(n),
// where f(n) is a sum of polynomial x exponential terms (e.g. 3^n + 7n, n*2^n, n^2).
// Pure engine (window.RecurrenceSolver.solve) + interactive widget (mountWidget).
(function () {
  "use strict";

  // ---------- exact rationals ----------
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
  function F(n, d) {
    if (d === undefined) d = 1;
    if (d === 0) throw new Error("division by zero");
    if (d < 0) { n = -n; d = -d; }
    var g = gcd(n, d); return { n: n / g, d: d / g };
  }
  var F0 = F(0, 1), F1 = F(1, 1);
  function fadd(a, b) { return F(a.n * b.d + b.n * a.d, a.d * b.d); }
  function fsub(a, b) { return F(a.n * b.d - b.n * a.d, a.d * b.d); }
  function fmul(a, b) { return F(a.n * b.n, a.d * b.d); }
  function fdiv(a, b) { if (b.n === 0) throw new Error("division by zero"); return F(a.n * b.d, a.d * b.n); }
  function fneg(a) { return F(-a.n, a.d); }
  function fZero(a) { return a.n === 0; }
  function fEq(a, b) { return a.n === b.n && a.d === b.d; }
  function fInt(a) { return a.d === 1; }
  function ipow(x, k) { var r = 1; for (var i = 0; i < k; i++) r *= x; return r; }
  function fpowInt(a, k) {
    if (k >= 0) return F(ipow(a.n, k), ipow(a.d, k));
    if (a.n === 0) throw new Error("0 raised to a negative power");
    return F(ipow(a.d, -k), ipow(a.n, -k));
  }
  function fkey(a) { return a.n + "/" + a.d; }

  // ---------- polynomials in n (arrays of Fractions, index = degree) ----------
  function pTrim(p) { var q = p.slice(); while (q.length > 1 && fZero(q[q.length - 1])) q.pop(); return q; }
  function pDeg(p) { p = pTrim(p); return (p.length === 1 && fZero(p[0])) ? -1 : p.length - 1; }
  function pAdd(a, b) { var m = Math.max(a.length, b.length), r = []; for (var i = 0; i < m; i++) r.push(fadd(a[i] || F0, b[i] || F0)); return r; }
  function pMul(a, b) { var r = []; for (var i = 0; i < a.length + b.length - 1; i++) r.push(F0); for (var i = 0; i < a.length; i++) for (var j = 0; j < b.length; j++) r[i + j] = fadd(r[i + j], fmul(a[i], b[j])); return r; }
  function pEval(p, x) { var r = F0; for (var i = p.length - 1; i >= 0; i--) r = fadd(fmul(r, x), p[i]); return r; }

  // ---------- poly-exp value: Map(baseKey -> {base:Fraction, poly:[Fraction]}) ----------
  function peNew() { return new Map(); }
  function pePut(m, base, poly) {
    var k = fkey(base), e = m.get(k);
    if (e) e.poly = pAdd(e.poly, poly); else m.set(k, { base: base, poly: poly.slice() });
  }
  function peConst(c) { var m = peNew(); pePut(m, F1, [c]); return m; }
  function peN() { var m = peNew(); pePut(m, F1, [F0, F1]); return m; }
  function peClone(m) { var r = peNew(); m.forEach(function (e) { pePut(r, e.base, e.poly); }); return r; }
  function peAdd(a, b) { var r = peClone(a); b.forEach(function (e) { pePut(r, e.base, e.poly); }); return r; }
  function peNeg(a) { var r = peNew(); a.forEach(function (e) { pePut(r, e.base, e.poly.map(fneg)); }); return r; }
  function peMul(a, b) { var r = peNew(); a.forEach(function (ea) { b.forEach(function (eb) { pePut(r, fmul(ea.base, eb.base), pMul(ea.poly, eb.poly)); }); }); return r; }
  function peClean(m) { var r = peNew(); m.forEach(function (e) { var p = pTrim(e.poly); if (!(p.length === 1 && fZero(p[0]))) pePut(r, e.base, p); }); return r; }
  // Fraction if this PE is a plain constant, else null.
  function peConstFrac(m) {
    if (m.size === 0) return F0;
    if (m.size !== 1) return null;
    var e = m.get("1/1"); if (!e) return null;
    var p = pTrim(e.poly); return p.length === 1 ? p[0] : null;
  }
  // {c1,c0} if PE is (c1*n + c0), else null.
  function peLinear(m) {
    if (m.size === 0) return { c1: F0, c0: F0 };
    if (m.size !== 1) return null;
    var e = m.get("1/1"); if (!e) return null;
    var p = pTrim(e.poly); if (p.length > 2) return null;
    return { c1: p[1] || F0, c0: p[0] || F0 };
  }
  // x is an integer (the index n); evaluate the poly-exp there, exactly.
  function peEval(m, x) { var xf = F(x, 1), r = F0; m.forEach(function (e) { r = fadd(r, fmul(pEval(e.poly, xf), fpowInt(e.base, x))); }); return r; }

  // ---------- tokenizer + parser ----------
  function tokenize(s) {
    var t = [], i = 0;
    while (i < s.length) {
      var c = s[i];
      if (c === " " || c === "\t") { i++; continue; }
      if (c >= "0" && c <= "9" || c === ".") { var j = i; while (j < s.length && (s[j] >= "0" && s[j] <= "9" || s[j] === ".")) j++; t.push({ t: "num", v: s.slice(i, j) }); i = j; continue; }
      if (c === "n" || c === "N") { t.push({ t: "n" }); i++; continue; }
      if ("+-*/^()".indexOf(c) !== -1) { t.push({ t: c }); i++; continue; }
      throw new Error("unexpected character “" + c + "”");
    }
    return t;
  }
  function parse(s) {
    var toks = tokenize(s), pos = 0;
    function peek() { return toks[pos]; }
    function next() { return toks[pos++]; }
    function expr() {
      var node = term();
      while (peek() && (peek().t === "+" || peek().t === "-")) { var op = next().t; node = { type: op === "+" ? "add" : "sub", a: node, b: term() }; }
      return node;
    }
    function startsFactor(tk) { return tk && (tk.t === "num" || tk.t === "n" || tk.t === "("); }
    function term() {
      var node = unary();
      while (peek()) {
        if (peek().t === "*" || peek().t === "/") { var op = next().t; node = { type: op === "*" ? "mul" : "div", a: node, b: unary() }; }
        else if (startsFactor(peek())) { node = { type: "mul", a: node, b: unary() }; }  // implicit multiplication
        else break;
      }
      return node;
    }
    function unary() { if (peek() && peek().t === "-") { next(); return { type: "neg", a: unary() }; } if (peek() && peek().t === "+") { next(); return unary(); } return power(); }
    function power() { var base = atom(); if (peek() && peek().t === "^") { next(); return { type: "pow", a: base, b: unary() }; } return base; }
    function atom() {
      var tk = peek();
      if (!tk) throw new Error("unexpected end of expression");
      if (tk.t === "num") { next(); var v = parseFloat(tk.v); if (!isFinite(v)) throw new Error("bad number"); return { type: "num", val: decToFrac(tk.v) }; }
      if (tk.t === "n") { next(); return { type: "n" }; }
      if (tk.t === "(") { next(); var e = expr(); if (!peek() || peek().t !== ")") throw new Error("missing ')'"); next(); return e; }
      throw new Error("unexpected “" + tk.t + "”");
    }
    var node = expr();
    if (pos < toks.length) throw new Error("unexpected “" + (toks[pos].v || toks[pos].t) + "”");
    return node;
  }
  function decToFrac(str) {
    if (str.indexOf(".") === -1) return F(parseInt(str, 10), 1);
    var parts = str.split("."), dec = parts[1] || "", den = ipow(10, dec.length);
    return F(parseInt(parts[0] || "0", 10) * den + parseInt(dec || "0", 10), den);
  }

  // ---------- AST -> poly-exp ----------
  function evalPE(node) {
    switch (node.type) {
      case "num": return peConst(node.val);
      case "n": return peN();
      case "neg": return peNeg(evalPE(node.a));
      case "add": return peAdd(evalPE(node.a), evalPE(node.b));
      case "sub": return peAdd(evalPE(node.a), peNeg(evalPE(node.b)));
      case "mul": return peMul(evalPE(node.a), evalPE(node.b));
      case "div": {
        var dv = peConstFrac(evalPE(node.b));
        if (dv === null) throw new Error("can only divide by a constant");
        if (fZero(dv)) throw new Error("division by zero");
        return peMul(evalPE(node.a), peConst(fdiv(F1, dv)));
      }
      case "pow": return evalPow(node.a, node.b);
    }
    throw new Error("bad expression");
  }
  function evalPow(aNode, bNode) {
    var B = evalPE(bNode);
    var kc = peConstFrac(B);
    if (kc !== null && fInt(kc)) {
      var k = kc.n;
      if (k < 0) { var ac0 = peConstFrac(evalPE(aNode)); if (ac0 === null) throw new Error("negative power of a non-constant"); return peConst(fpowInt(ac0, k)); }
      var A = evalPE(aNode), res = peConst(F1);
      for (var i = 0; i < k; i++) res = peMul(res, A);
      return res;
    }
    var lin = peLinear(B);
    if (lin && !fZero(lin.c1)) {
      var ac = peConstFrac(evalPE(aNode));
      if (ac === null) throw new Error("an exponent uses n, so its base must be a constant");
      if (fZero(ac)) throw new Error("0 to a variable power");
      if (!fInt(lin.c1) || !fInt(lin.c0)) throw new Error("exponents in n must have integer coefficients");
      var m = peNew(); pePut(m, fpowInt(ac, lin.c1.n), [fpowInt(ac, lin.c0.n)]); return m;
    }
    throw new Error("unsupported exponent (use a constant integer, or an exponent linear in n)");
  }
  function parseConst(s) {
    var c = peConstFrac(peClean(evalPE(parse(s))));
    if (c === null) throw new Error("expected a constant number");
    return c;
  }

  // ---------- binomial ----------
  var BINOM = [];
  function binom(nn, kk) {
    if (kk < 0 || kk > nn) return 0;
    if (!BINOM[nn]) { BINOM[nn] = [1]; for (var k = 1; k <= nn; k++) BINOM[nn][k] = (BINOM[nn - 1] ? (BINOM[nn - 1][k - 1] || 0) + (BINOM[nn - 1][k] || 0) : (k === 0 ? 1 : 0)); }
    return BINOM[nn][kk] || 0;
  }

  // Particular solution R(n) (as poly) for one base b with forcing poly P, given multiplier r.
  // Solves  R(n)*b - r*R(n-1) = b*P(n).
  function solveBase(b, P, r) {
    P = pTrim(P);
    var d = pDeg(P);
    var res = fEq(b, r);
    var D = d + (res ? 1 : 0);
    var i, j;
    // matrix A[i][j], rhs[i], i,j in 0..D
    var A = [], rhs = [];
    for (i = 0; i <= D; i++) {
      A[i] = [];
      for (j = 0; j <= D; j++) {
        var v = (i === j) ? b : F0;
        if (j >= i) { var term = fmul(r, F(binom(j, i) * (((j - i) % 2) ? -1 : 1), 1)); v = fsub(v, term); }
        A[i][j] = v;
      }
      rhs[i] = fmul(b, P[i] || F0);
    }
    var c = []; for (i = 0; i <= D; i++) c[i] = F0;
    if (!res) {
      for (i = D; i >= 0; i--) {
        var acc = rhs[i];
        for (j = i + 1; j <= D; j++) acc = fsub(acc, fmul(A[i][j], c[j]));
        c[i] = fdiv(acc, A[i][i]);   // A[i][i] = b - r != 0
      }
    } else {
      c[0] = F0;  // constant term folds into the homogeneous C*r^n
      for (i = D - 1; i >= 0; i--) {
        var acc2 = rhs[i];
        for (j = i + 2; j <= D; j++) acc2 = fsub(acc2, fmul(A[i][j], c[j]));
        c[i + 1] = fdiv(acc2, A[i][i + 1]);  // A[i][i+1] = r*(i+1) != 0
      }
    }
    return c;
  }

  // ---------- LaTeX formatting ----------
  function fAbsTex(a) { var n = Math.abs(a.n); return a.d === 1 ? String(n) : "\\tfrac{" + n + "}{" + a.d + "}"; }
  function baseTex(b) {
    if (b.d === 1) return b.n < 0 ? "(" + b.n + ")" : String(b.n);
    var s = "\\tfrac{" + Math.abs(b.n) + "}{" + b.d + "}";
    return b.n < 0 ? "\\left(-" + s + "\\right)" : "\\left(" + s + "\\right)";
  }
  function monomials(pe) {
    var out = [];
    pe.forEach(function (e) {
      e.poly.forEach(function (c, j) {
        if (fZero(c)) return;
        out.push({ c: c, deg: j, base: e.base });
      });
    });
    out.sort(function (a, b) { var bb = (b.base.n / b.base.d) - (a.base.n / a.base.d); if (bb) return bb; return b.deg - a.deg; });
    return out;
  }
  function monoTex(m) {
    var nPart = m.deg === 0 ? "" : (m.deg === 1 ? "n" : "n^{" + m.deg + "}");
    var isOne = (m.base.n === 1 && m.base.d === 1);
    var bPart = isOne ? "" : baseTex(m.base) + "^{n}";
    var absOne = (Math.abs(m.c.n) === 1 && m.c.d === 1);
    var left = "";
    if (!(absOne && (nPart || bPart))) left += fAbsTex(m.c);
    left += nPart;
    var tex = bPart ? (left ? left + "\\cdot " + bPart : bPart) : left;
    return tex || "1";
  }
  function peTex(pe) {
    var ms = monomials(pe);
    if (!ms.length) return "0";
    var s = "";
    ms.forEach(function (m, i) {
      var neg = m.c.n < 0;
      if (i === 0) s += (neg ? "-" : "") + monoTex(m);
      else s += (neg ? " - " : " + ") + monoTex(m);
    });
    return s;
  }

  // ---------- solve ----------
  function solve(opts) {
    try {
      var r = parseConst(String(opts.r));
      var n0 = parseInt(opts.n0, 10); if (!isFinite(n0)) throw new Error("start index must be an integer");
      var a0 = parseConst(String(opts.a0));
      var forcing = peClean(evalPE(parse(opts.forcing && opts.forcing.trim() ? opts.forcing : "0")));

      var steps = [];
      steps.push({ label: "Homogeneous part", tex: "a_n^{(h)} = C\\cdot " + baseTex(r) + "^{n}" });

      var particular = peNew();
      forcing.forEach(function (e) {
        var c = solveBase(e.base, e.poly, r);
        var contrib = peNew(); pePut(contrib, e.base, c);
        particular = peAdd(particular, contrib);
        var isOne = (e.base.n === 1 && e.base.d === 1);
        var forceTex = peTex((function () { var m = peNew(); pePut(m, e.base, e.poly); return m; })());
        var partTex = peTex(peClean(contrib));
        steps.push({ label: "Forcing " + (isOne ? "polynomial" : baseTex(e.base) + "^n term") + (fEq(e.base, r) ? " (resonant with r)" : ""), tex: "\\text{from } " + forceTex + " \\;\\Rightarrow\\; " + partTex });
      });
      particular = peClean(particular);

      var generalTex = "a_n = " + (particular.size ? peTex(particular) + " + C\\cdot " + baseTex(r) + "^{n}" : "C\\cdot " + baseTex(r) + "^{n}");

      var C, closed;
      if (fZero(r)) {
        // a_n = f(n) for n >= n0+1; a_{n0} given.
        closed = peClone(particular);   // with r=0 the homogeneous term vanishes for n>=1
        C = F0;
      } else {
        var Pn0 = peEval(particular, n0);
        C = fdiv(fsub(a0, Pn0), fpowInt(r, n0));
        closed = peClone(particular); pePut(closed, r, [C]);
      }
      closed = peClean(closed);
      steps.push({ label: "Fit the initial condition", tex: "a_{" + n0 + "} = " + fToTex(a0) + " \\;\\Rightarrow\\; C = " + fToTex(C) });

      // numeric verification (with r=0 the recurrence isn't recursive, so a_{n0}
      // is a free value the formula needn't hit — start checking one step later)
      var rows = [], allMatch = true, prev = a0, N = n0 + 6, start = fZero(r) ? n0 + 1 : n0;
      for (var k = start; k <= N; k++) {
        var rec = (k === n0) ? a0 : fadd(fmul(r, prev), peEval(forcing, k));
        prev = rec;
        var cl = peEval(closed, k);
        var ok = fEq(rec, cl); if (!ok) allMatch = false;
        rows.push({ n: k, rec: fToPlain(rec), closed: fToPlain(cl), match: ok });
      }
      var note = fZero(r) ? "With r = 0 the sequence isn't recursive; the formula gives a_n = f(n) for n > " + n0 + " (a_" + n0 + " is just the given value)." : "";

      return {
        ok: true,
        closedLatex: "a_n = " + peTex(closed),
        generalLatex: generalTex,
        cLatex: "C = " + fToTex(C),
        steps: steps,
        check: { rows: rows, allMatch: allMatch },
        note: note
      };
    } catch (err) {
      return { ok: false, error: err.message || String(err) };
    }
  }
  function fToTex(a) { return a.n < 0 ? "-" + fAbsTex(a) : fAbsTex(a); }
  function fToPlain(a) { return a.d === 1 ? String(a.n) : a.n + "/" + a.d; }

  // ---------- interactive widget ----------
  function mountWidget(host) {
    if (!host) return;
    host.innerHTML =
      '<div class="rsolver">' +
      '<h4>Solve your own</h4>' +
      '<p class="rsolver-eq">a<sub>n</sub> = ' +
      '<input class="rs-in rs-r" type="text" value="5" aria-label="coefficient r" spellcheck="false"> &middot; a<sub>n&minus;1</sub> + ' +
      '<input class="rs-in rs-f" type="text" value="3^n + 7n" aria-label="forcing term f(n)" spellcheck="false"></p>' +
      '<p class="rsolver-eq">with a<sub><input class="rs-in rs-n0" type="text" value="0" aria-label="start index"></sub> = ' +
      '<input class="rs-in rs-a0" type="text" value="2" aria-label="initial value" spellcheck="false">' +
      '<button class="rs-go">Solve</button></p>' +
      '<div class="rs-out"></div>' +
      '<p class="rs-hint">Forcing supports sums of powers of <em>n</em> and exponentials: <code>3^n</code>, <code>7n</code>, <code>n^2</code>, <code>n*2^n</code>, <code>(-1)^n</code>&hellip;</p>' +
      '</div>';
    var q = function (c) { return host.querySelector(c); };
    var out = q(".rs-out");
    function run() {
      var res = solve({ r: q(".rs-r").value, forcing: q(".rs-f").value, n0: q(".rs-n0").value, a0: q(".rs-a0").value });
      if (!res.ok) { out.innerHTML = '<div class="rs-err">Couldn’t parse that: ' + escapeHtml(res.error) + "</div>"; return; }
      var html = '<div class="rs-answer"><div class="rs-answer-label">Closed form</div><div class="rs-formula" data-tex="' + escapeAttr(res.closedLatex) + '"></div></div>';
      if (res.note) html += '<div class="rs-note">' + escapeHtml(res.note) + "</div>";
      html += '<details class="rs-steps"><summary>Show the working</summary><div class="rs-general rs-formula" data-tex="' + escapeAttr(res.generalLatex) + '"></div>';
      res.steps.forEach(function (s) { html += '<div class="rs-step"><span class="rs-step-label">' + escapeHtml(s.label) + '</span><span class="rs-formula" data-tex="' + escapeAttr(s.tex) + '"></span></div>'; });
      html += "</details>";
      html += '<table class="rs-check"><thead><tr><th>n</th><th>by recurrence</th><th>by formula</th></tr></thead><tbody>';
      res.check.rows.forEach(function (r) { html += "<tr><td>" + r.n + "</td><td>" + r.rec + "</td><td>" + r.closed + (r.match ? "" : " ✗") + "</td></tr>"; });
      html += "</tbody></table>";
      html += '<div class="rs-verify ' + (res.check.allMatch ? "ok" : "bad") + '">' + (res.check.allMatch ? "✓ formula matches the recurrence" : "✗ mismatch — please report") + "</div>";
      out.innerHTML = html;
      if (window.katex) host.querySelectorAll(".rs-formula[data-tex]").forEach(function (el) {
        try { katex.render(el.dataset.tex, el, { throwOnError: false, displayMode: !el.classList.contains("rs-inline") }); } catch (e) { el.textContent = el.dataset.tex; }
      });
    }
    q(".rs-go").addEventListener("click", run);
    host.querySelectorAll(".rs-in").forEach(function (inp) { inp.addEventListener("keydown", function (e) { if (e.key === "Enter") run(); }); });
    run();
  }
  function escapeHtml(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function escapeAttr(s) { return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"); }

  window.RecurrenceSolver = { solve: solve, mountWidget: mountWidget };
  window.MATH_WIDGETS = window.MATH_WIDGETS || {};
  window.MATH_WIDGETS["first-order-recurrence"] = { mount: mountWidget };
})();
