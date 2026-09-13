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
| Graphing Absolute Value Relations | `abs-value-relations` | **method** (Algebra) | 2023 12B #9, 2022 12A #5 |

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
- **`rotation-trick`** — wrong **5 times** (2026 I #5, 2025 I #9, 2025 I #14, 2017 I #15,
  1997 #15) and never once right. It is the specific "rotate about a vertex of an equilateral triangle to fuse
  three distances" technique, and it keeps getting attached to any problem that merely contains a
  rotation. Its perfect failure record suggests the name itself invites the error.
- **`square-of-sum`** — it is *Expansions of $(a+b+c)^2$*, three variables only. Used on
  2026 I #14 for a five-variable expansion; the general statement is the elementary symmetric
  relation on `symmetric-polynomial-strategies`.
- **`divisibility-rules`** — it is the digit-sum / alternating-sum card, not general
  divisibility. Wrong twice in 2025 (I #1, I #4).
- **`angle-bisector-theorem`** — it is the *ratio* theorem $BD/DC = AB/AC$. Wrong twice in 2022
  (I #3, II #11), both times where the bisector is used as a **mirror**; that is
  `perp-to-angle-bisector`.
- **`power-of-a-point`, the most-repeated error in the database at five occurrences** — 2022
  II #15, 2021 I #13, 2021 II #14, 2019 I #6, 2019 II #11. Attached whenever a circle or a right
  angle appears, without checking that a solution actually uses a power relation. Its two common
  disguises: a right angle giving $h^2 = pq$ is `altitude-hypotenuse`, and a tangent meeting a
  chord is `tangent-chord-angle`. Three of the five needed no replacement at all.
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
| 2020 (AIME I & II, AMC 10A/10B) | 32 entries | 6 (19%) |
| 2019 (AIME I & II, AMC 10A) | 32 entries | 8 (25%) |
| 2018 (AIME I & II, AMC 10A) | 31 entries, all reviewed | 9 (30%) |
| 2017 (AIME I & II, AMC 10B/12A) | 33 entries, all reviewed | 10 (30%) |
| 2016 (AIME I & II) | 30 entries | 6 (20%) |
| 2015 + 2014 (AIME + AMC 10) | 12 entries | 2 |
| 2013 + 2012 + 2011 | 21 entries | 3 |
| 1983–2010 | 82 entries, all reviewed | 26 (32%) |
| 2024 AMC (10B/12A/12B) | 25 entries | **12 (48%)** |

Every one of the 525 entries has now been reviewed against its solutions.
Both deferred calls are resolved at the end of this file.


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

## 2020 — all 32 entries reviewed, 6 defective (19%)

The lowest defect rate of any year so far, and the reason is worth noting: 2020 has only two AMC
entries. The AMC rows are where the loose tagging lives — 2023's were 50% defective — while the
AIME rows have held up much better throughout.

| problem | was | now | why |
|---|---|---|---|
| I #4 | `divisibility-rules` | dropped | rearranging to $(k-10^4)m = 2020$ makes the condition "$m$ divides $2020$", and the answer format happens to want digit sums. No digit-sum *rule* is used |
| I #7 | `casework-method` | `bijection-method` | choosing $k$ women and omitting $12-k$ men always totals $12$, so it is a bijection to choosing $12$ of $23$; Vandermonde says it in one line. The case-by-case sum is the long way |
| I #10 | `number-of-divisors`, `divisibility-rules` | `exponent-tracking`, `casework-method` | neither tagged card is used; the route is an exponent count per prime, with coprimality to $210$ forcing the shared prime to be $\ge 11$ |
| II #12 | `divisibility-rules` | `floor-multiples` | the work is bounding $n$ between $\frac{2000}{m}$ and $\frac{2000}{m-1}$ for the four odd $m$, not any digit-sum test |
| II #13 | `incircle-tangent-lengths` | `tangent-facts` | the figure is a **pentagon**, so the triangle $s-a$ formula cannot apply; it is equal tangents from each vertex. `inradius-area` correctly stays, because that card already says $A=rs$ holds for any tangential polygon |
| II #15 | `symmedian-lemoine` | `tangent-chord-angle` | the route gets $\cos A$ from the tangent-chord angle and finishes with the law of cosines on cyclic $AXTY$. $AT$ *is* the $A$-symmedian, but no solution uses that |

Correct as tagged, verified against every solution: I #1, #2, #3, #5, #6, #8 (complex geometric
series, the step vector multiplied by $\tfrac12 e^{i\pi/3}$), #9, #11, #14, #15 (genuinely a power
of a point problem — Solution 1 is titled that); II #1, #2, #3, #4, #5, #6, #7, #8, #9, #10, #11,
#14; 10A #24; 10B #22 (MAA's own solution completes the square then differences of squares, which
is exactly Sophie Germain).

**I #12 is the instructive contrast to 2021 I #14.** Both are $a^n - b^n$ divisibility problems and
both carry `lte`. Here it is **correct**: lifting the exponent is the main route, Solution 1.1 runs
on it, and the problem is built for it. On 2021 I #14, LTE appeared only as an "Alternatively"
aside. Same card, same problem shape, opposite verdicts — which is why the rule is to read the
solutions rather than pattern-match the problem.

**Left unresolved deliberately: I #13.** It carries `incenter-excenter-lemma` and `law-of-cosines`.
Solution 2 names Fact 5 explicitly and then uses Ptolemy plus a homothety at $I$; Solution 1 is a
similar-triangles argument comparing altitudes. The incenter-excenter tag is certainly right, but I
could not decide between those two routes for the second tag without reading both in full, and
guessing would risk making it worse. Recorded rather than churned.

**Running totals: 231 problems reviewed, 95 defective tags fixed, 4 cards added.**

## 2019 — all 32 entries reviewed, 8 defective (25%)

| problem | was | now | why |
|---|---|---|---|
| I #1 | `base10-curiosities` | `geometric-series` | that card is a trivia list (Kaprekar, narcissistic numbers). The route writes each term as $10^k-1$, sums the geometric series into a repunit, and subtracts $321$ |
| I #6 | `power-of-a-point` | `altitude-hypotenuse` | the right angle at the foot gives $KL^2 = KP\cdot KN$, the geometric-mean relation, not a circle configuration |
| I #8 | `power-sums` | `binomial-theorem` | `power-sums` is *Sums of Powers of Integers*, $\sum k^2$ and friends. This problem is $\sin^{10}x+\cos^{10}x$, a power sum in two variables, a different object entirely |
| I #12 | `de-moivre` | `rotation-90` | perpendicularity in the complex plane is the quotient being purely imaginary, i.e. a $90^\circ$ rotation; no polar form appears |
| I #15 | `radical-axis`, `power-of-a-point` | `homothety-monge`, `tangent-circles` | the route is the homothety at $A$ giving parallelogram $OO_1PO_2$, with internal tangency supplying the collinearities. Radical axis belongs to the olympiad-harmonic solution |
| II #4 | `generating-function-method` | dropped | both leading solutions case on the number of $5$s and track exponent parities |
| II #5 | `pie`, `constructive-counting` | `gap-method` | read as each ambassador-advisor block choosing a non-adjacent *gap*, the count is immediate and inclusion-exclusion is unnecessary |
| II #11 | `power-of-a-point` | dropped | tangent-chord gives the angles, similar triangles the ratios, law of cosines the finish. Power of a point appears in **no** solution |

Correct as tagged, verified against every solution: I #2, #3, #4, #5, #7 (logs plus
$\gcd\cdot\operatorname{lcm}=xy$, both explicit), #9, #10, #11 (the exradius formula by name),
#13, #14; II #3, #6, #7, #8, #9, #10, #12, #13, #14 (Chicken McNugget genuinely, in Solution 2),
#15 (Solution 1 says "by PoP" outright); 10A #22; 10A #25 (Wilson's theorem by name).

**Running totals: 263 problems reviewed, 103 defective tags fixed, 4 cards added.**

## 2018 — 31 entries, 30 reviewed, 9 defective (30%)

| problem | was | now | why |
|---|---|---|---|
| I #10 | `stars-and-bars` | `bijection-method` | the official route is a bijection to strings of $X$s and $Y$s of length $15$, which makes the wheel structure vanish; no distribution is counted |
| I #11 | `lte` | dropped | the orders of $3$ are $5$ mod $121$ and $39$ mod $169$, read off directly, and the answer is their lcm. Lifting the exponent is not needed |
| I #13 | `law-of-cosines`, `angle-bisector-theorem` | `law-of-sines`, `trig-area` | $\angle I_1AI_2 = \tfrac12\angle A$ is fixed, so $[AI_1I_2] = \tfrac12(AI_1)(AI_2)\sin\angle I_1AI_2$ and the law of **sines** supplies $AI_1$. Neither tagged card appears |
| I #15 | `cyclic-opposite-angles`, `ptolemys-theorem` | `quadrilateral-diagonal-area`, `chord-length` | each diagonal is a chord of the unit circle, so $2\sin(a+b)$ gives it, and the area is $\tfrac12 d_1d_2\sin\theta$. Ptolemy is in none of the leading solutions |
| II #5 | `vietas-general` | `eulers-formula` | there is no polynomial in the problem at all; the route takes magnitudes and arguments of the three products in polar form |
| II #8 | `casework-method` | `recursive-counting` | the recommended route fills the grid recursively, one number per lattice point |
| II #9 | `area-method` | `centroid-division` | the centroid being a third of the way up each median is what places the seven vertices; then shoelace. No area-ratio method |
| II #11 | `pie` | `casework-method` | the solutions case on the position of $6$ and sum; no inclusion-exclusion |
| II #14 | `incircle-tangent-lengths`, `harmonic-bundle`, `power-of-a-point` | `tangent-facts`, `law-of-sines` | equal tangents plus the law of sines is the accessible route. The $s-a$ formula does not apply, and the harmonic/Brianchon machinery is the projective alternative |

Correct as tagged, verified against every solution: I #1, #2, #3, #4, #5, #6, #7, #8, #9, #14;
II #2, #4, #6 (rational root theorem by name), #7, #10, #12, #13, #15 (stars and bars named in
Solution 2); 10A #24 — where `angle-bisector-theorem` is used **correctly**, through the ratio,
and `shared-angle-area-ratio` is right too because $[ADE]/[ABC] = \frac{AD\cdot AE}{AB\cdot AC}$
with midpoints gives $\tfrac14$.

**Left unresolved: I #12.** It carries `roots-of-unity-filter` and `generating-function-method`,
which are Solution 9's tools, while the page has **fourteen** solutions including two billed as
"quickest recursion" and one as "Symmetry". The tagged pair is the standard general method for
"sum divisible by 3" and is genuinely instructive, but it is not the fastest route here. Deciding
between teaching the general tool and tagging the quickest route needs a call I did not want to
make silently.

**Running totals: 293 problems reviewed, 112 defective tags fixed, 4 cards added.**

## 2017 — 32 of 33 reviewed, 9 defective (28%)

| problem | was | now | why |
|---|---|---|---|
| I #2 | `divisibility-rules` | dropped | equal remainders mean $m$ divides each difference, so $\gcd(68,85,153)=17$ settles it. No digit-sum rule |
| I #4 | `herons-formula` | dropped | the base is $20,20,24$, so the altitude is $16$ by Pythagoras and the area is $\tfrac12\cdot24\cdot16$. Heron is never invoked |
| I #8 | `law-of-sines` | `thales-theorem` | the two right angles put $Q$ and $R$ on the circle with diameter $OP$ by the converse of Thales; then a chord at most the radius means an arc at most $60^\circ$ |
| I #9 | `digit-sum-mod-9`, `divisibility-rules` | `telescoping`, `crt` | no digit sums appear at all. Summing the recursion telescopes to a closed form, then $99 = 9\cdot11$ splits the divisibility |
| I #10 | (one tag only) | + `cross-ratio` | the given expression *is* a cross-ratio, and a real cross-ratio means the four points are concyclic — which is the whole problem. It was untagged |
| I #15 | `rotation-trick` | `point-line-distance` | the equilateral condition becomes a linear constraint $px+qy=1$, and minimizing $\sqrt{x^2+y^2}$ on a line is the distance from the origin to it. A $60^\circ$ rotation appears in one solution but this is not the distance-fusing rotation trick |
| II #6 | `quadratic-formula` | `completing-the-square` | completing the square gives $s^2-(2n+85)^2 = 843$, which factors as a difference of squares; no quadratic is ever solved by formula |
| II #8 | `divisibility-rules` | `modular-basics` | the condition is a congruence mod $720 = 2^4\cdot3^2\cdot5$ handled prime power by prime power |
| 10B #19 | `rouths-theorem` | `law-cosines-60-120` | Routh's theorem is about cevians dividing sides *internally*; here the sides are extended and the $120^\circ$ law of cosines gives $B'C'^2 = 37$ in one line |

Correct as tagged, verified against every solution: I #1, #3, #5, #6, #7 (Vandermonde named
outright), #11, #12, #13, #14 (CRT named); II #1, #2, #3, #5, #7, #9, #10, #11, #12, #13, #14,
#15 (the disphenoid/parallelepiped construction, by name); 12A #25 (the leading solution is
explicitly "a cleaner generating function"). II #4 could not be checked because its solution is
entirely display images that the extractor drops; its `base-conversion` tag matches the problem
statement, so it was left alone.

**`rotation-trick` is now at four corrections** (2026 I #5, 2025 I #9, 2025 I #14, 2017 I #15) and
has never once been right. Every time, the problem merely *contains* a rotation. It may be worth
asking whether the card's name invites the error.

**One judgment call, kept deliberately: 10B #18 keeps `burnsides-lemma`.** The fastest route on an
AMC 10 is Solution 1, which just lists the six placements. But two other solutions apply Burnside
properly, the problem is a canonical exercise for it, and tagging the enumeration instead would
teach nothing transferable. Recorded here so it is reviewable rather than silent — same treatment
as 2024 I #7's `harmonic-addition`.

**Running totals: 325 problems reviewed, 121 defective tags fixed, 4 cards added.**

## 2016 — all 30 entries reviewed, 6 defective (20%)

| problem | was | now | why |
|---|---|---|---|
| I #12 | `divisibility-rules` | `completing-the-square` | multiplying by $4$ gives $(2m-1)^2+43$, so every prime factor must make $-43$ a square mod $p$; checking $p=3,5,7$ by hand forces all prime factors $\ge 11$. No digit-sum rule |
| II #7 | `casework-method`, `quadratic-formula` | `am-gm`, `similar-figures-ratios` | the corner triangles are all similar so the nested areas are a geometric progression, and AM-GM (named outright in the solution) bounds the inner area. Neither tagged card is used |
| II #10 | `inscribed-angle-theorem`, `power-of-a-point` | `ratio-lemma`, `law-of-sines` | the leading solution names the **ratio lemma** and chains three applications of the law of sines. Ptolemy-plus-power-of-a-point is a real alternative but was not what either tag pointed at |
| II #12 | `constructive-counting` | `recursive-counting` | the route is an explicit $f(n,C)$ recursion around the ring |
| II #14 | `law-of-cosines` | `cross-section-method` | the equilateral base gives both radii, then a cross-section through an altitude reduces the sphere problem to two right triangles. No law of cosines appears |
| II #15 | `pythagorean-identities` | dropped | there is **no trigonometry in the problem at all**; it is purely the equality case of Cauchy-Schwarz in Engel form |

Correct as tagged, verified against every solution: I #1, #2, #3, #4, #5, #6 (the
incenter/excenter lemma is named in Solution 2), #7 (a complex number is real iff its imaginary
part vanishes), #8, #9, #10, #11, #13, #14, #15; II #1, #2, #3, #4, #5, #6, #8 (stars and bars
named), #9, #11 (all three tags, PIE included), #13.

The AIME-only years keep coming in cleaner than the AMC-heavy ones: 2016 is the second-lowest
rate so far after 2020, and both years have no AMC entries at all.

**I #15 is the case where `radical-axis` + `power-of-a-point` is *correct*** — every solution
opens "by the radical axis theorem" and later says "by power of a point". Worth recording
alongside the five times that pair was wrong: the card is not a bad card, it is a card that gets
attached on sight of a circle instead of on reading the solution.

**Running totals: 355 problems reviewed, 127 defective tags fixed, 4 cards added.**

## 2015 and 2014 — all 12 entries reviewed, 2 defective

The database thins out sharply before 2016: these two years carry twelve entries between them.

| problem | was | now | why |
|---|---|---|---|
| 2015 I #10 | `finite-differences` | `shifted-polynomial-construction` | there is an exact card for this and it was not used: a cubic turns at most twice, so $f(1)=f(5)=f(6)$ and $f(2)=f(3)=f(7)$; shifting by the common value makes three inputs roots, giving $f(x)-12 = a(x-1)(x-5)(x-6)$. The card is literally called "Building a Polynomial from Equal Values" |
| 2014 I #15 | `cyclic-opposite-angles` | `thales-theorem` | $\angle DBE = 90^\circ$ makes $DE$ a diameter, and every other angle on it is right too. It is Thales and its converse, not opposite angles of a cyclic quadrilateral |

Correct as tagged: 2015 I #2 (Solution 1 is titled "Principle of Inclusion-Exclusion"),
2015 II #8 (the $(2a-3)(2b-3)$ factoring is Simon's trick after clearing a factor of $4$),
2015 10B #22, 2015 10B #23; 2014 I #3 ($\phi(1000)=400$ used outright), 2014 II #7 ("a
telescoping series of logs"), 2014 II #8, 2014 II #9, 2014 II #10 (Solution 1 is titled
"Roots of Unity"), 2014 10A #22.

Two cards vindicated here after being wrong elsewhere: **`legendres-formula`** is *correct* on
2015 10B #23, where Solution 2 opens "By Legendre's Formula" on a single factorial, in contrast
to 2023 10B #15 where it had been applied to a product of factorials. And **`tangent-circles`**,
added earlier in this sweep, is doing its job on 2014 II #8.

**Running totals: 367 problems reviewed, 129 defective tags fixed, 4 cards added.**

## 2013, 2012, 2011 — 12 of 21 reviewed, 2 defective

| problem | was | now | why |
|---|---|---|---|
| 2011 II #4 | `angle-bisector-theorem`, `mass-points`, `menelaus-theorem` | `menelaus-theorem`, `angle-bisector-theorem` | three tags for three *competing* solutions. Menelaus on $\triangle ACD$ with transversal $PB$ is a single line and is the best route; mass points is Solution 2's alternative |
| 2012 I #10 | `hensel-lifting` | `casework-method` | no solution invokes Hensel. $x^2 \equiv 256 \pmod{1000}$ splits mod $8$ and mod $125$ by CRT, or factor $(x+16)(x-16)$ and note the factors differ by $32$ so only one can carry the $5$s |

Correct as tagged, verified against every solution: 2013 I #13 (Heron named in all three
solutions, similar ratio $17/25$, areas summing as a geometric series — all three tags earned),
2013 II #13 (Stewart's theorem applied twice, by name), 2013 II #15 (both laws used explicitly),
2013 12B #17 (Cauchy-Schwarz in Solutions 1 and 2); 2012 I #12, 2012 I #14 (Vieta gives sum of
roots $0$, so the centroid is the origin); 2011 I #6, 2011 I #13 (the point-to-plane distance
formula outright), 2011 I #15, 2011 II #12 (all three tags: circular arrangements, complementary
counting and PIE).

**2012 I #12 is another `angle-bisector-theorem` vindication** — Solution 1 names it and uses the
ratio properly. That card is now 2 correct (2018 10A #24, 2012 I #12) against 2 wrong (2022 I #3,
2022 II #11), which supports the diagnosis that the problem is on-sight tagging rather than a bad
card.

**Stopped here: AoPS began returning HTTP 429.** Nine entries in these years are unread
(2011 II #3, #6, #7, #14; 2012 I #6, #8, II #12; 2013 I #9, #11), along with the 103-entry span
from 1983 to 2010. Resume after the rate limit clears, at a gentler fetch rate.

**Running totals: 379 problems reviewed, 131 defective tags fixed, 4 cards added.**

## 2011–2013 finished, and a 30-entry pass over 1983–2010

The nine unread 2011–2013 entries are done (one defect), and thirty of the ninety-four entries
spanning 1983–2010 have been read, prioritising the cards with known failure records.

| problem | was | now | why |
|---|---|---|---|
| 2012 I #8 | `similar-figures-ratios` | `coordinate-bash` | both solutions set up coordinates and a plane equation, then decompose the piece into pyramids. No similarity ratio anywhere |
| 1993 #6 | `divisibility-rules` | `crt` | the three consecutive-run sums give congruences mod $9$, $10$ and $11$ to combine; no digit-sum rule |
| 1988 #10 | `eulers-polyhedron-formula` | `complementary-counting` | the vertex count comes from counting face corners and dividing by three, and the answer is $\binom{48}{2}$ minus edges and face diagonals. Euler's formula is never used |
| 1992 #14 | `cevas-theorem` | `cevian-area-ratio` | the route is $\frac{AO}{OA'} = \frac{K_B+K_C}{K_A}$ along each cevian; Ceva's *concurrency* condition is never invoked |
| 1997 #15 | `rotation-trick` | `angle-addition` | expanding $\sin(60^\circ+x)$ relates the triangle's side to the rectangle's $10$ and $11$. A complex-plane rotation sets it up, but this is not the distance-fusing trick |
| 2007 II #9 | `incircle-tangent-lengths` | `tangent-facts` | the solution names the **two-tangent theorem**; the $s-a$ formula is not what is applied |
| 2008 II #8 | `trig-telescoping-product` | `product-sum` | it is a telescoping **sum** created by product-to-sum, not a telescoping cosine product |
| 1990 #15 | (one tag) | + `sp-substitution` | setting $S=x+y$, $P=xy$ is what makes $T_n = ST_{n-1}-PT_{n-2}$ usable, and it was untagged |
| 2005 II #15 | (two tags) | + `tangent-circles` | the solution states the card's content verbatim: externally tangent means $d = r_1+r_2$, internally $|r_1-r_2|$. That is what converts both tangencies into $CF_1+CF_2 = 20$, an ellipse |

Correct as tagged, verified against every solution: 2011 II #3, #6 (stars and bars named), #7,
#14 (positions as residue triples mod $2,3,5$); 2012 I #6 (De Moivre and roots of unity both
named), II #12 (CRT named); 2013 I #9, #11; 1985 #6, 1987 #14 (Solution 1 is titled "Sophie
Germain Identity"), 1988 #12 (titled "Ceva's Theorem sum form"), 1989 #15 (titled "Ceva's
Theorem, Stewart's Theorem"), 1992 #13, #15, 1993 #7, #10, #11, 1994 #6, #11, 2001 I #12,
2003 I #7, II #6, 2005 I #15, 2006 II #8, 12A #24, 2007 II #15, 12B #14, 2009 I #12, 2010 I #4.

### Five more vindications, which settle the diagnosis

Every card with a bad record also has a clean one, and in each case the correct use is one where
a solution *names* the tool:

- **`power-of-a-point`** is right on 2005 I #15 ("two applications of the Power of a Point
  Theorem"). Now 2 correct against 5 wrong.
- **`finite-differences`** is right on 1989 #8, where Solution 2 takes repeated differences — the
  opposite verdict to 2015 I #10.
- **`eulers-polyhedron-formula`** is right on 1993 #10 ($E = V+30$ used explicitly), the same
  year it was wrong on 1988 #10.
- **`burnsides-lemma`** is unambiguously right on 2006 II #8 (Solution 2 is titled for it), which
  also settles the 2017 10B #18 judgment call in favour of keeping it.
- **`generating-function-method`** is right on 2010 I #4 ("solved quickly and easily with
  generating functions"), against being wrong on 2019 II #4 and 2023 12B #19.
- **`legendres-formula`** is right on 1992 #15 and 2006 II #3, wrong only on 2023 10B #15.

**`rotation-trick` remains the sole card with no correct use at all: 0 for 5.**

Fetch rate matters: AoPS returns HTTP 429 if pushed, so this pass ran one request per ~1.7 s.

**Running totals: 418 problems reviewed, 140 defective tags fixed, 4 cards added.**


## 1983–2010 finished, read two or three solutions deep

The remaining 52 entries were read at 600–700 characters per solution rather than skimmed, which
is what caught the four cases below where the *strategy prose* described a route no solution takes.
**Twenty-six of 82 entries in this block carried a defective tag (32%).** The block splits sharply:
the 1980s AIME entries were nearly all correct, and every defect clustered in 1997 and later.

| problem | was | now | why |
|---|---|---|---|
| 1983 #14 | `midsegment-theorem` | `similar-figures-ratios` | the midsegment appears in none of the three solutions |
| 1985 #13 | + `bezouts-identity` | dropped | only the Euclidean gcd reduction is used, never a Bézout certificate |
| 1989 #9 | `modular-basics` | `crt` | Solution 1 is titled "(FLT, CRT, Inequalities)" |
| 1991 #12 | (one tag) | + `ptolemys-theorem` | genuinely applied to cyclic $BPOQ$ |
| 1992 #12 | (one tag) | + `bijection-method` | the count is transported to a friendlier set |
| 1997 #2 | (one tag) | + `power-sums` | $\sum i^2 = \frac{8\cdot9\cdot17}{6}$ is the sum-of-squares formula, used as such |
| 1997 #10 | `casework-method` | `bijection-method` | three-case casework is the slow route; any two cards determine the third, so the count is $\binom{27}{2}/3$ |
| 2001 II #12 | `regular-tetrahedron` | `similar-figures-ratios` | everything is a ratio, so no tetrahedron volume formula is needed |
| 2002 I #4 | (one tag) | + `sfft` | Solution 2 adds $29^2$ and factors $(29-m)(29+n) = 29^2$ |
| 2002 II #11 | (one tag) | + `rational-root-theorem` | two thirds of the work is solving $8r^3 - 8r^2 + 1 = 0$, and the root $\tfrac12$ comes from the $p/q$ candidates |
| 2003 I #8 | (two tags) | + `bounding-diophantine` | the crux is that $2d(2d-15) = 3a(10-d)$ forces both sides positive, leaving $d \in \{8,9\}$ |
| 2003 II #4 | `regular-tetrahedron` | `tetrahedron-centroid` | same as 2001 II #12; what is used is "a face center is the average of its three vertices" |
| 2003 II #14 | `shoelace-formula` | `coordinate-bash` + `complex-bash` | no solution uses the shoelace formula. Solution 1 rotates by $e^{2\pi i/3}$ and splits the hexagon into two triangles and a parallelogram |
| 2004 I #11 | + `frustum-volume` | dropped | the frustum is handled as the whole cone minus the small one |
| 2004 I #7 | (two tags) | + `power-sums` | $1 + 4 + \cdots + 225 = 1240$ by the sum-of-squares formula |
| 2007 I #9 | `pythagorean-theorem` + `similar-figures-ratios` | `tangent-facts` + `half-angle` | the route is equal tangent segments plus the tangent half-angle formula; the right triangle is only the given data |
| 2008 II #7 | `newtons-sums` | `sum-zero-identities` | Newton's sums are an aside link on the page; the route is $r+s+t=0 \implies r^3+s^3+t^3 = 3rst$ |
| 2009 AMC 12A #19 | + `regular-polygon-area` | dropped | no polygon area is computed. The card defines the apothem as a symbol but never states the relation the problem needs |

### Four strategies described a route that does not exist

These would not have been caught by reading one solution excerpt.

- **2007 I #14** named the wrong invariant. The prose called $\frac{a_{n+1}^2+a_n^2}{a_{n+1}a_n}$
  the invariant, but that is the problem's *target*. The invariant is
  $\frac{a_{n+1}+a_{n-1}}{a_n} = 225$, which is what makes the nonlinear recurrence secretly the
  linear $a_{n+1} = 225a_n - a_{n-1}$.
- **2002 AMC 12A #11** described the two-equation system; the one-line route is the harmonic mean,
  $\frac2s = \frac1{40} + \frac1{60}$.
- **2004 II #5** said "tally the schedule debt", which is not a method. Rewritten with the actual
  $\tfrac{121}{36}$ elapsed and $\tfrac{36}{23}$ remaining.
- **1983 #7** gave no numbers; rewritten with the gap placement that makes the complement
  $\frac{21 \cdot 20}{23 \cdot 24}$.

### Three tags deliberately left alone after checking

- **1991 #11** — `regular-polygon-area` stays, because here the polygon's area genuinely is the
  target. Contrast 2009 AMC 12A #19, where it was dropped.
- **1987 #3** — `product-of-divisors` stays even though no solution writes $n^{d(n)/2}$. It is the
  one-step derivation of the $d(n) = 4$ condition the solutions reach by inspection.
- **2000 I #14** and **2002 I #1** keep two tags spanning two routes, because in both cases the two
  routes are equally short and a solver would plausibly take either.

### A coverage gap this block exposed

Worth one clause on an existing card rather than a new card, and stated without reference to the
problem that produced it: **in a regular polygon the circumradius, the apothem and half a side form
a right triangle**, so $R^2 = a^2 + (s/2)^2$. `regular-polygon-area` names the apothem in its
description but never relates it to $R$ and $s$, and `regular-polygon-angles` does not either.
This is what makes the annulus between a regular polygon's two circles depend only on the side
length, independent of the number of sides.

### The tally was wrong, and there is a whole unreviewed block

Two bookkeeping errors in this file, both now fixed above:

- 1983–2010 holds **82** entries, not 94.
- The years table covered "2024 AIME I & II, 30 problems", but the database holds **55** entries
  from 2024. The other **25 are AMC entries** — 2 from 10B, 18 from 12A, 5 from 12B — and none of
  them has ever been reviewed. Given that AMC-heavy blocks run 40–50% defective while AIME-only
  years run 20–25%, this is the highest-yield block left in the database.

One entry each in 2018 and 2017 also remains unread.

**Running totals: 498 problems reviewed, 158 defective tags fixed, 4 cards added.**


## The 2024 AMC block, and a defect class nobody was looking for

Twenty-five entries, **twelve defective (48%)** — right on the AMC-heavy pattern (2023 AMC was 50%)
and double the AIME-only rate. The block also turned up a kind of error the per-entry review had no
way to see, described at the end.

| problem | was | now | why |
|---|---|---|---|
| 12A #9 | `casework-method` | `difference-of-squares-rep` | the crux is that the two factors of $2560$ must share a parity, which is that card's content; there is no casework |
| 12A #10 | `angle-addition` | `double-angle` | the route is $\cos 2\alpha = 1 - 2\sin^2\alpha = \tfrac7{25} = \sin\beta$, a double angle throughout |
| 12A #11 | `divisibility-rules` | `modular-basics` | no digit-sum test. Cancelling the $2$ from $2b^3+2b+4 \equiv 0 \pmod{16}$ is the congruence-cancellation rule, which shrinks the modulus to $8$ |
| 12A #12 | + `casework-method` | dropped | the search is for the largest $n$ with $n$ and $n+1$ both dividing $720$, not a case split |
| 12A #13 | `fx-pairing` | dropped | that card pairs terms in a *sum*; here the substitution $f(a-t) = f(a+t)$ is a functional-equation move |
| 12A #15 | `vietas-general` + `newtons-sums` | `fundamental-theorem-algebra` + `difference-of-squares` | the fast route computes no symmetric sums at all: $p^2+4 = (p+2i)(p-2i)$, and the factored form turns the product into $f(2i)f(-2i)$ |
| 12A #16 | `constructive-counting` | `multinomial-theorem` | the count is literally $\binom{12}{4,4,4}$ |
| 12A #18 | `angle-between-lines` + `periodicity-mod-m` | `angle-addition` | no slopes and no sequence mod $m$. What is used is $\tan 75^\circ = 2+\sqrt3$ from the tangent sum formula, giving $30^\circ$ per card |
| 12A #21 | (two tags) | + `power-sums` | $\sum_{n=1}^{100} n^2$ is the sum-of-squares formula, and the answer needs its value |
| 12A #25 | `functional-substitution` | `reflection-coordinates` | not a functional equation. Symmetry about $y = x$ is the coordinate swap that card states, which is what makes the map its own inverse |
| 12B #14 | `crt` | `casework-method` | the modulus is the single prime power $5^3$; nothing is split by CRT |
| 12B #20 | `apollonius-theorem` | `auxiliary-lines` + `triangle-inequality` | the one-line route doubles the median, making a $(40, 42, 2x)$ triangle whose triangle inequality gives the domain directly. No median-length formula is needed |

### The defect class: AMC 10 and AMC 12 share problems

**2024 AMC 10B #18 and 2024 AMC 12B #14 are the same problem**, and they carried different tags —
10B had `casework-method`, 12B had `crt`. The same is true of **2024 AMC 10B #23 and 12B #18**,
which agreed. Checking every year where a 10 and a 12 of the same letter both appear in the
database found two more shared pairs, **2023 AMC 10A #16 = 12A #13** and
**2023 AMC 10B #17 = 12B #13**, both of which already agreed on tags.

So four shared pairs exist in the database and one of the four had drifted. The rule to hold going
forward: **an AMC 10 entry and an AMC 12 entry that are the same problem must carry the same tag
set**, since a solver reaching either page is looking at one problem. The AoPS page announces it
("The following problem is from the 2023 AMC 10A #16 and 2023 AMC 12A #13"), so the check is free
while the page is already open.

### Two coverage gaps this block exposed

Both stated without reference to the problem that produced them, and both are one clause on a card
that already exists rather than a new card:

- **Reflecting a graph in $y = x$ produces the inverse relation**, so a graph symmetric about that
  line is its own inverse. `reflection-coordinates` states the point-level swap $(x,y) \to (y,x)$
  but never draws the function-level consequence, and no card in the library mentions inverse
  functions at all.
- The **regular-polygon right triangle** noted in the previous section, $R^2 = a^2 + (s/2)^2$.

**Running totals: 523 problems reviewed, 170 defective tags fixed, 4 cards added.**


## The database is fully reviewed: the last two entries and both deferred calls

### 2017 AIME II #4 — was unreadable, now read

It was skipped because the extractor dropped its display-math images. The fix was one line: the
AoPS wiki puts display math in `img.latexcenter`, not just `img.latex`, so the helper now replaces
both with their `alt` text. Worth keeping, since any future pass hits the same wall otherwise.

Reading it changed the tags: `casework-method` described Solution 3, but Solution 2 avoids casework
entirely. Count every base-three numeral with digits in $\{1,2\}$ below $3^7$, which is
$2 + 4 + \cdots + 128 = 254$, then subtract the $2 \cdot 2^4 = 32$ that exceed $2017$. So
`casework-method` became `complementary-counting`.

### 2018 AIME I #12 — keep the roots-of-unity filter

The worry was that the tagged pair came from Solution 9 of fourteen, while two solutions are billed
"quickest recursion". Working the filter out settles it: $\prod_{k=1}^{18}(1+x^k)$ evaluated at a
primitive cube root splits by residue class into $2^6 \cdot (1+\omega)^6 (1+\omega^2)^6$, and
since $(1+\omega)(1+\omega^2) = 1$ that whole tail collapses to $2^6$. The count is
$\frac{2^{18} + 2 \cdot 64}{3}$ in about three lines. It is simultaneously the fastest route and
the transferable one, whereas the recursions are built for this problem. Tags stand.

### 2020 AIME I #13 — keep the incenter/excenter lemma and the Law of Cosines

Reading Solution 2 in full resolves it: **both tagged cards are used there**, not just Fact 5.
The lemma gives $M_AB = M_AC = M_AI$, Ptolemy turns that into $AI = IM_A$, the homothety at $I$
with ratio $2$ gives $[AEF] = \tfrac14[M_AM_BM_C]$, and the Law of Cosines supplies the three
half-angle cosines that the area formula $2R^2\sin X \sin Y \sin Z$ needs. The coordinate bash
of Solution 3 is a real alternative, but for this configuration it is longer in practice, and it
would trade a named lemma for generic machinery. Tags stand.

**Final state: all 525 entries reviewed, 171 defective tags fixed, 4 cards added.**
