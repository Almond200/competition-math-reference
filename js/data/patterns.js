// Additional Tools: the two things that are not formulas. Methods are general techniques,
// patterns are recognizable problem formats. Both are filed by subject, and every card
// keeps its `subject` field so topic chips and concept rules resolve against its home
// subject rather than against the section it now sits in.
window.MATH_SECTIONS = window.MATH_SECTIONS || [];

window.MATH_SECTIONS.push({
  id: "tools-methods",
  group: "tools",
  title: "Methods",
  blurb: "General techniques: the moves you make once you are already inside a problem. Angle chasing, casework, coordinate bashing, generating functions, and the rest of the toolkit, filed by the subject they belong to.",
  subsections: [
    {
      title: "Geometry",
      formulas: [
        {
          id: "cross-section-method",
          name: "3D Tangency via Cross-Sections",
          type: "method",
          subject: "geometry",
          latex: String.raw`\text{slice through the axis of symmetry} \Rightarrow \text{2D circles and lines}`,
          description: String.raw`Spheres, cylinders, cones, and tori that are tangent to each other become tangent circles and lines in the plane through their common axis of symmetry. Solve the 2D picture (center distances = sums/differences of radii, similar triangles), then rotate back.`,
          keywords: ["cross section", "torus", "sphere tangent", "axial slice", "3d to 2d", "method"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "perp-to-angle-bisector",
          name: "Perpendicular to an Angle Bisector",
          type: "method",
          subject: "geometry",
          latex: String.raw`BP = c\sin\tfrac A2, \quad B' = \text{reflection of } B \text{ over the } A\text{-bisector} \in \overline{AC},\ AB' = c; \qquad PM = \tfrac{|b-c|}{2} \parallel AC`,
          description: String.raw`The bisector of angle $A$ is a mirror that swaps ray $AB$ with ray $AC$. So the standard move — drop a perpendicular from $B$ to the bisector and extend it to double its length — reflects $B$ across the bisector: the foot $P$ is the midpoint, and the far end $B'$ lands on line $AC$ with $AB' = AB = c$. Consequences you can read off: the perpendicular length is $BP = c\sin\frac A2$ (so $BB' = 2c\sin\frac A2$), and $B'C = |b - c|$. Joining $P$ to the midpoint $M$ of $BC$ makes a midline of $\triangle BB'C$, so $PM \parallel AC$ with $PM = \frac{|b-c|}{2}$ — the quick way to locate that foot and get lengths in any angle-bisector configuration.`,
          keywords: ["perpendicular to angle bisector", "reflect over bisector", "double the perpendicular", "foot of perpendicular to bisector", "c sin A/2", "b minus c over 2", "midline b-c", "auxiliary construction", "angle bisector mirror", "drop perpendicular and extend"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "cavalieris-principle",
          name: "Cavalieri's Principle",
          type: "method",
          subject: "geometry",
          latex: String.raw`\text{equal cross-sections at every height} \Rightarrow \text{equal volumes}`,
          description: String.raw`Two solids that every horizontal plane slices into cross-sections of equal area have the same volume — whatever their shapes. This is why an oblique prism or cylinder keeps $V = Bh$ (shear it upright, no slice changes), and it delivers the sphere's volume by comparing it to a cylinder with a cone removed.`,
          keywords: ["cavalieri", "cross section", "equal slices equal volume", "oblique prism", "shear"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "solid-tactics",
          name: "The 3D Playbook",
          type: "method",
          subject: "geometry",
          latex: String.raw`\text{coordinatize} \;\to\; \text{slice} \;\to\; \text{unfold} \;\to\; \text{recount the volume}`,
          description: String.raw`The four standard attacks on 3D problems: (1) coordinatize with right angles at the origin — boxes, cubes, and right pyramids become vector arithmetic; (2) slice through the axis or plane of symmetry — tangency and inscribed-solid problems collapse to 2D; (3) unfold surfaces flat — shortest paths on boxes and cones become straight segments; (4) compute the volume two ways with different bases — the second reading extracts an inaccessible height or distance via $h = \frac{3V}{A}$.`,
          keywords: ["3d tactics", "coordinatize", "slice symmetry", "unfold surface", "volume two ways", "method"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "inversion-properties",
          name: "Circle Inversion",
          type: "method",
          subject: "geometry",
          latex: String.raw`OP \cdot OP^* = r^2, \qquad P^*Q^* = \frac{r^2 \cdot PQ}{OP \cdot OQ}`,
          description: String.raw`Inversion centred at $O$ with radius $r$ sends $P$ to the point $P^*$ on ray $OP$ with $OP \cdot OP^* = r^2$. It is conformal, so it preserves angles and tangency, and it trades lines for circles through $O$.`,
          keywords: ["inversion properties", "inverse point", "op op* = r^2", "line to circle", "conformal", "inversion distance formula", "circle preserving", "inversive geometry", "inversion"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "angle-chasing",
          name: "Angle Chasing",
          type: "method",
          subject: "geometry",
          latex: String.raw`\text{label an angle } \theta, \text{ then propagate it through the figure}`,
          description: String.raw`The default first attack on any figure. Assign $\theta$ to one unknown angle and push it through the four propagators — triangle sums, base angles of isosceles triangles (equal sides $\Rightarrow$ equal angles), parallel-line angle pairs, and inscribed-angle/cyclic-quad relations — until the target angle is expressed in $\theta$ and solved.`,
          keywords: ["angle chasing", "label angles", "theta", "propagate", "first attack", "base angles", "method"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "mass-points",
          name: "Mass Points",
          type: "method",
          subject: "geometry",
          latex: String.raw`m_B \cdot BD = m_C \cdot DC, \qquad m_D = m_B + m_C`,
          description: String.raw`Balance the triangle like a seesaw: assign masses inversely proportional to the segments a cevian creates; the cevian intersection ratios then read off directly ($AP : PD = m_D : m_A$). The fastest tool for "cevians divide the sides in given ratios, find a ratio" problems.`,
          keywords: ["mass points", "cevian ratios", "balance", "method", "lever"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "spiral-similarity",
          name: "Spiral Similarity",
          type: "method",
          subject: "geometry",
          latex: String.raw`AB \mapsto CD: \text{ center } X = \text{second intersection of } \odot(APC),\, \odot(BPD)`,
          description: String.raw`A rotation-plus-scaling carrying one segment to another. Its center lies on both circles through matched endpoint pairs (where $P = AC \cap BD$ or $AB \cap CD$). Explains "two circles + two lines" AIME configurations and computes cleanly with complex numbers: $z \mapsto a + k e^{i\theta}(z - a)$.`,
          keywords: ["spiral similarity", "rotation scaling", "similar triangles common vertex", "complex numbers", "method"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "homothety-monge",
          name: "Homothety & Monge's Theorem",
          type: "method",
          subject: "geometry",
          latex: String.raw`X \mapsto P + k(X-P);\ \ \text{three external similitude centers are collinear}`,
          description: String.raw`A homothety (dilation) about $P$ with ratio $k$ scales every figure by $k$ and maps each circle to a circle; two circles always admit an external (and usually internal) center of similitude where their common tangents cross. Monge: for three circles, the three external centers are collinear. Homothety centered at a tangency point is the standard move for tangent-circle configurations.`,
          keywords: ["homothety", "dilation", "similitude center", "monge", "external tangents", "method"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "ravi-substitution",
          name: "Ravi Substitution",
          type: "method",
          subject: "geometry",
          latex: String.raw`a = y + z, \quad b = z + x, \quad c = x + y \qquad (x, y, z > 0)`,
          description: String.raw`Sides of a triangle are exactly the numbers expressible this way — $x, y, z$ are the incircle tangent lengths ($x = s - a$, etc.). The substitution turns the triangle inequality into mere positivity, and simplifies Heron to $A = \sqrt{xyz(x+y+z)}$ — ideal for triangle inequalities and integer-sided triangle counts.`,
          keywords: ["ravi", "tangent length substitution", "triangle inequality free", "heron simplified", "method"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "barycentric-coordinates",
          name: "Barycentric Coordinates",
          type: "method",
          subject: "geometry",
          latex: String.raw`P = \alpha A + \beta B + \gamma C, \quad \alpha + \beta + \gamma = 1, \quad (\alpha : \beta : \gamma) = [PBC] : [PCA] : [PAB]`,
          description: String.raw`Write each point as a mass-weighted average of the triangle's vertices; the normalized weights are the signed sub-triangle area ratios. Standard centers are clean: centroid $(1:1:1)$, incenter $(a:b:c)$, circumcenter $\bigl(a^2(b^2+c^2-a^2):\cdots\bigr)$, orthocenter $(\tan A:\tan B:\tan C)$. Cevians and lines become linear equations, and collinearity/concurrence become $3\times 3$ determinants — a coordinate system tailored to the triangle, ideal when a configuration is drowning in ratios and named centers.`,
          keywords: ["barycentric coordinates", "areal coordinates", "area ratios", "mass points", "incenter circumcenter coordinates", "homogeneous coordinates", "method"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "coordinate-bash",
          name: "Coordinate Bashing",
          type: "method",
          subject: "geometry",
          latex: String.raw`\text{put the figure on axes, then finish with distance / shoelace / slopes}`,
          description: String.raw`When a synthetic attack stalls, drop the figure onto coordinates chosen to erase the algebra: a right angle at the origin, a side along the $x$-axis, a center or midpoint at the origin for symmetry. Then lengths, areas, collinearity, perpendicularity, and circle conditions all become computation — trading cleverness for reliability.`,
          keywords: ["coordinate bash", "place on axes", "analytic geometry", "brute force geometry", "smart origin", "method"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "auxiliary-lines",
          name: "Auxiliary Lines & Constructions",
          type: "method",
          subject: "geometry",
          latex: String.raw`\text{add the right segment: altitude, parallel, radius, or a reflected copy}`,
          description: String.raw`The decisive move in synthetic geometry is often a line not yet drawn. The standard repertoire: drop a perpendicular (height, distance), translate a diagonal to fuse two lengths, extend a cevian to meet a parallel (spawning similar triangles), join the center to a point of tangency (right angle), or reflect/rotate a point to straighten a bent path.`,
          keywords: ["auxiliary line", "construction", "drop perpendicular", "extend cevian", "add radius", "method"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "trig-bash",
          name: "Trig Bashing",
          type: "method",
          subject: "geometry",
          latex: String.raw`\text{name an angle } \theta \to \text{Law of Sines / Cosines} \to \text{solve for } \theta`,
          description: String.raw`When a figure resists synthetic attack but is rich in angles, assign a variable to one angle (or one side), then push everything through $\frac{a}{\sin A} = 2R$, $c^2 = a^2 + b^2 - 2ab\cos C$, and $[ABC] = \frac{1}{2}ab\sin C$ until a single equation in $\theta$ remains. Sum-to-product and the triangle-angle identities finish it.`,
          keywords: ["trig bash", "law of sines bash", "assign an angle", "trigonometric identity solve", "angle variable", "method"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "complex-bash",
          name: "Complex Number Bashing",
          type: "method",
          subject: "geometry",
          latex: String.raw`z \mapsto \omega z: \text{ rotation by } \arg\omega; \qquad \text{equilateral } \iff a^2 + b^2 + c^2 = ab + bc + ca`,
          description: String.raw`Put the figure on the complex plane: multiplying by $e^{i\theta}$ rotates about the origin (about $p$: $z \mapsto p + e^{i\theta}(z - p)$), and scaling and rotating are one operation. Regular $n$-gon vertices are the roots of unity $\omega^k$, the centroid is $\frac{a+b+c}{3}$, and the orientation-free equilateral condition above collapses many rotation configurations to one line of algebra.`,
          keywords: ["complex bash", "complex numbers geometry", "rotation by multiplication", "roots of unity polygon", "equilateral condition", "method"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "affine-transformations",
          name: "Affine Transformations",
          type: "method",
          subject: "geometry",
          latex: String.raw`\text{parallelism, midpoints, and area ratios are preserved} \qquad \text{ellipse} \xrightarrow{\text{scale}} \text{circle}, \;\; \text{triangle} \xrightarrow{\text{affine}} \text{equilateral}`,
          description: String.raw`A linear map plus a translation. It preserves collinearity, parallelism, ratios of lengths along a line, and midpoints, and multiplies every area by one constant, so ratios of areas survive. Angles, absolute lengths and circles do not.`,
          keywords: ["affine transformation", "shear", "scaling", "stretch", "ellipse to circle", "area ratio invariant", "map to equilateral", "wlog equilateral", "method"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "pole-polar",
          name: "Pole, Polar & Harmonic Division",
          type: "method",
          subject: "geometry",
          latex: String.raw`\text{polar of } P = \text{chord of contact } AB \qquad (X, Y;\, P, Q) = -1`,
          description: String.raw`The polar of a point $P$ with respect to a circle packages all of $P$'s tangent–secant data into one line: when $P$ is outside, its polar is the chord of contact $AB$ joining the two tangency points. Duality (La Hire): $P$ lies on the polar of $Q$ iff $Q$ lies on the polar of $P$ — so "these three points are collinear / these three lines concur" collapses to a one-line pole–polar statement. Every secant from $P$ meeting the circle at $X, Y$ and the polar at $Q$ yields the harmonic bundle $(X, Y; P, Q) = -1$, which is exactly what a tangents-and-secants figure produces, trivializing problems that would otherwise be pages of trig.`,
          keywords: ["pole polar", "polar line", "chord of contact", "harmonic division", "harmonic conjugate", "cross ratio", "la hire", "projective geometry", "method"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "directed-angles",
          name: "Directed Angles (mod 180°)",
          type: "method",
          subject: "geometry",
          latex: String.raw`\angle(\ell_1, \ell_2) \bmod 180^\circ \qquad A, B, C, D \text{ concyclic} \iff \angle(CA, CB) = \angle(DA, DB)`,
          description: String.raw`A directed angle $\angle(\ell_1, \ell_2)$ is the rotation carrying line $\ell_1$ to line $\ell_2$, read modulo $180^\circ$ (lines, not rays). This single convention erases configuration dependence: the concyclic test is always $\angle(CA, CB) = \angle(DA, DB)$, with no separate "equal vs. supplementary" branches for which side of the chord a point lands on. An angle-chase that would otherwise need a fresh diagram for every configuration becomes one computation valid for all of them. Trade-off: directed angles prove collinearity and concyclicity but carry no length information and no absolute sign, so they finish incidence problems, not metric ones.`,
          keywords: ["directed angles", "mod 180", "configuration independence", "concyclic test", "angle chasing", "supplementary cases", "method"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "phantom-point",
          name: "Phantom Point Method",
          type: "method",
          subject: "geometry",
          latex: String.raw`\text{define } X' \text{ with the wanted property, then prove } X' = X`,
          description: String.raw`To show a hard-to-pin point $X$ (a messy intersection) has some property — lies on a line, on a circle, at a tangency — reverse the construction: define a phantom point $X'$ that has the desired property by fiat, then prove $X' = X$. Coinciding two points is usually far easier than computing the ugly intersection directly. The standard closer: two circles (or a circle and a line) meet in at most two points, so if $X$ and $X'$ are both the second common point beyond a known one, they must be equal. It's the proof-writing twin of auxiliary constructions, aimed at concurrency, collinearity, and "prove the circle passes through this point."`,
          keywords: ["phantom point", "ghost point", "prove points coincide", "second intersection", "concurrency", "reverse reconstruction", "method"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "area-method",
          name: "Area Ratio from Base Ratios",
          type: "method",
          subject: "geometry",
          latex: String.raw`\frac{[ABD]}{[ACD]} = \frac{BD}{DC} \qquad \frac{[PBC]}{[ABC]} = \frac{PD}{AD}`,
          description: String.raw`Recast the whole configuration as (signed) areas: two triangles on a shared base have area ratio equal to the ratio of their apexes' distances, so every length ratio along a line is an area ratio and back again. Substituting lengths by the triangles that contain them lets bases and heights cancel dynamically — it behaves like mass points but keeps working for points outside the triangle and for parallel-line configurations, with no lever system to invent. Ceva (concurrency), Menelaus (collinearity), and "in what ratio does $X$ cut $YZ$?" all fall out of chaining a few shared-base ratios.`,
          keywords: ["area method", "area ratios", "signed area", "shared base ratio", "cevian ratio", "mass points alternative", "method"],
          importance: "medium",
          level: ["AMC12", "AIME", "Olympiad"]
        }
      ]
    },
    {
      title: "Algebra",
      formulas: [
        {
          id: "denesting-radicals",
          name: String.raw`Denesting $\sqrt{a \pm \sqrt{b}}$`,
          type: "method",
          subject: "algebra",
          latex: String.raw`\sqrt{a \pm \sqrt{b}} = \sqrt{\frac{a + \sqrt{a^2 - b}}{2}} \pm \sqrt{\frac{a - \sqrt{a^2 - b}}{2}}`,
          description: String.raw`Works cleanly when $a^2 - b$ is a perfect square. E.g. $\sqrt{3 + 2\sqrt2} = 1 + \sqrt2$ — guess $(\sqrt x + \sqrt y)^2$ and match.`,
          keywords: ["nested radical", "denest", "simplify square root", "denest a nested radical", "simplify sqrt of a plus sqrt b", "unnest radical"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "sqrt-approximation",
          name: "Approximating Square Roots",
          type: "method",
          subject: "algebra",
          latex: String.raw`\sqrt{a^2+b} \approx a + \frac{b}{2a}, \qquad \sqrt{a^2+b} \approx a + \cfrac{b}{2a + \cfrac{b}{2a}}, \qquad a + \frac{b}{2a+1} \le \sqrt{a^2+b} \le a + \frac{b}{2a}`,
          description: String.raw`Write the number as $a^2+b$ with $a$ the nearest integer below the root. Then $\sqrt{a^2+b}=a+\frac{b}{a+\sqrt{a^2+b}}$, and feeding the estimate back into itself gives successively better values: $a+\frac{b}{2a}$ to first order, then $a+\frac{b}{2a+b/(2a)}$, which is usually correct to four or five digits. The two one-step estimates $a+\frac{b}{2a+1}$ and $a+\frac{b}{2a}$ bracket the true value whenever $0 \le b \le 2a+1$.`,
          keywords: ["newton's method for roots", "approximate square root", "estimate a square root", "square root approximation", "sqrt estimate", "nearest integer to a square root", "babylonian method", "which is closer", "estimate a radical", "bounding a square root", "method"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "newtons-sums",
          name: "Newton's Sums",
          type: "method",
          subject: "algebra",
          latex: String.raw`p_k = e_1 p_{k-1} - e_2 p_{k-2} + \cdots + (-1)^{k-1} k\, e_k, \qquad p_1 = e_1, \qquad p_2 = e_1 p_1 - 2e_2, \qquad p_3 = e_1 p_2 - e_2 p_1 + 3e_3, \qquad p_4 = e_1 p_3 - e_2 p_2 + e_3 p_1 - 4e_4`,
          description: String.raw`Relates power sums $p_k = \sum r_i^k$ of a polynomial's roots to the elementary symmetric polynomials $e_i$ (from Vieta). E.g. $p_2 = e_1 p_1 - 2e_2$, $p_3 = e_1 p_2 - e_2 p_1 + 3e_3$.`,
          keywords: ["power sums", "sum of squares of roots", "sum of cubes of roots", "symmetric"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "symmetric-polynomial-strategies",
          name: "Fundamental Theorem of Symmetric Polynomials",
          type: "method",
          subject: "algebra",
          latex: String.raw`\text{every symmetric } f(r_1, \dots, r_n) \text{ is a polynomial in } e_1, \dots, e_n, \qquad \prod_{i=1}^{n} (a - r_i) = \frac{P(a)}{a_n}, \qquad \sum_{i=1}^{n} \frac{1}{a - r_i} = \frac{P'(a)}{P(a)}`,
          description: String.raw`If an expression in the roots is unchanged by permuting them, it is computable from the coefficients alone — you never have to find the roots. Vieta supplies $e_1, \dots, e_n$, Newton's sums convert those to power sums, and any product over the roots is read off by evaluating $P$ at a well-chosen point (including a complex one).`,
          keywords: ["fundamental theorem of symmetric polynomials", "symmetric polynomial", "symmetric function of the roots", "elementary symmetric polynomials", "complex number evaluation trick", "plug in a value", "evaluate the polynomial at", "product over the roots", "never find the roots", "expressions in the roots", "method"],
          importance: "medium",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "lagrange-interpolation",
          name: "Lagrange Interpolation",
          type: "method",
          subject: "algebra",
          latex: String.raw`P(x) = \sum_{i} y_i \prod_{j \ne i} \frac{x - x_j}{x_i - x_j}`,
          description: String.raw`The unique degree-$\le n{-}1$ polynomial through $n$ given points. Also: the finite-difference trick — a degree-$n$ polynomial has constant $n$-th differences.`,
          keywords: ["interpolation", "points determine polynomial", "finite differences", "lagrange polynomial", "polynomial through given points", "interpolating polynomial"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "root-transformations",
          name: "Transforming the Roots of a Polynomial",
          type: "method",
          subject: "algebra",
          latex: String.raw`\text{roots } r_i + k: P(x - k); \qquad \text{roots } kr_i: P\!\left(\tfrac{x}{k}\right); \qquad \text{roots } \tfrac{1}{r_i}: x^n P\!\left(\tfrac{1}{x}\right)`,
          description: String.raw`To build the polynomial whose roots are a function of the old roots, substitute the inverse function into $P$. Reversing the coefficients gives reciprocal roots; for squared roots, compute $P(\sqrt{x})P(-\sqrt{x})$ (or pair Vieta with Newton's sums).`,
          keywords: ["shift roots", "scale roots", "reciprocal roots", "reverse coefficients", "substitute"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "completing-the-square",
          name: "Completing the Square",
          type: "method",
          subject: "algebra",
          latex: String.raw`x^2 + bx + c = \left( x + \tfrac{b}{2} \right)^2 + c - \tfrac{b^2}{4}`,
          description: String.raw`Rewrite any quadratic as a perfect square plus a constant. This one move derives the quadratic formula, locates the vertex $\left( -\frac{b}{2}, \, c - \frac{b^2}{4} \right)$, proves a min or max without calculus, and turns a general circle $x^2 + y^2 + Dx + Ey + F = 0$ into center–radius form.`,
          keywords: ["completing the square", "perfect square", "vertex", "minimum", "circle center radius"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "forced-difference-of-squares",
          name: "Forcing a Difference of Squares",
          type: "method",
          subject: "algebra",
          latex: String.raw`X + Y = \underbrace{(X + Z + Y)}_{\text{perfect square}} - Z = (\square)^2 - (\square)^2`,
          description: String.raw`When an expression is one term short of a perfect square, add that term and subtract it again. The result is a difference of two squares, which always factors. This is the single move behind $x^4+x^2+1$, the Sophie Germain identity, and most "factor this quartic" problems.`,
          keywords: ["forcing a difference of squares", "add and subtract a term", "complete the square then factor", "x^4 + x^2 + 1", "factor a quartic", "creative factoring", "a^2 - b^2 trick", "make a perfect square", "method"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "largest-term-ratio",
          name: "Largest Term by the Consecutive Ratio",
          type: "method",
          subject: "algebra",
          latex: String.raw`\frac{a_{k+1}}{a_k} > 1 \text{ while climbing}, \quad < 1 \text{ after the peak}`,
          description: String.raw`To find where a sequence of positive terms peaks, do not evaluate them: form the ratio of consecutive terms and find where it crosses $1$. The terms increase while the ratio exceeds $1$ and decrease after, so the maximum sits at the last $k$ with $\frac{a_{k+1}}{a_k} \ge 1$. Binomial and factorial terms are the usual targets, because almost everything cancels in the ratio.`,
          keywords: ["largest term", "ratio of consecutive terms", "where the sequence peaks", "maximum term of a binomial expansion", "ratio test", "when does the ratio drop below 1"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "sfft",
          name: "Simon's Favorite Factoring Trick (SFFT)",
          type: "method",
          subject: "algebra",
          latex: String.raw`xy + ax + by + ab = (x + b)(y + a)`,
          description: String.raw`Add a constant to complete a product. Standard for solving $xy + ax + by = c$ over integers: factor and enumerate divisor pairs.`,
          keywords: ["sfft", "complete the rectangle", "integer solutions", "diophantine"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "telescoping",
          name: "Telescoping Sums",
          type: "method",
          subject: "algebra",
          latex: String.raw`\frac{1}{(x+a)(x+b)} = \frac{1}{b-a}\left( \frac{1}{x+a} - \frac{1}{x+b} \right) \implies \sum_{k=1}^{n} \frac{1}{k(k+1)} = 1 - \frac{1}{n+1}`,
          description: String.raw`Split each term with partial fractions, then let the sum collapse. A proper rational function with a factored denominator breaks uniquely into one piece per factor, and once a summand reads as $f(k) - f(k+1)$ every interior term cancels against its neighbour, leaving only the ends. The same decomposition is what pulls a closed form out of a rational generating function.`,
          keywords: ["telescope", "partial fractions", "collapse", "cancel", "decompose rational", "cover up", "generating function coefficients", "closed form from generating function", "method"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "finite-differences",
          name: "Finite Differences",
          type: "method",
          subject: "algebra",
          latex: String.raw`\Delta a_n = a_{n+1} - a_n; \qquad \deg P = k \iff \Delta^k P \text{ is a nonzero constant}`,
          description: String.raw`A degree-$k$ polynomial has constant $k$-th differences (and the constant is $k! \cdot$ leading coefficient). Given consecutive values $P(1), P(2), \dots$, build the difference table and extend it rightward to evaluate further values — no interpolation formula needed.`,
          keywords: ["difference table", "constant differences", "extend sequence", "polynomial degree"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "sos-method",
          name: "SOS Method (& uvw / pqr)",
          type: "method",
          subject: "algebra",
          latex: String.raw`\text{LHS} - \text{RHS} = S_a(b-c)^2 + S_b(c-a)^2 + S_c(a-b)^2 \ge 0`,
          description: String.raw`For a symmetric inequality in $a, b, c$, force the difference into sum-of-squares form $S_a(b-c)^2 + S_b(c-a)^2 + S_c(a-b)^2 \ge 0$; nonnegative coefficients finish it. Its partner, the $uvw$ (pqr) method, rewrites everything in $p=a+b+c$, $q=ab+bc+ca$, $r=abc$ and pushes the extremum to a boundary. Together they dispatch most 3-variable symmetric inequalities mechanically.`,
          keywords: ["sos method", "sum of squares method", "uvw method", "pqr method", "schur sos", "symmetric inequality", "S_a S_b S_c", "two variables equal", "boundary case", "method"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "smoothing-method",
          name: "Smoothing & Mixing Variables",
          type: "method",
          subject: "algebra",
          latex: String.raw`\text{fix } \textstyle\sum a_i,\; \text{replace } (a_i, a_j) \to \left(\tfrac{a_i+a_j}{2}, \tfrac{a_i+a_j}{2}\right) \text{ while the objective improves}`,
          description: String.raw`To extremize a symmetric quantity under a constraint (usually fixed sum), repeatedly nudge two variables toward each other — or toward a boundary — so the objective only moves one way; the extremum sits where all variables are equal (or at the boundary). This is what rigorously licenses "equality when all equal," turning a hand-wave into a proof. The systematic versions are mixing variables (MV) and the $n-1$ equal-variable (EV) method; Jensen/convexity is the smooth, one-step analogue when the function is convex.`,
          keywords: ["smoothing", "mixing variables", "MV method", "equal variable method", "EV method", "adjust two variables", "extremum symmetric", "equality all equal", "method"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "log-substitution",
          name: "Substituting for a Logarithm",
          type: "method",
          subject: "algebra",
          latex: String.raw`u = \log_b x \implies x = b^{\,u}, \qquad t = \log_a b \implies \log_b a = \frac{1}{t}`,
          description: String.raw`A log equation is usually an ordinary algebraic equation wearing a disguise. Name the repeated logarithm — $u = \log_b x$, or $t = \log_a b$ for a base-swap pair — and the problem turns into a polynomial or rational equation in that one variable. Solve it there, then convert back with $x = b^{\,u}$ and check every root against the original domain.`,
          keywords: ["log substitution", "substitute for a logarithm", "let u equal log x", "quadratic in log", "log equation", "disguised quadratic", "solve logarithmic equations", "convert back and check domain", "method"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "weierstrass-substitution",
          name: "Weierstrass Substitution",
          type: "method",
          subject: "algebra",
          latex: String.raw`t = \tan\tfrac{\theta}{2}: \quad \sin\theta = \frac{2t}{1 + t^2}, \quad \cos\theta = \frac{1 - t^2}{1 + t^2}, \quad \tan\theta = \frac{2t}{1 - t^2}`,
          description: String.raw`One substitution turns every trig function of $\theta$ into a rational function of $t = \tan\frac{\theta}{2}$, converting a trig equation into a polynomial one. The triple $(1 - t^2, \, 2t, \, 1 + t^2)$ is also a Pythagorean-triple generator.`,
          keywords: ["weierstrass substitution", "half angle t", "tan theta over 2", "rationalize trig", "pythagorean triple"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "abs-value-graphing",
          name: "Graphing Absolute Value Transformations",
          type: "method",
          subject: "algebra",
          latex: String.raw`f(|x|):\ \text{keep } x \ge 0,\ \text{mirror into } x < 0 \qquad |f(x)|:\ \text{reflect } y < 0 \text{ upward}`,
          description: String.raw`Do not solve nested absolute values case by case, build the picture. Bars around the input and bars around the output do two different things: $f(|x|)$ discards the left half of the graph and replaces it with a mirror of the right half, so the result is automatically even, while $|f(x)|$ keeps the domain alone and folds everything below the axis up over it. Apply them one layer at a time from the inside out, and read off intersections instead of solving.`,
          keywords: ["graphing absolute value", "absolute value transformations", "nested absolute value", "f(|x|)", "|f(x)|", "reflect below axis", "fold upward", "even symmetry", "count solutions graphically", "piecewise graph", "transform a graph", "method"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "trig-substitution",
          name: "Trigonometric Substitution",
          type: "method",
          subject: "algebra",
          latex: String.raw`\sqrt{a^2 - x^2}:\ x = a\sin\theta \qquad \sqrt{a^2 + x^2}:\ x = a\tan\theta \qquad \sqrt{x^2 - a^2}:\ x = a\sec\theta`,
          description: String.raw`Match the radical to the substitution that clears it, and a Pythagorean identity does the rest: $x = a\sin\theta$ turns $\sqrt{a^2-x^2}$ into $a\cos\theta$, $x = a\tan\theta$ turns $\sqrt{a^2+x^2}$ into $a\sec\theta$, and $x = a\sec\theta$ turns $\sqrt{x^2-a^2}$ into $a\tan\theta$; $x = a\cot\theta$ serves the second case when the answer wants a cotangent. Beyond radicals the same move handles three other shapes: iterations such as $x \mapsto 2x^2-1$ become angle doubling, symmetric conditions like $a+b+c=abc$ become an angle sum through $a = \tan A$, and the Weierstrass substitution $t = \tan\frac\theta2$ runs the whole thing backwards to rationalize a trigonometric expression.`,
          keywords: ["substitute cosine", "sqrt 1 minus x squared", "sqrt 1 plus x squared", "sqrt x squared minus 1", "x = a sin theta", "x = a tan theta", "x = a sec theta", "angle doubling", "triple angle 4x^3 - 3x", "tangent double angle", "a + b + c = abc tangent", "nested radicals", "chebyshev", "weierstrass substitution", "half angle radical", "method"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "functional-substitution",
          name: "Functional Equation Substitution",
          type: "method",
          subject: "algebra",
          latex: String.raw`\text{try } (0,0), \; (x, 0), \; (x, x), \; (x, -x), \; (x, 1) \text{ in order}`,
          description: String.raw`For an equation holding for all reals, plug in structured values: $(0,0)$ pins $f(0)$; $(x, 0)$ relates $f(x)$ to constants; $(x, x)$ and $(x, -x)$ produce doubling laws and parity. Cosine-flavored equations like $f(a+b) + f(a-b) = 2f(a)f(b)$ (2023 AMC 12B #22) yield to exactly this sequence.`,
          keywords: ["functional equation", "plug in zero", "substitution", "f(x+y)", "parity", "method"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "sp-substitution",
          name: "Symmetric Substitution",
          type: "method",
          subject: "algebra",
          latex: String.raw`s = x + y, \; p = xy: \qquad x^2 + y^2 = s^2 - 2p, \qquad x^3 + y^3 = s^3 - 3sp, \qquad (x - y)^2 = s^2 - 4p`,
          description: String.raw`Any symmetric system or expression in two variables collapses to the sum and product. Solve for $s$ and $p$, then recover $x, y$ as the roots of $t^2 - st + p = 0$ — Vieta run in reverse. For three variables the same game uses $e_1, e_2, e_3$ with Newton's sums.`,
          keywords: ["symmetric substitution", "sum and product", "x plus y xy", "collapse system", "s p", "method"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "normalization",
          name: "Normalization & Homogenization",
          type: "method",
          subject: "algebra",
          latex: String.raw`\text{homogeneous problem} \implies \text{WLOG set } a + b + c = 1 \text{ (or } abc = 1, \text{ or a side } = 1)`,
          description: String.raw`Two opposite moves for the same situation. An expression is homogeneous when scaling every variable by $t$ multiplies it by a fixed power of $t$, so only the ratios matter and you may fix one quantity for free: set $a+b+c=1$, or $abc=1$, or one length to $1$. Homogenizing is the reverse, used when you have a constraint instead: multiply the lower-degree terms by the constraint until every term has the same degree. With $a+b+c=1$, proving $a^2+b^2+c^2\ge\frac13$ becomes proving $a^2+b^2+c^2\ge\frac13(a+b+c)^2$, which now holds for all positive reals and is open to Cauchy, Muirhead and Schur.`,
          keywords: ["normalization", "homogenize", "wlog scale", "set sum to 1", "degree of freedom", "homogeneous inequality", "method"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "tangent-line-trick",
          name: "Tangent Line Trick",
          type: "method",
          subject: "algebra",
          latex: String.raw`f(x) \ge f(a) + f'(a)(x - a) \quad (f \text{ convex}), \qquad a = \tfrac{s}{n}`,
          description: String.raw`To prove a symmetric inequality $\sum f(x_i) \ge C$ under a constraint $\sum x_i = s$, bound $f$ below by its tangent line at the equality point $a = s/n$: for convex $f$, $f(x) \ge f(a) + f'(a)(x-a)$, and summing the linear right-hand sides collapses to a one-line bound. It works whenever equality holds at all-variables-equal; just verify the tangent bound holds across the domain (usually a $(x-a)^2 \ge 0$ factor).`,
          keywords: ["tangent line trick", "sos", "convex", "symmetric inequality", "equality case", "linear bound", "method"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "double-summation",
          name: "Double Sums (Swapping & Splitting)",
          type: "method",
          subject: "algebra",
          latex: String.raw`\sum_{i}\sum_{j} a_{ij} = \sum_{j}\sum_{i} a_{ij}, \qquad \sum_{i}\sum_{j} f(i)g(j) = \Big(\sum_i f(i)\Big)\Big(\sum_j g(j)\Big), \qquad \sum_{i=1}^{n}\sum_{j=i}^{n} a_{ij} = \sum_{j=1}^{n}\sum_{i=1}^{j} a_{ij}`,
          description: String.raw`A finite double sum is just a sum over a set of index pairs, so you may sweep that set in whichever order is convenient. Swapping the two summation signs, factoring a separable summand into a product of one-variable sums, and rewriting a triangular region's limits are the three moves that turn most intimidating double sums into routine ones.`,
          keywords: ["double sum", "double summation", "swap the order of summation", "interchange summation", "split a summation", "nested sums", "sum over pairs", "fubini for sums", "sum of i less than j", "triangular sum", "method"],
          importance: "medium",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "rationalizing",
          name: "Rationalizing & Conjugates",
          type: "method",
          subject: "algebra",
          latex: String.raw`\frac{1}{\sqrt{a} + \sqrt{b}} = \frac{\sqrt{a} - \sqrt{b}}{a - b}`,
          description: String.raw`Multiplying by the conjugate telescopes sums like $\sum \frac{1}{\sqrt{k} + \sqrt{k+1}} = \sum (\sqrt{k+1} - \sqrt{k})$. Conjugate pairs also make $(3+\sqrt5)^n + (3-\sqrt5)^n$ an integer — the key to fractional-part-of-surd-power problems.`,
          keywords: ["conjugate", "rationalize denominator", "telescoping radicals", "rationalize the denominator", "multiply by the conjugate", "rationalising surds"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        }
      ]
    },
    {
      title: "Number Theory",
      formulas: [
        {
          id: "recognition-numbers",
          name: "Numbers Worth Recognizing",
          type: "method",
          subject: "number-theory",
          latex: String.raw`1001 = 7 \cdot 11 \cdot 13, \qquad 999 = 3^3 \cdot 37, \qquad 1024 = 2^{10}, \qquad 1729 = 7 \cdot 13 \cdot 19`,
          description: String.raw`The "fake primes" — products of two primes that look prime: $91 = 7 \cdot 13$, $119 = 7 \cdot 17$, $133 = 7 \cdot 19$, $143 = 11 \cdot 13$, $187 = 11 \cdot 17$, $221 = 13 \cdot 17$, $247 = 13 \cdot 19$, $323 = 17 \cdot 19$. Also: $111 = 3 \cdot 37$, powers of 2 through $2^{10} = 1024 \approx 10^3$, $7! = 5040$, $10! = 3{,}628{,}800$, and the estimates $\sqrt2 \approx 1.414$, $\sqrt3 \approx 1.732$, $\sqrt5 \approx 2.236$, $\pi \approx 3.1416$.`,
          keywords: ["1001", "fake primes", "recognize factorizations", "powers of 2", "memorize constants", "1729", "sqrt approximations"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "squeeze-between-squares",
          name: "Squeezing Between Consecutive Powers",
          type: "method",
          subject: "number-theory",
          latex: String.raw`n^2 < N < (n+1)^2 \implies N \text{ is not a perfect square, and } \lfloor \sqrt{N} \rfloor = n`,
          description: String.raw`To show an expression is never a perfect square (or cube), trap it strictly between consecutive squares of a well-chosen $n$ — usually the obvious near-square-root, like $n^2 + n$ for a quartic. The same squeeze pins down integer parts of roots exactly.`,
          keywords: ["between consecutive squares", "not a perfect square", "bounding", "squeeze", "floor of sqrt", "method"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "vieta-jumping",
          name: "Vieta Jumping",
          type: "method",
          subject: "number-theory",
          latex: String.raw`x^2 - kbx + (b^2 - N) = 0 \text{ has roots } a, \; a' = kb - a = \frac{b^2 - N}{a}`,
          description: String.raw`For a symmetric Diophantine condition quadratic in each variable: fix the constant, view one variable as the unknown, and use Vieta to flip a solution $(a, b)$ to a smaller one $(b, kb - a)$. Take a minimal solution and jump — either you contradict minimality, or you land on a degenerate base case that reveals the constant. Infinite descent, run through quadratics.`,
          keywords: ["vieta jumping", "root flipping", "infinite descent", "minimal solution", "symmetric diophantine", "method"],
          importance: "lower",
          level: ["Olympiad"]
        },
        {
          id: "extended-euclidean-algorithm",
          name: "Extended Euclidean Algorithm",
          type: "method",
          subject: "number-theory",
          latex: String.raw`ax + by = \gcd(a, b), \qquad (x, y) = \big(y',\ x' - \lfloor a/b \rfloor\, y'\big) \text{ from } b\,x' + (a \bmod b)\,y' = \gcd(b, a \bmod b)`,
          description: String.raw`Runs the Euclidean algorithm while tracking Bézout coefficients, producing integers $x, y$ with $ax + by = \gcd(a, b)$ in the same number of steps. Back-substitute the division equations (or carry the coefficients with the recurrence above). Its main jobs: computing a modular inverse — if $\gcd(a, m) = 1$ then $ax + my = 1$ gives $a^{-1} \equiv x \pmod m$ — and solving linear Diophantine equations $ax + by = c$ by scaling the coefficients by $c/\gcd$.`,
          keywords: ["extended euclidean algorithm", "bezout coefficients", "modular inverse", "back substitution", "ax + by = gcd", "linear diophantine solution"],
          importance: "medium",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "hensel-lifting",
          name: "Hensel Lifting",
          type: "method",
          subject: "number-theory",
          latex: String.raw`f(a) \equiv 0 \!\!\pmod{p}, \; f'(a) \not\equiv 0 \!\!\pmod{p} \implies \text{unique lift mod } p^2`,
          description: String.raw`Write $x = a + pt$ and expand: $f(a + pt) \equiv f(a) + pt\,f'(a) \pmod{p^2}$, a linear congruence in $t$. Each simple root mod $p$ lifts to exactly one root mod $p^2$ (and onward to $p^3, \dots$). The standard tool for "divisible by $p^2$" power congruences.`,
          keywords: ["hensel", "lift mod p squared", "p squared divides", "linear congruence", "simple root", "lifting solutions mod p"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "lte",
          name: "Lifting the Exponent (LTE)",
          type: "method",
          subject: "number-theory",
          latex: String.raw`v_p(a^n - b^n) = v_p(a - b) + v_p(n), \qquad v_2(a^n - b^n) = v_2(a - b) + v_2(a + b) + v_2(n) - 1`,
          description: String.raw`For odd prime $p \mid a - b$ with $p \nmid a, b$. For $p = 2$ (with $4 \mid a - b$, or adjust): $v_2(a^n - b^n) = v_2(a-b) + v_2(a+b) + v_2(n) - 1$ for even $n$.`,
          keywords: ["lte", "valuation of difference of powers", "largest power dividing", "lifting the exponent lemma", "v_p of a^n minus b^n", "p-adic valuation of a difference"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "fermat-two-squares",
          name: "Fermat's Two-Square Theorem",
          type: "method",
          subject: "number-theory",
          latex: String.raw`p \equiv 1 \!\!\pmod 4 \iff p = a^2 + b^2 \quad (p \text{ an odd prime}), \qquad \text{and } a, b \text{ are unique up to order and sign}`,
          description: String.raw`An odd prime is a sum of two squares exactly when it is $1 \bmod 4$, and then in only one way. The uniqueness is what makes it a tool rather than a curiosity: it pins down the two squares, so any configuration built from a prime that is $1 \bmod 4$ is forced. The most common disguise is a right triangle whose hypotenuse is a given prime.`,
          keywords: ["brahmagupta fibonacci identity", "fermat two square theorem", "fermat's theorem on sums of two squares", "prime as a sum of two squares", "primes 1 mod 4", "p = a^2 + b^2", "prime hypotenuse", "unique representation as two squares", "method"],
          importance: "medium",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "gcd-substitution",
          name: "GCD Substitution",
          type: "method",
          subject: "number-theory",
          latex: String.raw`d = \gcd(a, b): \quad a = dx, \; b = dy, \; \gcd(x, y) = 1, \qquad \operatorname{lcm}(a, b) = dxy`,
          description: String.raw`The opening move on any gcd/lcm problem: factor out the gcd so the remaining parts $x, y$ are coprime. Every condition simplifies — $ab = d^2xy$, $a + b = d(x+y)$, $\frac{\operatorname{lcm}}{\gcd} = xy$ — and coprimality unlocks unique-factorization arguments on $x$ and $y$ separately.`,
          keywords: ["gcd substitution", "a = dx b = dy", "coprime parts", "factor out gcd", "gcd lcm system", "method"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AIME"]
        },
        {
          id: "choose-modulus",
          name: "Choosing the Right Modulus",
          type: "method",
          subject: "number-theory",
          latex: String.raw`\text{squares} \bmod 4 \in \{0, 1\}, \qquad \text{squares} \bmod 8 \in \{0, 1, 4\}, \qquad \text{cubes} \bmod 9 \in \{0, \pm 1\}`,
          description: String.raw`To kill an integer equation or force a case, reduce mod a modulus that collapses one side: $4$ or $8$ against squares, $9$ against cubes and digit sums, $10$ for last digits, $p$ to erase every term with a factor of $p$. If the two sides can't agree mod $m$, there are no solutions at all.`,
          keywords: ["choose modulus", "mod trick", "no integer solutions", "impossible equation", "reduce mod", "method"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "exponent-tracking",
          name: "Prime Exponent Tracking",
          type: "method",
          subject: "number-theory",
          latex: String.raw`\gcd \to \min(e_i, f_i), \quad \operatorname{lcm} \to \max(e_i, f_i), \quad \text{product} \to e_i + f_i, \quad \text{square} \to \text{all } e_i \text{ even}`,
          description: String.raw`Every divisibility, gcd, lcm, perfect-power, and divisor-count condition is secretly a statement about prime exponents, one prime at a time. Write each number as $\prod p^{e_i}$, translate the conditions into min / max / sum / parity constraints on the exponents, and solve prime by prime — the primes never interact, so a hard multi-number condition splits into independent tiny problems.`,
          keywords: ["exponent tracking", "prime factorization method", "min max exponents", "gcd lcm exponents", "perfect power parity", "method"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "bounding-diophantine",
          name: "Bounding \& Finite Check",
          type: "method",
          subject: "number-theory",
          latex: String.raw`\text{order the variables} \Rightarrow \text{the smallest is bounded} \Rightarrow \text{finite check}`,
          description: String.raw`For a symmetric equation in positive integers, order the variables. The smallest one is then squeezed: in $\frac{1}{x} + \frac{1}{y} + \frac{1}{z} = 1$, the largest term is at least $\frac{1}{3}$ of the total, forcing $x \le 3$. Each surviving value of $x$ reduces the problem by one variable, and the recursion terminates in a short finite check.`,
          keywords: ["bounding", "wlog ordering", "finitely many solutions", "smallest variable bound", "unit fractions", "finite check", "method"],
          importance: "medium",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "factor-pair-counting",
          name: "Solving $xy = N$ Style Equations",
          type: "method",
          subject: "number-theory",
          latex: String.raw`\#\{(x, y) \in \mathbb{Z}_{>0}^2 : xy = N\} = d(N)`,
          description: String.raw`Rearrange Diophantine equations into a product of factors equal to a constant (often via SFFT), then count divisor pairs — including negative ones when allowed.`,
          keywords: ["factor pairs", "divisor counting", "sfft applications", "count factor pairs", "factor pairs of n", "divisor pair counting"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Counting & Probability",
      formulas: [
        {
          id: "complementary-counting",
          name: "Complementary Counting",
          type: "method",
          subject: "counting",
          latex: String.raw`\#(\text{good}) = \#(\text{total}) - \#(\text{bad})`,
          description: String.raw`When "at least one" or a messy condition appears, count the opposite. The probability version: $P(\text{at least one}) = 1 - P(\text{none})$. The birthday problem is the standard case: the chance that $k$ uniform choices among $n$ options collide is $1 - \frac{n(n-1)\cdots(n-k+1)}{n^k}$, which passes one half at only $23$ people out of $365$ days.`,
          keywords: ["at least one", "complement", "opposite", "total minus bad", "birthday problem", "collision probability", "all distinct", "shared birthday", "at least one match", "method"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "pie",
          name: "Principle of Inclusion-Exclusion (PIE)",
          type: "method",
          subject: "counting",
          latex: String.raw`|A_1 \cup \cdots \cup A_n| = \sum |A_i| - \sum |A_i \cap A_j| + \sum |A_i \cap A_j \cap A_k| - \cdots`,
          description: String.raw`Two sets: $|A \cup B| = |A| + |B| - |A \cap B|$. Three sets: add singles, subtract pairs, add the triple.`,
          keywords: ["inclusion exclusion", "union", "overlap", "venn"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "states-recursion-prob",
          name: "Probability States, Markov Chains & First-Step Analysis",
          type: "method",
          subject: "counting",
          latex: String.raw`p_{\text{state}} = \sum_{\text{moves}} P(\text{move}) \cdot p_{\text{next state}}`,
          description: String.raw`Name a probability variable per state, write one equation per state by conditioning on the first step, and solve the linear system. Handles random walks, games to $n$ wins, and gambler's ruin ($P = \frac{a}{a+b}$ for a fair walk).`,
          keywords: ["markov", "markov chain", "random walk", "random walk on a graph", "state collapse", "recursive probability", "gambler's ruin", "first step", "expected steps to return", "absorbing state", "cube corner walk", "method"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "symmetry-probability",
          name: "Symmetry Arguments",
          type: "method",
          subject: "counting",
          latex: String.raw`\text{by symmetry every position is equally likely}`,
          description: String.raw`In a random arrangement, any particular position is equally likely to hold any particular item — ignore the reveal order. Many "conditional" setups collapse instantly under symmetry.`,
          keywords: ["by symmetry", "equally likely", "random order", "shortcut"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "double-counting",
          name: "Double Counting",
          type: "method",
          subject: "counting",
          latex: String.raw`\text{count one set two ways, then equate}`,
          description: String.raw`Count incidences by rows and by columns. E.g. in any tournament, $\sum \binom{w_i}{2}$ counts "dominated pairs" — comparing to $\binom{n}{3}$ counts cyclic triangles.`,
          keywords: ["count two ways", "incidence", "tournament", "rows columns", "committee counting"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "casework-method",
          name: "Casework",
          type: "method",
          subject: "counting",
          latex: String.raw`\#(\text{total}) = \#(\text{case } 1) + \#(\text{case } 2) + \cdots \quad (\text{disjoint and exhaustive})`,
          description: String.raw`Split on a decisive feature — the largest element, the leading digit, the position of the special object, a parity. The two failure modes are overlapping cases (double count) and missed cases (undercount); choose the splitting feature so each object lands in exactly one case. Switch to complementary counting when the cases explode.`,
          keywords: ["casework", "split into cases", "disjoint", "exhaustive", "organize the count", "method"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "constructive-counting",
          name: "Constructive Counting",
          type: "method",
          subject: "counting",
          latex: String.raw`\#(\text{objects}) = (\text{choices for step } 1) \times (\text{choices for step } 2) \times \cdots`,
          description: String.raw`Build the object one decision at a time and multiply the choice counts — valid only when every step has the same number of options regardless of earlier picks. Start with the most restricted slot (last digit of an even number, the seat of the picky person); if a step's count depends on history, split into cases or subtract overcounts. Divide at the end by symmetries you didn't intend to distinguish. Counting integers by digit rule is the same move applied position by position, which is why "how many numbers below $N$ have property P" is built rather than listed.`,
          keywords: ["constructive counting", "multiplication principle", "build step by step", "most restricted first", "overcount divide", "digit counting", "count numbers with a digit property", "no digit 7", "digit sum", "digit dp", "count by position", "how many numbers", "method"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "bijection-method",
          name: "Bijections",
          type: "method",
          subject: "counting",
          latex: String.raw`\text{hard set} \;\xleftrightarrow{\;1 : 1\;}\; \text{easy set} \implies \text{same count}`,
          description: String.raw`Recount the same objects in friendlier clothing: strictly increasing sequences $\leftrightarrow$ subsets, sums $\leftrightarrow$ stars-and-bars arrangements, paths $\leftrightarrow$ letter words, "at most" $\leftrightarrow$ complements via $k \leftrightarrow n - k$. If a clean formula counts the target, some bijection to a known family is usually hiding.`,
          keywords: ["bijection", "one to one correspondence", "recount", "transform the problem", "same count", "method"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "recursive-counting",
          name: "Recursive Counting",
          type: "method",
          subject: "counting",
          latex: String.raw`a_n = c_1 a_{n-1} + c_2 a_{n-2} + \cdots \quad (\text{classify by the final choice})`,
          description: String.raw`Classify arrangements by their last step or last block, express $a_n$ in terms of smaller cases, then compute forward from tiny $n$. The workhorse for strings avoiding patterns, tilings, and seatings; with several interacting constraints, track one sequence per state and update them together.`,
          keywords: ["recursion", "count by last step", "state counting", "build up", "strings avoiding pattern", "tiling recurrence", "tilings of a 1 by n strip", "no two consecutive ones", "fibonacci tiling", "method", "build up by last step"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "indicator-variables",
          name: "Indicator Variables & Linearity of Expectation",
          type: "method",
          subject: "counting",
          latex: String.raw`X = X_1 + X_2 + \cdots + X_n \implies E[X] = \sum_i P(\text{event } i \text{ happens})`,
          description: String.raw`To find an expected count, write it as a sum of $0/1$ indicators — one per potential occurrence — and add their probabilities. Linearity needs no independence whatsoever, which is the whole magic: dependent, overlapping events sum just as easily. Turns most "expected number of ..." problems into one-line computations.`,
          keywords: ["indicator variables", "linearity of expectation", "expected number", "no independence needed", "sum of probabilities", "method"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "invariants-coloring",
          name: "Invariants & Coloring Arguments",
          type: "method",
          subject: "counting",
          latex: String.raw`\text{invariant unchanged by every move} \ne \text{target} \Rightarrow \text{impossible}`,
          description: String.raw`To prove a process can never reach a state or a tiling can never exist, find a quantity every legal move preserves — a parity, a sum mod $n$, a checkerboard color count — and show start and target disagree on it. Monovariants (quantities that only increase or decrease) prove termination the same way.`,
          keywords: ["invariant", "coloring argument", "checkerboard", "parity argument", "impossible tiling", "monovariant", "method"],
          importance: "medium",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "generating-function-method",
          name: "Generating Functions",
          type: "method",
          subject: "counting",
          latex: String.raw`\frac{1}{1-x} = \sum_{n \ge 0} x^n, \qquad \frac{1}{(1-x)^k} = \sum_{n \ge 0} \binom{n+k-1}{k-1} x^n, \qquad [x^N]\prod_i f_i(x)`,
          description: String.raw`Encode each independent decision as a polynomial or series whose exponents are its possible values, multiply the factors, and read the coefficient of $x^N$. Dice sums use $(x + \cdots + x^6)^k$; coin and stamp combinations use $\prod \frac{1}{1 - x^{a_i}}$; bounded parts use truncated factors. The identity $\frac{1}{(1-x)^k} = \sum_n \binom{n+k-1}{k-1}x^n$ is stars and bars in disguise. Then extract: set $x = 1$ for a total, differentiate for a weighted sum, or apply a roots-of-unity filter for a residue class.`,
          keywords: ["generating function method", "generating function", "encode as polynomial", "coefficient extraction", "coefficient of x^n", "dice sums", "coin combinations", "stars and bars generating function", "exponential generating function", "encode choices", "method"],
          importance: "medium",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "extremal-principle",
          name: "The Extremal Principle",
          type: "method",
          subject: "counting",
          latex: String.raw`\text{take the extreme object (largest / smallest / closest)}`,
          description: String.raw`When you cannot build the object directly, look at the most extreme one that already exists and ask what it is unable to do. Take the longest path in a graph: it cannot be extended, so every neighbour of its endpoint must already lie on the path, and that one observation usually forces the structure you were asked to find. The same move against a smallest counterexample gives a contradiction instead, because producing a smaller one shows the assumed smallest was not smallest. Largest, smallest, closest, longest: each comes with something it provably cannot do, and that is the whole leverage.`,
          keywords: ["extremal principle", "largest smallest", "minimal counterexample", "closest pair", "consider the extreme", "well ordering", "method"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "probabilistic-method",
          name: "The Probabilistic Method",
          type: "method",
          subject: "counting",
          latex: String.raw`E[X] \ge c \implies \exists \text{ outcome with } X \ge c; \qquad P(\text{bad}) < 1 \implies \exists \text{ a good object}`,
          description: String.raw`Prove something exists by showing a random construction produces it with positive probability. Two forms: the first-moment argument — since some outcome is at least the average, $E[X] \ge c$ guarantees an outcome with $X \ge c$ (and one with $X \le c$); and the union-bound argument — if the total probability of all "bad" events is below $1$, a choice avoiding all of them must exist. It's linearity of expectation repurposed from computing to guaranteeing.`,
          keywords: ["probabilistic method", "first moment", "expectation existence", "union bound", "random construction", "exists better than average", "method"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "transfer-matrix-method",
          name: "Transfer Matrix Method",
          type: "method",
          subject: "counting",
          latex: String.raw`a_n = \mathbf{u}^{\top} M^{\,n} \mathbf{v}, \qquad M_{ij} = \#\{\text{allowed transitions state } i \to j\}`,
          description: String.raw`To count length-$n$ sequences (tilings, walks, strings) obeying a local adjacency rule, build a transfer matrix $M$ whose $(i,j)$ entry marks the allowed transitions state $i \to j$; the count is then an entry of $M^n$. Diagonalizing $M$ yields a closed form and the governing linear recurrence $\det(xI - M) = 0$ — the engine behind "count the tilings / no-two-adjacent / walks on a small graph" problems.`,
          keywords: ["transfer matrix", "matrix power counting", "adjacency matrix walks", "state transitions", "tilings", "linear recurrence from matrix", "M^n", "method"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        }
      ]
    }
  ]
});

window.MATH_SECTIONS.push({
  id: "tools-patterns",
  group: "tools",
  title: "Patterns",
  blurb: "Specific recurring problem formats with an intended solution you are expected to know on sight. Single-pile take-away games, minimising a sum of absolute values, cryptarithms, and their relatives, filed by the subject they belong to.",
  subsections: [
    {
      title: "Geometry",
      formulas: [
        {
          id: "reflection-shortest-path",
          name: "Reflection for Shortest Paths",
          type: "pattern",
          subject: "geometry",
          latex: String.raw`\min_{P \in \ell}\, (AP + PB) = A'B, \quad A' = \text{reflection of } A \text{ over } \ell`,
          description: String.raw`To minimize a broken path touching a line (or several), reflect an endpoint across the line and measure straight. Bounce problems (billiards, light rays, ant-on-a-box) unfold the same way — reflect the room instead of bending the path.`,
          keywords: ["reflection", "shortest path", "minimize distance", "billiard", "unfold", "method", "pattern"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "surface-shortest-path",
          name: "Shortest Path on a Surface (Unfold the Net)",
          type: "pattern",
          subject: "geometry",
          latex: String.raw`\text{box } a\le b\le c,\ \text{opposite corners}:\quad \min = \sqrt{(a+b)^2 + c^2}`,
          description: String.raw`A path forced to stay on a solid's surface is straightened by unfolding (developing) the surface into a plane — the shortest surface path becomes a straight segment, measured with the distance formula. A box unfolds several ways, so try each pairing and keep the smallest: for opposite corners of an $a\le b\le c$ box the minimum is $\sqrt{(a+b)^2+c^2}$. A cylinder unrolls into a rectangle (a helix becomes a straight line) and a cone into a circular sector. It is the 3D cousin of reflecting to straighten a wall-bouncing path.`,
          keywords: ["shortest path surface", "unfold", "net", "spider and fly", "ant on a box", "geodesic", "develop surface", "cylinder unroll", "cone sector", "shortest route on a box", "method", "pattern"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "rotation-trick",
          name: "The Rotation Trick",
          type: "pattern",
          subject: "geometry",
          latex: String.raw`\text{rotate } 60^\circ \text{ (equilateral) or } 90^\circ \text{ (square) about a vertex}`,
          description: String.raw`Given the distances from an interior point to the vertices of an equilateral triangle or square, rotate the figure about a vertex: one distance carries to a new position, creating an equilateral (or isosceles right) triangle from two of the distances — and a triangle whose sides are all three known lengths.`,
          keywords: ["rotation", "point inside square", "point inside equilateral", "distances to vertices", "method", "distances from a special point", "pattern"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "tangency-condition",
          name: "Unique Solution ⟹ Tangency",
          type: "pattern",
          subject: "geometry",
          latex: String.raw`\text{distance(center, line)} = r \qquad\text{or}\qquad \Delta = 0`,
          description: String.raw`When a system "has exactly one solution" and its pieces are a circle and a line (or two circles, or a curve and a line), uniqueness means tangency: set the distance from the center to the line equal to the radius, or set the discriminant of the combined equation to zero, and solve for the parameter.`,
          keywords: ["tangent", "unique solution", "discriminant zero", "distance equals radius", "exactly one intersection", "method", "pattern"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Algebra",
      formulas: [
        {
          id: "median-minimizes-abs",
          name: "Minimizing a Sum of $|x - a_i|$ (Median Trick)",
          type: "pattern",
          subject: "algebra",
          latex: String.raw`\sum_{i} |x - a_i| \text{ is minimized at } x = \operatorname{median}(a_1, \dots, a_n)`,
          description: String.raw`To minimize the total distance $\sum_i |x - a_i|$, place $x$ at the median of the $a_i$ (with an even count, anywhere between the two middle values ties for the minimum). The weighted sum $\sum_i w_i\,|x - a_i|$ is minimized at the weighted median — the $a_i$ at which the running weight, added in sorted order, first reaches half of $\sum w_i$. By contrast, squared distances $\sum (x - a_i)^2$ are minimized at the mean.`,
          keywords: ["median", "minimize sum of absolute values", "weighted median", "sum of distances", "minimize |x-a|", "L1 optimization", "pattern"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "infinite-nest",
          name: "Infinite Nested Expressions",
          type: "pattern",
          subject: "algebra",
          latex: String.raw`x = \sqrt{a + x} \implies x^2 - x - a = 0`,
          description: String.raw`For $\sqrt{a + \sqrt{a + \cdots}}$, continued fractions $a + \cfrac{1}{a + \cdots}$, or infinite power towers: name the expression $x$, use self-similarity, solve, and keep the valid root.`,
          keywords: ["self similar", "continued fraction", "power tower", "converge", "pattern"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "fx-pairing",
          name: "Pairing Symmetric Terms",
          type: "pattern",
          subject: "algebra",
          latex: String.raw`\text{pair } f(x) \text{ with } f(1-x) \;\text{(or } k \text{ with } n-k\text{)}, \quad \sum_{k=1}^{n-1} f\!\left(\tfrac{k}{n}\right) = \tfrac{n-1}{2}\Big(f(x)+f(1-x)\Big) \text{ when that pair is constant}`,
          description: String.raw`When a sum's arguments are symmetric about a centre, pair the first term with the last, the second with the second-last, and look at what one pair gives. The pair is often constant, and then the whole sum is just (number of pairs) times that constant, but not always: it frequently reduces to a trigonometric expression, or to something that only simplifies once every pair is added. The method is the pairing itself, and the pair's value is what you go and find out. Gauss's $1+2+\cdots+n$ is the arithmetic case.`,
          keywords: ["pairing", "f(x) + f(1-x)", "pair first with last", "symmetric sum", "gauss trick", "sum symmetric about a centre", "k with n-k", "method", "pattern"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "roots-of-unity-filter",
          name: "Roots of Unity Filter",
          type: "pattern",
          subject: "algebra",
          latex: String.raw`\sum_{k \equiv r \,(\mathrm{mod}\, n)} \binom{m}{k} = \frac{1}{n} \sum_{j=0}^{n-1} \omega^{-jr} (1 + \omega^j)^m, \qquad \binom{m}{0} + \binom{m}{3} + \binom{m}{6} + \cdots = \frac{2^m + 2\cos(m\pi/3)}{3}`,
          description: String.raw`Extracts every $n$-th coefficient of a generating function using $\omega = e^{2\pi i/n}$. E.g. $\binom{m}{0} + \binom{m}{3} + \binom{m}{6} + \cdots = \frac{2^m + 2\cos(m\pi/3)}{3}$.`,
          keywords: ["roots of unity filter", "filter", "every third", "generating function", "coefficient extraction", "extract coefficients", "pattern"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "palindromic-polynomials",
          name: "Palindromic Polynomials",
          type: "pattern",
          subject: "algebra",
          latex: String.raw`x^4 + ax^3 + bx^2 + ax + 1 = 0 \;\xrightarrow{\div x^2}\; y^2 + ay + (b - 2) = 0, \quad y = x + \tfrac{1}{x}`,
          description: String.raw`When coefficients read the same forwards and backwards, roots come in pairs $r, \frac{1}{r}$. Divide by the middle power of $x$ and substitute $y = x + \frac{1}{x}$ (using $x^2 + \frac{1}{x^2} = y^2 - 2$) to halve the degree.`,
          keywords: ["palindromic", "reciprocal polynomial", "x plus 1 over x", "symmetric coefficients", "pattern"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "shifted-polynomial-construction",
          name: "Building a Polynomial from Equal Values",
          type: "pattern",
          subject: "algebra",
          latex: String.raw`f(a_i) = k \;\forall i \implies f(x) = c\prod_i (x-a_i) + k, \qquad f(a_i) = g(a_i) \;\forall i \implies f(x) = \left(\prod_i (x-a_i)\right)Q(x) + g(x)`,
          description: String.raw`If a polynomial agrees with something simple at several points, subtract that thing. When $f$ takes the same value $k$ at $a_1,\dots,a_m$, the polynomial $f(x)-k$ vanishes at all of them, so it carries the factors $(x-a_i)$. The same works against any $g$: if $f(a_i) = g(a_i)$ for each $i$, then $f - g$ has those roots, so $f(x) = \left(\prod (x-a_i)\right)Q(x) + g(x)$.`,
          keywords: ["equal values", "same value at several points", "f(a) = f(b)", "subtract the constant", "shifted polynomial", "construct the polynomial", "known roots plus constant", "f(x) - k has roots", "reconstruct a polynomial", "f(a) = g(a)", "agrees with another polynomial", "subtract the interpolating polynomial", "f minus g has roots", "method", "pattern"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "periodic-sequences",
          type: "pattern",
          subject: "algebra",
          name: "Periodicity in Recursive Sequences",
          latex: String.raw`a_n \text{ eventually repeats with period } p:\ \ a_n = a_{\,n \bmod p}`,
          description: String.raw`Nonlinear recursions built from a fixed rational rule (like $t_n = \frac{5t_{n-1}+1}{25t_{n-2}}$ or $a_{n+1} = |a_n| - a_{n-1}$) are very often periodic: iterate by hand until the initial pair reappears, confirm one full extra cycle, then reduce the target index modulo the period. Watch for pre-periods (a few irregular terms before the cycle starts).`,
          keywords: ["periodic", "cycle", "recursion repeats", "index mod period", "iterate", "periodic recurrence", "period of recursion", "cyclic sequence", "lyness cycle", "mobius map order", "recurrence period", "tan addition recurrence", "1/(1-x)", "recursive", "todd equation", "period 8 recurrence", "x_n over x_{n-1}", "multiplicative periodic recurrence", "period 6 cycle", "pattern"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "piecewise-graph-counting",
          name: "Counting Solutions by Graphing",
          type: "pattern",
          subject: "algebra",
          latex: String.raw`\#\text{solutions of } f(x) = c \;=\; \#\text{crossings of } y = f(x) \text{ with } y = c`,
          description: String.raw`For nested absolute values and piecewise functions, don't solve — draw. Build the graph by transformations (each $|\cdot|$ folds the picture upward; each subtraction shifts it), then slide the horizontal line and count crossings as the parameter varies. Corner heights tell you exactly where the count jumps.`,
          keywords: ["absolute value graph", "count solutions", "W shape", "fold", "parameter", "method", "pattern"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Number Theory",
      formulas: [
        {
          id: "periodicity-mod-m",
          name: "Periodicity mod m (Cycle-Hunting)",
          type: "pattern",
          subject: "number-theory",
          latex: String.raw`a_n \bmod m \text{ is eventually periodic} \implies a_N \equiv a_{\,n_0 + ((N - n_0)\,\bmod\,T)} \pmod m`,
          description: String.raw`To find a far-out term's remainder — the last digits of $7^{2024}$, the $2015$th Fibonacci number mod $1000$, a recurrence's term mod $m$ — list the values mod $m$ until they repeat. There are only finitely many possible states (one residue for a power, or a fixed-length tuple of residues for a linear recurrence), so the sequence must cycle; find the period $T$ (and any pre-period), then reduce the index $N$ modulo $T$. Powers cycle with the multiplicative order of the base; linear recurrences cycle with the Pisano-style period of their state vector.`,
          keywords: ["periodicity mod m", "find the cycle", "remainder of a huge term", "last digits of a power", "pisano period", "eventually periodic", "reduce the exponent", "order", "cycle hunting", "method", "pattern"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "cryptarithms",
          name: "Cryptarithms (Alphametics)",
          type: "pattern",
          subject: "number-theory",
          latex: String.raw`\overline{TWO} + \overline{TWO} = \overline{FOUR}: \quad \text{distinct digits, leading digit} \ne 0, \text{ carry } 0\text{ or }1 \text{ per column}`,
          description: String.raw`The puzzles where letters stand for distinct digits ($\text{TWO}+\text{TWO}=\text{FOUR}$). Definitive attack: work column by column from the right, carrying only $0$ or $1$ in an addition; no leading letter may be $0$; each letter is a distinct digit $0$–$9$. The carry bounds pin the high letters immediately — a four-letter sum of two three-letter numbers forces the leading letter to be $1$ (two three-digit numbers total under $2000$) — and from there each column is a small constraint you propagate.`,
          keywords: ["cryptarithm", "alphametic", "verbal arithmetic", "letters are digits", "carry column by column", "distinct digits", "method", "pattern"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "digit-manipulation",
          name: "Digit Manipulation",
          type: "pattern",
          subject: "number-theory",
          latex: String.raw`\overline{ab} = 10a + b, \qquad \overline{ab} + \overline{ba} = 11(a + b), \qquad \overline{ab} - \overline{ba} = 9(a - b)`,
          description: String.raw`Write digit conditions as equations in the digits themselves ($\overline{abc} = 100a + 10b + c$), then solve the tiny Diophantine system with the bounds $1 \le a \le 9$, $0 \le b, c \le 9$. Reversal sums always factor through $11$; reversal differences through $9$.`,
          keywords: ["digits", "two digit number", "reversed digits", "10a plus b", "digit equation", "method", "pattern"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10"]
        }
      ]
    },
    {
      title: "Counting & Probability",
      formulas: [
        {
          id: "losing-positions",
          name: "Winning Positions in Single-Pile Take-Away Games (Nim)",
          type: "pattern",
          subject: "counting",
          latex: String.raw`W = \{\,n : \text{some move reaches } L\,\}, \qquad L = \{\,n : \text{every move reaches } W\,\}`,
          description: String.raw`Two players alternate removing tokens from one pile under a fixed set of legal move sizes, and you are asked who wins from a given $n$. A position is winning for the player to move exactly when some legal move hands the opponent a losing one, and losing exactly when every move hands them a winning one. Label upward from $0$ by backward induction; the $W$/$L$ pattern is eventually periodic with period related to the move sizes, so the answer for large $n$ is a congruence.`,
          keywords: ["game", "nim", "p positions", "winning strategy", "periodic pattern", "take away", "method", "game analysis", "pattern"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "gap-method",
          name: "The Gap Method (No Two Adjacent)",
          type: "pattern",
          subject: "counting",
          latex: String.raw`\text{seat the } n \text{ others first} \Rightarrow n+1 \text{ gaps} \Rightarrow \text{drop the } k \text{ special items into distinct gaps: } \binom{n+1}{k}`,
          description: String.raw`For "arrange so that certain items are never adjacent," place the unrestricted items first, then slot the restricted ones into the gaps between and around them — at most one per gap guarantees no two touch. With $n$ others there are $n+1$ gaps, so choosing $k$ of them gives $\binom{n+1}{k}$ (times $k!$ and the others' arrangements when everything is distinct). The same move handles "at least $d$ apart" (pre-place the required spaces) and, with a small fix for the wrap-around, circular seatings.`,
          keywords: ["gap method", "no two adjacent", "non-adjacent arrangement", "insert into gaps", "spacing constraint", "seat no two together", "at least one apart", "method", "pattern"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "counting-blocks",
          name: "Grouping Method",
          type: "pattern",
          subject: "counting",
          latex: String.raw`\text{glue a must-stay-together group into one block, then arrange inside it}`,
          description: String.raw`For "A and B must sit together": treat them as one unit ($(n-1)!$ arrangements) times orderings within the block ($2!$). Separations use gap-placement: arrange the rest, then choose gaps.`,
          keywords: ["together", "adjacent", "glue", "gap method", "not adjacent", "block method", "arrangements", "pattern"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "reflection-principle",
          name: "The Reflection Principle",
          type: "pattern",
          subject: "counting",
          latex: String.raw`\#\{\text{paths crossing the barrier}\} = \#\{\text{paths to the reflected endpoint}\}`,
          description: String.raw`To count lattice paths (or $\pm1$ walks) that must avoid a boundary, count the bad ones instead: reflect the portion of each barrier-touching path after its first touch, giving a bijection with unrestricted paths to a mirrored endpoint. Subtract. This one bijection generates the Catalan numbers and the ballot theorem.`,
          keywords: ["André's Reflection Principle", "reflection", "bad paths", "barrier", "bijection", "catalan proof", "ballot", "method", "Andre's reflection principle", "pattern"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "burnsides-lemma",
          name: "Burnside's Lemma",
          type: "pattern",
          subject: "counting",
          latex: String.raw`\#\text{orbits} = \frac{1}{|G|} \sum_{g \in G} |\mathrm{Fix}(g)|`,
          description: String.raw`Distinct colorings under symmetry = average number of colorings fixed by each symmetry. E.g. colorings of a cube's faces with $k$ colors: $\frac{k^6 + 3k^4 + 12k^3 + 8k^2}{24}$.`,
          keywords: ["burnside", "symmetry", "orbits", "colorings", "rotations", "necklace", "pattern"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "polya-enumeration",
          name: "Pólya Enumeration Theorem",
          type: "pattern",
          subject: "counting",
          latex: String.raw`\#\text{colorings up to } G = Z_G(m, m, \ldots) = \frac{1}{|G|}\sum_{g \in G} m^{\,c(g)}, \qquad Z_G = \frac{1}{|G|}\sum_{g} \prod_k t_k^{\,c_k(g)}`,
          description: String.raw`The refinement of Burnside's lemma that tracks how many of each color are used, via the group's cycle index $Z_G$ (average over group elements of $\prod t_k^{c_k}$, where $c_k$ counts $k$-cycles). Substituting $t_k = x^k + y^k + \cdots$ produces a generating function whose coefficients count colorings with a prescribed color distribution — necklaces with "3 red, 2 blue," and the like. Plain Burnside is $t_k \mapsto m$.`,
          keywords: ["polya enumeration", "cycle index", "burnside refinement", "necklace coloring", "color distribution", "counting up to symmetry", "pattern"],
          importance: "lowest",
          level: ["Olympiad"]
        },
        {
          id: "geometric-probability",
          name: "Geometric Probability",
          type: "pattern",
          subject: "counting",
          latex: String.raw`P = \dfrac{\text{favorable length / area / volume}}{\text{total length / area / volume}}`,
          description: String.raw`For continuous uniform choices, draw the region. Classic: two points in $[0,1]$ are within $d$ of each other with probability $1 - (1-d)^2$; "broken stick makes a triangle" is $\frac{1}{4}$.`,
          keywords: ["area probability", "continuous", "uniform random", "broken stick", "meet", "two people arrive", "waiting time problem", "unit square probability", "method", "pattern"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        }
      ]
    }
  ]
});
