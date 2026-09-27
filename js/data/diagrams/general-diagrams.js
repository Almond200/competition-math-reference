// Computed SVG diagrams for Algebra, Counting, and Number Theory detail pages.
// Same conventions as geometry-diagrams.js: exact constructions, HTML captions
// extracted via the CAPMARK marker so they never collide with the drawing.
(function () {
  const DIAGRAMS = window.MATH_DIAGRAMS = window.MATH_DIAGRAMS || {};
  // An example's own figure, EXAMPLE["card-id"] = { q: setupPanel, s: optionalSolutionPanel },
  // and figures placed inside a write-up at a {{figure:name}} marker, BODY["card-id"] =
  // { name: panel }. Declared here so they are built with this file's helpers and colors.
  const EXAMPLE = window.MATH_EXAMPLE_DIAGRAMS = window.MATH_EXAMPLE_DIAGRAMS || {};
  const BODY = window.MATH_BODY_DIAGRAMS = window.MATH_BODY_DIAGRAMS || {};

  const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
  const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
  const mul = (p, k) => [p[0] * k, p[1] * k];
  const norm = p => { const d = Math.hypot(p[0], p[1]); return [p[0] / d, p[1] / d]; };
  const perp = p => [-p[1], p[0]];
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
    // aria-hidden: see the note on the same line in geometry-diagrams.js -- the
    // caption after the figure is what a screen reader should read.
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${body.join("")}</svg>` +
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
    // rx leaves room to the RIGHT of the reassembled rectangle for its height label: the
    // rectangle is a+b = 192 wide, so rx = 272 ended it at 464 and pushed "a − b" to 479 on
    // a 478 canvas, entirely off frame. 246 ends it at 438 and leaves the label 40px.
    const rx = 246, ry = y + (a - (a + b - c)) / 2 + 10; // right panel top (aligned band)
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
      txt([rx + a + b + 8, ry + c / 2 + 4], "a − b", DIM, 12, "start"),
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
  DIAGRAMS["abs-value-relations"] = [(() => {
    const m = frame(-3.7, 3.7, -3.7, 3.7, 60, 18, 290, 290), c = 3;
    const P = (x, y) => m.pt(x, y);
    // the first-quadrant piece solid, its three mirror images ghosted: the move the card teaches
    const q1 = [P(0, 0), P(c, 0), P(0, c)];
    const ghost = (sx, sy) => poly([P(0, 0), P(sx * c, 0), P(0, sy * c)], FNT, 1.3, "none");
    return wrap(410, 358, [
      axes(m),
      ghost(-1, 1), ghost(1, -1), ghost(-1, -1),
      poly(q1, ACC, 2.4),
      seg(P(c, 0), P(-c, 0), FNT, 1.1, "3 3"), seg(P(0, c), P(0, -c), FNT, 1.1, "3 3"),
      txt(add(P(1.05, 1.05), [0, 0]), "x + y \u2264 c", ACC, 12),
      txt(add(P(-2.1, 1.1), [0, 0]), "mirror", FNT, 11),
      cap(410, 358, "drop the bars in the first quadrant, then reflect into the other three")
    ]);
  })(), (() => {
    const m = frame(-3.2, 3.2, -3.2, 3.2, 60, 18, 290, 290);
    const dia = (h, k) => poly([m.pt(h + 1, k), m.pt(h, k + 1), m.pt(h - 1, k), m.pt(h, k - 1)], GLD, 2);
    return wrap(410, 358, [
      axes(m),
      dia(1, 1), dia(-1, 1), dia(1, -1), dia(-1, -1),
      dot(m.pt(1, 1), GLD, 3), dot(m.pt(-1, 1), GLD, 3), dot(m.pt(1, -1), GLD, 3), dot(m.pt(-1, -1), GLD, 3),
      cap(410, 358, "a bar nested inside a shift places the copies: ||x|\u22121| + ||y|\u22121| \u2264 1")
    ]);
  })(), (() => {
    // |x| + |y| + |x-y| = 2. The mixed term folds on y = x, so there are six sectors, not
    // four, and the level set gains two edges. Vertices are computed from the sector rule
    // (2max(|x|,|y|) where the signs agree, 2(|x|+|y|) where they do not), then checked
    // against the relation itself -- the figure is not traced by hand.
    const m = frame(-2.1, 2.1, -2.1, 2.1, 60, 18, 290, 290), c = 2, h = c / 2;
    const V = [[h, 0], [h, h], [0, h], [-h, 0], [-h, -h], [0, -h]];
    const bad = V.filter(v => Math.abs(Math.abs(v[0]) + Math.abs(v[1]) + Math.abs(v[0] - v[1]) - c) > 1e-9);
    return wrap(410, 358, [
      axes(m),
      // the three fold lines: the zero set of each bar
      seg(m.pt(-2.1, -2.1), m.pt(2.1, 2.1), GRN, 1.3, "4 4"),
      poly(V.map(v => m.pt(v[0], v[1])), ACC, 2.4, ACCS),
      ...V.map(v => dot(m.pt(v[0], v[1]), ACC, 3.4)),
      txt(add(m.pt(1.62, 1.18), [0, 0]), "y = x", GRN, 11),
      txt(add(m.pt(0.52, 1.5), [0, 0]), bad.length ? "CHECK FAILED" : "|x|+|y|+|x\u2212y| = 2", ACC, 12),
      cap(410, 358, "the mixed term folds on y = x too, so six sectors give six edges \u2014 a centrally symmetric hexagon, area 3")
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

  // The worked grid from the example: (0,0) to (4,3), right/up steps, with (2,1) and (1,2)
  // closed. Every number is computed by the same sweep the card describes rather than typed
  // in, so the figure cannot drift from the method it illustrates.
  DIAGRAMS["grid-path-fill"] = [(() => {
    const W = 4, H = 3, step = 74, x0 = 62, y0 = 246;
    const blocked = { "2,1": 1, "1,2": 1 };
    const N = {};
    for (let y = 0; y <= H; y++) {
      for (let x = 0; x <= W; x++) {
        N[x + "," + y] = blocked[x + "," + y] ? 0
          : (x === 0 && y === 0) ? 1
          : (N[(x - 1) + "," + y] || 0) + (N[x + "," + (y - 1)] || 0);
      }
    }
    const P = (x, y) => [x0 + x * step, y0 - y * step];
    const parts = [];
    for (let y = 0; y <= H; y++) parts.push(seg(P(0, y), P(W, y), FNT, 1));
    for (let x = 0; x <= W; x++) parts.push(seg(P(x, 0), P(x, H), FNT, 1));
    for (let y = 0; y <= H; y++) {
      for (let x = 0; x <= W; x++) {
        const at = P(x, y), off = blocked[x + "," + y];
        const here = x === W && y === H;
        // bg-card, not bg: tidyDiagram() pins a bare number sitting inside a bg-card disc of
        // radius 9-15 and nudges everything else apart. That rule was written for mass-point
        // weight badges, and these cells are the same shape — a number centered in a disc — so
        // matching it is what keeps the grid's numbers on their lattice points.
        parts.push(circ(at, 13, "none", 0, "var(--bg-card)"));
        if (off) {
          parts.push(circ(at, 9, GLD, 1.8, "none"),
            seg(add(at, [-6, -6]), add(at, [6, 6]), GLD, 1.8),
            seg(add(at, [-6, 6]), add(at, [6, -6]), GLD, 1.8));
        } else {
          parts.push(txt(add(at, [0, 5]), String(N[x + "," + y]),
            here ? ACC : (x === 0 || y === 0) ? FNT : DIM, here ? 16 : 13.5));
        }
      }
    }
    parts.push(txt(add(P(0, 0), [-4, 26]), "start", FNT, 11.5, "end"));
    // Beside the corner, not above it: the top row sits 24px from the edge, so a label
    // stacked over it lands outside the canvas.
    parts.push(txt(add(P(W, H), [30, 5]), "end", ACC, 12));
    parts.push(cap(430, 330, "each cell is the sum of the one left of it and the one below; a closed point holds 0, and the corner reads 5"));
    return wrap(430, 330, parts);
  })(), (() => {
    // Panel 2: the same sweep with a diagonal step allowed, so each cell adds THREE sources
    // instead of two. Drawn on a clear grid because that is where the pattern is legible —
    // these are the Delannoy numbers, and 1, 3, 13, 63 runs down the main diagonal. The three
    // arrows into (2,2) show the rule: 5 + 5 + 3 = 13.
    const W = 4, H = 3, step = 74, x0 = 62, y0 = 246;
    const N = {};
    for (let y = 0; y <= H; y++) {
      for (let x = 0; x <= W; x++) {
        N[x + "," + y] = (x === 0 || y === 0) ? 1
          : N[(x - 1) + "," + y] + N[x + "," + (y - 1)] + N[(x - 1) + "," + (y - 1)];
      }
    }
    const P = (x, y) => [x0 + x * step, y0 - y * step];
    const parts = [];
    for (let y = 0; y <= H; y++) parts.push(seg(P(0, y), P(W, y), FNT, 1));
    for (let x = 0; x <= W; x++) parts.push(seg(P(x, 0), P(x, H), FNT, 1));
    // The three contributions into (2,2), each stopped clear of both discs.
    const tgt = P(2, 2);
    [[1, 2], [2, 1], [1, 1]].forEach(([sx, sy]) => {
      const a = P(sx, sy);
      const dx = tgt[0] - a[0], dy = tgt[1] - a[1], L = Math.hypot(dx, dy);
      const t = 16 / L;
      parts.push(seg([a[0] + dx * t, a[1] + dy * t], [tgt[0] - dx * t, tgt[1] - dy * t], ACC, 2));
    });
    parts.push(seg(P(1, 1), P(2, 2), ACC, 2, "3 3"));
    for (let y = 0; y <= H; y++) {
      for (let x = 0; x <= W; x++) {
        const at = P(x, y), here = x === 2 && y === 2;
        parts.push(circ(at, 13, "none", 0, "var(--bg-card)"));
        parts.push(txt(add(at, [0, 5]), String(N[x + "," + y]),
          here ? ACC : (x === 0 || y === 0) ? FNT : DIM, here ? 15 : 13));
      }
    }
    parts.push(txt(add(P(2, 2), [0, -24]), "5 + 5 + 3 = 13", ACC, 12));
    parts.push(txt(add(P(0, 0), [-4, 26]), "start", FNT, 11.5, "end"));
    parts.push(cap(430, 330, "allow a diagonal step and each cell adds three sources, not two — on a clear grid that is the Delannoy numbers, 1, 3, 13, 63 down the main diagonal"));
    return wrap(430, 330, parts);
  })()];


  // ---------- Figures placed inside write-ups ({{figure:name}} markers) ----------

  BODY["arithmetic-series"] = {
    // 2 + 3 + 4 + 5 + 6 and the same sum reversed, stacked: every column is 2 + 6 = 8 tall.
    "two-staircases": (() => {
      const terms = [2, 3, 4, 5, 6], n = terms.length, top = terms[0] + terms[n - 1];
      const u = 26, X0 = 150, Y0 = 280;                 // Y0 is the bottom edge
      const parts = [];
      terms.forEach((t, i) => {
        const x = X0 + i * u, rev = terms[n - 1 - i];
        parts.push(rect(x, Y0 - t * u, u, t * u, ACC, 1.6, ACCS));
        parts.push(rect(x, Y0 - top * u, u, rev * u, GLD, 1.6, GLDS));
        for (let k = 1; k < t; k++) parts.push(seg([x, Y0 - k * u], [x + u, Y0 - k * u], ACC, 0.6));
        for (let k = 1; k < rev; k++) parts.push(seg([x, Y0 - top * u + k * u], [x + u, Y0 - top * u + k * u], GLD, 0.6));
        parts.push(txt([x + u / 2, Y0 - t * u / 2 + 5], String(t), ACC, 13));
        parts.push(txt([x + u / 2, Y0 - top * u + rev * u / 2 + 5], String(rev), GLD, 13));
      });
      parts.push(rect(X0, Y0 - top * u, n * u, top * u, DIM, 2));
      parts.push(txt([X0 + n * u + 12, Y0 - top * u / 2 + 4], "8 = 2 + 6", DIM, 12.5, "start"));
      parts.push(txt([X0 + n * u / 2, Y0 + 18], "5 terms", DIM, 12.5));
      parts.push(cap(430, 310, "2 + 3 + 4 + 5 + 6 (blue) and the same sum reversed (gold) fill a 5-by-8 rectangle, because every column holds 2 + 6. So the sum is 5 · 8 / 2 = 20."));
      return wrap(430, 310, parts);
    })()
  };

  BODY["geometric-probability"] = {
    // Break points x, y in [0,1]; a triangle forms exactly when every piece is under 1/2.
    "broken-stick": (() => {
      const X0 = 110, Y0 = 34, S = 220;
      const px = v => X0 + S * v, py = v => Y0 + S - S * v;
      const P = (x, y) => [px(x), py(y)];
      const T1 = [P(0, 0.5), P(0.5, 0.5), P(0.5, 1)], T2 = [P(0.5, 0), P(0.5, 0.5), P(1, 0.5)];
      return wrap(430, 310, [
        poly(T1, ACC, 2, ACCS), poly(T2, ACC, 2, ACCS),
        rect(X0, Y0, S, S, DIM, 2),
        seg(P(0.5, 0), P(0.5, 1), FNT, 1.2, "4 4"), seg(P(0, 0.5), P(1, 0.5), FNT, 1.2, "4 4"),
        seg(P(0, 0.5), P(0.5, 1), FNT, 1.2, "4 4"), seg(P(0.5, 0), P(1, 0.5), FNT, 1.2, "4 4"),
        txt([px(0.36), py(0.66) + 4], "x < y", ACC, 11.5),
        txt([px(0.64), py(0.34) + 4], "y < x", ACC, 11.5),
        txt([px(0) - 8, py(0) + 5], "0", DIM, 11, "end"), txt([px(0.5), py(0) + 18], "½", DIM, 12),
        txt([px(1), py(0) + 18], "1", DIM, 11), txt([px(0) - 8, py(0.5) + 5], "½", DIM, 12, "end"),
        txt([px(0) - 8, py(1) + 5], "1", DIM, 11, "end"),
        txt([px(0.5), py(0) + 38], "x", DIM, 14),
        txt([px(0) - 30, py(0.76) + 5], "y", DIM, 14),
        cap(430, 310, "Break a unit stick at x and y. The pieces make a triangle exactly when each is shorter than ½, which cuts out the two shaded triangles. Each is ⅛ of the square, so the probability is ¼.")
      ]);
    })()
  };


  BODY["constructive-counting"] = {
    // President then vice president from A, B, C: the second step always has 2 options,
    // though WHICH two depends on the first pick. The leaves are counted, not asserted.
    "decision-tree": (() => {
      const people = ["A", "B", "C"], root = [250, 42];
      const parts = [dot(root, DIM, 4), txt(add(root, [0, -12]), "start", DIM, 12)];
      let leaves = 0;
      people.forEach((p, i) => {
        const n1 = [135 + i * 115, 132];
        parts.push(seg(root, n1, ACC, 2), dot(n1, ACC, 5), txt(add(n1, [-14, 5]), p, ACC, 14, "end"));
        people.filter(q => q !== p).forEach((q, j) => {
          const n2 = [n1[0] - 30 + j * 60, 222];
          parts.push(seg(n1, n2, GLD, 2), dot(n2, GLD, 4.5));
          parts.push(txt(add(n2, [0, 24]), p + q, GLD, 13));
          leaves++;
        });
      });
      parts.push(txt([16, 136], "3", ACC, 13, "start"), txt([16, 226], "2", GLD, 13, "start"));
      parts.push(txt([16, 118], "president", DIM, 11, "start"), txt([16, 208], "vice pres.", DIM, 11, "start"));
      parts.push(cap(430, 270, "President, then vice president, from A, B and C. The second choice always has " +
        "2 options, though which two depends on the first, so the tree has 3 × 2 = " + leaves + " leaves."));
      return wrap(430, 270, parts);
    })()
  };

  BODY["log-rules"] = {
    // y = 2^x and y = log2 x are reflections of each other in y = x.
    mirror: (() => {
      const m = frame(-1.5, 9.5, -1.5, 9.5, 70, 18, 250, 250);
      const P = m.pt(3, 8), Q = m.pt(8, 3);
      return wrap(430, 300, [
        axes(m),
        seg(m.pt(-1.5, -1.5), m.pt(9.5, 9.5), FNT, 1.4, "5 4"),
        plot(x => Math.pow(2, x), m, -1.5, Math.log2(9.5), 200, ACC, 2.4),
        plot(x => Math.log2(x), m, Math.pow(2, -1.5), 9.5, 200, GLD, 2.4),
        seg(P, Q, DIM, 1.2, "3 3"),
        dot(P, ACC, 4.5), dot(Q, GLD, 4.5),
        txt(add(P, [10, 4]), "(3, 8)", ACC, 12.5, "start"),
        txt(add(Q, [8, 20]), "(8, 3)", GLD, 12.5, "start"),
        txt(m.pt(1.7, 8.8), "y = 2ˣ", ACC, 13, "end"),
        txt(m.pt(4.6, 1.2), "y = log₂ x", GLD, 13, "start"),
        txt(m.pt(9.4, 9.9), "y = x", DIM, 12, "end"),
        cap(430, 300, "Taking a power and taking a log undo each other, so the two graphs are mirror images in the line y = x: (3, 8) is on y = 2ˣ exactly because (8, 3) is on y = log₂ x.")
      ]);
    })()
  };

  BODY["quadratic-formula"] = {
    // x^2 + px as a square plus two strips of width p/2; the missing corner is (p/2)^2.
    "complete-square": (() => {
      const X0 = 110, Y0 = 36, x = 150, h = 60;           // h stands for p/2
      return wrap(430, 300, [
        rect(X0, Y0, x, x, ACC, 2, ACCS),
        rect(X0 + x, Y0, h, x, GLD, 2, GLDS),
        rect(X0, Y0 + x, x, h, GLD, 2, GLDS),
        rect(X0 + x, Y0 + x, h, h, GRN, 2, "none"),
        `<rect x="${X0 + x + 4}" y="${Y0 + x + 4}" width="${h - 8}" height="${h - 8}" fill="none" stroke="${GRN}" stroke-width="1.2" stroke-dasharray="4 3"/>`,
        txt([X0 + x / 2, Y0 + x / 2 + 6], "x²", ACC, 18),
        txt([X0 + x + h / 2, Y0 + x / 2 + 5], "(p/2)x", GLD, 12.5),
        txt([X0 + x / 2, Y0 + x + h / 2 + 5], "(p/2)x", GLD, 12.5),
        txt([X0 + x + h / 2, Y0 + x + h / 2 + 5], "(p/2)²", GRN, 12),
        txt([X0 + x / 2, Y0 - 8], "x", DIM, 13), txt([X0 + x + h / 2, Y0 - 8], "p/2", DIM, 13),
        txt([X0 - 10, Y0 + x / 2 + 5], "x", DIM, 13, "end"), txt([X0 - 10, Y0 + x + h / 2 + 5], "p/2", DIM, 13, "end"),
        cap(430, 300, "x² + px as a square with two strips of width p/2 attached. Filling the missing corner, of area (p/2)², completes a square of side x + p/2: x² + px + (p/2)² = (x + p/2)².")
      ]);
    })()
  };


  BODY["pie"] = {
    // 1..30 by divisibility by 2, 3, 5. Every region count is COUNTED here, then written in.
    "venn-2-3-5": (() => {
      const region = (a, b, c) => {            // a,b,c: required divisibility (true/false) by 2,3,5
        let n = 0;
        for (let k = 1; k <= 30; k++)
          if ((k % 2 === 0) === a && (k % 3 === 0) === b && (k % 5 === 0) === c) n++;
        return n;
      };
      const c2 = [180, 128], c3 = [262, 128], c5 = [221, 196], R = 72;
      const at = (p, dx, dy) => [p[0] + dx, p[1] + dy];
      let total = 0;
      const cells = [
        [[true, false, false], at(c2, -34, -10)], [[false, true, false], at(c3, 34, -10)],
        [[false, false, true], at(c5, 0, 44)], [[true, true, false], [221, 100]],
        [[true, false, true], [184, 178]], [[false, true, true], [258, 178]], [[true, true, true], [221, 150]]
      ].map(([k, p]) => { const n = region(...k); total += n; return txt([p[0], p[1] + 5], String(n), DIM, 15); });
      return wrap(430, 310, [
        circ(c2, R, ACC, 2, ACCS), circ(c3, R, GLD, 2, GLDS), circ(c5, R, GRN, 2, "rgba(40,160,100,0.10)"),
        ...cells,
        txt(at(c2, -58, -66), "÷2", ACC, 14), txt(at(c3, 58, -66), "÷3", GLD, 14), txt(at(c5, 80, 58), "÷5", GRN, 14),
        cap(430, 310, "The numbers 1 to 30 by divisibility by 2, 3 and 5, filled from the center out: 1 in all three, then the pairs, then the singles. The regions add to " + total + ", the answer to the example.")
      ]);
    })()
  };

  BODY["bijection-method"] = {
    // One lattice path and the word its steps spell; the word is read off the path.
    "path-word": (() => {
      const u = 52, X0 = 110, Y0 = 200, W = 4, H = 2;
      const steps = "RRURUR";
      const P = [[0, 0]]; for (const s of steps) { const q = P[P.length - 1]; P.push(s === "R" ? [q[0] + 1, q[1]] : [q[0], q[1] + 1]); }
      const px = q => [X0 + q[0] * u, Y0 - q[1] * u];
      const parts = [];
      for (let i = 0; i <= W; i++) parts.push(seg(px([i, 0]), px([i, H]), FNT, 1));
      for (let j = 0; j <= H; j++) parts.push(seg(px([0, j]), px([W, j]), FNT, 1));
      for (let k = 0; k < steps.length; k++) {
        const a = px(P[k]), b = px(P[k + 1]), m = mid(a, b);
        parts.push(seg(a, b, ACC, 3.2));
        parts.push(txt(steps[k] === "R" ? [m[0], m[1] - 9] : [m[0] - 11, m[1] + 5], steps[k], GLD, 13));
      }
      parts.push(dot(px([0, 0]), DIM, 4.5), dot(px([W, H]), DIM, 4.5));
      parts.push(txt(add(px([0, 0]), [-10, 18]), "start", DIM, 11.5), txt(add(px([W, H]), [10, -10]), "end", DIM, 11.5, "start"));
      parts.push(txt([X0 + W * u / 2, Y0 + 46], steps.split("").join(" "), GLD, 17));
      const ends = P[P.length - 1];
      parts.push(cap(430, 290, "A path from corner to corner is the word spelled by its steps, here " + steps + ". Paths ending at (" + ends.join(", ") + ") and words with four R's and two U's pair off perfectly, so there are C(6, 2) = 15 of each."));
      return wrap(430, 290, parts);
    })()
  };

  BODY["complex-basics"] = {
    // z, its conjugate (reflection in the real axis) and iz (a quarter turn about 0).
    plane: (() => {
      const m = frame(-4.2, 4.6, -3.2, 4.2, 70, 14, 290, 250);
      const z = [3, 2], zb = [z[0], -z[1]], iz = [-z[1], z[0]];
      const O = m.pt(0, 0), Z = m.pt(...z), ZB = m.pt(...zb), IZ = m.pt(...iz);
      const ang = (p, q, r, rr) => {             // right-angle mark at p between rays to q and r
        const u = [q[0] - p[0], q[1] - p[1]], v = [r[0] - p[0], r[1] - p[1]];
        const nu = Math.hypot(...u), nv = Math.hypot(...v);
        const a = [p[0] + u[0] / nu * rr, p[1] + u[1] / nu * rr], b = [p[0] + v[0] / nv * rr, p[1] + v[1] / nv * rr];
        return `<polyline points="${pf(a)} ${pf([a[0] + b[0] - p[0], a[1] + b[1] - p[1]])} ${pf(b)}" fill="none" stroke="${FNT}" stroke-width="1.4"/>`;
      };
      return wrap(430, 300, [
        axes(m),
        seg(O, Z, ACC, 2.2), seg(O, IZ, GRN, 2.2, "6 4"), seg(Z, ZB, GLD, 1.4, "3 3"),
        ang(O, Z, IZ, 13),
        dot(Z, ACC, 5), dot(ZB, GLD, 5), dot(IZ, GRN, 5),
        txt(add(Z, [10, 4]), "z = 3 + 2i", ACC, 13, "start"),
        txt(add(ZB, [10, 5]), '<tspan text-decoration="overline">z</tspan> = 3 − 2i', GLD, 13, "start"),
        txt(add(IZ, [-8, -8]), "iz = −2 + 3i", GRN, 13, "end"),
        txt(m.pt(4.5, -0.45), "Re", DIM, 11.5, "end"), txt(m.pt(0.2, 4.0), "Im", DIM, 11.5, "start"),
        cap(430, 300, "The conjugate <span style=\"text-decoration:overline\">z</span> is the reflection of z in the real axis, and iz is z turned a quarter turn about 0. All three lie at distance |z| = √13 from 0.")
      ]);
    })()
  };


  BODY["weighted-average"] = {
    // 30% and 70% acid balanced at 45%: distances 15 and 25, so weights 25 : 15 = 5 : 3.
    seesaw: (() => {
      const x1 = 30, x2 = 70, xb = 45, L = 60, R = 380, lo = 25, hi = 75;
      const px = v => L + (v - lo) / (hi - lo) * (R - L), y = 150;
      const g = (a, b) => b ? g(b, a % b) : a;
      const d1 = xb - x1, d2 = x2 - xb, k = g(d2, d1), w1 = d2 / k, w2 = d1 / k;   // weights inverse to distances
      const block = 16, parts = [seg([px(lo), y], [px(hi), y], DIM, 3)];
      for (let i = 0; i < w1; i++) parts.push(rect(px(x1) - block / 2, y - 3 - (i + 1) * block, block, block, ACC, 1.4, ACCS));
      for (let i = 0; i < w2; i++) parts.push(rect(px(x2) - block / 2, y - 3 - (i + 1) * block, block, block, GLD, 1.4, GLDS));
      parts.push(poly([[px(xb), y + 2], [px(xb) - 14, y + 26], [px(xb) + 14, y + 26]], DIM, 2, "none"));
      parts.push(txt([px(x1), y + 42], x1 + "%", ACC, 13), txt([px(xb), y + 42], xb + "%", DIM, 13), txt([px(x2), y + 42], x2 + "%", GLD, 13));
      parts.push(txt([(px(x1) + px(xb)) / 2, y + 20], String(d1), DIM, 12.5), txt([(px(xb) + px(x2)) / 2, y + 20], String(d2), DIM, 12.5));
      parts.push(txt([px(x1), y - 12 - w1 * block], w1 + " parts", ACC, 12.5), txt([px(x2), y - 12 - w2 * block], w2 + " parts", GLD, 12.5));
      parts.push(cap(430, 240, "Mixing " + x1 + "% and " + x2 + "% acid to get " + xb + "%: the distances from the balance point are " + d1 + " and " + d2 + ", so the amounts are in the ratio " + d2 + " : " + d1 + " = " + w1 + " : " + w2 + ", the larger amount nearer the average."));
      return wrap(430, 240, parts);
    })()
  };


  BODY["binomial-theorem"] = {
    // Rows 0..5 of Pascal's triangle, computed by the addition rule itself; row 4 highlighted,
    // with the two entries that add to its middle 6.
    pascal: (() => {
      const rows = [[1]];
      for (let n = 1; n <= 5; n++) { const p = rows[n - 1], r = [1]; for (let k = 1; k < n; k++) r.push(p[k - 1] + p[k]); r.push(1); rows.push(r); }
      const dx = 44, dy = 38, cx = 215, y0 = 34, parts = [];
      const at = (n, k) => [cx + (k - n / 2) * dx, y0 + n * dy];
      parts.push(`<rect x="${cx - 2.6 * dx}" y="${y0 + 4 * dy - 17}" width="${5.2 * dx}" height="28" rx="14" fill="${ACCS}" stroke="${ACC}" stroke-width="1.4"/>`);
      rows.forEach((r, n) => r.forEach((v, k) => {
        const hot = (n === 3 && (k === 1 || k === 2)) || (n === 4 && k === 2);
        parts.push(txt(add(at(n, k), [0, 5]), String(v), hot ? GLD : (n === 4 ? ACC : DIM), n === 4 ? 16 : 14));
      }));
      parts.push(seg(add(at(3, 1), [4, 9]), add(at(4, 2), [-6, -12]), GLD, 1.6), seg(add(at(3, 2), [-4, 9]), add(at(4, 2), [6, -12]), GLD, 1.6));
      rows.forEach((r, n) => parts.push(txt([28, at(n, 0)[1] + 5], "n = " + n, FNT, 11.5, "start")));
      parts.push(txt([cx + 2.9 * dx, y0 + 4 * dy + 5], "(x + y)⁴", ACC, 13, "start"));
      const r4 = rows[4].join(" ");
      parts.push(cap(430, 270, "Row 4, " + r4 + ", is the list of coefficients of (x + y)⁴. Each entry is the sum of the two above it, as in " + rows[3][1] + " + " + rows[3][2] + " = " + rows[4][2] + "."));
      return wrap(430, 270, parts);
    })()
  };

  BODY["recursive-counting"] = {
    // A tiling of length n ends in a square or a domino; what is left is any shorter tiling.
    "last-tile": (() => {
      const u = 40, n = 7, X0 = 70, parts = [];
      const row = (y, lastLen, label, col, fill) => {
        const rest = n - lastLen;
        parts.push(`<rect x="${X0}" y="${y}" width="${rest * u}" height="${u}" rx="3" fill="${FNT}" fill-opacity="0.18" stroke="${DIM}" stroke-width="1.4" stroke-dasharray="5 4"/>`);
        parts.push(rect(X0 + rest * u + 3, y, lastLen * u - 3, u, col, 2, fill));
        parts.push(txt([X0 + rest * u / 2, y + u / 2 + 5], label, DIM, 12.5));
        parts.push(txt([X0 + rest * u + lastLen * u / 2 + 1.5, y + u + 17], lastLen === 1 ? "square" : "domino", col, 12));
      };
      row(44, 1, "any tiling of length n − 1", ACC, ACCS);
      row(140, 2, "any tiling of length n − 2", GLD, GLDS);
      parts.push(txt([X0 + n * u / 2, 44 + u + 30], "or", FNT, 13));
      parts.push(txt([X0 + n * u / 2, 238], "aₙ = aₙ₋₁ + aₙ₋₂", DIM, 15));
      parts.push(cap(430, 262, "Every tiling of the strip ends in a square or a domino, never both. Taking that last tile away leaves any tiling of length n − 1 or n − 2, so the counts add: aₙ = aₙ₋₁ + aₙ₋₂."));
      return wrap(430, 262, parts);
    })()
  };


  BODY["symmetry-probability"] = {
    // The six orders of A, B, C. Swapping A and B sends each order in the left column to the
    // one beside it, and swapping again sends it back, so the columns are the same size.
    swap: (() => {
      const left = ["ABC", "ACB", "CAB"], right = ["BAC", "BCA", "CBA"], parts = [];
      const xL = 120, xR = 310, y0 = 76, dy = 50;
      const word = s => s.split("").map(ch =>
        ch === "A" ? `<tspan fill="${ACC}">A</tspan>` : ch === "B" ? `<tspan fill="${GLD}">B</tspan>` : ch).join(" ");
      parts.push(txt([xL, 34], "A before B", DIM, 13), txt([xR, 34], "B before A", DIM, 13),
                 txt([(xL + xR) / 2, 34], "swap A, B", FNT, 12));
      left.forEach((s, i) => {
        const y = y0 + i * dy;
        parts.push(rect(xL - 44, y - 19, 88, 30, DIM, 1.4), rect(xR - 44, y - 19, 88, 30, DIM, 1.4));
        parts.push(txt([xL, y + 2], word(s), DIM, 15), txt([xR, y + 2], word(right[i]), DIM, 15));
        parts.push(seg([xL + 52, y - 4], [xR - 52, y - 4], FNT, 1.4));
        parts.push(`<polygon points="${pf([xR - 52, y - 4])} ${pf([xR - 60, y - 8])} ${pf([xR - 60, y])}" fill="${FNT}"/>`);
        parts.push(`<polygon points="${pf([xL + 52, y - 4])} ${pf([xL + 60, y - 8])} ${pf([xL + 60, y])}" fill="${FNT}"/>`);
      });
      parts.push(cap(430, 210, "Swapping the places of A and B turns each order with A first into one with B first, and swapping again undoes it. The pairing is one-to-one, so each column holds half of the 6 orders, and P(A before B) = 1/2."));
      return wrap(430, 210, parts);
    })()
  };

  BODY["euclidean-algorithm"] = {
    // 252 x 105 at 1.5 px per unit. Two 105-squares leave 42 x 105, two 42-squares leave
    // 21 x 42, and two 21-squares fill it exactly.
    tiling: (() => {
      const k = 1.5, X0 = 40, Y0 = 26, parts = [];
      const sq = (x, y, s, c, fill) => {
        parts.push(rect(X0 + x * k, Y0 + y * k, s * k, s * k, c, 1.8, fill));
        parts.push(txt([X0 + (x + s / 2) * k, Y0 + (y + s / 2) * k + 5], String(s), c, s > 30 ? 15 : 11.5));
      };
      sq(0, 0, 105, ACC, ACCS); sq(105, 0, 105, ACC, ACCS);
      sq(210, 0, 42, GLD, GLDS); sq(210, 42, 42, GLD, GLDS);
      sq(210, 84, 21, GRN, "none"); sq(231, 84, 21, GRN, "none");
      parts.push(txt([X0 + 126 * k, Y0 + 105 * k + 22], "252", DIM, 13));
      parts.push(txt([X0 - 8, Y0 + 52.5 * k + 5], "105", DIM, 13, "end"));
      parts.push(cap(430, 220, "A 252 × 105 rectangle: two 105-squares leave a 42 × 105 strip, two 42-squares leave 21 × 42, and two 21-squares fill it exactly. 21 measures every piece, so it divides both sides, and gcd(252, 105) = 21."));
      return wrap(430, 220, parts);
    })()
  };

  BODY["conditional-probability"] = {
    // All 36 rolls of two dice. Condition B: the sum is 7 (the anti-diagonal). Event A: some
    // die shows 3. Counts are taken from the grid itself, not typed in.
    dice: (() => {
      const c = 32, X0 = 112, Y0 = 50, parts = [];
      let nA = 0, nB = 0, nAB = 0;
      parts.push(txt([X0 + 3 * c, 20], "second die", FNT, 12));
      parts.push(txt([X0 - 34, Y0 + 3 * c + 4], "first die", FNT, 12, "end"));
      for (let i = 1; i <= 6; i++) {
        parts.push(txt([X0 + (i - 0.5) * c, Y0 - 8], String(i), DIM, 12));
        parts.push(txt([X0 - 10, Y0 + (i - 0.5) * c + 4], String(i), DIM, 12, "end"));
        for (let j = 1; j <= 6; j++) {
          const x = X0 + (j - 1) * c, y = Y0 + (i - 1) * c;
          const inB = i + j === 7, inA = i === 3 || j === 3;
          nA += inA; nB += inB; nAB += inA && inB;
          parts.push(rect(x + 2, y + 2, c - 4, c - 4, inB ? ACC : FNT, inB ? 2 : 1,
                          inA && inB ? "rgba(245,196,81,0.5)" : inB ? ACCS : "none"));
          if (inA && !inB) parts.push(dot([x + c / 2, y + c / 2], GLD, 3));
        }
      }
      const LX = X0 + 6 * c + 18;
      parts.push(rect(LX, 60, 14, 14, ACC, 2, ACCS), txt([LX + 20, 71], "sum 7", DIM, 12, "start"));
      parts.push(rect(LX, 86, 14, 14, ACC, 2, "rgba(245,196,81,0.5)"), txt([LX + 20, 97], "sum 7, has a 3", DIM, 12, "start"));
      parts.push(dot([LX + 7, 119], GLD, 3), txt([LX + 20, 123], "has a 3", DIM, 12, "start"));
      parts.push(cap(430, 260, `Knowing the sum is 7 leaves only the ${nB} outlined rolls. ${nAB === 2 ? "Two" : nAB} of them contain a 3, so P(a 3 | sum 7) = ${nAB}/${nB} = 1/3. Without the condition, ${nA} of all 36 rolls contain a 3.`));
      return wrap(430, 260, parts);
    })()
  };

  BODY["completing-the-square"] = {
    // y = x^2 - 6x + 11 = (x - 3)^2 + 2: the line y = 2 plus a square that is never negative.
    minimum: (() => {
      const m = frame(-0.5, 6.5, -0.8, 11.5, 50, 16, 340, 236);
      const f = x => (x - 3) * (x - 3) + 2;
      return wrap(430, 280, [
        axes(m),
        seg(m.pt(-0.5, 2), m.pt(6.5, 2), FNT, 1.4, "5 4"),
        plot(f, m, 3 - 3.05, 3 + 3.05),
        seg(m.pt(5, 2), m.pt(5, f(5)), GLD, 3.2),
        txt(add(m.pt(5, 4), [9, 4]), "(x − 3)²", GLD, 12.5, "start"),
        dot(m.pt(3, 2), ACC, 5), txt(add(m.pt(3, 2), [0, 22]), "(3, 2)", ACC, 12.5),
        txt(add(m.pt(6.5, 2), [-2, -7]), "y = 2", FNT, 12, "end"),
        txt(m.pt(3, 10), "y = (x − 3)² + 2", ACC, 13),
        cap(430, 280, "x² − 6x + 11 rewritten as (x − 3)² + 2 is the dashed line y = 2 plus a square. The square, the gold gap, is never negative and is zero only at x = 3, so the lowest value is 2, at (3, 2).")
      ]);
    })()
  };

  BODY["double-angle"] = {
    // Two sides of length 1 (200 px) with angle 2θ between them, θ = 34°. The altitude from the
    // apex halves the angle and the base, making two right triangles with legs sin θ and cos θ.
    isosceles: (() => {
      const L = 200, th = 34, A = [215, 40];
      const B = [A[0] - L * Math.sin(rad(th)), A[1] + L * Math.cos(rad(th))];
      const C = [A[0] + L * Math.sin(rad(th)), B[1]], M = [A[0], B[1]];
      const arc = (r, d1, d2) => `<path d="M ${pf(onC(A, r, d1))} A ${r} ${r} 0 0 1 ${pf(onC(A, r, d2))}" fill="none" stroke="${GLD}" stroke-width="1.8"/>`;
      const dB = 90 + th, dC = 90 - th;                       // screen angles of AB and AC
      return wrap(430, 250, [
        poly([A, B, C], DIM, 2, ACCS),
        seg(A, M, ACC, 2, "5 4"),
        `<polyline points="${pf(add(M, [-11, 0]))} ${pf(add(M, [-11, -11]))} ${pf(add(M, [0, -11]))}" fill="none" stroke="${FNT}" stroke-width="1.5"/>`,
        arc(30, dC, 90), arc(34, 90, dB),
        txt(add(onC(A, 46, (90 + dC) / 2), [0, 4]), "θ", GLD, 13), txt(add(onC(A, 48, (90 + dB) / 2), [0, 4]), "θ", GLD, 13),
        txt(add(mid(A, B), [-14, -2]), "1", DIM, 14, "end"), txt(add(mid(A, C), [14, -2]), "1", DIM, 14, "start"),
        txt(add(mid(A, M), [7, 26]), "cos θ", ACC, 13, "start"),
        txt(add(mid(B, M), [0, 20]), "sin θ", DIM, 13), txt(add(mid(M, C), [0, 20]), "sin θ", DIM, 13),
        cap(430, 250, "Two sides of length 1 with angle 2θ between them, so the area is ½ sin 2θ. The altitude splits the triangle into two right triangles with legs sin θ and cos θ, so the area is also ½ · 2 sin θ · cos θ.")
      ]);
    })()
  };

  BODY["relative-motion"] = {
    // The worked chase: 8 m/s behind 5 m/s with a 60 m gap. 4 px per metre of gap, 8 px per m/s.
    frames: (() => {
      const X1 = 90, X2 = 90 + 60 * 4, parts = [];
      const arrow = (x, y, len, c) => {
        parts.push(seg([x + 7, y], [x + len, y], c, 2.2));
        parts.push(`<polygon points="${pf([x + len + 6, y])} ${pf([x + len - 3, y - 5])} ${pf([x + len - 3, y + 5])}" fill="${c}"/>`);
      };
      const row = (y, title, v1, v2) => {
        parts.push(txt([30, y - 38], title, FNT, 12.5, "start"));
        parts.push(seg([40, y], [410, y], FNT, 1.2));
        parts.push(dot([X1, y], ACC, 6), dot([X2, y], GLD, 6));
        arrow(X1, y, v1 * 8, ACC);
        parts.push(txt([X1 + v1 * 4 + 4, y - 12], `${v1} m/s`, ACC, 12.5));
        if (v2) { arrow(X2, y, v2 * 8, GLD); parts.push(txt([X2 + v2 * 4 + 4, y - 12], `${v2} m/s`, GLD, 12.5)); }
        else parts.push(txt([X2, y - 12], "at rest", GLD, 12.5));
        parts.push(seg([X1, y + 20], [X2, y + 20], DIM, 1.4), seg([X1, y + 15], [X1, y + 25], DIM, 1.4), seg([X2, y + 15], [X2, y + 25], DIM, 1.4));
        parts.push(txt([(X1 + X2) / 2, y + 38], "60 m", DIM, 12.5));
      };
      row(84, "on the ground", 8, 5);
      row(200, "from the slower runner", 3, 0);
      parts.push(cap(430, 250, "On the ground both runners move. From the slower runner's point of view it stands still and the chaser comes on at 8 − 5 = 3 m/s, so the 60 m gap closes in 60 ÷ 3 = 20 seconds."));
      return wrap(430, 250, parts);
    })()
  };


  BODY["gcd-lcm-product"] = {
    // 72 = 2^3 * 3^2 and 60 = 2^2 * 3 * 5, one pair of columns per prime (a blue, b gold).
    exponents: (() => {
      const primes = [[2, 3, 2], [3, 2, 1], [5, 0, 1]], s = 24, gap = 3, base = 176, parts = [];
      let g = 1, l = 1, a = 1, b = 1;
      primes.forEach(([p, ea, eb], i) => {
        const cx = 110 + i * 105;
        [[ea, cx - 30, ACC, ACCS], [eb, cx + 6, GLD, GLDS]].forEach(([e, x, c, f]) => {
          for (let k = 0; k < e; k++) parts.push(rect(x, base - (k + 1) * (s + gap), s, s, c, 1.6, f));
          parts.push(seg([x - 2, base + 1], [x + s + 2, base + 1], FNT, 1.2));
        });
        parts.push(txt([cx - 18, base + 16], "a", ACC, 12), txt([cx + 18, base + 16], "b", GLD, 12));
        parts.push(txt([cx, base + 36], `prime ${p}`, DIM, 12.5));
        parts.push(txt([cx, base + 54], `min ${Math.min(ea, eb)} · max ${Math.max(ea, eb)}`, FNT, 12));
        g *= p ** Math.min(ea, eb); l *= p ** Math.max(ea, eb); a *= p ** ea; b *= p ** eb;
      });
      parts.push(txt([205, 34], `a = ${a} = 2³ · 3²`, ACC, 13, "end"), txt([235, 34], `b = ${b} = 2² · 3 · 5`, GLD, 13, "start"));
      parts.push(txt([205, 262], `gcd = 2² · 3 = ${g}`, DIM, 13, "end"), txt([235, 262], `lcm = 2³ · 3² · 5 = ${l}`, DIM, 13, "start"));
      parts.push(cap(430, 280, `Each prime's exponents, drawn as columns. The gcd takes the shorter column and the lcm the taller, so between them they use every block exactly once: ${g} · ${l} = ${g * l} = ${a} · ${b}.` + (g * l === a * b ? "" : " MISMATCH")));
      return wrap(430, 280, parts);
    })()
  };

  BODY["periodic-sequences"] = {
    // x1 = 2, x_{n+1} = 1/(1 - x_n): 2, -1, 1/2, 2, ... Values are computed, then written as text.
    cycle: (() => {
      const vals = [2];
      for (let n = 1; n < 9; n++) vals.push(1 / (1 - vals[n - 1]));
      const show = v => Math.abs(v - 2) < 1e-9 ? "2" : Math.abs(v + 1) < 1e-9 ? "−1" : Math.abs(v - 0.5) < 1e-9 ? "½" : "?";
      const cols = [GRN, ACC, GLD], w = 40, X0 = 17, y = 92, parts = [];
      vals.forEach((v, i) => {
        const x = X0 + i * 44, c = cols[(i + 1) % 3];
        parts.push(rect(x, y, w, 36, c, 1.8, i < 3 ? (c === ACC ? ACCS : c === GLD ? GLDS : "none") : "none"));
        parts.push(txt([x + w / 2, y + 24], show(v), c, 15));
        parts.push(txt([x + w / 2, y - 8], `x<tspan font-size="9" dy="3">${i + 1}</tspan>`, FNT, 12));
      });
      const c1 = X0 + w / 2, c4 = X0 + 3 * 44 + w / 2;
      parts.push(`<path d="M ${c4} ${y - 22} C ${c4 - 20} ${y - 62}, ${c1 + 20} ${y - 62}, ${c1} ${y - 22}" fill="none" stroke="${DIM}" stroke-width="1.5"/>`);
      parts.push(`<polygon points="${c1},${y - 20} ${c1 - 4},${y - 29} ${c1 + 5},${y - 27}" fill="${DIM}"/>`);
      parts.push(txt([(c1 + c4) / 2, y - 56], "x₄ = x₁, so the block repeats", DIM, 12));
      parts.push(txt([80, 164], "n ≡ 1: 2", ACC, 12.5), txt([215, 164], "n ≡ 2: −1", GLD, 12.5), txt([350, 164], "n ≡ 0: ½", GRN, 12.5));
      parts.push(cap(430, 186, "x₁ = 2 and xₙ₊₁ = 1/(1 − xₙ). The value 2 comes back at x₄, and each term depends only on the one before, so the block 2, −1, ½ repeats forever and xₙ depends only on n mod 3. For x₂₀₂₄, 2024 ≡ 2, so it is −1." + (vals.every((v, i) => show(v) !== "?") ? "" : " MISMATCH")));
      return wrap(430, 186, parts);
    })()
  };


  BODY["states-recursion-prob"] = {
    // A walk on a cube from one corner to the opposite one, corners merged by distance from the
    // start. The expected steps are solved here from the three equations, not typed in.
    cube: (() => {
      const E1 = 9, E0 = 1 + E1, E2 = 1 + (2 / 3) * E1;
      const ok = Math.abs(E1 - (1 + E0 / 3 + (2 / 3) * E2)) < 1e-9;
      const xs = [65, 165, 265, 365], y = 100, r = 22, parts = [];
      const head = (end, from, c) => {
        const dx = end[0] - from[0], dy = end[1] - from[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
        return `<polygon points="${pf(end)} ${pf([end[0] - 9 * ux - 4.5 * uy, end[1] - 9 * uy + 4.5 * ux])} ${pf([end[0] - 9 * ux + 4.5 * uy, end[1] - 9 * uy - 4.5 * ux])}" fill="${c}"/>`;
      };
      const arc = (x1, x2, up, label, c) => {
        const s = up ? -1 : 1, a = [x1 + (x2 > x1 ? 14 : -14), y + s * 17], b = [x2 + (x2 > x1 ? -14 : 14), y + s * 17];
        const ctl = [(x1 + x2) / 2, y + s * 50];
        parts.push(`<path d="M ${pf(a)} Q ${pf(ctl)} ${pf(b)}" fill="none" stroke="${c}" stroke-width="1.6"/>`, head(b, ctl, c));
        parts.push(txt([(x1 + x2) / 2, y + s * 38 + (up ? -2 : 12)], label, c, 13));
      };
      arc(xs[0], xs[1], true, "1", ACC); arc(xs[1], xs[2], true, "2/3", ACC); arc(xs[2], xs[3], true, "1/3", ACC);
      arc(xs[1], xs[0], false, "1/3", GLD); arc(xs[2], xs[1], false, "2/3", GLD);
      const E = [E0, E1, E2, 0], n = ["1 corner", "3 corners", "3 corners", "1 corner"];
      xs.forEach((x, i) => {
        parts.push(circ([x, y], r, DIM, 2, "none"));
        if (i === 3) parts.push(circ([x, y], r - 4, DIM, 1.4, "none"));
        parts.push(txt([x, y + 5], String(i), DIM, 15));
        parts.push(txt([x, y + 88], n[i], FNT, 12), txt([x, y + 108], `E = ${r1(E[i])}`, DIM, 13));
      });
      parts.push(txt([215, 22], "distance from the starting corner", FNT, 12));
      parts.push(cap(430, 230, "The eight corners of the cube merge into four states by their distance from the start. From distance 1 a step goes back with probability 1/3 and forward with 2/3; from distance 2, back with 2/3 and on to the finish with 1/3. Solving the three equations gives E = 10 from the start." + (ok ? "" : " MISMATCH")));
      return wrap(430, 230, parts);
    })()
  };

  BODY["power-sums"] = {
    // A square of side 1 + 2 + 3 + 4 = 10 (20 px per unit) cut into L-shaped bands of area k^3.
    cubes: (() => {
      const u = 20, X0 = 115, Y0 = 44, T = k => k * (k + 1) / 2, parts = [];
      const P = (x, y) => [X0 + u * x, Y0 + u * y];
      const cols = [[GRN, "none"], [ACC, ACCS], [GLD, GLDS], [ACC, ACCS]];
      let total = 0;
      for (let i = 0; i <= 10; i++) parts.push(seg(P(i, 0), P(i, 10), FNT, 0.6), seg(P(0, i), P(10, i), FNT, 0.6));
      for (let k = 1; k <= 4; k++) {
        const a = T(k - 1), b = T(k), [c, f] = cols[k - 1];
        total += b * b - a * a;
        parts.push(poly([P(a, 0), P(b, 0), P(b, b), P(0, b), P(0, a), P(a, a)], c, 2, f));
        parts.push(txt(add(P((a + b) / 2, 0), [0, -8]), String(k), DIM, 12.5));
        const lab = k === 1 ? "1" : `${k}³ = ${k * k * k}`;
        parts.push(txt(add(P((a + b) / 2, k === 1 ? 0.5 : a / 2 + b / 4), [0, 5]), lab, c, k === 1 ? 11 : 13));
      }
      parts.push(txt(add(P(10, 5), [12, 5]), "10", DIM, 13, "start"));
      parts.push(cap(430, 290, `A square of side 1 + 2 + 3 + 4 = 10, cut into L-shaped bands. The kth band has area k³, so 1 + 8 + 27 + 64 = ${total} = 10²: the cubes add up to the square of the sum.` + (total === 100 ? "" : " MISMATCH")));
      return wrap(430, 290, parts);
    })()
  };

  BODY["multiset-permutations"] = {
    // BANANA with its three A's labeled: the 3! label orders all look the same once erased.
    labels: (() => {
      const perms = [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]], sub = "₀₁₂₃";
      const target = [300, 130], parts = [];
      perms.forEach((p, i) => {
        const y = 42 + i * 36;
        parts.push(txt([120, y + 5], `B A${sub[p[0]]} N A${sub[p[1]]} N A${sub[p[2]]}`, DIM, 15));
        parts.push(seg([182, y], [target[0] - 12, target[1]], FNT, 1.2));
      });
      parts.push(`<polygon points="${pf(target)} ${pf([target[0] - 10, target[1] - 5])} ${pf([target[0] - 10, target[1] + 5])}" fill="${FNT}"/>`);
      parts.push(txt([target[0] + 50, target[1] + 6], "BANANA", ACC, 17));
      parts.push(cap(430, 262, "Label the three A's and the 3! = 6 orders of the labels give six different labeled words, all of which look like BANANA once the labels are erased. The two N's double that, so each visible word is counted 3! · 2! = 12 times among the 6! = 720 labeled ones, and there are 720 ÷ 12 = 60 words."));
      return wrap(430, 262, parts);
    })()
  };

  BODY["binomial-row-sums"] = {
    // Subsets of {1,2,3}, paired by toggling 1. Blue: even size. Gold: odd size.
    toggle: (() => {
      const left = [[], [2], [3], [2, 3]], parts = [];
      const name = s => s.length ? "{" + s.join(", ") + "}" : "∅";
      const col = s => s.length % 2 ? GLD : ACC;
      let even = 0, odd = 0;
      parts.push(txt([110, 30], "without 1", FNT, 12.5), txt([320, 30], "with 1", FNT, 12.5));
      left.forEach((s, i) => {
        const t = [1].concat(s), y = 62 + i * 42;
        [s, t].forEach(z => (z.length % 2 ? odd++ : even++));
        parts.push(rect(62, y - 17, 96, 28, col(s), 1.6, s.length % 2 ? GLDS : ACCS), txt([110, y + 2], name(s), col(s), 14));
        parts.push(rect(272, y - 17, 96, 28, col(t), 1.6, t.length % 2 ? GLDS : ACCS), txt([320, y + 2], name(t), col(t), 14));
        parts.push(seg([166, y - 3], [264, y - 3], FNT, 1.3));
        parts.push(`<polygon points="${pf([264, y - 3])} ${pf([256, y - 7])} ${pf([256, y + 1])}" fill="${FNT}"/>`);
        parts.push(`<polygon points="${pf([166, y - 3])} ${pf([174, y - 7])} ${pf([174, y + 1])}" fill="${FNT}"/>`);
      });
      parts.push(cap(430, 230, `Toggling element 1 pairs the 8 subsets of {1, 2, 3} into 4 pairs, and each pair has one subset of even size (blue) and one of odd size (gold). So there are ${even} of each, and the alternating row sum 1 − 3 + 3 − 1 is 0.` + (even === odd ? "" : " MISMATCH")));
      return wrap(430, 230, parts);
    })()
  };


  BODY["invariants-coloring"] = {
    // 8 x 8 board without two opposite corners, colored like a chessboard. Colors are counted.
    board: (() => {
      const s = 26, X0 = 96, Y0 = 26, parts = [];
      let dark = 0, light = 0;
      for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) {
        const x = X0 + j * s, y = Y0 + i * s, gone = (i === 0 && j === 0) || (i === 7 && j === 7);
        if (gone) {
          parts.push(rect(x + 2, y + 2, s - 4, s - 4, FNT, 1, "none"), seg([x + 7, y + 7], [x + s - 7, y + s - 7], FNT, 1.4), seg([x + s - 7, y + 7], [x + 7, y + s - 7], FNT, 1.4));
          continue;
        }
        const isDark = (i + j) % 2 === 0;
        isDark ? dark++ : light++;
        parts.push(rect(x, y, s, s, FNT, 0.8, isDark ? "rgba(91,140,255,0.32)" : "none"));
      }
      parts.push(rect(X0 + 3 * s + 2, Y0 + 2 * s + 2, 2 * s - 4, s - 4, GLD, 3, "none"));
      parts.push(rect(X0, Y0, 8 * s, 8 * s, DIM, 1.6));
      const LX = X0 + 8 * s + 16;
      parts.push(rect(LX, 70, 14, 14, FNT, 0.8, "rgba(91,140,255,0.32)"), txt([LX + 20, 81], `${dark} dark`, DIM, 12.5, "start"));
      parts.push(rect(LX, 96, 14, 14, FNT, 0.8, "none"), txt([LX + 20, 107], `${light} light`, DIM, 12.5, "start"));
      parts.push(rect(LX, 124, 26, 13, GLD, 2.4, "none"), txt([LX + 32, 135], "a domino", GLD, 12.5, "start"));
      parts.push(cap(430, 262, `The two removed corners are both dark, leaving ${dark} dark squares and ${light} light ones. Every domino, wherever it lies, covers one of each, so any set of dominoes covers equally many; the board's ${dark} and ${light} cannot be matched.` + (dark === 30 && light === 32 ? "" : " MISMATCH")));
      return wrap(430, 262, parts);
    })()
  };

  BODY["fermats-little-theorem"] = {
    // Multiplication by 3 permutes the nonzero remainders mod 7; the images are computed.
    shuffle: (() => {
      const p = 7, a = 3, xs = [1, 2, 3, 4, 5, 6].map(k => 90 + (k - 1) * 52), yT = 64, yB = 170, parts = [];
      const img = xs.map((_, i) => (a * (i + 1)) % p);
      xs.forEach((x, i) => {
        const j = img[i] - 1;
        parts.push(seg([x, yT + 16], [xs[j], yB - 16], i % 2 ? GLD : ACC, 1.6));
        parts.push(rect(x - 17, yT - 17, 34, 30, DIM, 1.4, "var(--bg)"), txt([x, yT + 3], String(i + 1), DIM, 14));
        parts.push(rect(x - 17, yB - 15, 34, 30, DIM, 1.4, "var(--bg)"), txt([x, yB + 5], String(i + 1), DIM, 14));
        parts.push(txt([x, yT - 24], `${a}·${i + 1} ≡ ${img[i]}`, i % 2 ? GLD : ACC, 11));
      });
      parts.push(txt([46, yT + 4], "k", FNT, 13, "end"), txt([46, yB + 5], "3k", FNT, 13, "end"));
      const perm = img.slice().sort().join() === "1,2,3,4,5,6";
      parts.push(cap(430, 210, `Multiplying 1, 2, …, 6 by 3 mod 7 gives ${img.join(", ")}: the same six numbers in a new order. So the two products agree, 3⁶ · 6! ≡ 6! (mod 7), and cancelling 6! leaves 3⁶ ≡ 1.` + (perm ? "" : " MISMATCH")));
      return wrap(430, 210, parts);
    })()
  };

  BODY["legendres-formula"] = {
    // n = 30, p = 3: a stack of v_3(k) dots over each k. Rows are counted as floors.
    dots: (() => {
      const n = 30, p = 3, w = 13, X0 = 22, base = 132, parts = [];
      const v = k => { let e = 0; while (k % p === 0) { k /= p; e++; } return e; };
      const rows = [0, 0, 0], cols = [ACC, GLD, GRN];
      for (let k = 1; k <= n; k++) {
        const x = X0 + (k - 0.5) * w;
        for (let e = 0; e < v(k); e++) { parts.push(dot([x, base - e * 18], cols[e], 4.5)); rows[e]++; }
        parts.push(seg([x, base + 12], [x, base + 16], FNT, 1));
        if (k % 3 === 0) parts.push(txt([x, base + 30], String(k), DIM, 10.5));
      }
      parts.push(seg([X0, base + 12], [X0 + n * w, base + 12], FNT, 1.2));
      const fl = [Math.floor(n / 3), Math.floor(n / 9), Math.floor(n / 27)];
      const labels = ["multiples of 3", "multiples of 9", "multiples of 27"];
      labels.forEach((L, e) => parts.push(txt([60 + e * 130, 196], `${L}: ${rows[e]}`, cols[e], 12)));
      const ok = rows.every((r, e) => r === fl[e]);
      parts.push(cap(430, 214, `Above each k up to 30, one dot per factor of 3 in k. Counted by rows, the first row has ⌊30/3⌋ = ${fl[0]} dots, the second ⌊30/9⌋ = ${fl[1]}, the third ⌊30/27⌋ = ${fl[2]}, so 30! contains 3 exactly ${fl[0] + fl[1] + fl[2]} times.` + (ok ? "" : " MISMATCH")));
      return wrap(430, 214, parts);
    })()
  };


  BODY["uniform-overcount"] = {
    // Two scoops from flavors A-D, order recorded: 16 cells. Mixed pairs appear twice, mirrored
    // across the diagonal; doubles once. Counts are taken from the grid.
    grid: (() => {
      const F = "ABCD", c = 44, X0 = 150, Y0 = 56, parts = [];
      let mixed = 0, doubles = 0;
      parts.push(txt([X0 + 2 * c, 24], "second scoop", FNT, 12), txt([X0 - 40, Y0 + 2 * c + 4], "first scoop", FNT, 12, "end"));
      for (let i = 0; i < 4; i++) {
        parts.push(txt([X0 + (i + 0.5) * c, Y0 - 8], F[i], DIM, 13), txt([X0 - 10, Y0 + (i + 0.5) * c + 5], F[i], DIM, 13, "end"));
        for (let j = 0; j < 4; j++) {
          const dbl = i === j;
          dbl ? doubles++ : mixed++;
          parts.push(rect(X0 + j * c + 2, Y0 + i * c + 2, c - 4, c - 4, dbl ? GLD : ACC, dbl ? 2 : 1.2, dbl ? GLDS : ACCS));
          parts.push(txt([X0 + (j + 0.5) * c, Y0 + (i + 0.5) * c + 5], F[i] + F[j], dbl ? GLD : ACC, 12.5));
        }
      }
      const total = mixed / 2 + doubles;
      parts.push(cap(430, 262, `The ${mixed + doubles} ordered choices of two scoops from four flavors. Each mixed pair, like AB and BA, appears twice, mirrored across the diagonal, but each double appears once. So the number of unordered choices is (16 − ${doubles})/2 + ${doubles} = ${total}, not 16/2 = 8.` + (total === 10 ? "" : " MISMATCH")));
      return wrap(430, 262, parts);
    })()
  };

  BODY["am-gm"] = {
    // Four a x b rectangles (a = 150, b = 60) in a pinwheel inside the (a + b) square; the hole is (a - b)^2.
    pinwheel: (() => {
      const a = 150, b = 60, X0 = 110, Y0 = 36, parts = [];
      const R = [[X0, Y0, a, b], [X0 + a, Y0, b, a], [X0 + b, Y0 + a, a, b], [X0, Y0 + b, b, a]];
      R.forEach(([x, y, w, h], i) => {
        parts.push(rect(x, y, w, h, i % 2 ? GLD : ACC, 1.8, i % 2 ? GLDS : ACCS));
        parts.push(txt([x + w / 2, y + h / 2 + 5], "ab", i % 2 ? GLD : ACC, 14));
      });
      parts.push(rect(X0 + b, Y0 + b, a - b, a - b, GRN, 1.8, "none"));
      parts.push(txt([X0 + (a + b) / 2, Y0 + (a + b) / 2 + 5], "(a − b)²", GRN, 13.5));
      parts.push(txt([X0 + a / 2, Y0 - 8], "a", DIM, 13), txt([X0 + a + b / 2, Y0 - 8], "b", DIM, 13));
      parts.push(txt([X0 + a + b + 10, Y0 + (a + b) / 2 + 5], "a + b", DIM, 13, "start"));
      parts.push(cap(430, 272, "Four a × b rectangles fit inside a square of side a + b, leaving a square hole of side a − b. So 4ab ≤ (a + b)², with equality only when the hole disappears, at a = b. Taking square roots, (a + b)/2 ≥ √(ab)."));
      return wrap(430, 272, parts);
    })()
  };

  BODY["pythagorean-identities"] = {
    // Unit circle, R = 130 px, theta = 35 degrees. Small triangle: cos, sin, 1. Tangent line x = 1:
    // the similar triangle with legs 1, tan and hypotenuse sec.
    "unit-circle": (() => {
      const O = [120, 222], R = 130, th = 35, c = Math.cos(rad(th)), s = Math.sin(rad(th)), t = Math.tan(rad(th));
      const P = [O[0] + R * c, O[1] - R * s], F = [P[0], O[1]], X = [O[0] + R, O[1]], T = [O[0] + R, O[1] - R * t];
      const arc = `<path d="M ${pf(X)} A ${R} ${R} 0 0 0 ${pf([O[0], O[1] - R])}" fill="none" stroke="${FNT}" stroke-width="1.4"/>`;
      const th2 = `<path d="M ${pf([O[0] + 30, O[1]])} A 30 30 0 0 0 ${pf([O[0] + 30 * c, O[1] - 30 * s])}" fill="none" stroke="${DIM}" stroke-width="1.5"/>`;
      return wrap(430, 262, [
        seg([O[0] - 10, O[1]], [O[0] + R + 60, O[1]], FNT, 1.2), seg([O[0], O[1] + 10], [O[0], O[1] - R - 12], FNT, 1.2),
        arc, seg([X[0], O[1] + 8], [X[0], T[1] - 30], FNT, 1.2, "5 4"),
        poly([O, X, T], GLD, 1.6, GLDS), poly([O, F, P], ACC, 1.8, ACCS),
        th2, txt(add(O, [40, -9]), "θ", DIM, 12.5),
        dot(P, ACC, 4.5), dot(T, GLD, 4.5),
        txt(add(mid(O, F), [0, 18]), "cos θ", ACC, 12.5), txt(add(mid(F, P), [-6, 4]), "sin θ", ACC, 12.5, "end"),
        txt(add(mid(O, P), [-8, -8]), "1", ACC, 13, "end"),
        txt(add(mid(X, T), [8, 4]), "tan θ", GLD, 12.5, "start"), txt(add(mid(P, T), [-10, -8]), "sec θ", GLD, 12.5, "end"),
        txt(add(X, [8, 18]), "1", GLD, 12.5, "start"),
        cap(430, 262, "The point at angle θ on the unit circle is (cos θ, sin θ), so the small right triangle gives cos²θ + sin²θ = 1. Extending the radius to the tangent line x = 1 makes a similar triangle with legs 1 and tan θ and hypotenuse sec θ, which gives 1 + tan²θ = sec²θ.")
      ]);
    })()
  };

  BODY["handshakes-diagonals"] = {
    // A convex hexagon on a circle at irregular angles, so no three diagonals meet. All diagonal
    // crossings are computed and counted; four vertices and their one crossing are highlighted.
    crossings: (() => {
      const O = [215, 140], R = 112, V = [5, 70, 140, 200, 255, 320].map(d => onC(O, R, d));
      const diags = [];
      for (let i = 0; i < 6; i++) for (let j = i + 2; j < 6; j++) if (!(i === 0 && j === 5)) diags.push([i, j]);
      const X = (p, q, r, s) => {
        const d = (p[0] - q[0]) * (r[1] - s[1]) - (p[1] - q[1]) * (r[0] - s[0]);
        const t = ((p[0] - r[0]) * (r[1] - s[1]) - (p[1] - r[1]) * (r[0] - s[0])) / d;
        const u = -((p[0] - q[0]) * (p[1] - r[1]) - (p[1] - q[1]) * (p[0] - r[0])) / d;
        return t > 1e-9 && t < 1 - 1e-9 && u > 1e-9 && u < 1 - 1e-9 ? [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])] : null;
      };
      const pts = [];
      for (let m = 0; m < diags.length; m++) for (let n = m + 1; n < diags.length; n++) {
        const [a, b] = diags[m], [c, d] = diags[n];
        const P = X(V[a], V[b], V[c], V[d]);
        if (P) pts.push(P);
      }
      const distinct = pts.filter((P, i) => pts.findIndex(Q => Math.hypot(P[0] - Q[0], P[1] - Q[1]) < 1) === i).length;
      const hi = [0, 1, 3, 4], H = X(V[0], V[3], V[1], V[4]);
      const parts = [
        ...diags.map(([i, j]) => seg(V[i], V[j], FNT, 1.2)),
        poly(V, DIM, 2),
        poly(hi.map(i => V[i]), ACC, 1.6, ACCS), seg(V[0], V[3], ACC, 2), seg(V[1], V[4], ACC, 2),
        ...pts.map(P => dot(P, GLD, 2.6)), dot(H, GLD, 5),
        ...V.map((P, i) => dot(P, hi.indexOf(i) >= 0 ? ACC : DIM, 4.5))
      ];
      parts.push(cap(430, 272, `A convex hexagon has 6 · 3/2 = ${diags.length} diagonals. Any four vertices form a quadrilateral whose two diagonals cross exactly once (highlighted), and each crossing comes from exactly one such four, so with no three diagonals through one point there are C(6, 4) = ${distinct} crossings (dots).` + (distinct === 15 && pts.length === 15 && diags.length === 9 ? "" : " MISMATCH")));
      return wrap(430, 272, parts);
    })()
  };


  BODY["expected-value"] = {
    // Three fair flips: rows are the 8 outcomes, columns the indicator of heads on each flip.
    flips: (() => {
      const rows = [], X0 = 70, cols = [150, 205, 260], TOT = 335, Y0 = 52, h = 22, parts = [];
      for (let m = 0; m < 8; m++) rows.push([4, 2, 1].map(b => (m & b) ? 1 : 0));
      parts.push(txt([X0, Y0 - 18], "outcome", FNT, 12), txt([TOT, Y0 - 18], "heads", FNT, 12));
      cols.forEach((x, j) => parts.push(txt([x, Y0 - 18], `flip ${j + 1}`, FNT, 12)));
      rows.forEach((r, i) => {
        const y = Y0 + i * h;
        parts.push(txt([X0, y], r.map(v => v ? "H" : "T").join(""), DIM, 13));
        r.forEach((v, j) => parts.push(txt([cols[j], y], String(v), v ? ACC : FNT, 13)));
        parts.push(txt([TOT, y], String(r[0] + r[1] + r[2]), GLD, 13));
      });
      const yA = Y0 + 8 * h + 8;
      parts.push(seg([40, yA - 14], [370, yA - 14], FNT, 1.2));
      const colAvg = [0, 1, 2].map(j => rows.reduce((s, r) => s + r[j], 0) / 8);
      const totAvg = rows.reduce((s, r) => s + r[0] + r[1] + r[2], 0) / 8;
      parts.push(txt([X0, yA + 4], "average", DIM, 12.5));
      cols.forEach((x, j) => parts.push(txt([x, yA + 4], colAvg[j] === 0.5 ? "1/2" : String(colAvg[j]), ACC, 13)));
      parts.push(txt([TOT, yA + 4], totAvg === 1.5 ? "3/2" : String(totAvg), GLD, 13));
      const ok = Math.abs(totAvg - colAvg.reduce((a, b) => a + b, 0)) < 1e-12;
      parts.push(cap(430, 270, "Three fair coin flips, one row per outcome. Each column is the indicator that one flip lands heads, and the number of heads is the row total. The average of the totals, 3/2, equals the sum of the column averages, 1/2 + 1/2 + 1/2: adding the columns first is linearity, and it never used independence." + (ok ? "" : " MISMATCH")));
      return wrap(430, 270, parts);
    })()
  };

  BODY["product-sum"] = {
    // Unit circle, a = 70 deg, b = 20 deg. The chord's midpoint M lies on the bisecting radius at
    // angle (a+b)/2, at distance cos((a-b)/2); its coordinates are the averages of cos and sin.
    midpoint: (() => {
      const O = [150, 176], R = 136, a = 70, b = 20;
      const P = d => [O[0] + R * Math.cos(rad(d)), O[1] - R * Math.sin(rad(d))];
      const A = P(a), B = P(b), M = mid(A, B), T = P((a + b) / 2);
      const dist = Math.hypot(M[0] - O[0], M[1] - O[1]) / R;
      const bad = Math.abs(dist - Math.cos(rad((a - b) / 2))) > 1e-9;
      const arc = (r, d1, d2, c) => `<path d="M ${pf([O[0] + r * Math.cos(rad(d1)), O[1] - r * Math.sin(rad(d1))])} A ${r} ${r} 0 0 0 ${pf([O[0] + r * Math.cos(rad(d2)), O[1] - r * Math.sin(rad(d2))])}" fill="none" stroke="${c}" stroke-width="1.6"/>`;
      return wrap(430, 290, [
        seg([O[0] - 12, O[1]], [O[0] + R + 30, O[1]], FNT, 1.1), seg([O[0], O[1] + 12], [O[0], O[1] - R - 16], FNT, 1.1),
        `<path d="M ${pf(P(0))} A ${R} ${R} 0 0 0 ${pf(P(90))}" fill="none" stroke="${FNT}" stroke-width="1.3"/>`,
        seg(O, A, DIM, 1.5), seg(O, B, DIM, 1.5), seg(A, B, GLD, 2.2), seg(O, T, ACC, 1.4, "5 4"), seg(O, M, ACC, 2.4),
        arc(40, b, (a + b) / 2, GLD), arc(46, (a + b) / 2, a, GLD),
        dot(A, DIM, 4.5), dot(B, DIM, 4.5), dot(M, ACC, 5),
        txt(add(A, [0, -11]), "angle a", DIM, 12.5), txt(add(B, [10, 2]), "angle b", DIM, 12.5, "start"),
        txt(add(M, [10, -4]), "M", ACC, 13, "start"),
        txt(add(mid(O, M), [8, 16]), "cos ½(a − b)", ACC, 12, "start"),
        cap(430, 290, "The midpoint M of the chord between the points at angles a and b lies on the bisecting radius, at angle ½(a + b), and at distance cos ½(a − b) from the center. Its coordinates are ½(cos a + cos b) and ½(sin a + sin b), so cos a + cos b = 2 cos ½(a + b) cos ½(a − b) and sin a + sin b = 2 sin ½(a + b) cos ½(a − b)." + (bad ? " MISMATCH" : ""))
      ]);
    })()
  };

  BODY["non-adjacent-selection"] = {
    // 8 chairs, 3 chosen: the 5 unchosen chairs leave 6 gaps; the chosen go into gaps 0, 2 and 5.
    gaps: (() => {
      const s = 34, parts = [], X0 = 50, y1 = 60, y2 = 172, pick = [0, 2, 5];
      let x = X0;
      for (let g = 0; g <= 5; g++) {
        parts.push(`<rect x="${x}" y="${y1}" width="18" height="${s}" rx="3" fill="none" stroke="${pick.indexOf(g) >= 0 ? ACC : FNT}" stroke-width="1.4" stroke-dasharray="3 3"/>`);
        if (pick.indexOf(g) >= 0) parts.push(`<polygon points="${x + 9},${y1 - 6} ${x + 3},${y1 - 16} ${x + 15},${y1 - 16}" fill="${ACC}"/>`);
        x += 22;
        if (g < 5) { parts.push(rect(x, y1, s, s, DIM, 1.6, "rgba(150,150,150,0.18)")); x += s + 4; }
      }
      parts.push(txt([215, y1 - 26], "5 unchosen chairs leave 6 gaps; the 3 chosen go into different gaps", DIM, 12));
      let row = [], k = 0;
      for (let g = 0; g <= 5; g++) { if (pick.indexOf(g) >= 0) row.push(1); if (g < 5) row.push(0); }
      row.forEach((v, i) => parts.push(rect(62 + i * 40, y2, s, s, v ? ACC : DIM, 1.6, v ? ACCS : "rgba(150,150,150,0.18)")));
      const okAdj = row.every((v, i) => !(v && row[i + 1])) && row.length === 8 && row.filter(v => v).length === 3;
      parts.push(txt([215, y2 + s + 22], "the resulting row of 8, with no two chosen chairs side by side", DIM, 12));
      parts.push(seg([215, y1 + s + 14], [215, y2 - 14], FNT, 1.3), `<polygon points="215,${y2 - 8} 210,${y2 - 17} 220,${y2 - 17}" fill="${FNT}"/>`);
      parts.push(cap(430, 250, "Lay down the 5 chairs that are not chosen: they leave 6 gaps, counting both ends. Putting each chosen chair in a different gap keeps every two of them apart, and each valid choice arises from exactly one set of gaps, so there are C(6, 3) = 20." + (okAdj ? "" : " MISMATCH")));
      return wrap(430, 250, parts);
    })()
  };

  BODY["extremal-principle"] = {
    // A longest path v1..v6 (the component is Hamiltonian, and the other component is smaller).
    // The longest path length is checked by brute force.
    "longest-path": (() => {
      const V = [[60, 200], [120, 110], [200, 190], [270, 100], [330, 190], [390, 110], [110, 262], [170, 262], [140, 232]];
      const E = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 2], [0, 3], [5, 3], [6, 7], [7, 8], [8, 6]];
      const adj = V.map(() => []); E.forEach(([a, b]) => { adj[a].push(b); adj[b].push(a); });
      let best = 0;
      const dfs = (v, seen, n) => { best = Math.max(best, n); adj[v].forEach(w => { if (!seen.has(w)) { seen.add(w); dfs(w, seen, n + 1); seen.delete(w); } }); };
      V.forEach((_, v) => dfs(v, new Set([v]), 1));
      const path = [0, 1, 2, 3, 4, 5], onPath = (a, b) => Math.abs(path.indexOf(a) - path.indexOf(b)) === 1 && path.indexOf(a) >= 0 && path.indexOf(b) >= 0;
      const parts = [];
      E.forEach(([a, b]) => {
        const isPath = onPath(a, b), fromV1 = (a === 0 || b === 0) && !isPath;
        parts.push(seg(V[a], V[b], isPath ? ACC : fromV1 ? GLD : FNT, isPath ? 3 : fromV1 ? 2.2 : 1.4, fromV1 ? "6 4" : ""));
      });
      V.forEach((p, i) => parts.push(dot(p, i < 6 ? (i === 0 ? GLD : ACC) : FNT, i === 0 ? 7 : 5.5)));
      path.forEach((v, i) => parts.push(txt(add(V[v], [0, V[v][1] > 150 ? 22 : -12]), `v<tspan font-size="9" dy="3">${i + 1}</tspan>`, i === 0 ? GLD : ACC, 13)));
      parts.push(cap(430, 290, `The blue path v₁ … v₆ is a longest path in this graph (${best} vertices). If v₁ had a neighbor off the path, the path could be extended from that end, so every neighbor of v₁ (gold) is already on it; in particular the path has more vertices than v₁ has neighbors.` + (best === 6 ? "" : " MISMATCH")));
      return wrap(430, 290, parts);
    })()
  };


  BODY["piecewise-graph-counting"] = {
    // |x|, then |x| - 2, then ||x| - 2|, each on x in [-4, 4]; the last meets y = 1 four times.
    folds: (() => {
      const parts = [], fs = [x => Math.abs(x), x => Math.abs(x) - 2, x => Math.abs(Math.abs(x) - 2)];
      const names = ["y = |x|", "y = |x| − 2", "y = ||x| − 2|"];
      fs.forEach((f, i) => {
        const m = frame(-4, 4, -2.6, 4.2, 14 + i * 140, 36, 122, 150);
        parts.push(axes(m), plot(f, m, -4, 4, 160, i === 2 ? ACC : DIM, 2.2), txt([14 + i * 140 + 61, 214], names[i], i === 2 ? ACC : DIM, 12.5));
        if (i === 2) {
          parts.push(seg(m.pt(-4, 1), m.pt(4, 1), GLD, 1.6, "5 4"));
          [-3, -1, 1, 3].forEach(x => parts.push(dot(m.pt(x, 1), GLD, 3.5)));
        }
        if (i < 2) parts.push(txt([14 + i * 140 + 131, 118], "→", FNT, 16));
      });
      const crossings = [-3, -1, 1, 3].filter(x => Math.abs(fs[2](x) - 1) < 1e-12).length;
      parts.push(cap(430, 232, `Build the graph from the inside out: the V of |x|, lowered by 2, then folded up where it went below the axis. The finished W has corners at heights 0 and 2, so the line y = 1 crosses it ${crossings === 4 ? "four" : crossings} times, and so does every line between those heights.` + (crossings === 4 ? "" : " MISMATCH")));
      return wrap(430, 232, parts);
    })()
  };

  BODY["conjugate-root-theorems"] = {
    // Roots 2 ± 3i, -2 ± i and the real root -3, 32 px per unit: the picture is symmetric about the real axis.
    mirror: (() => {
      const m = frame(-4.2, 4.2, -3.8, 3.8, 40, 20, 350, 250);
      const pairs = [[2, 3], [-2, 1]], parts = [axes(m), txt(add(m.pt(4.2, 0), [-2, -8]), "real", FNT, 11.5, "end"), txt(add(m.pt(0, 3.8), [6, 10]), "imaginary", FNT, 11.5, "start")];
      pairs.forEach(([a, b], i) => {
        const c = i ? GLD : ACC;
        parts.push(seg(m.pt(a, b), m.pt(a, -b), c, 1.4, "4 4"), dot(m.pt(a, b), c, 5), dot(m.pt(a, -b), c, 5));
        const s = (x, y) => `${String(x).replace("-", "−")}${y >= 0 ? " + " : " − "}${Math.abs(y) === 1 ? "" : Math.abs(y)}i`;
        parts.push(txt(add(m.pt(a, b), [10, 4]), s(a, b), c, 12.5, "start"), txt(add(m.pt(a, -b), [10, 4]), s(a, -b), c, 12.5, "start"));
      });
      parts.push(dot(m.pt(-3, 0), DIM, 5), txt(add(m.pt(-3, 0), [0, 18]), "−3", DIM, 12.5));
      parts.push(cap(430, 290, "The roots of a polynomial with real coefficients are symmetric about the real axis: each non-real root a + bi comes with its mirror image a − bi, and any real root sits on the axis itself."));
      return wrap(430, 290, parts);
    })()
  };

  BODY["half-angle"] = {
    // Unit circle, theta = 70 degrees. The angle at (-1, 0) on the arc from (1, 0) to P is theta/2,
    // and the slope from (-1, 0) to P is sin(theta) / (1 + cos(theta)) = tan(theta/2).
    inscribed: (() => {
      const O = [215, 168], R = 120, th = 70, c = Math.cos(rad(th)), s = Math.sin(rad(th));
      const Q = [O[0] - R, O[1]], X = [O[0] + R, O[1]], P = [O[0] + R * c, O[1] - R * s], F = [P[0], O[1]];
      const bad = Math.abs(s / (1 + c) - Math.tan(rad(th / 2))) > 1e-12;
      const arcAt = (C, r, d1, d2, col) => `<path d="M ${pf([C[0] + r * Math.cos(rad(d1)), C[1] - r * Math.sin(rad(d1))])} A ${r} ${r} 0 0 0 ${pf([C[0] + r * Math.cos(rad(d2)), C[1] - r * Math.sin(rad(d2))])}" fill="none" stroke="${col}" stroke-width="1.8"/>`;
      return wrap(430, 290, [
        circ(O, R, FNT, 1.3), seg([Q[0] - 14, O[1]], [X[0] + 14, O[1]], FNT, 1.1),
        seg(O, P, DIM, 1.6), seg(Q, P, ACC, 2.2), seg(P, F, GLD, 2.2, "5 4"),
        arcAt(O, 26, 0, th, DIM), arcAt(Q, 44, 0, th / 2, ACC),
        txt(add(O, [30, -12]), "θ", DIM, 13, "start"), txt(add(Q, [52, -9]), "θ/2", ACC, 13, "start"),
        dot(Q, DIM, 4), dot(O, DIM, 3.5), dot(P, ACC, 4.5),
        txt(add(Q, [-8, 5]), "(−1, 0)", DIM, 12, "end"), txt(add(P, [6, -8]), "(cos θ, sin θ)", ACC, 12, "start"),
        txt(add(mid(P, F), [8, 4]), "sin θ", GLD, 12.5, "start"), txt(add(mid(Q, F), [0, 18]), "1 + cos θ", GLD, 12.5),
        cap(430, 290, "The angle at (−1, 0) that looks at the arc from (1, 0) to the point at angle θ is θ/2, half the central angle. The line from (−1, 0) to that point rises sin θ over a run of 1 + cos θ, so tan(θ/2) = sin θ / (1 + cos θ)." + (bad ? " MISMATCH" : ""))
      ]);
    })()
  };

  BODY["absolute-value-rules"] = {
    // |x - 1/2| < 5/2 is the interval (-2, 3); |x - 1/2| > 5/2 is the two rays outside it. 40 px per unit.
    "number-line": (() => {
      const k = 40, X = x => 215 + k * (x - 0.5), parts = [];
      [[70, "|x − ½| < 5/2", ACC], [178, "|x − ½| > 5/2", GLD]].forEach(([y, label, col], i) => {
        parts.push(seg([20, y], [410, y], FNT, 1.4));
        for (let t = -4; t <= 5; t++) if (X(t) > 20 && X(t) < 410) parts.push(seg([X(t), y - 5], [X(t), y + 5], FNT, 1.2), txt([X(t), y + 20], String(t).replace("-", "−"), DIM, 11.5));
        if (i === 0) parts.push(seg([X(-2), y], [X(3), y], col, 5));
        else parts.push(seg([22, y], [X(-2), y], col, 5), seg([X(3), y], [408, y], col, 5));
        parts.push(circ([X(-2), y], 5, col, 2, "var(--bg)"), circ([X(3), y], 5, col, 2, "var(--bg)"));
        parts.push(dot([X(0.5), y], DIM, 3.5), txt([215, y - 30], label, col, 13));
        if (i === 0) parts.push(txt([(X(-2) + X(0.5)) / 2, y - 10], "5/2", DIM, 11.5), txt([(X(0.5) + X(3)) / 2, y - 10], "5/2", DIM, 11.5));
      });
      parts.push(cap(430, 226, "|x − ½| is the distance from x to ½. Within 5/2 of ½ is the open interval from −2 to 3 (top); farther than 5/2 is the two rays beyond its ends (bottom). The endpoints themselves belong to neither, since there the distance is exactly 5/2."));
      return wrap(430, 226, parts);
    })()
  };

  BODY["work-rates"] = {
    // The pool in twelfths: pipe A fills 3 an hour, pipe B 2, together 5. After 2 hours 10 of 12 are full,
    // and the last 2 take 2/5 of an hour. The total time is computed from the rates.
    rates: (() => {
      const cell = 26, X0 = 110, parts = [], rows = [["after 1 hour", 5], ["after 2 hours", 10], ["after 12/5 hours", 12]];
      rows.forEach(([label, n], r) => {
        const y = 40 + r * 56;
        parts.push(txt([X0 - 10, y + 18], label, DIM, 12, "end"));
        for (let j = 0; j < 12; j++) {
          const hour = Math.floor(j / 5), inHour = j % 5;
          const col = j < n ? (j >= 10 ? GRN : inHour < 3 ? ACC : GLD) : null;
          parts.push(rect(X0 + j * cell, y, cell - 3, 26, col || FNT, col ? 1.6 : 1, col ? (col === ACC ? ACCS : col === GLD ? GLDS : "rgba(40,167,90,0.12)") : "none"));
        }
      });
      const t = 1 / (1 / 4 + 1 / 6);
      parts.push(rect(X0, 196, 14, 14, ACC, 1.6, ACCS), txt([X0 + 20, 207], "pipe A, 3 twelfths an hour", DIM, 12, "start"));
      parts.push(rect(X0, 216, 14, 14, GLD, 1.6, GLDS), txt([X0 + 20, 227], "pipe B, 2 twelfths an hour", DIM, 12, "start"));
      parts.push(rect(X0, 236, 14, 14, GRN, 1.6, "rgba(40,167,90,0.12)"), txt([X0 + 20, 247], "both pipes, in the last 2/5 of an hour", DIM, 12, "start"));
      parts.push(cap(430, 262, "Measure the pool in twelfths. Pipe A fills 3 of them each hour and pipe B fills 2, so together they fill 5 an hour. Two hours fill 10 of the 12, and the last 2 take 2/5 of an hour, so the pool is full after 12/5 hours." + (Math.abs(t - 2.4) < 1e-12 ? "" : " MISMATCH")));
      return wrap(430, 262, parts);
    })()
  };


  BODY["repeating-decimals"] = {
    // Long division of 1 by 7: remainders and digits are computed, not typed.
    division: (() => {
      const n = 7, rem = [1], dig = [];
      while (true) { const r = rem[rem.length - 1]; dig.push(Math.floor(10 * r / n)); const nr = (10 * r) % n; if (nr === 1) break; rem.push(nr); }
      const O = [215, 136], R = 92, parts = [];
      const P = i => [O[0] + R * Math.sin(2 * Math.PI * i / rem.length), O[1] - R * Math.cos(2 * Math.PI * i / rem.length)];
      rem.forEach((r, i) => {
        const a = P(i), b = P((i + 1) % rem.length), d = norm(sub(b, a)), s = add(a, mul(d, 20)), e = sub(b, mul(d, 22));
        parts.push(seg(s, e, ACC, 1.8), `<polygon points="${pf(e)} ${pf(add(sub(e, mul(d, 9)), mul(perp(d), 4.5)))} ${pf(sub(sub(e, mul(d, 9)), mul(perp(d), 4.5)))}" fill="${ACC}"/>`);
        const m = mid(a, b), out = norm(sub(m, O));
        parts.push(txt(add(add(m, mul(out, 16)), [0, 5]), String(dig[i]), GLD, 15));
      });
      rem.forEach((r, i) => parts.push(circ(P(i), 16, DIM, 1.6, "var(--bg)"), txt(add(P(i), [0, 5]), String(r), DIM, 14)));
      parts.push(txt([215, 141], "remainders", FNT, 11.5));
      const ok = dig.join("") === "142857" && rem.length === 6;
      parts.push(cap(430, 262, `Dividing 1 by 7: each step multiplies the remainder (circles) by 10, writes down the quotient digit (gold) and keeps the new remainder mod 7. The remainders run ${rem.join(", ")} and return to 1 after ${rem.length} steps, the order of 10 mod 7, so the digits ${dig.join("")} repeat forever.` + (ok ? "" : " MISMATCH")));
      return wrap(430, 262, parts);
    })()
  };

  BODY["binomial-probability"] = {
    // The C(4,2) = 6 sequences of 4 trials with exactly 2 successes, each with probability p^2 (1-p)^2.
    sequences: (() => {
      const seqs = [];
      for (let m = 0; m < 16; m++) { const b = [8, 4, 2, 1].map(x => (m & x) ? 1 : 0); if (b[0] + b[1] + b[2] + b[3] === 2) seqs.push(b); }
      const parts = [], s = 26;
      seqs.forEach((b, i) => {
        const col = i % 2, row = Math.floor(i / 2), x0 = 40 + col * 200, y0 = 30 + row * 52;
        b.forEach((v, j) => {
          parts.push(rect(x0 + j * (s + 4), y0, s, s, v ? ACC : FNT, v ? 1.8 : 1.2, v ? ACCS : "none"));
          parts.push(txt([x0 + j * (s + 4) + s / 2, y0 + 18], v ? "S" : "F", v ? ACC : FNT, 12.5));
        });
        parts.push(txt([x0 + 4 * (s + 4) + 8, y0 + 18], "p²(1 − p)²", GLD, 12.5, "start"));
      });
      parts.push(cap(430, 200, `The ${seqs.length} ways to get exactly 2 successes (S) in 4 trials. Each particular sequence has probability p · p · (1 − p) · (1 − p) = p²(1 − p)² by independence, whatever its order, so the total is ${seqs.length}p²(1 − p)² = C(4, 2) p²(1 − p)².` + (seqs.length === 6 ? "" : " MISMATCH")));
      return wrap(430, 200, parts);
    })()
  };

  BODY["pigeonhole"] = {
    // Unit square (200 px) cut into four; five points, two of them forced into one small square.
    square: (() => {
      const S = 200, X0 = 115, Y0 = 24, M = (x, y) => [X0 + S * x, Y0 + S * (1 - y)];
      const pts = [[0.18, 0.32], [0.38, 0.12], [0.72, 0.22], [0.82, 0.74], [0.28, 0.82]];
      const box = ([x, y]) => (x < 0.5 ? 0 : 1) + (y < 0.5 ? 0 : 2);
      const counts = [0, 0, 0, 0]; pts.forEach(p => counts[box(p)]++);
      const parts = [rect(X0, Y0, S, S, DIM, 2), seg(M(0.5, 0), M(0.5, 1), DIM, 1.4, "5 4"), seg(M(0, 0.5), M(1, 0.5), DIM, 1.4, "5 4")];
      parts.push(rect(X0, Y0 + S / 2, S / 2, S / 2, "none", 0, ACCS), seg(M(0, 0), M(0.5, 0.5), GLD, 2));
      pts.forEach(p => parts.push(dot(M(p[0], p[1]), box(p) === 0 ? ACC : DIM, 5)));
      parts.push(txt(M(0.04, 0.42), "√2/2", GLD, 13, "start"));
      parts.push(txt(add(M(0.5, 0), [0, 18]), "½", DIM, 12.5), txt(add(M(1, 0.5), [12, 5]), "½", DIM, 12.5, "start"));
      const ok = Math.max(...counts) >= 2 && counts[0] === 2;
      parts.push(cap(430, 262, "Cut the unit square into four squares of side ½: five points in four squares put two in the same one (shaded). Two points in a square of side ½ are no farther apart than its diagonal, √2/2." + (ok ? "" : " MISMATCH")));
      return wrap(430, 262, parts);
    })()
  };

  BODY["multiplicative-order"] = {
    // x -> 2x mod 7 on the residues 1..6: two cycles of length 3 = ord_7(2). Cycles are computed.
    cycles: (() => {
      const n = 7, a = 2, O = [215, 132], R = 96, parts = [];
      const P = r => [O[0] + R * Math.sin(2 * Math.PI * (r - 1) / 6), O[1] - R * Math.cos(2 * Math.PI * (r - 1) / 6)];
      const seen = new Set(), cycles = [];
      for (let r = 1; r < n; r++) { if (seen.has(r)) continue; const c = []; let x = r; while (!seen.has(x)) { seen.add(x); c.push(x); x = (a * x) % n; } cycles.push(c); }
      cycles.forEach((c, ci) => c.forEach((x, i) => {
        const y = c[(i + 1) % c.length], p = P(x), q = P(y), d = norm(sub(q, p)), s = add(p, mul(d, 18)), e = sub(q, mul(d, 20)), col = ci ? GLD : ACC;
        parts.push(seg(s, e, col, 2), `<polygon points="${pf(e)} ${pf(add(sub(e, mul(d, 9)), mul(perp(d), 4.5)))} ${pf(sub(sub(e, mul(d, 9)), mul(perp(d), 4.5)))}" fill="${col}"/>`);
      }));
      for (let r = 1; r < n; r++) parts.push(circ(P(r), 15, DIM, 1.6, "var(--bg)"), txt(add(P(r), [0, 5]), String(r), DIM, 14));
      const ok = cycles.length === 2 && cycles.every(c => c.length === 3);
      parts.push(cap(430, 250, `Multiplying by 2 modulo 7 splits the six nonzero residues into cycles: ${cycles.map(c => c.join(" → ") + " → " + c[0]).join(" and ")}. Every cycle has the same length, the order of 2, which is 3, so the order divides the number of residues, 6.` + (ok ? "" : " MISMATCH")));
      return wrap(430, 250, parts);
    })()
  };


  BODY["lattice-points-gcd"] = {
    // A 6 x 4 grid: the diagonal enters m + n - gcd(m, n) = 8 squares; which squares is computed.
    squares: (() => {
      const m = 6, n = 4, u = 48, X0 = 70, Y0 = 228, parts = [];
      const P = (x, y) => [X0 + u * x, Y0 - u * y], sl = n / m;
      let crossed = 0;
      for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) {
        const lo = sl * i, hi = sl * (i + 1), hit = Math.max(lo, j) < Math.min(hi, j + 1) - 1e-9;
        if (hit) { crossed++; parts.push(rect(X0 + u * i, Y0 - u * (j + 1), u, u, "none", 0, ACCS)); }
      }
      for (let i = 0; i <= m; i++) parts.push(seg(P(i, 0), P(i, n), FNT, 1));
      for (let j = 0; j <= n; j++) parts.push(seg(P(0, j), P(m, j), FNT, 1));
      parts.push(seg(P(0, 0), P(m, n), GLD, 2.4), dot(P(0, 0), DIM, 4), dot(P(m, n), DIM, 4), dot(P(3, 2), GLD, 5));
      parts.push(txt(add(P(3, 2), [10, 16]), "(3, 2)", GLD, 12.5, "start"));
      parts.push(txt(add(P(3, 0), [0, 20]), "6", DIM, 13), txt(add(P(0, 2), [-12, 5]), "4", DIM, 13, "end"));
      parts.push(cap(430, 262, `The diagonal of a 6 × 4 grid crosses 5 inner vertical lines and 3 inner horizontal ones, entering a new square at each crossing, except at the lattice point (3, 2), where it crosses both at once. So it passes through 1 + 5 + 3 − 1 = ${crossed} squares, which is 6 + 4 − gcd(6, 4).` + (crossed === 8 ? "" : " MISMATCH")));
      return wrap(430, 262, parts);
    })()
  };

  BODY["mass-points"] = {
    // A lever: BD : DC = 1 : 2 balances masses 2 at B and 1 at C (2 * 1 = 1 * 2).
    lever: (() => {
      const u = 90, B = [80, 110], D = [80 + u, 110], C = [80 + 3 * u, 110], parts = [];
      parts.push(seg(add(B, [-10, 0]), add(C, [10, 0]), DIM, 5));
      parts.push(`<polygon points="${pf(add(D, [0, 3]))} ${pf(add(D, [-18, 34]))} ${pf(add(D, [18, 34]))}" fill="${GLD}" fill-opacity="0.35" stroke="${GLD}" stroke-width="1.6"/>`);
      parts.push(seg([30, D[1] + 34], [400, D[1] + 34], FNT, 1.2));
      parts.push(circ(add(B, [0, -30]), 26, ACC, 2, ACCS), txt(add(B, [0, -24]), "2", ACC, 17));
      parts.push(circ(add(C, [0, -22]), 18, ACC, 2, ACCS), txt(add(C, [0, -16]), "1", ACC, 15));
      parts.push(txt(add(B, [0, 26]), "B", DIM, 13), txt(add(D, [0, 54]), "D", GLD, 13), txt(add(C, [0, 26]), "C", DIM, 13));
      parts.push(txt(add(mid(B, D), [0, 20]), "1", DIM, 13), txt(add(mid(D, C), [0, 20]), "2", DIM, 13));
      parts.push(cap(430, 200, "Masses 2 at B and 1 at C balance at the point D with BD : DC = 1 : 2, because 2 · 1 = 1 · 2. The heavier mass sits nearer the balance point, which is why masses are inversely proportional to the pieces of the side."));
      return wrap(430, 200, parts);
    })()
  };

  BODY["generating-function-method"] = {
    // (x + ... + x^6)^2 as a 6 x 6 table of exponents i + j; the anti-diagonal i + j = 5 is counted.
    product: (() => {
      const c = 34, X0 = 150, Y0 = 46, parts = [];
      let cnt = 0;
      parts.push(txt([X0 + 3 * c, 20], "second die: x^j", FNT, 12), txt([X0 - 30, Y0 + 3 * c + 4], "first die: x^i", FNT, 12, "end"));
      for (let i = 1; i <= 6; i++) {
        parts.push(txt([X0 + (i - 0.5) * c, Y0 - 8], String(i), DIM, 12), txt([X0 - 10, Y0 + (i - 0.5) * c + 4], String(i), DIM, 12, "end"));
        for (let j = 1; j <= 6; j++) {
          const hit = i + j === 5; if (hit) cnt++;
          parts.push(rect(X0 + (j - 1) * c + 2, Y0 + (i - 1) * c + 2, c - 4, c - 4, hit ? GLD : FNT, hit ? 2 : 1, hit ? GLDS : "none"));
          parts.push(txt([X0 + (j - 0.5) * c, Y0 + (i - 0.5) * c + 5], `x<tspan font-size="9" dy="-5">${i + j}</tspan>`, hit ? GLD : DIM, 12.5));
        }
      }
      parts.push(cap(430, 270, `Each cell is one term x^i · x^j = x^(i+j) of (x + x² + ⋯ + x⁶)², one per pair of rolls. The terms with exponent 5 lie on one anti-diagonal, and there are ${cnt} of them, so the coefficient of x⁵, the number of rolls summing to 5, is ${cnt}.` + (cnt === 4 ? "" : " MISMATCH")));
      return wrap(430, 270, parts);
    })()
  };

  BODY["burnsides-lemma"] = {
    // The four rotations of a square acting on its corners: cycle counts 4, 1, 2, 1 give 16, 2, 4, 2.
    rotations: (() => {
      const parts = [], rots = [0, 1, 2, 3], s = 58;
      let total = 0;
      rots.forEach((r, idx) => {
        const cx = 60 + idx * 102, cy = 92;
        const V = [[cx - s / 2, cy - s / 2], [cx + s / 2, cy - s / 2], [cx + s / 2, cy + s / 2], [cx - s / 2, cy + s / 2]];
        parts.push(poly(V, FNT, 1.2));
        const seen = new Set(); let cycles = 0;
        for (let v = 0; v < 4; v++) { if (seen.has(v)) continue; cycles++; let w = v; while (!seen.has(w)) { seen.add(w); w = (w + r) % 4; } }
        if (r) for (let v = 0; v < 4; v++) {
          const w = (v + r) % 4; if (r === 2 && v > w) continue;
          const p = V[v], q = V[w], d = norm(sub(q, p)), a = add(p, mul(d, 9)), b = sub(q, mul(d, 9));
          const bend = r === 2 ? 0 : 10, mpt = add(mid(a, b), mul(perp(d), -bend));
          parts.push(`<path d="M ${pf(a)} Q ${pf(mpt)} ${pf(b)}" fill="none" stroke="${ACC}" stroke-width="1.6"/>`);
          const tip = b, dir = norm(sub(b, mpt));
          parts.push(`<polygon points="${pf(tip)} ${pf(add(sub(tip, mul(dir, 8)), mul(perp(dir), 4)))} ${pf(sub(sub(tip, mul(dir, 8)), mul(perp(dir), 4)))}" fill="${ACC}"/>`);
          if (r === 2) { const dir2 = norm(sub(a, mpt)); parts.push(`<polygon points="${pf(a)} ${pf(add(sub(a, mul(dir2, 8)), mul(perp(dir2), 4)))} ${pf(sub(sub(a, mul(dir2, 8)), mul(perp(dir2), 4)))}" fill="${ACC}"/>`); }
        }
        V.forEach(p => parts.push(dot(p, DIM, 4.5)));
        const fix = 2 ** cycles; total += fix;
        parts.push(txt([cx, cy + s / 2 + 26], `${r * 90}°`, DIM, 13), txt([cx, cy + s / 2 + 46], `${cycles} cycle${cycles > 1 ? "s" : ""}: ${fix}`, GLD, 12.5));
      });
      parts.push(cap(430, 200, `The four rotations of a square, acting on its corners (arrows show where each corner goes). A 2-coloring is fixed exactly when each cycle is one color, so the rotations fix 16, 2, 4 and 2 colorings, and the number of colorings up to rotation is (16 + 2 + 4 + 2)/4 = ${total / 4}.` + (total === 24 ? "" : " MISMATCH")));
      return wrap(430, 200, parts);
    })()
  };


  BODY["circular-permutations"] = {
    // A, B, C, D around a table: the four rows read from each seat all describe this one circle.
    rotations: (() => {
      const O = [110, 130], R = 64, names = ["A", "B", "C", "D"], parts = [circ(O, R, FNT, 1.5)];
      names.forEach((nm, i) => { const p = [O[0] + R * Math.sin(i * Math.PI / 2), O[1] - R * Math.cos(i * Math.PI / 2)];
        parts.push(circ(p, 15, ACC, 1.8, "var(--bg)"), txt(add(p, [0, 5]), nm, ACC, 14)); });
      const rows = [0, 1, 2, 3].map(s => [0, 1, 2, 3].map(k => names[(s + k) % 4]).join(" "));
      rows.forEach((r, i) => {
        const y = 62 + i * 42;
        parts.push(rect(250, y - 18, 110, 28, DIM, 1.3), txt([305, y + 1], r, DIM, 15));
        parts.push(seg([200, 130], [244, y - 4], FNT, 1.1));
      });
      parts.push(txt([305, 30], "the same circle, read from each seat", FNT, 12));
      parts.push(cap(430, 250, "The four rows A B C D, B C D A, C D A B and D A B C all describe the same seating, read starting from a different seat. Every circle comes from exactly 4 of the 4! rows, so there are 4!/4 = 3! = 6 circular arrangements of four people."));
      return wrap(430, 250, parts);
    })()
  };

  BODY["grid-paths"] = {
    // Paths from (0,0) to each node of a 4 x 3 grid: each count is the sum of the left and lower neighbors.
    counts: (() => {
      const m = 4, n = 3, u = 72, X0 = 70, Y0 = 236, parts = [], C = [];
      for (let j = 0; j <= n; j++) { C.push([]); for (let i = 0; i <= m; i++) C[j].push(i === 0 || j === 0 ? 1 : C[j][i - 1] + C[j - 1][i]); }
      const P = (i, j) => [X0 + u * i, Y0 - u * j];
      for (let i = 0; i <= m; i++) parts.push(seg(P(i, 0), P(i, n), FNT, 1.3));
      for (let j = 0; j <= n; j++) parts.push(seg(P(0, j), P(m, j), FNT, 1.3));
      parts.push(`<path d="M ${pf(add(P(2, 2), [-50, 0]))} L ${pf(add(P(2, 2), [-16, 0]))}" stroke="${GLD}" stroke-width="2"/>`, `<polygon points="${pf(add(P(2, 2), [-13, 0]))} ${pf(add(P(2, 2), [-22, -4]))} ${pf(add(P(2, 2), [-22, 4]))}" fill="${GLD}"/>`);
      parts.push(`<path d="M ${pf(add(P(2, 2), [0, 50]))} L ${pf(add(P(2, 2), [0, 16]))}" stroke="${GLD}" stroke-width="2"/>`, `<polygon points="${pf(add(P(2, 2), [0, 13]))} ${pf(add(P(2, 2), [-4, 22]))} ${pf(add(P(2, 2), [4, 22]))}" fill="${GLD}"/>`);
      for (let j = 0; j <= n; j++) for (let i = 0; i <= m; i++) {
        const last = i === m && j === n, mid2 = i === 2 && j === 2;
        parts.push(circ(P(i, j), 15, last ? ACC : mid2 ? GLD : DIM, last || mid2 ? 2 : 1.3, "var(--bg)"), txt(add(P(i, j), [0, 5]), String(C[j][i]), last ? ACC : mid2 ? GLD : DIM, 13));
      }
      const ok = C[n][m] === 35 && C[2][2] === 6;
      parts.push(cap(430, 270, `The number of paths to each point, filled in from the corner. The last step into a point comes from the left or from below, so each count is the sum of those two neighbors, as for the gold 6 = 3 + 3. The far corner gets ${C[n][m]} = C(7, 3), and the table is Pascal's triangle, tilted.` + (ok ? "" : " MISMATCH")));
      return wrap(430, 270, parts);
    })()
  };


  BODY["triangular-numbers"] = {
    // T_3 (6 cells) and T_4 (10 cells) interlock into a 4 x 4 square. Cells are counted.
    staircases: (() => {
      const n = 4, u = 46, X0 = 123, Y0 = 36, parts = [];
      let gold = 0, blue = 0;
      for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
        const g = i <= (n - 1 - j); g ? gold++ : blue++;
        parts.push(rect(X0 + i * u + 2, Y0 + j * u + 2, u - 4, u - 4, g ? GLD : ACC, 1.6, g ? GLDS : ACCS));
      }
      parts.push(rect(X0, Y0, n * u, n * u, DIM, 1.6));
      parts.push(txt([X0 + n * u + 14, Y0 + 40], `T₄ = ${gold}`, GLD, 13, "start"), txt([X0 + n * u + 14, Y0 + 64], `T₃ = ${blue}`, ACC, 13, "start"));
      parts.push(txt([X0 + n * u / 2, Y0 + n * u + 22], "4", DIM, 13), txt([X0 - 12, Y0 + n * u / 2 + 5], "4", DIM, 13, "end"));
      parts.push(cap(430, 250, `Two staircases, of heights 1 to 4 (gold) and 1 to 3 (blue), interlock exactly into a 4 × 4 square: T₃ + T₄ = ${blue} + ${gold} = 16 = 4². In general T_(n−1) + T_n = n².` + (gold + blue === 16 && gold === 10 ? "" : " MISMATCH")));
      return wrap(430, 250, parts);
    })()
  };


  BODY["permutation-cycle-structure"] = {
    // f on {1..8}: 1->4->6->1, 2->7->2, 3->3, 5->8->5. The cycles are found by following f; order = lcm.
    cycles: (() => {
      const f = { 1: 4, 4: 6, 6: 1, 2: 7, 7: 2, 3: 3, 5: 8, 8: 5 }, seen = new Set(), cyc = [];
      for (let x = 1; x <= 8; x++) { if (seen.has(x)) continue; const c = []; let y = x; while (!seen.has(y)) { seen.add(y); c.push(y); y = f[y]; } cyc.push(c); }
      const gcd = (a, b) => b ? gcd(b, a % b) : a, ord = cyc.reduce((l, c) => l * c.length / gcd(l, c.length), 1);
      const centers = [[80, 110], [205, 110], [300, 110], [375, 110]], parts = [];
      cyc.forEach((c, ci) => {
        const O = centers[ci], R = c.length === 1 ? 0 : c.length === 2 ? 34 : 46, col = [ACC, GLD, DIM, GRN][ci];
        const P = i => c.length === 1 ? O : [O[0] + R * Math.sin(2 * Math.PI * i / c.length), O[1] - R * Math.cos(2 * Math.PI * i / c.length)];
        if (c.length === 1) {
          parts.push(`<path d="M ${O[0] - 8} ${O[1] - 14} C ${O[0] - 22} ${O[1] - 44}, ${O[0] + 22} ${O[1] - 44}, ${O[0] + 8} ${O[1] - 14}" fill="none" stroke="${col}" stroke-width="1.6"/>`);
        } else c.forEach((x, i) => {
          const a = P(i), b = P((i + 1) % c.length), mdir = norm(sub(b, a)), bend = mul(perp(mdir), c.length === 2 ? 14 : 8);
          const s = add(a, mul(mdir, 15)), e = sub(b, mul(mdir, 17)), m2 = add(mid(s, e), bend), d = norm(sub(e, m2));
          parts.push(`<path d="M ${pf(s)} Q ${pf(m2)} ${pf(e)}" fill="none" stroke="${col}" stroke-width="1.8"/>`, `<polygon points="${pf(e)} ${pf(add(sub(e, mul(d, 8)), mul(perp(d), 4)))} ${pf(sub(sub(e, mul(d, 8)), mul(perp(d), 4)))}" fill="${col}"/>`);
        });
        c.forEach((x, i) => parts.push(circ(P(i), 13, col, 1.8, "var(--bg)"), txt(add(P(i), [0, 5]), String(x), col, 13)));
        parts.push(txt([O[0], 196], `length ${c.length}`, col, 12));
      });
      const ok = ord === 6 && cyc.length === 4;
      parts.push(cap(430, 222, `The permutation 1 → 4 → 6 → 1, 2 → 7 → 2, 3 → 3, 5 → 8 → 5, drawn as its cycles. Each application of f turns every cycle one step, so everything is back in place together after lcm(3, 2, 1, 2) = ${ord} applications: the order of f is ${ord}.` + (ok ? "" : " MISMATCH")));
      return wrap(430, 222, parts);
    })()
  };


  BODY["finite-differences"] = {
    // The difference table of 2, 3, 10, 29, 66 (a cubic), extended by one column. Values computed.
    table: (() => {
      const rows = [[2, 3, 10, 29, 66]];
      while (rows[rows.length - 1].some(v => v !== rows[rows.length - 1][0]) && rows.length < 6) { const r = rows[rows.length - 1]; rows.push(r.slice(1).map((v, i) => v - r[i])); }
      const depth = rows.length - 1;
      const ext = rows.map(r => r.slice()); ext[depth].push(ext[depth][ext[depth].length - 1]);
      for (let d = depth - 1; d >= 0; d--) ext[d].push(ext[d][ext[d].length - 1] + ext[d + 1][ext[d + 1].length - 1]);
      const dx = 52, dy = 44, X0 = 34, Y0 = 44, parts = [];
      ext.forEach((r, d) => r.forEach((v, i) => {
        const x = X0 + d * dx / 2 + i * dx, y = Y0 + d * dy, isNew = i === r.length - 1;
        parts.push(txt([x, y + 5], String(v), isNew ? GLD : d === depth ? ACC : DIM, isNew ? 15 : 14));
        if (isNew) parts.push(circ([x, y], 17, GLD, 1.4, "none"));
      }));
      parts.push(txt([X0 + 5 * dx - 8, Y0 - 22], "extended", GLD, 12));
      ["values", "1st differences", "2nd differences", "3rd differences"].forEach((L, d) => parts.push(txt([418, Y0 + d * dy + 5], L, FNT, 11.5, "end")));
      const ok = depth === 3 && ext[0][5] === 127;
      parts.push(cap(430, 232, `The difference table of 2, 3, 10, 29, 66. The third differences are constant (blue), so the values come from a cubic. Extending the constant row by one more 6 and adding back up each diagonal gives 24, then 61, then the next value, ${ext[0][5]}.` + (ok ? "" : " MISMATCH")));
      return wrap(430, 232, parts);
    })()
  };

  BODY["double-counting"] = {
    // 5 clubs, 10 students (the pairs of clubs); each student is in 2 clubs, each club has 4 students.
    incidence: (() => {
      const pairs = []; for (let i = 1; i <= 5; i++) for (let j = i + 1; j <= 5; j++) pairs.push([i, j]);
      const cw = 46, rh = 18, X0 = 118, Y0 = 44, parts = [];
      const colSum = [0, 0, 0, 0, 0];
      for (let c = 1; c <= 5; c++) parts.push(txt([X0 + (c - 0.5) * cw, Y0 - 10], `club ${c}`, DIM, 11));
      pairs.forEach((p, r) => {
        const y = Y0 + r * rh;
        parts.push(txt([X0 - 10, y + 13], `student ${r + 1}`, DIM, 11, "end"));
        for (let c = 1; c <= 5; c++) {
          const inC = p.indexOf(c) >= 0; if (inC) colSum[c - 1]++;
          parts.push(rect(X0 + (c - 1) * cw + 1, y + 1, cw - 2, rh - 2, FNT, 0.8, inC ? ACCS : "none"));
          if (inC) parts.push(dot([X0 + (c - 0.5) * cw, y + rh / 2], ACC, 4));
        }
        parts.push(txt([X0 + 5 * cw + 16, y + 13], "2", GLD, 12));
      });
      colSum.forEach((s, c) => parts.push(txt([X0 + (c + 0.5) * cw, Y0 + 10 * rh + 16], String(s), GLD, 12)));
      parts.push(txt([X0 + 5 * cw + 16, Y0 - 10], "row", FNT, 11), txt([X0 - 10, Y0 + 10 * rh + 16], "column total", FNT, 11, "end"));
      const ok = colSum.every(s => s === 4) && pairs.length === 10;
      parts.push(cap(430, 262, `Each dot is a membership, a student together with one of the student's clubs. Counting by columns gives 5 clubs × 4 = 20 dots; counting by rows gives 2 per student. The two counts of the same dots must agree, so 2s = 20 and there are ${pairs.length} students.` + (ok ? "" : " MISMATCH")));
      return wrap(430, 262, parts);
    })()
  };



  BODY["chicken-mcnugget"] = {
    // 0..39 in columns by remainder mod 5, coins 5 and 8. Representable amounts are computed; each
    // column starts at its multiple of 8 (gold); the largest gap is 27 and there are 14 gaps.
    grid: (() => {
      const a = 5, b = 8, N = 40, rep = new Array(N).fill(false);
      for (let x = 0; a * x < N; x++) for (let y = 0; a * x + b * y < N; y++) rep[a * x + b * y] = true;
      const gaps = []; for (let n = 0; n < N; n++) if (!rep[n]) gaps.push(n);
      const starts = new Set([0, 1, 2, 3, 4].map(k => b * k));
      const cw = 44, rh = 23, X0 = 104, Y0 = 30, parts = [];
      for (let c = 0; c < a; c++) parts.push(txt([X0 + (c + 0.5) * cw, Y0 - 9], `≡ ${c}`, FNT, 11));
      for (let n = 0; n < N; n++) {
        const r = Math.floor(n / a), c = n % a, x = X0 + c * cw, y = Y0 + r * rh;
        const gold = starts.has(n), fill = gold ? GLDS : rep[n] ? ACCS : "none", col = gold ? GLD : rep[n] ? ACC : FNT;
        parts.push(rect(x + 1.5, y + 1.5, cw - 3, rh - 3, rep[n] ? col : "var(--border)", gold ? 1.8 : 1, fill));
        parts.push(txt([x + cw / 2, y + rh / 2 + 4.5], String(n), rep[n] ? col : FNT, 12));
        if (n === 27) parts.push(`<rect x="${x - 1}" y="${y - 1}" width="${cw + 2}" height="${rh + 2}" fill="none" stroke="var(--level-oly)" stroke-width="2.2" rx="3"/>`);
      }
      const ok = gaps.length === 14 && gaps[gaps.length - 1] === 27 && gaps.length === (a - 1) * (b - 1) / 2;
      parts.push(cap(430, 222, "The amounts 0 to 39 in columns by their remainder mod 5, with the ones you can make from 5s and 8s in blue. Each column starts at a multiple of 8 (gold), and adding 5s fills in everything below it. The last column starts at 32, so the largest impossible amount is 32 − 5 = 27 (circled), and 14 amounts are impossible in all." + (ok ? "" : " MISMATCH")));
      return wrap(430, 222, parts);
    })()
  };


  BODY["partitions"] = {
    // The Ferrers diagram of 5 + 3 + 1 and its reflection across the diagonal, 3 + 2 + 2 + 1 + 1.
    conjugate: (() => {
      const parts = [5, 3, 1], conj = [];
      for (let j = 0; j < parts[0]; j++) conj.push(parts.filter(p => p > j).length);
      const g = 26, rows = (P, X0, Y0, col) => {
        const out = [];
        P.forEach((len, i) => { for (let j = 0; j < len; j++) out.push(`<circle cx="${X0 + j * g}" cy="${Y0 + i * g}" r="8" fill="${col}"/>`); });
        return out;
      };
      const sum = a => a.reduce((x, y) => x + y, 0), ok = sum(parts) === 9 && sum(conj) === 9 && conj.join() === "3,2,2,1,1";
      return wrap(430, 206, [
        ...rows(parts, 50, 50, ACC), ...rows(conj, 280, 50, GLD),
        seg([44, 44], [44 + 3.2 * g, 44 + 3.2 * g], FNT, 1.2, "4 3"),
        txt([215, 104], "⟷", FNT, 22),
        txt([50 + 2 * g, 178], "5 + 3 + 1", ACC, 13), txt([280 + g, 178], "3 + 2 + 2 + 1 + 1", GLD, 13),
        cap(430, 206, "The Ferrers diagram of 5 + 3 + 1 has one row of dots per part. Reflecting it across the dashed diagonal turns rows into columns and gives 3 + 2 + 2 + 1 + 1: three parts became a largest part of 3. So partitions with at most k parts match partitions with parts at most k." + (ok ? "" : " MISMATCH"))
      ]);
    })()
  };

})();
