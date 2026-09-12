// Geometry formulas and theorems.
// latex/description/example strings use String.raw so LaTeX backslashes need no escaping.
// Optional fields: example (KaTeX-rendered prose, shown behind a toggle), diagram (inline SVG).
window.MATH_SECTIONS = window.MATH_SECTIONS || [];

window.MATH_SECTIONS.push({
  id: "geometry",
  group: "formulas",
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
          name: "Special Right Triangles",
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
          keywords: ["geometric mean", "altitude to hypotenuse", "similar triangles", "right triangle split"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "median-to-hypotenuse",
          name: "Median to the Hypotenuse",
          latex: String.raw`\text{right }\triangle:\quad m_{\text{hyp}} = \tfrac12\,\text{hyp} = R`,
          description: String.raw`In a right triangle the median from the right angle to the hypotenuse is exactly half the hypotenuse. Equivalently, the midpoint of the hypotenuse is equidistant from all three vertices — it is the circumcenter, the hypotenuse is a diameter of the circumcircle, and $R = \tfrac{c}{2}$ (Thales). The converse holds too: if a triangle's median to a side equals half that side, the angle opposite is right.`,
          keywords: ["median to hypotenuse", "half the hypotenuse", "right triangle median", "midpoint of hypotenuse equidistant", "circumcenter is hypotenuse midpoint", "hypotenuse is a diameter", "thales", "R = c/2", "converse right angle"],
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
          id: "integer-triangles-perimeter",
          name: "Counting Integer-Sided Triangles by Perimeter",
          latex: String.raw`\#\{a\le b\le c,\ a+b+c=n,\ a+b>c\} = \begin{cases}\operatorname{round}\!\left(\dfrac{n^2}{48}\right) & n\text{ even}\\[4pt] \operatorname{round}\!\left(\dfrac{(n+3)^2}{48}\right) & n\text{ odd}\end{cases}`,
          description: String.raw`The number of noncongruent triangles with positive integer sides and perimeter $n$ (Alcuin's sequence), rounded to the nearest integer. It comes from counting triples $a\le b\le c$ with $a+b+c=n$ subject to the triangle inequality $a+b>c$ (equivalently $c\lt n/2$): fix the longest side $c$, count the valid $(a,b)$, and sum. Requiring all sides distinct or a particular shape adjusts the count the same way.`,
          keywords: ["integer sided triangles", "count triangles", "perimeter", "triangle inequality counting", "alcuin sequence", "how many triangles", "noncongruent triangles"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "similar-figures-ratios",
          name: "Similar Figure Ratios",
          latex: String.raw`\frac{\ell_1}{\ell_2} = k, \qquad \frac{A_1}{A_2} = k^2, \qquad \frac{V_1}{V_2} = k^3`,
          description: String.raw`If two figures are similar with length ratio $k$, areas scale by $k^2$ and volumes by $k^3$. The single most-used fact in AMC geometry.`,
          keywords: ["similarity", "scale factor", "area ratio", "volume ratio", "similar triangles", "length area volume"],
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
          name: "Intercept Theorem",
          latex: String.raw`DE \parallel BC \iff \frac{AD}{DB} = \frac{AE}{EC}`,
          description: String.raw`A line parallel to one side of a triangle cuts the other two sides proportionally — and conversely, equal ratios force parallelism. More generally, three parallel lines cut any two transversals in equal ratios. The midsegment is the special case $AD = DB$.`,
          keywords: ["thales", "basic proportionality", "parallel cuts proportional", "transversals", "similar setup"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "centroid-division",
          name: "Centroid Divides Medians 2:1",
          latex: String.raw`AG : GM = 2 : 1, \qquad G = \frac{A+B+C}{3}`,
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
          id: "clock-angle",
          name: "Clock Angle Formula",
          latex: String.raw`\theta = \left| 30H - 5.5M \right|^\circ`,
          description: String.raw`Angle between the hands at $H$ hours $M$ minutes (take $360^\circ - \theta$ if over $180^\circ$). The minute hand moves $6^\circ$ per minute; the hour hand $0.5^\circ$ per minute.`,
          keywords: ["clock hands", "angle between hands", "time", "angle between clock hands", "hour and minute hand angle", "clock hands problem"],
          importance: "medium",
          level: ["MATHCOUNTS"]
        }
      ]
    },
    {
      title: "Polygons & Quadrilaterals",
      formulas: [
        {
          id: "polygon-angle-sums",
          name: "Polygon Angle Sums",
          latex: String.raw`\text{Interior sum} = 180^\circ(n-2), \quad \text{Exterior sum} = 360^\circ, \quad \#\text{diagonals} = \tfrac{n(n-3)}{2}`,
          description: String.raw`For an $n$-gon. Each interior angle of a regular $n$-gon is $\frac{180^\circ(n-2)}{n}$; each exterior angle is $\frac{360^\circ}{n}$. It also has $\frac{n(n-3)}{2}$ diagonals — each vertex joins the $n-3$ non-adjacent vertices, halved to undo double-counting.`,
          keywords: ["interior angles", "exterior angles", "regular polygon", "n-gon", "number of diagonals", "diagonals"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "regular-polygon-area",
          name: "Regular Polygon Area",
          latex: String.raw`A = \tfrac{1}{2}ap = \tfrac{1}{2}nR^2\sin\tfrac{360^\circ}{n}, \qquad A_{\text{oct}} = 2(1+\sqrt2)\,s^2, \qquad A_{\text{dodec}} = 3R^2`,
          description: String.raw`With apothem $a$, perimeter $p$, side $s$, circumradius $R$, and $n$ sides (so $p = ns$). The octagon's $2(1+\sqrt2)s^2$ and the dodecagon-in-radius-$R$ value of exactly $3R^2$ are the two special cases worth memorizing.`,
          keywords: ["apothem", "perimeter", "regular", "n-gon area", "octagon area", "dodecagon area"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "regular-hexagon-area",
          name: "Regular Hexagon of Side $s$",
          latex: String.raw`A = \frac{3s^2\sqrt{3}}{2}`,
          description: String.raw`Exactly six equilateral triangles, so the area is six times $\frac{s^2\sqrt3}{4}$ and the apothem is $\frac{s\sqrt3}{2}$, which is also the short diagonal halved.`,
          keywords: ["hexagon", "six equilateral triangles", "regular hexagon area", "area of a hexagon", "hexagon apothem"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "hexagon-diagonals",
          name: "Diagonals of a Regular Hexagon",
          latex: String.raw`\text{short} = s\sqrt3, \qquad \text{long} = 2s, \qquad \text{long} : \text{short} : \text{side} = 2 : \sqrt3 : 1`,
          description: String.raw`A regular hexagon of side $s$ has only two diagonal lengths. The long one joins opposite vertices, passes through the center and is a diameter of the circumcircle, so it is $2s$. The short one skips a single vertex and cuts off an isosceles triangle with legs $s$ and apex $120^\circ$, giving $s\sqrt3$. Both follow from the hexagon being six equilateral triangles, and the three lengths $2 : \sqrt3 : 1$ are the sides of the $30$-$60$-$90$ triangle that half a short diagonal creates.`,
          keywords: ["hexagon diagonal", "regular hexagon diagonals", "long diagonal", "short diagonal", "diagonal of a hexagon", "opposite vertices hexagon", "s root 3", "two diagonal lengths"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },,
        {
          id: "regular-dodecagon",
          name: "Regular Dodecagon of Side $s$",
          latex: String.raw`A = 3(2+\sqrt{3})\,s^2 = 6s^2 + 3\sqrt{3}\,s^2, \qquad A = 3R^2 \;\;(\text{circumradius } R)`,
          description: String.raw`The regular 12-gon dissects cleanly into 6 squares and 12 equilateral triangles, all of side $s$: at every $150^\circ$ interior angle a square ($90^\circ$) and a triangle ($60^\circ$) fit exactly, so $A = 6s^2 + 12\cdot\frac{\sqrt{3}}{4}s^2 = 3(2+\sqrt{3})s^2$. Inscribed in a circle of radius $R$ the area is exactly $3R^2$ (from $\tfrac12 nR^2\sin\tfrac{360^\circ}{n}$ with $n=12$), which is what makes dodecagon-in-a-circle problems so clean. Interior angle $150^\circ$; circumradius $R = \tfrac{s}{2}(\sqrt{6}+\sqrt{2})$.`,
          keywords: ["dodecagon", "regular dodecagon", "12-gon", "twelve-gon", "twelve sides", "six squares twelve triangles", "dodecagon area", "3R^2", "dodecagon dissection", "split dodecagon", "150 degrees"],
          importance: "low",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "ngon-vertex-distance-product",
          name: "Product of Distances to n-gon Vertices",
          latex: String.raw`\prod_{k=1}^{n} PV_k = 2R^n\left|\sin\tfrac{n\theta}{2}\right| \;\le\; 2R^n`,
          description: String.raw`Let $P$ lie on the circumcircle (radius $R$) of a regular $n$-gon, at angular position $\theta$ measured from one vertex. Putting the vertices at $R\zeta^k$ with $\zeta = e^{2\pi i/n}$ and using $\prod_k (z - \zeta^k) = z^n - 1$, the product of the distances from $P$ to all $n$ vertices is $R^n\,|z^n - 1| = 2R^n\left|\sin\tfrac{n\theta}{2}\right|$. It therefore reaches its maximum $2R^n$ exactly when $P$ is the midpoint of an arc between two adjacent vertices (there $\tfrac{n\theta}{2}$ is an odd multiple of $\tfrac{\pi}{2}$), and it is $0$ when $P$ is a vertex. This is a different statement from the product of distances between one fixed vertex and the other $n-1$ vertices, which is always $nR^{n-1}$.`,
          keywords: ["product of distances", "regular polygon", "n-gon vertices", "circumcircle", "arc midpoint", "roots of unity", "maximize product", "point on circle", "chord products"],
          importance: "lower",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "trapezoid-parallelogram-areas",
          name: "Quadrilateral Areas",
          latex: String.raw`A_{\text{trapezoid}} = \frac{(b_1+b_2)h}{2}, \quad A_{\text{parallelogram}} = bh, \quad A_{\text{rhomb/kite}} = \frac{d_1 d_2}{2}`,
          description: String.raw`The diagonal formula $\frac{d_1 d_2}{2}$ works for any quadrilateral with perpendicular diagonals.`,
          keywords: ["trapezoid", "parallelogram", "rhombus", "kite", "diagonals", "perpendicular"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "trapezoid-special-segments",
          name: "The Four Mean Segments of a Trapezoid",
          latex: String.raw`\text{midsegment} = \frac{a+b}{2}, \quad \text{through diagonals} = \frac{2ab}{a+b}, \quad \text{similar split} = \sqrt{ab}, \quad \text{equal areas} = \sqrt{\tfrac{a^2+b^2}{2}}`,
          description: String.raw`Four parallel-to-the-bases segments, one per classical mean of the bases $a, b$: the midsegment (arithmetic), the segment through the diagonals' intersection (harmonic), the one splitting the trapezoid into two similar trapezoids (geometric), and the one splitting it into two equal areas (quadratic). They occur in the mean-inequality order HM $\le$ GM $\le$ AM $\le$ QM.`,
          keywords: ["trapezoid segment", "harmonic mean segment", "through diagonal intersection", "parallel to bases", "equal area segment"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "quadrilateral-diagonal-area",
          name: "Quadrilateral Area from Diagonals",
          latex: String.raw`A = \frac{1}{2} d_1 d_2 \sin\theta \;\le\; \frac{1}{2} d_1 d_2 \quad (\text{equality iff } d_1 \perp d_2)`,
          description: String.raw`For any quadrilateral with diagonals $d_1, d_2$ meeting at angle $\theta$. Perpendicular diagonals give the familiar $\frac{1}{2}d_1 d_2$; also $A \le \frac{1}{2} d_1 d_2$ always.`,
          keywords: ["diagonals angle", "quadrilateral area", "sine", "area from diagonals", "half d1 d2 sine", "kite and rhombus area"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "van-aubel",
          name: "Van Aubel's Theorem",
          latex: String.raw`\text{squares on the sides: segments joining opposite centers are equal and } \perp`,
          description: String.raw`Erect a square outward on each side of any quadrilateral (even non-convex): the two segments connecting centers of opposite squares have equal length and are perpendicular. Proved neatly with complex numbers — each center is a $90^\circ$-rotation average of its side's endpoints.`,
          keywords: ["van aubel", "squares on sides", "equal perpendicular segments", "quadrilateral squares"],
          importance: "lower",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "bretschneiders-formula",
          name: "Bretschneider's Formula",
          latex: String.raw`A = \sqrt{(s-a)(s-b)(s-c)(s-d) - abcd \cos^2\left(\frac{A+C}{2}\right)}`,
          description: String.raw`Area of any convex quadrilateral, using opposite angles $A, C$. When cyclic, $A + C = 180^\circ$ kills the last term, recovering Brahmagupta.`,
          keywords: ["general quadrilateral area", "bretschneider", "brahmagupta generalization", "bretschneider formula", "general quadrilateral area", "brahmagupta generalization"],
          importance: "lower",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "euler-quadrilateral",
          name: "Euler's Quadrilateral Theorem",
          latex: String.raw`a^2 + b^2 + c^2 + d^2 = p^2 + q^2 + 4m^2`,
          description: String.raw`For any convex quadrilateral with diagonals $p, q$ and $m$ the distance between the midpoints of the diagonals. $m = 0$ gives the parallelogram law.`,
          keywords: ["parallelogram law", "diagonal midpoints", "generalization", "euler quadrilateral theorem", "diagonals and midpoint segment", "parallelogram law for quadrilaterals"],
          importance: "lowest",
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
          latex: String.raw`A = \frac{1}{2} a b \sin C = 2R^2 \sin A \sin B \sin C`,
          description: String.raw`Two sides and the included angle, maximized when $C = 90^\circ$. The all-angles form $A = 2R^2\sin A\sin B\sin C$ needs no side lengths at all.`,
          keywords: ["sine", "included angle", "SAS", "area", "area of a triangle using sine", "area with sine", "half ab sin C", "2R^2 sin A sin B sin C", "area from angles and circumradius"],
          importance: "low",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "max-rectangle-in-triangle",
          name: "Largest Rectangle in a Triangle",
          latex: String.raw`A_{\text{rectangle}}^{\max} = \tfrac{1}{2}\,[\triangle]`,
          description: String.raw`The largest rectangle inscribed in a triangle with one side on a chosen base has area exactly half the triangle's. Its top edge lies on the midline (half the height), so its width is half that base and its height half the altitude: $\frac{b}{2}\cdot\frac{h}{2}=\frac{bh}{4}=\frac12[\triangle]$. The one-half ratio is the same whichever side you build it on.`,
          keywords: ["inscribed rectangle", "largest rectangle in a triangle", "maximum area rectangle", "half the area", "rectangle in triangle", "midline rectangle", "optimization"],
          importance: "low",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "herons-formula",
          name: "Heron's Formula",
          latex: String.raw`A = \sqrt{s(s-a)(s-b)(s-c)} = \tfrac{1}{4}\sqrt{2a^2b^2 + 2b^2c^2 + 2c^2a^2 - a^4 - b^4 - c^4}`,
          description: String.raw`Area from the three sides alone — the SSS area formula — with semiperimeter $s = \frac{a+b+c}{2}$. Keep the factored form $\sqrt{s(s-a)(s-b)(s-c)}$ rather than expanding; it is the 2D case of the Cayley–Menger determinant.`,
          keywords: ["three sides", "semiperimeter", "SSS", "area", "heron expanded form", "area from sides without semiperimeter", "irrational side lengths", "16 A squared"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "inradius-area",
          name: "Inradius Formula",
          latex: String.raw`A = rs`,
          description: String.raw`The inradius $r$ is the radius of the inscribed circle, the one circle tangent to, touching, all three sides of the triangle, centred at the incentre. Area equals inradius times semiperimeter. Works for any polygon with an inscribed circle (tangential polygon).`,
          keywords: ["inradius", "incircle", "semiperimeter", "inscribed circle", "area"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "incenter-area-split",
          name: "Incenter Splits the Area by the Sides",
          latex: String.raw`[BIC] : [CIA] : [AIB] = a : b : c, \qquad [BIC] = \frac{a}{a+b+c}\,[ABC]`,
          description: String.raw`Join the incenter $I$ to the vertices and $\triangle ABC$ splits into $\triangle BIC,\ \triangle CIA,\ \triangle AIB$, each of height $r$ on its side — so their areas are in ratio $a : b : c$, and each is that side's fraction of the perimeter, $[BIC] = \frac{a}{a+b+c}[ABC]$. Summing them recovers $[ABC] = rs$, and the same weights give the incenter's barycentric coordinates $(a : b : c)$.`,
          keywords: ["incenter area split", "join incenter to vertices", "three triangles proportional to sides", "areas a : b : c", "side fraction of perimeter", "area equals rs", "incenter barycentric a b c", "BIC CIA AIB"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "circumradius-area",
          name: "Circumradius Formula",
          latex: String.raw`A = \frac{abc}{4R}`,
          description: String.raw`The circumradius $R$ is the radius of the circle passing through all three vertices, the corners of the triangle, centred at the circumcentre. Area from the three sides and circumradius $R$. Rearranged: $R = \frac{abc}{4A}$.`,
          keywords: ["circumradius", "circumcircle", "abc", "area"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "right-triangle-inradius",
          name: "Right Triangle Inradius",
          latex: String.raw`r = \frac{a + b - c}{2}, \qquad R = \frac{c}{2}`,
          description: String.raw`For legs $a, b$ and hypotenuse $c$. Also, by Thales, the circumradius of a right triangle is $R = \frac{c}{2}$ (hypotenuse is a diameter).`,
          keywords: ["right triangle", "inradius", "hypotenuse", "Thales", "circumradius"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "incircle-tangent-lengths",
          name: "Incircle Tangent Lengths",
          latex: String.raw`AF = AE = s - a, \qquad BF = BD = s - b, \qquad CD = CE = s - c`,
          description: String.raw`The incircle touches the sides at $D, E, F$; the two tangent segments from each vertex are equal, and their common length is the semiperimeter minus the opposite side. An excircle opposite $A$ gives tangent length $s$ from $A$.`,
          keywords: ["tangent lengths", "incircle touch points", "s minus a", "excircle", "semiperimeter"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "incircle-excircle-touch",
          name: "Incircle & Excircle Touch Points",
          latex: String.raw`\text{on } BC:\ X_{\text{in}} = s - b \text{ from } B,\ \ X_{A} = s - c \text{ from } B,\ \ X_{\text{in}}X_{A} = |b - c|`,
          description: String.raw`On side $BC$ the incircle touches at distance $s - b$ from $B$ (so $s - c$ from $C$), while the $A$-excircle touches at $s - c$ from $B$. The two contact points are therefore mirror images across the midpoint $M$ of $BC$, and the gap between them is $|b - c|$ — so $M$ is exactly the midpoint of the incircle and $A$-excircle touch points. A fast way to place both contact points, and the reason they coincide precisely when $b = c$.`,
          keywords: ["incircle excircle touch points", "symmetric about midpoint of BC", "distance b minus c apart", "contact point s - b", "excircle tangent point s - c", "midpoint of contact points", "touch point reflection"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "shared-angle-area-ratio",
          name: "Shared-Angle Area Ratio (Bird's Head Model)",
          latex: String.raw`\frac{[AXY]}{[ABC]} = \frac{AX \cdot AY}{AB \cdot AC} \qquad \text{whenever } \angle XAY = \angle BAC \;\text{ or }\; \angle XAY = 180^\circ - \angle BAC`,
          description: String.raw`The two triangles need not share the angle at all: it is enough that their angles are equal or supplementary, since $\sin\theta = \sin(180^\circ - \theta)$ leaves the ratio unchanged. That covers four figures: a sub-triangle cut off inside, a point on a side extension, which is the bird's-head shape the name comes from, two triangles at a crossing point with vertical angles, and equal angles sitting anywhere at all. One of the highest-frequency area tools on AMC and AIME.`,
          keywords: ["area ratio", "shared angle", "bird's head model", "birdhead model", "supplementary angle area ratio", "vertical angles area ratio", "equal angles area ratio", "product of fractions", "sub triangle", "two sides"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "same-base-area-ratio",
          name: "Same-Base Area Ratio (Diagonal Split)",
          latex: String.raw`AC \cap BD = P \implies \frac{[ABD]}{[CBD]} = \frac{AP}{PC}`,
          description: String.raw`Two triangles on a common base have areas in the ratio of their apexes' distances to that base. So $\triangle ABD$ and $\triangle CBD$ share base $BD$, and when segment $AC$ crosses $BD$ at $P$, that height ratio is read straight off as $AP : PC$ — giving $\frac{[ABD]}{[CBD]} = \frac{AP}{PC}$. This converts a length ratio along a diagonal into an area ratio and back, and is the engine behind the area method, mass points, and "in what ratio does the diagonal cut it?" questions.`,
          keywords: ["same base area ratio", "triangles common base", "diagonal splits area", "area ratio ap pc", "shared base", "ratio of heights", "diagonals intersection area", "diagonal split"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "exradii",
          name: "Excircles & Exradii",
          latex: String.raw`r_a = \frac{A}{s - a} = s \tan\tfrac{A}{2}, \qquad \frac{1}{r} = \frac{1}{r_a} + \frac{1}{r_b} + \frac{1}{r_c}, \qquad r\, r_a r_b r_c = A^2, \qquad r_a = 4R\sin\tfrac A2\cos\tfrac B2\cos\tfrac C2`,
          description: String.raw`The excircle opposite $A$ touches side $a$ and the extensions of the other two sides; its radius satisfies $A = r_a(s-a)$, mirroring $A = rs$. The tangent length from $A$ to its excircle is exactly $s$. Also $r_a = s\tan\frac{A}{2}$ while $r = (s-a)\tan\frac{A}{2}$, and the three exradii sum to $r_a + r_b + r_c = 4R + r$.`,
          keywords: ["excircle", "exradius", "exradius formula", "exradii", "s minus a", "escribed circle", "tangent length s", "ra", "r_a + r_b + r_c = 4R + r", "sum of exradii"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "triangle-half-angle-identities",
          name: "Triangle Half-Angle, R, r & s Identities",
          latex: String.raw`\sin\tfrac A2\sin\tfrac B2\sin\tfrac C2 = \frac{r}{4R}, \qquad \cos\tfrac A2\cos\tfrac B2\cos\tfrac C2 = \frac{s}{4R}`,
          description: String.raw`The metric identities tying a triangle's angles to its inradius $r$, circumradius $R$, and semiperimeter $s$. The two half-angle products $\sin\frac A2\sin\frac B2\sin\frac C2 = \frac{r}{4R}$ and $\cos\frac A2\cos\frac B2\cos\frac C2 = \frac{s}{4R}$ are the workhorses; from them $\sin A + \sin B + \sin C = \frac sR = 4\cos\frac A2\cos\frac B2\cos\frac C2$, $\cos A + \cos B + \cos C = 1 + \frac rR$. Companions: $[ABC] = 2R^2\sin A\sin B\sin C$, $r_a + r_b + r_c = 4R + r$, and the side-to-angle bridge $\sin\frac A2 = \sqrt{\frac{(s-b)(s-c)}{bc}}$, $\cos\frac A2 = \sqrt{\frac{s(s-a)}{bc}}$. Together they turn any "given $R$, $r$, $s$" configuration into algebra.`,
          keywords: ["half angle triangle", "sin half product r/4R", "cos half product s/4R", "r = 4R sin", "s = 4R cos", "sin A + sin B + sin C = s/R", "cos A + cos B + cos C = 1 + r/R", "area 2R^2 sin", "exradii sum 4R+r", "sin half angle sides", "inradius circumradius identities"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "triangle-sin2-sum-ratio",
          name: "Triangle Sine-Sum Ratio (2r/R)",
          latex: String.raw`\dfrac{\sin 2A+\sin 2B+\sin 2C}{\sin A+\sin B+\sin C} = \dfrac{2r}{R}`,
          description: String.raw`In any triangle this ratio collapses to $\frac{2r}{R}$: the numerator is $\sin 2A+\sin 2B+\sin 2C = 4\sin A\sin B\sin C$ and the denominator is $\sin A+\sin B+\sin C = 4\cos\frac A2\cos\frac B2\cos\frac C2$, so the quotient equals $8\sin\frac A2\sin\frac B2\sin\frac C2 = 8\cdot\frac{r}{4R} = \frac{2r}{R}$.`,
          keywords: ["sin2A sum over sinA sum", "2r/R ratio", "double angle sine sum", "triangle sine sum ratio", "4 sin A sin B sin C"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "half-angle-tangent-identity",
          name: "Half-Angle Tangent Identity",
          latex: String.raw`\tan\tfrac A2\tan\tfrac B2 + \tan\tfrac B2\tan\tfrac C2 + \tan\tfrac C2\tan\tfrac A2 = 1, \qquad \tan\tfrac A2 = \frac{r}{s-a}`,
          description: String.raw`For any triangle the three half-angle tangent products sum to $1$. It follows from $\frac A2+\frac B2+\frac C2 = 90^\circ$, so $\tan\frac{A+B}{2}=\cot\frac C2$; clearing denominators gives the symmetric relation. Since $\tan\frac A2 = \frac{r}{s-a}$, it is a clean way to eliminate angles in $(r,s)$ problems.`,
          keywords: ["half angle tangent identity", "tan half products sum to 1", "sum of tan half angles", "triangle tangent identity", "tan(A/2)tan(B/2)"],
          importance: "low",
          level: ["AIME", "Olympiad"]
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
          keywords: ["law of cosines", "SAS", "SSS", "angle from sides"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "law-cosines-60-120",
          name: "Law of Cosines at 60° and 120°",
          latex: String.raw`C = 60^\circ: \; c^2 = a^2 + b^2 - ab, \qquad C = 120^\circ: \; c^2 = a^2 + b^2 + ab`,
          description: String.raw`The two special cases worth knowing cold — $\cos C = \pm\frac{1}{2}$ makes the cross term $\mp ab$. Triangles with a $60^\circ$ or $120^\circ$ angle and integer sides (like $3, 5, 7$) are AMC/AIME regulars.`,
          keywords: ["60 degrees", "120 degrees", "3 5 7", "eisenstein triple"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "angle-bisector-theorem",
          name: "Angle Bisector Theorem",
          latex: String.raw`\frac{AB}{AC} = \frac{BD}{DC}`,
          description: String.raw`If the bisector from $A$ meets $BC$ at $D$, it splits the opposite side in the ratio of the adjacent sides. The incenter divides that bisector in ratio $AI : ID = (b+c) : a$.`,
          keywords: ["angle bisector", "ratio", "opposite side", "adjacent sides"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "angle-bisector-length",
          name: "Length of an Angle Bisector",
          latex: String.raw`d^2 = ab - mn`,
          description: String.raw`The bisector of angle $C$ has length $d$, where $a, b$ are the two sides meeting at $C$ and $m, n$ are the segments it cuts the opposite side $AB$ into. (Equivalently $d^2 = ab\left[1 - \left(\tfrac{c}{a+b}\right)^2\right]$.)`,
          keywords: ["angle bisector length", "cevian", "segments", "length of an angle bisector", "angle bisector cevian length", "bisector length formula"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "angle-bisector-circumcircle",
          name: "Angle Bisector Extended to the Circumcircle",
          latex: String.raw`AB\cdot AC = AL\cdot AD,\qquad LB\cdot LC = LA\cdot LD,\qquad DB = DC`,
          description: String.raw`Extend the bisector of $\angle A$ until it meets the circumcircle again at $D$. Then $D$ is the midpoint of arc $BC$ not containing $A$, so $DB=DC$ (and $D$ is the center of the circle through $B$, $C$, the incenter, and the $A$-excenter — the incenter–excenter lemma). Two length relations finish most configurations: because $\triangle ABL\sim\triangle ADC$ (the bisected angle at $A$ is shared and $\angle ABL=\angle ADC$ subtend arc $AC$), $AB\cdot AC = AL\cdot AD$, so $AD=\dfrac{bc}{AL}$; and Power of the Point $L$ on chord $BC$ gives $LB\cdot LC = LA\cdot LD$. Pair these with the bisector length $AL=\sqrt{bc\left[1-\left(\tfrac{a}{b+c}\right)^2\right]}$ to recover the whole extended chord.`,
          keywords: ["angle bisector extended", "circumcircle", "arc midpoint", "DB = DC", "power of a point", "bc = AL AD", "incenter excenter", "extended bisector length", "bisector meets circle"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "altitude-bisector-angle",
          name: "Altitude, Bisector & Circumdiameter",
          latex: String.raw`\angle(\text{altitude}, \text{bisector}) = \dfrac{|B - C|}{2}, \qquad \text{$A$-altitude and } AO \text{ are isogonal}`,
          description: String.raw`From a vertex, the altitude and the line to the circumcenter $O$ are reflections across the angle bisector — they are isogonal. So the $A$-bisector bisects the angle between the $A$-altitude and $AO$, and the angle between the altitude and the bisector is exactly $\dfrac{|B - C|}{2}$. It is also why the orthocenter and circumcenter are isogonal conjugates.`,
          keywords: ["altitude and bisector angle", "|B - C| / 2", "altitude circumdiameter isogonal", "altitude AO reflection over bisector", "angle between altitude and angle bisector", "O H isogonal conjugates"],
          importance: "medium",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "stewarts-theorem",
          name: "Stewart's Theorem",
          latex: String.raw`a(d^2 + mn) = b^2 m + c^2 n`,
          description: String.raw`For a cevian, a segment from a vertex to a point on the opposite side, of length $d$ dividing side $a$ into segments $m$ (adjacent to $c$) and $n$ (adjacent to $b$). Mnemonic: "a man and his dad put a bomb in the sink" — $man + dad = bmb + cnc$.`,
          keywords: ["cevian length", "stewart", "man dad bomb sink", "stewarts theorem", "cevian length formula", "a man and his dad put a bomb in the sink"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "cevas-theorem",
          name: "Ceva's Theorem",
          latex: String.raw`\frac{AF}{FB} \cdot \frac{BD}{DC} \cdot \frac{CE}{EA} = 1`,
          description: String.raw`Cevians $AD$, $BE$, $CF$ are concurrent if and only if this product of the three side ratios equals $1$. The trig form uses ratios of the sines of the split angles; with directed ratios it is the sibling of Menelaus, whose product is $-1$ for collinearity instead.`,
          keywords: ["concurrent", "cevians", "product of ratios", "cevas theorem", "cevian concurrency", "trig form of ceva"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "menelaus-theorem",
          name: "Menelaus' Theorem",
          latex: String.raw`\frac{AF}{FB} \cdot \frac{BD}{DC} \cdot \frac{CE}{EA} = -1`,
          description: String.raw`A transversal line meets lines $BC$, $CA$, $AB$ at $D$, $E$, $F$ (using directed segments; use $=1$ with unsigned lengths). The collinearity partner to Ceva.`,
          keywords: ["transversal", "collinear", "directed segments", "menelaus theorem", "transversal ratio product", "collinearity test"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "apollonius-theorem",
          name: "Apollonius's Theorem",
          latex: String.raw`b^2 + c^2 = 2\left(m_a^2 + \left(\frac{a}{2}\right)^2\right), \qquad m_a^2 + m_b^2 + m_c^2 = \frac{3}{4}(a^2 + b^2 + c^2), \qquad m_a = \frac{1}{2}\sqrt{2b^2 + 2c^2 - a^2}`,
          description: String.raw`Stewart's Theorem specialized to the median $m_a$ drawn to side $a$. Equivalently $m_a = \frac{1}{2}\sqrt{2b^2 + 2c^2 - a^2}$.`,
          keywords: ["median length", "apollonius", "stewart special case", "apollonius theorem", "length of a median", "median length formula"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "median-triangle-area",
          name: "Triangle Area from Its Medians",
          latex: String.raw`[ABC] = \frac{4}{3}\,[\text{triangle with sides } m_a, m_b, m_c]`,
          description: String.raw`The three medians of any triangle themselves form a valid triangle, and the original triangle's area is $\frac{4}{3}$ of the median triangle's. So: given three medians, build their triangle, use Heron, scale.`,
          keywords: ["medians form triangle", "area from medians", "four thirds", "triangle formed by the medians", "area of the median triangle", "three quarters area"],
          importance: "low",
          level: ["AMC12", "AIME"]
        },
        {
          id: "rouths-theorem",
          name: "Routh's Theorem",
          latex: String.raw`\frac{[\triangle]}{[ABC]} = \frac{(xyz-1)^2}{(xy+y+1)(yz+z+1)(zx+x+1)}`,
          description: String.raw`Area ratio of the inner triangle formed by three cevians cutting the sides in ratios $x, y, z$. For all ratios $2{:}1$, the inner triangle is $\frac{1}{7}$ of the original.`,
          keywords: ["cevian triangle", "one seventh", "area ratio", "routh"],
          importance: "low",
          level: ["AIME"]
        },
        {
          id: "vivianis-theorem",
          name: "Viviani's Theorem",
          latex: String.raw`d_1 + d_2 + d_3 = h, \qquad a\,d_a + b\,d_b + c\,d_c = 2[ABC]`,
          description: String.raw`For any point inside an equilateral triangle the perpendicular distances to the three sides sum to the altitude, by splitting into three triangles and comparing areas. Two extensions matter more than the statement itself. Counting a distance as negative when $P$ lies beyond that side makes the sum equal $h$ for every point of the plane, not just interior ones. And the same area decomposition on any triangle gives $a\,d_a + b\,d_b + c\,d_c = 2[ABC]$, of which Viviani is the case $a=b=c$.`,
          keywords: ["equilateral", "distances to sides", "constant sum", "altitude", "signed distances", "point outside the triangle", "weighted sum of distances", "viviani general triangle"],
          importance: "low",
          level: ["AMC12", "AIME"]
        },
        {
          id: "trig-ceva",
          name: "Trigonometric Ceva",
          latex: String.raw`\frac{\sin\angle BAD}{\sin\angle DAC} \cdot \frac{\sin\angle CBE}{\sin\angle EBA} \cdot \frac{\sin\angle ACF}{\sin\angle FCB} = 1`,
          description: String.raw`Cevians $AD$, $BE$, $CF$ are concurrent iff the product of the sine ratios of the angles they cut at each vertex equals $1$ — the angle-based twin of Ceva, for problems that specify angles rather than side ratios.`,
          keywords: ["trig ceva", "sine ratios", "concurrent cevians", "angle version"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "erdos-mordell",
          name: "Erdős–Mordell Inequality",
          latex: String.raw`PA + PB + PC \ge 2(d_a + d_b + d_c)`,
          description: String.raw`For any interior point $P$: the distances to the vertices total at least twice the perpendicular distances to the sides, with equality only for the center of an equilateral triangle. A sharp, memorable bound linking the two natural distance triples.`,
          keywords: ["erdos mordell", "interior point", "distance inequality", "vertices versus sides"],
          importance: "lowest",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "ratio-lemma",
          name: "The Ratio Lemma",
          latex: String.raw`\frac{BD}{DC} = \frac{AB}{AC} \cdot \frac{\sin \angle BAD}{\sin \angle DAC}`,
          description: String.raw`For any cevian $AD$: the split of the opposite side is the side ratio times the sine ratio of the split angle. Bisector ($\sin$ ratio $= 1$) gives the Angle Bisector Theorem; median ($BD = DC$) gives the sine relation for medians; applied to all three cevians it proves trig Ceva.`,
          keywords: ["ratio lemma", "cevian split", "sine ratio", "generalized bisector", "generalized angle bisector"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "law-of-tangents",
          name: "Law of Tangents",
          latex: String.raw`\frac{a - b}{a + b} = \frac{\tan\frac{A-B}{2}}{\tan\frac{A+B}{2}}`,
          description: String.raw`Relates the sum and difference of two sides to the half-sum and half-difference of their opposite angles (note $\frac{A+B}{2} = 90^\circ - \frac{C}{2}$). Derived from the law of sines plus sum-to-product. Occasionally the fastest route when a problem gives $a \pm b$ and angle information.`,
          keywords: ["law of tangents", "sum and difference of sides", "half angles", "law of tangents", "tangent rule for triangles", "tangent half angle side rule"],
          importance: "lower",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "napoleons-theorem",
          name: "Napoleon's Theorem",
          latex: String.raw`\text{equilateral triangles on the sides} \Rightarrow \text{their centers form an equilateral triangle}`,
          description: String.raw`Erect equilateral triangles outward (or all inward) on the sides of any triangle: their centers always form an equilateral triangle. The outer Napoleon triangle has area $\frac{\sqrt3}{24}(a^2+b^2+c^2) + \frac{[ABC]}{2}$; outer minus inner area equals $[ABC]$.`,
          keywords: ["napoleon", "equilateral centers", "erected triangles", "outer inner"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "projection-formula",
          name: "Projection Formula",
          latex: String.raw`a = b\cos C + c\cos B, \qquad b = c\cos A + a\cos C, \qquad c = a\cos B + b\cos A`,
          description: String.raw`Each side is the sum of the projections of the other two onto it — drop the altitude from a vertex and read off the two pieces of the opposite side. Cheap and often overlooked, it sits right next to the Law of Cosines (adding the three, or eliminating cosines, recovers it) and instantly relates a side to the adjacent angles.`,
          keywords: ["projection formula", "a = b cos C + c cos B", "side as projections", "foot of altitude", "law of cosines neighbor"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "mollweides-formula",
          name: "Mollweide's Formula",
          latex: String.raw`\frac{a+b}{c} = \frac{\cos\frac{A-B}{2}}{\sin\frac{C}{2}}, \qquad \frac{a-b}{c} = \frac{\sin\frac{A-B}{2}}{\cos\frac{C}{2}}`,
          description: String.raw`A pair of triangle identities using all three sides and all three angles at once — which makes them the standard check on a solved triangle (an error in any part breaks the equation). Dividing the two recovers the Law of Tangents; they follow from the Law of Sines plus sum-to-product.`,
          keywords: ["mollweide formula", "check triangle solution", "a plus b over c", "law of tangents", "all sides and angles"],
          importance: "lowest",
          level: ["Olympiad"]
        },
        {
          id: "morleys-theorem",
          name: "Morley's Trisector Theorem",
          latex: String.raw`\text{adjacent angle-trisectors meet in an equilateral triangle}`,
          description: String.raw`Trisect all three angles of any triangle; the intersection points of adjacent trisectors always form an equilateral triangle — the Morley triangle. A famously surprising result (angle trisection rarely behaves), proved cleanly by working backward from an equilateral triangle with trigonometric angle-chasing. Beautiful, but essentially never a problem-solving tool.`,
          keywords: ["morley theorem", "angle trisectors", "morley triangle", "equilateral from trisectors", "surprising"],
          importance: "lowest",
          level: ["Olympiad"]
        },
        {
          id: "isogonal-conjugate",
          name: "Isogonal Conjugate",
          latex: String.raw`\angle(AP,\text{bis }A) = \angle(\text{bis }A, AP^*) \text{ at each vertex} \;\Rightarrow\; AP^*, BP^*, CP^* \text{ concur at } P^*`,
          description: String.raw`Reflect the cevians $AP, BP, CP$ across the respective angle bisectors; the three reflected lines always concur, at the isogonal conjugate $P^*$. The classic pairs: circumcenter $O \leftrightarrow$ orthocenter $H$, centroid $G \leftrightarrow$ symmedian (Lemoine) point $K$, the incenter is its own conjugate, and the Fermat points $\leftrightarrow$ the isodynamic points. $P$ and $P^*$ share a common pedal circle. This is core machinery for advanced triangle configurations — recognizing an isogonal pair collapses many concurrency/collinearity problems.`,
          keywords: ["isogonal conjugate", "reflect cevian over bisector", "O and H conjugate", "symmedian point", "incenter self conjugate", "isodynamic", "common pedal circle"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "isotomic-conjugate",
          name: "Isotomic Conjugate",
          latex: String.raw`\text{reflect each cevian foot over the side's midpoint} \Rightarrow \text{new cevians concur}`,
          description: String.raw`The isotomic conjugate reflects each cevian's foot on a side over that side's midpoint; the three new cevians concur at $P^*$. The centroid is its own isotomic conjugate, and the Gergonne and Nagel points form an isotomic pair. It pairs with isogonal conjugation to generate the standard "conjugate" identities among triangle centers, and (via barycentrics) has the clean coordinate form $(x:y:z) \mapsto (1/x : 1/y : 1/z)$.`,
          keywords: ["isotomic conjugate", "reflect foot over midpoint", "centroid self conjugate", "gergonne nagel pair", "barycentric reciprocal", "triangle center"],
          importance: "lowest",
          level: ["Olympiad"]
        },
        {
          id: "pedal-triangle",
          name: "Pedal Triangle & Its Area",
          latex: String.raw`[\text{pedal of }P] = \frac{\lvert R^2 - OP^2\rvert}{4R^2}\,[ABC]`,
          description: String.raw`Drop perpendiculars from a point $P$ to the three sides; their feet form the pedal triangle of $P$. Its area is $\frac{|R^2 - OP^2|}{4R^2}[ABC]$, so it collapses to a line exactly when $OP = R$ — $P$ on the circumcircle — which is precisely the Simson line (the degenerate pedal triangle). The pedal triangle of the incenter is the contact triangle, and the general area formula is the unifying statement behind Simson, the medial triangle ($P=O$), and orthocentric pedal facts.`,
          keywords: ["pedal triangle", "feet of perpendiculars", "pedal area formula", "simson line degenerate", "R^2 minus OP^2", "contact triangle", "orthic triangle"],
          importance: "lower",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "orthic-triangle",
          name: "Orthic Triangle",
          latex: String.raw`\text{sides } a\cos A,\, b\cos B,\, c\cos C; \quad \text{perimeter} = a\cos A + b\cos B + c\cos C = \frac{2[ABC]}{R} = 4R\sin A\sin B\sin C; \quad [\text{orthic}] = 2\cos A\cos B\cos C\,[ABC]`,
          description: String.raw`The triangle formed by the three altitude feet, equivalently the pedal triangle of the orthocentre $H$. In an acute triangle its angles are $\pi-2A,\ \pi-2B,\ \pi-2C$, its sides are $a\cos A,\ b\cos B,\ c\cos C$, and $H$ is its incentre, so the altitudes of $ABC$ bisect its angles.`,
          keywords: ["orthic triangle", "feet of altitudes", "pedal of orthocenter", "fagnano problem", "minimum perimeter inscribed triangle", "nine point circle", "antiparallel sides", "H is incenter of orthic", "angles pi - 2A", "orthic perimeter", "a cos A + b cos B + c cos C", "2[ABC]/R", "4R sin A sin B sin C", "orthic area 2 cos A cos B cos C", "reflection of orthocenter on circumcircle"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "medial-triangle",
          name: "Medial Triangle",
          latex: String.raw`\triangle_{\text{med}} \sim \triangle ABC \ \big(\text{ratio } \tfrac12\big), \quad [\triangle_{\text{med}}] = \tfrac14 [ABC], \quad \text{perimeter} = s = \tfrac{a+b+c}{2}`,
          description: String.raw`Joining the side midpoints gives the medial triangle: similar to $ABC$ with ratio $\frac12$ — quarter the area, half the perimeter ($= s$), sides parallel to $ABC$'s — splitting $ABC$ into four congruent triangles. The homothety at the centroid $G$ with ratio $-\frac12$ maps $ABC$ onto it (they share $G$). Its circumcircle is the nine-point circle (so its circumcenter is the nine-point center $N$), its incircle is the Spieker circle, and its orthocenter is the circumcenter $O$ of $ABC$ — so the medial triangle's own Euler-line facts translate straight back into $ABC$'s centers.`,
          keywords: ["medial triangle", "midpoint triangle", "midpoints of sides", "similar ratio one half", "quarter area", "half perimeter", "four congruent triangles", "homothety centroid -1/2", "spieker circle", "spieker point", "nine point circle", "orthocenter is O"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "contact-triangle",
          name: "Contact (Intouch) Triangle",
          latex: String.raw`\text{tangent lengths } s-a,\, s-b,\, s-c; \quad \text{angles } \tfrac{\pi}{2}-\tfrac A2; \quad [\text{contact}] = \frac{r}{2R}\,[ABC]`,
          description: String.raw`The contact (intouch) triangle has the three incircle tangency points as vertices; the tangent length from each vertex of $ABC$ is $s-a, s-b, s-c$. It is inscribed in the incircle (so its circumradius is $r$), its angles are $\frac{\pi}{2}-\frac A2$, and its area is $\frac{r}{2R}[ABC]$. The segments from each vertex of $ABC$ to the opposite contact point concur at the Gergonne point. Its sibling, the extouch triangle (where the excircles touch the sides, with tangent lengths $s-a$ measured the other way), has its cevians concurrent at the Nagel point.`,
          keywords: ["contact triangle", "intouch triangle", "incircle touch points", "tangent lengths s minus a", "gergonne point", "extouch triangle", "nagel point", "inscribed in incircle", "contact triangle area", "angles pi/2 - A/2"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "excentral-triangle",
          name: "Excentral Triangle",
          latex: String.raw`\text{vertices } I_A, I_B, I_C; \quad I = \text{its orthocenter}, \ \triangle ABC = \text{its orthic triangle}; \quad \text{sides } 4R\cos\tfrac A2,\ R_{\text{ex}} = 2R, \ [\text{excentral}] = \frac{2R}{r}[ABC]`,
          description: String.raw`The excentral triangle has the three excenters as vertices. The incenter $I$ of $ABC$ is its orthocenter, and $ABC$ is exactly its orthic triangle (the altitude feet of $I_AI_BI_C$ are $A, B, C$). Its angles are $\frac{\pi}{2}-\frac A2$, its sides are $4R\cos\frac A2, 4R\cos\frac B2, 4R\cos\frac C2$, its circumradius is $2R$, and its area is $\frac{2R}{r}[ABC]$. Best of all, the nine-point circle of the excentral triangle is the circumcircle of $ABC$ — so $A, B, C$ and the arc midpoints all lie on it. Recognizing this collapses a tangle of incenter/excenter conditions into a single orthocentric configuration.`,
          keywords: ["excentral triangle", "three excenters", "incenter is orthocenter", "ABC is orthic triangle", "circumradius 2R", "excenter configuration", "arc midpoints", "excentral sides 4R cos", "excentral area 2R/r"],
          importance: "low",
          level: ["Olympiad"]
        }
      ]
    },
    {
      title: "Triangle Centers & the Euler Line",
      formulas: [
        {
          id: "euler-line-ratio",
          name: "The Euler Line",
          latex: String.raw`HG = 2\,GO, \qquad OH^2 = 9R^2 - (a^2+b^2+c^2) = R^2\left(1 - 8\cos A\cos B\cos C\right)`,
          description: String.raw`The orthocenter $H$, centroid $G$, and circumcenter $O$ are collinear (the Euler line), with the centroid one-third of the way from $O$ to $H$. Also $\vec{OH} = \vec{OA} + \vec{OB} + \vec{OC}$.`,
          keywords: ["orthocenter", "centroid", "circumcenter", "collinear", "euler line", "HG : GO = 2 : 1", "HG = 2 GO", "nine-point center lies on euler line"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "euler-distance-theorem",
          name: "Euler's Distance Formula",
          latex: String.raw`d^2 = R(R - 2r)`,
          description: String.raw`Distance between the circumcenter and incenter. Implies Euler's Inequality $R \ge 2r$, with equality only for equilateral triangles.`,
          keywords: ["circumcenter incenter distance", "euler inequality", "R 2r", "circumcenter to incenter"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "nine-point-circle",
          name: "The Nine-Point Circle",
          latex: String.raw`R_9 = \frac{R}{2}`,
          description: String.raw`Passes through the 3 side midpoints, 3 feet of the altitudes, and 3 midpoints from the orthocenter to each vertex. Its center is the midpoint of segment $OH$ on the Euler line.`,
          keywords: ["nine point", "midpoints", "altitude feet", "half circumradius", "euler line", "nine-point center = midpoint of OH", "radius R/2", "passes through midpoints of AH BH CH"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "carnots-theorem",
          name: "Carnot's Theorem",
          latex: String.raw`d_1 + d_2 + d_3 = R + r`,
          description: String.raw`The signed perpendicular distances from the circumcenter to the three sides sum to $R + r$ (negative if the circumcenter is on the far side of a side, i.e. obtuse triangles).`,
          keywords: ["circumcenter distances", "R plus r", "signed distances", "carnot theorem", "signed distances from circumcenter", "sum of distances to sides"],
          importance: "lower",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "simson-line",
          name: "The Simson Line",
          latex: String.raw`P \in \text{circumcircle} \iff \text{the three perpendicular feet are collinear}`,
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
          keywords: ["brocard point", "cotangent sum", "special angle", "brocard angle", "brocard point", "cotangent of the brocard angle"],
          importance: "lower",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "symmedian-lemoine",
          name: "Symmedians",
          latex: String.raw`\text{symmedian} = \text{median reflected over the bisector}, \qquad BE : EC = c^2 : b^2`,
          description: String.raw`The symmedian from $A$ is the median reflected over the angle bisector at $A$, and reflecting swaps the two adjacent sides, so the median's even split becomes $BE : EC = c^2 : b^2$. Equivalently it is the locus of points whose distances to $AB$ and $AC$ are in ratio $c : b$, where the bisector is the locus of equal distances and the median the locus of ratio $b : c$. Test an unknown cevian by dropping perpendiculars from $B$ and $C$ onto it: equal means median, ratio $c^2 : b^2$ means symmedian.`,
          keywords: ["symmedian", "reflected median", "squares of sides", "isogonal to the median", "distances proportional to sides", "antiparallel", "perpendiculars to a cevian", "BE:EC = c^2:b^2"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "incenter-excenter-lemma",
          name: "Incenter–Excenter Lemma (Fact 5)",
          latex: String.raw`M = \text{arc midpoint of } BC \implies MB = MC = MI = MI_A`,
          description: String.raw`The midpoint $M$ of arc $BC$ (not containing $A$) is equidistant from $B$, $C$, the incenter $I$, and the $A$-excenter $I_A$ — so $B, C, I, I_A$ lie on a circle centered at $M$. Proof: angle chase shows $\angle MBI = \angle MIB = \frac{A+B}{2}$. Also $AI = \frac{r}{\sin(A/2)}$ and $A$, $I$, $M$ are collinear (the bisector passes through the arc midpoint).`,
          keywords: ["incenter excenter", "fact 5", "arc midpoint", "equidistant", "bisector through arc midpoint", "AI = r / sin(A/2)", "distance from incenter to vertex", "B C I I_A concyclic"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "orthocenter-properties",
          name: "Orthocenter Reflections & Distances",
          latex: String.raw`AH = 2R\cos A, \qquad \text{reflections of } H \text{ over } BC \text{ and over } M_{BC} \text{ lie on } \odot(ABC)`,
          description: String.raw`The reflection of the orthocenter over any side lands on the circumcircle (so $\odot(HBC)$ is the mirror image of $\odot(ABC)$, same radius); the reflection over a side's midpoint is the antipode of the opposite vertex. Distances: $AH = 2R\cos A$, and the distance from the circumcenter to side $a$ is $\frac{AH}{2} = R\cos A$.`,
          keywords: ["orthocenter", "reflection over side", "2R cos A", "antipode", "circumcircle image", "distance from circumcenter to side", "R cos A", "AH = 2R cos A", "reflection of H over midpoint is antipode"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "fermat-point",
          name: "Fermat Point (Torricelli Point)",
          latex: String.raw`\text{all angles} < 120^\circ \implies \min_X (XA + XB + XC) \text{ at } X \text{ with } \angle AXB = \angle BXC = \angle CXA = 120^\circ`,
          description: String.raw`The point minimizing the total distance to the vertices sees every side at $120^\circ$; construct it by erecting equilateral triangles outward on the sides and connecting each new vertex to the opposite original vertex (the three lines concur there). If an angle is $\ge 120^\circ$, the minimizer is that vertex. The rotation trick computes the minimal sum: it equals the length of one straight segment after a $60^\circ$ rotation.`,
          keywords: ["fermat point", "torricelli", "minimize distance sum", "120 degrees", "equilateral construction"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "center-distance-formulas",
          name: "Distances Between Triangle Centers",
          latex: String.raw`OH^2 = 9R^2 - (a^2+b^2+c^2), \qquad OG^2 = R^2 - \tfrac{1}{9}(a^2+b^2+c^2), \qquad R^2 - OI^2 = 2Rr`,
          description: String.raw`The Euler-line distances in side/radius terms: $OH$ from the vector identity $\vec{OH} = \vec{OA}+\vec{OB}+\vec{OC}$, and $OG = \frac{OH}{3}$. The last is the power of the incenter with respect to the circumcircle (equivalent to Euler's $OI^2 = R(R-2r)$). Also $OH^2 = R^2(1 - 8\cos A\cos B\cos C)$.`,
          keywords: ["OH distance", "OG distance", "euler line length", "power of incenter", "center distances", "OH^2 = 9R^2 - (a^2+b^2+c^2)", "OH^2 = R^2(1 - 8 cos A cos B cos C)", "OI^2 = R^2 - 2Rr", "OG in terms of side lengths", "distance orthocenter circumcenter"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "feuerbach-theorem",
          name: "Feuerbach's Theorem",
          latex: String.raw`NI = \frac{R}{2} - r, \qquad NI_A = \frac{R}{2} + r_A`,
          description: String.raw`The nine-point circle is internally tangent to the incircle and externally tangent to all three excircles — the distances between centers are exactly the radius differences/sums. The tangency point with the incircle (the Feuerbach point) is a named point of the triangle.`,
          keywords: ["feuerbach", "nine point tangent incircle", "R/2 minus r", "tangent excircles"],
          importance: "lower",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "leibniz-formula",
          name: "Leibniz Point-Mass Formula",
          latex: String.raw`PA^2 + PB^2 + PC^2 = 3\,PG^2 + \frac{a^2 + b^2 + c^2}{3}`,
          description: String.raw`For any point $P$ and centroid $G$: the sum of squared distances to the vertices splits into a point-dependent part ($3PG^2$) and a triangle constant ($\sum GA^2 = \frac{1}{3}\sum a^2$). Immediate corollary: the centroid minimizes $PA^2 + PB^2 + PC^2$.`,
          keywords: ["sum of squared distances", "centroid minimizes", "leibniz", "point mass", "GA^2 + GB^2 + GC^2 = (a^2+b^2+c^2)/3", "squared distances from centroid to vertices"],
          importance: "lowest",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "triangle-center-angles",
          name: "Angles at the Triangle Centers",
          latex: String.raw`\angle BOC = 2A, \quad \angle BIC = 90^\circ + \tfrac{A}{2}, \quad \angle BI_AC = 90^\circ - \tfrac{A}{2}, \quad \angle BHC = 180^\circ - A`,
          description: String.raw`All four angles are subtended by the same side $BC$, seen from four different centres, and $A$ throughout means the triangle's angle at vertex $A$. The circumcentre $O$ sees the central angle $\angle BOC = 2A$, double the inscribed angle. The incentre $I$ sees $\angle BIC = 90^\circ + \tfrac{A}{2}$, which comes from the two half-angle bisectors at $B$ and $C$. The $A$-excentre $I_A$, the centre of the circle touching $BC$ and the extensions of the other two sides, sees $\angle BI_AC = 90^\circ - \tfrac{A}{2}$, the incentre's supplement. The orthocentre $H$ sees $\angle BHC = 180^\circ - A$. The figures show $O$ and $I$ on the first panel and $H$ and $I_A$ on the second, since the excentre lies well outside the triangle.`,
          keywords: ["angle BIC", "angle BOC", "angle BHC", "angle B I_A C", "incenter angle", "excenter angle 90 - A/2", "circumcenter central angle", "orthocenter angle", "90 plus half A"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "orthocentric-system",
          name: "Orthocentric System",
          latex: String.raw`\{A,B,C,H\}:\ \text{each is the orthocenter of the other three}`,
          description: String.raw`A triangle together with its orthocenter, $\{A, B, C, H\}$, forms an orthocentric system: any one of the four points is the orthocenter of the triangle on the other three, so $H$ and the vertices play interchangeable roles. All four triangles $ABC$, $HBC$, $HCA$, $HAB$ share a single common nine-point circle, and their four circumcircles are congruent — each has radius $R$, because $\odot(HBC)$ is exactly the reflection of $\odot(ABC)$ across $BC$. (Their four circumcenters form a second orthocentric system, congruent to the first.)`,
          keywords: ["orthocentric system", "orthocenter of the other three", "four points orthocentric", "shared nine-point circle", "congruent circumcircles radius R", "reflection of circumcircle over side", "H and vertices symmetric"],
          importance: "lower",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "lemoine-point",
          name: "The Lemoine Point (Symmedian Point)",
          latex: String.raw`K = (a^2 : b^2 : c^2), \qquad d_a : d_b : d_c = a : b : c`,
          description: String.raw`The three symmedians concur at the Lemoine point $K$, the isogonal conjugate of the centroid. Its distances to the three sides are proportional to $a, b, c$, and it is the unique point of the plane minimizing the sum of the squares of those distances. It is also the centroid of its own pedal triangle, which is the cleanest route to that minimization.`,
          keywords: ["lemoine point", "symmedian point", "grebe point", "K point", "isogonal conjugate of the centroid", "minimize sum of squared distances to the sides", "pedal triangle centroid", "a^2 : b^2 : c^2", "concurrent symmedians"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "spieker-point",
          name: "The Spieker Point & Spieker Circle",
          latex: String.raw`S = (b+c : c+a : a+b), \qquad r_S = \tfrac{r}{2}, \qquad I,\; G,\; S,\; N \text{ collinear}`,
          description: String.raw`The incenter of the medial triangle, and equivalently the centroid of the triangle's perimeter, meaning the balance point of three uniform rods along the sides. That is not the centroid of the triangle's area, which is $G$; the distinction is the usual confusion. Its incircle, the Spieker circle, is the incircle of the medial triangle and has radius $\frac r2$. It sits on the Nagel line through $I$, $G$ and the Nagel point $N$, exactly at the midpoint of $IN$.`,
          keywords: ["spieker point", "spieker center", "spieker circle", "incenter of the medial triangle", "centroid of the perimeter", "nagel line", "midpoint of IN", "cleaver", "triangle center"],
          importance: "lower",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "gergonne-nagel-points",
          name: "Gergonne & Nagel Points",
          latex: String.raw`\text{Gergonne (incircle touches) and Nagel (excircle touches): the cevians concur}`,
          description: String.raw`Two more triangle centers from concurrent cevians. The Gergonne point is where the cevians to the incircle's touch points meet (concurrency by Ceva, since the incircle tangent lengths pair up). The Nagel point uses the points where the excircles touch the sides — there $BX' = s-c$, $CX' = s-b$ — and the cevians again concur; the Nagel point, centroid, and incenter are collinear on the Nagel line with $NG : GI$ related as $2:1$. Companions to the Lemoine, Fermat, and Brocard points.`,
          keywords: ["gergonne point", "nagel point", "incircle touch cevians", "excircle touch points", "nagel line", "triangle center concurrency"],
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
          id: "equal-chords-arcs",
          name: "Equal Chords, Arcs & Distances",
          latex: String.raw`\text{equal chords} \iff \text{equal arcs} \iff \text{equidistant from the center}`,
          description: String.raw`In one circle (or two congruent circles) these three conditions are all equivalent: two chords have equal length, they cut off equal arcs, and they lie at equal distance from the center. Two workhorse consequences: the perpendicular from the center to a chord bisects both the chord and its arc, and of two unequal chords the longer one lies closer to the center — so the diameter, at distance $0$, is the longest chord.`,
          keywords: ["equal chords", "equal arcs", "equidistant from center", "congruent chords", "chord distance from center", "perpendicular from center bisects chord", "longer chord closer to center", "diameter longest chord"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "inscribed-angle-theorem",
          name: "Inscribed Angle Theorem",
          latex: String.raw`\angle \text{inscribed} = \frac{1}{2} \angle \text{central} = \frac{1}{2}\,\text{arc}`,
          description: String.raw`An inscribed angle is half its intercepted arc. Corollaries: angles subtending the same arc are equal, and an angle in a semicircle is $90^\circ$, which is Thales' theorem.`,
          keywords: ["inscribed angle", "intercepted arc", "semicircle", "same arc equal angles"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "thales-theorem",
          name: "Thales' Theorem",
          latex: String.raw`AB \text{ a diameter} \iff \angle ACB = 90^\circ \quad (C \ne A, B \text{ on the circle})`,
          description: String.raw`An angle inscribed in a semicircle is right, and the converse holds: if $\angle ACB = 90^\circ$ then $C$ lies on the circle with diameter $AB$. The converse is the half that does the work on contests, because it turns a right angle into a circle you can then use.`,
          keywords: ["thales", "thales theorem", "angle in a semicircle", "semicircle right angle", "diameter subtends a right angle", "right angle locus", "circle on a diameter"],
          importance: "medium",
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
          keywords: ["tangent perpendicular radius", "equal tangents", "tangent chord angle", "tangent to a circle", "radius perpendicular to tangent", "two equal tangents"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "tangent-chord-angle",
          name: "Tangent–Chord Angle (Alternate Segment)",
          latex: String.raw`\angle(\ell, TA) = \tfrac{1}{2}\,\overset{\frown}{TA} = \angle TBA`,
          description: String.raw`The angle between a tangent $\ell$ at $T$ and a chord $TA$ equals half the intercepted arc — hence equals the inscribed angle $\angle TBA$ in the alternate segment (the arc on the far side). Key corollary: the tangent to a triangle's circumcircle at a vertex makes an angle with each side equal to the triangle's opposite angle — equivalently, that tangent is antiparallel to the opposite side (a fast concyclicity and angle-chasing tool).`,
          keywords: ["tangent chord angle", "alternate segment theorem", "tangent to circumcircle", "inscribed angle", "intercepted arc", "tangent antiparallel to opposite side", "tangent at a vertex"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "two-tangents-angle",
          name: "Angle Between Two Tangents",
          latex: String.raw`\angle APB = 180^\circ - \angle AOB = \tfrac{1}{2}\left(\text{arc}_{\text{far}} - \text{arc}_{\text{near}}\right)`,
          description: String.raw`From an external point $P$ the two tangents touch at $A, B$: the angle between them and the central angle $\angle AOB$ are supplementary. The tangent lengths are equal ($PA = PB$) and each radius meets its tangent at a right angle, so $PAOB$ is a right kite and $OP$ bisects $\angle APB$.`,
          keywords: ["two tangents", "external point", "angle between tangents", "supplementary central angle", "tangent kite", "circumscribed angle"],
          importance: "medium",
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
          keywords: ["four tangent circles", "curvature", "kissing circles", "apollonian"],
          importance: "low",
          level: ["AIME"]
        },
        {
          id: "caseys-theorem",
          name: "Casey's Theorem",
          latex: String.raw`t_{12}t_{34} + t_{14}t_{23} = t_{13}t_{24}`,
          description: String.raw`Generalized Ptolemy: for four circles tangent to a fifth circle (all internally or all externally), where $t_{ij}$ is the external tangent length between circles $i, j$. Points count as radius-0 circles.`,
          keywords: ["generalized ptolemy", "tangent circles", "tangent lengths", "casey theorem", "generalized ptolemy", "tangent lengths between circles"],
          importance: "lowest",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "butterfly-theorem",
          name: "The Butterfly Theorem",
          latex: String.raw`MX = MY`,
          description: String.raw`Let $M$ be the midpoint of chord $PQ$. Draw chords $AB$ and $CD$ through $M$; then $AD$ and $BC$ cut $PQ$ at points $X, Y$ equidistant from $M$.`,
          keywords: ["chord midpoint", "butterfly", "symmetric intersections", "butterfly theorem", "midpoint of a chord", "butterfly configuration circle"],
          importance: "lowest",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "radical-axis",
          name: "Radical Axis & Radical Center",
          latex: String.raw`\{P : \operatorname{pow}(P, \omega_1) = \operatorname{pow}(P, \omega_2)\} = \text{a line} \perp O_1O_2`,
          description: String.raw`Points with equal power to two circles form a line perpendicular to the line of centers — through the intersection points when the circles meet. For three circles, the three radical axes concur at the radical center, from which all tangent lengths to the three circles are equal. Compute it by subtracting circle equations (the quadratic terms cancel).`,
          keywords: ["radical axis", "radical center", "equal power", "subtract circle equations", "common chord"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "common-chord-length",
          name: "Common Chord of Two Circles",
          latex: String.raw`\text{chord} = 2\sqrt{R^2 - d_1^{\,2}},\qquad d_1 = \frac{d^2 + R^2 - r^2}{2d}`,
          description: String.raw`Two circles of radii $R$ and $r$ whose centers are a distance $d$ apart (with $|R-r|\lt d\lt R+r$, so they cross) share a common chord that lies on the radical axis, perpendicular to the line of centers. Its distance from the $R$-center is $d_1=\dfrac{d^2+R^2-r^2}{2d}$ — drop a perpendicular to the chord and equate the two right-triangle expressions for the half-chord — so the full common chord has length $2\sqrt{R^2-d_1^{\,2}}$. Measuring from the other center gives the same value with $d_2=d-d_1$.`,
          keywords: ["common chord", "two intersecting circles", "radical axis", "chord length", "circle intersection", "length of common chord"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "tangent-circles",
          name: "Tangent Circles & the Line of Centers",
          latex: String.raw`d = R + r \ \text{(external)}, \qquad d = |R - r| \ \text{(internal)}`,
          description: String.raw`Two tangent circles touch at a point that lies on the line joining their centers, so the distance $d$ between centers is fixed by the radii alone: $R + r$ when they touch from outside, $|R - r|$ when one lies inside the other. This is the move that turns a tangency condition into a length equation. The same quantity classifies every other position: $d \gt R + r$ separate, $|R-r| \lt d \lt R+r$ crossing, $d \lt |R-r|$ nested. All of it carries over verbatim to spheres, where it is usually the fastest way to place a ball resting inside or outside another.`,
          keywords: ["tangent circles", "externally tangent", "internally tangent", "distance between centers", "line of centers", "circle packing", "touching circles", "tangency point collinear", "two circles tangent"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "miquels-theorem",
          name: "Miquel's Theorem",
          latex: String.raw`\odot(AEF), \; \odot(BFD), \; \odot(CDE) \text{ meet at one point}`,
          description: String.raw`Pick any points $D, E, F$ on sides $BC$, $CA$, $AB$: the three circles each through a vertex and its two adjacent chosen points always share a common point — the Miquel point. Proved by one round of cyclic-quadrilateral angle chasing; the configuration underlies many "three circles" contest setups.`,
          keywords: ["miquel point", "three circles", "concurrent circles", "points on sides"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "apollonius-circle",
          name: "Apollonius Circle",
          latex: String.raw`\{\, P : PA / PB = k \,\} \text{ is a circle} \quad (k \ne 1), \qquad \text{diameter endpoints divide } AB \text{ internally and externally in ratio } k`,
          description: String.raw`The locus of points whose distances to two fixed points $A, B$ have a constant ratio $k \ne 1$ is a circle — the Apollonius circle. Its diameter runs between the two points that cut $AB$ in the ratio $k$: one inside the segment, one outside. (When $k = 1$ the locus degenerates to the perpendicular bisector.) Distinct from Apollonius's Theorem (the median-length relation) despite the shared name. It's the standard model for "$PA = k\cdot PB$" constraints and the isogonal/symmedian circle configurations.`,
          keywords: ["apollonius circle", "locus constant ratio", "distance ratio", "PA/PB constant", "internal external division", "isodynamic"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "reims-theorem",
          name: "Reim's Theorem",
          latex: String.raw`A, B, C, D \text{ concyclic} \iff AB \parallel CD \text{ (chords cut by two circles through } P, Q)`,
          description: String.raw`Two circles meet at $P$ and $Q$. A line through $P$ hits them again at $A$ (first circle) and $C$ (second); a line through $Q$ hits them at $B$ and $D$. Then $AB \parallel CD$ — and conversely, a parallelism forces the four outer points to be concyclic. It is the go-to lemma for converting "these lines are parallel" into "these points are concyclic" (and back) in angle-chasing, and pairs naturally with directed angles.`,
          keywords: ["reim theorem", "reims theorem", "two circles parallel chords", "concyclic from parallel", "antiparallel", "angle chasing lemma"],
          importance: "lower",
          level: ["Olympiad"]
        },
        {
          id: "mixtilinear-incircle",
          name: "Mixtilinear Incircle",
          latex: String.raw`\text{tangent to } AB, AC \text{ and the circumcircle at } T;\ \ T, I, \text{arc-midpoint collinear}`,
          description: String.raw`The $A$-mixtilinear incircle is tangent to sides $AB$, $AC$ and internally tangent to the circumcircle at a point $T$. Key facts: the incenter $I$ is the midpoint of the chord where the mixtilinear circle touches $AB$ and $AC$; the tangency point $T$, the incenter $I$, and the midpoint of arc $BAC$ are collinear; and $T$ maps the incircle to the circumcircle under the homothety at $T$. A recurring configuration in modern olympiad geometry.`,
          keywords: ["mixtilinear incircle", "tangent to two sides and circumcircle", "tangency point collinear incenter", "arc midpoint", "olympiad configuration", "homothety incircle circumcircle"],
          importance: "lower",
          level: ["Olympiad"]
        }
      ]
    },
    {
      title: "Cyclic & Tangential Quadrilaterals",
      formulas: [
        {
          id: "cyclic-opposite-angles",
          name: "Cyclic Quadrilateral Opposite Angles",
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
          keywords: ["ptolemy", "cyclic quadrilateral", "diagonals", "opposite sides"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "cyclic-quad-diagonals",
          name: "Cyclic Quadrilateral Diagonals",
          latex: String.raw`\frac{p}{q} = \frac{ad + bc}{ab + cd}, \qquad p^2 = \frac{(ac+bd)(ad+bc)}{ab+cd}`,
          description: String.raw`With sides $a, b, c, d$ in order and diagonals $p = AC$, $q = BD$: the diagonal ratio is a ratio of paired side-products, and combining with Ptolemy ($pq = ac + bd$) gives each diagonal explicitly from the four sides — no angles needed.`,
          keywords: ["second ptolemy", "diagonal ratio", "diagonal from sides", "cyclic quadrilateral diagonals"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "brahmaguptas-formula",
          name: "Brahmagupta's Formula",
          latex: String.raw`A = \sqrt{(s-a)(s-b)(s-c)(s-d)}, \qquad R = \frac{1}{4A}\sqrt{(ab+cd)(ac+bd)(ad+bc)}`,
          description: String.raw`Area of a cyclic quadrilateral with semiperimeter $s$. Heron's formula is the degenerate case $d = 0$.`,
          keywords: ["cyclic quadrilateral area", "semiperimeter", "brahmagupta", "brahmagupta formula", "cyclic quadrilateral area", "area from four sides"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "pitots-theorem",
          name: "Pitot's Theorem",
          latex: String.raw`AB + CD = BC + AD`,
          description: String.raw`A quadrilateral is tangential (has an inscribed circle) if and only if the sums of opposite sides are equal.`,
          keywords: ["tangential", "inscribed circle", "opposite sides equal", "pitot theorem", "tangential quadrilateral", "sums of opposite sides equal"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "ptolemys-inequality",
          name: "Ptolemy's Inequality",
          latex: String.raw`AB \cdot CD + BC \cdot DA \ge AC \cdot BD`,
          description: String.raw`Holds for any four points in the plane; equality iff $ABCD$ is cyclic in that order (reducing to Ptolemy's Theorem).`,
          keywords: ["four points", "inequality", "equality cyclic", "ptolemy inequality", "ptolemys inequality", "noncyclic quadrilateral bound"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "ptolemy-equilateral",
          name: "Ptolemy on an Equilateral Triangle",
          latex: String.raw`PA = PB + PC`,
          description: String.raw`If $P$ lies on arc $BC$ of the circumcircle of equilateral $\triangle ABC$, the distance to the far vertex equals the sum of the distances to the near two — a classic AIME shortcut.`,
          keywords: ["equilateral", "circumcircle point", "distance sum", "pompeiu"],
          importance: "lowest",
          level: ["AIME"]
        },
        {
          id: "cyclic-quad-radius",
          name: "Circumradius of a Cyclic Quadrilateral",
          latex: String.raw`R = \frac{1}{4K}\sqrt{(ab+cd)(ac+bd)(ad+bc)}`,
          description: String.raw`With $K$ the area (from Brahmagupta): the circumradius of a cyclic quadrilateral in terms of its four sides alone. The three paired products are the same ones appearing in Ptolemy ($ac + bd = pq$) and the diagonal-length formulas.`,
          keywords: ["circumradius cyclic quadrilateral", "parameshvara", "four sides", "brahmagupta companion"],
          importance: "lower",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "newtons-line",
          name: "Newton–Gauss Line",
          latex: String.raw`\text{the midpoints of a quadrilateral's diagonals are collinear (Newton–Gauss line)}`,
          description: String.raw`In a complete quadrilateral, the midpoints of its three diagonals are collinear — the Newton–Gauss line. The classical special case (Newton's line): in a quadrilateral with an inscribed circle, the incenter also lies on the line through the midpoints of the two diagonals. A tidy collinearity that appears in quadrilateral configuration problems.`,
          keywords: ["newton line", "newton gauss line", "diagonal midpoints collinear", "complete quadrilateral", "tangential incenter midpoints"],
          importance: "lowest",
          level: ["Olympiad"]
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
          keywords: ["distance formula", "distance between two points", "midpoint", "slope", "perpendicular", "section formula"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "line-forms",
          name: "Forms of a Line",
          latex: String.raw`y = mx + b, \qquad y - y_1 = m(x - x_1), \qquad Ax + By = C, \qquad \frac{x}{a} + \frac{y}{b} = 1`,
          description: String.raw`The same line written four ways, each convenient for a different given. Slope-intercept reads off slope and $y$-intercept; point-slope is what you write the instant you know a slope and one point; standard form $Ax + By = C$ keeps integer coefficients and makes $\gcd$ and lattice-point questions clean; intercept form has $x$-intercept $a$ and $y$-intercept $b$ on sight. In standard form the slope is $-\frac{A}{B}$ and the normal vector is $(A, B)$.`,
          keywords: ["slope intercept form", "point slope form", "standard form", "intercept form", "equation of a line", "y = mx + b", "Ax + By = C", "line through two points", "convert between forms", "normal vector of a line"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
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
          keywords: ["polygon area", "vertices", "coordinates", "shoelace", "surveyor"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "picks-theorem",
          name: "Pick's Theorem",
          latex: String.raw`A = I + \frac{B}{2} - 1`,
          description: String.raw`Area of a lattice polygon: $I$ interior lattice points, $B$ boundary lattice points. A segment between lattice points $(0,0)$ and $(a,b)$ passes through $\gcd(a,b) - 1$ interior lattice points.`,
          keywords: ["lattice points", "grid", "interior", "boundary", "gcd"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "point-line-distance",
          name: "Point-to-Line Distance",
          latex: String.raw`d = \frac{|Ax_0 + By_0 + C|}{\sqrt{A^2 + B^2}}`,
          description: String.raw`Distance from $(x_0, y_0)$ to the line $Ax + By + C = 0$ — put the line in that form first. Keeping the sign (dropping the absolute value) tells you which side of the line the point is on, which is how you test whether two points are separated by a line.`,
          keywords: ["distance to line", "perpendicular distance", "foot", "point to line distance", "distance from a point to a line", "which side of a line"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "circle-equation",
          name: "Equation of a Circle",
          latex: String.raw`(x - h)^2 + (y - k)^2 = r^2`,
          description: String.raw`Center $(h, k)$, radius $r$. Complete the square on $x^2 + y^2 + Dx + Ey + F = 0$ to read off center $\left(-\frac{D}{2}, -\frac{E}{2}\right)$.`,
          keywords: ["circle equation", "center radius", "complete the square", "equation of a circle", "standard form of a circle", "find center and radius"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "british-flag-theorem",
          name: "British Flag Theorem",
          latex: String.raw`PA^2 + PC^2 = PB^2 + PD^2`,
          description: String.raw`For any point $P$ and rectangle $ABCD$: the sums of squared distances to opposite corners are equal. Holds even if $P$ is outside the rectangle or off its plane.`,
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
          id: "ellipse-tangent-line",
          name: "Ellipse Tangent to a Line (Minimum Focal Sum)",
          latex: String.raw`\text{ellipse with foci } F_1, F_2 \text{ tangent to } \ell \text{ at } T \iff T = \arg\min_{P \in \ell}\ \left(PF_1 + PF_2\right)`,
          description: String.raw`The ellipses with foci $F_1$ and $F_2$ are the level curves of $PF_1 + PF_2$, so the smallest one meeting a line touches it, and the point of tangency is where that sum is least. It is the reflection trick read as a level curve: reflect $F_1$ over $\ell$ and the minimum sits where $F_1'F_2$ crosses.`,
          keywords: ["ellipse tangent to a line", "minimum sum of distances to two foci", "shortest focal sum", "reflection trick ellipse", "level curve of focal sum", "tangent point minimises", "ellipse tangent to the x axis"],
          importance: "low",
          level: ["AMC12", "AIME"]
        },
        {
          id: "conic-sections",
          name: "Conic Sections",
          latex: String.raw`\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1 \;\; (c^2 = a^2 - b^2), \qquad \frac{x^2}{a^2} - \frac{y^2}{b^2} = 1 \;\; (c^2 = a^2 + b^2), \qquad x^2 = 4py`,
          description: String.raw`Ellipse: distances to the two foci $(\pm c, 0)$ sum to $2a$, and the area is $\pi ab$. Hyperbola: the distances differ by $2a$, with asymptotes $y = \pm\frac{b}{a}x$. Parabola $x^2 = 4py$: each point is equidistant from the focus $(0, p)$ and the directrix $y = -p$.`,
          keywords: ["ellipse", "hyperbola", "parabola", "focus", "directrix", "asymptotes", "foci", "standard form", "ellipse tangent to a line", "point of tangency minimizes focal sum", "ellipse reflection property"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "incenter-coordinates",
          name: "Center Coordinates as Weighted Averages",
          latex: String.raw`G = \frac{A + B + C}{3}, \qquad I = \frac{aA + bB + cC}{a + b + c}`,
          description: String.raw`The centroid averages the vertices; the incenter is the side-length-weighted average (barycentric coordinates $a : b : c$). A point with masses $m_A, m_B, m_C$ sits at $\frac{m_AA + m_BB + m_CC}{m_A+m_B+m_C}$ — mass points and coordinates unified. The $A$-excenter swaps one sign: $\frac{-aA + bB + cC}{-a+b+c}$.`,
          keywords: ["incenter coordinates", "barycentric", "weighted average", "centroid average", "excenter coordinates"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "section-formula",
          name: "Section Formula",
          latex: String.raw`P = \left( \frac{m x_2 + n x_1}{m + n}, \; \frac{m y_2 + n y_1}{m + n} \right) \quad (AP : PB = m : n)`,
          description: String.raw`The point dividing $A(x_1, y_1)$ to $B(x_2, y_2)$ internally in ratio $m : n$ is the weighted average leaning toward $B$. The midpoint is the case $m = n$. External division (the point lies beyond the segment) just flips the sign of $n$: $\frac{m x_2 - n x_1}{m - n}$.`,
          keywords: ["section formula", "divide segment ratio", "internal division", "external division", "weighted point", "dividing a segment"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "vector-dot-product",
          name: "Dot Product",
          latex: String.raw`\vec{u} \cdot \vec{v} = u_1 v_1 + u_2 v_2 = |\vec{u}|\,|\vec{v}| \cos\theta`,
          description: String.raw`Measures alignment: positive for an acute angle, exactly $0$ when $\vec{u} \perp \vec{v}$, negative for obtuse. Gives the angle via $\cos\theta = \frac{\vec{u} \cdot \vec{v}}{|\vec{u}||\vec{v}|}$ and the scalar projection of $\vec{u}$ onto $\vec{v}$ as $\frac{\vec{u} \cdot \vec{v}}{|\vec{v}|}$.`,
          keywords: ["dot product", "scalar product", "angle between vectors", "perpendicular zero", "projection"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Combinatorial & Convex Geometry",
      formulas: [
        {
          id: "convex-position",
          name: "Points in Convex Position",
          latex: String.raw`\text{any 5 points in general position contain 4 in convex position}`,
          description: String.raw`The convex hull is the smallest convex polygon enclosing a point set; points are "in convex position" if they're all hull vertices. The Erdős–Szekeres (Happy Ending) theorem: for each $n$ there's a least number $\mathrm{ES}(n)$ of points in general position guaranteeing a convex $n$-gon — $\mathrm{ES}(4) = 5$, $\mathrm{ES}(5) = 9$, and $\mathrm{ES}(n) = 2^{n-2}+1$ is conjectured. The pigeonhole proof classifies points by the hull structure.`,
          keywords: ["convex position", "convex hull", "happy ending problem", "erdos szekeres geometric", "convex polygon points", "general position"],
          importance: "lowest",
          level: ["Olympiad"]
        },
        {
          id: "sylvester-gallai",
          name: "Sylvester–Gallai Theorem",
          latex: String.raw`\text{finite points, not all collinear} \Rightarrow \text{some line hits exactly two}`,
          description: String.raw`Any finite set of points that isn't entirely on one line has an "ordinary line" — one containing exactly two of the points. The slick proof takes the closest point–line pair and shows a third point on the line would give a closer pair, a contradiction (the extremal principle in action). A famous existence result; its dual concerns arrangements of lines.`,
          keywords: ["sylvester gallai", "ordinary line", "not all collinear", "two points line", "extremal principle geometry"],
          importance: "lowest",
          level: ["Olympiad"]
        },
        {
          id: "hellys-theorem",
          name: "Helly's Theorem",
          latex: String.raw`\text{convex sets in } \mathbb{R}^d:\ \text{every } d{+}1 \text{ intersect} \Rightarrow \text{all intersect}\quad(\text{plane: every } 3 \Rightarrow \text{all})`,
          description: String.raw`For a finite family of convex sets in the plane, if every three have a common point then all of them do (in $\mathbb{R}^d$, replace three by $d+1$). It reduces a global intersection question to checking small subfamilies — the standard tool for "a single point/line meets all of these" problems and piercing arguments. Convexity is essential.`,
          keywords: ["helly theorem", "convex sets intersection", "every three intersect", "common point", "piercing", "d plus one"],
          importance: "lowest",
          level: ["Olympiad"]
        },
        {
          id: "minkowski-lattice",
          name: "Minkowski's Lattice Point Theorem",
          latex: String.raw`\text{centrally symmetric convex, area} > 4 \Rightarrow \text{contains a nonzero lattice point}`,
          description: String.raw`A convex region symmetric about the origin with area exceeding $4$ must contain a lattice point other than the origin (volume $> 2^d$ in $d$ dimensions). The proof tiles the plane by the integer lattice and applies pigeonhole to overlaps. The geometry-of-numbers bridge to number theory — it proves the two-squares theorem and bounds for Diophantine approximation.`,
          keywords: ["minkowski lattice theorem", "geometry of numbers", "centrally symmetric convex", "lattice point", "area greater than 4", "two squares proof"],
          importance: "lowest",
          level: ["Olympiad"]
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
          id: "descartes-sphere-theorem",
          name: "Soddy–Gosset Theorem (3D Descartes)",
          latex: String.raw`(k_1 + k_2 + k_3 + k_4 + k_5)^2 = 3\left(k_1^2 + k_2^2 + k_3^2 + k_4^2 + k_5^2\right)`,
          description: String.raw`The three-dimensional analogue of the Descartes Circle Theorem: five mutually tangent spheres with curvatures $k_i = 1/r_i$ satisfy $\left(\sum k_i\right)^2 = 3\sum k_i^2$. The sign conventions match the 2D case — a sphere that encloses the others contributes a negative curvature, and a flat plane counts as $0$. Given four mutually tangent spheres, solving the quadratic for the fifth gives the two "filling" spheres $k_5 = \tfrac12\left(\sum_{i=1}^{4} k_i\right) \pm \tfrac{\sqrt3}{2}\sqrt{\left(\sum_{i=1}^{4} k_i\right)^2 - 2\sum_{i=1}^{4} k_i^2}$. In general the Soddy–Gosset theorem in $n$ dimensions reads $\left(\sum_{i=1}^{n+2} k_i\right)^2 = n\sum k_i^2$ — the circle theorem is the $n = 2$ case, this is $n = 3$.`,
          keywords: ["soddy", "gosset", "five spheres", "3d descartes", "descartes sphere", "sphere curvature", "kissing spheres", "mutually tangent spheres", "bend", "apollonian"],
          importance: "lowest",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "cone-formulas",
          name: "Cone Surface Area",
          latex: String.raw`SA = \pi r \ell + \pi r^2, \qquad \ell = \sqrt{r^2 + h^2}`,
          description: String.raw`Lateral area $\pi r \ell$ uses the slant height $\ell$. Unrolled, the lateral surface is a sector of radius $\ell$ and arc length $2\pi r$.`,
          keywords: ["cone", "slant height", "lateral area", "unroll", "sector"],
          importance: "medium",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "frustum-volume",
          name: "Volume of a Frustum",
          latex: String.raw`V = \frac{1}{3}h\left(A_1 + A_2 + \sqrt{A_1 A_2}\right)`,
          description: String.raw`A truncated pyramid or cone with parallel base areas $A_1, A_2$ and height $h$ between them.`,
          keywords: ["frustum", "truncated cone", "truncated pyramid", "frustum volume formula", "truncated cone volume", "truncated pyramid volume"],
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
          name: "Vector Cross Product",
          latex: String.raw`[\triangle] = \frac{1}{2}\left|\vec{u} \times \vec{v}\right|, \qquad V_{\text{tetrahedron}} = \frac{1}{6}\left|\vec{u} \cdot (\vec{v} \times \vec{w})\right|`,
          description: String.raw`With $\vec{u}, \vec{v}, \vec{w}$ the edge vectors from one vertex. The fastest route to areas and volumes of coordinate-defined triangles and tetrahedra in 3D — the shoelace formula's big sibling.`,
          keywords: ["cross product", "triple product", "3d coordinates", "tetrahedron volume", "determinant"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "de-guas-theorem",
          name: "De Gua's Theorem",
          latex: String.raw`A_0^2 = A_1^2 + A_2^2 + A_3^2, \qquad \frac{1}{h^2} = \frac{1}{a^2} + \frac{1}{b^2} + \frac{1}{c^2}`,
          description: String.raw`3D Pythagorean Theorem for a right-corner tetrahedron (like a sliced cube corner): the squared area of the "hypotenuse face" equals the sum of the squared areas of the three right-angle faces.`,
          keywords: ["tetrahedron", "right corner", "face areas", "3d pythagorean"],
          importance: "lowest",
          level: ["AIME"]
        },
        {
          id: "regular-tetrahedron",
          name: "Regular Tetrahedron of Side $s$",
          latex: String.raw`h = \frac{s\sqrt{6}}{3}, \qquad V = \frac{s^3\sqrt{2}}{12}, \qquad SA = s^2\sqrt{3}`,
          description: String.raw`Also worth caching: circumradius $R = \frac{s\sqrt{6}}{4}$, inradius $r = \frac{s\sqrt{6}}{12}$ (so $R = 3r$), and dihedral angle $\arccos\frac{1}{3} \approx 70.5^\circ$. A regular octahedron of side $s$ has volume $\frac{s^3\sqrt{2}}{3}$ — exactly four such tetrahedra.`,
          keywords: ["tetrahedron", "octahedron", "platonic", "volume", "height", "circumradius", "dihedral angle", "inradius", "R = 3r", "octahedron volume", "dihedral arccos 1/3"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "regular-octahedron",
          name: "Regular Octahedron of Side $s$",
          latex: String.raw`V = \frac{s^3\sqrt{2}}{3}, \qquad SA = 2s^2\sqrt{3}, \qquad R = \frac{s\sqrt{2}}{2}, \quad r = \frac{s\sqrt{6}}{6}`,
          description: String.raw`Eight equilateral faces. The standard split: a horizontal cut through the four equatorial vertices gives two identical square pyramids with base side $s$ and height $\frac{s}{\sqrt{2}}$, so $V = 2\cdot\frac13 s^2\cdot\frac{s}{\sqrt{2}} = \frac{s^3\sqrt{2}}{3}$. It is the dual of the cube — its 6 vertices sit at the centers of a cube's faces — and its volume is exactly four regular tetrahedra of the same edge.`,
          keywords: ["octahedron", "regular octahedron", "eight faces", "two square pyramids", "split octahedron", "dual of cube", "platonic solid", "octahedron volume", "octahedron surface area"],
          importance: "low",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "cayley-menger",
          name: "Cayley–Menger Determinant",
          latex: String.raw`288\,V^2 = \begin{vmatrix} 0 & 1 & 1 & 1 & 1 \\ 1 & 0 & a^2 & b^2 & c^2 \\ 1 & a^2 & 0 & d^2 & e^2 \\ 1 & b^2 & d^2 & 0 & f^2 \\ 1 & c^2 & e^2 & f^2 & 0 \end{vmatrix}`,
          description: String.raw`The 3D Heron's Formula: the volume of any tetrahedron from its six edge lengths alone, no coordinates needed. Here $a,b,c$ are the edges from one vertex and $d,e,f$ the opposite edges. (The $2\times2$ Heron analogue $16[\triangle]^2$ is the same determinant one size down.)`,
          keywords: ["cayley menger", "volume from edge lengths", "tetrahedron volume", "3d heron", "determinant", "six edges"],
          importance: "lowest",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "isosceles-tetrahedron",
          name: "Isosceles Tetrahedron",
          latex: String.raw`a^2 = p^2 + q^2,\ \ b^2 = q^2 + r^2,\ \ c^2 = p^2 + r^2, \qquad V = \frac{pqr}{3}`,
          description: String.raw`A tetrahedron whose three pairs of opposite edges are equal ($a, a$; $b, b$; $c, c$) is isosceles. It slots into a rectangular box $p \times q \times r$ as the box's face diagonals, so its volume is $\frac{pqr}{3}$ (the box minus four corner right-tetrahedra). All four faces are congruent acute triangles, and the circumcenter, incenter, and centroid coincide.`,
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
          keywords: ["inscribed sphere", "insphere", "3v over s", "distance to faces", "isosceles tetrahedron"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "plane-intercept-form",
          name: "Equation of a Plane from Its Intercepts",
          latex: String.raw`\frac{x}{a} + \frac{y}{b} + \frac{z}{c} = 1 \quad\Longleftrightarrow\quad bc\,x + ca\,y + ab\,z = abc`,
          description: String.raw`A plane meeting the axes at $(a,0,0)$, $(0,b,0)$, $(0,0,c)$ with all three intercepts nonzero. Reading it off is immediate, and clearing denominators gives the standard form $Ax + By + Cz = D$ with normal vector $(bc, ca, ab)$. The tetrahedron this plane cuts from the first octant has volume $\frac{abc}{6}$.`,
          keywords: ["plane from three intercepts", "intercept form of a plane", "equation of a plane", "x/a + y/b + z/c = 1", "normal vector of a plane", "tetrahedron cut from octant", "plane through three points on the axes"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "point-plane-distance",
          name: "Point-to-Plane Distance",
          latex: String.raw`d = \frac{|ax_0 + by_0 + cz_0 + d_0|}{\sqrt{a^2 + b^2 + c^2}}`,
          description: String.raw`Distance from $(x_0, y_0, z_0)$ to the plane $ax + by + cz + d_0 = 0$ — the 3D twin of point-to-line distance, with $(a, b, c)$ the plane's normal vector. Find a plane through three points via the cross product of two edge vectors (that cross product is the normal).`,
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
          id: "pappus-centroid",
          name: "Pappus's Centroid Theorems",
          latex: String.raw`V = 2\pi d \cdot A, \qquad S = 2\pi d \cdot L, \qquad \text{torus: } V = 2\pi^2 R r^2, \; S = 4\pi^2 R r`,
          description: String.raw`Revolve a plane region about an external axis in its plane: the solid's volume is the area $A$ times the distance the region's centroid travels, $2\pi d$. Revolve a plane curve instead and its surface area is the arc length $L$ times $2\pi d$. So the whole problem reduces to finding a centroid. For a torus (revolve a disk of radius $r$ whose center is $R$ from the axis) this gives $V = 2\pi R \cdot \pi r^2 = 2\pi^2 R r^2$ and $S = 2\pi R \cdot 2\pi r = 4\pi^2 R r$ instantly.`,
          keywords: ["pappus", "centroid theorem", "solid of revolution", "volume of revolution", "surface of revolution", "torus volume", "torus surface"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
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
          latex: String.raw`\varphi = \frac{1+\sqrt{5}}{2}, \qquad \frac{\text{diagonal}}{\text{side}} = \varphi, \qquad \varphi^n = F_n\varphi + F_{n-1}`,
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
          keywords: ["square in triangle", "inscribed square", "similar triangles", "square inscribed in a triangle", "largest inscribed square", "square inside a triangle"],
          importance: "low",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "isoperimetric-facts",
          name: "Isoperimetric Facts",
          latex: String.raw`\text{fixed perimeter} \Rightarrow \text{square} \ge \text{rectangles}, \;\; \text{equilateral} \ge \text{triangles}, \;\; \text{circle} \ge \text{everything}`,
          description: String.raw`For a fixed perimeter, area is maximized by the most symmetric shape: the square among rectangles ($xy \le \left(\frac{x+y}{2}\right)^2$), the equilateral among triangles (by AM-GM on Heron), the regular $n$-gon among $n$-gons, and the circle overall. For fixed side lengths, the cyclic polygon maximizes area (Bretschneider's term).`,
          keywords: ["maximize area", "fixed perimeter", "isoperimetric", "square best rectangle", "regular maximizes", "maximization"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        }
      ]
    },
    {
      title: "Projective Geometry & Inversion",
      formulas: [
        {
          id: "brianchon-theorem",
          name: "Brianchon's Theorem",
          latex: String.raw`\text{hexagon tangent to a conic} \implies AD,\; BE,\; CF \text{ concur}`,
          description: String.raw`The projective dual of Pascal's theorem: if a hexagon $ABCDEF$ is circumscribed about a conic (every side tangent to it), its three main diagonals $AD$, $BE$, $CF$ pass through one point. Pascal turns "six points on a conic" into a collinearity; Brianchon turns "six tangent lines" into a concurrency — the identical statement with points and lines swapped. Letting tangency points merge degenerates it into concurrency facts for circumscribed pentagons and quadrilaterals, and it yields the Gergonne point from a triangle's incircle.`,
          keywords: ["brianchon", "tangent hexagon", "dual of pascal", "diagonals concurrent", "circumscribed conic", "projective", "gergonne point"],
          importance: "lowest",
          level: ["Olympiad"]
        },
        {
          id: "pascals-theorem",
          name: "Pascal's Theorem",
          latex: String.raw`AB \cap DE, \;\; BC \cap EF, \;\; CD \cap FA \;\text{ are collinear}`,
          description: String.raw`Inscribe any hexagon $ABCDEF$ in a circle (self-intersecting allowed): the three intersection points of opposite sides lie on one line — the Pascal line. The dual, Brianchon's theorem: a hexagon circumscribed about a circle has its three main diagonals concurrent. Degenerate versions (letting adjacent vertices merge so a side becomes a tangent line) are the contest-useful forms.`,
          keywords: ["pascal line", "hexagon in circle", "brianchon", "collinear intersections", "projective"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "desargues-theorem",
          name: "Desargues's Theorem",
          latex: String.raw`\text{perspective from a point} \iff \text{perspective from a line}`,
          description: String.raw`Triangles $ABC$ and $A'B'C'$ are perspective from a point when $AA'$, $BB'$, $CC'$ concur, and perspective from a line when the three points $AB\cap A'B'$, $BC\cap B'C'$, $CA\cap C'A'$ are collinear (the axis of perspectivity). Desargues: either condition implies the other. It trades a concurrency for a collinearity and back — the two things projective problems keep asking for — and its converse proves concurrency by producing the axis.`,
          keywords: ["desargues", "perspective from point", "perspective from line", "axis of perspectivity", "concurrency", "collinearity", "projective duality", "two triangles"],
          importance: "lower",
          level: ["Olympiad"]
        },
        {
          id: "mobius-transformations",
          name: "Möbius Transformations",
          latex: String.raw`f(z) = \frac{az + b}{cz + d}, \quad ad - bc \ne 0 \qquad \text{cross-ratio and the family of lines-and-circles are preserved}`,
          description: String.raw`The maps of the extended complex plane built from one fraction. Every one is a composition of translations, rotations, scalings and the single inversion $z \mapsto \frac1z$, which is why the whole family sends lines and circles to lines and circles, treating a line as a circle through $\infty$. They preserve angles and the cross-ratio, three points can be sent to any other three in exactly one way, and $c = 0$ recovers the affine maps $z \mapsto \alpha z + \beta$.`,
          keywords: ["mobius transformation", "möbius", "linear fractional transformation", "(az+b)/(cz+d)", "extended complex plane", "circles to circles", "conformal", "cross ratio preserved", "three points determine it", "riemann sphere", "inversion as a map"],
          importance: "lowest",
          level: ["Olympiad"]
        },
        {
          id: "cross-ratio",
          name: "Cross-Ratio",
          latex: String.raw`(A, B; C, D) = \frac{AC}{BC} \Big/ \frac{AD}{BD} = \frac{AC \cdot BD}{BC \cdot AD}`,
          description: String.raw`The cross-ratio of four collinear points is the single number preserved by every projection and perspectivity — the fundamental invariant of projective geometry. It is also unchanged when the four points are replaced by four concurrent lines (angular cross-ratio), is preserved by inversion, and is the same for four concyclic points seen from any fifth point of the circle. Since projection destroys lengths and angles but never the cross-ratio, chasing points through several projections reduces to holding one quantity fixed. The value $-1$ is the harmonic case.`,
          keywords: ["cross ratio", "projective invariant", "four collinear points", "preserved by projection", "anharmonic ratio", "pencil of lines", "concyclic cross ratio"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "harmonic-bundle",
          name: "Harmonic Bundles & Conjugates",
          latex: String.raw`(A, B; C, D) = -1 \iff \frac{AC}{CB} = \frac{AD}{DB}\;\text{(one internal, one external)}`,
          description: String.raw`A harmonic bundle is the cross-ratio $-1$ case: $C$ and $D$ are harmonic conjugates with respect to $A, B$, dividing $AB$ internally and externally in the same ratio. They are everywhere in olympiad configs: two tangents and any secant from an external point cut a harmonic bundle with the polar; the internal and external bisectors from a vertex meet the opposite side at harmonic conjugates; a complete quadrilateral induces harmonic bundles on its diagonals. Midpoint criterion: if $M$ is the midpoint of $AB$ then $(A,B;C,D) = -1 \iff MA^2 = MC\cdot MD$.`,
          keywords: ["harmonic bundle", "harmonic conjugate", "cross ratio -1", "harmonic division", "internal external bisector", "polar", "complete quadrilateral", "harmonic range"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "harmonic-quadrilateral",
          name: "Harmonic Quadrilaterals & the Symmedian in a Circle",
          latex: String.raw`\frac{BD}{CD} = \frac{AB}{AC} \iff AD \text{ is the } A\text{-symmedian}, \qquad \frac{BE}{CE} = \left(\frac{AB}{AC}\right)^{2}`,
          description: String.raw`The tangents to the circumcircle at $B$ and $C$ meet at the pole $X$ of $BC$, and $AX$ is the $A$-symmedian. Extending it to meet the circle again at $D$ makes $ABDC$ a harmonic quadrilateral, meaning $AB \cdot CD = AC \cdot BD$. The engine is a pair of similar triangles: $XB = XC$ as tangent lengths and $XB^2 = XA \cdot XD$ by power of a point, so $\triangle XBA \sim \triangle XDB$ and $\triangle XCA \sim \triangle XDC$. Both proportions run in both directions, so either one is a test for the symmedian rather than just a consequence of it.`,
          keywords: ["harmonic quadrilateral", "symmedian in a circle", "tangents meet on the symmedian", "pole of BC", "BD/CD = AB/AC", "similar triangles from tangents", "power of a point symmedian", "AB*CD = AC*BD", "second intersection of the symmedian"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "complete-quadrilateral-miquel",
          name: "Miquel Point of a Complete Quadrilateral",
          latex: String.raw`\text{the 4 triangles of a complete quadrilateral share one circumcircle point } M`,
          description: String.raw`Four lines in general position make six intersection points and four triangles, one per choice of three lines. The circumcircles of those four triangles all pass through a single point $M$, the Miquel point.`,
          keywords: ["complete quadrilateral", "miquel point", "four circumcircles", "spiral similarity center", "four lines", "newton gauss line", "concyclic circumcenters", "miquel"],
          importance: "lowest",
          level: ["Olympiad"]
        }
      ]
    }
  ]
});
