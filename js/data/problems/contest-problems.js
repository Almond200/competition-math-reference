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
  add("pie", "2021 AIME II, Problem 6");
  add("weighted-average", "2022 AIME II, Problem 1");
  add("relative-motion", "2022 AIME I, Problem 5");
  add("angle-between-lines", "2023 AMC 12A, Problem 11");
  add("angle-bisector-theorem", "2022 AIME I, Problem 3", "2022 AIME II, Problem 11");

  // ---------- Verified batch: named theorems & methods (AoPS-documented) ----------
  add("herons-formula", "2013 AIME I, Problem 13", "1992 AIME, Problem 13", "2013 AIME II, Problem 13");
  add("stewarts-theorem", "2003 AIME I, Problem 7", "1989 AIME, Problem 15", "2005 AIME I, Problem 15");
  add("picks-theorem", "2018 AIME I, Problem 1", "2022 AMC 12A, Problem 5");
  add("cevas-theorem", "1988 AIME, Problem 12", "1992 AIME, Problem 14");
  add("menelaus-theorem", "2011 AIME II, Problem 4");
  add("law-of-cosines", "2019 AIME I, Problem 13", "2018 AIME I, Problem 4", "2019 AIME II, Problem 11");
  add("legendres-formula", "2006 AIME II, Problem 3");
  add("pie", "2014 AIME II, Problem 9", "2015 AIME I, Problem 2");
  add("catalan-numbers", "1993 AIME, Problem 7");
  add("derangements", "2021 AMC 10B, Problem 22", "2020 AIME I, Problem 5");
  add("burnsides-lemma", "2017 AMC 10B, Problem 18", "2006 AIME II, Problem 8", "2010 AIME II, Problem 10");
  add("vietas-quadratic", "2021 AIME II, Problem 4", "2021 AMC 12A, Problem 12");
  add("newtons-sums", "2019 AIME I, Problem 8", "2003 AIME II, Problem 9", "2008 AIME II, Problem 7");
  add("roots-of-unity-filter", "2018 AIME I, Problem 12", "2017 AMC 12A, Problem 25");
  add("pigeonhole", "1986 AIME, Problem 12", "2022 AMC 10B, Problem 14");
  add("cauchy-schwarz", "2016 AIME II, Problem 15", "2013 AMC 12B, Problem 17");
  add("pythagorean-triples", "2007 AIME II, Problem 9", "2000 AIME II, Problem 2");
  add("shoelace-formula", "2003 AIME II, Problem 14", "2017 AIME II, Problem 10", "2019 AIME I, Problem 3");
  add("telescoping", "2014 AIME II, Problem 7", "2008 AIME II, Problem 8", "2025 AIME II, Problem 4");
  add("fermats-little-theorem", "1989 AIME, Problem 9", "2023 AIME II, Problem 15");

  // ---------- Verified batch 2: more named theorems & methods (AoPS-documented) ----------
  add("sfft", "1987 AIME, Problem 5", "2015 AIME II, Problem 8", "2021 AIME I, Problem 10");
  add("crt", "2012 AIME II, Problem 12", "2011 AIME II, Problem 14", "2017 AIME I, Problem 14");
  add("brahmaguptas-formula", "1991 AIME, Problem 12", "2000 AIME I, Problem 14", "1997 AIME, Problem 15");
  add("wilsons-theorem", "2019 AMC 10A, Problem 25");
  add("finite-differences", "2015 AIME I, Problem 10", "2016 AIME I, Problem 11", "1989 AIME, Problem 8");
  add("complementary-counting", "2002 AIME I, Problem 1", "2011 AIME II, Problem 12");
  add("trailing-zeros", "1992 AIME, Problem 15", "2015 AMC 10B, Problem 23");
  add("inscribed-angle-theorem", "2016 AIME II, Problem 10", "2023 AIME I, Problem 5", "2021 AIME II, Problem 14");
  add("exradii", "2019 AIME I, Problem 11", "1997 AIME, Problem 10");
  add("euclidean-algorithm", "1985 AIME, Problem 13", "2021 AIME II, Problem 9");

  // ---------- Verified batch 3: core formulas & expectation (AoPS-documented) ----------
  add("eulers-totient", "2014 AIME I, Problem 3");
  add("sum-of-divisors", "2021 AMC 12B, Problem 7", "2019 AIME I, Problem 9");
  add("arithmetico-geometric", "1994 AIME, Problem 4");
  add("indicator-variables", "2023 AIME I, Problem 6", "2022 AIME I, Problem 12", "2021 Fall AMC 12B, Problem 23");
  add("golden-ratio-pentagon", "2023 AMC 12B, Problem 25", "2015 AMC 10B, Problem 22");
  add("stars-and-bars", "2011 AIME II, Problem 7", "1998 AIME, Problem 7", "1992 AIME, Problem 12");
  add("binomial-theorem", "2024 AIME I, Problem 13", "1991 AIME, Problem 3");
  add("partitions", "2011 AIME II, Problem 6");

  // ---------- Verified batch 4: named theorems, series & divisibility (AoPS-documented) ----------
  add("descartes-circle-theorem", "1997 AIME, Problem 4", "2014 AIME II, Problem 8");
  add("multinomial-theorem", "2006 AMC 12A, Problem 24", "2010 AIME I, Problem 4");
  add("de-moivre", "1984 AIME, Problem 8", "2012 AIME I, Problem 6");
  add("geometric-series", "2005 AIME II, Problem 3", "2002 AIME II, Problem 11");
  add("digit-sum-mod-9", "2017 AIME I, Problem 9", "2025 AIME I, Problem 5");

  // ---------- Verified batch 5: more theorems, series & geometry (AoPS-documented) ----------
  add("chicken-mcnugget", "1994 AIME, Problem 11", "2019 AIME II, Problem 14");
  add("geometric-probability", "2019 AMC 10A, Problem 22");
  add("rational-root-theorem", "2018 AIME II, Problem 6", "1983 AIME, Problem 5");
  add("coefficient-extraction", "2004 AIME I, Problem 7", "2016 AIME II, Problem 6");
  add("turn-based-games", "1993 AIME, Problem 11");
  add("radical-axis", "2019 AIME I, Problem 15", "2016 AIME I, Problem 15");
  add("special-right-triangles", "2012 AIME I, Problem 12", "2014 AMC 10A, Problem 22");
  add("difference-of-squares", "2003 AIME I, Problem 8", "2008 AIME II, Problem 1", "2017 AIME II, Problem 6");

  // ---------- Verified batch 6: broad sweep across all four sections (AoPS-documented) ----------
  add("arithmetic-series", "1993 AIME, Problem 6");
  add("double-angle", "2013 AIME II, Problem 15");
  add("product-of-divisors", "1987 AIME, Problem 3");
  add("rectangles-in-grid", "1997 AIME, Problem 2");
  add("cyclic-opposite-angles", "2021 AIME I, Problem 11", "2014 AIME I, Problem 15");
  add("sphere-formulas", "2001 AIME I, Problem 12", "2024 AIME I, Problem 15");
  add("centroid-division", "2012 AIME I, Problem 14", "2003 AIME II, Problem 6");

  // ---------- Verified batch 7: large sweep, all four sections (AoPS-documented) ----------
  add("quadratic-formula", "2011 AIME I, Problem 15", "2017 AIME II, Problem 6");
  add("sophie-germain", "1987 AIME, Problem 14");
  add("basic-probability", "2023 AIME I, Problem 1");
  add("bezouts-identity", "1985 AIME, Problem 13");
  add("triangle-inequality", "2021 AIME II, Problem 5");
  add("polygon-angle-sums", "2011 AIME II, Problem 3");
  add("midsegment-theorem", "1983 AIME, Problem 14");
  add("distance-midpoint", "2013 AIME I, Problem 9", "2013 AIME II, Problem 13");
  add("vertex-form", "2011 AIME I, Problem 6");
  add("last-digit-patterns", "2017 AIME I, Problem 3");
  add("circular-permutations", "1983 AIME, Problem 7", "2011 AIME II, Problem 12");
  add("pascals-identity", "1991 AIME, Problem 3");
  add("terminating-decimals", "1992 AIME, Problem 5", "2022 AIME I, Problem 13");
  add("gcd-lcm-product", "2019 AIME I, Problem 7");
  add("circle-equation", "2005 AIME II, Problem 15");
  add("eulers-polyhedron-formula", "1993 AIME, Problem 10", "1988 AIME, Problem 10");
  add("prism-pyramid-volumes", "2016 AIME I, Problem 4");
  add("frustum-volume", "2004 AIME I, Problem 11", "2012 AIME I, Problem 8");

  // ---------- Verified batch 8: very large sweep, all four sections (AoPS-documented) ----------
  add("pythagorean-theorem", "2008 AIME II, Problem 11", "2007 AIME I, Problem 9");
  add("mass-points", "1992 AIME, Problem 14", "2011 AIME II, Problem 4");
  add("altitude-hypotenuse", "2009 AIME I, Problem 12", "2016 AIME II, Problem 5");
  add("trapezoid-parallelogram-areas", "2025 AIME I, Problem 6", "2021 AIME I, Problem 9");
  add("regular-polygon-area", "2009 AMC 12A, Problem 19", "2021 Fall AMC 10B, Problem 11");
  add("cone-formulas", "2004 AIME I, Problem 11");
  add("equilateral-triangle-facts", "2022 AIME I, Problem 8", "2014 AIME II, Problem 10");
  add("regular-hexagon-area", "1994 AIME, Problem 6");
  add("regular-tetrahedron", "2003 AIME II, Problem 4", "2001 AIME II, Problem 12");
  add("point-plane-distance", "2011 AIME I, Problem 13", "2024 AIME I, Problem 14");
  add("linear-recurrence", "1990 AIME, Problem 15", "2007 AIME I, Problem 14");
  add("15-75-90-triangle", "1991 AIME, Problem 11", "2014 AMC 10A, Problem 22");
  add("factor-pair-counting", "1995 AIME, Problem 8", "2020 AIME II, Problem 1");
  add("binomial-probability", "1989 AIME, Problem 5");
  add("counting-blocks", "2019 AIME II, Problem 5");
  add("bayes-theorem", "2024 AIME I, Problem 4");
  add("average-speed", "2002 AMC 12A, Problem 11", "2003 AMC 12A, Problem 4");
  add("work-rates", "2004 AIME II, Problem 5");
  add("cubes-minus-3abc", "2010 AIME I, Problem 9");
  add("modular-inverse", "2020 AMC 10A, Problem 24");
  add("consecutive-coprime", "2019 AIME II, Problem 3");
  add("crt-solution-counting", "2012 AIME I, Problem 10", "2013 AIME I, Problem 11");
  add("useful-factorizations", "1983 AIME, Problem 5");
  add("descartes-rule-signs", "2021 AIME I, Problem 15");

  // ---------- Audit re-homing: citations moved to the formula actually used ----------
  add("difference-of-squares", "2008 AIME I, Problem 4");
  add("telescoping", "2002 AIME I, Problem 4");
  add("grid-paths", "2023 AIME I, Problem 14");
  add("roots-of-unity", "1996 AIME, Problem 11");

  // ---------- Verified batch: uncovered named theorems (Routh, Viviani, cevian area ratio) ----------
  add("rouths-theorem", "2017 AMC 10B, Problem 19");
  add("vivianis-theorem", "2007 AMC 12B, Problem 14");
  add("cevian-area-ratio", "1985 AIME, Problem 6");

  // ---------- Verified batch: remaining named theorems (audit-grade, method-confirmed) ----------
  add("circumradius-area", "2007 AIME II, Problem 15");
  add("shared-angle-area-ratio", "2018 AMC 10A, Problem 24");
  add("right-triangle-inradius", "2001 AIME II, Problem 7");
  add("difference-of-squares-rep", "1997 AIME, Problem 1");
  add("arctan-telescoping", "2008 AIME I, Problem 8");
  add("geometric-distribution", "2009 AIME II, Problem 8");
})();
