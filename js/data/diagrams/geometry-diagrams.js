// Computed SVG diagrams for Geometry detail pages, keyed by formula id.
// Every point is constructed with exact geometry (intersections, feet,
// centers, tangencies), so the figures are true, not sketched.
(function () {
  const DIAGRAMS = window.MATH_DIAGRAMS = window.MATH_DIAGRAMS || {};

  // ---------- vector & geometry helpers (screen coords, y down) ----------
  const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
  const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
  const mul = (p, k) => [p[0] * k, p[1] * k];
  const lerp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  const mid = (p, q) => lerp(p, q, 0.5);
  const dist = (p, q) => Math.hypot(q[0] - p[0], q[1] - p[1]);
  const norm = p => { const d = Math.hypot(p[0], p[1]); return [p[0] / d, p[1] / d]; };
  const perp = p => [-p[1], p[0]];
  const away = (p, from, d) => add(p, mul(norm(sub(p, from)), d));
  const rad = deg => deg * Math.PI / 180;
  const onC = (c, r, deg) => [c[0] + r * Math.cos(rad(deg)), c[1] + r * Math.sin(rad(deg))];

  function lineInt(p1, p2, p3, p4) {
    const [x1, y1] = p1, [x2, y2] = p2, [x3, y3] = p3, [x4, y4] = p4;
    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    const a = x1 * y2 - y1 * x2, b = x3 * y4 - y3 * x4;
    return [(a * (x3 - x4) - (x1 - x2) * b) / den, (a * (y3 - y4) - (y1 - y2) * b) / den];
  }
  function foot(p, a, b) {
    const ab = sub(b, a);
    const t = ((p[0] - a[0]) * ab[0] + (p[1] - a[1]) * ab[1]) / (ab[0] * ab[0] + ab[1] * ab[1]);
    return lerp(a, b, t);
  }
  const centroidOf = (A, B, C) => mul(add(add(A, B), C), 1 / 3);
  function circumcenterOf(A, B, C) {
    const m1 = mid(A, B), m2 = mid(B, C);
    return lineInt(m1, add(m1, perp(sub(B, A))), m2, add(m2, perp(sub(C, B))));
  }
  const orthocenterOf = (A, B, C) => lineInt(A, foot(A, B, C), B, foot(B, A, C));
  function incenterOf(A, B, C) {
    const a = dist(B, C), b = dist(A, C), c = dist(A, B), s = a + b + c;
    return [(a * A[0] + b * B[0] + c * C[0]) / s, (a * A[1] + b * B[1] + c * C[1]) / s];
  }
  function circleLineInts(cen, r, p, q) {
    const d = sub(q, p), f = sub(p, cen);
    const a = d[0] * d[0] + d[1] * d[1], b = 2 * (f[0] * d[0] + f[1] * d[1]);
    const c = f[0] * f[0] + f[1] * f[1] - r * r;
    const disc = Math.sqrt(Math.max(0, b * b - 4 * a * c));
    return [lerp(p, q, (-b - disc) / (2 * a)), lerp(p, q, (-b + disc) / (2 * a))];
  }
  function tangentPoints(cen, r, p) {
    const d = dist(cen, p), phi = Math.acos(r / d) * 180 / Math.PI;
    const base = Math.atan2(p[1] - cen[1], p[0] - cen[0]) * 180 / Math.PI;
    return [onC(cen, r, base + phi), onC(cen, r, base - phi)];
  }
  const rotv = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
  function insideTri(p, a, b, c) {
    const s = (u, v, w) => (v[0] - u[0]) * (w[1] - u[1]) - (v[1] - u[1]) * (w[0] - u[0]);
    const d1 = s(a, b, p), d2 = s(b, c, p), d3 = s(c, a, p);
    return (d1 >= 0 && d2 >= 0 && d3 >= 0) || (d1 <= 0 && d2 <= 0 && d3 <= 0);
  }
  // External tangent segment between two circles (same-side touch points).
  function extTangent(c1, r1c, c2, r2c) {
    const u = norm(sub(c2, c1)), d = dist(c1, c2);
    const phi = Math.acos(Math.max(-1, Math.min(1, -(r2c - r1c) / d)));
    const n = rotv(u, phi);
    return [add(c1, mul(n, r1c)), add(c2, mul(n, r2c))];
  }

  // ---------- svg builders ----------
  const FNT = "var(--text-faint)", DIM = "var(--text-dim)", ACC = "var(--accent)",
        GLD = "var(--gold)", GRN = "var(--level-mc)",
        ACCS = "rgba(91,140,255,0.13)", GLDS = "rgba(245,196,81,0.13)";
  const r1 = x => Math.round(x * 10) / 10;
  const pf = p => `${r1(p[0])},${r1(p[1])}`;
  const seg = (p, q, c = DIM, w = 2, dash = "") =>
    `<line x1="${r1(p[0])}" y1="${r1(p[1])}" x2="${r1(q[0])}" y2="${r1(q[1])}" stroke="${c}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
  const dot = (p, c = DIM, r = 4) =>
    `<circle cx="${r1(p[0])}" cy="${r1(p[1])}" r="${r}" fill="${c}"/>`;
  const circ = (cen, r, c = FNT, w = 1.5, fill = "none", dash = "") =>
    `<circle cx="${r1(cen[0])}" cy="${r1(cen[1])}" r="${r1(r)}" fill="${fill}" stroke="${c}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
  const poly = (pts, c = DIM, w = 2, fill = "none") =>
    `<polygon points="${pts.map(pf).join(" ")}" fill="${fill}" stroke="${c}" stroke-width="${w}"/>`;
  const txt = (p, s, c = DIM, size = 13, anchor = "middle") =>
    `<text x="${r1(p[0])}" y="${r1(p[1])}" fill="${c}" font-size="${size}" text-anchor="${anchor}">${s}</text>`;
  function angleArc(P, Q, R, ra, c = ACC, double = false) {
    const a1 = Math.atan2(Q[1] - P[1], Q[0] - P[0]);
    let da = Math.atan2(R[1] - P[1], R[0] - P[0]) - a1;
    while (da > Math.PI) da -= 2 * Math.PI;
    while (da < -Math.PI) da += 2 * Math.PI;
    const arc = rr => {
      const p1 = [P[0] + rr * Math.cos(a1), P[1] + rr * Math.sin(a1)];
      const p2 = [P[0] + rr * Math.cos(a1 + da), P[1] + rr * Math.sin(a1 + da)];
      return `<path d="M ${pf(p1)} A ${rr} ${rr} 0 0 ${da > 0 ? 1 : 0} ${pf(p2)}" fill="none" stroke="${c}" stroke-width="1.8"/>`;
    };
    return arc(ra) + (double ? arc(ra + 5) : "");
  }
  function rightAngle(P, Q, R, size = 12, c = FNT) {
    const u = mul(norm(sub(Q, P)), size), v = mul(norm(sub(R, P)), size);
    return `<polyline points="${pf(add(P, u))} ${pf(add(add(P, u), v))} ${pf(add(P, v))}" fill="none" stroke="${c}" stroke-width="1.5"/>`;
  }
  const massBadge = (p, n) =>
    `<circle cx="${r1(p[0])}" cy="${r1(p[1])}" r="12" fill="var(--bg-card)" stroke="${GLD}" stroke-width="1.8"/>` +
    `<text x="${r1(p[0])}" y="${r1(p[1]) + 4.5}" fill="${GLD}" font-size="12.5" font-weight="600" text-anchor="middle">${n}</text>`;
  // Captions live OUTSIDE the SVG as wrapping HTML, so they can never collide
  // with the drawing or with surrounding page text. cap() emits a marked string
  // that wrap() extracts and appends after the closing </svg>.
  const CAPMARK = String.fromCharCode(1);
  const cap = (w, h, s) => CAPMARK + s;
  const wrap = (w, h, parts) => {
    let caption = "";
    const body = parts.filter(p => {
      if (typeof p === "string" && p.charCodeAt(0) === 1) { caption = p.slice(1); return false; }
      return true;
    });
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${body.join("")}</svg>` +
           (caption ? `<div class="diagram-cap">${caption}</div>` : "");
  };

  // Standard scalene acute triangle used by most figures.
  const A = [180, 48], B = [58, 272], C = [368, 272];
  const CEN = centroidOf(A, B, C);
  const vlab = (p, s, c = DIM) => txt(add(away(p, CEN, 16), [0, 4.5]), s, c, 13.5);
  const triangle = (c = DIM, w = 2) => poly([A, B, C], c, w);
  const ABC = () => triangle() + vlab(A, "A") + vlab(B, "B") + vlab(C, "C");

  // ---------- Fundamentals ----------

  DIAGRAMS["pythagorean-theorem"] = [(() => {
    const P = [90, 260], Q = [340, 260], R = [90, 95];
    return wrap(420, 300, [
      poly([P, Q, R], DIM, 2, ACCS), rightAngle(P, Q, R),
      txt([215, 282], "a"), txt([72, 180], "b"), txt([232, 168], "c", ACC, 14)
    ]);
  })()];

  DIAGRAMS["special-right-triangles"] = [(() => {
    const a1 = [55, 250], b1 = [185, 250], c1 = [185, 120];
    const a2 = [245, 250], b2 = [395, 250], c2 = [395, 163.4];
    return wrap(430, 290, [
      poly([a1, b1, c1], DIM, 2), rightAngle(b1, a1, c1),
      angleArc(a1, b1, c1, 22, GLD), txt([92, 243], "45°", GLD, 11.5),
      txt([120, 270], "1"), txt([200, 190], "1"), txt([105, 175], "√2", ACC, 13.5),
      poly([a2, b2, c2], DIM, 2), rightAngle(b2, a2, c2),
      angleArc(a2, b2, c2, 26, GLD), txt([290, 243], "30°", GLD, 11.5),
      txt([320, 270], "√3"), txt([410, 212], "1"), txt([305, 190], "2", ACC, 13.5)
    ]);
  })()];

  DIAGRAMS["altitude-hypotenuse"] = [(() => {
    const b = [60, 250], c = [340, 250], cen = mid(b, c), r = 140;
    const a = onC(cen, r, -115), h = foot(a, b, c);
    return wrap(420, 300, [
      poly([a, b, c], DIM, 2), seg(a, h, ACC, 2, "5 4"),
      rightAngle(a, b, c, 12), rightAngle(h, c, a, 10, ACC),
      dot(h, ACC, 3.5),
      txt(add(mid(b, h), [0, 18]), "p", GLD), txt(add(mid(h, c), [0, 18]), "q", GLD),
      txt(add(mid(a, h), [12, 0]), "h", ACC),
      cap(420, 300, "h² = pq,  a² = pc,  b² = qc")
    ]);
  })()];

  DIAGRAMS["polygon-angle-sums"] = [(() => {
    const cen = [210, 165], v = [0, 1, 2, 3, 4].map(i => onC(cen, 120, -90 + 72 * i));
    return wrap(420, 320, [
      poly(v, DIM, 2), seg(v[0], v[2], ACC, 1.8, "6 4"), seg(v[0], v[3], ACC, 1.8, "6 4"),
      txt(centroidOf(v[0], v[1], v[2]), "1", ACC, 13), txt(centroidOf(v[0], v[2], v[3]), "2", ACC, 13), txt(centroidOf(v[0], v[3], v[4]), "3", ACC, 13),
      cap(420, 320, "n = 5: diagonals from one vertex cut it into n − 2 = 3 triangles → interior sum 3 · 180° = 540°")
    ]);
  })()];

  DIAGRAMS["similar-figures-ratios"] = [(() => {
    const P = lerp(A, B, 0.55), Q = lerp(A, C, 0.55);
    return wrap(430, 320, [
      poly([A, P, Q], "none", 0, ACCS), ABC(), seg(P, Q, ACC, 2.5),
      txt(add(mid(P, Q), [0, -8]), "k · BC", ACC, 12.5),
      txt(centroidOf(A, P, Q), "A₁", ACC, 12.5), txt([mid(B, C)[0], mid(B, C)[1] - 28], "A₂ = k²A₁", DIM, 12),
      cap(430, 320, "lengths ×k  ⇒  areas ×k² (and volumes ×k³)")
    ]);
  })()];

  DIAGRAMS["midsegment-theorem"] = [(() => {
    const M = mid(A, B), N = mid(A, C);
    return wrap(430, 320, [
      ABC(), seg(M, N, ACC, 2.5), dot(M, ACC), dot(N, ACC),
      txt(add(M, [-16, 0]), "M", ACC), txt(add(N, [16, 0]), "N", ACC),
      txt(add(mid(M, N), [0, -8]), "½ BC", ACC, 12.5),
      cap(430, 320, "MN ∥ BC")
    ]);
  })()];

  DIAGRAMS["centroid-division"] = [(() => {
    const Ma = mid(B, C), Mb = mid(C, A), Mc = mid(A, B), G = centroidOf(A, B, C);
    return wrap(430, 320, [
      ABC(), seg(A, Ma, ACC, 1.8), seg(B, Mb, ACC, 1.8), seg(C, Mc, ACC, 1.8),
      dot(G, GLD, 5), txt(add(G, [14, -6]), "G", GLD),
      dot(Ma, ACC, 3.5), txt(add(Ma, [0, 17]), "M", ACC, 12),
      txt(add(lerp(A, G, 0.5), [12, 0]), "2", GLD, 12.5),
      txt(add(lerp(G, Ma, 0.5), [12, 0]), "1", GLD, 12.5),
      cap(430, 320, "medians meet at G, which splits each one 2 : 1 (AG : GM = 2 : 1)")
    ]);
  })()];

  DIAGRAMS["cevian-area-ratio"] = [(() => {
    const D = lerp(B, C, 0.6);
    return wrap(430, 320, [
      poly([A, B, D], "none", 0, ACCS), poly([A, D, C], "none", 0, GLDS),
      ABC(), seg(A, D, DIM, 2), dot(D, DIM, 3.5), txt(add(D, [0, 20]), "D"),
      txt(add(mid(B, D), [0, 18]), "m", ACC), txt(add(mid(D, C), [0, 18]), "n", GLD),
      cap(430, 320, "[ABD] : [ACD] = m : n")
    ]);
  })()];

  DIAGRAMS["trapezoid-parallelogram-areas"] = [(() => {
    const p = [210, 60], q = [340, 165], r = [210, 270], s = [80, 165];
    return wrap(420, 310, [
      poly([p, q, r, s], DIM, 2, ACCS),
      seg(p, r, GLD, 1.8, "5 4"), seg(q, s, GLD, 1.8, "5 4"),
      rightAngle([210, 165], p, q, 11, GLD),
      txt([222, 120], "d₁", GLD), txt([280, 155], "d₂", GLD),
      cap(420, 310, "perpendicular diagonals ⇒ A = ½ d₁d₂")
    ]);
  })(), (() => {
    const a1 = [130, 80], a2 = [300, 80], b1 = [70, 240], b2 = [360, 240];
    const F = [a1[0], 240];
    return wrap(430, 300, [
      poly([a1, a2, b2, b1], DIM, 2, ACCS),
      seg(a1, F, GLD, 1.8, "5 4"), rightAngle(F, a1, b2, 10, GLD),
      txt(add(mid(a1, a2), [0, -10]), "b₁", DIM, 12.5), txt(add(mid(b1, b2), [0, 18]), "b₂", DIM, 12.5),
      txt(add(mid(a1, F), [-12, 0]), "h", GLD, 12.5),
      cap(430, 300, "trapezoid: A = ½(b₁ + b₂)h — average the parallel sides, times the height")
    ]);
  })()];

  DIAGRAMS["quadrilateral-diagonal-area"] = [(() => {
    const p = [80, 95], q = [335, 65], r = [305, 275], s = [105, 245];
    const X = lineInt(p, r, q, s);
    return wrap(420, 310, [
      poly([p, q, r, s], DIM, 2), seg(p, r, ACC, 2), seg(q, s, GLD, 2),
      angleArc(X, r, s, 20, GRN), txt(add(X, [-6, 30]), "θ", GRN),
      txt(add(lerp(p, r, 0.25), [12, 0]), "d₁", ACC), txt(add(lerp(q, s, 0.22), [16, 0]), "d₂", GLD),
      cap(420, 310, "A = ½ d₁ d₂ sin θ")
    ]);
  })()];

  DIAGRAMS["regular-polygon-area"] = [(() => {
    const cen = [210, 158], v = [0, 1, 2, 3, 4, 5].map(i => onC(cen, 115, 30 + 60 * i));
    const ap = foot(cen, v[1], v[2]);
    return wrap(420, 320, [
      poly(v, DIM, 2), dot(cen, DIM, 3), seg(cen, ap, ACC, 2, "5 4"),
      rightAngle(ap, cen, v[1], 10, ACC),
      txt(add(mid(cen, ap), [12, 0]), "a", ACC), txt(add(mid(v[1], v[2]), [0, 18]), "s", GLD),
      cap(420, 320, "A = ½ · a · (perimeter)")
    ]);
  })()];

  DIAGRAMS["clock-angle"] = [(() => {
    const cen = [210, 160], R = 120;
    const ticks = [];
    for (let i = 0; i < 12; i++) ticks.push(seg(onC(cen, R - 8, 30 * i), onC(cen, R, 30 * i), FNT, 2));
    const hour = onC(cen, 70, 130), minute = onC(cen, 100, 30);
    return wrap(420, 320, [
      circ(cen, R, FNT, 1.5), ...ticks,
      seg(cen, hour, GLD, 4), seg(cen, minute, ACC, 3), dot(cen, DIM, 4),
      txt(onC(cen, R + 16, -90), "12", FNT, 11.5), txt(onC(cen, R + 16, 90), "6", FNT, 11.5),
      txt(add(hour, [-14, 8]), "hour", GLD, 11), txt(add(minute, [4, -10]), "minute", ACC, 11),
      angleArc(cen, minute, hour, 34, GRN), txt(onC(cen, 52, 80), "100°", GRN, 12.5),
      cap(420, 320, "7:20 — hour hand at 30·7 + 0.5·20 = 220°, minute at 6·20 = 120°: angle |30H − 5.5M| = 100°")
    ]);
  })()];

  // ---------- Areas & radii ----------

  DIAGRAMS["trig-area"] = [(() => wrap(430, 320, [
    ABC(), seg(C, B, ACC, 2.5), seg(C, A, ACC, 2.5),
    angleArc(C, B, A, 26, GLD), txt(add(C, [-34, -12]), "C", GLD),
    txt(add(mid(B, C), [0, 20]), "a", ACC), txt(add(mid(C, A), [16, 0]), "b", ACC),
    cap(430, 320, "A = ½ a b sin C")
  ]))()];

  DIAGRAMS["inradius-area"] = [(() => {
    const I = incenterOf(A, B, C), f = foot(I, B, C);
    return wrap(430, 320, [
      ABC(), circ(I, dist(I, f), ACC, 1.8), dot(I, ACC, 3.5),
      seg(I, f, ACC, 2, "4 3"), txt(add(mid(I, f), [10, 0]), "r", ACC),
      txt(add(I, [0, -12]), "I", ACC),
      cap(430, 320, "A = r · s")
    ]);
  })()];

  DIAGRAMS["circumradius-area"] = [(() => {
    const O = circumcenterOf(A, B, C), R = dist(O, A);
    return wrap(430, 395, [
      circ(O, R, FNT, 1.5), ABC(), dot(O, GLD, 4), txt(add(O, [0, 20]), "O", GLD),
      seg(O, A, GLD, 2, "5 4"), txt(add(mid(O, A), [12, 0]), "R", GLD),
      txt(add(mid(B, C), [0, 18]), "a", ACC), txt(add(mid(C, A), [16, -4]), "b", ACC), txt(add(mid(A, B), [-16, -4]), "c", ACC),
      cap(430, 395, "A = abc / 4R")
    ]);
  })()];

  DIAGRAMS["right-triangle-inradius"] = [(() => {
    const P = [80, 260], Q = [330, 260], R = [80, 90];
    const I = incenterOf(P, Q, R), r = dist(I, foot(I, P, Q));
    return wrap(420, 310, [
      poly([P, Q, R], DIM, 2), rightAngle(P, Q, R),
      circ(I, r, ACC, 1.8), dot(I, ACC, 3),
      poly([P, [P[0] + r, P[1]], [P[0] + r, P[1] - r], [P[0], P[1] - r]], GLD, 1.3, "none"),
      txt([P[0] + r / 2, P[1] - r - 6], "r", GLD),
      txt([205, 282], "a"), txt([62, 180], "b"), txt([225, 162], "c"),
      cap(420, 310, "r = (a + b − c) / 2 — the corner square")
    ]);
  })()];

  DIAGRAMS["incircle-tangent-lengths"] = [(() => {
    const I = incenterOf(A, B, C);
    const fa = foot(I, B, C), fb = foot(I, C, A), fc = foot(I, A, B);
    return wrap(430, 330, [
      ABC(), circ(I, dist(I, fa), FNT, 1.5),
      seg(A, fc, ACC, 3), seg(A, fb, ACC, 3),
      seg(B, fc, GLD, 3), seg(B, fa, GLD, 3),
      seg(C, fa, GRN, 3), seg(C, fb, GRN, 3),
      dot(fa, DIM, 3.5), dot(fb, DIM, 3.5), dot(fc, DIM, 3.5),
      txt(add(fa, [0, 16]), "D", DIM, 11.5), txt(add(fb, [14, -4]), "E", DIM, 11.5), txt(add(fc, [-14, -4]), "F", DIM, 11.5),
      txt(add(mid(A, fc), [-18, 0]), "s−a", ACC, 12),
      txt(add(mid(B, fa), [0, 18]), "s−b", GLD, 12),
      txt(add(mid(C, fb), [20, 0]), "s−c", GRN, 12)
    ]);
  })()];

  // ---------- Advanced triangle theorems ----------

  DIAGRAMS["law-of-sines"] = [(() => {
    const O = circumcenterOf(A, B, C), R = dist(O, A);
    return wrap(430, 395, [
      circ(O, R, FNT, 1.5), ABC(), dot(O, GLD, 4),
      seg(O, A, GLD, 1.8, "5 4"), txt(add(mid(O, A), [13, 0]), "R", GLD),
      seg(B, C, ACC, 2.5), txt(add(mid(B, C), [0, 20]), "a", ACC),
      angleArc(A, B, C, 26, ACC), txt(add(A, [0, 34]), "A", ACC),
      cap(430, 395, "a / sin A = 2R")
    ]);
  })()];

  DIAGRAMS["law-of-cosines"] = [(() => wrap(430, 320, [
    ABC(), angleArc(C, B, A, 26, GLD), txt(add(C, [-34, -12]), "C", GLD),
    txt(add(mid(B, C), [0, 20]), "a"), txt(add(mid(C, A), [16, -2]), "b"),
    txt(add(mid(A, B), [-14, -4]), "c", ACC, 14),
    cap(430, 320, "c² = a² + b² − 2ab cos C")
  ]))()];

  DIAGRAMS["angle-bisector-theorem"] = [(() => {
    const c = dist(A, B), b = dist(A, C), D = lerp(B, C, c / (b + c));
    return wrap(430, 330, [
      ABC(), seg(A, D, ACC, 2), dot(D, ACC, 3.5), txt(add(D, [0, 20]), "D", ACC),
      angleArc(A, B, D, 24, GLD, true), angleArc(A, D, C, 24, GLD, true),
      txt(add(mid(B, D), [0, 18]), "BD", GLD, 11.5), txt(add(mid(D, C), [0, 18]), "DC", GLD, 11.5),
      cap(430, 330, "AB / AC = BD / DC")
    ]);
  })()];

  DIAGRAMS["angle-bisector-length"] = [(() => {
    const c = dist(A, B), b = dist(A, C), D = lerp(B, C, c / (b + c));
    return wrap(430, 330, [
      ABC(), seg(A, D, ACC, 2.5), dot(D, ACC, 3.5),
      angleArc(A, B, D, 24, GLD, true), angleArc(A, D, C, 24, GLD, true),
      txt(add(mid(A, D), [14, 0]), "d", ACC, 14),
      txt(add(mid(B, D), [0, 18]), "m", DIM, 12), txt(add(mid(D, C), [0, 18]), "n", DIM, 12),
      cap(430, 330, "d² = ab − mn")
    ]);
  })()];

  DIAGRAMS["stewarts-theorem"] = [(() => {
    const D = lerp(B, C, 0.58);
    return wrap(430, 330, [
      ABC(), seg(A, D, ACC, 2), dot(D, ACC, 3.5),
      txt(add(mid(A, D), [13, 0]), "d", ACC, 14),
      txt(add(mid(B, D), [0, 18]), "m", GLD), txt(add(mid(D, C), [0, 18]), "n", GLD),
      txt(add(mid(A, B), [-14, -4]), "c"), txt(add(mid(A, C), [16, -2]), "b"),
      cap(430, 330, "a(d² + mn) = b²m + c²n")
    ]);
  })()];

  DIAGRAMS["cevas-theorem"] = [(() => {
    const P = add(add(mul(A, 0.25), mul(B, 0.40)), mul(C, 0.35));
    const D = lineInt(A, P, B, C), E = lineInt(B, P, C, A), F = lineInt(C, P, A, B);
    return wrap(430, 330, [
      ABC(), seg(A, D, ACC, 1.8), seg(B, E, ACC, 1.8), seg(C, F, ACC, 1.8),
      dot(P, GLD, 4.5), dot(D, DIM, 3.2), dot(E, DIM, 3.2), dot(F, DIM, 3.2),
      txt(add(D, [0, 20]), "D"), txt(add(E, [16, 0]), "E"), txt(add(F, [-16, 0]), "F"),
      cap(430, 330, "concurrent ⟺ (AF/FB)(BD/DC)(CE/EA) = 1")
    ]);
  })()];

  DIAGRAMS["menelaus-theorem"] = [(() => {
    const F = lerp(A, B, 0.25), E = lerp(C, A, 0.35);
    const D = lineInt(F, E, B, C);
    return wrap(480, 330, [
      ABC(), seg(C, D, FNT, 1.5, "5 4"),
      seg(lerp(F, D, -0.1), lerp(F, D, 1.08), GLD, 2),
      dot(D, ACC, 3.8), dot(E, ACC, 3.8), dot(F, ACC, 3.8),
      txt(add(D, [4, 20]), "D", ACC), txt(add(E, [18, -4]), "E", ACC), txt(add(F, [-16, -2]), "F", ACC),
      cap(480, 330, "one transversal cuts sides AB, CA — and BC extended beyond C")
    ]);
  })()];

  DIAGRAMS["apollonius-theorem"] = [(() => {
    const M = mid(B, C);
    const t1 = mid(B, M), t2 = mid(M, C), d = mul(norm(sub(C, B)), 1);
    const tick = p => seg(add(p, mul(perp(d), 6)), add(p, mul(perp(d), -6)), GLD, 2);
    return wrap(430, 330, [
      ABC(), seg(A, M, ACC, 2), dot(M, ACC, 3.5), txt(add(M, [0, 20]), "M"),
      seg(B, mid(C, A), FNT, 1.4, "5 4"), seg(C, mid(A, B), FNT, 1.4, "5 4"),
      tick(t1), tick(t2),
      txt(add(mid(A, M), [16, 0]), "mₐ", ACC),
      txt(add(lerp(B, mid(C, A), 0.42), [0, -8]), "m_b", FNT, 11), txt(add(lerp(C, mid(A, B), 0.42), [4, 14]), "m_c", FNT, 11),
      cap(430, 330, "b² + c² = 2(mₐ² + (a/2)²); summing all three: mₐ² + m_b² + m_c² = ¾(a² + b² + c²)")
    ]);
  })()];

  DIAGRAMS["median-triangle-area"] = [(() => {
    const Ma = mid(B, C), Mb = mid(C, A), Mc = mid(A, B);
    return wrap(430, 330, [
      ABC(), seg(A, Ma, ACC, 1.8), seg(B, Mb, GLD, 1.8), seg(C, Mc, GRN, 1.8),
      txt(add(lerp(A, Ma, 0.35), [14, 0]), "mₐ", ACC, 11.5), txt(add(lerp(B, Mb, 0.4), [0, -8]), "m_b", GLD, 11.5), txt(add(lerp(C, Mc, 0.4), [4, 14]), "m_c", GRN, 11.5),
      cap(430, 330, "the medians mₐ, m_b, m_c close into a triangle of area ¾ [ABC]")
    ]);
  })()];

  DIAGRAMS["rouths-theorem"] = [(() => {
    const D = lerp(B, C, 2 / 3), E = lerp(C, A, 2 / 3), F = lerp(A, B, 2 / 3);
    const X = lineInt(A, D, B, E), Y = lineInt(B, E, C, F), Z = lineInt(C, F, A, D);
    return wrap(430, 330, [
      ABC(), seg(A, D, FNT, 1.6), seg(B, E, FNT, 1.6), seg(C, F, FNT, 1.6),
      poly([X, Y, Z], GLD, 1.8, GLDS),
      txt(add(D, [8, 16]), "x = 2", ACC, 11), txt(add(E, [18, -2]), "y = 2", ACC, 11), txt(add(F, [-20, -4]), "z = 2", ACC, 11),
      cap(430, 330, "cevians split each side in ratio x = y = z = 2 → inner triangle = 1/7 of [ABC]")
    ]);
  })()];

  DIAGRAMS["vivianis-theorem"] = [(() => {
    const a = [200, 37.5], b = [60, 280], c = [340, 280], P = [228, 198];
    const f1 = foot(P, b, c), f2 = foot(P, c, a), f3 = foot(P, a, b);
    return wrap(420, 320, [
      poly([a, b, c], DIM, 2), dot(P, GLD, 4.5), txt(add(P, [0, -12]), "P", GLD),
      seg(P, f1, ACC, 1.8, "4 3"), seg(P, f2, ACC, 1.8, "4 3"), seg(P, f3, ACC, 1.8, "4 3"),
      txt(add(mid(P, f1), [10, 0]), "d₁", ACC, 12), txt(add(mid(P, f2), [4, -8]), "d₂", ACC, 12),
      txt(add(mid(P, f3), [4, -8]), "d₃", ACC, 12),
      cap(420, 320, "d₁ + d₂ + d₃ = h, wherever P is")
    ]);
  })()];

  // ---------- Triangle centers ----------

  DIAGRAMS["euler-line-ratio"] = [(() => {
    const O = circumcenterOf(A, B, C), G = centroidOf(A, B, C), H = orthocenterOf(A, B, C);
    return wrap(430, 330, [
      ABC(), seg(lerp(O, H, -0.25), lerp(O, H, 1.25), FNT, 1.6, "6 4"),
      dot(O, GLD, 4.5), dot(G, ACC, 4.5), dot(H, GRN, 4.5),
      txt(add(O, [0, 22]), "O", GLD), txt(add(G, [4, -12]), "G", ACC), txt(add(H, [-2, -12]), "H", GRN),
      cap(430, 330, "H, G, O collinear with HG = 2·GO")
    ]);
  })()];

  DIAGRAMS["euler-distance-theorem"] = [(() => {
    const O = circumcenterOf(A, B, C), I = incenterOf(A, B, C);
    const R = dist(O, A), r = dist(I, foot(I, B, C));
    return wrap(430, 395, [
      circ(O, R, FNT, 1.4), circ(I, r, ACC, 1.6), ABC(),
      dot(O, GLD, 4), dot(I, ACC, 4),
      txt(add(O, [4, 22]), "O", GLD), txt(add(I, [-14, -6]), "I", ACC),
      seg(I, foot(I, B, C), ACC, 1.5, "4 3"), txt(add(mid(I, foot(I, B, C)), [10, 0]), "r", ACC, 12),
      seg(O, A, GLD, 1.5, "5 4"), txt(add(mid(O, A), [12, 0]), "R", GLD, 12),
      seg(O, I, GRN, 2), txt(add(mid(O, I), [8, -8]), "d", GRN),
      cap(430, 395, "d² = R(R − 2r)")
    ]);
  })()];

  DIAGRAMS["nine-point-circle"] = [(() => {
    const O = circumcenterOf(A, B, C), H = orthocenterOf(A, B, C), N = mid(O, H);
    const R9 = dist(O, A) / 2;
    const mids = [mid(A, B), mid(B, C), mid(C, A)];
    const feet = [foot(A, B, C), foot(B, C, A), foot(C, A, B)];
    return wrap(430, 330, [
      ABC(), circ(N, R9, ACC, 1.8), dot(N, ACC, 3.5),
      ...mids.map(p => dot(p, GLD, 4)), ...feet.map(p => dot(p, GRN, 4)),
      txt(add(N, [0, -10]), "N", ACC),
      seg(N, mids[0], ACC, 1.5, "4 3"), txt(add(mid(N, mids[0]), [16, 0]), "R/2", ACC, 11.5),
      cap(430, 330, "midpoints (gold) and altitude feet (green) share one circle of radius R/2")
    ]);
  })()];

  DIAGRAMS["carnots-theorem"] = [(() => {
    const O = circumcenterOf(A, B, C);
    const f1 = foot(O, B, C), f2 = foot(O, C, A), f3 = foot(O, A, B);
    return wrap(430, 330, [
      ABC(), dot(O, GLD, 4.5), txt(add(O, [0, -10]), "O", GLD),
      seg(O, f1, ACC, 2, "4 3"), seg(O, f2, ACC, 2, "4 3"), seg(O, f3, ACC, 2, "4 3"),
      txt(add(mid(O, f1), [12, 0]), "d₁", ACC, 12), txt(add(mid(O, f2), [10, -6]), "d₂", ACC, 12),
      txt(add(mid(O, f3), [-12, -4]), "d₃", ACC, 12),
      cap(430, 330, "d₁ + d₂ + d₃ = R + r")
    ]);
  })()];

  DIAGRAMS["simson-line"] = [(() => {
    const O = circumcenterOf(A, B, C), R = dist(O, A);
    const P = onC(O, R, 40);
    const f1 = foot(P, B, C), f2 = foot(P, C, A), f3 = foot(P, A, B);
    const extend = (U, V, f) => {
      const uv = sub(V, U), t = ((f[0] - U[0]) * uv[0] + (f[1] - U[1]) * uv[1]) / (uv[0] ** 2 + uv[1] ** 2);
      if (t < 0) return seg(U, f, FNT, 1.3, "4 4");
      if (t > 1) return seg(V, f, FNT, 1.3, "4 4");
      return "";
    };
    return wrap(440, 395, [
      circ(O, R, FNT, 1.4), ABC(),
      extend(B, C, f1), extend(C, A, f2), extend(A, B, f3),
      seg(P, f1, FNT, 1.3, "3 3"), seg(P, f2, FNT, 1.3, "3 3"), seg(P, f3, FNT, 1.3, "3 3"),
      seg(lerp(f3, f1, -0.15), lerp(f3, f1, 1.2), ACC, 2),
      dot(P, GLD, 5), txt(add(P, [14, 4]), "P", GLD),
      dot(f1, ACC, 4), dot(f2, ACC, 4), dot(f3, ACC, 4),
      cap(440, 395, "the three feet of perpendiculars from P are collinear")
    ]);
  })()];

  // ---------- Circles ----------

  DIAGRAMS["circle-basics"] = [(() => {
    const cen = [200, 170], R = 120, a1 = -25, a2 = 65;
    const p1 = onC(cen, R, a1), p2 = onC(cen, R, a2);
    return wrap(420, 320, [
      circ(cen, R, FNT, 1.5),
      `<path d="M ${pf(cen)} L ${pf(p1)} A ${R} ${R} 0 0 1 ${pf(p2)} Z" fill="${ACCS}" stroke="none"/>`,
      seg(cen, p1, DIM, 2), seg(cen, p2, DIM, 2),
      `<path d="M ${pf(p1)} A ${R} ${R} 0 0 1 ${pf(p2)}" fill="none" stroke="${GLD}" stroke-width="3.5"/>`,
      angleArc(cen, p1, p2, 30, GRN), txt(onC(cen, 46, 20), "θ", GRN),
      txt(add(mid(cen, p1), [0, 18]), "r"), txt(onC(cen, R + 16, 20), "s = rθ", GLD, 12.5),
      cap(420, 320, "sector = ½ r²θ")
    ]);
  })()];

  DIAGRAMS["power-of-a-point"] = [(() => {
    const cen = [160, 165], R = 92, P = [392, 240];
    const T = tangentPoints(cen, R, P)[1];
    const [Aa, Bb] = circleLineInts(cen, R, P, [140, 205]);
    return wrap(430, 330, [
      circ(cen, R, FNT, 1.5), dot(P, DIM, 4), txt(add(P, [12, 4]), "P"),
      seg(P, T, GLD, 2), dot(T, GLD, 4), txt(add(T, [4, -12]), "T", GLD),
      seg(cen, T, FNT, 1.3, "4 3"), rightAngle(T, cen, P, 10, GLD),
      seg(P, Bb, ACC, 2), dot(Aa, ACC, 4), dot(Bb, ACC, 4),
      txt(add(Bb, [-2, -12]), "A", ACC), txt(add(Aa, [-14, 8]), "B", ACC),
      seg(P, circleLineInts(cen, R, P, [150, 115])[0], GRN, 1.8),
      dot(circleLineInts(cen, R, P, [150, 115])[0], GRN, 4), dot(circleLineInts(cen, R, P, [150, 115])[1], GRN, 4),
      txt(add(circleLineInts(cen, R, P, [150, 115])[1], [0, -11]), "C", GRN), txt(add(circleLineInts(cen, R, P, [150, 115])[0], [-14, -4]), "D", GRN),
      cap(430, 330, "every line through P balances: PA · PB = PC · PD = PT²")
    ]);
  })(), (() => {
    // P inside the circle: intersecting chords.
    const cen = [215, 165], R = 120, P = [245, 130];
    const [Aa, Bb] = circleLineInts(cen, R, P, add(P, [1, 0.55]));
    const [Cc, Dd] = circleLineInts(cen, R, P, add(P, [-0.35, 1]));
    return wrap(430, 330, [
      circ(cen, R, FNT, 1.5),
      seg(Aa, Bb, ACC, 2), seg(Cc, Dd, GRN, 2),
      dot(P, "var(--text)", 4.5), txt(add(P, [12, -6]), "P", "var(--text)"),
      dot(Aa, ACC, 4), dot(Bb, ACC, 4), dot(Cc, GRN, 4), dot(Dd, GRN, 4),
      txt(away(Aa, cen, 14), "A", ACC, 12), txt(away(Bb, cen, 14), "B", ACC, 12),
      txt(away(Cc, cen, 14), "C", GRN, 12), txt(away(Dd, cen, 14), "D", GRN, 12),
      cap(430, 330, "P inside: the two chord pieces still balance, PA · PB = PC · PD (intersecting chords)")
    ]);
  })()];

  DIAGRAMS["chord-length"] = [(() => {
    const cen = [210, 155], R = 120, y = 215;
    const half = Math.sqrt(R * R - (y - cen[1]) ** 2);
    const p = [cen[0] - half, y], q = [cen[0] + half, y], m = [cen[0], y];
    return wrap(420, 310, [
      circ(cen, R, FNT, 1.5), seg(p, q, ACC, 2.5), dot(cen, DIM, 3.5),
      seg(cen, m, GLD, 2, "4 3"), rightAngle(m, cen, q, 10, GLD),
      seg(cen, q, DIM, 1.8), txt(add(mid(cen, q), [4, -8]), "R"),
      txt(add(mid(cen, m), [12, 0]), "d", GLD),
      cap(420, 310, "chord = 2√(R² − d²)")
    ]);
  })(), (() => {
    // Regular n-gon diagonals are just chords: dₖ = 2R sin(kπ/n).
    const cen = [210, 165], R = 118, n = 8;
    const V = [];
    for (let i = 0; i < n; i++) V.push(onC(cen, R, -90 + 360 * i / n));
    return wrap(420, 330, [
      circ(cen, R, FNT, 1.2, "none", "4 4"), poly(V, DIM, 1.8),
      dot(cen, DIM, 3), seg(cen, V[0], GLD, 1.6, "4 3"), txt(add(mid(cen, V[0]), [12, 0]), "R", GLD, 12),
      seg(V[0], V[2], ACC, 2.2), txt(add(mid(V[0], V[2]), [18, -4]), "d₂", ACC, 12.5),
      seg(V[0], V[3], GRN, 2), txt(add(mid(V[0], V[3]), [-14, -4]), "d₃", GRN, 12.5),
      ...V.map(p => dot(p, DIM, 3)),
      cap(420, 330, "a regular n-gon's diagonals are chords of its circumcircle: dₖ = 2R sin(kπ/n) — here n = 8, so d₂ = R√2 and d₃ = 2R sin(67.5°)")
    ]);
  })()];

  DIAGRAMS["angle-chord-secant"] = [(() => {
    const cen = [210, 165], R = 122;
    const Aa = onC(cen, R, -140), Cc = onC(cen, R, 20), Bb = onC(cen, R, -40), Dd = onC(cen, R, 160);
    const E = lineInt(Aa, Cc, Bb, Dd);
    const arc = (a1, a2, c) => {
      const p1 = onC(cen, R, a1), p2 = onC(cen, R, a2);
      return `<path d="M ${pf(p1)} A ${R} ${R} 0 0 1 ${pf(p2)}" fill="none" stroke="${c}" stroke-width="4"/>`;
    };
    return wrap(430, 330, [
      circ(cen, R, FNT, 1.5), seg(Aa, Cc, DIM, 1.8), seg(Bb, Dd, DIM, 1.8),
      arc(-140, -40, ACC), arc(20, 160, GLD),
      dot(E, GRN, 4), angleArc(E, Cc, Dd, 20, GRN),
      txt(add(E, [22, 18]), "θ", GRN),
      txt(away(Aa, cen, 15), "A", DIM, 12), txt(away(Bb, cen, 15), "B", DIM, 12),
      txt(away(Cc, cen, 15), "C", DIM, 12), txt(away(Dd, cen, 15), "D", DIM, 12),
      txt(onC(cen, R + 17, -90), "x", ACC, 13), txt(onC(cen, R + 17, 90), "y", GLD, 13),
      cap(430, 330, "chords AC, BD meet at θ = ½(x + y), the average of the two intercepted arcs")
    ]);
  })()];

  DIAGRAMS["tangent-facts"] = [(() => {
    const cen = [150, 170], R = 78, P = [385, 170];
    const [T1, T2] = tangentPoints(cen, R, P);
    return wrap(430, 340, [
      circ(cen, R, FNT, 1.5), dot(cen, DIM, 3.5), txt(add(cen, [-14, 4]), "O"),
      dot(P, DIM, 4), txt(add(P, [12, 4]), "P"),
      seg(P, T1, ACC, 2), seg(P, T2, ACC, 2), dot(T1, ACC, 4), dot(T2, ACC, 4),
      txt(add(T1, [4, -10]), "A", ACC, 12.5), txt(add(T2, [4, 18]), "B", ACC, 12.5),
      seg(cen, T1, GLD, 1.6, "4 3"), seg(cen, T2, GLD, 1.6, "4 3"),
      rightAngle(T1, cen, P, 10, GLD), rightAngle(T2, cen, P, 10, GLD),
      cap(430, 340, "OT ⊥ tangent, and PA = PB")
    ]);
  })()];

  DIAGRAMS["common-tangent-lengths"] = [(() => {
    const c1 = [135, 205], r1c = 55, c2 = [315, 165], r2c = 85;
    const u = norm(sub(c2, c1)), d = dist(c1, c2);
    const phi = Math.acos(-(r2c - r1c) / d);
    const rot = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
    let n = rot(u, phi);
    if (n[1] > 0) n = rot(u, -phi);
    const T1 = add(c1, mul(n, r1c)), T2 = add(c2, mul(n, r2c));
    return wrap(430, 330, [
      circ(c1, r1c, FNT, 1.5), circ(c2, r2c, FNT, 1.5),
      dot(c1, DIM, 3), dot(c2, DIM, 3), seg(c1, c2, FNT, 1.4, "5 4"),
      txt(add(mid(c1, c2), [0, 16]), "d"),
      seg(T1, T2, ACC, 2.2), dot(T1, ACC, 3.5), dot(T2, ACC, 3.5),
      seg(c1, T1, GLD, 1.6), seg(c2, T2, GLD, 1.6),
      txt(add(mid(c1, T1), [-12, 0]), "r₁", GLD, 12), txt(add(mid(c2, T2), [14, 0]), "r₂", GLD, 12),
      txt(add(mid(T1, T2), [0, -10]), "t", ACC),
      cap(430, 330, "t² = d² − (r₂ − r₁)²  (external tangent)")
    ]);
  })(), (() => {
    // Internal tangent: crosses between the circles, so the radii add.
    const c1 = [110, 170], r1c = 45, c2 = [330, 170], r2c = 60;
    const u = norm(sub(c2, c1)), d = dist(c1, c2);
    const phi = Math.acos((r1c + r2c) / d);
    const n = rotv(u, -phi);
    const T1 = add(c1, mul(n, r1c)), T2 = sub(c2, mul(n, r2c));
    return wrap(440, 320, [
      circ(c1, r1c, FNT, 1.5), circ(c2, r2c, FNT, 1.5),
      dot(c1, DIM, 3), dot(c2, DIM, 3), seg(c1, c2, FNT, 1.4, "5 4"),
      txt(add(mid(c1, c2), [30, 14]), "d"),
      seg(T1, T2, ACC, 2.2), dot(T1, ACC, 3.5), dot(T2, ACC, 3.5),
      seg(c1, T1, GLD, 1.6), seg(c2, T2, GLD, 1.6),
      txt(add(mid(c1, T1), [-12, -2]), "r₁", GLD, 12), txt(add(mid(c2, T2), [14, 2]), "r₂", GLD, 12),
      txt(add(mid(T1, T2), [-16, -6]), "t", ACC),
      cap(440, 320, "t² = d² − (r₁ + r₂)²  (internal tangent — it crosses the center line, so the radii add)")
    ]);
  })(), (() => {
    // Externally tangent circles: the tangent-length belt is 2√(r₁r₂).
    const r1c = 70, r2c = 30;
    const c1 = [140, 200], c2 = [c1[0] + r1c + r2c, 200];
    const [T1, T2] = extTangent(c1, r1c, c2, r2c);
    const K = [c1[0] + r1c, 200];
    return wrap(430, 310, [
      circ(c1, r1c, FNT, 1.5), circ(c2, r2c, FNT, 1.5),
      dot(c1, DIM, 3), dot(c2, DIM, 3), dot(K, GRN, 4),
      seg(c1, T1, GLD, 1.6), seg(c2, T2, GLD, 1.6),
      txt(add(mid(c1, T1), [-12, 0]), "r₁", GLD, 12), txt(add(mid(c2, T2), [14, 0]), "r₂", GLD, 12),
      seg(T1, T2, ACC, 2.2), dot(T1, ACC, 3.5), dot(T2, ACC, 3.5),
      txt(add(mid(T1, T2), [0, -10]), "2√(r₁r₂)", ACC, 12),
      cap(430, 310, "circles tangent at the green point (d = r₁ + r₂): the external tangent segment collapses to t = 2√(r₁r₂) — the workhorse for chains of tangent circles")
    ]);
  })()];

  DIAGRAMS["descartes-circle-theorem"] = [(() => {
    const g = 250;
    return wrap(430, 300, [
      seg([50, g], [390, g], DIM, 2),
      circ([160, g - 60], 60, ACC, 1.8), circ([280, g - 60], 60, ACC, 1.8),
      circ([220, g - 15], 15, GLD, 1.8),
      txt([160, g - 60], "k₁ = 1", ACC, 12), txt([280, g - 60], "k₂ = 1", ACC, 12),
      txt([220, g - 42], "k₄ = 4", GLD, 11), txt([90, g + 18], "k₃ = 0 (line)", DIM, 11.5),
      cap(430, 300, "curvatures kᵢ = 1/rᵢ, line = 0: Descartes gives k₄ = 4, radius ¼")
    ]);
  })()];

  DIAGRAMS["butterfly-theorem"] = [(() => {
    const cen = [210, 160], R = 125, y = 200;
    const half = Math.sqrt(R * R - (y - cen[1]) ** 2);
    const P = [cen[0] - half, y], Q = [cen[0] + half, y], M = [cen[0], y];
    const pick = ang => {
      const dir = [Math.cos(rad(ang)), Math.sin(rad(ang))];
      const [p1, p2] = circleLineInts(cen, R, M, add(M, dir));
      return p1[1] < p2[1] ? [p1, p2] : [p2, p1]; // [upper, lower]
    };
    const [Aa, Bb] = pick(-52), [Cc, Dd] = pick(-122);
    const X = lineInt(Aa, Dd, P, Q), Y = lineInt(Cc, Bb, P, Q);
    return wrap(430, 330, [
      circ(cen, R, FNT, 1.5), seg(P, Q, DIM, 2),
      seg(Aa, Bb, FNT, 1.5), seg(Cc, Dd, FNT, 1.5),
      seg(Aa, Dd, ACC, 1.8), seg(Cc, Bb, GLD, 1.8),
      dot(M, GRN, 4.5), txt(add(M, [0, 18]), "M", GRN),
      dot(X, ACC, 4), dot(Y, GLD, 4),
      txt(add(X, [-4, 18]), "X", ACC), txt(add(Y, [6, 18]), "Y", GLD),
      cap(430, 330, "M the midpoint of PQ ⇒ MX = MY")
    ]);
  })()];

  // ---------- Cyclic & tangential quadrilaterals ----------

  const QCEN = [210, 168], QR = 126;
  const QA = onC(QCEN, QR, -120), QB = onC(QCEN, QR, -20), QC2 = onC(QCEN, QR, 68), QD = onC(QCEN, QR, 172);
  const quadLabels = () =>
    txt(away(QA, QCEN, 15), "A") + txt(away(QB, QCEN, 15), "B") +
    txt(away(QC2, QCEN, 15), "C") + txt(away(QD, QCEN, 15), "D");

  DIAGRAMS["cyclic-opposite-angles"] = [wrap(430, 340, [
    circ(QCEN, QR, FNT, 1.5), poly([QA, QB, QC2, QD], DIM, 2), quadLabels(),
    angleArc(QA, QD, QB, 22, ACC), angleArc(QC2, QB, QD, 22, GLD),
    cap(430, 340, "∠A + ∠C = 180°")
  ])];

  DIAGRAMS["ptolemys-theorem"] = [wrap(430, 340, [
    circ(QCEN, QR, FNT, 1.5), poly([QA, QB, QC2, QD], DIM, 2), quadLabels(),
    seg(QA, QC2, ACC, 1.8), seg(QB, QD, GLD, 1.8),
    txt(add(mid(QA, QB), [8, -8]), "a", DIM, 12), txt(add(mid(QB, QC2), [14, 0]), "b", DIM, 12),
    txt(add(mid(QC2, QD), [0, 16]), "c", DIM, 12), txt(add(mid(QD, QA), [-14, 0]), "d", DIM, 12),
    txt(add(lerp(QA, QC2, 0.3), [12, 4]), "p", ACC, 12.5), txt(add(lerp(QB, QD, 0.3), [0, -8]), "q", GLD, 12.5),
    cap(430, 340, "ac + bd = pq")
  ])];

  DIAGRAMS["brahmaguptas-formula"] = [wrap(430, 340, [
    circ(QCEN, QR, FNT, 1.5), poly([QA, QB, QC2, QD], ACC, 2, ACCS), quadLabels(),
    txt(add(mid(QA, QB), [8, -8]), "a", DIM, 12), txt(add(mid(QB, QC2), [14, 0]), "b", DIM, 12),
    txt(add(mid(QC2, QD), [0, 16]), "c", DIM, 12), txt(add(mid(QD, QA), [-14, 0]), "d", DIM, 12),
    cap(430, 340, "A = √((s−a)(s−b)(s−c)(s−d))")
  ])];

  DIAGRAMS["pitots-theorem"] = [(() => {
    const cen = [210, 172], r = 84;
    const angs = [-65, 25, 115, 205];
    const tp = angs.map(a => onC(cen, r, a));
    const dir = angs.map(a => [-Math.sin(rad(a)), Math.cos(rad(a))]);
    const V = angs.map((_, i) => {
      const j = (i + 1) % 4;
      return lineInt(tp[i], add(tp[i], dir[i]), tp[j], add(tp[j], dir[j]));
    });
    return wrap(430, 340, [
      poly(V, DIM, 2), circ(cen, r, ACC, 1.6),
      ...tp.map(p => dot(p, ACC, 3.5)),
      ...V.map((p, i) => txt(add(away(p, cen, 16), [0, 4]), "ABCD"[i], DIM, 12.5)),
      txt(away(mid(V[0], V[1]), cen, 13), "a", GLD, 12.5), txt(away(mid(V[1], V[2]), cen, 13), "b", ACC, 12.5),
      txt(away(mid(V[2], V[3]), cen, 13), "c", GLD, 12.5), txt(away(mid(V[3], V[0]), cen, 13), "d", ACC, 12.5),
      cap(430, 340, "an incircle exists ⟺ a + c = b + d (opposite sides balance)")
    ]);
  })()];

  DIAGRAMS["ptolemy-equilateral"] = [(() => {
    const cen = [210, 168], R = 126;
    const a = onC(cen, R, -90), b = onC(cen, R, 150), c = onC(cen, R, 30), P = onC(cen, R, 100);
    return wrap(430, 340, [
      circ(cen, R, FNT, 1.5), poly([a, b, c], DIM, 2),
      txt(away(a, cen, 15), "A"), txt(away(b, cen, 15), "B"), txt(away(c, cen, 15), "C"),
      seg(P, a, GLD, 2.2), seg(P, b, ACC, 1.8), seg(P, c, ACC, 1.8),
      dot(P, GLD, 4.5), txt(away(P, cen, 15), "P", GLD),
      cap(430, 340, "PA = PB + PC")
    ]);
  })()];

  DIAGRAMS["varignons-theorem"] = [(() => {
    const p = [75, 92], q = [345, 58], r = [305, 282], s = [112, 252];
    const m1 = mid(p, q), m2 = mid(q, r), m3 = mid(r, s), m4 = mid(s, p);
    return wrap(430, 330, [
      poly([p, q, r, s], DIM, 2),
      seg(p, r, FNT, 1.4, "5 4"), seg(q, s, FNT, 1.4, "5 4"),
      poly([m1, m2, m3, m4], GLD, 2, GLDS),
      dot(m1, GLD, 3.5), dot(m2, GLD, 3.5), dot(m3, GLD, 3.5), dot(m4, GLD, 3.5),
      txt(add(p, [-12, -6]), "A", DIM, 12.5), txt(add(q, [12, -6]), "B", DIM, 12.5),
      txt(add(r, [14, 10]), "C", DIM, 12.5), txt(add(s, [-14, 10]), "D", DIM, 12.5),
      txt(add(m1, [0, -10]), "M₁", GLD, 11), txt(add(m2, [16, 0]), "M₂", GLD, 11),
      txt(add(m3, [0, 14]), "M₃", GLD, 11), txt(add(m4, [-17, 0]), "M₄", GLD, 11),
      cap(430, 330, "side midpoints M₁M₂M₃M₄ form a parallelogram — sides parallel to the diagonals (dashed), area half of ABCD")
    ]);
  })()];

  // ---------- Coordinate & grid ----------

  DIAGRAMS["shoelace-formula"] = [(() => {
    const o = [60, 280], sc = 40;
    const map = (x, y) => [o[0] + sc * x, o[1] - sc * y];
    const pts = [[0, 0], [5, 0], [6, 4], [1, 3]].map(v => map(v[0], v[1]));
    const grid = [];
    for (let x = 0; x <= 8; x++) grid.push(seg(map(x, -0.4), map(x, 5.4), "rgba(255,255,255,0.05)", 1));
    for (let y = 0; y <= 5; y++) grid.push(seg(map(-0.4, y), map(8.4, y), "rgba(255,255,255,0.05)", 1));
    return wrap(430, 330, [
      ...grid, poly(pts, ACC, 2, ACCS),
      ...pts.map(p => dot(p, GLD, 4)),
      txt(add(pts[0], [-6, 18]), "(0,0)", GLD, 11.5), txt(add(pts[1], [10, 18]), "(5,0)", GLD, 11.5),
      txt(add(pts[2], [24, 0]), "(6,4)", GLD, 11.5), txt(add(pts[3], [-24, -6]), "(1,3)", GLD, 11.5),
      cap(430, 330, "vertices (xᵢ, yᵢ) in order — cross-multiply around: here A = ½|Σ(xᵢyᵢ₊₁ − yᵢxᵢ₊₁)| = 17.5")
    ]);
  })()];

  DIAGRAMS["point-line-distance"] = [(() => {
    const L1 = [50, 262], L2 = [395, 108], P = [150, 88];
    const f = foot(P, L1, L2);
    return wrap(430, 310, [
      seg(L1, L2, DIM, 2), dot(P, GLD, 4.5), txt(add(P, [0, -12]), "(x₀, y₀)", GLD, 12),
      seg(P, f, ACC, 2, "5 4"), rightAngle(f, P, L2, 11, ACC),
      txt(add(mid(P, f), [16, 0]), "d", ACC, 14),
      txt(add(L2, [-30, -10]), "Ax + By + C = 0", DIM, 12)
    ]);
  })()];

  DIAGRAMS["british-flag-theorem"] = [(() => {
    const a = [85, 78], b = [355, 78], c = [355, 262], d = [85, 262], P = [190, 185];
    return wrap(430, 320, [
      poly([a, b, c, d], DIM, 2),
      seg(P, a, ACC, 1.8), seg(P, c, ACC, 1.8), seg(P, b, GLD, 1.8), seg(P, d, GLD, 1.8),
      dot(P, DIM, 4.5), txt(add(P, [0, 20]), "P"),
      txt(away(a, P, 14), "A", ACC), txt(away(c, P, 14), "C", ACC),
      txt(away(b, P, 14), "B", GLD), txt(away(d, P, 14), "D", GLD),
      cap(430, 320, "PA² + PC² = PB² + PD²")
    ]);
  })()];

  // ---------- Solid geometry ----------

  DIAGRAMS["cone-formulas"] = [(() => {
    const apex = [110, 55], bc = [110, 240], rx = 72, ry = 17;
    const sc = [305, 85], sr = 132, sa1 = 55, sa2 = 125;
    const sp1 = onC(sc, sr, sa1), sp2 = onC(sc, sr, sa2);
    return wrap(440, 320, [
      `<ellipse cx="${bc[0]}" cy="${bc[1]}" rx="${rx}" ry="${ry}" fill="none" stroke="${FNT}" stroke-width="1.5"/>`,
      seg(apex, [bc[0] - rx, bc[1]], DIM, 2), seg(apex, [bc[0] + rx, bc[1]], DIM, 2),
      seg(apex, bc, FNT, 1.4, "4 3"), seg(bc, [bc[0] + rx, bc[1]], GLD, 1.8),
      txt([bc[0] + rx / 2, bc[1] + 16], "r", GLD), txt([98, 150], "h"),
      txt([190, 140], "ℓ", ACC, 14),
      seg(sc, sp1, DIM, 2), seg(sc, sp2, DIM, 2),
      `<path d="M ${pf(sp2)} A ${sr} ${sr} 0 0 0 ${pf(sp1)}" fill="none" stroke="${GLD}" stroke-width="2.5"/>`,
      txt(add(mid(sc, sp2), [-12, -4]), "ℓ", ACC, 13),
      txt(onC(sc, sr + 16, 90), "arc = 2πr", GLD, 12),
      cap(440, 320, "unrolled: a sector of radius ℓ — lateral area πrℓ")
    ]);
  })()];

  DIAGRAMS["frustum-volume"] = [(() => {
    const b = [210, 248], brx = 108, bry = 21, t = [210, 118], trx = 58, try_ = 12;
    return wrap(430, 310, [
      `<ellipse cx="${t[0]}" cy="${t[1]}" rx="${trx}" ry="${try_}" fill="none" stroke="${FNT}" stroke-width="1.5"/>`,
      `<ellipse cx="${b[0]}" cy="${b[1]}" rx="${brx}" ry="${bry}" fill="none" stroke="${FNT}" stroke-width="1.5"/>`,
      seg([t[0] - trx, t[1]], [b[0] - brx, b[1]], DIM, 2),
      seg([t[0] + trx, t[1]], [b[0] + brx, b[1]], DIM, 2),
      seg(t, b, ACC, 1.6, "5 4"), txt([222, 185], "h", ACC),
      txt([210, 112], "A₂", GLD, 12.5), txt([210, 254], "A₁", GLD, 12.5),
      cap(430, 310, "V = ⅓ h (A₁ + A₂ + √(A₁A₂))")
    ]);
  })()];

  DIAGRAMS["space-diagonal"] = [(() => {
    const o = [100, 260], w = 180, hh = 120, dx = 70, dy = 50;
    const f1 = o, f2 = [o[0] + w, o[1]], f3 = [o[0] + w, o[1] - hh], f4 = [o[0], o[1] - hh];
    const b1 = [f1[0] + dx, f1[1] - dy], b2 = [f2[0] + dx, f2[1] - dy],
          b3 = [f3[0] + dx, f3[1] - dy], b4 = [f4[0] + dx, f4[1] - dy];
    return wrap(430, 330, [
      seg(f1, b1, FNT, 1.3, "4 3"), seg(b1, b2, FNT, 1.3, "4 3"), seg(b1, b4, FNT, 1.3, "4 3"),
      poly([f1, f2, f3, f4], DIM, 1.8),
      seg(f2, b2, DIM, 1.8), seg(f3, b3, DIM, 1.8), seg(f4, b4, DIM, 1.8),
      seg(b2, b3, DIM, 1.8), seg(b3, b4, DIM, 1.8),
      seg(f1, b2, GLD, 1.8, "6 4"), seg(f1, b3, ACC, 2.2),
      txt([190, 282], "ℓ"), txt([352, 240], "w"), txt([388, 175], "h"),
      txt([225, 168], "d", ACC, 14),
      cap(430, 330, "d² = ℓ² + w² + h²")
    ]);
  })()];

  DIAGRAMS["de-guas-theorem"] = [(() => {
    const O = [150, 235], X = [330, 262], Y = [62, 292], Z = [150, 72];
    return wrap(430, 330, [
      poly([X, Y, Z], ACC, 1.8, ACCS),
      seg(O, X, DIM, 2), seg(O, Y, DIM, 2), seg(O, Z, DIM, 2),
      dot(O, GLD, 4), txt(add(O, [14, 12]), "O", GLD),
      txt([255, 175], "A₀", ACC, 13),
      txt(centroidOf(O, X, Y), "A₁", FNT, 11.5), txt(centroidOf(O, Y, Z), "A₂", FNT, 11.5), txt(centroidOf(O, X, Z), "A₃", FNT, 11.5),
      cap(430, 330, "right angles at O: hypotenuse-face A₀² = A₁² + A₂² + A₃²")
    ]);
  })()];

  // ---------- Ratios & constants ----------

  DIAGRAMS["equilateral-triangle-facts"] = [(() => {
    const a = [200, 53.5], b = [75, 270], c = [325, 270];
    const G = centroidOf(a, b, c), R = dist(G, a), r = dist(G, foot(G, b, c));
    return wrap(420, 366, [
      circ(G, R, FNT, 1.4), circ(G, r, ACC, 1.6), poly([a, b, c], DIM, 2),
      dot(G, DIM, 3.5),
      seg(G, a, GLD, 1.8, "4 3"), txt(add(mid(G, a), [14, 0]), "R", GLD),
      seg(G, foot(G, b, c), ACC, 1.8), txt(add(mid(G, foot(G, b, c)), [10, 0]), "r", ACC),
      txt(add(mid(b, c), [0, 18]), "s", DIM, 13),
      cap(420, 366, "R = 2r, and h = s√3/2 = R + r, A = s²√3/4")
    ]);
  })()];

  DIAGRAMS["regular-hexagon-area"] = [(() => {
    const cen = [210, 168], v = [0, 1, 2, 3, 4, 5].map(i => onC(cen, 118, 60 * i));
    return wrap(430, 340, [
      poly([cen, v[0], v[1]], "none", 0, ACCS),
      poly(v, DIM, 2),
      ...v.map(p => seg(cen, p, FNT, 1.3)),
      dot(cen, DIM, 3),
      txt(add(mid(v[0], v[1]), [16, 0]), "s", GLD),
      seg(v[0], v[3], GLD, 1.6, "6 4"), txt(add(mid(v[0], v[3]), [24, -8]), "2s", GLD, 12),
      cap(430, 340, "six equilateral triangles of side s; the long diagonal is 2s")
    ]);
  })()];

  DIAGRAMS["15-75-90-triangle"] = [(() => {
    const b = [60, 240], c = [360, 240], cen = mid(b, c), R = 150;
    const v = onC(cen, R, -30), f = foot(v, b, c);
    return wrap(430, 300, [
      poly([b, c, v], DIM, 2), rightAngle(v, b, c, 11),
      angleArc(b, c, v, 30, GLD), txt(add(b, [46, -8]), "15°", GLD, 11.5),
      angleArc(c, v, b, 20, ACC), txt(add(c, [-34, -12]), "75°", ACC, 11.5),
      seg(v, f, GRN, 1.8, "4 3"), txt(add(mid(v, f), [16, 0]), "c/4", GRN, 12),
      txt(add(mid(b, c), [0, 20]), "c"),
      cap(430, 300, "the altitude to the hypotenuse is exactly c/4")
    ]);
  })()];

  DIAGRAMS["golden-ratio-pentagon"] = [(() => {
    const cen = [210, 175], v = [0, 1, 2, 3, 4].map(i => onC(cen, 128, -90 + 72 * i));
    const diags = [];
    for (let i = 0; i < 5; i++) diags.push(seg(v[i], v[(i + 2) % 5], FNT, 1.4));
    return wrap(430, 340, [
      poly(v, DIM, 2), ...diags,
      seg(v[0], v[2], GLD, 2.4),
      txt(add(mid(v[0], v[2]), [16, -4]), "φ", GLD, 15),
      txt(add(mid(v[0], v[1]), [14, -6]), "1", DIM, 12.5),
      cap(430, 340, "diagonal / side = φ")
    ]);
  })()];

  DIAGRAMS["inscribed-square"] = [(() => {
    const b = [60, 270], c = [340, 270], apex = [170, 90];
    const x = (dist(b, c) * 180) / (dist(b, c) + 180);
    const yline = 270 - x;
    const L = lineInt(b, apex, [0, yline], [430, yline]);
    const Rr = lineInt(c, apex, [0, yline], [430, yline]);
    return wrap(420, 310, [
      poly([apex, b, c], DIM, 2),
      poly([[L[0], 270], [Rr[0], 270], Rr, L], ACC, 2, ACCS),
      txt([(L[0] + Rr[0]) / 2, 296], "x", ACC), txt(add(mid(b, c), [110, 20]), "a", DIM, 12),
      txt([120, 185], "h", DIM, 12),
      cap(420, 310, "x = ah / (a + h)")
    ]);
  })()];

  // ---------- Methods ----------

  DIAGRAMS["mass-points"] = [(() => {
    const D = lerp(B, C, 1 / 3), E = lerp(A, C, 2 / 5);
    const P = lineInt(A, D, B, E);
    return wrap(430, 330, [
      ABC(), seg(A, D, ACC, 1.8), seg(B, E, ACC, 1.8),
      dot(P, GRN, 4.5), txt(add(P, [12, -8]), "P", GRN),
      dot(D, DIM, 3.2), dot(E, DIM, 3.2),
      massBadge(add(away(A, CEN, 30), [16, 0]), "3"),
      massBadge(add(away(B, CEN, 30), [10, -6]), "4"),
      massBadge(add(away(C, CEN, 30), [-10, -6]), "2"),
      massBadge(add(D, [0, 24]), "6"),
      cap(430, 330, "BD:DC = 1:2, AE:EC = 2:3  ⇒  AP:PD = 6:3 = 2:1")
    ]);
  })()];

  DIAGRAMS["reflection-shortest-path"] = [(() => {
    const y = 245, Aa = [80, 105], Bb = [340, 160], Ar = [80, 385];
    const P = lineInt(Ar, Bb, [0, y], [430, y]);
    return wrap(430, 410, [
      seg([30, y], [400, y], DIM, 2),
      dot(Aa, ACC, 4.5), dot(Bb, ACC, 4.5), dot(Ar, GLD, 4.5), dot(P, GRN, 4.5),
      txt(add(Aa, [-14, 0]), "A", ACC), txt(add(Bb, [14, 0]), "B", ACC),
      txt(add(Ar, [-14, 0]), "A′", GLD), txt(add(P, [0, -12]), "P", GRN),
      seg(Aa, P, ACC, 2), seg(P, Bb, ACC, 2),
      seg(Ar, P, GLD, 1.8, "6 4"), seg(Aa, Ar, FNT, 1.2, "3 4"),
      cap(430, 410, "AP + PB = A′P + PB ≥ A′B — reflect, then go straight")
    ]);
  })()];

  DIAGRAMS["rotation-trick"] = [(() => {
    const k = 85, ox = 70, oy = 320, s = Math.sqrt(5 + 2 * Math.SQRT2);
    const m = (u, v) => [ox + k * u, oy - k * v];
    const a = m(0, 0), b = m(s, 0), c = m(s, s), d = m(0, s);
    const Pm = [(1 + Math.SQRT2) / s, Math.SQRT2 / s];
    const p = m(Pm[0], Pm[1]);
    const pr = m(s + Pm[1], s - Pm[0]); // rotate P by -90° about B (A→C)
    return wrap(440, 360, [
      poly([a, b, c, d], DIM, 2),
      txt(add(a, [-12, 14]), "A"), txt(add(b, [10, 14]), "B"), txt(add(c, [12, -6]), "C"), txt(add(d, [-12, -6]), "D"),
      dot(p, GLD, 4.5), txt(add(p, [-4, -10]), "P", GLD),
      dot(pr, GRN, 4.5), txt(add(pr, [14, 0]), "P′", GRN),
      seg(p, a, ACC, 1.8), seg(p, b, ACC, 1.8), seg(p, c, ACC, 1.8),
      seg(b, pr, GRN, 1.6, "5 3"), seg(p, pr, GRN, 1.6, "5 3"), seg(pr, c, GRN, 1.6, "5 3"),
      txt(add(mid(p, a), [-10, 6]), "1", ACC, 12), txt(add(mid(p, b), [0, 14]), "2", ACC, 12),
      txt(add(mid(p, c), [-10, -6]), "3", ACC, 12),
      cap(440, 360, "rotate 90° about B (A→C): P′C = PA, and △PBP′ is an isosceles right triangle")
    ]);
  })()];

  DIAGRAMS["spiral-similarity"] = [(() => {
    // Built P-first: A, C on one line through P and B, D on another, then the
    // center X is the second intersection of circles (PAB) and (PCD).
    const P = [320, 110], Aa = [90, 255], Bb = [180, 295];
    const Cc = add(P, mul(sub(Aa, P), 0.45)), Dd = add(P, mul(sub(Bb, P), 0.5));
    const O1 = circumcenterOf(P, Aa, Bb), O2 = circumcenterOf(P, Cc, Dd);
    const F = foot(P, O1, O2), X = sub(mul(F, 2), P);
    return wrap(430, 330, [
      circ(O1, dist(O1, P), FNT, 1.2, "none", "5 4"), circ(O2, dist(O2, P), FNT, 1.2, "none", "5 4"),
      seg(Aa, P, FNT, 1.2), seg(Bb, P, FNT, 1.2),
      seg(X, Aa, FNT, 1.3, "3 4"), seg(X, Cc, FNT, 1.3, "3 4"),
      seg(Aa, Bb, ACC, 2.5), seg(Cc, Dd, GLD, 2.5),
      dot(Aa, ACC, 4), dot(Bb, ACC, 4), dot(Cc, GLD, 4), dot(Dd, GLD, 4),
      txt(add(Aa, [-13, 4]), "A", ACC, 12.5), txt(add(Bb, [0, 17]), "B", ACC, 12.5),
      txt(add(Cc, [-13, -4]), "C", GLD, 12.5), txt(add(Dd, [-4, 17]), "D", GLD, 12.5),
      dot(P, "var(--text)", 4.5), txt(add(P, [4, -10]), "P", "var(--text)", 12.5),
      dot(X, GRN, 5), txt(add(X, [14, 8]), "X", GRN, 13),
      angleArc(X, Aa, Cc, 24, GRN),
      cap(430, 330, "the spiral similarity at X rotates and scales AB onto CD (A→C, B→D); with P = AC ∩ BD, the center X is the second intersection of circles (PAB) and (PCD)")
    ]);
  })()];

  // ---------- Remaining coverage ----------

  DIAGRAMS["triangle-inequality"] = [wrap(430, 320, [
    ABC(),
    seg(B, A, ACC, 2.5), seg(A, C, ACC, 2.5), seg(B, C, GLD, 2.5),
    txt(add(mid(A, B), [-14, -4]), "c", ACC), txt(add(mid(A, C), [16, -2]), "b", ACC),
    txt(add(mid(B, C), [0, 20]), "a", GLD),
    cap(430, 320, "the detour is never shorter: a < b + c")
  ])];

  DIAGRAMS["triangle-area-standard"] = [(() => {
    const f = foot(A, B, C);
    return wrap(430, 320, [
      ABC(), seg(A, f, ACC, 2, "5 4"), rightAngle(f, C, A, 10, ACC),
      txt(add(mid(A, f), [12, 0]), "h", ACC), txt(add(mid(B, C), [0, 20]), "b", GLD),
      cap(430, 320, "A = ½ b h")
    ]);
  })()];

  DIAGRAMS["herons-formula"] = [(() => {
    const b = [70, 275], c = [350, 275], a = [170, 35];
    return wrap(420, 320, [
      poly([a, b, c], DIM, 2),
      txt(add(mid(a, b), [-24, -2]), "c = 13", ACC, 12.5), txt(add(mid(a, c), [28, -2]), "b = 15", ACC, 12.5),
      txt(add(mid(b, c), [0, 18]), "a = 14", ACC, 12.5),
      cap(420, 320, "s = (a + b + c)/2 = 21 ⇒ A = √(21·8·7·6) = 84")
    ]);
  })()];

  DIAGRAMS["law-cosines-60-120"] = [(() => {
    const v = [150, 240], w = [270, 240], u = [50, 66.8];
    return wrap(420, 300, [
      poly([v, w, u], DIM, 2),
      angleArc(v, w, u, 24, GLD), txt(add(v, [-8, -30]), "C = 120°", GLD, 11.5),
      txt(add(mid(v, w), [0, 18]), "a = 3"), txt(add(mid(v, u), [-24, 0]), "b = 5"),
      txt(add(mid(w, u), [28, 0]), "c = 7", ACC, 13),
      cap(420, 300, "c² = a² + b² + ab at 120°: 49 = 9 + 25 + 15 — the (3, 5, 7) triangle")
    ]);
  })(), (() => {
    // The 60° companion: c² = a² + b² − ab, with the (5, 8, 7) triangle.
    const sc = 28;
    const v = [110, 250], w = [v[0] + 8 * sc, 250];
    const u = [v[0] + 5 * sc * Math.cos(rad(-60)), 250 + 5 * sc * Math.sin(rad(-60))];
    return wrap(420, 300, [
      poly([v, w, u], DIM, 2),
      angleArc(v, w, u, 26, GLD), txt(add(v, [42, -14]), "C = 60°", GLD, 11.5),
      txt(add(mid(v, w), [0, 18]), "a = 8"), txt(add(mid(v, u), [-28, 0]), "b = 5"),
      txt(add(mid(w, u), [30, 0]), "c = 7", ACC, 13),
      cap(420, 300, "c² = a² + b² − ab at 60°: 49 = 64 + 25 − 40 — the (5, 8, 7) triangle")
    ]);
  })()];

  DIAGRAMS["brocard-angle"] = [(() => {
    const a = dist(B, C), b = dist(C, A), c = dist(A, B);
    const area = Math.abs((B[0] - A[0]) * (C[1] - A[1]) - (C[0] - A[0]) * (B[1] - A[1])) / 2;
    const w = Math.atan(4 * area / (a * a + b * b + c * c));
    const ray = (P, Q, sgn) => add(P, rotv(mul(norm(sub(Q, P)), 600), sgn * w));
    let Om = lineInt(A, ray(A, B, 1), B, ray(B, C, 1));
    if (!insideTri(Om, A, B, C)) Om = lineInt(A, ray(A, B, -1), B, ray(B, C, -1));
    const wlab = (P, Q) => txt(add(P, mul(norm(add(norm(sub(Q, P)), norm(sub(Om, P)))), 40)), "ω", GRN, 12);
    return wrap(430, 330, [
      ABC(), seg(A, Om, ACC, 1.8), seg(B, Om, ACC, 1.8), seg(C, Om, ACC, 1.8),
      dot(Om, GLD, 4.5), txt(add(Om, [14, -6]), "Ω", GLD),
      angleArc(A, B, Om, 24, GRN), angleArc(B, C, Om, 24, GRN), angleArc(C, A, Om, 24, GRN),
      wlab(A, B), wlab(B, C), wlab(C, A),
      cap(430, 330, "∠ΩAB = ∠ΩBC = ∠ΩCA = ω")
    ]);
  })()];

  DIAGRAMS["caseys-theorem"] = [(() => {
    const cen = [215, 168], R = 130;
    const angs = [-95, -5, 85, 185], rads = [24, 20, 26, 22];
    const cs = angs.map((ang, i) => onC(cen, R - rads[i], ang));
    const t = (i, j) => extTangent(cs[i], rads[i], cs[j], rads[j]);
    const [p12a, p12b] = t(0, 1), [p23a, p23b] = t(1, 2), [p34a, p34b] = t(2, 3), [p14a, p14b] = t(0, 3);
    const [p13a, p13b] = t(0, 2), [p24a, p24b] = t(1, 3);
    return wrap(440, 340, [
      circ(cen, R, FNT, 1.5),
      ...cs.map((cc, i) => circ(cc, rads[i], DIM, 1.6)),
      seg(p12a, p12b, ACC, 1.7), seg(p23a, p23b, ACC, 1.7), seg(p34a, p34b, ACC, 1.7), seg(p14a, p14b, ACC, 1.7),
      seg(p13a, p13b, GLD, 1.6, "5 4"), seg(p24a, p24b, GLD, 1.6, "5 4"),
      ...cs.map((cc, i) => txt(add(cc, [0, 4]), String(i + 1), DIM, 11.5)),
      txt(add(mid(p12a, p12b), [14, -4]), "t₁₂", ACC, 11), txt(add(mid(p23a, p23b), [14, 4]), "t₂₃", ACC, 11),
      txt(add(mid(p34a, p34b), [-14, 6]), "t₃₄", ACC, 11), txt(add(mid(p14a, p14b), [-14, -4]), "t₁₄", ACC, 11),
      txt(add(mid(p13a, p13b), [16, 0]), "t₁₃", GLD, 11), txt(add(mid(p24a, p24b), [0, -8]), "t₂₄", GLD, 11),
      cap(440, 340, "tᵢⱼ = external tangent length between circles i, j: t₁₂t₃₄ + t₁₄t₂₃ = t₁₃t₂₄ — Ptolemy with circles for vertices")
    ]);
  })()];

  DIAGRAMS["ptolemys-inequality"] = [(() => {
    const O = [215, 165], R = 125;
    const a = onC(O, R, -140), b = onC(O, R, -40), c = onC(O, R, 60);
    const d = onC(O, R * 0.62, 165);
    return wrap(440, 340, [
      circ(O, R, FNT, 1.4, "none", "6 5"), poly([a, b, c, d], DIM, 2),
      seg(a, c, ACC, 1.7, "5 4"), seg(b, d, GLD, 1.7, "5 4"),
      txt(away(a, O, 15), "A"), txt(away(b, O, 15), "B"), txt(away(c, O, 15), "C"),
      txt(add(d, [-6, -12]), "D", GLD),
      cap(440, 340, "D off the circle ⇒ AB·CD + BC·DA > AC·BD (strict)")
    ]);
  })()];

  DIAGRAMS["bretschneiders-formula"] = [(() => {
    const p = [80, 95], q = [335, 65], r = [305, 275], s = [105, 245];
    return wrap(420, 310, [
      poly([p, q, r, s], DIM, 2),
      angleArc(p, s, q, 24, GLD), angleArc(r, q, s, 24, GLD),
      txt(add(p, [22, 22]), "A", GLD), txt(add(r, [-22, -16]), "C", GLD),
      txt(add(mid(p, q), [0, -8]), "a", DIM, 12), txt(add(mid(q, r), [14, 0]), "b", DIM, 12),
      txt(add(mid(r, s), [0, 16]), "c", DIM, 12), txt(add(mid(s, p), [-14, 0]), "d", DIM, 12),
      cap(420, 310, "sides a, b, c, d with opposite angles A, C — the cos²((A+C)/2) term corrects Brahmagupta")
    ]);
  })()];

  DIAGRAMS["euler-quadrilateral"] = [(() => {
    const p = [80, 95], q = [335, 65], r = [305, 275], s = [105, 245];
    const m1 = mid(p, r), m2 = mid(q, s);
    return wrap(420, 310, [
      poly([p, q, r, s], DIM, 2),
      seg(p, r, GLD, 1.4, "5 4"), seg(q, s, GLD, 1.4, "5 4"),
      txt(add(mid(p, q), [0, -8]), "a", DIM, 12), txt(add(mid(q, r), [14, 0]), "b", DIM, 12),
      txt(add(mid(r, s), [0, 16]), "c", DIM, 12), txt(add(mid(s, p), [-14, 0]), "d", DIM, 12),
      txt(add(lerp(p, r, 0.3), [12, 0]), "p", GLD, 12), txt(add(lerp(q, s, 0.26), [-2, -9]), "q", GLD, 12),
      dot(m1, GLD, 4), dot(m2, GLD, 4), seg(m1, m2, ACC, 2.2),
      txt(add(mid(m1, m2), [0, -10]), "m", ACC),
      cap(420, 310, "m joins the midpoints of the diagonals: a² + b² + c² + d² = p² + q² + 4m²")
    ]);
  })()];

  DIAGRAMS["distance-midpoint"] = [(() => {
    const o = [60, 280], sc = 40;
    const map = (x, y) => [o[0] + sc * x, o[1] - sc * y];
    const p1 = map(1, 1), p2 = map(6, 4), corner = map(6, 1), M = mid(p1, p2);
    const grid = [];
    for (let x = 0; x <= 8; x++) grid.push(seg(map(x, -0.4), map(x, 5.4), "rgba(255,255,255,0.05)", 1));
    for (let y = 0; y <= 5; y++) grid.push(seg(map(-0.4, y), map(8.4, y), "rgba(255,255,255,0.05)", 1));
    return wrap(430, 330, [
      ...grid,
      seg(p1, corner, GLD, 1.7, "5 4"), seg(corner, p2, GLD, 1.7, "5 4"),
      seg(p1, p2, ACC, 2.2), dot(p1, DIM, 4), dot(p2, DIM, 4), dot(M, GRN, 4.5),
      txt(add(p1, [-4, 20]), "(x₁, y₁)", DIM, 11.5), txt(add(p2, [8, -10]), "(x₂, y₂)", DIM, 11.5),
      txt(add(mid(p1, corner), [0, 18]), "Δx", GLD, 12), txt(add(mid(corner, p2), [20, 0]), "Δy", GLD, 12),
      txt(add(mid(p1, M), [-8, -10]), "d", ACC), txt(add(M, [4, -12]), "M", GRN),
      cap(430, 330, "d = √(Δx² + Δy²);  M averages the endpoints")
    ]);
  })()];

  DIAGRAMS["circle-equation"] = [(() => {
    const cen = [215, 165], r = 95, p = onC(cen, r, -35);
    return wrap(430, 320, [
      circ(cen, r, ACC, 2), dot(cen, GLD, 4), txt(add(cen, [-2, 20]), "(h, k)", GLD, 12),
      seg(cen, p, GLD, 1.8, "4 3"), txt(add(mid(cen, p), [0, -8]), "r", GLD),
      dot(p, DIM, 4), txt(add(p, [30, -4]), "(x, y)", DIM, 12),
      cap(430, 320, "(x − h)² + (y − k)² = r²")
    ]);
  })()];

  DIAGRAMS["rotation-90"] = [(() => {
    const O = [210, 235], P = [345, 185];
    const v = sub(P, O), Pr = add(O, [v[1], -v[0]]);
    return wrap(430, 330, [
      seg(O, P, ACC, 2), seg(O, Pr, GLD, 2),
      dot(O, DIM, 4), dot(P, ACC, 4.5), dot(Pr, GLD, 4.5),
      txt(add(O, [0, 20]), "O"), txt(add(P, [22, 4]), "(x, y)", ACC, 12),
      txt(add(Pr, [0, -12]), "(−y, x)", GLD, 12),
      angleArc(O, P, Pr, 46, GRN), rightAngle(O, P, Pr, 14, GRN),
      cap(430, 330, "90° counterclockwise about the origin")
    ]);
  })()];

  DIAGRAMS["eulers-polyhedron-formula"] = [(() => {
    const o = [110, 255], w = 160, hh = 110, dx = 65, dy = 45;
    const f = [o, [o[0] + w, o[1]], [o[0] + w, o[1] - hh], [o[0], o[1] - hh]];
    const bk = f.map(p => [p[0] + dx, p[1] - dy]);
    return wrap(430, 330, [
      seg(f[0], bk[0], FNT, 1.3, "4 3"), seg(bk[0], bk[1], FNT, 1.3, "4 3"), seg(bk[0], bk[3], FNT, 1.3, "4 3"),
      poly(f, DIM, 1.8),
      seg(f[1], bk[1], DIM, 1.8), seg(f[2], bk[2], DIM, 1.8), seg(f[3], bk[3], DIM, 1.8),
      seg(bk[1], bk[2], DIM, 1.8), seg(bk[2], bk[3], DIM, 1.8),
      ...f.map(p => dot(p, GLD, 4)), ...bk.map(p => dot(p, GLD, 4)),
      txt([365, 90], "V = 8", GLD, 12.5, "start"), txt([365, 112], "E = 12", DIM, 12.5, "start"), txt([365, 134], "F = 6", ACC, 12.5, "start"),
      cap(430, 330, "cube: V − E + F = 8 − 12 + 6 = 2 (gold dots = vertices)")
    ]);
  })()];

  DIAGRAMS["prism-pyramid-volumes"] = [(() => {
    const cyl = [120, 0], ct = 105, cb = 250, crx = 55, cry = 13;
    return wrap(430, 320, [
      `<ellipse cx="120" cy="${ct}" rx="${crx}" ry="${cry}" fill="none" stroke="${DIM}" stroke-width="1.6"/>`,
      `<ellipse cx="120" cy="${cb}" rx="${crx}" ry="${cry}" fill="none" stroke="${FNT}" stroke-width="1.4"/>`,
      seg([120 - crx, ct], [120 - crx, cb], DIM, 1.8), seg([120 + crx, ct], [120 + crx, cb], DIM, 1.8),
      `<ellipse cx="300" cy="${cb}" rx="62" ry="14" fill="none" stroke="${FNT}" stroke-width="1.4"/>`,
      seg([300 - 62, cb], [300, ct], DIM, 1.8), seg([300 + 62, cb], [300, ct], DIM, 1.8),
      seg([300, ct], [300, cb], ACC, 1.5, "4 3"), txt([312, 180], "h", ACC),
      seg([120, ct], [120, cb], ACC, 1.5, "4 3"), txt([132, 180], "h", ACC),
      txt([120, 285], "V = Bh", DIM, 12.5), txt([300, 285], "V = ⅓Bh", DIM, 12.5),
      cap(430, 320, "same base and height — the pointed solid holds a third")
    ]);
  })()];

  DIAGRAMS["sphere-formulas"] = [(() => {
    const cen = [210, 160], r = 112;
    return wrap(420, 320, [
      circ(cen, r, DIM, 2),
      `<ellipse cx="${cen[0]}" cy="${cen[1]}" rx="${r}" ry="26" fill="none" stroke="${FNT}" stroke-width="1.3" stroke-dasharray="5 4"/>`,
      dot(cen, DIM, 3.5), seg(cen, onC(cen, r, -30), GLD, 1.8, "4 3"),
      txt(add(mid(cen, onC(cen, r, -30)), [0, -8]), "r", GLD),
      seg([cen[0] - 93, cen[1] - 62], [cen[0] + 93, cen[1] - 62], ACC, 1.6),
      seg([cen[0], cen[1] - r], [cen[0], cen[1] - 62], ACC, 1.4, "3 3"),
      txt([cen[0] + 10, cen[1] - 78], "h", ACC, 12),
      cap(420, 320, "SA = 4πr², V = 4/3 πr³; the plane at depth h cuts off a cap of volume πh²(3r − h)/3")
    ]);
  })()];

  DIAGRAMS["cross-product-area"] = [(() => {
    const O = [95, 250], u = [200, -35], v = [70, -130];
    const U = add(O, u), V2 = add(O, v), W = add(U, v);
    return wrap(430, 320, [
      poly([O, U, W, V2], "none", 0, ACCS),
      seg(O, V2, GLD, 2.2), seg(O, U, ACC, 2.2),
      seg(U, W, FNT, 1.5, "4 3"), seg(V2, W, FNT, 1.5, "4 3"),
      seg(O, W, FNT, 1.3, "3 4"),
      dot(O, DIM, 4), dot(U, ACC, 4), dot(V2, GLD, 4),
      txt(add(mid(O, U), [0, 16]), "u", ACC, 13.5), txt(add(mid(O, V2), [-14, 0]), "v", GLD, 13.5),
      cap(430, 320, "parallelogram = |u × v|;  triangle = ½ |u × v|")
    ]);
  })()];

  DIAGRAMS["regular-tetrahedron"] = [(() => {
    const b1 = [100, 262], b2 = [330, 262], b3 = [252, 205], apex = [215, 62];
    const gb = [(b1[0] + b2[0] + b3[0]) / 3, (b1[1] + b2[1] + b3[1]) / 3];
    return wrap(430, 320, [
      seg(b1, b3, FNT, 1.4, "5 4"), seg(b2, b3, FNT, 1.4, "5 4"),
      seg(b1, b2, DIM, 2), seg(apex, b1, DIM, 2), seg(apex, b2, DIM, 2), seg(apex, b3, DIM, 1.7),
      seg(apex, gb, ACC, 1.5, "4 3"), dot(gb, ACC, 3),
      txt(add(mid(apex, gb), [14, 0]), "h", ACC), txt(add(mid(b1, b2), [0, 18]), "s", GLD),
      cap(430, 320, "h = s√6/3,  V = s³√2/12")
    ]);
  })()];

  DIAGRAMS["cayley-menger"] = [(() => {
    // A scalene tetrahedron with all six edges labelled.
    const A = [80, 272], B = [340, 250], C = [258, 198], D = [160, 60];
    return wrap(430, 320, [
      seg(A, C, FNT, 1.4, "5 4"),                       // back edge (hidden)
      poly([A, B, D], DIM, 2),                          // front face
      seg(B, C, DIM, 1.9), seg(D, C, DIM, 1.9),         // remaining edges to back vertex
      dot(A, DIM, 3.5), dot(B, DIM, 3.5), dot(C, DIM, 3.5), dot(D, DIM, 3.5),
      txt(add(mid(A, B), [0, 17]), "a", GLD),
      txt(add(mid(A, D), [-13, 0]), "b", GLD),
      txt(add(mid(B, D), [13, -2]), "c", GLD),
      txt(add(mid(D, C), [11, 2]), "d", ACC),
      txt(add(mid(B, C), [12, 6]), "e", ACC),
      txt(add(mid(A, C), [-8, -4]), "f", ACC),
      cap(430, 320, "volume from all six edge lengths — the 3D Heron's formula")
    ]);
  })()];

  DIAGRAMS["isosceles-tetrahedron"] = [(() => {
    // Tetrahedron inscribed in a box as the six face diagonals.
    const o = [98, 256], w = 172, hh = 116, dx = 64, dy = 48;
    const f1 = o, f2 = [o[0] + w, o[1]], f3 = [o[0] + w, o[1] - hh], f4 = [o[0], o[1] - hh];
    const b1 = add(f1, [dx, -dy]), b2 = add(f2, [dx, -dy]),
          b3 = add(f3, [dx, -dy]), b4 = add(f4, [dx, -dy]);
    const T = [f1, f3, b2, b4];   // alternating box vertices → the tetrahedron
    const boxEdge = (p, q) => seg(p, q, FNT, 1.2, "3 4");
    const tet = (p, q, col) => seg(p, q, col, 2.1);
    return wrap(440, 320, [
      // box scaffold (faint dashed)
      boxEdge(f1, f2), boxEdge(f2, f3), boxEdge(f3, f4), boxEdge(f4, f1),
      boxEdge(b1, b2), boxEdge(b2, b3), boxEdge(b3, b4), boxEdge(b4, b1),
      boxEdge(f1, b1), boxEdge(f2, b2), boxEdge(f3, b3), boxEdge(f4, b4),
      // the six tetrahedron edges (each a face diagonal)
      tet(T[0], T[1], GLD), tet(T[0], T[2], GLD), tet(T[0], T[3], GLD),
      tet(T[1], T[2], ACC), tet(T[1], T[3], ACC), tet(T[2], T[3], ACC),
      dot(T[0], DIM, 3.5), dot(T[1], DIM, 3.5), dot(T[2], DIM, 3.5), dot(T[3], DIM, 3.5),
      txt(add(mid(f1, f2), [0, 16]), "p", FNT, 12),
      txt(add(mid(f2, b2), [16, 4]), "q", FNT, 12),
      txt(add(mid(f2, f3), [16, 0]), "r", FNT, 12),
      cap(440, 320, "opposite edges equal ⇒ fits a box as face diagonals; V = pqr⁄3")
    ]);
  })()];

  DIAGRAMS["tetrahedron-centroid"] = [(() => {
    const A = [80, 272], B = [340, 258], C = [252, 200], D = [178, 60];
    const G = mul(add(add(A, B), add(C, D)), 1 / 4);
    const MD = mul(add(add(A, B), C), 1 / 3);   // centroid of face ABC (opposite D)
    return wrap(430, 322, [
      seg(A, C, FNT, 1.4, "5 4"),
      poly([A, B, D], DIM, 1.9), seg(B, C, DIM, 1.8), seg(D, C, DIM, 1.6),
      // three bimedians (midpoints of opposite edges) meeting at G
      seg(mid(A, B), mid(C, D), ACC, 1.7), seg(mid(A, C), mid(B, D), ACC, 1.7),
      seg(mid(A, D), mid(B, C), ACC, 1.7),
      // one median D → face centroid, split 3:1 at G
      seg(D, MD, GLD, 1.6, "4 3"), dot(MD, GLD, 3),
      dot(G, ACC, 4.5), txt(add(G, [13, 4]), "G", ACC, 13),
      txt(add(mid(D, G), [12, 0]), "3", GLD, 12), txt(add(mid(G, MD), [11, 2]), "1", GLD, 12),
      cap(430, 322, "medians concur at G, split 3 : 1; bimedians bisect there")
    ]);
  })()];

  // ---------- Entries from the 2023-2025 contest sweep ----------

  DIAGRAMS["conic-sections"] = [(() => {
    const cen = [215, 145], a = 150, b = 88, c = Math.sqrt(a * a - b * b);
    const F1 = [cen[0] - c, cen[1]], F2 = [cen[0] + c, cen[1]];
    const t = rad(52), Pp = [cen[0] + a * Math.cos(t), cen[1] - b * Math.sin(t)];
    return wrap(430, 300, [
      `<ellipse cx="${cen[0]}" cy="${cen[1]}" rx="${a}" ry="${b}" fill="none" stroke="${DIM}" stroke-width="2"/>`,
      dot(F1, GLD, 4.5), dot(F2, GLD, 4.5), dot(Pp, ACC, 4.5),
      dot(cen, DIM, 3), seg(cen, [cen[0], cen[1] - b], ACC, 1.5, "4 3"), txt([cen[0] + 10, cen[1] - b / 2], "b", ACC, 12),
      seg(cen, [cen[0] + a, cen[1]], DIM, 1.3, "4 3"), txt([cen[0] + a - 22, cen[1] - 8], "a", DIM, 12),
      txt([cen[0] + c / 2, cen[1] + 16], "c", GLD, 12),
      txt(add(F1, [0, 18]), "F₁", GLD, 12), txt(add(F2, [0, 18]), "F₂", GLD, 12),
      seg(Pp, F1, ACC, 1.8), seg(Pp, F2, ACC, 1.8),
      txt(add(Pp, [4, -10]), "P", ACC),
      cap(430, 300, "ellipse: PF₁ + PF₂ = 2a  (hyperbola: |PF₁ − PF₂| = 2a)")
    ]);
  })()];

  DIAGRAMS["tangency-condition"] = [(() => {
    const cen = [165, 150], r = 78;
    const T = onC(cen, r, -38);
    const dir = [-Math.sin(rad(-38)), Math.cos(rad(-38))];
    return wrap(430, 300, [
      circ(cen, r, DIM, 2), dot(cen, DIM, 3.5),
      seg(add(T, mul(dir, -130)), add(T, mul(dir, 150)), GLD, 2),
      seg(cen, T, ACC, 1.8, "4 3"), dot(T, ACC, 4), rightAngle(T, cen, add(T, mul(dir, 40)), 11, ACC),
      txt(add(mid(cen, T), [-8, -8]), "r", ACC),
      dot(cen, DIM, 3.5), txt(add(cen, [-14, 2]), "O", DIM, 12.5),
      txt(add(T, [18, 8]), "T", ACC, 12.5),
      txt(add(add(T, mul(dir, 150)), [-26, -8]), "y = mx + c", GLD, 11.5),
      cap(430, 300, "exactly one common point ⟺ distance(center, line) = r ⟺ Δ = 0")
    ]);
  })()];

  DIAGRAMS["insphere-radius"] = [(() => {
    const a = [80, 268], b = [340, 268], c = [215, 62];
    const I = incenterOf(a, b, c), f = foot(I, b, c);
    return wrap(430, 310, [
      poly([a, b, c], DIM, 2), circ(I, dist(I, foot(I, a, b)), ACC, 1.8),
      dot(I, ACC, 3.5), txt(add(I, [-14, -4]), "I", ACC, 12.5), seg(I, f, ACC, 1.8, "4 3"),
      txt(add(mid(I, f), [4, -8]), "r", ACC), rightAngle(f, I, [340, 268], 9, ACC),
      cap(430, 310, "joining the center to every face: V = ⅓ r S — the 3D twin of A = rs")
    ]);
  })()];

  DIAGRAMS["cross-section-method"] = [(() => {
    const O = [215, 158], R = 112, rt = 30;
    const c1 = onC(O, R - rt, 118), c2 = onC(O, R - rt, 62);
    return wrap(430, 320, [
      circ(O, R, DIM, 2), dot(O, DIM, 3.5),
      seg([215, 30], [215, 290], FNT, 1.3, "5 4"),
      circ(c1, rt, ACC, 1.8), circ(c2, rt, ACC, 1.8),
      dot(c1, ACC, 3), dot(c2, ACC, 3),
      txt(add(c2, [20, 4]), "r", ACC, 12),
      seg(O, lerp(O, c2, (R + 0) / dist(O, c2)), GLD, 1.6, "4 3"),
      txt(add(mid(O, c2), [16, 2]), "R − r", GLD, 11.5),
      txt([215, 22], "axis", FNT, 11),
      cap(430, 320, "slice through the axis: sphere + torus become a circle and two tube circles")
    ]);
  })()];

  // ---------- Advanced additions (radical axis, Miquel, symmedian, ...) ----------

  DIAGRAMS["radical-axis"] = [(() => {
    const c1 = [150, 160], r1c = 92, c2 = [285, 160], r2c = 70;
    // Radical axis of two circles: x = (d^2 + r1^2 - r2^2) / (2d) along the center line.
    const d = dist(c1, c2);
    const xw = (d * d + r1c * r1c - r2c * r2c) / (2 * d);
    const P0 = lerp(c1, c2, xw / d);
    return wrap(430, 320, [
      circ(c1, r1c, DIM, 1.8), circ(c2, r2c, DIM, 1.8),
      dot(c1, DIM, 3), dot(c2, DIM, 3), seg(c1, c2, FNT, 1.3, "5 4"),
      seg([P0[0], 34], [P0[0], 286], GLD, 2),
      rightAngle([P0[0], 160], [P0[0], 100], c2, 10, GLD),
      txt([P0[0] + 10, 44], "radical axis", GLD, 12, "start"),
      txt(add(c1, [-4, 16]), "O₁", DIM, 12), txt(add(c2, [6, 16]), "O₂", DIM, 12),
      cap(430, 320, "the locus of points with equal power to both circles — a line ⊥ O₁O₂ (through the common chord when they intersect)")
    ]);
  })()];

  DIAGRAMS["miquels-theorem"] = [(() => {
    const D = lerp(B, C, 0.55), E = lerp(C, A, 0.4), F = lerp(A, B, 0.45);
    const o1 = circumcenterOf(A, F, E), o2 = circumcenterOf(B, D, F), o3 = circumcenterOf(C, E, D);
    // Miquel point: second intersection of circles (BDF) and (CED).
    const [m1, m2] = circleLineInts(o2, dist(o2, D), D, add(D, perp(sub(o3, o2))));
    const M = dist(m1, D) > dist(m2, D) ? m1 : m2;
    return wrap(430, 330, [
      ABC(),
      circ(o1, dist(o1, A), ACC, 1.5), circ(o2, dist(o2, B), GLD, 1.5), circ(o3, dist(o3, C), GRN, 1.5),
      dot(D, DIM, 3.5), dot(E, DIM, 3.5), dot(F, DIM, 3.5),
      txt(add(D, [0, 17]), "D", DIM, 11.5), txt(add(E, [15, -2]), "E", DIM, 11.5), txt(add(F, [-15, -2]), "F", DIM, 11.5),
      dot(M, "var(--text)", 5),
      txt(add(M, [14, 4]), "M", "var(--text)", 13),
      cap(430, 330, "three circles, one per vertex — all through the Miquel point M")
    ]);
  })()];

  DIAGRAMS["symmedian-lemoine"] = [(() => {
    const Mm = mid(B, C);
    const c = dist(A, B), b = dist(A, C);
    const T = lerp(B, C, c / (b + c));                       // bisector foot
    const S = lerp(B, C, (c * c) / (b * b + c * c));         // symmedian foot: BD:DC = c^2:b^2
    return wrap(430, 330, [
      ABC(),
      seg(A, Mm, GLD, 1.7, "6 4"), seg(A, T, FNT, 1.5), seg(A, S, ACC, 2.2),
      dot(Mm, GLD, 3.5), dot(T, FNT, 3), dot(S, ACC, 4),
      txt(add(Mm, [8, 20]), "median", GLD, 11.5), txt(add(S, [-16, 20]), "symmedian", ACC, 11.5),
      cap(430, 330, "reflect the median over the bisector: BS : SC = c² : b²")
    ]);
  })()];

  DIAGRAMS["trig-ceva"] = [(() => {
    const P = add(add(mul(A, 0.3), mul(B, 0.38)), mul(C, 0.32));
    const D = lineInt(A, P, B, C), E = lineInt(B, P, C, A), F = lineInt(C, P, A, B);
    return wrap(430, 330, [
      ABC(), seg(A, D, ACC, 1.7), seg(B, E, ACC, 1.7), seg(C, F, ACC, 1.7),
      dot(P, GLD, 4.5),
      angleArc(A, B, P, 24, GRN), angleArc(A, P, C, 32, GLD),
      angleArc(B, C, P, 24, GRN), angleArc(B, P, A, 32, GLD),
      angleArc(C, A, P, 24, GRN), angleArc(C, P, B, 32, GLD),
      cap(430, 330, "concurrent ⟺ the product of the sine ratios of the vertex splits is 1")
    ]);
  })()];

  DIAGRAMS["erdos-mordell"] = [(() => {
    const P = add(add(mul(A, 0.35), mul(B, 0.33)), mul(C, 0.32));
    const f1 = foot(P, B, C), f2 = foot(P, C, A), f3 = foot(P, A, B);
    return wrap(430, 330, [
      ABC(),
      seg(P, A, ACC, 1.8), seg(P, B, ACC, 1.8), seg(P, C, ACC, 1.8),
      seg(P, f1, GLD, 1.7, "4 3"), seg(P, f2, GLD, 1.7, "4 3"), seg(P, f3, GLD, 1.7, "4 3"),
      dot(P, "var(--text)", 4.5), txt(add(P, [12, -6]), "P", "var(--text)"),
      txt(add(mid(P, f1), [10, 4]), "dₐ", GLD, 11), txt(add(mid(P, f2), [10, -4]), "d_b", GLD, 11), txt(add(mid(P, f3), [-12, -2]), "d_c", GLD, 11),
      cap(430, 330, "PA + PB + PC ≥ 2(dₐ + d_b + d_c) — distances to vertices vs. perpendiculars to sides")
    ]);
  })()];

  DIAGRAMS["pascals-theorem"] = [(() => {
    const cen = [225, 180], R = 115;
    // Crossed hexagon ordering keeps the three intersection points inside the circle.
    const P = [-160, -100, -50, 10, 70, 135].map(a => onC(cen, R, a));
    const H = [0, 3, 1, 5, 2, 4].map(i => P[i]);
    const X1 = lineInt(H[0], H[1], H[3], H[4]);
    const X2 = lineInt(H[1], H[2], H[4], H[5]);
    const X3 = lineInt(H[2], H[3], H[5], H[0]);
    const lab = (i, s) => txt(away(H[i], cen, 16), s, DIM, 12);
    return wrap(450, 360, [
      circ(cen, R, FNT, 1.4),
      poly(H, DIM, 1.5),
      seg(lerp(X3, X2, -0.35), lerp(X3, X2, 1.45), GLD, 2),
      dot(X1, GLD, 4.5), dot(X2, GLD, 4.5), dot(X3, GLD, 4.5),
      ...H.map((p, i) => dot(p, ACC, 3.5)),
      lab(0, "1"), lab(1, "2"), lab(2, "3"), lab(3, "4"), lab(4, "5"), lab(5, "6"),
      txt([378, 132], "Pascal line", GLD, 11.5),
      cap(450, 360, "hexagon 123456 inscribed in a circle: opposite sides (12,45), (23,56), (34,61) meet in three collinear points")
    ]);
  })()];

  DIAGRAMS["circle-inversion"] = [(() => {
    const O = [150, 168], R = 118;
    const P = [218, 168];
    const Pr = add(O, mul(norm(sub(P, O)), R * R / dist(O, P)));
    const rEnd = onC(O, R, -125);
    return wrap(460, 320, [
      circ(O, R, GLD, 1.8, GLDS, "6 4"),
      seg(O, [445, 168], FNT, 1.2),
      seg(O, rEnd, GLD, 1.6), txt(add(mid(O, rEnd), [-12, -4]), "r", GLD, 13),
      dot(O, DIM, 4), txt(add(O, [-4, 20]), "O", DIM),
      dot(P, ACC, 4.5), dot(Pr, GRN, 4.5),
      txt(add(P, [0, -12]), "P", ACC), txt(add(Pr, [4, -12]), "P′", GRN),
      seg([O[0], 186], [P[0], 186], ACC, 1.4), txt([mid(O, P)[0], 202], "OP", ACC, 11.5),
      seg([O[0], 216], [Pr[0], 216], GRN, 1.4), txt([mid(O, Pr)[0], 232], "OP′", GRN, 11.5),
      cap(460, 320, "P′ lies on ray OP with OP · OP′ = r² — the inside of the circle swaps with the outside")
    ]);
  })()];

  DIAGRAMS["homothety-monge"] = [(() => {
    const c1 = [85, 175], r1c = 60, c2 = [240, 140], r2c = 30, c3 = [330, 205], r3c = 16;
    // External similitude center of circles i, j divides the center line externally in ratio ri : rj.
    const ext = (ca, ra, cb, rb) => mul(sub(mul(cb, ra), mul(ca, rb)), 1 / (ra - rb));
    const X12 = ext(c1, r1c, c2, r2c), X13 = ext(c1, r1c, c3, r3c), X23 = ext(c2, r2c, c3, r3c);
    const [t1a, t1b] = tangentPoints(c1, r1c, X12);
    return wrap(480, 330, [
      seg(X12, lerp(X12, t1a, 1.22), FNT, 1.2, "5 4"),
      seg(X12, lerp(X12, t1b, 1.22), FNT, 1.2, "5 4"),
      circ(c1, r1c, DIM, 1.8), circ(c2, r2c, DIM, 1.8), circ(c3, r3c, DIM, 1.8),
      dot(c1, DIM, 3.5), dot(c2, DIM, 3.5), dot(c3, DIM, 3.5),
      txt(add(c1, [0, 5]), "O₁", DIM, 12), txt(add(c2, [0, 5]), "O₂", DIM, 12), txt(add(c3, [0, 4]), "O₃", DIM, 11),
      seg(c1, onC(c1, r1c, 210), ACC, 1.5), txt(add(mid(c1, onC(c1, r1c, 210)), [-10, -4]), "r₁", ACC, 11.5),
      seg(c2, onC(c2, r2c, 230), ACC, 1.5), txt(add(mid(c2, onC(c2, r2c, 230)), [-9, -4]), "r₂", ACC, 11.5),
      seg(lerp(X12, X23, -0.1), lerp(X12, X23, 1.14), GLD, 2),
      dot(X12, GLD, 4.5), dot(X13, GLD, 4.5), dot(X23, GLD, 4.5),
      txt(add(X12, [2, -12]), "X₁₂", GLD, 12), txt(add(X13, [16, -6]), "X₁₃", GLD, 12), txt(add(X23, [14, 12]), "X₂₃", GLD, 12),
      cap(480, 330, "X₁₂ = meeting point of the external tangents of circles 1 and 2 (their external similitude center); Monge: X₁₂, X₁₃, X₂₃ are collinear")
    ]);
  })()];

  // ---------- Gap-scan additions ----------

  DIAGRAMS["shared-angle-area-ratio"] = [(() => {
    const X = lerp(A, B, 0.55), Y = lerp(A, C, 0.7);
    return wrap(430, 320, [
      poly([A, X, Y], "none", 0, ACCS), ABC(),
      seg(X, Y, ACC, 2), dot(X, ACC, 3.8), dot(Y, ACC, 3.8),
      txt(add(X, [-16, 0]), "X", ACC), txt(add(Y, [16, 0]), "Y", ACC),
      cap(430, 320, "[AXY] / [ABC] = (AX/AB) · (AY/AC) — same angle at A")
    ]);
  })()];

  DIAGRAMS["exradii"] = [(() => {
    const a2 = [210, 60], b2 = [150, 150], c2 = [290, 150];
    const la = dist(b2, c2), lb = dist(c2, a2), lc = dist(a2, b2);
    const s = -la + lb + lc;
    const Ia = [(-la * a2[0] + lb * b2[0] + lc * c2[0]) / s, (-la * a2[1] + lb * b2[1] + lc * c2[1]) / s];
    const ra = dist(Ia, foot(Ia, b2, c2));
    return wrap(430, 480, [
      poly([a2, b2, c2], DIM, 2),
      seg(b2, lerp(a2, b2, 2.6), FNT, 1.3, "5 4"), seg(c2, lerp(a2, c2, 2.6), FNT, 1.3, "5 4"),
      circ(Ia, ra, ACC, 1.8), dot(Ia, ACC, 3.5),
      seg(Ia, foot(Ia, b2, c2), ACC, 1.6, "4 3"),
      txt(add(mid(Ia, foot(Ia, b2, c2)), [14, 0]), "rₐ", ACC),
      txt(add(Ia, [18, -6]), "Iₐ", ACC, 12),
      txt(add(b2, [-13, 0]), "B", DIM, 12.5), txt(add(c2, [13, 0]), "C", DIM, 12.5),
      txt(add(a2, [0, -12]), "A"),
      cap(430, 480, "the A-excircle (radius rₐ) touches BC and the two side extensions; A = rₐ(s − a), and r_b, r_c sit opposite B, C likewise")
    ]);
  })()];

  DIAGRAMS["ratio-lemma"] = [(() => {
    const D = lerp(B, C, 0.42);
    return wrap(430, 330, [
      ABC(), seg(A, D, ACC, 2), dot(D, ACC, 3.5), txt(add(D, [0, 20]), "D", ACC),
      angleArc(A, B, D, 26, GLD), angleArc(A, D, C, 34, GRN),
      txt(add(A, [-16, 40]), "α", GLD, 12.5), txt(add(A, [18, 46]), "β", GRN, 12.5),
      txt(add(mid(B, D), [0, 18]), "BD", DIM, 11.5), txt(add(mid(D, C), [0, 18]), "DC", DIM, 11.5),
      cap(430, 330, "BD/DC = (AB/AC) · (sin α / sin β)")
    ]);
  })()];

  DIAGRAMS["incenter-excenter-lemma"] = [(() => {
    const A2 = [190, 58], B2 = [85, 225], C2 = [325, 235];
    const cen2 = centroidOf(A2, B2, C2);
    const O = circumcenterOf(A2, B2, C2), R = dist(O, A2);
    const I = incenterOf(A2, B2, C2);
    const [p1, p2] = circleLineInts(O, R, A2, I);
    const M = dist(p1, A2) > dist(p2, A2) ? p1 : p2;
    const vl = (p, s) => txt(add(away(p, cen2, 16), [0, 4.5]), s, DIM, 13);
    return wrap(450, 480, [
      circ(O, R, FNT, 1.4), poly([A2, B2, C2], DIM, 2),
      vl(A2, "A"), vl(B2, "B"), vl(C2, "C"),
      seg(A2, M, ACC, 1.6, "5 4"),
      circ(M, dist(M, B2), GLD, 1.6, "none", "6 4"),
      seg(M, B2, GLD, 1.4, "3 4"), seg(M, I, GLD, 1.4, "3 4"),
      dot(I, ACC, 4.5), dot(M, GLD, 4.5), dot(sub(mul(M, 2), I), GLD, 4.5),
      txt(add(I, [-14, -4]), "I", ACC), txt(add(M, [-2, 20]), "M", GLD),
      txt(add(sub(mul(M, 2), I), [18, 6]), "I_A", GLD, 12),
      cap(450, 480, "M = arc midpoint of BC on line AI, and MB = MC = MI: the gold circle through B, I, C is centered at M")
    ]);
  })()];

  DIAGRAMS["orthocenter-properties"] = [(() => {
    const O = circumcenterOf(A, B, C), R = dist(O, A);
    const H = orthocenterOf(A, B, C);
    const Hr = sub(mul(foot(H, B, C), 2), H);
    return wrap(440, 400, [
      circ(O, R, FNT, 1.4), ABC(),
      seg(A, foot(A, B, C), FNT, 1.3, "4 3"), seg(B, foot(B, C, A), FNT, 1.3, "4 3"),
      dot(H, ACC, 4.5), txt(add(H, [14, -4]), "H", ACC),
      dot(O, GLD, 4), txt(add(O, [12, 14]), "O", GLD),
      seg(O, mid(B, C), GLD, 1.6), dot(mid(B, C), GLD, 3.5), txt(add(mid(B, C), [0, 17]), "M", GLD, 12),
      seg(H, Hr, GLD, 1.6, "5 4"), dot(Hr, GLD, 4.5), txt(add(Hr, [14, 4]), "H′", GLD),
      cap(440, 400, "AH = 2·OM = 2R cos A (M = midpoint of BC), and reflecting H over BC lands on the circumcircle")
    ]);
  })()];

  DIAGRAMS["fermat-point"] = [(() => {
    const apex = (P, Q, opp) => {
      const m = mid(P, Q), off = mul(norm(perp(sub(Q, P))), Math.sqrt(3) / 2 * dist(P, Q));
      const cand1 = add(m, off), cand2 = sub(m, off);
      return dist(cand1, opp) > dist(cand2, opp) ? cand1 : cand2;
    };
    const Ebc = apex(B, C, A), Eca = apex(C, A, B);
    const F = lineInt(A, Ebc, B, Eca);
    return wrap(430, 330, [
      ABC(), seg(F, A, ACC, 2), seg(F, B, ACC, 2), seg(F, C, ACC, 2),
      dot(F, GLD, 5), txt(add(F, [14, -6]), "X", GLD),
      angleArc(F, A, B, 20, GRN), angleArc(F, B, C, 20, GRN), angleArc(F, C, A, 20, GRN),
      cap(430, 330, "the three 120° angles at F minimize FA + FB + FC")
    ]);
  })()];

  DIAGRAMS["point-plane-distance"] = [(() => {
    const p1 = [80, 235], p2 = [225, 172], p3 = [390, 212], p4 = [245, 275];
    const Q = [240, 62], Ff = [237, 222];
    return wrap(430, 330, [
      poly([p1, p2, p3, p4], DIM, 1.8, "rgba(255,255,255,0.03)"),
      dot(Q, GLD, 4.5), txt(add(Q, [22, 0]), "P", GLD),
      seg(Q, Ff, ACC, 2, "5 4"), dot(Ff, ACC, 3.5),
      rightAngle(Ff, Q, p3, 11, ACC),
      txt(add(mid(Q, Ff), [14, 0]), "d", ACC, 14),
      txt([120, 262], "ax + by + cz + d₀ = 0", DIM, 12),
      cap(430, 330, "d = |ax₀ + by₀ + cz₀ + d₀| / √(a² + b² + c²)")
    ]);
  })()];

  DIAGRAMS["ravi-substitution"] = [(() => {
    const I = incenterOf(A, B, C);
    const fa = foot(I, B, C), fb = foot(I, C, A), fc = foot(I, A, B);
    return wrap(430, 330, [
      ABC(), circ(I, dist(I, fa), FNT, 1.5),
      seg(A, fc, ACC, 3), seg(A, fb, ACC, 3),
      seg(B, fc, GLD, 3), seg(B, fa, GLD, 3),
      seg(C, fa, GRN, 3), seg(C, fb, GRN, 3),
      txt(add(mid(A, fc), [-14, 0]), "x", ACC, 13), txt(add(mid(A, fb), [16, 0]), "x", ACC, 13),
      txt(add(mid(B, fc), [-14, 0]), "y", GLD, 13), txt(add(mid(B, fa), [0, 18]), "y", GLD, 13),
      txt(add(mid(C, fb), [18, 0]), "z", GRN, 13), txt(add(mid(C, fa), [0, 18]), "z", GRN, 13),
      cap(430, 330, "a = y + z, b = z + x, c = x + y — positivity replaces the triangle inequality")
    ]);
  })()];

  // ---------- "Sometimes useful" additions ----------

  DIAGRAMS["center-distance-formulas"] = [(() => {
    const O = circumcenterOf(A, B, C), G = centroidOf(A, B, C), H = orthocenterOf(A, B, C);
    return wrap(430, 330, [
      ABC(), seg(lerp(O, H, -0.3), lerp(O, H, 1.3), FNT, 1.5, "6 4"),
      dot(O, GLD, 4.5), dot(G, ACC, 4.5), dot(H, GRN, 4.5),
      txt(add(O, [0, 22]), "O", GLD), txt(add(G, [4, -12]), "G", ACC), txt(add(H, [-2, -12]), "H", GRN),
      cap(430, 330, "OH² = 9R² − (a² + b² + c²),  OG = OH/3")
    ]);
  })()];

  DIAGRAMS["feuerbach-theorem"] = [(() => {
    const O = circumcenterOf(A, B, C), H = orthocenterOf(A, B, C);
    const N = mid(O, H), R9 = dist(O, A) / 2;
    const I = incenterOf(A, B, C), r = dist(I, foot(I, B, C));
    const T = add(N, mul(norm(sub(I, N)), R9));
    return wrap(430, 340, [
      ABC(), circ(N, R9, ACC, 1.8), circ(I, r, GLD, 1.8),
      dot(N, ACC, 3.5), dot(I, GLD, 3.5), dot(T, GRN, 4.5),
      txt(add(N, [-4, -10]), "N", ACC), txt(add(I, [-14, 6]), "I", GLD),
      cap(430, 340, "the nine-point circle is internally tangent to the incircle: NI = R/2 − r")
    ]);
  })()];

  DIAGRAMS["leibniz-formula"] = [(() => {
    const G = centroidOf(A, B, C), P = [262, 128];
    return wrap(430, 330, [
      ABC(), dot(G, GLD, 4.5), txt(add(G, [-4, 20]), "G", GLD),
      dot(P, GRN, 4.5), txt(add(P, [14, -4]), "P", GRN),
      seg(P, A, ACC, 1.6), seg(P, B, ACC, 1.6), seg(P, C, ACC, 1.6),
      seg(P, G, GLD, 1.8, "5 3"),
      cap(430, 330, "PA² + PB² + PC² = 3·PG² + (a² + b² + c²)/3")
    ]);
  })()];

  DIAGRAMS["incenter-coordinates"] = [(() => {
    const o = [90, 290], sc = 50;
    const map = (x, y) => [o[0] + sc * x, o[1] - sc * y];
    const Cc = map(0, 0), Bb = map(4, 0), Aa = map(0, 3), I = map(1, 1);
    const grid = [];
    for (let x = 0; x <= 5; x++) grid.push(seg(map(x, -0.3), map(x, 3.4), "rgba(255,255,255,0.05)", 1));
    for (let y = 0; y <= 3; y++) grid.push(seg(map(-0.3, y), map(5.4, y), "rgba(255,255,255,0.05)", 1));
    return wrap(430, 340, [
      ...grid, poly([Aa, Bb, Cc], DIM, 2), circ(I, sc, ACC, 1.6),
      dot(I, ACC, 4.5), txt(add(I, [26, -6]), "I = (1, 1)", ACC, 12.5),
      txt(add(Aa, [-16, 0]), "(0,3)", DIM, 11.5), txt(add(Bb, [8, 18]), "(4,0)", DIM, 11.5),
      txt(add(Cc, [-14, 18]), "(0,0)", DIM, 11.5),
      cap(430, 340, "I = (aA + bB + cC)/(a + b + c) — here (4A + 3B + 5C)/12 = (1, 1)")
    ]);
  })()];

  DIAGRAMS["law-of-tangents"] = [(() => wrap(430, 320, [
    ABC(),
    angleArc(A, B, C, 26, GLD), txt(add(A, [0, 36]), "A", GLD, 12.5),
    angleArc(B, C, A, 26, GRN), txt(add(B, [30, -10]), "B", GRN, 12.5),
    txt(add(mid(B, C), [0, 20]), "a", ACC), txt(add(mid(C, A), [16, -2]), "b", ACC),
    cap(430, 320, "(a − b)/(a + b) = tan((A−B)/2) / tan((A+B)/2)")
  ]))()];

  DIAGRAMS["napoleons-theorem"] = [(() => {
    const ctr = (P, Q, opp) => {
      const m = mid(P, Q), off = mul(norm(perp(sub(Q, P))), dist(P, Q) / (2 * Math.sqrt(3)));
      const c1 = add(m, off), c2 = sub(m, off);
      return dist(c1, opp) > dist(c2, opp) ? c1 : c2;
    };
    const n1 = ctr(B, C, A), n2 = ctr(C, A, B), n3 = ctr(A, B, C);
    return wrap(440, 400, [
      ABC(), poly([n1, n2, n3], GLD, 2, GLDS),
      dot(n1, GLD, 4), dot(n2, GLD, 4), dot(n3, GLD, 4),
      cap(440, 400, "centers of outward equilateral triangles form an equilateral triangle")
    ]);
  })()];

  DIAGRAMS["cyclic-quad-radius"] = [wrap(430, 340, [
    circ(QCEN, QR, FNT, 1.5), poly([QA, QB, QC2, QD], DIM, 2),
    dot(QCEN, GLD, 3.5), seg(QCEN, QA, GLD, 1.8, "5 4"),
    txt(add(mid(QCEN, QA), [14, 0]), "R", GLD),
    txt(add(mid(QA, QB), [8, -8]), "a", DIM, 12), txt(add(mid(QB, QC2), [14, 0]), "b", DIM, 12),
    txt(add(mid(QC2, QD), [0, 16]), "c", DIM, 12), txt(add(mid(QD, QA), [-14, 0]), "d", DIM, 12),
    cap(430, 340, "R = √((ab+cd)(ac+bd)(ad+bc)) / (4K)")
  ])];

  DIAGRAMS["van-aubel"] = [(() => {
    const q = [[185, 185], [258, 178], [268, 236], [178, 248]];
    const cen0 = mul(add(add(q[0], q[1]), add(q[2], q[3])), 0.25);
    const parts = [], ctrs = [];
    for (let i = 0; i < 4; i++) {
      const P = q[i], Q = q[(i + 1) % 4], L = dist(P, Q);
      let n = mul(norm(perp(sub(Q, P))), L);
      if (dist(add(mid(P, Q), n), cen0) < dist(sub(mid(P, Q), n), cen0)) n = mul(n, -1);
      const c1 = add(P, n), c2 = add(Q, n);
      parts.push(poly([P, Q, c2, c1], FNT, 1.3));
      ctrs.push(add(mid(P, Q), mul(n, 0.5)));
    }
    return wrap(450, 400, [
      ...parts, poly(q, DIM, 2),
      seg(ctrs[0], ctrs[2], ACC, 2), seg(ctrs[1], ctrs[3], GLD, 2),
      ...ctrs.map((c, i) => dot(c, i % 2 ? GLD : ACC, 4)),
      txt(add(ctrs[0], [0, -10]), "P", ACC, 12.5), txt(add(ctrs[1], [14, 0]), "Q", GLD, 12.5),
      txt(add(ctrs[2], [0, 15]), "R", ACC, 12.5), txt(add(ctrs[3], [-14, 0]), "S", GLD, 12.5),
      cap(450, 400, "P, Q, R, S = centers of the outward squares: PR = QS and PR ⊥ QS")
    ]);
  })()];

  // ---------- Geometry gap-check additions ----------

  DIAGRAMS["intercept-theorem"] = [(() => {
    const D = lerp(A, B, 0.4), E = lerp(A, C, 0.4);
    return wrap(430, 320, [
      ABC(), seg(D, E, ACC, 2.2), dot(D, ACC, 3.8), dot(E, ACC, 3.8),
      txt(add(D, [-16, 0]), "D", ACC), txt(add(E, [16, 0]), "E", ACC),
      cap(430, 320, "DE ∥ BC  ⟺  AD/DB = AE/EC")
    ]);
  })()];

  DIAGRAMS["trapezoid-special-segments"] = [(() => {
    const a = 90, b = 260, yT = 80, yB = 270;
    const TL = [215 - a / 2, yT], TR = [215 + a / 2, yT], BL = [215 - b / 2, yB], BR = [215 + b / 2, yB];
    const segAt = t => [lerp(BL, TL, t), lerp(BR, TR, t)];
    const tFor = L => (L - b) / (a - b);
    const hm = 2 * a * b / (a + b), gm = Math.sqrt(a * b), am = (a + b) / 2, qm = Math.sqrt((a * a + b * b) / 2);
    const mk = (L, c, label) => {
      const pq = segAt(tFor(L));
      return seg(pq[0], pq[1], c, 2) + txt(add(pq[1], [34, 4]), label, c, 11);
    };
    return wrap(470, 350, [
      poly([TL, TR, BR, BL], DIM, 2),
      seg(TL, BR, FNT, 1.2, "4 4"), seg(TR, BL, FNT, 1.2, "4 4"),
      mk(qm, GRN, "QM"), mk(am, ACC, "AM"), mk(gm, GLD, "GM"), mk(hm, "var(--level-oly)", "HM"),
      cap(470, 350, "four parallel segments, one per mean of the bases — in mean-inequality order")
    ]);
  })()];

  DIAGRAMS["circular-segment"] = [(() => {
    const cen = [210, 165], R = 120, a1 = -30, a2 = 90;
    const p1 = onC(cen, R, a1), p2 = onC(cen, R, a2);
    return wrap(430, 330, [
      circ(cen, R, FNT, 1.5),
      `<path d="M ${pf(p1)} A ${R} ${R} 0 0 1 ${pf(p2)} Z" fill="${ACCS}" stroke="${ACC}" stroke-width="2"/>`,
      seg(cen, p1, FNT, 1.3, "4 3"), seg(cen, p2, FNT, 1.3, "4 3"),
      seg(p1, p2, ACC, 1.8), txt(add(mid(p1, p2), [14, 10]), "c", ACC, 12.5),
      angleArc(cen, p1, p2, 30, GLD), txt(onC(cen, 48, 30), "θ", GLD),
      txt(add(mid(cen, p2), [-16, -2]), "r", FNT, 12.5), dot(cen, DIM, 3),
      cap(430, 330, "shaded segment = sector − triangle = ½r²(θ − sin θ); chord c = 2r sin(θ/2)")
    ]);
  })()];

  DIAGRAMS["cyclic-quad-diagonals"] = [wrap(430, 340, [
    circ(QCEN, QR, FNT, 1.5), poly([QA, QB, QC2, QD], DIM, 2),
    seg(QA, QC2, ACC, 2), seg(QB, QD, GLD, 2),
    txt(add(lerp(QA, QC2, 0.3), [12, 4]), "p", ACC, 13), txt(add(lerp(QB, QD, 0.3), [0, -8]), "q", GLD, 13),
    txt(add(mid(QA, QB), [8, -8]), "a", DIM, 12), txt(add(mid(QB, QC2), [14, 0]), "b", DIM, 12),
    txt(add(mid(QC2, QD), [0, 16]), "c", DIM, 12), txt(add(mid(QD, QA), [-14, 0]), "d", DIM, 12),
    cap(430, 340, "p/q = (ad+bc)/(ab+cd) — with Ptolemy's pq = ac+bd, both diagonals follow")
  ])];

  DIAGRAMS["angle-between-lines"] = [(() => {
    const P = [110, 250];
    const q1 = add(P, [280, -140]), q2 = add(P, [270, -90]);
    return wrap(430, 300, [
      seg(P, q1, ACC, 2), seg(P, q2, GLD, 2),
      angleArc(P, q1, q2, 60, GRN), txt(add(P, [80, -28]), "θ", GRN, 13),
      txt(add(q1, [-30, -8]), "slope m₁", ACC, 11.5), txt(add(q2, [-28, 16]), "slope m₂", GLD, 11.5),
      cap(430, 300, "tan θ = |(m₁ − m₂) / (1 + m₁m₂)|")
    ]);
  })()];

  DIAGRAMS["reflection-coordinates"] = [(() => {
    const L1 = [60, 265], L2 = [390, 105];
    const P = [150, 100];
    const f = foot(P, L1, L2), Pr = sub(mul(f, 2), P);
    return wrap(430, 330, [
      seg(L1, L2, DIM, 2),
      dot(P, ACC, 4.5), dot(Pr, GLD, 4.5), dot(f, DIM, 3),
      seg(P, Pr, FNT, 1.4, "5 4"), rightAngle(f, P, L2, 10, FNT),
      txt(add(P, [-14, 0]), "P", ACC), txt(add(Pr, [16, 0]), "P′", GLD),
      txt(add(f, [16, -6]), "M", DIM, 12), txt(add(L2, [-30, -10]), "ℓ", DIM, 13),
      cap(430, 330, "reflect P over line ℓ: the foot M is the midpoint of PP′ — step twice the signed distance along the normal (a, b)")
    ]);
  })()];

  DIAGRAMS["skew-lines-distance"] = [wrap(430, 320, [
    seg([50, 210], [390, 250], ACC, 2),
    seg([120, 60], [360, 140], GLD, 2),
    seg([215, 229], [232, 97], GRN, 2, "6 4"),
    dot([215, 229], GRN, 3.5), dot([232, 97], GRN, 3.5),
    txt([240, 168], "d", GRN, 14),
    txt([70, 195], "line 1", ACC, 11.5), txt([130, 50], "line 2", GLD, 11.5),
    cap(430, 320, "project P₂ − P₁ onto the common perpendicular d₁ × d₂")
  ])];

  DIAGRAMS["isoperimetric-facts"] = [(() => {
    const s = 110, rw = 170, rh = 50;
    return wrap(430, 300, [
      poly([[70, 90], [70 + s, 90], [70 + s, 90 + s], [70, 90 + s]], ACC, 2, ACCS),
      poly([[240, 120], [240 + rw, 120], [240 + rw, 120 + rh], [240, 120 + rh]], GLD, 2, GLDS),
      txt([70 + s / 2, 90 + s / 2 + 4], "25", ACC, 15), txt([240 + rw / 2, 120 + rh / 2 + 4], "21", GLD, 15),
      txt([70 + s / 2, 232], "5 × 5", DIM, 12), txt([240 + rw / 2, 195], "7 × 3", DIM, 12),
      cap(430, 300, "same perimeter 20 — the square wins: symmetric shapes maximize area")
    ]);
  })()];

  DIAGRAMS["solid-tactics"] = [(() => {
    const o = [100, 250], w = 180, hh = 110, dx = 60, dy = 45;
    const f = [o, [o[0] + w, o[1]], [o[0] + w, o[1] - hh], [o[0], o[1] - hh]];
    const bk = f.map(p => [p[0] + dx, p[1] - dy]);
    return wrap(430, 320, [
      poly([f[0], f[1], bk[2], bk[3]], ACC, 1.6, ACCS),
      seg(f[0], bk[0], FNT, 1.3, "4 3"), seg(bk[0], bk[1], FNT, 1.3, "4 3"), seg(bk[0], bk[3], FNT, 1.3, "4 3"),
      poly(f, DIM, 1.8),
      seg(f[1], bk[1], DIM, 1.8), seg(f[2], bk[2], DIM, 1.8), seg(f[3], bk[3], DIM, 1.8),
      seg(bk[1], bk[2], DIM, 1.8), seg(bk[2], bk[3], DIM, 1.8),
      txt(mid(mid(f[0], bk[2]), mid(f[1], bk[3])), "slice", ACC, 12.5),
      cap(430, 320, "slice, coordinatize, unfold, or recount the volume — one of the four always works")
    ]);
  })()];

  DIAGRAMS["angle-chasing"] = [(() => {
    // The 36-72-72 golden-gnomon chase: bisect angle B, then every angle follows.
    const B2 = [130, 290], C2 = [270, 290];
    const A2 = [200, 290 - 70 * Math.tan(rad(72))];
    const bis = [Math.cos(rad(-36)), Math.sin(rad(-36))];
    const D2 = lineInt(B2, add(B2, bis), A2, C2);
    return wrap(430, 340, [
      poly([A2, B2, C2], DIM, 2),
      seg(B2, D2, ACC, 2),
      angleArc(A2, B2, C2, 26, GLD), txt(add(A2, [2, 40]), "36°", GLD, 11.5),
      angleArc(B2, C2, D2, 30, ACC), txt(add(B2, [40, -8]), "36°", ACC, 11),
      angleArc(B2, D2, A2, 44, ACC), txt(add(B2, [30, -38]), "36°", ACC, 11),
      angleArc(C2, D2, B2, 26, GLD), txt(add(C2, [-24, -18]), "72°", GLD, 11.5),
      angleArc(D2, B2, C2, 22, GRN), txt(add(D2, [-8, 30]), "72°", GRN, 11.5),
      dot(D2, ACC, 3.5),
      txt(add(A2, [0, -10]), "A", DIM, 12.5), txt(add(B2, [-13, 6]), "B", DIM, 12.5),
      txt(add(C2, [13, 6]), "C", DIM, 12.5), txt(add(D2, [14, -4]), "D", ACC, 12.5),
      cap(430, 340, "label ∠A = 36° and push: base angles 72°, the bisector makes 36°, so ∠BDC = 72° — triangle BDC is isosceles (BD = BC)")
    ]);
  })()];

  DIAGRAMS["section-formula"] = [(() => {
    const A = [65, 235], B = [375, 120];
    const P = lerp(A, B, 0.25);
    return wrap(440, 300, [
      seg(A, B, DIM, 2),
      dot(A, ACC, 5), dot(B, ACC, 5), dot(P, GLD, 5.5),
      txt(add(A, [-14, 4]), "A", ACC, 13), txt(add(B, [15, 4]), "B", ACC, 13),
      txt(add(P, [0, -14]), "P", GLD, 13),
      txt(add(mid(A, P), [0, 20]), "m = 1", DIM, 12),
      txt(add(mid(P, B), [0, 20]), "n = 3", DIM, 12),
      cap(440, 300, "P divides AB with AP : PB = m : n, so P = (m·B + n·A)/(m + n) — here a quarter of the way from A to B")
    ]);
  })()];

  DIAGRAMS["vector-dot-product"] = [(() => {
    const O = [90, 250], U = [300, 175], V = [210, 80];
    const f = foot(U, O, V);
    return wrap(440, 300, [
      seg(O, V, GLD, 2.5), seg(O, U, ACC, 2.5),
      seg(U, f, FNT, 1.3, "4 3"), rightAngle(f, U, O, 9, FNT),
      seg(O, f, GRN, 2.5),
      dot(O, DIM, 4),
      txt(add(U, [16, 4]), "u", ACC, 14), txt(add(V, [-2, -10]), "v", GLD, 14),
      angleArc(O, U, V, 32, DIM), txt([152, 202], "θ", DIM, 13),
      txt(add(mid(O, f), [-6, 16]), "proj", GRN, 11),
      cap(440, 300, "u · v = |u||v| cos θ: positive for an acute θ, zero when u ⊥ v; the green segment is u's projection onto v")
    ]);
  })()];

  DIAGRAMS["cavalieris-principle"] = [(() => {
    const bw = 92, bh = 40, n = 4, y0 = 250;
    const stack = (x0, shear) => {
      const parts = [];
      for (let i = 0; i < n; i++) {
        const y = y0 - (i + 1) * bh, dx = shear * i, hl = i === 1;
        parts.push(`<rect x="${x0 + dx}" y="${y}" width="${bw}" height="${bh - 2}" fill="${hl ? ACCS : "none"}" stroke="${hl ? ACC : DIM}" stroke-width="${hl ? 2.2 : 1.6}"/>`);
      }
      return parts;
    };
    const ySlice = y0 - 2 * bh + (bh - 2) / 2;
    return wrap(440, 300, [
      ...stack(66, 0), ...stack(262, 16),
      seg([66, ySlice], [400, ySlice], GLD, 1.2, "5 4"),
      txt([214, ySlice - 8], "equal area", GLD, 11),
      txt([112, 274], "upright", DIM, 12), txt([330, 274], "sheared", DIM, 12),
      cap(440, 300, "same slice area at every height ⇒ same volume: shearing the stack moves no cross-section, so V = Bh is unchanged")
    ]);
  })()];

  DIAGRAMS["coordinate-bash"] = [(() => {
    const B = [80, 250], C = [360, 250], A = [180, 92];
    return wrap(440, 300, [
      seg([48, 250], [422, 250], FNT, 1.2), seg([80, 276], [80, 58], FNT, 1.2),
      poly([A, B, C], DIM, 2, ACCS),
      dot(B, GLD, 4.5), dot(C, GLD, 4.5), dot(A, GLD, 4.5),
      txt([64, 268], "B (0, 0)", DIM, 12, "start"),
      txt(add(C, [8, 18]), "C (a, 0)", DIM, 12, "start"),
      txt(add(A, [0, -12]), "A (x, y)", DIM, 12),
      cap(440, 300, "put a vertex at the origin and a side on the x-axis: B = (0,0), C = (a,0), A = (x,y), then distance / shoelace / slopes finish it")
    ]);
  })()];

  DIAGRAMS["auxiliary-lines"] = [(() => {
    const sc = 22, y0 = 240;
    const BL = [96, y0], BR = [96 + 11 * sc, y0];
    const TL = [96 + 3 * sc, y0 - 4 * sc], TR = [96 + 8 * sc, y0 - 4 * sc];
    const F1 = [TL[0], y0], F2 = [TR[0], y0];
    return wrap(440, 300, [
      poly([BL, BR, TR, TL], DIM, 2),
      seg(TL, F1, ACC, 1.8, "5 4"), seg(TR, F2, ACC, 1.8, "5 4"),
      rightAngle(F1, TL, BR, 9, ACC), rightAngle(F2, TR, BL, 9, ACC),
      txt(add(mid(BL, F1), [0, 18]), "3", DIM, 12),
      txt(add(mid(F1, F2), [0, 18]), "5", DIM, 12),
      txt(add(mid(F2, BR), [0, 18]), "3", DIM, 12),
      txt(add(mid(TL, F1), [-16, 2]), "h = 4", ACC, 12),
      txt(add(mid(BL, TL), [-14, 2]), "5", DIM, 12),
      txt(add(mid(TL, TR), [0, -10]), "5", DIM, 12),
      cap(440, 300, "drop perpendiculars from the short base: the base 11 splits 3 + 5 + 3, so h = √(5² − 3²) = 4 and A = ½(11 + 5)(4) = 32")
    ]);
  })()];

  DIAGRAMS["trig-bash"] = [(() => {
    const A2 = [180, 62], B2 = [72, 262], C2 = [340, 262];
    const O = circumcenterOf(A2, B2, C2), R = dist(O, A2);
    const cen2 = centroidOf(A2, B2, C2);
    const vl = (p, s) => txt(add(away(p, cen2, 16), [0, 4.5]), s, DIM, 13);
    return wrap(440, 390, [
      circ(O, R, FNT, 1.3), poly([A2, B2, C2], DIM, 2),
      vl(A2, "A"), vl(B2, "B"), vl(C2, "C"),
      angleArc(C2, A2, B2, 30, ACC), txt(add(C2, [-34, -14]), "θ", ACC, 13),
      txt(add(mid(B2, C2), [0, 18]), "a", GLD, 12.5),
      txt(add(mid(C2, A2), [20, -2]), "b", GLD, 12.5),
      txt(add(mid(A2, B2), [-20, -2]), "c", GLD, 12.5),
      dot(O, ACC, 4), seg(O, A2, ACC, 1.5, "5 4"),
      txt(add(mid(O, A2), [13, 0]), "R", ACC, 12),
      cap(440, 390, "name one angle θ, then a/sin θ = 2R and c² = a² + b² − 2ab cos θ turn the whole figure into one equation in θ")
    ]);
  })()];

  DIAGRAMS["complex-bash"] = [(() => {
    const P = [215, 195], Z = [330, 195];
    const th = rad(-70), v = sub(Z, P);
    const W = add(P, [v[0] * Math.cos(th) - v[1] * Math.sin(th), v[0] * Math.sin(th) + v[1] * Math.cos(th)]);
    return wrap(440, 330, [
      seg([45, 288], [425, 288], FNT, 1.2), seg([80, 315], [80, 50], FNT, 1.2),
      txt([414, 305], "Re", FNT, 11), txt([97, 60], "Im", FNT, 11),
      circ(P, dist(P, Z), FNT, 1.1, "none", "4 4"),
      seg(P, Z, ACC, 2.2), seg(P, W, GLD, 2.2),
      dot(P, DIM, 4.5), dot(Z, ACC, 5), dot(W, GLD, 5),
      txt(add(P, [-13, 16]), "p", DIM, 13),
      txt(add(Z, [15, 6]), "z", ACC, 13.5),
      txt(add(W, [14, -6]), "w", GLD, 13.5),
      angleArc(P, Z, W, 40, GLD), txt(add(P, [48, -20]), "θ", GLD, 12.5),
      cap(440, 330, "rotating z about p by θ is a single multiplication: w = p + e^(iθ)(z − p) — the dashed circle shows |z − p| is preserved")
    ]);
  })()];

  // Guard: warn on any NaN coordinates (a construction bug would show here).
  Object.keys(DIAGRAMS).forEach(k => {
    DIAGRAMS[k].forEach(s => {
      if (s.indexOf("NaN") !== -1 && typeof console !== "undefined") console.warn("NaN in diagram: " + k);
    });
  });
})();
