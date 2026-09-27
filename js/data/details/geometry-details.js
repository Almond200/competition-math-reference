// Extended detail-page write-ups for Geometry, keyed by formula id.
// Blocks separated by blank lines; lines starting with "## " render as headings.
window.MATH_DETAILS = window.MATH_DETAILS || {};

Object.assign(window.MATH_DETAILS, {

"pythagorean-theorem": String.raw`
## Why it works
Dropping the altitude from the right angle cuts the triangle into two smaller copies of itself, and comparing each copy with the whole shows that each leg squared is a piece of the hypotenuse times the whole hypotenuse.

Call the right angle $C$, and let [[altitude-hypotenuse|the altitude]] from $C$ meet the hypotenuse at $D$, splitting it into $BD = p$ and $AD = q$, so $p + q = c$. Triangle $CBD$ has a right angle at $D$ and shares angle $B$ with triangle $ABC$, so the two triangles are similar: two angles match, and the third is then forced. Matching sides in the same order, $BD$ corresponds to $BC$ and $BC$ corresponds to $BA$, so $$\frac{p}{a} = \frac{a}{c}, \qquad a^2 = pc.$$

The same argument on the other side, with triangle $CAD$ sharing angle $A$, gives $b^2 = qc$. Adding the two, $$a^2 + b^2 = pc + qc = (p + q)c = c^2.$$

There is also a proof you can see at a glance. Place four copies of the triangle inside a square of side $a + b$, as in the figure. Arranged one way they leave a tilted square of side $c$ uncovered; arranged the other way they leave two squares, of sides $a$ and $b$. The big square and the four triangles are the same both times, so the uncovered areas are equal, and $c^2 = a^2 + b^2$.

{{figure:rearrangement}}

## How to use it
Three shapes carry almost every use, and the third is the one people miss.

Manufacture the triangle. Problems rarely hand you a right angle; you make one, and where you drop the perpendicular is the whole decision. Dropped to a chord the foot is its midpoint, so the half-chord, the distance from the center and the radius close into $$R^2 = d^2 + \left(\tfrac{\ell}{2}\right)^2.$$ That one configuration sits behind a large share of all circle problems.

In three dimensions the same move is a [[cross-section-method|slice through the axis]], which turns a tangency between solids into a plane right triangle.

Read it as the distance formula. Any coordinate computation is already using it, so a configuration that resists synthetic treatment can be re-read as Pythagoras with names attached, and the converse runs the other way: $a^2+b^2-c^2$ is positive, zero or negative exactly as the angle is acute, right or obtuse, which is often the entire question.

Write it twice and subtract. Two right triangles sharing a piece give two equations in the same unknowns, and the subtraction, not the theorem, does the work. With a shared altitude $h$ over a base split into $x$ and $a - x$, $$h^2 = c^2 - x^2 = b^2 - (a - x)^2,$$ and the $x^2$ terms cancel to leave a linear equation, the same mechanism that makes a [[radical-axis|radical axis]] straight. When the squares do not cancel, what survives is a [[difference-of-squares|difference of squares]] and factors. Either way a two-unknown mess collapses to one equation in one step.

## On contests
Ubiquitous, but the shape of its appearances is the useful part: of the 76 problems this library tags with it, only four use it alone. It is nearly always the closing step of a configuration something else set up, [[similar-figures-ratios|similar triangles]] on 13 of them, [[tangent-circles|tangent circles]] on 9 and a [[cross-section-method|cross-section]] on 5. Take that as advice. When a problem looks like Pythagoras the real question is what produces the right triangle, not what to do once you have it.

The triples earn their memorization separately. Beyond the four in the summary, $(9,40,41)$ and $(20,21,29)$ turn up often enough to know, and problems build them in deliberately: spotting one mid-computation removes the algebra rather than shortening it.
`,

"special-right-triangles": String.raw`
## Why it works
Each triangle is half of a figure you already know: the 45-45-90 triangle is half a square, and the 30-60-90 triangle is half an equilateral triangle.

Cut a square of side $1$ along a diagonal. Each half is a right triangle with two legs of $1$, so its two acute angles are equal, $45^\circ$ each, and by the [[pythagorean-theorem|Pythagorean theorem]] the diagonal is $\sqrt{1^2 + 1^2} = \sqrt2$. That gives $1 : 1 : \sqrt2$.

{{figure:square}}

Cut an [[equilateral-triangle-facts|equilateral triangle]] of side $2$ along an altitude. The altitude meets the base at its midpoint, so each half has hypotenuse $2$ and short leg $1$. Its angles are $60^\circ$ at the base corner, $30^\circ$ at the top, where the altitude splits the $60^\circ$ angle in half, and $90^\circ$ at the foot, and its third side is $\sqrt{2^2 - 1^2} = \sqrt3$. That gives $1 : \sqrt3 : 2$, with the $1$ opposite the $30^\circ$ angle.

{{figure:equilateral}}

## How to use it
Whenever an angle of $30^\circ$, $45^\circ$, $60^\circ$, $90^\circ$, $120^\circ$, or $135^\circ$ appears, look to drop a perpendicular that creates one of these triangles. That converts angle information into length information without trigonometry. A $120^\circ$ angle splits into a $30$-$60$-$90$ on the outside (the standard way to handle obtuse special angles).

## On contests
The default mechanism for AMC 10 geometry, with 21 problems tagged here, only 2 of them solved by the ratios alone: they are almost always the step that turns an angle into lengths inside a larger figure, most often an [[equilateral-triangle-facts|equilateral triangle]] (4 problems) or a circle (3).

[[regular-hexagon-area|Hexagons]] decompose into 30-60-90 triangles, a square's diagonal gives 45-45-90 triangles, and "fold the paper" problems almost always hide one. Know the ratios cold in both directions, the sides from the hypotenuse and the hypotenuse from a side.
`,

"altitude-hypotenuse": String.raw`
## Why it works
Each small triangle shares an acute angle with the original and has a right angle, so all three triangles are similar, and each relation is one proportion between two of them.

Laid side by side in the same orientation, with the shared angle at the left, the three triangles have legs $p$ and $h$, $h$ and $q$, and $a$ and $b$, and hypotenuses $a$, $b$ and $c$.

{{figure:similar}}

Matching sides gives the relations. From the two small triangles, $\frac hp = \frac qh$, so $h^2 = pq$. From the small triangle next to $a$ and the whole, $\frac pa = \frac ac$, so $a^2 = pc$, and likewise $b^2 = qc$. Adding the last two gives $a^2 + b^2 = (p + q)c = c^2$, a proof of the Pythagorean theorem.

## How to use it
Given any two of $a$, $b$, $h$, $p$, $q$ and $c = p + q$, the relations give the rest. If the altitude cuts the hypotenuse into $3$ and $12$, then $h^2 = 36$, so $h = 6$, and the legs are $\sqrt{3 \cdot 15} = 3\sqrt5$ and $\sqrt{12 \cdot 15} = 6\sqrt5$.

The phrase "geometric mean" in a right-triangle problem points straight here, and so does a semicircle on the hypotenuse, since by [[thales-theorem|Thales' theorem]] every point on it makes a right angle. In coordinates, the distance from the right-angle vertex to the hypotenuse is $\frac{ab}{c}$ with no computation.

## On contests
Five problems here, four of them AIME, none by it alone; two continue into [[similar-figures-ratios|similar triangles]] more generally. It is a fixture of AMC and MATHCOUNTS geometry as well, in circles tangent to a hypotenuse, folded rectangles and chains of similar triangles.
`,

"triangle-inequality": String.raw`
## Why it works
The straight segment is the shortest path between two points, so going from $B$ to $C$ by way of $A$ can never be shorter than going straight.

The side $a = BC$ is the direct route, and $c + b = BA + AC$ is the route through $A$, as in the figure at the top. A detour through a point off the line is strictly longer, which gives $a \lt b + c$, and the same holds for each side. The detour ties the direct route only when $A$ lies on the segment $BC$, which is the flat triangle where $a = b + c$.

The two-sided form $$|a - b| \lt c \lt a + b$$ packages all three inequalities. The right half is one of them; the left half combines the other two, since $a \lt b + c$ gives $a - b \lt c$ and $b \lt a + c$ gives $b - a \lt c$. When $c$ is the longest side, the other two conditions hold automatically, so only $c \lt a + b$ needs checking.

{{figure:range}}

## How to use it
It has two standard uses. The first is counting, as in [[integer-triangles-perimeter|integer-triangle problems]]: the whole numbers $c$ that make a triangle with given $a$ and $b$ are those strictly between $|a - b|$ and $a + b$, and there are $$(a + b) - |a - b| - 1 = 2\min(a, b) - 1$$ of them.

The second is extremal. The flat triangle is the boundary of what is possible, so a maximum or minimum of a length in a changing figure often occurs just as the triangle collapses.

## On contests
AMC loves "sticks of lengths $1..n$, how many triangles" and "which of these could be the sides." AIME uses it as a hidden constraint: after algebraic manipulation produces candidate side lengths, the triangle inequality eliminates spurious solutions, so always check it before submitting.

When the inequality is a hypothesis rather than a test, [[ravi-substitution|Ravi substitution]] builds it into the variables so it cannot be violated, and [[abs-triangle-inequality|the absolute-value form]] is the same statement on the number line.
`,

"polygon-angle-sums": String.raw`
## Why it works
Cutting the polygon into triangles gives the interior sum, and walking around its boundary gives the exterior sum.

From one vertex of a convex $n$-gon, the diagonals to the $n - 3$ vertices that are not its neighbors cut it into $n - 2$ triangles, and the angles of those triangles together make up exactly the polygon's angles. So the interior angles add to $$(n - 2) \cdot 180^\circ.$$

Now walk once around the boundary. At each vertex you turn through the exterior angle, and after the last turn you face the way you started, having turned one full revolution. So the exterior angles add to $360^\circ$ whatever $n$ is, and each one is $180^\circ$ minus the interior angle beside it.

{{figure:walk}}

## How to use it
For regular polygons, start from the exterior angle $\frac{360^\circ}{n}$: the interior angle is $180^\circ$ minus it, and a given interior angle tells you $n$ at once. A regular octagon has exterior angles of $45^\circ$ and interior angles of $135^\circ$.

Regular polygons fit around a point exactly when their interior angles add to $360^\circ$, which is why squares, equilateral triangles and hexagons tile the plane and regular pentagons do not. The fan of diagonals from one vertex that proves the interior sum also counts [[handshakes-diagonals|diagonals]]: $n - 3$ from each vertex, so $\frac{n(n - 3)}{2}$ in all.

## On contests
Five problems here, four of them AIME, one solved by it alone. The others combine the angle sum with an equation, often in integers, as when the angles of a polygon are in [[arithmetic-series|arithmetic progression]] or must be whole numbers, which leads to [[sfft|factoring tricks]]. MATHCOUNTS and early AMC use it directly, and later problems embed it in star-polygon [[angle-chasing|angle chases]].
`,

"similar-figures-ratios": String.raw`
## Why it works
Area is a length times a length and volume is three lengths multiplied, so scaling every length by $k$ scales area by $k$ twice over and volume three times over.

Start with the plainest shapes. Scaling an $x \times y$ rectangle and an $x \times y \times z$ box by $k$ gives $$kx \cdot ky = k^2 \cdot xy, \qquad kx \cdot ky \cdot kz = k^3 \cdot xyz.$$ A triangle behaves the same way, since its area is half the base times the height and both of those are lengths that scale by $k$.

Every other region reduces to these. Cover it with a fine grid of tiny squares; the scaled region is covered by the scaled grid, whose squares each have $k^2$ times the area. So the total area scales by $k^2$ however fine the grid is, curved boundary or not, and tiny cubes give $k^3$ for volume in the same way.

{{figure:grid}}

The factor is the same for every pair of corresponding lengths, not only the sides: heights, medians, perimeters, radii and diagonals all scale by $k$. That is why a single matched pair is enough to know them all.

## How to use it
What similarity buys is a change of units: one matched pair of lengths fixes $k$, and from then on every length, area and volume in the figure is known in terms of one unknown instead of many. That is the payoff to look for: not "these triangles are similar" but "the figure now has one degree of freedom".

Finding the similarity is the real step, and in triangle work it nearly always comes from a parallel line: a line parallel to one side cuts off a similar triangle, so every midpoint, every trapezoid and every cevian through a parallel is a similarity waiting to be named.

{{figure:cut}}

A right angle does it too, since [[altitude-hypotenuse|the altitude to the hypotenuse]] splits a right triangle into two copies of itself, and so does a shared angle plus an equal angle from [[inscribed-angle-theorem|the same arc]].

Then push the ratio through the right power, $$\text{lengths} \times k, \qquad \text{areas} \times k^2, \qquad \text{volumes} \times k^3,$$ and remember that the leftovers matter as much as the parts: a parallel cut at ratio $k$ leaves areas $k^2 : (1-k^2)$, and a pyramid cut parallel to its base leaves a frustum holding $1-k^3$ of the volume. Nested similar figures give a [[geometric-series|geometric series]] rather than a finite sum, which is what makes infinite-dissection problems tractable at all.

## On contests
The highest-frequency idea in AMC geometry, and unusually often the whole solution: it stands alone in 12 of the 73 problems tagged here, far more than most tools manage. When it is not alone its partner is almost always [[pythagorean-theorem|Pythagoras]] (13 problems), where the similarity pins the ratio and Pythagoras turns it into a number.

The recurring shapes are a parallel cut across a triangle, a cone or pyramid sliced parallel to its base, and a chain of nested figures whose areas form a geometric series. All three are recognizable before any computation, which is the point of knowing them by name.
`,

"midsegment-theorem": String.raw`
## Why it works
Joining the midpoint $M$ of $AB$ to the midpoint $N$ of $AC$ makes a triangle $AMN$ that is the original triangle shrunk by half toward $A$.

$AM = \frac12AB$ and $AN = \frac12AC$, and the two triangles share the angle at $A$, so triangle $AMN$ is similar to triangle $ABC$ with ratio $\frac12$. Corresponding angles are equal and corresponding sides are in the ratio $\frac12$, so $$MN \parallel BC, \qquad MN = \tfrac12 BC.$$ In the language of transformations, it is the [[homothety-monge|homothety]] centered at $A$ with ratio $\frac12$.

All three midsegments together cut the triangle into four triangles whose sides are each half a side of the original, so the four are congruent and each has a quarter of the area.

{{figure:four}}

## How to use it
Whenever midpoints appear, join them: the parallel lines and half-lengths are often exactly the similar triangles a problem needs. For a $6$-$8$-$10$ triangle the medial triangle is $3$-$4$-$5$, with half the perimeter and a quarter of the area.

The quadrilateral version is [[varignons-theorem|Varignon's theorem]]: the midpoints of the sides of any quadrilateral form a parallelogram, because each of its sides is parallel to a diagonal and half as long. Repeating a midpoint construction produces lengths in a geometric sequence with ratio $\frac12$.

## On contests
Four problems here, three of them AIME, none by it alone, each with a different partner, including the [[nine-point-circle|nine-point circle]], which passes through the midpoints of the sides. It appears wherever midpoints do: medial triangles, Varignon parallelograms and repeated midpoint constructions.
`,

"centroid-division": String.raw`
## Why it works
The average of the three vertices lies two thirds of the way along every median, so all three medians pass through that one point.

The midpoint of $BC$ is $M = \frac{B + C}{2}$, and the point two thirds of the way from $A$ to $M$ is $$A + \tfrac23(M - A) = \tfrac13A + \tfrac23M = \frac{A + B + C}{3}.$$ That does not depend on which vertex we started from, so the same point lies two thirds of the way along each median, which proves both that the medians meet and that they are divided $2 : 1$. [[mass-points|Mass points]] give the same result, with a mass of $1$ at each vertex.

For the six pieces, the two touching the midpoint of a side have equal bases and the same height from $G$, so they are equal; call the three pairs $x$, $y$ and $z$. The median from $A$ splits the triangle into two halves of equal area, $x + 2z$ and $x + 2y$, so $y = z$, and another median gives $x = y$.

{{figure:six}}

## How to use it
In coordinates, average the vertices. The $2 : 1$ ratio turns a median's length into distances: a median of length $15$ puts the centroid $10$ from the vertex and $5$ from the midpoint. For areas, any region bounded by medians is a whole number of sixths of the triangle, and each of $GBC$, $GCA$ and $GAB$ is a third.

On AIME the vector form $\vec{GA} + \vec{GB} + \vec{GC} = \vec 0$ gives slicker solutions. The lengths of the medians themselves come from [[apollonius-theorem|Apollonius's theorem]], the median case of [[stewarts-theorem|Stewart's theorem]].

## On contests
Five problems here, all AIME, none by it alone, and each with a different partner: [[coordinate-bash|coordinates]], [[power-of-a-point|power of a point]], [[stewarts-theorem|Stewart's theorem]] or the [[area-method|area method]]. AMC problems place a point at the centroid and ask for areas, which come out in thirds and sixths.
`,

"cevian-area-ratio": String.raw`
## Why it works
A triangle's area is half its base times its height, so two triangles with the same height have areas in the ratio of their bases.

For $D$ on $BC$, the triangles $ABD$ and $ACD$ both have apex $A$ and bases on line $BC$. Their height is the distance $h$ from $A$ to that line, the same for both, so $$\frac{[ABD]}{[ACD]} = \frac{\frac12 \cdot BD \cdot h}{\frac12 \cdot DC \cdot h} = \frac{BD}{DC}.$$

Nothing in that used the fact that the two bases meet at $D$ or lie inside side $BC$, only that the apex is shared and the bases lie on one line.

{{figure:fan}}

## How to use it
Mark every ratio the problem gives along a side, and turn each into an area ratio using the vertex opposite that side as the apex. Working from the outside in, write each small triangle as a fraction of the whole, one cevian at a time: in the example, a $1 : 4$ split of $BC$ gives $[ABD] = \frac15[ABC]$.

The same step runs in reverse, turning known areas into a ratio along a line. Two cevians meeting inside the triangle need it once along each, which is [[area-method|the area method]] in full; [[mass-points|mass points]] reach the resulting length ratios faster when only lengths are asked.

## On contests
Two problems here, both AIME, neither solved by it alone: each finds areas in a triangle cut by several cevians and finishes with the area method or mass points. On the AMC 10 and 12 it drives shaded-region problems where ratios along the sides are given, and [[rouths-theorem|Routh's theorem]] packages the three-cevian case.
`,

"trapezoid-parallelogram-areas": String.raw`
## Why it works
Each formula comes from rearranging the quadrilateral into shapes whose area is already known.

A parallelogram becomes a rectangle with the same base and height when a right triangle is cut from one end and moved to the other, so its area is $bh$. Two copies of a trapezoid, one turned half a turn and fitted against the other, form a parallelogram with base $b_1 + b_2$ and the same height, so one trapezoid has half of $(b_1 + b_2)h$.

{{figure:doubling}}

When the diagonals are perpendicular, they cut the quadrilateral into four right triangles whose legs are pieces of the diagonals. If one diagonal is split into $p$ and $q$ and the other into $r$ and $s$, the four areas add to $$\frac12(pr + ps + qr + qs) = \frac12(p + q)(r + s) = \frac12d_1d_2.$$

## How to use it
In a trapezoid $ABCD$ with $AB \parallel CD$, the diagonals cross at a point $O$ that divides each of them in the ratio of the parallel sides: triangles $OAB$ and $OCD$ are similar, because the parallel sides make their angles equal, with ratio $\frac{AB}{CD}$.

The two triangles along the legs, $OBC$ and $ODA$, always have equal areas, because triangles $ABC$ and $ABD$ share the base $AB$ and the same height, and removing $OAB$ from each leaves them.

{{figure:diagonals}}

If the two similar triangles have areas $X$ and $Y$, each leg triangle has area $\sqrt{XY}$, so the whole trapezoid is $X + Y + 2\sqrt{XY} = (\sqrt X + \sqrt Y)^2$. For a height that is not given, drop perpendiculars from the ends of the shorter base: in an isosceles trapezoid each overhang is half the difference of the bases, and the Pythagorean theorem gives the height.

## On contests
Eight problems here, six of them AIME, one solved by it alone. Most trapezoid problems turn on the diagonal similarity, or on dropping two heights to make right triangles at the ends and finishing with the [[pythagorean-theorem|Pythagorean theorem]]. The lengths of the midline and of the segment through the diagonals' crossing are on [[trapezoid-special-segments|their own card]].
`,

"quadrilateral-diagonal-area": String.raw`
## Why it works
Cut along both diagonals, and every piece is a triangle whose area the [[trig-area|sine area formula]] gives.

Let the diagonals cross at $P$, cutting them into pieces $a$ and $c$ along one and $b$ and $d$ along the other. Each of the four triangles at $P$ has two sides along the diagonals, with the angle $\theta$ or $180^\circ - \theta$ between them, and those two angles have the same sine. So the area is $$\tfrac12\sin\theta\,(ab + bc + cd + da) = \tfrac12\sin\theta\,(a + c)(b + d) = \tfrac12 d_1d_2\sin\theta.$$

{{figure:four}}

The formula also holds for a quadrilateral that is not convex, where one diagonal lies outside it: in vectors the area is half the cross product of the diagonals, $\frac12\left|\overrightarrow{AC} \times \overrightarrow{BD}\right|$.

## How to use it
Use it whenever a problem gives both diagonals and the angle between them, or lets you find them. For diagonals $6$ and $9$ meeting at $30^\circ$, $$A = \tfrac12 \cdot 6 \cdot 9 \cdot \sin 30^\circ = \tfrac{27}{2}.$$

It also gives a bound for free: among quadrilaterals with given diagonals, the area is largest, $\frac12d_1d_2$, when they are perpendicular, which is how many maximization problems end.

## On contests
Three problems here, all AIME, none solved by it alone. For a cyclic quadrilateral both diagonals are [[chord-length|chords]], so the problem reduces to the angle between them, which the [[law-of-cosines|law of cosines]] on the small triangles often supplies. A kite drawn by [[abs-value-relations|absolute values]] has perpendicular diagonals, so its area is $\frac12d_1d_2$ at once.`,

"regular-polygon-area": String.raw`
## Why it works
Lines from the center to the vertices cut the polygon into $n$ congruent isosceles triangles, and every formula is the total area of those triangles.

Each triangle has base $s$ and height $a$, so its area is $\frac12sa$, and the $n$ of them give $\frac12nsa = \frac12ap$. Each triangle also has two sides $R$ with the angle $\frac{360^\circ}{n}$ between them, so by [[trig-area|the sine area formula]] its area is $\frac12R^2\sin\frac{360^\circ}{n}$, which gives the second form.

The three lengths are tied by one right triangle, from the center to the middle of a side and on to a vertex: $$R^2 = a^2 + \left(\tfrac s2\right)^2.$$ So the ring between the circumcircle and the incircle has area $\pi(R^2 - a^2) = \frac{\pi s^2}{4}$, whatever $n$ is.

{{figure:radii}}

## How to use it
Choose the form that matches the data: an apothem or an inscribed circle calls for $\frac12ap$, and a circumradius calls for the sine form. For a dodecagon in a circle of radius $R$ the sine form gives $$\tfrac12 \cdot 12 \cdot R^2\sin 30^\circ = 3R^2.$$

For an octagon of side $s$, cut the four corner triangles off the surrounding square, whose side is $s + s\sqrt2$: the area is $(s + s\sqrt2)^2 - 4 \cdot \frac{s^2}{4} = 2(1 + \sqrt2)s^2$. For [[regular-hexagon-area|hexagons]] and [[equilateral-triangle-facts|equilateral triangles]], go straight to their own formulas.

## On contests
Four problems here, split between AMC and AIME, none by it alone, each with a different partner such as the [[shoelace-formula|shoelace formula]] or a [[circular-segment|circular segment]]. Octagons and dodecagons are the common cases on MATHCOUNTS and AMC 10, and the dodecagon's area of exactly $3R^2$ is worth having seen once.
`,

"clock-angle": String.raw`## Why it works
The minute hand moves $360^\circ$ per hour ($6^\circ$ per minute); the hour hand $30^\circ$ per hour ($0.5^\circ$ per minute). At $H{:}M$ the hour hand sits at $30H + 0.5M$ degrees and the minute hand at $6M$, and subtracting gives $|30H - 5.5M|$.

## How to use it
Take the result mod $360^\circ$ and replace $\theta$ by $360^\circ - \theta$ if it exceeds $180^\circ$. For "when are the hands aligned/opposite/perpendicular" questions, set $|30H - 5.5M|$ equal to $0$, $180$, or $90$ and solve for $M$ — the hands align every $\frac{720}{11}$ minutes.

## On contests
A MATHCOUNTS staple. The relative speed viewpoint ($5.5^\circ$ per minute) answers every variant: alignments per day (22), overlaps between given times, and mirror-image times.`,

"triangle-area-standard": String.raw`
## Why it works
A triangle is half of a parallelogram with the same base and height, and a parallelogram has the same area as a rectangle.

Take a second copy of the triangle, turn it half a turn, and fit it against the first along one of the other two sides. The two copies form a parallelogram with base $b$ and height $h$. Cutting a right triangle off one end of the parallelogram and moving it to the other end gives a $b \times h$ rectangle, so the parallelogram's area is $bh$, and each triangle has half of it.

{{figure:doubling}}

Only the base and the perpendicular height enter the formula. Sliding the top vertex along a line parallel to the base changes the triangle's shape but not its height, so it does not change the area. This is the shearing argument.

## How to use it
The main decision is which side to call the base. Pick the one whose height you know or can compute, and remember that each side has its own height: a triangle of area $84$ with a side of $14$ has height $12$ to that side, whatever its other sides are. Reading the formula as $h = \frac{2A}{b}$ also shows that the three heights of a triangle are inversely proportional to the sides they meet.

Equal bases and equal heights give equal areas even for triangles that look nothing alike. If two triangles share a base and their third vertices lie on a line parallel to it, they have the same area.

{{figure:shear}}

With a shared height instead, the areas are in the ratio of the bases: two triangles with the same apex and bases on one line compare like their bases, which is the method of [[area-method|area ratios from base ratios]].

## On contests
Nine problems here, eight of them AIME, and never alone: the height usually comes from the [[pythagorean-theorem|Pythagorean theorem]] first, or the area becomes the base of a pyramid in a [[prism-pyramid-volumes|volume]] computation.

The quick wins are shearing, sliding a vertex along a parallel to reach an easier triangle, and computing one area two ways, with two different bases, to find an unknown height. With coordinates the [[shoelace-formula|shoelace formula]] is faster, and with two sides and the angle between them, [[trig-area|the sine formula]] is.
`,

"trig-area": String.raw`
## Why it works
The formula is base times height, with the height written in terms of the angle.

Take side $a = BC$ as the base and drop the altitude from $A$. The altitude, the side $b = CA$ and part of the line $BC$ form a right triangle with hypotenuse $b$ and angle $C$ at the vertex $C$, so the altitude, the side opposite that angle, has length $b\sin C$. Then $A = \frac12 \cdot a \cdot b\sin C$, which is [[triangle-area-standard|half the base times the height]] with nothing new in it.

{{figure:height}}

If $C$ is obtuse, the altitude from $A$ lands on the extension of $BC$ beyond $C$, and the right triangle contains the angle $180^\circ - C$ instead. The height is then $b\sin(180^\circ - C)$, which is the same number, since $\sin(180^\circ - C) = \sin C$. That is why one formula covers acute and obtuse angles alike, and why an angle and its supplement always give equal areas.

{{figure:obtuse}}

## How to use it
Use it whenever two sides and the angle between them are known, which is the case the side-side-side formulas cannot touch. Special angles keep it clean: $30^\circ$, $90^\circ$ and $150^\circ$ give sines of $\tfrac12$, $1$, $\tfrac12$, while $60^\circ$ and $120^\circ$ both give $\tfrac{\sqrt3}2$.

That last coincidence is the important one. Since $\sin C = \sin(180^\circ - C)$, an angle and its supplement give the same area, so two triangles with equal or supplementary angles at a shared vertex $A$, such as $AXY$ and $ABC$, have areas in the ratio of the products of their enclosing sides. That consequence is common enough to have [[shared-angle-area-ratio|its own card]].

Substituting $\sin C = \tfrac c{2R}$ turns the formula into $A = \tfrac{abc}{4R}$, and substituting for $a$ and $b$ instead gives [[trig-area-circumradius|the all-angles form]].

## On contests
One of the most-used area tools on AMC and AIME, with 20 problems tagged here, none of which it solves alone: it is the step that turns angles into area once something else has produced them, most often [[law-of-cosines|the law of cosines]] (6 problems) or [[angle-chasing|angle chasing]] (4).

Two shapes dominate: a figure hands you two sides and the angle between them directly, or a configuration gives equal or supplementary angles and the question is really an area ratio.

It is also the standard route into [[trapezoid-parallelogram-areas|quadrilateral areas]], where the two triangles cut off by a diagonal of a cyclic quadrilateral have supplementary angles.
`,

"trig-area-circumradius": String.raw`## Why it works
The [[law-of-sines|law of sines]] says $a = 2R\sin A$ and $b = 2R\sin B$. Putting both into [[trig-area|the sine area formula]] $\tfrac12ab\sin C$ gives $\tfrac12(2R\sin A)(2R\sin B)\sin C = 2R^2\sin A\sin B\sin C$. Every side length has been traded for an angle, which is why the result needs none.

## How to use it
It is the right formula in exactly one situation: the circumradius is known and the sides are not. That is uncommon, which is why this is filed as a reference form rather than a working tool. When you do have side lengths, $\tfrac12ab\sin C$ or [[herons-formula|Heron]] will be shorter.

Its steadier use is as an identity rather than a computation. Dividing by $R$ gives $\tfrac{2A}{R} = 4R\sin A\sin B\sin C$, which is the perimeter of the [[orthic-triangle|orthic triangle]], and that is how the orthic perimeter is usually derived.

## On contests
Rare. Across the problems in this library it is the route in none of them, and the $\tfrac12ab\sin C$ form is the one that appears. Keep it for the orthic-triangle identity and for the occasional problem stated entirely in angles and a circumradius.`,

"herons-formula": String.raw`
## Why it works
Start from half the product of two sides times the sine of the included angle, then remove the angle with the law of cosines; the algebra factors into the four terms of the formula.

By [[trig-area|the sine area formula]], $A = \frac12ab\sin C$, so $16A^2 = 4a^2b^2\sin^2 C = 4a^2b^2 - (2ab\cos C)^2$, using $\sin^2 C = 1 - \cos^2 C$. [[law-of-cosines|The law of cosines]] says $2ab\cos C = a^2 + b^2 - c^2$, so $$16A^2 = (2ab)^2 - (a^2 + b^2 - c^2)^2.$$

That is a [[difference-of-squares|difference of squares]], and it factors as $$\left(2ab + a^2 + b^2 - c^2\right)\left(2ab - a^2 - b^2 + c^2\right) = \left((a + b)^2 - c^2\right)\left(c^2 - (a - b)^2\right).$$ Each bracket is again a difference of squares, giving $(a + b + c)(a + b - c)(c + a - b)(c - a + b)$.

With $a + b + c = 2s$, the four factors are $2s$, $2(s - c)$, $2(s - b)$ and $2(s - a)$, so $16A^2 = 16s(s - a)(s - b)(s - c)$, and taking square roots gives the formula.

## How to use it
Heron's formula is best when all three sides are known and nothing else is. Keep it factored: the four numbers $s$, $s - a$, $s - b$ and $s - c$ are usually small, and their product is often a perfect square.

When the sides are large or awkward, drop an altitude instead. Its foot splits the base $a$ into $x$ and $a - x$, and the two right triangles share the altitude, so $$c^2 - x^2 = b^2 - (a - x)^2,$$ which is linear in $x$; the [[triangle-13-14-15|13-14-15 triangle]] is the standard case. For an isosceles triangle the altitude to the base is quicker still.

## On contests
None of the 14 problems tagged here uses it alone; it supplies an area that [[circumradius-area|the circumradius formula]] or [[similar-figures-ratios|similar triangles]] (3 problems each) then turn into the answer. Triangles with whole-number sides and whole-number area recur constantly, above all the one with [[triangle-13-14-15|its own card]].
`,

"inradius-area": String.raw`
## Why it works
Joining the incenter to the three vertices cuts the triangle into three triangles, one on each side, and each has the inradius as its height.

The incircle touches each side at a point where the radius meets the side at a right angle, so the incenter $I$ is at distance $r$ from every side. Triangle $IBC$ therefore has base $a$ and height $r$, and area $\frac12ar$; likewise $ICA$ has area $\frac12br$ and $IAB$ has $\frac12cr$. The three fill the triangle, so $A = \frac12r(a + b + c) = rs$.

{{figure:dissection}}

The argument uses only that one point is at distance $r$ from every side, so it applies to any polygon with an inscribed circle: cutting from the center to each vertex gives one triangle per side, all of height $r$.

## How to use it
Find the area another way, usually by [[herons-formula|Heron's formula]], then divide by $s$: the $13$-$14$-$15$ triangle has area $84$ and semiperimeter $21$, so $r = 4$. Together with the [[circumradius-area|circumradius formula]] $A = \frac{abc}{4R}$, one area computation gives both radii.

The $s$ in the formula is the same $s$ as in the [[incircle-tangent-lengths|incircle tangent lengths]] $s - a$, $s - b$ and $s - c$, which is where incircle data turns into side data. For a right triangle with legs $a$ and $b$ and hypotenuse $c$, they give the shortcut $$r = s - c = \frac{a + b - c}{2},$$ because the incircle's contact points and the right-angle vertex form a square of side $r$.

## On contests
Seven problems here, six of them AIME, none by it alone; three pair it with [[tangent-facts|equal tangent lengths]], which turn the incircle's contact points into lengths along the sides. Nearly every incircle problem starts here: compute the area, then divide by $s$.
`,

"circumradius-area": String.raw`
## Why it works
The formula is the sine area formula with the sine replaced by a length, using the fact that each side is a chord of the circumcircle.

The area is $\frac12ab\sin C$ by [[trig-area|the sine area formula]]. The side $c$ is a chord of the circumcircle and the inscribed angle $C$ stands on it, so the [[law-of-sines|extended law of sines]] gives $c = 2R\sin C$, that is, $\sin C = \frac{c}{2R}$. Substituting, $A = \frac12ab \cdot \frac{c}{2R} = \frac{abc}{4R}$.

## How to use it
Compute the area once, usually by [[herons-formula|Heron's formula]], then read off both radii: $r = \frac As$ and $R = \frac{abc}{4A}$. For the $13$-$14$-$15$ triangle, $A = 84$ gives $r = 4$ and $R = \frac{13 \cdot 14 \cdot 15}{4 \cdot 84} = \frac{65}{8}$, a value experienced solvers recognize on sight.

{{figure:both-radii}}

For a right triangle the hypotenuse is a diameter, so $R$ is half the hypotenuse with no computation at all. Dividing the two formulas also links the radii directly to the sides: $\frac rR = \frac{4A^2}{s\,abc}$.

## On contests
Seven problems here, six of them AIME, none by it alone: three follow [[herons-formula|Heron's formula]], the classic way to hide $R$ behind three given sides, and two use the circumradius as the scale factor of a [[homothety-monge|homothety]].
`,

"right-triangle-inradius": String.raw`## Why it works
Tangent lengths from the right-angle vertex form an $r \times r$ square in the corner, so $c = (a - r) + (b - r)$, giving $r = \frac{a + b - c}{2}$. Thales gives $R = \frac{c}{2}$ since the hypotenuse subtends a right angle, hence is a diameter.

## How to use it
Fastest inradius in existence — no area needed. Note $r$ is always an integer for integer-sided right triangles with even $a + b - c$ (e.g. $r = 1, 2, 3$ for $(3,4,5), (5,12,13)\cdot$scaled, $(8,15,17)$).

## On contests
"Circle inscribed in a right triangle" is an AMC evergreen. The corner-square picture also answers "distance from the incenter to the right-angle vertex" ($r\sqrt{2}$) instantly.`,

"incircle-tangent-lengths": String.raw`## Why it works
The two tangent segments from any external point to a circle are equal. Label the three pairs $x, y, z$; then $y + z = a$, $x + z = b$, $x + y = c$, and solving gives $x = s - a$, etc. — the semiperimeter appears because summing all three equations gives $x + y + z = s$.

## How to use it
Whenever an incircle (or excircle) touch point appears, immediately write the tangent lengths in terms of $s$. For the excircle opposite $A$, the tangent length from $A$ is exactly $s$, and the touch point on $BC$ mirrors the incircle's touch point across the midpoint of $BC$.

## On contests
An AIME workhorse: problems give distances from vertices to touch points and expect you to reconstruct the sides ($a = (s-b) + (s-c)$). The right-angle special case $r = s - c$ is worth knowing separately.`,

"law-of-sines": String.raw`
## Why it works
Every side of a triangle is a chord of its circumscribed circle, and a chord's length is fixed by the circle's diameter and the inscribed angle that stands on it.

Draw the circumcircle, with center $O$ and radius $R$, and look at side $a = BC$. Draw the diameter from $B$ through $O$, meeting the circle again at $A'$. The angle $BA'C$ stands on the same arc $BC$ as angle $A$, so by [[inscribed-angle-theorem|the inscribed angle theorem]] it equals $A$ when $A$ is acute. Angle $BCA'$ is a right angle, because it stands on a diameter. So $BCA'$ is a right triangle with hypotenuse $2R$ and the side $a$ opposite the angle $A$, which says $$\sin A = \frac{a}{2R}.$$

{{figure:diameter}}

If $A$ is obtuse, $A'$ lands on the other arc and the inscribed angle there is $180^\circ - A$, which has the same sine. Nothing about side $a$ was special, so the same argument gives $\frac{b}{\sin B} = 2R$ and $\frac{c}{\sin C} = 2R$, and all three ratios agree.

## How to use it
Use it whenever a side and the angle opposite it are both known: every other side then follows from its opposite angle, and two angles with one side determine the whole triangle.

The $2R$ form is the potent version, because it turns circumcircle problems into trigonometry and back: a chord of a circle of radius $R$ has length $2R\sin\theta$, where $\theta$ is any inscribed angle standing on it.

Given two sides and an angle that is not between them, it can return two different triangles, since $\sin A = \sin(180^\circ - A)$, so check both.

## On contests
A standard AIME trigonometry step, with 16 problems tagged here and only 1 solved by it alone. Its partner is usually [[angle-chasing|angle chasing]] (5 problems), which produces the angles it converts into sides, and [[trig-area|the sine area formula]] (3) often finishes. The extended form is what most of them need: given the circumradius and an angle, $a = 2R\sin A$ is the chord length directly, which also makes it the standard tool for several triangles sharing one circumcircle.
`,

"law-of-cosines": String.raw`
## Why it works
Put the triangle on coordinates with one side along an axis, and the third side is just the distance between two points you can write down.

Place $C$ at the origin and $B$ on the positive $x$-axis at $(a, 0)$. The vertex $A$ is at distance $b$ from $C$, in the direction making angle $C$ with that axis, so $A = (b\cos C, b\sin C)$. The side $c$ is the distance from $A$ to $B$, so $$c^2 = (a - b\cos C)^2 + (b\sin C)^2 = a^2 - 2ab\cos C + b^2(\cos^2 C + \sin^2 C),$$ and since $\cos^2 C + \sin^2 C = 1$ this is $a^2 + b^2 - 2ab\cos C$.

Nothing there assumed $C$ was acute. When $C$ is obtuse, $\cos C$ is negative, $A$ sits to the left of the $y$-axis, and the same algebra goes through with the signs taking care of themselves. That is why one formula covers every triangle.

The figure shows what the correction measures. The altitude from $A$ lands $b\cos C$ along side $a$ from $C$, the shadow of side $b$ on side $a$, and the right triangle next to $B$ has legs $a - b\cos C$ and $b\sin C$ with hypotenuse $c$. So $2ab\cos C$ is twice side $a$ times that shadow.

{{figure:shadow}}

In vector language the same computation is one line: with $\vec u = \overrightarrow{CB}$ and $\vec v = \overrightarrow{CA}$, $$c^2 = |\vec u - \vec v|^2 = |\vec u|^2 + |\vec v|^2 - 2\,\vec u \cdot \vec v,$$ and the [[vector-dot-product|dot product]] $\vec u \cdot \vec v$ is exactly $ab\cos C$.

## How to use it
It is the exchange rate between sides and angles, and it runs both ways. Forwards, two sides and the included angle give the third side. Backwards, three sides give any angle through $$\cos C = \frac{a^2+b^2-c^2}{2ab},$$ so a triangle specified entirely by lengths becomes a triangle with known angles, which is what lets [[trig-area|the sine area formula]] finish a problem that started with no angles in it at all.

Often you need the sign and not the value. $a^2+b^2-c^2$ is positive, zero or negative exactly as $C$ is acute, right or obtuse, so questions about the shape of a triangle are settled without computing anything.

The move worth rehearsing is the shared diagonal. In a cyclic quadrilateral $ABCD$ the triangles $ABD$ and $CBD$ on either side of the diagonal $BD$ have supplementary angles at $A$ and $C$. Writing the law of cosines in both, with $\cos(180^\circ - A) = -\cos A$, gives $$BD^2 = AB^2 + AD^2 - 2\,AB \cdot AD\cos A = CB^2 + CD^2 + 2\,CB \cdot CD\cos A,$$ two expressions for the same diagonal that differ only in the sign of one cosine.

{{figure:diagonal}}

Equating them solves that cosine out immediately, and the diagonal then drops out in terms of the four sides alone. That cancellation is the entire trick, and it is why [[ptolemys-theorem|Ptolemy]] problems so often fall to this instead.

## On contests
Never the whole problem: none of the 44 problems tagged here uses it alone. It is the step that converts a configuration into numbers once something else has produced the sides, most often alongside [[trig-area|the sine area formula]] (6 problems) or in an [[equilateral-triangle-facts|equilateral]] setting (4), where the $60^\circ$ and $120^\circ$ cases collapse the cosine to $\pm\tfrac12$ and the formula becomes $a^2 + b^2 \mp ab$.

The trigger is blunt: three sides given and anything angular asked. The cyclic-quadrilateral diagonal is the recurring AIME shape, and [[stewarts-theorem|Stewart's theorem]] is this same law applied to the two halves of a cevian, so a problem about a cevian length is usually this in disguise.
`,

"law-cosines-60-120": String.raw`
## Why it works
Substituting the cosine into $c^2 = a^2 + b^2 - 2ab\cos C$ turns the cross term into $\mp ab$.

The $120^\circ$ form also has a picture. Extend the side $a$ past the $120^\circ$ vertex and drop the altitude from the opposite vertex onto that extension.

{{figure:extended}}

The small triangle outside has a $60^\circ$ angle, so it is a [[special-right-triangles|30-60-90 triangle]] with legs $\frac b2$ and $\frac{\sqrt3}{2}b$. The big right triangle then has legs $a + \frac b2$ and $\frac{\sqrt3}{2}b$, so $$c^2 = \left(a + \tfrac b2\right)^2 + \tfrac34b^2 = a^2 + ab + b^2.$$

## How to use it
Use the $+ab$ form wherever a $120^\circ$ angle appears: at the center of an equilateral triangle, between the sides of a regular hexagon, and at the [[fermat-point|Fermat point]], where three segments to the vertices meet at $120^\circ$ and give three applications at once. Use the $-ab$ form for a point on a side of an equilateral triangle, where the angle at a vertex is $60^\circ$. Sides $8$ and $15$ around $60^\circ$ give $$c^2 = 64 + 225 - 120 = 169,$$ so $c = 13$.

The triangles these forms produce with simple sides, such as $3$-$5$-$7$ and $1$-$2$-$\sqrt7$, are listed on [[law-of-cosines-special-triangles|the special triangles card]].

## On contests
Five problems here, three of them AIME, none by it alone; the partners include the [[fermat-point|Fermat point]], [[chord-length|chord lengths]] and [[circular-segment|circular segments]], since a chord subtending $120^\circ$ is the $+ab$ form inside a circle. $3$-$5$-$7$ is to $120^\circ$ what $3$-$4$-$5$ is to $90^\circ$.
`,
"law-of-cosines-special-triangles": String.raw`
## Why it works
Each triangle is the law of cosines at an angle whose cosine is a simple number, so the cross term is a simple multiple of $ab$, and simple sides give a simple third side.

With $\cos C$ equal to $\frac12$, $-\frac12$, $-\frac{\sqrt2}{2}$ or $-\frac{\sqrt3}{2}$, the [[law-of-cosines|law of cosines]] $c^2 = a^2 + b^2 - 2ab\cos C$ becomes $$c^2 = a^2 + b^2 - ab, \quad a^2 + b^2 + ab, \quad a^2 + b^2 + \sqrt2\,ab, \quad a^2 + b^2 + \sqrt3\,ab$$ at $60^\circ$, $120^\circ$, $135^\circ$ and $150^\circ$. Sides $1$ and $2$ at $120^\circ$ give $1 + 4 + 2 = 7$; sides $1$ and $\sqrt2$ at $135^\circ$ give $1 + 2 + 2 = 5$; sides $1$ and $\sqrt3$ at $150^\circ$ give $1 + 3 + 3 = 7$.

The $60^\circ$ and $120^\circ$ triangles come in pairs. Cut an equilateral triangle of side $b$ off a triangle with sides $a$ and $b$ around a $60^\circ$ angle, as in the figure at the top. What is left has sides $a - b$ and $b$ around an angle of $120^\circ$, and the same third side, because $$(a - b)^2 + b^2 + (a - b)b = a^2 + b^2 - ab.$$ So $5$-$7$-$8$ at $60^\circ$ contains $3$-$5$-$7$ at $120^\circ$, and $1$-$3$-$\sqrt7$ contains $1$-$2$-$\sqrt7$.

## How to use it
Recognize the triangle, and the rest of its measurements come quickly. In the $3$-$5$-$7$ triangle the $120^\circ$ angle is opposite the $7$, the area is $$\frac12 \cdot 3 \cdot 5 \sin 120^\circ = \frac{15\sqrt3}{4},$$ and the circumradius is $\frac{7}{2\sin 120^\circ} = \frac{7}{\sqrt3}$.

They usually come from a point on a side of an equilateral triangle. If the side is $s$ and the point is $m$ from one vertex, its distance $d$ to the opposite vertex satisfies $$d^2 = s^2 + m^2 - sm:$$ side $3$ with $m = 1$ gives $\sqrt7$, and side $8$ with $m = 3$ or $m = 5$ gives $7$.

{{figure:cevian}}

Regular hexagons, whose angles are $120^\circ$, and three segments from a point at mutual $120^\circ$ angles produce the $120^\circ$ versions.

Integer triangles with a $60^\circ$ or $120^\circ$ angle are called Eisenstein triples, and the pairing above generates them: $(3, 5, 7)$, $(7, 8, 13)$ and $(5, 16, 19)$ at $120^\circ$, and $(3, 8, 7)$, $(5, 8, 7)$, $(7, 15, 13)$ and $(8, 15, 13)$ at $60^\circ$, with the special angle between the first two sides.

One more triangle is worth knowing for a different reason. In the $4$-$5$-$6$ triangle the largest angle is exactly twice the smallest: the angle opposite $4$ has cosine $\frac34$, the angle opposite $6$ has cosine $\frac18$, and the double-angle formula checks it: $$2\left(\tfrac34\right)^2 - 1 = \tfrac18.$$

## On contests
The $\pm ab$ forms themselves are on [[law-cosines-60-120|their own card]]; this card is the short list of triangles they produce, worth recognizing the way $3$-$4$-$5$ is. The $3$-$5$-$7$ and $1$-$2$-$\sqrt7$ triangles are the ones that recur, usually hidden in an equilateral triangle, a regular hexagon or a $120^\circ$ configuration around a point. For the right-angled cases, see [[special-right-triangles|special right triangles]].
`,

"angle-bisector-theorem": String.raw`
## Why it works
Triangles $ABD$ and $ACD$ have the same height from $A$, and the bisector gives them equal angles at $A$, so their areas can be compared in two ways.

With bases on line $BC$, the two triangles share the height from $A$, so their areas are in the ratio of their bases, $BD : DC$. With [[trig-area|the sine area formula]] instead, $[ABD] = \frac12 \cdot AB \cdot AD\sin\frac A2$ and $[ACD] = \frac12 \cdot AC \cdot AD\sin\frac A2$, because the bisector gives both triangles the same angle $\frac A2$ at $A$ and the same side $AD$. So the areas are also in the ratio $AB : AC$, and the two ratios must be equal.

{{figure:areas}}

The external bisector works the same way. Its two triangles $ABD'$ and $ACD'$ still share the height from $A$, and their angles at $A$ are supplementary, which have the same sine, so again $\frac{BD'}{D'C} = \frac{AB}{AC}$.

A second proof needs no trigonometry. Reflect $B$ across line $AD$ to $B'$. The bisector makes equal angles with $AB$ and $AC$, so the reflection carries ray $AB$ onto ray $AC$: $B'$ lies on $AC$ with $AB' = AB$, and $AD$ is the perpendicular bisector of $BB'$, through its midpoint $M$. It is the same reflection that [[perp-to-angle-bisector|the perpendicular to an angle bisector]] is built on.

{{figure:reflect}}

Now draw the line through $B'$ parallel to $BC$, meeting $AD$ at $E$. A half-turn about $M$ swaps $B$ and $B'$, maps line $AD$ to itself and turns line $BC$ into the parallel through $B'$, so it carries $D$ to $E$, and $B'E = BD$. Since $B'E \parallel DC$, triangles $AB'E$ and $ACD$ are similar, and $$\frac{BD}{DC} = \frac{B'E}{DC} = \frac{AB'}{AC} = \frac{AB}{AC}.$$

If $AB > AC$, the point $B'$ lands beyond $C$ instead, $E$ lies beyond $D$, and every step still holds.

## How to use it
It converts "bisector" into lengths at once. With $BD : DC = c : b$ and $BD + DC = a$, the pieces are $$BD = \frac{ac}{b + c}, \qquad DC = \frac{ab}{b + c}$$ in standard notation.

The external bisector obeys the same ratio, divided the other way. Its foot $D'$ satisfies $\frac{BD'}{D'C} = \frac{AB}{AC}$ with $D'$ lying outside segment $BC$, past whichever of $B$ and $C$ lies on the shorter side, so $$BD' = \frac{ac}{|b - c|}, \qquad CD' = \frac{ab}{|b - c|}.$$ The absolute value warns of the one case with no answer: if $AB = AC$, the external bisector is parallel to $BC$ and never meets it.

Together the two feet make $B$, $C$, $D$, $D'$ a harmonic range, which is where [[harmonic-bundle|harmonic bundles]] enter. Combined with [[mass-points|mass points]], bisectors become weight assignments proportional to the adjacent sides.

## On contests
Constant from AMC 10 through AIME, with 15 problems tagged here, none of which it solves alone: it supplies a ratio that another tool turns into an answer, [[power-of-a-point|power of a point]] (3 problems), or [[similar-figures-ratios|similar triangles]], [[mass-points|mass points]] and [[stewarts-theorem|Stewart's theorem]] (2 each). The incenter's ratio $AI : ID = (b + c) : a$, which comes from applying the theorem twice, is frequently the actual question.
`,

"angle-bisector-length": String.raw`## Why it works
Apply [[stewarts-theorem|Stewart's theorem]] with the segments from the bisector theorem ($m = \frac{ac}{b+c}$, $n = \frac{ab}{b+c}$), and the algebra collapses to $d^2 = ab - mn$ (sides $a, b$ adjacent to the bisected angle). Alternatively, use the trig form $d = \frac{2ab\cos(\frac{C}{2})}{a+b}$.

## How to use it
The $d^2 = (\text{product of adjacent sides}) - (\text{product of segments})$ phrasing is the memorable one, and the external bisector simply swaps which way the subtraction runs: $d'^2 = m'n' - ab$. The reversal tracks where the foot sits relative to the circumcircle: the internal foot is inside it, so $mn$ is subtracted from $ab$, while the external foot is outside, and there $ab$ is the quantity subtracted. The two are not one formula in disguise, so keep them apart. Use the trig form when the angle is special (e.g. bisecting $120^\circ$ gives $\cos 60^\circ = \frac{1}{2}$, so $d = \frac{ab}{a+b}$ — harmonic mean flavor).

## On contests
AIME problems give two sides and the bisector length and ask for the third side; the formula turns this into one quadratic. The $120^\circ$ special case appears in olympiad warm-ups.`,

"stewarts-theorem": String.raw`
## Why it works
The cevian splits the triangle into two triangles that share the side $AD$ and have supplementary angles at $D$, so the law of cosines in each gives two equations whose unknown angle cancels.

{{figure:split}}

Let $\theta = \angle ADB$. Then $\angle ADC = 180^\circ - \theta$, and $\cos(180^\circ - \theta) = -\cos\theta$. The [[law-of-cosines|law of cosines]] in the two triangles gives $c^2 = m^2 + d^2 - 2md\cos\theta$ in triangle $ABD$ and $b^2 = n^2 + d^2 + 2nd\cos\theta$ in triangle $ADC$.

Multiply the first equation by $n$ and the second by $m$. The cosine terms become $-2mnd\cos\theta$ and $+2mnd\cos\theta$, so adding the equations cancels them: $$c^2n + b^2m = m^2n + n^2m + d^2(m + n) = mn(m + n) + d^2(m + n).$$ Since $m + n = a$, this is $b^2m + c^2n = a(d^2 + mn)$.

## How to use it
Label carefully, because the formula is not symmetric: $m$ is the piece of $BC$ next to $B$, and it multiplies $b^2$, the square of the side from the other end. Each side's square is multiplied by the piece of $BC$ at the far end from it, and checking that catches most setup errors.

Two special cases come up constantly. For a median, $m = n = \frac a2$, and the theorem becomes [[apollonius-theorem|Apollonius's theorem]].

For the bisector of angle $A$, the [[angle-bisector-theorem|angle bisector theorem]] supplies the pieces, $m = \frac{ac}{b + c}$ and $n = \frac{ab}{b + c}$. Then $b^2m + c^2n = \frac{abc(b + c)}{b + c} = abc$, so Stewart reads $a(d^2 + mn) = abc$, and the bisector's length is $$d^2 = bc - mn = bc\left[1 - \left(\frac{a}{b + c}\right)^2\right].$$

In a $3$-$4$-$5$ triangle the bisector of the right angle has $d^2 = 12\left(1 - \frac{25}{49}\right) = \frac{288}{49}$, so $d = \frac{12\sqrt2}{7}$. The [[angle-bisector-length|angle bisector length card]] has the equivalent form $d = \frac{2bc\cos\frac A2}{b + c}$ and the external bisector.

The theorem also runs backwards: if the cevian's length is known, it is one equation for where the cevian lands.

## On contests
Nine problems here, all AIME, and none by it alone. Its most frequent partner is [[power-of-a-point|power of a point]]: when a cevian is extended to the circumcircle, Stewart finds the cevian and power of a point finds the rest of the chord. The other regulars are angle bisectors, with the bisector theorem supplying $m$ and $n$, and [[herons-formula|Heron's formula]] once all the lengths are known. It is the reliable fallback when [[mass-points|mass points]] give ratios but not lengths.
`,

"cevas-theorem": String.raw`## Why it works
Each ratio equals a ratio of areas: $\frac{BD}{DC} = \frac{[ABD]}{[ACD]} = \frac{[PBD]}{[PCD]} = \frac{[ABP]}{[ACP]}$ (subtracting the smaller triangles). Multiplying the three such area ratios telescopes to 1. The converse holds too, which is the useful direction.

## How to use it
To prove three cevians concurrent, verify the product is 1; to find an unknown ratio given two others, solve the equation. The trig form $\frac{\sin\angle BAD}{\sin\angle DAC}\cdots = 1$ handles angle-specified cevians (isogonals, bisectors).

## On contests
Medians, bisectors, and altitudes all pass the test instantly (good sanity checks). AIME problems specify two cevian foot ratios and ask about the third — one line of Ceva. Pairs naturally with Menelaus (its collinearity twin) and [[mass-points|mass points]] (its computational engine).`,

"menelaus-theorem": String.raw`## Why it works
Drop perpendiculars from $A$, $B$, $C$ to the transversal line; each ratio on the line equals a ratio of these perpendicular distances, and the product telescopes. The $-1$ (with directed lengths) records that a line crosses an odd number of side extensions.

## How to use it
Use unsigned ratios and the product $= 1$ in practice. The skill is choosing the triangle and the transversal: given a chain of intersection points, pick the triangle whose three sides (extended) the known line crosses. It computes ratios that [[cevas-theorem|Ceva]] cannot reach — points outside segments.

## On contests
The professional's tool for AIME problems where a line cuts across a cevian configuration ("find $\frac{AP}{PD}$" where $P$ is on a cevian). Often two applications of Menelaus replace a page of coordinate algebra. If you know [[mass-points|mass points]] with negative masses, that is Menelaus in disguise.`,

"apollonius-theorem": String.raw`
## Why it works
The median splits the triangle into two triangles with the common side $m_a$ and supplementary angles at $M$, so the law of cosines in each gives two equations whose cosine terms cancel.

Let $\theta = \angle AMB$, so $\angle AMC = 180^\circ - \theta$, and write $m = m_a$, with $BM = MC = \frac a2$. The [[law-of-cosines|law of cosines]] in triangles $ABM$ and $ACM$ gives $$c^2 = m^2 + \tfrac{a^2}{4} - am\cos\theta, \qquad b^2 = m^2 + \tfrac{a^2}{4} + am\cos\theta,$$ and adding them gives $b^2 + c^2 = 2m^2 + \frac{a^2}{2}$.

The same statement is the parallelogram law for the parallelogram that [[median-doubling|doubling the median]] makes, $(2m_a)^2 + a^2 = 2b^2 + 2c^2$. In vectors from $A$, $2\vec{AM} = \vec{AB} + \vec{AC}$ and $\vec{CB} = \vec{AB} - \vec{AC}$, and adding $|\vec{AB} + \vec{AC}|^2$ to $|\vec{AB} - \vec{AC}|^2$ cancels the cross terms. It is also [[stewarts-theorem|Stewart's theorem]] with $m = n = \frac a2$.

## How to use it
Three sides give any median in one line: for sides $6$, $8$ and $10$, the median to the side of length $10$ has $2m^2 = 36 + 64 - 50$, so $m = 5$, half the hypotenuse, as it must be in a right triangle.

The three medians determine the sides too. Solving the three versions of the theorem together gives $$a^2 = \tfrac49\left(2m_b^2 + 2m_c^2 - m_a^2\right),$$ and similarly for $b$ and $c$. Adding the three versions gives $m_a^2 + m_b^2 + m_c^2 = \frac34(a^2 + b^2 + c^2)$.

## On contests
Four problems here, all AIME, one solved by it alone and each of the others with a different partner. "Two sides and the median to the third" is a recurring setup that this formula finishes in one line, and the doubled-median parallelogram is worth drawing whenever a median appears.
`,

"median-triangle-area": String.raw`## Why it works
Translate median $\vec{m_b}$ to start where $\vec{m_a}$ ends: since $\vec{m_a} + \vec{m_b} + \vec{m_c} = \vec{0}$, the three medians close into a triangle. A short vector computation (or the 2:1 centroid dissection) shows its area is $\frac{3}{4}$ of the original — equivalently the original is $\frac{4}{3}$ of it.

## How to use it
Given three median lengths: form the triangle with those sides, compute its area ([[herons-formula|Heron]]), multiply by $\frac{4}{3}$. Medians $9, 12, 15$ or $3, 4, 5$-proportioned sets are gifts — the median triangle is right.

## On contests
Appears verbatim on AMC 10/12 every few years ("a triangle has medians 9, 12, 15; find its area" → 72). Faster and safer than solving for the sides.`,

"rouths-theorem": String.raw`## Why it works
Three applications of Menelaus (or [[mass-points|mass points]]) compute where the cevians pairwise intersect; the shoelace-style ratio algebra assembles into the closed form. The formula's symmetry under cycling $x \to y \to z$ reflects the rotational symmetry of the construction.

## How to use it
$x, y, z$ are the ratios $\frac{BD}{DC}$ etc., taken cyclically. Check $x = y = z = 1$: numerator $(1-1)^2 = 0$ — medians are concurrent, inner triangle degenerates to the centroid. The famous case $x = y = z = 2$ gives $\frac{1}{7}$.

## On contests
The one-seventh triangle is folklore (AMC has asked it directly). For asymmetric ratios, Routh is a fast check on an answer obtained by mass points — or the entire solution if you trust the memorization. Derive-on-demand solvers should master the Menelaus route instead.`,

"vivianis-theorem": String.raw`## Why it works
Connect $P$ to the three vertices, splitting the equilateral triangle (side $s$) into three triangles with bases $s$ and heights $d_1, d_2, d_3$. Total area: $\frac{s}{2}(d_1 + d_2 + d_3) = \frac{s}{2}h$, so the distances sum to the altitude $h$.

Read the same decomposition with signed areas and it stops needing $P$ inside. Take the distance to a side as positive when $P$ is on the same side of that line as the opposite vertex and negative when it is beyond, and $[PAB] + [PBC] + [PCA] = [ABC]$ holds for every point of the plane, so $d_1 + d_2 + d_3 = h$ does too. Outside the triangle there are two regions to picture: across one side, where that single distance turns negative, and past a vertex, where two of them do. Dragging $P$ in the figure below walks through both.

Nothing in the argument needs the sides to be equal either. On a general triangle the three pieces have bases $a$, $b$, $c$, so $a\,d_a + b\,d_b + c\,d_c = 2[ABC]$, a constant. Viviani is what that collapses to when the three bases are the same and the common factor cancels.

## How to use it
Any "sum of distances from an interior point to the sides" question in an equilateral triangle is answered without locating the point, and the weighted form answers the same question on a scalene triangle just as cheaply, since $2[ABC]$ is computable from the side lengths alone. Use the signed reading whenever a problem places its point outside or leaves the position unspecified, because then no case analysis is needed at all. Extends to regular polygons (sum of distances to all sides is constant = $n \times$ apothem) and to equiangular polygons.

## On contests
Shows up as a quick AMC insight ("the sum is constant — compute it at the center or a vertex"). In coordinate form it underlies barycentric thinking: the three normalized distances are the [[barycentric-coordinates|barycentric coordinates]].`,

"euler-line-ratio": String.raw`## Why it works
The [[homothety-monge|homothety]] centered at the centroid $G$ with factor $-\frac{1}{2}$ sends each vertex to the opposite midpoint — hence sends the orthocenter $H$ (intersection of altitudes) to the circumcenter $O$ (intersection of perpendicular bisectors, which are the altitudes of the [[medial-triangle|medial triangle]]). A homothety with factor $-\frac{1}{2}$ through $G$ means exactly $HG = 2GO$, all collinear.

## How to use it
Vector form is the practical one: with the circumcenter as origin, $\vec{OH} = \vec{OA} + \vec{OB} + \vec{OC}$ and $\vec{OG} = \frac{1}{3}(\vec{OA} + \vec{OB} + \vec{OC})$. Given any two of $O, G, H$ in coordinates, the third is immediate.

## On contests
AIME coordinate problems hand you two centers and ask for a distance — the ratio converts it. Also $OH^2 = R^2(1 - 8\cos A\cos B\cos C)$ and $OH^2 = 9R^2 - (a^2+b^2+c^2)$ for the ambitious.`,

"euler-distance-theorem": String.raw`## Why it works
The power of the [[incenter-excenter-lemma|incenter]] with respect to the circumcircle is $d^2 - R^2$ (negative, since $I$ is inside). A chord through $I$ and a vertex, intersected with the arc midpoint, has segment lengths computable via the incenter-excenter lemma ($\frac{r}{\sin(A/2)}$ and $2R\sin(A/2)$), whose product is $2Rr$. So $R^2 - d^2 = 2Rr$.

## How to use it
Direct plug-in when a problem gives two of $R, r, d$. Also the source of Euler's inequality $R \ge 2r$ (since $d^2 \ge 0$), with equality iff equilateral — the starting point of many inequality problems.

## On contests
AIME has asked for $OI$ distances outright. The incenter-excenter lemma used in its proof (arc midpoint is equidistant from $B$, $C$, $I$, and the excenter) is itself one of the highest-value AIME lemmas — learn both together.`,

"nine-point-circle": String.raw`## Why it works
The [[homothety-monge|homothety]] centered at $H$ with factor $\frac{1}{2}$ sends the circumcircle to a circle through the midpoints of $HA$, $HB$, $HC$; a separate reflection argument shows the same circle passes through the side midpoints and the altitude feet. Its radius is half of $R$ by the homothety, and its center is the midpoint of $OH$.

## How to use it
Nine special points on one circle means enormous cyclic-quadrilateral leverage: any four of them are concyclic, unlocking inscribed-angle chases. The center $N$ being the midpoint of $OH$ places it on the [[euler-line-ratio|Euler line]], with $NG = \frac{1}{6}OH$.

## On contests
Occasionally an AIME problem is a nine-point circle fact wearing a costume — e.g. "the circle through the feet of the altitudes" or "through the midpoints" turning out to have radius $\frac{R}{2}$. Recognizing the disguise saves the day; the [[medial-triangle|medial triangle's]] circumcircle IS the nine-point circle.`,

"carnots-theorem": String.raw`## Why it works
Each signed distance is $d_i = R\cos A_i$ (the central angle over side $a$ is $2A$, so the apothem-like distance is $R\cos A$). The identity $\cos A + \cos B + \cos C = 1 + \frac{r}{R}$ then gives $d_1 + d_2 + d_3 = R + r$.

## How to use it
Mostly as the geometric packaging of $\cos A + \cos B + \cos C = 1 + \frac{r}{R}$ — an identity worth knowing by itself (it bounds the cosine sum in $(1, \frac{3}{2}]$). Distances count negative when the circumcenter falls outside (obtuse triangles).

## On contests
Rare directly, but the underlying cosine identity appears in AIME trig problems ("given $\cos A + \cos B + \cos C$ and $R$, find $r$").`,

"simson-line": String.raw`## Why it works
Two of the feet form a cyclic quadrilateral with $P$ and a vertex (right angles subtend diameters), and [[angle-chasing|angle chasing]] in the two circles shows the three feet make a straight angle exactly when $P$ lies on the circumcircle — and only then.

## How to use it
Recognize the configuration: perpendiculars dropped from one point to all three sides with collinear feet ⟺ the point is on the circumcircle. Bonus facts: the Simson line bisects segment $PH$ ($H$ = orthocenter), and rotating $P$ around the circle rotates the line at half speed. The same degenerate-pedal idea reappears for four lines as the complete quadrilateral and its [[miquels-theorem|Miquel]] point.

## On contests
A niche but decisive AIME/olympiad tool — when a problem drops three perpendiculars from a circumcircle point, the collinearity is the intended miracle. Also useful in reverse to prove a point lies on the circumcircle.`,

"brocard-angle": String.raw`## Why it works
Requiring the cevians $AP, BP, CP$ to make equal angles $\omega$ with sides $AB, BC, CA$ respectively forces (via the law of sines in the three sub-triangles) the relation $\cot\omega = \cot A + \cot B + \cot C$; symmetry gives a second such point (the twin Brocard point) with the same angle.

## How to use it
Compute $\cot\omega$ from the angles, or from sides via $\cot\omega = \frac{a^2 + b^2 + c^2}{4A}$ (with $A$ the area) — the latter is the contest-usable form. The bound $\omega \le 30^\circ$ (equality iff equilateral) settles extremal questions.

## On contests
Appears in hard AIME/olympiad trig-geometry. The identity $\cot A\cot B + \cot B \cot C + \cot C \cot A = 1$ (valid in every triangle) is a companion fact that simplifies the algebra when it shows up.`,

"circle-basics": String.raw`
## Why it works
A sector is a slice of the circle, and a slice with central angle $\theta$ is the fraction $\frac{\theta}{2\pi}$ of the whole, of the circumference and of the area alike.

The whole-circle formulas are the starting point. All circles are similar, so the ratio of circumference to diameter is the same for every circle, and that ratio is what $\pi$ means; so $C = \pi \cdot 2r = 2\pi r$.

For the area, cut the circle into many thin sectors and lay them side by side, alternately pointing up and down. They form nearly a parallelogram whose height is $r$ and whose long sides are each half the circumference, $\pi r$, and the thinner the slices, the closer it gets. So the area is $$\pi r \cdot r = \pi r^2.$$

{{figure:slices}}

The sector formulas then follow by proportion. A full turn is $2\pi$ radians, so an angle of $\theta$ radians takes the fraction $\frac{\theta}{2\pi}$ of the circle: its arc is $\frac{\theta}{2\pi} \cdot 2\pi r = r\theta$, and its area is $\frac{\theta}{2\pi} \cdot \pi r^2 = \frac12r^2\theta$.

The arc formula is really what a radian means, since the angle that cuts off an arc equal to the radius has measure $1$. An annulus is simply one circle's area minus the other's, $\pi R^2 - \pi r^2$.

## How to use it
Use the radian forms $r\theta$ and $\frac12r^2\theta$ when the angle is already in radians, and the fraction $\frac{\theta}{360^\circ}$ when it is in degrees; the two are the same computation. A [[circular-segment|circular segment]], the region between a chord and its arc, is a sector minus a triangle, $\frac12r^2(\theta - \sin\theta)$. It is worth deriving each time rather than memorizing, since the triangle's area $\frac12r^2\sin\theta$ comes straight from [[trig-area|the sine area formula]].

## On contests
The building blocks of shaded-region problems: none of the 20 problems tagged here uses these formulas alone, because the work is always decomposing the region into sectors, triangles and segments first, often with [[special-right-triangles|special right triangles]] or an [[equilateral-triangle-facts|equilateral triangle]] (3 problems each) supplying the triangles. The classic "goat grazing" and "overlapping circles" problems, where the lens is two segments, both reduce to sector minus triangle.
`,

"power-of-a-point": String.raw`
## Why it works
Start from what is fixed. Choose a point $P$ and a circle, and the single number $OP^2 - r^2$ is decided before any line is drawn. Now draw any line through $P$ meeting the circle at $X$ and $Y$: the product comes out to that same number, $$PX \cdot PY = |OP^2 - r^2|,$$ whichever line you chose.

That is the whole content of the card, and the reason it has three familiar-looking forms is that a line through $P$ can cross the circle in three ways, not that there are three separate facts.

The proof of the invariance is one similar-triangle step. Two lines through $P$ meet the circle at $A, B$ and at $C, D$. The inscribed angles at $B$ and $D$ stand on the same arc $AC$, so they are equal, and with the shared angle at $P$ the triangles $PAD$ and $PCB$ are similar. Matching sides gives $\frac{PA}{PC} = \frac{PD}{PB}$, which cross-multiplies to $$PA \cdot PB = PC \cdot PD.$$

{{figure:similar}}

Taking the line through the center makes the common value visible: it meets the circle at distances $|OP - r|$ and $OP + r$ from $P$, whose product is $|OP^2 - r^2|$.

Signed, the power is $OP^2 - r^2$ with no absolute value: negative when $P$ is inside, zero exactly on the circle, positive outside. The sign is what distinguishes the configurations.

Inside, $P$ falls between $X$ and $Y$, so the two directed lengths oppose; outside, both point the same way. For the unsigned lengths that means $$PX \cdot PY = r^2 - OP^2 \ \text{inside}, \qquad PX \cdot PY = OP^2 - r^2 \ \text{outside}.$$ On the circle the power vanishes, which is the degenerate case worth remembering because it is how the converse gets used.

## How to use it
Compute the power once, then spend it. Every chord, secant and tangent through $P$ gives an equation with the same right-hand side, so a configuration with several lines through one point collapses to several equations in one unknown quantity. The tangent form is the most used: a tangent is the limiting case $X = Y = T$, so $$PT^2 = PA \cdot PB = OP^2 - r^2$$ for any secant $PAB$, which is why a tangent length and a secant from the same external point determine each other.

It also runs backwards, and the converse is the more powerful half on contests: if $PA \cdot PB = PC \cdot PD$ for two lines through $P$, then $A$, $B$, $C$, $D$ are concyclic. That is one of the few genuinely mechanical ways to prove four points lie on a circle.

Asking which points have equal power with respect to two different circles turns the number into a locus, and the answer is a line, the [[radical-axis|radical axis]].

## On contests
One of the most common AIME circle tools, with 18 problems tagged here, 17 of them AIME, and none that it finishes alone: the equation it produces is usually combined with [[stewarts-theorem|Stewart's theorem]] or [[law-of-cosines|the law of cosines]] (4 problems each). Three shapes account for most of them:

- Two chords crossing inside the circle, to find the fourth piece.
- A tangent and a secant from an outside point, usually to get the tangent length.
- A point whose power is computed two ways, to force an equation.

Reach for it whenever a figure has several lines through one point meeting one circle, since that is the situation the invariance was built for.
`,

"chord-length": String.raw`
## Why it works
The perpendicular from the center to a chord lands at the chord's midpoint, so the center, the midpoint and one endpoint form a right triangle with hypotenuse $R$.

The perpendicular bisects the chord because the center is equally far from the two endpoints, so it lies on the chord's [[perpendicular-bisector-locus|perpendicular bisector]].

In the right triangle, the leg along the chord is half the chord, the other leg is the distance $d$ from the center, and the angle at the center is half the central angle $\theta$. So the half chord is $R\sin\frac\theta2$, and it is also $\sqrt{R^2 - d^2}$ by the Pythagorean theorem: $$\tfrac12\,\text{chord} = R\sin\tfrac\theta2 = \sqrt{R^2 - d^2}.$$ Doubling gives both formulas, and $d = R\cos\frac\theta2$ links them.

{{figure:half-chord}}

For a regular $n$-gon, vertices $k$ steps apart subtend a central angle of $\frac{2\pi k}{n}$, so the angle formula gives the diagonal $2R\sin\frac{k\pi}{n}$.

## How to use it
Given any two of radius, central angle, distance from the center and chord length, the right triangle gives the rest. Equal chords are equally far from the center and cut off equal arcs, since each of those determines the others, and that chain of equivalences carries many problems by itself.

Two intersecting circles share a common chord, and the line through their centers is its perpendicular bisector. Each circle gives the half chord as $\sqrt{R^2 - d^2}$, with its own radius and its own distance to the chord, and when the chord lies between the centers the two distances add up to the distance between the centers. Setting the two expressions equal locates the chord.

{{figure:common-chord}}

## On contests
Eight problems here, five AIME and three AMC 12, and none by it alone: a chord is usually turned into an angle, or an angle into a chord, next to [[angle-addition|angle addition]] or the [[double-angle|double angle formulas]]. The common chord of two intersecting circles and the diagonals of a regular polygon are the two setups that recur.
`,

"inscribed-angle-theorem": String.raw`
## Why it works
Draw the radius to the vertex of the angle, and the isosceles triangle it creates forces the central angle to be twice the inscribed one.

Start with the case where one side of the inscribed angle passes through the center. Let the angle be $\angle BAC$ with $AC$ a diameter through the center $O$. Triangle $OAB$ is isosceles, since $OA$ and $OB$ are both radii, so its base angles at $A$ and $B$ are both $\theta$. The central angle $\angle BOC$ is an exterior angle of that triangle, so it equals the sum of the two remote interior angles, $\theta + \theta = 2\theta$.

{{figure:diameter-case}}

Every other position reduces to this one. Draw the diameter from $A$ through $O$. If $O$ lies inside the angle, the diameter splits it into two angles of the first kind, and adding the two halves gives the result; if $O$ lies outside, the angle is the difference of two such angles, and subtracting gives it.

Since the central angle depends only on the arc, every inscribed angle on the same arc is the same size, and an arc of $180^\circ$, a semicircle, gives an inscribed angle of $90^\circ$.

## How to use it
Think in arcs: every inscribed angle is half its intercepted arc, so [[angle-chasing|angle chasing]] becomes arc bookkeeping (arcs add around the circle to $360^\circ$). Corollaries to use fluently: same-arc angles are equal; opposite angles of cyclic quadrilaterals are supplementary; a right inscribed angle sits on a diameter (Thales, both directions).

## On contests
The foundation of circle angle chasing at every level: none of the 13 problems tagged here ends with it, and [[angle-chasing|angle chasing]] joins it in 4. AMC problems chain it two or three times; AIME problems hide it inside a cyclic quadrilateral that must first be discovered, through equal angles or [[power-of-a-point|the converse of power of a point]].
`,

"thales-theorem": String.raw`
## Why it works
The midpoint of $AB$ is the same distance from $A$, $B$ and $C$ exactly when the angle at $C$ is right, and that one fact gives both directions.

Forwards: let $O$ be the center, so $OA = OB = OC$. The triangles $OAC$ and $OBC$ are isosceles, so $\angle OCA = \angle A$ and $\angle OCB = \angle B$. Adding, $\angle ACB = \angle A + \angle B$. The three angles of triangle $ABC$ add to $180^\circ$, so $2\angle ACB = 180^\circ$ and $\angle ACB = 90^\circ$. This is also the [[inscribed-angle-theorem|inscribed angle theorem]] for an arc of $180^\circ$.

{{figure:isosceles}}

Conversely, if $\angle ACB = 90^\circ$, complete the right triangle to a rectangle $ACBD$. The diagonals of a rectangle are equal and bisect each other, so their crossing point, the midpoint $O$ of $AB$, is at distance $\frac{AB}{2}$ from all four corners, $C$ included. So $C$ lies on the circle with diameter $AB$.

{{figure:rectangle}}

## How to use it
The converse is the useful direction. Whenever a right angle at $C$ looks at a fixed segment $AB$, draw the circle with diameter $AB$: every such $C$ lies on it, which turns an angle condition into a circle and brings in [[power-of-a-point|power of a point]], cyclic quadrilaterals and inscribed angles.

Two right angles on the same segment put four points on one circle, which is how problems hide cyclic quadrilaterals. The standard case is the feet of two altitudes.

{{figure:feet}}

Forwards, it places the circumcenter of a right triangle at the midpoint of the hypotenuse, so the circumradius is half the hypotenuse and so is the median to it; that is [[median-to-hypotenuse|the median-to-hypotenuse fact]]. And a point that moves while seeing a fixed segment at a right angle traces the circle on that segment.

## On contests
Nine problems here, six of them AIME, and none by it alone: the right angle it produces is usually the start of [[similar-figures-ratios|similar triangles]] or a [[pythagorean-theorem|Pythagorean]] computation. The common miss is seeing a $90^\circ$ angle on a segment and not drawing the circle through it.
`,

"angle-chord-secant": String.raw`## Why it works
Both are exterior-angle arguments: draw the chord connecting the two intersection configurations and apply the [[inscribed-angle-theorem|inscribed angle theorem]] to each arc; interior crossing adds the two half-arcs, exterior vertex subtracts them.

## How to use it
Uniform recipe: vertex inside → half the sum of the two intercepted arcs; vertex on the circle → half the arc (inscribed/tangent-chord); vertex outside → half the difference. With arcs as unknowns, these plus "arcs sum to $360^\circ$" produce linear systems that crack most multi-angle circle diagrams. All three cases are the angular half of the same picture whose length half is the [[power-of-a-point|power of a point]], so a configuration that gives one usually gives the other.

## On contests
AMC 10/12 circle problems are frequently just this taxonomy plus one linear equation. Tangent-tangent angle = $180^\circ$ minus the near arc is the special case people forget — from an external point, the [[two-tangents-angle|angle between two tangents]] plus the minor arc equals $180^\circ$.`,

"tangent-facts": String.raw`
## Why it works
The touch point is the point of the tangent line closest to the center, and the closest point of a line to any given point is the foot of the perpendicular.

Every point of the tangent line other than the touch point $T$ lies outside the circle, so its distance from the center $O$ is more than the radius; that makes $T$ the point of the line closest to $O$.

The closest point of a line to $O$ is also the foot $F$ of the perpendicular from $O$, because any other point $Q$ of the line makes a right triangle $OFQ$ with hypotenuse $OQ$, and $$OQ^2 = OF^2 + FQ^2 \gt OF^2.$$ The two closest points must be the same point, so $T = F$ and $OT$ is perpendicular to the line.

The equal tangents follow at once. From an outside point $P$, draw tangents touching at $A$ and $B$. Triangles $OAP$ and $OBP$ have right angles at $A$ and $B$, share the hypotenuse $OP$, and have equal legs $OA = OB = r$, so by the [[pythagorean-theorem|Pythagorean theorem]] $$PA = \sqrt{OP^2 - r^2} = PB.$$ The figure at the top shows the kite this makes, symmetric about $OP$.

The tangent–chord angle is the [[inscribed-angle-theorem|inscribed angle]] rule in its limiting case: slide one endpoint of a chord along the circle into the other, and the chord turns into the tangent while the angle stays half the arc.

{{figure:chord}}

## How to use it
On any tangency, draw the radius to the touch point; the right angle it makes is nearly always the intended structure. Two tangents from one point make a kite symmetric about the line to the center, so the center lies on the bisector of the angle between them.

A circle inscribed in a polygon turns into equal-tangent bookkeeping; in a triangle the tangent lengths from the vertices are $s - a$, $s - b$ and $s - c$, worked out on [[incircle-tangent-lengths|the incircle tangent lengths card]].

## On contests
Drawing the radius to the tangent point is the first line of a remarkable share of circle problems, though never the last: none of the 20 problems tagged here ends there, and the usual next step is [[similar-figures-ratios|similar triangles]] (4 problems) or [[inradius-area|the inradius formula]] (3).

Common setups are a circle inscribed in a right angle, whose center lies on the bisector at distance $r$ from both sides, and belts or pulleys around two circles, where a common tangent has length $\sqrt{d^2 - (r_1 \pm r_2)^2}$.
`,

"tangent-chord-angle": String.raw`
## Why it works
The tangent at $T$ is perpendicular to the radius $OT$, and that right angle is enough to compare the tangent–chord angle with the angle at the center.

Let $\theta$ be the angle between the tangent and the chord $TA$. Then $\angle OTA = 90^\circ - \theta$, and triangle $OTA$ is isosceles with $OT = OA$, so its angle at $O$ is $$\angle TOA = 180^\circ - 2(90^\circ - \theta) = 2\theta.$$ The central angle is twice $\theta$, so $\theta$ is half the arc $TA$, as the second figure at the top shows.

An [[inscribed-angle-theorem|inscribed angle]] on the same arc is also half of it, so $\theta = \angle TBA$ for every $B$ on the far arc. The tangent–chord angle behaves exactly like an inscribed angle whose second chord has shrunk to the tangent line.

## How to use it
Whenever a tangent meets a chord, re-mark the angle between them as the inscribed angle on the far side of the chord. That turns an awkward angle at the tangent into an ordinary angle of a triangle, ready for an [[angle-chasing|angle chase]].

The workhorse case is a tangent to a triangle's circumcircle at a vertex. The tangent at $A$ makes an angle equal to $\angle C$ with side $AB$, and an angle equal to $\angle B$ with side $AC$.

{{figure:circumtangent}}

So the tangent at $A$ is antiparallel to $BC$: it runs in the same direction as any line meeting $AB$ and $AC$ at two points concyclic with $B$ and $C$. That is how tangent lines enter concyclicity arguments.

## On contests
Two problems here, both AIME, neither solved by it alone; both finish with the [[law-of-cosines|law of cosines]] after the equal angles have produced a similar triangle. On the AMC it usually appears as a single step in an angle chase, trading an angle at a tangent for an inscribed one.
`,

"two-tangents-angle": String.raw`## Why it works
Each radius is perpendicular to its tangent, so quadrilateral $PAOB$ has right angles at $A$ and $B$; since its four angles sum to $360^\circ$, $\angle APB + \angle AOB = 180^\circ$. Equivalently the exterior-vertex rule gives $\angle P = \tfrac{1}{2}(\text{far arc} - \text{near arc})$, and because the two arcs sum to $360^\circ$ that is $180^\circ - \angle AOB$.

## How to use it
Drop both radii to the tangent points: $PAOB$ splits along $OP$ into two congruent right triangles with legs $r$ and tangent length $\sqrt{OP^2 - r^2}$. One picture yields the angle ($\sin\tfrac{\angle P}{2} = r/OP$), the tangent length, and $PA = PB$ together — and $OP$ bisects $\angle APB$.

## On contests
The "two tangents from a point" figure runs from MATHCOUNTS through AIME. Keep the supplement handy — the external angle and the central angle add to $180^\circ$ — and remember the center sits on the bisector of $\angle APB$, which pins down the whole configuration.`,

"common-tangent-lengths": String.raw`
## Why it works
Both radii to the points of contact are perpendicular to the tangent, so they are parallel to each other, and sliding the tangent segment over by one radius turns the picture into a right triangle.

Slide the tangent segment so that one end sits on the smaller circle's center. It becomes a leg of a right triangle whose hypotenuse is the center line $d$. For an external tangent the two radii point to the same side, so the other leg is their difference; for an internal tangent they point to opposite sides, so it is their sum. The [[pythagorean-theorem|Pythagorean theorem]] gives $$t_{\text{ext}}^2 = d^2 - (r_1 - r_2)^2, \qquad t_{\text{int}}^2 = d^2 - (r_1 + r_2)^2.$$

The figures at the top show both triangles, and the third shows the touching case.

## How to use it
The formulas also say when the tangents exist: the internal ones need $d \ge r_1 + r_2$, circles that do not overlap, and the external ones need $d \ge |r_1 - r_2|$, neither circle strictly inside the other.

For two [[tangent-circles|touching circles]], $d = r_1 + r_2$, and the external tangent is $$\sqrt{(r_1 + r_2)^2 - (r_1 - r_2)^2} = 2\sqrt{r_1r_2}.$$ That is the step in every chain of circles resting on a line or squeezed between two lines, where consecutive radii often form a geometric sequence.

## On contests
Three problems here, all AIME, none solved by it alone. The recurring shape is circles in a corner or resting on a line, where the gap between their points of contact is $2\sqrt{r_1r_2}$, and harder versions pair the tangent lengths with a [[homothety-monge|homothety]] or similar triangles at the point where the tangents meet. Belt-and-pulley problems start from the same right triangles.`,

"descartes-circle-theorem": String.raw`
## Why it works
The proof is a long computation with center distances, or a short argument by inversion, and neither is contest material; what matters is the shape of the result.

The relation is a quadratic in $k_4$, so three mutually tangent circles have two circles tangent to all three. Solving it gives $$k_4 = k_1 + k_2 + k_3 \pm 2\sqrt{k_1k_2 + k_2k_3 + k_3k_1},$$ and the two roots are the small circle in the gap and the large circle around the three.

{{figure:soddy}}

The large circle touches the others from outside them, so it bends the other way and its curvature comes out negative. A line is the limit of a circle as its radius grows, so it enters with curvature $0$, as in the figure at the top.

## How to use it
Convert radii to curvatures, give an enclosing circle a negative sign and a line curvature $0$, and solve for the missing one. The two roots add to $$k_4 + k_4' = 2(k_1 + k_2 + k_3)$$ by Vieta's formulas, which steps along a chain of circles without solving another quadratic.

Two parallel lines and a circle are the easiest case, with two curvatures of $0$.

## On contests
One problem here, from the AMC 10, solved by it alone: four mutually tangent circles, where the center-distance equations would be brutal. It is the standard shortcut whenever four [[tangent-circles|tangent circles]] appear, and it extends to spheres in every dimension as the [[descartes-sphere-theorem|Soddy–Gosset theorem]].
`,

"caseys-theorem": String.raw`## Why it works
Generalizes [[ptolemys-theorem|Ptolemy]] by replacing vertices with circles tangent to the host circle; each tangent length $t_{ij}$ plays the role of a side/diagonal. Provable by inversion centered on the host circle, which turns the statement into ordinary Ptolemy.

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

"cyclic-opposite-angles": String.raw`
## Why it works
Each angle of a cyclic quadrilateral is an inscribed angle, and two opposite angles stand on the two arcs that together make up the whole circle.

$\angle A$ stands on the arc $BCD$, and $\angle C$ stands on the arc $DAB$. By the [[inscribed-angle-theorem|inscribed angle theorem]] each is half its arc, so $$\angle A + \angle C = \tfrac12\left(\text{arc } BCD + \text{arc } DAB\right) = \tfrac12 \cdot 360^\circ = 180^\circ.$$

{{figure:arcs}}

The converse, the half used as a test, compares two angles. Suppose $\angle B + \angle D = 180^\circ$, and draw the circle through $A$, $B$ and $C$. If $D$ were inside it, the line $AD$ would meet the circle again at a point $D'$ beyond $D$. Then $ABCD'$ is cyclic, so $\angle AD'C = 180^\circ - \angle B = \angle ADC$.

But $\angle ADC$ is an exterior angle of triangle $DD'C$, so it is strictly larger than $\angle AD'C$, a contradiction. A point $D$ outside the circle fails in the same way, with the roles reversed, so $D$ is on the circle.

{{figure:converse}}

## How to use it
As a test, show that one pair of opposite angles is supplementary, or that an exterior angle equals the opposite interior angle; both prove the four points lie on a circle. The other standard test is two equal angles standing on a common segment from the same side.

Once a quadrilateral is known to be cyclic, every pair of angles on the same arc is equal, which is where most [[angle-chasing|angle chases]] find their second wind. It also sets up [[ptolemys-theorem|Ptolemy's theorem]], and the [[law-of-cosines|law of cosines]] on a shared diagonal, where $\cos C = -\cos A$.

## On contests
Three problems here, one each from the AMC 10, AMC 12 and AIME, none solved by it alone. A given angle of $120^\circ$ at one vertex becomes $60^\circ$ at the opposite one, ready for the law of cosines and Ptolemy, and two supplementary right angles make a diagonal a diameter, through [[thales-theorem|Thales' theorem]].

Hidden cyclic quadrilaterals are the most common theme in hard contest geometry: whenever equal or supplementary angles appear over a shared segment, draw the circle.
`,

"concyclicity-tests": String.raw`## Key forms
- $A + C = 180^\circ$ — opposite angles of the quadrilateral, the default test
- $\angle ACB = \angle ADB$ with $C, D$ on the same side of $AB$ — no quadrilateral needed
- $PA \cdot PC = PB \cdot PD$ where the diagonals cross at $P$ (from outside, two secants give $PA \cdot PB = PC \cdot PD$)
- $AC \cdot BD = AB \cdot CD + BC \cdot AD$ — Ptolemy, with equality only when concyclic in order
- feet of the perpendiculars from $P$ to the sides of $ABC$ collinear $\iff$ $P$ on its circumcircle

## Why it works
Each is the converse of a fact about circles, and each converse holds because the circle through three of the points is unique. Fix $A$, $B$, $C$; they determine one circle. The fourth point $D$ either lies on it or does not, and every quantity below is strictly monotonic as $D$ moves off it, so matching the value forces $D$ back onto the circle.

That is the whole argument for the [[power-of-a-point|power of a point]] version: the power of $P$ is the same product measured along any line through it, so if a second line gives the same product, its two points sit on the same circle. Inside the quadrilateral that reads $PA \cdot PC = PB \cdot PD$ along the two diagonals; from a point outside, the two secants read $PA \cdot PB = PC \cdot PD$ instead. It is one test, and only the position of $P$ decides which pairing to write. For [[ptolemys-inequality|Ptolemy]] the monotonicity is the inequality itself, which is strict off the circle. For the angle versions it is the [[inscribed-angle-theorem|inscribed angle theorem]], since the angle subtending a fixed chord grows as the vertex moves inside the circle and shrinks as it moves outside.

## How to use it
Reach for the angle test first; it needs no lengths and usually falls out of the angle chase you were already doing. Use the power-of-a-point form when two of the four points already lie on a line through a third marked point, because it converts the goal into a single product equation. Keep Ptolemy for when the problem hands you all six distances and nothing else.

The trap is the side condition. $\angle ACB = \angle ADB$ proves concyclicity only when $C$ and $D$ are on the same side of $AB$. From opposite sides the correct relation is $\angle ACB + \angle ADB = 180^\circ$, which is the opposite-angles test again. Getting this backwards produces a proof of something false, so check the picture before quoting the equality.

## On contests
Rarely the point of a problem and often the step that unlocks one: proving a concyclicity mid-solution turns an unrelated pair of angles into equal ones. AIME geometry uses it constantly as a hidden step. [[cyclic-opposite-angles|The supplementary-angle test]] covers most of it, and this card is the rest — worth reading once so the alternatives are available when the angles are not.`,

"ptolemys-theorem": String.raw`
## Why it works
Choose a point on one diagonal that splits it into two pieces, each of which a pair of similar triangles can measure.

Let the quadrilateral be $ABCD$, and choose $E$ on the diagonal $AC$ so that $\angle ABE = \angle DBC$. The angles $BAC$ and $BDC$ stand on the same arc $BC$, so they are equal, and triangles $ABE$ and $DBC$ are similar. That gives $\frac{AE}{AB} = \frac{DC}{DB}$, so $$AE \cdot BD = AB \cdot CD.$$

Adding $\angle EBD$ to both of the equal angles gives $\angle EBC = \angle ABD$. The angles $BCA$ and $BDA$ stand on the same arc $AB$, so triangles $EBC$ and $ABD$ are similar too. That gives $\frac{EC}{BC} = \frac{AD}{BD}$, so $EC \cdot BD = BC \cdot AD$.

{{figure:proof}}

Adding the two equations gives $(AE + EC) \cdot BD = AB \cdot CD + BC \cdot AD$, and $AE + EC = AC$, so $$AC \cdot BD = AB \cdot CD + BC \cdot AD.$$ When the four points are not on a circle, the same pair of similar triangles can still be built, but $E$ no longer lands on $AC$, and the triangle inequality $AC \le AE + EC$ turns the equation into [[ptolemys-inequality|Ptolemy's inequality]].

## How to use it
When a cyclic quadrilateral has most of its six lengths known, Ptolemy is often three lines where the law of cosines is a page. An isosceles trapezoid is always cyclic, with equal diagonals and equal legs, so its diagonal satisfies $d^2 = \text{leg}^2 + \text{product of the bases}$: with bases $6$ and $12$ and legs $5$, $d^2 = 25 + 72 = 97$.

Special configurations give clean facts. For a rectangle it reads $d^2 = a^2 + b^2$, the Pythagorean theorem. For a point $P$ on arc $BC$ of the circumcircle of an equilateral triangle $ABC$, the quadrilateral $ABPC$ gives $PA \cdot BC = PB \cdot CA + PC \cdot AB$, and dividing by the common side leaves $$PA = PB + PC.$$ In a regular pentagon with side $s$ and diagonal $d$, four of the vertices give $d^2 = s^2 + sd$, so $\frac ds$ is the golden ratio.

## On contests
Seven problems here, six of them AIME, none by it alone; two pair it with [[equal-chords-arcs|equal chords]], since equal arcs make several of the six lengths equal and leave Ptolemy with one unknown. It is also the standard way to get exact values such as $\cos 36^\circ$ from the regular pentagon.
`,

"brahmaguptas-formula": String.raw`## Why it works
Follow [[herons-formula|Heron's]] derivation but for a cyclic quadrilateral: split along a diagonal, use $\frac{1}{2}(ab + cd)\sin B$ for the total area and the law of cosines on both triangles with $\cos D = -\cos B$; eliminate the diagonal and factor.

## How to use it
Only for cyclic quadrilaterals (it is the maximum possible area for given sides — any non-cyclic quadrilateral with those sides has less area, by [[bretschneiders-formula|Bretschneider]]). With $d = 0$ it degrades gracefully to Heron. Pair with [[ptolemys-theorem|Ptolemy]] and the law of cosines to extract diagonals after the area.

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
Apply [[ptolemys-theorem|Ptolemy]] to the cyclic quadrilateral $ABPC$ (with $P$ on arc $BC$): $PA \cdot BC = PB \cdot CA + PC \cdot AB$, and all three triangle sides are equal — divide them out.

## How to use it
Any point on the circumcircle arc of an equilateral triangle: the longest of the three distances equals the sum of the other two. Combined with the law of cosines ($\angle BPC = 120^\circ$ or $60^\circ$ angles at $P$), it typically determines all three distances from partial data.

## On contests
A recurring AIME/AMC gem — "point on the circumcircle with $PB = 5$, $PC = 3$, find $PA$" is a one-liner ($PA = 8$). The related interior-point fact (Pompeiu: for $P$ not on the circle, the distances form a triangle) is the companion.`,

"bretschneiders-formula": String.raw`## Why it works
Same split-and-eliminate as [[brahmaguptas-formula|Brahmagupta]], but without the cyclic condition the angle term $abcd\cos^2\left(\frac{A+C}{2}\right)$ survives. Cyclic ($A + C = 180^\circ$) kills it; that is the sanity check.

## How to use it
Rarely needed in full generality — its value is conceptual: for fixed sides, area is maximized exactly when the quadrilateral is cyclic. That extremal fact, not the formula, is what problems test.

## On contests
"Of all quadrilaterals with sides $a,b,c,d$, the cyclic one has the largest area" occasionally decides an AMC answer. Compute the max via Brahmagupta; cite Bretschneider only mentally.`,

"varignons-theorem": String.raw`## Why it works
Each midsegment of the two triangles formed by a diagonal is parallel to that diagonal and half its length — so both pairs of opposite midpoint-sides are parallel to a diagonal, making a parallelogram with sides $\frac{p}{2}, \frac{q}{2}$. The area halves because each corner cut removes a quarter-scale triangle summing to half.

## How to use it
Midpoints of a quadrilateral's sides → automatic parallelogram with sides parallel to the diagonals; it is a rectangle iff the diagonals are perpendicular, a rhombus iff they are equal. The segment joining the midpoints of the diagonals also passes through the parallelogram's center. Its sides are half the diagonals, which is the bridge to [[euler-quadrilateral|Euler's quadrilateral theorem]] and to the diagonal-based quadrilateral area formulas. Because its sides are half the diagonals, it also gives the diagonal-based [[trapezoid-parallelogram-areas|quadrilateral areas]] directly.

## On contests
AMC uses it straight ("midpoints form what figure? what area?"); AIME uses the parallel-to-diagonals property to transfer angle/length conditions from sides to diagonals.`,

"euler-quadrilateral": String.raw`## Why it works
Vector algebra: place the midpoint identity $\vec{m} = \frac{(\vec{a}+\vec{c}) - (\vec{b}+\vec{d})}{2}$ and expand all squared lengths; every cross term cancels, leaving the identity. The parallelogram law is the $m = 0$ case (diagonal midpoints coincide).

## How to use it
Relates the four sides, two diagonals, and the "midline" $m$ — given any five, find the sixth. Its main corollary: in any quadrilateral, $a^2+b^2+c^2+d^2 \ge p^2 + q^2$ with equality iff parallelogram.

## On contests
Occasional AIME appearances when a problem gives all four sides and one diagonal and asks about the other — check whether the midpoint segment is determinable; in parallelogram-adjacent configurations it vanishes and the computation collapses.`,

"distance-midpoint": String.raw`
## Why it works
Each formula comes from the horizontal and vertical legs drawn between the two points.

The horizontal gap $\Delta x = x_2 - x_1$ and the vertical gap $\Delta y = y_2 - y_1$ are the legs of a right triangle whose hypotenuse is the segment, so the [[pythagorean-theorem|Pythagorean theorem]] gives $$d = \sqrt{\Delta x^2 + \Delta y^2}.$$ The midpoint is halfway along both legs, which is the average of the coordinates.

More generally the point a fraction $t$ of the way from $P_1$ to $P_2$ is $P_1 + t(P_2 - P_1)$, and taking $t = \frac{k}{k + 1}$ gives the section formula.

The slope $\frac{\Delta y}{\Delta x}$ is the rise for each unit of run. Turning a line a quarter turn turns its slope triangle with it, which swaps the run and the rise and reverses one of them: run $1$ and rise $m$ become rise $1$ and run $-m$, a slope of $-\frac1m$. That is why perpendicular slopes multiply to $-1$.

{{figure:quarter-turn}}

In vectors the same fact reads: the directions $(1, m_1)$ and $(1, m_2)$ are perpendicular exactly when their [[vector-dot-product|dot product]] $1 + m_1m_2$ is $0$.

## How to use it
Most coordinate work is these three measurements, so place the figure to make them easy: a right angle at the origin with its legs on the axes, a line of symmetry on an axis, and vertices at lattice points where the problem allows.

The section formula is the one people forget. The point two thirds of the way from $(1, 2)$ to $(7, 5)$ is $$\frac{(1, 2) + 2(7, 5)}{3} = (5, 4).$$ Applied to a median, it shows that the centroid of a triangle is the average of its three vertices.

Setting two distances equal and squaring gives a line, because the $x^2$ and $y^2$ terms cancel; that line is the [[perpendicular-bisector-locus|perpendicular bisector]] of the two points. And the perpendicular-slope rule gives the equation of an altitude from the slope of its side, or of a tangent from the slope of its radius.

## On contests
Nine problems here, spread across AMC 10, AMC 12 and AIME, one solved by it alone. In the rest it is the measuring step of a larger plan, often with a [[rotation-90|quarter-turn rotation]], which swaps and negates coordinates exactly as it does the slope triangle. It is the foundation of every [[coordinate-bash|coordinate bash]], and the fastest wins come from choosing the coordinate system well.
`,

"shoelace-formula": String.raw`
## Why it works
Each term of the sum is twice the signed area of a triangle with one corner at the origin, and adding those triangles around the polygon leaves exactly the polygon.

The triangle with corners $O = (0,0)$, $P_i = (x_i, y_i)$ and $P_{i+1} = (x_{i+1}, y_{i+1})$ has area $\frac12|x_iy_{i+1} - y_ix_{i+1}|$, [[determinant-geometric|half the determinant]] of the two position vectors. Without the absolute value, the sign records the direction of turn: positive when $O \to P_i \to P_{i+1}$ turns counterclockwise, negative when it turns clockwise.

Picture $O$ outside a convex polygon and walk around the polygon counterclockwise, adding one signed triangle per edge. The edges on the far side of the polygon, as seen from $O$, turn counterclockwise and add their triangles. The edges on the near side turn back the other way and subtract theirs.

The triangles to the far edges cover the polygon together with the region between it and $O$, and the triangles to the near edges cover just that region, so the subtraction leaves exactly the polygon.

{{figure:fan}}

The same cancellation happens wherever $O$ is and whatever the polygon's shape, as the full proof shows. Going around clockwise instead flips every sign, and the absolute value repairs that. The formula therefore works in either direction, but only when the vertices are taken in order around a polygon that does not cross itself.

## Full proof
Fix a point $Q$ not on the boundary, and ask how many times the signed triangles count it. $Q$ lies in the triangle for the edge $P_iP_{i+1}$ exactly when that edge crosses the ray from $O$ through $Q$ at a point beyond $Q$, and the triangle's sign records which way the edge crosses the ray: for a counterclockwise polygon, positive where the boundary leaves the polygon along the ray and negative where it enters.

Follow the ray outward from $Q$. It meets the boundary finitely many times, alternately leaving and entering the polygon, and it ends outside, since the polygon is bounded. If $Q$ is outside, the crossings beyond it pair off, one entry with the next exit, and $Q$ is counted $0$ times in total. If $Q$ is inside, the first crossing is an exit and the rest pair off, so $Q$ is counted exactly once.

So the sum of the signed triangle areas counts each point inside the polygon once and each point outside it zero times, which means it equals the area of the polygon. Rays that pass through a vertex, and points on the boundary, form a set of zero area and do not affect the total.

## How to use it
Write the vertices as a column, in order around the polygon, and copy the first vertex again at the bottom. Multiply each $x$ by the $y$ in the row below and add these products; then multiply each $y$ by the $x$ in the row below and add those. Half the absolute difference of the two sums is the area. Keeping the two sums separate avoids most sign slips.

For a triangle the formula becomes $\frac12|x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)|$, and moving one vertex to the origin first shortens it to $\frac12|x_2y_3 - x_3y_2|$ for the other two, measured from it.

The order matters. Listing a quadrilateral's corners as $A, C, B, D$ traces a bow tie, which crosses itself, and the formula then returns a wrong area with no warning.

## On contests
Eleven problems here, nine of them AIME, and never alone: it is the last step once [[coordinate-bash|coordinates]] are set up, or one of the areas in an [[area-method|area argument]]. With lattice vertices it pairs with [[picks-theorem|Pick's theorem]], which converts the area into a count of lattice points or back. The one trap is vertex order, since a self-crossing listing gives a wrong area silently.
`,

"picks-theorem": String.raw`## Why it works
Both sides are additive when gluing polygons along a shared edge, and the formula checks on unit lattice triangles (area $\frac{1}{2}$, $I = 0$, $B = 3$) — induction on triangulations does the rest.

## How to use it
Three quantities, one equation: any two give the third. Boundary points on a segment between lattice points $(x_1,y_1), (x_2,y_2)$: $\gcd(|\Delta x|, |\Delta y|) + 1$ including endpoints — that gcd count is half of most Pick's problems.

## On contests
AMC/AIME lattice-polygon problems: shoelace for $A$, gcd sums for $B$, Pick's for $I$. Also runs in reverse: given interior/boundary counts, deduce the area without seeing the polygon.`,

"point-line-distance": String.raw`
## Why it works
The vector $(A, B)$ is perpendicular to the line, and the distance is the part of any vector from the line to the point that runs in that perpendicular direction.

$(A, B)$ is perpendicular to the line because for two of its points, $Ax_1 + By_1 + C = 0$ and $Ax_2 + By_2 + C = 0$, and subtracting gives $$A(x_2 - x_1) + B(y_2 - y_1) = 0:$$ the [[vector-dot-product|dot product]] of $(A, B)$ with every direction along the line is $0$.

Now take any point $Q = (x_1, y_1)$ of the line and the vector from $Q$ to $P = (x_0, y_0)$. Its component along the unit normal $\frac{(A, B)}{\sqrt{A^2 + B^2}}$ is the perpendicular distance, whichever $Q$ is chosen, and it equals $$\frac{A(x_0 - x_1) + B(y_0 - y_1)}{\sqrt{A^2 + B^2}}.$$ Since $Ax_1 + By_1 = -C$, the numerator is $Ax_0 + By_0 + C$.

{{figure:projection}}

## How to use it
Rewrite the line as $Ax + By + C = 0$ first: the distance from $(3, 1)$ to $y = -\frac34x + \frac{25}{4}$ uses $3x + 4y - 25 = 0$ and is $\frac{|9 + 4 - 25|}{5} = \frac{12}{5}$. Two parallel lines $Ax + By + C_1 = 0$ and $Ax + By + C_2 = 0$ are $\frac{|C_1 - C_2|}{\sqrt{A^2 + B^2}}$ apart.

The main use is tangency: a circle with center $(h, k)$ and radius $r$ touches the line exactly when $$\frac{|Ah + Bk + C|}{\sqrt{A^2 + B^2}} = r,$$ one equation that replaces solving a quadratic for a double root. With coordinates for a triangle, it also gives each altitude as the distance from a vertex to the line through the other two. In three dimensions the same formula with one more term gives the distance from a point to a plane.

## On contests
Seven problems here, six of them AIME, none by it alone: it is the step inside a [[coordinate-bash|coordinate bash]] that handles a circle tangent to a line, often next to [[tangent-facts|tangent-length facts]], and its three-dimensional form measures heights in solids.
`,

"circle-equation": String.raw`
## Why it works
A circle is the set of points at a fixed distance from a center, and the distance formula turns that sentence into an equation.

A point $(x, y)$ is at distance $r$ from $(h, k)$ exactly when $\sqrt{(x - h)^2 + (y - k)^2} = r$. Both sides are nonnegative, so squaring loses nothing and gives the standard form.

Expanding gives $x^2 + y^2 - 2hx - 2ky + (h^2 + k^2 - r^2) = 0$, the general form with $D = -2h$, $E = -2k$ and $F = h^2 + k^2 - r^2$. Going backwards, completing the square gives $$\left(x + \tfrac D2\right)^2 + \left(y + \tfrac E2\right)^2 = \frac{D^2 + E^2}{4} - F,$$ a circle only when the right side is positive; zero gives a single point, and a negative value gives no points at all.

## How to use it
Complete the square to read off the center and radius, as in the example.

To find the circle through three points, substitute them into the general form. The unknowns $D$, $E$ and $F$ appear linearly, so this is a linear system, which is the reason to prefer the general form here.

To intersect a circle with a line, substitute the line into the circle and solve the quadratic; whether they meet, and tangency in particular, is decided by its discriminant, as on [[tangency-condition|the tangency card]].

## On contests
Three problems here, all AIME, none solved by it alone. The usual moves are to write two circle equations and subtract them, to complete the square to find two circles' centers before a [[tangent-circles|tangency]] argument, or to recognize circles hidden in a condition on complex numbers. Subtracting two circles' equations cancels the squares and leaves the [[radical-axis|radical axis]], the line through their intersection points, which turns a common-chord question into arithmetic.`,

"british-flag-theorem": String.raw`## Why it works
Set up coordinates with the rectangle's sides on the axes: each squared distance expands into sums of squared coordinate differences, and both pairings select the same four terms. No planarity even required — it survives in 3D.

## How to use it
Any point + rectangle with three of the four corner-distances known → fourth distance immediately. Also usable in reverse as a rectangle detector, and in problems that only implicitly contain the rectangle (complete one from a right angle).

## On contests
An AMC favorite exactly because the naive approach (coordinates, four unknowns) is slow and the theorem is one line. Distances 3, 4, 5 to consecutive corners → $\sqrt{9 + 25 - 16} = 3\sqrt{2}$; recognize the pattern instantly.`,

"rotation-90": String.raw`
## Why it works
A rotation preserves sums and multiples, so it is decided by what it does to the two unit steps $(1, 0)$ and $(0, 1)$.

Turning $(1, 0)$ by $\theta$ lands on $(\cos\theta, \sin\theta)$, by the definition of cosine and sine on the unit circle. The step $(0, 1)$ is $(1, 0)$ already turned by $90^\circ$, so turning it by $\theta$ more lands at angle $90^\circ + \theta$, the point $(-\sin\theta, \cos\theta)$.

A point $(x, y)$ is $x$ steps of the first kind plus $y$ of the second, and rotating the picture rotates each step, so $$(x, y) \mapsto x(\cos\theta, \sin\theta) + y(-\sin\theta, \cos\theta) = (x\cos\theta - y\sin\theta,\; x\sin\theta + y\cos\theta).$$

{{figure:basis}}

At $\theta = 90^\circ$, $\cos\theta = 0$ and $\sin\theta = 1$, so $(x, y)$ goes to $(-y, x)$: the coordinates swap and the new first one changes sign. A clockwise quarter turn gives $(y, -x)$.

## How to use it
To rotate about a point $C$ other than the origin, work relative to $C$. Turning $A = (3, 4)$ a quarter turn counterclockwise about $C = (1, 1)$: relative to $C$ the point is $(2, 3)$, which turns into $(-3, 2)$, and adding $C$ back gives $A' = (-2, 3)$.

{{figure:about-a-point}}

Squares are the main application. If $PQ$ is one side, turn the vector from $P$ to $Q$ a quarter turn and add it to both $P$ and $Q$ to get the other two vertices; turning it the other way gives the square on the other side. In [[complex-basics|complex numbers]] the same computation is $z \mapsto c + e^{i\theta}(z - c)$, often the least error-prone form for angles other than $90^\circ$.

## On contests
Seven problems here, five of them AIME, none by it alone; two do the rotation in [[complex-basics|complex numbers]] instead, and one finds the [[rotation-center|center of a rotation]] from a point and its image. The usual setting is a square or an equilateral triangle placed in coordinates, where one side and a rotation give every other vertex.
`,

"eulers-polyhedron-formula": String.raw`## Why it works
Flatten the polyhedron into a planar graph (remove one face, stretch); then induct: each added edge either creates a face or connects a new vertex, preserving $V - E + F$. The sphere's Euler characteristic 2 is what's really being computed.

## How to use it
Combine with incidence counting: if every face has $\ge 3$ edges then $2E \ge 3F$; if every vertex has degree $\ge 3$ then $2E \ge 3V$. These with $V - E + F = 2$ generate all the classic bounds ($E \le 3V - 6$, existence of a small-degree vertex, only five Platonic solids).

## On contests
AMC/AIME polyhedron problems ("faces are pentagons and hexagons, each vertex meets 3 faces...") are systems of equations: face-edge and vertex-edge double counts + Euler. Set up the three equations mechanically and solve.`,

"prism-pyramid-volumes": String.raw`
## Why it works
A prism is a stack of identical slices, and a pyramid is a stack of slices that shrink toward the apex, which is where the one-third comes from.

Slice a prism parallel to its base. Every slice is a copy of the base with area $B$, so a stack of $n$ slices of thickness $\frac hn$ has volume $$n \cdot B \cdot \frac hn = Bh.$$ Sliding the slices sideways changes nothing, which is [[cavalieris-principle|Cavalieri's principle]]: a slanted prism has the same volume as a straight one.

For a pyramid, the slice at height $z$ above the base is a copy of the base scaled by $\frac{h - z}{h}$, so its area is $$B\left(\frac{h - z}{h}\right)^2,$$ and these shrinking slices add up to $\frac13Bh$.

The third can be seen without calculus: a cube of side $s$ splits into three congruent square pyramids, each with one face of the cube as its base and the same far corner as its apex, and each has base $s^2$, height $s$ and volume $\frac{s^3}{3} = \frac13Bh$.

{{figure:cube}}

By Cavalieri, any pyramid with the same base area and height has the same volume, whatever the shape of its base.

## How to use it
The height is always the perpendicular distance from the apex, or the top face, to the plane of the base, and an oblique solid has the same volume as a right one, by Cavalieri again. For a tetrahedron any face can serve as the base, so computing the volume with one base and equating it with another gives heights that are hard to reach directly, such as the distance from a vertex to a slanted face.

## On contests
13 of the 14 problems tagged here are AIME, and only 1 needs nothing else: the volume is usually the frame, with [[pythagorean-theorem|the Pythagorean theorem]] (3 problems) supplying a height or an edge. The "swap the base" trick is the standard AIME move: compute a volume with an easy base, then read it again with a different base to extract an inaccessible height, such as the distance from a point to a plane.
`,

"sphere-formulas": String.raw`## Why it works
Archimedes: the sphere sits inside its circumscribing cylinder with exactly $\frac{2}{3}$ of its volume and matching lateral surface area (equal-height slices of sphere and cylinder-minus-cone have equal areas). Or: $V$ integrates cross-sectional disks; $SA$ is the derivative of $V$ with respect to $r$.

## How to use it
Spherical caps and zones occasionally matter: cap volume $\frac{\pi h^2(3r - h)}{3}$, cap/zone lateral area $2\pi r h$ (only the height matters — a striking fact). Derive from the full formulas when needed.

## On contests
Spheres inscribed in / circumscribed about solids: the whole game is finding the right [[cross-section-method|cross-section]], reducing 3D to a 2D incircle/circumcircle picture. Ratio problems (sphere in cylinder in cube...) reward remembering Archimedes' $\frac{2}{3}$.`,

"cone-formulas": String.raw`
## Why it works
The height, the base radius and the slant height form a right triangle through the tip of the cone, so $\ell^2 = r^2 + h^2$.

{{figure:slant}}

For the area, cut the lateral surface along a slant line and flatten it. Every point of the base's edge is $\ell$ from the tip, so the surface flattens into a sector of a circle of radius $\ell$, and its arc is the base's circumference, $2\pi r$. A sector's area is half its arc times its radius, $\frac12 \cdot 2\pi r \cdot \ell = \pi r\ell$.

Adding the base, $\pi r^2$, gives the total surface area. The volume is the pyramid rule, a third of the base area times the height, $\frac13\pi r^2h$.

## How to use it
The unrolled sector is the problem half the time. Its angle is $$\frac{2\pi r}{\ell} \text{ radians},$$ the fraction $\frac r\ell$ of a full turn. For a cone with radius $6$ and height $8$, $\ell = 10$, so the sector is $\frac{6}{10}$ of a circle of radius $10$, and the lateral area is $60\pi$ of that circle's $100\pi$.

A shortest path on the cone's surface becomes a straight segment in the unrolled sector, which is how the ant-walks-around-a-cone problems are done; see [[surface-shortest-path|shortest paths on surfaces]]. And a sector rolled into a cone keeps its radius as the slant height and its arc as the base's circumference, which fixes $r$ and then $h$.

## On contests
Six problems here, five of them AIME, none by it alone; two pair it with [[similar-figures-ratios|similar triangles]], since a plane parallel to the base cuts off a smaller cone similar to the whole. The classic setups are an ant walking around a cone, a cone rolled from a sector, and a cone rolling on a table, where the slant height is the radius of the circle its base traces.
`,

"frustum-volume": String.raw`## Why it works
A frustum is a big pyramid minus a similar small one; with similarity ratio $k$, subtract $\frac{1}{3}(h_{\text{big}} B_1 - h_{\text{small}} B_2)$ and eliminate the phantom heights using $k = \sqrt{B_2/B_1}$. The $\sqrt{B_1 B_2}$ term is the geometric-mean cross-section.

## How to use it
Often it's cleaner to restore the apex: extend the frustum to the full cone/pyramid, work with the two similar solids ($k$ and $k^3$ scaling), and subtract. Use the closed formula when the two base areas are the given data.

## On contests
Truncated-solid problems on AMC/AIME nearly always reward apex restoration — heights scale like linear dimensions, volumes like cubes, and the frustum is a difference of the two.`,

"distance-3d": String.raw`## Why it works
Take the axis-aligned box whose opposite corners are the two points. Its base diagonal is $\sqrt{(\Delta x)^2 + (\Delta y)^2}$ by the [[pythagorean-theorem|Pythagorean theorem]], and the remaining rise $\Delta z$ is perpendicular to the whole base plane, so a second right triangle closes on it. Perpendicular contributions add in squares, one axis at a time, which is why the pattern keeps going into any number of dimensions.

## How to use it
Coordinatize first and the formula does the rest, which is the usual reason [[solid-tactics|the 3D playbook]] opens by choosing axes. When the two points are opposite corners of a box you are computing [[space-diagonal|its space diagonal]], the special case where the coordinate differences are the edge lengths themselves. Reading $d$ as a constant instead gives the sphere, so a tangency or an equidistance condition becomes one equation rather than a picture.

## On contests
The most common use is a sphere condition in disguise: a point at a fixed distance from a center, or two centers whose separation is compared against $r_1 + r_2$. The corollary worth remembering is that the farthest two points on two spheres lie on the line through the centers, at $d + r_1 + r_2$, and the nearest at $d - r_1 - r_2$; both follow because any other pair detours off that line.`,

"space-diagonal": String.raw`
## Why it works
The space diagonal is the hypotenuse of a right triangle whose legs are a diagonal of the base and a vertical edge.

The base diagonal has length $\sqrt{\ell^2 + w^2}$ by the [[pythagorean-theorem|Pythagorean theorem]], as in the figure at the top. The vertical edge is perpendicular to the whole base, so it is perpendicular to that diagonal too, and a second application gives $$d^2 = \left(\ell^2 + w^2\right) + h^2.$$

The same step works in any number of perpendicular directions: squared lengths add. That is why the distance between two points in space is $\sqrt{\Delta x^2 + \Delta y^2 + \Delta z^2}$.

## How to use it
Most contest problems give the box indirectly, through the sum of its edges and its surface area, and never the edges themselves. Then the [[square-of-sum|square of a sum]] gives the diagonal at once: $$d^2 = \ell^2 + w^2 + h^2 = (\ell + w + h)^2 - 2(\ell w + wh + h\ell).$$ The total edge length is $4(\ell + w + h)$ and the surface area is $2(\ell w + wh + h\ell)$, so there is no need to find $\ell$, $w$ or $h$.

Face diagonals work the same way. Each is the hypotenuse over two of the edges, so adding the three squares counts every edge twice: $$p^2 + q^2 + r^2 = 2(\ell^2 + w^2 + h^2) = 2d^2.$$

## On contests
Three problems here, one each from the AMC 10, AMC 12 and AIME, none solved by it alone, and all three use the square-of-a-sum identity above. Typical versions give the total edge length and the surface area and ask for the diagonal; a harder one asks for the smallest sphere containing a box, whose diameter is the space diagonal, and optimizes it with [[vietas-general|Vieta's formulas]].`,

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
Sliced-cube-corner problems on AMC/AIME. Companion facts for the same solid: volume $\frac{abc}{6}$, and $\frac{1}{h^2} = \frac{1}{a^2} + \frac{1}{b^2} + \frac{1}{c^2}$ for the [[altitude-hypotenuse|altitude to the hypotenuse]] face — the 3D analogue of the right-triangle altitude relation.`,

"regular-tetrahedron": String.raw`## Why it works
The apex projects onto the base's centroid; the height computation is one Pythagorean step using the centroid-to-vertex distance $\frac{s\sqrt{3}}{3}$. Volume follows from $\frac{1}{3}Bh$. The octahedron = two square pyramids, or equivalently a tetrahedron of edge $2s$ minus four corner tetrahedra of edge $s$ — whence the exact 4:1 volume ratio.

## How to use it
Embed in a cube when possible: alternating vertices of a cube of edge $e$ form a regular tetrahedron of edge $e\sqrt2$ with volume $\frac{e^3}{3}$ — most regular-tetrahedron facts drop out of this picture (e.g. the $\arccos\frac{1}{3}$ dihedral angle, circumradius $\frac{s\sqrt6}{4}$). Its dual is the [[regular-octahedron|regular octahedron]], so the two share edge-angle data and swap face and vertex counts.

## On contests
AMC/AIME regular-tetrahedron and octahedron problems are cube-embedding exercises in disguise. Also: regular octahedron = dual of the cube (face centers), which handles midpoint/center configurations.`,

"equilateral-triangle-facts": String.raw`
## Why it works
Everything comes from cutting the triangle in half along an altitude, which gives a [[special-right-triangles|30-60-90 triangle]].

By symmetry, the altitude from one vertex meets the opposite side at its midpoint, so it splits the triangle into two right triangles with hypotenuse $s$ and short leg $\frac s2$. The altitude is the long leg, $\frac s2 \cdot \sqrt3 = \frac{s\sqrt3}{2}$, and the area is half the base times the height, $$\frac12 \cdot s \cdot \frac{s\sqrt3}{2} = \frac{s^2\sqrt3}{4}.$$

Also by symmetry, every altitude is at the same time a median, an angle bisector and a perpendicular bisector, so every center lies on all three altitudes and they all coincide at one point. That point is the centroid, which [[centroid-division|divides each median in the ratio 2 : 1]] from the vertex.

So its distance to a vertex, the circumradius, and its distance to a side, the inradius, are $$R = \tfrac23 h = \frac{s\sqrt3}{3}, \qquad r = \tfrac13 h = \frac{s\sqrt3}{6}.$$ The figure at the top shows the two radii along one altitude, adding up to $h$.

## How to use it
Every equilateral configuration reduces to these four numbers, so know them without deriving them. It helps to remember them as parts of the height, $R = \frac23h$ and $r = \frac13h$, so a problem that gives any one of $s$, $h$, $R$, $r$ or the area gives all of them. When an equilateral triangle sits inside a larger figure, its $60^\circ$ angles are the other thing to use: they make [[law-of-cosines|the law of cosines]] collapse to $c^2 = a^2 + b^2 - ab$.

## On contests
None of the 19 problems tagged here is about an equilateral triangle alone; it is almost always the shape that makes another tool easy, [[law-of-cosines|the law of cosines]] with its $60^\circ$ angle (4 problems), [[special-right-triangles|30-60-90 triangles]] (4), or a circle around or inside it (3). The coincidence of all four centers means symmetric arguments, such as [[rotation-trick|rotating]] by $60^\circ$ about a vertex or by $120^\circ$ about the center, are always available.
`,

"hexagon-diagonals": String.raw`## Why it works
Six equilateral triangles of side $s$ meet at the center, so the distance from the center to every vertex is $s$. Opposite vertices are therefore $s + s = 2s$ apart, and that segment passes through the center, which is what makes the long diagonal a diameter of the circumcircle.

For the short diagonal take $A$, $B$, $C$ consecutive. The interior angle of a regular hexagon is $120^\circ$, so triangle $ABC$ is isosceles with legs $AB = BC = s$ and apex $120^\circ$. Dropping the perpendicular from $B$ splits it into two [[special-right-triangles|half-equilateral]] triangles with hypotenuse $s$, each contributing $\frac{s\sqrt3}{2}$, so $AC = s\sqrt3$. The same half-diagonal is the hexagon's apothem, which is why [[regular-hexagon-area|the area]], the apothem and the short diagonal are all the same computation.

Both lengths are the $n = 6$ cases of the general chord $d_k = 2R\sin\frac{k\pi}{n}$ with $R = s$: $k = 2$ gives $2s\sin 60^\circ = s\sqrt3$ and $k = 3$ gives $2s\sin 90^\circ = 2s$.

## How to use it
Read the ratio off rather than re-deriving it: side, short diagonal and long diagonal stand in the ratio $1 : \sqrt3 : 2$, the same triple as a $30$-$60$-$90$ triangle. That makes a hexagon problem a scaling exercise, and it is why hexagons pair so often with equilateral triangles and with $\sqrt3$ answers. Two facts fall out immediately: the three long diagonals concur at the center and cut the hexagon into six equilateral triangles, while the six short diagonals outline a smaller regular hexagon whose side is $\frac{s\sqrt3}{3}$, so its area is one third of the original.

## On contests
A staple of MATHCOUNTS and early AMC geometry, usually as "the distance between two vertices" where the only question is which diagonal is meant. It also supplies the lengths in hexagonal-lattice and tiling problems, where the short diagonal is the spacing between next-nearest centers. When a problem gives a hexagon and a length, decide first whether that length is a side, a short diagonal or a long one, since the three differ only by the factor $\sqrt3$ or $2$.`,

"regular-hexagon-area": String.raw`
## Why it works
Each center-to-vertex segment has length $s$, and each of the six angles at the center is $60^\circ$, so each triangle around the center is isosceles with a $60^\circ$ apex angle, which makes it equilateral. Six [[equilateral-triangle-facts|equilateral triangles]] of side $s$ give $$A = 6 \cdot \frac{\sqrt3}{4}s^2 = \frac{3\sqrt3}{2}s^2.$$

The same triangles give the lengths. The long diagonal crosses two of them, so it is $2s$, and the apothem is the height of one, $\frac{s\sqrt3}{2}$; the short diagonal, $s\sqrt3$, is on [[hexagon-diagonals|hexagon diagonals]].

## How to use it
Measure regions in units of the small equilateral triangle, cutting further into halves or into smaller equilateral triangles when a region needs it. Neighbouring triangles pair into rhombi, and a diagonal of a rhombus cuts it in half, which settles most shaded regions.

{{figure:alternate}}

So the triangle $ACE$ on alternate vertices is half the hexagon, and each corner triangle it cuts off is a sixth. Midpoint hexagons and other inscribed figures work the same way once the small triangles are drawn in.

An equiangular hexagon with unequal sides is a large equilateral triangle with three equilateral corners cut off; extending three alternate sides until they meet shows it.

## On contests
Two problems here, one AIME and one AMC 10, one solved by it alone. The AMC version finds an area inside a hexagon by counting small triangles, and the AIME version counts the small equilateral triangles cut out by lines in three directions. Shaded regions, hexagonal tilings and equiangular hexagons with given sides are the usual shapes.
`,

"15-75-90-triangle": String.raw`## Why it works
From $\sin 15^\circ = \frac{\sqrt6 - \sqrt2}{4}$ and $\cos 15^\circ = \frac{\sqrt6 + \sqrt2}{4}$ (angle subtraction $45^\circ - 30^\circ$), scale the hypotenuse to 4.

## How to use it
Also worth caching: $\tan 15^\circ = 2 - \sqrt3$, $\tan 75^\circ = 2 + \sqrt3$, and the altitude-to-hypotenuse of the 15-75-90 right triangle equals one quarter of the hypotenuse (a lovely fact: $\sin 15^\circ \cos 15^\circ = \frac{1}{4}$).

## On contests
$15^\circ$ and $75^\circ$ appear in AMC 12/AIME problems built on square-plus-equilateral-triangle configurations (which naturally create $15^\circ$ angles). The quarter-hypotenuse altitude fact alone has decided problems.`,

"golden-ratio-pentagon": String.raw`
## Why it works
Two diagonals and a side of a regular pentagon form a $36$-$72$-$72$ triangle, and that triangle contains a smaller copy of itself, which forces the ratio.

Each interior angle of a regular pentagon is $108^\circ$, and the two diagonals from one vertex cut it into three $36^\circ$ angles. So two diagonals $d$ and the side $s$ between their far ends form an isosceles triangle with apex angle $36^\circ$ and base angles $72^\circ$. Bisecting a base angle cuts off a smaller $36$-$72$-$72$ triangle, and the leftover triangle is isosceles, so the pieces have lengths $s$ and $d - s$.

{{figure:gnomon}}

The similarity gives $\frac ds = \frac{s}{d - s}$. Writing $x = \frac ds$, this is $x = \frac1{x - 1}$, so $x^2 = x + 1$, whose positive root is $\varphi$.

## How to use it
Reduce powers with $\varphi^2 = \varphi + 1$: $$\varphi^3 = \varphi^2 + \varphi = 2\varphi + 1, \qquad \varphi^n = F_n\varphi + F_{n-1}.$$ The other root, $\psi = \frac{1 - \sqrt5}{2} = -\frac1\varphi$, satisfies the same equation, which is why the two together give [[binets-formula|Binet's formula]] for the Fibonacci numbers.

In a regular pentagon of side $s$ every diagonal is $\varphi s$, so a pentagon of side $2$ has diagonals $1 + \sqrt5$. The diagonals cut each other in the golden ratio, and the small pentagon they enclose has side $\frac{s}{\varphi^2}$. [[ptolemys-theorem|Ptolemy's theorem]] on four of the vertices gives the same equation, $d^2 = s^2 + sd$.

## On contests
Four problems here, mostly AMC, none by it alone; three reach it through [[similar-figures-ratios|similar triangles]] in a pentagon or pentagram. Exact values of $\cos 36^\circ$ and $\cos 72^\circ$, pentagram lengths, and dissections of golden triangles are the usual settings.
`,

"inscribed-square": String.raw`## Why it works
The triangle above the square is similar to the original (parallel base), with height $h - x$ and base scaled by the same factor: $\frac{x}{a} = \frac{h - x}{h}$. Solve for $x$.

## How to use it
Works for any triangle with the square's base on any side — use that side's length and its altitude. For a right triangle with the square in the right angle (two sides on the legs $a, b$): $x = \frac{ab}{a+b}$ by the same similarity idea. The side follows from [[similar-figures-ratios|similar figure ratios]]: the cut-off top triangle is similar to the whole.

## On contests
MATHCOUNTS/AMC 10 standard. The two right-triangle variants (square on hypotenuse vs. square in the corner) are deliberately paired in problems — keep the two formulas distinct.`,

"mass-points": String.raw`
## Key forms
- $m_B \cdot BD = m_C \cdot DC$ — the masses at $B$ and $C$ balance at $D$, so they are inversely proportional to the pieces of $BC$
- $m_D = m_B + m_C$ — the balance point carries the total mass
- $\frac{AP}{PD} = \frac{m_D}{m_A}$ — along a cevian the ratio is the masses inverted, the step most often written backwards
- scale one branch — when two cevians give a vertex different masses, multiply one assignment through until they agree

## Why it works
It is the law of the lever: masses $m_B$ at $B$ and $m_C$ at $C$ balance at the point $D$ with $m_B \cdot BD = m_C \cdot DC$, so the heavier mass sits nearer the balance point.

{{figure:lever}}

Once each vertex has a mass, the whole system has one center of mass. Grouping $B$ and $C$ first, their combined mass $m_B + m_C$ sits at $D$, so the center of mass lies on $AD$ where $m_A \cdot AP = m_D \cdot PD$. Grouping differently puts it on the other cevians too, so it is their crossing point $P$, and the ratios along each cevian follow. The masses are the [[barycentric-coordinates|barycentric coordinates]] of $P$ in disguise.

## How to use it
Assign masses from the given side ratios, scaling until each vertex has one value. For $BD : DC = 1 : 2$ and $AE : EC = 2 : 3$, the first gives $m_B : m_C = 2 : 1$ and the second $m_A : m_C = 3 : 2$, so take $$m_A = 3, \qquad m_B = 4, \qquad m_C = 2.$$ Then $m_D = 6$, and $AP : PD = m_D : m_A = 2 : 1$.

Two cevians always meet, and the masses give the ratios in which they cut each other. A third cevian passes through the same point only if it divides its side in the ratio the masses dictate, which is exactly [[cevas-theorem|Ceva's condition]].

For a transversal that is not a cevian, split a vertex's mass into parts, one for each side it lies on. The method fails for a point outside the triangle and for parallel lines with nothing to balance about; the [[area-method|area method]] handles those without special cases.

## On contests
Five problems here, all AIME, one solved by it alone; two start from an [[angle-bisector-theorem|angle bisector]], whose side ratio supplies the masses. It turns "cevians divide the sides in given ratios, find a ratio" problems into thirty seconds of arithmetic instead of five minutes of coordinates.
`,

"reflection-shortest-path": String.raw`## Key forms
- $\min_{P\in\ell}(AP+PB)=A'B$, where $A'$ is the reflection of $A$ across $\ell$ — reflecting preserves distances from points of $\ell$, so the bent path becomes a straight one and the optimum sits where $A'B$ crosses the line
- the equal-angle bounce law is a consequence, not a separate fact — the straight segment $A'B$ makes equal angles with $\ell$ on both sides
- for two lines, reflect $A$ over the first and $B$ over the second and join them; on a surface, unfold rather than reflect, which is the same idea one dimension up — unfolding is the surface analogue, and mixing the two up is the usual error in box problems

## Why it works
Reflecting $A$ across the line $\ell$ preserves distances from points of $\ell$: $AP = A'P$ for $P \in \ell$. So minimizing $AP + PB$ is minimizing $A'P + PB$, whose minimum is the straight segment $A'B$ — achieved where that segment crosses $\ell$ (and the equal-angle "bounce" law falls out for free).

## How to use it
One line: reflect one endpoint. Two lines (bounce off both): reflect twice — $A$ over the first, $B$ over the second, connect. Box/billiard surfaces: unfold the room repeatedly; straight lines in the unfolded picture are bouncing paths in the original. On solids (ant on a box/cone), unroll the surface flat and connect with a segment.

## On contests
Everywhere from MATHCOUNTS ("shortest path touching a wall") to AIME (light bouncing in mirrored corridors, minimal perimeter inscribed triangles — the [[orthic-triangle|orthic triangle]] emerges from double reflection). If a path must touch a line, reflect before doing anything else.`,

"rotation-trick": String.raw`## Key forms
- rotate the whole figure by the polygon's angle about one vertex — $60^\circ$ for an equilateral triangle, $90^\circ$ for a square — so that one vertex lands on another and the interior point $P$ moves to $P'$
- the rotation fixes $BP=BP'$ and makes $\angle PBP'$ the rotation angle, so $\triangle PBP'$ is equilateral (giving $PP'=PB$) or isosceles right (giving $PP'=PB\sqrt2$) — the rotation angle decides which special triangle appears, so pick the vertex whose angle you can use
- $P'$ inherits one of the original distances, so the three given lengths now sit in a single triangle — finish with the law of cosines, remembering to add back the rotation angle when recovering an angle of the original figure

## Why it works
Rotating about a vertex by the polygon's angle ($60^\circ$ for equilateral, $90^\circ$ for square) maps one adjacent vertex onto another, carrying $P$ to $P'$ with $BP = BP'$ and $\angle PBP'$ equal to the rotation angle. That makes $\triangle PBP'$ equilateral (or isosceles right), so $PP'$ is computable — and $P'$ inherits one of the original distances, assembling a triangle with all three given lengths.

## How to use it
Given $PA, PB, PC$ to the vertices of an equilateral triangle: rotate $60^\circ$ about $B$; the new triangle has sides $PA, PC$, and $PB$ (via the equilateral $PP'B$), and its angles reveal the configuration's angles (add back $60^\circ$). For squares rotate $90^\circ$ ($PP' = PB\sqrt2$). Compute areas/sides with the law of cosines afterwards.

## On contests
The intended solution whenever AMC/AIME gives three distances from a point to an equilateral triangle's or square's vertices ($3,4,5$ inside equilateral and $1,2,3$ inside a square are the celebrity cases). Recognize → rotate → law of cosines: three steps.`,

"spiral-similarity": String.raw`## Key forms
- a spiral similarity is a rotation and a dilation about the same center, $z\mapsto a+ke^{i\theta}(z-a)$ — any two non-parallel segments admit exactly one such map taking one to the other
- its center is the second intersection of circles $(PAC)$ and $(PBD)$, where $P=AB\cap CD$ — equal rotation angles create equal inscribed angles at that point, which is what puts it on both circles
- the center taking $AB\to CD$ also takes $AC\to BD$ — the spiral-similarity swap, and the reason one configuration answers two different-looking questions

## Why it works
Composing a rotation and a dilation about the same center is the general direct similarity of the plane; any two non-parallel segments $AB, CD$ admit exactly one such map sending one to the other. Its center is found by circle intersections because equal rotation angles create equal inscribed angles over the intersection point.

## How to use it
Practical triggers: (1) two similar triangles sharing a vertex angle at some point $X$ ($\triangle XAB \sim \triangle XCD$) — that $X$ is a spiral center, and you get ratio + angle equations for free; (2) complex-number problems: the map is $z \mapsto a + ke^{i\theta}(z - a)$, and matching two point-pairs solves for center and ratio linearly. The center of the spiral sending $AB \to CD$ also sends $AC \to BD$ (the "spiral sim swap") — a surprisingly powerful symmetry.

## On contests
Hard AIME/olympiad circle problems ("two circles meet at $X, Y$; lines through them...") are frequently spiral similarity around one intersection point. In coordinates/complex form it is also just a fast computational device for rotating-scaling configurations.`

});

// Entries added from the 2023-2025 AMC/AIME sweep.
Object.assign(window.MATH_DETAILS, {

"ellipse-tangent-line": String.raw`## Why it works
Fix the two foci. The set of points with $PF_1 + PF_2 = k$ is an ellipse, and as $k$ grows those ellipses nest outward, so they are the level curves of the focal sum. Take a line $\ell$ missing both foci and grow $k$ from zero: the first ellipse that reaches $\ell$ meets it at exactly one point, because two intersection points would mean a smaller $k$ already crossed. Touching at one point is tangency, and that point carries the smallest achievable sum. The reflection proof gives the same answer: $PF_1 + PF_2 = PF_1' + PF_2$ where $F_1'$ is the reflection of $F_1$ over $\ell$, and a broken path beats a straight one nowhere, so the minimum is where segment $F_1'F_2$ crosses $\ell$.

## How to use it
Read it in whichever direction the problem needs. Given a line and two points on the same side, the minimizing point is the tangency point of the ellipse through it, which is [[reflection-shortest-path|the reflection construction]]. Given that an ellipse is tangent to a line, you immediately know the tangency point minimizes the focal sum, and that the tangent makes equal angles with the two focal radii, which is the optical property of the ellipse. The $x$-axis case is the common dressing: an ellipse tangent to the $x$-axis has its tangency point directly below the crossing of $F_1'F_2$, and its minor semi-axis is pinned by that tangency.

## On contests
Shows up as an optimisation wearing a conic costume, and as the reason a tangency condition pins an otherwise underdetermined ellipse on AIME coordinate problems. If a configuration fixes two points and asks to minimize a sum of distances to a line, the ellipse picture and the reflection trick are the same move, so reach for whichever is quicker to draw.`,

"conic-sections": String.raw`
## Why it works
The angle of the cutting plane decides the curve. A plane tilted less steeply than the cone's side meets one half of the cone in a closed curve, an ellipse. A plane parallel to a side never meets that side, so the curve runs off to infinity, a parabola. A steeper plane cuts both halves of the cone, giving the two branches of a hyperbola.

{{figure:slices}}

The focal definitions come from the Dandelin spheres, the spheres inscribed in the cone and tangent to the cutting plane. Each touches the plane at a focus and the cone along a circle. From a point on the curve, the distance to a focus equals the distance along the cone to that sphere's circle, because both are tangent lengths from the same point to the same sphere.

For an ellipse, the two such distances add up to the length of cone between the two circles, which is the same for every point: that is the constant sum.

{{figure:dandelin}}

## How to use it
Let the problem's wording pick the curve. A constant sum of distances is [[ellipse-properties|an ellipse]], a constant difference is [[hyperbola-properties|a hyperbola]], and a distance matched against a line is [[parabola-focus-directrix|a parabola]]. A single ratio, the [[eccentricity|eccentricity]], covers all three, and when a curve arrives as an unlabeled second-degree equation, [[conic-classification|the discriminant]] names it without rearranging.

Keep the two $c$ relations straight by remembering which length is largest: $a$ on an ellipse and $c$ on a hyperbola, so $$\text{ellipse: } c^2 = a^2 - b^2, \qquad \text{hyperbola: } c^2 = a^2 + b^2.$$ For $\frac{x^2}{25} + \frac{y^2}{9} = 1$, $c = 4$, the foci are $(\pm4, 0)$, and every point's distances to them add to $2a = 10$.

## On contests
Six problems here, five of them AIME, none by it alone. AMC 12 tests the standard forms and focal definitions directly; on AIME a conic appears as the constraint curve of an optimization or a count, usually handed on to the [[ellipse-properties|ellipse card]]. The difficulty sits in the recognition step, noticing that some quantity the problem built is a constant sum or difference of distances.
`,

"insphere-radius": String.raw`
## Why it works
Join the center of the insphere to every face, and the polyhedron splits into pyramids of the same height $r$.

Each pyramid has one face of the polyhedron as its base and the center as its apex, and its height is $r$, because the sphere touches the face at the foot of the perpendicular from the center. Adding the pyramids' volumes, $$V = \sum \tfrac13 \cdot (\text{face area}) \cdot r = \tfrac13 rS.$$ The figure at the top shows the dissection. Cutting a triangle into three triangles from its incenter is the same argument one dimension down, and gives $A = rs$.

## How to use it
Compute the volume and the total surface area separately, then divide: $r = \frac{3V}{S}$. For a polyhedron with volume $54$ and surface area $54$, $$r = \frac{3 \cdot 54}{54} = 3.$$

When the faces are congruent, as in an [[isosceles-tetrahedron|isosceles tetrahedron]], $S$ is four times one face, found with [[herons-formula|Heron's formula]]. When coordinates are easier, the center is the point at equal [[point-plane-distance|distance from every face]], found one plane at a time.

## On contests
Three problems here, all AIME, none solved by it alone. The archetype is a point equidistant from the faces of an [[isosceles-tetrahedron|isosceles tetrahedron]], where the box gives $V$ and Heron's formula gives $S$; others locate the center with coordinates and point-to-plane distances instead.`,

"tangency-condition": String.raw`
## Key forms
- distance from the center to the line $= r$ — the fastest form for a line and a circle
- $\Delta = 0$ after substituting the line into the curve — the form for parabolas and other curves without a center
- two parameter values, one for each side — read the problem to see whether both count

## Why it works
A line meets a circle in $0$, $1$ or $2$ points according to whether the distance from the center to the line is greater than, equal to or less than the radius, and "exactly one" is the boundary case.

{{figure:trichotomy}}

Substituting the line into the circle's equation gives a quadratic in one variable whose roots are the meeting points, so the same trichotomy shows up as the sign of its discriminant. For a curve with no center, such as a parabola, the discriminant is the only route: a line touches the parabola exactly when the substituted quadratic has a double root.

## How to use it
Translate "unique solution", "just touches" or "exactly one intersection" into an equation in the parameter: the distance from the center to the line equals $r$ for a circle, and $\Delta = 0$ for a substituted quadratic. The [[point-line-distance|point-to-line distance]] formula does the work in the first case, as in the example; for two circles the condition is a center distance, as on [[tangent-circles|tangent circles]].

Expect two parameter values, one for each side the tangent line can touch from, and read the problem to see whether both count. If a problem disguises the curves, in complex numbers or as a locus, name them first: a circle and a perpendicular bisector are still a circle and a line.

## On contests
Three problems here, all AIME, one solved by it alone. The shapes are a circle and a line described in complex numbers with exactly one common point, a family of segments whose envelope a point must touch, and a uniquely bisected chord, where the circle of chord midpoints must touch a line. On the AMC 12 the same reflex handles "the line $y = mx + c$ touches the parabola".
`,

"cross-section-method": String.raw`
## Key forms
- sphere → circle, cylinder → two parallel lines, cone → triangle, torus → two circles — what each solid becomes in the plane through the common axis
- $d = r_1 + r_2$ or $d = |r_1 - r_2|$ — [[tangent-circles|tangent circles]] in the slice, touching externally or internally
- distance from the axis in the slice $=$ radius of the circle in space — how an answer found in the slice is read back

## Why it works
When every solid in a problem is symmetric about the same axis, the whole configuration is a flat picture spun around that axis, so the flat picture already contains everything.

Take the plane through the axis. Each solid meets it in the shape that was spun, $$\text{sphere} \to \text{circle}, \qquad \text{cone} \to \text{triangle}, \qquad \text{torus} \to \text{two circles},$$ the last being the cross-sections of its tube. Two such solids that touch do so along a circle centered on the axis, and that circle crosses the plane in two points, where the corresponding flat shapes touch.

So tangency in space is tangency in the slice, and a distance measured in the slice from the axis is the radius of the circle that point sweeps out.

The shared axis is essential. A sphere whose center is off the axis is not symmetric about it, and the slice through the axis can miss its point of contact; then the right plane is the one through the centers involved.

## How to use it
Draw the axial slice and label what each solid becomes. Then work in the plane: tangent circles have center distance $r_1 + r_2$ externally and $|r_1 - r_2|$ internally, a circle tangent to a line has its center at distance $r$ from it, and the point where two circles touch lies on the line through their centers, so similar triangles from a common center scale distances from the axis.

{{figure:scale}}

Finally translate back. A length measured from the axis in the slice is the radius of a circle in space, and a point of tangency in the slice is one point of a whole circle of tangency.

## On contests
Nine problems here, all AIME, two solved by it alone, and five finish with the [[pythagorean-theorem|Pythagorean theorem]] in the slice. A torus resting inside or outside a sphere is pure cross-section work: the tube's center is $R \mp r$ from the sphere's center, and similar triangles scale the tube's circle to the circle of tangency, as in the example. Sphere-in-cone and stacked-sphere problems use the same slice-first recipe.`

});

Object.assign(window.MATH_DETAILS, {

"trig-ceva": String.raw`## Why it works
Apply the law of sines inside each of the six small triangles a cevian creates at its vertex: each side-ratio in ordinary [[cevas-theorem|Ceva]] converts to a ratio of sines of the vertex angles, and the product telescopes the same way.

## How to use it
Reach for it when the givens are angles ("the cevian makes a 20° angle with the side") rather than segment ratios. Isogonal cevians (reflections over the bisector) swap the sine ratios — which is why trig Ceva proves the [[symmedian-lemoine|symmedians]] and the [[isogonal-conjugate|isogonal conjugate]] exist. Combined with the sine addition formulas it handles most "find the angle" concurrency problems.

## On contests
The standard weapon for AIME/olympiad angle-chase concurrency, and the cleanest proof that altitudes, bisectors, and symmedians concur. [[directed-angles|Directed angles]] matter for obtuse configurations — keep everything inside the triangle when possible.`,

"erdos-mordell": String.raw`## Why it works
The classical proof reflects the distances: $a \cdot PA \ge b \cdot d_c + c \cdot d_b$ for each vertex (a projection inequality), then summing the three cyclic versions and applying AM-GM to the coefficient pairs gives the factor 2. Equality survives only when the triangle is equilateral and $P$ is the center.

## How to use it
An off-the-shelf bound whenever both distance triples (to vertices, to sides) appear. The intermediate inequalities $a \cdot PA \ge b \cdot d_c + c \cdot d_b$ are themselves useful and sharper.

## On contests
Olympiad inequality problems and the occasional AIME-adjacent bound; also a good sanity check for extremal configurations — if a problem's optimum has $P$ at an equilateral center, Erdős–Mordell equality is often the hidden reason.`,

"symmedian-lemoine": String.raw`## Why it works
Reflecting the median over the angle bisector swaps the roles of the two adjacent sides, which turns the median's even split into the $c^2 : b^2$ ratio. Trig [[cevas-theorem|Ceva]] makes this precise: the median's two angles satisfy $\frac{\sin\angle BAM}{\sin\angle MAC} = \frac{c}{b}$ by the [[ratio-lemma|ratio lemma]], and reflecting inverts that quotient, so the symmedian's split carries the square.

The distance form explains the same thing without any trigonometry. Comparing areas, $[ABE] = \frac12 \cdot AB \cdot d(E, AB)$ and $[ACE] = \frac12 \cdot AC \cdot d(E, AC)$, while $\frac{[ABE]}{[ACE]} = \frac{BE}{EC}$ because the two triangles share the apex $A$. Setting those equal to $\frac{c^2}{b^2}$ gives $\frac{d(E,AB)}{d(E,AC)} = \frac{c}{b}$, and since that ratio is the same at every point of the cevian, it characterizes the whole line.

## How to use it
Four equivalent conditions, and recognizing any one gives the others for free:

- a cevian cutting the opposite side as $BE : EC = c^2 : b^2$
- the reflection of the median over the angle bisector from the same vertex
- the locus of points $P$ with $\frac{d(P, AB)}{d(P, AC)} = \frac{AB}{AC} = \frac{c}{b}$
- the cevian through the point where the tangents to the circumcircle at $B$ and $C$ meet

Contrast the locus form with its two neighbors, since the three cevians differ only in that ratio: the bisector is where the distances are equal, the median where they are in ratio $b : c$, and the symmedian where they are in ratio $c : b$. Median and symmedian are reflections of each other, which is what "isogonal" means.

The perpendicular test is the fastest hand check. Drop perpendiculars from $B$ and $C$ onto a cevian from $A$. Onto the median they are equal, because the median passes through the midpoint of $BC$ and the two distances are in ratio $BM : MC = 1 : 1$. Onto the symmedian they are in ratio $c^2 : b^2$, the square of the side ratio, by the same argument applied to $BE : EC$. So an unknown cevian is the median when the two perpendiculars match and the symmedian when their ratio is the squared side ratio.

The ratio $c^2 : b^2$ drops straight into [[stewarts-theorem|Stewart's theorem]] or [[mass-points|mass points]], where you hang mass $b^2$ at $B$ and $c^2$ at $C$. Antiparallels give one more sighting: the $A$-symmedian bisects every segment antiparallel to $BC$, so a cevian through the midpoint of an antiparallel is a symmedian.

## On contests
The ratio itself is the usable half at AIME level, since $BE : EC = c^2 : b^2$ turns a symmedian into an ordinary cevian computation. At olympiad level the locus and antiparallel forms matter more, because they are what let you prove a line is the symmedian rather than assume it.`,

"cyclic-perpendicular-diagonals": String.raw`## Why it works
Two chords crossing inside a circle meet at an angle equal to half the sum of the two arcs they cut off. Demanding a right angle therefore says those two arcs total $180^\circ$. Write the arc under $AB$ as $2\beta$; then the arc under $CD$ is $2(90^\circ - \beta)$, and the [[chord-length|chord length formula]] gives $AB = 2R\sin\beta$ and $CD = 2R\cos\beta$. Squaring and adding, the trigonometry cancels and leaves $AB^2 + CD^2 = 4R^2$. The other pair of arcs also totals $180^\circ$, so $BC^2 + DA^2 = 4R^2$ as well, and the two pairs match.

There is a second, coordinate-free way to see the equality of the pairs. If the diagonals meet at $P$ and cut them into $p, q$ and $u, v$, then perpendicularity makes each side a hypotenuse: $a^2 = p^2 + u^2$, $b^2 = q^2 + u^2$, $c^2 = q^2 + v^2$, $d^2 = p^2 + v^2$. Both $a^2 + c^2$ and $b^2 + d^2$ come to $p^2 + q^2 + u^2 + v^2$. That argument needs no circle, so the equality of opposite pairs holds for any orthodiagonal quadrilateral; only the value $4R^2$ needs cyclicity.

## How to use it
Recognize the configuration from the right angle at the diagonals and reach for the pairing immediately: three of the four sides determine the fourth, and any one of them together with $R$ determines the opposite one. That is usually the whole problem.

The intersection point does double duty. In any cyclic quadrilateral the four maltitudes, each running from a side's midpoint perpendicular to the opposite side, meet at the anticenter; when the diagonals are perpendicular the anticenter is exactly their intersection $P$. Read backwards, that is Brahmagupta's theorem: the perpendicular from $P$ to a side, produced, bisects the opposite side. So a problem that hands you a perpendicular foot on one side is really handing you a midpoint on the other.

For area, perpendicular diagonals make [[quadrilateral-diagonal-area|the diagonal formula]] collapse to $\tfrac12 d_1 d_2$.

## On contests
The tell is a cyclic quadrilateral whose diagonals are stated to be perpendicular, or a figure where two chords visibly cross at a right angle. Once spotted, $a^2 + c^2 = b^2 + d^2 = 4R^2$ usually finishes a length question in one line, and the midpoint consequence handles the configuration questions.`,

"incircle-excircle-homothety": String.raw`## Why it works
The incircle and the $A$-excircle are both tangent to the two lines through $A$, so both are inscribed in the same angle and their centers both lie on the bisector from $A$. A dilation centered at $A$ therefore carries one to the other, and its ratio is the ratio of the radii, $\tfrac{r_a}{r}$. Since $r = \tfrac{\text{Area}}{s}$ and $r_a = \tfrac{\text{Area}}{s-a}$, that ratio is $\tfrac{s}{s-a}$, giving $\tfrac r{r_a} = \tfrac{s-a}s$.

Now ask where the incircle's touch point $D$ on $BC$ goes. A dilation maps a tangent line to a parallel tangent line, and the excircle's tangent parallel to $BC$ is not $BC$ itself but the far one. So $D$ does not map to $E$. What maps to $E$ is the point where the incircle meets the tangent parallel to $BC$ on the far side, which is $D'$, the antipode of $D$. Hence $A$, $D'$ and $E$ are collinear: they are a center of dilation and two corresponding points.

A companion fact worth carrying alongside: $BD = s-b$ while $BE = s-c$, so $D$ and $E$ are reflections of one another in the midpoint of $BC$. That is [[incircle-excircle-touch|the touch-point symmetry]].

## How to use it
Any time a problem draws a line from a vertex to the opposite excircle's touch point, this is the intended path: that line passes through the top of the incircle. Conversely, a line through $A$ and the incircle's far point is headed for $E$. Because $E$ is the Nagel cevian foot, the same picture is the standard way in to [[gergonne-nagel-points|the Nagel point]].

The ratio is the other half of the value. It converts between $r$ and $r_a$ without computing the area, and it is what lets a length along $AE$ be split in the ratio $s-a$ to $s$.

## On contests
Uncommon on AMC and a recurring sight on hard AIME and olympiad geometry, where it usually appears as an unexplained collinearity to be proved, or as the bridge that turns a question about an excircle into one about the incircle. If a configuration has both circles and a cevian to a touch point, try this before coordinates.`,

"arbelos": String.raw`## Why it works
Write $AB = 2a$ and $BC = 2b$, so the outer semicircle has radius $a+b$. The leftover area is $\tfrac\pi2(a+b)^2 - \tfrac\pi2a^2 - \tfrac\pi2b^2$, and expanding the square leaves $\pi ab$.

Now the perpendicular at $B$. Because $AC$ is a diameter, [[thales-theorem|Thales]] makes $\angle ADC$ a right angle, so $BD$ is the altitude to the hypotenuse of a right triangle and [[altitude-hypotenuse|the geometric mean relation]] gives $BD^2 = AB \cdot BC = 4ab$. The circle on $BD$ as diameter therefore has area $\tfrac\pi4 \cdot 4ab = \pi ab$, the same number. The two regions are not congruent, but their areas agree exactly.

Archimedes' twin circles are the striking part. Inscribe a circle in the left lobe, tangent to the perpendicular $BD$, to the outer semicircle and to the semicircle on $AB$; do the same on the right. The two radii both come out to $\tfrac{ab}{a+b}$, even though the lobes are different sizes whenever $a \ne b$.

## How to use it
Recognize the figure from three semicircles on collinear diameters, all on one side. The area identity is what makes the shape worth naming: a region bounded by three arcs is replaced by one circle.

For anything harder, [[inversion-properties|inversion]] is the intended tool. Inverting about $A$ or $C$ carries the two semicircles through the center into a pair of parallel lines, which turns the chain of circles inscribed in the arbelos into a stack of equal circles between two parallels, and Pappus' chain becomes almost trivial.

## On contests
Rare, and essentially absent from AMC and AIME, which is why this is filed as a reference card. It is worth recognizing because a problem that builds three semicircles on a segment is usually quoting this configuration, and the area identity then finishes it immediately.`,

"corner-circle-chain": String.raw`## Why it works
A circle tangent to both sides of an angle is centered on the bisector, since the distance to the two sides has to match. Drop a perpendicular from the center to one side: it has length $r$, the hypotenuse is the distance $d$ from the vertex, and the angle at the vertex is the half-angle $\theta$. So $r = d\sin\theta$, which ties the radius to the position with no freedom left.

Chain two of them. Consecutive circles are externally tangent and both centers are on the bisector, so $d_{k+1} - d_k = r_k + r_{k+1}$. Substituting $d = r/\sin\theta$ turns that into $\frac{r_{k+1} - r_k}{\sin\theta} = r_k + r_{k+1}$, and collecting terms gives $\frac{r_{k+1}}{r_k} = \frac{1+\sin\theta}{1-\sin\theta}$. The ratio is the same at every step, so the radii form a geometric progression and the circles shrink toward the vertex forever without reaching it.

The flat relation is the same idea with a line in place of the second side. Two circles of radii $r_1, r_2$ tangent to each other and to a common line have their tangency points $2\sqrt{r_1r_2}$ apart, which is [[common-tangent-lengths|the common tangent length]]. Fitting a third circle into the gap and applying that twice gives $\frac1{\sqrt{r_3}} = \frac1{\sqrt{r_1}} + \frac1{\sqrt{r_2}}$. It is also what [[descartes-circle-theorem|Descartes' circle theorem]] reduces to when one curvature is set to zero.

## How to use it
When circles are stacked into a corner, do not chase them one at a time: identify the ratio from the angle once, and the whole chain is a geometric sequence, so sums of radii are [[geometric-series|geometric series]] and the $n$-th circle is immediate.

When circles sit in a row on a common line, reach for the reciprocal square-root relation instead. It generalizes: any number of circles inscribed successively in the gaps gives radii whose inverse square roots add.

## On contests
Uncommon at AMC and AIME level, and included for recognition rather than as a working tool. The shape to remember is a figure with several circles tangent to the same two lines, or several circles in a row on a common tangent line. Either one is this card, and either one collapses to a short computation once the right relation is used.`,

"radical-axis": String.raw`
## Why it works
The power of a point is a quadratic expression in its coordinates, and the quadratic parts of any two circles are the same, so setting two powers equal leaves a linear equation.

Write a circle as $x^2 + y^2 + Dx + Ey + F = 0$. The [[power-of-a-point|power]] of a point $(x, y)$ is exactly the left side evaluated there, so subtracting two such equations cancels $x^2 + y^2$ and leaves $$(D_1 - D_2)x + (E_1 - E_2)y + (F_1 - F_2) = 0:$$ the locus of equal power is a line. It is perpendicular to $O_1O_2$ because each power depends only on the distance to its own center, so the locus is symmetric about the line of centers.

For three circles, a point with equal power to circles $1$ and $2$, and to circles $2$ and $3$, has equal power to circles $1$ and $3$. So where two of the axes cross, the third passes too, and the three axes meet at the radical center, unless the centers are on one line and the axes are parallel.

{{figure:center}}

## How to use it
When the circles meet, the common chord is the radical axis, so subtracting the equations gives the chord's line with no intersection points to compute. For $x^2 + y^2 = 25$ and $(x - 6)^2 + y^2 = 9$, subtracting gives $$x^2 - (x - 6)^2 = 25 - 9, \qquad 12x - 36 = 16,$$ so the chord lies on $x = \frac{13}{3}$.

Every point of the axis has equal tangent lengths to both circles, which turns a statement about lengths into one equation, and the axis is perpendicular to the line of centers, which gives a direction for free.

The radical center is the standard way to prove three lines concurrent: show that each is the radical axis of a pair among three circles. When it lies outside all three circles, it is also the center of a circle crossing all three at right angles.

## On contests
Five problems here, four of them AIME, one solved by it alone and three combined with [[power-of-a-point|power of a point]]. Almost every appearance has one of two shapes: two circles meet and the question is really about their common chord, or a point has equal power to two circles and the axis locates it. Olympiad problems add a third use, concurrency through a radical center.
`,

"miquels-theorem": String.raw`## Why it works
Let the circles through $(B, F, D)$ and $(C, D, E)$ meet again at $M$. Cyclic quadrilaterals give $\angle FMD = 180° - B$ and $\angle DME = 180° - C$, so $\angle FME = 360° - (180° - B) - (180° - C) = B + C = 180° - A$ — which says exactly that $A, F, M, E$ are concyclic. One angle chase, fully general.

## How to use it
Whenever a configuration has one point on each side of a triangle and circles through vertex-adjacent triples, the three circles share a point — often the key hidden point of the problem. The spiral-similarity connection: the Miquel point is the center of the [[spiral-similarity|spiral similarity]] taking $EF$ configurations to $BC$ ones.

## On contests
AIME-level circle problems sometimes plant a Miquel configuration without naming it; recognizing "three circles, one per vertex" saves the day. The complete-quadrilateral version (Miquel point of four lines) is an olympiad staple.`,

"pascals-theorem": String.raw`## Why it works
Projective magic — the clean proofs use cross-ratios or the radical axes of three cleverly chosen circles. For contest purposes: know the statement, its stability under re-ordering the six vertices (different orders give different Pascal lines), and its degenerate forms.

## How to use it
The degenerate versions do the work: merge two adjacent vertices and the side through them becomes the tangent at that point. With a triangle (three merged pairs), Pascal says tangent-at-$A$ ∩ $BC$, tangent-at-$B$ ∩ $CA$, tangent-at-$C$ ∩ $AB$ are collinear.

The cyclic-quadrilateral case merges one pair only, and is the version that actually turns up. Take $ABCD$ on a circle and run Pascal on the hexagon $AABCDD$, where the repeated letters mean the tangents at $A$ and at $D$. The three intersections are then tangent-at-$A$ ∩ $CD$, tangent-at-$D$ ∩ $AB$, and $BC$ ∩ $AD$, and those three points are collinear. Merging a different pair, or reordering, gives the companion statements: running $ABBCDD$ instead puts the tangent at $B$ into the line. The useful reading is that the tangents at two vertices of a cyclic quadrilateral meet the opposite sides on a line through the intersection of the remaining two sides, which is how a problem about a tangent and a side extension collapses to a collinearity. [[brianchon-theorem|Brianchon]] (the dual) handles tangential polygons: main diagonals of a circumscribed hexagon concur. Its projective dual is Brianchon's theorem, which swaps points for lines and an inscribed hexagon for a circumscribed one.

## On contests
Olympiad tool; on AIME its degenerate forms occasionally shortcut collinearity claims that would otherwise need heavy computation. Worth knowing mainly for recognition — six points on a circle with intersecting chord extensions is the tell.`,

"homothety-monge": String.raw`
## Key forms
- $X \mapsto P + k(X - P)$ — scales every length by $|k|$ about $P$ and keeps directions, so a whole tangency configuration is carried along at once
- $\frac{EO_1}{EO_2} = \frac{r_1}{r_2}$ — the external center of similitude divides $O_1O_2$ externally in the ratio of the radii; the internal one divides it internally
- a point of tangency — it is a center of similitude, so the homothety there maps one circle onto the other
- Monge — the three external centers of similitude of three circles are collinear

## Why it works
A homothety is multiplication by $k$ in vectors based at $P$, so it multiplies every length by $|k|$ and keeps every direction; that is why circles go to circles and tangents to tangents.

Two circles with centers $O_1$, $O_2$ and different radii $r_1$, $r_2$ are matched by the homothety whose center $E$ lies on the line $O_1O_2$, beyond the smaller circle, with $\frac{EO_2}{EO_1} = \frac{r_2}{r_1}$. It sends $O_1$ to $O_2$ and scales $r_1$ to $r_2$, so it sends the first circle onto the second. It also carries each external tangent line to itself, which is why those tangents pass through $E$.

{{figure:similitude}}

For Monge's theorem, compose the homothety from circle $1$ to circle $2$ with the one from circle $2$ to circle $3$. The result is a homothety from circle $1$ to circle $3$ with a positive ratio, so it is the one centered at their external center of similitude, and the center of a composition of two homotheties lies on the line through their two centers.

## How to use it
At a point where two circles are tangent, the homothety centered there maps one circle onto the other and carries everything attached to the small circle along with it: its tangent lines, their points of contact, the midpoints of its arcs. The famous instance is a circle inside another, tangent at $T$, with a chord of the big circle tangent to the small one: the homothety at $T$ sends the chord's point of tangency to the midpoint of the arc the chord cuts off.

To locate a center of similitude, use the ratio. For radii $2$ and $6$ with centers $8$ apart, $EO_2 = 3 \cdot EO_1$ and $EO_2 = EO_1 + 8$, so $EO_1 = 4$.

## On contests
Six problems here, five of them AIME, none by it alone; two pair it with the [[circumradius-area|circumradius formula]]. The tangent-circle lemma above is a recurring AIME and olympiad step, and Monge's theorem settles three-circle collinearity questions with no computation at all.
`

});

Object.assign(window.MATH_DETAILS, {

"shared-angle-area-ratio": String.raw`
## Why it works
Both areas are half a product of two sides times the sine of the angle between them, $$[AXY] = \tfrac12\,AX \cdot AY\sin\angle A, \qquad [ABC] = \tfrac12\,AB \cdot AC\sin\angle A,$$ so in the ratio the sines cancel and only the side ratios remain.

The cancellation needs the sines to be equal, not the angles, and $\sin\theta = \sin(180^\circ - \theta)$. So supplementary angles work exactly as well as equal ones, and that single observation turns one picture into a family: a point extended past the vertex, or two triangles on opposite sides of a crossing, give the same product. In Chinese competition training it is called the bird's-head model, after the extended-side figure.

## How to use it
The four figures, each with equal or supplementary angles at the two vertices:

- $X$ on $AB$ and $Y$ on $AC$, the small triangle cut off at a corner.
- $X$ on $BA$ extended past $A$, where $\angle XAY = 180^\circ - \angle BAC$ and the product is unchanged; this is the case most often missed.
- Two triangles meeting at a crossing point $P$, where vertical angles are equal: $\frac{[PAC]}{[PBD]} = \frac{PA \cdot PC}{PB \cdot PD}$.
- Two triangles anywhere whose angles happen to be equal or supplementary.

With $AX = \frac13AB$ and $AY = \frac34AC$, $[AXY] = \frac13 \cdot \frac34[ABC] = \frac14[ABC]$. Chain it around a figure, one product per corner triangle, and subtract from the whole to reach the middle region. Its relatives are the [[same-base-area-ratio|same-base ratio]], [[cevian-area-ratio|cevian area ratios]] and the [[area-method|area method]].

## On contests
Four problems here, three of them AIME, none by it alone; two start from an [[angle-bisector-theorem|angle bisector]], whose side ratio feeds the product. It is everywhere on AMC 10 and 12 as "points on two sides, what fraction of the area", and it is the standard first move in AIME area dissections.
`,

"exradii": String.raw`## Why it works
The excenter opposite $A$ sits at the intersection of the external bisectors from $B$ and $C$; joining it to the vertices splits the triangle with signed areas, giving $A = r_a(s - a)$ in place of $A = rs$. The tangent-length bookkeeping mirrors the incircle's, but the tangent length from $A$ is now $s$ itself.

## How to use it
Any incircle technique has an excircle twin: $r_a = \frac{A}{s-a} = s\tan\frac{A}{2}$, touch point of the $A$-excircle on $BC$ mirrors the incircle's touch point across the midpoint of $BC$. Multiplying the four radius formulas gives $r \, r_a r_b r_c = A^2$ — a slick identity for "product of radii" problems.

## On contests
AIME problems about circles tangent to one side and two extensions are excircle problems in disguise. The mirror-image touch point fact and $r r_a r_b r_c = A^2$ both appear as key steps; the [[incenter-excenter-lemma|incenter-excenter lemma]] connects $I_A$ to arc midpoints for the hardest versions.`,

"ratio-lemma": String.raw`## Why it works
Apply the law of sines in triangles $ABD$ and $ACD$: the sides $BD$ and $DC$ are proportional to $AB\sin\angle BAD$ and $AC \sin\angle DAC$ (the angles at $D$ are supplementary, so their sines agree and cancel).

## How to use it
The all-purpose cevian converter between side data and angle data. Special cases to recognize instantly: bisector (sines equal → [[angle-bisector-theorem|Angle Bisector Theorem]]), median ($BD = DC$ → $\frac{\sin\angle BAD}{\sin\angle DAC} = \frac{AC}{AB}$), altitude and symmedian similarly. Multiply three of these around the triangle and [[cevas-theorem|Ceva's]] trig form appears.

## On contests
The clean way through AIME problems that give one cevian angle and ask for a length split (or vice versa). Worth drilling until the statement writes itself — it replaces a page of law-of-sines bookkeeping.`,

"incenter-excenter-lemma": String.raw`## Why it works
Angle chase: $\angle IBM = \angle IBC + \angle CBM = \frac{B}{2} + \frac{A}{2}$ (the inscribed angle $\angle CBM$ equals $\angle CAM = \frac{A}{2}$), while $\angle BIM = \frac{A}{2} + \frac{B}{2}$ as the exterior angle of $\triangle ABI$. So $\triangle MBI$ is isosceles: $MB = MI$. Symmetric arguments give $MC$ and the excenter.

## How to use it
Whenever an incenter and a circumcircle share a problem, draw the arc midpoint: it gives a circle through four named points ($B$, $C$, $I$, $I_A$) with known center and radius $MB = 2R\sin\frac{A}{2}$, plus the collinearity $A$–$I$–$M$. Many "find $AI$ or $IM$" problems become one law-of-cosines application inside this circle.

## On contests
Arguably the single most useful AIME circle lemma: it silently powers most configurations with the incenter and the circumcircle. Recognize the phrase "perpendicular bisector of the bisector segment" or "circle through $B$, $I$, $C$": the center is always the arc midpoint.`,

"orthocenter-properties": String.raw`
## Why it works
All of these facts come from two reflections of $H$, one over a side and one over that side's midpoint.

Reflect $H$ over $BC$. The image sees $BC$ at the same angle as $H$ does, and $\angle BHC = 180^\circ - \angle A$: in the quadrilateral formed by $A$, $H$ and the feet of the altitudes from $B$ and $C$, the two right angles add to $180^\circ$. So the image sees $BC$ at $180^\circ - \angle A$, which is exactly the condition for lying on the circumcircle, on the arc opposite $A$.

Now reflect $H$ over the midpoint $M$ of $BC$, and call the image $A'$. The diagonals of $BHCA'$ bisect each other at $M$, so it is a parallelogram, with $BH \parallel CA'$ and $CH \parallel BA'$. Since $BH \perp AC$, the line $CA'$ is perpendicular to $AC$ too, so $\angle ACA' = 90^\circ$, and in the same way $\angle ABA' = 90^\circ$. By [[thales-theorem|Thales' theorem]], $A'$ is on the circumcircle, opposite $A$.

{{figure:parallelogram}}

The distances follow. $O$ is the midpoint of $AA'$ and $M$ is the midpoint of $HA'$, so in triangle $AHA'$ the segment $OM$ joins two midpoints and $$AH = 2\,OM.$$ The central angle over $BC$ is $2A$, so $OM = R\cos A$ and $AH = 2R\cos A$.

## How to use it
Three facts do most of the work.

- The circle through $H$, $B$ and $C$ is the reflection of the circumcircle over $BC$, so it has the same radius $R$.
- $AH = 2\,OM = 2R\cos A$, which links lengths at the orthocenter to lengths at the circumcenter.
- With $O$ at the origin, $\vec{OH} = \vec{OA} + \vec{OB} + \vec{OC}$, the quickest route to coordinates.

A problem that gives the circle through $H$, $B$ and $C$ should be reflected back to the circumcircle at once. With the three vertices, $H$ forms an [[orthocentric-system|orthocentric system]], in which each of the four points is the orthocenter of the other three.

## On contests
Three problems here, two AIME and one HMMT, none solved by it alone, and two finish with [[power-of-a-point|power of a point]]. A problem that gives the circle through $H$ and two vertices usually opens with exactly the reflection of the circumcircle over a side. The distances $2R\cos A$ also give the sides of the orthic triangle, and the products $AH \cdot HH_A$ along the three altitudes are all equal, which is the power of the point $H$.`,

"fermat-point": String.raw`## Why it works
Rotate triangle $APB$ by $60^\circ$ about $B$: the path $AP + PC$ becomes a broken path of the same total length, and the extra segment $PP'$ equals $BP$ (equilateral triangle $PBP'$). So $PA + PB + PC$ equals the length of a path from a fixed erected vertex to $C$ — minimized when straight, which forces the $120^\circ$ angles.

## How to use it
For "minimize the sum of distances to three points": check the largest angle first (if $\ge 120^\circ$, the answer is at that vertex); otherwise the minimum value is computable by the rotation — it equals the distance between one vertex and the equilateral apex erected on the opposite side, i.e. one law-of-cosines evaluation with an angle increased by $60^\circ$.

## On contests
The engine behind "shortest total cable" problems and AIME minimizations of the total distance from a point to several vertices. On AMC the $120^\circ$ structure often arrives pre-installed, as three roads meeting at $120^\circ$; recognize it as Fermat-point optimality.`,

"point-plane-distance": String.raw`
## Why it works
The vector $(a, b, c)$ is perpendicular to the plane, and the distance is the part of any vector from the plane to the point that runs along it.

For two points of the plane, subtracting their equations gives $a\,\Delta x + b\,\Delta y + c\,\Delta z = 0$, so $(a, b, c)$ is perpendicular to every direction within the plane. For any point $Q$ of the plane, the component of $\vec{QP}$ along the unit normal is the perpendicular distance, and because $Q$ satisfies the equation it simplifies to $$\frac{ax_0 + by_0 + cz_0 + d_0}{\sqrt{a^2 + b^2 + c^2}}.$$ This is the argument for [[point-line-distance|the distance from a point to a line]] with one more coordinate.

The volume route is the pyramid formula read backwards: a pyramid with base area $A$ and height $h$ has volume $\frac13Ah$, so $h = \frac{3V}{A}$.

{{figure:corner}}

## How to use it
Build the plane first: its normal is the [[cross-product-area|cross product]] of two edge vectors, and $d_0$ comes from substituting any known point. Then apply the formula: the distance from the origin to $2x + 3y + 6z = 21$ is $\frac{21}{\sqrt{4 + 9 + 36}} = 3$.

When the plane is a face of a tetrahedron with an easy volume, the height $\frac{3V}{A}$ is often quicker, as at the corner of a cube. A sphere is tangent to a plane exactly when the distance from its center to the plane equals its radius, just as for circles and lines.

## On contests
Four problems here, all AIME, one solved by it alone; two set up the plane with [[coordinate-bash|coordinates]], and two find the [[insphere-radius|radius of an inscribed sphere]], which is the distance from its center to each face. Keep both routes, the formula and $\frac{3V}{A}$; one of them is usually painless.
`,

"ravi-substitution": String.raw`## Key forms
- $a=y+z$, $b=z+x$, $c=x+y$ with $x,y,z>0$ — this is a bijection between triangles and positive triples, so the triangle inequality is absorbed into mere positivity and disappears as a constraint
- the new variables are the [[incircle-tangent-lengths|incircle tangent lengths]] $x=s-a$, $y=s-b$, $z=s-c$, and their sum is the semiperimeter — positivity of $x,y,z$ is exactly the triangle inequality, which is what the substitution buys you
- [[herons-formula|Heron]] becomes the clean symmetric product $A=\sqrt{xyz(x+y+z)}$, which is what makes [[am-gm|AM-GM]] apply directly to triangle inequalities — with the constraint gone, symmetric inequality tools apply without any side conditions

## Why it works
The incircle's tangent lengths $x = s-a$, $y = s-b$, $z = s-c$ are positive for any genuine triangle and reconstruct the sides as $a = y + z$ etc.; conversely any positive $x, y, z$ build a valid triangle. It is a bijection between triangles and positive triples — the triangle inequality is absorbed.

## How to use it
Substitute when the triangle inequality is the annoying constraint: counting integer triangles (positivity + parity bookkeeping replaces inequality [[casework-method|casework]]), triangle inequalities (Heron becomes $A = \sqrt{xyz \cdot s}$, and AM-GM applies cleanly to $x, y, z$), and semiperimeter-heavy identities.

## On contests
Counting problems ("how many triangles with perimeter $n$") become stars-and-bars-with-parity; olympiad-style inequalities over triangle sides become symmetric inequalities over free positive variables. If a proof keeps invoking "each side less than the sum," Ravi removes the friction.`

});

Object.assign(window.MATH_DETAILS, {

"center-distance-formulas": String.raw`## Why it works
With the circumcenter as origin, $\vec{OH} = \vec{OA} + \vec{OB} + \vec{OC}$; expanding $|\vec{OH}|^2$ gives $3R^2$ plus dot products, and each $\vec{OA}\cdot\vec{OB} = R^2\cos(2C) = R^2 - \frac{c^2}{2}$ — summing produces $9R^2 - \sum a^2$. Dividing the [[euler-line-ratio|Euler line]] in thirds gives $OG$; the [[incenter-excenter-lemma|incenter]] identity is the power of $I$ (a chord through $I$ and a vertex has segment product $2Rr$ by the incenter-excenter lemma).

## How to use it
Given sides (or $\sum a^2$) and $R$, all Euler-line distances follow. Run it backwards too: contest problems specify $OH$ or $OG$ and ask for $\sum a^2$. Acute vs. obtuse checks: $OH^2 > 0$ always, but $\cos A\cos B\cos C$ changes sign at right triangles ($OH = R$ exactly... for a right triangle $\sum a^2 = 8R^2$ gives $OH^2 = R^2$ — $H$ is at the right-angle vertex, distance $R$ from $O$: consistent).

## On contests
"Sometimes" tier but decisive: problems giving two centers' distance and asking for side data, or vice versa. Pairs with $OI^2 = R(R-2r)$ (its own entry) to triangulate all three of $O$, $I$, $H$.`,

"feuerbach-theorem": String.raw`## Why it works
Deep — the classical proofs invert about the point where the incircle touches a side, or compute $NI$ directly with the [[barycentric-coordinates|barycentric]] distance formula. What survives for contest use is the metric statement: $NI = \frac{R}{2} - r$ exactly, which is internal tangency since the nine-point radius is $\frac{R}{2}$.

## How to use it
Treat it as a free equation linking $R$, $r$, and the position of $N = $ midpoint of $OH$: problems that pin down two of the circles' data determine the third. The excircle version $NI_A = \frac{R}{2} + r_A$ (external tangency) works the same way. Also a strong sanity check for coordinate computations — if your computed $NI \ne R/2 - r$, something upstream is wrong.

## On contests
Rare but famous; appears in olympiad-adjacent AIME problems about the [[nine-point-circle|nine-point circle]] meeting the incircle, and as the hidden reason behind "these two circles are tangent" claims. Recognition value is most of its worth.`,

"leibniz-formula": String.raw`## Why it works
Write $\vec{PA} = \vec{PG} + \vec{GA}$ and expand the squared sum: the cross terms vanish because $\vec{GA} + \vec{GB} + \vec{GC} = \vec{0}$ — the defining property of the centroid. The constant $\sum GA^2 = \frac{1}{3}\sum a^2$ comes from the median-length formula ($GA = \frac{2}{3}m_a$).

## How to use it
Any "sum of squared distances to the vertices" condition becomes a circle centered at $G$: the locus of $P$ with $\sum PA^2 = k$ is a circle (or point/empty), radius from the formula. Minimization questions end instantly: the minimum is $\frac{1}{3}\sum a^2$, at $G$. Generalizes to $n$ points with the same proof.

## On contests
Locus problems ("set of points with $PA^2+PB^2+PC^2 = 100$ is a circle — find its radius") and minimization one-liners. The four-point version handles rectangles and tetrahedra the same way.`,

"incenter-coordinates": String.raw`## Why it works
The incenter divides the bisector from $A$ in ratio $\frac{b+c}{a}$ (bisector theorem applied twice) — exactly the balance point of masses $a$, $b$, $c$ at the vertices. Mass-point mechanics then give the weighted-average coordinate formula; the centroid is the equal-mass case.

## How to use it
Once a triangle is coordinatized, write $I$ down directly — no bisector intersections needed. The general principle converts any mass-point configuration to coordinates: cevian intersection points are [[weighted-average|weighted averages]] with the masses you'd assign in [[mass-points|mass points]]. Excenters flip the sign of one weight. The weights $(a:b:c)$ are barycentric coordinates, and reading them that way is what generalises the construction to every other triangle center.

## On contests
The quiet workhorse of coordinate solutions to incircle problems: AIME problems asking for incenter-related lengths in coordinatized triangles reduce to plugging into this formula plus the distance formula. Also the entry point to [[barycentric-coordinates|barycentric coordinates]] for students heading toward olympiad.`,

"law-of-tangents": String.raw`## Why it works
From the law of sines, $\frac{a-b}{a+b} = \frac{\sin A - \sin B}{\sin A + \sin B}$; sum-to-product turns numerator and denominator into $2\cos\frac{A+B}{2}\sin\frac{A-B}{2}$ and $2\sin\frac{A+B}{2}\cos\frac{A-B}{2}$, whose ratio is the tangent quotient.

## How to use it
Best when a problem gives $a + b$ and $a - b$ (or their ratio) together with $C$ — since $\frac{A+B}{2} = 90^\circ - \frac{C}{2}$ is then known, the formula yields $\frac{A-B}{2}$ and hence both angles. An alternative to the law of cosines that avoids quadratics in exactly this data pattern.

## On contests
Occasional AIME trig; also handy for "the sides differ by 2 and the included angle is..." setups. Knowing it exists prevents a mechanical but messy cosine-rule grind.`,

"napoleons-theorem": String.raw`## Why it works
Cleanest with complex numbers: the center of an outward equilateral on segment $pq$ is a fixed linear combination of $p$ and $q$ involving a primitive sixth root of unity; the equilateral condition for the three centers reduces to the identity $1 + \omega + \omega^2 = 0$. Rotation composition gives a synthetic proof.

## How to use it
The theorem itself is mostly recognition ("centers of erected equilaterals" ⟹ equilateral, no computation needed). The area formulas — outer $= \frac{\sqrt3}{24}\sum a^2 + \frac{[ABC]}{2}$, and outer minus inner $= [ABC]$ — turn qualitative setups into numbers. The erected-triangle apexes themselves (not centers) connect to the [[fermat-point|Fermat point]]: segments from each apex to the opposite vertex concur there with equal lengths.

## On contests
Occasional AMC/AIME cameo, and the Fermat-point connection makes the configuration worth knowing cold: erected equilateral triangles almost always signal either Napoleon structure or [[rotation-trick|the rotation trick]].`,

"cyclic-quad-radius": String.raw`## Why it works
Split the quadrilateral by a diagonal and apply $R = \frac{(\text{side products})}{4 \cdot \text{area}}$ to each triangle — both triangles share the circumcircle. Combining the two expressions with [[ptolemys-theorem|Ptolemy's]] relation between the diagonals produces the symmetric three-product form.

## How to use it
For a cyclic quadrilateral with known sides: [[brahmaguptas-formula|Brahmagupta]] gives $K$, then this gives $R$ — a two-step pipeline replacing any diagonal-hunting. Note the three products $(ab+cd)$, $(ac+bd)$, $(ad+bc)$ also give the diagonals: $p^2 = \frac{(ac+bd)(ad+bc)}{ab+cd}$ and its mate.

## On contests
The finishing move for "cyclic quadrilateral with sides 4, 5, 6, 7 — find the circumradius" questions, which otherwise require solving for a diagonal first. The diagonal formulas hiding in the same products are equally worth caching.`,

"van-aubel": String.raw`## Why it works
Complex numbers: the center of the square erected outward on segment from $p$ to $q$ is $\frac{p+q}{2} + \frac{i}{2}(q-p)$. Writing the two center-difference vectors and simplifying, one is exactly $i$ times the other — perpendicular and equal in one stroke.

## How to use it
Recognition first: squares erected on the sides of a quadrilateral ⟹ the opposite-center segments are congruent and perpendicular, no computation. The complex-number center formula is independently useful for any "erect a square, find a point" coordinate problem.

## On contests
The quadrilateral cousin of [[napoleons-theorem|Napoleon]] — appears in AMC/AIME-adjacent problems about squares built on sides. Degenerate cases are cute and testable: collapse one side to a point and it still holds.`

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

"circular-segment": String.raw`
## Why it works
The sector from the center to the arc is made of two pieces, the segment and the triangle formed by the center and the chord, so the segment is what is left when the triangle is removed.

A sector with central angle $\theta$, in radians, has area $\frac12r^2\theta$, the fraction $\frac{\theta}{2\pi}$ of the whole circle's $\pi r^2$. The triangle has two sides equal to $r$ with the angle $\theta$ between them, so by [[trig-area|the sine area formula]] its area is $\frac12r^2\sin\theta$. Subtracting gives $$\tfrac12r^2\theta - \tfrac12r^2\sin\theta = \tfrac12r^2(\theta - \sin\theta).$$

For $\theta$ greater than $180^\circ$ the same formula still holds: the center then lies inside the segment, the triangle has to be added rather than removed, and the negative value of $\sin\theta$ does exactly that.

## How to use it
Find the central angle first, from the chord ($\text{chord} = 2r\sin\frac\theta2$), from the distance to the center, or from a special triangle, and convert it to radians. A $90^\circ$ arc of a circle of radius $6$ cuts off $$\tfrac12 \cdot 36\left(\tfrac\pi2 - 1\right) = 9\pi - 18.$$

For two overlapping circles, draw the common chord: it splits the lens into one segment from each circle, and each segment's central angle comes from the triangle formed by the two centers and a crossing point. When each circle passes through the other's center, that triangle is equilateral and each segment has a central angle of $120^\circ$.

{{figure:lens}}

## On contests
Six problems here, five of them AIME, none by it alone: the angle usually comes from a [[special-right-triangles|special right triangle]], from [[thales-theorem|Thales' theorem]], or from a [[circle-equation|circle's equation]] placed in coordinates. The most common slip is putting degrees into $\theta - \sin\theta$.
`,

"cyclic-quad-diagonals": String.raw`## Why it works
Apply the law of cosines to the two triangles sharing diagonal $p$, using $\cos B = -\cos D$, and solve — the result packages into the paired products. Dividing the two diagonal formulas gives the elegant ratio; multiplying them recovers Ptolemy.

## How to use it
Given four sides of a cyclic quadrilateral, both diagonals follow with no trigonometry: compute the three products $(ab+cd)$, $(ac+bd)$, $(ad+bc)$ once, then $p^2$ and $q^2$ are quotients. Pairs with [[brahmaguptas-formula|Brahmagupta]] (area) and Parameshvara (circumradius), which are built from the same three products. Those products also drive [[ptolemys-theorem|Ptolemy's theorem]], which is the relation to reach for when the diagonals themselves are wanted rather than their ratio.

## On contests
The missing step in "cyclic quadrilateral with sides given — find the diagonal" AIME problems, where Ptolemy alone gives only the product $pq$. Knowing the ratio formula turns one equation into two.`,

"angle-between-lines": String.raw`## Why it works
A line of slope $m$ makes angle $\arctan m$ with the $x$-axis; the angle between the lines is the difference of inclinations, and the tangent subtraction formula gives $\tan(\alpha_1 - \alpha_2)$ in terms of the slopes. The absolute value selects the acute angle.

## How to use it
Direct: two slopes in, angle out. In reverse: "find the line making a given angle $\theta$ with a given line" turns the formula into an equation for the unknown slope (expect two solutions, one on each side). The $1 + m_1m_2 = 0$ singularity is perpendicularity — the formula's built-in reminder.

## On contests
AMC 12 asks it directly, for instance the angle between lines of slopes $3$ and $\frac12$, which is $45^\circ$; it also converts coordinate configurations into the angle form needed for trig identities and arctan telescoping.`,

"reflection-coordinates": String.raw`
## Why it works
Reflecting means moving straight across the line, at right angles to it, and going as far past the line as the point was before it.

The vector $(a, b)$ is perpendicular to $ax + by + c = 0$, and the signed distance from $P$ to the line is $\frac{ax_0 + by_0 + c}{\sqrt{a^2 + b^2}}$, as on [[point-line-distance|the point-to-line distance card]]. Moving $P$ that far against the unit normal lands on the foot of the perpendicular, and moving twice as far lands on the image. Twice the distance times the unit normal is $$\frac{2(ax_0 + by_0 + c)}{a^2 + b^2}(a, b),$$ which is the step in the formula.

The special cases are the formula with simple normals. For $y = x$, written $x - y = 0$, the normal is $(1, -1)$ and the step from $(x, y)$ is $(x - y)(1, -1)$, which lands on $(y, x)$.

{{figure:instant}}

## How to use it
Use the instant cases whenever the mirror is an axis, $y = \pm x$, or a horizontal or vertical line, and the general formula for a slanted mirror. Reflecting $(5, 0)$ over $x + y = 4$ gives $$(5, 0) - \frac{2(5 + 0 - 4)}{1^2 + 1^2}(1, 1) = (4, -1).$$ Check that the midpoint, here $(4.5, -0.5)$, lies on the mirror. To reflect a whole line, reflect two of its points.

Reflections do three jobs on contests. They find shortest paths, since a path that touches a line on its way between two points is shortest when reflecting one endpoint makes it straight, [[reflection-shortest-path|the reflection trick]]. They model folds, since a crease is the [[perpendicular-bisector-locus|perpendicular bisector]] of a point and its image. And the swap over $y = x$ is the coordinate meaning of an inverse function.

## On contests
Seven problems here, five of them AIME, one solved by it alone; most of the rest are folds, paired with the [[perpendicular-bisector-locus|perpendicular bisector]] that the crease is and finished with the [[pythagorean-theorem|Pythagorean theorem]]. Light rays and billiard paths chain several reflections, each one a step of the same computation.
`,

"skew-lines-distance": String.raw`## Why it works
The cross product $\vec{d_1} \times \vec{d_2}$ is perpendicular to both lines — the direction of the unique common perpendicular. Any connecting vector between the lines has the same projection onto that direction, and that projection is the distance. The tetrahedron route says the same thing with volumes: $V = \frac{1}{6}\,d\, |\vec{d_1}||\vec{d_2}|\sin\phi$-style, so $d = 3V/[\text{base}]$-type manipulations work.

## How to use it
Coordinatize, take one point and the direction on each line, compute one cross product and one [[vector-dot-product|dot product]]. Sanity checks: parallel lines give $\vec{d_1} \times \vec{d_2} = 0$ (use point-to-line instead); intersecting lines give distance 0. In cubes and boxes, the answer is often a clean fraction of the edge — e.g. opposite edges' diagonals.

## On contests
AIME 3D problems: distance between skew edges or face diagonals of a cube, and "shortest segment connecting two lines" questions. One computation replaces an optimization.`,

"isoperimetric-facts": String.raw`## Why it works
Rectangle: $xy \le \left(\frac{x+y}{2}\right)^2$ is AM-GM. Triangle: [[herons-formula|Heron's]] product $(s-a)(s-b)(s-c)$ with fixed sum is maximized at equality — AM-GM again. Polygons → cyclic ([[bretschneiders-formula|Bretschneider's]] cosine term vanishes) → regular → circle is the classical chain; each step trades asymmetry for area.

## How to use it
Optimization problems that ask for a maximum area with a perimeter budget (or minimum perimeter for an area) end at the symmetric configuration — quote the fact, compute the symmetric case, and confirm the equality condition. The "cyclic maximizes for fixed sides" version answers hinged-quadrilateral questions.

## On contests
"A farmer has 100 feet of fence..." (square, or half-square against a wall — careful: the wall variant's optimum is a $25 \times 50$ half-square, not a square!). AMC also tests the qualitative form: recognizing that the extremal shape must be the symmetric one.`

});

Object.assign(window.MATH_DETAILS, {

"solid-tactics": String.raw`
## Key forms
- coordinatize when right angles are present, putting one at the origin — boxes, right prisms and pyramids then become vector arithmetic where incidence and distance are mechanical
- $\frac{x}{a}+\frac{y}{b}+\frac{z}{c}=1$ — the plane through the axis intercepts $(a,0,0)$, $(0,b,0)$, $(0,0,c)$, which is the fastest way to write a cutting plane, and it slices off a corner tetrahedron of volume $\frac{abc}{6}$
- $d=\frac{|Ax_0+By_0+Cz_0-D|}{\sqrt{A^2+B^2+C^2}}$ — the distance from a point to the plane $Ax+By+Cz=D$, the workhorse for heights of pyramids and for sphere-plane tangency
- take a [[cross-section-method|cross-section]] through the plane of symmetry when the problem involves spheres, cones or tangency — the slice carries all the radius and center-distance information and reduces the problem to a plane figure
- [[surface-shortest-path|unfold the net]] when a path must stay on the surface, because flattening preserves surface distances and turns the shortest path into a straight segment — check the competing unfoldings, since the shortest route often crosses a different face than expected
- compute one volume two different ways to extract an awkward distance, since $h=\frac{3V}{A}$ recovers a height from a face area once the volume is known by another route — the most-missed of the four

## Why it works
Solid geometry is rarely hard because of a new idea; it is hard because the picture does not fit on the page. Each tactic trades the solid for something already familiar.

Coordinates work because right angles line up with the axes. A box with a corner at the origin has every vertex at a point like $(a, 0, c)$, and every length, midpoint or plane then comes from a formula rather than from seeing the figure.

A slice works because a symmetric solid is determined by its cross-section through the axis, so every tangency and radius survives the cut; [[cross-section-method|cross-sections]] has the details.

Unfolding works because flattening a surface along its edges does not stretch it, so a path on the surface has the same length on the net, where the shortest one is a straight line.

The volume recount works because a volume does not depend on which face is called the base. Computing $V = \frac13 Ah$ once with a convenient base and once with the face you care about gives an equation for the unknown height.

## How to use it
Triage in order. Right angles present: coordinatize, putting the corner of a box, right prism or pyramid at the origin. Spheres, cones or tangency: slice through the axis. A path along the surface: unfold and draw one segment, checking the competing unfoldings. A distance from a point to a plane: use the formula, or compute a tetrahedron's volume two ways.

Once coordinatized, two formulas do most of the work. A cutting plane through three points on the axes is $$\frac{x}{a} + \frac{y}{b} + \frac{z}{c} = 1,$$ which clears to $bc\,x + ca\,y + ab\,z = abc$ and hands you the normal vector $(bc, ca, ab)$ for free. The [[point-plane-distance|point-to-plane distance]] then gives the height of a pyramid with an awkward apex, the radius of a sphere tangent to a face, or a check that four points are coplanar.

The recount also works by pieces: a volume can come from a bigger solid you know, minus what was cut away, as for [[isosceles-tetrahedron|a tetrahedron inside a box]].

When stuck, hunt for a plane of symmetry. Most contest solids have one, and the part of the problem lying in it is a plane problem you already know.

## On contests
Four problems here, all AIME, and they use different tactics. Coordinates finish boxes and wedges, often in one line once the corner is at the origin; a slice handles spheres and cones; distances from several edges to a diagonal become a [[symmetric-linear-system|symmetric system]]; and reassembly, fitting two copies of a solid together into a cube, is a volume recount by pieces.

The recount by bases is the most-missed: once one base and height give the volume, the height onto any other face is free from $h = \frac{3V}{A}$.`

});

Object.assign(window.MATH_DETAILS, {

"cayley-menger": String.raw`## Why it works
It is [[herons-formula|Heron's Formula]] lifted one dimension. In the plane, a triangle's area is fixed by its three sides; in space, a tetrahedron's volume is fixed by its six edges — and both are the same bordered determinant of squared distances, just at size $4$ (with the $16[\triangle]^2$ factor) versus size $5$ (with $288 V^2$). The bordering row/column of $1$'s encodes the affine constraint that the points actually live in $3$-space.

## How to use it
Reach for it whenever you know all six edge lengths but placing coordinates is awkward. Fill the symmetric matrix carefully: entry $(i,j)$ is the squared distance between vertices $i$ and $j$, with $a,b,c$ the three edges meeting at one vertex and $d,e,f$ their respective opposite edges. If $288V^2$ comes out $0$, the four points are coplanar; if negative, no such tetrahedron exists (the edge lengths violate a triangle-type inequality).

## On contests
Most AIME tetrahedra have enough right angles or symmetry that coordinates or the box trick are faster, so treat Cayley–Menger as the universal fallback rather than the first move. It shines on "scalene" tetrahedra given purely by edge lengths, and it's the clean way to prove a configuration is impossible.`,

"isosceles-tetrahedron": String.raw`
## Why it works
Four alternate corners of a box, no two joined by an edge of the box, are joined in pairs by face diagonals, and opposite diagonals lie on parallel faces, so they are equal.

Going the other way, given the three edge lengths $a$, $b$, $c$, look for a box with $p^2 + q^2 = a^2$, $q^2 + r^2 = b^2$ and $p^2 + r^2 = c^2$. Adding and subtracting solves it: $$p^2 = \frac{a^2 + c^2 - b^2}{2},$$ and similarly for $q^2$ and $r^2$. These are positive exactly when every face is an acute triangle, which is always true for an isosceles tetrahedron.

The rest of the box is four corner pyramids, each with three mutually perpendicular edges from the box, so each has volume $\frac16pqr$, and $$V = pqr - 4 \cdot \frac{pqr}{6} = \frac{pqr}{3}.$$

{{figure:corners}}

## How to use it
The trigger is three pairs of equal opposite edges. Find the box from the three sum equations, as in the example, and the volume is immediate.

The four faces are congruent, so the surface area is four times one face, which pairs with [[insphere-radius|the insphere formula]] $r = \frac{3V}{S}$. The center of the box is the center of both the circumscribed and the inscribed spheres, since the symmetries of the box swap the four faces. Such tetrahedra are also called disphenoids.

## On contests
Three problems here, two AIME and one AMC 12, none solved by it alone. The recurring shape gives three pairs of equal opposite edges that are square roots, which fit a box with whole-number sides, and asks for the volume or the insphere radius; others minimize a sum of distances at the center of the box, or use the fact that any acute triangle is the face of one. A tetrahedron given by three matched pairs of edges is always signaling the box.`,

"tetrahedron-centroid": String.raw`## Why it works
The centroid of equal point masses at the four vertices is their average $\frac{A+B+C+D}{4}$. Writing the face centroid $M_A = \frac{B+C+D}{3}$, the point $\frac{A + 3M_A}{4}$ equals $G$, which places $G$ three-quarters of the way from $A$ to $M_A$ — the $3:1$ split. The three bimedians pass through $G$ because the midpoint of a segment joining two edge-midpoints is again the four-vertex average.

## How to use it
For any "balance point," "center of mass," or averaged-vertex question, just average coordinates. The $3:1$ median ratio is the 3D analogue of the triangle centroid's $2:1$; the pattern is that in $n$ dimensions the centroid divides a median $n:1$. The concurrent, mutually bisecting bimedians make the centroid a natural origin for symmetric coordinate setups.

## On contests
Mass-point and averaging arguments transfer directly to 3D. When a problem hands you the four vertices (or asks about the point minimizing summed squared distances, which is exactly $G$), the centroid is a one-line computation.`

});

Object.assign(window.MATH_DETAILS, {

"angle-chasing": String.raw`
## Key forms
- $A + B + C = 180^\circ$ — the triangle sum; an exterior angle equals the sum of the two remote interior angles
- $AB = AC \iff \angle B = \angle C$ — isosceles, with the equal sides often undrawn: two radii of one circle, or two tangents from one point
- parallel lines — corresponding and alternate angles are equal, and co-interior angles sum to $180^\circ$
- [[inscribed-angle-theorem|inscribed angle]] $= \frac12$ arc — all inscribed angles on one arc are equal, and an angle in a semicircle is right
- cyclic quadrilateral — opposite angles sum to $180^\circ$; equivalently, an exterior angle equals the opposite interior angle
- tangent–chord angle $=$ the inscribed angle in the alternate segment — the inscribed-angle rule with the chord's two endpoints merged

## Why it works
Angles in a figure are tied together by a few exact rules, so knowing one angle usually forces many others, and naming one unknown lets that single number flow through the whole picture.

Each rule is a short fact. The angles of a triangle add to $180^\circ$, because the line through one vertex parallel to the opposite side makes angles equal to the other two, and the three together form a straight line.

{{figure:sum}}

Equal sides face equal angles, because folding an isosceles triangle along its line of symmetry swaps them. A line crossing two parallels meets them at the same angle. And an inscribed angle is half the arc it stands on, so every inscribed angle on the same arc is equal. None of these involves a length, which is why a chase can run on one unknown.

The figure at the top is a complete chase. Starting from $\angle A = 36^\circ$ in an isosceles triangle, the base angles are $72^\circ$ each; the bisector from $B$ makes $36^\circ$; and the triangle sum in $BDC$ then gives $$\angle BDC = 180^\circ - 36^\circ - 72^\circ = 72^\circ = \angle C,$$ so $BD = BC$. Every step used one rule, and the conclusion is about lengths even though only angles were chased.

## How to use it
Pick the unknown that touches the most constraints and call it $\theta$. Then sweep the figure repeatedly, applying the propagators above in roughly this order of payoff.

- Mark every angle forced by a triangle sum, and use the exterior-angle form wherever an angle sits outside a triangle, which saves a subtraction every time.
- Mark every isosceles pair. The equal sides are often not drawn as such: two radii of the same circle, two tangents from one external point, or two sides revealed equal by an earlier step.
- Transfer angles across every pair of parallel lines.
- Around each circle, apply the inscribed-angle transfer: all angles standing on one arc are equal, an angle in a semicircle is right, and a [[tangent-chord-angle|tangent–chord angle]] equals the inscribed angle beyond the chord.
- In each [[cyclic-opposite-angles|cyclic quadrilateral]], trade opposite angles for their supplements, or use the exterior-angle form, which avoids the supplement bookkeeping entirely.

Write each derived angle on the figure as you go. The chase ends in one of two ways: the target appears in terms of $\theta$, or a single angle acquires two different expressions, which is an equation for $\theta$.

Run it backwards as well. The inscribed-angle and cyclic-quadrilateral rules are biconditional, so equal angles on the same side of a segment are enough to prove four points concyclic, and supplementary opposite angles prove a quadrilateral cyclic. Finding a hidden circle this way, one of the [[concyclicity-tests|tests for a cyclic quadrilateral]], usually unlocks the rest of the chase at once.

If it stalls, add the standard auxiliary segments, such as a circle's radii to key points, the missing side of an almost-triangle, or the chord joining two tangency points, and sweep again. For a write-up that must cover every configuration at once, convert the chase to [[directed-angles|directed angles]] mod $180^\circ$.

## On contests
The first five minutes of essentially every synthetic geometry problem. Of the 21 problems tagged here only 3 end with the chase itself; far more often it produces the angles that another tool turns into lengths, the [[law-of-sines|law of sines]] in 5, [[trig-area|the sine area formula]] in 4 and [[inscribed-angle-theorem|inscribed angles]] in 4.

Configurations to know by sight: the $36^\circ$–$72^\circ$ golden-gnomon chase, the "radius makes isosceles" chase inside circles, and cyclic-quadrilateral chases where opposite angles trade $180^\circ$.
`

});

Object.assign(window.MATH_DETAILS, {

"section-formula": String.raw`## Why it works
The point at fraction $\frac{m}{m+n}$ of the way from $A$ to $B$ is $A + \frac{m}{m+n}(B - A)$, which rearranges to the weighted average $\frac{n A + m B}{m+n}$ — more weight on the endpoint you're closer to. The midpoint is the balanced case $m = n$.

## How to use it
Read the ratio carefully: $AP : PB = m : n$ puts the $m$ coefficient on the far point $B$. For external division (the point beyond the segment, as in "extend $AB$ past $B$ so that..."), use a negative sign: $\frac{m B - n A}{m - n}$. This is the coordinate face of [[mass-points|mass points]] — placing mass $n$ at $A$ and $m$ at $B$ balances at $P$ — so any cevian-ratio problem can be finished either way.

## On contests
The workhorse for coordinate solutions to ratio problems, trisection points, and centroid computations. When a problem gives you a ratio along a segment and asks for a coordinate, length, or area, this is a one-line computation. Pairs naturally with the [[shoelace-formula|shoelace formula]] for the area that follows.`,

"vector-dot-product": String.raw`## Why it works
Expanding $|\vec{u} - \vec{v}|^2 = |\vec{u}|^2 + |\vec{v}|^2 - 2\,\vec{u} \cdot \vec{v}$ against the Law of Cosines forces $\vec{u} \cdot \vec{v} = |\vec{u}||\vec{v}|\cos\theta$. So the sign of the dot product is the sign of $\cos\theta$: positive means acute, zero means perpendicular, negative means obtuse.

## How to use it
Three standard reads: the angle between two vectors ($\cos\theta = \frac{\vec{u} \cdot \vec{v}}{|\vec{u}||\vec{v}|}$), a perpendicularity test ($\vec{u} \cdot \vec{v} = 0$), and the length of the projection of $\vec{u}$ onto $\vec{v}$ ($\frac{\vec{u} \cdot \vec{v}}{|\vec{v}|}$). Coordinates make it mechanical: $\vec{u} \cdot \vec{v} = u_1 v_1 + u_2 v_2$ (add $u_3 v_3$ in 3D). To show two lines are perpendicular, dot their direction vectors.

## On contests
The clean way to handle angle and perpendicularity conditions once a figure is on coordinates — often faster than slopes because it dodges the vertical-line special case and extends straight to 3D. On AIME, the dot/cross product pair turns spatial angle and area questions into arithmetic.`,

"cavalieris-principle": String.raw`## Key forms
- $V=\int A(h)\,dh$ — volume depends only on the cross-section area function, so matching $A(h)$ at every height matches the volume
- $V=Bh$ survives shearing — an oblique prism or cylinder has the same volume as the upright one, because no slice changes as you shear it
- sphere against cylinder-minus-two-cones — matching slice areas at every height is the classical route to $\tfrac43\pi r^3$ with no integration

## Why it works
Volume is the integral of cross-sectional area over height. If two solids present the same area $A(h)$ at every height $h$, their volume integrals are identical — the shapes of the slices, and how they're stacked or sheared, are irrelevant.

## How to use it
Use it to transport a volume you don't know onto one you do. An oblique prism or cylinder shears to an upright one slice-for-slice, so it keeps $V = Bh$. A pyramid's volume comes from slicing it against a known pyramid with the same base and height. The famous derivation of the sphere: a hemisphere of radius $R$ has the same slice area at every height as a cylinder of radius $R$ with a cone bored out, giving $V = \frac{2}{3}\pi R^3$ per hemisphere.

## On contests
Mostly a conceptual unlock: it justifies "the slant doesn't matter" so you can replace a leaning solid with an upright one, and it explains why the $\frac{1}{3}$ in a pyramid's volume is shape-independent. When a solid is defined by a moving or tilted cross-section, think slices.`,

"barycentric-coordinates": String.raw`
## Key forms
- $A = (1:0:0)$, midpoint of $AB$ $= (1:1:0)$, centroid $= (1:1:1)$ — the landmarks, written down without computing
- $D = (0:m:n)$ on side $BC$ — divides it with $BD : DC = n : m$, the larger weight going to the nearer vertex
- $ny = mz$ — the cevian from $A$ through $D = (0:m:n)$, since every point on it keeps $y : z = m : n$
- $\begin{vmatrix} x_1 & y_1 & z_1 \\ x_2 & y_2 & z_2 \\ x_3 & y_3 & z_3 \end{vmatrix} = 0$ — three points are collinear; with normalized rows the determinant is the area ratio $\frac{[P_1P_2P_3]}{[ABC]}$
- incenter $(a:b:c)$, excenter opposite $A$ $(-a:b:c)$, [[lemoine-point|symmedian point]] $(a^2:b^2:c^2)$, orthocenter $(\tan A:\tan B:\tan C)$, circumcenter $(a^2S_A:b^2S_B:c^2S_C)$ with $S_A = \frac{b^2+c^2-a^2}{2}$ — the named centers, each one triple
- Nagel point $(s-a:s-b:s-c)$, Gergonne point $\left(\frac{1}{s-a}:\frac{1}{s-b}:\frac{1}{s-c}\right)$, Spieker center $(b+c:c+a:a+b)$ — the incircle and excircle family

## Why it works
Once the triangle is fixed, a point is pinned down by how much weight it puts on each vertex, and the weight on a vertex turns out to be the area of the sub-triangle opposite it, as a fraction of the whole.

Think of the weights as masses. Put mass $\alpha$ at $A$, $\beta$ at $B$ and $\gamma$ at $C$, with $\alpha + \beta + \gamma = 1$; the triangle then balances at the point $P = \alpha A + \beta B + \gamma C$. A heavier mass pulls the balance point toward its own vertex, so a point near $A$ puts most of its weight on $A$. This is the picture behind [[mass-points|mass points]], which are a special case.

{{figure:balance}}

Every point has such weights, and only one set of them. Any point $P$ can be written as $A + \beta(B - A) + \gamma(C - A)$, because $B - A$ and $C - A$ point in two different directions and together reach every point of the plane. Setting $\alpha = 1 - \beta - \gamma$ turns this into $P = \alpha A + \beta B + \gamma C$ with $\alpha + \beta + \gamma = 1$, and the weights are unique because $\beta$ and $\gamma$ are.

The weights are areas, as the figure at the top shows. The signed area $[XBC]$ is half of $BC$ times the signed distance from $X$ to the line $BC$, and that distance changes linearly as $X$ moves.

A function of that kind sends a weighted average of points, with weights adding to $1$, to the same weighted average of its values, so $$[PBC] = \alpha[ABC] + \beta[BBC] + \gamma[CBC] = \alpha[ABC],$$ because a triangle with two equal vertices has no area. That gives $\alpha = \frac{[PBC]}{[ABC]}$, and the same argument gives $\beta$ and $\gamma$.

The signs are what let the coordinates describe points outside the triangle. A weight is negative exactly when $P$ is on the far side of the opposite side line from its vertex, so the three side lines cut the plane into seven regions, each with its own pattern of signs.

{{figure:sign-regions}}

## Full proof
The claim is that the determinant of three normalized coordinate rows is the area ratio $\frac{[P_1P_2P_3]}{[ABC]}$, so that three points are collinear exactly when it is $0$.

Let $P_i = x_iA + y_iB + z_iC$ with $x_i + y_i + z_i = 1$, and write $\vec u = B - A$ and $\vec v = C - A$. Then $P_i - A = y_i\vec u + z_i\vec v$, so $$P_2 - P_1 = (y_2 - y_1)\vec u + (z_2 - z_1)\vec v, \qquad P_3 - P_1 = (y_3 - y_1)\vec u + (z_3 - z_1)\vec v.$$

Twice the signed area of a triangle is the cross product of two of its edge vectors. The cross product distributes over sums, $\vec u \times \vec u = \vec v \times \vec v = 0$, and $\vec v \times \vec u = -\vec u \times \vec v$, so expanding gives $$2[P_1P_2P_3] = \left((y_2 - y_1)(z_3 - z_1) - (z_2 - z_1)(y_3 - y_1)\right)\vec u \times \vec v,$$ while $2[ABC] = \vec u \times \vec v$. The ratio is the number in the large brackets.

That number is the determinant. In the matrix with rows $(x_i, y_i, z_i)$, add the second and third columns to the first; the determinant does not change, and every entry of the first column becomes $x_i + y_i + z_i = 1$. Subtracting the first row from the other two and expanding along the first column leaves exactly $(y_2 - y_1)(z_3 - z_1) - (z_2 - z_1)(y_3 - y_1)$.

Unnormalized coordinates $(x:y:z)$ multiply each row by a nonzero constant, which scales the determinant but cannot change whether it is $0$. So three points given in any form are collinear exactly when the determinant of their coordinates vanishes.

## How to use it
Start with the notation. A point is written $(x : y : z)$, with colons because only the ratio matters: $(1:2:1)$ and $(2:4:2)$ are the same point. To get actual weights that add to $1$, divide by $x + y + z$, so $(1:2:1)$ means $\frac14A + \frac12B + \frac14C$.

Next, learn the landmarks, which can be written down without computing anything. The vertices put all their weight on one corner: $A = (1:0:0)$, $B = (0:1:0)$ and $C = (0:0:1)$. A midpoint is an equal mix of two vertices, so the midpoint of $AB$ is $(1:1:0)$, and the centroid, an equal mix of all three, is $(1:1:1)$.

{{figure:landmarks}}

Then points that divide a side in a given ratio. A point on a side has a $0$ in the place of the vertex it does not touch, and the point $D$ on $BC$ with $BD : DC = n : m$ is $$D = \frac{mB + nC}{m + n} = (0 : m : n).$$ The larger weight goes to the nearer vertex, just as a balance point sits nearer the heavier mass.

A line through a vertex is a single equation. Every point on the cevian from $A$ through $D = (0:m:n)$ keeps its last two coordinates in the ratio $m : n$, since sliding along the cevian toward $A$ only changes the weight on $A$, so that cevian is the equation $$ny = mz.$$ The green median in the landmarks figure is an example: it runs from $C$ through $(1:1:0)$, so every point on it has $x = y$, and the centroid $(1:1:1)$ is one of them.

Now the whole process on one diagram. Let $D$ split $BC$ with $BD : DC = 1 : 2$, let $E$ be the midpoint of $CA$, and find the point $P$ where $AD$ meets $BE$. First mark the points on the sides: $D = (0:2:1)$ and $E = (1:0:1)$. Then write each cevian as an equation: every point of $AD$ has $y = 2z$, and every point of $BE$ has $x = z$. The point satisfying both is found by taking $z = 1$, which gives $P = (1:2:1)$.

{{figure:finding-a-point}}

On a contest you can skip the equations and read the answer off the two forms. Moving along a cevian from a vertex changes only the weight on that vertex, so the points of $AD$ and of $BE$ have the forms $$(\alpha : 2 : 1) \qquad \text{and} \qquad (1 : \beta : 1).$$ The only triple of both forms has $\alpha = 1$ and $\beta = 2$, so $P = (1 : 2 : 1)$ at a glance, with no equations written down.

Everything about $P$ can now be read off its coordinates. Normalized, $P = \frac14A + \frac12B + \frac14C$, and those weights are the areas of the three triangles that $P$ cuts the big one into: $[PBC]$ is a quarter of the whole, $[PCA]$ a half and $[PAB]$ a quarter.

{{figure:read-off}}

The ratios along the cevians come out the same way. Since $D = \frac23B + \frac13C$, the point is also $\frac14A + \frac34D$, three quarters of the way from $A$ to $D$, so $AP : PD = 3 : 1$. And since $E = \frac12A + \frac12C$, it is $\frac12B + \frac12E$, the midpoint of $BE$. One pair of equations produced the point and every ratio around it.

The named centers are where the method saves the most time, because each one is a single triple: the incenter is $(a:b:c)$, weighted by the side lengths, and the others are in the key forms above. A point that takes a paragraph to locate synthetically is simply written down.

{{figure:centers}}

To test whether three points are collinear, put their coordinates in the rows of a determinant; it is zero exactly when they are. The median in the landmarks figure is a check you can do by hand: $C = (0:0:1)$, the centroid $(1:1:1)$ and the midpoint $(1:1:0)$ give $$\begin{vmatrix} 0 & 0 & 1 \\ 1 & 1 & 1 \\ 1 & 1 & 0 \end{vmatrix} = 1 \cdot (1 \cdot 1 - 1 \cdot 1) = 0,$$ so the three lie on one line. The same computation with the circumcenter, centroid and orthocenter proves [[euler-line-ratio|the Euler line]].

Two more translations complete the toolkit. An area ratio is the determinant of the normalized rows, and a conjugate is a coordinatewise reciprocal: the isotomic and [[isogonal-conjugate|isogonal]] conjugates of $(x:y:z)$ are $$\left(\tfrac1x : \tfrac1y : \tfrac1z\right) \qquad \text{and} \qquad \left(\tfrac{a^2}{x} : \tfrac{b^2}{y} : \tfrac{c^2}{z}\right),$$ which is why the circumcenter pairs with the orthocenter and the centroid with the symmedian point.

Two habits prevent most of the errors. Keep coordinates unnormalized while computing, since clearing denominators is free and normalizing early creates fractions you carry for pages; normalize only to read off an actual point or an actual ratio, and remember that a triple with $x + y + z = 0$ is no point at all. And check the final answer on an easy triangle, isosceles or right, where the named centers have known positions.

## On contests
An olympiad-level tool: when a configuration is saturated with cevians, named centers and side ratios, barycentric coordinates turn "find the intended synthetic insight" into a determinant that is guaranteed to finish, if slowly.

Against [[mass-points|mass points]], its lightweight relative: for two cevians and a ratio along one of them, mass points are faster. Barycentrics win where mass points run out: a point outside the triangle, a line that is not a cevian, a ratio of areas rather than lengths, or a named center such as the incenter, whose coordinates are known in advance. That is why they are rare on the AMC and AIME and common in olympiad concurrency and area problems.
`,

"coordinate-bash": String.raw`
## Key forms
- $d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$ and $M = \left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)$ — distance and midpoint; the point dividing $P_1P_2$ in ratio $k : 1$ is $\frac{P_1 + kP_2}{1 + k}$
- $\vec u \cdot \vec v = 0$ — perpendicular directions, the safer test than $m_1m_2 = -1$, which silently fails when one line is vertical
- $\frac12\left|\alt{\sum_i (x_iy_{i+1} - x_{i+1}y_i)}{(x_1y_2 - x_2y_1) + (x_2y_3 - x_3y_2) + \cdots + (x_ny_1 - x_1y_n)}\right|$ — the [[shoelace-formula|shoelace]] area, with the vertices taken in order around the polygon
- $\frac{|ax_0 + by_0 + c|}{\sqrt{a^2 + b^2}}$ — the distance from a point to the line $ax + by + c = 0$; without the absolute value, the sign says which side of the line the point is on
- $(x - h)^2 + (y - k)^2 = r^2$ — the circle; comparing the two sides says whether a point is inside, on or outside it
- $(x_0, y_0) - \frac{2(ax_0 + by_0 + c)}{a^2 + b^2}(a, b)$ — the reflection of $(x_0, y_0)$ across $ax + by + c = 0$

## Why it works
Every geometric statement about points is an equation in their coordinates, so once the figure is placed, deduction becomes calculation.

The dictionary is short.

- Distance: the Pythagorean theorem applied to the horizontal and vertical gaps between two points.
- Midpoint: the average of the coordinates.
- Perpendicular and parallel: two lines are perpendicular when the [[vector-dot-product|dot product]] of their direction vectors is $0$, and parallel when one direction is a multiple of the other.
- Circle: a point lies on the circle with center $(h, k)$ and radius $r$ exactly when $(x - h)^2 + (y - k)^2 = r^2$.
- Area: the [[shoelace-formula|shoelace formula]].

Every condition in a problem translates into one of these, and the question becomes solving the resulting equations.

What makes it work in practice is that the coordinates can be chosen freely. Moving or rotating the figure changes none of its lengths, angles or areas, so any vertex may go at the origin and any side along an axis.

Every coordinate that becomes $0$ removes terms from every later equation, which is why the placement decides whether the computation takes five lines or fifty.

## How to use it
The whole art is the placement, chosen to zero out coordinates: a right angle at the origin, one side along the $x$-axis, a center or a midpoint at the origin to exploit symmetry, a convenient unit length.

Then reach for the standard tools: the distance formula, [[section-formula|section formula]], shoelace area, the circle equation, or the dot product, which tests perpendicularity even when a line is vertical. Keep a variable or two general so that the result is not accidentally special.

When the algebra balloons, that is the sign that a synthetic idea (similar triangles, [[power-of-a-point|power of a point]]) is the intended shortcut.

## On contests
The reliable fallback across AMC and AIME, with 33 tagged problems here, 30 of them AIME. Only 3 use it alone, because coordinates set a problem up and a formula finishes it: the [[shoelace-formula|shoelace formula]], [[circle-basics|a circle equation]] or [[quadratic-formula|a quadratic]], each in 3 problems. It is strongest on figures with right angles, midpoints or an axis of symmetry. The cost is time and arithmetic care, so reach for it once the elegant path has failed to show itself, not before.
`,

"auxiliary-lines": String.raw`
## Key forms
- drop a perpendicular — creates a height, a distance or a right triangle; the first thing to try on a trapezoid
- the radius to a point of tangency — always perpendicular to the tangent, so a tangency becomes a right angle
- a line parallel to a side — meets an extended [[cevas-theorem|cevian]] and makes similar triangles that turn a ratio into lengths
- translate a diagonal, or double a median past its midpoint — completes a parallelogram and puts two separated lengths in one triangle
- reflect a point across a line, or rotate a piece — straightens a bent path or completes a near-symmetry, the construction behind most minimization problems

## Why it works
The facts a problem needs are often already in the figure but spread across pieces that do not touch; an extra line gathers them into one right triangle, one pair of similar triangles or one parallelogram, where a known theorem applies.

Each standard line is chosen for what it creates. A perpendicular creates a right triangle for the Pythagorean theorem, the radius to a point of tangency creates a right angle, a parallel line creates similar triangles, a doubled segment creates a parallelogram, and a reflection or rotation creates a congruent copy in a better position.

The constructions that come up most have their own cards: [[parallel-line-similarity|drawing a parallel line]], [[median-doubling|doubling a median]], [[perp-to-angle-bisector|reflecting a vertex across an angle bisector]] and [[reflection-shortest-path|the reflection trick]] for shortest paths. This card is the catalogue, organized by what in the problem calls for each one.

## How to use it
Know the repertoire by what triggers it.

- A trapezoid or an unknown height: drop perpendiculars from the ends of the shorter base.
- Anything tangent: draw the radius to the point of tangency for a guaranteed right angle.
- A ratio along a cevian: draw a [[parallel-line-similarity|parallel line]] through a well-chosen point to create similar triangles.
- Two lengths you want in one formula: translate one beside the other, as sliding one diagonal of a trapezoid puts it in a triangle with the other.
- A broken path to minimize: reflect an endpoint across the line so the path becomes straight.
- A near-symmetry, such as a point inside an equilateral triangle: rotate a piece by the symmetry angle to complete it.

The test of a good auxiliary line is that it creates a figure some theorem applies to: a right triangle, similar triangles, a parallelogram or a cyclic quadrilateral. A line that creates none of these is usually the wrong one.

## On contests
Eight problems here, all AIME, never alone, and the partners are all different, which is the nature of the method: the line exposes [[similar-figures-ratios|similar triangles]] in one problem, [[special-right-triangles|a special right triangle]] in another and an [[angle-chasing|angle chase]] in a third. On AMC one perpendicular or one radius usually cracks the problem; on AIME the reflection and rotation constructions turn minimization and length-sum problems into single straight segments.
`

});

Object.assign(window.MATH_DETAILS, {

"trig-bash": String.raw`## Key forms
- $\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}=2R$ moves between a side and its opposite angle, and hands you the circumradius for free — the reason it is usually the first tool in a cyclic configuration
- $c^2=a^2+b^2-2ab\cos C$ handles a side sandwiched between two known ones, or recovers an angle from three sides, and avoids the sign ambiguity that catches the law of sines in the SSA case — prefer it to the law of sines whenever an angle could be obtuse
- $[ABC]=\frac12ab\sin C$ converts an area condition into a trigonometric one, so an area constraint becomes just another equation in the same unknown angle — this is what lets an area constraint join the same system as the side and angle equations

## Why it works
The Law of Sines and Law of Cosines are complete: together they determine every triangle from any valid combination of sides and angles. So naming one unknown angle makes every other length and angle in a triangulated figure a function of it, and the given constraint becomes a single equation in that one variable.

## How to use it
Pick the variable that the constraints touch most — usually an angle at a vertex where several triangles meet. Then propagate: $\frac{a}{\sin A} = 2R$ moves between a side and its opposite angle (and hands you the circumradius for free), $c^2 = a^2 + b^2 - 2ab\cos C$ handles a side sandwiched between two known ones, and $[ABC] = \frac{1}{2}ab\sin C$ converts an area condition into a trig one. Collapse the resulting equation with the standard identities — sum-to-product, double angle, and the $A + B + C = 180^\circ$ identities. Watch the ambiguous SSA case, and prefer cosines when you need to avoid a sign ambiguity.

## On contests
The reliable AIME fallback for configurations with awkward angles where coordinates get messy — especially cyclic figures, where the inscribed-angle theorem makes many angles equal and $2R$ ties everything together. Like [[coordinate-bash|coordinate bashing]], it trades elegance for a guaranteed finish; reach for it after the synthetic ideas have been tried.`,

"complex-bash": String.raw`
## Key forms
- $z \mapsto p + e^{i\theta}(z - p)$ — rotation by $\theta$ about $p$
- $R\omega^k$ with $\omega = e^{2\pi i/n}$ — the vertices of a regular $n$-gon centered at $0$
- $\frac{c - a}{b - a}$ — real exactly when $a$, $b$, $c$ are collinear, purely imaginary exactly when $ab \perp ac$
- $a^2 + b^2 + c^2 = ab + bc + ca$ — $a$, $b$, $c$ form an equilateral triangle, in either orientation
- $\bar z = \frac1z$ on the unit circle — the reason to put the figure on the unit circle, where reflections stay short

## Why it works
Multiplying complex numbers multiplies their lengths and adds their angles: $|wz| = |w||z|$ and $\arg(wz) = \arg w + \arg z$. So multiplying by $e^{i\theta}$, which has length $1$, is a rotation by $\theta$ about $0$, and shifting $p$ to $0$ and back makes it a rotation about $p$.

The same rule explains the quotient test. $\frac{c - a}{b - a}$ has length $\frac{|c - a|}{|b - a|}$, and its angle is the turn from $b - a$ to $c - a$, which is the angle at $a$. It is real when that angle is $0^\circ$ or $180^\circ$, so the points are collinear, and purely imaginary when it is $90^\circ$.

{{figure:quotient}}

For equilateral triangles, with $\omega = e^{2\pi i/3}$, the condition $a + \omega b + \omega^2c = 0$ describes the triangles labeled counterclockwise and $a + \omega^2b + \omega c = 0$ those labeled clockwise. Their product is $a^2 + b^2 + c^2 - ab - bc - ca$, because $\omega + \omega^2 = -1$, so that expression vanishes in either orientation.

## How to use it
Put a convenient point at $0$, ideally a center of symmetry, and scale so a key length is $1$. On the unit circle conjugates are reciprocals, so reflections and feet of perpendiculars have short formulas. To rotate $z = 3 + i$ by $90^\circ$ about $p = 1 + i$, compute $p + i(z - p) = (1 + i) + 2i = 1 + 3i$.

Use the orientation-free equilateral test unless the problem fixes a direction of travel. For products of distances in a regular polygon, factor through the roots of unity: $\prod_{k=1}^{n-1}(1 - \omega^k) = n$, which is the product of the distances from one vertex of a regular $n$-gon inscribed in the unit circle to all the others.

## On contests
Five problems here, four of them AIME, one solved by it alone and each of the rest with a different partner. It is the clean route through rotation-heavy configurations, [[napoleons-theorem|Napoleon's theorem]], squares erected on the sides of a quadrilateral, and distance products in regular polygons; [[rotation-trick|the rotation trick]] and [[spiral-similarity|spiral similarity]] are the synthetic versions of the same ideas.
`,

"affine-transformations": String.raw`## Key forms
- send any triangle to any other, or any ellipse to a circle — an affine map is determined by where three points go, so this normalisation is always available
- ratios along a line and ratios of areas are preserved — so "divides $BC$ in ratio $2:3$" and $\frac{[PQR]}{[ABC]}$ may both be computed in the easy picture and read back
- angles, lengths, perpendicularity and circles-staying-circles are all destroyed — so never affine-normalise a problem whose statement mentions any of them

## Why it works
An affine map $v \mapsto Mv + t$ sends lines to lines and preserves ratios along each line, so midpoints, "divides in ratio $2{:}3$," and parallelism all survive. Its Jacobian $\det M$ is constant, so it scales every area by the same factor $|\det M|$ — which cancels in any ratio of areas. What it destroys matters just as much: angles, lengths, perpendicularity, and "a circle stays a circle" all change, so those quantities are off-limits.

## How to use it
Two moves cover almost everything. (1) Ellipse → circle: the scaling $(x, y) \mapsto (x, \tfrac{a}{b}y)$ turns $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$ into a circle of radius $a$; solve the circle problem, then any affine-invariant answer (an area ratio, a midpoint, a tangency, a ratio of parallel chords) transfers back unchanged, while a bare area picks up the factor $\frac{a}{b}$. (2) Triangle → equilateral: a unique affine map sends any triangle to any other, so a question about ratios of areas inside a triangle can be solved on the equilateral one and read off by symmetry. Two high-yield uses: squash an ellipse into a circle by scaling one axis, solve the easy circle problem, and read the affine-invariant answer back; and map any triangle to an equilateral or right-isosceles one, since an area-ratio question cannot tell them apart. Only apply it to affine-invariant quantities. The same idea, scaling the two basis vectors of the square grid, is why [[picks-theorem-general|Pick's theorem holds on any lattice]]: the map sends lattice points to lattice points and multiplies every area by one constant.

## On contests
A genuine AIME time-saver on ellipse problems and on "ratio of these two regions of a triangle," and a standard olympiad simplification ("WLOG the triangle is equilateral"). The one discipline is checking that the quantity asked for is affine-invariant — applied to an angle or an absolute length, the answer is simply wrong.`,

"pole-polar": String.raw`## Key forms
- the polar of $P$ with respect to a circle of radius $R$ about $O$ is the line of points $Q$ with $\vec{OP}\cdot\vec{OQ}=R^2$; when $P$ lies outside, this line is exactly the chord of contact joining the two tangency points — the pole-polar pairing is symmetric, so a point on one is matched by a line through the other
- the defining relation is symmetric, giving La Hire's theorem: $P$ lies on the polar of $Q$ precisely when $Q$ lies on the polar of $P$ — so "collinear" and "concurrent" become dual statements and proving one proves the other
- a secant from $P$ meeting the circle at $X,Y$ and the polar at $Q$ forms a harmonic range $(X,Y;P,Q)=-1$, which pins an unknown length with no angle chase and survives projection — harmonic ranges are what let an unknown length be pinned by a cross ratio instead of a computation

## Why it works
Fix a circle of radius $R$ about $O$. The polar of $P$ is the line of points $Q$ with $\vec{OP} \cdot \vec{OQ} = R^2$; for $P$ outside, that line is exactly the chord of contact through the two tangency points. The defining relation is symmetric in $P$ and $Q$ — La Hire's theorem: $P \in \operatorname{polar}(Q) \iff Q \in \operatorname{polar}(P)$. Because polarity swaps points with lines while preserving incidence, "collinear" and "concurrent" become dual statements, so proving one proves the other.

## How to use it
The trigger is tangents and secants from a common external point. Then: (1) the chord of contact is a polar you can name; (2) to show three points collinear, show each lies on the polar of one common point (La Hire); (3) a secant from $P$ meeting the circle at $X, Y$ and the polar at $Q$ is a harmonic range $(X, Y; P, Q) = -1$, i.e. $\frac{XP}{YP} = \frac{XQ}{YQ}$, pinning an unknown length with no angle chase. Harmonic ranges stay harmonic under projection, so the relation transports across the whole figure.

## On contests
Olympiad geometry, where a tangents-and-secants configuration that looks like a trig marathon collapses to two lines of projective bookkeeping. Rarely needed below the olympiad level, but decisive when the figure is built from poles, polars, and harmonic conjugates. Pairs naturally with the radical-axis and power-of-a-point ideas.`,

"directed-angles": String.raw`## Key forms
- measure angles between lines rather than rays, modulo $180^\circ$ — this single convention removes the "equal or supplementary" case split, since the ambiguity is precisely the $180^\circ$ you quotiented away
- the two workhorse facts become unconditional: $\angle(PA,PB)=\angle(QA,QB)$ exactly when $A,B,P,Q$ are concyclic or collinear, and angles add, $\angle(\ell_1,\ell_2)+\angle(\ell_2,\ell_3)=\angle(\ell_1,\ell_3)$, so long chases telescope — this is the entire reason to adopt directed angles, since configuration cases stop existing
- they detect incidence only — no lengths, no orientation, and no way to separate an angle from its explement — so use them to prove concyclicity and collinearity, then switch tools for anything metric

## Why it works
Measuring angles between lines (not rays) modulo $180^\circ$ makes the two workhorse facts unconditional: $\angle(PA, PB) = \angle(QA, QB)$ iff $A, B, P, Q$ are concyclic (or collinear), and $\angle(PA, PB) + \angle(PB, PC) = \angle(PA, PC)$ always. No case split for "$P$ inside vs. outside the circle" or "same vs. opposite arc" — the supplementary-angle ambiguity is precisely the $180^\circ$ you quotiented away.

## How to use it
Write every angle as $\angle(\ell_1, \ell_2)$, oriented consistently, and compute mod $180^\circ$. Concyclicity becomes one equation you can chain through several circles at once; tangency is the limiting case $\angle(\text{tangent}, \text{chord}) = \angle(\text{inscribed})$. Additivity makes long chases telescope. Mind the limits: directed angles detect collinearity and concyclicity but cannot compare lengths, orient a triangle, or split an angle from its explement — use them to prove incidence, then switch tools for anything metric.

## On contests
Pure olympiad hygiene: the standard way to write an angle chase so one argument covers every configuration a grader might draw, dodging the "what if the point is on the other side" trap. Not something you would cite on AMC/AIME, where numeric answers don't need it, but essential for airtight synthetic write-ups.`,

"phantom-point": String.raw`## Key forms
- define $X'$ by the property you are trying to prove, then show $X'$ satisfies the original construction — proving two points coincide is usually far easier than computing the messy intersection directly
- two distinct circles, or a circle and a line, meet in at most two points — so once $X$ and $X'$ are both "the second intersection beyond a known common point", they must be equal, which is what closes the argument

## Why it works
The point you want is often over-determined: the claim to prove ("$X$ lies on line $\ell$," "the circle passes through $X$") is one condition more than the construction needs. So rather than compute $X$ and verify the extra condition, define $X'$ by that condition and verify it satisfies the construction. Two loci that meet in at most two points (two circles, or a circle and a line) share at most two points, so identifying $X$ and $X'$ as "the second intersection beyond a known common point" forces $X = X'$.

## How to use it
Let $X'$ be the point defined by the target property — the second meeting of a circle and a line, a reflection, an intersection with $\ell$. Then prove $X'$ lies on whatever curves define the genuine $X$, usually a one-step angle, power-of-a-point, or similar-triangles check. Conclude $X = X'$ and the property is proved. It is the write-up dual of an auxiliary construction: add the point you wish existed, then show it is the one you already had.

## On contests
An olympiad technique for concurrency, collinearity, and "prove this circle passes through that point," especially when the honest intersection is algebraically hideous. It converts a hard incidence claim into an easy uniqueness argument. No role on short-answer contests, but a workhorse for synthetic olympiad solutions; see the auxiliary-lines card for its constructive cousin.`,

"area-method": String.raw`
## Why it works
The area of a triangle is half a base times a height, so when two triangles share one of those, their areas compare like the other.

Triangles $ABD$ and $ACD$ with $D$ on $BC$ have the same apex $A$, so they have the same height, and their areas are in the ratio $\frac{BD}{DC}$, the [[cevian-area-ratio|cevian area ratio]]. Triangles $PBC$ and $ABC$ share the base $BC$, so their areas are in the ratio of their heights, and for $P$ on the cevian $AD$ those heights are in the ratio $\frac{PD}{AD}$, by similar right triangles.

{{figure:heights}}

Every length ratio along a line is therefore an area ratio, and areas add, which lengths on different lines do not. That is what lets a tangle of cevians be rewritten in areas and solved as a few linear equations.

## How to use it
Pick triangles that share the segments you care about, and trade each length ratio for the matching area ratio. To find where two cevians cross, write the unknown ratios as areas, use the fact that the pieces add up to the whole, and solve.

For $D$ on $BC$ with $BD : DC = 2 : 3$ and $P$ on $AD$ with $AP : PD = 3 : 1$, the triangles $PBC$ and $ABC$ share the base $BC$, so $$[PBC] = \frac{PD}{AD}[ABC] = \frac14[ABC];$$ the split of $BC$ does not matter for this ratio.

It reproduces [[cevas-theorem|Ceva's theorem]] and Menelaus's in a line or two, and unlike [[mass-points|mass points]] it survives points outside the triangle and parallel lines. For an interior point, the fractions of $[ABC]$ taken by $[PBC]$, $[PCA]$ and $[PAB]$ are exactly its [[barycentric-coordinates|barycentric coordinates]].

## On contests
Six problems here, all AIME, none by it alone; two finish with the [[shoelace-formula|shoelace formula]] once coordinates give the areas directly. It is the reliable fallback when a ratio chase stalls on a configuration with several cevians: slower than mass points on the problems they handle, and it works on the ones they cannot.

## Key forms
- $\frac{[ABD]}{[ACD]} = \frac{BD}{DC}$ — two triangles with apex $A$ and bases on one line
- $\frac{[PBC]}{[ABC]} = \frac{PD}{AD}$ — two triangles on the base $BC$, for $P$ on the cevian $AD$
- $[PBC] + [PCA] + [PAB] = [ABC]$ — the three pieces around an interior point, whose fractions of the whole are its barycentric coordinates
`

});

Object.assign(window.MATH_DETAILS, {

"triangle-center-angles": String.raw`## Why it works
Each formula is a short angle chase from that center's defining property. Circumcenter: the inscribed-angle theorem says the arc $BC$ subtends $\angle A$ at the circumference and twice that, $2A$, at the center $O$. Incenter: in $\triangle BIC$ the angles at $B$ and $C$ are the halves $\frac{B}{2}, \frac{C}{2}$, so $\angle BIC = 180^\circ - \frac{B+C}{2} = 180^\circ - \frac{180^\circ - A}{2} = 90^\circ + \frac{A}{2}$. Orthocenter: $\angle BHC$ is the supplement of $\angle A$ because the two altitude feet make $BHC A$ concyclic-adjacent, giving $180^\circ - A$.

## How to use it
Reach for these whenever a problem places $O$, $I$, or $H$ and asks about an angle — they collapse a configuration to arithmetic in the vertex angles. The [[incenter-excenter-lemma|incenter]] one, $\angle BIC = 90^\circ + \frac{A}{2}$, is the most used: it pins the incenter's position and pairs perfectly with the incenter–excenter lemma. The excenter opposite $A$ satisfies the companion $\angle BI_AC = 90^\circ - \frac{A}{2}$. Sign-check with an equilateral triangle ($A = 60^\circ$): $\angle BOC = 120^\circ$, $\angle BIC = 120^\circ$, $\angle BHC = 120^\circ$ — all equal, as symmetry demands.

## On contests
Staples of AMC/AIME configuration problems and a routine first step in olympiad angle chases. Memorize the incenter formula cold; derive the other two on the spot from the inscribed-angle theorem and the altitude-supplement fact if you blank.`

});

Object.assign(window.MATH_DETAILS, {

"apollonius-circle": String.raw`## Why it works
Fix $k = PA/PB$ and put $A, B$ on the $x$-axis. The equation $PA^2 = k^2 PB^2$ is quadratic in $x, y$ with equal $x^2, y^2$ coefficients and no cross term — a circle. Its two intersections with line $AB$ are the points dividing $AB$ in ratio $k$ internally and externally, so those are diametrically opposite, which fixes the center (on $AB$) and radius. At $k = 1$ the squared terms cancel and the locus degenerates to the perpendicular bisector.

## How to use it
Whenever a constraint reads $PA = k \cdot PB$, the point lives on a known circle: locate the internal and external division points of $AB$ in ratio $k$ and use them as a diameter. In a triangle, the three Apollonius circles (one per vertex pair, using the opposite side ratios) pass through the two isodynamic points, and each contains the feet of the internal and external bisectors from that vertex — the link to [[symmedian-lemoine|symmedians]] and isogonal conjugates.

## On contests
AIME locus and "ratio of distances" problems, and olympiad configurations with isogonal conjugates, symmedians, and isodynamic points. Keep it distinct from [[apollonius-theorem|Apollonius's Theorem]] (the median-length relation) — same name, unrelated result.`,

"pappus-centroid": String.raw`## Why it works
Slice the revolving region into thin strips parallel to the axis. A strip of area $dA$ at distance $\rho$ sweeps a ring of volume $2\pi\rho\,dA$, so $V = 2\pi\int \rho\,dA = 2\pi\bar\rho A$, where $\bar\rho = \frac{\int \rho\,dA}{A}$ is precisely the centroid's distance $d$ from the axis. The identical argument on a curve of length $L$ gives the surface $S = 2\pi d\,L$. Once you know the centroid, no integration remains.

## How to use it
Turn any solid or surface of revolution into a centroid lookup. For symmetric regions the centroid is free — a disk's is its center — giving the torus formulas $V = 2\pi^2 R r^2$ and $S = 4\pi^2 R r$ in one line. For composite regions, find the centroid as the area-weighted average of the parts. It also runs backward: a measured volume of revolution pins an unknown centroid distance.

## On contests
Torus and solid-of-revolution problems on the AIME and beyond. It replaces a revolution integral with a single centroid, the fast path precisely when a cross-section is spun about an external axis. Pairs with [[cavalieris-principle|Cavalieri's Principle]] for volume comparisons.`

});

Object.assign(window.MATH_DETAILS, {

"projection-formula": String.raw`## Why it works
Drop the altitude from $A$ to $BC$ at foot $H$. In the two right triangles, $BH = c\cos B$ and $HC = b\cos C$, and $a = BH + HC$. The other two identities are the same construction from $B$ and $C$.

## How to use it
It's the fastest linear relation between a side and its two adjacent base angles — no squaring. Adding the three, or eliminating cosines between them, reproduces the Law of Cosines, so reach for projection when you want the cosines to appear linearly rather than quadratically.

The same accounting works on a path rather than a triangle: project every segment of a polyline onto one direction and the projections add to the net displacement in that direction. When every segment happens to make the same angle $\\theta$ with that direction, the sum collapses to (total path length)$\\cdot\\cos\\theta$, so a zigzag with a known total length and a known net displacement gives up its angle immediately.

## On contests
A cheap AMC 12 / AIME identity, handy inside trig-bash and whenever an altitude foot splits a side. Underused because it looks too elementary to matter.`,

"triangle-half-angle-identities": String.raw`## Key forms
- $r = (s-a)\tan\frac{A}{2}$ — the tangent length from $A$ times the half-angle tangent; the fastest bridge between an angle and the inradius
- $r = 4R\sin\frac A2\sin\frac B2\sin\frac C2$ — inradius straight from the angles and the circumradius, with no side lengths
- $\sin\frac A2 = \sqrt{\dfrac{(s-b)(s-c)}{bc}}$, $\cos\frac A2 = \sqrt{\dfrac{s(s-a)}{bc}}$ — half-angles from the sides alone, which is the law of cosines put through the half-angle formula
- $\cos A + \cos B + \cos C = 1 + \dfrac{r}{R}$ — turns a cosine sum into the $r/R$ ratio, and is the usual route into Euler's inequality $R \ge 2r$

## Why it works
All follow from $a = 2R\sin A$ and the incircle tangent-length picture. Area $= \frac{abc}{4R} = 2R^2\sin A\sin B\sin C$; combining $r = (s-a)\tan\frac A2$ with the half-angle formulas gives $r = 4R\sin\frac A2\sin\frac B2\sin\frac C2$; and $\sin\frac A2 = \sqrt{(s-b)(s-c)/bc}$ is the half-angle formula applied to $\cos A = \frac{b^2+c^2-a^2}{2bc}$.

## How to use it
These convert freely between a triangle's sides and its $(R, r, \text{angles})$ data — given $R$ and $r$, or the angles, they hand you area, exradii, and side ratios. The two to memorize are $r = 4R\sin\frac A2\sin\frac B2\sin\frac C2$ and $\cos A + \cos B + \cos C = 1 + \frac rR$.

## On contests
AIME triangle problems that give you $R$ and $r$, and olympiad identities. Pair them with the incircle/excircle tangent lengths and the Law of Sines.`,

"mollweides-formula": String.raw`## Why it works
From $a = 2R\sin A$ etc., $\frac{a+b}{c} = \frac{\sin A + \sin B}{\sin C}$; sum-to-product on top and $\sin C = 2\sin\frac C2\cos\frac C2$ with $A + B = \pi - C$ collapse it to $\frac{\cos\frac{A-B}{2}}{\sin\frac C2}$. The $a-b$ version is the companion.

## How to use it
Because each formula uses all three sides and all three angles, they are the standard check on a solved triangle — plug in and both sides must agree, catching any arithmetic slip. Dividing the two Mollweide relations gives the [[law-of-tangents|Law of Tangents]].

## On contests
Olympiad-tier, mainly a consistency check or a bridge to the Law of Tangents. Good to recognize; seldom the quickest route.`,

"morleys-theorem": String.raw`## Why it works
Intersecting adjacent angle trisectors yields three points; a trigonometric computation — cleanest run backward, starting from an equilateral triangle and reconstructing the original angles — shows they are mutually equidistant. The Morley triangle has side $8R\sin\frac A3\sin\frac B3\sin\frac C3$.

## How to use it
Treat it as a result to recognize, not a computational tool — angle trisection makes it nearly useless for solving. If a configuration literally builds adjacent-trisector intersections, the equilateral conclusion (and the side formula) is the payoff.

## On contests
Famous and beautiful, but essentially never the intended method — a curiosity kept for completeness. Reach for ordinary angle-chasing or trig instead.`,

"gergonne-nagel-points": String.raw`## Why it works
Both are [[cevas-theorem|Ceva]] concurrences. Gergonne: [[incircle-tangent-lengths|incircle tangent lengths]] give equal pairs, so the Ceva product for the cevians to the touch points is $1$. Nagel: the $A$-excircle touches $BC$ with $BX' = s-c$, $CX' = s-b$; Ceva again gives concurrence, and the Nagel point $N$, centroid $G$, and [[incenter-excenter-lemma|incenter]] $I$ are collinear with $NG = 2\,GI$ (the Nagel line).

## How to use it
Recognize "cevians to the incircle/excircle contact points" and invoke concurrence instead of re-deriving it. The Nagel line $I$–$G$–$N$ mirrors the [[euler-line-ratio|Euler line]], and the Nagel point is the [[isotomic-conjugate|isotomic conjugate]] of the Gergonne point.

## On contests
Olympiad triangle geometry and the occasional AIME contact-point setup. Companions to the Lemoine, Fermat, and Brocard points — know they exist and concur.`,

"newtons-line": String.raw`## Why it works
In a complete quadrilateral the midpoints of the three diagonals are collinear — an affine fact provable by vectors. For a tangential quadrilateral, equal tangent lengths balance the areas so that the incenter also lands on the line through the two diagonal midpoints (Newton's line).

## How to use it
When a quadrilateral problem features the midpoints of the diagonals, expect the Newton–Gauss collinearity; if the quadrilateral has an inscribed circle, add the incenter to that line. It proves specific three-point collinearities without coordinates.

## On contests
Olympiad quadrilateral configurations — a niche collinearity worth having in the toolbox.`,

"convex-position": String.raw`## Why it works
The Happy Ending theorem is a Ramsey/[[pigeonhole|pigeonhole argument]] on quadruples. Its base case — any $5$ points in general position contain $4$ in convex position — is a short convex-hull case check: a hull of $5$ or $4$ points gives a convex quadrilateral outright, and a triangular hull with two interior points yields one via the line through the interior pair.

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
To force a nonzero lattice point — hence a small integer solution — enclose your constraint in a centrally symmetric convex region of area $> 4$ (volume $> 2^d$ in higher dimensions). It proves [[fermat-two-squares|Fermat's two-squares theorem]] via a suitable ellipse and underlies Dirichlet-style approximation bounds.

## On contests
Olympiad "geometry of numbers." Niche, but the standard move when you must produce a lattice point inside a symmetric convex shape.`

});

// Detail bodies added for important medium+ theorems that had only a short description.
Object.assign(window.MATH_DETAILS, {

"median-to-hypotenuse": String.raw`
## Why it works
The right angle sees the hypotenuse as a diameter of the circle through the three vertices, by [[thales-theorem|Thales' theorem]], so the midpoint of the hypotenuse is that circle's center and is one radius from every vertex: $$MA = MB = MC = \frac c2.$$

The converse holds too: a median equal to half its side forces a right angle, which is the forward direction of Thales' theorem read from the midpoint.

## How to use it
The moment a right angle appears, its vertex sits on a circle whose diameter is the opposite side, so the median to the hypotenuse, the distance from the right-angle vertex to the hypotenuse's midpoint, and the circumradius are all $\frac c2$. Legs $6$ and $8$ give a hypotenuse of $10$ and a median of $5$.

Read backwards, it detects right angles: a point whose distance to the midpoint of a segment equals half the segment sees that segment at $90^\circ$. It also combines with the [[perpendicular-bisector-locus|perpendicular bisector]], since the circumcenter lies on the perpendicular bisector of each leg.

## On contests
Four problems here, three of them AIME, one solved by it alone and each of the others with a different partner. It is often the hidden step that turns a messy right-triangle configuration into a clean circle: look for it when a problem gives a right angle and asks for a distance to a midpoint.
`,

"same-base-area-ratio": String.raw`
## Why it works
Area is half the base times the height, so two triangles on the same base compare exactly as their heights do.

The heights of $A$ and $C$ above the line $BD$ are legs of two right triangles that share the angle at $P$, formed by the diagonal $AC$ and the feet of the perpendiculars. Those right triangles are similar, so the heights are in the ratio of their hypotenuses, $AP : PC$. The figure at the top shows the two heights.

## How to use it
Whenever one segment cuts another, a cevian, a diagonal or two crossing chords, read the division ratio as a ratio of areas of triangles sharing a base, and back. If the diagonals of $ABCD$ meet at $P$ with $AP = 3$ and $PC = 5$, and $[ABD] = 12$, then $[CBD] = 12 \cdot \frac53 = 20$, and the quadrilateral's area is $32$.

Chaining several such ratios around a figure is the [[area-method|area method]], and assigning masses so the ratios balance is [[mass-points|mass points]]. Both replace similar-triangle bookkeeping with one-line comparisons.

## On contests
Five problems here, three of them AIME, none by it alone, and each with a different partner, which is typical of a step that sits inside other arguments. It is the quiet engine inside [[rouths-theorem|Routh's theorem]], [[cevas-theorem|Ceva's theorem]] and mass-point solutions, and when a figure is full of triangles sharing bases it usually beats coordinates.
`,

"angle-bisector-circumcircle": String.raw`## Why it works
The [[angle-bisector-theorem|bisector]] of $\angle A$ splits arc $BC$ into two equal arcs, so its second intersection $D$ is the arc midpoint and $DB = DC$. The similarity $\triangle ABL \sim \triangle ADC$ is a one-line angle chase: the bisected angle at $A$ is shared, and $\angle ABL = \angle ADC$ since both subtend arc $AC$ ([[inscribed-angle-theorem|inscribed angles on one arc]]). That gives $AB\cdot AC = AL\cdot AD$, while [[power-of-a-point|power of the point]] $L$ on chord $BC$ gives $LB\cdot LC = LA\cdot LD$.

## How to use it
When a bisector or its length meets the circumcircle, extend it to the arc midpoint $D$ and pick the relation you need: $AD = \dfrac{bc}{AL}$ recovers the whole chord, $LD = AD - AL$ gives the piece past $BC$, and $DB = DC = DI$ ([[incenter-excenter-lemma|Fact 5]]) ties $D$ to the incenter. Together they turn "bisector extended to the circumcircle" into pure length algebra.

## On contests
A recurring AIME configuration — the answer usually falls out of $AB\cdot AC = AL\cdot AD$ combined with [[angle-bisector-length|the bisector-length formula]]. The arc-midpoint fact $DB = DC$ also seeds many olympiad angle chases and incenter-excenter arguments.`,

"isogonal-conjugate": String.raw`## Why it works
Reflecting each [[cevas-theorem|cevian]] over its angle bisector is an involution on the directions through a vertex, and the trigonometric form of Ceva is symmetric under swapping each angle's two parts. So if $AP, BP, CP$ concur, the three reflected cevians satisfy the very same concurrency condition and meet at one point $P^*$. The shared pedal circle follows because the reflections send the six perpendicular feet onto a common circle centered at the midpoint of $PP^*$.

## How to use it
Recognize a pair rather than compute it: if a point is built by reflecting cevians over bisectors, its conjugate is often a familiar center. Swap a hard point for an easy one using $O \leftrightarrow H$, $G \leftrightarrow K$ ([[lemoine-point|symmedian point]]), incenter self-conjugate, and Fermat $\leftrightarrow$ isodynamic. The common pedal circle turns "these six feet are concyclic" into a one-word reason.

## On contests
Olympiad geometry, where naming an isogonal pair collapses a concurrency or collinearity to a known center. The symmedian — the isogonal of the median — is the most frequent special case at AIME level.`,

"pedal-triangle": String.raw`## Why it works
Writing each vertex of the pedal triangle as the projection of $P$ onto a side and expanding gives the area factor $\dfrac{|R^2 - OP^2|}{4R^2}$ directly. When $OP = R$ the factor is $0$: the three feet fall on a line — exactly the [[simson-line|Simson line]] — so Simson is just the pedal triangle degenerating.

## How to use it
Read the position of $P$ off the one area formula. $P$ on the circumcircle ($OP = R$) gives the degenerate Simson line; $P = O$ gives the [[medial-triangle|medial triangle]] (quarter area); $P = I$ gives the [[contact-triangle|contact triangle]]; $P = H$ gives the [[orthic-triangle|orthic triangle]]. When a problem drops perpendiculars to all three sides, find $OP$ and let the formula deliver the area.

## On contests
Simson-line problems and "area of the triangle formed by the three feet" questions on AIME/olympiad reduce to this single formula. Spotting that a configuration is a pedal triangle in disguise often replaces a page of coordinates with one substitution.`,

"orthic-triangle": String.raw`## Why it works
Each altitude foot sees the opposite side at a right angle, so pairs of feet are concyclic with the vertices; a short angle chase then yields the orthic angles $\pi - 2A$ and shows each orthic side is antiparallel to the matching side of $ABC$. The perimeter identity is $a\cos A = R\sin 2A$ summed with $\sin 2A + \sin 2B + \sin 2C = 4\sin A\sin B\sin C$, and the area factor $2\cos A\cos B\cos C$ comes from removing the three corner triangles.

## How to use it
Treat $H$ as the [[incenter-excenter-lemma|incenter]] of the orthic triangle: the altitudes of $ABC$ are its angle bisectors, which explains the reflect-$H$ facts and the Fagnano minimal-perimeter property. Use the perimeter $= \dfrac{2[ABC]}{R} = 4R\sin A\sin B\sin C$ and area $= 2\cos A\cos B\cos C\,[ABC]$ directly (the perimeter form is just $[ABC] = 2R^2\sin A\sin B\sin C$ rearranged; see [[trig-area|the trig-area formula]]), and recall the orthic triangle is inscribed in the [[nine-point-circle|nine-point circle]] (radius $\tfrac R2$). Turned inside out, the same configuration is the [[excentral-triangle|excentral triangle]]: $ABC$ is the orthic triangle of its own excentres. It is inscribed in the nine-point circle of radius $\frac R2$, each of its sides is antiparallel to the matching side of $ABC$, and it is the least-perimeter inscribed triangle, which is Fagnano's problem.

## On contests
The least-perimeter inscribed triangle (Fagnano) and the reflect-$H$-onto-the-circumcircle facts are the recurring AIME/olympiad uses. For an obtuse triangle, note that $H$ becomes an excenter of the orthic triangle instead — a frequent trap.`,

"medial-triangle": String.raw`## Why it works
The midpoints halve every side, so each of the four small triangles is similar to $ABC$ with ratio $\tfrac12$ (SAS on the midsegments) — hence quarter area and half perimeter apiece. The medial triangle is the image of $ABC$ under the [[homothety-monge|homothety]] centered at the centroid $G$ with ratio $-\tfrac12$, which is why $G$ is shared and the orientation flips.

## How to use it
Pass to the medial triangle to shrink a problem by a fixed factor, or read off incoming structure: its circumcircle is the [[nine-point-circle|nine-point circle]], its [[incenter-excenter-lemma|incenter]] is the [[spieker-point|Spieker point]], and the homothety $(G, -\tfrac12)$ sends centers of $ABC$ to centers of the medial triangle. The four-congruent-triangles picture also proves midsegment and area-quartering claims at a glance.

## On contests
"Connect the midpoints" configurations on AMC/AIME resolve through the quarter-area and homothety facts, and the nine-point-circle link is the bridge into Euler-line problems.`,

"triangle-13-14-15": String.raw`## Key forms
- $s = 21$ and $[ABC] = \sqrt{21 \cdot 8 \cdot 7 \cdot 6} = 84$, the smallest scalene triangle after $3$-$4$-$5$ with whole-number sides and a whole-number area
- the altitude to the side $14$ is $12$ and splits it into $5 + 9$, so the triangle is a $5$-$12$-$13$ and a $9$-$12$-$15$ right triangle glued along that altitude
- $r = \frac{A}{s} = 4$ and $R = \frac{abc}{4A} = \frac{65}{8}$; the exradii are $\frac{21}{2}$, $12$, $14$ opposite the sides $13$, $14$, $15$
- the cosines of the angles opposite $13$ and $15$ are $\frac{3}{5}$ and $\frac{5}{13}$, so both are angles you already know from the small Pythagorean triples

## Why it works
Everything follows from one accident: the foot of the altitude to the side of length $14$ lands at a lattice point. Placing that side from $(0,0)$ to $(14,0)$ and solving $x^2 + y^2 = 13^2$ against $(x-14)^2 + y^2 = 15^2$ gives $x = 5$, $y = 12$ — the two equations differ by a linear one, and here it happens to resolve to integers.

So the apex sits at $(5,12)$ and the triangle is literally two Pythagorean triples sharing a leg. [[herons-formula|Heron]] then has nothing left to do: $s - a$, $s - b$, $s - c$ are $8$, $7$, $6$, and $21 \cdot 8 \cdot 7 \cdot 6 = 7056 = 84^2$ comes out square. Once the area is rational every derived length is too, because $r$, $R$, the altitudes and the exradii are all ratios built from the sides and the area — $r = \frac{A}{s}$, $R = \frac{abc}{4A}$, $h_a = \frac{2A}{a}$, $r_a = \frac{A}{s-a}$.

The clean cosines are the same fact read through the [[law-of-cosines|law of cosines]]: $\cos = \frac{3}{5}$ opposite $13$ and $\frac{5}{13}$ opposite $15$ are exactly the angles of the two right triangles the altitude created. Checking $R$ against [[law-of-sines|the law of sines]] confirms it, $\frac{13}{2 \sin A} = \frac{13}{2 \cdot 4/5} = \frac{65}{8}$.

## How to use it
Recognize the triple and stop computing. If a problem hands you $13$, $14$, $15$ it is telling you the area is $84$, and usually it wants $r = 4$ or $R = \frac{65}{8}$ next. Dropping the altitude to the $14$ side converts any question about the interior into two right triangles with known legs, which is almost always faster than coordinates.

Watch for the triple in disguise: a similar copy scaled by $k$ has area $84k^2$, and problems sometimes give two sides and the area, expecting you to recover the third from $84$.

## On contests
This is the default scalene triangle for a problem that needs integer answers, and it appears far more often than chance would explain — on AMC and AIME alike, and especially in questions about the incircle or circumcircle of a triangle given by its three sides. It is the second member of the consecutive-integer family $3$-$4$-$5$, $13$-$14$-$15$, $51$-$52$-$53$, $193$-$194$-$195$, whose middle sides satisfy $x_{n+1} = 4x_n - x_{n-1}$; the areas run $6$, $84$, $1170$, $16296$. Only the first two are small enough to be worth memorizing.`,

"surface-shortest-path": String.raw`## Key forms
- unfold the faces the path crosses into a single plane and the shortest surface path becomes a straight segment — flattening a developable surface preserves lengths measured along it, so the segment's length is the true distance
- a box offers several unfoldings, so compute each and keep the smallest: for opposite corners of an $a\le b\le c$ box the minimum is $\sqrt{(a+b)^2+c^2}$ — computing only the obvious unfolding is the classic way to get the wrong minimum
- the space diagonal $\sqrt{a^2+b^2+c^2}$ is shorter but leaves the surface, which is the trap these problems are built around — read the problem carefully for whether the path must stay on the surface

## Why it works
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
Read a side-length ratio straight off as an area ratio, or the reverse. Because the three areas are the natural weights, they are exactly the incenter's [[barycentric-coordinates|barycentric coordinates]] $(a:b:c)$, so $I = \frac{aA+bB+cC}{a+b+c}$ — the quickest way to drop the incenter into a coordinate or vector bash. The same "join the point to the vertices" split works for any interior point, with the three sub-areas as its barycentric weights.

## On contests
AMC/AIME problems asking what fraction of the area a sub-triangle occupies, or needing incenter coordinates, use this directly; it is also the one-line derivation of $[ABC] = rs$ whenever you need $r$.`,

"orthocentric-system": String.raw`## Why it works
The defining relations are symmetric: $AH \perp BC$ also says $A$ lies on the altitude of $\triangle HBC$ from $A$, and running that around all sides shows each of the four points is the orthocenter of the triangle on the other three. Reflecting $H$ over side $BC$ lands on $\odot(ABC)$, so $\odot(HBC)$ is the mirror image of $\odot(ABC)$ across $BC$ — same radius $R$. And all four triangles share one [[nine-point-circle|nine-point circle]]: the midpoints of the six segments joining pairs of $\{A,B,C,H\}$, together with the three altitude feet, are the same nine points for every one of the four triangles.

## How to use it
Treat $H$ as a fourth vertex — any fact about a triangle and its circumcircle transfers to the other three triangles for free (reflect $H$ onto the circumcircle, or swap $H$ with a vertex to reuse a lemma). The four circumcenters $O_{ABC}, O_{HBC}, \dots$ form a second orthocentric system congruent to the first, and the common nine-point center is the midpoint of the whole configuration. Each of the four points is the orthocenter of the triangle on the other three, so every orthocenter property applies four times over in one figure.

## On contests
Olympiad configurations built on a triangle and its orthocenter simplify once you spot the symmetry; the shared nine-point circle also ties these to Euler-line and [[feuerbach-theorem|Feuerbach]] problems.`,

"common-chord-length": String.raw`## Why it works
Both endpoints of the common chord lie on each circle, so the segment is a chord of both, and the line of centers is its perpendicular bisector — meeting it at right angles at its midpoint. Writing the half-chord $h$ two ways, $h^2 = R^2 - d_1^2$ from one circle and $h^2 = r^2 - d_2^2$ from the other with $d_1 + d_2 = d$, and subtracting gives $d_1 = \frac{d^2 + R^2 - r^2}{2d}$ — which is just the location of the [[radical-axis|radical axis]].

## How to use it
Compute $d_1$ from the three lengths, then the chord is $2\sqrt{R^2 - d_1^2}$; you never need the intersection points. The same setup gives the distance between the two intersection points of any two circles, and using $d_2 = d - d_1$ gives a free check, since both circles must return the same half-chord. Real intersection requires $|R-r| \lt d \lt R+r$.

## On contests
A recurring AIME computation — "two circles meet; find their common chord" — and the workhorse behind lens/overlap-area problems, where the chord splits the lens into two circular segments.`,

"tangent-circles": String.raw`
## Why it works
At the point where two circles touch they share a tangent line, and both radii to that point are perpendicular to it, so both centers lie on one line through the touch point.

By [[tangent-facts|the radius-tangent property]], each center lies on the perpendicular to the common tangent through the touch point $T$. There is only one such perpendicular, so the two centers and $T$ are collinear.

Reading distances along that line gives the two cases. If the centers are on opposite sides of $T$, the circles sit outside each other; if they are on the same side, one circle is inside the other. So $$d = R + r \quad \text{(outside)}, \qquad d = R - r \quad \text{(inside)},$$ as in the two figures at the top.

The same number classifies every position of two circles. Pulling the centers apart from external tangency separates the circles, so $d \gt R + r$ means no common point; pushing them together past it makes them cross in two points, until they reach internal tangency at $d = R - r$; closer still, one circle lies inside the other without touching.

{{figure:positions}}

## How to use it
Whenever a problem says "tangent", immediately write the center-distance equation, which is usually the only algebra the tangency contributes. Internal tangency is the case people drop, so check which circle contains which before choosing $R + r$ or $R - r$.

In a chain or packing of mutually tangent circles you get one equation per tangent pair, and the unknown radii fall out; combining them with the [[pythagorean-theorem|Pythagorean theorem]] on the triangle of centers handles most configurations without coordinates.

For two circles resting on a line and touching each other, the centers are $R + r$ apart and differ in height by $R - r$, so their points of contact with the line are $$\sqrt{(R + r)^2 - (R - r)^2} = 2\sqrt{Rr}$$ apart. For four mutually tangent circles, [[descartes-circle-theorem|Descartes' circle theorem]] packages the whole system into one identity about curvatures.

Nothing in the argument is two-dimensional, so tangent spheres obey the same rule: a ball of radius $r$ rolling inside a sphere of radius $R$ keeps its center on a sphere of radius $R - r$, which is how a three-dimensional tangency problem collapses to one length.

## On contests
A staple of AMC circle problems and the opening line of most AIME circle-packing setups: 19 problems are tagged here, and in 9 of them the next step is [[pythagorean-theorem|the Pythagorean theorem]] on a triangle of centers. It also supplies the existence conditions quoted by [[common-chord-length|the common-chord formula]] and [[common-tangent-lengths|common tangent lengths]]: two circles meet in two points exactly when $|R - r| \lt d \lt R + r$, and the tangent cases are the boundary.
`,

"incircle-excircle-touch": String.raw`## Why it works
Equal tangents from a vertex fix the incircle contact distances: the two tangents from $B$ are equal, forcing the touch point on $BC$ to be $s-b$ from $B$. The $A$-excircle (opposite $A$) touches $BC$ with the roles of $b$ and $c$ swapped, at $s-c$ from $B$. Since $(s-b) + (s-c) = a$, those two points average to $\tfrac a2$ — the midpoint $M$ of $BC$ — so they are reflections of each other in $M$, a distance $(s-b) - (s-c) = |b-c|$ apart.

## How to use it
Place both contact points instantly from the side lengths, and use $M$ as their shared midpoint to relate incircle and excircle configurations. The gap $|b-c|$ measures how far from isosceles the triangle is; it is $0$ exactly when $b = c$, where both circles touch $BC$ at its midpoint.

## On contests
Useful whenever a problem mixes the incircle and an excircle on one side, or asks for the distance between contact points; it also pairs with the reflection facts used in mixtilinear-incircle and $A$-excircle lemmas.`,

"integer-triangles-perimeter": String.raw`## Why it works
Count triples ordered by size, $a\le b\le c$, with $a+b+c=n$ and the single binding constraint $a+b\gt c$ — equivalently $c\lt n/2$, since the other two inequalities are automatic once the sides are sorted. Fix the longest side $c$; then $a+b=n-c$ with $a\le b\le c$, a short run of $(a,b)$ to count. Summing the counts over the allowed $c$ gives a quadratic in $n$, and it collapses to the nearest integer to $n^2/48$ for even $n$ (and $(n+3)^2/48$ for odd $n$) — Alcuin's sequence.

## How to use it
For a specific small $n$, skip the closed form and just sweep: let $c$ run from $\lceil n/3\rceil$ up to $\lfloor (n-1)/2\rfloor$ and count valid $(a,b)$ for each. The rounded formula is the quick check on a full count. Variants adjust the same sweep — require distinct sides ($a\lt b\lt c$), a fixed shape (isosceles, right), or a cap on a side — by changing only the inner count.

## On contests
"How many triangles with integer sides and perimeter $n$" is a recurring MATHCOUNTS/AMC question. The fix-the-longest-side sweep is reliable under time pressure, and the round-to-nearest formula lets you confirm the answer in one line.`,

"equal-chords-arcs": String.raw`## Why it works
All three conditions come from the same congruent triangles at the center. A [[chord-length|chord]] of length $\ell$ at distance $d$ from the center $O$ (radius $R$) satisfies $\ell=2\sqrt{R^2-d^2}$, so $\ell$ and $d$ determine each other; equal chords force equal $d$ and conversely. The isosceles triangles formed by $O$ and a chord's endpoints subtend equal central angles when the chords are equal, and equal central angles cut equal arcs — so "equal chords," "equal arcs," and "equal distance from center" are one fact viewed three ways.

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

"regular-octahedron": String.raw`## Why it works
The horizontal plane through the four equatorial vertices is a square of side $s$ (its diagonals are a pair of opposite octahedron edges). Above and below it sit two congruent square pyramids; each apex lies over the square's center at height $\frac{s}{\sqrt{2}}$ — half a face diagonal — so $V = 2\cdot\frac13 s^2\cdot\frac{s}{\sqrt{2}} = \frac{s^3\sqrt{2}}{3}$. All eight faces are equilateral, giving $SA = 8\cdot\frac{\sqrt{3}}{4}s^2 = 2\sqrt{3}\,s^2$.

## How to use it
Cut the octahedron into its two pyramids and every length, the volume, and both radii fall out of one square and one right triangle. Duality with the cube is the other lever: put the six vertices at $(\pm a,0,0), (0,\pm a,0), (0,0,\pm a)$ (edge $s = a\sqrt{2}$) and coordinate-bash. Inscribing an octahedron in a cube (vertices at the cube's face centers), or a cube in an octahedron, are both one-line consequences.

## On contests
A recurring AMC/AIME solid: the equatorial-square and face-parallel hexagonal cross-sections, volume ratios against an inscribing or inscribed cube or tetrahedron, and "paint or slice the octahedron" problems. Keep two facts ready — $V_{\text{oct}} = 4V_{\text{tet}}$ at equal edge, and that the cube and octahedron are duals so their vertex and face counts swap ($6 \leftrightarrow 8$).`

});

Object.assign(window.MATH_DETAILS, {

"perp-to-angle-bisector": String.raw`## Key forms
- reflect $B$ across the bisector of angle $A$ — the image $B'$ lies on line $AC$ with $AB' = AB$, and the perpendicular from $B$ meets the bisector at $F$, the midpoint of $BB'$
- $\triangle AB'D \cong \triangle ABD$, with $D$ where the bisector meets $BC$ — $D$ is fixed, so $B'D = BD$ and $\angle AB'D = \angle ABD$, and the leftover piece of $AC$ is $B'C = |b - c|$
- $BF = c\sin\frac A2$ — read off the right triangle $ABF$, so $BB' = 2c\sin\frac A2$
- $FM = \frac{|b-c|}{2}$ with $FM \parallel AC$ — the midline of triangle $BB'C$, where $M$ is the midpoint of $BC$

## Why it works
Reflecting across a line swaps the two sides of any angle that the line bisects. The bisector of angle $A$ makes equal angles with $AB$ and $AC$, so it reflects ray $AB$ onto ray $AC$, and $B$ lands at the point $B'$ of $AC$ with $AB' = AB$. The segment $BB'$ is perpendicular to the mirror and cut in half by it, so the foot $F$ of the perpendicular from $B$ is the midpoint of $BB'$.

In the right triangle $ABF$ the angle at $A$ is $\frac A2$, so $$BF = c\sin\tfrac A2.$$

Everything on the mirror stays put, in particular the point $D$ where the bisector meets $BC$, so the reflection carries triangle $ABD$ onto triangle $AB'D$: $$AB' = AB, \qquad B'D = BD, \qquad \angle AB'D = \angle ABD.$$ Two isosceles triangles come with it, $ABB'$ and $DBB'$, both with the bisector as their axis.

{{figure:copy}}

$B'$ lies on line $AC$ at distance $c$ from $A$, so $B'C = |b - c|$. $F$ is the midpoint of $BB'$ and $M$ is the midpoint of $BC$, so $FM$ joins two midpoints of triangle $BB'C$: $$FM \parallel AC, \qquad FM = \frac{|b - c|}{2}.$$ The figure at the top shows the midline.

## How to use it
When a perpendicular is dropped from a vertex to a bisector, or a bisector comes with a condition on lengths, reflect the vertex across it: extend the perpendicular to twice its length, and the far end sits on the other side line, at the same distance from the vertex. The angle condition becomes equal lengths, and the rest of the problem usually lives in the leftover triangle near $C$.

The classic example: if $AB + BD = AC$, then $\angle B = 2\angle C$. The reflection gives $$B'C = AC - AB = BD = B'D,$$ so triangle $B'DC$ is isosceles, with base angles equal to $\angle C$. Its exterior angle at $B'$ is $2\angle C$, and that angle is the reflected copy of $\angle B$.

{{figure:twice}}

When the question is about the foot $F$, the midline $FM$ locates it, with a length that depends only on the difference of the two sides. Any point of the bisector works in place of $D$, which is why the move also handles two bisectors meeting at a point: reflecting across each one copies the distances from their common point.

The external bisector works the same way, except that the reflected point lands on $AC$ extended beyond $A$. Then $B'C = b + c$, and the midline is $\frac{b + c}{2}$.

{{figure:external}}

The midline is a [[parallel-line-similarity|parallel line]] that the construction draws for free, and the same reflection gives a proof of the [[angle-bisector-theorem|angle bisector theorem]] with no trigonometry.

## On contests
Two problems here, both AIME, neither solved by it alone. In trapezoids, the bisectors of the two angles on one leg meet at a right angle and their meeting point lies on the midline, since a bisector crossed by a parallel line cuts off an isosceles triangle. Where two angle bisectors meet at a point, reflecting across each copies the distances from that point and leaves an isosceles triangle for an [[angle-chasing|angle chase]].

In olympiad geometry, a bisector together with a sum of lengths almost always means reflect.
`,

"isotomic-conjugate": String.raw`## Why it works
Reflecting each [[cevas-theorem|cevian]] foot over its side's midpoint is an involution on that side, so by the isotomic form of Ceva's theorem the reflected cevians concur exactly when the originals do — defining the conjugate $P^*$. In normalized barycentrics it is just $(x:y:z) \mapsto (1/x : 1/y : 1/z)$.

## How to use it
Use the pairing to transfer results for free: the centroid is self-conjugate, and the Gergonne and [[gergonne-nagel-points|Nagel points]] are an isotomic pair, so a fact about one hands you the other. Compute with [[barycentric-coordinates|barycentric]] reciprocals, and pair it with isogonal conjugation when a problem mixes "reflect over the midpoint" and "reflect over the bisector."

## On contests
An advanced/olympiad triangle-center tool; recognizing an isotomic pair often collapses a two-point problem into one, and the reciprocal barycentric form makes it a clean bash.`,

"contact-triangle": String.raw`## Why it works
Equal tangents from each vertex cut the sides into the classic lengths $s-a,\ s-b,\ s-c$, and the three tangency points lie on the incircle — so the incircle is the contact triangle's circumcircle (radius $r$). Each contact-triangle angle is $\frac{\pi}{2}-\frac{A}{2}$, the inscribed angle on the arc between two tangency points, and the law of sines in that circle then gives its sides as $2r\cos\frac A2$, $2r\cos\frac B2$, $2r\cos\frac C2$.

## How to use it
Reach for $s-a,\ s-b,\ s-c$ whenever the incircle touches the sides — they linearize almost every incircle-length computation. The cevians to the contact points concur at the [[gergonne-nagel-points|Gergonne point]], and the area ratio $\frac{r}{2R}$ converts between the contact triangle and $ABC$.

## On contests
Standard at AIME and olympiad level for incircle-tangency lengths and Gergonne-point configurations; the $s-a$ substitution is one of the most reused moves in all of triangle geometry.`,

"excentral-triangle": String.raw`## Why it works
Internal and external bisectors are perpendicular, so the [[incenter-excenter-lemma|incenter]] $I$ is the orthocenter of $I_AI_BI_C$ and $ABC$ is exactly its orthic (altitude-feet) triangle. That perpendicularity also yields the angles $\frac{\pi}{2}-\frac{A}{2}$, the sides $4R\cos\frac{A}{2}$ (so $I_AI_B=4R\cos\frac C2$), and circumradius $2R$. Its area follows as $2Rs=\frac{abc}{2r}=8R^2\cos\frac A2\cos\frac B2\cos\frac C2$.

## How to use it
Flip the usual orthic relationship: treat $ABC$ as the [[orthic-triangle|orthic triangle]] of the excenters to import the full orthocentric toolkit (reflections, the [[nine-point-circle|nine-point circle]]). In particular the circumcircle of $ABC$ is the nine-point circle of the excentral triangle, tying the two figures together. Equivalently $ABC$ is the orthic triangle of this one, so every orthic-triangle fact transfers by renaming.

## On contests
An olympiad configuration for excenter and bisector problems; spotting "$ABC$ is the orthic triangle of its excenters" unlocks every orthocenter fact you already know.`,

"reims-theorem": String.raw`## Why it works
Two circles meet at $P,Q$; a line through $P$ hits them at $A,C$ and a line through $Q$ hits them at $B,D$. Inscribed angles on the shared chords give $\angle BAP = \angle BQP$ and $\angle DCP = \angle DQP$; since $A,P,C$ and $B,Q,D$ are each collinear, those are corresponding angles for $AB$ and $CD$ cut by transversal $AC$, forcing $AB \parallel CD$. Reversing the chase gives the converse.

## How to use it
Treat it as the bridge between "parallel" and "concyclic": when two circles cross and lines through the intersection points cut them, parallel chords and four concyclic points are interchangeable. It pairs naturally with spiral-similarity and radical-axis arguments.

## On contests
A workhorse olympiad angle-chasing lemma; whenever two circles meet at two points, Reim's is the first thing to try for a parallelism or a hidden cyclic quadrilateral.`,

"mixtilinear-incircle": String.raw`## Why it works
The [[homothety-monge|homothety]] at the tangency point $T$ that carries the mixtilinear incircle to the circumcircle sends its two side-contact points to arc midpoints — which is why $T$, the incenter $I$, and the midpoint of arc $BAC$ are collinear, and why $I$ is the midpoint of the chord the circle cuts on $AB$ and $AC$.

## How to use it
Trigger on "circle tangent to two sides and internally to the circumcircle." The collinearity through $I$ and the arc midpoint pins $T$, and the incenter-as-chord-midpoint fact converts the tangencies into lengths; homothety at $T$ links the incircle and circumcircle.

## On contests
A recurring olympiad configuration (and a few hard prep/AIME problems); the tangency point $T$ and its collinearities are the usual keys to unlocking it.`,

"descartes-sphere-theorem": String.raw`## Why it works
It is the $n=3$ case of the Soddy–Gosset relation $\left(\sum k_i\right)^2 = n\sum k_i^2$: in $n$ dimensions, $n+2$ mutually tangent spheres have curvatures obeying that quadratic. [[descartes-circle-theorem|The Descartes Circle Theorem]] is the $n=2$ instance of the very same identity.

## How to use it
With four mutually tangent spheres known, solve the quadratic for the fifth; its two roots are the small sphere filling the central gap and the large sphere enclosing the rest (negative curvature). A flat plane counts as curvature $0$ and an enclosing sphere as negative, exactly as in 2D.

## On contests
Rare and AIME-hard to olympiad; it shows up in "sphere in the gap of four mutually tangent spheres" problems, structurally identical to the 2D Descartes circle setups.`,

"brianchon-theorem": String.raw`## Why it works
It is the projective dual of [[pascals-theorem|Pascal's theorem]]: swap "point on the conic" for "tangent line" and "collinear" for "concurrent," and Pascal's collinearity becomes Brianchon's concurrency. Any proof of Pascal dualizes into a proof of Brianchon.

## How to use it
Apply it to a hexagon whose six sides are all tangent to one conic (often an incircle or inscribed circle) to force the three main diagonals to concur. Merging adjacent tangency points degenerates it to tangential pentagons and quadrilaterals — that is where the Gergonne point of a tangential triangle comes from. It is the projective dual of Pascal's theorem: dualising the inscribed hexagon and its collinear intersections gives the circumscribed hexagon and its concurrent diagonals.

## On contests
An olympiad tool for tangential-polygon concurrency; "everything is tangent to one circle" is the cue to reach for Brianchon instead of grinding [[cevas-theorem|Ceva]].`,

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
$(A,B;C,D) = -1$ says $C$ and $D$ divide $AB$ internally and externally in the same ratio $\frac{AC}{CB} = \frac{AD}{DB}$; the minus sign is exactly the record that one division is internal and the other external. It is the most symmetric [[cross-ratio|cross-ratio]] value, fixed when $C$ and $D$ are swapped.

## How to use it
Harmonic bundles sit at fixed spots: two tangents plus a secant from an external point cut the polar harmonically; the internal and external bisectors from a vertex meet the opposite line at harmonic conjugates; a complete quadrilateral's diagonal is cut harmonically. Recognizing $-1$ lets you invoke pole–polar and projection machinery.

## On contests
Everywhere in olympiad projective configurations, especially pole–polar and Apollonius-circle problems; "show this bundle is harmonic" is a standard intermediate goal.`,

"inversion-properties": String.raw`## Key forms
- inversion about $O$ with radius $r$ sends $P$ to the point $P^*$ on ray $OP$ with $OP\cdot OP^*=r^2$, so it swaps the inside and outside of the circle and is its own inverse — swapping inside for outside is what turns a hard configuration into an easy one, and back again at the end
- it maps the family of lines and circles to itself: a line through $O$ stays put, a line missing $O$ becomes a circle through $O$ and back again, and a circle missing $O$ becomes a circle — which is why inverting at a busy point straightens circles into lines
- distances transform by $P^*Q^*=\frac{r^2\,PQ}{OP\cdot OQ}$, and since the map is conformal it preserves angles and tangency — so incidence survives and can be read back after solving the easy picture
- choosing the center is the whole art: invert where many circles meet, and a chain of mutually [[tangent-circles|tangent circles]] becomes equal circles stacked between two parallel lines — invert at the busiest point, since every circle through the center straightens into a line

## Why it works
Inversion fixes each ray from $O$ and sends $P$ to $P^*$ with $OP\cdot OP^* = r^2$ — an involution whose similar triangles $OPQ \sim OQ^*P^*$ give the distance rule $P^*Q^* = \frac{r^2\,PQ}{OP\cdot OQ}$. It preserves the class of "lines and circles" (generalized circles), and being conformal it preserves angles and tangency, so incidence survives the map.

## How to use it
Invert at a busy point to simplify: every circle through the center straightens into a line, so two circles tangent at $O$ become parallel lines and a chain tangent to both becomes equal circles stacked between them. A circle orthogonal to the circle of inversion maps to itself. Solve the easy straight-line picture, then convert lengths back with $P^*Q^* = \frac{r^2\,PQ}{OP\cdot OQ}$. Choosing $O$ where many circles meet is the whole art. Distances scale by $P^*Q^* = \frac{r^2\,PQ}{OP \cdot OQ}$, which is the basis of inversion-distance computations. Centring $O$ at a busy point collapses tangency and concyclicity into straight-line problems, and inverting at a point of tangency turns a chain of mutually tangent circles into a row of parallel lines, the Steiner-chain trick.

## On contests
The heavy artillery for tangent-circle chains — Steiner chains, Descartes / Apollonian gaskets, arbelos, and "radius of the $n$-th circle" problems. [[ptolemys-inequality|Ptolemy's inequality]] and [[caseys-theorem|Casey's theorem]] are inversion facts in disguise, so a messy problem resembling them is the cue to invert ("invert at $A$" being the classic opening move).`,

"complete-quadrilateral-miquel": String.raw`## Why it works
Four lines in general position give four triangles (three lines at a time); repeated use of the Miquel-point lemma forces their four circumcircles through one common point $M$. Equivalently $M$ is the center of the [[spiral-similarity|spiral similarity]] carrying one pair of opposite sides onto the other.

## How to use it
When four lines (two pairs of opposite sides plus the diagonals) appear, find $M$ as the second intersection of two of the four circumcircles — it is usually the hidden center that makes a spiral-similarity or concyclicity claim fall out. The three diagonal midpoints are collinear on the associated [[newtons-line|Newton–Gauss line]]. Two further facts make the configuration worth recognizing: the four circumcenters together with $M$ lie on one circle, and this is the four-line cousin of the triangle Miquel theorem, where the points are chosen on the sides of a single triangle instead.

## On contests
A staple olympiad configuration; recognizing a complete quadrilateral and naming its [[miquels-theorem|Miquel]] point is frequently the decisive first step.`,

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
A recurring optimization one-liner on AMC and early AIME problems — knowing the maximum is exactly half the triangle's area (and where the rectangle sits) skips the calculus entirely.`,

"triangle-sin2-sum-ratio": String.raw`## Why it works
Both halves factor, and almost everything cancels. Using $A+B+C=180^\circ$, the numerator collapses to $4\sin A\sin B\sin C$ and the denominator to $4\cos\frac A2\cos\frac B2\cos\frac C2$. Writing $\sin A = 2\sin\frac A2\cos\frac A2$ in the numerator lets every cosine cancel, leaving $8\sin\frac A2\sin\frac B2\sin\frac C2$. That product is the standard $\frac{r}{4R}$, so the ratio is $8\cdot\frac{r}{4R} = \frac{2r}{R}$.

## How to use it
Reach for it when an expression mixes $\sin 2A$ terms with $\sin A$ terms in the same triangle — the quotient is a constant of the triangle, not something you need to expand. It also runs backwards: knowing the ratio pins down $\frac{r}{R}$, and $\frac{r}{R} \le \frac12$ (equality only for the equilateral triangle) turns it into a bound. The two factorizations are worth knowing separately, since each shows up on its own.

## On contests
Rare as a stated problem, common as the last step of one. If a computation leaves you holding $\frac{\sin 2A+\sin 2B+\sin 2C}{\sin A+\sin B+\sin C}$, stop expanding and substitute $\frac{2r}{R}$. Most appearances are AIME-and-up, usually where the answer is meant to come out in terms of $r$ and $R$.`,

"half-angle-tangent-identity": String.raw`## Why it works
The half-angles sum to $90^\circ$, so $\frac{A+B}{2}$ and $\frac C2$ are complementary: $\tan\frac{A+B}{2} = \cot\frac C2$. Expanding the left side with the tangent addition formula and clearing denominators gives exactly the symmetric relation. Nothing about triangles is used beyond the angle sum, so the identity holds for any three angles summing to $180^\circ$.

## How to use it
Its real value is as a constraint. Substituting $\tan\frac A2 = \frac{r}{s-a}$ turns it into $r^2\left[\frac{1}{(s-a)(s-b)} + \frac{1}{(s-b)(s-c)} + \frac{1}{(s-c)(s-a)}\right] = 1$, i.e. $r^2 s = (s-a)(s-b)(s-c)$ — [[herons-formula|Heron's formula]] in disguise. So it is a way to eliminate the angles from a problem stated in $r$ and $s$, or to supply the third equation when two half-angle tangents are known.

## On contests
Treat it as the half-angle analogue of $\tan A + \tan B + \tan C = \tan A\tan B\tan C$: a symmetric relation to invoke once you see half-angle tangents appearing together. It turns up in AIME-level triangle problems that mix the incircle with trigonometry, and in olympiad substitutions where $x=\tan\frac A2$ parametrizes the triangle.`,

"line-forms": String.raw`
## Why it works
All four forms say the same thing: the slope between any point $(x, y)$ of the line and one known point is constant.

With a known point $(x_1, y_1)$ and slope $m$, the condition $$\frac{y - y_1}{x - x_1} = m$$ with the denominator cleared is point-slope form. Expanding it gives slope-intercept form, collecting terms gives standard form, and dividing standard form by $C$, when $C \ne 0$, gives intercept form. Vertical lines have no slope, and only standard form can write them, as $x = k$.

In standard form the coefficients carry the geometry. For two points of the line, subtracting their equations gives $A\,\Delta x + B\,\Delta y = 0$, so $(A, B)$ is perpendicular to every direction along the line, and $(B, -A)$ points along it.

{{figure:normal}}

## How to use it
Match the form to what you are handed. Given a slope and a point, write point-slope and stop. Given two points, compute the slope first: through $(2, 5)$ and $(6, 13)$, $m = 2$, so $$y - 5 = 2(x - 2), \qquad y = 2x + 1, \qquad 2x - y = -1.$$ Given intercepts $a$ and $b$, write $\frac xa + \frac yb = 1$ directly; the triangle it cuts off with the axes has area $\frac{|ab|}{2}$.

Standard form with integer, coprime coefficients is the one for number theory, since counting the lattice points on a line becomes a linear Diophantine equation. Its normal vector also feeds the [[point-line-distance|point-to-line distance]] and reflection formulas.

## On contests
Four problems here, mostly AMC, two solved by it alone; two others describe the line in [[complex-basics|complex numbers]]. It is bedrock at MATHCOUNTS and AMC 10, where converting between forms is usually the real skill being tested.
`,

"plane-intercept-form": String.raw`
## Why it works
Each intercept satisfies the equation, and three points that are not on one line determine a plane.

Substituting $(a, 0, 0)$ gives $\frac aa + 0 + 0 = 1$, and the same happens at the other two intercepts. The equation is linear, so it describes a plane, and three non-collinear points fix exactly one plane, so this is the plane through the intercepts, shown in the figure at the top. It is the three-dimensional copy of the intercept form of a line, $\frac xa + \frac yb = 1$.

The form fails only for a plane through the origin or parallel to an axis, since then an intercept is $0$ or does not exist.

## How to use it
When a problem names where a plane crosses the axes, write the intercept form straight down instead of solving for $Ax + By + Cz = D$. Clearing denominators gives $$bc\,x + ca\,y + ab\,z = abc,$$ so the normal vector is $(bc, ca, ab)$, which gives the angle between two planes or the [[point-plane-distance|distance from a point]]. From the origin that distance is $\frac{abc}{\sqrt{a^2b^2 + b^2c^2 + c^2a^2}}$.

Going the other way, a plane $Ax + By + Cz = D$ with $D \ne 0$ has intercepts $\frac DA$, $\frac DB$ and $\frac DC$: divide through by $D$.

The tetrahedron cut from the first octant has three perpendicular edges $a$, $b$, $c$ at the origin, so its volume is $\frac{abc}{6}$, which turns many "a plane slices off a corner" questions into one multiplication.

## On contests
Three problems here, all AIME, none solved by it alone, and all three set up [[coordinate-bash|coordinates]] first. The usual shape asks for the plane through three given points on the edges of a cube or a pyramid and then the cross-section it cuts; a harder one needs the plane through several lifted sphere centers. For the area of a corner's cut face, [[de-guas-theorem|De Gua's theorem]] pairs with it.`,

"harmonic-quadrilateral": String.raw`## Why it works
Let the tangents at $B$ and $C$ meet at $X$, let $AX$ meet the circumcircle again at $D$, and let $E = AD \cap BC$.

Tangent lengths from a common point are equal, so $XB = XC$. The power of $X$ with respect to the circle is $XB^2$, and the line through $X$, $A$, $D$ gives that same power as $XA \cdot XD$. Hence $XB^2 = XA \cdot XD$, which rearranges to $\frac{XB}{XA} = \frac{XD}{XB}$. Triangles $XBA$ and $XDB$ share the angle at $X$ and have their two adjacent sides in that proportion, so they are similar. Replacing $B$ by $C$ and using $XC = XB$ gives $\triangle XCA \sim \triangle XDC$ in exactly the same way.

Read the ratios off the two similarities: $\frac{AB}{BD} = \frac{XA}{XB}$ and $\frac{AC}{CD} = \frac{XA}{XC}$. Since $XB = XC$, the two right-hand sides are equal, so $\frac{AB}{BD} = \frac{AC}{CD}$, that is $AB \cdot CD = AC \cdot BD$. A cyclic quadrilateral satisfying this is called harmonic.

For the side ratio, $E$ lies on $BC$, and triangles $ABE$ and $ACE$ share the apex $A$, so $\frac{BE}{CE} = \frac{[ABE]}{[ACE]} = \frac{AB \cdot AE \sin\angle BAE}{AC \cdot AE \sin\angle CAE}$. The inscribed angles $\angle BAD$ and $\angle CAD$ subtend $BD$ and $CD$, so their sines are in ratio $\frac{BD}{CD} = \frac{AB}{AC}$. Substituting gives $\frac{BE}{CE} = \frac{AB}{AC}\cdot\frac{AB}{AC} = \left(\frac{AB}{AC}\right)^2$, which is the [[symmedian-lemoine|symmedian's]] defining split.

Every step is reversible, so the harmonic condition, the squared side ratio, and "$AD$ is the symmedian" are three names for one situation.

## How to use it
The configuration in five lines, which is all you need at the table:

- the tangents at $B$ and $C$ meet at the pole $X$ of $BC$, and $AX$ is the $A$-symmedian — this is the sighting that appears most often, since a problem will draw the tangents and never say the word symmedian
- $XB = XC$ and $XB^2 = XA\cdot XD$ — equal tangent lengths plus [[power-of-a-point|power of a point]], which together produce both similar triangles
- $\triangle XBA \sim \triangle XDB$ and $\triangle XCA \sim \triangle XDC$ — the shared angle at $X$ with the ratio $\frac{XB}{XA}=\frac{XD}{XB}$ gives the first, and the identical argument at $C$ gives the second
- $\dfrac{BD}{CD} = \dfrac{AB}{AC}$, equivalently $AB\cdot CD = AC\cdot BD$ — the harmonic condition, and it holds if and only if $AD$ is the symmedian
- $\dfrac{BE}{CE} = \left(\dfrac{AB}{AC}\right)^{2}$ where $E = AD \cap BC$ — the same statement read on the side instead of on the circle

Treat the tangents as the trigger. Whenever a problem draws the tangents to the circumcircle at two vertices and takes a line from the third, that line is a symmedian, and everything above becomes available without further work.

From there, pick whichever of the three forms matches the question. If you need a length on the circle, use $\frac{BD}{CD} = \frac{AB}{AC}$. If you need a length on $BC$, use $\frac{BE}{CE} = \left(\frac{AB}{AC}\right)^2$. If you need $AE$ or $AD$ themselves, use the similar triangles directly, or the power of the point $E$, since $BE \cdot EC = AE \cdot ED$.

Running it backwards is the olympiad use. To prove a given line is a symmedian, it suffices to prove the quadrilateral it cuts is harmonic, and that is often easier than chasing the reflection over the bisector.

## On contests
A recurring AIME configuration has the tangents at $B$ and $C$ meeting at a point, and a line from $A$ through that point crossing the circle again. Recognizing the symmedian gives the ratio structure at once, and even without the name, power of a point plus these similar triangles recovers everything. At olympiad level the harmonic form is the more common one, usually as a step toward a projective or inversive finish.`,

"lemoine-point": String.raw`## Why it works
Each [[symmedian-lemoine|symmedian]] is the locus of points whose distances to the two sides at its vertex are in the ratio of those sides. The $A$-symmedian gives $\frac{d_c}{d_b} = \frac{c}{b}$, the $B$-symmedian gives $\frac{d_a}{d_c} = \frac{a}{c}$, and the third is then forced. A point on all three therefore has $d_a : d_b : d_c = a : b : c$, and since the three loci are the reflections of the three medians in the three bisectors, they concur exactly because the medians do; concurrency is preserved by isogonal conjugation.

The minimization follows from the [[pedal-triangle|pedal triangle]]. If $P$ has pedal triangle $P_aP_bP_c$, then $a\,d_a + b\,d_b + c\,d_c = 2[ABC]$ is constant, so minimizing $d_a^2 + d_b^2 + d_c^2$ subject to a fixed weighted sum forces the $d_i$ proportional to the weights $a, b, c$ by Cauchy–Schwarz, with equality exactly at $K$.

## How to use it
Everything about $K$ in five lines:

- $K = (a^2 : b^2 : c^2)$ in [[barycentric-coordinates|barycentric coordinates]] — the compact form that encodes every property below
- $d_a : d_b : d_c = a : b : c$ — its distances to the three sides are proportional to those sides, which follows from each symmedian being the locus of a fixed distance ratio
- $K$ minimizes $d_a^2 + d_b^2 + d_c^2$ over the whole plane — the property it is usually defined by, and the reason it turns up in optimisation problems
- $K$ is the centroid of its own pedal triangle — the cleanest proof of that minimization
- $K$ is the [[isogonal-conjugate|isogonal conjugate]] of the centroid $G$ — another way of saying the symmedians are the reflections of the medians

Reach for the barycentric coordinates first. $(a^2 : b^2 : c^2)$ makes any incidence or ratio question about $K$ a short computation, and it is how the point is usually identified in a configuration that never names it.

The distance property is the one to recognize in disguise. A problem asking for the point minimizing the sum of squared distances to the three sides, or describing a point whose distances to the sides are proportional to the sides, is describing $K$ whether or not it says so.

Remember the conjugate pairing, since $K$ and $G$ swap under isogonal conjugation, as do the incenter with itself and the circumcenter with the orthocenter. A problem that pairs a median fact with a symmedian fact is usually asking you to notice that.

## On contests
Rare, and almost always olympiad rather than AIME. When it appears it is either as the concurrency point in a configuration full of symmedians, or as the answer to a minimization phrased in terms of distances to the sides. In both cases the barycentric coordinates are the shortest route.`,

"spieker-point": String.raw`## Why it works
The [[medial-triangle|medial triangle]] is the image of $ABC$ under the [[homothety-monge|homothety]] centered at $G$ with ratio $-\frac12$. Homothety carries [[incenter-excenter-lemma|incenter]] to incenter, so the incenter $I$ of $ABC$ maps to the incenter of the medial triangle, which is the Spieker point $S$. The same map scales the inradius by $\frac12$, so the Spieker circle has radius $\frac r2$.

The perimeter-centroid description is the one worth understanding, because it explains why the point is not $G$. Replace each side by a uniform rod of mass equal to its length, placed at the side's midpoint. The center of mass of the three rods is $\frac{a M_a + b M_b + c M_c}{a+b+c}$, and substituting $M_a = \frac{B+C}{2}$ and its partners gives weights proportional to $b+c$, $c+a$, $a+b$, which is the [[barycentric-coordinates|barycentric]] form. Mass distributed along the boundary balances at $S$; mass spread over the area balances at $G$; they are different points for any non-equilateral triangle.

Collinearity on the Nagel line follows from the homothety too: it sends $I$ to $S$ and $N$ to $I$, so $I$, $G$, $S$ and $N$ all lie on one line, with $S$ the midpoint of $IN$ and $IG : GN = 1 : 2$.

## How to use it
Recognize it by either description. A problem about the incircle of the medial triangle, or about balancing the perimeter rather than the region, is about $S$ whether or not it names it. The barycentric form $(b+c : c+a : a+b)$ then answers ratio and collinearity questions directly.

The Nagel line is the usual route into a problem. Knowing $S$ is the midpoint of $IN$ turns a question about the Nagel point into one about the incenter, and the $1 : 2$ split at $G$ mirrors [[euler-line-ratio|the Euler line]]'s, which is what makes the two lines easy to confuse and worth keeping straight: Euler carries $O$, $G$, $H$; Nagel carries $I$, $G$, $S$, $N$.

Cleavers are the other sighting. A cleaver is a segment from a side's midpoint that bisects the perimeter, and all three cleavers pass through $S$, which is the perimeter analogue of the medians meeting at $G$.

## On contests
Uncommon, and when it appears it is usually olympiad-level or a configuration problem that hands you the medial triangle's incircle without naming it. The fact most likely to be useful is the radius $\frac r2$, followed by the midpoint-of-$IN$ relation.`,

"mobius-transformations": String.raw`## Why it works
Split $f(z)=\frac{az+b}{cz+d}$ by long division. When $c\ne0$ it factors as $z\mapsto cz+d$, then $w\mapsto\frac1w$, then $u\mapsto \frac{a}{c}+\frac{bc-ad}{c}\,u$. So every Möbius map is a translation, a rotation-and-scaling, one inversion, and another rotation-and-scaling. Each of those four sends the family of lines-and-circles to itself, once a line is regarded as a circle passing through the point at infinity, so the composition does too. The same decomposition explains conformality, since all four pieces preserve angles.

The condition $ad-bc\ne0$ is what stops the map collapsing: if $ad=bc$ the numerator is a multiple of the denominator and $f$ is constant. Scaling $a,b,c,d$ by a common factor changes nothing, which is why the maps correspond to matrices $\begin{pmatrix}a&b\\c&d\end{pmatrix}$ only up to scale, and why composing maps is multiplying matrices.

## How to use it
The three-point property is the working tool: given any two triples of distinct points there is exactly one Möbius map carrying the first to the second. In practice you send three convenient points to $0$, $1$ and $\infty$, which is precisely the [[cross-ratio|cross-ratio]], and the invariance of the cross-ratio is then automatic.

Choose the target to make the problem trivial. Sending a circle to a line straightens a configuration; sending two disjoint circles to concentric ones turns a chain of tangencies into a rotation, which is the standard route into Steiner-chain problems. Fixed points come from solving $f(z)=z$, a quadratic, so a non-identity map has one or two of them, and knowing which tells you whether the map behaves like a rotation, a scaling, or a shear near infinity.

Watch the special cases. $c=0$ gives the affine maps $z\mapsto\alpha z+\beta$, which fix $\infty$ and are the similarity transformations. Inversion in a circle is not itself a Möbius map at all, since it is anti-conformal, but inversion followed by conjugation is; that is the precise sense in which the inversive and Möbius pictures agree.

## On contests
Essentially never needed below olympiad level, and even there it is a structural tool rather than a computational one. It appears when a problem is really about circles and tangency and the intended solution is "normalise the picture": sending a circle to a line, or two circles to concentric ones, and reading the answer off the easy configuration.`,


"reflection-composition": String.raw`## Why it works
Track directions. Reflecting a line at angle $\alpha$ in a mirror at angle $\mu$ sends it to $2\mu - \alpha$, so reflecting in $\ell_1$ and then $\ell_2$ sends $\alpha$ to $2\mu_2 - (2\mu_1 - \alpha) = \alpha + 2(\mu_2 - \mu_1)$. Every direction therefore turns by the same $2\theta$, and the intersection point is fixed by both mirrors, so the composite can only be a rotation about it. Parallel mirrors have no fixed point: a point at signed distance $t$ from the first lands at $t + 2d$, which is a translation.

## How to use it
Use it to collapse a chain of reflections. An even number of reflections is a rotation or a translation and an odd number is a reflection or a glide, so a long alternating process is secretly one rotation applied over and over, and the question becomes the order of that rotation.

Run it backwards as well. Any rotation by $2\theta$ splits into two reflections whose mirrors pass through the center at angle $\theta$, and one of the two mirrors may be chosen freely. That freedom is what lets an awkward rotation be traded for a convenient mirror line.

Mind the order, because composing the other way rotates by $-2\theta$. It is the directed angle from $\ell_1$ to $\ell_2$ that doubles.

## On contests
Iterated-reflection problems on the AIME reduce to finding the order of the resulting rotation, turning a geometry question into a divisibility one. Related: [[reflection-coordinates|reflecting a point over a line]] gives the single-reflection formulas, and [[rotation-90|rotating a point]] handles the quarter-turn special case.`,


"vector-projection": String.raw`## Why it works
Demand that $\vec u$ split as $c\vec v$ plus something perpendicular to $\vec v$. Dotting the split with $\vec v$ kills the perpendicular piece and leaves $\vec u \cdot \vec v = c\,(\vec v \cdot \vec v)$, which is the coefficient in the formula and the only value of $c$ that can work. Since [[vector-dot-product|the dot product]] equals $\lvert \vec u \rvert \lvert \vec v \rvert \cos\theta$, that coefficient times $\lvert \vec v \rvert$ is just $\lvert \vec u \rvert \cos\theta$: the shadow $\vec u$ casts on the direction of $\vec v$.

## How to use it
Two payoffs, and the second is the one usually wanted. First, the component along a direction: a force, a displacement or a side resolved onto an axis is this formula and nothing else. Second, and more useful on contests, the leftover $\vec u - \operatorname{proj}_{\vec v}\vec u$ is perpendicular to $\vec v$ and is the shortest vector from the line spanned by $\vec v$ to the tip of $\vec u$, so its length is a distance. That is where [[point-line-distance|the point-to-line distance]] and [[point-plane-distance|the point-to-plane distance]] come from, both of which are this leftover measured against a unit normal.

## On contests
It shows up as the step you did not know had a name. Dropping a foot of a perpendicular in coordinates, resolving a slanted displacement onto a grid direction, or finding where a point lands on a line are all one projection. Watch the sign: the scalar $\vec u \cdot \vec v / \lvert \vec v \rvert$ is negative when the angle is obtuse, which means the foot lies behind the tail of $\vec v$, and a problem asking for a point on a segment rather than on a whole line needs that checked.`,

"rotation-reflection-matrices": String.raw`## Why it works
A linear map is determined by where it sends the two basis vectors, and those images are the columns of its matrix. A rotation by $\theta$ sends $(1,0)$ to $(\cos\theta, \sin\theta)$ and $(0,1)$ to $(-\sin\theta, \cos\theta)$, which is $R_\theta$ read column by column; the reflection matrix comes out the same way from the images of the axes. Because both preserve lengths and angles, their columns are perpendicular unit vectors, so [[determinant-geometric|the determinant]] has absolute value $1$, positive for a rotation and negative for a reflection since a reflection reverses orientation.

## How to use it
Composing becomes multiplying, which is the whole reason to leave synthetic language. $R_\alpha R_\beta = R_{\alpha + \beta}$ recovers [[angle-addition|the angle addition formulas]] as a byproduct, and $F_\beta F_\alpha = R_{2(\beta - \alpha)}$ is exactly the statement that [[reflection-composition|two reflections compose to a rotation]] by twice the angle between the mirrors, now as a one-line computation rather than an angle chase. For a rotation about a center other than the origin, translate the center to the origin, apply $R_\theta$, and translate back. The quarter-turn cases are common enough that [[rotation-90|the coordinate swaps]] are worth knowing without the matrix.

## On contests
AMC 12 and AIME rarely say "matrix", so this is a tool you bring rather than one you are handed. It pays when a problem composes several transformations and asks what the net effect is: multiplying two or three of these is mechanical, while chasing the same composition synthetically invites a sign error. It is also the cleanest way to see why a rotation by $60^\circ$ and a reflection can never be equal, since one has determinant $1$ and the other $-1$.`,


"ellipse-properties": String.raw`## Why it works
Put the foci at $(\pm c, 0)$ and impose $PF_1 + PF_2 = 2a$. Clearing the two radicals leaves $\frac{x^2}{a^2} + \frac{y^2}{a^2 - c^2} = 1$, so writing $b^2 = a^2 - c^2$ produces the standard form and the relation $a^2 = b^2 + c^2$ at the same time. The fastest way to see that relation without algebra is to stand at the end of the minor axis: both focal distances are equal, so each is $a$, and the right triangle with legs $b$ and $c$ has hypotenuse $a$.

## How to use it
Read the problem for which of $a$, $b$, $c$ it hands you and convert immediately, since contests state the condition in whichever of the three languages is least convenient. A constant sum of distances to two fixed points is $2a$ with the foci given. A stated equation gives $a$ and $b$, and $c$ follows. An area gives the product $ab$. The one to watch is orientation: $a$ is the larger denominator, so if the $y^2$ denominator is bigger, the foci sit on the $y$-axis and every formula transposes.

## On contests
The recurring AIME shape is a constant focal sum arriving in disguise. Two tangency conditions give distances such as $R_1 - r$ and $R_2 + r$ from two fixed centers, whose sum does not depend on $r$, and that alone identifies the locus as an ellipse; in other problems each given equation places a point on an ellipse with known foci. Recognizing the sum is the problem, and the algebra afterward is routine. Pair this with [[eccentricity|eccentricity]] when the question compares two ellipses, and with [[conic-reflective-property|the reflective property]] when it asks for a minimum.`,

"hyperbola-properties": String.raw`## Why it works
The same derivation as the ellipse with $\lvert PF_1 - PF_2 \rvert = 2a$ instead of a sum. Now $c > a$, since the difference of two sides of a triangle is less than the third, so $a^2 - c^2$ is negative and the standard form carries a minus sign with $b^2 = c^2 - a^2$. The asymptotes come out of the equation rather than from a limit: replacing the $1$ by $0$ gives $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 0$, which factors as $\left(\frac{x}{a} - \frac{y}{b}\right)\left(\frac{x}{a} + \frac{y}{b}\right) = 0$, a pair of lines through the center. Far from the center the $1$ is negligible against terms growing like $x^2$, so the curve hugs them.

## How to use it
When a problem constrains points on a hyperbola and asks for a bound, the asymptotes usually supply it, because they cap the slopes the curve can reach. Substituting a line $y = mx$ into the equation gives a real intersection only when $\lvert m \rvert \lt  b/a$, and an infimum that is never attained is the standard consequence. The rectangular case deserves separate recognition: $a = b$ makes the asymptotes perpendicular, and a $45^\circ$ rotation turns the curve into $xy = k$, so any problem about the graph of a reciprocal is a hyperbola problem in other coordinates.

## On contests
A recurring AIME shape asks for the infimum of a length over figures inscribed in a hyperbola, such as a rhombus centered at the origin with its diagonals along two perpendicular lines through the center. The answer is a number the curve approaches and never reaches, which is exactly what asymptotes produce, and reading the problem as a hyperbola problem rather than a polygon problem is the whole insight.`,

"parabola-focus-directrix": String.raw`## Why it works
Impose $\operatorname{dist}(P, F) = \operatorname{dist}(P, \ell)$ with $F = (0, p)$ and $\ell: y = -p$. Squaring gives $x^2 + (y-p)^2 = (y+p)^2$, and the $y^2$ and $p^2$ terms cancel on both sides, leaving $x^2 = 4py$. Almost nothing survives the cancellation, which is why the parabola has the simplest equation of the three conics and why $p$ is the only parameter it has. Setting $y = p$ recovers the latus rectum: $x^2 = 4p^2$, so the chord runs from $-2p$ to $2p$ and has length $\lvert 4p \rvert$.

## How to use it
Translate between the two descriptions on sight. A problem giving $y = ax^2$ has focal distance $p = \frac{1}{4a}$ from the vertex, so a wide parabola has a distant focus. A problem giving a focus and a directrix is asking you to write the equation. The equidistance definition itself is often the shortcut: a distance to the focus can be replaced by a vertical distance to the directrix, which turns an optimization over a curve into one over a line. [[vertex-form|The vertex formula]] $x = -\frac{b}{2a}$ is the algebraic companion to this card and locates the vertex before any of this applies.

## On contests
Parabolas reach the AIME as constraint curves rather than as objects to describe. Two parabolas can combine into a circle by taking the right linear combination, and a parabola intersected with its own rotated image is best handled by noticing the symmetry axis of the rotation rather than by substituting. On the AMC the focus-directrix pair is tested directly, and the trap is a parabola opening sideways, where $x$ and $y$ swap roles throughout.`,

"eccentricity": String.raw`## Why it works
Fix a focus $F$ and a line $\ell$, and take all $P$ with $PF = e \cdot \operatorname{dist}(P, \ell)$. Squaring gives a second-degree equation whose $x^2$ and $y^2$ coefficients differ by a factor involving $1 - e^2$, so the sign of $1 - e^2$ alone decides whether the curve closes up, opens once, or opens twice. That is the unified construction: the three conics are one locus with one parameter. For an ellipse or hyperbola, comparing this with the two-focus definition gives $e = c/a$ and puts the directrix at $x = a/e$.

## How to use it
Use it whenever a problem compares two conics rather than describing one. Since $e$ is a ratio of lengths it survives any scaling, so two ellipses are similar exactly when their eccentricities match, and then every corresponding length is in one fixed ratio. Every parabola has $e = 1$, so all parabolas are similar, which surprises people and occasionally answers a question outright. The value also reads as a shape: $e$ near $0$ is nearly circular, $e$ near $1$ nearly a parabola, and large $e$ gives a hyperbola with wide-open branches.

## On contests
Equal eccentricity is the phrase to watch for: two ellipses with the same eccentricity are similar, so an area ratio fixes every linear ratio, in particular the ratio of their $c$ values, which converts a statement about areas into one about focal distances. The rest is bookkeeping. If a problem says "the same eccentricity", it is telling you the two curves are similar and inviting you to work in ratios.`,

"conic-classification": String.raw`## Why it works
Rotating the axes by $\theta$ mixes $x$ and $y$ linearly, and a direct computation shows $B^2 - 4AC$ comes out unchanged; translating changes only $D$, $E$ and $F$. So the quantity is a property of the curve, not of the coordinates chosen to write it, and it may be read off the equation as given. Its sign measures how the second-degree part factors: negative and it does not factor over the reals, which forces a closed curve, zero and it is a perfect square, which is the parabolic boundary case, positive and it splits into two real directions, which become the hyperbola's asymptotes.

## How to use it
Compute $B^2 - 4AC$ before doing anything else, since it tells you what you are looking at and therefore which card to reach for. If $B = 0$ the axes are already aligned, and [[completing-the-square|completing the square]] in each variable finishes the job. If $B \ne 0$ and you need more than the type, rotate by $\cot 2\theta = \frac{A-C}{B}$ to clear it. Always check the degenerate possibilities before trusting the classification, since the same sign covers them: a negative discriminant admits a single point or the empty set, a zero one admits a repeated or parallel line pair, and a positive one admits two crossing lines.

## On contests
This is a recognition tool more than a computation. A combination of two conic equations is again a conic, and choosing the combination that kills the asymmetry can leave a circle, which proves that four intersection points are concyclic. Seeing that the combination is still a conic, and which one, is the step that makes such a problem tractable. Degenerate cases also show up as answer-choice traps whenever a parameter is allowed to vary.`,

"conic-reflective-property": String.raw`## Why it works
Take a point $T$ on an ellipse and move slightly along the tangent. To first order the sum $PF_1 + PF_2$ must not change, since $T$ already sits on the level curve where that sum is $2a$. The rate at which each focal distance changes is the cosine of the angle between the tangent direction and that focal radius, so the two cosines must cancel, which says the tangent makes equal angles with the two radii. That is the reflection law. On a parabola the second focus is at infinity, so the second radius points along the axis and a ray from the focus leaves parallel to it.

## How to use it
The contest form is almost never about light. Read it as a level-curve statement: the ellipses with foci $F_1, F_2$ are the level sets of $PF_1 + PF_2$, so the smallest one meeting a given line touches it, and the point of tangency is where that sum is least. Every other point of the line lies on a larger ellipse, hence gives a larger sum. That reduces the minimization to [[reflection-shortest-path|reflecting one focus across the line]] and taking a straight segment, and [[ellipse-tangent-line|the tangency pattern]] is this idea packaged as a recognizable shape.

## On contests
The classic AIME use is an ellipse tangent to an axis: the point of tangency minimizes the focal sum along that line, so reflecting a focus across it solves the problem in one line. The property also appears stated outright on the AMC, usually as a whispering gallery or a satellite dish, where the answer is simply that rays from one focus arrive at the other or leave parallel. The hyperbola's version, that a ray aimed at the far focus reflects away from the near one, is the rarest of the three.`,


"projected-area-cosine": String.raw`## Why it works
Set up coordinates so the two planes meet along the $x$-axis at angle $\theta$. Projection fixes every $x$ and multiplies every coordinate measured across the line of intersection by $\cos\theta$, so it is a linear map that scales one direction by $1$ and the perpendicular one by $\cos\theta$. A linear map multiplies every area by the absolute value of [[determinant-geometric|its determinant]], which here is $1 \cdot \cos\theta$. That the factor does not depend on the region is the whole content, and it is why the statement holds for a circle, a polygon and anything else at once.

## How to use it
Use it in the backwards direction almost always. A tilted plane cuts a solid and you are asked for the area of the section; projecting the section straight down onto a face of the solid usually gives a region you can compute with elementary geometry, and dividing by $\cos\theta$ recovers the real area. Getting $\theta$ is the only subtlety: it is the dihedral angle between the cutting plane and the plane you projected onto, most reliably found as the angle between their normal vectors using [[vector-dot-product|the dot product]], not by eye. A circle projects to an ellipse with the same major axis and the minor axis shortened by $\cos\theta$, so the area $\pi ab$ agrees with this rule.

## On contests
This is the card that makes a class of AIME solids tractable without any integration. The slanted section of a cylinder is its own shadow on the base stretched by a constant factor, so its area follows from a [[circular-segment|circular segment]] and one cosine, and a slanted section of a box is found the same way, by projecting onto the bottom face and dividing by the cosine of the angle between the two normals. Two things it is not: a shadow cast by a nearby lamp, which is a central projection and scales by similar triangles instead, and the projection of a single length, which is [[vector-projection|the vector projection]] and carries no area at all.`,


"euler-line-parallel-side": String.raw`## Why it works
Both centers sit above $BC$, so the line joining them is parallel to $BC$ exactly when their heights above it are equal. One of those heights costs nothing, because [[orthocenter-properties|the circumcenter's distance to a side]] is half the distance from the opposite vertex to the orthocenter, so the height of $O$ is $\frac{1}{2}AH$ whatever the triangle. Imposing that $H$ sits at the same height gives $HD = \frac{1}{2}AH$ directly, so the altitude from $A$ is cut in the ratio $2 : 1$ at the orthocenter.

Converting to angles needs only the two standard distances, $AH = 2R\cos A$ and $HD = 2R\cos B\cos C$. Equating $\cos A$ with $2\cos B\cos C$, then writing $\cos A = -\cos(B+C) = \sin B\sin C - \cos B\cos C$ and dividing through by $\cos B\cos C$, leaves $\tan B\tan C = 3$. The same two distances give the general ratio $AH : HD = (\tan B\tan C - 1) : 1$, which is worth carrying on its own: the parallel configuration is just its $2 : 1$ case.

## How to use it
Recognition runs in both directions, and which one you need is usually obvious from the problem. Told that the Euler line is parallel to a side, immediately write $\tan B\tan C = 3$ and treat it as one more equation in the angles; told two angles whose tangents multiply to $3$, you know the configuration without computing either center. The altitude reading is the one to reach for when the problem gives you a length rather than an angle, since it turns the whole configuration into a $2 : 1$ division of a segment you can already measure.

Two cautions. The condition is symmetric in $B$ and $C$ but says nothing about $A$, so it pins down a one-parameter family, not a specific triangle. And $B = C$ collapses it: $\tan^2 B = 3$ forces $B = 60^\circ$ and an equilateral triangle, where $O$ and $H$ coincide and there is no line to be parallel to anything. An isosceles configuration is therefore never the intended reading.

## Key forms
- $\tan B\tan C = 3$ — the angle test, and the quickest way in
- $AH : HD = (\tan B\tan C - 1) : 1$ — the general ratio along the $A$-altitude
- $AH = 2\,HD$ — the parallel case, the orthocenter two thirds of the way down from $A$
- $\cos A = 2\cos B\cos C$ — the same statement before dividing through
- $B = C$ — degenerate: forces equilateral, where the Euler line does not exist

## On contests
This is a configuration to recognize rather than a theorem to quote, and it earns its place because the parallel hypothesis looks like it says nothing computable until you convert it. Once $\tan B\tan C = 3$ is on the page it combines with the [[law-of-sines|law of sines]] or with $A + B + C = 180^\circ$ like any other angle relation. The altitude form pairs with [[euler-line-ratio|the Euler line]] itself when a problem also involves the centroid, since $G$ is fixed at one third of the way from $O$ to $H$ along the line you have just placed.`,


"perpendicular-bisector-locus": String.raw`
## Why it works
The perpendicular bisector is the mirror line of the segment, so its points are equally far from both ends, and the converse, which is the direction that gets used, holds too.

Let $M$ be the midpoint of $AB$. If $P$ lies on the perpendicular bisector, the right triangles $PMA$ and $PMB$ share the leg $PM$ and have equal legs $MA = MB$, so their hypotenuses agree: $$PA = \sqrt{PM^2 + MA^2} = \sqrt{PM^2 + MB^2} = PB.$$

Conversely, if $PA = PB$, the triangles $PMA$ and $PMB$ have all three sides equal, so the angles at $M$ are equal; since they add to $180^\circ$, each is a right angle, and $P$ is on the perpendicular bisector. The locus is therefore the whole line and nothing else, which is why the converse may be used as freely as the theorem.

In coordinates the same statement is a cancellation. With $A = (a_1, a_2)$ and $B = (b_1, b_2)$, squaring $PA = PB$ gives $$(x - a_1)^2 + (y - a_2)^2 = (x - b_1)^2 + (y - b_2)^2,$$ where the $x^2$ and $y^2$ terms cancel and leave one linear equation. That is [[distance-midpoint|the coordinate recipe]], and it is why an equidistance condition costs a point one degree of freedom rather than trapping it on a curve.

## How to use it
There are three readings, and recognizing which one a problem wants is most of the work.

As a center-finder: any circle through $A$ and $B$ has its center on the perpendicular bisector of $AB$, so the bisectors of two chords meet at the center, and the three side bisectors of a triangle meeting at one point is why every triangle has a circumcenter. [[equal-chords-arcs|The chord version]] is the same fact inside a circle.

{{figure:center}}

As a constraint: "equidistant from $A$ and $B$" is a line, so it meets any other condition in finitely many points. This is the form that hides. A problem says two circles have equal radii, or a point is the same distance from two centers, and the intended move is to draw the bisector.

As a mirror: reflecting across it exchanges $A$ and $B$. A fold that brings $A$ onto another point $T$ has the perpendicular bisector of $AT$ as its crease, since the points of the crease do not move while $A$ lands on $T$. That is how paper-folding problems become geometry.

{{figure:fold}}

When the ratio $PA : PB$ is a constant other than $1$, the locus bends into [[apollonius-circle|a circle]] instead, and the perpendicular bisector is the limiting case of those circles as the ratio approaches $1$.

## On contests
It is used constantly and almost never named, which is why it is worth having a card at all. Ten problems here turn on it, nine of them AIME and none by it alone, and most reach it sideways: two circle centers placed on the bisector of a segment joining two others, or a fold whose crease is the bisector of the segment from a vertex to its landing point.

Once the bisector is drawn, the finish is usually the [[pythagorean-theorem|Pythagorean theorem]] on the right triangle it creates. The tell is a phrase like "the same distance from" or "folded onto" rather than the words perpendicular bisector.
`,

"cotangent-rule": String.raw`## Why it works
Divide the two standard expressions for the same angle. [[law-of-cosines|The law of cosines]] gives $\cos A = \frac{b^2+c^2-a^2}{2bc}$, and [[trig-area|the sine area formula]] $K = \frac12 bc \sin A$ rearranges to $\sin A = \frac{2K}{bc}$. Their quotient is $\frac{b^2+c^2-a^2}{2bc} \cdot \frac{bc}{2K}$, and the $bc$ cancels, leaving $\frac{b^2+c^2-a^2}{4K}$. Nothing deeper is involved, which is precisely the argument for writing it down once instead of rederiving it.

The corollary falls straight out: adding $\cot A$ and $\cot B$ puts $b^2+c^2-a^2$ over $4K$ next to $a^2+c^2-b^2$ over $4K$, and everything cancels except $2c^2$, giving $\frac{c^2}{2K}$. Note which side survives — it is the one opposite neither angle.

## How to use it
Reach for it the moment a cotangent of a triangle angle appears, because it converts the whole expression into side lengths and area, where ordinary algebra works. Sums are the common shape, and the corollary collapses each pair in one step. Its close relative $\cot A \cot B + \cot B \cot C + \cot C \cot A = 1$, which holds in every triangle, sits on [[brocard-angle|the Brocard angle card]] and is worth knowing alongside this one; the two answer different questions, since that one is a relation among the cotangents while this one evaluates each of them.

## On contests
The model use asks for a ratio like $\frac{\cot C}{\cot A + \cot B}$ given a relation among $a^2$, $b^2$ and $c^2$: converting both cotangents turns it into $\frac{a^2+b^2-c^2}{2c^2}$, and the given relation finishes it. Such problems are usually tagged with the law of cosines and the sine area formula, because those are what they use, but a reader who knows this card does the conversion in one step instead of three.`,

"rotation-center": String.raw`## Why it works
A rotation is an isometry that fixes exactly one point, and every other point keeps its distance to that fixed point. So for any $P$ and its image $P'$, the center $O$ satisfies $OP = OP'$, which by [[perpendicular-bisector-locus|the equidistant locus]] puts $O$ on the perpendicular bisector of $PP'$. Doing that for a second pair gives a second line, and two non-parallel lines meet once — which they must, because a rotation has exactly one fixed point.

A third pair adds nothing except a check. If the three bisectors fail to concur, the map is not a rotation, and the usual culprit is that it is a translation, where the bisectors come out parallel and the "center" has run off to infinity.

## How to use it
Take two vertices you can match confidently to their images, draw or compute the two perpendicular bisectors, and intersect them. In coordinates this is two equations of the form $(x-p_1)^2 + (y-p_2)^2 = (x-q_1)^2 + (y-q_2)^2$, each of which goes linear as soon as it is expanded, so the center comes from a $2 \times 2$ system rather than anything quadratic.

Get the angle separately and more cheaply: it is the turn in the figure's orientation, readable from one matched pair as $\angle POP'$ once $O$ is known, or from a single edge's direction before that. Matching the points is the step that actually goes wrong — a rotated square looks the same four ways, so pair the vertices by following the labeling around the figure rather than by proximity.

## Key forms
- two matched pairs — intersect the perpendicular bisectors of $PP'$ and $QQ'$
- in coordinates — $\lvert OP \rvert = \lvert OP' \rvert$ squared is linear, so two pairs give a linear system
- the bisectors come out parallel — the map is a translation, not a rotation
- the angle — read it off the orientation change, not by measuring after the fact

## On contests
The direct version asks for the rotation carrying one triangle to another, its center's coordinates and the angle. The disguised version never says rotation: it writes $\lvert PA \rvert = \lvert PA' \rvert$ and $\lvert PB \rvert = \lvert PB' \rvert$ and solves the pair. That second form is the one to recognize, because it looks like a coordinate exercise until you notice what the two equations mean together.`,

"zonogon-minkowski": String.raw`## Why it works
If a point is $\sum_i t_i \vec v_i$ with each $t_i$ ranging over $[0,1]$ independently, the set of all such points is by definition the Minkowski sum of the segments $[\vec 0, \vec v_i]$: adding a segment to a shape means sliding the shape along that segment and keeping everything swept. Sliding a convex set along a segment keeps it convex, so the result is a convex polygon.

Its shape is forced. Walking the boundary means turning the generators on one at a time in order of direction and then turning them off in the same order, so every side is one generator and each generator appears exactly twice, once in each direction. That is what a zonogon is: $2n$ sides in $n$ opposite parallel pairs. The perimeter follows immediately and without any arrangement-dependent work — each $\vec v_i$ is traversed twice, so the total is $2\sum \lvert \vec v_i \rvert$.

## How to use it
The trigger is a problem where several quantities vary independently and each adds a fixed direction of motion, and the question asks for the perimeter or the shape of everything reachable. Do not attempt to describe the region: identify the generators, and the perimeter is twice their total length however they point. The area does depend on the arrangement, being the sum of $\lvert \vec v_i \times \vec v_j \rvert$ over all pairs, so reach for the perimeter version first and check which one the problem wants.

Degenerate cases are worth a glance. Two parallel generators merge into one longer side, dropping the polygon below $2n$ sides, and a generator of length zero contributes nothing.

## Key forms
- $n$ generators — a convex $2n$-gon with sides in opposite parallel pairs
- perimeter — $2\alt{\sum \lvert \vec v_i \rvert}{\big(\lvert \vec v_1 \rvert + \cdots + \lvert \vec v_k \rvert\big)}$, independent of the directions
- area — $\alt{\sum_{i \lt j} \lvert \vec v_i \times \vec v_j \rvert}{\lvert \vec v_1 \times \vec v_2 \rvert + \lvert \vec v_1 \times \vec v_3 \rvert + \cdots + \lvert \vec v_{k-1} \times \vec v_k \rvert}$, which does depend on them
- two parallel generators — they merge, and the polygon has fewer than $2n$ sides

## On contests
The typical sighting: three parameters each sweep their own segment, the reachable region is the hexagon they generate, and its perimeter is twice the sum of the three generator lengths. Such problems are tagged for the distance formula, because measuring those lengths is the only arithmetic left once the shape is understood, which is exactly the situation a pattern card exists for.`,


"steiner-line": String.raw`## Why it works
Take $P$ on the circumcircle and drop the perpendicular to $BC$, landing at foot $F$. The reflection of $P$ in $BC$ is the point $2F - P$, so reflecting is exactly the homothety centered at $P$ with ratio $2$ applied to the foot. Do that for all three sides at once and the whole Simson line is carried to the whole line of reflections, which therefore exists and is parallel to it. So [[simson-line|the Simson line]] and this one are not two theorems; they are one theorem read at two scales.

That the Steiner line passes through $H$ takes one more fact you already have: [[orthocenter-properties|the reflection of the orthocenter in a side lies on the circumcircle]]. Reflecting that statement back says the reflection of a circumcircle point in the side is a point on the line through $H$ — and running it for each side puts $H$ on the common line.

## How to use it
Use it when a problem reflects a circumcircle point over the sides, which is a configuration that otherwise looks like three unrelated constructions. The collinearity is the payoff, and the extra information over the Simson line is the point $H$: you get a line through the orthocenter for free, which is often the link a synthetic argument needs.

Watch the degenerate case. As $P$ slides to a vertex the three reflections converge and the line tends to the altitude from that vertex, so a configuration where $P$ is nearly a vertex is numerically unstable and a coordinate check there will mislead.

## On contests
Olympiad material, and rarely the headline result — it appears as the step that turns a reflection condition into a collinearity, or the reverse. The practical value is knowing that the Simson line and the reflection line are the same object, so a problem stated with either can be attacked with facts about the other.`,

"anticomplementary-triangle": String.raw`## Why it works
Every statement follows from one homothety. The map centered at the centroid $G$ with ratio $-2$ sends $A$, $B$, $C$ to the vertices of $A'B'C'$, and the inverse map with ratio $-\frac12$ is exactly the one that produces [[medial-triangle|the medial triangle]]. A homothety of ratio $-2$ doubles every length and negates direction, so sides are parallel and twice as long, the circumradius doubles, and the area quadruples.

The centers move by the same map, which is what makes them worth memorizing rather than deriving each time. The circumcenter of $A'B'C'$ is the orthocenter of $ABC$; the nine-point center of $A'B'C'$ is the circumcenter of $ABC$; and the orthocenter of $A'B'C'$ is the reflection of $H$ over $O$, the point usually called the de Longchamps point. Each of these is the image under the $-2$ homothety of the corresponding center one level down.

## How to use it
Reach for it when a problem gives you a triangle whose midpoints are the interesting points, since naming the bigger triangle converts a statement about midpoints into a statement about vertices. For example, the circle tangent to the circumcircles of $AHB$, $BHC$ and $CHA$ turns out to be the circumcircle of the anticomplementary triangle, centered at $H$ with radius $2R$.

The other direction is the useful one for centers. A fact about the orthocenter of a triangle is a fact about the circumcenter of its anticomplementary triangle, so an awkward $H$ can sometimes be traded for a comfortable $O$.

## On contests
Olympiad, and the occasional hard AIME geometry problem where a configuration is built on midpoints. It is a relabeling rather than a theorem, which is its strength: it costs nothing to apply and it makes [[euler-line-ratio|the Euler line]] relationships between the two triangles immediate.`,

"ptolemy-second-theorem": String.raw`## Why it works
The quickest route is the same one that proves the first theorem: invert at $A$. Inversion sends $B$, $C$, $D$ to collinear points, and distances transform by $B'C' = \frac{BC \cdot k}{AB \cdot AC}$. Writing the collinearity $B'C' + C'D' = B'D'$ gives [[ptolemys-theorem|Ptolemy's product formula]], and comparing the two ratios in which $C'$ divides $B'D'$ gives this one. Both are the same picture, read for a sum or for a ratio.

## How to use it
Use it with the product formula, not instead of it. Together they give $AC \cdot BD$ and $AC / BD$, so multiplying and dividing recovers $AC^2$ and $BD^2$ — both diagonals of a cyclic quadrilateral from the four sides alone, with no angles anywhere. That is the reason to carry this card: the first theorem alone leaves you one equation short.

For the form, do not memorize the letters. Each side of the fraction gathers the two products of sides that meet at the endpoints of the diagonal you are not computing, so the numerator belongs to $AC$ because it is built at $A$ and $C$.

## On contests
Cyclic quadrilateral problems on the AIME that hand you four sides and want a diagonal. The product formula alone answers that only when the other diagonal is already known; this pair answers it outright. On olympiads it shows up inside longer computations, usually as the step that eliminates an unwanted diagonal.`,

"poncelet-closure": String.raw`## Why it works
For the triangle case the relation is forced by [[euler-distance-theorem|Euler's distance formula]]: $d^2 = R^2 - 2Rr$ holds in every triangle, so a circumcircle and incircle that belong to the same triangle must satisfy it. The content of the converse is that this necessary condition is also sufficient — given two circles obeying it, a triangle inscribed in one and circumscribed about the other exists.

Poncelet's closure theorem is the part with no elementary proof. Start anywhere on the outer circle, draw a tangent to the inner one, continue around, and if the path happens to close after $n$ steps for one starting point, it closes after $n$ steps for every starting point. The polygon slides continuously around the pair of circles without ever failing to shut, which is why these configurations are sometimes described as having a free parameter that does nothing.

## How to use it
Two directions, both rare but decisive. Told that a bicentric $n$-gon exists, you gain a relation between $R$, $r$ and $d$ for free: $d^2 = R^2 - 2Rr$ for $n = 3$, Fuss's $\frac{1}{(R-d)^2} + \frac{1}{(R+d)^2} = \frac{1}{r^2}$ for $n = 4$. Told two circles satisfy such a relation, you may place the polygon wherever is most convenient, because closure does not depend on where you start.

## On contests
Olympiad, and uncommon even there. It earns its place because the triangle case is not exotic at all — it is Euler's formula, which is on the AIME — and seeing that $R \ge 2r$ and bicentric closure are the same statement is worth more than the theorem itself.`,


"sawayama-thebault": String.raw`## Why it works
The proof is an inversion at the incenter, or a long chase with the radical axis; neither is short, and the result is worth carrying rather than rederiving. What does make it memorable is where it sits. Let the circle touch the cevian at $E$ and the side at $F$. The claim is that $I$ lies on $EF$, and the reason it is believable is that $EF$ is the chord of contact of a circle squeezed into the same corner the incircle occupies, so the two circles' contact data are tied together by the tangency with the circumcircle.

The mixtilinear case is the specialization worth seeing: push the cevian out until it becomes the side $AB$, and the circle tangent to $AB$, to $BC$ and internally to the circumcircle is [[mixtilinear-incircle|the mixtilinear incircle]], whose own statement — that $I$ is the midpoint of the chord of contact — is the same fact with extra symmetry.

## How to use it
The trigger is a circle wedged between a cevian, a side and the circumcircle. That is a lot of tangency conditions, and each one is hard to use alone; the lemma converts all of them at once into a single collinearity through the incenter. If a problem then asks about $I$, you already have a line through it.

Read backwards it is a construction: to place the incenter, draw any such circle and take its chord of contact. That is rarely the efficient route, but it is occasionally the only one that avoids trigonometry.

## On contests
Olympiad only, and among the more specialized results in this library. It is here because the configuration is recognizable on sight and almost impossible to make progress on without the lemma, which is the worst combination to meet unprepared.`,

"conway-circle": String.raw`## Why it works
Work out one tangent length and the rest follows. At vertex $A$, both extensions run out to distance $a$ beyond $A$, and the tangent length from $A$ to the incircle is $s - a$; adding $a$ gives $s$ for the distance from $A$ along either side to the new points. So all six points sit at tangent-length $s$ from the incircle along the sidelines, and a point at tangent length $s$ from a circle of radius $r$ is at distance $\sqrt{r^2 + s^2}$ from its center. Every one of the six is that far from $I$, so they are concyclic about $I$ with radius $\sqrt{r^2 + s^2}$.

That is also why the construction is not arbitrary. Extending each side by the length of the side opposite is precisely what makes $(s-a) + a$ come out the same at all three vertices, and any other extension rule breaks the equality.

## How to use it
It is a fact to recognize rather than a tool to apply: if a problem extends the sides of a triangle by the opposite sides, stop and use the circle instead of chasing six points. The radius formula turns the configuration into $r$ and $s$, both of which come straight from [[inradius-area|the inradius formula]] and the perimeter, so the answer is usually two lines away.

## On contests
Reachable from the AMC upward, because everything it needs — semiperimeter, inradius, tangent lengths — is standard. The construction is distinctive enough that recognizing it is most of the work; the arithmetic afterwards is elementary.`,

"japanese-theorem": String.raw`## Why it works
Each incenter is located by [[incenter-excenter-lemma|the arc-midpoint lemma]]: the incenter of $\triangle ABC$ lies on the bisector from $B$ at a position governed by the arc midpoint of $AC$. Placing all four incenters that way and comparing the angles they make shows each pair of adjacent ones subtends a right angle, which is the rectangle.

The quickest way to see why a rectangle rather than a general quadrilateral is the parallelism: two opposite sides of the figure come out parallel to the bisector of one diagonal, the other two parallel to the bisector of the other, and the two bisectors are perpendicular. Since only the concyclicity of $ABCD$ was used, the sides may be as uneven as you like.

## How to use it
Recognition, again — four incenters in a cyclic quadrilateral is a specific enough sight to trigger it. The payoff is that a rectangle gives right angles and equal diagonals for free, so a length or angle question about those incenters collapses.

The theorem extends: triangulating a cyclic polygon from any vertex and summing the inradii of the pieces gives a total independent of which vertex you chose. That is the general Japanese theorem, and it is the version that occasionally shows up as a surprise invariant.

## On contests
Rare, and almost always as the punchline of a problem built around it rather than as a step inside a longer solution. Worth knowing mainly because the configuration is so specific that meeting it without the theorem is close to hopeless.`,

"pappus-hexagon": String.raw`## Why it works
It is [[pascals-theorem|Pascal's theorem]] with the conic degenerated. A pair of distinct lines is a conic — the equation factors into two linear factors — so six points, three on each line, are six points of a conic, and Pascal says the three intersections of opposite sides of the hexagon they form are collinear. Reading the hexagon as $A E B F C D$ makes the opposite-side pairs exactly $AE$ with $BD$, $AF$ with $CD$, and $BF$ with $CE$.

The statement uses no lengths, no angles and no circles, only incidence, so it is genuinely projective: apply any projective transformation and it still holds. That is what makes it a standard tool for setting up a convenient picture, since three points on a line may be sent anywhere convenient.

## How to use it
It answers collinearity questions in configurations made only of lines and their crossings, where metric tools have nothing to grip. If a diagram has two lines carrying three marked points each and asks whether three crossing points line up, this is the theorem, and no computation is required.

Do not confuse it with the other two results carrying the same name. [[pappus-centroid|Pappus's centroid theorems]] are about volumes and surfaces of revolution, and the Pappus chain is the circle chain in [[arbelos|the arbelos]]. Three different theorems, one mathematician.

## On contests
Olympiad, in projective-flavoured problems, and it pairs with [[desargues-theorem|Desargues]] as the two incidence results that get used without coordinates. Its other role is conceptual: seeing that it is the degenerate Pascal is the cleanest way to remember both.`,


"picks-theorem-general": String.raw`
## Why it works
Let $\Lambda$ be the lattice generated by $\vec u$ and $\vec v$, and let $T$ be the linear map with $T(1,0) = \vec u$ and $T(0,1) = \vec v$. It scales and shears the square grid's two basis vectors into $\vec u$ and $\vec v$, which makes it an [[affine-transformations|affine transformation]], and that is the whole idea. Then $T$ carries $\mathbb{Z}^2$ onto $\Lambda$ bijectively, so it matches the lattice points of any polygon with the lattice points of its preimage exactly — interior to interior, boundary to boundary. And $T$ multiplies every area by $|\det T| = d = |\vec u \times \vec v|$. Apply [[picks-theorem|the ordinary theorem]] in the preimage, where the area is $I + \frac{B}{2} - 1$, and push forward.

Nothing here was special about the square grid. What Pick's theorem actually measures is area in units of the fundamental domain, and the familiar statement is the case where that domain happens to be a unit square. That is exactly the kind of quantity an affine map cannot change: it is a ratio of two areas, and an affine map multiplies both by the same factor.

## How to use it
Read off a basis of the lattice, take $d = |\vec u \times \vec v|$, count $I$ and $B$ as usual, and multiply. The whole content is remembering that the count gives you area in fundamental domains, not in square units.

The map also settles which grids are safe. If a problem's points are all the integer combinations of two fixed vectors, Pick applies. If they are only some of them — every other point, or a union of two shifted copies — the set is not a lattice and the theorem is not available. [[picks-hexagonal-grid|The honeycomb]] is the standard trap.

## On contests
Rare in this form, because the AMC and AIME draw their grids square. It matters when a problem sets up a skewed grid, works in the Eisenstein integers, or counts points of $\{a\vec u + b\vec v\}$, and it is the statement that makes [[picks-triangular-lattice|the triangular-grid version]] a consequence rather than a separate fact.
`,

"picks-triangular-lattice": String.raw`
## Why it works
The triangular lattice is generated by $\vec u = (1, 0)$ and $\vec v = \left(\frac12, \frac{\sqrt3}{2}\right)$, so its fundamental rhombus has area $\frac{\sqrt3}{2}$ — exactly two of the small triangles, each of area $\frac{\sqrt3}{4}$. By [[picks-theorem-general|the general form]], $A = \frac{\sqrt3}{2}\left(I + \frac{B}{2} - 1\right)$, and dividing by $\frac{\sqrt3}{4}$ to measure in unit triangles gives $A = 2I + B - 2$.

Check it on the smallest case: one unit triangle has $I = 0$ and $B = 3$, and $2(0) + 3 - 2 = 1$. A side-$2$ triangle has $I = 0$, $B = 6$, area $4$. The hexagon of six triangles around a point has $I = 1$, $B = 6$, area $6$.

## How to use it
Count in triangles, not in $\sqrt3$'s — carry the $\frac{\sqrt3}{4}$ only at the very end, if at all. Counting $B$ is easier here than on a square grid: a side running $k$ steps along a grid direction contributes exactly $k$ boundary points, so $B$ is the perimeter measured in steps.

The usual trap is mixing units. $2I + B - 2$ counts unit triangles; if a problem wants an answer in terms of a side length, multiply by $\frac{\sqrt3}{4}s^2$ at the end.

## On contests
The natural tool whenever a figure is drawn on isometric paper or built out of unit equilateral triangles, which is a recurring MATHCOUNTS and AMC setup. It is also the fast route on any problem whose answer is "how many little triangles", since counting two kinds of dots beats decomposing an awkward region.
`,

"picks-hexagonal-grid": String.raw`
## Why it works
The failure is worth seeing concretely, because "hexagonal lattice" sounds like it should behave. Take the honeycomb with bond length $1$, and look at the two triangles whose vertices are three mutually nearest corners of the same kind. They are congruent — both equilateral of side $\sqrt3$, area $\frac{3\sqrt3}{4}$ — and both have $B = 3$. But the down-pointing one has a corner of the other kind sitting exactly at its center, so $I = 1$, while the up-pointing one has $I = 0$.

Same area, same $B$, different $I$. No formula in $I$ and $B$ alone can produce the area, so no Pick law exists here, and this is not a matter of finding the right constant. The reason is structural: the honeycomb is not closed under subtraction, so it is not a lattice — it is two interleaved triangular lattices, and each one sits at the centers of the other's down-triangles.

## How to use it
Work with the cell centers instead. The centers of a hexagonal tiling do form a triangular lattice, so [[picks-triangular-lattice|the triangular-grid form]] applies to them without modification, and a region made of whole cells of side $s$ has area $\frac{3\sqrt3}{2}s^2$ per cell.

If the corners really are the given points, decompose instead of counting: split the region into whole cells plus leftover triangles and trapezoids. Slower, but correct.

## On contests
You will not be asked to state this. It earns a place because the instinct to apply Pick on a hexagonal picture is strong and the answer it gives is wrong, and because the reason it fails — not a lattice — is the same test that tells you when [[picks-theorem-general|the general form]] does apply.
`,

"picks-with-holes": String.raw`
## Why it works
Cut the region into a single hole-free piece by slicing from the outer boundary to each hole along lattice segments. Each of the $h$ cuts is traversed twice, once in each direction, so every lattice point on a cut is counted twice as a boundary point of the sliced polygon while being counted once — or not at all — in the original. Tracking that bookkeeping across all $h$ cuts, the $-1$ in Pick's theorem becomes $-1 + h$.

The clean statement is $A = I + \frac{B}{2} - \chi$, where $\chi$ is the Euler characteristic of the region: $1$ for a disc, $1 - h$ with $h$ holes. Written that way it is not a patch on Pick but the same theorem, with the constant showing what it always was.

## How to use it
Two counting rules matter more than the formula. Count $B$ over every boundary curve, the outer one and each hole. And count $I$ only at points strictly inside the region — a point sitting on a hole's edge is a boundary point, not an interior one, and treating it as interior is the usual error.

Sanity-check on a $3 \times 3$ square with its center unit square removed: $A = 8$, $B = 12 + 4 = 16$, and all four would-be interior points now lie on the hole, so $I = 0$. Then $0 + 8 + 1 - 1 = 8$.

## On contests
Shows up whenever a lattice figure has something punched out of it — a frame, an annulus, a polygon with a polygonal bite. Often the faster move is still to apply [[picks-theorem|plain Pick]] to the outer polygon and to each hole separately and subtract, which is worth doing as a check; the hole form is the one to reach for when the boundaries share lattice points and the subtraction gets delicate.
`,

"equiangular-hexagon-area": String.raw`
## Why it works
All six angles are $120^\circ$, so consecutive sides turn by $60^\circ$ and the six side vectors point along only three directions. Summing them to zero gives one condition, which in the labeling $a, b, c, d, e, f$ reads $a - d = e - b = c - f$. That is the only constraint: an equiangular hexagon has three free side lengths, not one, and is usually nowhere near regular.

Now extend sides $b$, $d$ and $f$ until they meet. Because the directions repeat every three sides, the three lines make an equilateral triangle, and what has been added at each corner is itself equilateral, of sides $a$, $c$ and $e$. The triangle's side is $a + b + c$ — the side carrying $b$ is flanked by the corners cut at $a$ and at $c$ — so subtracting gives the formula. The closure condition is exactly what makes $a + b + c$, $c + d + e$ and $e + f + a$ agree, which is why the construction is consistent.

## How to use it
Get the labeling right and the rest is arithmetic: the squares subtracted are the alternating triple $a$, $c$, $e$ that starts with the first side of the sum $a + b + c$. On a regular hexagon of side $1$ it reads $\frac{\sqrt3}{4}(9 - 1 - 1 - 1) = \frac{3\sqrt3}{2}$, which is the check to run whenever you are unsure which three sides to square.

If a problem gives five sides, do not solve a system — use $a - d = e - b = c - f$ to read off the sixth directly.

## On contests
The standard way in is being handed six sides with all angles $120^\circ$ and asked for the area; decomposing by hand into trapezoids works but is slow and error-prone. The same triangle-minus-corners picture is what makes an equiangular hexagon on a triangular grid tractable, where [[picks-triangular-lattice|the triangular-grid Pick]] gives the same number by counting dots.
`,

"median-doubling": String.raw`## Key forms
- $MA' = AM$ — extend the median past the midpoint by its own length; $ABA'C$ is a parallelogram because its diagonals bisect each other
- $\triangle ABA'$ with sides $c$, $b$, $2m_a$ — the two sides and twice the median in one triangle, ready for the law of cosines or the triangle inequality
- $\angle BAM = \angle CA'M$ — alternate angles across the parallelogram carry an angle at $A$ over to $A'$
- $\angle ABA' = 180^\circ - \angle A$ — adjacent angles of a parallelogram are supplementary, and this is the angle the law of cosines needs

## Why it works
Reflecting $A$ through the midpoint $M$ is the whole construction, and it turns the triangle into half of a parallelogram.

The point $A'$ is chosen so that $M$ is the midpoint of $AA'$. Since $M$ is also the midpoint of $BC$, the quadrilateral $ABA'C$ has diagonals that bisect each other, which makes it a parallelogram, as in the figure at the top. So $BA' = AC = b$ and $CA' = AB = c$.

In triangle $ABA'$ the sides are $c$, $b$ and $2m_a$, and the angle at $B$ is $180^\circ - A$, because adjacent angles of a parallelogram are supplementary. The [[law-of-cosines|law of cosines]] in this triangle relates the median to the angle at $A$, which is one route to [[apollonius-theorem|Apollonius's theorem]].

The same triangle gives the triangle inequality for a median, $2m_a \lt b + c$: a median is shorter than the average of the two sides beside it.

## How to use it
Reach for it when a median appears together with the sides or angles at its own vertex. The doubled triangle holds them all at once, and the parallelogram moves angles across.

An angle condition becomes a chase. If the median $AM$ is perpendicular to $AB$ and makes $30^\circ$ with $AC$, then alternate angles put a right angle at $A'$ in triangle $ACA'$, whose angle at $A$ is $30^\circ$. So $CA' = \frac12 AC$, and since $CA' = AB$, the side $AC$ is twice $AB$.

{{figure:chase}}

In a right triangle the parallelogram is a rectangle, whose diagonals are equal, so doubling the median to the hypotenuse proves the [[median-to-hypotenuse|median-to-hypotenuse]] fact at once: the median is half the hypotenuse. Doubling any segment through a midpoint works the same way; see [[auxiliary-lines|auxiliary lines]].

## On contests
Two problems here, one AMC 12 and one AIME, neither solved by it alone. A median given with the two sides beside it leads to a triangle with sides $b$, $c$ and $2m$, so the [[triangle-inequality|triangle inequality]] gives the range of the median at once; in harder problems, completing the parallelogram at a midpoint sets up [[power-of-a-point|power of a point]]. Whenever a median is given together with two sides, the doubled triangle is usually the intended first line.`,

"parallel-line-similarity": String.raw`## Key forms
- a line through a vertex parallel to a cevian, meeting an extended side — it cuts off an isosceles or similar triangle that turns the cevian's angle condition into a length, the classical proof of the [[angle-bisector-theorem|angle bisector theorem]]
- a line through a point that divides a side, parallel to a cevian — it carries that ratio onto the side the cevian meets
- a line through a midpoint, parallel to a side — the [[midsegment-theorem|midsegment]], half as long as that side
- $\ell \parallel BC$ meeting $AB$ and $AC$ at $D$ and $E$ — $\frac{AD}{AB} = \frac{AE}{AC} = \frac{DE}{BC}$, the [[intercept-theorem|intercept theorem]] that every such construction ends with

## Why it works
A line parallel to one side of a triangle makes equal corresponding angles with the other two, so it cuts off a triangle similar to the whole. The method uses nothing more; the skill is placing the line where the similar triangle does some work.

The angle bisector theorem shows the idea. Let $AD$ bisect angle $A$, with $D$ on $BC$, and draw the line through $C$ parallel to $AD$, meeting line $BA$ extended at $E$, as in the figure at the top. Corresponding angles give $\angle AEC = \angle BAD$, and alternate angles give $\angle ACE = \angle DAC$; these are equal because $AD$ bisects angle $A$. So triangle $ACE$ is isosceles, with $AE = AC$.

Now $AD \parallel EC$ makes triangle $BAD$ similar to triangle $BEC$, so $$\frac{BD}{DC} = \frac{BA}{AE} = \frac{AB}{AC}.$$ The parallel line turned a pair of equal angles into a length, $AE = AC$, and then into the ratio.

## How to use it
Choose the point first and the direction second. The line should pass through a point where something is known, such as a point dividing a side in a given ratio, a midpoint or a vertex, and it should run parallel to the segment whose ratio you want to move, usually a cevian or a side.

In a cevian problem this is often all it takes. Let $D$ be the point of $BC$ with $BD : DC = 1 : 2$, let $E$ be the midpoint of $AD$, and let $BE$ meet $AC$ at $F$. No two triangles in the figure are similar yet, so draw the line through $D$ parallel to $BF$, meeting $AC$ at $G$.

{{figure:cevian}}

Now two pairs of similar triangles appear. In triangle $ADG$, the segment $EF$ is parallel to $DG$ and starts at the midpoint of $AD$, so $F$ is the midpoint of $AG$. In triangle $CBF$, the segment $DG$ is parallel to $BF$ and $CD$ is $\frac23$ of $CB$, so $CG$ is $\frac23$ of $CF$. So $AC$ splits as $1 : 1 : 2$, and $$AF : FC = 1 : 3.$$

When no useful similar triangles appear, move the line through a different known point, or switch to [[mass-points|mass points]] or the [[area-method|area method]], which reach the same ratios without drawing. A perpendicular to an angle bisector draws a parallel line of its own, a midline; see [[perp-to-angle-bisector|that card]].

## On contests
It is the first auxiliary line to try on a cevian-ratio problem, usually one line inside a longer solution, and the classical proofs of the angle bisector theorem, Menelaus's theorem and Ceva's theorem all begin with a parallel line. The general catalogue of added lines is on [[auxiliary-lines|auxiliary lines]], whose worked example is exactly this construction.
`,

"cyclic-equal-angles": String.raw`## Why it works
Each pair is two inscribed angles standing on the same arc, so the [[inscribed-angle-theorem|inscribed angle theorem]] makes them equal.

$\angle BAC$ and $\angle BDC$ both stand on the arc $BC$ that does not contain $A$ and $D$, so each is half of it. The same happens at every side: each side of the quadrilateral is a chord, and the two vertices not on it see it from the same side, at equal angles. The figure at the top marks the four pairs in four colors.

Where the diagonals cross, these equal angles also make similar triangles, which is the chord case of [[power-of-a-point|power of a point]]. And the pattern runs backwards: one equal pair, with both angles on the same side of the common side, proves the four points concyclic, one of the [[concyclicity-tests|tests for a cyclic quadrilateral]].

## How to use it
As soon as a quadrilateral is known to be cyclic, mark the four equal pairs on the figure. In an [[angle-chasing|angle chase]] they let an angle jump from one vertex to another across a diagonal, which is usually the step that was missing.

To prove four points concyclic, find one such pair of equal angles on the same side of a segment, or a pair of supplementary opposite angles from [[cyclic-opposite-angles|the opposite-angle test]].

## On contests
Equal angles over a common side are the most common way a contest problem hides a cyclic quadrilateral, and spotting the pair is often the key step of an AIME geometry problem. The other angle facts about cyclic quadrilaterals, supplementary opposite angles and the exterior angle, are on [[cyclic-opposite-angles|their own card]], and [[ptolemys-theorem|Ptolemy's theorem]] is the length relation that goes with them.
`,


});
