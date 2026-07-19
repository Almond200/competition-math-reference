// Geometry formulas and theorems.
// latex/description/example strings use String.raw so LaTeX backslashes need no escaping.
// Optional fields: example (KaTeX-rendered prose, shown behind a toggle), diagram (inline SVG).
window.MATH_SECTIONS = window.MATH_SECTIONS || [];

window.MATH_SECTIONS.push({
  id: "geometry",
  title: "Geometry",
  blurb: "Triangles, circles, quadrilaterals, coordinates, and 3D — from the Pythagorean Theorem to Casey's Theorem.",
  subsections: [
    {
      title: "Fundamentals",
      formulas: [
        {
          id: "pythagorean-theorem",
          name: "Pythagorean Theorem",
          latex: String.raw`a^2 + b^2 = c^2`,
          description: String.raw`In a right triangle with legs $a, b$ and hypotenuse $c$. Common integer triples: $(3,4,5)$, $(5,12,13)$, $(7,24,25)$, $(8,15,17)$, $(9,40,41)$, $(20,21,29)$.`,
          keywords: ["right triangle", "hypotenuse", "legs", "triples", "distance"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "special-right-triangles",
          name: "Special Right Triangles (45-45-90 and 30-60-90)",
          latex: String.raw`45\text{-}45\text{-}90:\; 1 : 1 : \sqrt{2} \qquad 30\text{-}60\text{-}90:\; 1 : \sqrt{3} : 2`,
          description: String.raw`Side ratios opposite the listed angles. Instantly convert one known side to the other two.`,
          keywords: ["isosceles right", "half equilateral", "side ratios", "45", "30", "60"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "altitude-hypotenuse",
          name: "Altitude to the Hypotenuse (Geometric Mean Relations)",
          latex: String.raw`h = \frac{ab}{c}, \qquad h^2 = pq, \qquad a^2 = pc, \qquad b^2 = qc`,
          description: String.raw`Dropping the altitude to the hypotenuse of a right triangle creates two smaller triangles similar to the original. $p, q$ are the hypotenuse segments adjacent to legs $a, b$. Each squared length is a geometric mean of the pieces it touches.`,
          example: String.raw`In a $3$-$4$-$5$ triangle: $h = \frac{12}{5}$, and the hypotenuse splits into $p = \frac{9}{5}$, $q = \frac{16}{5}$ — check $a^2 = 9 = \frac{9}{5} \cdot 5$. ✓`,
          keywords: ["geometric mean", "altitude to hypotenuse", "similar triangles", "right triangle split"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "triangle-inequality",
          name: "Triangle Inequality",
          latex: String.raw`|a - b| < c < a + b`,
          description: String.raw`Three lengths form a triangle iff each side is less than the sum of the other two. Degenerate (collinear) when equality holds.`,
          keywords: ["exists", "valid triangle", "side lengths", "degenerate"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "polygon-angle-sums",
          name: "Polygon Angle Sums",
          latex: String.raw`\text{Interior sum} = 180^\circ(n-2), \qquad \text{Exterior sum} = 360^\circ`,
          description: String.raw`For an $n$-gon. Each interior angle of a regular $n$-gon is $\frac{180^\circ(n-2)}{n}$; each exterior angle is $\frac{360^\circ}{n}$.`,
          keywords: ["interior angles", "exterior angles", "regular polygon", "n-gon"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "similar-figures-ratios",
          name: "Similar Figures: Length, Area, Volume Ratios",
          latex: String.raw`\frac{\ell_1}{\ell_2} = k, \qquad \frac{A_1}{A_2} = k^2, \qquad \frac{V_1}{V_2} = k^3`,
          description: String.raw`If two figures are similar with length ratio $k$, areas scale by $k^2$ and volumes by $k^3$. The single most-used fact in AMC geometry.`,
          keywords: ["similarity", "scale factor", "area ratio", "volume ratio", "similar triangles"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "midsegment-theorem",
          name: "Midsegment Theorem",
          latex: String.raw`MN \parallel BC, \qquad MN = \tfrac{1}{2}BC`,
          description: String.raw`The segment joining the midpoints of two sides of a triangle is parallel to the third side and half its length. The trapezoid midsegment equals the average of the two bases.`,
          keywords: ["midpoint", "midline", "parallel", "half", "trapezoid median"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "intercept-theorem",
          name: "Intercept Theorem (Basic Proportionality)",
          latex: String.raw`DE \parallel BC \iff \frac{AD}{DB} = \frac{AE}{EC}`,
          description: String.raw`A line parallel to one side of a triangle cuts the other two sides proportionally — and conversely, equal ratios force parallelism. More generally, three parallel lines cut any two transversals in equal ratios. The midsegment is the special case $AD = DB$.`,
          keywords: ["thales", "basic proportionality", "parallel cuts proportional", "transversals", "similar setup"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "centroid-division",
          name: "Centroid Divides Medians 2:1",
          latex: String.raw`AG : GM = 2 : 1`,
          description: String.raw`The centroid $G$ (intersection of medians) sits two-thirds of the way from each vertex $A$ to the opposite midpoint $M$. The three medians cut the triangle into 6 equal-area pieces.`,
          keywords: ["median", "centroid", "center of mass", "two thirds", "equal areas"],
          importance: "high",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "cevian-area-ratio",
          name: "Area Ratios from a Cevian",
          latex: String.raw`\frac{[ABD]}{[ACD]} = \frac{BD}{DC}`,
          description: String.raw`Triangles sharing an apex and having bases on the same line have areas proportional to their bases. The workhorse behind mass points and area-chasing.`,
          keywords: ["cevian", "same height", "area chasing", "base ratio", "mass points"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "trapezoid-parallelogram-areas",
          name: "Quadrilateral Areas (Trapezoid, Parallelogram, Rhombus/Kite)",
          latex: String.raw`A_{\text{trap}} = \frac{(b_1+b_2)h}{2}, \quad A_{\text{par}} = bh, \quad A_{\text{rhomb/kite}} = \frac{d_1 d_2}{2}`,
          description: String.raw`The diagonal formula $\frac{d_1 d_2}{2}$ works for any quadrilateral with perpendicular diagonals.`,
          keywords: ["trapezoid", "parallelogram", "rhombus", "kite", "diagonals", "perpendicular"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "trapezoid-special-segments",
          name: "The Four Mean Segments of a Trapezoid",
          latex: String.raw`\text{midseg} = \frac{a+b}{2}, \quad \text{through diagonals} = \frac{2ab}{a+b}, \quad \text{similar split} = \sqrt{ab}, \quad \text{equal areas} = \sqrt{\tfrac{a^2+b^2}{2}}`,
          description: String.raw`Four parallel-to-the-bases segments, one per classical mean of the bases $a, b$: the midsegment (arithmetic), the segment through the diagonals' intersection (harmonic), the one splitting the trapezoid into two similar trapezoids (geometric), and the one splitting it into two equal areas (quadratic). They occur in the mean-inequality order HM $\le$ GM $\le$ AM $\le$ QM.`,
          keywords: ["trapezoid segment", "harmonic mean segment", "through diagonal intersection", "parallel to bases", "equal area segment"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "quadrilateral-diagonal-area",
          name: "Quadrilateral Area from Diagonals",
          latex: String.raw`A = \frac{1}{2} d_1 d_2 \sin\theta`,
          description: String.raw`For any quadrilateral with diagonals $d_1, d_2$ meeting at angle $\theta$. Perpendicular diagonals give the familiar $\frac{1}{2}d_1 d_2$; also $A \le \frac{1}{2} d_1 d_2$ always.`,
          example: String.raw`Diagonals $8$ and $10$ crossing at $30^\circ$: $A = \frac{1}{2} \cdot 8 \cdot 10 \cdot \frac{1}{2} = 20$.`,
          keywords: ["diagonals angle", "quadrilateral area", "sine"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "regular-polygon-area",
          name: "Regular Polygon Area (Apothem)",
          latex: String.raw`A = \frac{1}{2} a p = \frac{1}{2} n s a`,
          description: String.raw`With apothem $a$, perimeter $p$, side $s$, and $n$ sides. Also $A = \frac{1}{2}nR^2\sin\frac{360^\circ}{n}$ using circumradius $R$. Worth caching: regular octagon of side $s$ has area $2(1+\sqrt2)s^2$, and a regular dodecagon inscribed in radius $R$ has area exactly $3R^2$.`,
          keywords: ["apothem", "perimeter", "regular", "n-gon area", "octagon area", "dodecagon area"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "clock-angle",
          name: "Clock Angle Formula",
          latex: String.raw`\theta = \left| 30H - 5.5M \right|^\circ`,
          description: String.raw`Angle between the hands at $H$ hours $M$ minutes (take $360^\circ - \theta$ if over $180^\circ$). The minute hand moves $6^\circ$ per minute; the hour hand $0.5^\circ$ per minute.`,
          example: String.raw`At 3:15, $\theta = |90 - 82.5| = 7.5^\circ$ — the hands are not aligned even though both point near the 3.`,
          keywords: ["clock hands", "angle between hands", "time"],
          importance: "medium",
          level: ["MATHCOUNTS"]
        }
      ]
    },
    {
      title: "Triangle Areas & Radii",
      formulas: [
        {
          id: "triangle-area-standard",
          name: "Standard Triangle Area",
          latex: String.raw`A = \frac{1}{2} b h`,
          description: String.raw`Base times height over two. Any side can be the base; drop the altitude to it.`,
          keywords: ["base", "height", "altitude", "area"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "trig-area",
          name: "Trigonometric Area",
          latex: String.raw`A = \frac{1}{2} a b \sin C`,
          description: String.raw`Two sides and the included angle. Maximized when $C = 90^\circ$.`,
          keywords: ["sine", "included angle", "SAS", "area"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "herons-formula",
          name: "Heron's Formula",
          latex: String.raw`A = \sqrt{s(s-a)(s-b)(s-c)}`,
          description: String.raw`Area from three sides, with semiperimeter $s = \frac{a+b+c}{2}$.`,
          example: String.raw`The famous $13$-$14$-$15$ triangle: $s = 21$, so $A = \sqrt{21 \cdot 8 \cdot 7 \cdot 6} = \sqrt{7056} = 84$. (Its altitudes are then $\frac{2 \cdot 84}{13}, 12, \frac{2 \cdot 84}{15}$.)`,
          keywords: ["three sides", "semiperimeter", "SSS", "area"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "inradius-area",
          name: "Inradius Formula",
          latex: String.raw`A = rs`,
          description: String.raw`Area equals inradius times semiperimeter. Works for any polygon with an inscribed circle (tangential polygon).`,
          example: String.raw`For the $13$-$14$-$15$ triangle, $A = 84$ and $s = 21$, so $r = \frac{84}{21} = 4$.`,
          keywords: ["inradius", "incircle", "semiperimeter", "inscribed circle", "area"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "circumradius-area",
          name: "Circumradius Formula",
          latex: String.raw`A = \frac{abc}{4R}`,
          description: String.raw`Area from the three sides and circumradius $R$. Rearranged: $R = \frac{abc}{4A}$.`,
          example: String.raw`For the $13$-$14$-$15$ triangle with $A = 84$: $R = \frac{13 \cdot 14 \cdot 15}{4 \cdot 84} = \frac{2730}{336} = \frac{65}{8}$.`,
          keywords: ["circumradius", "circumcircle", "abc", "area"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "right-triangle-inradius",
          name: "Right Triangle Inradius",
          latex: String.raw`r = \frac{a + b - c}{2}, \qquad R = \frac{c}{2}`,
          description: String.raw`For legs $a, b$ and hypotenuse $c$. Also, by Thales, the circumradius of a right triangle is $R = \frac{c}{2}$ (hypotenuse is a diameter).`,
          example: String.raw`In a $3$-$4$-$5$ triangle: $r = \frac{3 + 4 - 5}{2} = 1$ and $R = \frac{5}{2}$.`,
          keywords: ["right triangle", "inradius", "hypotenuse", "Thales", "circumradius"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "incircle-tangent-lengths",
          name: "Incircle Tangent Lengths ($s - a$)",
          latex: String.raw`AF = AE = s - a, \qquad BF = BD = s - b, \qquad CD = CE = s - c`,
          description: String.raw`The incircle touches the sides at $D, E, F$; the two tangent segments from each vertex are equal, and their common length is the semiperimeter minus the opposite side. An excircle opposite $A$ gives tangent length $s$ from $A$.`,
          example: String.raw`In the $13$-$14$-$15$ triangle ($s = 21$): tangent lengths from the vertices are $21 - 14 = 7$, $21 - 15 = 6$, $21 - 13 = 8$ — check $7 + 6 = 13$, $6 + 8 = 14$, $7 + 8 = 15$. ✓`,
          keywords: ["tangent lengths", "incircle touch points", "s minus a", "excircle", "semiperimeter"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "shared-angle-area-ratio",
          name: "Shared-Angle Area Ratio",
          latex: String.raw`\frac{[AXY]}{[ABC]} = \frac{AX \cdot AY}{AB \cdot AC}`,
          description: String.raw`If $X$ lies on $AB$ and $Y$ on $AC$, the sub-triangle's area is the product of the side fractions — immediate from $\frac{1}{2}ab\sin A$ with the same included angle. One of the highest-frequency area tools on AMC and AIME.`,
          example: String.raw`$AX = \frac{1}{3}AB$ and $AY = \frac{3}{4}AC$: $[AXY] = \frac{1}{3}\cdot\frac{3}{4} = \frac{1}{4}$ of $[ABC]$.`,
          keywords: ["area ratio", "shared angle", "product of fractions", "sub triangle", "two sides"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "exradii",
          name: "Excircles & Exradii",
          latex: String.raw`r_a = \frac{A}{s - a} = s \tan\frac{A}{2}, \qquad \frac{1}{r} = \frac{1}{r_a} + \frac{1}{r_b} + \frac{1}{r_c}, \qquad r\, r_a r_b r_c = A^2, \qquad r_a = s\tan\frac{A}{2}`,
          description: String.raw`The excircle opposite $A$ touches side $a$ and the extensions of the other two sides; its radius satisfies $A = r_a(s-a)$, mirroring $A = rs$. The tangent length from $A$ to its excircle is exactly $s$. Also $r_a = s\tan\frac{A}{2}$ while $r = (s-a)\tan\frac{A}{2}$.`,
          example: String.raw`The $13$-$14$-$15$ triangle ($A = 84$, $s = 21$): $r_a = \frac{84}{21-14} = 12$ for the excircle opposite the side of length $14$, versus inradius $r = 4$.`,
          keywords: ["excircle", "exradius", "exradius formula", "exradii", "s minus a", "escribed circle", "tangent length s", "ra"],
          importance: "medium",
          level: ["AIME"]
        }
      ]
    },
    {
      title: "Advanced Triangle Theorems",
      formulas: [
        {
          id: "law-of-sines",
          name: "Extended Law of Sines",
          latex: String.raw`\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R`,
          description: String.raw`Relates each side to the sine of its opposite angle; the common ratio is the circumcircle's diameter.`,
          keywords: ["law of sines", "circumradius", "opposite angle", "2R"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "law-of-cosines",
          name: "Law of Cosines",
          latex: String.raw`c^2 = a^2 + b^2 - 2ab \cos C, \qquad \cos C = \frac{a^2 + b^2 - c^2}{2ab}`,
          description: String.raw`Generalizes the Pythagorean Theorem to any angle. Solve for $\cos C = \frac{a^2+b^2-c^2}{2ab}$ to find angles from sides.`,
          example: String.raw`Sides $5$ and $7$ with a $60^\circ$ angle between them: $c^2 = 25 + 49 - 2 \cdot 5 \cdot 7 \cdot \frac{1}{2} = 39$, so $c = \sqrt{39}$.`,
          keywords: ["law of cosines", "SAS", "SSS", "angle from sides"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "law-cosines-60-120",
          name: "Law of Cosines at 60° and 120°",
          latex: String.raw`C = 60^\circ: \; c^2 = a^2 + b^2 - ab, \qquad C = 120^\circ: \; c^2 = a^2 + b^2 + ab`,
          description: String.raw`The two special cases worth knowing cold — $\cos C = \pm\frac{1}{2}$ makes the cross term $\mp ab$. Triangles with a $60^\circ$ or $120^\circ$ angle and integer sides (like $3, 5, 7$) are AMC/AIME regulars.`,
          example: String.raw`Sides $3$ and $5$ around a $120^\circ$ angle: $c^2 = 9 + 25 + 15 = 49$, so $c = 7$ — the famous $3$-$5$-$7$ triangle.`,
          keywords: ["60 degrees", "120 degrees", "3 5 7", "eisenstein triple"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "angle-bisector-theorem",
          name: "Angle Bisector Theorem",
          latex: String.raw`\frac{AB}{AC} = \frac{BD}{DC}`,
          description: String.raw`If the bisector from $A$ meets $BC$ at $D$, it splits the opposite side in the ratio of the adjacent sides. The incenter divides that bisector in ratio $AI : ID = (b+c) : a$.`,
          example: String.raw`If $AB = 6$, $AC = 8$, $BC = 7$: then $BD : DC = 6 : 8 = 3 : 4$, so $BD = 3$ and $DC = 4$.`,
          keywords: ["angle bisector", "ratio", "opposite side", "adjacent sides"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "angle-bisector-length",
          name: "Length of an Angle Bisector",
          latex: String.raw`d^2 = ab - mn`,
          description: String.raw`Where $a, b$ are the sides adjacent to the bisected angle and $m, n$ are the segments the bisector cuts the opposite side into.`,
          example: String.raw`Continuing the $6$-$8$-$7$ example above: $d^2 = 6 \cdot 8 - 3 \cdot 4 = 36$, so the bisector from $A$ has length exactly $6$.`,
          keywords: ["angle bisector length", "cevian", "segments"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "stewarts-theorem",
          name: "Stewart's Theorem",
          latex: String.raw`a(d^2 + mn) = b^2 m + c^2 n`,
          description: String.raw`For a cevian of length $d$ dividing side $a$ into segments $m$ (adjacent to $c$) and $n$ (adjacent to $b$). Mnemonic: "a man and his dad put a bomb in the sink" — $man + dad = bmb + cnc$.`,
          example: String.raw`Triangle with $b = 7$, $c = 5$, and side $a = 6$ split into $m = 2$ (next to $c$), $n = 4$: $6(d^2 + 8) = 49 \cdot 2 + 25 \cdot 4 = 198$, so $d^2 = 25$ and the cevian is $5$.`,
          keywords: ["cevian length", "stewart", "man dad bomb sink"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "cevas-theorem",
          name: "Ceva's Theorem",
          latex: String.raw`\frac{AF}{FB} \cdot \frac{BD}{DC} \cdot \frac{CE}{EA} = 1`,
          description: String.raw`Cevians $AD$, $BE$, $CF$ are concurrent if and only if this product equals $1$.`,
          example: String.raw`Medians: each ratio is $\frac{1}{1}$, so the product is $1$ — confirming the medians meet at a point (the centroid). If instead $\frac{AF}{FB} = \frac{1}{2}$ and $\frac{BD}{DC} = \frac{3}{1}$, concurrency forces $\frac{CE}{EA} = \frac{2}{3}$.`,
          keywords: ["concurrent", "cevians", "product of ratios"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "menelaus-theorem",
          name: "Menelaus' Theorem",
          latex: String.raw`\frac{AF}{FB} \cdot \frac{BD}{DC} \cdot \frac{CE}{EA} = -1`,
          description: String.raw`A transversal line meets lines $BC$, $CA$, $AB$ at $D$, $E$, $F$ (using directed segments; use $=1$ with unsigned lengths). The collinearity partner to Ceva.`,
          keywords: ["transversal", "collinear", "directed segments"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "apollonius-theorem",
          name: "Apollonius's Theorem (Median Length)",
          latex: String.raw`b^2 + c^2 = 2\left(m_a^2 + \left(\frac{a}{2}\right)^2\right), \qquad m_a^2 + m_b^2 + m_c^2 = \frac{3}{4}(a^2 + b^2 + c^2), \qquad m_a = \frac{1}{2}\sqrt{2b^2 + 2c^2 - a^2}`,
          description: String.raw`Stewart's Theorem specialized to the median $m_a$ drawn to side $a$. Equivalently $m_a = \frac{1}{2}\sqrt{2b^2 + 2c^2 - a^2}$.`,
          example: String.raw`Sides $b = 5$, $c = 7$, and $a = 8$: $25 + 49 = 2(m_a^2 + 16)$, so $m_a^2 = 21$ and the median to the side of length $8$ is $\sqrt{21}$.`,
          keywords: ["median length", "apollonius", "stewart special case"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "median-triangle-area",
          name: "Triangle Area from Its Medians",
          latex: String.raw`[ABC] = \frac{4}{3}\,[\text{triangle with sides } m_a, m_b, m_c]`,
          description: String.raw`The three medians of any triangle themselves form a valid triangle, and the original triangle's area is $\frac{4}{3}$ of the median triangle's. So: given three medians, build their triangle, use Heron, scale.`,
          example: String.raw`Medians $9, 12, 15$ form a right triangle of area $54$, so the original triangle has area $\frac{4}{3} \cdot 54 = 72$.`,
          keywords: ["medians form triangle", "area from medians", "four thirds"],
          importance: "low",
          level: ["AMC12", "AIME"]
        },
        {
          id: "rouths-theorem",
          name: "Routh's Theorem",
          latex: String.raw`\frac{[\triangle]}{[ABC]} = \frac{(xyz-1)^2}{(xy+y+1)(yz+z+1)(zx+x+1)}`,
          description: String.raw`Area ratio of the inner triangle formed by three cevians cutting the sides in ratios $x, y, z$. For all ratios $2{:}1$, the inner triangle is $\frac{1}{7}$ of the original.`,
          example: String.raw`With $x = y = z = 2$: $\frac{(8-1)^2}{(4+2+1)^3} = \frac{49}{343} = \frac{1}{7}$ — the famous "one-seventh area triangle."`,
          keywords: ["cevian triangle", "one seventh", "area ratio", "routh"],
          importance: "low",
          level: ["AIME"]
        },
        {
          id: "vivianis-theorem",
          name: "Viviani's Theorem",
          latex: String.raw`d_1 + d_2 + d_3 = h`,
          description: String.raw`For any point inside an equilateral triangle, the perpendicular distances to the three sides sum to the altitude. Proof: split into three triangles and compare areas.`,
          keywords: ["equilateral", "distances to sides", "constant sum", "altitude"],
          importance: "low",
          level: ["AMC12", "AIME"]
        },
        {
          id: "trig-ceva",
          name: "Trigonometric Ceva",
          latex: String.raw`\frac{\sin\angle BAD}{\sin\angle DAC} \cdot \frac{\sin\angle CBE}{\sin\angle EBA} \cdot \frac{\sin\angle ACF}{\sin\angle FCB} = 1`,
          description: String.raw`Cevians $AD$, $BE$, $CF$ are concurrent iff the product of the sine ratios of the angles they cut at each vertex equals $1$ — the angle-based twin of Ceva, for problems that specify angles rather than side ratios.`,
          example: String.raw`Cevians making $30°/30°$, $20°/40°$ splits at two vertices: concurrency forces the third vertex's split to satisfy $\frac{\sin 30°}{\sin 30°}\cdot\frac{\sin 20°}{\sin 40°}\cdot\frac{\sin x}{\sin(y)} = 1$ — one equation pins the last angle pair.`,
          keywords: ["trig ceva", "sine ratios", "concurrent cevians", "angle version"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "erdos-mordell",
          name: "Erdős–Mordell Inequality",
          latex: String.raw`PA + PB + PC \ge 2(d_a + d_b + d_c)`,
          description: String.raw`For any interior point $P$: the distances to the vertices total at least twice the perpendicular distances to the sides, with equality only for the center of an equilateral triangle. A sharp, memorable bound linking the two natural distance triples.`,
          example: String.raw`Center of an equilateral triangle with circumradius $R$: vertex distances sum to $3R$ and side distances sum to $3 \cdot \frac{R}{2}$ — exactly double, confirming the equality case.`,
          keywords: ["erdos mordell", "interior point", "distance inequality", "vertices versus sides"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "ratio-lemma",
          name: "The Ratio Lemma (Generalized Angle Bisector)",
          latex: String.raw`\frac{BD}{DC} = \frac{AB}{AC} \cdot \frac{\sin \angle BAD}{\sin \angle DAC}`,
          description: String.raw`For any cevian $AD$: the split of the opposite side is the side ratio times the sine ratio of the split angle. Bisector ($\sin$ ratio $= 1$) gives the Angle Bisector Theorem; median ($BD = DC$) gives the sine relation for medians; applied to all three cevians it proves trig Ceva.`,
          example: String.raw`Cevian making $30^\circ$ with $AB$ and $45^\circ$ with $AC$, where $AB = 6$, $AC = 4\sqrt2$: $\frac{BD}{DC} = \frac{6}{4\sqrt2}\cdot\frac{\sin 30^\circ}{\sin 45^\circ} = \frac{6}{4\sqrt2}\cdot\frac{1/2}{\sqrt2/2} = \frac{3}{4}$.`,
          keywords: ["ratio lemma", "cevian split", "sine ratio", "generalized bisector"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "law-of-tangents",
          name: "Law of Tangents",
          latex: String.raw`\frac{a - b}{a + b} = \frac{\tan\frac{A-B}{2}}{\tan\frac{A+B}{2}}`,
          description: String.raw`Relates the sum and difference of two sides to the half-sum and half-difference of their opposite angles (note $\frac{A+B}{2} = 90^\circ - \frac{C}{2}$). Derived from the law of sines plus sum-to-product. Occasionally the fastest route when a problem gives $a \pm b$ and angle information.`,
          example: String.raw`A $30$-$60$-$90$ triangle with $a = 2$ (opposite $90^\circ$) and $b = 1$ (opposite $30^\circ$): LHS $= \frac{1}{3}$; RHS $= \frac{\tan 30^\circ}{\tan 60^\circ} = \frac{1/\sqrt3}{\sqrt3} = \frac{1}{3}$. ✓`,
          keywords: ["law of tangents", "sum and difference of sides", "half angles"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "napoleons-theorem",
          name: "Napoleon's Theorem",
          latex: String.raw`\text{centers of equilateral triangles erected on the sides form an equilateral triangle}`,
          description: String.raw`Erect equilateral triangles outward (or all inward) on the sides of any triangle: their centers always form an equilateral triangle. The outer Napoleon triangle has area $\frac{\sqrt3}{24}(a^2+b^2+c^2) + \frac{[ABC]}{2}$; outer minus inner area equals $[ABC]$.`,
          example: String.raw`Check on an equilateral triangle of side $s$: the formula gives $\frac{\sqrt3}{24} \cdot 3s^2 + \frac{1}{2}\cdot\frac{\sqrt3}{4}s^2 = \frac{\sqrt3}{8}s^2 + \frac{\sqrt3}{8}s^2 = \frac{\sqrt3}{4}s^2$ — the Napoleon triangle is congruent to the original. ✓`,
          keywords: ["napoleon", "equilateral centers", "erected triangles", "outer inner"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        }
      ]
    },
    {
      title: "Triangle Centers & the Euler Line",
      formulas: [
        {
          id: "euler-line-ratio",
          name: "The Euler Line",
          latex: String.raw`HG = 2\,GO`,
          description: String.raw`The orthocenter $H$, centroid $G$, and circumcenter $O$ are collinear (the Euler line), with the centroid one-third of the way from $O$ to $H$. Also $\vec{OH} = \vec{OA} + \vec{OB} + \vec{OC}$.`,
          keywords: ["orthocenter", "centroid", "circumcenter", "collinear", "euler line"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "euler-distance-theorem",
          name: "Euler's Distance Formula (Circumcenter to Incenter)",
          latex: String.raw`d^2 = R(R - 2r)`,
          description: String.raw`Distance between the circumcenter and incenter. Implies Euler's Inequality $R \ge 2r$, with equality only for equilateral triangles.`,
          example: String.raw`If $R = 8$ and $r = 3$, then $d^2 = 8(8 - 6) = 16$, so the circumcenter and incenter are $4$ apart.`,
          keywords: ["circumcenter incenter distance", "euler inequality", "R 2r"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "nine-point-circle",
          name: "The Nine-Point Circle",
          latex: String.raw`R_9 = \frac{R}{2}`,
          description: String.raw`Passes through the 3 side midpoints, 3 feet of the altitudes, and 3 midpoints from the orthocenter to each vertex. Its center is the midpoint of segment $OH$ on the Euler line.`,
          keywords: ["nine point", "midpoints", "altitude feet", "half circumradius", "euler line"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "carnots-theorem",
          name: "Carnot's Theorem",
          latex: String.raw`d_1 + d_2 + d_3 = R + r`,
          description: String.raw`The signed perpendicular distances from the circumcenter to the three sides sum to $R + r$ (negative if the circumcenter is on the far side of a side, i.e. obtuse triangles).`,
          keywords: ["circumcenter distances", "R plus r", "signed distances"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "simson-line",
          name: "The Simson Line",
          latex: String.raw`P \in \text{circumcircle} \iff \text{feet of perpendiculars are collinear}`,
          description: String.raw`Drop perpendiculars from a point $P$ on the circumcircle of $\triangle ABC$ to the three (extended) sides — the three feet are always collinear.`,
          keywords: ["circumcircle point", "perpendicular feet", "collinear", "simson"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "brocard-angle",
          name: "The Brocard Angle",
          latex: String.raw`\cot \omega = \cot A + \cot B + \cot C`,
          description: String.raw`The angle $\omega$ at which cevians from each vertex to the Brocard point meet the sides. Also $\csc^2\omega = \csc^2 A + \csc^2 B + \csc^2 C$, and always $\omega \le 30^\circ$.`,
          example: String.raw`Equilateral triangle: $\cot\omega = 3\cot 60^\circ = \sqrt{3}$, so $\omega = 30^\circ$ — the maximum possible Brocard angle.`,
          keywords: ["brocard point", "cotangent sum", "special angle"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "symmedian-lemoine",
          name: "Symmedians & the Lemoine Point",
          latex: String.raw`\text{symmedian} = \text{median reflected over the angle bisector}; \qquad BD : DC = c^2 : b^2`,
          description: String.raw`The symmedian from $A$ cuts $BC$ in the ratio of the squares of the adjacent sides (the median's $1:1$, twisted by the reflection). All three symmedians meet at the Lemoine point, which minimizes the sum of squared distances to the sides. The tangent-intersection construction: tangents to the circumcircle at $B$ and $C$ meet on the $A$-symmedian.`,
          example: String.raw`In a triangle with $AB = c = 6$ and $AC = b = 4$, the symmedian from $A$ meets $BC$ dividing it as $BD:DC = 36:16 = 9:4$ — versus the median's $1:1$ and the bisector's $6:4$.`,
          keywords: ["symmedian", "lemoine point", "squares of sides", "tangent intersection", "reflected median"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "incenter-excenter-lemma",
          name: "Incenter–Excenter Lemma (Fact 5)",
          latex: String.raw`M = \text{arc midpoint of } BC \implies MB = MC = MI = MI_A`,
          description: String.raw`The midpoint $M$ of arc $BC$ (not containing $A$) is equidistant from $B$, $C$, the incenter $I$, and the $A$-excenter $I_A$ — so $B, C, I, I_A$ lie on a circle centered at $M$. Proof: angle chase shows $\angle MBI = \angle MIB = \frac{A+B}{2}$. Also $AI = \frac{r}{\sin(A/2)}$ and $A$, $I$, $M$ are collinear (the bisector passes through the arc midpoint).`,
          example: String.raw`Equilateral triangle with circumradius $R$: the arc midpoint $M$ is the antipode of $A$, the chords $MB$ and $MC$ span $60^\circ$ arcs so $MB = MC = R$, and $MI$ is the distance from $M$ to the center — also $R$. All equal. ✓`,
          keywords: ["incenter excenter", "fact 5", "arc midpoint", "equidistant", "bisector through arc midpoint"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "orthocenter-properties",
          name: "Orthocenter Reflections & Distances",
          latex: String.raw`AH = 2R\cos A, \qquad \text{reflections of } H \text{ over } BC \text{ and over } M_{BC} \text{ lie on } \odot(ABC)`,
          description: String.raw`The reflection of the orthocenter over any side lands on the circumcircle (so $\odot(HBC)$ is the mirror image of $\odot(ABC)$, same radius); the reflection over a side's midpoint is the antipode of the opposite vertex. Distances: $AH = 2R\cos A$, and the distance from the circumcenter to side $a$ is $\frac{AH}{2} = R\cos A$.`,
          example: String.raw`Right triangle at $A$: $\cos A = 0$ gives $AH = 0$ — the orthocenter is $A$ itself. ✓ For an equilateral triangle, $AH = 2R\cos 60^\circ = R$: the orthocenter coincides with the center.`,
          keywords: ["orthocenter", "reflection over side", "2R cos A", "antipode", "circumcircle image"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "fermat-point",
          name: "Fermat Point (Torricelli Point)",
          latex: String.raw`\text{all angles} < 120^\circ \implies \min_X (XA + XB + XC) \text{ at } X \text{ with } \angle AXB = \angle BXC = \angle CXA = 120^\circ`,
          description: String.raw`The point minimizing the total distance to the vertices sees every side at $120^\circ$; construct it by erecting equilateral triangles outward on the sides and connecting each new vertex to the opposite original vertex (the three lines concur there). If an angle is $\ge 120^\circ$, the minimizer is that vertex. The rotation trick computes the minimal sum: it equals the length of one straight segment after a $60^\circ$ rotation.`,
          example: String.raw`Equilateral triangle of side $s$: the Fermat point is the center, and the minimum total distance is $3 \cdot \frac{s\sqrt3}{3} = s\sqrt3$.`,
          keywords: ["fermat point", "torricelli", "minimize distance sum", "120 degrees", "equilateral construction"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "center-distance-formulas",
          name: "Distances Between Triangle Centers",
          latex: String.raw`OH^2 = 9R^2 - (a^2+b^2+c^2), \qquad OG^2 = R^2 - \tfrac{1}{9}(a^2+b^2+c^2), \qquad R^2 - OI^2 = 2Rr`,
          description: String.raw`The Euler-line distances in side/radius terms: $OH$ from the vector identity $\vec{OH} = \vec{OA}+\vec{OB}+\vec{OC}$, and $OG = \frac{OH}{3}$. The last is the power of the incenter with respect to the circumcircle (equivalent to Euler's $OI^2 = R(R-2r)$). Also $OH^2 = R^2(1 - 8\cos A\cos B\cos C)$.`,
          example: String.raw`The $13$-$14$-$15$ triangle ($R = \frac{65}{8}$, $\sum a^2 = 590$): $OH^2 = 9 \cdot \frac{4225}{64} - 590 = \frac{38025 - 37760}{64} = \frac{265}{64}$, so $OH = \frac{\sqrt{265}}{8}$.`,
          keywords: ["OH distance", "OG distance", "euler line length", "power of incenter", "center distances"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "feuerbach-theorem",
          name: "Feuerbach's Theorem",
          latex: String.raw`NI = \frac{R}{2} - r, \qquad NI_A = \frac{R}{2} + r_A`,
          description: String.raw`The nine-point circle is internally tangent to the incircle and externally tangent to all three excircles — the distances between centers are exactly the radius differences/sums. The tangency point with the incircle (the Feuerbach point) is a named point of the triangle.`,
          example: String.raw`$R = 10$, $r = 3$: the nine-point center sits exactly $\frac{10}{2} - 3 = 2$ away from the incenter — tangency, not coincidence.`,
          keywords: ["feuerbach", "nine point tangent incircle", "R/2 minus r", "tangent excircles"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "leibniz-formula",
          name: "Leibniz Point-Mass Formula",
          latex: String.raw`PA^2 + PB^2 + PC^2 = 3\,PG^2 + \frac{a^2 + b^2 + c^2}{3}`,
          description: String.raw`For any point $P$ and centroid $G$: the sum of squared distances to the vertices splits into a point-dependent part ($3PG^2$) and a triangle constant ($\sum GA^2 = \frac{1}{3}\sum a^2$). Immediate corollary: the centroid minimizes $PA^2 + PB^2 + PC^2$.`,
          example: String.raw`Equilateral triangle of side $s$, $P$ at a vertex: LHS $= 0 + s^2 + s^2 = 2s^2$; RHS $= 3 \cdot \frac{s^2}{3} + \frac{3s^2}{3} = 2s^2$. ✓`,
          keywords: ["sum of squared distances", "centroid minimizes", "leibniz", "point mass"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        }
      ]
    },
    {
      title: "Circles",
      formulas: [
        {
          id: "circle-basics",
          name: "Circumference, Area, Arc & Sector",
          latex: String.raw`C = 2\pi r, \quad A = \pi r^2, \quad \text{arc} = r\theta, \quad \text{sector} = \frac{1}{2} r^2 \theta`,
          description: String.raw`Arc length and sector area use $\theta$ in radians (or multiply $\frac{\theta}{360^\circ}$ by $C$ or $A$ in degrees). An annulus between radii $R > r$ has area $\pi(R^2 - r^2)$.`,
          keywords: ["circumference", "sector", "arc length", "annulus", "radians"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "circular-segment",
          name: "Circular Segment & Lens Areas",
          latex: String.raw`A_{\text{segment}} = \frac{1}{2} r^2 (\theta - \sin\theta)`,
          description: String.raw`The region between a chord and its arc: sector minus triangle, with $\theta$ the central angle in radians. Two overlapping circles' lens is a sum of two segments — the standard decomposition for shaded-region problems.`,
          keywords: ["segment area", "chord region", "lens", "overlap of circles", "sector minus triangle", "shaded region"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "power-of-a-point",
          name: "Power of a Point",
          latex: String.raw`PA \cdot PB = PC \cdot PD = PT^2`,
          description: String.raw`Chords through an interior point, or secants from an exterior point, give equal products; a tangent length $PT$ squares to the same value. The power of $P$ equals $|OP^2 - r^2|$.`,
          example: String.raw`Two chords cross inside a circle: one is split into pieces $3$ and $8$, the other into $4$ and $x$. Then $3 \cdot 8 = 4x$, so $x = 6$.`,
          diagram: String.raw`<svg viewBox="0 0 400 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two chords intersecting at a point P inside a circle">
  <circle cx="200" cy="140" r="110" fill="none" stroke="var(--text-faint)" stroke-width="1.5"/>
  <line x1="96.6" y1="102.4" x2="308.3" y2="159.1" stroke="var(--accent)" stroke-width="2"/>
  <line x1="162.4" y1="243.4" x2="237.6" y2="36.6" stroke="var(--gold)" stroke-width="2"/>
  <circle cx="96.6" cy="102.4" r="4" fill="var(--accent)"/>
  <circle cx="308.3" cy="159.1" r="4" fill="var(--accent)"/>
  <circle cx="162.4" cy="243.4" r="4" fill="var(--gold)"/>
  <circle cx="237.6" cy="36.6" r="4" fill="var(--gold)"/>
  <circle cx="203.3" cy="130.9" r="4.5" fill="var(--text)"/>
  <text x="78" y="96" fill="var(--accent)" font-size="15">A</text>
  <text x="316" y="166" fill="var(--accent)" font-size="15">B</text>
  <text x="148" y="260" fill="var(--gold)" font-size="15">C</text>
  <text x="243" y="32" fill="var(--gold)" font-size="15">D</text>
  <text x="207" y="122" fill="var(--text)" font-size="15">P</text>
  <text x="120" y="282" fill="var(--text-dim)" font-size="14">PA · PB  =  PC · PD</text>
</svg>`,
          keywords: ["intersecting chords", "secant", "tangent", "PT squared", "power"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "chord-length",
          name: "Length of a Chord",
          latex: String.raw`\text{chord} = 2R \sin\left(\frac{\theta}{2}\right) = 2\sqrt{R^2 - d^2}, \qquad d_k = 2R\sin\frac{k\pi}{n}`,
          description: String.raw`Where $\theta$ is the central angle it subtends, or $d$ is the distance from the center to the chord. The third form gives every diagonal of a regular $n$-gon inscribed in radius $R$: the one skipping $k$ vertices subtends $\frac{2\pi k}{n}$.`,
          keywords: ["chord", "central angle", "distance from center", "regular polygon diagonal", "diagonal length ngon"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "inscribed-angle-theorem",
          name: "Inscribed Angle Theorem",
          latex: String.raw`\angle \text{inscribed} = \frac{1}{2} \angle \text{central} = \frac{1}{2}\,\text{arc}`,
          description: String.raw`An inscribed angle is half its intercepted arc. Corollaries: angles subtending the same arc are equal, and an angle in a semicircle is $90^\circ$ (Thales).`,
          diagram: String.raw`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Central angle 2-theta and inscribed angle theta subtending the same arc">
  <circle cx="200" cy="155" r="115" fill="none" stroke="var(--text-faint)" stroke-width="1.5"/>
  <path d="M 273.9 243.1 A 115 115 0 0 1 126.1 243.1" fill="none" stroke="var(--level-mc)" stroke-width="4" stroke-linecap="round"/>
  <line x1="200" y1="155" x2="273.9" y2="243.1" stroke="var(--gold)" stroke-width="2"/>
  <line x1="200" y1="155" x2="126.1" y2="243.1" stroke="var(--gold)" stroke-width="2"/>
  <line x1="200" y1="40" x2="273.9" y2="243.1" stroke="var(--accent)" stroke-width="2"/>
  <line x1="200" y1="40" x2="126.1" y2="243.1" stroke="var(--accent)" stroke-width="2"/>
  <circle cx="200" cy="155" r="4" fill="var(--gold)"/>
  <circle cx="200" cy="40" r="4" fill="var(--accent)"/>
  <circle cx="273.9" cy="243.1" r="4" fill="var(--level-mc)"/>
  <circle cx="126.1" cy="243.1" r="4" fill="var(--level-mc)"/>
  <text x="210" y="152" fill="var(--gold)" font-size="14">O</text>
  <text x="192" y="190" fill="var(--gold)" font-size="14">2θ</text>
  <text x="206" y="36" fill="var(--accent)" font-size="14">C</text>
  <text x="193" y="82" fill="var(--accent)" font-size="14">θ</text>
  <text x="281" y="252" fill="var(--level-mc)" font-size="14">A</text>
  <text x="105" y="252" fill="var(--level-mc)" font-size="14">B</text>
</svg>`,
          keywords: ["inscribed angle", "intercepted arc", "thales", "semicircle"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "angle-chord-secant",
          name: "Angles from Chords, Secants, Tangents",
          latex: String.raw`\text{inside: } \frac{\text{arc}_1 + \text{arc}_2}{2}, \qquad \text{outside: } \frac{\text{arc}_{\text{far}} - \text{arc}_{\text{near}}}{2}`,
          description: String.raw`Two chords crossing inside a circle make an angle equal to half the sum of the intercepted arcs; two secants/tangents from outside make half the difference.`,
          keywords: ["two chords", "two secants", "arc sum", "arc difference", "vertex outside"],
          importance: "high",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "tangent-facts",
          name: "Tangent Line Facts",
          latex: String.raw`OT \perp \ell, \qquad PA = PB`,
          description: String.raw`A tangent is perpendicular to the radius at the point of tangency, and the two tangent segments from an external point are equal. Tangent-chord angle equals half the intercepted arc.`,
          keywords: ["tangent perpendicular radius", "equal tangents", "tangent chord angle"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "common-tangent-lengths",
          name: "Common Tangents Between Two Circles",
          latex: String.raw`t_{\text{ext}} = \sqrt{d^2 - (r_1 - r_2)^2}, \qquad t_{\text{int}} = \sqrt{d^2 - (r_1 + r_2)^2}, \qquad t = 2\sqrt{r_1 r_2} \;\;(\text{tangent circles})`,
          description: String.raw`Lengths of the external and internal common tangents between circles of radii $r_1, r_2$ with centers $d$ apart.`,
          keywords: ["external tangent", "internal tangent", "two circles", "distance between centers", "2 sqrt r1 r2", "tangent circle chain"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "descartes-circle-theorem",
          name: "Descartes' Circle Theorem",
          latex: String.raw`(k_1 + k_2 + k_3 + k_4)^2 = 2(k_1^2 + k_2^2 + k_3^2 + k_4^2)`,
          description: String.raw`For four mutually tangent circles with curvatures $k_i = \frac{1}{r_i}$. If one circle contains the others, its curvature is negative. A line counts as curvature $0$.`,
          example: String.raw`Circles of radii $1, 2, 3$ mutually tangent ($k = 1, \frac{1}{2}, \frac{1}{3}$): solving gives $k_4 = 1 + \frac{1}{2} + \frac{1}{3} + 2\sqrt{\frac{1}{2} + \frac{1}{6} + \frac{1}{3}} = \frac{11}{6} + 2 = \frac{23}{6}$, so the small circle in the gap has radius $\frac{6}{23}$.`,
          keywords: ["four tangent circles", "curvature", "kissing circles", "apollonian"],
          importance: "low",
          level: ["AIME"]
        },
        {
          id: "caseys-theorem",
          name: "Casey's Theorem",
          latex: String.raw`t_{12}t_{34} + t_{14}t_{23} = t_{13}t_{24}`,
          description: String.raw`Generalized Ptolemy: for four circles tangent to a fifth circle (all internally or all externally), where $t_{ij}$ is the external tangent length between circles $i, j$. Points count as radius-0 circles.`,
          keywords: ["generalized ptolemy", "tangent circles", "tangent lengths"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "butterfly-theorem",
          name: "The Butterfly Theorem",
          latex: String.raw`MX = MY`,
          description: String.raw`Let $M$ be the midpoint of chord $PQ$. Draw chords $AB$ and $CD$ through $M$; then $AD$ and $BC$ cut $PQ$ at points $X, Y$ equidistant from $M$.`,
          keywords: ["chord midpoint", "butterfly", "symmetric intersections"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "radical-axis",
          name: "Radical Axis & Radical Center",
          latex: String.raw`\{P : \operatorname{pow}(P, \omega_1) = \operatorname{pow}(P, \omega_2)\} = \text{a line} \perp O_1O_2`,
          description: String.raw`Points with equal power to two circles form a line perpendicular to the line of centers — through the intersection points when the circles meet. For three circles, the three radical axes concur at the radical center, from which all tangent lengths to the three circles are equal. Compute it by subtracting circle equations (the quadratic terms cancel).`,
          example: String.raw`$x^2 + y^2 = 25$ and $(x-6)^2 + y^2 = 9$: subtracting gives $12x - 36 = 16$, i.e. $x = \frac{13}{3}$ — the radical axis is this vertical line, and it passes through both intersection points of the circles.`,
          keywords: ["radical axis", "radical center", "equal power", "subtract circle equations", "common chord"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "miquels-theorem",
          name: "Miquel's Theorem",
          latex: String.raw`\odot(AEF), \; \odot(BFD), \; \odot(CDE) \text{ meet at one point}`,
          description: String.raw`Pick any points $D, E, F$ on sides $BC$, $CA$, $AB$: the three circles each through a vertex and its two adjacent chosen points always share a common point — the Miquel point. Proved by one round of cyclic-quadrilateral angle chasing; the configuration underlies many "three circles" contest setups.`,
          example: String.raw`With $D, E, F$ the midpoints, the three Miquel circles all pass through the circumcenter $O$ — each circle $\odot(AEF)$ has the right angles needed since $OE \perp CA$ and $OF \perp AB$ make $AEOF$ cyclic.`,
          keywords: ["miquel point", "three circles", "concurrent circles", "points on sides"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        }
      ]
    },
    {
      title: "Cyclic & Tangential Quadrilaterals",
      formulas: [
        {
          id: "cyclic-opposite-angles",
          name: "Cyclic Quadrilateral: Opposite Angles",
          latex: String.raw`A + C = 180^\circ, \qquad B + D = 180^\circ`,
          description: String.raw`A quadrilateral is cyclic (inscribable in a circle) iff opposite angles are supplementary — the standard test for cyclicity.`,
          keywords: ["cyclic", "supplementary", "inscribed quadrilateral", "test"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "ptolemys-theorem",
          name: "Ptolemy's Theorem",
          latex: String.raw`ac + bd = pq`,
          description: String.raw`For a cyclic quadrilateral with sides $a, b, c, d$ in order and diagonals $p, q$: the products of opposite sides sum to the product of the diagonals.`,
          example: String.raw`Sanity check on a unit square: $1 \cdot 1 + 1 \cdot 1 = \sqrt{2} \cdot \sqrt{2} = 2$. ✓ A real use: a cyclic quadrilateral with sides $a = 2, b = 3, c = 6, d = 4$ and one diagonal known lets you solve for the other directly.`,
          keywords: ["ptolemy", "cyclic quadrilateral", "diagonals", "opposite sides"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "cyclic-quad-diagonals",
          name: "Cyclic Quadrilateral Diagonal Formulas (Second Ptolemy)",
          latex: String.raw`\frac{p}{q} = \frac{ad + bc}{ab + cd}, \qquad p^2 = \frac{(ac+bd)(ad+bc)}{ab+cd}`,
          description: String.raw`With sides $a, b, c, d$ in order and diagonals $p = AC$, $q = BD$: the diagonal ratio is a ratio of paired side-products, and combining with Ptolemy ($pq = ac + bd$) gives each diagonal explicitly from the four sides — no angles needed.`,
          keywords: ["second ptolemy", "diagonal ratio", "diagonal from sides", "cyclic quadrilateral diagonals"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "brahmaguptas-formula",
          name: "Brahmagupta's Formula",
          latex: String.raw`A = \sqrt{(s-a)(s-b)(s-c)(s-d)}`,
          description: String.raw`Area of a cyclic quadrilateral with semiperimeter $s$. Heron's formula is the degenerate case $d = 0$.`,
          example: String.raw`Cyclic quadrilateral with sides $2, 2, 3, 3$: $s = 5$, so $A = \sqrt{3 \cdot 3 \cdot 2 \cdot 2} = 6$.`,
          keywords: ["cyclic quadrilateral area", "semiperimeter", "brahmagupta"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "pitots-theorem",
          name: "Pitot's Theorem",
          latex: String.raw`AB + CD = BC + AD`,
          description: String.raw`A quadrilateral is tangential (has an inscribed circle) if and only if the sums of opposite sides are equal.`,
          keywords: ["tangential", "inscribed circle", "opposite sides equal"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "ptolemys-inequality",
          name: "Ptolemy's Inequality",
          latex: String.raw`AB \cdot CD + BC \cdot DA \ge AC \cdot BD`,
          description: String.raw`Holds for any four points in the plane; equality iff $ABCD$ is cyclic in that order (reducing to Ptolemy's Theorem).`,
          keywords: ["four points", "inequality", "equality cyclic"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "ptolemy-equilateral",
          name: "Ptolemy on an Equilateral Triangle",
          latex: String.raw`PA = PB + PC`,
          description: String.raw`If $P$ lies on arc $BC$ of the circumcircle of equilateral $\triangle ABC$, the distance to the far vertex equals the sum of the distances to the near two — a classic AIME shortcut.`,
          example: String.raw`Apply Ptolemy to cyclic quadrilateral $ABPC$ with $AB = BC = CA = s$: $\; PA \cdot s = PB \cdot s + PC \cdot s$, and dividing by $s$ gives the result.`,
          keywords: ["equilateral", "circumcircle point", "distance sum", "pompeiu"],
          importance: "low",
          level: ["AIME"]
        },
        {
          id: "bretschneiders-formula",
          name: "Bretschneider's Formula",
          latex: String.raw`A = \sqrt{(s-a)(s-b)(s-c)(s-d) - abcd \cos^2\left(\frac{A+C}{2}\right)}`,
          description: String.raw`Area of any convex quadrilateral, using opposite angles $A, C$. When cyclic, $A + C = 180^\circ$ kills the last term, recovering Brahmagupta.`,
          keywords: ["general quadrilateral area", "bretschneider", "brahmagupta generalization"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "varignons-theorem",
          name: "Varignon's Theorem",
          latex: String.raw`[\text{Varignon parallelogram}] = \frac{1}{2}[ABCD]`,
          description: String.raw`Connecting the midpoints of the sides of any quadrilateral yields a parallelogram whose area is half the original's, with sides parallel to the diagonals.`,
          keywords: ["midpoints", "parallelogram", "half area", "varignon"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "euler-quadrilateral",
          name: "Euler's Quadrilateral Theorem",
          latex: String.raw`a^2 + b^2 + c^2 + d^2 = p^2 + q^2 + 4m^2`,
          description: String.raw`For any convex quadrilateral with diagonals $p, q$ and $m$ the distance between the midpoints of the diagonals. $m = 0$ gives the parallelogram law.`,
          keywords: ["parallelogram law", "diagonal midpoints", "generalization"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "pascals-theorem",
          name: "Pascal's Theorem (and Brianchon's)",
          latex: String.raw`AB \cap DE, \;\; BC \cap EF, \;\; CD \cap FA \;\text{ are collinear}`,
          description: String.raw`Inscribe any hexagon $ABCDEF$ in a circle (self-intersecting allowed): the three intersection points of opposite sides lie on one line — the Pascal line. The dual, Brianchon's theorem: a hexagon circumscribed about a circle has its three main diagonals concurrent. Degenerate versions (letting adjacent vertices merge so a side becomes a tangent line) are the contest-useful forms.`,
          example: String.raw`Merging vertex pairs of the hexagon turns Pascal into statements about tangent lines: for a triangle inscribed in a circle, the tangents at the vertices meet the opposite sides in three collinear points.`,
          keywords: ["pascal line", "hexagon in circle", "brianchon", "collinear intersections", "projective"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "cyclic-quad-radius",
          name: "Circumradius of a Cyclic Quadrilateral (Parameshvara)",
          latex: String.raw`R = \frac{1}{4K}\sqrt{(ab+cd)(ac+bd)(ad+bc)}`,
          description: String.raw`With $K$ the area (from Brahmagupta): the circumradius of a cyclic quadrilateral in terms of its four sides alone. The three paired products are the same ones appearing in Ptolemy ($ac + bd = pq$) and the diagonal-length formulas.`,
          example: String.raw`Unit square: each product is $2$, so $R = \frac{\sqrt{8}}{4 \cdot 1} = \frac{\sqrt2}{2}$ — the known circumradius. ✓`,
          keywords: ["circumradius cyclic quadrilateral", "parameshvara", "four sides", "brahmagupta companion"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "van-aubel",
          name: "Van Aubel's Theorem",
          latex: String.raw`\text{squares outward on the sides: the segments joining opposite centers are equal and } \perp`,
          description: String.raw`Erect a square outward on each side of any quadrilateral (even non-convex): the two segments connecting centers of opposite squares have equal length and are perpendicular. Proved neatly with complex numbers — each center is a $90^\circ$-rotation average of its side's endpoints.`,
          example: String.raw`For a square, the four erected-square centers form a larger square, and the two connecting segments are its diagonals — equal and perpendicular, as promised.`,
          keywords: ["van aubel", "squares on sides", "equal perpendicular segments", "quadrilateral squares"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        }
      ]
    },
    {
      title: "Coordinate & Grid Geometry",
      formulas: [
        {
          id: "distance-midpoint",
          name: "Distance, Midpoint, Slope",
          latex: String.raw`d = \sqrt{(\Delta x)^2 + (\Delta y)^2}, \quad M = \left(\frac{x_1+x_2}{2}, \frac{y_1+y_2}{2}\right), \quad m = \frac{\Delta y}{\Delta x}`,
          description: String.raw`Perpendicular lines have slopes multiplying to $-1$. The point dividing $P_1P_2$ in ratio $k:1$ is $\frac{P_1 + kP_2}{1+k}$ (section formula).`,
          keywords: ["distance formula", "midpoint", "slope", "perpendicular", "section formula"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "angle-between-lines",
          name: "Angle Between Two Lines",
          latex: String.raw`\tan\theta = \left| \frac{m_1 - m_2}{1 + m_1 m_2} \right|`,
          description: String.raw`The acute angle between lines of slopes $m_1, m_2$ — the tangent subtraction formula in coordinate clothing (each slope is the tangent of the line's inclination). The denominator vanishing recovers perpendicularity ($m_1 m_2 = -1$ makes the angle $90^\circ$).`,
          keywords: ["angle between lines", "slopes", "tangent difference", "acute angle", "inclination"],
          importance: "medium",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "reflection-coordinates",
          name: "Reflecting a Point over a Line",
          latex: String.raw`P' = P - \frac{2(ax_0 + by_0 + c)}{a^2 + b^2}\,(a, b)`,
          description: String.raw`Reflection of $(x_0, y_0)$ over $ax + by + c = 0$: step twice the signed distance along the normal. Instant special cases: over the $x$-axis $(x, -y)$; over $y = x$ swap to $(y, x)$; over $y = -x$ to $(-y, -x)$; over a vertical line $x = k$ to $(2k - x, y)$.`,
          keywords: ["reflect point", "reflection over line", "mirror image", "over y equals x", "normal direction"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "shoelace-formula",
          name: "Shoelace Formula",
          latex: String.raw`A = \frac{1}{2} \left| \sum_{i=1}^{n} (x_i y_{i+1} - y_i x_{i+1}) \right|`,
          description: String.raw`Area of any simple polygon from its vertices in order (indices mod $n$). Cross-multiply down one way, subtract the other, halve the absolute value.`,
          example: String.raw`Triangle $(1,1), (4,2), (2,5)$: $\;A = \frac{1}{2}|(1{\cdot}2 - 1{\cdot}4) + (4{\cdot}5 - 2{\cdot}2) + (2{\cdot}1 - 5{\cdot}1)| = \frac{1}{2}|-2 + 16 - 3| = \frac{11}{2}$.`,
          keywords: ["polygon area", "vertices", "coordinates", "shoelace", "surveyor"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "picks-theorem",
          name: "Pick's Theorem",
          latex: String.raw`A = I + \frac{B}{2} - 1`,
          description: String.raw`Area of a lattice polygon: $I$ interior lattice points, $B$ boundary lattice points. A segment between lattice points $(0,0)$ and $(a,b)$ passes through $\gcd(a,b) - 1$ interior lattice points.`,
          example: String.raw`The triangle below has $I = 3$ interior points and $B = 8$ boundary points, so $A = 3 + \frac{8}{2} - 1 = 6$ — matching $\frac{1}{2} \cdot 4 \cdot 3$.`,
          diagram: String.raw`<svg viewBox="0 0 380 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Lattice triangle with boundary and interior points marked for Pick's Theorem">
  <g fill="var(--border-light)">
    <circle cx="40" cy="260" r="2.5"/><circle cx="85" cy="260" r="2.5"/><circle cx="130" cy="260" r="2.5"/><circle cx="175" cy="260" r="2.5"/><circle cx="220" cy="260" r="2.5"/><circle cx="265" cy="260" r="2.5"/><circle cx="310" cy="260" r="2.5"/>
    <circle cx="40" cy="215" r="2.5"/><circle cx="85" cy="215" r="2.5"/><circle cx="130" cy="215" r="2.5"/><circle cx="175" cy="215" r="2.5"/><circle cx="220" cy="215" r="2.5"/><circle cx="265" cy="215" r="2.5"/><circle cx="310" cy="215" r="2.5"/>
    <circle cx="40" cy="170" r="2.5"/><circle cx="85" cy="170" r="2.5"/><circle cx="130" cy="170" r="2.5"/><circle cx="175" cy="170" r="2.5"/><circle cx="220" cy="170" r="2.5"/><circle cx="265" cy="170" r="2.5"/><circle cx="310" cy="170" r="2.5"/>
    <circle cx="40" cy="125" r="2.5"/><circle cx="85" cy="125" r="2.5"/><circle cx="130" cy="125" r="2.5"/><circle cx="175" cy="125" r="2.5"/><circle cx="220" cy="125" r="2.5"/><circle cx="265" cy="125" r="2.5"/><circle cx="310" cy="125" r="2.5"/>
    <circle cx="40" cy="80" r="2.5"/><circle cx="85" cy="80" r="2.5"/><circle cx="130" cy="80" r="2.5"/><circle cx="175" cy="80" r="2.5"/><circle cx="220" cy="80" r="2.5"/><circle cx="265" cy="80" r="2.5"/><circle cx="310" cy="80" r="2.5"/>
  </g>
  <polygon points="40,260 220,260 40,125" fill="rgba(91,140,255,0.10)" stroke="var(--accent)" stroke-width="2"/>
  <g fill="var(--gold)">
    <circle cx="40" cy="260" r="5"/><circle cx="85" cy="260" r="5"/><circle cx="130" cy="260" r="5"/><circle cx="175" cy="260" r="5"/><circle cx="220" cy="260" r="5"/>
    <circle cx="40" cy="215" r="5"/><circle cx="40" cy="170" r="5"/><circle cx="40" cy="125" r="5"/>
  </g>
  <g fill="var(--accent)">
    <circle cx="85" cy="215" r="5"/><circle cx="130" cy="215" r="5"/><circle cx="85" cy="170" r="5"/>
  </g>
  <text x="46" y="292" fill="var(--gold)" font-size="13">B = 8 boundary</text>
  <text x="190" y="292" fill="var(--accent)" font-size="13">I = 3 interior</text>
</svg>`,
          keywords: ["lattice points", "grid", "interior", "boundary", "gcd"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "point-line-distance",
          name: "Point-to-Line Distance",
          latex: String.raw`d = \frac{|Ax_0 + By_0 + C|}{\sqrt{A^2 + B^2}}`,
          description: String.raw`Distance from $(x_0, y_0)$ to the line $Ax + By + C = 0$.`,
          example: String.raw`Distance from $(3, 1)$ to $3x + 4y - 25 = 0$: $\frac{|9 + 4 - 25|}{5} = \frac{12}{5}$.`,
          keywords: ["distance to line", "perpendicular distance", "foot"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "circle-equation",
          name: "Equation of a Circle",
          latex: String.raw`(x - h)^2 + (y - k)^2 = r^2`,
          description: String.raw`Center $(h, k)$, radius $r$. Complete the square on $x^2 + y^2 + Dx + Ey + F = 0$ to read off center $\left(-\frac{D}{2}, -\frac{E}{2}\right)$.`,
          keywords: ["circle equation", "center radius", "complete the square"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "british-flag-theorem",
          name: "British Flag Theorem",
          latex: String.raw`PA^2 + PC^2 = PB^2 + PD^2`,
          description: String.raw`For any point $P$ and rectangle $ABCD$: the sums of squared distances to opposite corners are equal. Holds even if $P$ is outside the rectangle or off its plane.`,
          example: String.raw`If $PA = 3$, $PB = 4$, $PC = 5$ for a rectangle $ABCD$, then $PD^2 = 9 + 25 - 16 = 18$, so $PD = 3\sqrt{2}$ — no coordinates needed.`,
          keywords: ["rectangle", "distances to corners", "squares", "any point"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "rotation-90",
          name: "Rotating a Point",
          latex: String.raw`(x, y) \xrightarrow{90^\circ \text{ ccw}} (-y, x), \qquad (x,y) \xrightarrow{\theta} (x\cos\theta - y\sin\theta,\; x\sin\theta + y\cos\theta)`,
          description: String.raw`Rotation about the origin. For rotation about another point, translate that point to the origin first. Complex-number form: multiply by $e^{i\theta}$.`,
          keywords: ["rotation", "transformation", "90 degrees", "counterclockwise"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "conic-sections",
          name: "Conic Sections: Standard Forms",
          latex: String.raw`\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1 \;\; (c^2 = a^2 - b^2), \qquad \frac{x^2}{a^2} - \frac{y^2}{b^2} = 1 \;\; (c^2 = a^2 + b^2), \qquad x^2 = 4py`,
          description: String.raw`Ellipse: distances to the two foci $(\pm c, 0)$ sum to $2a$, and the area is $\pi ab$. Hyperbola: the distances differ by $2a$, with asymptotes $y = \pm\frac{b}{a}x$. Parabola $x^2 = 4py$: each point is equidistant from the focus $(0, p)$ and the directrix $y = -p$.`,
          example: String.raw`(2024 AIME I #9) Rhombus $ABCD$ has its diagonals crossing at the origin and all four vertices on $\frac{x^2}{20} - \frac{y^2}{24} = 1$. Parametrizing perpendicular diagonal directions and using the hyperbola equation shows $BD^2$ can get arbitrarily close to — but never reach — $480$: the answer to "the largest number less than $BD^2$ for all such rhombi."`,
          keywords: ["ellipse", "hyperbola", "parabola", "focus", "directrix", "asymptotes", "foci"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "incenter-coordinates",
          name: "Center Coordinates as Weighted Averages",
          latex: String.raw`G = \frac{A + B + C}{3}, \qquad I = \frac{aA + bB + cC}{a + b + c}`,
          description: String.raw`The centroid averages the vertices; the incenter is the side-length-weighted average (barycentric coordinates $a : b : c$). A point with masses $m_A, m_B, m_C$ sits at $\frac{m_AA + m_BB + m_CC}{m_A+m_B+m_C}$ — mass points and coordinates unified. The $A$-excenter swaps one sign: $\frac{-aA + bB + cC}{-a+b+c}$.`,
          example: String.raw`Right triangle $C=(0,0)$, $B=(4,0)$, $A=(0,3)$ with $a = 4$, $b = 3$, $c = 5$: $I = \frac{4(0,3) + 3(4,0) + 5(0,0)}{12} = (1, 1)$ — matching inradius $1$ at distance $1$ from both legs. ✓`,
          keywords: ["incenter coordinates", "barycentric", "weighted average", "centroid average", "excenter coordinates"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        }
      ]
    },
    {
      title: "Solid Geometry (3D)",
      formulas: [
        {
          id: "eulers-polyhedron-formula",
          name: "Euler's Polyhedron Formula",
          latex: String.raw`V - E + F = 2`,
          description: String.raw`For any convex polyhedron: vertices minus edges plus faces equals 2. Also holds for connected planar graphs.`,
          example: String.raw`Cube: $8 - 12 + 6 = 2$. ✓ Soccer ball (truncated icosahedron): $F = 32$ ($12$ pentagons, $20$ hexagons), $E = \frac{12 \cdot 5 + 20 \cdot 6}{2} = 90$, so $V = 2 + 90 - 32 = 60$.`,
          keywords: ["polyhedron", "vertices edges faces", "euler characteristic", "planar graph"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "prism-pyramid-volumes",
          name: "Prism, Pyramid, Cylinder, Cone Volumes",
          latex: String.raw`V_{\text{prism/cyl}} = Bh, \qquad V_{\text{pyramid/cone}} = \frac{1}{3} Bh`,
          description: String.raw`$B$ is the base area. Any "pointed" solid is one-third of the corresponding prism.`,
          keywords: ["volume", "base area", "one third", "cylinder", "cone", "pyramid"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "sphere-formulas",
          name: "Sphere",
          latex: String.raw`SA = 4\pi r^2, \qquad V = \frac{4}{3}\pi r^3`,
          description: String.raw`Surface area and volume of a sphere of radius $r$. Spherical cap of height $h$: volume $\frac{\pi h^2(3r-h)}{3}$, curved (zone) area $2\pi r h$ — strikingly, only the height matters.`,
          keywords: ["sphere", "surface area", "volume", "ball", "spherical cap", "zone"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "cone-formulas",
          name: "Cone Surface Area",
          latex: String.raw`SA = \pi r \ell + \pi r^2, \qquad \ell = \sqrt{r^2 + h^2}`,
          description: String.raw`Lateral area $\pi r \ell$ uses the slant height $\ell$. Unrolled, the lateral surface is a sector of radius $\ell$ and arc length $2\pi r$.`,
          keywords: ["cone", "slant height", "lateral area", "unroll", "sector"],
          importance: "high",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "frustum-volume",
          name: "Volume of a Frustum",
          latex: String.raw`V = \frac{1}{3}h\left(A_1 + A_2 + \sqrt{A_1 A_2}\right)`,
          description: String.raw`A truncated pyramid or cone with parallel base areas $A_1, A_2$ and height $h$ between them.`,
          keywords: ["frustum", "truncated cone", "truncated pyramid"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "space-diagonal",
          name: "Space Diagonal of a Rectangular Prism",
          latex: String.raw`d = \sqrt{\ell^2 + w^2 + h^2}`,
          description: String.raw`3D Pythagorean Theorem. For a cube of side $s$: face diagonal $s\sqrt{2}$, space diagonal $s\sqrt{3}$. From a box's three face diagonals $p, q, r$: $d = \sqrt{\frac{p^2+q^2+r^2}{2}}$.`,
          keywords: ["box", "diagonal", "3d distance", "cube"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "cross-product-area",
          name: "Vector Cross Product: Areas & Volumes",
          latex: String.raw`[\triangle] = \frac{1}{2}\left|\vec{u} \times \vec{v}\right|, \qquad V_{\text{tetrahedron}} = \frac{1}{6}\left|\vec{u} \cdot (\vec{v} \times \vec{w})\right|`,
          description: String.raw`With $\vec{u}, \vec{v}, \vec{w}$ the edge vectors from one vertex. The fastest route to areas and volumes of coordinate-defined triangles and tetrahedra in 3D — the shoelace formula's big sibling.`,
          example: String.raw`Tetrahedron with vertices $O, (1,0,0), (0,2,0), (0,0,3)$: $V = \frac{1}{6}|1 \cdot 2 \cdot 3| = 1$ (the scalar triple product is the determinant of the coordinate matrix).`,
          keywords: ["cross product", "triple product", "3d coordinates", "tetrahedron volume", "determinant"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "de-guas-theorem",
          name: "De Gua's Theorem",
          latex: String.raw`A_0^2 = A_1^2 + A_2^2 + A_3^2`,
          description: String.raw`3D Pythagorean Theorem for a right-corner tetrahedron (like a sliced cube corner): the squared area of the "hypotenuse face" equals the sum of the squared areas of the three right-angle faces.`,
          example: String.raw`Slice the corner of a unit cube through the three neighbors of a vertex: the three right-angle faces each have area $\frac{1}{2}$, so $A_0^2 = 3 \cdot \frac{1}{4}$ and the equilateral cut face has area $\frac{\sqrt{3}}{2}$. ✓`,
          keywords: ["tetrahedron", "right corner", "face areas", "3d pythagorean"],
          importance: "low",
          level: ["AIME"]
        },
        {
          id: "regular-tetrahedron",
          name: "Regular Tetrahedron of Side $s$",
          latex: String.raw`h = \frac{s\sqrt{6}}{3}, \qquad V = \frac{s^3\sqrt{2}}{12}, \qquad SA = s^2\sqrt{3}`,
          description: String.raw`Also worth caching: circumradius $R = \frac{s\sqrt{6}}{4}$, inradius $r = \frac{s\sqrt{6}}{12}$ (so $R = 3r$), and dihedral angle $\arccos\frac{1}{3} \approx 70.5^\circ$. A regular octahedron of side $s$ has volume $\frac{s^3\sqrt{2}}{3}$ — exactly four such tetrahedra.`,
          keywords: ["tetrahedron", "octahedron", "platonic", "volume", "height", "circumradius", "dihedral angle"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "cayley-menger",
          name: "Cayley–Menger Determinant (Volume from Edges)",
          latex: String.raw`288\,V^2 = \begin{vmatrix} 0 & 1 & 1 & 1 & 1 \\ 1 & 0 & a^2 & b^2 & c^2 \\ 1 & a^2 & 0 & d^2 & e^2 \\ 1 & b^2 & d^2 & 0 & f^2 \\ 1 & c^2 & e^2 & f^2 & 0 \end{vmatrix}`,
          description: String.raw`The 3D Heron's Formula: the volume of any tetrahedron from its six edge lengths alone, no coordinates needed. Here $a,b,c$ are the edges from one vertex and $d,e,f$ the opposite edges. (The $2\times2$ Heron analogue $16[\triangle]^2$ is the same determinant one size down.)`,
          keywords: ["cayley menger", "volume from edge lengths", "tetrahedron volume", "3d heron", "determinant", "six edges"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "isosceles-tetrahedron",
          name: "Isosceles (Orthocentric) Tetrahedron",
          latex: String.raw`a^2 = p^2 + q^2,\ \ b^2 = q^2 + r^2,\ \ c^2 = p^2 + r^2, \qquad V = \frac{pqr}{3}`,
          description: String.raw`A tetrahedron whose three pairs of opposite edges are equal ($a, a$; $b, b$; $c, c$) is isosceles. It slots into a rectangular box $p \times q \times r$ as the box's face diagonals, so its volume is $\frac{pqr}{3}$ (the box minus four corner right-tetrahedra). All four faces are congruent acute triangles, and the circumcenter, incenter, and centroid coincide.`,
          example: String.raw`Opposite edge pairs $\sqrt{13},\, 5,\, \sqrt{20}$: solve $p^2+q^2=13$, $q^2+r^2=25$, $p^2+r^2=20$ to get $p,q,r = 2,3,4$, so $V = \frac{2 \cdot 3 \cdot 4}{3} = 8$.`,
          keywords: ["isosceles tetrahedron", "orthocentric tetrahedron", "opposite edges equal", "box embedding", "congruent faces", "disphenoid"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "tetrahedron-centroid",
          name: "Tetrahedron Centroid & Medians",
          latex: String.raw`G = \frac{A + B + C + D}{4}, \qquad AG : GM_A = 3 : 1`,
          description: String.raw`The centroid is the average of the four vertices. Each median (a vertex to the centroid $M_A$ of the opposite face) passes through $G$, which splits it $3:1$ from the vertex. The three bimedians — segments joining midpoints of opposite edges — also meet at $G$ and bisect each other there.`,
          keywords: ["tetrahedron centroid", "medians", "3 to 1 ratio", "bimedian", "center of mass", "opposite edge midpoints"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "insphere-radius",
          name: "Insphere Radius of a Polyhedron",
          latex: String.raw`V = \frac{1}{3} r S \quad\Longrightarrow\quad r = \frac{3V}{S}`,
          description: String.raw`If a polyhedron has an inscribed sphere (or a point equidistant from all faces), connecting that point to every face cuts the solid into pyramids of height $r$, so the volume is $\frac{1}{3} r \cdot (\text{total surface area})$ — the 3D analogue of $A = rs$.`,
          example: String.raw`(2024 AIME I #14) A tetrahedron with $AB = CD = \sqrt{41}$, $AC = BD = \sqrt{80}$, $BC = AD = \sqrt{89}$ embeds in a $4 \times 5 \times 8$ box, giving $V = \frac{160}{3}$; each congruent face has area $6\sqrt{21}$, so $r = \frac{3V}{S} = \frac{160}{24\sqrt{21}} = \frac{20\sqrt{21}}{63}$, and $20 + 21 + 63 = 104$.`,
          keywords: ["inscribed sphere", "insphere", "3v over s", "distance to faces", "isosceles tetrahedron"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "point-plane-distance",
          name: "Point-to-Plane Distance",
          latex: String.raw`d = \frac{|ax_0 + by_0 + cz_0 + d_0|}{\sqrt{a^2 + b^2 + c^2}}`,
          description: String.raw`Distance from $(x_0, y_0, z_0)$ to the plane $ax + by + cz + d_0 = 0$ — the 3D twin of point-to-line distance, with $(a, b, c)$ the plane's normal vector. Find a plane through three points via the cross product of two edge vectors (that cross product is the normal).`,
          example: String.raw`Distance from the origin to the plane $2x + 3y + 6z = 21$: $\frac{|{-21}|}{\sqrt{4+9+36}} = \frac{21}{7} = 3$.`,
          keywords: ["distance to plane", "normal vector", "3d distance", "plane equation"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "skew-lines-distance",
          name: "Distance Between Skew Lines",
          latex: String.raw`d = \frac{\left| (P_2 - P_1) \cdot (\vec{d_1} \times \vec{d_2}) \right|}{\left| \vec{d_1} \times \vec{d_2} \right|}`,
          description: String.raw`For lines through $P_1, P_2$ with direction vectors $\vec{d_1}, \vec{d_2}$: project the connecting vector onto the common perpendicular direction $\vec{d_1} \times \vec{d_2}$. Equivalent slick route: the distance equals $\frac{3V}{[\,\cdot\,]}$ using a tetrahedron with one edge on each line.`,
          keywords: ["skew lines", "common perpendicular", "cross product distance", "3d lines"],
          importance: "low",
          level: ["AIME"]
        },
        {
          id: "solid-tactics",
          name: "The 3D Playbook",
          type: "method",
          latex: String.raw`\text{coordinatize} \;\to\; \text{slice} \;\to\; \text{unfold} \;\to\; \text{recount the volume}`,
          description: String.raw`The four standard attacks on 3D problems: (1) coordinatize with right angles at the origin — boxes, cubes, and right pyramids become vector arithmetic; (2) slice through the axis or plane of symmetry — tangency and inscribed-solid problems collapse to 2D; (3) unfold surfaces flat — shortest paths on boxes and cones become straight segments; (4) compute the volume two ways with different bases — the second reading extracts an inaccessible height or distance via $h = \frac{3V}{A}$.`,
          keywords: ["3d tactics", "coordinatize", "slice symmetry", "unfold surface", "volume two ways", "method"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Ratios & Constants to Memorize",
      formulas: [
        {
          id: "equilateral-triangle-facts",
          name: "Equilateral Triangle of Side $s$",
          latex: String.raw`h = \frac{s\sqrt{3}}{2}, \quad A = \frac{s^2\sqrt{3}}{4}, \quad R = \frac{s\sqrt{3}}{3}, \quad r = \frac{s\sqrt{3}}{6}`,
          description: String.raw`Height, area, circumradius, inradius. Note $R = 2r$, the extreme case of Euler's inequality.`,
          keywords: ["equilateral", "height", "area", "circumradius", "inradius", "inscribed in circle"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "regular-hexagon-area",
          name: "Regular Hexagon of Side $s$",
          latex: String.raw`A = \frac{3s^2\sqrt{3}}{2}`,
          description: String.raw`Exactly six equilateral triangles. Long diagonal $= 2s$, short diagonal $= s\sqrt{3}$.`,
          keywords: ["hexagon", "six equilateral triangles", "diagonals"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "15-75-90-triangle",
          name: "15-75-90 Triangle Ratio",
          latex: String.raw`(\sqrt{6}-\sqrt{2}) : (\sqrt{6}+\sqrt{2}) : 4`,
          description: String.raw`Side ratios opposite $15^\circ$, $75^\circ$, $90^\circ$. Comes from $\sin 15^\circ = \frac{\sqrt{6}-\sqrt{2}}{4}$.`,
          keywords: ["15 degrees", "75 degrees", "side ratio", "sin 15"],
          importance: "low",
          level: ["AMC12", "AIME"]
        },
        {
          id: "golden-ratio-pentagon",
          name: "Golden Ratio & the Regular Pentagon",
          latex: String.raw`\varphi = \frac{1+\sqrt{5}}{2}, \qquad \frac{\text{diagonal}}{\text{side}} = \varphi`,
          description: String.raw`$\varphi^2 = \varphi + 1$. Also $\cos 36^\circ = \frac{\varphi}{2} = \frac{1+\sqrt{5}}{4} \cdot 2$ and 36-72-72 triangles decompose self-similarly.`,
          keywords: ["golden ratio", "pentagon", "diagonal", "36 degrees", "phi"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "inscribed-square",
          name: "Square Inscribed in a Triangle",
          latex: String.raw`x = \frac{ah}{a + h}`,
          description: String.raw`Side of the square sitting on the base $a$ of a triangle with height $h$ to that base. Proof: the small triangle above the square is similar to the whole, $\frac{h - x}{h} = \frac{x}{a}$.`,
          example: String.raw`Base $6$, height $3$: $x = \frac{18}{9} = 2$. If the triangle is right with legs on the axes, the same similar-triangles setup handles a square in the corner.`,
          keywords: ["square in triangle", "inscribed square", "similar triangles"],
          importance: "low",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "isoperimetric-facts",
          name: "Maximization Facts (Isoperimetric Family)",
          latex: String.raw`\text{fixed perimeter} \Rightarrow \text{square} \ge \text{rectangles}, \;\; \text{equilateral} \ge \text{triangles}, \;\; \text{circle} \ge \text{everything}`,
          description: String.raw`For a fixed perimeter, area is maximized by the most symmetric shape: the square among rectangles ($xy \le \left(\frac{x+y}{2}\right)^2$), the equilateral among triangles (by AM-GM on Heron), the regular $n$-gon among $n$-gons, and the circle overall. For fixed side lengths, the cyclic polygon maximizes area (Bretschneider's term).`,
          keywords: ["maximize area", "fixed perimeter", "isoperimetric", "square best rectangle", "regular maximizes"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        }
      ]
    },
    {
      title: "Problem-Solving Methods",
      formulas: [
        {
          id: "angle-chasing",
          name: "Angle Chasing",
          type: "method",
          latex: String.raw`\text{label an unknown angle } \theta \text{, then propagate: } \triangle\text{-sum } 180^\circ, \text{ isosceles pairs, parallels, cyclic quads}`,
          description: String.raw`The default first attack on any figure. Assign $\theta$ to one unknown angle and push it through the four propagators — triangle sums, base angles of isosceles triangles (equal sides $\Rightarrow$ equal angles), parallel-line angle pairs, and inscribed-angle/cyclic-quad relations — until the target angle is expressed in $\theta$ and solved.`,
          keywords: ["angle chasing", "label angles", "theta", "propagate", "first attack", "base angles", "method"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "mass-points",
          name: "Mass Points",
          type: "method",
          latex: String.raw`m_B \cdot BD = m_C \cdot DC, \qquad m_D = m_B + m_C`,
          description: String.raw`Balance the triangle like a seesaw: assign masses inversely proportional to the segments a cevian creates; the cevian intersection ratios then read off directly ($AP : PD = m_D : m_A$). The fastest tool for "cevians divide the sides in given ratios, find a ratio" problems.`,
          example: String.raw`$BD : DC = 2 : 1$ and $AF : FB = 1 : 1$. Put $m_B = 1, m_C = 2$ (so $m_D = 3$), and $m_A = m_B = 1$. On cevian $AD$: $AP : PD = m_D : m_A = 3 : 1$.`,
          keywords: ["mass points", "cevian ratios", "balance", "method", "lever"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "reflection-shortest-path",
          name: "Reflection for Shortest Paths",
          type: "method",
          latex: String.raw`\min_{P \in \ell}\, (AP + PB) = A'B, \quad A' = \text{reflection of } A \text{ over } \ell`,
          description: String.raw`To minimize a broken path touching a line (or several), reflect an endpoint across the line and measure straight. Bounce problems (billiards, light rays, ant-on-a-box) unfold the same way — reflect the room instead of bending the path.`,
          example: String.raw`$A = (0, 3)$, $B = (6, 1)$, $P$ on the $x$-axis: reflect $A$ to $(0, -3)$; the minimum of $AP + PB$ is $\sqrt{6^2 + 4^2} = \sqrt{52} = 2\sqrt{13}$, achieved where segment $A'B$ crosses the axis.`,
          keywords: ["reflection", "shortest path", "minimize distance", "billiard", "unfold", "method"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "rotation-trick",
          name: "The Rotation Trick (Distances from a Special Point)",
          type: "method",
          latex: String.raw`\text{rotate } 60^\circ \text{ (equilateral) or } 90^\circ \text{ (square) about a vertex}`,
          description: String.raw`Given the distances from an interior point to the vertices of an equilateral triangle or square, rotate the figure about a vertex: one distance carries to a new position, creating an equilateral (or isosceles right) triangle from two of the distances — and a triangle whose sides are all three known lengths.`,
          example: String.raw`$P$ inside equilateral $\triangle ABC$ with $PA = 3, PB = 4, PC = 5$: rotating $60^\circ$ about $B$ produces a $3$-$4$-$5$ right triangle plus an equilateral one, revealing $\angle APB = 150^\circ$ — from which the side and area of $ABC$ follow.`,
          keywords: ["rotation", "point inside square", "point inside equilateral", "distances to vertices", "method"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "spiral-similarity",
          name: "Spiral Similarity",
          type: "method",
          latex: String.raw`AB \mapsto CD: \text{ center } X = \text{second intersection of } \odot(APC),\, \odot(BPD)`,
          description: String.raw`A rotation-plus-scaling carrying one segment to another. Its center lies on both circles through matched endpoint pairs (where $P = AC \cap BD$ or $AB \cap CD$). Explains "two circles + two lines" AIME configurations and computes cleanly with complex numbers: $z \mapsto a + k e^{i\theta}(z - a)$.`,
          example: String.raw`If $\frac{XA}{XC} = \frac{XB}{XD}$ and $\angle AXB = \angle CXD$, then $\triangle XAB \sim \triangle XCD$ — spotting this similar-triangle pair around a common vertex is the practical form of the method.`,
          keywords: ["spiral similarity", "rotation scaling", "similar triangles common vertex", "complex numbers", "method"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "tangency-condition",
          name: "Unique Solution ⟹ Tangency",
          type: "method",
          latex: String.raw`\text{distance(center, line)} = r \qquad\text{or}\qquad \Delta = 0`,
          description: String.raw`When a system "has exactly one solution" and its pieces are a circle and a line (or two circles, or a curve and a line), uniqueness means tangency: set the distance from the center to the line equal to the radius, or set the discriminant of the combined equation to zero, and solve for the parameter.`,
          example: String.raw`(2025 AIME I #8) $|25 + 20i - z| = 5$ is a circle at $(25, 20)$; $|z - 4 - k| = |z - 3i - k|$ is the perpendicular bisector of two points depending on $k$. Exactly one solution forces the line tangent: distance $= \frac{|8k - 73|}{10} = 5$, so $k = \frac{123}{8}$ or $\frac{23}{8}$, summing to $\frac{73}{4}$ — answer $77$.`,
          keywords: ["tangent", "unique solution", "discriminant zero", "distance equals radius", "exactly one intersection", "method"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "cross-section-method",
          name: "3D Tangency via Cross-Sections",
          type: "method",
          latex: String.raw`\text{slice through the axis of symmetry} \implies \text{2D circles and lines}`,
          description: String.raw`Spheres, cylinders, cones, and tori that are tangent to each other become tangent circles and lines in the plane through their common axis of symmetry. Solve the 2D picture (center distances = sums/differences of radii, similar triangles), then rotate back.`,
          example: String.raw`(2024 AIME II #8) A torus (tube radius $3$, center-circle radius $6$) rests inside a sphere of radius $11$: in the axial cross-section the tube center sits at distance $11 - 3 = 8$ from the sphere's center, so by similar triangles the tangency circle has radius $6 \cdot \frac{11}{8} = \frac{33}{4}$; resting outside gives $6 \cdot \frac{11}{14} = \frac{33}{7}$. The difference is $\frac{99}{28}$, answer $127$.`,
          keywords: ["cross section", "torus", "sphere tangent", "axial slice", "3d to 2d", "method"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "circle-inversion",
          name: "Circle Inversion",
          type: "method",
          latex: String.raw`P \mapsto P' \text{ on ray } OP \text{ with } OP \cdot OP' = R^2`,
          description: String.raw`Inversion about a circle centered at $O$: lines through $O$ stay put; lines missing $O$ become circles through $O$ (and vice versa); circles missing $O$ map to circles; tangency is preserved. Invert at a point common to many circles and the tangled configuration untangles into lines. Distances transform by $P'Q' = \frac{R^2 \cdot PQ}{OP \cdot OQ}$.`,
          example: String.raw`Two circles tangent at $O$ plus a chain of circles tangent to both: inverting at $O$ sends the two circles to parallel lines, and the chain becomes equal circles stacked between them — the Steiner-chain picture that instantly resolves "chain of tangent circles" problems.`,
          keywords: ["inversion", "invert at tangency", "circles to lines", "tangent chains", "method"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "homothety-monge",
          name: "Homothety & Monge's Theorem",
          type: "method",
          latex: String.raw`X \mapsto P + k(X - P); \qquad \text{three external similitude centers are collinear}`,
          description: String.raw`A homothety (dilation) about $P$ with ratio $k$ scales every figure by $k$ and maps each circle to a circle; two circles always admit an external (and usually internal) center of similitude where their common tangents cross. Monge: for three circles, the three external centers are collinear. Homothety centered at a tangency point is the standard move for tangent-circle configurations.`,
          example: String.raw`Circles of radii $2$ and $6$ with centers $8$ apart: the external similitude center sits on the center line at distance $4$ before the small center (dividing externally in ratio $2:6$), and both external tangents pass through it.`,
          keywords: ["homothety", "dilation", "similitude center", "monge", "external tangents", "method"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "ravi-substitution",
          name: "Ravi Substitution",
          type: "method",
          latex: String.raw`a = y + z, \quad b = z + x, \quad c = x + y \qquad (x, y, z > 0)`,
          description: String.raw`Sides of a triangle are exactly the numbers expressible this way — $x, y, z$ are the incircle tangent lengths ($x = s - a$, etc.). The substitution turns the triangle inequality into mere positivity, and simplifies Heron to $A = \sqrt{xyz(x+y+z)}$ — ideal for triangle inequalities and integer-sided triangle counts.`,
          example: String.raw`Counting triangles with perimeter $12$: $x + y + z = 6$ with $x, y, z > 0$ (integers or half-integers of matching parity) — for integer sides, count positive integer solutions up to symmetry: $(1,1,4), (1,2,3), (2,2,2)$ give sides $(5,5,2), (4,5,3), (4,4,4)$: exactly $3$ triangles.`,
          keywords: ["ravi", "tangent length substitution", "triangle inequality free", "heron simplified", "method"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        }
      ]
    }
  ]
});
