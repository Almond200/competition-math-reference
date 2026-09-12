// Interactive, draggable geometry widgets. Each registers into window.MATH_WIDGETS
// keyed by formula id; app.js mounts it on that formula's detail page.
(function () {
  "use strict";
  var W = window.MATH_WIDGETS = window.MATH_WIDGETS || {};

  // ---- vector helpers (screen coords, y down) ----
  var sub = function (a, b) { return [a[0] - b[0], a[1] - b[1]]; };
  var add = function (a, b) { return [a[0] + b[0], a[1] + b[1]]; };
  var mul = function (a, k) { return [a[0] * k, a[1] * k]; };
  var dot = function (a, b) { return a[0] * b[0] + a[1] * b[1]; };
  var len = function (a) { return Math.hypot(a[0], a[1]); };
  var dist = function (a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1]); };
  var norm = function (a) { var l = len(a) || 1; return [a[0] / l, a[1] / l]; };
  var perp = function (a) { return [-a[1], a[0]]; };
  var mid = function (a, b) { return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; };
  function lineInt(p1, p2, p3, p4) {
    var x1 = p1[0], y1 = p1[1], x2 = p2[0], y2 = p2[1], x3 = p3[0], y3 = p3[1], x4 = p4[0], y4 = p4[1];
    var den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (!den) return [(x1 + x2) / 2, (y1 + y2) / 2];
    var a = x1 * y2 - y1 * x2, b = x3 * y4 - y3 * x4;
    return [(a * (x3 - x4) - (x1 - x2) * b) / den, (a * (y3 - y4) - (y1 - y2) * b) / den];
  }
  function foot(p, a, b) { var ab = sub(b, a); var t = dot(sub(p, a), ab) / (dot(ab, ab) || 1); return add(a, mul(ab, t)); }
  function circum(A, B, C) { var m1 = mid(A, B), m2 = mid(B, C); return lineInt(m1, add(m1, perp(sub(B, A))), m2, add(m2, perp(sub(C, B)))); }
  function ortho(A, B, C) { return lineInt(A, foot(A, B, C), B, foot(B, A, C)); }
  function centroid(A, B, C) { return [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3]; }
  function circleLine(cen, r, p, q) {
    var d = sub(q, p), f = sub(p, cen);
    var a = dot(d, d), b = 2 * dot(f, d), c = dot(f, f) - r * r, disc = b * b - 4 * a * c;
    if (disc < 0 || a === 0) return null;
    var s = Math.sqrt(disc);
    return [add(p, mul(d, (-b - s) / (2 * a))), add(p, mul(d, (-b + s) / (2 * a)))];
  }
  function projectToCircle(p, cen, r) { return add(cen, mul(norm(sub(p, cen)), r)); }

  // ---- svg string builders ----
  var r1 = function (x) { return Math.round(x * 10) / 10; };
  function seg(a, b, cls) { return '<line x1="' + r1(a[0]) + '" y1="' + r1(a[1]) + '" x2="' + r1(b[0]) + '" y2="' + r1(b[1]) + '" class="' + (cls || "gl") + '"/>'; }
  function circ(c, r, cls) { return '<circle cx="' + r1(c[0]) + '" cy="' + r1(c[1]) + '" r="' + r1(r) + '" class="' + (cls || "gc") + '"/>'; }
  function dotS(p, cls, rr) { return '<circle cx="' + r1(p[0]) + '" cy="' + r1(p[1]) + '" r="' + (rr || 4) + '" class="' + (cls || "gd") + '"/>'; }
  // Right-angle bracket at F, arms pointing toward q and r. Marks a perpendicular the way a
  // figure should, rather than leaving the reader to infer it from the picture.
  function rAngle(F, q, r, size) {
    var k = size || 8, u = mul(norm(sub(q, F)), k), v = mul(norm(sub(r, F)), k);
    var a = add(F, u), b = add(add(F, u), v), c = add(F, v);
    return '<polyline points="' + r1(a[0]) + ',' + r1(a[1]) + ' ' + r1(b[0]) + ',' + r1(b[1]) +
           ' ' + r1(c[0]) + ',' + r1(c[1]) + '" fill="none" class="gl"/>';
  }
  function polyS(pts, cls) { return '<polygon points="' + pts.map(function (p) { return r1(p[0]) + "," + r1(p[1]); }).join(" ") + '" class="' + (cls || "gtri") + '"/>'; }
  function txt(p, s, cls) { return '<text x="' + r1(p[0]) + '" y="' + r1(p[1]) + '" class="' + (cls || "gt") + '">' + s + "</text>"; }
  function lbl(p, from, s, cls) { var d = norm(sub(p, from)); return txt(add(p, mul(d, 15)), s, cls); }
  function ext(a, b, k) { var d = norm(sub(b, a)); return [add(a, mul(d, -k)), add(b, mul(d, k))]; }  // extend segment both ways

  // The full line through a and b, clipped to the widget frame (Liang-Barsky).
  // Extending a segment by a guessed number of pixels leaves the line stopping
  // short whenever a point of interest sits outside it — Menelaus' F, the
  // secant's external point, the foot of a perpendicular — which reads as the
  // line partly vanishing. Clipping to the frame always spans the whole view.
  function lineSpan(a, b, w, h, pad) {
    if (pad == null) pad = 4;
    var d = sub(b, a), L = len(d);
    if (L < 1e-6) return [a, b];
    d = mul(d, 1 / L);
    var t0 = -1e9, t1 = 1e9;
    var P = [-d[0], d[0], -d[1], d[1]];
    var Q = [a[0] - pad, (w - pad) - a[0], a[1] - pad, (h - pad) - a[1]];
    for (var i = 0; i < 4; i++) {
      if (Math.abs(P[i]) < 1e-9) { if (Q[i] < 0) return [a, b]; continue; }
      var t = Q[i] / P[i];
      if (P[i] < 0) { if (t > t0) t0 = t; } else { if (t < t1) t1 = t; }
    }
    if (t0 >= t1) return [a, b];
    return [add(a, mul(d, t0)), add(a, mul(d, t1))];
  }
  function fmt(x) { return (Math.round(x * 100) / 100).toString(); }

  // ---- generic draggable canvas ----
  function mountGeo(host, cfg) {
    if (!host) return;
    // Frames default to origin 0,0 but may start negative, giving figures that
    // expand as you drag (Pythagoras' squares) somewhere to expand into.
    var vx = cfg.vx || 0, vy = cfg.vy || 0;
    var wrap = document.createElement("div");
    wrap.className = "geo-widget";
    wrap.innerHTML =
      '<div class="geo-title">' + (cfg.title || "Play with it") + "</div>" +
      '<svg viewBox="' + vx + " " + vy + " " + cfg.w + " " + cfg.h + '" class="geo-svg" role="img"></svg>' +
      '<div class="geo-cap"></div>' +
      '<div class="geo-hint">' + (cfg.hint || "Drag the highlighted points.") + "</div>";
    host.appendChild(wrap);
    var svg = wrap.querySelector("svg"), cap = wrap.querySelector(".geo-cap");
    var pts = {};
    Object.keys(cfg.init).forEach(function (k) { pts[k] = cfg.init[k].slice(); });

    function redraw() {
      var res = cfg.render(pts);
      var handles = "";
      Object.keys(cfg.drag || {}).forEach(function (name) {
        if (!pts[name]) return;
        handles += '<circle cx="' + r1(pts[name][0]) + '" cy="' + r1(pts[name][1]) + '" r="11" class="geo-handle" data-pt="' + name + '"/>';
      });
      svg.innerHTML = res.body + handles;
      cap.innerHTML = res.caption || "";
    }
    redraw();
    var dragging = null;
    function toSvg(e) {
      var pt = svg.createSVGPoint(), t = (e.touches && e.touches[0]) || e;
      pt.x = t.clientX; pt.y = t.clientY;
      var m = svg.getScreenCTM(); if (!m) return null;
      var l = pt.matrixTransform(m.inverse()); return [l.x, l.y];
    }
    svg.addEventListener("pointerdown", function (e) {
      var h = e.target.closest && e.target.closest(".geo-handle"); if (!h) return;
      dragging = h.getAttribute("data-pt"); try { svg.setPointerCapture(e.pointerId); } catch (_) {} e.preventDefault();
    });
    svg.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var xy = toSvg(e); if (!xy) return;
      var d = cfg.drag[dragging];
      xy = [Math.max(vx + 10, Math.min(vx + cfg.w - 10, xy[0])),
            Math.max(vy + 10, Math.min(vy + cfg.h - 10, xy[1]))];
      if (d && d.constrain) xy = d.constrain(xy, pts);
      pts[dragging] = xy; redraw();
    });
    function end(e) { if (dragging) { try { svg.releasePointerCapture(e.pointerId); } catch (_) {} dragging = null; } }
    svg.addEventListener("pointerup", end);
    svg.addEventListener("pointercancel", end);
  }

  // ---------- Simson line ----------
  W["simson-line"] = { mount: function (host) {
    var A = [130, 70], B = [70, 275], C = [355, 255];
    var cen = circum(A, B, C), r = dist(cen, A);
    mountGeo(host, {
      title: "Simson line",
      hint: "Drag P around the circle, or move the triangle.",
      w: 430, h: 340,
      init: { A: A, B: B, C: C, P: projectToCircle([400, 120], cen, r) },
      drag: {
        A: {}, B: {}, C: {},
        P: { constrain: function (xy, p) { var c = circum(p.A, p.B, p.C); return projectToCircle(xy, c, dist(c, p.A)); } }
      },
      render: function (p) {
        var c = circum(p.A, p.B, p.C), rr = dist(c, p.A);
        p.P = projectToCircle(p.P, c, rr);
        var fa = foot(p.P, p.B, p.C), fb = foot(p.P, p.C, p.A), fc = foot(p.P, p.A, p.B);
        var e = lineSpan(fa, fb, 430, 340);
        var body =
          circ(c, rr, "gc") + polyS([p.A, p.B, p.C], "gtri") +
          seg(p.P, fa, "gl-dash") + seg(p.P, fb, "gl-dash") + seg(p.P, fc, "gl-dash") +
          seg(e[0], e[1], "gl-acc") +
          dotS(fa, "gd-gold", 3.5) + dotS(fb, "gd-gold", 3.5) + dotS(fc, "gd-gold", 3.5) +
          dotS(p.A, "gd") + dotS(p.B, "gd") + dotS(p.C, "gd") + dotS(p.P, "gd-acc", 5) +
          lbl(p.A, c, "A") + lbl(p.B, c, "B") + lbl(p.C, c, "C") + lbl(p.P, c, "P", "gt-acc");
        return { body: body, caption: "The three feet (gold) of the perpendiculars from P to the sides are always collinear — the <b>Simson line</b> of P." };
      }
    });
  } };

  // ---------- Nine-point circle ----------
  W["nine-point-circle"] = { mount: function (host) {
    mountGeo(host, {
      title: "Nine-point circle",
      hint: "Drag the vertices.",
      w: 430, h: 350,
      init: { A: [150, 65], B: [70, 285], C: [365, 250] },
      drag: { A: {}, B: {}, C: {} },
      render: function (p) {
        var O = circum(p.A, p.B, p.C), H = ortho(p.A, p.B, p.C), N = mid(O, H), R = dist(O, p.A) / 2;
        var Ma = mid(p.B, p.C), Mb = mid(p.C, p.A), Mc = mid(p.A, p.B);
        var Fa = foot(p.A, p.B, p.C), Fb = foot(p.B, p.C, p.A), Fc = foot(p.C, p.A, p.B);
        var Ea = mid(p.A, H), Eb = mid(p.B, H), Ec = mid(p.C, H);
        var body =
          circ(N, R, "gc-acc") + polyS([p.A, p.B, p.C], "gtri") +
          seg(p.A, Fa, "gl-dash") + seg(p.B, Fb, "gl-dash") + seg(p.C, Fc, "gl-dash") +
          [Ma, Mb, Mc].map(function (q) { return dotS(q, "gd-acc", 3.5); }).join("") +
          [Fa, Fb, Fc].map(function (q) { return dotS(q, "gd-gold", 3.5); }).join("") +
          [Ea, Eb, Ec].map(function (q) { return dotS(q, "gd-grn", 3.5); }).join("") +
          dotS(p.A, "gd") + dotS(p.B, "gd") + dotS(p.C, "gd") +
          lbl(p.A, N, "A") + lbl(p.B, N, "B") + lbl(p.C, N, "C");
        return { body: body, caption: "Side midpoints (blue), altitude feet (gold) and Euler points (green) — all <b>nine</b> lie on one circle of radius R/2 = " + fmt(R) + "." };
      }
    });
  } };

  // ---------- Euler line ----------
  W["euler-line-ratio"] = { mount: function (host) {
    mountGeo(host, {
      title: "Euler line",
      hint: "Drag the vertices.",
      w: 430, h: 350,
      init: { A: [160, 60], B: [70, 285], C: [370, 250] },
      drag: { A: {}, B: {}, C: {} },
      render: function (p) {
        var O = circum(p.A, p.B, p.C), G = centroid(p.A, p.B, p.C), H = ortho(p.A, p.B, p.C);
        var e = lineSpan(O, H, 430, 350);
        var og = dist(O, G), gh = dist(G, H);
        var body =
          polyS([p.A, p.B, p.C], "gtri") + seg(e[0], e[1], "gl-acc") +
          dotS(O, "gd-acc", 4.5) + dotS(G, "gd-gold", 4.5) + dotS(H, "gd-grn", 4.5) +
          dotS(p.A, "gd") + dotS(p.B, "gd") + dotS(p.C, "gd") +
          lbl(O, G, "O", "gt-acc") + lbl(H, G, "H", "gt-grn") + txt(add(G, [8, -8]), "G", "gt-gold");
        return { body: body, caption: "Circumcenter O, centroid G, orthocenter H are collinear, with OG : GH = 1 : 2 (here " + fmt(og) + " : " + fmt(gh) + " ≈ 1 : " + fmt(gh / (og || 1)) + ")." };
      }
    });
  } };

  // ---------- Symmedians & the Lemoine point ----------
  W["lemoine-point"] = { mount: function (host) {
    mountGeo(host, {
      title: "Symmedians and the Lemoine point",
      hint: "Drag the vertices. Watch the two ratios stay locked together.",
      w: 430, h: 350,
      init: { A: [175, 58], B: [62, 288], C: [372, 268] },
      drag: { A: {}, B: {}, C: {} },
      render: function (p) {
        var a = dist(p.B, p.C), b = dist(p.A, p.C), c = dist(p.A, p.B);
        var w = a * a + b * b + c * c;
        var K = [(a * a * p.A[0] + b * b * p.B[0] + c * c * p.C[0]) / w,
                 (a * a * p.A[1] + b * b * p.B[1] + c * c * p.C[1]) / w];
        var Sa = add(p.B, mul(sub(p.C, p.B), (c * c) / (b * b + c * c)));
        var Sb = add(p.C, mul(sub(p.A, p.C), (a * a) / (c * c + a * a)));
        var Sc = add(p.A, mul(sub(p.B, p.A), (b * b) / (a * a + b * b)));
        var M = mid(p.B, p.C);
        var Fa = foot(K, p.B, p.C), Fb = foot(K, p.C, p.A), Fc = foot(K, p.A, p.B);
        var da = dist(K, Fa), db = dist(K, Fb), dc = dist(K, Fc);
        var body =
          polyS([p.A, p.B, p.C], "gtri") +
          seg(p.A, M, "gl-gold") +
          seg(p.A, Sa, "gl-acc") + seg(p.B, Sb, "gl-acc") + seg(p.C, Sc, "gl-acc") +
          seg(K, Fa, "gl-dash") + seg(K, Fb, "gl-dash") + seg(K, Fc, "gl-dash") +
          dotS(M, "gd-gold", 3.5) + dotS(Sa, "gd-acc", 3.5) +
          dotS(Fa, "gd", 2.5) + dotS(Fb, "gd", 2.5) + dotS(Fc, "gd", 2.5) +
          dotS(p.A, "gd") + dotS(p.B, "gd") + dotS(p.C, "gd") + dotS(K, "gd-gold", 5) +
          lbl(p.A, K, "A") + lbl(p.B, K, "B") + lbl(p.C, K, "C") +
          txt(add(K, [9, -9]), "K", "gt-gold") + txt(add(M, [2, 18]), "M", "gt-gold");
        var tri = function (x, y, z) { return "1 : " + fmt(y / x) + " : " + fmt(z / x); };
        return { body: body, caption:
          "K's distances to the sides are in ratio " + tri(da, db, dc) +
          ", and the sides a : b : c are in ratio " + tri(a, b, c) +
          ". The A-symmedian splits BC as 1 : " + fmt((b * b) / (c * c)) +
          ", the square of the side ratio 1 : " + fmt(b / c) +
          "; the median M splits it 1 : 1." };
      }
    });
  } };

  // ---------- Power of a point ----------
  W["power-of-a-point"] = { mount: function (host) {
    var cen = [215, 175], r = 115;
    mountGeo(host, {
      title: "Power of a point",
      hint: "Drag P, or drag D to spin the secant.",
      w: 430, h: 350,
      init: { P: [360, 300], D: [120, 90] },
      drag: { P: {}, D: {} },
      render: function (p) {
        var ints = circleLine(cen, r, p.P, p.D);
        var body = circ(cen, r, "gc") + dotS(cen, "gd", 2.5) + txt(add(cen, [8, 4]), "O");
        var cap;
        if (ints) {
          var X = ints[0], Y = ints[1], e = lineSpan(X, Y, 430, 350);
          var pxpy = dist(p.P, X) * dist(p.P, Y);
          var power = Math.abs(dist(p.P, cen) * dist(p.P, cen) - r * r);
          body += seg(e[0], e[1], "gl-acc") + dotS(X, "gd-gold", 4) + dotS(Y, "gd-gold", 4) +
            txt(add(X, [6, -6]), "X", "gt-gold") + txt(add(Y, [6, -6]), "Y", "gt-gold");
          cap = "PX · PY = <b>" + fmt(pxpy) + "</b> &nbsp;=&nbsp; |PO² − r²| = <b>" + fmt(power) + "</b>. Spin the secant with D — the product never changes.";
        } else {
          cap = "The line misses the circle — drag D so the secant crosses it.";
        }
        body += dotS(p.P, "gd-acc", 5) + txt(add(p.P, [10, 4]), "P", "gt-acc") + dotS(p.D, "gd", 3.5);
        return { body: body, caption: cap };
      }
    });
  } };

  // ---------- Inscribed angle ----------
  W["inscribed-angle-theorem"] = { mount: function (host) {
    var cen = [215, 185], r = 130;
    function onC(a) { return [cen[0] + r * Math.cos(a), cen[1] + r * Math.sin(a)]; }
    function angAt(V, X, Y) { var a = sub(X, V), b = sub(Y, V); var c = dot(a, b) / ((len(a) * len(b)) || 1); return Math.acos(Math.max(-1, Math.min(1, c))) * 180 / Math.PI; }
    mountGeo(host, {
      title: "Inscribed angle",
      hint: "Drag P around the arc.",
      w: 430, h: 360,
      init: { A: onC(Math.PI * 0.86), B: onC(Math.PI * 0.14), P: onC(-Math.PI * 0.5) },
      drag: {
        A: { constrain: function (xy) { return projectToCircle(xy, cen, r); } },
        B: { constrain: function (xy) { return projectToCircle(xy, cen, r); } },
        P: { constrain: function (xy) { return projectToCircle(xy, cen, r); } }
      },
      render: function (p) {
        p.A = projectToCircle(p.A, cen, r); p.B = projectToCircle(p.B, cen, r); p.P = projectToCircle(p.P, cen, r);
        var insc = angAt(p.P, p.A, p.B), centr = angAt(cen, p.A, p.B);
        var body = circ(cen, r, "gc") +
          seg(p.P, p.A, "gl-acc") + seg(p.P, p.B, "gl-acc") +
          seg(cen, p.A, "gl-dash") + seg(cen, p.B, "gl-dash") + seg(p.A, p.B, "gl") +
          dotS(cen, "gd", 2.5) + dotS(p.A, "gd-gold", 4) + dotS(p.B, "gd-gold", 4) + dotS(p.P, "gd-acc", 5) +
          lbl(p.A, cen, "A") + lbl(p.B, cen, "B") + lbl(p.P, cen, "P", "gt-acc") + txt(add(cen, [8, 4]), "O");
        return { body: body, caption: "∠APB = <b>" + fmt(insc) + "°</b> = ½ ∠AOB = ½ · " + fmt(centr) + "°. Move P along the arc — the inscribed angle stays put." };
      }
    });
  } };

  // ---------- Shoelace area (draggable polygon) ----------
  W["shoelace-formula"] = { mount: function (host) {
    function area(v) { var s = 0; for (var i = 0; i < v.length; i++) { var j = (i + 1) % v.length; s += v[i][0] * v[j][1] - v[j][0] * v[i][1]; } return Math.abs(s) / 2; }
    var init = { P0: [90, 90], P1: [330, 70], P2: [370, 250], P3: [210, 300], P4: [80, 240] };
    var drag = {}; Object.keys(init).forEach(function (k) { drag[k] = {}; });
    mountGeo(host, {
      title: "Shoelace area",
      hint: "Drag any vertex.",
      w: 440, h: 340,
      init: init, drag: drag,
      render: function (p) {
        var v = ["P0", "P1", "P2", "P3", "P4"].map(function (k) { return p[k]; });
        var body = polyS(v, "gtri-fill") + v.map(function (q) { return dotS(q, "gd-acc", 4.5); }).join("");
        return { body: body, caption: "Area = ½ |Σ (xᵢyᵢ₊₁ − xᵢ₊₁yᵢ)| = <b>" + fmt(area(v) / 1) + "</b> px² (drag to reshape)." };
      }
    });
  } };

  // ===== shared helpers for the batch below =====
  var U = 44;                                              // px per "unit" for readable numbers
  function uL(px) { return Math.round(px / U * 100) / 100; }
  function uA(px2) { return Math.round(px2 / (U * U) * 100) / 100; }
  function gcdi(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
  function angleDeg(V, X, Y) { var u = sub(X, V), w = sub(Y, V); var c = dot(u, w) / ((len(u) * len(w)) || 1); return Math.acos(Math.max(-1, Math.min(1, c))) * 180 / Math.PI; }
  function sarea(v) { var s = 0; for (var i = 0; i < v.length; i++) { var j = (i + 1) % v.length; s += v[i][0] * v[j][1] - v[j][0] * v[i][1]; } return s / 2; }
  function incenter(A, B, C) { var a = dist(B, C), b = dist(C, A), c = dist(A, B), s = a + b + c || 1; return [(a * A[0] + b * B[0] + c * C[0]) / s, (a * A[1] + b * B[1] + c * C[1]) / s]; }
  function squareOn(P, Q, away) { var d = sub(Q, P), L = len(d), n = norm(perp(d)), m = mid(P, Q); if (dist(add(m, n), away) < dist(sub(m, n), away)) n = mul(n, -1); return [P, Q, add(Q, mul(n, L)), add(P, mul(n, L))]; }
  function arrowAcc(a, b, cls) { var d = norm(sub(b, a)), n = perp(d), bk = sub(b, mul(d, 11)); return seg(a, b, cls || "gl-acc") + '<polygon points="' + r1(b[0]) + "," + r1(b[1]) + " " + r1(bk[0] + n[0] * 5) + "," + r1(bk[1] + n[1] * 5) + " " + r1(bk[0] - n[0] * 5) + "," + r1(bk[1] - n[1] * 5) + '" class="gd-acc"/>'; }

  // ---------- Pythagorean theorem (squares on the sides) ----------
  W["pythagorean-theorem"] = { mount: function (host) {
    var C = [165, 250];
    mountGeo(host, {
      title: "Pythagoras",
      hint: "Drag the legs.",
      vx: -15, vy: -90, w: 520, h: 525,
      init: { A: [280, 250], B: [165, 145] },
      drag: { A: { constrain: function (xy) { return [Math.max(215, Math.min(330, xy[0])), 250]; } }, B: { constrain: function (xy) { return [165, Math.max(100, Math.min(220, xy[1]))]; } } },
      render: function (p) {
        var a = len(sub(p.A, C)), b = len(sub(p.B, C)), c = len(sub(p.A, p.B));
        var sqA = squareOn(C, p.A, p.B), sqB = squareOn(C, p.B, p.A), sqC = squareOn(p.A, p.B, C);
        var body = polyS(sqA, "gtri-fill") + polyS(sqB, "gfill-grn") + polyS(sqC, "gfill-gold") +
          polyS([C, p.A, p.B], "gtri") +
          txt(add(mid(sqA[2], sqA[3]), [0, 4]), "a²", "gt-acc") + txt(mid(sqB[2], sqB[3]), "b²", "gt-grn") + txt(mid(sqC[2], sqC[3]), "c²", "gt-gold") +
          dotS(C, "gd") + dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") + txt(add(C, [-16, 6]), "C");
        return { body: body, caption: "a² + b² = " + uA(a * a) + " + " + uA(b * b) + " = <b>" + uA(a * a + b * b) + "</b> &nbsp;=&nbsp; c² = <b>" + uA(c * c) + "</b> (blue + green = gold)." };
      }
    });
  } };

  // ---------- Triangle inequality ----------
  W["triangle-inequality"] = { mount: function (host) {
    mountGeo(host, {
      title: "Triangle inequality",
      hint: "Flatten it and watch.",
      w: 420, h: 320,
      init: { A: [210, 60], B: [80, 250], C: [340, 250] },
      drag: { A: {}, B: {}, C: {} },
      render: function (p) {
        var a = dist(p.B, p.C), b = dist(p.C, p.A), c = dist(p.A, p.B);
        var sides = [["a", a], ["b", b], ["c", c]].sort(function (x, y) { return y[1] - x[1]; });
        var longest = sides[0], other = uL(sides[1][1]) + uL(sides[2][1]);
        var ok = sides[1][1] + sides[2][1] > sides[0][1] + 1e-9;
        var body = polyS([p.A, p.B, p.C], ok ? "gtri-fill" : "gfill-none") +
          txt(add(mid(p.B, p.C), [0, 18]), "a", "gt") + txt(add(mid(p.C, p.A), [10, 0]), "b", "gt") + txt(add(mid(p.A, p.B), [-14, 0]), "c", "gt") +
          dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") + dotS(p.C, "gd-acc");
        return { body: body, caption: "Longest side " + longest[0] + " = <b>" + uL(longest[1]) + "</b>; the other two sum to <b>" + Math.round(other * 100) / 100 + "</b>. " + (ok ? "Since the two shorter sides still out-reach the longest, they close up into a triangle." : "They can no longer reach across — the triangle collapses.") };
      }
    });
  } };

  // ---------- Law of sines ----------
  W["law-of-sines"] = { mount: function (host) {
    mountGeo(host, {
      title: "Law of sines",
      w: 420, h: 360,
      init: { A: [220, 70], B: [110, 280], C: [330, 250] },
      drag: { A: {}, B: {}, C: {} },
      render: function (p) {
        var O = circum(p.A, p.B, p.C), R = dist(O, p.A);
        var a = dist(p.B, p.C), b = dist(p.C, p.A), c = dist(p.A, p.B);
        var Ang = angleDeg(p.A, p.B, p.C);
        var ratio = a / Math.sin(Ang * Math.PI / 180);
        var body = circ(O, R, "gc") + polyS([p.A, p.B, p.C], "gtri") +
          dotS(O, "gd", 2.5) + dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") + dotS(p.C, "gd-acc") +
          lbl(p.A, O, "A") + lbl(p.B, O, "B") + lbl(p.C, O, "C") + txt(add(O, [7, 4]), "O");
        return { body: body, caption: "a / sin A = " + uL(a) + " / sin " + fmt(Ang) + "° = <b>" + uL(ratio) + "</b> &nbsp;=&nbsp; 2R = <b>" + uL(2 * R) + "</b> — and the same holds for b and c." };
      }
    });
  } };

  // ---------- Law of cosines ----------
  W["law-of-cosines"] = { mount: function (host) {
    mountGeo(host, {
      title: "Law of cosines",
      w: 420, h: 340,
      init: { A: [110, 90], B: [330, 110], C: [180, 280] },
      drag: { A: {}, B: {}, C: {} },
      render: function (p) {
        var a = dist(p.C, p.B), b = dist(p.C, p.A), c = dist(p.A, p.B);
        var Cang = angleDeg(p.C, p.A, p.B);
        var rhs = a * a + b * b - 2 * a * b * Math.cos(Cang * Math.PI / 180);
        var body = polyS([p.A, p.B, p.C], "gtri") + seg(p.C, p.A, "gl-acc") + seg(p.C, p.B, "gl-acc") +
          dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") + dotS(p.C, "gd-gold", 5) +
          lbl(p.A, p.C, "A") + lbl(p.B, p.C, "B") + lbl(p.C, mid(p.A, p.B), "C", "gt-gold");
        return { body: body, caption: "c² = a² + b² − 2ab·cos C = " + uA(a * a) + " + " + uA(b * b) + " − 2ab·cos " + fmt(Cang) + "° = <b>" + uA(rhs) + "</b> &nbsp;=&nbsp; c² = <b>" + uA(c * c) + "</b>." };
      }
    });
  } };

  // ---------- Heron's formula ----------
  W["herons-formula"] = { mount: function (host) {
    mountGeo(host, {
      title: "Heron's formula",
      hint: "Drag the vertices.",
      w: 420, h: 320,
      init: { A: [200, 70], B: [90, 260], C: [340, 240] },
      drag: { A: {}, B: {}, C: {} },
      render: function (p) {
        var a = dist(p.B, p.C), b = dist(p.C, p.A), c = dist(p.A, p.B), s = (a + b + c) / 2;
        var area = Math.sqrt(Math.max(0, s * (s - a) * (s - b) * (s - c)));
        var shoe = Math.abs(sarea([p.A, p.B, p.C]));
        var body = polyS([p.A, p.B, p.C], "gtri-fill") +
          dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") + dotS(p.C, "gd-acc") +
          txt(add(mid(p.B, p.C), [0, 18]), "a") + txt(add(mid(p.C, p.A), [10, 0]), "b") + txt(add(mid(p.A, p.B), [-14, 0]), "c");
        return { body: body, caption: "s = (a+b+c)/2 = <b>" + uL(s) + "</b>. Area = √(s(s−a)(s−b)(s−c)) = <b>" + uA(area) + "</b> — matching the shoelace area " + uA(shoe) + "." };
      }
    });
  } };

  // ---------- Area = ½ base × height (shear invariance) ----------
  W["triangle-area-standard"] = { mount: function (host) {
    var B = [90, 280], C = [350, 280];
    mountGeo(host, {
      title: "Area = ½ · base · height",
      hint: "Slide the apex.",
      w: 440, h: 320,
      init: { A: [180, 110] },
      drag: { A: {} },
      render: function (p) {
        var f = foot(p.A, B, C), base = dist(B, C), h = dist(p.A, f);
        var body = seg([20, p.A[1]], [420, p.A[1]], "gl-dash") +   // "slide along here" guide
          polyS([p.A, B, C], "gtri-fill") + seg(p.A, f, "gl-acc") +
          seg(B, C, "gl") + dotS(f, "gd", 3) + dotS(B, "gd") + dotS(C, "gd") + dotS(p.A, "gd-acc", 5) +
          txt(add(mid(p.A, f), [8, 0]), "h", "gt-acc") + txt(add(mid(B, C), [0, 18]), "base") + lbl(p.A, f, "A", "gt-acc");
        return { body: body, caption: "Area = ½ · " + uL(base) + " · " + uL(h) + " = <b>" + uA(base * h) + "</b>. Slide A along the dashed line — height (and area) never change." };
      }
    });
  } };

  // ---------- Centroid divides medians 2:1 ----------
  W["centroid-division"] = { mount: function (host) {
    mountGeo(host, {
      title: "Centroid",
      w: 420, h: 340,
      init: { A: [210, 70], B: [90, 280], C: [340, 270] },
      drag: { A: {}, B: {}, C: {} },
      render: function (p) {
        var G = centroid(p.A, p.B, p.C), Ma = mid(p.B, p.C), Mb = mid(p.C, p.A), Mc = mid(p.A, p.B);
        var ag = dist(p.A, G), gm = dist(G, Ma);
        var body = polyS([p.A, p.B, p.C], "gtri") +
          seg(p.A, Ma, "gl-acc") + seg(p.B, Mb, "gl-dash") + seg(p.C, Mc, "gl-dash") +
          dotS(Ma, "gd-gold", 3.5) + dotS(Mb, "gd", 3) + dotS(Mc, "gd", 3) +
          dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") + dotS(p.C, "gd-acc") + dotS(G, "gd-grn", 5) +
          lbl(p.A, G, "A") + txt(add(G, [8, -8]), "G", "gt-grn") + lbl(Ma, p.A, "M", "gt-gold");
        return { body: body, caption: "On median AM: AG = <b>" + uL(ag) + "</b>, GM = <b>" + uL(gm) + "</b> — a 2 : 1 ratio (AG / GM ≈ " + fmt(ag / (gm || 1)) + "). The centroid cuts every median the same way." };
      }
    });
  } };

  // ---------- Angle bisector theorem ----------
  W["angle-bisector-theorem"] = { mount: function (host) {
    mountGeo(host, {
      title: "Angle bisector",
      w: 420, h: 330,
      init: { A: [210, 60], B: [90, 270], C: [350, 270] },
      drag: { A: {}, B: {}, C: {} },
      render: function (p) {
        var c = dist(p.A, p.B), b = dist(p.A, p.C);
        var D = add(p.B, mul(sub(p.C, p.B), c / (b + c)));
        var bd = dist(p.B, D), dc = dist(D, p.C);
        var body = polyS([p.A, p.B, p.C], "gtri") + seg(p.A, D, "gl-acc") +
          dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") + dotS(p.C, "gd-acc") + dotS(D, "gd-gold", 4.5) +
          lbl(p.A, D, "A") + lbl(p.B, p.C, "B") + lbl(p.C, p.B, "C") + txt(add(D, [-4, 20]), "D", "gt-gold");
        return { body: body, caption: "BD / DC = " + uL(bd) + " / " + uL(dc) + " = <b>" + fmt(bd / (dc || 1)) + "</b> &nbsp;=&nbsp; AB / AC = " + uL(c) + " / " + uL(b) + " = <b>" + fmt(c / (b || 1)) + "</b>." };
      }
    });
  } };

  // ---------- Ceva's theorem ----------
  W["cevas-theorem"] = { mount: function (host) {
    mountGeo(host, {
      title: "Ceva",
      hint: "Drag P.",
      w: 420, h: 340,
      init: { A: [210, 60], B: [80, 285], C: [355, 275], P: [215, 200] },
      drag: { A: {}, B: {}, C: {}, P: {} },
      render: function (p) {
        var D = lineInt(p.A, p.P, p.B, p.C), E = lineInt(p.B, p.P, p.C, p.A), F = lineInt(p.C, p.P, p.A, p.B);
        var prod = (dist(p.B, D) / (dist(D, p.C) || 1)) * (dist(p.C, E) / (dist(E, p.A) || 1)) * (dist(p.A, F) / (dist(F, p.B) || 1));
        var body = polyS([p.A, p.B, p.C], "gtri") +
          seg(p.A, D, "gl-acc") + seg(p.B, E, "gl-acc") + seg(p.C, F, "gl-acc") +
          dotS(D, "gd-gold", 3.5) + dotS(E, "gd-gold", 3.5) + dotS(F, "gd-gold", 3.5) +
          dotS(p.A, "gd") + dotS(p.B, "gd") + dotS(p.C, "gd") + dotS(p.P, "gd-grn", 5) +
          lbl(p.A, p.P, "A") + lbl(p.B, p.P, "B") + lbl(p.C, p.P, "C") + txt(add(p.P, [8, -6]), "P", "gt-grn");
        return { body: body, caption: "(BD/DC)(CE/EA)(AF/FB) = <b>" + fmt(prod) + "</b> ≈ 1 for any interior point P — that&rsquo;s exactly when the three cevians concur." };
      }
    });
  } };

  // ---------- Circumcircle ----------
  W["circumradius-area"] = { mount: function (host) {
    mountGeo(host, {
      title: "Circumcircle",
      w: 420, h: 380,
      init: { A: [210, 90], B: [110, 290], C: [330, 260] },
      drag: { A: {}, B: {}, C: {} },
      render: function (p) {
        var O = circum(p.A, p.B, p.C), R = dist(O, p.A);
        var a = dist(p.B, p.C), b = dist(p.C, p.A), c = dist(p.A, p.B), K = Math.abs(sarea([p.A, p.B, p.C]));
        var Rformula = a * b * c / (4 * K || 1);            // = R, in px
        var body = circ(O, R, "gc-acc") + polyS([p.A, p.B, p.C], "gtri") +
          seg(O, p.A, "gl-dash") + dotS(O, "gd-gold", 4.5) +
          dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") + dotS(p.C, "gd-acc") +
          lbl(p.A, O, "A") + lbl(p.B, O, "B") + lbl(p.C, O, "C") + txt(add(mid(O, p.A), [0, -6]), "R", "gt-gold");
        return { body: body, caption: "R = abc / 4K = <b>" + uL(Rformula) + "</b> — matching the distance from O to each vertex (" + uL(R) + ")." };
      }
    });
  } };

  // ---------- Incircle ----------
  W["inradius-area"] = { mount: function (host) {
    mountGeo(host, {
      title: "Incircle",
      w: 420, h: 360,
      init: { A: [210, 70], B: [100, 290], C: [340, 275] },
      drag: { A: {}, B: {}, C: {} },
      render: function (p) {
        var I = incenter(p.A, p.B, p.C), s = (dist(p.B, p.C) + dist(p.C, p.A) + dist(p.A, p.B)) / 2;
        var K = Math.abs(sarea([p.A, p.B, p.C])), r = K / (s || 1);
        var fa = foot(I, p.B, p.C);
        var body = polyS([p.A, p.B, p.C], "gtri") + circ(I, r, "gc-acc") +
          seg(I, fa, "gl-dash") + dotS(I, "gd-gold", 4.5) + dotS(fa, "gd", 3) +
          dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") + dotS(p.C, "gd-acc") +
          lbl(p.A, I, "A") + lbl(p.B, I, "B") + lbl(p.C, I, "C") + txt(add(I, [7, 4]), "I", "gt-gold");
        return { body: body, caption: "r = Area / s = " + uA(K) + " / " + uL(s) + " = <b>" + uL(r) + "</b> — the incircle touches all three sides." };
      }
    });
  } };

  // ---------- Orthocenter ----------
  W["orthocenter-properties"] = { mount: function (host) {
    mountGeo(host, {
      title: "Orthocenter",
      w: 420, h: 360,
      init: { A: [200, 80], B: [110, 285], C: [335, 250] },
      drag: { A: {}, B: {}, C: {} },
      render: function (p) {
        var H = ortho(p.A, p.B, p.C), fa = foot(p.A, p.B, p.C), fb = foot(p.B, p.C, p.A), fc = foot(p.C, p.A, p.B);
        var body = polyS([p.A, p.B, p.C], "gtri") +
          seg(p.A, fa, "gl-acc") + seg(p.B, fb, "gl-acc") + seg(p.C, fc, "gl-acc") +
          dotS(fa, "gd", 3) + dotS(fb, "gd", 3) + dotS(fc, "gd", 3) +
          dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") + dotS(p.C, "gd-acc") + dotS(H, "gd-gold", 5) +
          lbl(p.A, H, "A") + lbl(p.B, H, "B") + lbl(p.C, H, "C") + txt(add(H, [8, -6]), "H", "gt-gold");
        return { body: body, caption: "Each altitude runs from a vertex perpendicular to the opposite side; all three cross at the orthocenter H (which leaves the triangle when it turns obtuse)." };
      }
    });
  } };

  // ---------- Viviani's theorem ----------
  W["vivianis-theorem"] = { mount: function (host) {
    var side = 170, h = side * Math.sqrt(3) / 2;
    var A = [210, 78], B = [210 - side / 2, 78 + h], C = [210 + side / 2, 78 + h];
    // Signed distance to a side: positive on the same side of that line as the opposite vertex,
    // negative beyond it. With that sign the three distances sum to the altitude for EVERY point
    // of the plane, because [PAB] + [PBC] + [PCA] = [ABC] holds as signed areas. That is the half
    // of the theorem this widget used to hide: it clamped P back inside, so the outside cases
    // were unreachable and the constant sum looked like a property of interior points only.
    function signed(P, U, V, opp) {
      var d = dist(P, foot(P, U, V)), sp = sarea([U, V, P]), so = sarea([U, V, opp]);
      return sp === 0 ? 0 : ((sp > 0) === (so > 0) ? d : -d);
    }
    mountGeo(host, {
      title: "Viviani",
      hint: "Drag P anywhere, inside or outside.",
      w: 420, h: 320,
      init: { P: [210, 170] },
      drag: { P: { constrain: function (xy) {
        // keep P on the canvas, but no longer inside the triangle
        return [Math.max(14, Math.min(406, xy[0])), Math.max(14, Math.min(306, xy[1]))];
      } } },
      render: function (p) {
        var legs = [[A, B, C], [B, C, A], [C, A, B]].map(function (t) {
          var F = foot(p.P, t[0], t[1]), ab = sub(t[1], t[0]);
          // where the foot falls along the side: t in [0,1] means on the segment itself
          var u = dot(sub(F, t[0]), ab) / (dot(ab, ab) || 1);
          return { U: t[0], V: t[1], foot: F, along: u, d: signed(p.P, t[0], t[1], t[2]) };
        });
        var body = polyS([A, B, C], "gtri-fill");
        legs.forEach(function (L) {
          // When P is outside, the perpendicular meets the side's EXTENSION, not the side. Draw
          // that extension dashed and overshoot the foot slightly, so the figure shows what the
          // distance is actually measured to -- without it a red leg appears to end in mid-air.
          if (L.along < 0 || L.along > 1) {
            var near = L.along < 0 ? L.U : L.V;
            var out = add(L.foot, mul(norm(sub(L.foot, near)), 12));
            body += seg(near, out, "gl-dash");
          }
          // right-angle bracket at the foot: one arm to P, the other along the side line toward
          // its farther end, which keeps the arm on the drawn part whether the foot is on the
          // segment or out on the extension
          var far = dist(L.foot, L.U) > dist(L.foot, L.V) ? L.U : L.V;
          body += rAngle(L.foot, p.P, far, 7) +
                  seg(p.P, L.foot, L.d < 0 ? "gl-red" : "gl-acc") +
                  dotS(L.foot, L.d < 0 ? "gd" : "gd-acc", 2.6);
        });
        body += dotS(p.P, "gd-gold", 5) + txt(add(p.P, [8, -6]), "P", "gt-gold") +
                txt(add(A, [-4, -10]), "A", "gt") + txt(add(B, [-14, 14]), "B", "gt") +
                txt(add(C, [8, 14]), "C", "gt");
        var neg = legs.filter(function (L) { return L.d < 0; }).length;
        var term = function (d) { return d < 0 ? "(" + uL(d) + ")" : "" + uL(d); };
        var note = neg === 0 ? "P is inside, so all three count positive"
                 : neg === 1 ? "P is across one side, so that distance counts negative"
                 : "P is past a vertex, so two distances count negative";
        return { body: body,
          caption: "d\u2081 + d\u2082 + d\u2083 = " + term(legs[0].d) + " + " + term(legs[1].d) +
                   " + " + term(legs[2].d) + " = <b>" + uL(legs[0].d + legs[1].d + legs[2].d) +
                   "</b> = the triangle&rsquo;s height. " + note + "." };
      }
    });
  } };

  // ---------- Vector dot product ----------
  W["vector-dot-product"] = { mount: function (host) {
    var O = [210, 210];
    mountGeo(host, {
      title: "Dot product",
      w: 420, h: 380,
      init: { A: [340, 130], B: [150, 90] },
      drag: { A: {}, B: {} },
      render: function (p) {
        var a = sub(p.A, O), b = sub(p.B, O);
        var d = dot(a, b), th = angleDeg(O, p.A, p.B);
        var body = seg([20, 210], [400, 210], "gl-ax") + seg([210, 30], [210, 370], "gl-ax") +
          arrowAcc(O, p.A) + arrowAcc(O, p.B, "gl-acc") +
          txt(add(p.A, [8, 0]), "a", "gt-acc") + txt(add(p.B, [8, 0]), "b", "gt-acc") + dotS(O, "gd", 3);
        return { body: body, caption: "a · b = <b>" + uA(d) + "</b> &nbsp;=&nbsp; |a||b| cos θ = " + uL(len(a)) + " · " + uL(len(b)) + " · cos " + fmt(th) + "° = <b>" + uA(len(a) * len(b) * Math.cos(th * Math.PI / 180)) + "</b>. " + (th < 87 ? "Positive → the angle is acute." : th > 93 ? "Negative → the angle is obtuse." : "≈ 0 → the vectors are (nearly) perpendicular.") };
      }
    });
  } };

  // ---------- Reflection / shortest path ----------
  W["reflection-shortest-path"] = { mount: function (host) {
    var my = 300;
    mountGeo(host, {
      title: "Shortest reflected path",
      w: 440, h: 360,
      init: { A: [110, 120], B: [340, 180] },
      drag: { A: { constrain: function (xy) { return [xy[0], Math.min(xy[1], my - 20)]; } }, B: { constrain: function (xy) { return [xy[0], Math.min(xy[1], my - 20)]; } } },
      render: function (p) {
        var Bp = [p.B[0], 2 * my - p.B[1]];
        var X = lineInt(p.A, Bp, [0, my], [440, my]);
        var body = seg([20, my], [420, my], "gl") +
          seg(p.A, X, "gl-acc") + seg(X, p.B, "gl-acc") + seg(X, Bp, "gl-dash") +
          dotS(p.A, "gd-acc", 5) + dotS(p.B, "gd-acc", 5) + dotS(Bp, "gd-gold", 4) + dotS(X, "gd-grn", 4.5) +
          txt(add(p.A, [-6, -12]), "A", "gt-acc") + txt(add(p.B, [8, -8]), "B", "gt-acc") + txt(add(Bp, [8, 6]), "B′", "gt-gold") + txt(add(X, [0, 22]), "X", "gt-grn") + txt([360, my - 8], "mirror");
        return { body: body, caption: "Reflect B to B′ across the line. The straight segment A→B′ crosses at X, and AX + XB = AB′ = <b>" + uL(dist(p.A, Bp)) + "</b> — the shortest path that touches the mirror." };
      }
    });
  } };

  // ---------- British flag theorem ----------
  W["british-flag-theorem"] = { mount: function (host) {
    var A = [90, 90], B = [350, 90], C = [350, 290], D = [90, 290];
    mountGeo(host, {
      title: "British flag theorem",
      hint: "Drag P anywhere.",
      w: 440, h: 380,
      init: { P: [250, 170] },
      drag: { P: {} },
      render: function (p) {
        var pa = dist(p.P, A), pb = dist(p.P, B), pc = dist(p.P, C), pd = dist(p.P, D);
        var body = polyS([A, B, C, D], "gfill-none") +
          seg(p.P, A, "gl-acc") + seg(p.P, C, "gl-acc") + seg(p.P, B, "gl-dash") + seg(p.P, D, "gl-dash") +
          dotS(A, "gd", 3) + dotS(B, "gd", 3) + dotS(C, "gd", 3) + dotS(D, "gd", 3) + dotS(p.P, "gd-gold", 5) +
          txt(add(A, [-16, 0]), "A") + txt(add(B, [8, 0]), "B") + txt(add(C, [8, 0]), "C") + txt(add(D, [-16, 0]), "D") + txt(add(p.P, [8, -6]), "P", "gt-gold");
        return { body: body, caption: "PA² + PC² = " + uA(pa * pa) + " + " + uA(pc * pc) + " = <b>" + uA(pa * pa + pc * pc) + "</b> &nbsp;=&nbsp; PB² + PD² = " + uA(pb * pb) + " + " + uA(pd * pd) + " = <b>" + uA(pb * pb + pd * pd) + "</b> (opposite corners of a rectangle)." };
      }
    });
  } };

  // ---------- Ptolemy's theorem ----------
  W["ptolemys-theorem"] = { mount: function (host) {
    var cen = [215, 200], r = 140;
    mountGeo(host, {
      title: "Ptolemy",
      hint: "Drag the corners.",
      w: 430, h: 400,
      init: { A: projectToCircle([90, 90], cen, r), B: projectToCircle([340, 90], cen, r), C: projectToCircle([350, 320], cen, r), D: projectToCircle([90, 320], cen, r) },
      drag: {
        A: { constrain: function (xy) { return projectToCircle(xy, cen, r); } },
        B: { constrain: function (xy) { return projectToCircle(xy, cen, r); } },
        C: { constrain: function (xy) { return projectToCircle(xy, cen, r); } },
        D: { constrain: function (xy) { return projectToCircle(xy, cen, r); } }
      },
      render: function (p) {
        p.A = projectToCircle(p.A, cen, r); p.B = projectToCircle(p.B, cen, r); p.C = projectToCircle(p.C, cen, r); p.D = projectToCircle(p.D, cen, r);
        var ac = dist(p.A, p.C), bd = dist(p.B, p.D), ab = dist(p.A, p.B), cd = dist(p.C, p.D), ad = dist(p.A, p.D), bc = dist(p.B, p.C);
        var body = circ(cen, r, "gc") + polyS([p.A, p.B, p.C, p.D], "gtri") +
          seg(p.A, p.C, "gl-acc") + seg(p.B, p.D, "gl-acc") +
          dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") + dotS(p.C, "gd-acc") + dotS(p.D, "gd-acc") +
          lbl(p.A, cen, "A") + lbl(p.B, cen, "B") + lbl(p.C, cen, "C") + lbl(p.D, cen, "D");
        return { body: body, caption: "AC · BD = " + uL(ac) + " · " + uL(bd) + " = <b>" + uA(ac * bd) + "</b> &nbsp;=&nbsp; AB·CD + AD·BC = <b>" + uA(ab * cd + ad * bc) + "</b> (diagonals vs. opposite sides)." };
      }
    });
  } };

  // ---------- Pick's theorem (lattice) ----------
  W["picks-theorem"] = { mount: function (host) {
    var G = 34, ox = 40, oy = 30, cols = 10, rows = 8;
    function toScreen(l) { return [ox + l[0] * G, oy + l[1] * G]; }
    function toLat(s) { return [Math.round((s[0] - ox) / G), Math.round((s[1] - oy) / G)]; }
    function onSeg(px, py, a, b) { var cr = (b[0] - a[0]) * (py - a[1]) - (b[1] - a[1]) * (px - a[0]); if (cr !== 0) return false; return Math.min(a[0], b[0]) <= px && px <= Math.max(a[0], b[0]) && Math.min(a[1], b[1]) <= py && py <= Math.max(a[1], b[1]); }
    function inPoly(px, py, poly) { var inside = false; for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) { var xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1]; if (((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi)) inside = !inside; } return inside; }
    mountGeo(host, {
      title: "Pick's theorem",
      hint: "Drag the corners onto lattice points.",
      w: 420, h: 330,
      init: { P0: toScreen([1, 1]), P1: toScreen([7, 2]), P2: toScreen([8, 5]), P3: toScreen([4, 7]), P4: toScreen([1, 5]) },
      drag: (function () { var d = {}; ["P0", "P1", "P2", "P3", "P4"].forEach(function (k) { d[k] = { constrain: function (xy) { var l = [Math.max(0, Math.min(cols, Math.round((xy[0] - ox) / G))), Math.max(0, Math.min(rows, Math.round((xy[1] - oy) / G)))]; return toScreen(l); } }; }); return d; })(),
      render: function (p) {
        var keys = ["P0", "P1", "P2", "P3", "P4"], poly = keys.map(function (k) { return toLat(p[k]); });
        var grid = "";
        for (var i = 0; i <= cols; i++) for (var j = 0; j <= rows; j++) grid += dotS(toScreen([i, j]), "gd", 1.4);
        var B = 0, I = 0, marks = "";
        for (var x = 0; x <= cols; x++) for (var y = 0; y <= rows; y++) {
          var onB = false;
          for (var e = 0; e < poly.length; e++) { if (onSeg(x, y, poly[e], poly[(e + 1) % poly.length])) { onB = true; break; } }
          if (onB) { B++; marks += dotS(toScreen([x, y]), "gd-gold", 4); }
          else if (inPoly(x, y, poly)) { I++; marks += dotS(toScreen([x, y]), "gd-grn", 4); }
        }
        var area = Math.abs(sarea(keys.map(function (k) { return p[k]; }))) / (G * G);
        var body = grid + polyS(keys.map(function (k) { return p[k]; }), "gtri-fill") + marks +
          keys.map(function (k) { return dotS(p[k], "gd-acc", 5); }).join("");
        return { body: body, caption: "Interior I = <b>" + I + "</b> (green), Boundary B = <b>" + B + "</b> (gold). &nbsp; I + B/2 − 1 = <b>" + (I + B / 2 - 1) + "</b> &nbsp;=&nbsp; Area = <b>" + Math.round(area * 100) / 100 + "</b>." };
      }
    });
  } };

  // ===== helpers for the second geometry batch =====
  function rotAbout(c, p, ang) { var d = sub(p, c), cs = Math.cos(ang), sn = Math.sin(ang); return [c[0] + d[0] * cs - d[1] * sn, c[1] + d[0] * sn + d[1] * cs]; }
  function equiApex(P, Q, away) { var a1 = rotAbout(P, Q, Math.PI / 3), a2 = rotAbout(P, Q, -Math.PI / 3); return dist(a1, away) >= dist(a2, away) ? a1 : a2; }

  // ---------- Menelaus' theorem ----------
  W["menelaus-theorem"] = { mount: function (host) {
    var A = [210, 70], B = [80, 285], C = [360, 270];
    mountGeo(host, {
      title: "Menelaus",
      hint: "Drag D and E.",
      w: 430, h: 340,
      init: { D: foot([250, 300], B, C), E: foot([300, 150], C, A) },
      drag: { D: { constrain: function (xy) { return foot(xy, B, C); } }, E: { constrain: function (xy) { return foot(xy, C, A); } } },
      render: function (p) {
        var F = lineInt(p.D, p.E, A, B);
        var e = lineSpan(p.D, p.E, 430, 340);
        var prod = (dist(B, p.D) / (dist(p.D, C) || 1)) * (dist(C, p.E) / (dist(p.E, A) || 1)) * (dist(A, F) / (dist(F, B) || 1));
        var body = polyS([A, B, C], "gtri") + seg(A, B, "gl-dash") +
          seg(e[0], e[1], "gl-acc") +
          dotS(p.D, "gd-gold", 4.5) + dotS(p.E, "gd-gold", 4.5) + dotS(F, "gd-gold", 4.5) +
          dotS(A, "gd") + dotS(B, "gd") + dotS(C, "gd") +
          lbl(A, [210, 200], "A") + lbl(B, [210, 200], "B") + lbl(C, [210, 200], "C") +
          txt(add(p.D, [0, 18]), "D", "gt-gold") + txt(add(p.E, [10, 0]), "E", "gt-gold") + txt(add(F, [-16, 0]), "F", "gt-gold");
        return { body: body, caption: "A line cuts the three sides (extended) at D, E, F: (BD/DC)(CE/EA)(AF/FB) = <b>" + fmt(prod) + "</b> ≈ 1 — the transversal companion to Ceva." };
      }
    });
  } };

  // ---------- Varignon's theorem ----------
  W["varignons-theorem"] = { mount: function (host) {
    mountGeo(host, {
      title: "Varignon",
      w: 420, h: 340,
      init: { A: [110, 80], B: [330, 110], C: [360, 280], D: [120, 300] },
      drag: { A: {}, B: {}, C: {}, D: {} },
      render: function (p) {
        var M = [mid(p.A, p.B), mid(p.B, p.C), mid(p.C, p.D), mid(p.D, p.A)];
        var body = polyS([p.A, p.B, p.C, p.D], "gtri") +
          seg(p.A, p.C, "gl-dash") + seg(p.B, p.D, "gl-dash") +
          polyS(M, "gtri-fill") + M.map(function (q) { return dotS(q, "gd-gold", 4); }).join("") +
          [p.A, p.B, p.C, p.D].map(function (q) { return dotS(q, "gd-acc"); }).join("") +
          lbl(p.A, [230, 190], "A") + lbl(p.B, [230, 190], "B") + lbl(p.C, [230, 190], "C") + lbl(p.D, [230, 190], "D");
        var s1 = dist(M[0], M[1]), s3 = dist(M[2], M[3]);
        return { body: body, caption: "Joining the side midpoints of <i>any</i> quadrilateral gives a parallelogram — each side runs parallel to a diagonal and is half its length (opposite sides " + uL(s1) + " = " + uL(s3) + ")." };
      }
    });
  } };

  // ---------- Fermat point ----------
  W["fermat-point"] = { mount: function (host) {
    mountGeo(host, {
      title: "Fermat point",
      hint: "Drag P to minimize PA + PB + PC.",
      w: 420, h: 360,
      init: { A: [200, 70], B: [90, 300], C: [340, 285], P: [200, 210] },
      drag: { A: {}, B: {}, C: {}, P: {} },
      render: function (p) {
        var apexBC = equiApex(p.B, p.C, p.A), apexCA = equiApex(p.C, p.A, p.B);
        var Fp = lineInt(p.A, apexBC, p.B, apexCA), minSum = dist(p.A, apexBC);
        var sum = dist(p.P, p.A) + dist(p.P, p.B) + dist(p.P, p.C);
        var body = polyS([p.A, p.B, p.C], "gtri") +
          seg(p.P, p.A, "gl-acc") + seg(p.P, p.B, "gl-acc") + seg(p.P, p.C, "gl-acc") +
          dotS(Fp, "gd-gold", 6) + dotS(p.A, "gd") + dotS(p.B, "gd") + dotS(p.C, "gd") + dotS(p.P, "gd-grn", 5) +
          lbl(p.A, Fp, "A") + lbl(p.B, Fp, "B") + lbl(p.C, Fp, "C") + txt(add(Fp, [8, -6]), "F", "gt-gold") + txt(add(p.P, [8, 12]), "P", "gt-grn");
        return { body: body, caption: "PA + PB + PC = <b>" + uL(sum) + "</b>. The minimum is <b>" + uL(minSum) + "</b>, reached at the Fermat point F (gold), where the three sides subtend 120° each (for triangles with all angles < 120°)." };
      }
    });
  } };

  // ---------- Apollonius / median length ----------
  W["apollonius-theorem"] = { mount: function (host) {
    mountGeo(host, {
      title: "Median length",
      w: 420, h: 330,
      init: { A: [210, 70], B: [90, 275], C: [350, 270] },
      drag: { A: {}, B: {}, C: {} },
      render: function (p) {
        var M = mid(p.B, p.C), lhs = dist(p.A, p.B) * dist(p.A, p.B) + dist(p.A, p.C) * dist(p.A, p.C), rhs = 2 * (dist(p.A, M) * dist(p.A, M) + dist(p.B, M) * dist(p.B, M));
        var body = polyS([p.A, p.B, p.C], "gtri") + seg(p.A, M, "gl-acc") +
          dotS(M, "gd-gold", 4) + dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") + dotS(p.C, "gd-acc") +
          lbl(p.A, M, "A") + lbl(p.B, M, "B") + lbl(p.C, M, "C") + txt(add(M, [0, 18]), "M", "gt-gold");
        return { body: body, caption: "AB² + AC² = <b>" + uA(lhs) + "</b> &nbsp;=&nbsp; 2(AM² + BM²) = <b>" + uA(rhs) + "</b>, where M is the midpoint of BC (median AM)." };
      }
    });
  } };

  // ---------- Stewart's theorem ----------
  W["stewarts-theorem"] = { mount: function (host) {
    var A = [210, 70], B = [80, 285], C = [360, 275];
    mountGeo(host, {
      title: "Stewart's theorem",
      hint: "Drag D along BC.",
      w: 430, h: 340,
      init: { D: add(B, mul(sub(C, B), 0.4)) },
      drag: { D: { constrain: function (xy) { var t = dot(sub(xy, B), sub(C, B)) / (dot(sub(C, B), sub(C, B)) || 1); t = Math.max(0.08, Math.min(0.92, t)); return add(B, mul(sub(C, B), t)); } } },
      render: function (p) {
        var m = dist(B, p.D) / U, n = dist(p.D, C) / U, a = dist(B, C) / U, d = dist(A, p.D) / U, b = dist(C, A) / U, c = dist(A, B) / U;
        var lhs = b * b * m + c * c * n, rhs = a * (d * d + m * n);
        var body = polyS([A, B, C], "gtri") + seg(A, p.D, "gl-acc") +
          dotS(A, "gd") + dotS(B, "gd") + dotS(C, "gd") + dotS(p.D, "gd-gold", 4.5) +
          lbl(A, p.D, "A") + lbl(B, C, "B") + lbl(C, B, "C") + txt(add(p.D, [-4, 20]), "D", "gt-gold") +
          txt(add(mid(B, p.D), [0, 16]), "m") + txt(add(mid(p.D, C), [0, 16]), "n") + txt(add(mid(A, p.D), [8, 0]), "d", "gt-acc");
        return { body: body, caption: "b²m + c²n = <b>" + fmt(lhs) + "</b> &nbsp;=&nbsp; a(d² + mn) = <b>" + fmt(rhs) + "</b> &nbsp;(&ldquo;man + dad = bmb + cnc&rdquo;), giving the cevian length d." };
      }
    });
  } };

  // ---------- Cyclic quadrilateral: opposite angles ----------
  W["cyclic-opposite-angles"] = { mount: function (host) {
    var cen = [215, 195], r = 140;
    mountGeo(host, {
      title: "Cyclic quadrilateral",
      w: 430, h: 390,
      init: { A: projectToCircle([100, 90], cen, r), B: projectToCircle([340, 110], cen, r), C: projectToCircle([350, 300], cen, r), D: projectToCircle([95, 300], cen, r) },
      drag: (function () { var d = {}; ["A", "B", "C", "D"].forEach(function (k) { d[k] = { constrain: function (xy) { return projectToCircle(xy, cen, r); } }; }); return d; })(),
      render: function (p) {
        ["A", "B", "C", "D"].forEach(function (k) { p[k] = projectToCircle(p[k], cen, r); });
        var angA = angleDeg(p.A, p.D, p.B), angB = angleDeg(p.B, p.A, p.C), angC = angleDeg(p.C, p.B, p.D), angD = angleDeg(p.D, p.C, p.A);
        var body = circ(cen, r, "gc") + polyS([p.A, p.B, p.C, p.D], "gtri-fill") +
          ["A", "B", "C", "D"].map(function (k) { return dotS(p[k], "gd-acc"); }).join("") +
          lbl(p.A, cen, "A") + lbl(p.B, cen, "B") + lbl(p.C, cen, "C") + lbl(p.D, cen, "D");
        return { body: body, caption: "∠A + ∠C = " + fmt(angA) + "° + " + fmt(angC) + "° = <b>" + fmt(angA + angC) + "°</b>, and ∠B + ∠D = <b>" + fmt(angB + angD) + "°</b> — opposite angles are supplementary." };
      }
    });
  } };

  // ---------- Brahmagupta's formula ----------
  W["brahmaguptas-formula"] = { mount: function (host) {
    var cen = [215, 195], r = 135;
    mountGeo(host, {
      title: "Brahmagupta",
      w: 430, h: 390,
      init: { A: projectToCircle([110, 100], cen, r), B: projectToCircle([335, 110], cen, r), C: projectToCircle([350, 300], cen, r), D: projectToCircle([100, 300], cen, r) },
      drag: (function () { var d = {}; ["A", "B", "C", "D"].forEach(function (k) { d[k] = { constrain: function (xy) { return projectToCircle(xy, cen, r); } }; }); return d; })(),
      render: function (p) {
        ["A", "B", "C", "D"].forEach(function (k) { p[k] = projectToCircle(p[k], cen, r); });
        var a = dist(p.A, p.B) / U, b = dist(p.B, p.C) / U, c = dist(p.C, p.D) / U, dd = dist(p.D, p.A) / U, s = (a + b + c + dd) / 2;
        var area = Math.sqrt(Math.max(0, (s - a) * (s - b) * (s - c) * (s - dd)));
        var shoe = Math.abs(sarea([p.A, p.B, p.C, p.D])) / (U * U);
        var body = circ(cen, r, "gc") + polyS([p.A, p.B, p.C, p.D], "gtri-fill") +
          ["A", "B", "C", "D"].map(function (k) { return dotS(p[k], "gd-acc"); }).join("") +
          lbl(p.A, cen, "A") + lbl(p.B, cen, "B") + lbl(p.C, cen, "C") + lbl(p.D, cen, "D");
        return { body: body, caption: "Area = √((s−a)(s−b)(s−c)(s−d)) = <b>" + fmt(area) + "</b> — matching the shoelace area " + fmt(shoe) + " (s = semiperimeter " + fmt(s) + ")." };
      }
    });
  } };

  // ---------- Section formula ----------
  W["section-formula"] = { mount: function (host) {
    mountGeo(host, {
      title: "Section formula",
      hint: "Drag P along AB.",
      w: 430, h: 260,
      init: { A: [70, 130], B: [370, 150], P: [200, 138] },
      drag: {
        A: {}, B: {},
        P: { constrain: function (xy, pts) { var t = dot(sub(xy, pts.A), sub(pts.B, pts.A)) / (dot(sub(pts.B, pts.A), sub(pts.B, pts.A)) || 1); t = Math.max(0.05, Math.min(0.95, t)); return add(pts.A, mul(sub(pts.B, pts.A), t)); } }
      },
      render: function (p) {
        var m = dist(p.A, p.P), n = dist(p.P, p.B), g = gcdi(Math.round(m), Math.round(n)) || 1;
        var body = seg(p.A, p.B, "gl") + seg(p.A, p.P, "gl-acc") +
          dotS(p.A, "gd-acc", 5) + dotS(p.B, "gd-acc", 5) + dotS(p.P, "gd-gold", 5.5) +
          txt(add(p.A, [-6, -12]), "A") + txt(add(p.B, [6, -12]), "B") + txt(add(p.P, [-2, -14]), "P", "gt-gold") +
          txt(add(mid(p.A, p.P), [0, 20]), "m") + txt(add(mid(p.P, p.B), [0, 20]), "n");
        return { body: body, caption: "AP : PB = " + uL(m) + " : " + uL(n) + " ≈ <b>" + fmt(m / (n || 1)) + " : 1</b>. Then P = (n·A + m·B)/(m + n) — a weighted average of the endpoints." };
      }
    });
  } };

  // ---------- Two tangents from a point ----------
  W["two-tangents-angle"] = { mount: function (host) {
    var O = [180, 190], r = 85;
    mountGeo(host, {
      title: "Two tangents",
      hint: "Drag P.",
      w: 420, h: 360,
      init: { P: [360, 120] },
      drag: { P: { constrain: function (xy) { var d = dist(xy, O); return d < r + 25 ? add(O, mul(norm(sub(xy, O)), r + 25)) : xy; } } },
      render: function (p) {
        var d = dist(p.P, O), a = r * r / d, h = r * Math.sqrt(Math.max(0, d * d - r * r)) / d;
        var base = add(O, mul(norm(sub(p.P, O)), a)), nrm = norm(perp(sub(p.P, O)));
        var T1 = add(base, mul(nrm, h)), T2 = sub(base, mul(nrm, h)), L = Math.sqrt(Math.max(0, d * d - r * r));
        var body = circ(O, r, "gc") + seg(p.P, T1, "gl-acc") + seg(p.P, T2, "gl-acc") +
          seg(O, T1, "gl-dash") + seg(O, T2, "gl-dash") +
          dotS(O, "gd", 2.5) + dotS(T1, "gd-gold", 4) + dotS(T2, "gd-gold", 4) + dotS(p.P, "gd-acc", 5) +
          txt(add(O, [6, 4]), "O") + txt(add(p.P, [8, 0]), "P", "gt-acc") + txt(add(T1, [6, -4]), "T₁", "gt-gold") + txt(add(T2, [6, 10]), "T₂", "gt-gold");
        return { body: body, caption: "The two tangent segments are equal: PT₁ = PT₂ = √(PO² − r²) = <b>" + uL(L) + "</b>, and each radius meets its tangent at a right angle." };
      }
    });
  } };

  // ---------- Napoleon's theorem ----------
  W["napoleons-theorem"] = { mount: function (host) {
    mountGeo(host, {
      title: "Napoleon",
      w: 430, h: 380,
      init: { A: [215, 90], B: [120, 250], C: [320, 240] },
      drag: { A: {}, B: {}, C: {} },
      render: function (p) {
        var xa = equiApex(p.B, p.C, p.A), xb = equiApex(p.C, p.A, p.B), xc = equiApex(p.A, p.B, p.C);
        var na = centroid(p.B, p.C, xa), nb = centroid(p.C, p.A, xb), nc = centroid(p.A, p.B, xc);
        var body =
          polyS([p.B, p.C, xa], "gfill-none") + polyS([p.C, p.A, xb], "gfill-none") + polyS([p.A, p.B, xc], "gfill-none") +
          polyS([p.A, p.B, p.C], "gtri") + polyS([na, nb, nc], "gtri-fill") +
          [na, nb, nc].map(function (q) { return dotS(q, "gd-gold", 4.5); }).join("") +
          dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") + dotS(p.C, "gd-acc");
        var e1 = dist(na, nb), e2 = dist(nb, nc), e3 = dist(nc, na);
        return { body: body, caption: "Build an equilateral triangle outward on each side; their centers (gold) are always equidistant: " + uL(e1) + ", " + uL(e2) + ", " + uL(e3) + " — an equilateral triangle." };
      }
    });
  } };

  // ---------- Cross product / parallelogram area ----------
  W["cross-product-area"] = { mount: function (host) {
    var O = [130, 250];
    mountGeo(host, {
      title: "Cross product",
      w: 420, h: 320,
      init: { A: [320, 210], B: [210, 90] },
      drag: { A: {}, B: {} },
      render: function (p) {
        var a = sub(p.A, O), b = sub(p.B, O), cross = Math.abs(a[0] * b[1] - a[1] * b[0]), th = angleDeg(O, p.A, p.B);
        var body = polyS([O, p.A, add(p.A, b), p.B], "gtri-fill") +
          arrowAcc(O, p.A) + arrowAcc(O, p.B) +
          dotS(O, "gd", 3) + txt(add(p.A, [8, 4]), "a", "gt-acc") + txt(add(p.B, [-4, -8]), "b", "gt-acc");
        return { body: body, caption: "Area = |a × b| = |aₓbᵧ − aᵧbₓ| = <b>" + uA(cross) + "</b> = |a||b| sin θ = " + uL(len(a)) + " · " + uL(len(b)) + " · sin " + fmt(th) + "°." };
      }
    });
  } };

  // ---------- Midsegment theorem ----------
  W["midsegment-theorem"] = { mount: function (host) {
    mountGeo(host, {
      title: "Midsegment",
      w: 420, h: 320,
      init: { A: [210, 70], B: [90, 275], C: [350, 270] },
      drag: { A: {}, B: {}, C: {} },
      render: function (p) {
        var M = mid(p.A, p.B), N = mid(p.A, p.C);
        var body = polyS([p.A, p.B, p.C], "gtri") + seg(M, N, "gl-acc") +
          dotS(M, "gd-gold", 4) + dotS(N, "gd-gold", 4) +
          dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") + dotS(p.C, "gd-acc") +
          lbl(p.A, mid(p.B, p.C), "A") + lbl(p.B, p.C, "B") + lbl(p.C, p.B, "C") +
          txt(add(M, [-14, 0]), "M", "gt-gold") + txt(add(N, [8, 0]), "N", "gt-gold");
        return { body: body, caption: "MN joins two midpoints: it is parallel to BC and exactly half its length — MN = " + uL(dist(M, N)) + ", BC = " + uL(dist(p.B, p.C)) + "." };
      }
    });
  } };

  // ---------- Euler's distance theorem ----------
  W["euler-distance-theorem"] = { mount: function (host) {
    mountGeo(host, {
      title: "Euler's distance",
      w: 420, h: 380,
      init: { A: [215, 80], B: [110, 290], C: [335, 265] },
      drag: { A: {}, B: {}, C: {} },
      render: function (p) {
        var O = circum(p.A, p.B, p.C), I = incenter(p.A, p.B, p.C), R = dist(O, p.A) / U;
        var s = (dist(p.B, p.C) + dist(p.C, p.A) + dist(p.A, p.B)) / 2, K = Math.abs(sarea([p.A, p.B, p.C])), r = (K / (s || 1)) / U;
        var OI2 = dist(O, I) / U * (dist(O, I) / U);
        var body = circ(O, R * U, "gc") + circ(I, r * U, "gc-acc") + polyS([p.A, p.B, p.C], "gtri") +
          seg(O, I, "gl-acc") + dotS(O, "gd-gold", 4.5) + dotS(I, "gd-grn", 4.5) +
          dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") + dotS(p.C, "gd-acc") +
          txt(add(O, [6, -4]), "O", "gt-gold") + txt(add(I, [6, 4]), "I", "gt-grn");
        return { body: body, caption: "OI² = <b>" + fmt(OI2) + "</b> &nbsp;=&nbsp; R² − 2Rr = " + fmt(R) + "² − 2·" + fmt(R) + "·" + fmt(r) + " = <b>" + fmt(R * R - 2 * R * r) + "</b> (Euler). Since OI² ≥ 0, R ≥ 2r." };
      }
    });
  } };

  // ---------- Point-to-line distance ----------
  W["point-line-distance"] = { mount: function (host) {
    mountGeo(host, {
      title: "Distance from a point to a line",
      w: 430, h: 300,
      init: { L1: [70, 210], L2: [370, 150], P: [220, 70] },
      drag: { L1: {}, L2: {}, P: {} },
      render: function (p) {
        var e = lineSpan(p.L1, p.L2, 430, 300), F = foot(p.P, p.L1, p.L2), dpx = dist(p.P, F);
        var body = seg(e[0], e[1], "gl") + seg(p.P, F, "gl-acc") +
          dotS(F, "gd-gold", 4) + dotS(p.L1, "gd-acc", 4.5) + dotS(p.L2, "gd-acc", 4.5) + dotS(p.P, "gd-grn", 5) +
          txt(add(p.P, [8, -6]), "P", "gt-grn") + txt(add(mid(p.P, F), [8, 0]), "d", "gt-acc");
        return { body: body, caption: "The shortest distance from P to the line is the perpendicular segment: d = <b>" + uL(dpx) + "</b> (foot in gold). Any slanted path to the line is longer." };
      }
    });
  } };

  // ---------- Chord length ----------
  W["chord-length"] = { mount: function (host) {
    var O = [210, 190], R = 140;
    mountGeo(host, {
      title: "Chord length",
      w: 420, h: 380,
      init: { A: projectToCircle([100, 110], O, R), B: projectToCircle([330, 140], O, R) },
      drag: { A: { constrain: function (xy) { return projectToCircle(xy, O, R); } }, B: { constrain: function (xy) { return projectToCircle(xy, O, R); } } },
      render: function (p) {
        p.A = projectToCircle(p.A, O, R); p.B = projectToCircle(p.B, O, R);
        var F = foot(O, p.A, p.B), dc = dist(O, F), chord = dist(p.A, p.B);
        var body = circ(O, R, "gc") + seg(p.A, p.B, "gl-acc") + seg(O, F, "gl-dash") + seg(O, p.A, "gl-dash") +
          dotS(O, "gd", 2.5) + dotS(F, "gd-gold", 3.5) + dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") +
          txt(add(O, [6, 4]), "O") + txt(add(mid(O, F), [8, 0]), "d", "gt-gold") + lbl(p.A, O, "A") + lbl(p.B, O, "B");
        return { body: body, caption: "Chord AB = 2√(R² − d²) = 2√(" + uL(R) + "² − " + uL(dc) + "²) = <b>" + uL(2 * Math.sqrt(Math.max(0, R * R - dc * dc))) + "</b>, matching the measured " + uL(chord) + " (d = distance from center)." };
      }
    });
  } };

  // ===== helpers for the third geometry batch =====
  function gridAxes(w, h, ox, oy, step) {
    var s = "", x, y;
    for (x = ox % step; x <= w; x += step) s += seg([x, 0], [x, h], "gl-grid");
    for (y = oy % step; y <= h; y += step) s += seg([0, y], [w, y], "gl-grid");
    return s + seg([0, oy], [w, oy], "gl-ax") + seg([ox, 0], [ox, h], "gl-ax");
  }
  function otherInt(cen, r, A, thru) { var pr = circleLine(cen, r, A, thru); if (!pr) return thru; return dist(pr[0], A) > dist(pr[1], A) ? pr[0] : pr[1]; }

  // ---------- Altitude to the hypotenuse (geometric mean) ----------
  W["altitude-hypotenuse"] = { mount: function (host) {
    mountGeo(host, {
      title: "Altitude to the hypotenuse",
      hint: "Drag A, B, or C.",
      w: 430, h: 320,
      init: { A: [80, 240], B: [360, 240], C: [230, 90] },
      drag: {
        A: {}, B: {},
        C: { constrain: function (xy, p) { var m = mid(p.A, p.B); return projectToCircle(xy, m, dist(p.A, p.B) / 2); } }
      },
      render: function (p) {
        var m = mid(p.A, p.B); p.C = projectToCircle(p.C, m, dist(p.A, p.B) / 2);   // Thales → right angle at C
        var H = foot(p.C, p.A, p.B), pp = dist(p.A, H), q = dist(H, p.B), h = dist(p.C, H);
        var body = circ(m, dist(p.A, p.B) / 2, "gl-dash") + polyS([p.A, p.B, p.C], "gtri") +
          seg(p.C, H, "gl-acc") + dotS(H, "gd-gold", 3.5) +
          dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") + dotS(p.C, "gd-acc") +
          lbl(p.A, p.B, "A") + lbl(p.B, p.A, "B") + lbl(p.C, H, "C") + txt(add(H, [0, 18]), "H", "gt-gold") + txt(add(mid(p.C, H), [8, 0]), "h", "gt-acc");
        return { body: body, caption: "The right-angle altitude is the geometric mean of the two pieces: h² = <b>" + uA(h * h) + "</b> = p·q = " + uL(pp) + " · " + uL(q) + " = <b>" + uA(pp * q) + "</b>." };
      }
    });
  } };

  // ---------- Intercept (basic proportionality) theorem ----------
  W["intercept-theorem"] = { mount: function (host) {
    var A = [215, 70], B = [90, 285], C = [355, 285];
    mountGeo(host, {
      title: "Basic proportionality",
      hint: "Drag D.",
      w: 430, h: 330,
      init: { D: add(A, mul(sub(B, A), 0.45)) },
      drag: { D: { constrain: function (xy) { var t = dot(sub(xy, A), sub(B, A)) / (dot(sub(B, A), sub(B, A)) || 1); t = Math.max(0.12, Math.min(0.88, t)); return add(A, mul(sub(B, A), t)); } } },
      render: function (p) {
        var t = dist(A, p.D) / dist(A, B), E = add(A, mul(sub(C, A), t));
        var body = polyS([A, B, C], "gtri") + seg(p.D, E, "gl-acc") +
          dotS(p.D, "gd-gold", 4.5) + dotS(E, "gd-gold", 4.5) + dotS(A, "gd") + dotS(B, "gd") + dotS(C, "gd") +
          lbl(A, mid(B, C), "A") + lbl(B, C, "B") + lbl(C, B, "C") + txt(add(p.D, [-16, 0]), "D", "gt-gold") + txt(add(E, [8, 0]), "E", "gt-gold");
        return { body: body, caption: "A line parallel to BC cuts the sides in equal ratios: AD/DB = " + fmt(dist(A, p.D) / dist(p.D, B)) + " = AE/EC = " + fmt(dist(A, E) / dist(E, C)) + "." };
      }
    });
  } };

  // ---------- Area = ½ ab sin C ----------
  W["trig-area"] = { mount: function (host) {
    mountGeo(host, {
      title: "Area = ½ · a · b · sin C",
      w: 420, h: 320,
      init: { A: [110, 90], B: [340, 130], C: [180, 275] },
      drag: { A: {}, B: {}, C: {} },
      render: function (p) {
        var a = dist(p.C, p.B), b = dist(p.C, p.A), Cang = angleDeg(p.C, p.A, p.B);
        var area = 0.5 * a * b * Math.sin(Cang * Math.PI / 180);
        var body = polyS([p.A, p.B, p.C], "gtri-fill") + seg(p.C, p.A, "gl-acc") + seg(p.C, p.B, "gl-acc") +
          dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") + dotS(p.C, "gd-gold", 5) +
          lbl(p.A, p.C, "A") + lbl(p.B, p.C, "B") + lbl(p.C, mid(p.A, p.B), "C", "gt-gold");
        return { body: body, caption: "Area = ½ · a · b · sin C = ½ · " + uL(a) + " · " + uL(b) + " · sin " + fmt(Cang) + "° = <b>" + uA(area) + "</b> (matches the shoelace area " + uA(Math.abs(sarea([p.A, p.B, p.C]))) + ")." };
      }
    });
  } };

  // ---------- Projection formula ----------
  W["projection-formula"] = { mount: function (host) {
    mountGeo(host, {
      title: "Projection formula",
      w: 430, h: 320,
      init: { A: [215, 80], B: [90, 265], C: [360, 265] },
      drag: { A: {}, B: {}, C: {} },
      render: function (p) {
        var H = foot(p.A, p.B, p.C), c = dist(p.A, p.B), b = dist(p.A, p.C), Bang = angleDeg(p.B, p.A, p.C), Cang = angleDeg(p.C, p.A, p.B);
        var body = polyS([p.A, p.B, p.C], "gtri") + seg(p.A, H, "gl-dash") +
          seg(p.B, H, "gl-acc") + seg(H, p.C, "gl-acc") + dotS(H, "gd-gold", 3.5) +
          dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") + dotS(p.C, "gd-acc") +
          lbl(p.A, H, "A") + lbl(p.B, p.C, "B") + lbl(p.C, p.B, "C") +
          txt(add(mid(p.B, H), [0, 16]), "c cos B") + txt(add(mid(H, p.C), [0, 16]), "b cos C");
        return { body: body, caption: "Foot of the altitude splits BC: a = c·cos B + b·cos C = " + uL(c * Math.cos(Bang * Math.PI / 180)) + " + " + uL(b * Math.cos(Cang * Math.PI / 180)) + " = <b>" + uL(c * Math.cos(Bang * Math.PI / 180) + b * Math.cos(Cang * Math.PI / 180)) + "</b> = BC (" + uL(dist(p.B, p.C)) + ")." };
      }
    });
  } };

  // ---------- Incircle tangent lengths ----------
  W["incircle-tangent-lengths"] = { mount: function (host) {
    mountGeo(host, {
      title: "Incircle tangent lengths",
      w: 420, h: 360,
      init: { A: [210, 70], B: [95, 290], C: [345, 280] },
      drag: { A: {}, B: {}, C: {} },
      render: function (p) {
        var I = incenter(p.A, p.B, p.C), a = dist(p.B, p.C), b = dist(p.C, p.A), c = dist(p.A, p.B), s = (a + b + c) / 2, r = Math.abs(sarea([p.A, p.B, p.C])) / (s || 1);
        var Ta = foot(I, p.B, p.C), Tb = foot(I, p.C, p.A), Tc = foot(I, p.A, p.B);
        var body = polyS([p.A, p.B, p.C], "gtri") + circ(I, r, "gc-acc") +
          [Ta, Tb, Tc].map(function (q) { return dotS(q, "gd-gold", 3.5); }).join("") + dotS(I, "gd", 2.5) +
          dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") + dotS(p.C, "gd-acc") +
          lbl(p.A, I, "A") + lbl(p.B, I, "B") + lbl(p.C, I, "C");
        return { body: body, caption: "From each vertex the two tangent segments are equal: from A they are s − a = <b>" + uL(s - a) + "</b>, from B: s − b = <b>" + uL(s - b) + "</b>, from C: s − c = <b>" + uL(s - c) + "</b>." };
      }
    });
  } };

  // ---------- Angle bisector length ----------
  W["angle-bisector-length"] = { mount: function (host) {
    mountGeo(host, {
      title: "Angle bisector length",
      w: 430, h: 330,
      init: { A: [95, 100], B: [345, 110], C: [210, 285] },
      drag: { A: {}, B: {}, C: {} },
      render: function (p) {
        var a = dist(p.C, p.B), b = dist(p.C, p.A);                 // CB = a, CA = b (sides at C)
        var D = add(p.A, mul(sub(p.B, p.A), b / (a + b)));          // bisector foot: AD/DB = CA/CB = b/a
        var d = dist(p.C, D), da = dist(p.A, D), db = dist(D, p.B);
        var body = polyS([p.A, p.B, p.C], "gtri") + seg(p.C, D, "gl-acc") +
          dotS(D, "gd-gold", 4.5) + dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") + dotS(p.C, "gd-acc") +
          lbl(p.A, p.B, "A") + lbl(p.B, p.A, "B") + lbl(p.C, D, "C") + txt(add(D, [-2, 20]), "D", "gt-gold");
        return { body: body, caption: "Bisector CD² = CA·CB − AD·DB = " + uL(b) + "·" + uL(a) + " − " + uL(da) + "·" + uL(db) + " = <b>" + uA(b * a - da * db) + "</b> = CD² (" + uA(d * d) + ")." };
      }
    });
  } };

  // ---------- Tangent-chord angle ----------
  W["tangent-chord-angle"] = { mount: function (host) {
    var O = [210, 200], R = 135;
    mountGeo(host, {
      title: "Tangent-chord angle = inscribed angle in the alternate segment",
      w: 420, h: 390,
      init: { T: projectToCircle([210, 65], O, R), A: projectToCircle([345, 260], O, R), B: projectToCircle([80, 250], O, R) },
      drag: (function () { var d = {}; ["T", "A", "B"].forEach(function (k) { d[k] = { constrain: function (xy) { return projectToCircle(xy, O, R); } }; }); return d; })(),
      render: function (p) {
        ["T", "A", "B"].forEach(function (k) { p[k] = projectToCircle(p[k], O, R); });
        var tanDir = perp(sub(p.T, O)), tp1 = add(p.T, mul(norm(tanDir), 120)), tp2 = sub(p.T, mul(norm(tanDir), 120));
        var chordDir = sub(p.A, p.T);
        var tcAngle = Math.acos(Math.max(-1, Math.min(1, Math.abs(dot(norm(tanDir), norm(chordDir))))) ) * 180 / Math.PI;
        var insc = angleDeg(p.B, p.T, p.A);
        var body = circ(O, R, "gc") + seg(tp1, tp2, "gl") + seg(p.T, p.A, "gl-acc") + seg(p.B, p.T, "gl-dash") + seg(p.B, p.A, "gl-dash") +
          dotS(O, "gd", 2) + dotS(p.T, "gd-gold", 5) + dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") +
          txt(add(p.T, [0, -12]), "T", "gt-gold") + lbl(p.A, O, "A", "gt-acc") + lbl(p.B, O, "B");
        return { body: body, caption: "The angle between the tangent at T and chord TA is <b>" + fmt(tcAngle) + "°</b> — equal to the inscribed angle ∠TBA = <b>" + fmt(insc) + "°</b> in the alternate segment." };
      }
    });
  } };

  // ---------- Apollonius circle ----------
  W["apollonius-circle"] = { mount: function (host) {
    var A = [130, 210], B = [330, 210];
    mountGeo(host, {
      title: "Apollonius circle",
      hint: "Drag P.",
      w: 430, h: 360,
      init: { A: A, B: B, P: [250, 110] },
      drag: { A: {}, B: {}, P: {} },
      render: function (p) {
        var lam = dist(p.P, p.A) / (dist(p.P, p.B) || 1);
        var body = seg(p.A, p.B, "gl-dash") + seg(p.A, p.P, "gl-acc") + seg(p.B, p.P, "gl-acc");
        if (Math.abs(lam - 1) < 0.04) {
          var mm = mid(p.A, p.B), nrm = norm(perp(sub(p.B, p.A)));
          body += seg(sub(mm, mul(nrm, 150)), add(mm, mul(nrm, 150)), "gc-acc");
          body += dotS(p.A, "gd") + dotS(p.B, "gd") + dotS(p.P, "gd-gold", 5) + txt(add(p.A, [-16, 0]), "A") + txt(add(p.B, [8, 0]), "B") + txt(add(p.P, [8, -6]), "P", "gt-gold");
          return { body: body, caption: "PA/PB = <b>" + fmt(lam) + "</b> ≈ 1 — the locus is the perpendicular bisector of AB (the limiting Apollonius &ldquo;circle&rdquo;)." };
        }
        var X1 = add(p.A, mul(sub(p.B, p.A), lam / (1 + lam))), X2 = add(p.A, mul(sub(p.B, p.A), lam / (lam - 1)));
        var cen = mid(X1, X2), rad = dist(X1, X2) / 2;
        body += circ(cen, rad, "gc-acc") + dotS(p.A, "gd") + dotS(p.B, "gd") + dotS(p.P, "gd-gold", 5) +
          txt(add(p.A, [-16, 0]), "A") + txt(add(p.B, [8, 0]), "B") + txt(add(p.P, [8, -6]), "P", "gt-gold");
        return { body: body, caption: "PA/PB = <b>" + fmt(lam) + "</b>. Every point on the drawn circle keeps this same ratio to A and B — the Apollonius circle." };
      }
    });
  } };

  // ---------- Butterfly theorem ----------
  W["butterfly-theorem"] = { mount: function (host) {
    var O = [215, 195], R = 150;
    mountGeo(host, {
      title: "Butterfly theorem",
      w: 430, h: 390,
      init: { P: projectToCircle([80, 120], O, R), Q: projectToCircle([360, 250], O, R), A: projectToCircle([120, 300], O, R), C: projectToCircle([330, 90], O, R) },
      drag: (function () { var d = {}; ["P", "Q", "A", "C"].forEach(function (k) { d[k] = { constrain: function (xy) { return projectToCircle(xy, O, R); } }; }); return d; })(),
      render: function (p) {
        ["P", "Q", "A", "C"].forEach(function (k) { p[k] = projectToCircle(p[k], O, R); });
        var M = mid(p.P, p.Q);
        var B = otherInt(O, R, p.A, M), D = otherInt(O, R, p.C, M);
        var X = lineInt(p.A, D, p.P, p.Q), Y = lineInt(B, p.C, p.P, p.Q);
        var body = circ(O, R, "gc") + seg(p.P, p.Q, "gl") +
          seg(p.A, B, "gl-dash") + seg(p.C, D, "gl-dash") + seg(p.A, D, "gl-acc") + seg(B, p.C, "gl-acc") +
          dotS(M, "gd", 3) + dotS(X, "gd-gold", 4.5) + dotS(Y, "gd-gold", 4.5) +
          [p.A, B, p.C, D].map(function (q) { return dotS(q, "gd-acc", 3.5); }).join("") + dotS(p.P, "gd", 3) + dotS(p.Q, "gd", 3) +
          txt(add(M, [0, 16]), "M") + txt(add(X, [0, -10]), "X", "gt-gold") + txt(add(Y, [0, -10]), "Y", "gt-gold");
        return { body: body, caption: "M is the midpoint of chord PQ. Two chords through M make the &ldquo;wings&rdquo; meet PQ at X and Y with MX = <b>" + uL(dist(M, X)) + "</b> = MY = <b>" + uL(dist(M, Y)) + "</b>." };
      }
    });
  } };

  // ---------- Radical axis ----------
  W["radical-axis"] = { mount: function (host) {
    mountGeo(host, {
      title: "Radical axis",
      hint: "Drag the two circle centers.",
      w: 430, h: 340,
      init: { O1: [150, 180], O2: [300, 190] },
      drag: { O1: {}, O2: {} },
      render: function (p) {
        var r1r = 90, r2r = 70, d = dist(p.O1, p.O2) || 1;
        var a = (d * d + r1r * r1r - r2r * r2r) / (2 * d);            // distance from O1 to radical axis along center line
        var foot0 = add(p.O1, mul(norm(sub(p.O2, p.O1)), a)), nrm = norm(perp(sub(p.O2, p.O1)));
        var body = circ(p.O1, r1r, "gc") + circ(p.O2, r2r, "gc") +
          seg(p.O1, p.O2, "gl-dash") + seg(sub(foot0, mul(nrm, 150)), add(foot0, mul(nrm, 150)), "gc-acc") +
          dotS(p.O1, "gd-acc", 4.5) + dotS(p.O2, "gd-acc", 4.5) + txt(add(p.O1, [-6, 4]), "O₁") + txt(add(p.O2, [6, 4]), "O₂");
        return { body: body, caption: "The radical axis (accent line) is perpendicular to the line of centers; every point on it has equal power to both circles (equal tangent lengths). For overlapping circles it passes through both intersection points." };
      }
    });
  } };

  // ---------- Distance & midpoint ----------
  W["distance-midpoint"] = { mount: function (host) {
    var ox = 215, oy = 160, step = 30;
    function S2M(s) { return [(s[0] - ox) / step, (oy - s[1]) / step]; }
    function M2S(m) { return [ox + m[0] * step, oy - m[1] * step]; }
    function snap(s) { var m = S2M(s); return M2S([Math.round(m[0]), Math.round(m[1])]); }
    mountGeo(host, {
      title: "Distance & midpoint",
      hint: "Drag the two points.",
      w: 430, h: 320,
      init: { A: M2S([-3, -2]), B: M2S([4, 3]) },
      drag: { A: { constrain: snap }, B: { constrain: snap } },
      render: function (p) {
        var a = S2M(p.A), b = S2M(p.B), M = mid(p.A, p.B), d = Math.hypot(a[0] - b[0], a[1] - b[1]);
        var body = gridAxes(430, 320, ox, oy, step) + seg(p.A, p.B, "gl-acc") +
          dotS(p.A, "gd-acc", 5) + dotS(p.B, "gd-acc", 5) + dotS(M, "gd-gold", 4.5) +
          txt(add(p.A, [-8, -10]), "A", "gt-acc") + txt(add(p.B, [8, -8]), "B", "gt-acc") + txt(add(M, [8, 12]), "M", "gt-gold");
        return { body: body, caption: "A(" + a[0] + ", " + a[1] + "), B(" + b[0] + ", " + b[1] + "). Distance = √((Δx)² + (Δy)²) = <b>" + (Math.round(d * 100) / 100) + "</b>; midpoint = (" + ((a[0] + b[0]) / 2) + ", " + ((a[1] + b[1]) / 2) + ")." };
      }
    });
  } };

  // ---------- Reflections across the axes and y = x ----------
  W["reflection-coordinates"] = { mount: function (host) {
    var ox = 215, oy = 160, step = 30;
    function S2M(s) { return [(s[0] - ox) / step, (oy - s[1]) / step]; }
    function M2S(m) { return [ox + m[0] * step, oy - m[1] * step]; }
    function snap(s) { var m = S2M(s); return M2S([Math.round(m[0]), Math.round(m[1])]); }
    mountGeo(host, {
      title: "Reflections",
      hint: "Drag P.",
      w: 430, h: 320,
      init: { P: M2S([3, 2]) },
      drag: { P: { constrain: snap } },
      render: function (p) {
        var m = S2M(p.P);
        var Rx = M2S([m[0], -m[1]]), Ry = M2S([-m[0], m[1]]), Rl = M2S([m[1], m[0]]);
        var body = gridAxes(430, 320, ox, oy, step) + seg([ox - 200, oy + 200], [ox + 200, oy - 200], "gl-dash") +
          dotS(Rx, "gd-grn", 4.5) + dotS(Ry, "gd-acc", 4.5) + dotS(Rl, "gd-gold", 4.5) + dotS(p.P, "gd-acc", 5.5) +
          txt(add(p.P, [8, -6]), "P", "gt-acc") + txt(add(Rx, [8, 12]), "x-axis", "gt-grn") + txt(add(Ry, [-10, -8]), "y-axis", "gt-acc") + txt(add(Rl, [8, 4]), "y=x", "gt-gold");
        return { body: body, caption: "P(" + m[0] + ", " + m[1] + ") → across x-axis (" + m[0] + ", " + (-m[1]) + "), across y-axis (" + (-m[0]) + ", " + m[1] + "), across y = x (" + m[1] + ", " + m[0] + ")." };
      }
    });
  } };

  // ---------- 90° rotations about the origin ----------
  W["rotation-90"] = { mount: function (host) {
    var ox = 215, oy = 160, step = 30;
    function S2M(s) { return [(s[0] - ox) / step, (oy - s[1]) / step]; }
    function M2S(m) { return [ox + m[0] * step, oy - m[1] * step]; }
    function snap(s) { var m = S2M(s); return M2S([Math.round(m[0]), Math.round(m[1])]); }
    mountGeo(host, {
      title: "Rotations about the origin",
      hint: "Drag P.",
      w: 430, h: 320,
      init: { P: M2S([3, 1]) },
      drag: { P: { constrain: snap } },
      render: function (p) {
        var m = S2M(p.P), Origin = M2S([0, 0]);
        var r90 = M2S([-m[1], m[0]]), r180 = M2S([-m[0], -m[1]]), r270 = M2S([m[1], -m[0]]);
        var body = gridAxes(430, 320, ox, oy, step) +
          seg(Origin, p.P, "gl-acc") + seg(Origin, r90, "gl-dash") + seg(Origin, r180, "gl-dash") + seg(Origin, r270, "gl-dash") +
          dotS(r90, "gd-gold", 4.5) + dotS(r180, "gd-grn", 4.5) + dotS(r270, "gd-gold", 4.5) + dotS(p.P, "gd-acc", 5.5) +
          txt(add(p.P, [8, -6]), "P", "gt-acc") + txt(add(r90, [8, -6]), "90°", "gt-gold") + txt(add(r180, [-6, -8]), "180°", "gt-grn") + txt(add(r270, [8, 12]), "270°", "gt-gold");
        return { body: body, caption: "P(" + m[0] + ", " + m[1] + ") rotates (counter-clockwise): 90° → (" + (-m[1]) + ", " + m[0] + "), 180° → (" + (-m[0]) + ", " + (-m[1]) + "), 270° → (" + m[1] + ", " + (-m[0]) + ")." };
      }
    });
  } };

  // ---------- Circle equation ----------
  W["circle-equation"] = { mount: function (host) {
    var ox = 215, oy = 175, step = 26;
    function S2M(s) { return [(s[0] - ox) / step, (oy - s[1]) / step]; }
    function M2S(m) { return [ox + m[0] * step, oy - m[1] * step]; }
    function snapC(s) { var m = S2M(s); return M2S([Math.round(m[0]), Math.round(m[1])]); }
    mountGeo(host, {
      title: "Circle equation",
      hint: "Drag the center and the radius handle.",
      w: 430, h: 350,
      init: { C: M2S([1, 0]), Rh: M2S([4, 0]) },
      drag: { C: { constrain: snapC }, Rh: {} },
      render: function (p) {
        var c = S2M(p.C), r = dist(p.C, p.Rh), rU = Math.round(r / step * 100) / 100;
        var body = gridAxes(430, 350, ox, oy, step) + circ(p.C, r, "gc-acc") +
          seg(p.C, p.Rh, "gl-dash") + dotS(p.C, "gd-acc", 5) + dotS(p.Rh, "gd-gold", 4.5) +
          txt(add(p.C, [8, -6]), "(h,k)", "gt-acc") + txt(add(mid(p.C, p.Rh), [0, -6]), "r", "gt-gold");
        return { body: body, caption: "(x − " + c[0] + ")² + (y − " + c[1] + ")² = " + rU + "² &nbsp;→&nbsp; center (h, k) = (" + c[0] + ", " + c[1] + "), radius r = <b>" + rU + "</b>." };
      }
    });
  } };

  // ---------- Circle inversion ----------
  W["inversion-properties"] = { mount: function (host) {
    var O = [215, 185], k = 95;
    mountGeo(host, {
      title: "Inversion in a circle",
      hint: "Drag P.",
      w: 430, h: 370,
      init: { P: [320, 130] },
      drag: { P: { constrain: function (xy) { return dist(xy, O) < 14 ? add(O, [14, 0]) : xy; } } },
      render: function (p) {
        var d = dist(p.P, O), Pstar = add(O, mul(norm(sub(p.P, O)), k * k / d));
        var body = circ(O, k, "gc-acc") + seg(O, Pstar, "gl-dash") +
          dotS(O, "gd", 3) + dotS(p.P, "gd-acc", 5) + dotS(Pstar, "gd-gold", 5) +
          txt(add(O, [6, 14]), "O") + txt(add(p.P, [8, -6]), "P", "gt-acc") + txt(add(Pstar, [8, -6]), "P*", "gt-gold");
        return { body: body, caption: "P* lies on ray OP with OP · OP* = " + uL(d) + " · " + uL(dist(O, Pstar)) + " = <b>" + uA(d * dist(O, Pstar)) + "</b> = r² (" + uA(k * k) + "). Points inside map outside and vice-versa." };
      }
    });
  } };

  // ---------- Golden ratio in the pentagon ----------
  W["golden-ratio-pentagon"] = { mount: function (host) {
    var cen = [210, 200];
    mountGeo(host, {
      title: "Regular pentagon",
      hint: "Drag a vertex.",
      w: 420, h: 400,
      init: { V: [210, 60] },
      drag: { V: {} },
      render: function (p) {
        var R = dist(p.V, cen), a0 = Math.atan2(p.V[1] - cen[1], p.V[0] - cen[0]);
        var v = []; for (var k = 0; k < 5; k++) { var a = a0 + k * 2 * Math.PI / 5; v.push([cen[0] + R * Math.cos(a), cen[1] + R * Math.sin(a)]); }
        var side = dist(v[0], v[1]), diag = dist(v[0], v[2]);
        var body = polyS(v, "gtri") + seg(v[0], v[1], "gl-gold") + seg(v[0], v[2], "gl-acc") +
          v.map(function (q, i) { return dotS(q, i === 0 ? "gd-acc" : "gd", i === 0 ? 5 : 3.5); }).join("") +
          txt(add(mid(v[0], v[1]), [0, -6]), "side", "gt-gold") + txt(add(mid(v[0], v[2]), [6, 0]), "diagonal", "gt-acc");
        return { body: body, caption: "diagonal / side = " + uL(diag) + " / " + uL(side) + " = <b>" + fmt(diag / (side || 1)) + "</b> ≈ φ = 1.618… — the golden ratio lives in every regular pentagon." };
      }
    });
  } };

  // ---------- Same-base area ratio (diagonal split) ----------
  W["same-base-area-ratio"] = { mount: function (host) {
    mountGeo(host, {
      title: "Same-base area ratio",
      hint: "Drag any vertex.",
      w: 430, h: 390,
      init: { A: [130, 120], B: [90, 330], C: [365, 300], D: [330, 70] },
      drag: { A: {}, B: {}, C: {}, D: {} },
      render: function (p) {
        var P = lineInt(p.A, p.C, p.B, p.D);
        var area1 = Math.abs(sarea([p.A, p.B, p.D])), area2 = Math.abs(sarea([p.C, p.B, p.D]));
        var ap = dist(p.A, P), pc = dist(P, p.C);
        var body =
          polyS([p.A, p.B, p.D], "gtri-fill") + polyS([p.C, p.B, p.D], "gfill-red") +
          seg(p.A, p.D, "gl") + seg(p.D, p.C, "gl") + seg(p.C, p.B, "gl") + seg(p.B, p.A, "gl") +
          seg(p.B, p.D, "gl-dash") + seg(p.A, P, "gl-acc") + seg(P, p.C, "gl-red") +
          txt(add(mid(mid(p.A, p.B), P), [-6, 0]), "Area₁", "gt-acc") + txt(add(mid(mid(p.C, p.D), P), [6, 6]), "Area₂", "gt-red") +
          dotS(P, "gd", 4) + dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") + dotS(p.C, "gd-acc") + dotS(p.D, "gd-acc") +
          lbl(p.A, P, "A") + lbl(p.B, P, "B") + lbl(p.C, P, "C") + lbl(p.D, P, "D") + txt(add(P, [8, -6]), "P");
        return { body: body, caption: "[ABD] / [CBD] = " + uA(area1) + " / " + uA(area2) + " = <b>" + fmt(area1 / (area2 || 1)) + "</b> &nbsp;=&nbsp; AP / PC = " + uL(ap) + " / " + uL(pc) + " = <b>" + fmt(ap / (pc || 1)) + "</b> — both triangles share base BD." };
      }
    });
  } };


  // ---------- median to the hypotenuse ----------
  W["median-to-hypotenuse"] = { mount: function (host) {
    var A = [80, 300], B = [370, 300];
    mountGeo(host, {
      title: "Median to the hypotenuse",
      hint: "Drag C around the circle.",
      w: 450, h: 360,
      init: { A: A, B: B, C: [180, 120] },
      drag: {
        A: { constrain: function (xy, p) { return [Math.min(xy[0], p.B[0] - 60), p.B[1]]; } },
        B: { constrain: function (xy, p) { return [Math.max(xy[0], p.A[0] + 60), p.A[1]]; } },
        C: { constrain: function (xy, p) { var m = mid(p.A, p.B); return projectToCircle(xy[1] > m[1] - 8 ? [xy[0], m[1] - 8] : xy, m, dist(p.A, p.B) / 2); } }
      },
      render: function (p) {
        var M = mid(p.A, p.B), R = dist(p.A, p.B) / 2;
        p.C = projectToCircle(p.C, M, R);
        var med = dist(p.C, M), hyp = dist(p.A, p.B), ang = angleDeg(p.C, p.A, p.B);
        var body = circ(M, R, "gc-dash") + polyS([p.A, p.B, p.C], "gtri") +
          seg(p.C, M, "gl-acc") + seg(p.A, p.B, "gl-gold") +
          dotS(M, "gd-gold", 4.5) + dotS(p.A, "gd") + dotS(p.B, "gd") + dotS(p.C, "gd-acc", 5) +
          txt(add(mid(p.C, M), [8, -4]), "m", "gt-acc") + txt(add(M, [-4, 20]), "M", "gt-gold") +
          lbl(p.A, M, "A") + lbl(p.B, M, "B") + lbl(p.C, M, "C", "gt-acc");
        return { body: body, caption: "Angle C = <b>" + fmt(ang) + "°</b>, and the median CM = <b>" + uL(med) + "</b> = half the hypotenuse AB/2 = " + uL(hyp) + "/2 = <b>" + uL(hyp / 2) + "</b>. C is right precisely because M is equidistant from all three vertices — M is the circumcenter." };
      }
    });
  } };

  // ---------- cevian area ratio ----------
  W["cevian-area-ratio"] = { mount: function (host) {
    mountGeo(host, {
      title: "Cevian area ratio",
      hint: "Drag D along BC.",
      w: 440, h: 350,
      init: { A: [210, 55], B: [70, 295], C: [390, 295], D: [270, 295] },
      drag: {
        A: {}, B: {}, C: {},
        D: { constrain: function (xy, p) { var f = foot(xy, p.B, p.C), t = dot(sub(f, p.B), sub(p.C, p.B)) / (dot(sub(p.C, p.B), sub(p.C, p.B)) || 1); t = Math.max(0.08, Math.min(0.92, t)); return add(p.B, mul(sub(p.C, p.B), t)); } }
      },
      render: function (p) {
        p.D = (function () { var t = dot(sub(p.D, p.B), sub(p.C, p.B)) / (dot(sub(p.C, p.B), sub(p.C, p.B)) || 1); return add(p.B, mul(sub(p.C, p.B), Math.max(0.08, Math.min(0.92, t)))); })();
        var bd = dist(p.B, p.D), dc = dist(p.D, p.C);
        var a1 = Math.abs(sarea([p.A, p.B, p.D])), a2 = Math.abs(sarea([p.A, p.D, p.C]));
        var H = foot(p.A, p.B, p.C);
        var body = polyS([p.A, p.B, p.D], "gtri-fill") + polyS([p.A, p.D, p.C], "gtri") +
          seg(p.A, p.D, "gl-acc") + seg(p.B, p.D, "gl-gold") + seg(p.D, p.C, "gl-grn") +
          seg(p.A, H, "gl-dash") +
          dotS(p.A, "gd") + dotS(p.B, "gd") + dotS(p.C, "gd") + dotS(p.D, "gd-acc", 5) +
          txt(add(mid(p.B, p.D), [0, 18]), "BD", "gt-gold") + txt(add(mid(p.D, p.C), [0, 18]), "DC", "gt-grn") +
          txt(add(mid(p.A, H), [-16, 0]), "h", "gt") +
          lbl(p.A, p.D, "A") + lbl(p.B, p.C, "B") + lbl(p.C, p.B, "C") + txt(add(p.D, [-4, 20]), "D", "gt-acc");
        return { body: body, caption: "[ABD] : [ADC] = " + uA(a1) + " : " + uA(a2) + " = <b>" + fmt(a1 / (a2 || 1)) + "</b>, exactly BD : DC = " + uL(bd) + " : " + uL(dc) + " = <b>" + fmt(bd / (dc || 1)) + "</b>. Both triangles have the same height h from A, so only the bases matter." };
      }
    });
  } };

  // ---------- similar figure ratios ----------
  W["similar-figures-ratios"] = { mount: function (host) {
    // The handle is the image of the apex under the homothety, so dragging it is
    // the scaling. An earlier version used a free point whose distance alone set
    // k, which meant sideways drags changed the figure for no visible reason.
    var O = [95, 300], A = [95, 300], B = [215, 300], C = [140, 196];
    var ray = norm(sub(C, O)), baseLen = dist(C, O);
    mountGeo(host, {
      title: "Similar figures",
      hint: "Drag the apex of the larger triangle.",
      w: 450, h: 350,
      init: { P: add(O, mul(ray, baseLen * 1.7)) },
      drag: { P: { constrain: function (xy) {
        var t = dot(sub(xy, O), ray);
        return add(O, mul(ray, Math.max(baseLen * 0.45, Math.min(baseLen * 2.35, t))));
      } } },
      render: function (p) {
        var k = dist(p.P, O) / baseLen;
        function sc(Q) { return add(O, mul(sub(Q, O), k)); }
        var B2 = sc(B), C2 = p.P;
        var a1 = Math.abs(sarea([A, B, C])), a2 = Math.abs(sarea([A, B2, C2]));
        var big = k >= 1;
        var body =
          seg(O, add(O, mul(norm(sub(B2, O)), Math.max(dist(B2, O), dist(B, O)) + 26)), "gl-dash") +
          seg(O, add(O, mul(ray, Math.max(dist(C2, O), baseLen) + 26)), "gl-dash") +
          polyS(big ? [A, B2, C2] : [A, B, C], "gtri") +
          polyS(big ? [A, B, C] : [A, B2, C2], "gtri-fill") +
          dotS(O, "gd", 4) + dotS(C2, "gd-acc", 5.5) +
          txt(add(mid(A, B), [0, 19]), "1", "gt-gold") +
          txt(add(mid(A, B2), [0, big ? 19 : -9]), "k", "gt-acc") +
          txt(add(O, [-16, 8]), "O");
        return {
          body: body,
          caption: "Scale factor k = <b>" + fmt(k) + "</b>, measured from the centre O. Lengths scale by k, areas by k² = <b>" + fmt(k * k) +
            "</b> (the two triangles here measure " + fmt(a2 / (a1 || 1)) + "), and the volume of a matching solid by k³ = <b>" + fmt(k * k * k) + "</b>."
        };
      }
    });
  } };

  W["circular-segment"] = { mount: function (host) {
    var O = [220, 200], R = 140;
    mountGeo(host, {
      title: "Circular segment",
      hint: "Drag the chord ends.",
      w: 440, h: 400,
      init: { A: projectToCircle([120, 90], O, R), B: projectToCircle([340, 130], O, R) },
      drag: { A: { constrain: function (xy) { return projectToCircle(xy, O, R); } }, B: { constrain: function (xy) { return projectToCircle(xy, O, R); } } },
      render: function (p) {
        p.A = projectToCircle(p.A, O, R); p.B = projectToCircle(p.B, O, R);
        var th = angleDeg(O, p.A, p.B) * Math.PI / 180;
        var aA = Math.atan2(p.A[1] - O[1], p.A[0] - O[0]), aB = Math.atan2(p.B[1] - O[1], p.B[0] - O[0]);
        var d = aB - aA; while (d < 0) d += 2 * Math.PI; while (d > 2 * Math.PI) d -= 2 * Math.PI;
        var big = d > Math.PI ? 1 : 0;
        var segArea = R * R / 2 * (th - Math.sin(th)), secArea = R * R * th / 2, triArea = R * R * Math.sin(th) / 2;
        var body = circ(O, R, "gc") +
          '<path d="M ' + r1(p.A[0]) + " " + r1(p.A[1]) + " A " + R + " " + R + " 0 " + big + " 1 " + r1(p.B[0]) + " " + r1(p.B[1]) + ' Z" class="gtri-fill"/>' +
          seg(O, p.A, "gl-dash") + seg(O, p.B, "gl-dash") + seg(p.A, p.B, "gl-acc") +
          dotS(O, "gd", 2.5) + dotS(p.A, "gd-acc") + dotS(p.B, "gd-acc") +
          txt(add(O, [6, 4]), "O") + txt(add(O, [-4, -18]), "θ", "gt-gold") +
          lbl(p.A, O, "A") + lbl(p.B, O, "B");
        return { body: body, caption: "θ = <b>" + fmt(th * 180 / Math.PI) + "°</b> = " + fmt(th) + " rad. Sector " + uA(secArea) + " − triangle " + uA(triArea) + " = segment <b>" + uA(segArea) + "</b> = ½R²(θ − sin θ). Chord = " + uL(dist(p.A, p.B)) + " = 2R sin(θ/2)." };
      }
    });
  } };

  // ---------- angles from chords / secants / tangents ----------
  W["angle-chord-secant"] = { mount: function (host) {
    var O = [200, 195], R = 135;
    mountGeo(host, {
      title: "Chord angle",
      hint: "Drag the four endpoints.",
      w: 440, h: 390,
      init: {
        A: projectToCircle([90, 100], O, R), B: projectToCircle([320, 300], O, R),
        C: projectToCircle([330, 100], O, R), D: projectToCircle([100, 300], O, R)
      },
      drag: ["A", "B", "C", "D"].reduce(function (o, k) { o[k] = { constrain: function (xy) { return projectToCircle(xy, O, R); } }; return o; }, {}),
      render: function (p) {
        ["A", "B", "C", "D"].forEach(function (k) { p[k] = projectToCircle(p[k], O, R); });
        var P = lineInt(p.A, p.B, p.C, p.D);
        function arcDeg(X, Y) { var a = Math.atan2(X[1] - O[1], X[0] - O[0]), b = Math.atan2(Y[1] - O[1], Y[0] - O[0]); var d = b - a; while (d < 0) d += 2 * Math.PI; while (d > 2 * Math.PI) d -= 2 * Math.PI; return d * 180 / Math.PI; }
        var arcAC = Math.min(arcDeg(p.A, p.C), arcDeg(p.C, p.A));
        var arcBD = Math.min(arcDeg(p.B, p.D), arcDeg(p.D, p.B));
        var inside = dist(P, O) < R - 2;
        var ang = angleDeg(P, p.A, p.C);
        var body = circ(O, R, "gc") + seg(p.A, p.B, "gl-acc") + seg(p.C, p.D, "gl-gold") +
          dotS(O, "gd", 2.5) + dotS(P, "gd-grn", 5) +
          dotS(p.A, "gd-acc", 4) + dotS(p.B, "gd-acc", 4) + dotS(p.C, "gd-gold", 4) + dotS(p.D, "gd-gold", 4) +
          lbl(p.A, O, "A", "gt-acc") + lbl(p.B, O, "B", "gt-acc") + lbl(p.C, O, "C", "gt-gold") + lbl(p.D, O, "D", "gt-gold");
        var cap = inside
          ? "The chords meet inside: the angle at P is <b>half the sum</b> of the two intercepted arcs, ½(" + fmt(arcAC) + "° + " + fmt(arcBD) + "°) = <b>" + fmt((arcAC + arcBD) / 2) + "°</b>."
          : "The lines meet outside: the angle at P is <b>half the difference</b> of the intercepted arcs, ½|" + fmt(arcAC) + "° − " + fmt(arcBD) + "°| = <b>" + fmt(Math.abs(arcAC - arcBD) / 2) + "°</b>.";
        return { body: body, caption: cap + " Drag an endpoint until P crosses the circle to switch between the two rules." };
      }
    });
  } };

  W["equilateral-triangle-facts"] = { mount: function (host) {
    var Cn = [220, 200];
    mountGeo(host, {
      title: "Equilateral triangle",
      hint: "Drag a vertex to resize.",
      w: 440, h: 400,
      init: { A: [220, 65] },
      drag: { A: { constrain: function (xy) { var d = Math.max(55, Math.min(165, dist(xy, Cn))); return add(Cn, mul(norm(sub(xy, Cn)), d)); } } },
      render: function (p) {
        var R = dist(p.A, Cn), th = Math.atan2(p.A[1] - Cn[1], p.A[0] - Cn[0]);
        function vert(k) { var a = th + 2 * Math.PI * k / 3; return [Cn[0] + R * Math.cos(a), Cn[1] + R * Math.sin(a)]; }
        var A = vert(0), B = vert(1), C = vert(2);
        var s = dist(A, B), h = s * Math.sqrt(3) / 2, r = R / 2, area = s * s * Math.sqrt(3) / 4;
        var M = mid(B, C);
        var body = circ(Cn, R, "gc-dash") + circ(Cn, r, "gc-grn") + polyS([A, B, C], "gtri") +
          seg(A, M, "gl-acc") + seg(Cn, A, "gl-gold") + seg(Cn, M, "gl-grn") +
          dotS(Cn, "gd", 3) + dotS(A, "gd-acc", 5) + dotS(B, "gd") + dotS(C, "gd") +
          txt(add(mid(A, M), [10, 0]), "h", "gt-acc") + txt(add(mid(Cn, A), [-14, 0]), "R", "gt-gold") + txt(add(mid(Cn, M), [10, 6]), "r", "gt-grn") +
          txt(add(mid(B, C), [-6, 20]), "s", "gt");
        return { body: body, caption: "s = <b>" + uL(s) + "</b> → h = s√3/2 = <b>" + uL(h) + "</b>, area = s²√3/4 = <b>" + uA(area) + "</b>, R = s/√3 = <b>" + uL(R) + "</b>, r = s/(2√3) = <b>" + uL(r) + "</b>. Note R = 2r and h = R + r — the center is the same point for all four triangle centers." };
      }
    });
  } };

  // ---------- trapezoid / parallelogram areas ----------
  W["trapezoid-parallelogram-areas"] = { mount: function (host) {
    mountGeo(host, {
      title: "Trapezoid area",
      hint: "Drag the top side.",
      w: 450, h: 350,
      init: { P: [150, 120], Q: [300, 120], B: [370, 290] },
      drag: {
        P: { constrain: function (xy, p) { return [Math.min(xy[0], p.Q[0] - 30), Math.max(60, Math.min(250, xy[1]))]; } },
        Q: { constrain: function (xy, p) { return [Math.max(xy[0], p.P[0] + 30), p.P[1]]; } },
        B: { constrain: function (xy) { return [Math.max(180, Math.min(430, xy[0])), 290]; } }
      },
      render: function (p) {
        p.Q = [Math.max(p.Q[0], p.P[0] + 30), p.P[1]];
        var A = [80, 290], Bv = p.B, D = p.P, C = p.Q;
        var b1 = dist(D, C), b2 = dist(A, Bv), h = Math.abs(290 - p.P[1]);
        var area = Math.abs(sarea([A, Bv, C, D]));
        var Mm = [ (A[0] + D[0]) / 2, (A[1] + D[1]) / 2 ], Mn = [ (Bv[0] + C[0]) / 2, (Bv[1] + C[1]) / 2 ];
        var body = polyS([A, Bv, C, D], "gtri") +
          seg(D, C, "gl-gold") + seg(A, Bv, "gl-grn") + seg(Mm, Mn, "gl-acc") +
          seg(D, [D[0], 290], "gl-dash") +
          dotS(p.P, "gd-acc", 5) + dotS(p.Q, "gd-acc", 5) + dotS(p.B, "gd-acc", 5) + dotS(A, "gd") +
          txt(add(mid(D, C), [-6, -8]), "b₁", "gt-gold") + txt(add(mid(A, Bv), [-6, 20]), "b₂", "gt-grn") +
          txt(add(mid(Mm, Mn), [-6, -8]), "m", "gt-acc") + txt(add(mid(D, [D[0], 290]), [-16, 4]), "h", "gt");
        return { body: body, caption: "b₁ = " + uL(b1) + ", b₂ = " + uL(b2) + ", h = " + uL(h) + " → area = ½(b₁+b₂)h = <b>" + uA(area) + "</b>. The midsegment m = <b>" + uL(dist(Mm, Mn)) + "</b> is the average ½(b₁+b₂), so area = m·h. Drag until b₁ = b₂ and it becomes a parallelogram (area = bh)." };
      }
    });
  } };

  // ---------- shared-angle area ratio ----------
  W["shared-angle-area-ratio"] = { mount: function (host) {
    var A = [90, 300];
    mountGeo(host, {
      title: "Shared angle",
      hint: "Drag the four points along the two rays.",
      w: 450, h: 360,
      init: { B: [370, 300], C: [250, 90], D: [250, 300], E: [190, 175] },
      drag: {
        B: { constrain: function (xy) { return [Math.max(A[0] + 90, Math.min(430, xy[0])), 300]; } },
        D: { constrain: function (xy) { return [Math.max(A[0] + 40, Math.min(430, xy[0])), 300]; } },
        C: { constrain: function (xy, p) { var d = norm(sub([250, 90], A)); var t = Math.max(120, Math.min(250, dot(sub(xy, A), d))); return add(A, mul(d, t)); } },
        E: { constrain: function (xy, p) { var d = norm(sub([250, 90], A)); var t = Math.max(50, Math.min(250, dot(sub(xy, A), d))); return add(A, mul(d, t)); } }
      },
      render: function (p) {
        var ray = norm(sub([250, 90], A));
        p.C = add(A, mul(ray, Math.max(120, Math.min(250, dot(sub(p.C, A), ray)))));
        p.E = add(A, mul(ray, Math.max(50, Math.min(250, dot(sub(p.E, A), ray)))));
        p.B = [p.B[0], 300]; p.D = [p.D[0], 300];
        var big = Math.abs(sarea([A, p.B, p.C])), small = Math.abs(sarea([A, p.D, p.E]));
        var ab = dist(A, p.B), ac = dist(A, p.C), ad = dist(A, p.D), ae = dist(A, p.E);
        var body = polyS([A, p.B, p.C], "gtri") + polyS([A, p.D, p.E], "gtri-fill") +
          seg(A, p.B, "gl-gold") + seg(A, p.C, "gl-grn") + seg(p.B, p.C, "gl") + seg(p.D, p.E, "gl-acc") +
          dotS(A, "gd", 4) + dotS(p.B, "gd-gold", 5) + dotS(p.C, "gd-grn", 5) + dotS(p.D, "gd-acc", 5) + dotS(p.E, "gd-acc", 5) +
          txt(add(A, [-18, 6]), "A") + lbl(p.B, A, "B", "gt-gold") + lbl(p.C, A, "C", "gt-grn") +
          txt(add(p.D, [-4, 22]), "D", "gt-acc") + txt(add(p.E, [-20, 0]), "E", "gt-acc");
        return { body: body, caption: "[ADE] / [ABC] = " + uA(small) + " / " + uA(big) + " = <b>" + fmt(small / (big || 1)) + "</b>, exactly (AD/AB)(AE/AC) = (" + uL(ad) + "/" + uL(ab) + ")(" + uL(ae) + "/" + uL(ac) + ") = <b>" + fmt((ad / (ab || 1)) * (ae / (ac || 1))) + "</b>. The shared angle A cancels out of ½·(side)(side)·sin A." };
      }
    });
  } };

})();
