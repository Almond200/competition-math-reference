// Curated built-in study sets: substantial, single-theme compilations chosen to
// be *significant and high-level* — the ideas that move a solver up a level.
// Each is a thorough sweep of its theme (not a short teaser), labeled by subject.
// `ids` reference formula ids from the section data files; unknown ids are dropped
// at load time, so this file is safe to edit freely.
window.MATH_BUILTIN_LISTS = [
  // ---- Geometry ----
  { id: "set-advanced-circle", name: "Projective & Advanced Circle Geometry", subject: "Geometry",
    ids: ["power-of-a-point", "radical-axis", "pole-polar", "directed-angles", "spiral-similarity", "circle-inversion", "homothety-monge", "ptolemys-theorem", "ptolemys-inequality", "caseys-theorem", "descartes-circle-theorem", "butterfly-theorem", "miquels-theorem", "common-tangent-lengths"] },
  { id: "set-triangle-centers", name: "Triangle Centers & the Euler Line", subject: "Geometry",
    ids: ["triangle-center-angles", "centroid-division", "euler-line-ratio", "euler-distance-theorem", "nine-point-circle", "incenter-excenter-lemma", "orthocenter-properties", "fermat-point", "symmedian-lemoine", "brocard-angle", "center-distance-formulas", "carnots-theorem", "simson-line", "feuerbach-theorem", "leibniz-formula"] },
  { id: "set-cevians", name: "Cevians, Ratios & Concurrency", subject: "Geometry",
    ids: ["angle-bisector-theorem", "angle-bisector-length", "stewarts-theorem", "cevas-theorem", "trig-ceva", "menelaus-theorem", "apollonius-theorem", "ratio-lemma", "rouths-theorem", "median-triangle-area", "cevian-area-ratio", "shared-angle-area-ratio", "mass-points", "vivianis-theorem"] },
  { id: "set-circles", name: "Circle Theorems", subject: "Geometry",
    ids: ["inscribed-angle-theorem", "tangent-chord-angle", "angle-chord-secant", "two-tangents-angle", "tangent-facts", "chord-length", "circular-segment", "power-of-a-point", "common-tangent-lengths", "cyclic-opposite-angles", "descartes-circle-theorem", "radical-axis"] },
  { id: "set-cyclic-quads", name: "Cyclic & Tangential Quadrilaterals", subject: "Geometry",
    ids: ["cyclic-opposite-angles", "ptolemys-theorem", "ptolemys-inequality", "brahmaguptas-formula", "bretschneiders-formula", "cyclic-quad-diagonals", "cyclic-quad-radius", "pitots-theorem", "varignons-theorem", "van-aubel", "euler-quadrilateral", "pascals-theorem", "ptolemy-equilateral"] },
  { id: "set-complex-geo", name: "Complex Numbers in Geometry", subject: "Geometry",
    ids: ["complex-basics", "de-moivre", "eulers-formula", "complex-bash", "rotation-trick", "rotation-90", "spiral-similarity", "roots-of-unity", "roots-of-unity-filter", "roots-unity-distance-product", "napoleons-theorem"] },
  { id: "set-triangle-areas", name: "Triangle Area Toolkit", subject: "Geometry",
    ids: ["triangle-area-standard", "trig-area", "herons-formula", "inradius-area", "circumradius-area", "right-triangle-inradius", "exradii", "incircle-tangent-lengths", "shared-angle-area-ratio", "cevian-area-ratio", "median-triangle-area", "equilateral-triangle-facts", "regular-polygon-area"] },
  { id: "set-coordinate-geo", name: "Coordinate & Analytic Geometry", subject: "Geometry",
    ids: ["distance-midpoint", "section-formula", "shoelace-formula", "point-line-distance", "circle-equation", "picks-theorem", "british-flag-theorem", "angle-between-lines", "reflection-coordinates", "rotation-90", "conic-sections", "vector-dot-product"] },
  { id: "set-solid-geo", name: "Solid Geometry", subject: "Geometry",
    ids: ["prism-pyramid-volumes", "sphere-formulas", "cone-formulas", "frustum-volume", "space-diagonal", "eulers-polyhedron-formula", "regular-tetrahedron", "cross-product-area", "insphere-radius", "point-plane-distance", "cavalieris-principle", "de-guas-theorem", "tetrahedron-centroid", "isosceles-tetrahedron"] },

  // ---- Algebra ----
  { id: "set-inequalities", name: "Classic Inequalities", subject: "Algebra",
    ids: ["am-gm", "cauchy-schwarz", "mean-chain", "trivial-inequality", "abs-triangle-inequality", "bernoulli-inequality", "jensens-inequality", "rearrangement", "schurs-inequality", "muirheads-inequality", "maclaurin-inequality", "tangent-line-trick", "normalization"] },
  { id: "set-vietas", name: "Vieta's & Polynomial Roots", subject: "Algebra",
    ids: ["quadratic-formula", "vietas-quadratic", "vietas-general", "newtons-sums", "factor-remainder-theorem", "rational-root-theorem", "conjugate-root-theorems", "fundamental-theorem-algebra", "descartes-rule-signs", "root-transformations", "palindromic-polynomials", "lagrange-interpolation", "int-poly-divisibility"] },
  { id: "set-factorizations", name: "Key Factorizations & Identities", subject: "Algebra",
    ids: ["difference-of-squares", "an-minus-bn", "sophie-germain", "sfft", "cubes-minus-3abc", "sos-identity", "square-of-sum", "binomial-theorem", "useful-factorizations", "pairwise-sum-product", "antisymmetric-factorization", "sum-zero-identities", "reciprocal-power-sums"] },
  { id: "set-telescoping", name: "Telescoping & Clever Sums", subject: "Algebra",
    ids: ["telescoping", "factorial-telescoping", "arctan-telescoping", "trig-telescoping-product", "partial-fractions", "power-sums", "arithmetico-geometric", "finite-differences", "geometric-series", "sin-cos-ap-sum"] },
  { id: "set-recurrences", name: "Recurrences & Closed Forms", subject: "Algebra",
    ids: ["linear-recurrence", "binets-formula", "first-order-recurrence", "arithmetico-geometric", "finite-differences", "solving-recurrences", "periodic-sequences", "fibonacci-tilings", "generating-functions"] },
  { id: "set-trig-identities", name: "Trigonometric Identities", subject: "Algebra",
    ids: ["pythagorean-identities", "common-angle-values", "special-trig-values", "reduction-identities", "angle-addition", "double-angle", "half-angle", "triple-angle", "product-sum", "triangle-angle-identities", "weierstrass-substitution", "sin-cos-ap-sum"] },
  { id: "set-complex", name: "Complex Numbers & Roots of Unity", subject: "Algebra",
    ids: ["complex-basics", "eulers-formula", "de-moivre", "roots-of-unity", "roots-of-unity-filter", "roots-unity-distance-product", "complex-bash", "rotation-trick"] },

  // ---- Number Theory ----
  { id: "set-valuations", name: "Valuations & Lifting the Exponent", subject: "Number Theory",
    ids: ["legendres-formula", "vp-factorial", "lte", "lucas-theorem", "kummers-theorem", "primes-6k", "prime-divides-binomial", "trailing-zeros", "floor-multiples", "bertrands-postulate", "wolstenholme"] },
  { id: "set-modular", name: "Modular Arithmetic Toolkit", subject: "Number Theory",
    ids: ["modular-basics", "fermats-little-theorem", "eulers-theorem", "wilsons-theorem", "crt", "crt-solution-counting", "modular-inverse", "multiplicative-order", "primitive-roots", "quadratic-reciprocity", "eulers-criterion", "squares-mod-small", "hensel-lifting", "carmichael-function"] },
  { id: "set-multiplicative", name: "Multiplicative Number Theory", subject: "Number Theory",
    ids: ["number-of-divisors", "sum-of-divisors", "product-of-divisors", "eulers-totient", "totient-divisor-sum", "multiplicative-functions", "mobius-inversion", "coprime-residue-sum", "perfect-square-divisors", "lcm-pair-counting", "gcd-lcm-product"] },
  { id: "set-diophantine", name: "Diophantine Equations", subject: "Number Theory",
    ids: ["pythagorean-triples", "chicken-mcnugget", "sum-of-two-squares", "sum-of-three-squares", "pell-equation", "thues-lemma", "vieta-jumping", "difference-of-squares-rep", "factor-pair-counting", "bezouts-identity", "gaussian-integers", "bounding-diophantine"] },

  // ---- Counting & Probability ----
  { id: "set-advanced-counting", name: "Advanced Counting", subject: "Counting",
    ids: ["pie", "derangements", "catalan-numbers", "burnsides-lemma", "generating-functions", "partitions", "fibonacci-tilings", "stirling-bell", "stirling-first-kind", "necklace-formula", "non-adjacent-selection", "surjections", "ballot-problem"] },
  { id: "set-combinatorics", name: "Combinatorics Essentials", subject: "Counting",
    ids: ["permutations-combinations", "multiset-permutations", "circular-permutations", "complementary-counting", "counting-blocks", "grid-paths", "rectangles-in-grid", "handshakes-diagonals", "counting-functions", "stars-and-bars", "stars-bars-upper-bound", "balls-boxes-table"] },
  { id: "set-binomial-ids", name: "Binomial Coefficient Identities", subject: "Counting",
    ids: ["pascals-identity", "binomial-theorem", "binomial-row-sums", "hockey-stick", "vandermonde", "committee-chair", "multinomial-theorem", "pascal-parity", "weighted-binomial-sums"] },
  { id: "set-bijections", name: "Bijections, Catalan & Lattice Paths", subject: "Counting",
    ids: ["catalan-numbers", "ballot-problem", "grid-paths", "reflection-principle", "fibonacci-tilings", "non-adjacent-selection", "bijection-method", "constructive-counting", "partitions", "necklace-formula"] },
  { id: "set-probability", name: "Probability Toolkit", subject: "Counting",
    ids: ["basic-probability", "conditional-probability", "binomial-probability", "expected-value", "geometric-probability", "bayes-theorem", "hypergeometric", "geometric-distribution", "symmetry-probability", "states-recursion-prob", "total-expectation", "birthday-collision", "coprime-probability"] },
  { id: "set-expected-value", name: "Expected Value & Linearity", subject: "Counting",
    ids: ["expected-value", "expected-fixed-points", "total-expectation", "order-statistics", "indicator-variables", "geometric-distribution", "variance-independence", "symmetry-probability", "hypergeometric"] },
  { id: "set-states-prob", name: "States & Recursive Probability", subject: "Counting",
    ids: ["states-recursion-prob", "turn-based-games", "polyhedron-walks", "gamblers-ruin", "symmetry-probability", "total-expectation", "losing-positions", "geometric-distribution", "conditional-probability"] },

  // ---- Methods & mixed ----
  { id: "set-geo-methods", name: "Geometry Problem-Solving Methods", subject: "Methods",
    ids: ["angle-chasing", "auxiliary-lines", "coordinate-bash", "trig-bash", "complex-bash", "barycentric-coordinates", "mass-points", "area-method", "affine-transformations", "directed-angles", "phantom-point", "pole-polar", "spiral-similarity", "rotation-trick", "circle-inversion", "homothety-monge"] },
  { id: "set-invariants", name: "Invariants, Coloring & Extremal", subject: "Methods",
    ids: ["invariants-coloring", "extremal-principle", "pigeonhole-principle", "double-counting", "handshake-lemma", "ramsey-33", "bijection-method", "constructive-counting"] },
  { id: "set-aime-musts", name: "AIME Must-Knows", subject: "Mixed",
    ids: ["power-of-a-point", "law-of-cosines", "law-of-sines", "herons-formula", "shoelace-formula", "stewarts-theorem", "mass-points", "vietas-general", "sfft", "telescoping", "geometric-series", "legendres-formula", "crt", "chicken-mcnugget", "pie", "expected-value"] },
  { id: "set-olympiad", name: "Olympiad Heavy Hitters", subject: "Mixed",
    ids: ["cauchy-schwarz", "jensens-inequality", "muirheads-inequality", "schurs-inequality", "ptolemys-theorem", "pole-polar", "directed-angles", "barycentric-coordinates", "lte", "vieta-jumping", "roots-of-unity-filter", "burnsides-lemma", "cauchy-functional-equations", "extremal-principle", "invariants-coloring"] }
];
