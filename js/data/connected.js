// Connected formulas: a hand-written list, on a few broad "hub" cards, of the cards that are
// directly part of the same idea. It renders on the card's page after Practice problems and before
// Related, as the same row of name chips Related uses. Each note says in one line how the card
// connects; it is the editor's justification for the link and is not displayed. Related is computed and means "explore
// more"; this is curated and means "these belong to this card". Only broad cards get one.
// Checked by tools/check-lists.py: every id must resolve, and no card may list itself or repeat.
window.MATH_CONNECTED = {
  "auxiliary-lines": [
    { id: "median-doubling", note: "Double a median past the midpoint to make a parallelogram." },
    { id: "parallel-line-similarity", note: "Draw a parallel line to create a pair of similar triangles." },
    { id: "perp-to-angle-bisector", note: "Reflect a vertex across an angle bisector, or drop a perpendicular to it." },
    { id: "reflection-shortest-path", note: "Reflect an endpoint across a line to straighten a broken path." },
    { id: "rotation-trick", note: "Rotate part of the figure to bring separated lengths together." },
    { id: "tangent-facts", note: "Draw the radius to a point of tangency for a right angle." },
    { id: "phantom-point", note: "Construct the point you want, then show it is the given one." }
  ],
  "p-adic-valuation": [
    { id: "legendres-formula", note: "$v_p(n!)$, counted one power of $p$ at a time." },
    { id: "lte", note: "$v_p(a^n - b^n)$ from $v_p(a - b)$ and $v_p(n)$." },
    { id: "kummers-theorem", note: "$v_p$ of a binomial coefficient, as the number of carries in base $p$." },
    { id: "trailing-zeros", note: "$v_5(n!)$, read as the zeros at the end of $n!$." },
    { id: "prime-divides-binomial", note: "$p$ divides $\\binom pk$ for $0 \\lt k \\lt p$." },
    { id: "exponent-tracking", note: "Divisibility conditions rewritten as conditions on exponents, one prime at a time." }
  ],
  "mean-chain": [
    { id: "am-gm", note: "The AM $\\ge$ GM link, with its equality case." },
    { id: "weighted-am-gm", note: "AM-GM with unequal weights." },
    { id: "power-mean-inequality", note: "The whole chain as one family: $M_p$ increases with $p$." },
    { id: "cauchy-schwarz", note: "QM $\\ge$ AM and AM $\\ge$ HM both follow from it." },
    { id: "jensens-inequality", note: "Each link is Jensen's inequality for a suitable convex function." }
  ],
  "modular-basics": [
    { id: "fermats-little-theorem", note: "$a^{p-1} \\equiv 1 \\pmod p$ when $p \\nmid a$." },
    { id: "eulers-theorem", note: "$a^{\\varphi(n)} \\equiv 1 \\pmod n$ when $\\gcd(a, n) = 1$." },
    { id: "wilsons-theorem", note: "$(p - 1)! \\equiv -1 \\pmod p$." },
    { id: "crt", note: "Congruences to coprime moduli, solved one modulus at a time." },
    { id: "modular-inverse", note: "Division modulo $n$, when the divisor is coprime to $n$." },
    { id: "multiplicative-order", note: "The first power of $a$ that is $1$ modulo $n$." },
    { id: "divisibility-rules", note: "Remainders read off the digits, through the remainders of powers of $10$." }
  ],
  "vietas-general": [
    { id: "vietas-quadratic", note: "The quadratic case: sum $-\\frac ba$, product $\\frac ca$." },
    { id: "newtons-sums", note: "Power sums of the roots, from the coefficients." },
    { id: "symmetric-polynomial-strategies", note: "Any symmetric expression in the roots, reduced to the coefficients." },
    { id: "root-transformations", note: "The polynomial whose roots are a function of the old roots." },
    { id: "fundamental-theorem-algebra", note: "Why a polynomial of degree $n$ has exactly $n$ roots to relate." }
  ],
  "inscribed-angle-theorem": [
    { id: "tangent-chord-angle", note: "The limiting case: the angle between a tangent and a chord." },
    { id: "angle-chord-secant", note: "Angles whose vertex is inside or outside the circle." },
    { id: "thales-theorem", note: "An angle in a semicircle is a right angle." },
    { id: "cyclic-opposite-angles", note: "Opposite angles of a cyclic quadrilateral add to $180^\\circ$." },
    { id: "cyclic-equal-angles", note: "Angles on the same side of a chord of a cyclic quadrilateral are equal." }
  ],
  "power-of-a-point": [
    { id: "radical-axis", note: "The points with equal power to two circles form a line." },
    { id: "tangent-facts", note: "From an outside point the power is the squared tangent length." },
    { id: "inversion-properties", note: "Inversion is built on power: $OP \\cdot OP^* = r^2$." }
  ],
  "binomial-theorem": [
    { id: "binomial-row-sums", note: "Set $x = y = 1$, or $x = 1$ and $y = -1$, to sum a row." },
    { id: "pascals-identity", note: "The recursion that builds each row from the one above." },
    { id: "hockey-stick", note: "A sum down a diagonal of Pascal's triangle." },
    { id: "vandermonde", note: "Two expansions multiplied, coefficient by coefficient." },
    { id: "multinomial-theorem", note: "More than two terms in the base." },
    { id: "generalized-binomial-series", note: "Any exponent, as an infinite series." },
    { id: "lucas-theorem", note: "Binomial coefficients modulo a prime, digit by digit." }
  ],
  "triangle-area-standard": [
    { id: "trig-area", note: "$\\frac12 ab\\sin C$, from two sides and the angle between them." },
    { id: "herons-formula", note: "Area from the three sides alone." },
    { id: "inradius-area", note: "$[ABC] = rs$, from the inradius and semiperimeter." },
    { id: "circumradius-area", note: "$[ABC] = \\frac{abc}{4R}$, from the circumradius." },
    { id: "trig-area-circumradius", note: "$[ABC] = 2R^2\\sin A\\sin B\\sin C$, from the angles." },
    { id: "shoelace-formula", note: "Area from the coordinates of the vertices." },
    { id: "cevian-area-ratio", note: "Comparing areas that share a height." }
  ],
  "pythagorean-theorem": [
    { id: "special-right-triangles", note: "The $45$-$45$-$90$ and $30$-$60$-$90$ ratios." },
    { id: "pythagorean-triples", note: "Every right triangle with integer sides." },
    { id: "law-of-cosines", note: "Any triangle, with the correction term $-2ab\\cos C$." },
    { id: "distance-midpoint", note: "The distance formula is the theorem on a grid." },
    { id: "distance-3d", note: "Applied once per axis, the distance in three dimensions." },
    { id: "british-flag-theorem", note: "$PA^2 + PC^2 = PB^2 + PD^2$ for a rectangle, from four right triangles." }
  ],
  "permutations-combinations": [
    { id: "multiset-permutations", note: "Arrangements when some objects are identical." },
    { id: "circular-permutations", note: "Arrangements around a circle, divided by the rotations." },
    { id: "stars-and-bars", note: "Identical objects into distinct boxes." },
    { id: "complementary-counting", note: "Count what you do not want and subtract." },
    { id: "pie", note: "Overlapping cases, added and subtracted in turn." },
    { id: "derangements", note: "Arrangements in which nothing stays in its place." }
  ],
  "telescoping": [
    { id: "factorial-telescoping", note: "$k \\cdot k! = (k + 1)! - k!$." },
    { id: "cot-tan-telescoping", note: "$\\cot\\theta - \\cot 2\\theta = \\csc 2\\theta$." },
    { id: "arctan-telescoping", note: "$\\arctan x - \\arctan y = \\arctan\\frac{x - y}{1 + xy}$." },
    { id: "trig-telescoping-product", note: "$\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$ collapses a product of cosines." }
  ],
  "angle-chasing": [
    { id: "inscribed-angle-theorem", note: "Equal angles standing on the same arc." },
    { id: "tangent-chord-angle", note: "The angle at a tangent, traded for an inscribed one." },
    { id: "cyclic-opposite-angles", note: "Supplementary opposite angles, and the test for concyclic points." },
    { id: "directed-angles", note: "The same chase without splitting into cases by the diagram." },
    { id: "triangle-center-angles", note: "The angles at the incenter, orthocenter, circumcenter and excenters." }
  ],
  "generating-function-method": [
    { id: "coefficient-extraction", note: "Coefficient sums by evaluating at $1$ and $-1$." },
    { id: "roots-of-unity-filter", note: "Every $n$th coefficient, through roots of unity." },
    { id: "exponential-generating-functions", note: "Arrangements, counted with $\\frac{x^n}{n!}$." },
    { id: "probability-generating-functions", note: "Distributions, encoded as $E[s^X]$." },
    { id: "partitions", note: "$\\prod \\frac{1}{1 - x^k}$ counts partitions." }
  ],
  "expected-value": [
    { id: "indicator-variables", note: "An expected count as a sum of probabilities." },
    { id: "total-expectation", note: "Averaging over cases." },
    { id: "tail-sum-expectation", note: "$E[X] = P(X \\ge 1) + P(X \\ge 2) + \\cdots$ for a count $X$." },
    { id: "states-recursion-prob", note: "Expected numbers of steps, by recursion on states." },
    { id: "variance-independence", note: "The spread around the expected value." }
  ]
};
