// Interactive "play with it" tools (non-geometry), registered into window.MATH_WIDGETS
// keyed by formula id. Each mount(host) builds a small self-contained widget.
(function () {
  "use strict";
  var W = window.MATH_WIDGETS = window.MATH_WIDGETS || {};
  function K(tex, disp) { try { return window.katex ? katex.renderToString(tex, { throwOnError: false, displayMode: !!disp }) : tex; } catch (e) { return tex; } }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function r2(x) { return Math.round(x * 100) / 100; }

  // ---------- roots of unity ----------
  W["roots-of-unity"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Roots of unity</div>' +
      '<div class="tool-row">n = <input class="tool-in ru-n" type="number" min="1" max="24" value="7"> ' +
      '<label><input type="checkbox" class="ru-poly" checked> connect them</label></div>' +
      '<svg viewBox="0 0 300 300" class="tool-svg ru-svg"></svg><div class="tool-cap ru-cap"></div></div>';
    var svg = host.querySelector(".ru-svg"), cap = host.querySelector(".ru-cap");
    function draw() {
      var n = Math.max(1, Math.min(24, parseInt(host.querySelector(".ru-n").value, 10) || 1));
      var cx = 150, cy = 150, R = 110, poly = host.querySelector(".ru-poly").checked;
      var pts = [];
      // angle 0 = the real number 1, on the positive real axis; counterclockwise (screen y is down)
      for (var k = 0; k < n; k++) { var a = 2 * Math.PI * k / n; pts.push([cx + R * Math.cos(a), cy - R * Math.sin(a)]); }
      var s = '<circle cx="150" cy="150" r="110" class="gc"/>' +
        '<line x1="30" y1="150" x2="270" y2="150" class="gl-ax"/><line x1="150" y1="30" x2="150" y2="270" class="gl-ax"/>';
      if (poly && n > 1) s += '<polygon points="' + pts.map(function (p) { return r2(p[0]) + "," + r2(p[1]); }).join(" ") + '" class="gtri-fill"/>';
      pts.forEach(function (p) { s += '<circle cx="' + r2(p[0]) + '" cy="' + r2(p[1]) + '" r="4.5" class="gd-acc"/>'; });
      s += '<text x="264" y="145" class="gt">Re</text><text x="156" y="42" class="gt">Im</text>';
      svg.innerHTML = s;
      cap.innerHTML = "The " + n + " complex numbers " + K("\\omega^k=e^{2\\pi i k/" + n + "}") + ", k = 0…" + (n - 1) + ". " + (n > 1 ? "They sum to 0 and are the vertices of a regular " + n + "-gon." : "Just 1.");
    }
    host.querySelector(".ru-n").addEventListener("input", draw);
    host.querySelector(".ru-poly").addEventListener("change", draw);
    draw();
  } };

  // ---------- polynomial roots + Vieta ----------
  function cadd(a, b) { return { re: a.re + b.re, im: a.im + b.im }; }
  function csub(a, b) { return { re: a.re - b.re, im: a.im - b.im }; }
  function cmul(a, b) { return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re }; }
  function cdiv(a, b) { var d = b.re * b.re + b.im * b.im || 1e-30; return { re: (a.re * b.re + a.im * b.im) / d, im: (a.im * b.re - a.re * b.im) / d }; }
  function cabs(a) { return Math.hypot(a.re, a.im); }
  function cpow(z, k) { var r = { re: 1, im: 0 }; for (var i = 0; i < k; i++) r = cmul(r, z); return r; }
  function polyRoots(coef) {
    while (coef.length > 1 && coef[0] === 0) coef = coef.slice(1);
    var n = coef.length - 1; if (n < 1) return [];
    var lead = coef[0], c = coef.map(function (v) { return v / lead; });
    function pEval(z) { var r = { re: 0, im: 0 }; for (var i = 0; i < c.length; i++) r = cadd(cmul(r, z), { re: c[i], im: 0 }); return r; }
    var roots = [], seed = { re: 0.4, im: 0.9 };
    for (var k = 0; k < n; k++) roots.push(cpow(seed, k));
    for (var it = 0; it < 300; it++) {
      var maxd = 0;
      for (var i = 0; i < n; i++) {
        var den = { re: 1, im: 0 };
        for (var j = 0; j < n; j++) if (j !== i) den = cmul(den, csub(roots[i], roots[j]));
        var delta = cdiv(pEval(roots[i]), den);
        roots[i] = csub(roots[i], delta); maxd = Math.max(maxd, cabs(delta));
      }
      if (maxd < 1e-13) break;
    }
    return roots.map(function (z) { return { re: Math.abs(z.re) < 1e-6 ? 0 : z.re, im: Math.abs(z.im) < 1e-6 ? 0 : z.im }; });
  }
  function croot(z) { if (z.im === 0) return "" + r2(z.re); var s = z.im < 0 ? "-" : "+"; return r2(z.re) + " " + s + " " + Math.abs(r2(z.im)) + "i"; }
  W["vietas-general"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Polynomial roots &amp; Vieta&rsquo;s relations</div>' +
      '<div class="tool-row">coefficients (high→low): <input class="tool-in vt-c" type="text" value="1 -6 11 -6" style="width:200px"> <button class="tool-btn2 vt-go">Solve</button></div>' +
      '<div class="tool-out vt-out"></div></div>';
    var out = host.querySelector(".vt-out");
    function run() {
      var raw = host.querySelector(".vt-c").value.trim().split(/[\s,]+/).map(Number);
      if (raw.some(function (x) { return !isFinite(x); }) || raw.length < 2) { out.innerHTML = '<div class="tool-err">Enter 2+ numeric coefficients, e.g. <code>1 -6 11 -6</code>.</div>'; return; }
      var roots = polyRoots(raw.slice());
      var n = raw.length - 1, an = raw[0];
      var vsum = -raw[1] / an, vprod = (n % 2 ? -1 : 1) * raw[raw.length - 1] / an;
      var rs = roots.reduce(function (a, z) { return cadd(a, z); }, { re: 0, im: 0 });
      var rp = roots.reduce(function (a, z) { return cmul(a, z); }, { re: 1, im: 0 });
      var polyTex = raw.map(function (a, i) { var p = n - i; if (a === 0) return ""; var t = (i && a > 0 ? "+" : "") + (Math.abs(a) === 1 && p ? (a < 0 ? "-" : "") : a) + (p > 1 ? "x^{" + p + "}" : p === 1 ? "x" : ""); return t; }).filter(Boolean).join("");
      out.innerHTML =
        '<div class="tool-sub">' + K(polyTex + "=0", true) + "</div>" +
        '<svg viewBox="0 0 300 220" class="tool-svg vt-plot"></svg>' +
        '<table class="tool-tbl"><tr><th>root</th></tr>' + roots.map(function (z) { return "<tr><td>" + croot(z) + "</td></tr>"; }).join("") + "</table>" +
        '<div class="tool-cap">Vieta: sum of roots = −a₍ₙ₋₁₎/aₙ = <b>' + r2(vsum) + "</b> (roots add to " + croot({ re: r2(rs.re), im: r2(rs.im) }) + "); product = (−1)ⁿa₀/aₙ = <b>" + r2(vprod) + "</b> (roots multiply to " + croot({ re: r2(rp.re), im: r2(rp.im) }) + ").</div>";
      // plot on complex plane
      var svg = out.querySelector(".vt-plot");
      var mx = 1; roots.forEach(function (z) { mx = Math.max(mx, Math.abs(z.re), Math.abs(z.im)); }); mx *= 1.25;
      var sc = 95 / mx, cx = 150, cy = 110;
      var s = '<line x1="20" y1="110" x2="280" y2="110" class="gl-ax"/><line x1="150" y1="15" x2="150" y2="205" class="gl-ax"/><text x="274" y="105" class="gt">Re</text><text x="156" y="24" class="gt">Im</text>';
      roots.forEach(function (z) { s += '<circle cx="' + r2(cx + z.re * sc) + '" cy="' + r2(cy - z.im * sc) + '" r="4.5" class="gd-acc"/>'; });
      svg.innerHTML = s;
    }
    host.querySelector(".vt-go").addEventListener("click", run);
    host.querySelector(".vt-c").addEventListener("keydown", function (e) { if (e.key === "Enter") run(); });
    run();
  } };

  // ---------- Pascal's triangle ----------
  W["pascals-identity"] = { mount: function (host) {
    var N = 12;
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Pascal&rsquo;s triangle</div>' +
      '<div class="tool-row">colour: <select class="tool-in pt-mode"><option value="0">values</option><option value="2">mod 2 (Sierpiński)</option><option value="3">mod 3</option><option value="5">mod 5</option></select></div>' +
      '<div class="pt-grid"></div><div class="tool-cap pt-cap">Hover a cell to see Pascal&rsquo;s identity.</div></div>';
    var grid = host.querySelector(".pt-grid"), cap = host.querySelector(".pt-cap");
    var C = []; for (var n = 0; n <= N; n++) { C[n] = []; for (var k = 0; k <= n; k++) C[n][k] = (k === 0 || k === n) ? 1 : C[n - 1][k - 1] + C[n - 1][k]; }
    function build() {
      var mode = parseInt(host.querySelector(".pt-mode").value, 10);
      var html = "";
      for (var n = 0; n <= N; n++) {
        html += '<div class="pt-row">';
        for (var k = 0; k <= n; k++) {
          var v = C[n][k], cls = "pt-cell";
          if (mode) { var m = ((v % mode) + mode) % mode; cls += m === 0 ? " pt-z" : " pt-m" + Math.min(m, 4); }
          html += '<span class="' + cls + '" data-n="' + n + '" data-k="' + k + '">' + (mode ? (((v % mode) + mode) % mode) : v) + "</span>";
        }
        html += "</div>";
      }
      grid.innerHTML = html;
    }
    build();
    host.querySelector(".pt-mode").addEventListener("change", build);
    grid.addEventListener("mouseover", function (e) {
      var c = e.target.closest(".pt-cell"); if (!c) return;
      grid.querySelectorAll(".hl,.hl2").forEach(function (x) { x.classList.remove("hl", "hl2"); });
      var n = +c.dataset.n, k = +c.dataset.k; c.classList.add("hl");
      var sel = function (nn, kk) { return grid.querySelector('.pt-cell[data-n="' + nn + '"][data-k="' + kk + '"]'); };
      var p1 = sel(n - 1, k - 1), p2 = sel(n - 1, k);
      if (p1) p1.classList.add("hl2"); if (p2) p2.classList.add("hl2");
      cap.innerHTML = (p1 && p2)
        ? K("\\binom{" + n + "}{" + k + "}=\\binom{" + (n - 1) + "}{" + (k - 1) + "}+\\binom{" + (n - 1) + "}{" + k + "}=" + C[n - 1][k - 1] + "+" + C[n - 1][k] + "=" + C[n][k])
        : K("\\binom{" + n + "}{" + k + "}=" + C[n][k]) + " (edge)";
    });
  } };

  // ---------- modular power cycle ----------
  function egcd(a, b) { if (!b) return [a, 1, 0]; var r = egcd(b, a % b); return [r[0], r[2], r[1] - Math.floor(a / b) * r[2]]; }
  W["multiplicative-order"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Powers of a modulo m</div>' +
      '<div class="tool-row">a = <input class="tool-in mp-a" type="number" value="3" style="width:60px"> mod <input class="tool-in mp-m" type="number" value="7" style="width:60px"> <button class="tool-btn2 mp-go">Go</button></div>' +
      '<div class="tool-out mp-out"></div></div>';
    var out = host.querySelector(".mp-out");
    function run() {
      var a = parseInt(host.querySelector(".mp-a").value, 10), m = parseInt(host.querySelector(".mp-m").value, 10);
      if (!(m > 1) || !isFinite(a)) { out.innerHTML = '<div class="tool-err">Need an integer a and modulus m > 1.</div>'; return; }
      a = ((a % m) + m) % m;
      var seq = [1 % m], seen = { "1": 0 }, cur = 1 % m, cycleStart = -1;
      for (var k = 1; k <= 200; k++) { cur = (cur * a) % m; if (seen[cur] !== undefined) { cycleStart = seen[cur]; break; } seen[cur] = k; seq.push(cur); }
      var g = egcd(a, m)[0];
      var html = '<div class="mp-seq">' + seq.map(function (v, i) { return '<span class="mp-cell' + (cycleStart >= 0 && i >= cycleStart ? " mp-cyc" : "") + '">' + v + "</span>"; }).join('<span class="mp-arrow">→</span>') + "</div>";
      if (g === 1) { var ord = seq.length - (cycleStart <= 0 ? 0 : cycleStart); // cycle returns to a^0 = 1
        html += '<div class="tool-cap">gcd(a, m) = 1, so a is invertible. The powers cycle with <b>order ' + ord + '</b> — the smallest k with a<sup>k</sup> ≡ 1.</div>'; }
      else html += '<div class="tool-cap">gcd(a, m) = ' + g + " ≠ 1, so a isn&rsquo;t invertible; the powers fall into a cycle that never returns to 1.</div>";
      out.innerHTML = html;
    }
    host.querySelector(".mp-go").addEventListener("click", run);
    host.querySelectorAll(".mp-a,.mp-m").forEach(function (i) { i.addEventListener("keydown", function (e) { if (e.key === "Enter") run(); }); });
    run();
  } };

  // ---------- Euclidean algorithm + Bézout ----------
  W["euclidean-algorithm"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Euclidean algorithm with Bézout coefficients</div>' +
      '<div class="tool-row">a = <input class="tool-in eu-a" type="number" value="240" style="width:80px"> b = <input class="tool-in eu-b" type="number" value="46" style="width:80px"> <button class="tool-btn2 eu-go">Run</button></div>' +
      '<div class="tool-out eu-out"></div></div>';
    var out = host.querySelector(".eu-out");
    function run() {
      var a0 = Math.abs(parseInt(host.querySelector(".eu-a").value, 10)), b0 = Math.abs(parseInt(host.querySelector(".eu-b").value, 10));
      if (!isFinite(a0) || !isFinite(b0) || (!a0 && !b0)) { out.innerHTML = '<div class="tool-err">Enter two integers.</div>'; return; }
      var rows = [], a = a0, b = b0;
      while (b) { var q = Math.floor(a / b), r = a - q * b; rows.push([a, q, b, r]); a = b; b = r; }
      var e = egcd(a0, b0), g = e[0], x = e[1], y = e[2];
      out.innerHTML =
        '<table class="tool-tbl"><tr><th>a</th><th>=</th><th>q</th><th>· b</th><th>+ r</th></tr>' +
        rows.map(function (rw) { return "<tr><td>" + rw[0] + "</td><td>=</td><td>" + rw[1] + "</td><td>· " + rw[2] + "</td><td>+ " + rw[3] + "</td></tr>"; }).join("") + "</table>" +
        '<div class="tool-cap">gcd(' + a0 + ", " + b0 + ") = <b>" + g + "</b>, and Bézout: " + K(a0 + "\\cdot(" + x + ")+" + b0 + "\\cdot(" + y + ")=" + g) + ".</div>";
    }
    host.querySelector(".eu-go").addEventListener("click", run);
    host.querySelectorAll(".eu-a,.eu-b").forEach(function (i) { i.addEventListener("keydown", function (e) { if (e.key === "Enter") run(); }); });
    run();
  } };

  // ---------- Chicken McNugget / Frobenius ----------
  function gcd2(a, b) { while (b) { var t = a % b; a = b; b = t; } return a; }
  W["chicken-mcnugget"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Which totals are reachable?</div>' +
      '<div class="tool-row">a = <input class="tool-in cm-a" type="number" value="5" style="width:60px"> b = <input class="tool-in cm-b" type="number" value="8" style="width:60px"> <button class="tool-btn2 cm-go">Show</button></div>' +
      '<div class="tool-out cm-out"></div></div>';
    var out = host.querySelector(".cm-out");
    function run() {
      var a = parseInt(host.querySelector(".cm-a").value, 10), b = parseInt(host.querySelector(".cm-b").value, 10);
      if (!(a > 0) || !(b > 0)) { out.innerHTML = '<div class="tool-err">Enter positive integers.</div>'; return; }
      if (gcd2(a, b) !== 1) { out.innerHTML = '<div class="tool-cap">gcd(' + a + ", " + b + ") = " + gcd2(a, b) + " ≠ 1 — only multiples of the gcd are reachable, so infinitely many totals are impossible. Try coprime a, b.</div>"; return; }
      var frob = a * b - a - b;
      var impossibleCount = (a - 1) * (b - 1) / 2;
      if (frob > 20000) {
        out.innerHTML = '<div class="tool-cap">Frobenius number = ab − a − b = <b>' + frob + '</b> — the largest total you can’t make; every total above it is reachable, and exactly (a−1)(b−1)/2 = <b>' + impossibleCount + '</b> totals are impossible. (Grid hidden — the numbers are too large to draw.)</div>';
        return;
      }
      var top = frob + 2;                                     // everything past frob is reachable
      var reach = []; for (var i = 0; i <= top; i++) reach[i] = false; reach[0] = true;
      for (var i = 0; i <= top; i++) if (reach[i]) { if (i + a <= top) reach[i + a] = true; if (i + b <= top) reach[i + b] = true; }
      function cell(n) { return '<span class="cm-cell ' + (reach[n] ? "cm-yes" : "cm-no") + (n === frob ? " cm-frob" : "") + '">' + n + "</span>"; }
      var ELL = '<span class="cm-ell">…</span>', RUN = 6, HEAD = 24;
      // Render [lo,hi], collapsing long runs of reachable (green) cells so the strip stays short.
      function range(lo, hi) {
        var s = "", n = lo;
        while (n <= hi) {
          if (reach[n]) {
            var j = n; while (j <= hi && reach[j]) j++;
            if (j - n > RUN) { s += cell(n) + cell(n + 1) + ELL + cell(j - 2) + cell(j - 1); }
            else { for (var t = n; t < j; t++) s += cell(t); }
            n = j;
          } else { s += cell(n); n++; }
        }
        return s;
      }
      var cells;
      if (top <= 44 || frob - 10 <= HEAD) { cells = range(0, top); }          // short enough: show the whole thing
      else { cells = range(0, HEAD) + ELL + range(frob - 9, top); }           // first few … last few (around Frobenius)
      out.innerHTML = '<div class="cm-grid">' + cells + '<span class="cm-ell">… every total &gt; ' + frob + ' is reachable</span></div>' +
        '<div class="tool-cap">Largest impossible total (Frobenius number) = ab − a − b = <b>' + frob + '</b> (outlined). Exactly (a−1)(b−1)/2 = <b>' + impossibleCount + '</b> totals are impossible (red).</div>';
    }
    host.querySelector(".cm-go").addEventListener("click", run);
    host.querySelectorAll(".cm-a,.cm-b").forEach(function (i) { i.addEventListener("keydown", function (e) { if (e.key === "Enter") run(); }); });
    run();
  } };

  // ---------- function grapher ----------
  function makeEval(expr) {
    // tokenize
    var s = expr.replace(/\s+/g, ""), i = 0;
    function peek() { return s[i]; }
    function num() { var j = i; while (i < s.length && /[0-9.]/.test(s[i])) i++; return parseFloat(s.slice(j, i)); }
    var FUNCS = { sin: Math.sin, cos: Math.cos, tan: Math.tan, sqrt: Math.sqrt, abs: Math.abs, ln: Math.log, log: function (v) { return Math.log(v) / Math.LN10; }, exp: Math.exp };
    function parseE(x) {
      function atom() {
        if (s[i] === "(") { i++; var v = expr2(); if (s[i] === ")") i++; return v; }
        if (/[0-9.]/.test(s[i])) return num();
        var j = i; while (i < s.length && /[a-z]/i.test(s[i])) i++;
        var name = s.slice(j, i);
        if (name === "x") return x;
        if (name === "pi") return Math.PI;
        if (name === "e") return Math.E;
        if (FUNCS[name]) { return FUNCS[name](unary()); }
        throw new Error(name ? "unknown '" + name + "'" : "unexpected '" + (s[i] || "end") + "'");
      }
      // unary minus binds looser than ^, so -x^2 = -(x^2)
      function powE() { var b = atom(); if (s[i] === "^") { i++; return Math.pow(b, unary()); } return b; }
      function unary() { if (s[i] === "-") { i++; return -unary(); } if (s[i] === "+") { i++; return unary(); } return powE(); }
      function termE() { var v = unary(); while (true) { if (s[i] === "*") { i++; v *= unary(); } else if (s[i] === "/") { i++; v /= unary(); } else if (/[0-9.(a-z]/i.test(s[i] || "") && s[i] !== ")") { v *= unary(); } else break; } return v; }
      function expr2() { var v = termE(); while (s[i] === "+" || s[i] === "-") { var op = s[i++]; var t = termE(); v = op === "+" ? v + t : v - t; } return v; }
      i = 0; var r = expr2(); if (i < s.length) throw new Error("unexpected '" + s[i] + "'"); return r;
    }
    return function (x) { return parseE(x); };
  }
  W["vertex-form"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Function grapher</div>' +
      '<div class="tool-row">f(x) = <input class="tool-in fg-f" type="text" value="(x-2)^2 - 3" style="width:180px"> x ∈ [<input class="tool-in fg-lo" type="number" value="-6" style="width:52px">, <input class="tool-in fg-hi" type="number" value="6" style="width:52px">] <button class="tool-btn2 fg-go">Plot</button></div>' +
      '<svg viewBox="0 0 460 300" class="tool-svg fg-svg"></svg><div class="tool-cap fg-cap"></div></div>';
    var svg = host.querySelector(".fg-svg"), cap = host.querySelector(".fg-cap");
    function run() {
      var lo = parseFloat(host.querySelector(".fg-lo").value), hi = parseFloat(host.querySelector(".fg-hi").value);
      if (!(hi > lo)) { cap.innerHTML = '<span class="tool-err">Need x-min &lt; x-max.</span>'; return; }
      var f; try { f = makeEval(host.querySelector(".fg-f").value); f(0); } catch (e) { cap.innerHTML = '<span class="tool-err">Can’t parse f(x): ' + esc(e.message) + "</span>"; svg.innerHTML = ""; return; }
      var Wd = 460, Ht = 300, xs = [], ys = [];
      for (var k = 0; k <= 400; k++) { var x = lo + (hi - lo) * k / 400; var y = f(x); xs.push(x); ys.push(y); }
      var fy = ys.filter(function (v) { return isFinite(v); });
      if (!fy.length) { cap.innerHTML = '<span class="tool-err">f(x) is undefined on this range.</span>'; svg.innerHTML = ""; return; }
      fy.sort(function (a, b) { return a - b; });
      var ymin = fy[Math.floor(fy.length * 0.02)], ymax = fy[Math.floor(fy.length * 0.98)];
      if (ymin === ymax) { ymin -= 1; ymax += 1; }
      var pad = (ymax - ymin) * 0.1; ymin -= pad; ymax += pad;
      var X = function (x) { return 30 + (x - lo) / (hi - lo) * (Wd - 45); };
      var Y = function (y) { return Ht - 25 - (y - ymin) / (ymax - ymin) * (Ht - 45); };
      var s = "";
      var x0 = (0 >= lo && 0 <= hi) ? X(0) : null, y0 = (0 >= ymin && 0 <= ymax) ? Y(0) : null;
      if (y0 !== null) s += '<line x1="30" y1="' + r2(y0) + '" x2="' + (Wd - 15) + '" y2="' + r2(y0) + '" class="gl-ax"/>';
      if (x0 !== null) s += '<line x1="' + r2(x0) + '" y1="15" x2="' + r2(x0) + '" y2="' + (Ht - 25) + '" class="gl-ax"/>';
      var d = "", pen = false;
      for (var k2 = 0; k2 < xs.length; k2++) {
        var yy = ys[k2];
        if (!isFinite(yy) || yy < ymin - 100 * (ymax - ymin) || yy > ymax + 100 * (ymax - ymin)) { pen = false; continue; }
        d += (pen ? "L" : "M") + r2(X(xs[k2])) + " " + r2(Y(yy)) + " "; pen = true;
      }
      s += '<path d="' + d + '" class="fg-curve"/>';
      s += '<text x="' + (Wd - 14) + '" y="' + ((y0 !== null ? y0 : Ht - 25) - 4) + '" class="gt">x</text>';
      svg.innerHTML = s;
      cap.innerHTML = "y ranges about [" + r2(ymin) + ", " + r2(ymax) + "] on this window.";
    }
    host.querySelector(".fg-go").addEventListener("click", run);
    host.querySelectorAll(".fg-f,.fg-lo,.fg-hi").forEach(function (i) { i.addEventListener("keydown", function (e) { if (e.key === "Enter") run(); }); });
    run();
  } };

  // ---------- base converter ----------
  W["base-conversion"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Base converter</div>' +
      '<div class="tool-row"><input class="tool-in bc-v" type="text" value="2024" style="width:120px"> from base <input class="tool-in bc-from" type="number" value="10" min="2" max="36" style="width:56px"> → base <input class="tool-in bc-to" type="number" value="2" min="2" max="36" style="width:56px"> <button class="tool-btn2 bc-go">Convert</button></div>' +
      '<div class="tool-out bc-out"></div></div>';
    var out = host.querySelector(".bc-out");
    function run() {
      var v = host.querySelector(".bc-v").value.trim().toLowerCase();
      var fb = parseInt(host.querySelector(".bc-from").value, 10), tb = parseInt(host.querySelector(".bc-to").value, 10);
      if (!(fb >= 2 && fb <= 36 && tb >= 2 && tb <= 36)) { out.innerHTML = '<div class="tool-err">Bases must be 2–36.</div>'; return; }
      var neg = v[0] === "-"; if (neg) v = v.slice(1);
      var num = 0, ok = v.length > 0;
      for (var i = 0; i < v.length; i++) { var d = parseInt(v[i], 36); if (isNaN(d) || d >= fb) { ok = false; break; } num = num * fb + d; }
      if (!ok) { out.innerHTML = '<div class="tool-err">“' + esc(host.querySelector(".bc-v").value) + '” isn’t a valid base-' + fb + " number.</div>"; return; }
      var res = num === 0 ? "0" : num.toString(tb);
      out.innerHTML = '<div class="tool-sub">' + (neg ? "-" : "") + esc(v) + "<sub>" + fb + "</sub> = <b>" + (neg ? "-" : "") + res.toUpperCase() + "</b><sub>" + tb + "</sub></div>" +
        '<div class="tool-cap">(decimal value: ' + (neg ? "-" : "") + num + ")</div>";
    }
    host.querySelector(".bc-go").addEventListener("click", run);
    host.querySelectorAll(".bc-v,.bc-from,.bc-to").forEach(function (i) { i.addEventListener("keydown", function (e) { if (e.key === "Enter") run(); }); });
    run();
  } };

  // ===== shared helpers for the batch below =====
  function factorize(n) { n = Math.abs(n); var f = []; for (var d = 2; d * d <= n; d++) { if (n % d === 0) { var e = 0; while (n % d === 0) { n /= d; e++; } f.push([d, e]); } } if (n > 1) f.push([n, 1]); return f; }
  function factorTex(f) { return f.length ? f.map(function (pe) { return pe[1] === 1 ? pe[0] : pe[0] + "^{" + pe[1] + "}"; }).join(" \\cdot ") : "1"; }
  function nCr(n, k) { if (k < 0 || k > n) return 0; k = Math.min(k, n - k); var r = 1; for (var i = 0; i < k; i++) r = r * (n - i) / (i + 1); return Math.round(r); }
  function nPr(n, k) { if (k < 0 || k > n) return 0; var r = 1; for (var i = 0; i < k; i++) r *= (n - i); return r; }
  function isPrime(n) { if (n < 2) return false; for (var d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; }
  function modpow(b, e, m) { b %= m; if (b < 0) b += m; var r = 1 % m; while (e > 0) { if (e & 1) r = r * b % m; b = b * b % m; e = Math.floor(e / 2); } return r; }
  function wireEnter(host, sel, run) { host.querySelectorAll(sel).forEach(function (i) { i.addEventListener("keydown", function (e) { if (e.key === "Enter") run(); }); }); }
  function plotAxes(W, H, x0, y0) { var s = ""; if (y0 != null) s += '<line x1="24" y1="' + r2(y0) + '" x2="' + (W - 8) + '" y2="' + r2(y0) + '" class="gl-ax"/>'; if (x0 != null) s += '<line x1="' + r2(x0) + '" y1="10" x2="' + r2(x0) + '" y2="' + (H - 18) + '" class="gl-ax"/>'; return s; }

  // ---------- quadratic formula ----------
  W["quadratic-formula"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Roots, vertex &amp; discriminant</div>' +
      '<div class="tool-row">y = <input class="tool-in q-a" type="number" value="1" style="width:56px">x² + <input class="tool-in q-b" type="number" value="-3" style="width:56px">x + <input class="tool-in q-c" type="number" value="-4" style="width:56px"> <button class="tool-btn2 q-go">Plot</button></div>' +
      '<svg viewBox="0 0 440 300" class="tool-svg q-svg"></svg><div class="tool-out q-out"></div></div>';
    var svg = host.querySelector(".q-svg"), out = host.querySelector(".q-out");
    function run() {
      var a = +host.querySelector(".q-a").value, b = +host.querySelector(".q-b").value, c = +host.querySelector(".q-c").value;
      if (!a) { out.innerHTML = '<div class="tool-err">a can’t be 0 (that’s a line, not a parabola).</div>'; svg.innerHTML = ""; return; }
      var disc = b * b - 4 * a * c, vx = -b / (2 * a), vy = c - b * b / (4 * a);
      var f = function (x) { return a * x * x + b * x + c; };
      var span = disc > 0 ? Math.sqrt(disc) / Math.abs(a) : 4; var lo = vx - span - 2, hi = vx + span + 2;
      var Wd = 440, Ht = 300, xs = [], ys = [];
      for (var k = 0; k <= 300; k++) { var x = lo + (hi - lo) * k / 300; xs.push(x); ys.push(f(x)); }
      var ymin = Math.min(vy, f(lo), f(hi)), ymax = Math.max(vy, f(lo), f(hi)); if (ymin === ymax) { ymin--; ymax++; }
      var pad = (ymax - ymin) * 0.12; ymin -= pad; ymax += pad;
      var X = function (x) { return 24 + (x - lo) / (hi - lo) * (Wd - 34); }, Y = function (y) { return Ht - 18 - (y - ymin) / (ymax - ymin) * (Ht - 30); };
      var s = plotAxes(Wd, Ht, (0 >= lo && 0 <= hi) ? X(0) : null, (0 >= ymin && 0 <= ymax) ? Y(0) : null);
      var d = ""; for (var k2 = 0; k2 < xs.length; k2++) d += (k2 ? "L" : "M") + r2(X(xs[k2])) + " " + r2(Y(ys[k2])) + " ";
      s += '<path d="' + d + '" class="fg-curve"/>';
      s += '<circle cx="' + r2(X(vx)) + '" cy="' + r2(Y(vy)) + '" r="4.5" class="gd-gold"/>';
      if (disc >= 0) { var r1r = (-b + Math.sqrt(disc)) / (2 * a), r2r = (-b - Math.sqrt(disc)) / (2 * a); s += '<circle cx="' + r2(X(r1r)) + '" cy="' + r2(Y(0)) + '" r="4.5" class="gd-acc"/><circle cx="' + r2(X(r2r)) + '" cy="' + r2(Y(0)) + '" r="4.5" class="gd-acc"/>'; }
      svg.innerHTML = s;
      var roots = disc > 0 ? "two real roots: <b>" + r2((-b + Math.sqrt(disc)) / (2 * a)) + "</b>, <b>" + r2((-b - Math.sqrt(disc)) / (2 * a)) + "</b>"
        : disc === 0 ? "one (double) root: <b>" + r2(vx) + "</b>"
        : "no real roots (complex: " + r2(vx) + " ± " + r2(Math.sqrt(-disc) / (2 * a)) + "i)";
      out.innerHTML = '<div class="tool-cap">Discriminant b² − 4ac = <b>' + disc + '</b> → ' + roots + '. Vertex (gold) at (' + r2(vx) + ", " + r2(vy) + ").</div>";
    }
    host.querySelector(".q-go").addEventListener("click", run); wireEnter(host, ".q-a,.q-b,.q-c", run); run();
  } };

  // ---------- AM-GM (geometric picture) ----------
  W["am-gm"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">The semicircle picture</div>' +
      '<div class="tool-row">a = <input class="tool-in ag-a" type="number" value="2" style="width:64px"> b = <input class="tool-in ag-b" type="number" value="8" style="width:64px"> <button class="tool-btn2 ag-go">Show</button></div>' +
      '<svg viewBox="0 0 420 230" class="tool-svg ag-svg"></svg><div class="tool-cap ag-cap"></div></div>';
    var svg = host.querySelector(".ag-svg"), cap = host.querySelector(".ag-cap");
    function run() {
      var a = +host.querySelector(".ag-a").value, b = +host.querySelector(".ag-b").value;
      if (!(a > 0) || !(b > 0)) { cap.innerHTML = '<span class="tool-err">Use positive a and b.</span>'; svg.innerHTML = ""; return; }
      var am = (a + b) / 2, gm = Math.sqrt(a * b);
      var sc = Math.min(360 / (a + b), 150 / am), baseY = 200, x0 = (420 - (a + b) * sc) / 2;
      var cen = [x0 + am * sc, baseY], R = am * sc, split = x0 + a * sc;
      var top = [split, baseY - gm * sc];
      var s = '<path d="M' + r2(x0) + ' ' + baseY + ' A' + r2(R) + ' ' + r2(R) + ' 0 0 1 ' + r2(x0 + (a + b) * sc) + ' ' + baseY + '" class="gc"/>' +
        '<line x1="' + r2(x0) + '" y1="' + baseY + '" x2="' + r2(x0 + (a + b) * sc) + '" y2="' + baseY + '" class="gl"/>' +
        '<line x1="' + r2(cen[0]) + '" y1="' + baseY + '" x2="' + r2(cen[0]) + '" y2="' + r2(baseY - R) + '" class="gl-dash"/>' +
        '<line x1="' + r2(top[0]) + '" y1="' + baseY + '" x2="' + r2(top[0]) + '" y2="' + r2(top[1]) + '" class="gl-acc"/>' +
        '<circle cx="' + r2(cen[0]) + '" cy="' + baseY + '" r="2.5" class="gd"/>' +
        '<circle cx="' + r2(split) + '" cy="' + baseY + '" r="3" class="gd-acc"/>' +
        '<text x="' + r2(x0 + a * sc / 2) + '" y="' + (baseY + 16) + '" class="gt">a</text>' +
        '<text x="' + r2(split + b * sc / 2) + '" y="' + (baseY + 16) + '" class="gt">b</text>' +
        '<text x="' + r2(cen[0] + 4) + '" y="' + r2(baseY - R / 2) + '" class="gt-gold">AM</text>' +
        '<text x="' + r2(top[0] + 6) + '" y="' + r2(baseY - gm * sc / 2) + '" class="gt-acc">GM</text>';
      svg.innerHTML = s;
      cap.innerHTML = "AM = (a+b)/2 = <b>" + r2(am) + "</b> (the radius) ≥ GM = √(ab) = <b>" + r2(gm) + "</b> (the half-chord). Equal only when a = b, where the chord reaches the top.";
    }
    host.querySelector(".ag-go").addEventListener("click", run); wireEnter(host, ".ag-a,.ag-b", run); run();
  } };

  // ---------- geometric series ----------
  W["geometric-series"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Partial &amp; infinite sums</div>' +
      '<div class="tool-row">a = <input class="tool-in gs-a" type="number" value="1" style="width:60px"> r = <input class="tool-in gs-r" type="number" value="0.5" step="0.1" style="width:60px"> n = <input class="tool-in gs-n" type="number" value="8" style="width:56px"> <button class="tool-btn2 gs-go">Show</button></div>' +
      '<svg viewBox="0 0 440 160" class="tool-svg gs-svg"></svg><div class="tool-cap gs-cap"></div></div>';
    var svg = host.querySelector(".gs-svg"), cap = host.querySelector(".gs-cap");
    function run() {
      var a = +host.querySelector(".gs-a").value, r = +host.querySelector(".gs-r").value, n = Math.max(1, Math.min(40, parseInt(host.querySelector(".gs-n").value, 10) || 1));
      var terms = [], mx = 0; for (var k = 0; k < n; k++) { var t = a * Math.pow(r, k); terms.push(t); mx = Math.max(mx, Math.abs(t)); }
      var Sn = r === 1 ? a * n : a * (1 - Math.pow(r, n)) / (1 - r);
      var bw = (440 - 20) / n, s = '<line x1="10" y1="140" x2="430" y2="140" class="gl-ax"/>';
      terms.forEach(function (t, i) { var h = mx ? Math.abs(t) / mx * 120 : 0; s += '<rect x="' + r2(12 + i * bw) + '" y="' + r2(140 - h) + '" width="' + r2(bw - 4) + '" height="' + r2(h) + '" class="tool-bar"/>'; });
      svg.innerHTML = s;
      var inf = Math.abs(r) < 1 ? " Since |r| < 1, the infinite sum converges: a/(1−r) = <b>" + r2(a / (1 - r)) + "</b>." : " Since |r| ≥ 1, the infinite series diverges.";
      cap.innerHTML = "Sₙ = a(1−rⁿ)/(1−r) = <b>" + r2(Sn) + "</b> for the first " + n + " terms (bars shrink by ×r each step)." + inf;
    }
    host.querySelector(".gs-go").addEventListener("click", run); wireEnter(host, ".gs-a,.gs-r,.gs-n", run); run();
  } };

  // ---------- binomial theorem ----------
  W["binomial-theorem"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Expand (x + y)ⁿ</div>' +
      '<div class="tool-row">n = <input class="tool-in bt-n" type="number" value="5" min="0" max="12" style="width:60px"> <button class="tool-btn2 bt-go">Expand</button></div>' +
      '<div class="tool-out bt-out"></div></div>';
    var out = host.querySelector(".bt-out");
    function run() {
      var n = Math.max(0, Math.min(12, parseInt(host.querySelector(".bt-n").value, 10) || 0));
      var terms = [];
      for (var k = 0; k <= n; k++) { var co = nCr(n, k); terms.push((co === 1 ? "" : co) + (n - k > 0 ? "x^{" + (n - k) + "}" : "") + (k > 0 ? "y^{" + k + "}" : "")); }
      out.innerHTML = '<div class="tool-sub">' + K("(x+y)^{" + n + "} = " + terms.join(" + "), true) + "</div>" +
        '<div class="tool-cap">The coefficients are row ' + n + " of Pascal&rsquo;s triangle: " + Array.apply(null, { length: n + 1 }).map(function (_, k) { return nCr(n, k); }).join(", ") + ". They sum to 2ⁿ = " + Math.pow(2, n) + ".</div>";
    }
    host.querySelector(".bt-go").addEventListener("click", run); wireEnter(host, ".bt-n", run); run();
  } };

  // ---------- de Moivre (powers of a complex number) ----------
  W["de-moivre"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Powers of z</div>' +
      '<div class="tool-row">z = <input class="tool-in dm-a" type="number" value="1.1" step="0.1" style="width:60px"> + <input class="tool-in dm-b" type="number" value="0.5" step="0.1" style="width:60px">i, &nbsp; up to z^<input class="tool-in dm-n" type="number" value="7" style="width:48px"> <button class="tool-btn2 dm-go">Plot</button></div>' +
      '<svg viewBox="0 0 320 300" class="tool-svg dm-svg"></svg><div class="tool-cap dm-cap"></div></div>';
    var svg = host.querySelector(".dm-svg"), cap = host.querySelector(".dm-cap");
    function run() {
      var a = +host.querySelector(".dm-a").value, b = +host.querySelector(".dm-b").value, n = Math.max(1, Math.min(24, parseInt(host.querySelector(".dm-n").value, 10) || 1));
      var pts = [{ re: 1, im: 0 }], z = { re: a, im: b }, cur = { re: 1, im: 0 };
      for (var k = 1; k <= n; k++) { cur = cmul(cur, z); pts.push(cur); }
      var mx = 1; pts.forEach(function (p) { mx = Math.max(mx, Math.abs(p.re), Math.abs(p.im)); }); mx *= 1.15;
      var cx = 160, cy = 150, sc = 130 / mx;
      var s = plotAxes(320, 300, cx, cy) + '<text x="310" y="145" class="gt">Re</text><text x="166" y="20" class="gt">Im</text>';
      var path = ""; pts.forEach(function (p, i) { path += (i ? "L" : "M") + r2(cx + p.re * sc) + " " + r2(cy - p.im * sc) + " "; });
      s += '<path d="' + path + '" class="fg-curve" style="opacity:.5"/>';
      pts.forEach(function (p, i) { s += '<circle cx="' + r2(cx + p.re * sc) + '" cy="' + r2(cy - p.im * sc) + '" r="' + (i === n ? 5 : 3.5) + '" class="' + (i === n ? "gd-gold" : "gd-acc") + '"/>'; });
      svg.innerHTML = s;
      var r = Math.hypot(a, b), th = Math.atan2(b, a) * 180 / Math.PI;
      cap.innerHTML = "z = r·(cos θ + i sin θ) with r = <b>" + r2(r) + "</b>, θ = <b>" + r2(th) + "°</b>. Then zⁿ = rⁿ(cos nθ + i sin nθ): magnitude " + (r > 1 ? "grows" : r < 1 ? "shrinks" : "stays fixed") + " and the angle steps by θ each power (gold = z^" + n + ").";
    }
    host.querySelector(".dm-go").addEventListener("click", run); wireEnter(host, ".dm-a,.dm-b,.dm-n", run); run();
  } };

  // ---------- finite differences ----------
  W["finite-differences"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Finite differences</div>' +
      '<div class="tool-row">sequence: <input class="tool-in fd-s" type="text" value="2 5 12 23 38 57" style="width:220px"> <button class="tool-btn2 fd-go">Build</button></div>' +
      '<div class="tool-out fd-out"></div></div>';
    var out = host.querySelector(".fd-out");
    function run() {
      var raw = host.querySelector(".fd-s").value.trim().split(/[\s,]+/).map(Number);
      if (raw.length < 2 || raw.some(function (x) { return !isFinite(x); })) { out.innerHTML = '<div class="tool-err">Enter at least two numbers, e.g. <code>2 5 12 23</code>.</div>'; return; }
      var rows = [raw], deg = -1;
      while (rows[rows.length - 1].length > 1) { var prev = rows[rows.length - 1], nx = []; for (var i = 0; i + 1 < prev.length; i++) nx.push(prev[i + 1] - prev[i]); rows.push(nx); if (nx.every(function (v) { return v === nx[0]; }) && nx.length) { deg = rows.length - 1; break; } }
      var html = '<div style="overflow-x:auto"><table class="tool-tbl" style="margin:0 auto">';
      rows.forEach(function (row, ri) { html += "<tr><td>" + (ri === 0 ? "seq" : "Δ" + (ri > 1 ? ri : "")) + "</td>" + row.map(function (v) { return "<td>" + (Math.round(v * 1000) / 1000) + "</td>"; }).join("") + "</tr>"; });
      html += "</table></div>";
      var msg = deg >= 0 ? "Row Δ" + (deg > 1 ? deg : "") + " is constant → the sequence is a degree-<b>" + deg + "</b> polynomial in n." : "No constant row yet — add more terms, or it may not be polynomial.";
      out.innerHTML = html + '<div class="tool-cap">' + msg + "</div>";
    }
    host.querySelector(".fd-go").addEventListener("click", run); wireEnter(host, ".fd-s", run); run();
  } };

  // ---------- grid paths ----------
  W["grid-paths"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Lattice paths, moves right &amp; up only</div>' +
      '<div class="tool-row">width <input class="tool-in gp-w" type="number" value="5" min="1" max="12" style="width:52px"> × height <input class="tool-in gp-h" type="number" value="3" min="1" max="12" style="width:52px"> <button class="tool-btn2 gp-go">Count</button> <button class="tool-btn2 gp-path" style="background:var(--bg-card);color:var(--accent);border-color:var(--border)">New path</button></div>' +
      '<svg viewBox="0 0 380 260" class="tool-svg gp-svg"></svg><div class="tool-cap gp-cap"></div></div>';
    var svg = host.querySelector(".gp-svg"), cap = host.querySelector(".gp-cap");
    function draw(rand) {
      var w = Math.max(1, Math.min(12, parseInt(host.querySelector(".gp-w").value, 10) || 1)), h = Math.max(1, Math.min(12, parseInt(host.querySelector(".gp-h").value, 10) || 1));
      var G = Math.min(320 / w, 200 / h), ox = (380 - w * G) / 2, oy = 230;
      function X(i) { return ox + i * G; } function Y(j) { return oy - j * G; }
      var s = "";
      for (var i = 0; i <= w; i++) s += '<line x1="' + r2(X(i)) + '" y1="' + r2(Y(0)) + '" x2="' + r2(X(i)) + '" y2="' + r2(Y(h)) + '" class="gl-ax"/>';
      for (var j = 0; j <= h; j++) s += '<line x1="' + r2(X(0)) + '" y1="' + r2(Y(j)) + '" x2="' + r2(X(w)) + '" y2="' + r2(Y(j)) + '" class="gl-ax"/>';
      var moves = []; for (var a = 0; a < w; a++) moves.push("R"); for (var b = 0; b < h; b++) moves.push("U");
      if (rand) for (var m = moves.length - 1; m > 0; m--) { var q = Math.floor(Math.random() * (m + 1)); var tmp = moves[m]; moves[m] = moves[q]; moves[q] = tmp; }
      var px = 0, py = 0, d = "M" + r2(X(0)) + " " + r2(Y(0)) + " ";
      moves.forEach(function (mv) { if (mv === "R") px++; else py++; d += "L" + r2(X(px)) + " " + r2(Y(py)) + " "; });
      s += '<path d="' + d + '" class="fg-curve"/><circle cx="' + r2(X(0)) + '" cy="' + r2(Y(0)) + '" r="4" class="gd"/><circle cx="' + r2(X(w)) + '" cy="' + r2(Y(h)) + '" r="4.5" class="gd-gold"/>';
      svg.innerHTML = s;
      cap.innerHTML = "Number of monotone paths = C(w+h, w) = C(" + (w + h) + ", " + w + ") = <b>" + nCr(w + h, w) + "</b>. (One random path shown — hit “New path”.)";
    }
    host.querySelector(".gp-go").addEventListener("click", function () { draw(false); });
    host.querySelector(".gp-path").addEventListener("click", function () { draw(true); });
    wireEnter(host, ".gp-w,.gp-h", function () { draw(false); }); draw(false);
  } };

  // ---------- absolute value: type an equation, watch it get built ----------
  // Clicking transformations together was fiddly, so the reader types the expression and a
  // small recursive-descent parser reads it. Stepping falls out of the parse: with a single
  // occurrence of x, walking from that leaf up to the root is exactly the list of
  // transformations, innermost first.
  W["abs-value-graphing"] = { mount: function (host) {
    function parse(src) {
      var s2 = String(src).replace(/^\s*y\s*=/, "").replace(/\s+/g, "");
      var i = 0, absDepth = 0;
      function peek() { return s2[i]; }
      function eat(c) { if (s2[i] === c) { i++; return true; } return false; }
      function expr() {
        var n = term();
        while (peek() === "+" || peek() === "-") { var op = s2[i++]; n = { op: op, a: n, b: term() }; }
        return n;
      }
      function term() {
        var n = factor();
        for (;;) {
          if (eat("*")) { n = { op: "*", a: n, b: factor() }; continue; }
          if (eat("/")) { n = { op: "/", a: n, b: factor() }; continue; }
          // Implicit multiplication: 2x, 3|x|, 2(x+1). A bar is ambiguous, so use position:
          // here we sit just after a complete operand, and inside a |...| group that bar can
          // only be the closer. Without this, the closing bar of |x| was read as the opening
          // bar of a new factor and every expression failed to parse.
          var c = peek();
          if (c === "|" && absDepth > 0) return n;
          if (c && (/[0-9.xX(|]/.test(c) || s2.substr(i, 4) === "sqrt")) { n = { op: "*", a: n, b: factor() }; continue; }
          return n;
        }
      }
      function factor() {
        var n = unary();
        if (eat("^")) n = { op: "^", a: n, b: factor() };
        return n;
      }
      function unary() {
        if (eat("-")) return { op: "neg", a: unary() };
        return primary();
      }
      function primary() {
        if (eat("(")) { var n = expr(); if (!eat(")")) throw 0; return n; }
        // operand position, so a bar here always opens
        if (eat("|")) { absDepth++; var m = expr(); absDepth--; if (!eat("|")) throw 0; return { op: "abs", a: m }; }
        if (s2.substr(i, 4) === "sqrt") { i += 4; if (!eat("(")) throw 0; var q = expr(); if (!eat(")")) throw 0; return { op: "sqrt", a: q }; }
        if (peek() === "x" || peek() === "X") { i++; return { op: "x" }; }
        var m2 = /^\d+(\.\d+)?/.exec(s2.slice(i));
        if (!m2) throw 0;
        i += m2[0].length;
        return { op: "num", v: parseFloat(m2[0]) };
      }
      var root = expr();
      if (i !== s2.length) throw 0;
      return root;
    }
    function evalAt(n, x) {
      switch (n.op) {
        case "x": return x;
        case "num": return n.v;
        case "neg": return -evalAt(n.a, x);
        case "abs": return Math.abs(evalAt(n.a, x));
        case "sqrt": var u = evalAt(n.a, x); return u < 0 ? NaN : Math.sqrt(u);
        case "+": return evalAt(n.a, x) + evalAt(n.b, x);
        case "-": return evalAt(n.a, x) - evalAt(n.b, x);
        case "*": return evalAt(n.a, x) * evalAt(n.b, x);
        case "/": return evalAt(n.a, x) / evalAt(n.b, x);
        case "^": return Math.pow(evalAt(n.a, x), evalAt(n.b, x));
      }
      return NaN;
    }
    function tex(n, prec) {
      prec = prec || 0;
      var P = { "+": 1, "-": 1, "*": 2, "/": 2, "^": 4, neg: 3 };
      function wrap(t, p) { return p < prec ? "\\left(" + t + "\\right)" : t; }
      switch (n.op) {
        case "x": return "x";
        case "num": return String(n.v);
        case "neg": return wrap("-" + tex(n.a, 3), 3);
        case "abs": return "\\left|" + tex(n.a, 0) + "\\right|";
        case "sqrt": return "\\sqrt{" + tex(n.a, 0) + "}";
        case "/": return "\\frac{" + tex(n.a, 0) + "}{" + tex(n.b, 0) + "}";
        case "^": return wrap(tex(n.a, 5) + "^{" + tex(n.b, 0) + "}", 4);
        case "*": return wrap(tex(n.a, 2) + tex(n.b, 2), 2);
        default: return wrap(tex(n.a, P[n.op]) + " " + n.op + " " + tex(n.b, P[n.op] + 1), P[n.op]);
      }
    }
    // the chain of ancestors of the single x, innermost first
    function chain(root) {
      var path = null;
      (function walk(n, acc) {
        if (n.op === "x") { if (path) path = "many"; else path = acc.concat([n]); return; }
        ["a", "b"].forEach(function (k) { if (n[k]) walk(n[k], acc.concat([n])); });
      })(root, []);
      if (!path || path === "many") return [root];
      return path.slice().reverse();            // x first, then each enclosing step
    }
    function describe(n) {
      switch (n.op) {
        case "x": return "start from x itself";
        case "abs": return "the bars fold everything below the axis up, adding a corner at each root";
        case "sqrt": return "the square root keeps only where the inside is non-negative";
        case "neg": return "the minus sign flips the graph over the x-axis";
        case "^": return "raising to a power steepens the graph away from the roots";
        case "+": case "-": return "adding a constant shifts the graph vertically, or shifts it horizontally when it is inside";
        case "*": return "multiplying stretches the graph vertically, leaving every root where it was";
        case "/": return "dividing compresses the graph vertically";
      }
      return "";
    }

    host.innerHTML =
      '<div class="tool"><div class="tool-title">Type an absolute-value expression and step through how it is built</div>' +
      '<div class="tool-row">y = <input class="tool-in av-eq" type="text" value="2||x-5|-5|" style="width:230px" ' +
      'placeholder="e.g. |x^2-4|  or  3|x+1|-2"> <button class="tool-btn2 av-go">Graph</button></div>' +
      '<div class="tool-row av-eg" style="flex-wrap:wrap;gap:8px;align-items:center;margin:8px 0 10px"></div>' +
      '<div class="tool-row"><button class="tool-btn2 av-prev">&larr;</button>' +
      ' <span class="av-step" style="margin:0 10px"></span>' +
      ' <button class="tool-btn2 av-next">&rarr;</button></div>' +
      '<div class="tool-sub av-tex" style="margin:6px 0"></div>' +
      '<svg viewBox="0 0 400 250" class="tool-svg av-svg"></svg>' +
      '<div class="tool-cap av-cap"></div></div>';
    host.querySelector(".av-eg").innerHTML =
      '<span class="tool-cap" style="margin:0 4px 0 0;line-height:1;font-size:12.5px">Examples:</span>' +
      ["2||x-5|-5|", "|x^2-4|", "||x|-3|", "3|x+1|-2", "|sqrt(x)-2|"]
      .map(function (e) { return '<button class="tool-btn2 av-pick" data-eq="' + e + '" style="background:var(--bg-card);color:var(--accent);border-color:var(--border);font-size:11.5px;padding:4px 10px">' + e + "</button>"; }).join("");

    var stages = [], i = 0;
    function build() {
      var raw = host.querySelector(".av-eq").value;
      try { stages = chain(parse(raw)); } catch (e) {
        host.querySelector(".av-cap").innerHTML = '<span style="color:#dc2626">Could not read that. Use x, numbers, + - * / ^, brackets, |…| and sqrt( ).</span>';
        return false;
      }
      i = 0;                      // a new expression starts at step 1, not at the finished graph
      return true;
    }
    function draw() {
      if (!stages.length) return;
      if (i >= stages.length) i = stages.length - 1;
      if (i < 0) i = 0;
      var node = stages[i], f = function (x) { return evalAt(node, x); };
      var x0 = -10, x1 = 14, lo = Infinity, hi = -Infinity;
      for (var t = 0; t <= 240; t++) {
        var xv = x0 + (x1 - x0) * t / 240, yv = f(xv);
        if (isFinite(yv) && Math.abs(yv) < 1e4) { if (yv < lo) lo = yv; if (yv > hi) hi = yv; }
      }
      if (!isFinite(lo)) { lo = -1; hi = 1; }
      var pad = Math.max(1, (hi - lo) * 0.15), y0 = Math.min(lo - pad, -1), y1 = Math.max(hi + pad, 1);
      var L = 36, T = 14, Wd = 348, Hd = 200;
      function X(v) { return L + (v - x0) / (x1 - x0) * Wd; }
      function Y(v) { return T + Hd - (v - y0) / (y1 - y0) * Hd; }
      function path(fn, cls) {
        var d = "", pen = false;
        for (var k = 0; k <= 400; k++) {
          var v = x0 + (x1 - x0) * k / 400, yv = fn(v);
          if (!isFinite(yv) || yv < y0 - 60 || yv > y1 + 60) { pen = false; continue; }
          d += (pen ? " L " : " M ") + r2(X(v)) + " " + r2(Y(yv)); pen = true;
        }
        return d ? '<path d="' + d + '" class="' + cls + '" fill="none"/>' : "";
      }
      var out = '<line x1="' + r2(X(x0)) + '" y1="' + r2(Y(0)) + '" x2="' + r2(X(x1)) + '" y2="' + r2(Y(0)) + '" class="gl-ax"/>' +
                '<line x1="' + r2(X(0)) + '" y1="' + r2(Y(y0)) + '" x2="' + r2(X(0)) + '" y2="' + r2(Y(y1)) + '" class="gl-ax"/>';
      if (i > 0) { var pnode = stages[i - 1]; out += path(function (x) { return evalAt(pnode, x); }, "gl-dash"); }
      out += path(f, "fg-curve");
      host.querySelector(".av-svg").innerHTML = out;
      host.querySelector(".av-tex").innerHTML = K("y = " + tex(node), true);
      host.querySelector(".av-step").textContent = stages.length > 1 ? "step " + (i + 1) + " of " + stages.length : "one step";
      host.querySelector(".av-cap").innerHTML = describe(node) + (i > 0 ? " &nbsp;(dashed: the previous step)" : "");
      host.querySelector(".av-prev").disabled = i === 0;
      host.querySelector(".av-next").disabled = i === stages.length - 1;
    }
    function run() { if (build()) draw(); }
    host.querySelector(".av-go").addEventListener("click", run);
    host.querySelector(".av-eq").addEventListener("keydown", function (e) { if (e.key === "Enter") run(); });
    host.addEventListener("click", function (e) {
      var p = e.target.closest(".av-pick");
      if (p) { host.querySelector(".av-eq").value = p.dataset.eq; run(); }
    });
    host.querySelector(".av-prev").addEventListener("click", function () { if (i > 0) { i--; draw(); } });
    host.querySelector(".av-next").addEventListener("click", function () { if (i < stages.length - 1) { i++; draw(); } });
    run();
  } };

  // ---------- reflection principle ----------
  // The bijection is the hard part to see: a bad path, reflected after its first touch,
  // becomes a path to the mirrored endpoint, and every path to that endpoint comes from
  // exactly one bad path. Drawing both at once is the only way that reads.
  W["reflection-principle"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Reflecting a path that touches the barrier</div>' +
      '<div class="tool-row">to (<input class="tool-in rp-w" type="number" value="6" min="1" max="10" style="width:48px">, ' +
      '<input class="tool-in rp-h" type="number" value="4" min="0" max="10" style="width:48px">) ' +
      'barrier y = x + <input class="tool-in rp-b" type="number" value="1" min="1" max="6" style="width:44px"> ' +
      '<button class="tool-btn2 rp-go">Count</button> ' +
      '<button class="tool-btn2 rp-path" style="background:var(--bg-card);color:var(--accent);border-color:var(--border)">New bad path</button></div>' +
      '<svg viewBox="0 0 380 270" class="tool-svg rp-svg"></svg><div class="tool-cap rp-cap"></div></div>';
    var svg = host.querySelector(".rp-svg"), cap = host.querySelector(".rp-cap");

    // A path is bad when it ever reaches y = x + 1. Reflecting everything after the first
    // such step swaps the remaining R and U moves, landing at (h-1, w+1).
    function randomBad(w, h, bb) {
      for (var tries = 0; tries < 400; tries++) {
        var mv = [], i;
        for (i = 0; i < w; i++) mv.push("R");
        for (i = 0; i < h; i++) mv.push("U");
        for (i = mv.length - 1; i > 0; i--) { var q = Math.floor(Math.random() * (i + 1)); var t = mv[i]; mv[i] = mv[q]; mv[q] = t; }
        var x = 0, y = 0, hit = -1;
        for (i = 0; i < mv.length; i++) {
          if (mv[i] === "R") x++; else y++;
          if (y === x + bb && hit === -1) hit = i;
        }
        if (hit !== -1) return { moves: mv, hit: hit };
      }
      return null;
    }

    function draw(newPath) {
      var w = Math.max(1, Math.min(10, parseInt(host.querySelector(".rp-w").value, 10) || 1));
      var h = Math.max(0, Math.min(10, parseInt(host.querySelector(".rp-h").value, 10) || 0));
      var bb = Math.max(1, Math.min(6, parseInt(host.querySelector(".rp-b").value, 10) || 1));
      var top = Math.max(w, h) + bb;
      var G = Math.min(300 / w, 210 / top), ox = 40, oy = 240;
      function X(i) { return ox + i * G; }
      function Y(j) { return oy - j * G; }
      var s2 = "", i, j;
      for (i = 0; i <= w; i++) s2 += '<line x1="' + r2(X(i)) + '" y1="' + r2(Y(0)) + '" x2="' + r2(X(i)) + '" y2="' + r2(Y(top)) + '" class="gl-ax"/>';
      for (j = 0; j <= top; j++) s2 += '<line x1="' + r2(X(0)) + '" y1="' + r2(Y(j)) + '" x2="' + r2(X(w)) + '" y2="' + r2(Y(j)) + '" class="gl-ax"/>';
      // the barrier y = x + 1, the line a good path must never reach
      var bx = Math.min(w, top - bb);
      s2 += '<line x1="' + r2(X(0)) + '" y1="' + r2(Y(bb)) + '" x2="' + r2(X(bx)) + '" y2="' + r2(Y(bx + bb)) + '" class="gl-dash"/>';
      s2 += '<text x="' + r2(X(0) + 6) + '" y="' + r2(Y(bb) - 6) + '" class="gt-gold" font-size="11">y = x + ' + bb + '</text>';

      var st = draw._p && !newPath ? draw._p : randomBad(w, h, bb);
      draw._p = st;
      var capMsg;
      if (!st) {
        capMsg = "No path to (" + w + ", " + h + ") ever reaches y = x + " + bb + ", so every path is good: " +
                 "C(" + (w + h) + ", " + h + ") = <b>" + nCr(w + h, h) + "</b>. " +
                 "Raising the barrier always makes more paths legal; lowering it makes fewer.";
      } else {
        var x = 0, y = 0, d = "M" + r2(X(0)) + " " + r2(Y(0)) + " ", d2 = "", rx = 0, ry = 0;
        for (i = 0; i < st.moves.length; i++) {
          if (st.moves[i] === "R") x++; else y++;
          d += "L" + r2(X(x)) + " " + r2(Y(y)) + " ";
          if (i === st.hit) { rx = x; ry = y; d2 = "M" + r2(X(x)) + " " + r2(Y(y)) + " "; }
          else if (i > st.hit) {
            // after the touch, swap the move: R becomes U and U becomes R
            if (st.moves[i] === "R") ry++; else rx++;
            d2 += "L" + r2(X(rx)) + " " + r2(Y(ry)) + " ";
          }
        }
        s2 += '<path d="' + d + '" class="fg-curve"/>';
        s2 += '<path d="' + d2 + '" class="gl-gold" fill="none" stroke-dasharray="5 4"/>';
        s2 += '<circle cx="' + r2(X(0)) + '" cy="' + r2(Y(0)) + '" r="4" class="gd"/>';
        s2 += '<circle cx="' + r2(X(w)) + '" cy="' + r2(Y(h)) + '" r="4.5" class="gd-acc"/>';
        s2 += '<circle cx="' + r2(X(st.hit >= 0 ? 0 : 0) + 0) + '" cy="0" r="0" class="gd"/>';
        var fx = 0, fy = 0;
        for (i = 0; i <= st.hit; i++) { if (st.moves[i] === "R") fx++; else fy++; }
        s2 += '<circle cx="' + r2(X(fx)) + '" cy="' + r2(Y(fy)) + '" r="4.5" class="gd-gold"/>';
        s2 += '<circle cx="' + r2(X(rx)) + '" cy="' + r2(Y(ry)) + '" r="4.5" class="gd-gold"/>';
        s2 += '<text x="' + r2(X(rx) + 7) + '" y="' + r2(Y(ry) - 5) + '" class="gt-gold" font-size="11">(' + rx + ', ' + ry + ')</text>';
        var good = nCr(w + h, h) - nCr(w + h, h - bb);
        capMsg = "The solid path touches the barrier at the gold point; reflecting everything after that touch " +
                 "(dashed) lands at (" + rx + ", " + ry + "), the mirror of (" + w + ", " + h + "). " +
                 "Bad paths correspond one-to-one with paths to that mirrored endpoint, so good paths = " +
                 "C(" + (w + h) + ", " + h + ") &minus; C(" + (w + h) + ", " + (h - bb) + ") = " +
                 nCr(w + h, h) + " &minus; " + nCr(w + h, h - bb) + " = <b>" + good + "</b>. " +
                 "The slope stays 1: reflecting across a tilted line would not send lattice paths to lattice paths, " +
                 "so only the intercept is adjustable.";
      }
      svg.innerHTML = s2;
      cap.innerHTML = capMsg;
    }
    host.querySelector(".rp-go").addEventListener("click", function () { draw(true); });
    host.querySelector(".rp-path").addEventListener("click", function () { draw(true); });
    wireEnter(host, ".rp-w,.rp-h,.rp-b", function () { draw(true); });
    draw(true);
  } };

  // ---------- permutations & combinations ----------
  W["permutations-combinations"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Permutations &amp; combinations</div>' +
      '<div class="tool-row">n = <input class="tool-in pc-n" type="number" value="10" style="width:60px"> choose k = <input class="tool-in pc-k" type="number" value="3" style="width:60px"> <button class="tool-btn2 pc-go">Compute</button></div>' +
      '<div class="tool-out pc-out"></div></div>';
    var out = host.querySelector(".pc-out");
    function run() {
      var n = parseInt(host.querySelector(".pc-n").value, 10), k = parseInt(host.querySelector(".pc-k").value, 10);
      if (!(n >= 0) || !(k >= 0) || k > n) { out.innerHTML = '<div class="tool-err">Need 0 ≤ k ≤ n.</div>'; return; }
      out.innerHTML =
        '<div class="tool-sub">' + K("P(" + n + "," + k + ")=\\frac{" + n + "!}{" + (n - k) + "!}=" + nPr(n, k)) + "</div>" +
        '<div class="tool-sub">' + K("\\binom{" + n + "}{" + k + "}=\\frac{" + n + "!}{" + k + "!\\," + (n - k) + "!}=" + nCr(n, k)) + "</div>" +
        '<div class="tool-cap">Permutations count ordered choices; combinations count unordered ones — differing by the k! orderings of each group.</div>';
    }
    host.querySelector(".pc-go").addEventListener("click", run); wireEnter(host, ".pc-n,.pc-k", run); run();
  } };

  // ---------- stars and bars ----------
  W["stars-and-bars"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Stars and bars</div>' +
      '<div class="tool-row"><input class="tool-in sb-n" type="number" value="7" style="width:56px"> identical items into <input class="tool-in sb-k" type="number" value="3" style="width:56px"> bins <button class="tool-btn2 sb-go">Show</button></div>' +
      '<div class="tool-out sb-out"></div></div>';
    var out = host.querySelector(".sb-out");
    function run() {
      var n = parseInt(host.querySelector(".sb-n").value, 10), k = parseInt(host.querySelector(".sb-k").value, 10);
      if (!(n >= 0) || !(k >= 1)) { out.innerHTML = '<div class="tool-err">Need items ≥ 0 and bins ≥ 1.</div>'; return; }
      // sample arrangement
      var counts = [], left = n; for (var i = 0; i < k; i++) { var c = i === k - 1 ? left : Math.floor(Math.random() * (left + 1)); counts.push(c); left -= c; }
      var tok = counts.map(function (c) { return '<span class="sb-star">' + Array(c + 1).join("★") + "</span>"; }).join('<span class="sb-bar"> | </span>');
      out.innerHTML =
        '<div class="tool-sub">' + K("\\binom{n+k-1}{k-1}=\\binom{" + (n + k - 1) + "}{" + (k - 1) + "}=" + nCr(n + k - 1, k - 1)) + "</div>" +
        '<div class="sb-token">' + (tok || "(empty)") + "</div>" +
        '<div class="tool-cap">Arrange ' + n + " stars and " + (k - 1) + " bars in a row; the bars split the stars among the " + k + " bins (" + counts.join(" + ") + " = " + n + " shown).</div>";
    }
    host.querySelector(".sb-go").addEventListener("click", run); wireEnter(host, ".sb-n,.sb-k", run); run();
  } };

  // ---------- Catalan numbers ----------
  W["catalan-numbers"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Catalan numbers</div>' +
      '<div class="tool-row">n = <input class="tool-in ct-n" type="number" value="5" min="0" max="18" style="width:60px"> <button class="tool-btn2 ct-go">Show</button></div>' +
      '<div class="tool-out ct-out"></div></div>';
    var out = host.querySelector(".ct-out");
    function run() {
      var n = Math.max(0, Math.min(18, parseInt(host.querySelector(".ct-n").value, 10) || 0));
      var list = []; for (var i = 0; i <= n; i++) list.push(nCr(2 * i, i) / (i + 1));
      out.innerHTML =
        '<div class="tool-sub">' + K("C_{" + n + "}=\\frac{1}{" + (n + 1) + "}\\binom{" + (2 * n) + "}{" + n + "}=" + list[n]) + "</div>" +
        '<div class="tool-cap">C₀…C' + n + ": " + list.join(", ") + ". Counts balanced-parenthesis strings, triangulations of an (n+2)-gon, monotone lattice paths under the diagonal, and more.</div>";
    }
    host.querySelector(".ct-go").addEventListener("click", run); wireEnter(host, ".ct-n", run); run();
  } };

  // ---------- binomial probability distribution ----------
  W["binomial-probability"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Binomial distribution</div>' +
      '<div class="tool-row">n = <input class="tool-in bp-n" type="number" value="12" min="1" max="40" style="width:56px"> p = <input class="tool-in bp-p" type="number" value="0.5" step="0.05" min="0" max="1" style="width:60px"> <button class="tool-btn2 bp-go">Plot</button></div>' +
      '<svg viewBox="0 0 440 220" class="tool-svg bp-svg"></svg><div class="tool-cap bp-cap"></div></div>';
    var svg = host.querySelector(".bp-svg"), cap = host.querySelector(".bp-cap");
    function run() {
      var n = Math.max(1, Math.min(40, parseInt(host.querySelector(".bp-n").value, 10) || 1)), p = +host.querySelector(".bp-p").value;
      if (!(p >= 0 && p <= 1)) { cap.innerHTML = '<span class="tool-err">p must be between 0 and 1.</span>'; svg.innerHTML = ""; return; }
      var probs = [], mx = 0; for (var k = 0; k <= n; k++) { var pr = nCr(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k); probs.push(pr); mx = Math.max(mx, pr); }
      var bw = 420 / (n + 1), s = '<line x1="10" y1="190" x2="430" y2="190" class="gl-ax"/>';
      probs.forEach(function (pr, k) { var h = mx ? pr / mx * 170 : 0; s += '<rect x="' + r2(12 + k * bw) + '" y="' + r2(190 - h) + '" width="' + r2(bw - 3) + '" height="' + r2(h) + '" class="tool-bar"/>'; });
      svg.innerHTML = s;
      cap.innerHTML = "P(X = k) = C(n,k) pᵏ(1−p)ⁿ⁻ᵏ. Mean = np = <b>" + r2(n * p) + "</b>, variance = np(1−p) = <b>" + r2(n * p * (1 - p)) + "</b>. The peak sits at k ≈ np.";
    }
    host.querySelector(".bp-go").addEventListener("click", run); wireEnter(host, ".bp-n,.bp-p", run); run();
  } };

  // ---------- handshakes / diagonals ----------
  W["handshakes-diagonals"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Handshakes &amp; diagonals in an n-gon</div>' +
      '<div class="tool-row">n = <input class="tool-in hd-n" type="number" value="7" min="2" max="16" style="width:60px"> <button class="tool-btn2 hd-go">Draw</button></div>' +
      '<svg viewBox="0 0 300 260" class="tool-svg hd-svg"></svg><div class="tool-cap hd-cap"></div></div>';
    var svg = host.querySelector(".hd-svg"), cap = host.querySelector(".hd-cap");
    function run() {
      var n = Math.max(2, Math.min(16, parseInt(host.querySelector(".hd-n").value, 10) || 2));
      var cx = 150, cy = 130, R = 105, P = [];
      for (var k = 0; k < n; k++) { var a = -Math.PI / 2 + 2 * Math.PI * k / n; P.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]); }
      var s = "";
      for (var i = 0; i < n; i++) for (var j = i + 1; j < n; j++) { var isEdge = (j === i + 1) || (i === 0 && j === n - 1); s += '<line x1="' + r2(P[i][0]) + '" y1="' + r2(P[i][1]) + '" x2="' + r2(P[j][0]) + '" y2="' + r2(P[j][1]) + '" class="' + (isEdge ? "gl-acc" : "gl-dash") + '"/>'; }
      P.forEach(function (p) { s += '<circle cx="' + r2(p[0]) + '" cy="' + r2(p[1]) + '" r="4" class="gd-acc"/>'; });
      svg.innerHTML = s;
      cap.innerHTML = "All pairs (handshakes) = C(n,2) = <b>" + nCr(n, 2) + "</b>. Of these, n = " + n + " are sides (solid) and the rest are diagonals: n(n−3)/2 = <b>" + (n * (n - 3) / 2) + "</b> (dashed).";
    }
    host.querySelector(".hd-go").addEventListener("click", run); wireEnter(host, ".hd-n", run); run();
  } };

  // ---------- number of divisors / sum of divisors ----------
  W["number-of-divisors"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Divisor functions τ(n) and σ(n)</div>' +
      '<div class="tool-row">n = <input class="tool-in nd-n" type="number" value="360" style="width:100px"> <button class="tool-btn2 nd-go">Factor</button></div>' +
      '<div class="tool-out nd-out"></div></div>';
    var out = host.querySelector(".nd-out");
    function run() {
      var n = parseInt(host.querySelector(".nd-n").value, 10);
      if (!(n >= 1) || n > 1e12) { out.innerHTML = '<div class="tool-err">Enter an integer from 1 to 10¹².</div>'; return; }
      var f = factorize(n), tau = 1, sig = 1;
      f.forEach(function (pe) { tau *= (pe[1] + 1); sig *= (Math.pow(pe[0], pe[1] + 1) - 1) / (pe[0] - 1); });
      out.innerHTML =
        '<div class="tool-fact">' + K(n + " = " + factorTex(f)) + "</div>" +
        '<div class="tool-cap">Number of divisors τ(n) = ∏(eᵢ+1) = <b>' + tau + "</b>. &nbsp; Sum of divisors σ(n) = ∏ (pᵢ^{eᵢ+1}−1)/(pᵢ−1) = <b>" + Math.round(sig) + "</b>.</div>";
    }
    host.querySelector(".nd-go").addEventListener("click", run); wireEnter(host, ".nd-n", run); run();
  } };

  // ---------- Euler's totient ----------
  W["eulers-totient"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Euler&rsquo;s totient φ(n)</div>' +
      '<div class="tool-row">n = <input class="tool-in et-n" type="number" value="36" style="width:100px"> <button class="tool-btn2 et-go">Compute</button></div>' +
      '<div class="tool-out et-out"></div></div>';
    var out = host.querySelector(".et-out");
    function run() {
      var n = parseInt(host.querySelector(".et-n").value, 10);
      if (!(n >= 1) || n > 1e12) { out.innerHTML = '<div class="tool-err">Enter an integer from 1 to 10¹².</div>'; return; }
      var f = factorize(n), phi = n; f.forEach(function (pe) { phi = phi / pe[0] * (pe[0] - 1); });
      out.innerHTML =
        '<div class="tool-fact">' + K(n + " = " + factorTex(f)) + "</div>" +
        '<div class="tool-cap">φ(n) = n·∏(1 − 1/pᵢ) = <b>' + Math.round(phi) + "</b> integers in 1…" + n + " are coprime to " + n + ".</div>";
    }
    host.querySelector(".et-go").addEventListener("click", run); wireEnter(host, ".et-n", run); run();
  } };

  // ---------- Pythagorean triple generator ----------
  W["pythagorean-triples"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Pythagorean triples from Euclid&rsquo;s formula</div>' +
      '<div class="tool-row">m = <input class="tool-in py-m" type="number" value="2" style="width:56px"> n = <input class="tool-in py-n" type="number" value="1" style="width:56px"> <span class="tool-cap" style="margin:0">(m &gt; n &gt; 0)</span> <button class="tool-btn2 py-go">Generate</button></div>' +
      '<div class="tool-out py-out"></div></div>';
    var out = host.querySelector(".py-out");
    function run() {
      var m = parseInt(host.querySelector(".py-m").value, 10), n = parseInt(host.querySelector(".py-n").value, 10);
      if (!(m > n && n > 0)) { out.innerHTML = '<div class="tool-err">Need m > n > 0.</div>'; return; }
      var a = m * m - n * n, b = 2 * m * n, c = m * m + n * n;
      var prim = gcd2(m, n) === 1 && (m % 2 !== n % 2);
      out.innerHTML =
        '<div class="tool-sub">' + K("(m^2-n^2,\\ 2mn,\\ m^2+n^2) = (" + a + ",\\ " + b + ",\\ " + c + ")") + "</div>" +
        '<div class="tool-cap">Check: ' + a + "² + " + b + "² = " + (a * a + b * b) + " = " + c + "² ✓. This triple is <b>" + (prim ? "primitive" : "not primitive") + "</b> (primitive ⟺ gcd(m,n)=1 and m, n have opposite parity).</div>";
    }
    host.querySelector(".py-go").addEventListener("click", run); wireEnter(host, ".py-m,.py-n", run); run();
  } };

  // ---------- Fermat's little theorem ----------
  W["fermats-little-theorem"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Fermat&rsquo;s little theorem</div>' +
      '<div class="tool-row">a = <input class="tool-in fl-a" type="number" value="3" style="width:60px"> p = <input class="tool-in fl-p" type="number" value="7" style="width:60px"> <button class="tool-btn2 fl-go">Check</button></div>' +
      '<div class="tool-out fl-out"></div></div>';
    var out = host.querySelector(".fl-out");
    function run() {
      var a = parseInt(host.querySelector(".fl-a").value, 10), p = parseInt(host.querySelector(".fl-p").value, 10);
      if (!(p >= 2) || !isFinite(a)) { out.innerHTML = '<div class="tool-err">Enter integer a and p ≥ 2.</div>'; return; }
      if (!isPrime(p)) { out.innerHTML = '<div class="tool-cap"><b>' + p + "</b> is not prime, so Fermat&rsquo;s little theorem need not hold. (Powers can still be explored with the “powers mod m” tool.)</div>"; return; }
      var r = modpow(a, p - 1, p), ra = modpow(a, p, p);
      out.innerHTML =
        '<div class="tool-sub">' + K(a + "^{" + (p - 1) + "} \\equiv " + r + " \\pmod{" + p + "}") + "</div>" +
        '<div class="tool-cap">' + (a % p === 0 ? "Here p ∣ a, so aᵖ⁻¹ ≡ 0. " : "Since p ∤ a, aᵖ⁻¹ ≡ 1 (mod p). ") + "Always aᵖ ≡ a (mod p): " + a + "^" + p + " ≡ " + ra + " ≡ " + ((a % p) + p) % p + ".</div>";
    }
    host.querySelector(".fl-go").addEventListener("click", run); wireEnter(host, ".fl-a,.fl-p", run); run();
  } };

  // ---------- Legendre's formula ----------
  W["legendres-formula"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Power of p in n!</div>' +
      '<div class="tool-row">n = <input class="tool-in lg-n" type="number" value="100" style="width:80px"> p = <input class="tool-in lg-p" type="number" value="5" style="width:56px"> <button class="tool-btn2 lg-go">Compute</button></div>' +
      '<div class="tool-out lg-out"></div></div>';
    var out = host.querySelector(".lg-out");
    function run() {
      var n = parseInt(host.querySelector(".lg-n").value, 10), p = parseInt(host.querySelector(".lg-p").value, 10);
      if (!(n >= 0) || !(p >= 2)) { out.innerHTML = '<div class="tool-err">Need n ≥ 0 and p ≥ 2.</div>'; return; }
      if (!isPrime(p)) { out.innerHTML = '<div class="tool-err">p should be prime for Legendre&rsquo;s formula.</div>'; return; }
      var terms = [], sum = 0, pk = p; while (pk <= n) { var t = Math.floor(n / pk); terms.push("\\lfloor " + n + "/" + pk + "\\rfloor"); sum += t; pk *= p; }
      out.innerHTML =
        '<div class="tool-sub">' + K("v_{" + p + "}(" + n + "!) = " + (terms.join(" + ") || "0") + " = " + sum) + "</div>" +
        '<div class="tool-cap">' + n + "! ends in " + (p === 2 || p === 5 ? "" : "(for trailing zeros use p = 5) ") + "exactly " + sum + " factors of " + p + "." + (p === 5 ? " With ⌊n/2⌋ ≥ this, " + n + "! has <b>" + sum + "</b> trailing zeros." : "") + "</div>";
    }
    host.querySelector(".lg-go").addEventListener("click", run); wireEnter(host, ".lg-n,.lg-p", run); run();
  } };

  // ---------- CRT solver ----------
  W["crt"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Solve two congruences</div>' +
      '<div class="tool-row">x ≡ <input class="tool-in cr-a1" type="number" value="2" style="width:52px"> (mod <input class="tool-in cr-m1" type="number" value="3" style="width:52px">)</div>' +
      '<div class="tool-row">x ≡ <input class="tool-in cr-a2" type="number" value="3" style="width:52px"> (mod <input class="tool-in cr-m2" type="number" value="5" style="width:52px">) <button class="tool-btn2 cr-go">Solve</button></div>' +
      '<div class="tool-out cr-out"></div></div>';
    var out = host.querySelector(".cr-out");
    function run() {
      var a1 = parseInt(host.querySelector(".cr-a1").value, 10), m1 = parseInt(host.querySelector(".cr-m1").value, 10);
      var a2 = parseInt(host.querySelector(".cr-a2").value, 10), m2 = parseInt(host.querySelector(".cr-m2").value, 10);
      if (!(m1 >= 1) || !(m2 >= 1)) { out.innerHTML = '<div class="tool-err">Moduli must be ≥ 1.</div>'; return; }
      var g = egcd(m1, m2), G = g[0], diff = ((a2 - a1) % m2 + m2) % m2;
      if (diff % G !== 0) { out.innerHTML = '<div class="tool-cap">gcd(' + m1 + ", " + m2 + ") = " + G + " does not divide (a₂ − a₁) = " + (a2 - a1) + ", so <b>no solution</b> exists.</div>"; return; }
      var lcm = m1 / G * m2, mm2 = m2 / G;
      var t = ((g[1] % mm2) * ((diff / G) % mm2)) % mm2; t = (t + mm2) % mm2;
      var x = (((a1 + m1 * t) % lcm) + lcm) % lcm;
      out.innerHTML =
        '<div class="tool-sub">' + K("x \\equiv " + x + " \\pmod{" + lcm + "}") + "</div>" +
        '<div class="tool-cap">' + (G === 1 ? "The moduli are coprime, so there&rsquo;s a unique solution mod m₁m₂ = " + lcm + "." : "gcd = " + G + " divides the difference, so solutions exist mod lcm = " + lcm + ".") + " Smallest non-negative: <b>" + x + "</b>.</div>";
    }
    host.querySelector(".cr-go").addEventListener("click", run); wireEnter(host, ".cr-a1,.cr-m1,.cr-a2,.cr-m2", run); run();
  } };

  // ---------- regular polygon area ----------
  W["regular-polygon-area"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Regular polygon area &amp; apothem</div>' +
      '<div class="tool-row">sides n = <input class="tool-in rp-n" type="number" value="6" min="3" max="24" style="width:60px"> &nbsp; side length s = <input class="tool-in rp-s" type="number" value="1" step="0.5" style="width:60px"> <button class="tool-btn2 rp-go">Show</button></div>' +
      '<svg viewBox="0 0 300 240" class="tool-svg rp-svg"></svg><div class="tool-cap rp-cap"></div></div>';
    var svg = host.querySelector(".rp-svg"), cap = host.querySelector(".rp-cap");
    function run() {
      var n = Math.max(3, Math.min(24, parseInt(host.querySelector(".rp-n").value, 10) || 3)), s = +host.querySelector(".rp-s").value;
      if (!(s > 0)) { cap.innerHTML = '<span class="tool-err">Side length must be positive.</span>'; return; }
      var apothem = s / (2 * Math.tan(Math.PI / n)), Rc = s / (2 * Math.sin(Math.PI / n));
      var area = n * s * apothem / 2, interior = (n - 2) * 180 / n;
      var cx = 150, cy = 120, Rp = 95, pts = [];
      for (var k = 0; k < n; k++) { var a = -Math.PI / 2 + 2 * Math.PI * k / n; pts.push([cx + Rp * Math.cos(a), cy + Rp * Math.sin(a)]); }
      var apScreen = Rp * Math.cos(Math.PI / n), foot0 = [cx + apScreen * Math.cos(-Math.PI / 2 + Math.PI / n), cy + apScreen * Math.sin(-Math.PI / 2 + Math.PI / n)];
      svg.innerHTML = '<polygon points="' + pts.map(function (p) { return r2(p[0]) + "," + r2(p[1]); }).join(" ") + '" class="gtri-fill"/>' +
        '<line x1="' + cx + '" y1="' + cy + '" x2="' + r2(foot0[0]) + '" y2="' + r2(foot0[1]) + '" class="gl-acc"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="2.5" class="gd"/>';
      cap.innerHTML = "Area = ½ · n · s · apothem = <b>" + r2(area) + "</b>. Apothem = s / (2 tan(180°/n)) = <b>" + r2(apothem) + "</b>, circumradius = <b>" + r2(Rc) + "</b>. Each interior angle = (n−2)·180°/n = <b>" + r2(interior) + "°</b>.";
    }
    host.querySelector(".rp-go").addEventListener("click", run); wireEnter(host, ".rp-n,.rp-s", run); run();
  } };

  // ---------- polygon angle sums ----------
  W["polygon-angle-sums"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Polygon angle sums</div>' +
      '<div class="tool-row">sides n = <input class="tool-in pa-n" type="number" value="5" min="3" max="24" style="width:60px"> <button class="tool-btn2 pa-go">Show</button></div>' +
      '<svg viewBox="0 0 300 230" class="tool-svg pa-svg"></svg><div class="tool-cap pa-cap"></div></div>';
    var svg = host.querySelector(".pa-svg"), cap = host.querySelector(".pa-cap");
    function run() {
      var n = Math.max(3, Math.min(24, parseInt(host.querySelector(".pa-n").value, 10) || 3));
      var cx = 150, cy = 115, Rp = 92, pts = [];
      for (var k = 0; k < n; k++) { var a = -Math.PI / 2 + 2 * Math.PI * k / n; pts.push([cx + Rp * Math.cos(a), cy + Rp * Math.sin(a)]); }
      // fan triangulation from vertex 0
      var fan = ""; for (var j = 2; j < n; j++) fan += '<line x1="' + r2(pts[0][0]) + '" y1="' + r2(pts[0][1]) + '" x2="' + r2(pts[j][0]) + '" y2="' + r2(pts[j][1]) + '" class="gl-dash"/>';
      svg.innerHTML = '<polygon points="' + pts.map(function (p) { return r2(p[0]) + "," + r2(p[1]); }).join(" ") + '" class="gtri-fill"/>' + fan +
        pts.map(function (p) { return '<circle cx="' + r2(p[0]) + '" cy="' + r2(p[1]) + '" r="3" class="gd-acc"/>'; }).join("");
      cap.innerHTML = "Interior angles sum to (n − 2)·180° = <b>" + ((n - 2) * 180) + "°</b> — the polygon splits into n − 2 = " + (n - 2) + " triangles (dashed). Exterior angles always sum to <b>360°</b>; a regular one has each interior angle " + r2((n - 2) * 180 / n) + "°.";
    }
    host.querySelector(".pa-go").addEventListener("click", run); wireEnter(host, ".pa-n", run); run();
  } };

  // ---------- clock angle ----------
  W["clock-angle"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Clock angle</div>' +
      '<div class="tool-row">time <input class="tool-in ck-h" type="number" value="3" min="0" max="23" style="width:52px"> : <input class="tool-in ck-m" type="number" value="30" min="0" max="59" style="width:52px"> <button class="tool-btn2 ck-go">Show</button></div>' +
      '<svg viewBox="0 0 240 240" class="tool-svg ck-svg" style="max-width:260px"></svg><div class="tool-cap ck-cap"></div></div>';
    var svg = host.querySelector(".ck-svg"), cap = host.querySelector(".ck-cap");
    function run() {
      var h = parseInt(host.querySelector(".ck-h").value, 10) % 12, m = parseInt(host.querySelector(".ck-m").value, 10);
      if (!(h >= 0) || !(m >= 0 && m < 60)) { cap.innerHTML = '<span class="tool-err">Enter a valid time.</span>'; return; }
      var minAng = m * 6, hrAng = (h % 12) * 30 + m * 0.5;
      var diff = Math.abs(hrAng - minAng); if (diff > 180) diff = 360 - diff;
      var cx = 120, cy = 120, R = 100;
      function hand(angDeg, len, cls) { var a = (angDeg - 90) * Math.PI / 180; return '<line x1="' + cx + '" y1="' + cy + '" x2="' + r2(cx + len * Math.cos(a)) + '" y2="' + r2(cy + len * Math.sin(a)) + '" class="' + cls + '"/>'; }
      var ticks = ""; for (var t = 0; t < 12; t++) { var a = (t * 30 - 90) * Math.PI / 180; ticks += '<circle cx="' + r2(cx + 88 * Math.cos(a)) + '" cy="' + r2(cy + 88 * Math.sin(a)) + '" r="2.5" class="gd"/>'; }
      svg.innerHTML = '<circle cx="120" cy="120" r="100" class="gc"/>' + ticks +
        hand(hrAng, 55, "gl-acc") + hand(minAng, 82, "gl-gold") + '<circle cx="120" cy="120" r="3.5" class="gd-acc"/>';
      cap.innerHTML = "Minute hand at 6°/min = " + r2(minAng) + "°; hour hand at 30°/hr + 0.5°/min = " + r2(hrAng) + "°. Angle between them = |30H − 5.5M| = <b>" + r2(diff) + "°</b> (hour hand in blue, minute in gold).";
    }
    host.querySelector(".ck-go").addEventListener("click", run); wireEnter(host, ".ck-h,.ck-m", run); run();
  } };

  // ---------- repeating decimals ----------
  W["repeating-decimals"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Fraction to decimal</div>' +
      '<div class="tool-row"><input class="tool-in rd-p" type="number" value="4" style="width:64px"> / <input class="tool-in rd-q" type="number" value="7" style="width:64px"> <button class="tool-btn2 rd-go">Expand</button></div>' +
      '<div class="tool-out rd-out"></div></div>';
    var out = host.querySelector(".rd-out");
    function run() {
      var p = parseInt(host.querySelector(".rd-p").value, 10), q = parseInt(host.querySelector(".rd-q").value, 10);
      if (!isFinite(p) || !(q > 0)) { out.innerHTML = '<div class="tool-err">Enter an integer numerator and a positive denominator.</div>'; return; }
      var neg = p < 0; p = Math.abs(p);
      var g = gcd2(p, q) || 1, pr = p / g, qr = q / g;
      var whole = Math.floor(pr / qr), rem = pr % qr;
      // strip 2s and 5s to find the pre-period length and the repeating part
      var t = qr, a = 0, b = 0;
      while (t % 2 === 0) { t /= 2; a++; }
      while (t % 5 === 0) { t /= 5; b++; }
      var pre = Math.max(a, b), co = t;                        // co = part coprime to 10
      var period = 0;
      if (co > 1) { var r = 1 % co; for (period = 1; period <= 4000; period++) { r = r * 10 % co; if (r === 1 % co) break; } if (period > 4000) period = 0; }
      // long division digits
      var digits = "", r2v = rem, want = pre + (period || 0) + 2;
      for (var i = 0; i < Math.min(want, 400); i++) { r2v *= 10; digits += Math.floor(r2v / qr); r2v %= qr; }
      var head = digits.slice(0, pre), rep = period ? digits.slice(pre, pre + period) : "";
      var shown = (neg ? "−" : "") + whole + (head || rep ? "." : "") + head +
        (rep ? '<span class="rd-bar">' + rep + "</span>" : "");
      var tex;
      if (!period) {
        tex = "\\frac{" + pr + "}{" + qr + "} = " + (neg ? "-" : "") + (whole + (head ? "." + head : ""));
      } else if (!pre) {
        tex = "0.\\overline{" + rep + "} = \\frac{" + rep + "}{" + new Array(period + 1).join("9") + "}";
      } else {
        tex = "\\text{pre-period } " + pre + ",\\ \\text{period } " + period;
      }
      out.innerHTML =
        '<div class="tool-sub">' + (neg ? "-" : "") + p + "/" + q + (g > 1 ? " = " + (neg ? "-" : "") + pr + "/" + qr : "") + " = <b>" + shown + "</b></div>" +
        '<div class="tool-fact">' + K(tex) + "</div>" +
        '<div class="tool-cap">' + (period
          ? "Denominator " + qr + " = 2<sup>" + a + "</sup>·5<sup>" + b + "</sup>·" + co + ". The 2s and 5s give <b>" + pre + "</b> non-repeating digit" + (pre === 1 ? "" : "s") + "; the coprime part " + co + " gives period <b>" + period + "</b> — the multiplicative order of 10 mod " + co + ", which always divides φ(" + co + ")."
          : "Denominator " + qr + " = 2<sup>" + a + "</sup>·5<sup>" + b + "</sup> has no prime other than 2 and 5, so the decimal <b>terminates</b> after max(" + a + ", " + b + ") = " + pre + " digits.") + "</div>";
    }
    host.querySelector(".rd-go").addEventListener("click", run); wireEnter(host, ".rd-p,.rd-q", run); run();
  } };

  // ---------- divisibility rules ----------
  W["divisibility-rules"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Every divisibility rule at once</div>' +
      '<div class="tool-row">n = <input class="tool-in dv-n" type="text" value="123456" style="width:150px"> <button class="tool-btn2 dv-go">Test</button></div>' +
      '<div class="tool-out dv-out"></div></div>';
    var out = host.querySelector(".dv-out");
    function run() {
      var raw = host.querySelector(".dv-n").value.replace(/[\s,]/g, "");
      if (!/^\d{1,18}$/.test(raw)) { out.innerHTML = '<div class="tool-err">Enter a whole number (up to 18 digits).</div>'; return; }
      var ds = raw.split("").map(Number), L = ds.length;
      var dsum = ds.reduce(function (x, y) { return x + y; }, 0);
      var alt = 0; for (var i = 0; i < L; i++) alt += (L - 1 - i) % 2 === 0 ? ds[i] : -ds[i];   // from the right
      function tailNum(k) { return parseInt(raw.slice(Math.max(0, L - k)), 10) || 0; }
      function modOf(m) { var r = 0; for (var i = 0; i < L; i++) r = (r * 10 + ds[i]) % m; return r; }
      var rules = [
        [2, "last digit " + ds[L - 1] + " is even", modOf(2) === 0],
        [3, "digit sum " + dsum + " divisible by 3", dsum % 3 === 0],
        [4, "last two digits " + tailNum(2) + " divisible by 4", modOf(4) === 0],
        [5, "last digit " + ds[L - 1] + " is 0 or 5", modOf(5) === 0],
        [6, "divisible by both 2 and 3", modOf(6) === 0],
        [7, "no easy rule — just divide (remainder " + modOf(7) + ")", modOf(7) === 0],
        [8, "last three digits " + tailNum(3) + " divisible by 8", modOf(8) === 0],
        [9, "digit sum " + dsum + " divisible by 9", dsum % 9 === 0],
        [10, "last digit is 0", modOf(10) === 0],
        [11, "alternating sum " + alt + " divisible by 11", ((alt % 11) + 11) % 11 === 0],
        [12, "divisible by both 3 and 4", modOf(12) === 0],
        [25, "last two digits " + tailNum(2) + " divisible by 25", modOf(25) === 0]
      ];
      var rows = rules.map(function (r) {
        return '<tr><td><b>' + r[0] + '</b></td><td class="' + (r[2] ? "dv-yes" : "dv-no") + '">' + (r[2] ? "yes" : "no") + "</td><td>" + r[1] + "</td></tr>";
      }).join("");
      out.innerHTML = '<table class="tool-tbl"><tr><th>d</th><th>n divisible?</th><th>why</th></tr>' + rows + "</table>" +
        '<div class="tool-cap">Digit sum = <b>' + dsum + "</b> (so n ≡ " + (dsum % 9) + " mod 9), alternating sum from the right = <b>" + alt + "</b> (so n ≡ " + (((alt % 11) + 11) % 11) + " mod 11). Rules for 2, 4, 8, 5, 25 read the last digits because 10<sup>k</sup> is divisible by those; rules for 3, 9, 11 use digit sums because 10 ≡ 1 (mod 9) and 10 ≡ −1 (mod 11).</div>";
    }
    host.querySelector(".dv-go").addEventListener("click", run); wireEnter(host, ".dv-n", run); run();
  } };

  // ---------- sum of divisors ----------
  W["sum-of-divisors"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">σ(n), d(n) and the product of divisors</div>' +
      '<div class="tool-row">n = <input class="tool-in sd-n" type="number" value="360" style="width:110px"> <button class="tool-btn2 sd-go">Compute</button></div>' +
      '<div class="tool-out sd-out"></div></div>';
    var out = host.querySelector(".sd-out");
    function run() {
      var n = parseInt(host.querySelector(".sd-n").value, 10);
      if (!(n >= 1 && n <= 20000000)) { out.innerHTML = '<div class="tool-err">Enter an integer from 1 to 20,000,000.</div>'; return; }
      var f = factorize(n), d = 1, sig = 1, parts = [];
      f.forEach(function (pe) {
        var p = pe[0], e = pe[1];
        d *= e + 1;
        var s = (Math.pow(p, e + 1) - 1) / (p - 1);
        sig *= s;
        parts.push("\\frac{" + p + "^{" + (e + 1) + "}-1}{" + p + "-1}=" + s);
      });
      if (n === 1) { d = 1; sig = 1; parts = ["1"]; }
      var divs = []; for (var i = 1; i * i <= n; i++) if (n % i === 0) { divs.push(i); if (i !== n / i) divs.push(n / i); }
      divs.sort(function (a, b) { return a - b; });
      var list = divs.length <= 40 ? divs.join(", ") : divs.slice(0, 18).join(", ") + " … " + divs.slice(-6).join(", ");
      out.innerHTML =
        '<div class="tool-fact">' + K(n + " = " + factorTex(f)) + "</div>" +
        '<div class="tool-sub">d(n) = <b>' + d + "</b> divisors &nbsp;·&nbsp; σ(n) = <b>" + sig + "</b> &nbsp;·&nbsp; product of divisors = " + K("n^{d(n)/2}=" + n + "^{" + (d / 2) + "}") + "</div>" +
        '<div class="tool-fact">' + K("\\sigma(" + n + ") = " + parts.join(" \\cdot ") + " = " + sig) + "</div>" +
        '<div class="tool-cap">Divisors: ' + list + '. Each exponent e contributes a factor (e+1) to d(n) and the geometric sum 1+p+…+p<sup>e</sup> to σ(n) — that is exactly the expansion of ∏(1+p+…+p<sup>e</sup>), one term per divisor. ' +
        (sig - n === n ? "This n is <b>perfect</b> (σ(n) = 2n)." : sig - n > n ? "Here σ(n) − n = " + (sig - n) + " &gt; n, so n is <b>abundant</b>." : "Here σ(n) − n = " + (sig - n) + " &lt; n, so n is <b>deficient</b>.") + "</div>";
    }
    host.querySelector(".sd-go").addEventListener("click", run); wireEnter(host, ".sd-n", run); run();
  } };

  // ---------- average speed ----------
  W["average-speed"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Average speed over two legs</div>' +
      '<div class="tool-row">out at <input class="tool-in as-a" type="number" value="30" style="width:70px"> and back at <input class="tool-in as-b" type="number" value="60" style="width:70px"> (same distance each way) <button class="tool-btn2 as-go">Go</button></div>' +
      '<div class="tool-out as-out"></div></div>';
    var out = host.querySelector(".as-out");
    function run() {
      var a = parseFloat(host.querySelector(".as-a").value), b = parseFloat(host.querySelector(".as-b").value);
      if (!(a > 0) || !(b > 0)) { out.innerHTML = '<div class="tool-err">Enter two positive speeds.</div>'; return; }
      var harm = 2 * a * b / (a + b), arith = (a + b) / 2;
      var d = 120, t1 = d / a, t2 = d / b;
      out.innerHTML =
        '<div class="tool-fact">' + K("\\bar v = \\frac{2ab}{a+b} = \\frac{2\\cdot" + r2(a) + "\\cdot" + r2(b) + "}{" + r2(a + b) + "} = " + r2(harm)) + "</div>" +
        '<div class="tool-sub">Average speed = <b>' + r2(harm) + "</b>, <i>not</i> " + r2(arith) + ".</div>" +
        '<div class="tool-cap">Check with a ' + d + '-unit leg each way: total distance ' + (2 * d) + ", total time " + r2(t1) + " + " + r2(t2) + " = " + r2(t1 + t2) + ", so " + (2 * d) + "/" + r2(t1 + t2) + " = <b>" + r2(2 * d / (t1 + t2)) + "</b>. The slow leg takes longer, so it gets more weight — this is the <b>harmonic mean</b>, always ≤ the arithmetic mean " + r2(arith) + " (equal only when the speeds match). Equal <i>times</i> instead of equal distances would give the plain average.</div>";
    }
    host.querySelector(".as-go").addEventListener("click", run); wireEnter(host, ".as-a,.as-b", run); run();
  } };

  // ---------- sums of powers ----------
  W["power-sums"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Sums of n, n² and n³</div>' +
      '<div class="tool-row">n = <input class="tool-in ps-n" type="number" value="10" min="1" max="100000" style="width:90px"> <button class="tool-btn2 ps-go">Sum</button></div>' +
      '<div class="tool-out ps-out"></div></div>';
    var out = host.querySelector(".ps-out");
    function run() {
      var n = parseInt(host.querySelector(".ps-n").value, 10);
      if (!(n >= 1 && n <= 100000)) { out.innerHTML = '<div class="tool-err">Enter n from 1 to 100000.</div>'; return; }
      var s1 = n * (n + 1) / 2, s2 = n * (n + 1) * (2 * n + 1) / 6, s3 = s1 * s1;
      var odd = n * n;
      out.innerHTML =
        '<div class="tool-fact">' + K("\\sum_{k=1}^{" + n + "} k = \\frac{" + n + "\\cdot" + (n + 1) + "}{2} = " + s1) + "</div>" +
        '<div class="tool-fact">' + K("\\sum k^2 = \\frac{" + n + "\\cdot" + (n + 1) + "\\cdot" + (2 * n + 1) + "}{6} = " + s2) + "</div>" +
        '<div class="tool-fact">' + K("\\sum k^3 = \\left(\\frac{" + n + "\\cdot" + (n + 1) + "}{2}\\right)^{2} = " + s3) + "</div>" +
        '<div class="tool-cap">The cube sum is the <b>square of the linear sum</b>: ' + s1 + "² = " + s3 + ". Also 1 + 3 + 5 + … + " + (2 * n - 1) + " = n² = <b>" + odd + "</b>, and the sum of the first " + n + " even numbers is n(n+1) = <b>" + n * (n + 1) + "</b>. Every one of these is a polynomial in n of degree one higher than the power — the reason finite differences pin them down.</div>";
    }
    host.querySelector(".ps-go").addEventListener("click", run); wireEnter(host, ".ps-n", run); run();
  } };

  // ---------- Bayes ----------
  W["bayes-theorem"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Bayes with a base rate</div>' +
      '<div class="tool-row">P(disease) = <input class="tool-in by-pr" type="number" value="1" step="0.1" style="width:66px">% &nbsp; sensitivity P(+|D) = <input class="tool-in by-se" type="number" value="99" step="1" style="width:66px">% &nbsp; specificity P(−|¬D) = <input class="tool-in by-sp" type="number" value="95" step="1" style="width:66px">% <button class="tool-btn2 by-go">Update</button></div>' +
      '<div class="tool-out by-out"></div></div>';
    var out = host.querySelector(".by-out");
    function run() {
      var pr = parseFloat(host.querySelector(".by-pr").value) / 100,
          se = parseFloat(host.querySelector(".by-se").value) / 100,
          sp = parseFloat(host.querySelector(".by-sp").value) / 100;
      if (!(pr >= 0 && pr <= 1 && se >= 0 && se <= 1 && sp >= 0 && sp <= 1)) { out.innerHTML = '<div class="tool-err">All three must be between 0 and 100%.</div>'; return; }
      var tp = pr * se, fp = (1 - pr) * (1 - sp), post = tp / (tp + fp || 1);
      var N = 100000, a = Math.round(N * tp), b = Math.round(N * fp);
      out.innerHTML =
        '<div class="tool-fact">' + K("P(D\\mid +) = \\frac{P(+\\mid D)P(D)}{P(+\\mid D)P(D) + P(+\\mid \\neg D)P(\\neg D)} = \\frac{" + r2(tp * 1000) / 1000 + "}{" + Math.round((tp + fp) * 10000) / 10000 + "} = " + Math.round(post * 1000) / 10 + "\\%") + "</div>" +
        '<div class="tool-sub">A positive test means only a <b>' + (Math.round(post * 1000) / 10) + "%</b> chance of actually having it.</div>" +
        '<div class="tool-cap">Out of ' + N.toLocaleString() + " people: <b>" + a.toLocaleString() + "</b> true positives and <b>" + b.toLocaleString() + "</b> false positives, so " + a.toLocaleString() + " / " + (a + b).toLocaleString() + " = " + (Math.round(post * 1000) / 10) + "%. Counting whole people like this is usually faster on contests than the formula. Drag the base rate up and watch the answer swing — a rare condition drowns even a very accurate test in false positives.</div>";
    }
    host.querySelector(".by-go").addEventListener("click", run); wireEnter(host, ".by-pr,.by-se,.by-sp", run); run();
  } };

  // ---------- modular inverse ----------
  W["modular-inverse"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Modular inverse</div>' +
      '<div class="tool-row">a = <input class="tool-in mi-a" type="number" value="17" style="width:80px"> mod m = <input class="tool-in mi-m" type="number" value="43" style="width:80px"> <button class="tool-btn2 mi-go">Invert</button></div>' +
      '<div class="tool-out mi-out"></div></div>';
    var out = host.querySelector(".mi-out");
    function run() {
      var a = parseInt(host.querySelector(".mi-a").value, 10), m = parseInt(host.querySelector(".mi-m").value, 10);
      if (!isFinite(a) || !(m > 1)) { out.innerHTML = '<div class="tool-err">Enter an integer a and a modulus m &gt; 1.</div>'; return; }
      var ar = ((a % m) + m) % m, g = gcd2(ar, m);
      if (g !== 1) {
        out.innerHTML = '<div class="tool-sub">gcd(' + a + ", " + m + ") = <b>" + g + "</b> ≠ 1 — <b>no inverse exists</b>.</div>" +
          '<div class="tool-cap">a is invertible mod m exactly when gcd(a, m) = 1. Here a and m share the factor ' + g + ", so a·x runs only through multiples of " + g + " and can never hit 1.</div>";
        return;
      }
      var e = egcd(ar, m), inv = ((e[1] % m) + m) % m;
      var steps = [], x = ar, y = m;
      while (y) { steps.push(x + " = " + Math.floor(x / y) + "·" + y + " + " + (x % y)); var t = x % y; x = y; y = t; if (steps.length > 12) break; }
      out.innerHTML =
        '<div class="tool-sub">' + a + "<sup>−1</sup> ≡ <b>" + inv + "</b> (mod " + m + ")</div>" +
        '<div class="tool-fact">' + K(ar + " \\cdot " + inv + " = " + (ar * inv) + " = " + Math.floor(ar * inv / m) + " \\cdot " + m + " + 1 \\equiv 1 \\pmod{" + m + "}") + "</div>" +
        '<div class="tool-cap">Euclid downward: ' + steps.join(" &nbsp;·&nbsp; ") + '. Back-substituting gives Bézout ' + ar + "·(" + e[1] + ") + " + m + "·(" + e[2] + ") = 1; reducing the coefficient of a mod " + m + " gives <b>" + inv + "</b>." +
        (isPrime(m) ? " Since m = " + m + " is prime, Fermat also gives a<sup>−1</sup> ≡ a<sup>m−2</sup> = " + ar + "<sup>" + (m - 2) + "</sup> ≡ " + modpow(ar, m - 2, m) + "." : "") + "</div>";
    }
    host.querySelector(".mi-go").addEventListener("click", run); wireEnter(host, ".mi-a,.mi-m", run); run();
  } };

  // ---------- complex modulus / conjugate / powers of i ----------
  W["complex-basics"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool"><div class="tool-title">Drag z in the complex plane</div>' +
      '<svg viewBox="0 0 320 320" class="tool-svg cb-svg" style="touch-action:none;cursor:crosshair"></svg>' +
      '<div class="tool-cap cb-cap"></div></div>';
    var svg = host.querySelector(".cb-svg"), cap = host.querySelector(".cb-cap");
    var cx = 160, cy = 160, S = 42;                       // pixels per unit
    var z = { re: 2, im: 1.5 };
    function P(re, im) { return [cx + re * S, cy - im * S]; }
    function draw() {
      var p = P(z.re, z.im), pc = P(z.re, -z.im), r = Math.hypot(z.re, z.im);
      var g = "";
      for (var k = -3; k <= 3; k++) {
        g += '<line x1="' + (cx + k * S) + '" y1="16" x2="' + (cx + k * S) + '" y2="304" class="gl-dash"/>' +
             '<line x1="16" y1="' + (cy + k * S) + '" x2="304" y2="' + (cy + k * S) + '" class="gl-dash"/>';
      }
      svg.innerHTML = g +
        '<line x1="12" y1="160" x2="308" y2="160" class="gl-ax"/><line x1="160" y1="12" x2="160" y2="308" class="gl-ax"/>' +
        '<circle cx="160" cy="160" r="' + r2(r * S) + '" class="gc"/>' +
        '<line x1="160" y1="160" x2="' + r2(p[0]) + '" y2="' + r2(p[1]) + '" class="gl-acc"/>' +
        '<line x1="160" y1="160" x2="' + r2(pc[0]) + '" y2="' + r2(pc[1]) + '" class="gl-gold"/>' +
        '<circle cx="' + r2(pc[0]) + '" cy="' + r2(pc[1]) + '" r="5" class="gd-gold"/>' +
        '<circle cx="' + r2(p[0]) + '" cy="' + r2(p[1]) + '" r="6" class="gd-acc"/>' +
        '<text x="' + r2(p[0] + 10) + '" y="' + r2(p[1] - 8) + '" class="gt-acc">z</text>' +
        '<text x="' + r2(pc[0] + 10) + '" y="' + r2(pc[1] + 14) + '" class="gt-gold">z̄</text>' +
        '<text x="296" y="152" class="gt">Re</text><text x="166" y="24" class="gt">Im</text>';
      var th = Math.atan2(z.im, z.re) * 180 / Math.PI;
      cap.innerHTML = "z = <b>" + r2(z.re) + (z.im < 0 ? " − " : " + ") + Math.abs(r2(z.im)) + "i</b>, conjugate z̄ = " + r2(z.re) + (z.im < 0 ? " + " : " − ") + Math.abs(r2(z.im)) + "i (the mirror across the real axis). |z| = √(" + r2(z.re) + "² + " + r2(z.im) + "²) = <b>" + r2(r) + "</b>, and z·z̄ = |z|² = <b>" + r2(r * r) + "</b> — always a real number, which is why you multiply by the conjugate to clear a complex denominator. Argument ≈ " + r2(th) + "°; multiplying by i rotates z a quarter turn counterclockwise, so i⁴ = 1 and the powers of i cycle 1, i, −1, −i.";
    }
    function setFrom(e) {
      var b = svg.getBoundingClientRect(), t = (e.touches && e.touches[0]) || e;
      var vx = (t.clientX - b.left) / b.width * 320, vy = (t.clientY - b.top) / b.height * 320;
      z = { re: Math.max(-3.4, Math.min(3.4, Math.round((vx - cx) / S * 4) / 4)), im: Math.max(-3.4, Math.min(3.4, Math.round((cy - vy) / S * 4) / 4)) };
      draw();
    }
    var down = false;
    svg.addEventListener("pointerdown", function (e) { down = true; try { svg.setPointerCapture(e.pointerId); } catch (_) {} setFrom(e); e.preventDefault(); });
    svg.addEventListener("pointermove", function (e) { if (down) setFrom(e); });
    svg.addEventListener("pointerup", function (e) { down = false; try { svg.releasePointerCapture(e.pointerId); } catch (_) {} });
    draw();
  } };

})();
