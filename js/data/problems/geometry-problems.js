// Practice questions for Geometry, keyed by formula id.
// Shown only on detail pages; each entry is a list of { q, s } (question, solution).
window.MATH_PROBLEMS = window.MATH_PROBLEMS || {};

Object.assign(window.MATH_PROBLEMS, {

"pythagorean-theorem": [
  {
    q: String.raw`A right triangle has one leg of length $20$ and hypotenuse of length $29$. Find the other leg.`,
    s: String.raw`Let the missing leg be $b$. Then $b^2 = 29^2 - 20^2 = 841 - 400 = 441$, so $b = 21$. This is the primitive triple $(20, 21, 29)$ — recognizing it would have skipped the arithmetic entirely.`
  },
  {
    q: String.raw`A $25$-foot ladder leans against a wall with its base $7$ feet from the wall. How high up the wall does it reach?`,
    s: String.raw`The ladder, wall, and ground form a right triangle with hypotenuse $25$ and one leg $7$. The height is $\sqrt{25^2 - 7^2} = \sqrt{625 - 49} = \sqrt{576} = 24$ feet — the $(7, 24, 25)$ triple.`
  }
],

"special-right-triangles": [
  {
    q: String.raw`An equilateral triangle has altitude $6$. Find its side length and its area.`,
    s: String.raw`The altitude splits the triangle into two 30-60-90 triangles, in which the altitude is the long leg: $h = \frac{s\sqrt{3}}{2}$. So $s = \frac{2h}{\sqrt{3}} = \frac{12}{\sqrt{3}} = 4\sqrt{3}$. The area is $\frac{1}{2} \cdot s \cdot h = \frac{1}{2} \cdot 4\sqrt{3} \cdot 6 = 12\sqrt{3}$.`
  }
],

"altitude-hypotenuse": [
  {
    q: String.raw`The altitude to the hypotenuse of a right triangle divides the hypotenuse into segments of lengths $4$ and $9$. Find the altitude and the area of the triangle.`,
    s: String.raw`By the geometric mean relation, $h^2 = pq = 4 \cdot 9 = 36$, so $h = 6$. The hypotenuse is $4 + 9 = 13$, so the area is $\frac{1}{2} \cdot 13 \cdot 6 = 39$. (Bonus: the legs are $\sqrt{4 \cdot 13} = 2\sqrt{13}$ and $\sqrt{9 \cdot 13} = 3\sqrt{13}$ by the other two relations.)`
  }
],

"triangle-inequality": [
  {
    q: String.raw`Two sides of a triangle have lengths $5$ and $9$. How many integer values are possible for the third side?`,
    s: String.raw`The third side $x$ must satisfy $|9 - 5| < x < 9 + 5$, i.e. $4 < x < 14$. The integers in this open interval are $5, 6, \dots, 13$ — that's $13 - 5 + 1 = 9$ values.`
  }
],

"polygon-angle-sums": [
  {
    q: String.raw`Each interior angle of a regular polygon measures $160^\circ$. How many sides does it have?`,
    s: String.raw`Work with the exterior angle: it is $180^\circ - 160^\circ = 20^\circ$, and the exterior angles of any polygon sum to $360^\circ$. So $n = \frac{360^\circ}{20^\circ} = 18$ sides. (Using the interior-sum formula $\frac{180(n-2)}{n} = 160$ gives the same answer with more algebra.)`
  }
],

"similar-figures-ratios": [
  {
    q: String.raw`A line parallel to the base of a triangle cuts the triangle into two regions of equal area. In what ratio does it divide the altitude, measured from the apex?`,
    s: String.raw`The small triangle above the line is similar to the whole. For it to have half the area, the similarity ratio must satisfy $k^2 = \frac{1}{2}$, so $k = \frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2}$. The line therefore sits $\frac{\sqrt{2}}{2}$ of the way down the altitude, dividing it in ratio $\frac{\sqrt2}{2} : \left(1 - \frac{\sqrt2}{2}\right) = \sqrt{2} : (2 - \sqrt{2}) = (\sqrt{2} + 1) : 1$ from the apex.`
  }
],

"midsegment-theorem": [
  {
    q: String.raw`The triangle formed by joining the midpoints of the sides of $\triangle ABC$ has perimeter $15$. What is the perimeter of $\triangle ABC$?`,
    s: String.raw`Each midsegment is half the length of the side it parallels, so the medial triangle's perimeter is exactly half of the original's. The answer is $2 \cdot 15 = 30$. (Its area would be one quarter of the original — lengths halve, areas quarter.)`
  }
],

"centroid-division": [
  {
    q: String.raw`A triangle has medians of lengths $9$, $12$, and $15$. How far is the centroid from each vertex?`,
    s: String.raw`The centroid sits $\frac{2}{3}$ of the way along each median from its vertex. So the distances are $\frac{2}{3} \cdot 9 = 6$, $\frac{2}{3} \cdot 12 = 8$, and $\frac{2}{3} \cdot 15 = 10$. (Note $6$-$8$-$10$ is a right triangle — not a coincidence here: medians $9, 12, 15$ are proportional to $3,4,5$.)`
  }
],

"cevian-area-ratio": [
  {
    q: String.raw`In $\triangle ABC$ with area $40$, point $D$ lies on $BC$ with $BD : DC = 3 : 2$. Find the area of $\triangle ABD$.`,
    s: String.raw`Triangles $ABD$ and $ACD$ share the altitude from $A$ to line $BC$, so their areas are in the ratio of their bases: $[ABD] : [ACD] = 3 : 2$. Thus $[ABD] = \frac{3}{5} \cdot 40 = 24$.`
  }
],

"trapezoid-parallelogram-areas": [
  {
    q: String.raw`A rhombus has diagonals of lengths $10$ and $24$. Find its area and its perimeter.`,
    s: String.raw`Area: $\frac{d_1 d_2}{2} = \frac{10 \cdot 24}{2} = 120$. The diagonals of a rhombus bisect each other at right angles, so each side is the hypotenuse of a right triangle with legs $5$ and $12$: side $= 13$, perimeter $= 52$.`
  }
],

"quadrilateral-diagonal-area": [
  {
    q: String.raw`A quadrilateral has diagonals of lengths $6$ and $9$ meeting at a $30^\circ$ angle. Find its area.`,
    s: String.raw`Directly, $A = \frac{1}{2} d_1 d_2 \sin\theta = \frac{1}{2} \cdot 6 \cdot 9 \cdot \sin 30^\circ = \frac{1}{2} \cdot 54 \cdot \frac{1}{2} = \frac{27}{2}$. Note the answer doesn't depend on where the diagonals cross — only their lengths and angle.`
  }
],

"regular-polygon-area": [
  {
    q: String.raw`A regular hexagon has apothem $4$. Find its area.`,
    s: String.raw`For a hexagon the apothem is $\frac{s\sqrt3}{2}$, so $s = \frac{8}{\sqrt3} = \frac{8\sqrt3}{3}$ and the perimeter is $6s = 16\sqrt{3}$. Then $A = \frac{1}{2} a p = \frac{1}{2} \cdot 4 \cdot 16\sqrt3 = 32\sqrt{3}$.`
  }
],

"clock-angle": [
  {
    q: String.raw`What is the angle between the hands of a clock at 7:20?`,
    s: String.raw`The hour hand sits at $30H + 0.5M = 210 + 10 = 220^\circ$ and the minute hand at $6M = 120^\circ$, so the angle between them is $220^\circ - 120^\circ = 100^\circ$. The formula agrees: $|30 \cdot 7 - 5.5 \cdot 20| = |210 - 110| = 100^\circ$.`
  }
],

"triangle-area-standard": [
  {
    q: String.raw`A triangle has area $84$ and one side of length $14$. Find the altitude to that side.`,
    s: String.raw`From $A = \frac{1}{2}bh$: $84 = \frac{1}{2} \cdot 14 \cdot h$, so $h = 12$. (This is the 13-14-15 triangle's altitude to its middle side — the altitude splits it into 5-12-13 and 9-12-15 right triangles.)`
  }
],

"trig-area": [
  {
    q: String.raw`Two sides of a triangle have lengths $8$ and $5$, and the angle between them is $150^\circ$. Find the area.`,
    s: String.raw`$A = \frac{1}{2}ab\sin C = \frac{1}{2} \cdot 8 \cdot 5 \cdot \sin 150^\circ$. Since $\sin 150^\circ = \sin 30^\circ = \frac{1}{2}$, the area is $\frac{1}{2} \cdot 40 \cdot \frac{1}{2} = 10$. Obtuse included angles work exactly like their supplements.`
  }
],

"herons-formula": [
  {
    q: String.raw`Find the area of a triangle with sides $9$, $10$, and $17$.`,
    s: String.raw`The semiperimeter is $s = \frac{9 + 10 + 17}{2} = 18$. Heron gives $A = \sqrt{18(18-9)(18-10)(18-17)} = \sqrt{18 \cdot 9 \cdot 8 \cdot 1} = \sqrt{1296} = 36$. (A tight triangle — note $s - c = 1$ signals the long side is nearly degenerate.)`
  }
],

"inradius-area": [
  {
    q: String.raw`Find the inradius of the triangle with sides $9$, $10$, $17$.`,
    s: String.raw`From the previous computation (or Heron), the area is $36$ and $s = 18$. Since $A = rs$, we get $r = \frac{A}{s} = \frac{36}{18} = 2$.`
  }
],

"circumradius-area": [
  {
    q: String.raw`Find the circumradius of the triangle with sides $9$, $10$, $17$.`,
    s: String.raw`With $A = 36$ from Heron: $R = \frac{abc}{4A} = \frac{9 \cdot 10 \cdot 17}{4 \cdot 36} = \frac{1530}{144} = \frac{85}{8}$. One Heron computation feeds both radii ($r = 2$ from $A = rs$, and this $R$).`
  }
],

"right-triangle-inradius": [
  {
    q: String.raw`Find the inradius and circumradius of a $5$-$12$-$13$ right triangle.`,
    s: String.raw`Inradius: $r = \frac{a + b - c}{2} = \frac{5 + 12 - 13}{2} = 2$. Circumradius: the hypotenuse is a diameter (Thales), so $R = \frac{13}{2}$. Check via areas: $A = 30$, $s = 15$, and indeed $r = \frac{30}{15} = 2$.`
  }
],

"incircle-tangent-lengths": [
  {
    q: String.raw`In $\triangle ABC$, $AB = 8$, $BC = 10$, $CA = 12$. The incircle touches $BC$ at $D$. Find $BD$ and $DC$.`,
    s: String.raw`The semiperimeter is $s = 15$. The tangent length from $B$ is $s - b$ where $b = CA = 12$: $BD = 15 - 12 = 3$. From $C$: $DC = s - c = 15 - 8 = 7$. Check: $BD + DC = 3 + 7 = 10 = BC$. ✓`
  }
],

"law-of-sines": [
  {
    q: String.raw`In a triangle, $\angle A = 30^\circ$ and the side opposite it has length $7$. Find the circumradius.`,
    s: String.raw`The extended law of sines says $\frac{a}{\sin A} = 2R$. So $2R = \frac{7}{\sin 30^\circ} = \frac{7}{1/2} = 14$, giving $R = 7$. No other information about the triangle is needed — every triangle with a $30^\circ$ angle opposite a side of $7$ has the same circumcircle size.`
  }
],

"law-of-cosines": [
  {
    q: String.raw`A triangle has sides $5$, $6$, $7$. Find the cosine of its largest angle.`,
    s: String.raw`The largest angle is opposite the longest side, $7$. By the law of cosines, $\cos C = \frac{5^2 + 6^2 - 7^2}{2 \cdot 5 \cdot 6} = \frac{25 + 36 - 49}{60} = \frac{12}{60} = \frac{1}{5}$. Since this is positive, the triangle is acute.`
  }
],

"law-cosines-60-120": [
  {
    q: String.raw`Two sides of lengths $8$ and $15$ enclose a $60^\circ$ angle. Find the third side.`,
    s: String.raw`With $C = 60^\circ$, the shortcut form gives $c^2 = a^2 + b^2 - ab = 64 + 225 - 120 = 169$, so $c = 13$. An integer answer from a $60^\circ$ triangle — the $(8, 15, 13)$ "Eisenstein-like" triple, cousin of $(3, 5, 7)$ for $120^\circ$.`
  }
],

"angle-bisector-theorem": [
  {
    q: String.raw`In $\triangle ABC$, $AB = 10$, $AC = 15$, $BC = 20$. The bisector of $\angle A$ meets $BC$ at $D$. Find $BD$ and $DC$.`,
    s: String.raw`The bisector splits $BC$ in the ratio of the adjacent sides: $\frac{BD}{DC} = \frac{AB}{AC} = \frac{10}{15} = \frac{2}{3}$. So $BD = \frac{2}{5} \cdot 20 = 8$ and $DC = \frac{3}{5} \cdot 20 = 12$.`
  }
],

"angle-bisector-length": [
  {
    q: String.raw`In the same triangle ($AB = 10$, $AC = 15$, $BD = 8$, $DC = 12$), find the length of the bisector $AD$.`,
    s: String.raw`The bisector length formula gives $AD^2 = AB \cdot AC - BD \cdot DC = 10 \cdot 15 - 8 \cdot 12 = 150 - 96 = 54$. So $AD = \sqrt{54} = 3\sqrt{6}$.`
  }
],

"stewarts-theorem": [
  {
    q: String.raw`In the $13$-$14$-$15$ triangle ($AB = 13$, $AC = 15$, $BC = 14$), point $D$ lies on $BC$ with $BD = 5$. Find $AD$.`,
    s: String.raw`Here $a = 14$, $m = BD = 5$ (adjacent to $c = 13$), $n = DC = 9$ (adjacent to $b = 15$). Stewart: $14(d^2 + 5 \cdot 9) = 15^2 \cdot 5 + 13^2 \cdot 9 = 1125 + 1521 = 2646$. So $d^2 + 45 = 189$, giving $d^2 = 144$ and $AD = 12$. (In fact $D$ is the foot of the altitude: $13^2 - 5^2 = 144$ confirms it.)`
  }
],

"cevas-theorem": [
  {
    q: String.raw`Cevians $AD$, $BE$, $CF$ of $\triangle ABC$ are concurrent. Given $\frac{AF}{FB} = 2$ and $\frac{BD}{DC} = \frac{3}{2}$, find $\frac{CE}{EA}$.`,
    s: String.raw`Ceva requires $\frac{AF}{FB} \cdot \frac{BD}{DC} \cdot \frac{CE}{EA} = 1$. Substituting: $2 \cdot \frac{3}{2} \cdot \frac{CE}{EA} = 1$, so $\frac{CE}{EA} = \frac{1}{3}$, i.e. $CE : EA = 1 : 3$.`
  }
],

"menelaus-theorem": [
  {
    q: String.raw`A line crosses side $BC$ of $\triangle ABC$ at $D$, side $CA$ at $E$, and the extension of $AB$ at $F$. If $\frac{BD}{DC} = 2$ and $\frac{CE}{EA} = \frac{1}{3}$, find $\frac{AF}{FB}$.`,
    s: String.raw`Menelaus (unsigned) gives $\frac{AF}{FB} \cdot \frac{BD}{DC} \cdot \frac{CE}{EA} = 1$. So $\frac{AF}{FB} \cdot 2 \cdot \frac{1}{3} = 1$, giving $\frac{AF}{FB} = \frac{3}{2}$. The transversal must cross one side externally — here $F$ lies beyond $B$ on line $AB$, consistent with the signed version's $-1$.`
  }
],

"apollonius-theorem": [
  {
    q: String.raw`A triangle has sides $6$, $8$, and $10$. Find the length of the median to the side of length $10$.`,
    s: String.raw`Apollonius: $6^2 + 8^2 = 2\left(m^2 + 5^2\right)$, so $100 = 2m^2 + 50$ and $m = 5$. Sanity check: $6$-$8$-$10$ is right-angled, and the median to the hypotenuse of a right triangle is half the hypotenuse — indeed $5$. ✓`
  }
],

"median-triangle-area": [
  {
    q: String.raw`A triangle has medians of lengths $3$, $4$, and $5$. Find its area.`,
    s: String.raw`The medians themselves form a triangle — here a $3$-$4$-$5$ right triangle of area $\frac{1}{2} \cdot 3 \cdot 4 = 6$. The original triangle's area is $\frac{4}{3}$ of the median triangle's: $\frac{4}{3} \cdot 6 = 8$.`
  }
],

"rouths-theorem": [
  {
    q: String.raw`Cevians divide each side of $\triangle ABC$ in ratio $3 : 1$ (cyclically). What fraction of the triangle's area is the inner cevian triangle?`,
    s: String.raw`Routh with $x = y = z = 3$: numerator $(xyz - 1)^2 = 26^2 = 676$; each denominator factor is $xy + y + 1 = 9 + 3 + 1 = 13$, so the denominator is $13^3 = 2197$. The ratio is $\frac{676}{2197} = \frac{4 \cdot 13^2}{13^3} = \frac{4}{13}$.`
  }
],

"vivianis-theorem": [
  {
    q: String.raw`An interior point of an equilateral triangle with side $10$ is at distances $2$ and $3$ from two of the sides. How far is it from the third side?`,
    s: String.raw`The three distances always sum to the altitude $h = \frac{10\sqrt3}{2} = 5\sqrt3$. So the third distance is $5\sqrt{3} - 2 - 3 = 5\sqrt{3} - 5$. No information about where the point actually is was needed.`
  }
],

"euler-line-ratio": [
  {
    q: String.raw`A triangle has circumcenter $O = (0, 0)$ and centroid $G = (2, 1)$. Find its orthocenter.`,
    s: String.raw`$O$, $G$, $H$ are collinear with $\vec{OH} = 3\,\vec{OG}$ (since $HG = 2GO$ puts $G$ one-third of the way from $O$ to $H$). So $H = 3G = (6, 3)$.`
  }
],

"euler-distance-theorem": [
  {
    q: String.raw`A triangle has circumradius $6$, and its incenter is exactly $3$ away from its circumcenter. Find the inradius.`,
    s: String.raw`Euler's formula: $d^2 = R(R - 2r)$, so $9 = 6(6 - 2r) = 36 - 12r$. Solving, $12r = 27$ and $r = \frac{9}{4}$. (Consistency check with Euler's inequality: $R = 6 \ge 2r = 4.5$. ✓)`
  }
],

"nine-point-circle": [
  {
    q: String.raw`A triangle has circumradius $10$. What is the radius of the circle passing through the feet of its three altitudes?`,
    s: String.raw`The altitude feet lie on the nine-point circle (together with the side midpoints and the vertex–orthocenter midpoints), and its radius is always half the circumradius. Answer: $5$.`
  }
],

"carnots-theorem": [
  {
    q: String.raw`An acute triangle has circumradius $8$ and inradius $3$. Find the sum of the distances from the circumcenter to the three sides.`,
    s: String.raw`Carnot's theorem: $d_1 + d_2 + d_3 = R + r = 8 + 3 = 11$. (Acuteness matters — it keeps all three signed distances positive, so the plain sum applies.)`
  }
],

"simson-line": [
  {
    q: String.raw`$\triangle ABC$ has a right angle at $C$, and $P$ is the point of the circumcircle diametrically opposite $C$. Identify the Simson line of $P$.`,
    s: String.raw`Since $CP$ is a diameter, $\angle CAP = 90^\circ$, so the foot of the perpendicular from $P$ to line $CA$ is $A$ itself; likewise the foot on line $CB$ is $B$. Two of the three feet are $A$ and $B$, so the Simson line is line $AB$ — and the third foot (on $AB$) automatically lands on it, as the theorem promises.`
  }
],

"brocard-angle": [
  {
    q: String.raw`Find the Brocard angle of a $45$-$45$-$90$ triangle.`,
    s: String.raw`$\cot\omega = \cot 90^\circ + \cot 45^\circ + \cot 45^\circ = 0 + 1 + 1 = 2$. So $\omega = \operatorname{arccot} 2$, i.e. $\tan\omega = \frac{1}{2}$ (about $26.6^\circ$ — under the $30^\circ$ maximum, as it must be).`
  }
],

"circle-basics": [
  {
    q: String.raw`A sector of a circle with radius $12$ has area $24\pi$. Find its central angle and arc length.`,
    s: String.raw`From $\frac{1}{2}r^2\theta = 24\pi$: $\frac{1}{2} \cdot 144 \cdot \theta = 24\pi$, so $\theta = \frac{\pi}{3}$ (that is, $60^\circ$). The arc length is $r\theta = 12 \cdot \frac{\pi}{3} = 4\pi$.`
  }
],

"power-of-a-point": [
  {
    q: String.raw`From an external point $P$, a tangent to a circle has length $6$, and a secant through $P$ meets the circle at $A$ then $B$ with $PA = 4$. Find the chord length $AB$.`,
    s: String.raw`Power of the point: $PT^2 = PA \cdot PB$, so $36 = 4 \cdot PB$ and $PB = 9$. Since $A$ is the nearer intersection, $AB = PB - PA = 9 - 4 = 5$.`
  },
  {
    q: String.raw`Two chords intersect inside a circle. One is divided into segments of $5$ and $4$; the other into segments of $2$ and $x$. Find $x$.`,
    s: String.raw`Intersecting chords give equal products: $5 \cdot 4 = 2 \cdot x$, so $x = 10$. Both chords have the same "power" with respect to the intersection point.`
  }
],

"chord-length": [
  {
    q: String.raw`A chord of a circle of radius $10$ lies at distance $6$ from the center. Find its length.`,
    s: String.raw`Half the chord, the center-to-chord distance, and the radius form a right triangle: half-chord $= \sqrt{10^2 - 6^2} = \sqrt{64} = 8$. The chord has length $16$.`
  }
],

"inscribed-angle-theorem": [
  {
    q: String.raw`Points $A$ and $B$ on a circle cut off an arc of $100^\circ$. What angle does $AB$ subtend at a point $C$ on the major arc? What if $AC$ is a diameter?`,
    s: String.raw`An inscribed angle is half its intercepted arc: $\angle ACB = \frac{100^\circ}{2} = 50^\circ$, the same for every position of $C$ on the major arc. If $AC$ is a diameter, then $\angle ABC$ intercepts a semicircle ($180^\circ$), so $\angle ABC = 90^\circ$ — Thales' theorem.`
  }
],

"angle-chord-secant": [
  {
    q: String.raw`Two secants from an external point cut off arcs of $130^\circ$ (far) and $30^\circ$ (near) between them. Find the angle at the external point.`,
    s: String.raw`For a vertex outside the circle, the angle is half the difference of the intercepted arcs: $\frac{130^\circ - 30^\circ}{2} = 50^\circ$.`
  }
],

"tangent-facts": [
  {
    q: String.raw`A point $P$ is $17$ units from the center of a circle of radius $15$. Find the length of a tangent segment from $P$ to the circle.`,
    s: String.raw`The radius to the tangency point is perpendicular to the tangent, forming a right triangle with hypotenuse $OP = 17$ and leg $15$. The tangent length is $\sqrt{17^2 - 15^2} = \sqrt{64} = 8$ — an $(8, 15, 17)$ triple.`
  }
],

"common-tangent-lengths": [
  {
    q: String.raw`Two circles have radii $3$ and $5$, and their centers are $10$ apart. Find the lengths of the common internal and external tangents.`,
    s: String.raw`Internal: $\sqrt{d^2 - (r_1 + r_2)^2} = \sqrt{100 - 64} = 6$. External: $\sqrt{d^2 - (r_1 - r_2)^2} = \sqrt{100 - 4} = \sqrt{96} = 4\sqrt{6}$. Internal tangents are always shorter — they must "cross between" the circles.`
  }
],

"descartes-circle-theorem": [
  {
    q: String.raw`Two unit circles are tangent to each other and to a common line. Find the radius of the small circle nestled between them and the line.`,
    s: String.raw`Treat the line as a circle of curvature $0$. With $k_1 = k_2 = 1$ and $k_3 = 0$: $k_4 = 1 + 1 + 0 + 2\sqrt{1 \cdot 1 + 1 \cdot 0 + 0 \cdot 1} = 2 + 2 = 4$. The small circle has radius $\frac{1}{4}$. (The other root, $k_4 = 0$, is the line itself.)`
  }
],

"caseys-theorem": [
  {
    q: String.raw`Show that Casey's theorem contains Ptolemy's theorem as a special case.`,
    s: String.raw`Let all four circles shrink to points (radius $0$) on the host circle. The "external tangent length" between two point-circles is simply the distance between the points, so $t_{ij} = P_iP_j$. Casey's relation $t_{12}t_{34} + t_{14}t_{23} = t_{13}t_{24}$ becomes $P_1P_2 \cdot P_3P_4 + P_1P_4 \cdot P_2P_3 = P_1P_3 \cdot P_2P_4$ — exactly Ptolemy for the cyclic quadrilateral $P_1P_2P_3P_4$.`
  }
],

"butterfly-theorem": [
  {
    q: String.raw`$M$ is the midpoint of a chord $PQ$ of length $12$. Chords $AB$ and $CD$ pass through $M$, and lines $AD$, $BC$ meet $PQ$ at $X$ and $Y$. If $MX = 2.5$, find $XY$.`,
    s: String.raw`The Butterfly Theorem says $M$ is the midpoint of $XY$, so $MY = MX = 2.5$ and $XY = 5$. (The chord length $12$ is a red herring — only the midpoint property matters, as long as $X, Y$ land inside the chord.)`
  }
],

"cyclic-opposite-angles": [
  {
    q: String.raw`In cyclic quadrilateral $ABCD$, $\angle A = 3x$ and $\angle C = x + 40^\circ$. Find $\angle A$.`,
    s: String.raw`Opposite angles of a cyclic quadrilateral are supplementary: $3x + x + 40^\circ = 180^\circ$, so $4x = 140^\circ$ and $x = 35^\circ$. Thus $\angle A = 105^\circ$ (and $\angle C = 75^\circ$; they indeed sum to $180^\circ$).`
  }
],

"ptolemys-theorem": [
  {
    q: String.raw`An isosceles trapezoid has parallel sides $6$ and $12$ and legs of length $5$. Find the length of its diagonals.`,
    s: String.raw`Every isosceles trapezoid is cyclic, and its two diagonals are equal — call the length $d$. Ptolemy on $ABCD$ (sides in order $6, 5, 12, 5$): $d \cdot d = 5 \cdot 5 + 6 \cdot 12$, so $d^2 = 25 + 72 = 97$ and $d = \sqrt{97}$. Coordinate check: height $= \sqrt{25 - 9} = 4$, diagonal $= \sqrt{9^2 + 4^2} = \sqrt{97}$. ✓`
  }
],

"brahmaguptas-formula": [
  {
    q: String.raw`A cyclic quadrilateral has sides $4$, $5$, $6$, $7$. Find its area.`,
    s: String.raw`The semiperimeter is $s = \frac{4+5+6+7}{2} = 11$. Brahmagupta: $A = \sqrt{(11-4)(11-5)(11-6)(11-7)} = \sqrt{7 \cdot 6 \cdot 5 \cdot 4} = \sqrt{840} = 2\sqrt{210}$. Any non-cyclic quadrilateral with these sides would have strictly smaller area.`
  }
],

"pitots-theorem": [
  {
    q: String.raw`A quadrilateral $ABCD$ has an inscribed circle, with $AB = 7$, $BC = 9$, $CD = 8$. Find $DA$.`,
    s: String.raw`Pitot: opposite sides sum equally, $AB + CD = BC + DA$. So $7 + 8 = 9 + DA$, giving $DA = 6$.`
  }
],

"ptolemys-inequality": [
  {
    q: String.raw`Let $P$ be any point in the plane of equilateral $\triangle ABC$. Prove $PA \le PB + PC$.`,
    s: String.raw`Apply Ptolemy's inequality to the four points $A, B, P, C$ (in that order): $AB \cdot PC + BP \cdot CA \ge AP \cdot BC$. Since $AB = BC = CA$, dividing by the common side gives $PC + PB \ge PA$. Equality holds exactly when $ABPC$ is cyclic in that order — i.e. $P$ on arc $BC$ of the circumcircle, recovering the Ptolemy-on-equilateral identity.`
  }
],

"ptolemy-equilateral": [
  {
    q: String.raw`$P$ lies on the minor arc $BC$ of the circumcircle of equilateral $\triangle ABC$, with $PB = 3$ and $PC = 5$. Find $PA$, and then the side of the triangle.`,
    s: String.raw`By the theorem, $PA = PB + PC = 8$. For the side: $\angle BPC$ subtends the major arc $BAC$ of measure $240^\circ$, so $\angle BPC = 120^\circ$. Law of cosines in $\triangle BPC$: $BC^2 = 9 + 25 - 2 \cdot 15 \cdot \cos 120^\circ = 34 + 15 = 49$, so the side is $7$.`
  }
],

"bretschneiders-formula": [
  {
    q: String.raw`A convex quadrilateral has sides $3$, $4$, $5$, $6$ (in order) and its two opposite angles $A$ and $C$ sum to $120^\circ$. Find its area.`,
    s: String.raw`Here $s = 9$, so $(s-a)(s-b)(s-c)(s-d) = 6 \cdot 5 \cdot 4 \cdot 3 = 360$, and $abcd\cos^2\left(\frac{120^\circ}{2}\right) = 360 \cdot \cos^2 60^\circ = 360 \cdot \frac{1}{4} = 90$. Bretschneider: $A = \sqrt{360 - 90} = \sqrt{270} = 3\sqrt{30}$. (Were it cyclic, the area would be the larger $\sqrt{360}$.)`
  }
],

"varignons-theorem": [
  {
    q: String.raw`A quadrilateral has area $48$ and diagonals of lengths $12$ and $10$. Describe the parallelogram formed by the midpoints of its sides.`,
    s: String.raw`The Varignon parallelogram has sides parallel to the diagonals with half their lengths — sides $6$ and $5$ — and area half the quadrilateral's: $24$. (Its angles equal the angle between the diagonals.)`
  }
],

"euler-quadrilateral": [
  {
    q: String.raw`A parallelogram has sides $5$ and $7$, and one diagonal has length $8$. Find the other diagonal.`,
    s: String.raw`In a parallelogram the diagonal midpoints coincide, so $m = 0$ and Euler's relation becomes the parallelogram law: $p^2 + q^2 = 2(5^2 + 7^2) = 148$. With $p = 8$: $q^2 = 148 - 64 = 84$, so $q = 2\sqrt{21}$.`
  }
],

"distance-midpoint": [
  {
    q: String.raw`Find the point dividing the segment from $(1, 2)$ to $(7, 11)$ in the ratio $2 : 1$.`,
    s: String.raw`The section formula with $k = 2$ gives $\left(\frac{1 + 2 \cdot 7}{3}, \frac{2 + 2 \cdot 11}{3}\right) = (5, 8)$. Sanity check: $(5,8)$ is twice as far from $(1,2)$ as from $(7,11)$ — differences $(4,6)$ vs. $(2,3)$. ✓`
  }
],

"shoelace-formula": [
  {
    q: String.raw`Find the area of the quadrilateral with vertices $(0,0)$, $(5,0)$, $(6,4)$, $(1,3)$ in order.`,
    s: String.raw`Shoelace terms $x_iy_{i+1} - y_ix_{i+1}$: $(0 \cdot 0 - 0 \cdot 5) = 0$; $(5 \cdot 4 - 0 \cdot 6) = 20$; $(6 \cdot 3 - 4 \cdot 1) = 14$; $(1 \cdot 0 - 3 \cdot 0) = 0$. Sum $= 34$, so the area is $\frac{34}{2} = 17$.`
  }
],

"picks-theorem": [
  {
    q: String.raw`A lattice polygon has $12$ lattice points on its boundary and $40$ in its interior. Find its area.`,
    s: String.raw`Pick's theorem: $A = I + \frac{B}{2} - 1 = 40 + 6 - 1 = 45$. The formula also runs in reverse — given the area and one count, you can recover the other.`
  }
],

"point-line-distance": [
  {
    q: String.raw`Find the distance between the parallel lines $3x + 4y = 10$ and $3x + 4y = 25$.`,
    s: String.raw`Pick any point on the first line, say $(2, 1)$. Its distance to $3x + 4y - 25 = 0$ is $\frac{|3 \cdot 2 + 4 \cdot 1 - 25|}{\sqrt{3^2 + 4^2}} = \frac{15}{5} = 3$. In general parallel lines $Ax + By = C_1, C_2$ are $\frac{|C_1 - C_2|}{\sqrt{A^2+B^2}}$ apart.`
  }
],

"circle-equation": [
  {
    q: String.raw`Find the center and radius of the circle $x^2 + y^2 - 6x + 4y - 12 = 0$.`,
    s: String.raw`Complete both squares: $(x^2 - 6x + 9) + (y^2 + 4y + 4) = 12 + 9 + 4$, i.e. $(x-3)^2 + (y+2)^2 = 25$. Center $(3, -2)$, radius $5$.`
  }
],

"british-flag-theorem": [
  {
    q: String.raw`$P$ is a point in the plane of rectangle $ABCD$ with $PA = 5$, $PB = 7$, $PC = 9$. Find $PD$.`,
    s: String.raw`$A$ and $C$ are opposite corners, as are $B$ and $D$. The British Flag Theorem gives $PA^2 + PC^2 = PB^2 + PD^2$: $25 + 81 = 49 + PD^2$, so $PD^2 = 57$ and $PD = \sqrt{57}$. No coordinates, no knowledge of the rectangle's size or $P$'s position needed.`
  }
],

"rotation-90": [
  {
    q: String.raw`Rotate the point $(3, 4)$ by $90^\circ$ counterclockwise about $(1, 1)$.`,
    s: String.raw`Translate so the center is the origin: $(3,4) - (1,1) = (2, 3)$. Apply $(x, y) \mapsto (-y, x)$: $(2,3) \mapsto (-3, 2)$. Translate back: $(-3, 2) + (1, 1) = (-2, 3)$.`
  }
],

"eulers-polyhedron-formula": [
  {
    q: String.raw`A convex polyhedron has $20$ faces, all triangles. How many vertices does it have?`,
    s: String.raw`Each triangle has 3 edges and each edge borders 2 faces: $E = \frac{3 \cdot 20}{2} = 30$. Euler: $V = 2 + E - F = 2 + 30 - 20 = 12$. (This is the icosahedron.)`
  }
],

"prism-pyramid-volumes": [
  {
    q: String.raw`A pyramid has a square base of side $6$ and height $10$. Find its volume.`,
    s: String.raw`$V = \frac{1}{3}Bh = \frac{1}{3} \cdot 36 \cdot 10 = 120$. The matching prism (same base and height) would hold $360$ — pointed solids are always exactly a third.`
  }
],

"sphere-formulas": [
  {
    q: String.raw`A sphere has volume $36\pi$. Find its surface area.`,
    s: String.raw`From $\frac{4}{3}\pi r^3 = 36\pi$: $r^3 = 27$, so $r = 3$. Then $SA = 4\pi r^2 = 36\pi$ — numerically equal to the volume, a coincidence that happens only at $r = 3$.`
  }
],

"cone-formulas": [
  {
    q: String.raw`A cone has base radius $3$ and height $4$. Find its total surface area.`,
    s: String.raw`Slant height: $\ell = \sqrt{3^2 + 4^2} = 5$. Lateral area $= \pi r \ell = 15\pi$; base $= \pi r^2 = 9\pi$. Total: $24\pi$.`
  }
],

"frustum-volume": [
  {
    q: String.raw`A frustum has parallel base areas $4$ and $16$ and height $3$. Find its volume.`,
    s: String.raw`$V = \frac{1}{3}h\left(A_1 + A_2 + \sqrt{A_1A_2}\right) = \frac{1}{3} \cdot 3 \cdot (4 + 16 + \sqrt{64}) = 4 + 16 + 8 = 28$. The geometric-mean middle term $8$ is what distinguishes this from a naive average.`
  }
],

"space-diagonal": [
  {
    q: String.raw`Find the space diagonal of a $3 \times 4 \times 12$ box.`,
    s: String.raw`$d = \sqrt{3^2 + 4^2 + 12^2} = \sqrt{9 + 16 + 144} = \sqrt{169} = 13$. Two Pythagorean triples chained: $(3,4,5)$ then $(5,12,13)$.`
  }
],

"cross-product-area": [
  {
    q: String.raw`Find the volume of the tetrahedron with vertices $(0,0,0)$, $(2,0,0)$, $(0,3,0)$, $(0,0,6)$.`,
    s: String.raw`The three edge vectors from the origin are along the axes, so the scalar triple product is just the product of the coordinates: $2 \cdot 3 \cdot 6 = 36$ (the determinant of a diagonal matrix). The volume is $\frac{36}{6} = 6$.`
  }
],

"de-guas-theorem": [
  {
    q: String.raw`A tetrahedron has a right-angle corner, and the three faces meeting there have areas $6$, $10$, and $15$. Find the area of the fourth face.`,
    s: String.raw`De Gua: $A_0^2 = 6^2 + 10^2 + 15^2 = 36 + 100 + 225 = 361$, so $A_0 = 19$. A perfect 3D analogue of a Pythagorean triple.`
  }
],

"regular-tetrahedron": [
  {
    q: String.raw`Find the volume of a regular tetrahedron with edge length $6$.`,
    s: String.raw`$V = \frac{s^3\sqrt2}{12} = \frac{216\sqrt2}{12} = 18\sqrt{2}$. (Via the cube embedding: it is a cube of edge $\frac{6}{\sqrt2} = 3\sqrt2$ minus four corner tetrahedra — same answer, good derivation practice.)`
  }
],

"equilateral-triangle-facts": [
  {
    q: String.raw`An equilateral triangle is inscribed in a circle of radius $4$. Find its side length and area.`,
    s: String.raw`From $R = \frac{s\sqrt3}{3}$: $s = R\sqrt{3} = 4\sqrt{3}$. Area: $\frac{s^2\sqrt3}{4} = \frac{48\sqrt3}{4} = 12\sqrt{3}$. (The inradius would be $\frac{R}{2} = 2$, since $R = 2r$.)`
  }
],

"regular-hexagon-area": [
  {
    q: String.raw`A regular hexagon has area $54\sqrt{3}$. Find its side length and its longest diagonal.`,
    s: String.raw`From $\frac{3s^2\sqrt3}{2} = 54\sqrt3$: $s^2 = 36$, so $s = 6$. The long diagonal spans two side lengths through the center: $2s = 12$.`
  }
],

"15-75-90-triangle": [
  {
    q: String.raw`A right triangle has acute angles $15^\circ$ and $75^\circ$ and hypotenuse $8$. Find its area.`,
    s: String.raw`The legs are $8\sin 15^\circ$ and $8\cos 15^\circ$, so the area is $\frac{1}{2} \cdot 64 \sin 15^\circ \cos 15^\circ = 32 \cdot \frac{\sin 30^\circ}{2} = 32 \cdot \frac{1}{4} = 8$. In general a 15-75-90 triangle has area exactly $\frac{c^2}{8}$ — equivalently, its altitude to the hypotenuse is $\frac{c}{4}$.`
  }
],

"golden-ratio-pentagon": [
  {
    q: String.raw`A regular pentagon has side length $2$. Find the length of a diagonal.`,
    s: String.raw`The diagonal-to-side ratio of a regular pentagon is the golden ratio $\varphi = \frac{1 + \sqrt5}{2}$. So the diagonal is $2\varphi = 1 + \sqrt{5}$.`
  }
],

"inscribed-square": [
  {
    q: String.raw`A triangle has base $12$ and height $4$ to that base. A square sits on the base with its top two vertices on the other two sides. Find its side length.`,
    s: String.raw`$x = \frac{ah}{a + h} = \frac{12 \cdot 4}{12 + 4} = \frac{48}{16} = 3$. Check by similarity: the triangle above the square has height $4 - 3 = 1$ and base $12 \cdot \frac{1}{4} = 3 = x$. ✓`
  }
],

"mass-points": [
  {
    q: String.raw`In $\triangle ABC$, $D$ is on $BC$ with $BD : DC = 1 : 2$, and $E$ is on $AC$ with $AE : EC = 2 : 3$. Cevians $AD$ and $BE$ meet at $P$. Find $AP : PD$.`,
    s: String.raw`Balance $BC$ at $D$: masses satisfy $m_B \cdot 1 = m_C \cdot 2$, so take $m_B = 2$, $m_C = 1$. Balance $AC$ at $E$: $m_A \cdot 2 = m_C \cdot 3$ — but $m_C$ is already $1$, so scale everything by $2$: $m_B = 4$, $m_C = 2$, and $m_A = 3$. Then $m_D = m_B + m_C = 6$, and on cevian $AD$: $AP : PD = m_D : m_A = 6 : 3 = 2 : 1$.`
  }
],

"reflection-shortest-path": [
  {
    q: String.raw`$A = (0, 4)$ and $B = (10, 2)$. Point $P$ moves along the $x$-axis. Find the minimum of $AP + PB$.`,
    s: String.raw`Reflect $A$ across the $x$-axis to $A' = (0, -4)$. For any $P$ on the axis, $AP = A'P$, so $AP + PB = A'P + PB \ge A'B = \sqrt{10^2 + 6^2} = \sqrt{136} = 2\sqrt{34}$. The minimum is achieved where segment $A'B$ crosses the axis (at $x = \frac{20}{3}$), and equals $2\sqrt{34}$.`
  }
],

"rotation-trick": [
  {
    q: String.raw`$P$ is inside square $ABCD$ with $PA = 1$, $PB = 2$, $PC = 3$. Find $\angle APB$.`,
    s: String.raw`Rotate the plane $90^\circ$ about $B$ so that $C$ maps to $A$; let $P \mapsto P'$. Then $BP' = BP = 2$ with $\angle PBP' = 90^\circ$, so $PP' = 2\sqrt{2}$; and $P'A = PC = 3$. In $\triangle APP'$: $PA^2 + PP'^2 = 1 + 8 = 9 = P'A^2$, so $\angle APP' = 90^\circ$. Since $\triangle PBP'$ is an isosceles right triangle, $\angle P'PB = 45^\circ$. Therefore $\angle APB = \angle APP' + \angle P'PB = 90^\circ + 45^\circ = 135^\circ$.`
  }
],

"spiral-similarity": [
  {
    q: String.raw`A spiral similarity centered at the origin sends $1$ to $2i$ (as complex numbers). Where does it send $1 + i$?`,
    s: String.raw`The map is $z \mapsto \frac{2i}{1} \cdot z = 2iz$ — a rotation by $90^\circ$ (the argument of $2i$) combined with scaling by $2$ (its modulus). So $1 + i \mapsto 2i(1 + i) = 2i + 2i^2 = -2 + 2i$.`
  }
],

});
