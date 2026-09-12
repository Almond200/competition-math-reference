# Retagging notes — running tally

Working backwards through the problem database, checking every tag against the AoPS solution
set and fixing tags that merely *could* apply.

**The rule, in order:**
1. Read **all** the solutions, not just Solution 1 — it is often not the best one.
2. Decide which single solution is the **best route** for a solver under time.
3. Tag **only the methods that route uses.** A theorem appearing in some other solution does
   not earn a tag: sending a reader to a card the best solution never touches is the same
   defect as tagging a theorem that merely *could* apply.

Example of (3) going wrong: 2023 I #12 was briefly tagged `vivianis-theorem` because AoPS
Solution 3 uses it, but the workable route is Miquel + law of cosines + coordinates, so the
tag was reverted. Likewise 2023 I #1 was briefly given `circular-permutations` from
Solution 1's arrangement count, when the best route is the chained conditional probability.

## Cards added from gaps found this way
| card | id | type | from |
|---|---|---|---|
| Permutation Cycle Structure & Order | `permutation-cycle-structure` | formula (Counting) | 2026 I #7 |
| Largest Term by the Consecutive Ratio | `largest-term-ratio` | **method** (Algebra) | 1991 #3 |
| Tangent Circles & the Line of Centers | `tangent-circles` | formula (Geometry → Circles) | 2023 12A #18 |
| Absolute-Value Regions in the Plane | `taxicab-region` | formula (Algebra → Floors, Radicals & Absolute Value) | 2023 12B #9, 2022 12A #5 |

## Gap candidates — seen, not yet acted on
| fact | sightings | nearest existing card |
|---|---|---|
| a step of size $k$ around an $n$-cycle splits into $\gcd(n,k)$ cycles | 2025 II #11 | none |
| perpendicular bisector of a chord passes through the center | 2024 I #5 | `chord-length` (states the distance, not the locus) |
| probability symmetry: ignore the irrelevant player, the rest is a fair coin | 2026 II #7, 2026 I #9 | `symmetry-probability` (loosely) |
| homogenize a two-variable equation by dividing by $y^2$ and solve for the ratio $x/y$ | 2025 I #4 | none |
| pair consecutive factorials, $k!\,(k+1)! = (k!)^2(k+1)$, to expose square factors | 2023 10B #15 | none |
| a polyline whose every segment makes the same angle with a direction has net displacement (total length)$\cdot\cos\theta$ | 2023 12A #15 | `projection-formula` (states it for a triangle only) |

## Cards repeatedly mis-tagged
- **`rotation-trick`** — wrong 3 times (2026 I #5, 2025 I #9, 2025 I #14). It is the specific
  "rotate about a vertex of an equilateral triangle to fuse three distances" technique, and
  keeps getting attached to any problem containing a rotation.
- **`square-of-sum`** — it is *Expansions of $(a+b+c)^2$*, three variables only. Used on
  2026 I #14 for a five-variable expansion; the general statement is the elementary symmetric
  relation on `symmetric-polynomial-strategies`.
- **`divisibility-rules`** — it is the digit-sum / alternating-sum card, not general
  divisibility. Wrong twice in 2025 (I #1, I #4).
- **`angle-bisector-theorem`** — it is the *ratio* theorem $BD/DC = AB/AC$. Wrong twice in 2022
  (I #3, II #11), both times where the bisector is used as a **mirror**; that is
  `perp-to-angle-bisector`.
- **`power-of-a-point` reflexively paired with `radical-axis`** on any two-circle problem. Wrong
  on 2022 II #15 (neither card appears in any solution), 2021 I #13 and 2021 II #14. Check which
  one the route actually uses.
- **`law-of-cosines`** where `law-cosines-60-120` is meant. At $60^\circ$ or $120^\circ$ the
  cosine term collapses to $\pm bc$ and the identity becomes $a^2 = b^2 \pm bc + c^2$, which is
  the form that makes a problem tractable, so the specific card is the useful one.

## Years completed
| year | scope | defective |
|---|---|---|
| 2026 AIME I & II | 30 problems, 77 tags | 10 tags dropped, 22 strategies reworded |
| 2025 AIME I & II | 30 problems | 11 |
| 2024 AIME I & II | 30 problems | 8 |
| 2023 AIME I & II | 30 problems | 6 |
| 2023 AMC (10A/10B/12A/12B) | 38 entries | **19 (50%)** |
| 2022 (AIME I & II, AMC 10B) | 32 entries | 13 (41%) |
| 2021 (AIME I & II, AMC 10B/12A/12B, Fall AMC) | 37 entries | 17 (46%) |

Next: 2020, then backwards.


## Completeness re-check under the best-solution rule

2026 and 2023 were reviewed with all solutions visible. **2025 and 2024 AIME I were originally
reviewed on Solution 1 alone**, before the multi-solution reader existed, so they were re-read
in full against the rule.

- **2025 AIME I — all changes hold.** #1's shortest solution is the same divisibility step;
  #2's best route is the area lemma with the $1:25:49$ similar-triangle ratio; #4's cleanest is
  dividing by $y^2$ and solving for the ratio $x/y$; #9 and #6 unchanged. #3, #7, #10, #11, #12
  re-verified as already correct.
- **2024 AIME I #14 was wrong and is fixed.** I had tagged `point-plane-distance` from
  Solution 1's cross-product computation, but Solution 2 — inscribe the isosceles tetrahedron
  in a box, get the edges by Pythagoras, then $r = 3V/S$ — is the better route and never
  computes a point-to-plane distance. Retagged to `pythagorean-theorem`.
- **2024 AIME I #7 kept `harmonic-addition` deliberately.** No AoPS solution names it; they all
  use Cauchy-Schwarz or the vector projection. But the expression is literally
  $a\cos\theta+b\sin\theta$ and the answer is literally $\sqrt{a^2+b^2}$, so a solver who knows
  harmonic addition finishes instantly. Recorded as a judgement call, not an oversight.

## 2023 AMC — all 38 entries reviewed, 19 defective (50%)

The highest defect rate of any year so far. AMC entries were tagged more loosely than AIME
ones: the recurring pattern is a tag naming the *object* in the problem (a Pascal triangle, a
rotation, a polyhedron) or naming a tool from a longer solution nobody would choose.

| problem | was | now | why |
|---|---|---|---|
| 12A #10 | `difference-of-squares`, `quadratic-formula` | `absolute-value-rules` | square-root both sides instead: $\|y-x\|=2y$, positivity gives $x=3y$. Expanding to a quadratic is the long way |
| 12A #12 | (kept both) | `power-sums`, `difference-of-squares` | strategy rewritten to the 3-line route $16\cdot 45^2-171^2=9^2(20^2-19^2)$ |
| 12A #14 | `de-moivre` | `roots-of-unity` | the route multiplies by $z$ to get $z^6=\|z\|^2$ and counts the six roots; no polar expansion |
| 12A #15 | `pythagorean-theorem`, `common-angle-values` | `similar-figures-ratios` | $\arccos\frac56$ is not a standard angle; the horizontal projections total 100 against a 120 path |
| 12A #16 | `roots-of-unity` | `complex-basics`, `quadratic-formula` | no filter, no primitive root — just $z^2$ and the quadratic formula |
| 12A #17 | `symmetry-probability`, `states-recursion-prob` | `partitions`, `bijection-method` | every path costs $2^{-10}$, so only the $2^9$ compositions matter. An earlier pass called the one-line symmetry argument the intended route; on re-reading, the composition count is both shorter and rigorous, and the symmetry version is the hand-wavy one |
| 12A #18 | `pythagorean-theorem` | + `tangent-circles` | turning each tangency into a center distance was the untagged half of the solution |
| 12A #19 | `log-rules` | `log-substitution` | the move is substituting $u=\log x$ |
| 12A #20 | `binomial-row-sums` | `first-order-recurrence`, `periodicity-mod-m` | the triangle is *modified*, so binomial row sums do not apply |
| 12A #21 | `eulers-polyhedron-formula`, … | `symmetry-probability`, `casework-method` | Euler's formula only recovers the icosahedron's 12 vertices, which is a known fact, not the method |
| 12A #22 | `multiplicative-functions`, `number-of-divisors` | `functional-substitution` | the best route substitutes the six divisors and eliminates; multiplicativity is never proved |
| 10B #15 | `legendres-formula` | `exponent-tracking` | Legendre is the exponent of $p$ in a **single** $n!$ |
| 10B #17 | `space-diagonal` | + `square-of-sum` | the $(a+b+c)^2$ expansion *is* the solution; here the 3-variable card is the right one |
| 12B #3 | `inscribed-angle-theorem` | `thales-theorem`, `similar-figures-ratios` | it is the *converse* of Thales — right angle ⟹ hypotenuse is a diameter |
| 12B #9 | `absolute-value-rules`, `casework-method` | `absolute-value-rules` | the best route *avoids* casework: reflect the tilted square twice and multiply the area |
| 12B #11 | — | `am-gm`, `trapezoid-parallelogram-areas` | nothing was tagged |
| 12B #19 | `generating-function-method` | dropped | no solution uses a generating function |
| 12B #20 | `law-of-cosines` | `chord-length` | the central angle comes off $1 = 2\cdot 2\sin(\theta/2)$; no law of cosines anywhere |
| 12B #22 | `product-sum` | `functional-substitution`, `casework-method` | `product-sum` comes from Solution 3 spotting $f=\cos$, which is not the best route |
| 12B #13 | `vietas-general` | dropped | Solution 2's route. `square-of-sum` is **correct** here: three variables, $(a+b+c)^2-2(ab+bc+ca)$, exactly what that card states — unlike 2026 I #14, where the expansion had five terms |
| 12B #15 | `divisibility-rules` | `euclidean-algorithm` | third use of that card for general divisibility rather than the digit-sum tests |
| 12B #24 | `lcm-pair-counting` | `exponent-tracking` | second time; that card counts *pairs* |
| 12A #22 | also dropped `mobius-inversion`, `dirichlet-convolution` | — | Solution 2's machinery. Heavy tools on an AMC problem are a smell |

Correct as tagged, verified against every solution: 12A #9 (Pythagoras + quadratic),
12A #11 ($\tan(\alpha-\beta)$), 12A #13 and 10A #16 (the same problem, $\binom n2$ divisible
by 12), 12A #23 (AM-GM with the equality case), 12A #24 ($(n+1)^{10}$ by independent
first-appearance choice), 12A #25 (De Moivre + binomial), 12B #8, 12B #10 (chord ⟂ line of
centers, so the slope is the negative reciprocal), 12B #12, 12B #14 (Vieta's product + sign
casework), 12B #16 (halve, then Chicken McNugget on $3a+5b$, parity split), 12B #21 (unroll
the cone), 12B #23 (count exponent triples), plus 12A #23 and 12B #16 whose strategies were
rewritten without a tag change.

**New card written:** `tangent-circles` (formula, Geometry → Circles). Two tangent circles put
their touch point on the line of centers, so $d = R+r$ externally and $d = |R-r|$ internally.
The library stated this only as the *boundary* of an inequality inside `common-chord-length`
and `common-tangent-lengths` — never as the fact itself, despite it being the opening move of
almost every circle-packing problem. Seven existing cards were already saying "tangent
circles" in their prose and now link to it.

## 2022 — all 32 entries reviewed, 13 defective (41%)

| problem | was | now | why |
|---|---|---|---|
| 2022 AIME I #8 | `equilateral-triangle-facts`, `tangent-facts`, `mixtilinear-incircle` | `equilateral-triangle-facts`, `tangent-circles`, `law-of-cosines` | the mixtilinear inradius formula is Solution 4's exotic route; the workable one finds $r=12$ from the equilateral incircle, puts the center at $18-12=6$ by internal tangency, and finishes with the law of cosines on a $120^\circ$ triangle |
| 2022 AIME I #11 | `incircle-tangent-lengths`, `power-of-a-point` | `power-of-a-point`, `tangent-facts` | the circle touches only three of the four sides, so the $s-a$ incircle formula never applies; it is equal tangents from a point |
| 2022 AIME I #12 | `double-counting`, `indicator-variables` | `double-counting`, `vandermonde` | the identity that does the work, $\sum_k\binom{n-1}{k-1}^2=\binom{2n-2}{n-1}$, was untagged |
| 2022 AIME II #7 | `common-tangent-lengths`, `similar-figures-ratios` | + `tangent-circles` | the center distance $r_1+r_2=30$ that feeds the tangent-length formula comes from tangency |
| 2022 AIME II #9 | `plane-regions`, `eulers-polyhedron-formula` | `plane-regions` | no solution invokes $V-E+F=2$; all four count incrementally, which is what `plane-regions` already states |
| 2022 AIME II #10 | `hockey-stick`, `telescoping` | `hockey-stick` | recognizing $4!\binom{i+1}{4}$ then hockey stick is one step; forcing the product to telescope needs the right fifth-degree difference invented first |
| 2022 AIME I #3 | `angle-bisector-theorem`, `trapezoid-special-segments` | `perp-to-angle-bisector`, `trapezoid-special-segments` | a bisector crossed by a parallel makes an isosceles triangle; the bisector is a **mirror** here, and the ratio theorem never appears |
| 2022 AIME I #14 | `law-of-cosines` | `law-cosines-60-120` | the $30^\circ$ condition forces $\angle BAC = 120^\circ$, and that case of the law of cosines *is* $a^2 = b^2+bc+c^2$, which is what makes it a Diophantine problem |
| 2022 AIME I #15 | `law-of-cosines` | `angle-addition` | substituting $\sin A = \sqrt{x/2}$ turns each equation into $\sin(A+B) = \sin 30^\circ$; no law of cosines |
| 2022 AIME II #4 | `change-of-base` | dropped | naming the common value and going to exponential form kills $x$ on division; no base is changed |
| 2022 AIME II #8 | `floor-multiples`, `pie` | `periodicity-mod-m`, `casework-method` | the condition depends only on $n \bmod 60$, so count one period and scale; no floor sum, no inclusion-exclusion |
| 2022 AIME II #11 | `angle-bisector-theorem`, `angle-chasing` | `perp-to-angle-bisector`, `angle-chasing` | reflecting $B$ and $C$ across the two bisectors is the whole construction |
| 2022 AIME II #15 | `radical-axis`, `power-of-a-point` | `equal-chords-arcs`, `ptolemys-theorem` | the route reflects across the perpendicular bisector of $O_1O_2$, uses equal arcs to get equal chords, and finishes with Ptolemy on the resulting isosceles trapezoid. Neither tagged card appears in any solution |

Correct as tagged, verified against every solution: 2022 AIME I #1, #2, #4 (De Moivre plus a
congruence count), #5, #6, #7 (bounding: $abc\cdot def \ge 6!$ forces $abc \ge 28$), #9
(parity puts each colour pair in opposite-parity positions, giving $6!\,6!$ over the multiset
count), #10, #13 (`repeating-decimals` + PIE over the three prime factors of $9999$);
II #1, #2, #3, #5, #6, #12, #13, #14; and 2022 AMC 10B #14 (all odds give 13, pigeonhole caps it).

**Two older entries fixed in passing**, both found by scanning for problems whose strategy
already described the tangency-to-distance step:

- **1997 AIME #4** — dropped `pythagorean-theorem`. Descartes' Circle Theorem gives
  $r=\tfrac89$ in one line from the three radii $5,5,8$; the elementary centre-distance route
  is a page of algebra.
- **2014 AIME II #8** — added `tangent-circles`. The strategy already said "turn each tangency
  into a distance between centers", which was the untagged half of the solution.
- **2026 AIME I #3** — added `tangent-circles`. A sphere rolling inside a hemisphere is internal
  tangency in 3D, which is why the card now says the rule carries over to spheres verbatim.

## 2021 — all 37 entries reviewed, 17 defective (46%)

| problem | was | now | why |
|---|---|---|---|
| I #1 | `states-recursion-prob` | `conditional-probability` | five sequences do not need a state machine; each race is conditional on the previous result |
| I #4 | `partitions` | `stars-and-bars`, `complementary-counting` | the short route counts ordered solutions, removes the ties and divides by $6$ |
| I #6 | `british-flag-theorem` | `coordinate-bash` | adding the three adjacent-vertex equations and subtracting the fourth cancels every cross term. British Flag is a one-liner *if* you know it, so it is named in the strategy but not tagged |
| I #8 | `absolute-value-rules` | `abs-value-graphing` | both solutions graph $\left\|20\|x\|-x^2\right\|$; the inner bars make it even, the outer bars fold it up |
| I #10 | `sfft` | `euclidean-algorithm` | both solutions name the Euclidean algorithm; Simon's trick appears nowhere |
| I #11 | `cyclic-opposite-angles`, `ptolemys-theorem` | `inscribed-angle-theorem`, `law-of-cosines` | concyclicity comes from the **converse** of the inscribed angle theorem, and Ptolemy is in no solution |
| I #13 | `power-of-a-point` | `tangent-circles` | radical axis is right and stays; the second half is tangency giving $OO_1 = r + r_1$ |
| I #14 | `lte` | `fermats-little-theorem` | lifting the exponent is only an "Alternatively" aside inside Solution 1; the route runs on orders and Fermat |
| I #15 | `descartes-rule-signs` | `completing-the-square` | the linear combination of the two parabolas completes the square into a circle, which is why the four points are concyclic |
| II #2 | `similar-figures-ratios` | `special-right-triangles` | the sub-triangles are exactly $30$-$30$-$120$ and $30$-$60$-$90$ |
| II #4 | `vietas-quadratic` | `vietas-general` | the polynomials are cubics |
| II #6 | `binomial-theorem` | `sfft` | $xy = z(x+y-z)$ factors as $(x-z)(y-z)=0$, which is Simon's trick — and is where `sfft` actually belonged |
| II #7 | `square-of-sum` | `quadratic-formula` | four variables, so the three-variable $(a+b+c)^2$ card does not apply; the route makes $abc$ one unknown and solves a quadratic |
| II #11 | `divisibility-rules` | `periodicity-mod-m` | $\operatorname{lcm}(6,7)=42$ makes everything depend on position mod $42$; the digit-sum rules are never used |
| II #14 | `power-of-a-point`, `centroid-division` | `inscribed-angle-theorem`, `angle-chasing` | two cyclic quadrilaterals from right angles, then one chain of equal inscribed angles |
| II #15 | `linear-recurrence` | `casework-method` | the recursion terminates on perfect squares and is unwound interval by interval; there is no characteristic polynomial |
| 10B #22 | `derangements` | `complementary-counting` | no solution uses derangements |

Also sharpened without a tag change: 12A #25 gained `multiplicative-functions`, which is what
makes the prime-by-prime optimization of $d(n)/\sqrt[3]{n}$ valid.

Correct as tagged, verified against every solution: I #2, #3, #5, #7, #9, #12; II #1, #3, #5,
#8, #9, #10, #12, #13; 12A #12, 12A #22; 12B #7; Fall 10B #11, Fall 12B #23.

**Two more repeat offenders confirmed this year:** `square-of-sum` used for a four-variable
target (third time), and `power-of-a-point` paired with `radical-axis` reflexively on circle
problems where only one of them is used (I #13, II #14, and 2022 II #15).

**Running totals: 199 problems reviewed, 89 defective tags fixed, 4 cards added.**
