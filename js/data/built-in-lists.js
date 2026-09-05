// Curated study sets — deliberately CROSS-CUTTING, so they earn their place next to
// plain section/subsection browsing: contest-tier "what you must know" sets, thinking-
// method sets, and curated collections of surprising facts. (Subject-mirror sets were
// removed; to review one theme, browse the matching subsection in the sidebar instead.)
// `ids` reference formula ids from the section data files; unknown ids are dropped at
// load time, so this file is safe to edit freely.
window.MATH_BUILTIN_LISTS = [
  // ---- Contest tiers: the core you should have at your fingertips ----
  { id: "set-mathcounts-core", name: "MATHCOUNTS Core", subject: "Mixed",
    ids: ["pythagorean-theorem", "special-right-triangles", "similar-figures-ratios", "triangle-area-standard", "herons-formula", "shoelace-formula", "distance-midpoint", "inscribed-angle-theorem", "regular-polygon-area", "prism-pyramid-volumes", "sphere-formulas", "quadratic-formula", "vietas-quadratic", "difference-of-squares", "sfft", "arithmetic-series", "geometric-series", "weighted-average", "average-speed", "divisibility-rules", "number-of-divisors", "gcd-lcm-product", "modular-basics", "permutations-combinations", "complementary-counting", "stars-and-bars", "pie", "casework-method", "basic-probability", "expected-value"] },
  { id: "set-aime-musts", name: "AIME Must-Knows", subject: "Mixed",
    ids: ["power-of-a-point", "law-of-cosines", "law-of-sines", "herons-formula", "shoelace-formula", "stewarts-theorem", "mass-points", "vietas-general", "sfft", "telescoping", "geometric-series", "legendres-formula", "crt", "chicken-mcnugget", "pie", "expected-value"] },
  { id: "set-olympiad", name: "Olympiad Heavy Hitters", subject: "Mixed",
    ids: ["cauchy-schwarz", "holders-inequality", "jensens-inequality", "muirheads-inequality", "schurs-inequality", "ptolemys-theorem", "pole-polar", "directed-angles", "barycentric-coordinates", "lte", "vieta-jumping", "roots-of-unity-filter", "burnsides-lemma", "cauchy-functional-equations", "extremal-principle", "invariants-coloring"] },

  // ---- Ways of thinking (cut across subjects) ----
  { id: "set-geo-methods", name: "Geometry Problem-Solving Methods", subject: "Methods",
    ids: ["angle-chasing", "auxiliary-lines", "coordinate-bash", "trig-bash", "complex-bash", "barycentric-coordinates", "mass-points", "area-method", "affine-transformations", "directed-angles", "phantom-point", "pole-polar", "spiral-similarity", "rotation-trick", "inversion-properties", "homothety-monge"] },
  { id: "set-invariants", name: "Invariants, Coloring & Extremal", subject: "Methods",
    ids: ["invariants-coloring", "extremal-principle", "probabilistic-method", "pigeonhole-principle", "erdos-szekeres", "dilworths-theorem", "sperners-theorem", "double-counting", "handshake-lemma", "ramsey-33", "bijection-method", "constructive-counting"] },

  // ---- Curiosities & fun facts (weird-but-nice-to-know) ----
  { id: "set-fun-geometry", name: "Kissing Circles & Surprising Geometry", subject: "Mixed",
    ids: ["descartes-circle-theorem", "morleys-theorem", "napoleons-theorem", "vivianis-theorem", "simson-line", "nine-point-circle", "feuerbach-theorem", "ptolemys-theorem", "butterfly-theorem", "british-flag-theorem", "picks-theorem", "eulers-polyhedron-formula", "varignons-theorem", "pascals-theorem", "brianchon-theorem", "desargues-theorem", "sylvester-gallai", "homothety-monge", "pappus-centroid", "caseys-theorem", "van-aubel", "fermat-point", "erdos-mordell", "isogonal-conjugate", "mixtilinear-incircle", "reims-theorem", "golden-ratio-pentagon"] },
  { id: "set-fun-numbertheory", name: "Number-Theory Curiosities", subject: "Mixed",
    ids: ["freshmans-dream", "power-minus-self", "consecutive-product-factorial", "base10-curiosities", "wilsons-theorem", "wolstenholme", "fermat-numbers", "carmichael-numbers", "zsygmondy", "bertrands-postulate", "zeckendorf-theorem", "beatty-theorem", "binets-formula", "pisano-periods", "quadratic-reciprocity", "sum-of-two-squares", "sum-of-three-squares", "lucas-theorem", "kummers-theorem", "gcd-power-minus-one", "chicken-mcnugget", "primes-6k"] },
  { id: "set-fun-identities", name: "Beautiful Identities & Party Tricks", subject: "Mixed",
    ids: ["ramanujan-nested-radical", "roots-unity-distance-product", "trig-telescoping-product", "triangle-square-identities", "triangle-angle-identities", "sophie-germain", "cubes-minus-3abc", "brahmagupta-fibonacci", "sos-identity", "sum-zero-identities", "eulers-formula", "special-trig-values", "an-minus-bn", "hermite-identity", "infinite-nest", "denesting-radicals"] },
  { id: "set-fun-counting", name: "Counting & Probability Surprises", subject: "Mixed",
    ids: ["moser-circle", "derangements", "catalan-numbers", "birthday-collision", "burnsides-lemma", "cayleys-formula", "ramsey-33", "erdos-szekeres", "ballot-problem", "hockey-stick", "vandermonde", "sprague-grundy", "gamblers-ruin", "expected-fixed-points", "necklace-formula", "polya-enumeration", "stirling-bell", "plane-regions", "non-adjacent-selection"] }
];
