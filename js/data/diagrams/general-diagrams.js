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
  // ---------- graph helpers ----------
  // Map a math-coordinate window onto a pixel box, then sample a function into a path.
  // Every graph card below needs both, and the two older graph entries (vertex-form,
  // jensens-inequality) each open-code the sampling loop.
  const frame = (x0, x1, y0, y1, L, T, W, H) => ({
    sx: X => L + (X - x0) / (x1 - x0) * W,
    sy: Y => T + H - (Y - y0) / (y1 - y0) * H,
    pt(X, Y) { return [this.sx(X), this.sy(Y)]; },
    x0, x1, y0, y1, L, T, W, H
  });
  const plot = (f, m, from, to, n = 200, c = ACC, w = 2.2) => {
    let d = "";
    for (let k = 0; k <= n; k++) {
      const X = from + (to - from) * k / n;
      d += (k ? " L " : "M ") + r1(m.sx(X)) + " " + r1(m.sy(f(X)));
    }
    return `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round"/>`;
  };
  const axes = (m, c = FNT) =>
    seg(m.pt(m.x0, 0), m.pt(m.x1, 0), c, 1.2) + seg(m.pt(0, m.y0), m.pt(0, m.y1), c, 1.2);

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
      cap(440, 300, "semicircle on a + b: the radius is the AM, the half-chord the GM")
    ]);
  })()];

  // Difference of squares: a² minus a corner b² is an L-shape = (a − b)(a + b).
  DIAGRAMS["difference-of-squares"] = [(() => {
    // Proof without words: an a×a square minus a b×b corner, cut into two
    // rectangles that reassemble into an (a+b)×(a−b) rectangle.
    const a = 140, b = 52, c = a - b;                 // c = a − b
    const x = 40, y = 56;                             // left panel origin
    const rx = 272, ry = y + (a - (a + b - c)) / 2 + 10; // right panel top (aligned band)
    const T = ACCS, Bp = GLDS;                        // piece colors
    return wrap(478, 260, [
      // ---- left: a×a square with the b×b corner removed, split into T + B ----
      rect(x, y, a, c, ACC, 1.6, T),                  // top piece  a × (a−b)
      rect(x, y + c, c, b, GLD, 1.6, Bp),             // bottom piece (a−b) × b
      rect(x + c, y + c, b, b, FNT, 1.3, "none"),     // removed b×b corner (empty)
      seg([x + c, y + c], [x + c, y + c], FNT, 1),
      txt([x + c + b / 2, y + c + b / 2 + 4], "b²", FNT, 12),
      txt([x + a / 2, y - 10], "a", DIM, 13),
      txt([x - 13, y + a / 2], "a", DIM, 13),
      // ---- right: reassembled (a+b) × (a−b) rectangle ----
      rect(rx, ry, a, c, ACC, 1.6, T),                // T stays
      rect(rx + a, ry, b, c, GLD, 1.6, Bp),           // B rotated to the right
      txt([rx + (a + b) / 2, ry + c + 20], "a + b", DIM, 13),
      txt([rx + a + b + 15, ry + c / 2 + 4], "a − b", DIM, 12, "start"),
      txt([(x + a + rx) / 2 - 4, y + a / 2 + 4], "=", DIM, 20),
      cap(478, 260, "a² − b²: cut the b×b corner off an a×a square and rearrange the two pieces into an (a+b)×(a−b) rectangle")
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
      cap(440, 340, "convex: the chord sits above the curve, so f(mean) ≤ mean of f")
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
      cap(460, 330, "the n solutions of zⁿ = 1, equally spaced around the unit circle")
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
    parts.push(cap(440, 320, "a right/up path is a word of m R's and n U's: C(m+n, m) of them"));
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
    parts.push(txt([x0 + n * cell - 64, y0 - n * cell - 2], "diagonal", GLD, 11.5));
    parts.push(cap(430, 330, "corner-to-corner paths never crossing the diagonal, counted by Cₙ"));
    return wrap(430, 330, parts);
  })()];

  // Stars and bars.
  // Geometric probability: the meeting problem. Two people each arrive uniformly
  // between 5:00 and 6:00 and wait 15 minutes. Arrival times are the two axes, so
  // every outcome is a point of the square and "they meet" is |x - y| <= 15, a band
  // about the diagonal. The complement is two corner triangles of leg 45, so the
  // answer is 1 - 45^2/60^2 = 7/16, read straight off the picture.
  DIAGRAMS["geometric-probability"] = [(() => {
    const X0 = 78, Y0 = 40, S = 240;          // square: 240px for 60 minutes
    const px = u => X0 + S * u / 60;          // person A's arrival -> x
    const py = v => Y0 + S - S * v / 60;      // person B's arrival -> y (SVG y is down)
    const W = 15;                             // minutes each will wait
    const band = [[px(0), py(W)], [px(60 - W), py(60)], [px(60), py(60)],
                  [px(60), py(60 - W)], [px(W), py(0)], [px(0), py(0)]];
    const triA = [[px(0), py(W)], [px(60 - W), py(60)], [px(0), py(60)]];
    const triB = [[px(W), py(0)], [px(60), py(60 - W)], [px(60), py(0)]];
    return wrap(430, 330, [
      poly(band, "none", 0, ACCS),
      poly(triA, "none", 0, GLDS), poly(triB, "none", 0, GLDS),
      rect(X0, Y0, S, S, DIM, 2),
      seg([px(0), py(0)], [px(60), py(60)], FNT, 1.4, "4 4"),
      seg([px(0), py(W)], [px(60 - W), py(60)], ACC, 2),
      seg([px(W), py(0)], [px(60), py(60 - W)], ACC, 2),
      txt([px(30), py(30) + 5], "they meet", ACC, 13),
      txt([px(12), py(50)], "B late", GLD, 11),
      txt([px(48), py(10)], "A late", GLD, 11),
      txt([X0 - 8, Y0 + S + 5], "5:00", DIM, 11, "end"),
      txt([X0 + S, Y0 + S + 20], "6:00", DIM, 11),
      txt([X0 - 8, Y0 + 5], "6:00", DIM, 11, "end"),
      txt([X0 + S / 2, Y0 + S + 34], "A arrives", DIM, 12),
      `<text x="${X0 - 30}" y="${Y0 + S / 2}" fill="${DIM}" font-size="12" text-anchor="middle" transform="rotate(-90 ${X0 - 30} ${Y0 + S / 2})">B arrives</text>`,
      cap(430, 330, "Two people each arrive at a uniformly random time between 5:00 and 6:00 and wait 15 minutes. Each axis is one arrival time, so every outcome is a point of the square. They meet exactly when the arrivals differ by at most 15 minutes, the shaded band about the diagonal; the two gold corner triangles are the misses, each with legs 45. So P = 1 &minus; 45&sup2;/60&sup2; = 7/16, with no integration anywhere.")
    ]);
  })()];

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
    parts.push(cap(400, 240, "x₁ + x₂ + x₃ = 7 as 7 stars and 2 bars: C(9, 2) arrangements"));
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
    parts.push(cap(440, 300, "gcd(8, 5) = 1, so no interior lattice points on the segment"));
    return wrap(440, 300, parts);
  })(), (() => {
    // The gcd > 1 case, which the first panel cannot show: the segment breaks into gcd
    // identical steps, so gcd - 1 lattice points fall strictly inside it.
    const x0 = 58, y0 = 250, cell = 36, a = 9, b = 6, g = 3;
    const parts = [];
    for (let i = 0; i <= a; i++) parts.push(seg([x0 + i * cell, y0 - b * cell], [x0 + i * cell, y0], FNT, 0.8));
    for (let j = 0; j <= b; j++) parts.push(seg([x0, y0 - j * cell], [x0 + a * cell, y0 - j * cell], FNT, 0.8));
    parts.push(seg([x0, y0], [x0 + a * cell, y0 - b * cell], ACC, 2.2));
    for (let k = 1; k < g; k++) {
      const p = [x0 + (a / g) * k * cell, y0 - (b / g) * k * cell];
      parts.push(dot(p, GRN, 5));
      parts.push(txt([p[0] + 4, p[1] - 10], "(" + (a / g) * k + "," + (b / g) * k + ")", GRN, 11.5));
    }
    parts.push(dot([x0, y0], GLD, 5), dot([x0 + a * cell, y0 - b * cell], GLD, 5));
    parts.push(txt([x0 - 6, y0 + 18], "(0,0)", DIM, 11.5));
    parts.push(txt([x0 + a * cell - 10, y0 - b * cell - 12], "(9, 6)", DIM, 11.5));
    parts.push(cap(440, 300, "gcd(9, 6) = 3, so the segment passes through 3 - 1 = 2 interior points"));
    return wrap(440, 300, parts);
  })()];

  // Guard: warn on any NaN coordinates.
  Object.keys(DIAGRAMS).forEach(k => {
    DIAGRAMS[k].forEach(s => {
      if (s.indexOf("NaN") !== -1 && typeof console !== "undefined") console.warn("NaN in diagram: " + k);
    });
  });
  // ---------- graph-shaped algebra cards ----------

  // Bars on the input mirror; bars on the output fold. Shown side by side on one f.
  DIAGRAMS["abs-value-graphing"] = [(() => {
    const f = X => X - 1;
    const mL = frame(-3.4, 3.4, -3.2, 3.2, 30, 26, 178, 178);
    const mR = frame(-3.4, 3.4, -3.2, 3.2, 246, 26, 178, 178);
    return wrap(440, 268, [
      axes(mL), axes(mR),
      plot(f, mL, -3.4, 3.4, 2, FNT, 1.4),
      plot(X => Math.abs(X) - 1, mL, -3.2, 3.2, 120, ACC, 2.4),
      plot(f, mR, -3.4, 3.4, 2, FNT, 1.4),
      plot(X => Math.abs(X - 1), mR, -2.2, 3.4, 120, GLD, 2.4),
      seg(mL.pt(0, -3.2), mL.pt(0, 3.2), FNT, 1.2, "3 3"),
      txt([119, 20], "y = f(|x|)", ACC, 12.5),
      txt([335, 20], "y = |f(x)|", GLD, 12.5),
      txt([119, 244], "keep x ≥ 0, mirror it leftward", DIM, 11),
      txt([335, 244], "fold everything below the axis up", DIM, 11),
      cap(440, 268, "with f(x) = x − 1: bars on the input make the graph even, bars on the output make it non-negative")
    ]);
  })()];

  // Count solutions by sliding a horizontal line, not by solving.
  DIAGRAMS["piecewise-graph-counting"] = [(() => {
    const g = X => Math.abs(Math.abs(X) - 3);
    const m = frame(-6.2, 6.2, -0.7, 5.2, 46, 24, 350, 210);
    const line = (bv, c, lab) => seg(m.pt(-6.2, bv), m.pt(5.0, bv), c, 1.6, "5 4") +
      txt([m.sx(5.2), m.sy(bv) + 4], lab, c, 11, "start");
    return wrap(440, 296, [
      axes(m),
      plot(g, m, -6.2, 6.2, 240, ACC, 2.4),
      line(1, GLD, "b = 1 → 4"),
      line(3, GRN, "b = 3 → 3"),
      line(4.3, DIM, "b = 4.3 → 2"),
      dot(m.pt(0, 3), GRN, 3.5),
      txt([m.sx(-3), m.sy(0) + 15], "−3", DIM, 11), txt([m.sx(3), m.sy(0) + 15], "3", DIM, 11),
      cap(440, 296, "y = ||x| − 3| meets y = b four times for 0 < b < 3, three times exactly at the peak b = 3, twice for b > 3")
    ]);
  })()];

  // The sum of distances is piecewise linear, with a flat floor between the middle points.
  DIAGRAMS["median-minimizes-abs"] = [(() => {
    const A = [-3, -1, 2, 4];
    const f = X => A.reduce((t, a) => t + Math.abs(X - a), 0);
    const m = frame(-5.4, 6.4, 0, 22, 46, 24, 350, 200);
    return wrap(440, 292, [
      axes(m),
      seg(m.pt(-1, 0), m.pt(-1, f(-1)), FNT, 1.2, "4 3"),
      seg(m.pt(2, 0), m.pt(2, f(2)), FNT, 1.2, "4 3"),
      rect(m.sx(-1), m.T, m.sx(2) - m.sx(-1), m.H, "none", 0, ACCS),
      plot(f, m, -5.4, 6.4, 240, ACC, 2.4),
      seg(m.pt(-1, f(-1)), m.pt(2, f(2)), GLD, 3.2),
      ...A.map(a => dot(m.pt(a, 0), DIM, 3)),
      ...A.map((a, i) => txt([m.sx(a), m.sy(0) + 15], ["a₁", "a₂", "a₃", "a₄"][i], DIM, 11)),
      txt([m.sx(0.5), m.sy(f(0)) - 12], "flat minimum", GLD, 11.5),
      cap(440, 292, "Σ|x − aᵢ| bends at each aᵢ; with an even count every point between the two middle ones ties for the minimum")
    ]);
  })()];

  // The V and the two transformations that move it.
  DIAGRAMS["taxicab-region"] = [(() => {
    const m = frame(-3.7, 3.7, -3.7, 3.7, 60, 18, 290, 290), c = 3;
    const dots = [];
    for (let x = -c; x <= c; x++) for (let y = -c; y <= c; y++)
      if (Math.abs(x) + Math.abs(y) <= c) dots.push(dot(m.pt(x, y), GRN, 3));
    return wrap(410, 358, [
      axes(m),
      poly([m.pt(c, 0), m.pt(0, c), m.pt(-c, 0), m.pt(0, -c)], ACC, 2.2),
      ...dots,
      txt(add(m.pt(1.35, 1.35), [0, 0]), "area 2c\u00b2", ACC, 12),
      txt(add(m.pt(c, 0), [6, 16]), "(c, 0)", FNT, 11.5),
      txt(add(m.pt(0, c), [8, -6]), "(0, c)", FNT, 11.5),
      cap(410, 358, "|x| + |y| \u2264 c is a square on its corner: 25 lattice points at c = 3")
    ]);
  })(), (() => {
    const m = frame(-3.2, 3.2, -3.2, 3.2, 60, 18, 290, 290);
    const dia = (h, k) => poly([m.pt(h + 1, k), m.pt(h, k + 1), m.pt(h - 1, k), m.pt(h, k - 1)], GLD, 2);
    return wrap(410, 358, [
      axes(m),
      dia(1, 1), dia(-1, 1), dia(1, -1), dia(-1, -1),
      dot(m.pt(1, 1), GLD, 3), dot(m.pt(-1, 1), GLD, 3), dot(m.pt(1, -1), GLD, 3), dot(m.pt(-1, -1), GLD, 3),
      cap(410, 358, "each nested |\u00b7| mirrors the picture: ||x|\u22121| + ||y|\u22121| \u2264 1 is four copies")
    ]);
  })()];

  DIAGRAMS["absolute-value-rules"] = [(() => {
    const m = frame(-4.6, 4.6, -2.4, 4.4, 46, 24, 350, 210);
    return wrap(440, 292, [
      axes(m),
      plot(X => Math.abs(X), m, -4.4, 4.4, 120, ACC, 2.4),
      plot(X => Math.abs(X - 2), m, -2.4, 4.6, 120, GLD, 2),
      plot(X => -Math.abs(X) + 3, m, -4.4, 4.4, 120, GRN, 2),
      txt(add(m.pt(-3.1, 3.1), [-4, -6]), "y = |x|", ACC, 12),
      txt(add(m.pt(4.2, 2.2), [-6, -8]), "y = |x − 2|", GLD, 12),
      txt(add(m.pt(-3.3, -0.3), [10, 16]), "y = 3 − |x|", GRN, 12),
      dot(m.pt(0, 0), ACC, 3.5), dot(m.pt(2, 0), GLD, 3.5), dot(m.pt(0, 3), GRN, 3.5),
      cap(440, 292, "the corner sits where the inside vanishes")
    ]);
  })()];

  // Floor and fractional part share an axis, so x = ⌊x⌋ + {x} is visible.
  DIAGRAMS["floor-basics"] = [(() => {
    const m = frame(-2.3, 3.3, -2.4, 3.4, 46, 20, 350, 150);
    const n = frame(-2.3, 3.3, -0.25, 1.35, 46, 190, 350, 62);
    const steps = [];
    for (let k = -3; k <= 3; k++) {
      const x0 = Math.max(k, -2.3), x1 = Math.min(k + 1, 3.3);
      if (x1 <= x0) continue;
      steps.push(seg(m.pt(x0, k), m.pt(x1, k), ACC, 2.4));
      if (k >= -2 && k <= 3) steps.push(dot(m.pt(k, k), ACC, 3.2));
      steps.push(seg(n.pt(x0, x0 - k), n.pt(x1, x1 - k), GLD, 2.2));
    }
    return wrap(440, 300, [
      axes(m), axes(n), ...steps,
      txt([408, m.sy(2.6)], "⌊x⌋", ACC, 12.5, "end"),
      txt([408, n.sy(0.9)], "{x}", GLD, 12.5, "end"),
      cap(440, 300, "⌊x⌋ jumps at each integer, {x} resets there, and they sum to x")
    ]);
  })()];

  // A convex curve never dips below its tangent, which is the whole bound.
  DIAGRAMS["tangent-line-trick"] = [(() => {
    const f = X => X * X;
    const a = 1.1, t = X => f(a) + 2 * a * (X - a);
    const m = frame(-0.4, 3.1, -1.6, 6.2, 52, 24, 344, 214);
    return wrap(440, 300, [
      axes(m),
      plot(f, m, -0.4, 2.5, 160, ACC, 2.4),
      plot(t, m, -0.4, 3.1, 2, GLD, 2),
      seg(m.pt(a, 0), m.pt(a, f(a)), FNT, 1.2, "4 3"),
      dot(m.pt(a, f(a)), GLD, 4.5),
      txt([m.sx(a), m.sy(0) + 16], "a = s/n", GLD, 11.5),
      txt(add(m.pt(2.3, f(2.3)), [4, -6]), "f(x)", ACC, 12, "start"),
      txt(add(m.pt(2.75, t(2.75)), [4, 12]), "tangent at a", GLD, 12, "start"),
      cap(440, 300, "for convex f the curve lies above its tangent, so Σf(xᵢ) ≥ Σ tangent = n·f(a) once the constraint kills the linear part")
    ]);
  })()];

  // Cobweb: naming the whole expression x is the same as intersecting with y = x.
  DIAGRAMS["infinite-nest"] = [(() => {
    const g = X => Math.sqrt(2 + X);
    const m = frame(0, 3.1, 0, 3.1, 60, 22, 300, 226);
    const web = [];
    let X = 0.15;
    for (let k = 0; k < 7; k++) {
      const Y = g(X);
      web.push(seg(m.pt(X, X), m.pt(X, Y), GLD, 1.3));
      web.push(seg(m.pt(X, Y), m.pt(Y, Y), GLD, 1.3));
      X = Y;
    }
    return wrap(440, 304, [
      axes(m),
      plot(v => v, m, 0, 3.1, 2, DIM, 1.6),
      ...web,
      plot(g, m, 0, 3.1, 160, ACC, 2.4),
      dot(m.pt(2, 2), ACC, 5),
      txt(add(m.pt(2, 2), [12, -8]), "x = 2", ACC, 12.5, "start"),
      txt(add(m.pt(2.55, g(2.55)), [6, -8]), "y = √(2 + x)", ACC, 12, "start"),
      txt(add(m.pt(2.7, 2.7), [4, 14]), "y = x", DIM, 12, "start"),
      cap(440, 304, "the nest converges to the fixed point, so setting x = √(2 + x) and solving x² = x + 2 gives x = 2")
    ]);
  })()];

  // One line, four ways of writing it, with each form's given quantities marked.
  DIAGRAMS["line-forms"] = [(() => {
    const m = frame(-1.2, 6.2, -1.4, 5.4, 52, 24, 344, 210);
    const f = X => -0.75 * X + 3;                  // x-intercept 4, y-intercept 3
    const x1 = 2, y1 = f(2);
    return wrap(440, 300, [
      axes(m),
      plot(f, m, -1.2, 6.2, 2, ACC, 2.4),
      seg(m.pt(x1, 0), m.pt(x1, y1), FNT, 1.2, "4 3"),
      dot(m.pt(0, 3), GLD, 4.5), dot(m.pt(4, 0), GLD, 4.5), dot(m.pt(x1, y1), ACC, 4.5),
      txt(add(m.pt(0, 3), [-16, -8]), "b = 3", GLD, 11.5),
      txt(add(m.pt(4, 0), [16, 16]), "a = 4", GLD, 11.5),
      txt(add(m.pt(x1, y1), [30, -8]), "(x₁, y₁)", ACC, 11.5),
      txt(add(m.pt(5.1, f(5.1)), [8, 14]), "slope m = −3/4", DIM, 11.5),
      cap(440, 300, "y = −¾x + 3 · y − y₁ = m(x − x₁) · 3x + 4y = 12 · x/4 + y/3 = 1, all the same line")
    ]);
  })()];

  // Harmonic addition: two sinusoids of the same frequency add to a third of that frequency,
  // with the amplitude a hypotenuse. Drawn for 3sin + 4cos so the amplitude is exactly 5 and
  // the dashed bounds land on a round number the reader can check by eye.
  DIAGRAMS["harmonic-addition"] = [(() => {
    const m = frame(0, 2 * Math.PI, -5.8, 5.8, 52, 26, 350, 210);
    const a = 3, b = 4, R = 5, phi = Math.atan2(b, a);
    return wrap(430, 300, [
      seg(m.pt(0, R), m.pt(2 * Math.PI, R), GLD, 1.3, "5 4"),
      seg(m.pt(0, -R), m.pt(2 * Math.PI, -R), GLD, 1.3, "5 4"),
      axes(m),
      plot(X => a * Math.sin(X), m, 0, 2 * Math.PI, 160, FNT, 1.6),
      plot(X => b * Math.cos(X), m, 0, 2 * Math.PI, 160, FNT, 1.6),
      plot(X => R * Math.sin(X + phi), m, 0, 2 * Math.PI, 200, ACC, 2.6),
      txt(m.pt(2 * Math.PI, R), "R = 5", GLD, 12, "end"),
      txt(add(m.pt(Math.PI / 2 - phi, R), [0, -9]), "peak", ACC, 11.5),
      dot(m.pt(Math.PI / 2 - phi, R), ACC, 3.5),
      txt(add(m.pt(1.05, a * Math.sin(1.05)), [-16, -6]), "3 sin θ", FNT, 11.5),
      txt(add(m.pt(0.35, b * Math.cos(0.35)), [20, -8]), "4 cos θ", FNT, 11.5),
      cap(430, 300, "3 sin θ + 4 cos θ is one wave of amplitude √(3²+4²) = 5, so its max is 5")
    ]);
  })()];

})();
