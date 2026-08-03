// Computed SVG diagrams for Algebra, Counting, and Number Theory detail pages.
// Same conventions as geometry-diagrams.js: exact constructions, HTML captions
// extracted via the CAPMARK marker so they never collide with the drawing.
(function () {
  const DIAGRAMS = window.MATH_DIAGRAMS = window.MATH_DIAGRAMS || {};

  const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
  const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const rad = deg => deg * Math.PI / 180;
  const onC = (c, r, deg) => [c[0] + r * Math.cos(rad(deg)), c[1] + r * Math.sin(rad(deg))];

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
  const rect = (x, y, w, h, c = DIM, sw = 2, fill = "none") =>
    `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" fill="${fill}" stroke="${c}" stroke-width="${sw}"/>`;
  const poly = (pts, c = DIM, w = 2, fill = "none") =>
    `<polygon points="${pts.map(pf).join(" ")}" fill="${fill}" stroke="${c}" stroke-width="${w}"/>`;
  const txt = (p, s, c = DIM, size = 13, anchor = "middle") =>
    `<text x="${r1(p[0])}" y="${r1(p[1])}" fill="${c}" font-size="${size}" text-anchor="${anchor}">${s}</text>`;
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

  // ---------- Algebra ----------

  // AM–GM: semicircle over a + b; radius = AM, half-chord at the joint = GM.
  DIAGRAMS["am-gm"] = [(() => {
    const O = [215, 235], a = 150, b = 60, R = (a + b) / 2;
    const L = [O[0] - R, 235], Rt = [O[0] + R, 235], J = [L[0] + a, 235];
    const G = [J[0], 235 - Math.sqrt(a * b)];
    const top = [O[0], 235 - R];
    return wrap(440, 300, [
      `<path d="M ${pf(L)} A ${R} ${R} 0 0 1 ${pf(Rt)}" fill="none" stroke="${FNT}" stroke-width="1.6"/>`,
      seg(L, Rt, DIM, 2),
      seg(O, top, GLD, 2, "5 4"), txt(add(mid(O, top), [-30, 0]), "(a+b)/2", GLD, 12),
      seg(J, G, ACC, 2.2), txt(add(mid(J, G), [24, 0]), "√(ab)", ACC, 12),
      dot(O, DIM, 3), dot(J, ACC, 4),
      txt([L[0] + a / 2, 255], "a", DIM, 13), txt([J[0] + b / 2, 255], "b", DIM, 13),
      txt(add(L, [0, 20]), " ", FNT, 10),
      cap(440, 300, "semicircle over a + b: the radius is the AM, the half-chord at the joint is the GM — the chord never beats the radius, with equality when a = b (joint at the center); the general AM–GM covers n numbers a₁, …, aₙ")
    ]);
  })()];

  // Difference of squares: a² minus a corner b² is an L-shape = (a − b)(a + b).
  DIAGRAMS["difference-of-squares"] = [(() => {
    const x = 70, y = 55, a = 190, b = 75;
    return wrap(460, 320, [
      `<path d="M ${x} ${y} h ${a} v ${a - b} h ${-(a - b)} v ${b} h ${-b} Z" fill="${ACCS}" stroke="${ACC}" stroke-width="2"/>`,
      rect(x + a - b, y + a - b, b, b, GLD, 1.6, "none"),
      txt([x + a - b + b / 2, y + a - b + b / 2 + 4], "b²", GLD, 13),
      txt([x + a / 2, y - 12], "a", DIM, 13), txt([x - 14, y + a / 2], "a", DIM, 13),
      txt([x + a + 16, y + (a - b) / 2], "a − b", ACC, 12, "start"),
      txt([x + (a - b) / 2, y + a + 18], "a − b", FNT, 11.5),
      cap(460, 320, "remove a b² corner from an a² square: the blue L-shape has area a² − b², and cutting it once rearranges it into an (a + b) × (a − b) rectangle")
    ]);
  })()];

  // (a+b)²: the four-region square.
  DIAGRAMS["square-of-sum"] = [(() => {
    const x = 90, y = 45, a = 150, b = 80;
    return wrap(440, 340, [
      rect(x, y, a, a, ACC, 1.8, ACCS), txt([x + a / 2, y + a / 2 + 5], "a²", ACC, 15),
      rect(x + a, y, b, a, DIM, 1.6), txt([x + a + b / 2, y + a / 2 + 5], "ab", DIM, 13.5),
      rect(x, y + a, a, b, DIM, 1.6), txt([x + a / 2, y + a + b / 2 + 5], "ab", DIM, 13.5),
      rect(x + a, y + a, b, b, GLD, 1.8, GLDS), txt([x + a + b / 2, y + a + b / 2 + 5], "b²", GLD, 14),
      txt([x + a / 2, y - 10], "a", DIM, 12.5), txt([x + a + b / 2, y - 10], "b", DIM, 12.5),
      txt([x - 13, y + a / 2 + 4], "a", DIM, 12.5), txt([x - 13, y + a + b / 2 + 4], "b", DIM, 12.5),
      cap(440, 340, "(a + b)² = a² + 2ab + b² — the two ab rectangles are the cross term")
    ]);
  })()];

  // Geometric series: unit square halved forever.
  DIAGRAMS["geometric-series"] = [(() => {
    const x = 85, y = 45, S = 240;
    const parts = [rect(x, y, S, S, DIM, 2)];
    let cx = x, cy = y, w = S, h = S;
    const labels = ["½", "¼", "⅛", "1⁄16", "1⁄32"];
    for (let i = 0; i < 5; i++) {
      if (i % 2 === 0) {
        w = w / 2;
        parts.push(rect(cx, cy, w, h, ACC, 1.4, i === 0 ? ACCS : "none"));
        parts.push(txt([cx + w / 2, cy + h / 2 + 5], labels[i], i === 0 ? ACC : DIM, i < 2 ? 15 : 11.5));
        cx += w;
      } else {
        h = h / 2;
        parts.push(rect(cx, cy, w, h, ACC, 1.4));
        parts.push(txt([cx + w / 2, cy + h / 2 + 5], labels[i], DIM, i < 2 ? 15 : 11.5));
        cy += h;
      }
    }
    parts.push(cap(410, 340, "keep taking half of what remains: ½ + ¼ + ⅛ + ⋯ = 1 — the whole unit square gets filled"));
    return wrap(410, 340, parts);
  })()];

  // Vertex of a parabola.
  DIAGRAMS["vertex-form"] = [(() => {
    const h = 220, k = 235, s = 0.013;
    let d = `M ${h - 145} ${k - s * 145 * 145}`;
    for (let X = -145; X <= 145; X += 10) d += ` L ${h + X} ${r1(k - s * X * X)}`;
    return wrap(440, 320, [
      seg([40, 268], [415, 268], FNT, 1.2), seg([60, 30], [60, 290], FNT, 1.2),
      `<path d="${d}" fill="none" stroke="${ACC}" stroke-width="2.2"/>`,
      seg([h, 42], [h, 268], GLD, 1.4, "5 4"),
      dot([h, k], GLD, 5), txt([h + 6, k + 22], "(h, k) = (−b/2a, c − b²/4a)", GLD, 12, "middle"),
      txt([h, 34], "x = −b/2a", GLD, 11.5),
      cap(440, 320, "the parabola is symmetric about x = −b/2a; the vertex is the max/min and sits at the average of the roots")
    ]);
  })()];

  // Jensen: chord above the convex curve, compared at the average point.
  DIAGRAMS["jensens-inequality"] = [(() => {
    const f = X => 232 - 0.0058 * (X - 225) * (X - 225);   // convex in math coords (screen y down)
    const x1 = 115, x2 = 320, xm = (x1 + x2) / 2;
    const P1 = [x1, f(x1)], P2 = [x2, f(x2)];
    const Mcurve = [xm, f(xm)], Mchord = mid(P1, P2);
    let d = `M 90 ${r1(f(90))}`;
    for (let X = 90; X <= 345; X += 15) d += ` L ${X} ${r1(f(X))}`;
    return wrap(440, 340, [
      seg([60, 300], [420, 300], FNT, 1.2),
      `<path d="${d}" fill="none" stroke="${DIM}" stroke-width="2.2"/>`,
      seg(P1, P2, ACC, 1.8),
      seg([x1, 300], P1, FNT, 1.2, "4 3"), seg([x2, 300], P2, FNT, 1.2, "4 3"),
      seg([xm, 300], Mcurve, FNT, 1.2, "4 3"),
      seg(Mcurve, Mchord, GRN, 2.4),
      dot(P1, DIM, 4), dot(P2, DIM, 4),
      dot(Mchord, ACC, 4.5), dot(Mcurve, GLD, 4.5),
      txt([x1, 318], "x₁", DIM, 12.5), txt([x2, 318], "x₂", DIM, 12.5), txt([xm, 318], "(x₁+x₂)/2", DIM, 11.5),
      txt(add(Mchord, [-4, -12]), "½(f(x₁)+f(x₂))", ACC, 11.5),
      txt(add(Mcurve, [0, 20]), "f(½(x₁+x₂))", GLD, 11.5),
      txt([120, 132], "f convex", DIM, 12.5),
      cap(440, 340, "convex: the chord (blue) lies above the graph, so the value at the average (gold) is at most the average of the values — Jensen; concave flips it")
    ]);
  })()];

  // Roots of unity: 6th roots on the unit circle.
  DIAGRAMS["roots-of-unity"] = [(() => {
    const O = [215, 165], R = 118;
    const V = [0, 1, 2, 3, 4, 5].map(k => onC(O, R, -60 * k));
    return wrap(460, 330, [
      seg([60, O[1]], [390, O[1]], FNT, 1.2), seg([O[0], 30], [O[0], 305], FNT, 1.2),
      circ(O, R, FNT, 1.4),
      poly(V, ACC, 1.5),
      ...V.map(p => dot(p, GLD, 4.5)),
      `<path d="M ${pf(add(O, [26, 0]))} A 26 26 0 0 0 ${pf(onC(O, 26, -60))}" fill="none" stroke="${GLD}" stroke-width="1.8"/>`,
      txt(onC(O, 40, -30), "2π/n", GLD, 11.5),
      txt(add(V[0], [16, 4]), "1", DIM, 12.5), txt(add(V[1], [16, -6]), "ω", GLD, 13),
      txt(add(V[2], [-14, -8]), "ω²", DIM, 12), txt(add(V[3], [-18, 4]), "−1", DIM, 12),
      cap(460, 330, "the n solutions of zⁿ = 1 are ωᵏ = e^(2πik/n), k = 0, …, n−1 (n = 6 shown): equally spaced on the unit circle, vertices of a regular n-gon, summing to 0")
    ]);
  })()];

  // Euler's formula: e^{iθ} on the unit circle.
  DIAGRAMS["eulers-formula"] = [(() => {
    const O = [205, 190], R = 130, th = -52;
    const P = onC(O, R, th), F = [P[0], O[1]];
    return wrap(460, 330, [
      seg([40, O[1]], [420, O[1]], FNT, 1.2), seg([O[0], 30], [O[0], 315], FNT, 1.2),
      txt([412, O[1] + 16], "Re", FNT, 11), txt([O[0] + 14, 38], "Im", FNT, 11),
      circ(O, R, FNT, 1.4),
      seg(O, P, ACC, 2), dot(P, GLD, 5),
      seg(P, F, GLD, 1.5, "4 3"), seg(O, F, GLD, 2.4),
      `<path d="M ${pf(add(O, [30, 0]))} A 30 30 0 0 0 ${pf(onC(O, 30, th))}" fill="none" stroke="${ACC}" stroke-width="1.8"/>`,
      txt(onC(O, 46, th / 2), "θ", ACC, 13),
      txt(add(P, [30, -10]), "e^{iθ}", GLD, 13),
      txt([mid(O, F)[0], O[1] + 18], "cos θ", GLD, 12),
      txt([P[0] + 30, mid(P, F)[1]], "sin θ", GLD, 12),
      txt(add(mid(O, P), [-24, -8]), "1", DIM, 12),
      cap(460, 330, "e^{iθ} is the point at angle θ on the unit circle: real part cos θ, imaginary part sin θ")
    ]);
  })()];

  // ---------- Counting ----------

  // Lattice grid paths.
  DIAGRAMS["grid-paths"] = [(() => {
    const x0 = 80, y0 = 250, cell = 52, m = 5, n = 3;
    const parts = [];
    for (let i = 0; i <= m; i++) parts.push(seg([x0 + i * cell, y0 - n * cell], [x0 + i * cell, y0], FNT, 1));
    for (let j = 0; j <= n; j++) parts.push(seg([x0, y0 - j * cell], [x0 + m * cell, y0 - j * cell], FNT, 1));
    // one monotone path: R R U R U R U? steps (m=5,n=3): RRURURU R -> use fixed: R R U R U R R U
    const steps = "RRURURRU";
    let px = x0, py = y0;
    for (const st of steps) {
      const nx = st === "R" ? px + cell : px, ny = st === "U" ? py - cell : py;
      parts.push(seg([px, py], [nx, ny], ACC, 3));
      px = nx; py = ny;
    }
    parts.push(dot([x0, y0], GLD, 5), dot([x0 + m * cell, y0 - n * cell], GLD, 5));
    parts.push(txt([x0 - 4, y0 + 20], "(0,0)", DIM, 12));
    parts.push(txt([x0 + m * cell + 4, y0 - n * cell - 10], "(m, n)", DIM, 12));
    parts.push(cap(440, 320, "a right/up path from (0,0) to (m, n) is a word with m R's and n U's — choose which m of the m + n steps go right: C(m+n, m)"));
    return wrap(440, 320, parts);
  })()];

  // Catalan: Dyck path staying weakly below the diagonal.
  DIAGRAMS["catalan-numbers"] = [(() => {
    const x0 = 90, y0 = 265, cell = 55, n = 4;
    const parts = [];
    for (let i = 0; i <= n; i++) {
      parts.push(seg([x0 + i * cell, y0 - n * cell], [x0 + i * cell, y0], FNT, 1));
      parts.push(seg([x0, y0 - i * cell], [x0 + n * cell, y0 - i * cell], FNT, 1));
    }
    parts.push(seg([x0, y0], [x0 + n * cell, y0 - n * cell], GLD, 1.6, "6 4"));
    const steps = "RURRUURU";
    let px = x0, py = y0;
    for (const st of steps) {
      const nx = st === "R" ? px + cell : px, ny = st === "U" ? py - cell : py;
      parts.push(seg([px, py], [nx, ny], ACC, 3));
      px = nx; py = ny;
    }
    parts.push(dot([x0, y0], GLD, 5), dot([x0 + n * cell, y0 - n * cell], GLD, 5));
    parts.push(txt([x0 - 4, y0 + 18], "(0,0)", DIM, 11.5));
    parts.push(txt([x0 + n * cell + 6, y0 - n * cell - 10], "(n, n)", DIM, 11.5));
    parts.push(txt([x0 + n * cell - 60, y0 - n * cell + 2], "diagonal", GLD, 11.5));
    parts.push(cap(430, 330, "paths from corner to corner that never cross above the diagonal: counted by Cₙ = C(2n, n)/(n + 1) — here n = 4"));
    return wrap(430, 330, parts);
  })()];

  // Stars and bars.
  DIAGRAMS["stars-and-bars"] = [(() => {
    const y = 150, x0 = 60, gap = 36;
    const items = "**|***|**";  // x1=2, x2=3, x3=2 summing to 7
    const parts = [];
    let x = x0;
    for (const ch of items) {
      if (ch === "*") { parts.push(dot([x, y], ACC, 7)); }
      else { parts.push(seg([x, y - 26], [x, y + 26], GLD, 4)); }
      x += gap;
    }
    parts.push(txt([x0 + gap * 0.5, y + 52], "x₁ = 2", ACC, 12.5));
    parts.push(txt([x0 + gap * 4, y + 52], "x₂ = 3", ACC, 12.5));
    parts.push(txt([x0 + gap * 7.5, y + 52], "x₃ = 2", ACC, 12.5));
    parts.push(cap(400, 240, "x₁ + x₂ + x₃ = 7 as 7 stars and 2 bars: every arrangement of the 9 symbols is one solution — C(9, 2) = 36 in all"));
    return wrap(400, 240, parts);
  })()];

  // ---------- Number Theory ----------

  // Lattice points on a segment + squares crossed.
  DIAGRAMS["lattice-points-gcd"] = [(() => {
    const x0 = 70, y0 = 255, cell = 38, a = 8, b = 5;
    const parts = [];
    for (let i = 0; i <= a; i++) parts.push(seg([x0 + i * cell, y0 - b * cell], [x0 + i * cell, y0], FNT, 0.8));
    for (let j = 0; j <= b; j++) parts.push(seg([x0, y0 - j * cell], [x0 + a * cell, y0 - j * cell], FNT, 0.8));
    parts.push(seg([x0, y0], [x0 + a * cell, y0 - b * cell], ACC, 2.2));
    parts.push(dot([x0, y0], GLD, 5), dot([x0 + a * cell, y0 - b * cell], GLD, 5));
    parts.push(txt([x0 - 6, y0 + 18], "(0,0)", DIM, 11.5));
    parts.push(txt([x0 + a * cell, y0 - b * cell - 12], "(8, 5)", DIM, 11.5));
    parts.push(cap(440, 300, "gcd(8, 5) = 1: no interior lattice points on the segment, and it crosses 8 + 5 − 1 = 12 unit squares"));
    return wrap(440, 300, parts);
  })()];

  // Guard: warn on any NaN coordinates.
  Object.keys(DIAGRAMS).forEach(k => {
    DIAGRAMS[k].forEach(s => {
      if (s.indexOf("NaN") !== -1 && typeof console !== "undefined") console.warn("NaN in diagram: " + k);
    });
  });
})();
