// Mass points as a balancing act. A weightless triangular plate rests on a pin at P, where two
// cevians cross; the reader puts a weight on each corner. Test swings the camera from the top view,
// which is the problem as it is usually drawn, to an angled one and lets the plate go. Weights in
// the right proportion put the balance point exactly on the pin and the plate settles level; any
// other weights tip it toward their balance point until it breaks along the cevians and falls.
// New ratios deals a fresh problem. Registered for the mass-points card.
(function () {
  "use strict";
  var W = window.MATH_WIDGETS = window.MATH_WIDGETS || {};

  // ---- 3D vectors (y is up) ----
  function vadd(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function vsub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function vmul(a, k) { return [a[0] * k, a[1] * k, a[2] * k]; }
  function vdot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function vcross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function vlen(a) { return Math.sqrt(vdot(a, a)); }
  function vnorm(a) { var l = vlen(a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }
  // Rotate v about the unit axis k by angle t (Rodrigues).
  function rot(v, k, t) {
    var c = Math.cos(t), s = Math.sin(t), kv = vcross(k, v), kd = vdot(k, v) * (1 - c);
    return [v[0] * c + kv[0] * s + k[0] * kd, v[1] * c + kv[1] * s + k[1] * kd, v[2] * c + kv[2] * s + k[2] * kd];
  }
  // A rigid body's orientation is kept as its three rotated unit axes.
  function rotFrame(f, k, t) { return [rot(f[0], k, t), rot(f[1], k, t), rot(f[2], k, t)]; }
  function applyFrame(f, p) { return vadd(vadd(vmul(f[0], p[0]), vmul(f[1], p[1])), vmul(f[2], p[2])); }

  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
  function lerp2(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; }
  function inter2(p1, p2, p3, p4) {
    var d = (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0]);
    var a = p1[0] * p2[1] - p1[1] * p2[0], b = p3[0] * p4[1] - p3[1] * p4[0];
    return [(a * (p3[0] - p4[0]) - (p1[0] - p2[0]) * b) / d, (a * (p3[1] - p4[1]) - (p1[1] - p2[1]) * b) / d];
  }

  // Theme colors come from the page's CSS variables, so the canvas follows light and dark mode.
  function cssVar(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name);
    return (v && v.trim()) || fallback;
  }
  function rgba(color, a) {
    var c = color.trim(), m;
    if (c[0] === "#") {
      if (c.length === 4) c = "#" + c[1] + c[1] + c[2] + c[2] + c[3] + c[3];
      return "rgba(" + parseInt(c.substr(1, 2), 16) + "," + parseInt(c.substr(3, 2), 16) + "," + parseInt(c.substr(5, 2), 16) + "," + a + ")";
    }
    if ((m = c.match(/rgba?\(([^)]+)\)/))) { var p = m[1].split(","); return "rgba(" + p[0] + "," + p[1] + "," + p[2] + "," + a + ")"; }
    return c;
  }
  function shade(color, k) {
    var c = rgba(color, 1).match(/rgba\(([^)]+)\)/);
    if (!c) return color;
    var p = c[1].split(",").map(Number);
    return "rgb(" + Math.round(p[0] * k) + "," + Math.round(p[1] * k) + "," + Math.round(p[2] * k) + ")";
  }

  var H = 1.15, THICK = 0.06, G = 9;              // pin height, plate thickness, gravity
  var TOP = { yaw: 0, elev: Math.PI / 2 }, ANGLED = { yaw: 0.42, elev: 0.6 };
  // Side ratios p : q in lowest terms with both parts from 1 to 6.
  var RATIOS = [];
  for (var i = 1; i <= 6; i++) for (var j = 1; j <= 6; j++) if (gcd(i, j) === 1) RATIOS.push([i, j]);

  // Exact fractions {n, d}, always reduced with d > 0; the weights are compared exactly.
  function frac(n, d) { var g = gcd(n, d) || 1; return { n: n / g, d: d / g }; }
  function fadd(a, b) { return frac(a.n * b.d + b.n * a.d, a.d * b.d); }
  function fstr(a) { return a.d === 1 ? String(a.n) : a.n + "/" + a.d; }
  function fval(a) { return a.n / a.d; }
  // A whole number, a fraction like 7/2, or a decimal like 3.5; anything else, zero or negative is null.
  function parseQ(str) {
    var t = String(str).trim(), m;
    if ((m = t.match(/^(\d+)$/))) return +m[1] > 0 ? frac(+m[1], 1) : null;
    if ((m = t.match(/^(\d+)\s*\/\s*(\d+)$/))) return +m[1] > 0 && +m[2] > 0 ? frac(+m[1], +m[2]) : null;
    if ((m = t.match(/^(\d*)\.(\d{1,4})$/))) { var d = Math.pow(10, m[2].length), n = (+(m[1] || 0)) * d + +m[2]; return n > 0 ? frac(n, d) : null; }
    return null;
  }

  // A problem: a triangle with D on BC at BD : DC = p : q and E on CA at CE : EA = r : s.
  // The masses that balance are (pr, qs, ps) at (A, B, C), reduced; they put the balance point on P.
  function newProblem(prev) {
    var pq, rs;
    do {
      pq = RATIOS[Math.floor(Math.random() * RATIOS.length)];
      rs = RATIOS[Math.floor(Math.random() * RATIOS.length)];
    } while ((pq[0] === pq[1] && rs[0] === rs[1]) || (prev && prev.p === pq[0] && prev.q === pq[1] && prev.r === rs[0] && prev.s === rs[1]));
    var j = function () { return (Math.random() - 0.5) * 0.3; };
    var A = [0.05 + j(), -1.05 + j() * 0.5], B = [-1.3 + j(), 0.72 + j() * 0.4], C = [1.32 + j(), 0.78 + j() * 0.4];
    var cx = (A[0] + B[0] + C[0]) / 3, cz = (A[1] + B[1] + C[1]) / 3;
    A = [A[0] - cx, A[1] - cz]; B = [B[0] - cx, B[1] - cz]; C = [C[0] - cx, C[1] - cz];
    var p = pq[0], q = pq[1], r = rs[0], s = rs[1];
    var D = lerp2(B, C, p / (p + q)), E = lerp2(C, A, r / (r + s)), P = inter2(A, D, B, E);
    var m = [p * r, q * s, p * s], g = gcd(gcd(m[0], m[1]), m[2]);
    m = [m[0] / g, m[1] / g, m[2] / g];
    var M = m[0] + m[1] + m[2];
    var bal = [(m[0] * A[0] + m[1] * B[0] + m[2] * C[0]) / M, (m[0] * A[1] + m[1] * B[1] + m[2] * C[1]) / M];
    if (Math.hypot(bal[0] - P[0], bal[1] - P[1]) > 1e-9 && window.console) console.warn("mass-balance: answer does not balance at P");
    // One corner's weight is given. It is chosen so that at least one of the other two comes out as
    // a fraction whenever that is possible, which is what makes the problem more than a lookup.
    var fixed, fw, tries = 0;
    do { fixed = Math.floor(Math.random() * 3); fw = 1 + Math.floor(Math.random() * 6); tries++; }
    while (tries < 80 && [0, 1, 2].every(function (i) { return (fw * m[i]) % m[fixed] === 0; }));
    var ans = [0, 1, 2].map(function (i) { return frac(fw * m[i], m[fixed]); });
    return { p: p, q: q, r: r, s: s, A: A, B: B, C: C, D: D, E: E, P: P, m: m, fixed: fixed, ans: ans };
  }

  W["mass-points"] = { mount: function (host) {
    host.innerHTML =
      '<div class="tool mb-tool"><div class="tool-title">Balance the plate</div>' +
      '<div class="tool-cap mb-prob"></div>' +
      '<div class="tool-row mb-row">' +
        '<label>A <input class="tool-in mb-in" data-v="0" type="text" inputmode="text" autocomplete="off" placeholder="?"></label>' +
        '<label>B <input class="tool-in mb-in" data-v="1" type="text" inputmode="text" autocomplete="off" placeholder="?"></label>' +
        '<label>C <input class="tool-in mb-in" data-v="2" type="text" inputmode="text" autocomplete="off" placeholder="?"></label>' +
        '<button type="button" class="tool-btn2 mb-test">Test</button>' +
        '<button type="button" class="tool-btn mb-new">New problem</button>' +
        '<button type="button" class="tool-btn mb-view">3D view</button>' +
      '</div>' +
      '<canvas class="mb-canvas" role="img" aria-label="A triangular plate on a pin, seen from above or at an angle"></canvas>' +
      '<div class="tool-cap mb-out" aria-live="polite"></div></div>';
    var cv = host.querySelector(".mb-canvas"), ctx = cv.getContext("2d");
    var ins = host.querySelectorAll(".mb-in"), out = host.querySelector(".mb-out"), prob = host.querySelector(".mb-prob");
    var viewBtn = host.querySelector(".mb-view");
    var pr = newProblem(null);
    var cam = { yaw: TOP.yaw, elev: TOP.elev }, camFrom = null, camTo = null, camT = 0, afterCam = null;
    var state = "idle", tilt = { k: [1, 0, 0], th: 0, w: 0 }, t0 = 0, bodies = [], wq = [null, null, null];
    var W3 = 0, H3 = 0, F = 1, running = false, last = 0, col = {};

    function readColors() {
      col = {
        acc: cssVar("--accent", "#5b8cff"), gold: cssVar("--gold", "#f5c451"), grn: cssVar("--level-mc", "#28a75a"),
        pink: cssVar("--level-oly", "#ef5f8b"), text: cssVar("--text", "#222"), dim: cssVar("--text-dim", "#555"),
        faint: cssVar("--text-faint", "#aaa"), bg: cssVar("--bg-card", "#fff"), border: cssVar("--border", "#ddd")
      };
      col.font = getComputedStyle(document.body).fontFamily || "system-ui";
    }
    function size() {
      var w = Math.max(260, Math.min(640, host.clientWidth - 34)), h = Math.round(w * 0.68), d = window.devicePixelRatio || 1;
      cv.style.width = w + "px"; cv.style.height = h + "px"; cv.width = Math.round(w * d); cv.height = Math.round(h * d);
      ctx.setTransform(d, 0, 0, d, 0, 0); W3 = w; H3 = h; F = w * 1.3;
    }

    // ---- camera ----
    var T = [0, H * 0.45, 0], R = 6.2;
    function camPos() { return vadd(T, vmul([Math.cos(cam.elev) * Math.sin(cam.yaw), Math.sin(cam.elev), Math.cos(cam.elev) * Math.cos(cam.yaw)], R)); }
    function proj(p) {
      var v = vsub(p, T), cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw), ce = Math.cos(cam.elev), se = Math.sin(cam.elev);
      var x1 = v[0] * cy - v[2] * sy, z1 = v[0] * sy + v[2] * cy;
      var yc = v[1] * ce - z1 * se, zc = v[1] * se + z1 * ce, dd = Math.max(0.3, R - zc);
      return [W3 / 2 + F * x1 / dd, H3 * 0.55 - F * yc / dd, zc];
    }

    // ---- the plate and its weights, before anything breaks ----
    function plateW(u, w, off) {
      var p = [u, H + (off || 0), w];
      if (!tilt.th) return p;
      var Q = [pr.P[0], H, pr.P[1]];
      return vadd(Q, rot(vsub(p, Q), tilt.k, tilt.th));
    }
    function plateFrame() { return rotFrame([[1, 0, 0], [0, 1, 0], [0, 0, 1]], tilt.k, tilt.th); }
    function boxSize(q) { return 0.13 + 0.028 * Math.min(fval(q), 14); }
    var PIECES = function () { return [[pr.A, pr.B, pr.P], [pr.B, pr.D, pr.P], [pr.D, pr.C, pr.E, pr.P], [pr.E, pr.A, pr.P]]; };

    // A slab (top, bottom and side faces) from a polygon given as world points and a unit normal.
    function slabFaces(pts, n, fill, kind) {
      var h = vmul(n, THICK / 2), top = pts.map(function (p) { return vadd(p, h); }), bot = pts.map(function (p) { return vsub(p, h); });
      var c = pts.reduce(function (a, p) { return vadd(a, vmul(p, 1 / pts.length)); }, [0, 0, 0]);
      var faces = [{ pts: top, n: n, fill: fill, kind: kind }, { pts: bot.slice().reverse(), n: vmul(n, -1), fill: fill, kind: "under" }];
      for (var i = 0; i < pts.length; i++) {
        var a = pts[i], b = pts[(i + 1) % pts.length], on = vnorm(vcross(vsub(b, a), n));
        if (vdot(on, vsub(vmul(vadd(a, b), 0.5), c)) < 0) on = vmul(on, -1);
        faces.push({ pts: [top[i], top[(i + 1) % pts.length], bot[(i + 1) % pts.length], bot[i]], n: on, fill: fill, kind: "side" });
      }
      return faces;
    }
    function boxFaces(c, f, s, m, color) {
      var h = s / 2, faces = [], dirs = [[0, 1], [0, -1], [1, 1], [1, -1], [2, 1], [2, -1]];
      dirs.forEach(function (d) {
        var ax = f[d[0]], o = f[(d[0] + 1) % 3], p = f[(d[0] + 2) % 3], ctr = vadd(c, vmul(ax, h * d[1]));
        var pts = [vadd(vadd(ctr, vmul(o, h)), vmul(p, h)), vadd(vsub(ctr, vmul(o, h)), vmul(p, h)), vsub(vsub(ctr, vmul(o, h)), vmul(p, h)), vsub(vadd(ctr, vmul(o, h)), vmul(p, h))];
        faces.push({ pts: pts, n: vmul(ax, d[1]), fill: color, kind: "box", label: (d[0] === 1 && d[1] === 1) ? fstr(m) : null, ctr: ctr });
      });
      return faces;
    }

    // ---- drawing ----
    function poly(pts2, fill, stroke, lw) {
      ctx.beginPath(); pts2.forEach(function (p, i) { if (i) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); }); ctx.closePath();
      if (fill) { ctx.fillStyle = fill; ctx.fill(); }
      if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw || 1.2; ctx.stroke(); }
    }
    function line3(a, b, color, lw, dash) {
      var p = proj(a), q = proj(b); ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]);
      ctx.strokeStyle = color; ctx.lineWidth = lw || 1.5; ctx.setLineDash(dash || []); ctx.stroke(); ctx.setLineDash([]);
    }
    function label(p3, text, color, size, bold) {
      var p = proj(p3); ctx.font = (bold ? "600 " : "") + (size || 12.5) + "px " + col.font; ctx.fillStyle = color;
      ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(text, p[0], p[1]);
    }
    var LIGHT = vnorm([0.35, 1, 0.45]);
    function drawFaces(faces) {
      var eye = camPos();
      faces = faces.filter(function (f) {
        var c = f.pts.reduce(function (a, p) { return vadd(a, vmul(p, 1 / f.pts.length)); }, [0, 0, 0]);
        f.c = c; return !f.n || vdot(f.n, vsub(eye, c)) > 0;
      });
      faces.forEach(function (f) { f.depth = proj(f.c)[2]; });
      faces.sort(function (a, b) { return a.depth - b.depth; });
      faces.forEach(function (f) {
        if (f.kind === "pin") { line3(f.pts[0], f.pts[1], col.dim, 3.2); return; }
        var lit = 0.62 + 0.38 * Math.abs(vdot(f.n, LIGHT)), p2 = f.pts.map(proj);
        if (f.kind === "top") poly(p2, rgba(f.fill, 0.22), f.fill, 1.8);
        else if (f.kind === "under") poly(p2, shade(f.fill, 0.55 * lit), null);
        else if (f.kind === "side") poly(p2, shade(f.fill, 0.7 * lit), null);
        else if (f.kind === "box") {
          poly(p2, shade(f.fill, lit), rgba(col.bg, 0.5), 1);
          if (f.label) label(f.ctr, f.label, "#fff", 12, true);
        }
        if (f.after) f.after();
      });
    }
    function drawFloor() {
      var n = 6, e = 2.4;
      poly([[-e, 0, -e], [e, 0, -e], [e, 0, e], [-e, 0, e]].map(proj), rgba(col.dim, 0.05), null);
      for (var i = -n; i <= n; i++) {
        var t = e * i / n;
        line3([t, 0, -e], [t, 0, e], rgba(col.faint, 0.45), 0.8); line3([-e, 0, t], [e, 0, t], rgba(col.faint, 0.45), 0.8);
      }
    }
    function drawPlateMarks() {
      // cevians, points and the ratio labels, drawn on the plate's top face
      var up = THICK / 2 + 0.002, P = pr.P;
      line3(plateW(pr.A[0], pr.A[1], up), plateW(pr.D[0], pr.D[1], up), col.acc, 1.6);
      line3(plateW(pr.B[0], pr.B[1], up), plateW(pr.E[0], pr.E[1], up), col.acc, 1.6);
      var cen = [(pr.A[0] + pr.B[0] + pr.C[0]) / 3, (pr.A[1] + pr.B[1] + pr.C[1]) / 3];
      function out(p, k) { var d = [p[0] - cen[0], p[1] - cen[1]], l = Math.hypot(d[0], d[1]) || 1; return [p[0] + d[0] / l * k, p[1] + d[1] / l * k]; }
      function edgeLab(a, b, t) { var m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], o = out(m, 0.2); label(plateW(o[0], o[1], up), t, col.gold, 13, true); }
      edgeLab(pr.B, pr.D, pr.p); edgeLab(pr.D, pr.C, pr.q); edgeLab(pr.C, pr.E, pr.r); edgeLab(pr.E, pr.A, pr.s);
      [["A", pr.A, 0.2], ["B", pr.B, 0.2], ["C", pr.C, 0.2], ["D", pr.D, 0.2], ["E", pr.E, 0.2]].forEach(function (L) {
        var o = out(L[1], L[2] + (wq[["A", "B", "C"].indexOf(L[0])] ? 0.12 : 0)); label(plateW(o[0], o[1], up), L[0], col.dim, 12.5);
      });
      var pp = proj(plateW(P[0], P[1], up)); ctx.beginPath(); ctx.arc(pp[0], pp[1], 3.6, 0, 2 * Math.PI); ctx.fillStyle = col.pink; ctx.fill();
      label(plateW(P[0] + 0.12, P[1] - 0.12, up), "P", col.pink, 12.5, true);
    }
    function topView() { return cam.elev > 1.45; }
    function draw() {
      if (!W3) return;
      ctx.clearRect(0, 0, W3, H3); ctx.fillStyle = col.bg; ctx.fillRect(0, 0, W3, H3);
      drawFloor();
      var pin0 = [pr.P[0], 0, pr.P[1]];
      // The pin runs up through the plate to its top face, so it meets the P dot from every angle.
      var pin1 = (state === "fall" || state === "done") ? [pr.P[0], H, pr.P[1]] : plateW(pr.P[0], pr.P[1], THICK / 2);
      var faces = [];
      if (state !== "fall" && state !== "done") {
        var pts = [pr.A, pr.B, pr.C].map(function (v) { return plateW(v[0], v[1]); });
        // shadow straight down, left out of the pure top view so that it reads as the flat problem
        if (!topView()) poly(pts.map(function (p) { return proj([p[0], 0.001, p[2]]); }), rgba(col.dim, 0.1), null);
        var fr = plateFrame(), sl = slabFaces(pts, fr[1], col.acc, "top");
        sl[0].after = drawPlateMarks; faces = faces.concat(sl);
        [pr.A, pr.B, pr.C].forEach(function (v, i) {
          if (!wq[i]) return;
          var s = boxSize(wq[i]);
          faces = faces.concat(boxFaces(plateW(v[0], v[1], THICK / 2 + s / 2), fr, s, wq[i], col.gold));
        });
      } else {
        bodies.forEach(function (b) {
          var pts = b.local.map(function (l) { return vadd(b.c, applyFrame(b.f, l)); });
          if (b.box) faces = faces.concat(boxFaces(b.c, b.f, b.s, b.m, col.gold));
          else { poly(pts.map(function (p) { return proj([p[0], 0.001, p[2]]); }), rgba(col.dim, 0.08), null); faces = faces.concat(slabFaces(pts, applyFrame(b.f, [0, 1, 0]), col.acc, "top")); }
        });
      }
      // Under an intact plate the pin is always hidden by it, so it is drawn first. Once the pieces
      // fly it is depth-sorted with them, since a piece can land behind it as well as in front.
      var base = proj(pin0);
      if (!topView()) { ctx.beginPath(); ctx.ellipse(base[0], base[1], 9, 9 * Math.max(0.25, Math.sin(cam.elev)), 0, 0, 2 * Math.PI); ctx.fillStyle = rgba(col.dim, 0.35); ctx.fill(); }
      var pin = { pts: [pin0, pin1], kind: "pin" };
      if (state === "fall" || state === "done") faces.push(pin); else line3(pin0, pin1, col.dim, 3.2);
      drawFaces(faces);
    }

    // ---- simulation ----
    function inputsValid() {
      var ok = true;
      for (var i = 0; i < 3; i++) { var q = parseQ(ins[i].value); if (q && fval(q) > 999) q = null; wq[i] = q; if (!q) ok = false; }
      return ok;
    }
    // x/y balances like m_x/m_y exactly when x * m_y = y * m_x, compared across the denominators.
    function same(x, y, mx, my) { return x.n * y.d * my === y.n * x.d * mx; }
    function balanced() { return same(wq[0], wq[1], pr.m[0], pr.m[1]) && same(wq[0], wq[2], pr.m[0], pr.m[2]); }
    function breakApart() {
      var Q = [pr.P[0], H, pr.P[1]], om = vmul(tilt.k, tilt.w), fr = plateFrame();
      bodies = PIECES().map(function (poly2) {
        var pts = poly2.map(function (v) { return plateW(v[0], v[1]); });
        var c = pts.reduce(function (a, p) { return vadd(a, vmul(p, 1 / pts.length)); }, [0, 0, 0]);
        // local coordinates in the body's frame, which starts as the plate's frame
        var local = pts.map(function (p) { var d = vsub(p, c); return [vdot(d, fr[0]), vdot(d, fr[1]), vdot(d, fr[2])]; });
        var r = vsub(c, Q), outw = vnorm([r[0], 0, r[2]]);
        var v = vadd(vadd(vcross(om, r), vmul(outw, 0.5 + Math.random() * 0.5)), [0, 0.35 + Math.random() * 0.3, 0]);
        var w = vadd(om, [(Math.random() - 0.5) * 3, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 3]);
        return { c: c, f: fr, local: local, v: v, w: w, rest: false };
      });
      [pr.A, pr.B, pr.C].forEach(function (vv, i) {
        if (!wq[i]) return;
        var s = boxSize(wq[i]), c = plateW(vv[0], vv[1], THICK / 2 + s / 2), r = vsub(c, Q);
        var v = vadd(vcross(om, r), vmul(vnorm([r[0], 0, r[2]]), 0.4 + Math.random() * 0.4));
        bodies.push({ box: true, s: s, m: wq[i], c: c, f: fr, local: boxLocal(s), v: v, w: [(Math.random() - 0.5) * 5, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 5], rest: false });
      });
    }
    function boxLocal(s) { var h = s / 2, L = []; [-h, h].forEach(function (x) { [-h, h].forEach(function (y) { [-h, h].forEach(function (z) { L.push([x, y, z]); }); }); }); return L; }
    function stepBodies(dt) {
      var moving = false;
      bodies.forEach(function (b) {
        if (b.rest) return;
        b.v[1] -= G * dt;
        b.c = vadd(b.c, vmul(b.v, dt));
        var wl = vlen(b.w); if (wl > 1e-6) b.f = rotFrame(b.f, vmul(b.w, 1 / wl), wl * dt);
        var hs = b.box ? b.s / 2 : THICK / 2, minY = Infinity;
        b.local.forEach(function (l) {
          var p = vadd(b.c, applyFrame(b.f, l));
          if (b.box) minY = Math.min(minY, p[1]);
          else { var n = applyFrame(b.f, [0, 1, 0]); minY = Math.min(minY, p[1] - Math.abs(n[1]) * hs); }
        });
        if (minY < 0) {
          b.c[1] -= minY;
          if (b.v[1] < 0) b.v[1] = -b.v[1] * 0.28;
          b.v[0] *= 0.82; b.v[2] *= 0.82; b.w = vmul(b.w, 0.72); b.ground = true;
        }
        var flat = true;
        if (b.ground) {
          // tip over onto the nearest flat side, the part of the fall this model does not simulate
          var best = null;
          (b.box ? [0, 1, 2] : [1]).forEach(function (i) { var a = b.f[i]; if (!best || Math.abs(a[1]) > Math.abs(best[1])) best = a; });
          var target = best[1] >= 0 ? [0, 1, 0] : [0, -1, 0], ax = vcross(best, target), sa = vlen(ax);
          if (sa > 1e-3) { var ang = Math.asin(Math.min(1, sa)); b.f = rotFrame(b.f, vmul(ax, 1 / sa), Math.min(ang, Math.max(0.02, ang * 6 * dt))); flat = false; }
        }
        if (b.ground && flat && vlen(b.v) < 0.05 && vlen(b.w) < 0.1) { b.v = [0, 0, 0]; b.w = [0, 0, 0]; b.rest = true; }
        else moving = true;
      });
      return moving;
    }
    function frame(ts) {
      if (!document.body.contains(cv)) { running = false; return; }
      var dt = Math.min(0.033, (ts - (last || ts)) / 1000); last = ts;
      var busy = false;
      if (camTo) {
        camT = Math.min(1, camT + dt / 0.85); var e = camT < 0.5 ? 2 * camT * camT : 1 - Math.pow(-2 * camT + 2, 2) / 2;
        cam.yaw = camFrom.yaw + (camTo.yaw - camFrom.yaw) * e; cam.elev = camFrom.elev + (camTo.elev - camFrom.elev) * e;
        if (camT >= 1) { camTo = null; var f = afterCam; afterCam = null; if (f) f(); }
        busy = true;
      } else if (state === "wobble") {
        var t = (ts - t0) / 1000; tilt.th = 0.08 * Math.exp(-2.4 * t) * Math.sin(11 * t);
        if (t > 2.4) { tilt.th = 0; state = "balanced"; } else busy = true;
      } else if (state === "tip") {
        tilt.w += tilt.acc * dt; tilt.th += tilt.w * dt;
        if (tilt.th > 0.5) { breakApart(); state = "fall"; }
        busy = true;
      } else if (state === "fall") {
        if (stepBodies(dt) && (ts - t0) < 7000) busy = true; else state = "done";
      }
      draw();
      if (busy) requestAnimationFrame(frame); else running = false;
    }
    function kick() { if (!running) { running = true; last = 0; requestAnimationFrame(frame); } }
    function moveCam(to, then) { camFrom = { yaw: cam.yaw, elev: cam.elev }; camTo = to; camT = 0; afterCam = then || null; viewBtn.textContent = to === TOP ? "3D view" : "Top view"; kick(); }

    // ---- text ----
    var NAMES = ["A", "B", "C"];
    function setupInputs() {
      ins.forEach(function (inp, i) {
        var given = i === pr.fixed;
        inp.value = given ? fstr(pr.ans[i]) : ""; inp.readOnly = given; inp.classList.toggle("mb-given", given);
        inp.setAttribute("aria-label", "weight at " + NAMES[i] + (given ? " (given)" : ""));
      });
      inputsValid();
    }
    function problemText() {
      var others = NAMES.filter(function (_, i) { return i !== pr.fixed; });
      prob.textContent = "The top view is the problem: BD : DC = " + pr.p + " : " + pr.q + " and CE : EA = " + pr.r + " : " + pr.s +
        ", the gold numbers. " + NAMES[pr.fixed] + " already carries a weight of " + fstr(pr.ans[pr.fixed]) + ". Choose the weights at " + others[0] + " and " + others[1] +
        " so that the weightless plate balances on the pin at P, where the cevians cross, then press Test. Fractions such as 7/2 are fine.";
    }
    // a : b for two fractions, cleared to whole numbers in lowest terms
    function ratio(a, b) { var x = a.n * b.d, y = b.n * a.d, g = gcd(x, y); return (x / g) + " : " + (y / g); }
    function verdict(ok) {
      var a = wq[0], b = wq[1], c = wq[2];
      if (ok) {
        out.innerHTML = "Balanced. B and C balance at D, which carries " + fstr(b) + " + " + fstr(c) + " = " + fstr(fadd(b, c)) + ", and A and C balance at E, which carries " +
          fstr(a) + " + " + fstr(c) + " = " + fstr(fadd(a, c)) + ". So AP : PD = " + ratio(fadd(b, c), a) + " and BP : PE = " + ratio(fadd(a, c), b) + "." +
          ' <button type="button" class="tool-btn2 mb-next">Next problem</button>';
        return;
      }
      var msgs = [];
      if (b.n * c.d * pr.p !== c.n * b.d * pr.q) msgs.push("B and C do not balance at D: with BD : DC = " + pr.p + " : " + pr.q + ", the weights need B : C = " + pr.q + " : " + pr.p + ", the heavier weight at the nearer end.");
      if (c.n * a.d * pr.r !== a.n * c.d * pr.s) msgs.push("A and C do not balance at E: with CE : EA = " + pr.r + " : " + pr.s + ", the weights need C : A = " + pr.s + " : " + pr.r + ".");
      out.innerHTML = "It tips toward the heavy side and breaks. " + msgs.join(" ") +
        ' <button type="button" class="tool-btn2 mb-retry">Reset and try again</button>';
    }

    // ---- controls ----
    function assemble() { state = "idle"; tilt = { k: [1, 0, 0], th: 0, w: 0 }; bodies = []; }
    function test() {
      if (!inputsValid()) { out.innerHTML = '<span class="tool-err">Enter a positive whole number or fraction, such as 7/2, for each corner.</span>'; draw(); return; }
      assemble(); out.textContent = "";
      var go = function () {
        t0 = performance.now();
        if (balanced()) { tilt.k = vnorm([Math.random() - 0.5, 0, Math.random() - 0.5]); state = "wobble"; }
        else {
          var w = wq.map(fval), M = w[0] + w[1] + w[2];
          var g = [(w[0] * pr.A[0] + w[1] * pr.B[0] + w[2] * pr.C[0]) / M, (w[0] * pr.A[1] + w[1] * pr.B[1] + w[2] * pr.C[1]) / M];
          var d = [g[0] - pr.P[0], g[1] - pr.P[1]], L = Math.hypot(d[0], d[1]) || 1e-6;
          // tipping axis: horizontal, perpendicular to the offset, oriented so the balance point goes down
          tilt.k = [d[1] / L, 0, -d[0] / L]; tilt.w = 0; tilt.acc = 2.5 + 7 * Math.min(1, L / 0.4); state = "tip";
        }
        verdict(state === "wobble");
        kick();
      };
      if (Math.abs(cam.elev - TOP.elev) < 0.05) moveCam(ANGLED, go); else go();
    }
    host.querySelector(".mb-test").addEventListener("click", test);
    function nextProblem() { pr = newProblem(pr); assemble(); setupInputs(); problemText(); out.textContent = ""; moveCam(TOP); }
    host.querySelector(".mb-new").addEventListener("click", nextProblem);
    // the buttons that appear with a verdict: after a fall, rebuild the plate and try again; after a
    // balance, deal the next problem
    out.addEventListener("click", function (e) {
      if (e.target.closest(".mb-next")) nextProblem();
      else if (e.target.closest(".mb-retry")) {
        assemble(); setupInputs(); out.textContent = "Enter new weights and press Test again."; moveCam(TOP); draw();
        ins[[0, 1, 2].filter(function (i) { return i !== pr.fixed; })[0]].focus();
      }
    });
    viewBtn.addEventListener("click", function () { moveCam(Math.abs(cam.elev - TOP.elev) < 0.05 ? ANGLED : TOP); });
    ins.forEach(function (inp) {
      inp.addEventListener("input", function () {
        if (state === "done" || state === "balanced" || state === "fall") assemble();
        inputsValid(); draw();
      });
      inp.addEventListener("keydown", function (e) { if (e.key === "Enter") test(); });
    });
    // drag with a mouse or pen to look around; touch keeps scrolling the page and uses the view button
    var drag = null;
    cv.addEventListener("pointerdown", function (e) { if (e.pointerType === "touch" || camTo) return; drag = [e.clientX, e.clientY]; cv.setPointerCapture(e.pointerId); });
    cv.addEventListener("pointermove", function (e) {
      if (!drag) return;
      // grab-and-turn: dragging right turns the plate to the right, which moves the camera the other way
      cam.yaw -= (e.clientX - drag[0]) * 0.008; cam.elev = Math.max(0.18, Math.min(Math.PI / 2, cam.elev + (e.clientY - drag[1]) * 0.008));
      drag = [e.clientX, e.clientY]; viewBtn.textContent = Math.abs(cam.elev - TOP.elev) < 0.05 ? "3D view" : "Top view"; if (!running) draw();
    });
    cv.addEventListener("pointerup", function () { drag = null; });
    cv.addEventListener("pointercancel", function () { drag = null; });
    if (window.ResizeObserver) new ResizeObserver(function () { if (document.body.contains(cv)) { size(); draw(); } }).observe(host);
    var mq = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    if (mq && mq.addEventListener) mq.addEventListener("change", function () { readColors(); draw(); });
    new MutationObserver(function () { readColors(); if (!running) draw(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });

    readColors(); size(); setupInputs(); problemText(); draw();
  } };
})();
