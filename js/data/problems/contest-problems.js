// Contest problems (AMC 10/12 2023-2024, AIME 2023-2025) whose standard solution
// runs through each formula — listed by reference only, as lookup-ready practice.
(function () {
  const C = window.MATH_CONTEST = window.MATH_CONTEST || {};
  const add = (id, ...refs) => (C[id] = (C[id] || []).concat(refs));

  // Geometry
  add("ptolemys-theorem", "2024 AMC 12A, Problem 19");
  add("law-cosines-60-120", "2023 AMC 12B, Problem 17");
  add("power-of-a-point", "2024 AIME I, Problem 10", "2023 AIME II, Problem 12");
  add("symmedian-lemoine", "2024 AIME I, Problem 10");
  add("apollonius-theorem", "2023 AIME II, Problem 12", "2024 AMC 12B, Problem 20");
  add("euler-distance-theorem", "2024 AIME II, Problem 10");
  add("brocard-angle", "2023 AIME II, Problem 3");
  add("nine-point-circle", "2025 AIME II, Problem 5");
  add("rotation-trick", "2025 AIME I, Problem 14");
  add("chord-length", "2023 AIME I, Problem 5");
  add("space-diagonal", "2023 AMC 10B, Problem 17", "2023 AMC 12B, Problem 13");
  add("inradius-area", "2025 AIME I, Problem 6", "2024 AIME I, Problem 8");
  add("pitots-theorem", "2025 AIME I, Problem 6");
  add("tangent-facts", "2024 AIME I, Problem 8");
  add("conic-sections", "2024 AIME I, Problem 9", "2025 AIME I, Problem 9");
  add("rotation-90", "2025 AIME I, Problem 9");
  add("tangency-condition", "2025 AIME I, Problem 8", "2024 AIME II, Problem 12");
  add("cross-section-method", "2024 AIME II, Problem 8");
  add("insphere-radius", "2024 AIME I, Problem 14");
  add("geometric-probability", "2023 AIME II, Problem 6");

  // Algebra
  add("am-gm", "2023 AMC 12A, Problem 23");
  add("change-of-base", "2024 AIME I, Problem 2", "2023 AMC 12A, Problem 19", "2025 AIME II, Problem 4");
  add("log-rules", "2024 AIME II, Problem 4");
  add("de-moivre", "2023 AMC 12A, Problem 25", "2024 AMC 12A, Problem 23");
  add("complex-basics", "2023 AMC 12A, Problem 14");
  add("vietas-general", "2024 AMC 12A, Problem 15");
  add("pythagorean-identities", "2024 AMC 12B, Problem 11");
  add("binets-formula", "2024 AMC 12B, Problem 18", "2024 AMC 10B, Problem 23");
  add("angle-addition", "2024 AIME I, Problem 7");
  add("fx-pairing", "2024 AMC 12A, Problem 13");
  add("roots-of-unity", "2024 AIME II, Problem 13", "2023 AIME II, Problem 8");
  add("functional-substitution", "2023 AMC 12B, Problem 22");
  add("cauchy-functional-equations", "2023 AMC 12B, Problem 22");
  add("factor-remainder-theorem", "2023 AIME I, Problem 9");
  add("law-of-sines", "2024 AMC 12B, Problem 22");
  add("square-of-sum", "2024 AIME II, Problem 11");

  // Number Theory
  add("int-poly-divisibility", "2025 AIME II, Problem 2");
  add("perfect-square-divisors", "2023 AIME I, Problem 4", "2023 AMC 10B, Problem 15");
  add("eulers-theorem", "2024 AMC 10B, Problem 18", "2024 AMC 12B, Problem 14");
  add("chicken-mcnugget", "2023 AMC 12B, Problem 16");
  add("lcm-pair-counting", "2025 AIME II, Problem 7", "2023 AMC 12B, Problem 24");
  add("base-conversion", "2025 AIME I, Problem 1", "2023 AIME II, Problem 2", "2024 AMC 12A, Problem 11");
  add("multiplicative-order", "2023 AIME II, Problem 15");
  add("hensel-lifting", "2024 AIME I, Problem 13", "2023 AIME II, Problem 15");
  add("divisibility-rules", "2025 AIME I, Problem 5");
  add("crt", "2023 AIME I, Problem 7");
  add("mobius-inversion", "2023 AMC 12A, Problem 22");

  // Counting & Probability
  add("conditional-probability", "2024 AIME I, Problem 4");
  add("hypergeometric", "2024 AIME I, Problem 4");
  add("grid-paths", "2024 AIME I, Problem 6");
  add("pie", "2024 AIME II, Problem 1");
  add("counting-functions", "2024 AIME II, Problem 6");
  add("non-adjacent-selection", "2023 AIME I, Problem 11", "2025 AIME II, Problem 10");
  add("fibonacci-tilings", "2025 AIME II, Problem 10");
  add("double-counting", "2023 AIME I, Problem 3");
  add("expected-value", "2025 AIME I, Problem 13");
  add("plane-regions", "2025 AIME I, Problem 13");
  add("handshakes-diagonals", "2023 AMC 10A, Problem 16", "2023 AMC 12A, Problem 13");
  add("losing-positions", "2024 AIME I, Problem 3");
  add("symmetry-probability", "2023 AIME I, Problem 1");
  add("multinomial-theorem", "2025 AIME I, Problem 3");

  // ---- 2020-2022 sweep ----
  // Geometry
  add("cross-section-method", "2020 AIME I, Problem 6", "2020 AIME II, Problem 7", "2021 AIME II, Problem 10", "2022 AIME I, Problem 10", "2022 AIME II, Problem 3");
  add("incenter-excenter-lemma", "2020 AIME I, Problem 13");
  add("orthocenter-properties", "2020 AIME I, Problem 15");
  add("symmedian-lemoine", "2020 AIME II, Problem 15");
  add("radical-axis", "2021 AIME I, Problem 13", "2022 AIME II, Problem 15");
  add("quadrilateral-diagonal-area", "2021 AIME II, Problem 12");
  add("inradius-area", "2020 AIME II, Problem 13");
  add("incircle-tangent-lengths", "2020 AIME II, Problem 13", "2022 AIME I, Problem 11");
  add("similar-figures-ratios", "2021 AIME II, Problem 2");
  add("trig-area", "2021 AIME II, Problem 5");
  add("british-flag-theorem", "2021 AIME I, Problem 6");
  add("ptolemys-theorem", "2021 AIME I, Problem 11");
  add("conic-sections", "2021 AIME I, Problem 15", "2022 AIME II, Problem 12");
  add("rotation-90", "2020 AIME II, Problem 4");
  add("tangent-facts", "2022 AIME I, Problem 8");
  add("common-tangent-lengths", "2022 AIME II, Problem 7");
  add("geometric-probability", "2020 AIME II, Problem 2");
  add("eulers-formula", "2020 AIME I, Problem 8");

  // Algebra
  add("log-rules", "2020 AIME I, Problem 2");
  add("change-of-base", "2020 AIME II, Problem 3", "2022 AIME II, Problem 4");
  add("vietas-quadratic", "2020 AIME I, Problem 14", "2020 AIME II, Problem 11");
  add("conjugate-root-theorems", "2021 AIME II, Problem 4");
  add("square-of-sum", "2021 AIME II, Problem 7");
  add("trig-substitution", "2022 AIME I, Problem 15");
  add("periodic-sequences", "2020 AIME II, Problem 6");
  add("piecewise-graph-counting", "2021 AIME I, Problem 8", "2024 AIME I, Problem 12");
  add("floor-basics", "2020 AIME II, Problem 14");
  add("power-sums", "2020 AIME II, Problem 10");
  add("int-poly-divisibility", "2020 AIME II, Problem 10");
  add("roots-of-unity", "2022 AIME I, Problem 4", "2021 AMC 12A, Problem 22");
  add("sophie-germain", "2020 AMC 10B, Problem 22");
  add("generating-functions", "2022 AIME II, Problem 13");

  // Number Theory
  add("lte", "2020 AIME I, Problem 12", "2021 AIME I, Problem 14");
  add("multiplicative-order", "2021 AIME I, Problem 14");
  add("gcd-power-minus-one", "2021 AIME II, Problem 9");
  add("base-conversion", "2020 AIME I, Problem 3", "2020 AIME II, Problem 5", "2022 AIME I, Problem 2");
  add("perfect-square-divisors", "2020 AIME II, Problem 1");
  add("crt", "2021 AIME II, Problem 13");
  add("eulers-theorem", "2021 AIME II, Problem 13");
  add("lcm-pair-counting", "2020 AIME I, Problem 9");
  add("repeating-decimals", "2022 AIME I, Problem 13");
  add("floor-multiples", "2022 AIME II, Problem 8");
  add("number-of-divisors", "2021 AMC 12A, Problem 25");

  // Counting & Probability
  add("vandermonde", "2020 AIME I, Problem 7");
  add("stars-and-bars", "2021 AIME I, Problem 4");
  add("states-recursion-prob", "2021 AIME I, Problem 1", "2021 AIME I, Problem 12");
  add("polyhedron-walks", "2021 AIME II, Problem 8");
  add("multiset-permutations", "2022 AIME I, Problem 9");
  add("double-counting", "2022 AIME I, Problem 12");
  add("conditional-probability", "2022 AIME II, Problem 2");
  add("hockey-stick", "2022 AIME II, Problem 10");
  add("plane-regions", "2022 AIME II, Problem 9");
  add("chicken-mcnugget", "2022 AIME II, Problem 14");
  add("pie", "2021 AIME II, Problem 6");
  add("weighted-average", "2022 AIME II, Problem 1");
  add("relative-motion", "2022 AIME I, Problem 5");
  add("angle-between-lines", "2023 AMC 12A, Problem 11");
  add("angle-bisector-theorem", "2022 AIME I, Problem 3", "2022 AIME II, Problem 11");
})();
