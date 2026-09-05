// Extended detail-page write-ups for Geometry, keyed by formula id.
// Blocks separated by blank lines; lines starting with "## " render as headings.
window.MATH_DETAILS = window.MATH_DETAILS || {};

Object.assign(window.MATH_DETAILS, {

"pythagorean-theorem": String.raw`## Why it works
The cleanest proof is by similar triangles: the altitude to the hypotenuse splits the right triangle into two smaller triangles, each similar to the original. Writing the similarity ratios gives $a^2 = pc$ and $b^2 = qc$, and adding them yields $a^2 + b^2 = (p+q)c = c^2$. There are hundreds of other proofs — rearrangement proofs tile a square two ways.

## How to use it
Beyond the direct computation, watch for its converse (checking whether a triangle is right), and for chances to create right triangles by dropping altitudes. Many "find the length" problems are two Pythagorean equations in two unknowns after one well-chosen altitude.

## On contests
Ubiquitous at every level. Recognizing the standard triples $(3,4,5)$, $(5,12,13)$, $(7,24,25)$, $(8,15,17)$, $(9,40,41)$, $(20,21,29)$ — and their multiples — saves minutes: contest writers deliberately build problems around them. Also the source of the distance formula and every "hidden right angle" trick (angles in semicircles, tangent ⟂ radius).`,

"special-right-triangles": String.raw`## Why it works
The 45-45-90 ratio comes from cutting a square along its diagonal; the 30-60-90 ratio from cutting an equilateral triangle along an altitude. Both are one Pythagorean computation away from their parent figure.

## How to use it
Whenever an angle of $30^\circ$, $45^\circ$, $60^\circ$, $90^\circ$, $120^\circ$, or $135^\circ$ appears, look to drop a perpendicular that creates one of these triangles — that converts angle information into length information without trigonometry. A $120^\circ$ angle splits into a $30$-$60$-$90$ on the outside (the standard way to handle obtuse special angles).

## On contests
The default mechanism for AMC 10 geometry: hexagons decompose into 30-60-90s, squares' diagonals give 45-45-90s, and "fold the paper" problems almost always hide one. Know the ratios cold in both directions (side from hypotenuse and hypotenuse from side).`,

"altitude-hypotenuse": String.raw`## Key forms
- $h=\dfrac{ab}{c}$ — altitude from the legs and hypotenuse
- $h^2=pq$ — altitude is the geometric mean of the two hypotenuse pieces
- $a^2=pc$ — a leg is the geometric mean of its adjacent piece and the whole
- $b^2=qc$ — the other leg, likewise

## Why it works
The altitude to the hypotenuse creates two smaller right triangles, each sharing an acute angle with the original — so all three triangles are similar. Each relation ($h^2 = pq$, $a^2 = pc$, $b^2 = qc$, $h = \frac{ab}{c}$) is one proportion between a matched pair of sides; the last one is just two expressions for the area.

## How to use it
Given any two of the five lengths $a, b, h, p, q$ (or the hypotenuse $c = p + q$), the relations recover all the rest. The phrase "geometric mean" in a right-triangle problem is a direct pointer here: each squared length equals the product of the two segments it "touches."

## On contests
A fixture of AMC 10/12 and MATHCOUNTS: circles tangent to a hypotenuse, folded rectangles, and similar-triangle chains all reduce to these relations. It also underlies coordinate problems: the distance from the right-angle vertex to the hypotenuse is $\frac{ab}{c}$, no coordinates needed.`,

"triangle-inequality": String.raw`## Why it works
The shortest path between two points is the straight segment; going through a third point can only tie (when collinear) or lose. Formally, it is equivalent to the fact that each side is less than the sum of the other two.

## How to use it
Two standard modes: (1) counting problems — how many integer $c$ make a valid triangle with given $a, b$? Answer: $c$ ranges over the open interval $(|a-b|, a+b)$, which contains $2\min(a,b) - 1$ integers; (2) impossibility or extremal arguments — the degenerate (collinear) case is the boundary, so maxima/minima of geometric quantities often occur "just before" the triangle collapses.

## On contests
AMC loves "sticks of lengths $1..n$, how many triangles" and "which of these could be the sides." AIME uses it as a hidden constraint: after algebraic manipulation produces candidate side lengths, the triangle inequality eliminates spurious solutions — always check it before submitting.`,

"polygon-angle-sums": String.raw`## Why it works
Triangulate: any $n$-gon splits into $n - 2$ triangles from one vertex, each contributing $180^\circ$. The exterior-angle sum is $360^\circ$ because walking the perimeter turns you through one full revolution regardless of $n$.

## How to use it
For regular polygons, the exterior angle $\frac{360^\circ}{n}$ is usually the faster tool — e.g. "how many sides does a regular polygon with interior angle $156^\circ$ have?" becomes $n = \frac{360}{24} = 15$ instantly.

## On contests
MATHCOUNTS and early AMC use it directly; later problems embed it in tiling questions (which regular polygons fit around a point: angle divides $360^\circ$) and star-polygon angle chases.`,

"similar-figures-ratios": String.raw`## Key forms
- $\dfrac{\ell_1}{\ell_2}=k$ — lengths scale by $k$
- $\dfrac{A_1}{A_2}=k^2$ — areas scale by $k^2$
- $\dfrac{V_1}{V_2}=k^3$ — volumes scale by $k^3$

## Why it works
Similarity scales every length by the same factor $k$. Area is a product of two lengths, so it scales by $k^2$; volume by $k^3$. This holds for any figures, not just triangles — including curved ones.

## How to use it
Identify one matched pair of lengths to find $k$, then convert freely between length, area, and volume data. In triangle configurations, parallel lines are the main similarity generator: a line parallel to one side cuts off a similar triangle. For areas split by cevians and parallel lines, combine with the base-ratio principle.

## On contests
The single highest-frequency idea in AMC geometry. Classic patterns: a parallel cut creating area ratio $k^2 : (1 - k^2)$; nested similar triangles giving geometric series of areas; cones/pyramids cut by planes parallel to the base (volume ratio $k^3$ — the frustum leftovers are $1 - k^3$).`,

"midsegment-theorem": String.raw`## Why it works
The midsegment triangle is the image of the original under a homothety (scaling) of factor $-\tfrac{1}{2}$ centered at the centroid — or directly: the two halves of the sides force a triangle similar with ratio $\tfrac{1}{2}$, so the midsegment is parallel and half as long.

## How to use it
Connecting midpoints creates parallel lines and half-lengths for free — often the missing similar-triangle setup. The four small triangles formed by all three midsegments are congruent, each with $\tfrac{1}{4}$ of the area.

## On contests
Appears whenever midpoints do: medial triangles, Varignon parallelograms (the quadrilateral version), and "midpoint of a midpoint" iterations that generate geometric sequences with ratio $\tfrac{1}{2}$.`,

"centroid-division": String.raw`## Why it works
Two medians meet at a point dividing each 2:1 — provable by mass points (equal masses at all vertices), by coordinates (the centroid is the average of the vertices), or by the midsegment theorem applied inside the triangle.

## How to use it
Coordinates make the centroid trivial: $G = \frac{A + B + C}{3}$. The 2:1 ratio converts median lengths into distances from vertices/midpoints to $G$. The six small triangles formed by the three medians have equal areas — a frequent shortcut for area subdivision problems.

## On contests
AMC problems place a point at the centroid and ask for areas (answer: thirds and sixths), or give two medians' lines and ask for the third. On AIME, the vector identity $\vec{GA} + \vec{GB} + \vec{GC} = \vec{0}$ powers slicker solutions.`,

"cevian-area-ratio": String.raw`## Why it works
Triangles with the same apex and collinear bases share the same height, so their areas are proportional to their bases. That is the entire proof — but chained cleverly it computes almost any area ratio in a dissected triangle.

## How to use it
Mark every segment ratio the problem gives; each cevian converts a segment ratio into an area ratio. Work outside-in: express sub-triangle areas as fractions of the whole, one cevian at a time. When two cevians intersect, apply the principle twice (once in each direction) or switch to mass points.

## On contests
The engine behind "find the area of the middle region" problems on AMC 10/12. Combined with mass points or Routh's theorem it handles the harder AIME versions. If a problem gives ratios along the sides and asks for an area, this is the intended path.`,

"trapezoid-parallelogram-areas": String.raw`## Why it works
The trapezoid formula is the average of the parallel sides times the distance between them (two congruent trapezoids stack into a parallelogram). The diagonal formula $\frac{d_1 d_2}{2}$ for perpendicular diagonals comes from splitting into four right triangles.

## How to use it
For trapezoids, the diagonals create two similar triangles (ratio = ratio of the parallel sides) — this similarity, not the area formula, is usually the key step. In any quadrilateral with perpendicular diagonals (rhombus, kite, or irregular), the half-product formula applies.

## On contests
Trapezoid problems on AMC almost always exploit the diagonal similarity or drop two altitudes to make right triangles at the ends. Remember: the two triangles on the legs (between a diagonal and a leg) have equal areas.`,

"quadrilateral-diagonal-area": String.raw`## Why it works
Each diagonal splits the quadrilateral into triangles; summing $\frac{1}{2}(\text{segment products})\sin\theta$ over the four pieces around the intersection point collapses to $\frac{1}{2} d_1 d_2 \sin\theta$, since the segment pairs add back to the full diagonals.

## How to use it
Whenever a problem hands you both diagonals and the angle between them — or lets you compute them — this beats decomposition. It also gives the bound $A \le \frac{1}{2} d_1 d_2$ with equality iff the diagonals are perpendicular, useful for maximization problems.

## On contests
AIME quadrilateral problems often give diagonal lengths plus side conditions; computing $\sin\theta$ via the law of cosines in the four sub-triangles and then applying this formula is a standard finish.`,

"regular-polygon-area": String.raw`## Key forms
- $A=\tfrac12 ap=\tfrac12 nR^2\sin\tfrac{360^\circ}{n}$ — general (apothem times perimeter, or via $R$)
- $A_{\text{oct}}=2(1+\sqrt2)s^2$ — regular octagon from its side
- $A_{\text{dodec}}=3R^2$ — regular dodecagon inscribed in radius $R$

## Why it works
Cut the polygon into $n$ congruent isosceles triangles from the center; each has base $s$ and height $a$ (the apothem), so the total is $\frac{1}{2} n s a = \frac{1}{2} a p$. The circumradius form $\frac{1}{2} n R^2 \sin \frac{360^\circ}{n}$ uses the trig area formula on the same triangles.

## How to use it
Choose the form matching your data: apothem (inscribed circle) → $\frac{1}{2}ap$; circumradius → the sine form. For hexagons and equilateral triangles, skip straight to their memorized formulas.

## On contests
Common in MATHCOUNTS and AMC 10 for octagons and dodecagons. A regular dodecagon inscribed in radius $R$ has area exactly $3R^2$ — a cute value worth having seen once.`,

"clock-angle": String.raw`## Why it works
The minute hand moves $360^\circ$ per hour ($6^\circ$ per minute); the hour hand $30^\circ$ per hour ($0.5^\circ$ per minute). At $H{:}M$ the hour hand sits at $30H + 0.5M$ degrees and the minute hand at $6M$, and subtracting gives $|30H - 5.5M|$.

## How to use it
Take the result mod $360^\circ$ and replace $\theta$ by $360^\circ - \theta$ if it exceeds $180^\circ$. For "when are the hands aligned/opposite/perpendicular" questions, set $|30H - 5.5M|$ equal to $0$, $180$, or $90$ and solve for $M$ — the hands align every $\frac{720}{11}$ minutes.

## On contests
A MATHCOUNTS staple. The relative speed viewpoint ($5.5^\circ$ per minute) answers every variant: alignments per day (22), overlaps between given times, and mirror-image times.`,

"triangle-area-standard": String.raw`## Why it works
Two copies of any triangle fit together into a parallelogram with the same base and height, and the parallelogram's area is $bh$ by rearrangement into a rectangle.

## How to use it
The power move is choosing which side is the base: pick the one whose altitude you know or can compute. Equal bases + equal heights = equal areas even for very different-looking triangles — that observation alone solves many "compare the areas" problems. Also: same base, vertices on a line parallel to the base → equal areas (the "shearing" invariance).

## On contests
Shearing arguments (sliding a vertex along a parallel line) turn hard AMC area problems into easy ones. When coordinates are available, prefer the shoelace formula; when a circumcircle is involved, switch to $\frac{abc}{4R}$ or $\frac{1}{2}ab\sin C$.`,

"trig-area": String.raw`## Why it works
The height from the vertex between sides $a$ and $b$ is $b\sin C$ (or $a \sin C$ from the other end), so $\frac{1}{2} \cdot a \cdot b\sin C$ is just base × height in disguise.

## How to use it
Ideal when two sides and the included angle are known or when the angle is special ($30^\circ, 45^\circ, 60^\circ, 90^\circ, 120^\circ$ give clean sines). Because $\sin C = \sin(180^\circ - C)$, supplementary configurations give equal areas — the key to many "two triangles share an angle vertex" comparisons: their area ratio is the product of the ratios of the enclosing sides.

## On contests
The shared-angle ratio $\frac{[AXY]}{[ABC]} = \frac{AX}{AB}\cdot\frac{AY}{AC}$ is a top-five AMC/AIME area tool. Also the bridge to $A = \frac{abc}{4R}$ (substitute $\sin C = \frac{c}{2R}$) and to cyclic quadrilateral areas.`,

"herons-formula": String.raw`## Why it works
Start from $A = \frac{1}{2}ab\sin C$ and eliminate the angle using the law of cosines: $\cos C = \frac{a^2 + b^2 - c^2}{2ab}$, then $\sin^2 C = 1 - \cos^2 C$ factors as a difference of squares — twice — into the four semiperimeter terms.

## How to use it
Best when all three sides are known and nothing else is. If the sides are large or ugly, consider instead splitting the triangle with an altitude and solving two Pythagorean equations (the "Heron bash" alternative that often reveals the altitude is rational). For isosceles triangles, the direct altitude computation is faster.

## On contests
The 13-14-15 triangle (area 84) and its relatives (with integer sides and area, "Heronian" triangles) recur constantly: 13-14-15 splits into 5-12-13 and 9-12-15 along the altitude 12. Recognize the family: 10-17-21 (area 84), 9-10-17 (area 36), 3-25-26.`,

"inradius-area": String.raw`## Why it works
Connect the incenter to the three vertices: this cuts the triangle into three triangles with bases $a, b, c$ and common height $r$, so $A = \frac{r}{2}(a + b + c) = rs$. The same dissection works for any polygon with an incircle.

## How to use it
Almost always used as $r = \frac{A}{s}$ after computing $A$ by Heron or otherwise. Combined with $A = \frac{abc}{4R}$ it links $r$ and $R$: $\frac{r}{R} = \frac{4A^2}{s \cdot abc}$. For tangential polygons generally: $A = rs$ still holds with $s$ the semiperimeter.

## On contests
Every AMC/AIME incircle problem starts here. Pairs with the tangent-length facts ($s-a$ splits) to convert incircle data into side data and back.`,

"circumradius-area": String.raw`## Why it works
From $A = \frac{1}{2}ab \sin C$ and the extended law of sines $\sin C = \frac{c}{2R}$: substitute and get $A = \frac{abc}{4R}$.

## How to use it
Use $R = \frac{abc}{4A}$ to extract the circumradius after a Heron computation. In problems with both incircle and circumcircle, compute $A$ once and read off both radii ($r = A/s$, $R = abc/4A$).

## On contests
AIME's favorite way to hide $R$: give three sides, expect Heron + this. For the 13-14-15 triangle, $R = \frac{65}{8}$ — a value experienced solvers recognize on sight.`,

"right-triangle-inradius": String.raw`## Why it works
Tangent lengths from the right-angle vertex form an $r \times r$ square in the corner, so $c = (a - r) + (b - r)$, giving $r = \frac{a + b - c}{2}$. Thales gives $R = \frac{c}{2}$ since the hypotenuse subtends a right angle, hence is a diameter.

## How to use it
Fastest inradius in existence — no area needed. Note $r$ is always an integer for integer-sided right triangles with even $a + b - c$ (e.g. $r = 1, 2, 3$ for $(3,4,5), (5,12,13)\cdot$scaled, $(8,15,17)$).

## On contests
"Circle inscribed in a right triangle" is an AMC evergreen. The corner-square picture also answers "distance from the incenter to the right-angle vertex" ($r\sqrt{2}$) instantly.`,

"incircle-tangent-lengths": String.raw`## Key forms
- $AF=AE=s-a$ — the two tangents from $A$
- $BF=BD=s-b$ — the two tangents from $B$
- $CD=CE=s-c$ — the two tangents from $C$

## Why it works
The two tangent segments from any external point to a circle are equal. Label the three pairs $x, y, z$; then $y + z = a$, $x + z = b$, $x + y = c$, and solving gives $x = s - a$, etc. — the semiperimeter appears because summing all three equations gives $x + y + z = s$.

## How to use it
Whenever an incircle (or excircle) touch point appears, immediately write the tangent lengths in terms of $s$. For the excircle opposite $A$, the tangent length from $A$ is exactly $s$, and the touch point on $BC$ mirrors the incircle's touch point across the midpoint of $BC$.

## On contests
An AIME workhorse: problems give distances from vertices to touch points and expect you to reconstruct the sides ($a = (s-b) + (s-c)$). The right-angle special case $r = s - c$ is worth knowing separately.`,

"law-of-sines": String.raw`## Why it works
Inscribe the triangle in its circumcircle. Side $a$ subtends an inscribed angle $A$, and a diameter through one endpoint creates a right triangle where $\sin A = \frac{a}{2R}$. Since the argument works for each side, all three ratios equal $2R$.

## How to use it
Converts between angle data and side data: two angles + one side determines everything. The $2R$ form is the potent version — it turns circumcircle problems into trig and vice versa. Also encodes "larger side faces larger angle" precisely.

## On contests
AIME trig-geometry problems routinely require the extended form: given the circumradius and an angle, extract a chord length ($a = 2R\sin A$ is the chord-length formula in disguise). Also the standard tool for triangles sharing a circumcircle.`,

"law-of-cosines": String.raw`## Why it works
Drop an altitude and apply the Pythagorean theorem to both pieces, or expand $|\vec{a} - \vec{b}|^2 = |\vec{a}|^2 + |\vec{b}|^2 - 2\vec{a}\cdot\vec{b}$ — the cosine term is the dot product.

## How to use it
Two modes: forward (two sides + included angle → third side) and backward (three sides → any angle via $\cos C = \frac{a^2+b^2-c^2}{2ab}$). The sign of $a^2 + b^2 - c^2$ classifies the angle as acute/right/obtuse — often all a problem needs. In cyclic quadrilaterals, apply it to both triangles sharing a diagonal and use $\cos(180^\circ - \theta) = -\cos\theta$ to solve for the diagonal.

## On contests
The cyclic-quadrilateral diagonal trick is a top AIME pattern. Stewart's theorem is this applied twice; Ptolemy problems frequently fall to it directly. When a problem gives three sides and asks anything angular, this is the opener.`,

"law-cosines-60-120": String.raw`## Why it works
Plug $\cos 60^\circ = \frac{1}{2}$ or $\cos 120^\circ = -\frac{1}{2}$ into the law of cosines; the cross term becomes $\mp ab$.

## How to use it
Integer triangles with a $120^\circ$ angle satisfy $c^2 = a^2 + b^2 + ab$ — families like $(3,5,7)$ and $(7,8,13)$. A $120^\circ$ configuration also splits into $30$-$60$-$90$s via an external altitude. The $60^\circ$ version pairs with equilateral-triangle constructions (Fermat point setups: three $120^\circ$ angles around an interior point).

## On contests
$3$-$5$-$7$ is to $120^\circ$ what $3$-$4$-$5$ is to $90^\circ$ — AMC/AIME writers use it constantly. Any problem with three segments from a point at mutual $120^\circ$ angles is three applications of the $+ab$ form.`,

"angle-bisector-theorem": String.raw`## Why it works
Triangles $ABD$ and $ACD$ share the height from $A$, so their areas are as $BD : DC$; but computing the same areas as $\frac{1}{2} \cdot AB \cdot AD \sin(\frac{A}{2})$ and $\frac{1}{2} \cdot AC \cdot AD \sin(\frac{A}{2})$ gives ratio $AB : AC$. Equate. (Alternative: the classic parallel-line proof.)

## How to use it
Instantly converts "bisector" into segment ratios: $BD = \frac{ac}{b+c}$ and $DC = \frac{ab}{b+c}$ for bisector from $A$ in standard notation. The external bisector divides the opposite side externally in the same ratio. Combined with mass points, bisectors become weight assignments proportional to adjacent sides.

## On contests
Constant presence on AMC 10 through AIME. The incenter divides each bisector in ratio $\frac{b+c}{a}$ (vertex : side) — derivable by applying the theorem twice, and frequently the actual question.`,

"angle-bisector-length": String.raw`## Why it works
Apply Stewart's theorem with the segments from the bisector theorem ($m = \frac{ac}{b+c}$, $n = \frac{ab}{b+c}$), and the algebra collapses to $d^2 = ab - mn$ (sides $a, b$ adjacent to the bisected angle). Alternatively, use the trig form $d = \frac{2ab\cos(\frac{C}{2})}{a+b}$.

## How to use it
The $d^2 = (\text{product of adjacent sides}) - (\text{product of segments})$ phrasing is the memorable one. Use the trig form when the angle is special (e.g. bisecting $120^\circ$ gives $\cos 60^\circ = \frac{1}{2}$, so $d = \frac{ab}{a+b}$ — harmonic mean flavor).

## On contests
AIME problems give two sides and the bisector length and ask for the third side; the formula turns this into one quadratic. The $120^\circ$ special case appears in olympiad warm-ups.`,

"stewarts-theorem": String.raw`## Why it works
Apply the law of cosines to the two sub-triangles at the cevian's foot; the angles there are supplementary, so their cosines cancel when the equations are combined with weights $m$ and $n$. What remains is $a(d^2 + mn) = b^2 m + c^2 n$.

## How to use it
Any time a cevian's length is wanted and you know where its foot divides the opposite side: medians ($m = n$, giving Apollonius), bisectors (with the bisector theorem ratios), or arbitrary given splits. Set up with "a man and his dad put a bomb in the sink": $man + dad = bmb + cnc$.

## On contests
The reliable fallback when synthetic tricks fail — AIME cevian problems that resist mass points usually yield to Stewart plus algebra. Keep the convention straight: $m$ is adjacent to $c$, $n$ adjacent to $b$.`,

"cevas-theorem": String.raw`## Why it works
Each ratio equals a ratio of areas: $\frac{BD}{DC} = \frac{[ABD]}{[ACD]} = \frac{[PBD]}{[PCD]} = \frac{[ABP]}{[ACP]}$ (subtracting the smaller triangles). Multiplying the three such area ratios telescopes to 1. The converse holds too, which is the useful direction.

## How to use it
To prove three cevians concurrent, verify the product is 1; to find an unknown ratio given two others, solve the equation. The trig form $\frac{\sin\angle BAD}{\sin\angle DAC}\cdots = 1$ handles angle-specified cevians (isogonals, bisectors).

## On contests
Medians, bisectors, and altitudes all pass the test instantly (good sanity checks). AIME problems specify two cevian foot ratios and ask about the third — one line of Ceva. Pairs naturally with Menelaus (its collinearity twin) and mass points (its computational engine).`,

"menelaus-theorem": String.raw`## Why it works
Drop perpendiculars from $A$, $B$, $C$ to the transversal line; each ratio on the line equals a ratio of these perpendicular distances, and the product telescopes. The $-1$ (with directed lengths) records that a line crosses an odd number of side extensions.

## How to use it
Use unsigned ratios and the product $= 1$ in practice. The skill is choosing the triangle and the transversal: given a chain of intersection points, pick the triangle whose three sides (extended) the known line crosses. It computes ratios that Ceva cannot reach — points outside segments.

## On contests
The professional's tool for AIME problems where a line cuts across a cevian configuration ("find $\frac{AP}{PD}$" where $P$ is on a cevian). Often two applications of Menelaus replace a page of coordinate algebra. If you know mass points with negative masses, that is Menelaus in disguise.`,

"apollonius-theorem": String.raw`## Key forms
- $b^2+c^2=2\left(m_a^2+(a/2)^2\right)$ — the median-length relation
- $m_a^2+m_b^2+m_c^2=\tfrac34(a^2+b^2+c^2)$ — sum of the squared medians
- $m_a=\tfrac12\sqrt{2b^2+2c^2-a^2}$ — explicit median length

## Why it works
Stewart's theorem with $m = n = \frac{a}{2}$; or vectors: $|\vec{AB}|^2 + |\vec{AC}|^2 = 2|\vec{AM}|^2 + \frac{1}{2}|\vec{BC}|^2$ expands directly from $\vec{AM} = \frac{\vec{AB} + \vec{AC}}{2}$.

## How to use it
Memorize as $m_a = \frac{1}{2}\sqrt{2b^2 + 2c^2 - a^2}$. Summing over all three medians: $m_a^2 + m_b^2 + m_c^2 = \frac{3}{4}(a^2 + b^2 + c^2)$ — a clean identity problems test directly. Also inverts: sides from medians via $a^2 = \frac{2}{9}(2m_b^2 + 2m_c^2 - m_a^2)\cdot$... better to reconstruct via the $\frac{4}{3}$ area trick.

## On contests
"Two sides and the median to the third" is a recurring AMC/AIME setup — this formula solves it in one line. The parallelogram law is the same identity stated for the doubled median.`,

"median-triangle-area": String.raw`## Why it works
Translate median $\vec{m_b}$ to start where $\vec{m_a}$ ends: since $\vec{m_a} + \vec{m_b} + \vec{m_c} = \vec{0}$, the three medians close into a triangle. A short vector computation (or the 2:1 centroid dissection) shows its area is $\frac{3}{4}$ of the original — equivalently the original is $\frac{4}{3}$ of it.

## How to use it
Given three median lengths: form the triangle with those sides, compute its area (Heron), multiply by $\frac{4}{3}$. Medians $9, 12, 15$ or $3, 4, 5$-proportioned sets are gifts — the median triangle is right.

## On contests
Appears verbatim on AMC 10/12 every few years ("a triangle has medians 9, 12, 15; find its area" → 72). Faster and safer than solving for the sides.`,

"rouths-theorem": String.raw`## Why it works
Three applications of Menelaus (or mass points) compute where the cevians pairwise intersect; the shoelace-style ratio algebra assembles into the closed form. The formula's symmetry under cycling $x \to y \to z$ reflects the rotational symmetry of the construction.

## How to use it
$x, y, z$ are the ratios $\frac{BD}{DC}$ etc., taken cyclically. Check $x = y = z = 1$: numerator $(1-1)^2 = 0$ — medians are concurrent, inner triangle degenerates to the centroid. The famous case $x = y = z = 2$ gives $\frac{1}{7}$.

## On contests
The one-seventh triangle is folklore (AMC has asked it directly). For asymmetric ratios, Routh is a fast check on an answer obtained by mass points — or the entire solution if you trust the memorization. Derive-on-demand solvers should master the Menelaus route instead.`,

"vivianis-theorem": String.raw`## Why it works
Connect $P$ to the three vertices, splitting the equilateral triangle (side $s$) into three triangles with bases $s$ and heights $d_1, d_2, d_3$. Total area: $\frac{s}{2}(d_1 + d_2 + d_3) = \frac{s}{2}h$, so the distances sum to the altitude $h$.

## How to use it
Any "sum of distances from an interior point to the sides" question in an equilateral triangle is answered without locating the point. Extends to regular polygons (sum of distances to all sides is constant = $n \times$ apothem) and to equiangular polygons.

## On contests
Shows up as a quick AMC insight ("the sum is constant — compute it at the center or a vertex"). In coordinate form it underlies barycentric thinking: the three normalized distances are the barycentric coordinates.`,

"euler-line-ratio": String.raw`## Why it works
The homothety centered at the centroid $G$ with factor $-\frac{1}{2}$ sends each vertex to the opposite midpoint — hence sends the orthocenter $H$ (intersection of altitudes) to the circumcenter $O$ (intersection of perpendicular bisectors, which are the altitudes of the medial triangle). A homothety with factor $-\frac{1}{2}$ through $G$ means exactly $HG = 2GO$, all collinear.

## How to use it
Vector form is the practical one: with the circumcenter as origin, $\vec{OH} = \vec{OA} + \vec{OB} + \vec{OC}$ and $\vec{OG} = \frac{1}{3}(\vec{OA} + \vec{OB} + \vec{OC})$. Given any two of $O, G, H$ in coordinates, the third is immediate.

## On contests
AIME coordinate problems hand you two centers and ask for a distance — the ratio converts it. Also $OH^2 = R^2(1 - 8\cos A\cos B\cos C)$ and $OH^2 = 9R^2 - (a^2+b^2+c^2)$ for the ambitious.`,

"euler-distance-theorem": String.raw`## Why it works
The power of the incenter with respect to the circumcircle is $d^2 - R^2$ (negative, since $I$ is inside). A chord through $I$ and a vertex, intersected with the arc midpoint, has segment lengths computable via the incenter-excenter lemma ($\frac{r}{\sin(A/2)}$ and $2R\sin(A/2)$), whose product is $2Rr$. So $R^2 - d^2 = 2Rr$.

## How to use it
Direct plug-in when a problem gives two of $R, r, d$. Also the source of Euler's inequality $R \ge 2r$ (since $d^2 \ge 0$), with equality iff equilateral — the starting point of many inequality problems.

## On contests
AIME has asked for $OI$ distances outright. The incenter-excenter lemma used in its proof (arc midpoint is equidistant from $B$, $C$, $I$, and the excenter) is itself one of the highest-value AIME lemmas — learn both together.`,

"nine-point-circle": String.raw`## Why it works
The homothety centered at $H$ with factor $\frac{1}{2}$ sends the circumcircle to a circle through the midpoints of $HA$, $HB$, $HC$; a separate reflection argument shows the same circle passes through the side midpoints and the altitude feet. Its radius is half of $R$ by the homothety, and its center is the midpoint of $OH$.

## How to use it
Nine special points on one circle means enormous cyclic-quadrilateral leverage: any four of them are concyclic, unlocking inscribed-angle chases. The center $N$ being the midpoint of $OH$ places it on the Euler line, with $NG = \frac{1}{6}OH$.

## On contests
Occasionally an AIME problem is a nine-point circle fact wearing a costume — e.g. "the circle through the feet of the altitudes" or "through the midpoints" turning out to have radius $\frac{R}{2}$. Recognizing the disguise saves the day; the medial triangle's circumcircle IS the nine-point circle.`,

"carnots-theorem": String.raw`## Why it works
Each signed distance is $d_i = R\cos A_i$ (the central angle over side $a$ is $2A$, so the apothem-like distance is $R\cos A$). The identity $\cos A + \cos B + \cos C = 1 + \frac{r}{R}$ then gives $d_1 + d_2 + d_3 = R + r$.

## How to use it
Mostly as the geometric packaging of $\cos A + \cos B + \cos C = 1 + \frac{r}{R}$ — an identity worth knowing by itself (it bounds the cosine sum in $(1, \frac{3}{2}]$). Distances count negative when the circumcenter falls outside (obtuse triangles).

## On contests
Rare directly, but the underlying cosine identity appears in AIME trig problems ("given $\cos A + \cos B + \cos C$ and $R$, find $r$").`,

"simson-line": String.raw`## Why it works
Two of the feet form a cyclic quadrilateral with $P$ and a vertex (right angles subtend diameters), and angle chasing in the two circles shows the three feet make a straight angle exactly when $P$ lies on the circumcircle — and only then.

## How to use it
Recognize the configuration: perpendiculars dropped from one point to all three sides with collinear feet ⟺ the point is on the circumcircle. Bonus facts: the Simson line bisects segment $PH$ ($H$ = orthocenter), and rotating $P$ around the circle rotates the line at half speed.

## On contests
A niche but decisive AIME/olympiad tool — when a problem drops three perpendiculars from a circumcircle point, the collinearity is the intended miracle. Also useful in reverse to prove a point lies on the circumcircle.`,

"brocard-angle": String.raw`## Why it works
Requiring the cevians $AP, BP, CP$ to make equal angles $\omega$ with sides $AB, BC, CA$ respectively forces (via the law of sines in the three sub-triangles) the relation $\cot\omega = \cot A + \cot B + \cot C$; symmetry gives a second such point (the twin Brocard point) with the same angle.

## How to use it
Compute $\cot\omega$ from the angles, or from sides via $\cot\omega = \frac{a^2 + b^2 + c^2}{4A}$ (with $A$ the area) — the latter is the contest-usable form. The bound $\omega \le 30^\circ$ (equality iff equilateral) settles extremal questions.

## On contests
Appears in hard AIME/olympiad trig-geometry. The identity $\cot A\cot B + \cot B \cot C + \cot C \cot A = 1$ (valid in every triangle) is a companion fact that simplifies the algebra when it shows up.`,

"circle-basics": String.raw`## Why it works
All follow from the definition and limits of polygonal approximations; the sector formulas are just "fraction of the whole circle" statements: a central angle $\theta$ claims fraction $\frac{\theta}{2\pi}$ of both circumference and area.

## How to use it
Radian forms ($r\theta$, $\frac{1}{2}r^2\theta$) are cleaner when the angle is already in radians; degree problems use the fraction $\frac{\theta}{360^\circ}$. Circular segment (chord cut) area = sector − triangle = $\frac{1}{2}r^2(\theta - \sin\theta)$ — derive it, don't memorize it wrong.

## On contests
Shaded-region problems live here: decompose into sectors, triangles, and segments. The classic "goat grazing" and "overlapping circles" (lens area = two segments) both reduce to sector-minus-triangle.`,

"power-of-a-point": String.raw`## Why it works
In every configuration the two triangles formed are similar (equal inscribed angles subtending the same arc), and the equal products are the cross-multiplied similarity. The unified statement: for any line through $P$ meeting the circle at $X, Y$, the product $PX \cdot PY$ equals $|OP^2 - r^2|$, independent of the line.

## How to use it
Assign the power $p = OP^2 - r^2$ once, then every chord/secant/tangent through $P$ yields an equation. Tangent version $PT^2 = PA \cdot PB$ is the most-used. Also runs backwards (converse): equal products imply four concyclic points — a top-tier way to prove concyclicity.

## On contests
Arguably the most common AIME circle tool. Patterns: two chords crossing (find the fourth segment), tangent + secant from an external point, and radical-axis flavored problems (two circles: points with equal power to both lie on a line).`,

"chord-length": String.raw`## Why it works
Half the chord, the center, and the chord's midpoint form a right triangle: half-chord $= R\sin(\frac{\theta}{2})$ (angle version) or $= \sqrt{R^2 - d^2}$ (distance version). Double it.

## How to use it
Given any two of {radius, central angle, distance-to-center, chord length}, extract the rest. Equal chords ⟺ equal distances from the center ⟺ equal subtended arcs — the equivalences carry many problems by themselves.

## On contests
Intersecting-circles problems: the common chord is perpendicular to the center line, and both circles give a $\sqrt{R^2 - d^2}$ expression for its half-length — set equal, solve. That single pattern appears on AMC/AIME repeatedly.`,

"inscribed-angle-theorem": String.raw`## Why it works
For a chord with the center on one side: the central triangle is isosceles, and the exterior-angle identity gives central $= 2 \times$ inscribed. General positions decompose into sums/differences of that case via a diameter through the vertex.

## How to use it
Think in arcs: every inscribed angle is half its intercepted arc, so angle chasing becomes arc bookkeeping (arcs add around the circle to $360^\circ$). Corollaries to use fluently: same-arc angles are equal; opposite angles of cyclic quadrilaterals are supplementary; a right inscribed angle sits on a diameter (Thales, both directions).

## On contests
The foundation of all circle angle chasing at every level. AMC problems chain it 2–3 times; AIME problems hide it inside cyclic quadrilaterals you must first discover (via equal angles or the power-of-a-point converse).`,

"angle-chord-secant": String.raw`## Why it works
Both are exterior-angle arguments: draw the chord connecting the two intersection configurations and apply the inscribed angle theorem to each arc; interior crossing adds the two half-arcs, exterior vertex subtracts them.

## How to use it
Uniform recipe: vertex inside → half the sum of the two intercepted arcs; vertex on the circle → half the arc (inscribed/tangent-chord); vertex outside → half the difference. With arcs as unknowns, these plus "arcs sum to $360^\circ$" produce linear systems that crack most multi-angle circle diagrams.

## On contests
AMC 10/12 circle problems are frequently just this taxonomy plus one linear equation. Tangent-tangent angle = $180^\circ$ minus the near arc is the special case people forget — from an external point, the angle between two tangents plus the minor arc equals $180^\circ$.`,

"tangent-facts": String.raw`## Why it works
Perpendicularity: the tangent point is the closest point on the line to the center (radius is the minimal distance), forcing a right angle. Equal tangents: the two right triangles from the external point to the tangent points share a hypotenuse and a leg ($r$), hence are congruent. Tangent-chord: limit of the inscribed angle as one chord endpoint slides into the tangency point.

## How to use it
On any tangency, draw the radius to the touch point — the resulting right angle is nearly always the intended structure. Two tangents from a point create symmetric kites; incircle problems are equal-tangent bookkeeping ($s - a$ lengths).

## On contests
"Draw the radius to the tangent point" solves a remarkable fraction of AMC tangent-circle problems. Common setups: circle inscribed in a right angle (center on the bisector, distance $r$ from both sides), and belt/pulley configurations (tangent length $\sqrt{d^2 - (r_1 \pm r_2)^2}$).`,

"tangent-chord-angle": String.raw`## Why it works
Slide one endpoint of an inscribed angle along the circle until it reaches the vertex $T$: its chord becomes the tangent and the inscribed-angle theorem passes to the limit, so the tangent–chord angle equals half its intercepted arc — exactly like an inscribed angle. The equal inscribed angle standing on that same arc from the far side is the "alternate segment" statement.

## How to use it
Whenever a tangent meets a chord, immediately re-mark that angle as the inscribed angle in the far segment — this turns an awkward tangent angle into an ordinary triangle angle. The workhorse case: the tangent to a triangle's circumcircle at $A$ makes an angle with $AB$ equal to $\angle ACB$ (and with $AC$ equal to $\angle ABC$), which seeds most "tangent to the circumcircle" arguments.

## On contests
A staple of AMC/AIME circle geometry and the engine behind many olympiad circumcircle-tangent configurations. Paired with the inscribed-angle theorem and "arcs sum to $360^\circ$," it reduces tangent diagrams to linear angle-chases.`,

"two-tangents-angle": String.raw`## Why it works
Each radius is perpendicular to its tangent, so quadrilateral $PAOB$ has right angles at $A$ and $B$; since its four angles sum to $360^\circ$, $\angle APB + \angle AOB = 180^\circ$. Equivalently the exterior-vertex rule gives $\angle P = \tfrac{1}{2}(\text{far arc} - \text{near arc})$, and because the two arcs sum to $360^\circ$ that is $180^\circ - \angle AOB$.

## How to use it
Drop both radii to the tangent points: $PAOB$ splits along $OP$ into two congruent right triangles with legs $r$ and tangent length $\sqrt{OP^2 - r^2}$. One picture yields the angle ($\sin\tfrac{\angle P}{2} = r/OP$), the tangent length, and $PA = PB$ together — and $OP$ bisects $\angle APB$.

## On contests
The "two tangents from a point" figure runs from MATHCOUNTS through AIME. Keep the supplement handy — the external angle and the central angle add to $180^\circ$ — and remember the center sits on the bisector of $\angle APB$, which pins down the whole configuration.`,

"common-tangent-lengths": String.raw`## Key forms
- $t_{\text{ext}}=\sqrt{d^2-(r_1-r_2)^2}$ — external common tangent
- $t_{\text{int}}=\sqrt{d^2-(r_1+r_2)^2}$ — internal common tangent
- $t=2\sqrt{r_1r_2}$ — tangent between two circles resting on a line

## Why it works
Slide one radius along the tangent to form a right triangle whose legs are the tangent length and $r_1 - r_2$ (external) or $r_1 + r_2$ (internal), and whose hypotenuse is the center distance $d$. Pythagoras finishes.

## How to use it
Existence checkpoints come free: internal tangents exist iff $d \ge r_1 + r_2$ (circles separate); external iff $d \ge |r_1 - r_2|$. For two externally tangent circles, the external tangent between touch points has length $2\sqrt{r_1 r_2}$ — a beautiful special case that shows up on its own.

## On contests
The $2\sqrt{r_1 r_2}$ fact powers "chain of tangent circles between two lines/circles" problems (curvatures in geometric or arithmetic progression). AMC pulley/belt problems and AIME tangent-chain problems both start with these right triangles.`,

"descartes-circle-theorem": String.raw`## Why it works
A heavy but elementary computation with the tangency conditions (center distances equal sums/differences of radii) — or elegantly via inversion. The symmetric form in curvatures is the miracle; it is a quadratic in $k_4$, explaining the two solutions (inner and outer Soddy circles).

## How to use it
Solve the quadratic as $k_4 = k_1 + k_2 + k_3 \pm 2\sqrt{k_1k_2 + k_2k_3 + k_3k_1}$. Conventions: enclosing circle → negative curvature; straight line → curvature 0 (two lines + circle configurations become trivial). The two $\pm$ roots satisfy $k_4 + k_4' = 2(k_1+k_2+k_3)$ — handy for Apollonian gasket chains.

## On contests
AIME's favorite "four tangent circles" shortcut — problems that would take a page of center-distance algebra fall in three lines. Circles tangent to two parallel lines and each other: use curvature 0 twice.`,

"caseys-theorem": String.raw`## Why it works
Generalizes Ptolemy by replacing vertices with circles tangent to the host circle; each tangent length $t_{ij}$ plays the role of a side/diagonal. Provable by inversion centered on the host circle, which turns the statement into ordinary Ptolemy.

## How to use it
Degenerate circles (radius 0) are points, so mixed point/circle configurations work — e.g. three vertices of a triangle plus its incircle. The tangent lengths must be external tangents when the circles are on the same side (all internally or all externally tangent to the host).

## On contests
A specialist's weapon for hard AIME/olympiad problems: "circle tangent to two sides and the circumcircle" (mixtilinear-flavored) configurations sometimes collapse instantly. If Ptolemy almost applies but one 'vertex' is a circle, think Casey.`,

"butterfly-theorem": String.raw`## Why it works
Classic proofs project through the circle or drop perpendiculars from the two chord midlines and chase similar triangles; the underlying reason is the symmetry of the circle about the diameter through $M$ — the configuration's asymmetries cancel exactly at $M$.

## How to use it
Recognize the setup: a chord's midpoint, two other chords through it, and the connecting lines crossing the original chord. The conclusion $MX = MY$ usually converts into an equation between segment lengths that closes the problem.

## On contests
Occasional AIME cameo, more often olympiad. Worth knowing mostly for recognition speed — the configuration is unmistakable once seen (it draws an actual butterfly).`,

"cyclic-opposite-angles": String.raw`## Why it works
Each angle is an inscribed angle: $\angle A$ intercepts arc $BCD$ and $\angle C$ intercepts arc $DAB$; the two arcs together are the whole circle ($360^\circ$), so the angles sum to $180^\circ$. The converse holds by a short contradiction (extend to the circle).

## How to use it
As a test: to prove four points concyclic, show one pair of opposite angles is supplementary — or equivalently, show an exterior angle equals the opposite interior angle. Once cyclicity is established, every same-arc angle equality unlocks. Equal angles subtending a common segment from the same side is the other main test.

## On contests
"Discover the hidden cyclic quadrilateral" is the single most common hard-geometry theme on AIME. Train the reflex: whenever two equal angles or supplementary angles appear over a shared segment, circumscribe.`,

"ptolemys-theorem": String.raw`## Why it works
Construct a point $E$ on diagonal $AC$ with $\angle ABE = \angle DBC$; the two pairs of similar triangles this creates give $AE \cdot BD = AB \cdot CD$ and $EC \cdot BD = BC \cdot AD$, which sum to Ptolemy. It is also the equality case of Ptolemy's inequality, and the shadow of the identity $\sin(\alpha + \beta)\sin(\gamma+\beta)\dots$ — the addition formulas in disguise.

## How to use it
Cyclic quadrilateral + three known distances among sides/diagonals → the fourth. Degenerate uses are powerful: on an equilateral triangle's circumcircle it gives $PA = PB + PC$; on a square's, similar clean relations; applied to a rectangle it is the Pythagorean theorem.

## On contests
AIME regularly hands you a cyclic quadrilateral where law-of-cosines bashing is painful and Ptolemy is three lines. Also the standard derivation device for exact values like $\sin 18^\circ$ (via the regular pentagon).`,

"brahmaguptas-formula": String.raw`## Why it works
Follow Heron's derivation but for a cyclic quadrilateral: split along a diagonal, use $\frac{1}{2}(ab + cd)\sin B$ for the total area and the law of cosines on both triangles with $\cos D = -\cos B$; eliminate the diagonal and factor.

## How to use it
Only for cyclic quadrilaterals (it is the maximum possible area for given sides — any non-cyclic quadrilateral with those sides has less area, by Bretschneider). With $d = 0$ it degrades gracefully to Heron. Pair with Ptolemy and the law of cosines to extract diagonals after the area.

## On contests
AIME problems give four sides of a cyclic quadrilateral and ask for area (direct) or for the radius (combine with the diagonal formulas: $R = \frac{1}{4A}\sqrt{(ab+cd)(ac+bd)(ad+bc)}$ for the truly prepared).`,

"pitots-theorem": String.raw`## Why it works
Equal tangent lengths from each vertex: going around the quadrilateral, each side is a sum of two tangent lengths, and both opposite-side sums count all four tangent lengths exactly once. The converse (sums equal → incircle exists) also holds for convex quadrilaterals.

## How to use it
Checking $AB + CD = BC + AD$ instantly certifies or refutes an inscribed circle. In problems, it converts "tangential" into a linear equation among the sides — often all that is needed to find a missing side.

## On contests
AMC/AIME tangential-quadrilateral problems open with Pitot almost by definition. Combined with $A = rs$ (valid for tangential polygons), it yields the inradius from sides + area.`,

"ptolemys-inequality": String.raw`## Why it works
Inversion centered at one vertex maps the other three points to a configuration where the inequality becomes the triangle inequality; equality (collinearity after inversion) corresponds exactly to concyclicity in the right order before inversion.

## How to use it
As a bound: among all quadrilaterals with given vertices' pairwise distances role, the cyclic arrangement is extremal. Also as a concyclicity test through equality. In "minimize $PA \cdot BC + PB \cdot CA$"-type problems, this is the hidden structure.

## On contests
More olympiad than AIME, but the equality case doubles as a slick proof that a configuration is cyclic. Knowing that Ptolemy has an inequality version protects against misapplying the equality to non-cyclic quadrilaterals — a real trap.`,

"ptolemy-equilateral": String.raw`## Why it works
Apply Ptolemy to the cyclic quadrilateral $ABPC$ (with $P$ on arc $BC$): $PA \cdot BC = PB \cdot CA + PC \cdot AB$, and all three triangle sides are equal — divide them out.

## How to use it
Any point on the circumcircle arc of an equilateral triangle: the longest of the three distances equals the sum of the other two. Combined with the law of cosines ($\angle BPC = 120^\circ$ or $60^\circ$ angles at $P$), it typically determines all three distances from partial data.

## On contests
A recurring AIME/AMC gem — "point on the circumcircle with $PB = 5$, $PC = 3$, find $PA$" is a one-liner ($PA = 8$). The related interior-point fact (Pompeiu: for $P$ not on the circle, the distances form a triangle) is the companion.`,

"bretschneiders-formula": String.raw`## Why it works
Same split-and-eliminate as Brahmagupta, but without the cyclic condition the angle term $abcd\cos^2\left(\frac{A+C}{2}\right)$ survives. Cyclic ($A + C = 180^\circ$) kills it; that is the sanity check.

## How to use it
Rarely needed in full generality — its value is conceptual: for fixed sides, area is maximized exactly when the quadrilateral is cyclic. That extremal fact, not the formula, is what problems test.

## On contests
"Of all quadrilaterals with sides $a,b,c,d$, the cyclic one has the largest area" occasionally decides an AMC answer. Compute the max via Brahmagupta; cite Bretschneider only mentally.`,

"varignons-theorem": String.raw`## Why it works
Each midsegment of the two triangles formed by a diagonal is parallel to that diagonal and half its length — so both pairs of opposite midpoint-sides are parallel to a diagonal, making a parallelogram with sides $\frac{p}{2}, \frac{q}{2}$. The area halves because each corner cut removes a quarter-scale triangle summing to half.

## How to use it
Midpoints of a quadrilateral's sides → automatic parallelogram with sides parallel to the diagonals; it is a rectangle iff the diagonals are perpendicular, a rhombus iff they are equal. The segment joining the midpoints of the diagonals also passes through the parallelogram's center.

## On contests
AMC uses it straight ("midpoints form what figure? what area?"); AIME uses the parallel-to-diagonals property to transfer angle/length conditions from sides to diagonals.`,

"euler-quadrilateral": String.raw`## Why it works
Vector algebra: place the midpoint identity $\vec{m} = \frac{(\vec{a}+\vec{c}) - (\vec{b}+\vec{d})}{2}$ and expand all squared lengths; every cross term cancels, leaving the identity. The parallelogram law is the $m = 0$ case (diagonal midpoints coincide).

## How to use it
Relates the four sides, two diagonals, and the "midline" $m$ — given any five, find the sixth. Its main corollary: in any quadrilateral, $a^2+b^2+c^2+d^2 \ge p^2 + q^2$ with equality iff parallelogram.

## On contests
Occasional AIME appearances when a problem gives all four sides and one diagonal and asks about the other — check whether the midpoint segment is determinable; in parallelogram-adjacent configurations it vanishes and the computation collapses.`,

"distance-midpoint": String.raw`## Why it works
Distance is the Pythagorean theorem on the coordinate differences; the midpoint averages because the segment's endpoints contribute equally; slope measures rise over run, and perpendicularity multiplies slopes to $-1$ because the direction vectors $(1, m_1)$ and $(1, m_2)$ must have zero dot product.

## How to use it
The section formula $\frac{P_1 + kP_2}{1+k}$ generalizes the midpoint to any ratio $k:1$ — the workhorse for "point dividing a segment" and mass-point-flavored coordinate work. For perpendicular bisectors: all points equidistant from two given points (set the two distance expressions equal; the squares cancel).

## On contests
Foundation of every coordinate-bash. Fastest wins come from choosing the coordinate system: right angles at the origin, symmetry axes on the axes, and lattice-friendly placements.`,

"shoelace-formula": String.raw`## Why it works
Each term $\frac{1}{2}(x_i y_{i+1} - y_i x_{i+1})$ is the signed area of the triangle from the origin to edge $i$; summing over the boundary counts interior regions once with consistent sign and cancels everything outside. It is the discrete Green's theorem.

## How to use it
List vertices in order (either direction — the absolute value fixes sign), repeat the first vertex at the end, multiply down-right, subtract down-left. Degenerate but useful special case: triangle area $= \frac{1}{2}|x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)|$.

## On contests
The default area tool once coordinates exist. AIME polygons with lattice vertices: shoelace computes area, then Pick's theorem converts to lattice-point counts (or vice versa). Beware self-intersecting vertex orders — shoelace requires a simple polygon traversed in order.`,

"picks-theorem": String.raw`## Why it works
Both sides are additive when gluing polygons along a shared edge, and the formula checks on unit lattice triangles (area $\frac{1}{2}$, $I = 0$, $B = 3$) — induction on triangulations does the rest.

## How to use it
Three quantities, one equation: any two give the third. Boundary points on a segment between lattice points $(x_1,y_1), (x_2,y_2)$: $\gcd(|\Delta x|, |\Delta y|) + 1$ including endpoints — that gcd count is half of most Pick's problems.

## On contests
AMC/AIME lattice-polygon problems: shoelace for $A$, gcd sums for $B$, Pick's for $I$. Also runs in reverse: given interior/boundary counts, deduce the area without seeing the polygon.`,

"point-line-distance": String.raw`## Why it works
Project the vector from any point on the line to $(x_0, y_0)$ onto the unit normal $\frac{(A, B)}{\sqrt{A^2+B^2}}$; the projection length is exactly the formula. The numerator's sign tells which side of the line the point is on.

## How to use it
Normalize the line to $Ax + By + C = 0$ first. For parallel lines, the distance between them is $\frac{|C_1 - C_2|}{\sqrt{A^2+B^2}}$. Tangency conditions become "distance from center = radius" — the cleanest way to handle circles tangent to lines in coordinates.

## On contests
Standard for AMC coordinate problems involving tangent circles and for computing triangle altitudes when vertices are coordinatized (altitude = distance from vertex to opposite side's line).`,

"circle-equation": String.raw`## Why it works
A circle is the locus at distance $r$ from $(h, k)$; squaring the distance formula gives the equation. The general form $x^2 + y^2 + Dx + Ey + F = 0$ is the same thing pre-completion; it is a real circle iff $D^2 + E^2 - 4F > 0$.

## How to use it
Complete the square to read center and radius. A circle through three points: plug into the general form and solve the linear system in $D, E, F$ (linear — that's the advantage over center-radius form). Intersections with lines: substitute and watch the discriminant (tangency ⟺ zero discriminant).

## On contests
Subtracting two circles' general equations cancels the quadratic terms and yields the radical axis — the line through the intersection points. That one trick converts "find the common chord" AMC problems into arithmetic.`,

"british-flag-theorem": String.raw`## Why it works
Set up coordinates with the rectangle's sides on the axes: each squared distance expands into sums of squared coordinate differences, and both pairings select the same four terms. No planarity even required — it survives in 3D.

## How to use it
Any point + rectangle with three of the four corner-distances known → fourth distance immediately. Also usable in reverse as a rectangle detector, and in problems that only implicitly contain the rectangle (complete one from a right angle).

## On contests
An AMC favorite exactly because the naive approach (coordinates, four unknowns) is slow and the theorem is one line. Distances 3, 4, 5 to consecutive corners → $\sqrt{9 + 25 - 16} = 3\sqrt{2}$; recognize the pattern instantly.`,

"rotation-90": String.raw`## Why it works
Rotation is linear, so it is determined by where it sends $(1,0)$ and $(0,1)$: to $(\cos\theta, \sin\theta)$ and $(-\sin\theta, \cos\theta)$. Reading those as matrix columns gives the general formula; $\theta = 90^\circ$ gives $(x, y) \mapsto (-y, x)$.

## How to use it
For rotation about a non-origin point $P$: translate $P$ to the origin, rotate, translate back. In complex numbers the whole story is multiplication by $e^{i\theta}$ (about 0) or $z \mapsto p + e^{i\theta}(z - p)$ — usually less error-prone than the matrix.

## On contests
Squares in coordinate problems: the other two vertices come from $\pm 90^\circ$ rotations of one side — no slope-chasing. Also the algebraic engine behind the geometric rotation trick for distance problems.`,

"eulers-polyhedron-formula": String.raw`## Why it works
Flatten the polyhedron into a planar graph (remove one face, stretch); then induct: each added edge either creates a face or connects a new vertex, preserving $V - E + F$. The sphere's Euler characteristic 2 is what's really being computed.

## How to use it
Combine with incidence counting: if every face has $\ge 3$ edges then $2E \ge 3F$; if every vertex has degree $\ge 3$ then $2E \ge 3V$. These with $V - E + F = 2$ generate all the classic bounds ($E \le 3V - 6$, existence of a small-degree vertex, only five Platonic solids).

## On contests
AMC/AIME polyhedron problems ("faces are pentagons and hexagons, each vertex meets 3 faces...") are systems of equations: face-edge and vertex-edge double counts + Euler. Set up the three equations mechanically and solve.`,

"prism-pyramid-volumes": String.raw`## Why it works
Prisms/cylinders: Cavalieri — every cross-section parallel to the base is congruent, so volume is base area times height. The $\frac{1}{3}$: three congruent pyramids fill a cube (or integrate cross-section area $B\left(\frac{h - z}{h}\right)^2$), and Cavalieri extends to any base.

## How to use it
The height must be the perpendicular distance apex-to-base-plane — oblique solids have the same volume as right ones (Cavalieri again). For tetrahedra, any face can be the base; switching bases and equating volumes computes distances between skew parts.

## On contests
The "swap the base" trick is the standard AIME move: volume computed one way with an easy base, then re-read to extract an inaccessible height (distance from a point to a plane).`,

"sphere-formulas": String.raw`## Why it works
Archimedes: the sphere sits inside its circumscribing cylinder with exactly $\frac{2}{3}$ of its volume and matching lateral surface area (equal-height slices of sphere and cylinder-minus-cone have equal areas). Or: $V$ integrates cross-sectional disks; $SA$ is the derivative of $V$ with respect to $r$.

## How to use it
Spherical caps and zones occasionally matter: cap volume $\frac{\pi h^2(3r - h)}{3}$, cap/zone lateral area $2\pi r h$ (only the height matters — a striking fact). Derive from the full formulas when needed.

## On contests
Spheres inscribed in / circumscribed about solids: the whole game is finding the right cross-section, reducing 3D to a 2D incircle/circumcircle picture. Ratio problems (sphere in cylinder in cube...) reward remembering Archimedes' $\frac{2}{3}$.`,

"cone-formulas": String.raw`## Why it works
Unroll the lateral surface: it is a sector of radius $\ell$ (slant height) with arc length $2\pi r$, so its area is $\frac{1}{2}(\text{arc})(\text{radius}) = \pi r \ell$. The volume is the pyramid rule with a circular base.

## How to use it
The unrolled-sector view is itself the problem half the time: the sector angle is $\frac{2\pi r}{\ell}$, and shortest paths on the cone's surface become straight lines in the unrolled sector.

## On contests
"Ant walks around the cone" = unroll and draw a segment (AMC classic). "Cone formed by rolling up a sector" = match arc length to base circumference. Both directions of the same picture.`,

"frustum-volume": String.raw`## Why it works
A frustum is a big pyramid minus a similar small one; with similarity ratio $k$, subtract $\frac{1}{3}(h_{\text{big}} B_1 - h_{\text{small}} B_2)$ and eliminate the phantom heights using $k = \sqrt{B_2/B_1}$. The $\sqrt{B_1 B_2}$ term is the geometric-mean cross-section.

## How to use it
Often it's cleaner to restore the apex: extend the frustum to the full cone/pyramid, work with the two similar solids ($k$ and $k^3$ scaling), and subtract. Use the closed formula when the two base areas are the given data.

## On contests
Truncated-solid problems on AMC/AIME nearly always reward apex restoration — heights scale like linear dimensions, volumes like cubes, and the frustum is a difference of the two.`,

"space-diagonal": String.raw`## Why it works
Two Pythagorean steps: the base diagonal is $\sqrt{\ell^2 + w^2}$, then the vertical edge is perpendicular to the entire base plane, so the space diagonal closes a second right triangle.

## How to use it
The general principle — perpendicular contributions add in squares — extends to any orthogonal decomposition, e.g. distances in coordinatized boxes and "corner to far corner through the inside" questions. For the cube: $s\sqrt{3}$, and the angle between space diagonal and base is $\arctan\frac{1}{\sqrt2}$.

## On contests
Box problems (MATHCOUNTS through AMC) plus the reverse direction: given face diagonals $p, q, r$ of a box, the space diagonal is $\sqrt{\frac{p^2+q^2+r^2}{2}}$ — derive by summing the three face-diagonal equations.`,

"cross-product-area": String.raw`## Why it works
$|\vec u \times \vec v|$ is the parallelogram area (base times height, encoded in the sine of the included angle); the triangle halves it. The scalar triple product is the parallelepiped volume (base parallelogram area times projected height), and the tetrahedron is $\frac{1}{6}$ of the parallelepiped.

## How to use it
The triple product is a $3\times3$ determinant of the edge vectors — sign gives orientation, absolute value gives volume. Coplanarity test: triple product $= 0$. For a triangle in 3D, this replaces finding the plane and an altitude.

## On contests
AIME 3D problems (tetrahedra with given coordinates or edge relations) reduce to one determinant. Also computes distance from a point to a plane: volume $\times 3 \div$ base area.`,

"de-guas-theorem": String.raw`## Why it works
Coordinates: the right-corner tetrahedron has legs $a, b, c$ on the axes; each leg face has area $\frac{ab}{2}$-style, and the far face's area (via the cross product of two edge vectors) squares to exactly the sum of the three squared leg-face areas.

## How to use it
Applies only to a trirectangular corner (three mutually perpendicular edges at one vertex — a sliced box corner). Given the three perpendicular edges, all four face areas follow; given three face areas, the fourth is one square root away.

## On contests
Sliced-cube-corner problems on AMC/AIME. Companion facts for the same solid: volume $\frac{abc}{6}$, and $\frac{1}{h^2} = \frac{1}{a^2} + \frac{1}{b^2} + \frac{1}{c^2}$ for the altitude to the hypotenuse face — the 3D analogue of the right-triangle altitude relation.`,

"regular-tetrahedron": String.raw`## Key forms
- $h=\dfrac{s\sqrt6}{3}$ — height to a face
- $V=\dfrac{s^3\sqrt2}{12}$ — volume
- $SA=s^2\sqrt3$ — surface area (4 triangles)
- $R=\dfrac{s\sqrt6}{4},\ r=\dfrac{s\sqrt6}{12}$ — circumradius and inradius ($R=3r$)

## Why it works
The apex projects onto the base's centroid; the height computation is one Pythagorean step using the centroid-to-vertex distance $\frac{s\sqrt{3}}{3}$. Volume follows from $\frac{1}{3}Bh$. The octahedron = two square pyramids, or equivalently a tetrahedron of edge $2s$ minus four corner tetrahedra of edge $s$ — whence the exact 4:1 volume ratio.

## How to use it
Embed in a cube when possible: alternating vertices of a cube of edge $e$ form a regular tetrahedron of edge $e\sqrt2$ with volume $\frac{e^3}{3}$ — most regular-tetrahedron facts drop out of this picture (e.g. the $\arccos\frac{1}{3}$ dihedral angle, circumradius $\frac{s\sqrt6}{4}$).

## On contests
AMC/AIME regular-tetrahedron and octahedron problems are cube-embedding exercises in disguise. Also: regular octahedron = dual of the cube (face centers), which handles midpoint/center configurations.`,

"equilateral-triangle-facts": String.raw`## Why it works
All four quantities come from the 30-60-90 half-triangle: height $\frac{s\sqrt3}{2}$, and the centroid (= circumcenter = incenter) divides the height 2:1, giving $R = \frac{2}{3}h$ and $r = \frac{1}{3}h$.

## How to use it
Every equilateral configuration reduces to these; know them without derivation. The coincidence of all centers means symmetric arguments (rotate $120^\circ$) are always available.

## On contests
Constant use. Also worth caching: an equilateral triangle inscribed in a circle of radius $R$ has side $R\sqrt{3}$, and one circumscribed about a circle of radius $r$ has side $2r\sqrt{3}$ — consistent with $R = 2r$ for the same triangle.`,

"regular-hexagon-area": String.raw`## Why it works
Center-to-vertex segments cut it into 6 equilateral triangles of side $s$, so the area is $6 \times \frac{s^2\sqrt3}{4}$.

## How to use it
The hexagon is six equilateral triangles — nearly every hexagon problem (diagonals, sub-regions, midpoint figures) should be recast in that lattice. Long diagonal $2s$, short diagonal $s\sqrt3$, apothem $\frac{s\sqrt3}{2}$.

## On contests
Shaded sub-region problems in hexagons: count equilateral sub-triangles (or 30-60-90 halves). Hexagonal tilings and "hexagon with alternating sides" (equiangular hexagons embed in equilateral triangles — clip three corners) are the advanced variants.`,

"15-75-90-triangle": String.raw`## Why it works
From $\sin 15^\circ = \frac{\sqrt6 - \sqrt2}{4}$ and $\cos 15^\circ = \frac{\sqrt6 + \sqrt2}{4}$ (angle subtraction $45^\circ - 30^\circ$), scale the hypotenuse to 4.

## How to use it
Also worth caching: $\tan 15^\circ = 2 - \sqrt3$, $\tan 75^\circ = 2 + \sqrt3$, and the altitude-to-hypotenuse of the 15-75-90 right triangle equals one quarter of the hypotenuse (a lovely fact: $\sin 15^\circ \cos 15^\circ = \frac{1}{4}$).

## On contests
$15^\circ$ and $75^\circ$ appear in AMC 12/AIME problems built on square-plus-equilateral-triangle configurations (which naturally create $15^\circ$ angles). The quarter-hypotenuse altitude fact alone has decided problems.`,

"golden-ratio-pentagon": String.raw`## Why it works
A diagonal and a side of a regular pentagon form a 36-72-72 isosceles triangle whose bisected base angle reproduces a similar triangle — the self-similarity forces $\frac{d}{s} = \frac{s}{d - s}$, i.e. $\varphi^2 = \varphi + 1$.

## How to use it
$\varphi$ satisfies $\varphi^2 = \varphi + 1$; reduce all higher powers with it ($\varphi^n = F_n\varphi + F_{n-1}$ with Fibonacci numbers). Exact values to store: $\cos 36^\circ = \frac{1+\sqrt5}{4} = \frac{\varphi}{2}$ and $\sin 18^\circ = \frac{\sqrt5 - 1}{4} = \frac{\varphi - 1}{2}$.

## On contests
Pentagon/pentagram lengths, $\cos 36^\circ$ evaluations, and golden-gnomon dissections all appear on AMC 12/AIME. Diagonals of the unit pentagon have length $\varphi$; the pentagram's inner pentagon has side $\varphi^{-2}$.`,

"inscribed-square": String.raw`## Why it works
The triangle above the square is similar to the original (parallel base), with height $h - x$ and base scaled by the same factor: $\frac{x}{a} = \frac{h - x}{h}$. Solve for $x$.

## How to use it
Works for any triangle with the square's base on any side — use that side's length and its altitude. For a right triangle with the square in the right angle (two sides on the legs $a, b$): $x = \frac{ab}{a+b}$ by the same similarity idea.

## On contests
MATHCOUNTS/AMC 10 standard. The two right-triangle variants (square on hypotenuse vs. square in the corner) are deliberately paired in problems — keep the two formulas distinct.`,

"mass-points": String.raw`## Why it works
It is the physics of levers: masses $m_B$ at $B$ and $m_C$ at $C$ balance at the point dividing $BC$ in ratio $m_C : m_B$ (inverse to the masses). Concurrency of cevians corresponds to a consistent assignment of masses; the algebra is secretly barycentric coordinates.

## How to use it
Recipe: (1) use the given ratios on the sides to assign masses to vertices (make them consistent — scale as needed); (2) a cevian foot carries the sum of its endpoints' masses; (3) ratios along a cevian read off as (mass at far end) : (mass at near end). For a transversal cutting cevians (Menelaus territory), use "split masses": give a vertex different masses for different sides.

## On contests
The speed tool for AMC/AIME "cevians divide sides in ratios, find area/segment ratio" problems — 30 seconds versus five minutes of coordinates. Practice the two-cevian intersection until automatic; add area ratios via the cevian-area principle to finish.`,

"reflection-shortest-path": String.raw`## Why it works
Reflecting $A$ across the line $\ell$ preserves distances from points of $\ell$: $AP = A'P$ for $P \in \ell$. So minimizing $AP + PB$ is minimizing $A'P + PB$, whose minimum is the straight segment $A'B$ — achieved where that segment crosses $\ell$ (and the equal-angle "bounce" law falls out for free).

## How to use it
One line: reflect one endpoint. Two lines (bounce off both): reflect twice — $A$ over the first, $B$ over the second, connect. Box/billiard surfaces: unfold the room repeatedly; straight lines in the unfolded picture are bouncing paths in the original. On solids (ant on a box/cone), unroll the surface flat and connect with a segment.

## On contests
Everywhere from MATHCOUNTS ("shortest path touching a wall") to AIME (light bouncing in mirrored corridors, minimal perimeter inscribed triangles — the orthic triangle emerges from double reflection). If a path must touch a line, reflect before doing anything else.`,

"rotation-trick": String.raw`## Why it works
Rotating about a vertex by the polygon's angle ($60^\circ$ for equilateral, $90^\circ$ for square) maps one adjacent vertex onto another, carrying $P$ to $P'$ with $BP = BP'$ and $\angle PBP'$ equal to the rotation angle. That makes $\triangle PBP'$ equilateral (or isosceles right), so $PP'$ is computable — and $P'$ inherits one of the original distances, assembling a triangle with all three given lengths.

## How to use it
Given $PA, PB, PC$ to the vertices of an equilateral triangle: rotate $60^\circ$ about $B$; the new triangle has sides $PA, PC$, and $PB$ (via the equilateral $PP'B$), and its angles reveal the configuration's angles (add back $60^\circ$). For squares rotate $90^\circ$ ($PP' = PB\sqrt2$). Compute areas/sides with the law of cosines afterwards.

## On contests
The intended solution whenever AMC/AIME gives three distances from a point to an equilateral triangle's or square's vertices ($3,4,5$ inside equilateral and $1,2,3$ inside a square are the celebrity cases). Recognize → rotate → law of cosines: three steps.`,

"spiral-similarity": String.raw`## Why it works
Composing a rotation and a dilation about the same center is the general direct similarity of the plane; any two non-parallel segments $AB, CD$ admit exactly one such map sending one to the other. Its center is found by circle intersections because equal rotation angles create equal inscribed angles over the intersection point.

## How to use it
Practical triggers: (1) two similar triangles sharing a vertex angle at some point $X$ ($\triangle XAB \sim \triangle XCD$) — that $X$ is a spiral center, and you get ratio + angle equations for free; (2) complex-number problems: the map is $z \mapsto a + ke^{i\theta}(z - a)$, and matching two point-pairs solves for center and ratio linearly. The center of the spiral sending $AB \to CD$ also sends $AC \to BD$ (the "spiral sim swap") — a surprisingly powerful symmetry.

## On contests
Hard AIME/olympiad circle problems ("two circles meet at $X, Y$; lines through them...") are frequently spiral similarity around one intersection point. In coordinates/complex form it is also just a fast computational device for rotating-scaling configurations.`

});

// Entries added from the 2023-2025 AMC/AIME sweep.
Object.assign(window.MATH_DETAILS, {

"conic-sections": String.raw`## Key forms
- $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$ — ellipse, $c^2=a^2-b^2$
- $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1$ — hyperbola, $c^2=a^2+b^2$
- $x^2=4py$ — parabola, focus at $(0,p)$

## Why it works
Each conic is a distance locus: ellipse = constant sum of focal distances $2a$, hyperbola = constant difference $2a$, parabola = equal distance to focus and directrix. The $c$-relations ($c^2 = a^2 - b^2$ for ellipses, $c^2 = a^2 + b^2$ for hyperbolas) come from evaluating the locus condition at a vertex.

## How to use it
Convert freely between the equation and the focal description — most contest problems hand you one and need the other. Key facts: the hyperbola's asymptotes $y = \pm\frac{b}{a}x$ bound direction slopes of points at infinity; a parabola $x^2 = 4py$ has focus $(0, p)$; reflection properties (rays from one focus bounce to the other) occasionally star in AMC problems.

## On contests
AMC 12 tests standard forms and focal definitions directly. On AIME, conics appear as constraint curves for optimization or counting — 2024 AIME I #9 (rhombus with vertices on a hyperbola, diagonal bound governed by the asymptote slopes) is the recent model.`,

"insphere-radius": String.raw`## Why it works
Join the center of the inscribed sphere to every face: the polyhedron splits into pyramids, one per face, each with apex height $r$. Summing $\frac{1}{3}(\text{face area}) \cdot r$ gives $V = \frac{1}{3} r S$ — the same dissection that proves $A = rs$ in the plane.

## How to use it
Whenever a point is equidistant from all faces (an insphere exists, or the problem asserts equal distances), compute the volume and total surface area separately, then read off $r = \frac{3V}{S}$. For isosceles (face-congruent) tetrahedra, embed in a box first: the box makes both $V$ and the face areas computable.

## On contests
2024 AIME I #14 is the archetype: equal distances to all faces of a tetrahedron ⟹ insphere center; box embedding + Heron on one face + $r = 3V/S$ finishes. The 2D analogue $r = A/s$ appears constantly — remember they are the same theorem one dimension apart.`,

"tangency-condition": String.raw`## Key forms
- $\operatorname{dist}(\text{center},\text{line})=r$ — a line tangent to a circle
- $\Delta=0$ — the combined equation has a double root

## Why it works
A line meets a circle in 0, 1, or 2 points according to whether the center's distance to the line is greater than, equal to, or less than $r$; substituting one equation into the other gives a quadratic whose discriminant mirrors the same trichotomy. "Exactly one solution" is precisely the boundary case.

## How to use it
Translate "unique solution / just touches / exactly one intersection" into an equation in the parameter: distance-to-center $= r$ for lines and circles, $\Delta = 0$ for a substituted quadratic, or $|d| = r_1 \pm r_2$ for two circles. Expect two parameter values (tangent from either side) — read the problem to see whether both count.

## On contests
2025 AIME I #8 phrases it in complex numbers: a fixed circle and a $k$-dependent perpendicular bisector with a unique common point — tangency gives two $k$ values summing to $\frac{73}{4}$. The same reflex handles "the line $y = mx + c$ touches the parabola" (AMC 12) and envelope problems like 2024 AIME II #12.`,

"cross-section-method": String.raw`## Why it works
Solids of revolution sharing an axis of symmetry intersect and touch along circles centered on that axis. The plane through the axis captures every radius and center distance faithfully, so 3D tangency conditions become 2D circle/line tangency in that slice — no information is lost for distances measured through the axis.

## How to use it
Draw the axial slice: spheres become circles, cylinders become parallel line pairs, cones become triangles, tori become two circles (the tube cross-sections). Apply plane geometry — tangent circles have center distance $r_1 \pm r_2$, similar triangles scale radii — then reinterpret lengths as radii of tangency circles when rotating back.

## On contests
The 2024 AIME II #8 torus-in-sphere problem is pure cross-section work: tube-center distance $11 \mp 3$ from the sphere's center, similar triangles scaling the radius-6 circle by $\frac{11}{8}$ vs $\frac{11}{14}$. Sphere-in-cone and stacked-spheres problems (multiple recent AMC finals) use the identical slice-first recipe.`

});

Object.assign(window.MATH_DETAILS, {

"trig-ceva": String.raw`## Why it works
Apply the law of sines inside each of the six small triangles a cevian creates at its vertex: each side-ratio in ordinary Ceva converts to a ratio of sines of the vertex angles, and the product telescopes the same way.

## How to use it
Reach for it when the givens are angles ("the cevian makes a 20° angle with the side") rather than segment ratios. Isogonal cevians (reflections over the bisector) swap the sine ratios — which is why trig Ceva proves the symmedians and the isogonal conjugate exist. Combined with the sine addition formulas it handles most "find the angle" concurrency problems.

## On contests
The standard weapon for AIME/olympiad angle-chase concurrency, and the cleanest proof that altitudes, bisectors, and symmedians concur. Directed angles matter for obtuse configurations — keep everything inside the triangle when possible.`,

"erdos-mordell": String.raw`## Why it works
The classical proof reflects the distances: $a \cdot PA \ge b \cdot d_c + c \cdot d_b$ for each vertex (a projection inequality), then summing the three cyclic versions and applying AM-GM to the coefficient pairs gives the factor 2. Equality survives only when the triangle is equilateral and $P$ is the center.

## How to use it
An off-the-shelf bound whenever both distance triples (to vertices, to sides) appear. The intermediate inequalities $a \cdot PA \ge b \cdot d_c + c \cdot d_b$ are themselves useful and sharper.

## On contests
Olympiad inequality problems and the occasional AIME-adjacent bound; also a good sanity check for extremal configurations — if a problem's optimum has $P$ at an equilateral center, Erdős–Mordell equality is often the hidden reason.`,

"symmedian-lemoine": String.raw`## Why it works
Reflecting the median over the bisector swaps the roles of the two adjacent sides, turning the median's even split into the $c^2 : b^2$ ratio (via the ratio lemma / trig Ceva with the sines squared). The tangent-intersection characterization: the tangents at $B$ and $C$ meet at the pole of $BC$, and its cevian is exactly the reflected median.

## How to use it
Recognize the two disguises: (1) tangents to the circumcircle at two vertices meeting on a cevian ⟹ that cevian is a symmedian; (2) a cevian cutting the opposite side as the squares of the adjacent sides. Either recognition converts to the other for free, and the ratio $c^2 : b^2$ plugs into Stewart or mass points ("mass $b^2$ at $B$").

## On contests
2024 AIME I #10 is a symmedian in disguise (tangents at $B$, $C$ meeting at $D$, with $AD$ crossing the circle). Recognizing it gives the ratio structure instantly; even without the name, power of the point plus similar triangles recovers it.`,

"radical-axis": String.raw`## Why it works
The power of $(x, y)$ with respect to $x^2 + y^2 + Dx + Ey + F = 0$ is exactly the left side evaluated there. Subtracting two circle equations kills the quadratic terms, leaving a linear equation — a line — where the powers agree. Perpendicularity to the center line follows from symmetry, and three circles concur because the pairwise conditions are pairwise-equalities of three numbers.

## How to use it
Compute radical axes by literal subtraction of equations — the fastest route to common chords and tangent-length loci. The radical center (solve two of the three linear equations) is the natural candidate point for "equal tangents to three circles" and is the standard tool for proving three chords/lines concurrent.

## On contests
Intersecting-circle AIME problems: the common chord IS the radical axis, so subtracting equations gives it without finding the intersection points. Olympiad concurrency problems routinely reduce to "these three lines are radical axes of three circles."`,

"miquels-theorem": String.raw`## Why it works
Let the circles through $(B, F, D)$ and $(C, D, E)$ meet again at $M$. Cyclic quadrilaterals give $\angle FMD = 180° - B$ and $\angle DME = 180° - C$, so $\angle FME = 360° - (180° - B) - (180° - C) = B + C = 180° - A$ — which says exactly that $A, F, M, E$ are concyclic. One angle chase, fully general.

## How to use it
Whenever a configuration has one point on each side of a triangle and circles through vertex-adjacent triples, the three circles share a point — often the key hidden point of the problem. The spiral-similarity connection: the Miquel point is the center of the spiral similarity taking $EF$ configurations to $BC$ ones.

## On contests
AIME-level circle problems sometimes plant a Miquel configuration without naming it; recognizing "three circles, one per vertex" saves the day. The complete-quadrilateral version (Miquel point of four lines) is an olympiad staple.`,

"pascals-theorem": String.raw`## Why it works
Projective magic — the clean proofs use cross-ratios or the radical axes of three cleverly chosen circles. For contest purposes: know the statement, its stability under re-ordering the six vertices (different orders give different Pascal lines), and its degenerate forms.

## How to use it
The degenerate versions do the work: merge two adjacent vertices and the side through them becomes the tangent at that point. With a triangle (three merged pairs), Pascal says tangent-at-$A$ ∩ $BC$, tangent-at-$B$ ∩ $CA$, tangent-at-$C$ ∩ $AB$ are collinear. Brianchon (the dual) handles tangential polygons: main diagonals of a circumscribed hexagon concur.

## On contests
Olympiad tool; on AIME its degenerate forms occasionally shortcut collinearity claims that would otherwise need heavy computation. Worth knowing mainly for recognition — six points on a circle with intersecting chord extensions is the tell.`,

"homothety-monge": String.raw`## Why it works
Homothety about $P$ with ratio $k$ is multiplication by $k$ in vectors based at $P$ — it scales all lengths by $|k|$ and preserves directions, so circles map to circles and tangent lines to tangent lines. Monge's collinearity: compose the homothety taking circle 1 to circle 2 with the one taking 2 to 3; the result takes 1 to 3, and centers of composed homotheties are collinear (the composition's center lies on the line of the other two).

## How to use it
At a tangency point of two circles there is a homothety mapping one to the other — it sends the tangency configuration of one circle to the other, instantly transporting midpoints, arc midpoints, and tangent lines. External similitude center divides the center segment externally in ratio $r_1 : r_2$ (internal center divides internally): compute with section formulas.

## On contests
"Circle inside circle, tangent at T, chord tangent to the small circle" — the homothety at $T$ maps the chord's tangency point to the arc midpoint: a famous AIME/olympiad lemma. Monge settles three-circle collinearity questions with zero computation.`

});

Object.assign(window.MATH_DETAILS, {

"shared-angle-area-ratio": String.raw`## Why it works
Both triangles have the same included angle $A$, so $[AXY] = \frac{1}{2} AX \cdot AY \sin A$ and $[ABC] = \frac{1}{2} AB \cdot AC \sin A$ — the sines cancel in the ratio. It is the two-dimensional version of "scale each side independently."

## How to use it
The fastest area tool when points divide two sides of a triangle: no heights, no coordinates. Chain it across a configuration (each corner triangle of a cevian figure gets its own product) and subtract from 1 to get middle regions. Works with directed ratios beyond the segment ($AX/AB > 1$ when $X$ is past $B$).

## On contests
Everywhere on AMC 10/12 ("points X, Y on sides..., what fraction of the area") and the standard opening move of AIME area dissections. Combined with mass points it resolves most cevian-area problems in two lines.`,

"exradii": String.raw`## Key forms
- $r_a=\dfrac{A}{s-a}=s\tan\dfrac A2$ — the $A$-exradius (cyclic for $r_b,r_c$)
- $\dfrac1r=\dfrac1{r_a}+\dfrac1{r_b}+\dfrac1{r_c}$ — links the inradius to the three exradii
- $r\,r_a r_b r_c=A^2$ — their product is the area squared
- $r_a=4R\sin\dfrac A2\cos\dfrac B2\cos\dfrac C2$ — the trig form
## Why it works
The excenter opposite $A$ sits at the intersection of the external bisectors from $B$ and $C$; joining it to the vertices splits the triangle with signed areas, giving $A = r_a(s - a)$ in place of $A = rs$. The tangent-length bookkeeping mirrors the incircle's, but the tangent length from $A$ is now $s$ itself.

## How to use it
Any incircle technique has an excircle twin: $r_a = \frac{A}{s-a} = s\tan\frac{A}{2}$, touch point of the $A$-excircle on $BC$ mirrors the incircle's touch point across the midpoint of $BC$. Multiplying the four radius formulas gives $r \, r_a r_b r_c = A^2$ — a slick identity for "product of radii" problems.

## On contests
AIME problems about circles tangent to one side and two extensions are excircle problems in disguise. The mirror-image touch point fact and $r r_a r_b r_c = A^2$ both appear as key steps; the incenter-excenter lemma connects $I_A$ to arc midpoints for the hardest versions.`,

"ratio-lemma": String.raw`## Why it works
Apply the law of sines in triangles $ABD$ and $ACD$: the sides $BD$ and $DC$ are proportional to $AB\sin\angle BAD$ and $AC \sin\angle DAC$ (the angles at $D$ are supplementary, so their sines agree and cancel).

## How to use it
The all-purpose cevian converter between side data and angle data. Special cases to recognize instantly: bisector (sines equal → Angle Bisector Theorem), median ($BD = DC$ → $\frac{\sin\angle BAD}{\sin\angle DAC} = \frac{AC}{AB}$), altitude and symmedian similarly. Multiply three of these around the triangle and Ceva's trig form appears.

## On contests
The clean way through AIME problems that give one cevian angle and ask for a length split (or vice versa). Worth drilling until the statement writes itself — it replaces a page of law-of-sines bookkeeping.`,

"incenter-excenter-lemma": String.raw`## Why it works
Angle chase: $\angle IBM = \angle IBC + \angle CBM = \frac{B}{2} + \frac{A}{2}$ (the inscribed angle $\angle CBM$ equals $\angle CAM = \frac{A}{2}$), while $\angle BIM = \frac{A}{2} + \frac{B}{2}$ as the exterior angle of $\triangle ABI$. So $\triangle MBI$ is isosceles: $MB = MI$. Symmetric arguments give $MC$ and the excenter.

## How to use it
Whenever an incenter and a circumcircle share a problem, draw the arc midpoint: it gives a circle through four named points ($B$, $C$, $I$, $I_A$) with known center and radius $MB = 2R\sin\frac{A}{2}$, plus the collinearity $A$–$I$–$M$. Many "find $AI$ or $IM$" problems become one law-of-cosines application inside this circle.

## On contests
Arguably the single most useful AIME circle lemma — 2020 AIME I #13 is built directly on it, and it silently powers most incenter-on-circumcircle configurations. Recognize the phrase "perpendicular bisector of the bisector segment" or "circle through B, I, C": the center is always the arc midpoint.`,

"orthocenter-properties": String.raw`## Why it works
Reflecting $H$ over $BC$: the reflected angles show the image sees $BC$ at angle $180^\circ - A$, exactly the inscribed-angle condition for the circumcircle's far arc. Reflecting over the midpoint of $BC$ sends $B \to C$ and preserves the "diameter" relation, landing on the antipode of $A$. The distance $AH = 2R\cos A$ drops out of the extended law of sines in triangle $ABH$.

## How to use it
Three interchangeable dividends: (1) $\odot(HBC) \cong \odot(ABC)$ — same radius, mirrored center; (2) $AH = 2 \times$ (distance from $O$ to $BC$) — connects orthocenter data to circumcenter data; (3) $\vec{OH} = \vec{OA} + \vec{OB} + \vec{OC}$ for coordinate work. Problems giving the circumcircle of $HBC$ should be reflected back immediately.

## On contests
2020 AIME I #15 opens with exactly the $\odot(HBC)$ reflection. The $2R\cos A$ distances also compute orthic-triangle lengths and power-of-the-point quantities around $H$ ($BH \cdot HH_B$ products are uniform).`,

"fermat-point": String.raw`## Why it works
Rotate triangle $APB$ by $60^\circ$ about $B$: the path $AP + PC$ becomes a broken path of the same total length, and the extra segment $PP'$ equals $BP$ (equilateral triangle $PBP'$). So $PA + PB + PC$ equals the length of a path from a fixed erected vertex to $C$ — minimized when straight, which forces the $120^\circ$ angles.

## How to use it
For "minimize the sum of distances to three points": check the largest angle first (if $\ge 120^\circ$, the answer is at that vertex); otherwise the minimum value is computable by the rotation — it equals the distance between one vertex and the equilateral apex erected on the opposite side, i.e. one law-of-cosines evaluation with an angle increased by $60^\circ$.

## On contests
The engine behind 2025 AIME I #14's pentagon and many "shortest total cable" problems. On AMC, the $120^\circ$ structure often arrives pre-installed (three roads meeting at $120^\circ$) — recognize it as Fermat-point optimality.`,

"point-plane-distance": String.raw`## Why it works
Same projection argument as in 2D: the vector from any point of the plane to $P$ dotted with the unit normal $\frac{(a,b,c)}{\sqrt{a^2+b^2+c^2}}$ gives the signed distance, and evaluating produces the formula.

## How to use it
Build the plane first: normal $= \vec{u} \times \vec{v}$ for two edge vectors, then $d_0$ from any known point. Alternative when the plane is a triangle's: distance $= \frac{3V}{[\text{base}]}$ via the tetrahedron volume — often faster than finding the equation. Sphere tangent to plane ⟺ distance from center $=$ radius, exactly as with circles and lines.

## On contests
AIME 3D problems: distance from a cube vertex to a cutting plane, heights of tilted solids, and sphere-plane tangency. Keep both routes (normal formula and $3V/A$) — one of them is always painless.`,

"ravi-substitution": String.raw`## Why it works
The incircle's tangent lengths $x = s-a$, $y = s-b$, $z = s-c$ are positive for any genuine triangle and reconstruct the sides as $a = y + z$ etc.; conversely any positive $x, y, z$ build a valid triangle. It is a bijection between triangles and positive triples — the triangle inequality is absorbed.

## How to use it
Substitute when the triangle inequality is the annoying constraint: counting integer triangles (positivity + parity bookkeeping replaces inequality casework), triangle inequalities (Heron becomes $A = \sqrt{xyz \cdot s}$, and AM-GM applies cleanly to $x, y, z$), and semiperimeter-heavy identities.

## On contests
Counting problems ("how many triangles with perimeter $n$") become stars-and-bars-with-parity; olympiad-style inequalities over triangle sides become symmetric inequalities over free positive variables. If a proof keeps invoking "each side less than the sum," Ravi removes the friction.`

});

Object.assign(window.MATH_DETAILS, {

"center-distance-formulas": String.raw`## Key forms
- $OH^2=9R^2-(a^2+b^2+c^2)$ — circumcenter to orthocenter
- $OG^2=R^2-\tfrac19(a^2+b^2+c^2)$ — circumcenter to centroid
- $R^2-OI^2=2Rr$ — Euler's formula (circumcenter to incenter)

## Why it works
With the circumcenter as origin, $\vec{OH} = \vec{OA} + \vec{OB} + \vec{OC}$; expanding $|\vec{OH}|^2$ gives $3R^2$ plus dot products, and each $\vec{OA}\cdot\vec{OB} = R^2\cos(2C) = R^2 - \frac{c^2}{2}$ — summing produces $9R^2 - \sum a^2$. Dividing the Euler line in thirds gives $OG$; the incenter identity is the power of $I$ (a chord through $I$ and a vertex has segment product $2Rr$ by the incenter-excenter lemma).

## How to use it
Given sides (or $\sum a^2$) and $R$, all Euler-line distances follow. Run it backwards too: contest problems specify $OH$ or $OG$ and ask for $\sum a^2$. Acute vs. obtuse checks: $OH^2 > 0$ always, but $\cos A\cos B\cos C$ changes sign at right triangles ($OH = R$ exactly... for a right triangle $\sum a^2 = 8R^2$ gives $OH^2 = R^2$ — $H$ is at the right-angle vertex, distance $R$ from $O$: consistent).

## On contests
"Sometimes" tier but decisive: problems giving two centers' distance and asking for side data, or vice versa. Pairs with $OI^2 = R(R-2r)$ (its own entry) to triangulate all three of $O$, $I$, $H$.`,

"feuerbach-theorem": String.raw`## Why it works
Deep — the classical proofs invert about the point where the incircle touches a side, or compute $NI$ directly with the barycentric distance formula. What survives for contest use is the metric statement: $NI = \frac{R}{2} - r$ exactly, which is internal tangency since the nine-point radius is $\frac{R}{2}$.

## How to use it
Treat it as a free equation linking $R$, $r$, and the position of $N = $ midpoint of $OH$: problems that pin down two of the circles' data determine the third. The excircle version $NI_A = \frac{R}{2} + r_A$ (external tangency) works the same way. Also a strong sanity check for coordinate computations — if your computed $NI \ne R/2 - r$, something upstream is wrong.

## On contests
Rare but famous; appears in olympiad-adjacent AIME problems about the nine-point circle meeting the incircle, and as the hidden reason behind "these two circles are tangent" claims. Recognition value is most of its worth.`,

"leibniz-formula": String.raw`## Why it works
Write $\vec{PA} = \vec{PG} + \vec{GA}$ and expand the squared sum: the cross terms vanish because $\vec{GA} + \vec{GB} + \vec{GC} = \vec{0}$ — the defining property of the centroid. The constant $\sum GA^2 = \frac{1}{3}\sum a^2$ comes from the median-length formula ($GA = \frac{2}{3}m_a$).

## How to use it
Any "sum of squared distances to the vertices" condition becomes a circle centered at $G$: the locus of $P$ with $\sum PA^2 = k$ is a circle (or point/empty), radius from the formula. Minimization questions end instantly: the minimum is $\frac{1}{3}\sum a^2$, at $G$. Generalizes to $n$ points with the same proof.

## On contests
Locus problems ("set of points with $PA^2+PB^2+PC^2 = 100$ is a circle — find its radius") and minimization one-liners. The four-point version handles rectangles and tetrahedra the same way.`,

"incenter-coordinates": String.raw`## Why it works
The incenter divides the bisector from $A$ in ratio $\frac{b+c}{a}$ (bisector theorem applied twice) — exactly the balance point of masses $a$, $b$, $c$ at the vertices. Mass-point mechanics then give the weighted-average coordinate formula; the centroid is the equal-mass case.

## How to use it
Once a triangle is coordinatized, write $I$ down directly — no bisector intersections needed. The general principle converts any mass-point configuration to coordinates: cevian intersection points are weighted averages with the masses you'd assign in mass points. Excenters flip the sign of one weight.

## On contests
The quiet workhorse of coordinate solutions to incircle problems: AIME problems asking for incenter-related lengths in coordinatized triangles reduce to plugging into this formula plus the distance formula. Also the entry point to barycentric coordinates for students heading toward olympiad.`,

"law-of-tangents": String.raw`## Why it works
From the law of sines, $\frac{a-b}{a+b} = \frac{\sin A - \sin B}{\sin A + \sin B}$; sum-to-product turns numerator and denominator into $2\cos\frac{A+B}{2}\sin\frac{A-B}{2}$ and $2\sin\frac{A+B}{2}\cos\frac{A-B}{2}$, whose ratio is the tangent quotient.

## How to use it
Best when a problem gives $a + b$ and $a - b$ (or their ratio) together with $C$ — since $\frac{A+B}{2} = 90^\circ - \frac{C}{2}$ is then known, the formula yields $\frac{A-B}{2}$ and hence both angles. An alternative to the law of cosines that avoids quadratics in exactly this data pattern.

## On contests
Occasional AIME trig; also handy for "the sides differ by 2 and the included angle is..." setups. Knowing it exists prevents a mechanical but messy cosine-rule grind.`,

"napoleons-theorem": String.raw`## Why it works
Cleanest with complex numbers: the center of an outward equilateral on segment $pq$ is a fixed linear combination of $p$ and $q$ involving a primitive sixth root of unity; the equilateral condition for the three centers reduces to the identity $1 + \omega + \omega^2 = 0$. Rotation composition gives a synthetic proof.

## How to use it
The theorem itself is mostly recognition ("centers of erected equilaterals" ⟹ equilateral, no computation needed). The area formulas — outer $= \frac{\sqrt3}{24}\sum a^2 + \frac{[ABC]}{2}$, and outer minus inner $= [ABC]$ — turn qualitative setups into numbers. The erected-triangle apexes themselves (not centers) connect to the Fermat point: segments from each apex to the opposite vertex concur there with equal lengths.

## On contests
Occasional AMC/AIME cameo, and the Fermat-point connection makes the configuration worth knowing cold: erected equilateral triangles almost always signal either Napoleon structure or the rotation trick.`,

"cyclic-quad-radius": String.raw`## Why it works
Split the quadrilateral by a diagonal and apply $R = \frac{(\text{side products})}{4 \cdot \text{area}}$ to each triangle — both triangles share the circumcircle. Combining the two expressions with Ptolemy's relation between the diagonals produces the symmetric three-product form.

## How to use it
For a cyclic quadrilateral with known sides: Brahmagupta gives $K$, then this gives $R$ — a two-step pipeline replacing any diagonal-hunting. Note the three products $(ab+cd)$, $(ac+bd)$, $(ad+bc)$ also give the diagonals: $p^2 = \frac{(ac+bd)(ad+bc)}{ab+cd}$ and its mate.

## On contests
The finishing move for "cyclic quadrilateral with sides 4, 5, 6, 7 — find the circumradius" questions, which otherwise require solving for a diagonal first. The diagonal formulas hiding in the same products are equally worth caching.`,

"van-aubel": String.raw`## Why it works
Complex numbers: the center of the square erected outward on segment from $p$ to $q$ is $\frac{p+q}{2} + \frac{i}{2}(q-p)$. Writing the two center-difference vectors and simplifying, one is exactly $i$ times the other — perpendicular and equal in one stroke.

## How to use it
Recognition first: squares erected on the sides of a quadrilateral ⟹ the opposite-center segments are congruent and perpendicular, no computation. The complex-number center formula is independently useful for any "erect a square, find a point" coordinate problem.

## On contests
The quadrilateral cousin of Napoleon — appears in AMC/AIME-adjacent problems about squares built on sides. Degenerate cases are cute and testable: collapse one side to a point and it still holds.`

});

Object.assign(window.MATH_DETAILS, {

"intercept-theorem": String.raw`## Why it works
$DE \parallel BC$ makes $\triangle ADE \sim \triangle ABC$ (equal corresponding angles), so $\frac{AD}{AB} = \frac{AE}{AC}$; subtracting from 1 converts whole-side ratios to the segment form $\frac{AD}{DB} = \frac{AE}{EC}$. The three-parallel-lines version follows by two applications.

## How to use it
The fastest ratio-transfer tool: one parallel line moves a known ratio from one side of a triangle to another without similarity bookkeeping. The converse certifies parallelism from ratios — the standard way to prove two segments are parallel in ratio-heavy configurations. Watch the two ratio forms (segment-to-segment vs. segment-to-whole) — mixing them is the classic error.

## On contests
MATHCOUNTS/AMC 10 workhorse for "parallel line cuts the sides" problems, and the silent first step in many mass-point and area-ratio solutions.`,

"trapezoid-special-segments": String.raw`## Why it works
Each segment comes from its own similarity argument: the diagonal-intersection segment lives at the point dividing the diagonals in ratio $a : b$, and combining the two similar triangles gives the harmonic mean; the similar-split segment needs (top trapezoid) $\sim$ (bottom trapezoid), forcing $\frac{a}{x} = \frac{x}{b}$; the equal-area segment equates two trapezoid areas with the same leg-line geometry, forcing the quadratic mean.

## How to use it
Identify which segment the problem describes — through the diagonals, splitting similarly, halving the area, or joining midpoints — and quote the corresponding mean of the bases. The mean-inequality chain orders them within the trapezoid: the harmonic segment sits closest to the short base, the quadratic closest to the long one.

## On contests
AMC problems ask for each of these (the equal-area segment $\sqrt{\frac{a^2+b^2}{2}}$ is a famous AMC answer); recognizing "mean of the bases" turns a similarity derivation into a lookup. Also a beautiful cross-reference to the QM-AM-GM-HM chain.`,

"circular-segment": String.raw`## Why it works
Segment = sector − isosceles triangle: $\frac{1}{2}r^2\theta - \frac{1}{2}r^2\sin\theta$. The triangle term uses the two radii with included angle $\theta$.

## How to use it
Convert every shaded sliver into segments: lens (two overlapping circles) = two segments glued along the common chord; "area between chord and arc" is one segment; stadium and flower shapes decompose similarly. Find $\theta$ from the chord ($\text{chord} = 2r\sin\frac{\theta}{2}$) or from center distances, then plug in — in radians.

## On contests
The engine of AMC shaded-region problems: two unit circles through each other's centers overlap in $2\left(\frac{\pi}{3} - \frac{\sqrt3}{4}\right)$-type lens areas, all from this one formula. Degree-mode errors are the top pitfall — convert first.`,

"cyclic-quad-diagonals": String.raw`## Why it works
Apply the law of cosines to the two triangles sharing diagonal $p$, using $\cos B = -\cos D$, and solve — the result packages into the paired products. Dividing the two diagonal formulas gives the elegant ratio; multiplying them recovers Ptolemy.

## How to use it
Given four sides of a cyclic quadrilateral, both diagonals follow with no trigonometry: compute the three products $(ab+cd)$, $(ac+bd)$, $(ad+bc)$ once, then $p^2$ and $q^2$ are quotients. Pairs with Brahmagupta (area) and Parameshvara (circumradius) — the same three products appear in all of them.

## On contests
The missing step in "cyclic quadrilateral with sides given — find the diagonal" AIME problems, where Ptolemy alone gives only the product $pq$. Knowing the ratio formula turns one equation into two.`,

"angle-between-lines": String.raw`## Why it works
A line of slope $m$ makes angle $\arctan m$ with the $x$-axis; the angle between the lines is the difference of inclinations, and the tangent subtraction formula gives $\tan(\alpha_1 - \alpha_2)$ in terms of the slopes. The absolute value selects the acute angle.

## How to use it
Direct: two slopes in, angle out. In reverse: "find the line making a given angle $\theta$ with a given line" turns the formula into an equation for the unknown slope (expect two solutions, one on each side). The $1 + m_1m_2 = 0$ singularity is perpendicularity — the formula's built-in reminder.

## On contests
AMC 12 asks it directly (slopes $2$ and $\frac{1}{3}$ giving $45^\circ$ was 2023 AMC 12A #11); it also converts coordinate configurations into the angle form needed for trig identities and arctan telescoping.`,

"reflection-coordinates": String.raw`## Why it works
The vector $(a, b)$ is normal to $ax + by + c = 0$, and $\frac{ax_0 + by_0 + c}{\sqrt{a^2+b^2}}$ is the signed distance: stepping twice that distance against the normal lands exactly on the mirror image. The special cases are the formula with easy normals.

## How to use it
Memorize the instant cases (axes, $y = \pm x$, horizontal/vertical lines); use the general formula for slanted mirrors. Reflections power the shortest-path trick, fold problems (the crease is the perpendicular bisector — reflecting maps one flap to the other), and symmetry arguments ("the parabola's reflection over $y = x$ is..."). To reflect a LINE, reflect two of its points.

## On contests
Paper-folding problems (AMC regulars) are reflection computations; light-bouncing and billiard problems chain them. The $y = x$ swap is also the coordinate meaning of inverse functions.`,

"skew-lines-distance": String.raw`## Why it works
The cross product $\vec{d_1} \times \vec{d_2}$ is perpendicular to both lines — the direction of the unique common perpendicular. Any connecting vector between the lines has the same projection onto that direction, and that projection is the distance. The tetrahedron route says the same thing with volumes: $V = \frac{1}{6}\,d\, |\vec{d_1}||\vec{d_2}|\sin\phi$-style, so $d = 3V/[\text{base}]$-type manipulations work.

## How to use it
Coordinatize, take one point and the direction on each line, compute one cross product and one dot product. Sanity checks: parallel lines give $\vec{d_1} \times \vec{d_2} = 0$ (use point-to-line instead); intersecting lines give distance 0. In cubes and boxes, the answer is often a clean fraction of the edge — e.g. opposite edges' diagonals.

## On contests
AIME 3D problems: distance between skew edges or face diagonals of a cube, and "shortest segment connecting two lines" questions. One computation replaces an optimization.`,

"isoperimetric-facts": String.raw`## Why it works
Rectangle: $xy \le \left(\frac{x+y}{2}\right)^2$ is AM-GM. Triangle: Heron's product $(s-a)(s-b)(s-c)$ with fixed sum is maximized at equality — AM-GM again. Polygons → cyclic (Bretschneider's cosine term vanishes) → regular → circle is the classical chain; each step trades asymmetry for area.

## How to use it
Optimization problems that ask for a maximum area with a perimeter budget (or minimum perimeter for an area) end at the symmetric configuration — quote the fact, compute the symmetric case, and confirm the equality condition. The "cyclic maximizes for fixed sides" version answers hinged-quadrilateral questions.

## On contests
"A farmer has 100 feet of fence..." (square, or half-square against a wall — careful: the wall variant's optimum is a $25 \times 50$ half-square, not a square!). AMC also tests the qualitative form: recognizing that the extremal shape must be the symmetric one.`

});

Object.assign(window.MATH_DETAILS, {

"solid-tactics": String.raw`## Why it works
3D difficulty is usually representational, not conceptual — each tactic converts the solid into something 2D or algebraic. Coordinates make incidence and distance mechanical; symmetry slices contain all the tangency data (see the cross-section method); unfolding preserves surface distances exactly; and volume is basis-independent, so two computations of the same $V$ yield an equation in the unknown.

## How to use it
Triage in order: right angles present → coordinatize immediately (vertices of boxes, right prisms, pyramids over the origin). Spheres/cones/tangency → slice through the axis. Path along the surface → unfold and draw one segment (check competing unfoldings — the shortest route may cross a different face). Distance from a point to a plane → tetrahedron volume two ways. When stuck, hunt for the symmetry plane: most contest solids have one, and the restriction to it is a 2D problem you already know.

## On contests
Nearly every AMC/AIME 3D problem yields to exactly one of the four. The volume-recount is the most-missed: any time three of a tetrahedron's four vertex-face distances are easy, the fourth is free via $h = \frac{3V}{A}$.`

});

Object.assign(window.MATH_DETAILS, {

"cayley-menger": String.raw`## Why it works
It is Heron's Formula lifted one dimension. In the plane, a triangle's area is fixed by its three sides; in space, a tetrahedron's volume is fixed by its six edges — and both are the same bordered determinant of squared distances, just at size $4$ (with the $16[\triangle]^2$ factor) versus size $5$ (with $288 V^2$). The bordering row/column of $1$'s encodes the affine constraint that the points actually live in $3$-space.

## How to use it
Reach for it whenever you know all six edge lengths but placing coordinates is awkward. Fill the symmetric matrix carefully: entry $(i,j)$ is the squared distance between vertices $i$ and $j$, with $a,b,c$ the three edges meeting at one vertex and $d,e,f$ their respective opposite edges. If $288V^2$ comes out $0$, the four points are coplanar; if negative, no such tetrahedron exists (the edge lengths violate a triangle-type inequality).

## On contests
Most AIME tetrahedra have enough right angles or symmetry that coordinates or the box trick are faster, so treat Cayley–Menger as the universal fallback rather than the first move. It shines on "scalene" tetrahedra given purely by edge lengths, and it's the clean way to prove a configuration is impossible.`,

"isosceles-tetrahedron": String.raw`## Why it works
Take a rectangular box and pick four vertices no two of which share an edge (the same alternating set that gives a regular tetrahedron inside a cube). Each of the six edges of the tetrahedron is a face diagonal of the box, and opposite tetrahedron edges lie on parallel faces — so they're equal. The tetrahedron is the box with four congruent corner right-tetrahedra sliced off, each of volume $\frac{1}{6}pqr$, leaving $pqr - 4 \cdot \frac{1}{6}pqr = \frac{1}{3}pqr$.

## How to use it
Recognize the trigger: all three pairs of opposite edges equal. Then read off the box from $p^2 = \frac{a^2 + c^2 - b^2}{2}$ and its cyclic mates (equivalently, solve the three sum equations), and the volume is immediate. Because the four faces are congruent, the surface area is just four times one triangle's area, which pairs beautifully with $r = \frac{3V}{S}$ for insphere problems. Such tetrahedra are also called orthocentric or disphenoids, and their circumcenter, incenter, and centroid all coincide at the box's center.

## On contests
This is the shape behind 2024 AIME I #14 (edges $\sqrt{41}, \sqrt{80}, \sqrt{89}$ → box $4 \times 5 \times 8$). Any AIME tetrahedron stated by three "matched" pairs of edge lengths is signaling the box embedding — the intended solution is never Cayley–Menger.`,

"tetrahedron-centroid": String.raw`## Why it works
The centroid of equal point masses at the four vertices is their average $\frac{A+B+C+D}{4}$. Writing the face centroid $M_A = \frac{B+C+D}{3}$, the point $\frac{A + 3M_A}{4}$ equals $G$, which places $G$ three-quarters of the way from $A$ to $M_A$ — the $3:1$ split. The three bimedians pass through $G$ because the midpoint of a segment joining two edge-midpoints is again the four-vertex average.

## How to use it
For any "balance point," "center of mass," or averaged-vertex question, just average coordinates. The $3:1$ median ratio is the 3D analogue of the triangle centroid's $2:1$; the pattern is that in $n$ dimensions the centroid divides a median $n:1$. The concurrent, mutually bisecting bimedians make the centroid a natural origin for symmetric coordinate setups.

## On contests
Mass-point and averaging arguments transfer directly to 3D. When a problem hands you the four vertices (or asks about the point minimizing summed squared distances, which is exactly $G$), the centroid is a one-line computation.`

});

Object.assign(window.MATH_DETAILS, {

"angle-chasing": String.raw`## Why it works
Angles propagate through a figure by a tiny set of exact local rules — triangle angles sum to $180°$, equal sides face equal angles, parallel lines transfer angles, and inscribed angles on one arc agree. Chaining these rules is deduction, not computation: one labeled unknown flows through the whole configuration.

## How to use it
Pick the unknown that touches the most constraints and call it $\theta$. Then sweep: mark every angle forced by a triangle sum, every base-angle pair at an isosceles triangle (radii of one circle are the classic hidden equal sides), every equal pair across parallels, and every inscribed-angle transfer around a circle. Write each derived angle on the figure as you go — the solve ends when the target angle appears in terms of $\theta$, or when one angle gets two different expressions (an equation). If the chase stalls, add the standard auxiliary segments: a circle's radii to key points, or the third side of an almost-triangle.

## On contests
The first five minutes of essentially every synthetic geometry problem, and frequently the whole solution on AMC. Star configurations to know by sight: the $36°$–$72°$ golden-gnomon chase, the "radius makes isosceles" chase inside circles, and cyclic-quadrilateral chases where opposite angles trade $180°$. On AIME, angle chasing rarely finishes alone but sets up the trig or similar-triangle step that does.`

});

Object.assign(window.MATH_DETAILS, {

"section-formula": String.raw`## Why it works
The point at fraction $\frac{m}{m+n}$ of the way from $A$ to $B$ is $A + \frac{m}{m+n}(B - A)$, which rearranges to the weighted average $\frac{n A + m B}{m+n}$ — more weight on the endpoint you're closer to. The midpoint is the balanced case $m = n$.

## How to use it
Read the ratio carefully: $AP : PB = m : n$ puts the $m$ coefficient on the far point $B$. For external division (the point beyond the segment, as in "extend $AB$ past $B$ so that..."), use a negative sign: $\frac{m B - n A}{m - n}$. This is the coordinate face of mass points — placing mass $n$ at $A$ and $m$ at $B$ balances at $P$ — so any cevian-ratio problem can be finished either way.

## On contests
The workhorse for coordinate solutions to ratio problems, trisection points, and centroid computations. When a problem gives you a ratio along a segment and asks for a coordinate, length, or area, this is a one-line computation. Pairs naturally with the shoelace formula for the area that follows.`,

"vector-dot-product": String.raw`## Why it works
Expanding $|\vec{u} - \vec{v}|^2 = |\vec{u}|^2 + |\vec{v}|^2 - 2\,\vec{u} \cdot \vec{v}$ against the Law of Cosines forces $\vec{u} \cdot \vec{v} = |\vec{u}||\vec{v}|\cos\theta$. So the sign of the dot product is the sign of $\cos\theta$: positive means acute, zero means perpendicular, negative means obtuse.

## How to use it
Three standard reads: the angle between two vectors ($\cos\theta = \frac{\vec{u} \cdot \vec{v}}{|\vec{u}||\vec{v}|}$), a perpendicularity test ($\vec{u} \cdot \vec{v} = 0$), and the length of the projection of $\vec{u}$ onto $\vec{v}$ ($\frac{\vec{u} \cdot \vec{v}}{|\vec{v}|}$). Coordinates make it mechanical: $\vec{u} \cdot \vec{v} = u_1 v_1 + u_2 v_2$ (add $u_3 v_3$ in 3D). To show two lines are perpendicular, dot their direction vectors.

## On contests
The clean way to handle angle and perpendicularity conditions once a figure is on coordinates — often faster than slopes because it dodges the vertical-line special case and extends straight to 3D. On AIME, the dot/cross product pair turns spatial angle and area questions into arithmetic.`,

"cavalieris-principle": String.raw`## Why it works
Volume is the integral of cross-sectional area over height. If two solids present the same area $A(h)$ at every height $h$, their volume integrals are identical — the shapes of the slices, and how they're stacked or sheared, are irrelevant.

## How to use it
Use it to transport a volume you don't know onto one you do. An oblique prism or cylinder shears to an upright one slice-for-slice, so it keeps $V = Bh$. A pyramid's volume comes from slicing it against a known pyramid with the same base and height. The famous derivation of the sphere: a hemisphere of radius $R$ has the same slice area at every height as a cylinder of radius $R$ with a cone bored out, giving $V = \frac{2}{3}\pi R^3$ per hemisphere.

## On contests
Mostly a conceptual unlock: it justifies "the slant doesn't matter" so you can replace a leaning solid with an upright one, and it explains why the $\frac{1}{3}$ in a pyramid's volume is shape-independent. When a solid is defined by a moving or tilted cross-section, think slices.`,

"barycentric-coordinates": String.raw`## Why it works
Fix a reference triangle $ABC$. Every point in the plane is a unique affine combination $P = \alpha A + \beta B + \gamma C$ with $\alpha + \beta + \gamma = 1$; the weights are the signed area ratios $\alpha : \beta : \gamma = [PBC] : [PCA] : [PAB]$ (a vertex's weight is the area of the opposite sub-triangle). Because the coordinates are tied to the triangle's own areas, the objects that clutter a synthetic solution — cevians, named centers, ratios along sides — all become linear, so the geometry turns into ordinary linear algebra.

## How to use it
Memorize the standard centers: centroid $(1:1:1)$, incenter $(a:b:c)$, symmedian point $(a^2:b^2:c^2)$, circumcenter $(a^2 S_A : b^2 S_B : c^2 S_C)$ with $S_A = \tfrac{b^2+c^2-a^2}{2}$, orthocenter $(\tan A : \tan B : \tan C)$. A point dividing a cevian in a known ratio is read off instantly. Lines are $ux + vy + wz = 0$; three points are collinear (or three cevians concurrent) exactly when a $3\times 3$ determinant vanishes. Distances and circles need the displacement/EFG conventions, so barycentrics shine on incidence, ratio, and concurrency problems and are heavier for metric ones. Always normalize ($\alpha+\beta+\gamma=1$) before reading an actual point.

## On contests
An olympiad-level bludgeon: when a configuration is saturated with cevians, the centroid/incenter/orthocenter, and side-ratios, barycentric coordinates convert "find the intended synthetic insight" into a guaranteed (if computational) determinant. Rarely needed on AMC/AIME, where mass points — barycentrics' lightweight cousin for pure cevian ratios — usually suffice.`,

"coordinate-bash": String.raw`## Why it works
Any geometric relation — distance, area, collinearity, perpendicularity, "lies on a circle" — is an algebraic equation in coordinates. Once the figure is placed, deduction becomes computation that can't get stuck, at the cost of some algebra.

## How to use it
The whole art is the placement, chosen to zero out coordinates: a right angle at the origin, one side along the $x$-axis, a center or a midpoint at the origin to exploit symmetry, a convenient unit length. Then reach for the standard tools — distance formula, section formula, shoelace area, slope conditions ($m_1 m_2 = -1$ for perpendicular), the circle equation, or the dot product. Keep a variable or two general so the result isn't accidentally special. When the algebra balloons, that's the sign a synthetic idea (similar triangles, power of a point) is the intended shortcut.

## On contests
The reliable fallback across AMC and AIME when no clever synthetic step appears — especially strong on problems with right angles, midpoints, or an obvious axis of symmetry. The tradeoff is time and arithmetic care; reach for it once the elegant path has failed to show itself, not before.`,

"auxiliary-lines": String.raw`## Why it works
A well-chosen extra segment exposes a structure the original figure only implied — a right angle, a pair of similar or congruent triangles, a parallelogram, a cyclic quadrilateral. The relationships were always there; the line makes them usable.

## How to use it
Know the repertoire by trigger. Trapezoid or unknown height: drop perpendiculars to the base. Two segments you want to relate: translate one (slide a diagonal to sit beside the other). Cevian ratios: extend the cevian to meet a line through a vertex parallel to the opposite side, creating similar triangles. Anything tangent: draw the radius to the point of tangency for a guaranteed right angle. A broken path to minimize: reflect an endpoint to straighten it. A near-symmetry: rotate a piece to complete it.

## On contests
The characteristic "aha" of synthetic geometry. On AMC, one perpendicular or one radius usually cracks the problem; on AIME and beyond, the reflection and rotation constructions (also see the reflection and rotation method cards) turn minimization and length-sum problems into single straight segments. When stuck, ask which of these six lines the figure is begging for.`

});

Object.assign(window.MATH_DETAILS, {

"trig-bash": String.raw`## Why it works
The Law of Sines and Law of Cosines are complete: together they determine every triangle from any valid combination of sides and angles. So naming one unknown angle makes every other length and angle in a triangulated figure a function of it, and the given constraint becomes a single equation in that one variable.

## How to use it
Pick the variable that the constraints touch most — usually an angle at a vertex where several triangles meet. Then propagate: $\frac{a}{\sin A} = 2R$ moves between a side and its opposite angle (and hands you the circumradius for free), $c^2 = a^2 + b^2 - 2ab\cos C$ handles a side sandwiched between two known ones, and $[ABC] = \frac{1}{2}ab\sin C$ converts an area condition into a trig one. Collapse the resulting equation with the standard identities — sum-to-product, double angle, and the $A + B + C = 180^\circ$ identities. Watch the ambiguous SSA case, and prefer cosines when you need to avoid a sign ambiguity.

## On contests
The reliable AIME fallback for configurations with awkward angles where coordinates get messy — especially cyclic figures, where the inscribed-angle theorem makes many angles equal and $2R$ ties everything together. Like coordinate bashing, it trades elegance for a guaranteed finish; reach for it after the synthetic ideas have been tried.`,

"complex-bash": String.raw`## Why it works
Complex multiplication is exactly "rotate and scale": $|wz| = |w||z|$ and $\arg(wz) = \arg w + \arg z$. So a rotation by $\theta$ about the origin is multiplication by $e^{i\theta}$, and about any point $p$ it is $z \mapsto p + e^{i\theta}(z - p)$. Because rotation is a single algebraic operation, configurations built from rotations — equilateral triangles, squares on the sides of a figure, regular polygons — become short algebra instead of long angle chases.

## How to use it
Place a convenient point at the origin, ideally a center of symmetry, and scale so a key length is $1$. Then: the vertices of a regular $n$-gon centered at the origin are $R\omega^k$ with $\omega = e^{2\pi i/n}$; the centroid of $a, b, c$ is $\frac{a+b+c}{3}$; $\frac{c - a}{b - a}$ encodes both the ratio $\frac{|ac|}{|ab|}$ and the angle at $a$ (real ⟺ collinear, purely imaginary ⟺ perpendicular); and $a + \omega b + \omega^2 c = 0$ with $\omega = e^{2\pi i/3}$ says $abc$ is equilateral. Conjugates handle reflections: reflecting across the real axis is $z \mapsto \bar z$.

## On contests
The clean route through rotation-heavy configurations — Napoleon's theorem, squares erected on a quadrilateral's sides (van Aubel), and regular-polygon distance products, where the roots-of-unity factorization $\prod(x - \omega^k)$ does the work. Standard on olympiads and a slick alternative on hard AIME geometry; see also the rotation trick and spiral similarity cards for the synthetic versions of the same ideas.`,

"affine-transformations": String.raw`## Why it works
An affine map $v \mapsto Mv + t$ sends lines to lines and preserves ratios along each line, so midpoints, "divides in ratio $2{:}3$," and parallelism all survive. Its Jacobian $\det M$ is constant, so it scales every area by the same factor $|\det M|$ — which cancels in any ratio of areas. What it destroys matters just as much: angles, lengths, perpendicularity, and "a circle stays a circle" all change, so those quantities are off-limits.

## How to use it
Two moves cover almost everything. (1) Ellipse → circle: the scaling $(x, y) \mapsto (x, \tfrac{a}{b}y)$ turns $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$ into a circle of radius $a$; solve the circle problem, then any affine-invariant answer (an area ratio, a midpoint, a tangency, a ratio of parallel chords) transfers back unchanged, while a bare area picks up the factor $\frac{a}{b}$. (2) Triangle → equilateral: a unique affine map sends any triangle to any other, so a question about ratios of areas inside a triangle can be solved on the equilateral one and read off by symmetry.

## On contests
A genuine AIME time-saver on ellipse problems and on "ratio of these two regions of a triangle," and a standard olympiad simplification ("WLOG the triangle is equilateral"). The one discipline is checking that the quantity asked for is affine-invariant — applied to an angle or an absolute length, the answer is simply wrong.`,

"pole-polar": String.raw`## Why it works
Fix a circle of radius $R$ about $O$. The polar of $P$ is the line of points $Q$ with $\vec{OP} \cdot \vec{OQ} = R^2$; for $P$ outside, that line is exactly the chord of contact through the two tangency points. The defining relation is symmetric in $P$ and $Q$ — La Hire's theorem: $P \in \operatorname{polar}(Q) \iff Q \in \operatorname{polar}(P)$. Because polarity swaps points with lines while preserving incidence, "collinear" and "concurrent" become dual statements, so proving one proves the other.

## How to use it
The trigger is tangents and secants from a common external point. Then: (1) the chord of contact is a polar you can name; (2) to show three points collinear, show each lies on the polar of one common point (La Hire); (3) a secant from $P$ meeting the circle at $X, Y$ and the polar at $Q$ is a harmonic range $(X, Y; P, Q) = -1$, i.e. $\frac{XP}{YP} = \frac{XQ}{YQ}$, pinning an unknown length with no angle chase. Harmonic ranges stay harmonic under projection, so the relation transports across the whole figure.

## On contests
Olympiad geometry, where a tangents-and-secants configuration that looks like a trig marathon collapses to two lines of projective bookkeeping. Rarely needed below the olympiad level, but decisive when the figure is built from poles, polars, and harmonic conjugates. Pairs naturally with the radical-axis and power-of-a-point ideas.`,

"directed-angles": String.raw`## Why it works
Measuring angles between lines (not rays) modulo $180^\circ$ makes the two workhorse facts unconditional: $\angle(PA, PB) = \angle(QA, QB)$ iff $A, B, P, Q$ are concyclic (or collinear), and $\angle(PA, PB) + \angle(PB, PC) = \angle(PA, PC)$ always. No case split for "$P$ inside vs. outside the circle" or "same vs. opposite arc" — the supplementary-angle ambiguity is precisely the $180^\circ$ you quotiented away.

## How to use it
Write every angle as $\angle(\ell_1, \ell_2)$, oriented consistently, and compute mod $180^\circ$. Concyclicity becomes one equation you can chain through several circles at once; tangency is the limiting case $\angle(\text{tangent}, \text{chord}) = \angle(\text{inscribed})$. Additivity makes long chases telescope. Mind the limits: directed angles detect collinearity and concyclicity but cannot compare lengths, orient a triangle, or split an angle from its explement — use them to prove incidence, then switch tools for anything metric.

## On contests
Pure olympiad hygiene: the standard way to write an angle chase so one argument covers every configuration a grader might draw, dodging the "what if the point is on the other side" trap. Not something you would cite on AMC/AIME, where numeric answers don't need it, but essential for airtight synthetic write-ups.`,

"phantom-point": String.raw`## Why it works
The point you want is often over-determined: the claim to prove ("$X$ lies on line $\ell$," "the circle passes through $X$") is one condition more than the construction needs. So rather than compute $X$ and verify the extra condition, define $X'$ by that condition and verify it satisfies the construction. Two loci that meet in at most two points (two circles, or a circle and a line) share at most two points, so identifying $X$ and $X'$ as "the second intersection beyond a known common point" forces $X = X'$.

## How to use it
Let $X'$ be the point defined by the target property — the second meeting of a circle and a line, a reflection, an intersection with $\ell$. Then prove $X'$ lies on whatever curves define the genuine $X$, usually a one-step angle, power-of-a-point, or similar-triangles check. Conclude $X = X'$ and the property is proved. It is the write-up dual of an auxiliary construction: add the point you wish existed, then show it is the one you already had.

## On contests
An olympiad technique for concurrency, collinearity, and "prove this circle passes through that point," especially when the honest intersection is algebraically hideous. It converts a hard incidence claim into an easy uniqueness argument. No role on short-answer contests, but a workhorse for synthetic olympiad solutions; see the auxiliary-lines card for its constructive cousin.`,

"area-method": String.raw`## Why it works
Two triangles sharing a base have areas in the ratio of their apex heights, and two sharing an apex have areas in the ratio of their bases — so a length ratio and an area ratio are interchangeable. Using signed areas keeps the identity valid for points on either side of a line, so the bookkeeping never breaks at a configuration boundary. Chaining these swaps expresses any ratio in the figure through areas, where shared bases and heights cancel on their own.

## How to use it
Pick the triangles that share the segments you care about, then trade each length ratio for the matching area ratio: $\frac{BD}{DC} = \frac{[ABD]}{[ACD]}$ for $D$ on $BC$, and a point $P$ on cevian $AD$ has $\frac{[PBC]}{[ABC]} = \frac{PD}{AD}$. To locate where two cevians cross, write both target ratios as areas and solve. It reproduces Ceva and Menelaus in a line or two, and unlike mass points it survives points outside the triangle and parallel-line setups, where no consistent masses exist.

## On contests
The reliable engine behind "in what ratio is this segment divided" on AMC 12 and AIME, and a clean substitute for mass points when the configuration spills outside the triangle. On olympiads it underlies affine-style area arguments. The cost is a little algebra; the payoff is a method that never gets stuck on which case you are in.`

});

Object.assign(window.MATH_DETAILS, {

"triangle-center-angles": String.raw`## Why it works
Each formula is a short angle chase from that center's defining property. Circumcenter: the inscribed-angle theorem says the arc $BC$ subtends $\angle A$ at the circumference and twice that, $2A$, at the center $O$. Incenter: in $\triangle BIC$ the angles at $B$ and $C$ are the halves $\frac{B}{2}, \frac{C}{2}$, so $\angle BIC = 180^\circ - \frac{B+C}{2} = 180^\circ - \frac{180^\circ - A}{2} = 90^\circ + \frac{A}{2}$. Orthocenter: $\angle BHC$ is the supplement of $\angle A$ because the two altitude feet make $BHC A$ concyclic-adjacent, giving $180^\circ - A$.

## How to use it
Reach for these whenever a problem places $O$, $I$, or $H$ and asks about an angle — they collapse a configuration to arithmetic in the vertex angles. The incenter one, $\angle BIC = 90^\circ + \frac{A}{2}$, is the most used: it pins the incenter's position and pairs perfectly with the incenter–excenter lemma. The excenter opposite $A$ satisfies the companion $\angle BI_AC = 90^\circ - \frac{A}{2}$. Sign-check with an equilateral triangle ($A = 60^\circ$): $\angle BOC = 120^\circ$, $\angle BIC = 120^\circ$, $\angle BHC = 120^\circ$ — all equal, as symmetry demands.

## On contests
Staples of AMC/AIME configuration problems and a routine first step in olympiad angle chases. Memorize the incenter formula cold; derive the other two on the spot from the inscribed-angle theorem and the altitude-supplement fact if you blank.`

});

Object.assign(window.MATH_DETAILS, {

"apollonius-circle": String.raw`## Why it works
Fix $k = PA/PB$ and put $A, B$ on the $x$-axis. The equation $PA^2 = k^2 PB^2$ is quadratic in $x, y$ with equal $x^2, y^2$ coefficients and no cross term — a circle. Its two intersections with line $AB$ are the points dividing $AB$ in ratio $k$ internally and externally, so those are diametrically opposite, which fixes the center (on $AB$) and radius. At $k = 1$ the squared terms cancel and the locus degenerates to the perpendicular bisector.

## How to use it
Whenever a constraint reads $PA = k \cdot PB$, the point lives on a known circle: locate the internal and external division points of $AB$ in ratio $k$ and use them as a diameter. In a triangle, the three Apollonius circles (one per vertex pair, using the opposite side ratios) pass through the two isodynamic points, and each contains the feet of the internal and external bisectors from that vertex — the link to symmedians and isogonal conjugates.

## On contests
AIME locus and "ratio of distances" problems, and olympiad configurations with isogonal conjugates, symmedians, and isodynamic points. Keep it distinct from Apollonius's Theorem (the median-length relation) — same name, unrelated result.`,

"pappus-centroid": String.raw`## Key forms
- $V=2\pi d\cdot A$ — solid of revolution: area times the centroid's travel
- $S=2\pi d\cdot L$ — surface of revolution: arc length times the centroid's travel
- torus: $V=2\pi^2Rr^2,\ S=4\pi^2Rr$ — the standard example

## Why it works
Slice the revolving region into thin strips parallel to the axis. A strip of area $dA$ at distance $\rho$ sweeps a ring of volume $2\pi\rho\,dA$, so $V = 2\pi\int \rho\,dA = 2\pi\bar\rho A$, where $\bar\rho = \frac{\int \rho\,dA}{A}$ is precisely the centroid's distance $d$ from the axis. The identical argument on a curve of length $L$ gives the surface $S = 2\pi d\,L$. Once you know the centroid, no integration remains.

## How to use it
Turn any solid or surface of revolution into a centroid lookup. For symmetric regions the centroid is free — a disk's is its center — giving the torus formulas $V = 2\pi^2 R r^2$ and $S = 4\pi^2 R r$ in one line. For composite regions, find the centroid as the area-weighted average of the parts. It also runs backward: a measured volume of revolution pins an unknown centroid distance.

## On contests
Torus and solid-of-revolution problems on AIME (e.g. the 2024 AIME II torus) and beyond. It replaces a revolution integral with a single centroid — the fast path precisely when a cross-section is spun about an external axis. Pairs with Cavalieri's Principle for volume comparisons.`

});

Object.assign(window.MATH_DETAILS, {

"projection-formula": String.raw`## Key forms
- $a=b\cos C+c\cos B$ — a side as the sum of the other two's projections
- $b=c\cos A+a\cos C$ — cyclic version
- $c=a\cos B+b\cos A$ — cyclic version

## Why it works
Drop the altitude from $A$ to $BC$ at foot $H$. In the two right triangles, $BH = c\cos B$ and $HC = b\cos C$, and $a = BH + HC$. The other two identities are the same construction from $B$ and $C$.

## How to use it
It's the fastest linear relation between a side and its two adjacent base angles — no squaring. Adding the three, or eliminating cosines between them, reproduces the Law of Cosines, so reach for projection when you want the cosines to appear linearly rather than quadratically.

## On contests
A cheap AMC 12 / AIME identity, handy inside trig-bash and whenever an altitude foot splits a side. Underused because it looks too elementary to matter.`,

"triangle-half-angle-identities": String.raw`## Key forms
- $\sin\frac A2\sin\frac B2\sin\frac C2=\dfrac{r}{4R}$ — product of half-angle sines
- $\cos\frac A2\cos\frac B2\cos\frac C2=\dfrac{s}{4R}$ — product of half-angle cosines
## Why it works
All follow from $a = 2R\sin A$ and the incircle tangent-length picture. Area $= \frac{abc}{4R} = 2R^2\sin A\sin B\sin C$; combining $r = (s-a)\tan\frac A2$ with the half-angle formulas gives $r = 4R\sin\frac A2\sin\frac B2\sin\frac C2$; and $\sin\frac A2 = \sqrt{(s-b)(s-c)/bc}$ is the half-angle formula applied to $\cos A = \frac{b^2+c^2-a^2}{2bc}$.

## How to use it
These convert freely between a triangle's sides and its $(R, r, \text{angles})$ data — given $R$ and $r$, or the angles, they hand you area, exradii, and side ratios. The two to memorize are $r = 4R\sin\frac A2\sin\frac B2\sin\frac C2$ and $\cos A + \cos B + \cos C = 1 + \frac rR$.

## On contests
AIME triangle problems that give you $R$ and $r$, and olympiad identities. Pair them with the incircle/excircle tangent lengths and the Law of Sines.`,

"mollweides-formula": String.raw`## Why it works
From $a = 2R\sin A$ etc., $\frac{a+b}{c} = \frac{\sin A + \sin B}{\sin C}$; sum-to-product on top and $\sin C = 2\sin\frac C2\cos\frac C2$ with $A + B = \pi - C$ collapse it to $\frac{\cos\frac{A-B}{2}}{\sin\frac C2}$. The $a-b$ version is the companion.

## How to use it
Because each formula uses all three sides and all three angles, they are the standard check on a solved triangle — plug in and both sides must agree, catching any arithmetic slip. Dividing the two Mollweide relations gives the Law of Tangents.

## On contests
Olympiad-tier, mainly a consistency check or a bridge to the Law of Tangents. Good to recognize; seldom the quickest route.`,

"morleys-theorem": String.raw`## Why it works
Intersecting adjacent angle trisectors yields three points; a trigonometric computation — cleanest run backward, starting from an equilateral triangle and reconstructing the original angles — shows they are mutually equidistant. The Morley triangle has side $8R\sin\frac A3\sin\frac B3\sin\frac C3$.

## How to use it
Treat it as a result to recognize, not a computational tool — angle trisection makes it nearly useless for solving. If a configuration literally builds adjacent-trisector intersections, the equilateral conclusion (and the side formula) is the payoff.

## On contests
Famous and beautiful, but essentially never the intended method — a curiosity kept for completeness. Reach for ordinary angle-chasing or trig instead.`,

"gergonne-nagel-points": String.raw`## Why it works
Both are Ceva concurrences. Gergonne: incircle tangent lengths give equal pairs, so the Ceva product for the cevians to the touch points is $1$. Nagel: the $A$-excircle touches $BC$ with $BX' = s-c$, $CX' = s-b$; Ceva again gives concurrence, and the Nagel point $N$, centroid $G$, and incenter $I$ are collinear with $NG = 2\,GI$ (the Nagel line).

## How to use it
Recognize "cevians to the incircle/excircle contact points" and invoke concurrence instead of re-deriving it. The Nagel line $I$–$G$–$N$ mirrors the Euler line, and the Nagel point is the isotomic conjugate of the Gergonne point.

## On contests
Olympiad triangle geometry and the occasional AIME contact-point setup. Companions to the Lemoine, Fermat, and Brocard points — know they exist and concur.`,

"newtons-line": String.raw`## Why it works
In a complete quadrilateral the midpoints of the three diagonals are collinear — an affine fact provable by vectors. For a tangential quadrilateral, equal tangent lengths balance the areas so that the incenter also lands on the line through the two diagonal midpoints (Newton's line).

## How to use it
When a quadrilateral problem features the midpoints of the diagonals, expect the Newton–Gauss collinearity; if the quadrilateral has an inscribed circle, add the incenter to that line. It proves specific three-point collinearities without coordinates.

## On contests
Olympiad quadrilateral configurations — a niche collinearity worth having in the toolbox.`,

"convex-position": String.raw`## Why it works
The Happy Ending theorem is a Ramsey/pigeonhole argument on quadruples. Its base case — any $5$ points in general position contain $4$ in convex position — is a short convex-hull case check: a hull of $5$ or $4$ points gives a convex quadrilateral outright, and a triangular hull with two interior points yields one via the line through the interior pair.

## How to use it
When a problem guarantees "some $k$ points form a convex polygon," compare the count against $\mathrm{ES}(k)$. Organize by the convex hull — extreme points are the polygon's candidates, interior points the leftovers.

## On contests
Olympiad combinatorial geometry. Know $\mathrm{ES}(4) = 5$, $\mathrm{ES}(5) = 9$, and the extremal/hull flavor of the arguments.`,

"sylvester-gallai": String.raw`## Why it works
Among all (point, connecting-line) pairs with positive distance, take the closest. If that line held a third point, two of the three would fall on the same side of the perpendicular foot, giving a strictly closer point–line pair — a contradiction. So the minimal-distance line is ordinary (exactly two points).

## How to use it
It guarantees an "ordinary line" whenever the points aren't all collinear — handy to seed inductions (delete two points on an ordinary line) or to force collinearity structure. Often the technique (minimize a distance) matters more than citing the theorem.

## On contests
Olympiad combinatorial geometry; the minimal-distance extremal argument is a model to imitate. A classic to recognize.`,

"hellys-theorem": String.raw`## Why it works
Induct using Radon's theorem: any $d+2$ points in $\mathbb{R}^d$ partition into two sets whose convex hulls intersect, which lets you merge the "every $d+1$ meet" hypotheses upward until all sets share a point. In the plane $d + 1 = 3$.

## How to use it
To prove a family of convex regions has a common point, check only that every three do — Helly promotes it to all. It is the tool for "one point/line stabs everything" and dual piercing problems. Convexity is essential; without it the conclusion fails.

## On contests
Olympiad combinatorial geometry. Remember the plane version ("every 3 ⟹ all") and that it requires convex sets.`,

"minkowski-lattice": String.raw`## Why it works
Shrink the region by $\frac12$: if the original area exceeds $4$, the half-region has area $> 1$, so its integer translates overlap (pigeonhole on the unit torus). Two overlapping translates differ by a nonzero lattice vector, and central symmetry plus convexity place that vector's endpoint inside the original region.

## How to use it
To force a nonzero lattice point — hence a small integer solution — enclose your constraint in a centrally symmetric convex region of area $> 4$ (volume $> 2^d$ in higher dimensions). It proves Fermat's two-squares theorem via a suitable ellipse and underlies Dirichlet-style approximation bounds.

## On contests
Olympiad "geometry of numbers." Niche, but the standard move when you must produce a lattice point inside a symmetric convex shape.`

});

// Detail bodies added for important medium+ theorems that had only a short description.
Object.assign(window.MATH_DETAILS, {

"median-to-hypotenuse": String.raw`## Why it works
Thales' theorem: the hypotenuse subtends a right angle, so all three vertices lie on a circle with the hypotenuse as diameter. Its center — the midpoint $M$ of the hypotenuse — is therefore equidistant from every vertex, and that common distance is the radius $R = \tfrac{c}{2}$. The median $CM$ is simply one of those radii.

## How to use it
The instant you see a right angle, drop in the circumcircle: the right-angle vertex sits on a circle whose diameter is the opposite side. That collapses "median to the hypotenuse," "distance from the right-angle vertex to the hypotenuse midpoint," and "circumradius" into the single value $\tfrac{c}{2}$. The converse is a right-angle detector: if a median equals half the side it hits, the opposite angle is $90^\circ$.

## On contests
A staple of MATHCOUNTS and early AMC, often the hidden step that turns a messy right-triangle configuration into a clean circle. Look for it when a problem gives a right angle and asks for a distance to a midpoint, or gives a midpoint distance equal to half a side and wants perpendicularity.`,

"same-base-area-ratio": String.raw`## Why it works
Area is $\tfrac12(\text{base})(\text{height})$, so two triangles on the same base differ only in height. When the apexes $A$ and $C$ lie on a line meeting the base line at $P$, similar triangles make each apex's distance to the base proportional to its distance to $P$ along that line — so the height ratio is read off directly as $AP : PC$.

## How to use it
Whenever a segment is cut by another — a cevian, a diagonal, two crossing chords — read the division ratio as a ratio of triangle areas sharing a base, and back again. Chaining several such ratios around a figure is exactly the area method; assigning masses at the endpoints so the ratios balance is mass points. Both replace similar-triangle bookkeeping with one-line area comparisons.

## On contests
The workhorse behind "in what ratio does this diagonal or cevian cut that one?" on AMC/AIME, and the quiet engine inside Routh, Ceva, and mass-point solutions. When a problem asks for a ratio and the figure is full of triangles sharing bases, this usually beats coordinates.`,

"angle-bisector-circumcircle": String.raw`## Key forms
- $AB\cdot AC=AL\cdot AD$ — the bisector-chord product (similar triangles)
- $LB\cdot LC=LA\cdot LD$ — power of the incenter/foot $L$
- $DB=DC$ — the bisector meets the arc midpoint, equidistant from $B$ and $C$

## Why it works
The bisector of $\angle A$ splits arc $BC$ into two equal arcs, so its second intersection $D$ is the arc midpoint and $DB = DC$. The similarity $\triangle ABL \sim \triangle ADC$ is a one-line angle chase: the bisected angle at $A$ is shared, and $\angle ABL = \angle ADC$ since both subtend arc $AC$. That gives $AB\cdot AC = AL\cdot AD$, while Power of the Point $L$ on chord $BC$ gives $LB\cdot LC = LA\cdot LD$.

## How to use it
When a bisector or its length meets the circumcircle, extend it to the arc midpoint $D$ and pick the relation you need: $AD = \dfrac{bc}{AL}$ recovers the whole chord, $LD = AD - AL$ gives the piece past $BC$, and $DB = DC = DI$ (Fact 5) ties $D$ to the incenter. Together they turn "bisector extended to the circumcircle" into pure length algebra.

## On contests
A recurring AIME configuration — the answer usually falls out of $AB\cdot AC = AL\cdot AD$ combined with the bisector-length formula. The arc-midpoint fact $DB = DC$ also seeds many olympiad angle chases and incenter-excenter arguments.`,

"isogonal-conjugate": String.raw`## Why it works
Reflecting each cevian over its angle bisector is an involution on the directions through a vertex, and the trigonometric form of Ceva is symmetric under swapping each angle's two parts. So if $AP, BP, CP$ concur, the three reflected cevians satisfy the very same concurrency condition and meet at one point $P^*$. The shared pedal circle follows because the reflections send the six perpendicular feet onto a common circle centered at the midpoint of $PP^*$.

## How to use it
Recognize a pair rather than compute it: if a point is built by reflecting cevians over bisectors, its conjugate is often a familiar center. Swap a hard point for an easy one using $O \leftrightarrow H$, $G \leftrightarrow K$ (symmedian point), incenter self-conjugate, and Fermat $\leftrightarrow$ isodynamic. The common pedal circle turns "these six feet are concyclic" into a one-word reason.

## On contests
Olympiad geometry, where naming an isogonal pair collapses a concurrency or collinearity to a known center. The symmedian — the isogonal of the median — is the most frequent special case at AIME level.`,

"pedal-triangle": String.raw`## Why it works
Writing each vertex of the pedal triangle as the projection of $P$ onto a side and expanding gives the area factor $\dfrac{|R^2 - OP^2|}{4R^2}$ directly. When $OP = R$ the factor is $0$: the three feet fall on a line — exactly the Simson line — so Simson is just the pedal triangle degenerating.

## How to use it
Read the position of $P$ off the one area formula. $P$ on the circumcircle ($OP = R$) gives the degenerate Simson line; $P = O$ gives the medial triangle (quarter area); $P = I$ gives the contact triangle; $P = H$ gives the orthic triangle. When a problem drops perpendiculars to all three sides, find $OP$ and let the formula deliver the area.

## On contests
Simson-line problems and "area of the triangle formed by the three feet" questions on AIME/olympiad reduce to this single formula. Spotting that a configuration is a pedal triangle in disguise often replaces a page of coordinates with one substitution.`,

"orthic-triangle": String.raw`## Why it works
Each altitude foot sees the opposite side at a right angle, so pairs of feet are concyclic with the vertices; a short angle chase then yields the orthic angles $\pi - 2A$ and shows each orthic side is antiparallel to the matching side of $ABC$. The perimeter identity is $a\cos A = R\sin 2A$ summed with $\sin 2A + \sin 2B + \sin 2C = 4\sin A\sin B\sin C$, and the area factor $2\cos A\cos B\cos C$ comes from removing the three corner triangles.

## How to use it
Treat $H$ as the incenter of the orthic triangle: the altitudes of $ABC$ are its angle bisectors, which explains the reflect-$H$ facts and the Fagnano minimal-perimeter property. Use the perimeter $= \dfrac{2[ABC]}{R} = 4R\sin A\sin B\sin C$ and area $= 2\cos A\cos B\cos C\,[ABC]$ directly, and recall the orthic triangle is inscribed in the nine-point circle (radius $\tfrac R2$).

## On contests
The least-perimeter inscribed triangle (Fagnano) and the reflect-$H$-onto-the-circumcircle facts are the recurring AIME/olympiad uses. For an obtuse triangle, note that $H$ becomes an excenter of the orthic triangle instead — a frequent trap.`,

"medial-triangle": String.raw`## Why it works
The midpoints halve every side, so each of the four small triangles is similar to $ABC$ with ratio $\tfrac12$ (SAS on the midsegments) — hence quarter area and half perimeter apiece. The medial triangle is the image of $ABC$ under the homothety centered at the centroid $G$ with ratio $-\tfrac12$, which is why $G$ is shared and the orientation flips.

## How to use it
Pass to the medial triangle to shrink a problem by a fixed factor, or read off incoming structure: its circumcircle is the nine-point circle, its incenter is the Spieker point, and the homothety $(G, -\tfrac12)$ sends centers of $ABC$ to centers of the medial triangle. The four-congruent-triangles picture also proves midsegment and area-quartering claims at a glance.

## On contests
"Connect the midpoints" configurations on AMC/AIME resolve through the quarter-area and homothety facts, and the nine-point-circle link is the bridge into Euler-line problems.`,

"surface-shortest-path": String.raw`## Why it works
Flattening a developable surface — a box's faces, a cylinder, a cone — into a plane preserves lengths measured along the surface, so a shortest surface path maps to a shortest planar path, i.e. a straight segment. Its length in the unfolded net is the true geodesic distance.

## How to use it
Decide which faces the path crosses, unfold exactly those into one plane, place the two endpoints, and take the straight-line distance. A box offers three ways to unfold a corner-to-corner route, so compute $\sqrt{(a+b)^2 + c^2}$ for each pairing and keep the smallest. Unroll a cylinder into a rectangle (height by circumference-arc) and a cone into a sector of radius equal to its slant height.

## On contests
Spider-and-fly and ant-on-a-box problems from MATHCOUNTS through AMC are the classic appearances. The trap is comparing against the straight-through-space diagonal, which is shorter but not allowed on the surface — and remember to test every unfolding, since the shortest is not always over the obvious pair of faces.`

});

// Detail bodies added for dense medium-importance cards.
Object.assign(window.MATH_DETAILS, {

"altitude-bisector-angle": String.raw`## Why it works
Measure directions from $A$. The altitude to $BC$ makes angle $90^\circ - B$ with side $AB$; the circumradius $AO$ makes angle $90^\circ - B$ with the OTHER side $AC$ (from the inscribed-angle relation $\angle AOC$ gives $\angle OAC = 90^\circ - B$), so the altitude and $AO$ are mirror images in the $A$-bisector — that is exactly "isogonal." Since the bisector sits at $\tfrac A2 = 90^\circ - \tfrac{B+C}{2}$ from $AB$, its gap to the altitude is $(90^\circ - B) - \left(90^\circ - \tfrac{B+C}{2}\right) = \tfrac{C-B}{2}$.

## How to use it
Use the bisector as an axis of symmetry: the altitude and $AO$ each lie $\tfrac{|B-C|}{2}$ off it, so any one of the three directions gives the other two. This is also the clean reason the orthocenter and circumcenter are isogonal conjugates — reflecting all three altitudes over the corresponding bisectors carries $H$ to $O$.

## On contests
Handy on AIME/olympiad configurations that involve both an altitude and the circumcenter, or that ask directly for the angle between an altitude and a bisector: the value $\tfrac{|B-C|}{2}$ drops out immediately, and the isogonal framing unlocks $O \leftrightarrow H$ arguments.`,

"incenter-area-split": String.raw`## Why it works
The incircle is tangent to all three sides, so the incenter is a distance $r$ from each — and that $r$ is the height of each sub-triangle onto the side it rests on. Hence $[BIC] = \tfrac12 a r$, $[CIA] = \tfrac12 b r$, $[AIB] = \tfrac12 c r$, proportional to $a,b,c$. Adding gives $[ABC] = \tfrac12(a+b+c)r = rs$, the standard area formula, and dividing gives $[BIC] = \frac{a}{a+b+c}[ABC]$.

## How to use it
Read a side-length ratio straight off as an area ratio, or the reverse. Because the three areas are the natural weights, they are exactly the incenter's barycentric coordinates $(a:b:c)$, so $I = \frac{aA+bB+cC}{a+b+c}$ — the quickest way to drop the incenter into a coordinate or vector bash. The same "join the point to the vertices" split works for any interior point, with the three sub-areas as its barycentric weights.

## On contests
AMC/AIME problems asking what fraction of the area a sub-triangle occupies, or needing incenter coordinates, use this directly; it is also the one-line derivation of $[ABC] = rs$ whenever you need $r$.`,

"orthocentric-system": String.raw`## Why it works
The defining relations are symmetric: $AH \perp BC$ also says $A$ lies on the altitude of $\triangle HBC$ from $A$, and running that around all sides shows each of the four points is the orthocenter of the triangle on the other three. Reflecting $H$ over side $BC$ lands on $\odot(ABC)$, so $\odot(HBC)$ is the mirror image of $\odot(ABC)$ across $BC$ — same radius $R$. And all four triangles share one nine-point circle: the midpoints of the six segments joining pairs of $\{A,B,C,H\}$, together with the three altitude feet, are the same nine points for every one of the four triangles.

## How to use it
Treat $H$ as a fourth vertex — any fact about a triangle and its circumcircle transfers to the other three triangles for free (reflect $H$ onto the circumcircle, or swap $H$ with a vertex to reuse a lemma). The four circumcenters $O_{ABC}, O_{HBC}, \dots$ form a second orthocentric system congruent to the first, and the common nine-point center is the midpoint of the whole configuration.

## On contests
Olympiad configurations built on a triangle and its orthocenter simplify once you spot the symmetry; the shared nine-point circle also ties these to Euler-line and Feuerbach problems.`,

"common-chord-length": String.raw`## Why it works
Both endpoints of the common chord lie on each circle, so the segment is a chord of both, and the line of centers is its perpendicular bisector — meeting it at right angles at its midpoint. Writing the half-chord $h$ two ways, $h^2 = R^2 - d_1^2$ from one circle and $h^2 = r^2 - d_2^2$ from the other with $d_1 + d_2 = d$, and subtracting gives $d_1 = \frac{d^2 + R^2 - r^2}{2d}$ — which is just the location of the radical axis.

## How to use it
Compute $d_1$ from the three lengths, then the chord is $2\sqrt{R^2 - d_1^2}$; you never need the intersection points. The same setup gives the distance between the two intersection points of any two circles, and using $d_2 = d - d_1$ gives a free check, since both circles must return the same half-chord. Real intersection requires $|R-r| \lt d \lt R+r$.

## On contests
A recurring AIME computation — "two circles meet; find their common chord" — and the workhorse behind lens/overlap-area problems, where the chord splits the lens into two circular segments.`,

"incircle-excircle-touch": String.raw`## Why it works
Equal tangents from a vertex fix the incircle contact distances: the two tangents from $B$ are equal, forcing the touch point on $BC$ to be $s-b$ from $B$. The $A$-excircle (opposite $A$) touches $BC$ with the roles of $b$ and $c$ swapped, at $s-c$ from $B$. Since $(s-b) + (s-c) = a$, those two points average to $\tfrac a2$ — the midpoint $M$ of $BC$ — so they are reflections of each other in $M$, a distance $(s-b) - (s-c) = |b-c|$ apart.

## How to use it
Place both contact points instantly from the side lengths, and use $M$ as their shared midpoint to relate incircle and excircle configurations. The gap $|b-c|$ measures how far from isosceles the triangle is; it is $0$ exactly when $b = c$, where both circles touch $BC$ at its midpoint.

## On contests
Useful whenever a problem mixes the incircle and an excircle on one side, or asks for the distance between contact points; it also pairs with the reflection facts used in mixtilinear-incircle and $A$-excircle lemmas.`,

"integer-triangles-perimeter": String.raw`## Key forms
- $n$ even: $\operatorname{round}(n^2/48)$ — noncongruent integer triangles of perimeter $n$
- $n$ odd: $\operatorname{round}((n+3)^2/48)$ — the odd-perimeter count (Alcuin's sequence)

## Why it works
Count triples ordered by size, $a\le b\le c$, with $a+b+c=n$ and the single binding constraint $a+b\gt c$ — equivalently $c\lt n/2$, since the other two inequalities are automatic once the sides are sorted. Fix the longest side $c$; then $a+b=n-c$ with $a\le b\le c$, a short run of $(a,b)$ to count. Summing the counts over the allowed $c$ gives a quadratic in $n$, and it collapses to the nearest integer to $n^2/48$ for even $n$ (and $(n+3)^2/48$ for odd $n$) — Alcuin's sequence.

## How to use it
For a specific small $n$, skip the closed form and just sweep: let $c$ run from $\lceil n/3\rceil$ up to $\lfloor (n-1)/2\rfloor$ and count valid $(a,b)$ for each. The rounded formula is the quick check on a full count. Variants adjust the same sweep — require distinct sides ($a\lt b\lt c$), a fixed shape (isosceles, right), or a cap on a side — by changing only the inner count.

## On contests
"How many triangles with integer sides and perimeter $n$" is a recurring MATHCOUNTS/AMC question. The fix-the-longest-side sweep is reliable under time pressure, and the round-to-nearest formula lets you confirm the answer in one line.`,

"equal-chords-arcs": String.raw`## Why it works
All three conditions come from the same congruent triangles at the center. A chord of length $\ell$ at distance $d$ from the center $O$ (radius $R$) satisfies $\ell=2\sqrt{R^2-d^2}$, so $\ell$ and $d$ determine each other; equal chords force equal $d$ and conversely. The isosceles triangles formed by $O$ and a chord's endpoints subtend equal central angles when the chords are equal, and equal central angles cut equal arcs — so "equal chords," "equal arcs," and "equal distance from center" are one fact viewed three ways.

## How to use it
The perpendicular from $O$ to a chord bisects the chord (the two right triangles $O$–foot–endpoint are congruent) and bisects its arc too — the standard route to a chord's or arc's midpoint. From $\ell=2\sqrt{R^2-d^2}$, a larger $\ell$ means a smaller $d$: the longer chord sits closer to the center, and the diameter ($d=0$) is longest. Use the same relation to convert a chord length to its distance from the center, or back, in one step.

## On contests
These appear in "two equal chords" configurations, in midpoint/bisection constructions, and any time you must turn a chord length into its distance from the center (or the reverse) — the $\ell=2\sqrt{R^2-d^2}$ bridge is the workhorse.`

});

Object.assign(window.MATH_DETAILS, {

"regular-dodecagon": String.raw`## Why it works
Build it outward from a regular hexagon of side $s$ (itself six equilateral triangles from its center). Erect a square on each of the hexagon's six edges; at each hexagon vertex the $120^\circ$ interior angle plus the two adjacent squares' $90^\circ$ corners leave a $60^\circ$ gap that one more equilateral triangle fills exactly. The outer boundary is now 12 equal edges meeting at equal $150^\circ$ angles — a regular dodecagon — assembled from 6 squares and $6+6=12$ equilateral triangles, so $A = 6s^2 + 12\cdot\frac{\sqrt{3}}{4}s^2 = 3(2+\sqrt{3})s^2$.

## How to use it
Two clean handles. Given the side, use $A = 3(2+\sqrt{3})s^2$. Given the circumradius, use $A = 3R^2$ — it comes from $\frac12 nR^2\sin\frac{360^\circ}{n}$ with $n=12$ and rearranges into three $R\times R$ squares, so a dodecagon inscribed in a unit circle has area exactly $3$. The $150^\circ$ interior angle is also the reason the square-and-triangle dissection closes up.

## On contests
Dodecagons appear as "regular 12-gon inscribed in a circle" (area $3R^2$ on sight), in area-dissection problems, and wherever $15^\circ$, $75^\circ$, or $150^\circ$ angles turn up. The 6-square-12-triangle picture is the fast visual proof of the side-length area and a favorite MATHCOUNTS / early-AMC fact.`,

"regular-octahedron": String.raw`## Key forms
- $V=\dfrac{s^3\sqrt2}{3}$ — volume (two square pyramids)
- $SA=2s^2\sqrt3$ — surface area (8 triangles)
- $R=\dfrac{s\sqrt2}{2}$ — circumradius
- $r=\dfrac{s\sqrt6}{6}$ — inradius

## Why it works
The horizontal plane through the four equatorial vertices is a square of side $s$ (its diagonals are a pair of opposite octahedron edges). Above and below it sit two congruent square pyramids; each apex lies over the square's center at height $\frac{s}{\sqrt{2}}$ — half a face diagonal — so $V = 2\cdot\frac13 s^2\cdot\frac{s}{\sqrt{2}} = \frac{s^3\sqrt{2}}{3}$. All eight faces are equilateral, giving $SA = 8\cdot\frac{\sqrt{3}}{4}s^2 = 2\sqrt{3}\,s^2$.

## How to use it
Cut the octahedron into its two pyramids and every length, the volume, and both radii fall out of one square and one right triangle. Duality with the cube is the other lever: put the six vertices at $(\pm a,0,0), (0,\pm a,0), (0,0,\pm a)$ (edge $s = a\sqrt{2}$) and coordinate-bash. Inscribing an octahedron in a cube (vertices at the cube's face centers), or a cube in an octahedron, are both one-line consequences.

## On contests
A recurring AMC/AIME solid: the equatorial-square and face-parallel hexagonal cross-sections, volume ratios against an inscribing or inscribed cube or tetrahedron, and "paint or slice the octahedron" problems. Keep two facts ready — $V_{\text{oct}} = 4V_{\text{tet}}$ at equal edge, and that the cube and octahedron are duals so their vertex and face counts swap ($6 \leftrightarrow 8$).`

});

Object.assign(window.MATH_DETAILS, {

"perp-to-angle-bisector": String.raw`## Why it works
The bisector at $A$ is the mirror swapping ray $AB$ with ray $AC$, so reflecting $B$ across it lands the image $B'$ on line $AC$ with $AB' = AB = c$. The foot $P$ of the perpendicular from $B$ is the midpoint of $BB'$, and in right triangle $ABP$ the leg is $BP = c\sin\frac{A}{2}$.

## How to use it
When a perpendicular is dropped from a vertex to an internal or external angle bisector, double it to the reflection at once: the image sits on the opposite side line, turning a bisector condition into the equal length $AB' = c$. Joining the midpoint $P$ to the midpoint of the opposite side gives the midline result $PM = \frac{|b-c|}{2} \parallel AC$.

## On contests
A compact olympiad lemma for "foot of the perpendicular to a bisector" configurations and for proving the $\frac{|b-c|}{2}$ midline fact; the reflect-and-double reflex converts angle data into length data without trigonometry.`,

"isotomic-conjugate": String.raw`## Why it works
Reflecting each cevian foot over its side's midpoint is an involution on that side, so by the isotomic form of Ceva's theorem the reflected cevians concur exactly when the originals do — defining the conjugate $P^*$. In normalized barycentrics it is just $(x:y:z) \mapsto (1/x : 1/y : 1/z)$.

## How to use it
Use the pairing to transfer results for free: the centroid is self-conjugate, and the Gergonne and Nagel points are an isotomic pair, so a fact about one hands you the other. Compute with barycentric reciprocals, and pair it with isogonal conjugation when a problem mixes "reflect over the midpoint" and "reflect over the bisector."

## On contests
An advanced/olympiad triangle-center tool; recognizing an isotomic pair often collapses a two-point problem into one, and the reciprocal barycentric form makes it a clean bash.`,

"contact-triangle": String.raw`## Why it works
Equal tangents from each vertex cut the sides into the classic lengths $s-a,\ s-b,\ s-c$, and the three tangency points lie on the incircle — so the incircle is the contact triangle's circumcircle (radius $r$). Each contact-triangle angle is $\frac{\pi}{2}-\frac{A}{2}$, the inscribed angle on the arc between two tangency points.

## How to use it
Reach for $s-a,\ s-b,\ s-c$ whenever the incircle touches the sides — they linearize almost every incircle-length computation. The cevians to the contact points concur at the Gergonne point, and the area ratio $\frac{r}{2R}$ converts between the contact triangle and $ABC$.

## On contests
Standard at AIME and olympiad level for incircle-tangency lengths and Gergonne-point configurations; the $s-a$ substitution is one of the most reused moves in all of triangle geometry.`,

"excentral-triangle": String.raw`## Why it works
Internal and external bisectors are perpendicular, so the incenter $I$ is the orthocenter of $I_AI_BI_C$ and $ABC$ is exactly its orthic (altitude-feet) triangle. That perpendicularity also yields the angles $\frac{\pi}{2}-\frac{A}{2}$, the sides $4R\cos\frac{A}{2}$, and circumradius $2R$.

## How to use it
Flip the usual orthic relationship: treat $ABC$ as the orthic triangle of the excenters to import the full orthocentric toolkit (reflections, the nine-point circle). In particular the circumcircle of $ABC$ is the nine-point circle of the excentral triangle, tying the two figures together.

## On contests
An olympiad configuration for excenter and bisector problems; spotting "$ABC$ is the orthic triangle of its excenters" unlocks every orthocenter fact you already know.`,

"reims-theorem": String.raw`## Why it works
Two circles meet at $P,Q$; a line through $P$ hits them at $A,C$ and a line through $Q$ hits them at $B,D$. Inscribed angles on the shared chords give $\angle BAP = \angle BQP$ and $\angle DCP = \angle DQP$; since $A,P,C$ and $B,Q,D$ are each collinear, those are corresponding angles for $AB$ and $CD$ cut by transversal $AC$, forcing $AB \parallel CD$. Reversing the chase gives the converse.

## How to use it
Treat it as the bridge between "parallel" and "concyclic": when two circles cross and lines through the intersection points cut them, parallel chords and four concyclic points are interchangeable. It pairs naturally with spiral-similarity and radical-axis arguments.

## On contests
A workhorse olympiad angle-chasing lemma; whenever two circles meet at two points, Reim's is the first thing to try for a parallelism or a hidden cyclic quadrilateral.`,

"mixtilinear-incircle": String.raw`## Why it works
The homothety at the tangency point $T$ that carries the mixtilinear incircle to the circumcircle sends its two side-contact points to arc midpoints — which is why $T$, the incenter $I$, and the midpoint of arc $BAC$ are collinear, and why $I$ is the midpoint of the chord the circle cuts on $AB$ and $AC$.

## How to use it
Trigger on "circle tangent to two sides and internally to the circumcircle." The collinearity through $I$ and the arc midpoint pins $T$, and the incenter-as-chord-midpoint fact converts the tangencies into lengths; homothety at $T$ links the incircle and circumcircle.

## On contests
A recurring olympiad configuration (and a few hard prep/AIME problems); the tangency point $T$ and its collinearities are the usual keys to unlocking it.`,

"descartes-sphere-theorem": String.raw`## Why it works
It is the $n=3$ case of the Soddy–Gosset relation $\left(\sum k_i\right)^2 = n\sum k_i^2$: in $n$ dimensions, $n+2$ mutually tangent spheres have curvatures obeying that quadratic. The Descartes Circle Theorem is the $n=2$ instance of the very same identity.

## How to use it
With four mutually tangent spheres known, solve the quadratic for the fifth; its two roots are the small sphere filling the central gap and the large sphere enclosing the rest (negative curvature). A flat plane counts as curvature $0$ and an enclosing sphere as negative, exactly as in 2D.

## On contests
Rare and AIME-hard to olympiad; it shows up in "sphere in the gap of four mutually tangent spheres" problems, structurally identical to the 2D Descartes circle setups.`,

"brianchon-theorem": String.raw`## Why it works
It is the projective dual of Pascal's theorem: swap "point on the conic" for "tangent line" and "collinear" for "concurrent," and Pascal's collinearity becomes Brianchon's concurrency. Any proof of Pascal dualizes into a proof of Brianchon.

## How to use it
Apply it to a hexagon whose six sides are all tangent to one conic (often an incircle or inscribed circle) to force the three main diagonals to concur. Merging adjacent tangency points degenerates it to tangential pentagons and quadrilaterals — that is where the Gergonne point of a tangential triangle comes from.

## On contests
An olympiad tool for tangential-polygon concurrency; "everything is tangent to one circle" is the cue to reach for Brianchon instead of grinding Ceva.`,

"desargues-theorem": String.raw`## Why it works
Lift to space: two triangles perspective from a point lie in two planes meeting in a line, and each pair of corresponding sides meets on that line — the axis of perspectivity. Projecting the spatial picture back to the plane proves the theorem, and the statement is self-dual, so the converse is automatic.

## How to use it
Trade a concurrency for a collinearity and back: if $AA', BB', CC'$ concur, then $AB\cap A'B'$, $BC\cap B'C'$, $CA\cap C'A'$ are collinear, and conversely. It is the standard route to proving three points collinear once you have three concurrent lines.

## On contests
Core projective-geometry olympiad material; whenever you are handed a center of perspectivity, Desargues produces the collinear axis (and the converse gets you the center).`,

"cross-ratio": String.raw`## Why it works
Under a projection each of the four signed ratios picks up factors that cancel in the quotient, so $(A,B;C,D)$ is unchanged by every perspectivity — the numerical fingerprint of four collinear points up to projective maps. The same number attaches to four concurrent lines and to four concyclic points seen from a fifth.

## How to use it
Compute the cross-ratio in an easy position (or on a circle), then project into the hard configuration where it must match; equating two cross-ratios solves for an unknown length or proves a coincidence. Watch for the value $-1$, the harmonic case.

## On contests
The backbone of projective olympiad problems and of "moving points" / projective-map methods; one invariance argument often replaces pages of similar-triangle chasing.`,

"harmonic-bundle": String.raw`## Why it works
$(A,B;C,D) = -1$ says $C$ and $D$ divide $AB$ internally and externally in the same ratio $\frac{AC}{CB} = \frac{AD}{DB}$; the minus sign is exactly the record that one division is internal and the other external. It is the most symmetric cross-ratio value, fixed when $C$ and $D$ are swapped.

## How to use it
Harmonic bundles sit at fixed spots: two tangents plus a secant from an external point cut the polar harmonically; the internal and external bisectors from a vertex meet the opposite line at harmonic conjugates; a complete quadrilateral's diagonal is cut harmonically. Recognizing $-1$ lets you invoke pole–polar and projection machinery.

## On contests
Everywhere in olympiad projective configurations, especially pole–polar and Apollonius-circle problems; "show this bundle is harmonic" is a standard intermediate goal.`,

"inversion-properties": String.raw`## Why it works
Inversion fixes each ray from $O$ and sends $P$ to $P^*$ with $OP\cdot OP^* = r^2$ — an involution whose similar triangles $OPQ \sim OQ^*P^*$ give the distance rule $P^*Q^* = \frac{r^2\,PQ}{OP\cdot OQ}$. It preserves the class of "lines and circles" (generalized circles), and being conformal it preserves angles and tangency, so incidence survives the map.

## How to use it
Invert at a busy point to simplify: every circle through the center straightens into a line, so two circles tangent at $O$ become parallel lines and a chain tangent to both becomes equal circles stacked between them. A circle orthogonal to the circle of inversion maps to itself. Solve the easy straight-line picture, then convert lengths back with $P^*Q^* = \frac{r^2\,PQ}{OP\cdot OQ}$. Choosing $O$ where many circles meet is the whole art.

## On contests
The heavy artillery for tangent-circle chains — Steiner chains, Descartes / Apollonian gaskets, arbelos, and "radius of the $n$-th circle" problems. Ptolemy's inequality and Casey's theorem are inversion facts in disguise, so a messy problem resembling them is the cue to invert ("invert at $A$" being the classic opening move).`,

"complete-quadrilateral-miquel": String.raw`## Why it works
Four lines in general position give four triangles (three lines at a time); repeated use of the Miquel-point lemma forces their four circumcircles through one common point $M$. Equivalently $M$ is the center of the spiral similarity carrying one pair of opposite sides onto the other.

## How to use it
When four lines (two pairs of opposite sides plus the diagonals) appear, find $M$ as the second intersection of two of the four circumcircles — it is usually the hidden center that makes a spiral-similarity or concyclicity claim fall out. The three diagonal midpoints are collinear on the associated Newton–Gauss line.

## On contests
A staple olympiad configuration; recognizing a complete quadrilateral and naming its Miquel point is frequently the decisive first step.`,

"ngon-vertex-distance-product": String.raw`## Why it works
Place the vertices at $R\zeta^k$ with $\zeta = e^{2\pi i/n}$ and the point at $P = Re^{i\theta}$. Since $\prod_k (z - \zeta^k) = z^n - 1$, the product of the $n$ distances is $R^n\,|z^n - 1| = 2R^n\left|\sin\frac{n\theta}{2}\right|$.

## How to use it
Read the extremes straight off the sine: the product is $0$ when $P$ is a vertex and reaches its maximum $2R^n$ when $P$ is an arc midpoint (there $\frac{n\theta}{2}$ is an odd multiple of $\frac{\pi}{2}$). Keep it separate from the fixed-vertex product, which is always $nR^{n-1}$.

## On contests
An AIME/olympiad roots-of-unity technique for "product of distances from a point on the circle to all the vertices" problems; turning the geometry into $z^n - 1$ is the whole move.`

});

Object.assign(window.MATH_DETAILS, {

"max-rectangle-in-triangle": String.raw`## Why it works
Slide a rectangle up from the base: at a fraction $t$ of the way to the apex the triangle's width has shrunk to $(1-t)b$, so the rectangle's area is $(t h)\,(1-t)b = bh\,t(1-t)$. That is largest at $t=\tfrac12$, giving $\tfrac{bh}{4}=\tfrac12[\triangle]$.

## How to use it
Spot the "largest rectangle inside a triangle" setup and answer half the area at once; for the actual dimensions, put the top edge on the midline (it spans the midsegment), making the width half the base and the height half the altitude. The same $t(1-t)$ maximization handles a rectangle inscribed under any straight slanted boundary.

## On contests
A recurring optimization one-liner on AMC and early AIME problems — knowing the maximum is exactly half the triangle's area (and where the rectangle sits) skips the calculus entirely.`

});
