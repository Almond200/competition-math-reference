// Competition Math Reference — navigation, rendering, tag-based search, filters, sorting.
(function () {
  const SECTIONS = window.MATH_SECTIONS || [];
  const LEVELS = ["MATHCOUNTS", "AMC10", "AMC12", "AIME", "Olympiad"];
  const LEVEL_LABELS = {
    MATHCOUNTS: "MATHCOUNTS",
    AMC10: "AMC 10",
    AMC12: "AMC 12",
    AIME: "AIME",
    Olympiad: "Olympiad"
  };

  // Query-token synonyms expanded before matching against tags.
  const SYNONYMS = {
    pie: ["inclusion", "exclusion"],
    gcf: ["gcd"],
    hcf: ["gcd"],
    mod: ["modular", "modulus", "remainder"],
    prob: ["probability"],
    perm: ["permutation"],
    combo: ["combination"],
    ev: ["expected", "value"],
    quad: ["quadratic", "quadrilateral"],
    tri: ["triangle"],
    ineq: ["inequality"],
    seq: ["sequence"],
    nt: ["number", "theory"],
    circ: ["circle", "circumradius"],
    // words people type vs. words the entries use
    height: ["altitude"],
    altitude: ["height"],
    mean: ["average"],
    average: ["mean"],
    avg: ["average", "mean"],
    middle: ["midpoint", "median"],
    center: ["centroid", "circumcenter", "incenter"],
    corner: ["vertex"],
    connect: ["join", "joining", "joins"],
    join: ["connect", "connecting"],
    edge: ["side"],
    leg: ["side", "right"],
    count: ["number", "counting"],
    number: ["count"],
    way: ["count", "choose", "arrangements"],
    choose: ["combination", "binomial"],
    pick: ["choose", "combination"],
    arrange: ["permutation", "arrangement"],
    remainder: ["mod", "modular"],
    divisible: ["divides", "divisibility"],
    divisor: ["factor"],
    factor: ["divisor", "factorization"],
    zero: ["root"],
    solution: ["root", "solutions"],
    biggest: ["maximum"],
    largest: ["maximum"],
    max: ["maximum"],
    maximize: ["maximum"],
    smallest: ["minimum"],
    min: ["minimum"],
    minimize: ["minimum"],
    shortest: ["minimum", "distance"],
    distance: ["length"],
    length: ["distance"],
    speed: ["rate"],
    velocity: ["speed", "rate"],
    chance: ["probability"],
    select: ["choose", "combination"],
    row: ["line", "adjacent"],
    sqrt: ["square", "root", "radical"],
    radical: ["root"],
    sum: ["series", "total"],
    total: ["sum"],
    product: ["multiply", "prod"],
    split: ["divides", "ratio", "bisector"],
    cut: ["divide", "regions"],
    piece: ["region", "parts"],
    region: ["pieces"],
    inscribed: ["incircle", "cyclic"],
    circumscribed: ["circumcircle", "tangential"],
    shoestring: ["shoelace"],
    flip: ["coin"],
    die: ["dice"],
    spinner: ["random"],
    slope: ["line", "angle"],
    perp: ["perpendicular"],
    perpendicular: ["altitude", "normal"],
    intersect: ["intersection", "concurrent"],
    touching: ["tangent", "tangency"],
    touch: ["tangent", "tangency"],
    // recursion & sequences
    recursion: ["recurrence", "recursive", "sequence"],
    recursive: ["recurrence", "recursion"],
    recurse: ["recurrence", "recursion"],
    recurrence: ["recursion", "recursive", "sequence"],
    iterate: ["recurrence", "sequence", "iteration"],
    iterative: ["recurrence", "iteration"],
    iteration: ["recurrence", "sequence"],
    recursively: ["recurrence", "sequence"],
    term: ["sequence", "series"],
    nth: ["general", "term", "formula"],
    closedform: ["recurrence", "explicit"],
    fib: ["fibonacci", "recurrence"],
    fibonacci: ["recurrence", "binet"],
    // algebra
    poly: ["polynomial"],
    root: ["zero", "solution"],
    roots: ["zeros", "solutions"],
    solve: ["solution", "root"],
    factorise: ["factor", "factorization"],
    factorize: ["factor", "factorization"],
    expand: ["expansion", "binomial"],
    expansion: ["binomial", "expand"],
    coefficient: ["coefficients", "binomial"],
    log: ["logarithm"],
    logarithm: ["log"],
    exponent: ["power", "exponential"],
    exponential: ["exponent", "power"],
    power: ["exponent", "powers"],
    inequalities: ["inequality"],
    absolute: ["modulus", "absolutevalue"],
    complex: ["imaginary", "argand"],
    imaginary: ["complex"],
    // trig
    trig: ["trigonometry", "trigonometric"],
    trigonometry: ["trig", "sine", "cosine", "tangent"],
    sine: ["sin"],
    cosine: ["cos"],
    // geometry
    pythag: ["pythagorean", "pythagoras"],
    pythagoras: ["pythagorean"],
    pythagorean: ["pythagoras", "hypotenuse"],
    hypotenuse: ["right", "pythagorean"],
    triangle: ["triangular"],
    quadrilateral: ["quad", "cyclic"],
    polygon: ["sides", "regular"],
    hexagon: ["polygon", "regular"],
    pentagon: ["polygon", "regular"],
    diagonal: ["diagonals"],
    circle: ["circular", "arc", "chord"],
    arc: ["circle", "sector"],
    sector: ["circle", "arc"],
    reflect: ["reflection", "mirror"],
    reflection: ["reflect", "mirror", "transformation"],
    rotate: ["rotation", "transformation"],
    rotation: ["rotate", "transformation"],
    transformation: ["reflection", "rotation", "translation"],
    coordinate: ["coordinates", "cartesian"],
    coordinates: ["coordinate"],
    vector: ["vectors", "dot", "cross"],
    // number theory
    modulo: ["modular", "mod", "congruence"],
    congruence: ["modular", "mod"],
    congruent: ["modular", "mod"],
    prime: ["primes", "primality"],
    primes: ["prime"],
    coprime: ["relatively", "gcd", "totient"],
    totient: ["euler", "phi", "coprime"],
    phi: ["totient", "euler"],
    residue: ["modular", "remainder"],
    diophantine: ["integer", "solutions"],
    // counting / probability
    combinatorics: ["counting", "combination"],
    permutations: ["permutation", "arrangement"],
    combinations: ["combination", "binomial"],
    factorial: ["permutation", "combination"],
    expectation: ["expected", "value"],
    probabilities: ["probability"],
    // shapes of answers
    area: ["areas"],
    perimeter: ["circumference"],
    circumference: ["perimeter", "circle"],
    volume: ["solid"],
    ratio: ["proportion", "proportional"],
    proportion: ["ratio", "proportional"]
  };

  // Competition abbreviations → full phrase, so "PoP", "FTA", "CRT", ... resolve.
  const ABBREV = {
    pop: "power of a point",
    fta: "fundamental theorem of algebra",
    crt: "chinese remainder theorem",
    lte: "lifting the exponent",
    flt: "fermat little theorem",
    rrt: "rational root theorem",
    sfft: "simon favorite factoring trick",
    amgm: "am gm inequality",
    cs: "cauchy schwarz inequality",
    pie: "inclusion exclusion"
  };

  // Grammar words dropped from queries before scoring — they carry no signal
  // and would otherwise sink descriptive searches into "partial match" mode.
  const STOPWORDS = new Set([
    "the", "an", "of", "to", "in", "on", "for", "and", "or", "is", "are", "be",
    "was", "it", "its", "as", "by", "at", "we", "you", "my", "me", "do", "does",
    "can", "could", "should", "would", "will", "how", "what", "which", "that",
    "this", "these", "those", "there", "then", "than", "when", "where", "who",
    "why", "not", "no", "if", "into", "onto", "from", "with", "within",
    "between", "about", "over", "under", "each", "every", "all", "any", "some",
    "such", "other", "using", "use", "used", "get", "gets", "find", "finding",
    "given", "relationship", "something", "thing"
  ]);

  // Importance tiers, most-used first. Filtered per section via the settings popup.
  const IMP_TIERS = ["high", "medium", "low", "lower", "lowest"];
  const SECTION_IDS = SECTIONS.map(s => s.id);
  // Each section carries its own rarity + level filter (persisted).
  function loadSettings() {
    let s = null;
    try { s = JSON.parse(localStorage.getItem("mq-settings") || "null"); } catch (e) {}
    const sf = {};
    SECTION_IDS.forEach(id => {
      const stored = s && s.sections && s.sections[id];
      let rr = (stored && Array.isArray(stored.rarities)) ? stored.rarities.filter(r => IMP_TIERS.indexOf(r) !== -1) : IMP_TIERS;
      // Migration: settings saved before the "lowest" tier existed had all four old tiers — upgrade to all five.
      if (rr.length === IMP_TIERS.length - 1 && rr.indexOf("lowest") === -1) rr = IMP_TIERS.slice();
      if (!rr.length) rr = IMP_TIERS.slice();
      const ll = (stored && Array.isArray(stored.levels)) ? stored.levels.filter(l => LEVELS.indexOf(l) !== -1) : [];
      sf[id] = { rarities: new Set(rr), levels: new Set(ll) };
    });
    return { sectionFilters: sf };
  }
  function saveSettings() {
    try {
      const out = { sections: {} };
      SECTION_IDS.forEach(id => {
        out.sections[id] = { rarities: [...state.sectionFilters[id].rarities], levels: [...state.sectionFilters[id].levels] };
      });
      localStorage.setItem("mq-settings", JSON.stringify(out));
    } catch (e) {}
  }
  const _loaded = loadSettings();

  const state = {
    query: "",
    starredOnly: false,          // ★ chip: show only starred within the active section
    sectionFilters: _loaded.sectionFilters,  // per-section { rarities:Set, levels:Set }
    activeSectionId: SECTIONS.length ? SECTIONS[0].id : null,
    adv: null,                   // advanced search: { sections:Set, subs:Set, topics:Set, desc:string } or null
    openGroup: null              // sidebar: explicitly opened group, or null to follow the active section
  };
  const GROUP_LABELS = { formulas: "Formulas", tools: "Additional Tools" };
  const groupOf = section => (section && section.group) || "formulas";
  // The group standing open right now. An explicit click on a group header wins;
  // otherwise it is simply the book the active section lives in.
  function openGroupId() {
    if (state.openGroup) return state.openGroup;
    return groupOf(SECTIONS.find(x => x.id === state.activeSectionId));
  }
  function activeFilter() {
    return state.sectionFilters[state.activeSectionId] || { rarities: new Set(IMP_TIERS), levels: new Set() };
  }

  const $sidebar = document.getElementById("sidebar");
  const $content = document.getElementById("content");
  const $search = document.getElementById("search-input");
  const $levelFilters = document.getElementById("level-filters");
  const $sortSelect = document.getElementById("sort-select");
  const $filtersRow = document.querySelector(".filters-row");

  // ---------- Search index ----------

  // Collapse a doubled final consonant left behind by -ing/-ed stripping
  // ("cutt"->"cut", "runn"->"run"), so gerunds/past tenses reach their root.
  function deDouble(s) {
    if (s.length > 2 && s[s.length - 1] === s[s.length - 2] && "bdglmnprt".indexOf(s[s.length - 1]) !== -1) return s.slice(0, -1);
    return s;
  }

  function normWord(w) {
    w = w.toLowerCase().replace(/[^a-z0-9]/g, "");
    // "-es" is only a real plural ending after a sibilant ("boxes", "matches",
    // "classes"); elsewhere the "e" belongs to the stem, and stripping it turned
    // "volumes" into "volum" and "circles" into "circl" — so those never matched
    // the singular the reader actually typed.
    if (w.length > 3 && /(?:ss|x|z|ch|sh)es$/.test(w)) w = w.slice(0, -2);
    else if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss")) w = w.slice(0, -1);
    else if (w.length > 5 && w.endsWith("ing")) w = deDouble(w.slice(0, -3));   // "cutting"->"cut", "counting"->"count"
    else if (w.length > 4 && w.endsWith("ed")) w = deDouble(w.slice(0, -2));    // "solved"->"solv", "nested"->"nest"
    return w;
  }

  function wordsOf(text) {
    return text.split(/[\s,;:\-–—'’().\/]+/).map(normWord).filter(w => w.length > 1);
  }

  // Index-side tokenization keeps both the raw word and its stem, so queries
  // like "exradius" match "exradii" and vice versa.
  function indexWordsOf(text) {
    const out = [];
    text.split(/[\s,;:\-–—'’().\/]+/).forEach(w => {
      const raw = w.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (raw.length > 1) {
        out.push(raw);
        const st = normWord(w);
        if (st !== raw && st.length > 1) out.push(st);
      }
    });
    return out;
  }

  // Tokenize the LaTeX itself so symbol-flavored queries like "4R" or "abc"
  // hit the formulas that contain them. Commands (\frac, \sqrt) are dropped;
  // what survives is the letters and numbers the user actually sees.
  function latexTokens(tex) {
    return (tex || "")
      .replace(/\\[a-zA-Z]+/g, " ")
      .replace(/[^a-zA-Z0-9]+/g, " ")
      .toLowerCase()
      .split(/\s+/)
      .filter(w => w.length >= 2 && w.length <= 10);
  }

  // ---------- Math-shape matching ----------
  // Lets a typed formula ("2sqrtab", "b^2-4ac", "n(n+1)/2") find the entry even
  // when the variable letters differ, by comparing normalized formula shapes.

  const MATH_FNS = ["arcsin", "arccos", "arctan", "sqrt", "sin", "cos", "tan", "cot", "sec", "csc",
    "log", "ln", "gcd", "lcm", "min", "max", "binom", "sum", "prod", "pi",
    "theta", "alpha", "beta", "gamma", "phi", "varphi", "omega", "lambda", "mu", "sigma", "tau"];

  // LaTeX → compact form: \frac{a}{b} → (a)/(b), \sqrt → sqrt, commands dropped,
  // braces/spaces/^/_ stripped. "t = 2\sqrt{r_1 r_2}" → "t=2sqrtr1r2".
  function latexToCompact(tex) {
    let s = tex;
    s = s.replace(/\\(?:left|right|big|Big|bigg|Bigg|displaystyle|quad|qquad|cdot|times)\b/g, "");
    s = s.replace(/\\[,;!]/g, "");
    s = s.replace(/\\text\{[^{}]*\}/g, " ");
    s = s.replace(/\\operatorname\{([^{}]*)\}/g, "$1");
    for (let i = 0; i < 8; i++) {
      const t = s.replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, "($1)/($2)");
      if (t === s) break;
      s = t;
    }
    s = s.replace(/\\sqrt\[[^\]]*\]/g, " sqrt");
    s = s.replace(new RegExp("\\\\(" + MATH_FNS.join("|") + ")\\b", "g"), " $1 ");
    s = s.replace(/\\[a-zA-Z]+/g, " ");
    return s.toLowerCase().replace(/[{}_\s\\^]/g, "").replace(/[^a-z0-9+\-/()=.]/g, "");
  }

  // Compact → skeleton: each variable (letter + optional subscript digits)
  // becomes "x", so 2sqrtr1r2 and 2sqrtab both read "2sqrtxx".
  function skeletonOf(compact) {
    let out = "", i = 0;
    while (i < compact.length) {
      const ch = compact[i];
      if (/[a-z]/.test(ch)) {
        let fn = null;
        for (const f of MATH_FNS) if (compact.startsWith(f, i)) { fn = f; break; }
        if (fn) { out += fn; i += fn.length; continue; }
        i++;
        while (i < compact.length && /[0-9]/.test(compact[i])) i++;
        out += "x";
      } else {
        out += ch;
        i++;
      }
    }
    return out;
  }

  // Matchable fragments of a latex string: the whole compact form plus each
  // "="/comma-separated piece. Each fragment keeps a paren-less canonical form
  // (cn) — \frac conversion inserts parens the user would never type — and a
  // variable-blind skeleton (s).
  function mathFragments(tex) {
    const frags = [];
    const seen = new Set();
    const push = c => {
      c = c.replace(/^[(]+|[)]+$/g, "");
      if (c.length < 3 || seen.has(c)) return;
      seen.add(c);
      const cn = c.replace(/[()]/g, "");
      frags.push({ cn, s: skeletonOf(cn) });
    };
    const compact = latexToCompact(tex);
    compact.split(/[=,;]/).forEach(push);
    push(compact);
    return frags;
  }

  // The query's math forms, or null when the query doesn't look like a formula
  // (needs a digit, an operator, or "sqrt" — plain words stay in word search).
  function queryMathForms(rawQuery) {
    const qc = rawQuery.toLowerCase().replace(/\s+/g, "").replace(/[\^{}_\\]/g, "")
      .replace(/[^a-z0-9+\-/()=.]/g, "");
    if (qc.length < 3) return null;
    if (!/[0-9+\-/()=]/.test(qc) && qc.indexOf("sqrt") === -1) return null;
    const qcn = qc.replace(/[()=]/g, "");
    return { qcn, qs: skeletonOf(qcn) };
  }

  function mathMatchScore(entry, mf) {
    if (!mf) return 0;
    let best = 0;
    for (const f of entry.mathFrags) {
      if (f.cn === mf.qcn) best = Math.max(best, 60);
      else if (mf.qcn.length >= 4 && (f.cn.includes(mf.qcn) || mf.qcn.includes(f.cn))) best = Math.max(best, 34);
      if (f.s === mf.qs && mf.qs.length >= 4) best = Math.max(best, 30);
      else if (mf.qs.length >= 5 && (f.s.includes(mf.qs) || mf.qs.includes(f.s))) best = Math.max(best, 16);
    }
    return best;
  }

  // ---------- Topics (derived tags for filtering & bulk study-list building) ----------
  // Every formula is auto-tagged with the topics its name / keywords / subsection
  // match. Topics drive the clickable "#topic" chips and the topic dimension of the
  // study-list builder, so "add everything about circles" is one action.
  const TOPIC_RULES = [
    // Geometry
    { id: "triangles", label: "triangles", sec: ["geometry"], re: /triangl|cevian|incircle|incenter|circumcenter|centroid|orthocenter|median|altitude|angle bisector|law of (sines|cosines)|heron|stewart|ceva|menelaus|euler line|inradius|circumradius|exradi|similar|proportional|intercept|thales|midsegment/ },
    { id: "circles", label: "circles", sec: ["geometry"], re: /circle|circular|circum|chord|arc|tangent|inscribed|cyclic|incircle|circumcircle|radical|power of a point|secant|ptolemy|inversion/ },
    { id: "quadrilaterals", label: "quadrilaterals", sec: ["geometry"], re: /quadrilateral|trapezoid|parallelogram|rectangle|rhombus|brahmagupta|pitot|bretschneider|varignon|\bkite\b/ },
    { id: "polygons", label: "polygons", sec: ["geometry"], re: /polygon|pentagon|hexagon|octagon|decagon|n-gon|apothem/ },
    { id: "solid-geometry", label: "3D geometry", sec: ["geometry"], re: /sphere|\bcone\b|cylinder|tetrahedron|prism|pyramid|volume|surface area|dihedral|\bsolid\b|octahedron|\bcube\b|frustum|skew/ },
    { id: "coordinate-geometry", label: "coordinates", sec: ["geometry"], re: /coordinate|shoelace|distance formula|\bslope\b|lattice|pick|section formula|vector|dot product|cross product|barycentric/ },
    { id: "angles", label: "angles", sec: ["geometry"], re: /\bangle|inscribed|degree|bisector|directed/ },
    // Algebra
    { id: "polynomials", label: "polynomials", sec: ["algebra"], re: /polynomial|vieta|factor|quadratic|discriminant|remainder theorem|rational root|symmetric function|newton|conjugate root|descartes|palindrom/ },
    { id: "sequences-series", label: "sequences & series", sec: ["algebra"], re: /sequence|series|arithmetic|geometric|telescop|recurrence|fibonacci|progression|summation|partial sum/ },
    { id: "inequalities", label: "inequalities", sec: ["algebra"], re: /inequalit|am.?gm|cauchy|schwarz|jensen|rearrangement|bernoulli|muirhead|maclaurin|smoothing|tangent line trick|trivial inequality|power mean|normalization/ },
    { id: "exponents-logs", label: "exponents & logs", sec: ["algebra"], re: /logarithm|\blog\b|exponent|power law/ },
    { id: "complex-numbers", label: "complex numbers", sec: ["algebra"], re: /complex|imaginary|argand|de moivre|root of unity|roots of unity|conjugate|\bcis\b/ },
    { id: "trigonometry", label: "trigonometry", re: /trig|sine|cosine|tangent ratio|angle addition|double angle|half angle|product.to.sum|sum.to.product|law of (sines|cosines)|\bsin\b|\bcos\b|\btan\b|pythagorean identity|common-angle/ },
    { id: "radicals", label: "radicals", sec: ["algebra"], re: /radical|square root|denest|\bsurd\b|nested radical/ },
    { id: "rates", label: "rates & work", sec: ["algebra"], re: /\brate\b|work rate|mixture|\bspeed\b|average speed/ },
    { id: "functions", label: "functions", sec: ["algebra"], re: /functional equation|\bfunction\b|composition|involution/ },
    // Number Theory
    { id: "primes", label: "primes", sec: ["number-theory"], re: /prime|factoriz|sieve|valuation|legendre|factorial|wilson/ },
    { id: "modular-arithmetic", label: "modular arithmetic", sec: ["number-theory"], re: /\bmod|congru|residue|fermat|euler|totient|\border\b|primitive root|chinese remainder|\bcrt\b|quadratic residue|lifting the exponent/ },
    { id: "divisors", label: "divisors", sec: ["number-theory"], re: /divisor|totient|\btau\b|sigma|multiplicative|number of divisors|sum of divisors/ },
    { id: "gcd", label: "gcd & divisibility", sec: ["number-theory"], re: /\bgcd\b|\blcm\b|divisib|bezout|euclid|coprime/ },
    { id: "diophantine", label: "diophantine", sec: ["number-theory"], re: /diophantine|\bpell\b|pythagorean triple|frobenius|chicken mcnugget|sum of two squares|vieta jumping|\bcoin\b/ },
    { id: "digits", label: "digits & bases", sec: ["number-theory"], re: /digit|\bbase\b|decimal|repunit|repeating/ },
    // Counting
    { id: "combinatorics", label: "combinatorics", sec: ["counting"], re: /combination|permutation|binomial|choose|factorial|arrangement|counting|hockey stick|vandermonde|multinomial|catalan/ },
    { id: "probability", label: "probability", sec: ["counting"], re: /probab|expected|random|\bodds\b|variance|distribution|\bbayes\b/ },
    { id: "expected-value", label: "expected value", sec: ["counting"], re: /expected value|expectation|linearity of expectation/ },
    { id: "recursion", label: "recursion", re: /recursi|recurrence|fibonacci|catalan/ },
    { id: "generating-functions", label: "generating functions", re: /generating function/ },
    { id: "stars-bars", label: "stars & bars", sec: ["counting"], re: /stars and bars|distribut|partition|balls|boxes|composition/ },
    { id: "pigeonhole", label: "pigeonhole", re: /pigeonhole|double counting|handshake/ },
    { id: "graph-theory", label: "graphs", sec: ["counting"], re: /\bgraph|vertex|vertices|\bedge|euler.{0,3}formula|planar|region|\btree\b|degree sum/ }
  ];
  const TOPICS_BY_ID = {};
  TOPIC_RULES.forEach(t => { TOPICS_BY_ID[t.id] = t; });
  // "methods" is a virtual topic keyed off the card type, not a pattern.
  const METHODS_TOPIC = { id: "methods", label: "methods" };
  TOPICS_BY_ID.methods = METHODS_TOPIC;

  // General concept tags added to cards that clearly involve them but didn't spell
  // them out in keywords — so browsing a tag like "incenter" surfaces every card
  // about it. Merged into keywords at build time, so search, the tag browser, and
  // the on-card tag chips all pick them up.
  const EXTRA_TAGS = {
    "law-of-sines": ["circumcircle", "circumradius"],
    "median-to-hypotenuse": ["circumcircle", "circumradius"],
    "medial-triangle": ["nine-point circle", "centroid", "circumcircle"],
    "orthic-triangle": ["nine-point circle", "circumradius"],
    "excentral-triangle": ["circumcircle", "nine-point circle"],
    "contact-triangle": ["incircle", "incenter", "concurrent"],
    "symmedian-lemoine": ["circumcircle", "reflection"],
    "center-distance-formulas": ["circumcenter", "circumcircle"],
    "isogonal-conjugate": ["orthocenter", "circumcenter", "incenter"],
    "altitude-bisector-angle": ["circumcenter", "orthocenter"],
    "orthocentric-system": ["circumcenter"],
    "nine-point-circle": ["orthocenter"],
    "gergonne-nagel-points": ["incenter", "concurrent"],
    "angle-bisector-theorem": ["incenter"],
    "triangle-center-angles": ["angle bisector"],
    "feuerbach-theorem": ["nine-point circle", "incircle"],
    "tangent-facts": ["tangent line"],
    "apollonius-circle": ["perpendicular bisector"],
    "regular-polygon-area": ["circumradius"],
    "centroid-division": ["midpoint"],
    "section-formula": ["midpoint"],
    "isotomic-conjugate": ["cevian"],
    "pedal-triangle": ["circumcircle"],
    "barycentric-coordinates": ["collinear", "concurrent"],
    "coordinate-bash": ["collinear"],
    "area-method": ["collinear"],
    "complex-bash": ["collinear", "concurrent"],
    "pole-polar": ["collinear"],
    "directed-angles": ["concyclic", "collinear"]
  };

  // Broad, curated tags for building study lists: one label covering a whole family of
  // cards, so "triangle centers" can be selected in advanced search and turned into a list
  // in one move. Deliberately NOT merged into f.keywords the way EXTRA_TAGS is, because
  // keywords render as chips on the card face and the face is already at its six-chip cap.
  // These live in entry.groupTags and reach only search, the advanced picker, and filtering.
  const TAG_GROUPS = {
    "triangle centers": [
      "euler-line-ratio", "euler-distance-theorem", "nine-point-circle", "simson-line",
      "symmedian-lemoine", "lemoine-point", "spieker-point", "gergonne-nagel-points",
      "incenter-excenter-lemma", "orthocenter-properties", "fermat-point", "feuerbach-theorem",
      "center-distance-formulas", "triangle-center-angles", "orthocentric-system",
      "brocard-angle", "carnots-theorem", "leibniz-formula", "incenter-coordinates",
      "medial-triangle", "orthic-triangle", "excentral-triangle", "contact-triangle",
      "isogonal-conjugate", "isotomic-conjugate", "pedal-triangle", "centroid-division"
    ],
    "circle theorems": [
      "power-of-a-point", "ptolemys-theorem", "inscribed-angle-theorem", "tangent-chord-angle",
      "angle-chord-secant", "tangent-facts", "two-tangents-angle", "common-tangent-lengths",
      "radical-axis", "butterfly-theorem", "miquels-theorem", "harmonic-quadrilateral",
      "cyclic-quad-diagonals", "circle-equation", "circular-segment", "brahmaguptas-formula",
      "pitots-theorem", "descartes-circle-theorem", "caseys-theorem", "mixtilinear-incircle"
    ],
    "triangle areas": [
      "herons-formula", "trig-area", "triangle-area-standard", "shoelace-formula",
      "inradius-area", "circumradius-area", "exradii", "shared-angle-area-ratio",
      "cevian-area-ratio", "rouths-theorem", "area-method", "picks-theorem"
    ],
    "counting basics": [
      "permutations-combinations", "circular-permutations", "stars-and-bars", "pie",
      "complementary-counting", "counting-blocks", "constructive-counting", "casework-method",
      "bijection-method", "surjections", "multinomial-theorem", "handshakes-diagonals"
    ],
    "modular arithmetic": [
      "fermats-little-theorem", "eulers-totient", "crt", "multiplicative-order",
      "modular-inverse", "squares-mod-small", "wilsons-theorem", "lte",
      "hensel-lifting", "periodicity-mod-m", "choose-modulus", "divisibility-rules"
    ],
    "inequalities": [
      "am-gm", "cauchy-schwarz", "jensens-inequality", "power-mean-inequality",
      "rearrangement", "chebyshev-sum-inequality", "holders-inequality", "minkowski-inequality",
      "muirheads-inequality", "schurs-inequality", "maclaurin-inequality", "karamata-inequality",
      "bernoulli-inequality", "trivial-inequality", "sos-method", "smoothing-method",
      "tangent-line-trick", "normalization", "abs-triangle-inequality"
    ],
    "polynomial roots": [
      "vietas-general", "newtons-sums", "rational-root-theorem", "factor-remainder-theorem",
      "symmetric-polynomial-strategies", "root-transformations", "palindromic-polynomials",
      "lagrange-interpolation", "shifted-polynomial-construction", "coefficient-extraction",
      "eisenstein-criterion", "conjugate-root-theorems", "descartes-rule-signs"
    ],
    "sequences": [
      "arithmetic-series", "geometric-series", "telescoping", "linear-recurrence",
      "first-order-recurrence", "finite-differences", "periodic-sequences", "power-sums",
      "double-summation", "recursive-counting", "catalan-numbers", "recursive-counting"
    ],
    "expected value": [
      "expected-value", "indicator-variables", "states-recursion-prob", "binomial-probability",
      "geometric-distribution", "basic-probability", "symmetry-probability",
      "geometric-probability", "bayes-theorem", "probability-generating-functions"
    ],
    "3d geometry": [
      "prism-pyramid-volumes", "sphere-formulas", "cone-formulas", "frustum-volume",
      "space-diagonal", "regular-tetrahedron", "regular-octahedron", "eulers-polyhedron-formula",
      "de-guas-theorem", "cayley-menger", "isosceles-tetrahedron", "tetrahedron-centroid",
      "point-plane-distance", "plane-intercept-form", "skew-lines-distance", "solid-tactics",
      "cross-section-method", "surface-shortest-path", "cavalieris-principle", "pappus-centroid",
      "insphere-radius", "descartes-sphere-theorem", "cross-product-area"
    ],
    "binomial coefficients": [
      "alternating-squared-binomials", "binomial-row-sums", "committee-chair", "hockey-stick",
      "multinomial-theorem", "pascal-parity", "pascals-identity", "vandermonde",
      "weighted-binomial-sums"
    ],
    "complex numbers": [
      "complex-basics", "de-moivre", "eulers-formula", "roots-of-unity",
      "roots-unity-distance-product"
    ],
    "coordinate geometry": [
      "angle-between-lines", "british-flag-theorem", "circle-equation", "conic-sections",
      "distance-midpoint", "incenter-coordinates", "line-forms", "picks-theorem",
      "point-line-distance", "reflection-coordinates", "rotation-90", "section-formula",
      "shoelace-formula", "vector-dot-product"
    ],
    "cyclic quadrilaterals": [
      "brahmaguptas-formula", "bretschneiders-formula", "cyclic-opposite-angles",
      "cyclic-quad-diagonals", "cyclic-quad-radius", "euler-quadrilateral", "newtons-line",
      "pascals-theorem", "pitots-theorem", "ptolemy-equilateral", "ptolemys-inequality",
      "ptolemys-theorem", "van-aubel", "varignons-theorem"
    ],
    "digits and bases": [
      "base-conversion", "digit-count", "repeating-decimals", "terminating-decimals"
    ],
    "diophantine": [
      "cauchy-davenport", "chevalley-warning", "chicken-mcnugget", "difference-of-squares-rep",
      "erdos-ginzburg-ziv", "factor-pair-counting", "pell-equation", "pythagorean-triples",
      "sum-of-three-squares", "sum-of-two-squares", "thues-lemma"
    ],
    "divisor functions": [
      "coprime-residue-sum", "dirichlet-convolution", "eulers-totient", "lcm-pair-counting",
      "mobius-inversion", "multiplicative-functions", "number-of-divisors",
      "perfect-square-divisors", "product-of-divisors", "sigma-parity", "sum-of-divisors",
      "totient-divisor-sum"
    ],
    "floors and radicals": [
      "absolute-value-rules", "floor-basics", "hermite-identity", "ramanujan-nested-radical",
      "rationalizing"
    ],
    "graph theory": [
      "cayleys-formula", "eulerian-paths", "graph-coloring", "halls-marriage", "konigs-theorem",
      "lgv-lemma", "matrix-tree-theorem", "planar-graph-bound", "plane-regions",
      "turans-theorem"
    ],
    "logarithms": [
      "change-of-base", "exponent-laws", "log-rules", "log-swap-identity"
    ],
    "pigeonhole and extremal": [
      "erdos-szekeres", "extremal-principle", "handshake-lemma", "pigeonhole", "ramsey-33"
    ],
    "primes and factorials": [
      "bertrands-postulate", "consecutive-product-factorial", "floor-multiples",
      "kummers-theorem", "legendres-formula", "lucas-theorem", "p-adic-valuation",
      "prime-divides-binomial", "primes-6k", "trailing-zeros", "vp-factorial"
    ],
    "trigonometry": [
      "angle-addition", "arctan-telescoping", "common-angle-values",
      "cosecant-cotangent-square-sums", "cot-tan-telescoping", "double-angle",
      "even-power-sin-cos-sums", "evenly-spaced-angle-products", "half-angle",
      "inverse-trig-identities", "product-sum", "pythagorean-identities", "reduction-identities",
      "sin-cos-ap-sum", "special-trig-values", "triangle-angle-identities",
      "triangle-square-identities", "trig-telescoping-product", "triple-angle"
    ]
  };
  const GROUPS_BY_ID = {};
  Object.keys(TAG_GROUPS).forEach(label => {
    TAG_GROUPS[label].forEach(id => (GROUPS_BY_ID[id] = GROUPS_BY_ID[id] || []).push(label));
  });

  // ---------- Concept index ----------
  // A card's formula says "R" and "r"; a reader looking for it types
  // "circumradius" and "inradius". Those words sit in the name or tags of only a
  // handful of the cards that actually relate the two, and single letters are
  // dropped from the LaTeX index, so a question asked in words could never reach
  // a formula written in symbols. These rules read each card's LaTeX and emit the
  // English names of the quantities it contains, plus a word for how they are
  // combined — reaching the formulas themselves rather than their labels, which
  // is something no amount of extra tagging can do.
  //
  // Precision matters more than recall here: a wrong concept pollutes every
  // query using that word, so single letters are gated by section (an "r" in
  // number theory is not an inradius) and ambiguous ones are matched only in a
  // context that pins the meaning down.
  const CONCEPT_RULES = [
    // --- geometry ---
    { sec: "geometry", re: /(?:^|[^A-Za-z\\_}])R(?![A-Za-z_])/, w: ["circumradius", "circumcircle", "circumscribed"] },
    { sec: "geometry", re: /(?:^|[^A-Za-z\\_}])r(?![A-Za-z_])/, w: ["inradius", "incircle", "inscribed"] },
    { sec: "geometry", re: /r_\{?[abcA-C]/, w: ["exradius", "excircle"] },
    { sec: "geometry", re: /s\s*-\s*[abc]\b|s\(s|=\s*rs\b|\brs\b/, w: ["semiperimeter"] },
    // "rs" is the inradius times the semiperimeter, but the r is glued to the s
    // and so escapes the single-letter rule above.
    { sec: "geometry", re: /\brs\b/, w: ["inradius", "semiperimeter", "area"] },
    { sec: "geometry", re: /(?:^|[^A-Za-z\\])A\s*=|\[[A-Z]{3}\]|\\text\{Area\}/, w: ["area"] },
    { sec: "geometry", re: /(?:^|[^A-Za-z\\_}])h(?![A-Za-z_])/, w: ["height", "altitude"] },
    { sec: "geometry", re: /m_\{?[abc]/, w: ["median"] },
    { sec: "geometry", re: /\\pi/, w: ["circle", "pi"] },
    { sec: "geometry", re: /\^\\circ|\\angle/, w: ["angle", "degrees"] },
    { sec: "geometry", re: /\\sin|\\cos|\\tan/, w: ["trigonometry"] },
    // --- number theory ---
    { re: /\\varphi|\\phi/, w: ["totient", "coprime", "euler"] },
    { re: /\\sigma/, w: ["sum of divisors"] },
    { re: /\\tau\b|d\(n\)/, w: ["number of divisors", "divisor count"] },
    { re: /\\gcd/, w: ["gcd", "greatest common divisor"] },
    { re: /\\operatorname\{lcm\}|\\text\{lcm\}|\\mathrm\{lcm\}/, w: ["lcm", "least common multiple"] },
    { re: /\\pmod|\\equiv|\\bmod/, w: ["modular", "congruence", "remainder"] },
    { re: /\\lfloor|\\lceil/, w: ["floor", "ceiling", "rounding"] },
    { re: /v_p|v_\{p\}/, w: ["valuation", "exponent of a prime"] },
    { re: /!\s*(?:$|[^=])|n!/, w: ["factorial"] },
    { re: /\\binom|\\dbinom|\\tbinom/, w: ["binomial coefficient", "choose", "combination"] },
    // --- algebra ---
    { re: /e_\{?[1-9nk]/, w: ["elementary symmetric", "symmetric sums"] },
    { re: /p_\{?[1-9nk]/, w: ["power sum"] },
    { re: /\\log|\\ln/, w: ["logarithm"] },
    { re: /\\sqrt/, w: ["radical", "square root"] },
    { re: /\\overline|\\bar\{z\}|\\text\{Im\}|\\text\{Re\}|\bi\b/, w: ["complex"] },
    // --- how the pieces are combined (structural) ---
    { re: /\\le\b|\\ge\b|\\leq|\\geq|\\lt\b|\\gt\b/, w: ["inequality", "bound"] },
    { re: /\\prod/, w: ["product"] },
    { re: /\\sum/, w: ["sum"] }
  ];

  // Words for the shape of the statement, added only when the card really does
  // tie two named quantities together — "ratio" on every card with a fraction
  // would be noise, but on a card relating R to r it is exactly the way a reader
  // describes what they are looking for.
  function conceptsOf(f, sectionId) {
    const tex = f.latex || "";
    const out = new Set();
    let named = 0;
    for (const rule of CONCEPT_RULES) {
      if (rule.sec && rule.sec !== sectionId) continue;
      if (!rule.re.test(tex)) continue;
      rule.w.forEach(w => indexWordsOf(w).forEach(x => out.add(x)));
      named++;
    }
    if (named >= 2) {
      // "the ratio between R and r" is how a reader describes any card tying the
      // two together, not only one literally written as a fraction — and since
      // every query token must land somewhere for a card to survive, a missing
      // "ratio" would drop exactly the cards being looked for. It is a common
      // word, so rarity weighting leaves it almost no influence on the ordering.
      out.add("ratio");
      if (/\\d?frac|\\tfrac|\\dfrac|\//.test(tex)) out.add("quotient");
      if (/=/.test(tex)) ["relationship", "relation"].forEach(w => indexWordsOf(w).forEach(x => out.add(x)));
    }
    return out;
  }

  // Definition words for every glossary term appearing in a card's authored
  // fields. Deliberately does NOT read the detail body: a term mentioned once in
  // passing deep in an essay is not what the card is about.
  const GLOSSARY = window.MATH_GLOSSARY || {};
  const GLOSS_WORDS = new Map();
  Object.keys(GLOSSARY).forEach(k => GLOSS_WORDS.set(k, indexWordsOf(GLOSSARY[k])));
  function glossOf() {
    const out = new Set();
    for (let i = 0; i < arguments.length; i++) {
      const set = arguments[i];
      if (!set) continue;
      for (const w of set) {
        const def = GLOSS_WORDS.get(w);
        if (def) for (const d of def) out.add(d);
      }
    }
    return out;
  }

  // Say a formula out loud. Readers routinely search for the thing they can only
  // pronounce -- "two pi r", "four thirds pi r cubed", "a squared plus b squared
  // equals c squared", "n times n plus one over two" -- but a formula lives only in
  // the card's LaTeX, which the text index strips. Rendering it into the words a
  // person would actually say gives those queries something to match, and feeds the
  // bigram index -- which is in fact the ONLY place it earns anything. Indexing these
  // words as their own field was measured and dropped: it moved nothing on its own and
  // cost a point on the probe set. The value is entirely in pairs like "two pi" and
  // "pi r", which are highly distinctive even though every word in them is common.
  const NUMWORD = ["zero", "one", "two", "three", "four", "five", "six",
                   "seven", "eight", "nine", "ten"];
  const ORDINAL = { 2: "halves", 3: "thirds", 4: "fourths", 5: "fifths", 6: "sixths",
                    8: "eighths" };
  function spokenLatex(tex) {
    if (!tex) return "";
    let t = String(tex);
    t = t.replace(/\\(?:d|t)?frac\s*\{(\d+)\}\s*\{(\d+)\}/g, (m, a, b) =>
      ORDINAL[+b] ? " " + (NUMWORD[+a] || a) + " " + ORDINAL[+b] + " " : " " + a + " over " + b + " ");
    t = t.replace(/\\(?:d|t)?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, " $1 over $2 ");
    t = t.replace(/\\binom\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, " $1 choose $2 ");
    t = t.replace(/\\sqrt\s*\{([^{}]*)\}/g, " square root of $1 ");
    t = t.replace(/\^\s*\{?2\}?/g, " squared ").replace(/\^\s*\{?3\}?/g, " cubed ");
    t = t.replace(/\^\s*\{?([a-z0-9]+)\}?/g, " to the $1 ");
    t = t.replace(/_\s*\{?([a-z0-9]+)\}?/g, " $1 ");
    t = t.replace(/\\sum/g, " sum of ").replace(/\\prod/g, " product of ");
    t = t.replace(/\\(?:cdot|times)/g, " times ").replace(/\\div/g, " divided by ");
    t = t.replace(/\\pmod\s*\{?([^{}\s]*)\}?/g, " mod $1 ");
    t = t.replace(/\\equiv/g, " congruent to ").replace(/\\approx/g, " approximately ");
    t = t.replace(/\\l[et]q?\b/g, " less than or equal ").replace(/\\g[et]q?\b/g, " greater than or equal ");
    t = t.replace(/\\(pi|theta|alpha|beta|gamma|phi|varphi|lambda|mu|sigma|omega|delta)\b/g, " $1 ");
    t = t.replace(/\\(sin|cos|tan|cot|sec|csc|log|ln|gcd|lcm|min|max|det)\b/g, " $1 ");
    t = t.replace(/\\text\s*\{([^{}]*)\}/g, " $1 ");
    t = t.replace(/\\[a-zA-Z]+/g, " ");                       // drop remaining commands
    t = t.replace(/=/g, " equals ").replace(/\+/g, " plus ").replace(/-/g, " minus ");
    t = t.replace(/\b(\d)\b/g, (m, d) => " " + NUMWORD[+d] + " ");   // small digits
    return t.replace(/[{}\\$&]/g, " ").replace(/\s+/g, " ").trim();
  }

  // Adjacent normalized word pairs, stopwords removed first so "area of a triangle"
  // yields "area triangle" and matches a card that writes "triangle area".
  function bigramsOf() {
    const out = new Set();
    for (let i = 0; i < arguments.length; i++) {
      const txt = arguments[i];
      if (!txt) continue;
      for (const chunk of String(txt).split(/[.;:,()]/)) {
        const ws = wordsOf(chunk.toLowerCase()).filter(t => !STOPWORDS.has(t));
        for (let k = 0; k + 1 < ws.length; k++) out.add(ws[k] + " " + ws[k + 1]);
      }
    }
    return out;
  }

  const ALL = [];
  const BY_ID = {};
  SECTIONS.forEach(section => {
    section.subsections.forEach(sub => {
      sub.formulas.forEach(f => {
        const entry = { formula: f, section, subsection: sub };
        if (EXTRA_TAGS[f.id]) f.keywords = f.keywords.concat(EXTRA_TAGS[f.id].filter(k => f.keywords.indexOf(k) === -1));
        entry.nameWords = new Set(indexWordsOf(f.name));
        entry.tagWords = new Set(f.keywords.flatMap(indexWordsOf));
        entry.groupTags = GROUPS_BY_ID[f.id] || [];
        entry.groupWords = new Set(entry.groupTags.flatMap(indexWordsOf));
        entry.tagPhrases = f.keywords.map(k => k.toLowerCase());
        entry.ctxWords = new Set(indexWordsOf(sub.title + " " + section.title));
        entry.descWords = new Set(indexWordsOf(f.description));
        entry.latexWords = new Set(latexTokens(f.latex));
        // Pattern cards live in their own sections but still belong to a subject, and
        // both the concept rules and the topic rules below are gated on subject.
        const subjectId = f.subject || section.id;
        entry.conceptWords = conceptsOf(f, subjectId);
        // Plain-English definitions of any domain term this card uses, from the
        // generated glossary. Lets a reader's wording ("bases of the altitudes")
        // reach a card written in jargon ("altitude feet") without tagging that
        // card, since one glossary entry serves every card using the term.
        entry.glossWords = glossOf(entry.nameWords, entry.tagWords, entry.descWords);
        // Adjacent word pairs from everything authored, plus the glossary gloss.
        // Single words like "area", "triangle", "side" and "three" sit on hundreds of
        // cards, so a query built entirely from them ("the area of a triangle if I
        // know all three sides") gives BM25 nothing to separate Heron from any other
        // triangle card. The PAIR "three sides" is rare, and pairs are what carry the
        // intent in a plainly-worded question.
        entry.bigrams = bigramsOf(f.name, f.keywords.join(" "), f.description,
                                  Array.from(entry.glossWords).join(" "),
                                  spokenLatex(f.latex));
        // The extended write-up: by far the largest description of what a card
        // means, and the only place most paraphrases of it appear ("the midpoints
        // halve every side"). Weak evidence per word, so it is scored lowest, but
        // it is what lets a plainly-worded question reach the right card.
        entry.bodyWords = new Set(indexWordsOf(
          ((window.MATH_DETAILS || {})[f.id] || "").replace(/\$[^$]*\$/g, " ").replace(/^##\s*/gm, "")
        ));
        entry.mathFrags = mathFragments(f.latex);
        entry.nameLower = f.name.toLowerCase();
        const hay = (f.name + " " + f.keywords.join(" ") + " " + sub.title).toLowerCase();
        entry.topics = TOPIC_RULES.filter(t =>
          (!t.sec || t.sec.indexOf(subjectId) !== -1) && t.re && t.re.test(hay));
        if (f.type === "method") entry.topics = entry.topics.concat(METHODS_TOPIC);
        ALL.push(entry);
        BY_ID[f.id] = entry;
      });
    });
  });
  // ---------- Term rarity (IDF) ----------
  // How many entries contain each indexed word. A formula reference is full of
  // words like "triangle", "area" or "number" that sit on hundreds of cards and
  // say almost nothing about intent, while "sine", "stewart" or "frobenius" pin
  // the answer down to a handful. With flat per-field weights three common words
  // outvote the one rare word carrying the query — which is why adding more tags
  // stopped helping: every extra shared tag makes the common words heavier.
  // Weighting each token by how rare it is fixes that at the root and keeps
  // working as the library grows, without touching a single card's tags.
  const DF = new Map();
  ALL.forEach(e => {
    const seen = new Set();
    [e.nameWords, e.tagWords, e.ctxWords, e.latexWords, e.descWords]
      .forEach(set => { for (const w of set) seen.add(w); });
    seen.forEach(w => DF.set(w, (DF.get(w) || 0) + 1));
  });
  const DOC_N = ALL.length || 1;
  // Average field sizes, so a card carrying twenty keywords doesn't outrank a
  // tightly-tagged one just by having more surface area to hit.
  // ---------- BM25F field model ----------
  // Every field here is a word SET, so within-field term frequency is 0 or 1: the
  // ranking signal is which fields a term lands in and how rare that term is.
  // `w` is the field's boost; `b` is BM25's length parameter applied per field, as
  // BM25F prescribes.
  //
  // The b values are deliberately gentle. The previous scorer divided each tag hit
  // by a factor spanning 0.4-1.8, which meant a card with 15 well-chosen keywords
  // had every hit discounted 2.6x against a card with 4 - punishing exactly the
  // cards that document themselves properly. (Medial Triangle carries both
  // "midpoint triangle" and "midpoints of sides" yet lost to Varignon on
  // "connecting midpoints of the sides" for precisely this reason.) At b = 0.35 a
  // card with twice the average keyword count is discounted about 23%, which is
  // the honest correction for "more keywords means more chances to be hit".
  const FIELDS = [
    { key: "nameWords",    w: 9.0, b: 0.55 },
    { key: "tagWords",     w: 5.0, b: 0.35 },
    { key: "conceptWords", w: 2.2, b: 0.20 },
    { key: "latexWords",   w: 2.0, b: 0.20 },
    { key: "descWords",    w: 2.5, b: 0.35 },
    { key: "ctxWords",     w: 1.2, b: 0.10 },
    { key: "bodyWords",    w: 0.5, b: 0.55 },
    { key: "glossWords",   w: 0.8, b: 0.30 },
    { key: "groupWords",   w: 1.0, b: 0.30 }
  ];
  // BM25 saturation. Deliberately large: in classic BM25, `tf` is how many TIMES a
  // term occurs, and saturation encodes "the fifth occurrence tells you little".
  // Here every field is a SET, so the pseudo-tf carries no frequency at all — it
  // is purely which fields matched. A small k1 therefore squashes the one signal
  // that matters: at k1 = 1.6 a hit in the card's NAME scored only 2.2x a hit
  // buried in its prose, and "nine point circle" lost to Medial Triangle. A large
  // k1 keeps the response near-linear in field importance while still damping a
  // term that happens to land in every field at once.
  let K1 = 8;
  const COVERAGE_MIN = 0.70;            // share of query IDF a card must explain
  // K1 / CORROB / SCALE and the field boosts above were grid-searched against
  // tools/eval-queries.json (148 labelled queries). Result vs the previous
  // hand-tuned scorer: top-1 129 -> 134, top-3 136 -> 143, MRR 0.902 -> 0.937,
  // with name and jargon queries both staying at 100%. Re-run tools/search-eval.html
  // after touching any of them.
  FIELDS.forEach(f => {
    f.avg = Math.max(1, ALL.reduce((n, e) => n + (e[f.key] ? e[f.key].size : 0), 0) / DOC_N);
  });
  // Per-entry, per-field length divisor, computed once at startup.
  ALL.forEach(e => {
    e.fieldNorm = FIELDS.map(f => {
      const size = e[f.key] ? e[f.key].size : 0;
      return 1 - f.b + f.b * (size / f.avg);
    });
  });
  const IDF_BASE = Math.log(1 + DOC_N / 40) || 1;      // a word on ~40 cards weighs 1.0
  // Frequencies for the derived fields (concepts and detail bodies) are kept in
  // their own table: the weights above are calibrated on the authored fields, and
  // folding hundreds of thousands of prose words into them would shift every
  // existing score.
  const AUX_DF = new Map();
  ALL.forEach(e => {
    const seen = new Set();
    [e.conceptWords, e.bodyWords, e.glossWords, e.groupWords].forEach(set => { if (set) for (const w of set) seen.add(w); });
    seen.forEach(w => AUX_DF.set(w, (AUX_DF.get(w) || 0) + 1));
  });
  // ---------- Spelling correction ----------
  // A mistyped word appears on zero cards, so `inCorpus` used to drop it from the
  // query entirely — before any fuzzy matching could run. That is why "stewert
  // theorem" returned nothing about Stewart: the only surviving token was
  // "theorem". Correcting an unknown token to its nearest real corpus word first
  // is both the fix and the right place for the logic, since it repairs the query
  // once instead of asking every card to tolerate the typo separately.
  //
  // Bucketed by first letter because `fuzzy` already requires the initials to
  // agree, so a lookup only scans a fraction of the vocabulary.
  const VOCAB_BY_INITIAL = new Map();
  (function () {
    const seen = new Set();
    const add = w => {
      if (w.length < 4 || seen.has(w)) return;
      seen.add(w);
      const k = w[0];
      if (!VOCAB_BY_INITIAL.has(k)) VOCAB_BY_INITIAL.set(k, []);
      VOCAB_BY_INITIAL.get(k).push(w);
    };
    DF.forEach((_, w) => add(w));
    AUX_DF.forEach((_, w) => add(w));
  })();

  // Nearest real word to a typo, or null. This is the standard noisy-channel
  // choice: fewest edits first, and among equally close candidates the one that
  // appears on the MOST cards. Preferring the rarest instead looks appealing but
  // is backwards — "triangel" then resolves to some obscure near-neighbour rather
  // than to "triangle", and the query is worse off than before it was corrected.
  function correctToken(tok) {
    if (tok.length < 4) return null;
    const bucket = VOCAB_BY_INITIAL.get(tok[0]);
    if (!bucket) return null;
    let best = null, bestDf = -1, bestDist = 99;
    for (const w of bucket) {
      if (!fuzzy(w, tok)) continue;
      const d = levBounded(w, tok, 3);
      const df = (DF.get(w) || 0) + (AUX_DF.get(w) || 0);
      if (d < bestDist || (d === bestDist && df > bestDf)) { bestDist = d; bestDf = df; best = w; }
    }
    return best;
  }

  // Bigrams get their own frequency table. They are far rarer than single words, so
  // their IDF is naturally high; without a table of their own that rarity would be
  // read against the unigram calibration and every pair would look equally decisive.
  const BG_DF = new Map();
  ALL.forEach(e => { for (const b of e.bigrams) BG_DF.set(b, (BG_DF.get(b) || 0) + 1); });
  const BG_MAX = Math.log(1 + DOC_N / 2) || 1;
  function bigramIdf(bg) {
    const df = BG_DF.get(bg);
    if (!df) return 0;
    return Math.min(1, Math.log(1 + DOC_N / (1 + df)) / BG_MAX);
  }

  const IDF_CACHE = new Map();
  function idfOf(word) {
    let v = IDF_CACHE.get(word);
    if (v !== undefined) return v;
    const df = DF.get(word);
    if (df) v = Math.log(1 + DOC_N / (1 + df)) / IDF_BASE;
    else {
      const aux = AUX_DF.get(word);
      // A word that appears nowhere in the library at all cannot tell two cards
      // apart, so it must not be treated as the distinctive one. "made" sits on
      // zero cards, yet counting it as rare was enough to sink every result for
      // "area of triangle made by connecting midpoints".
      v = aux ? Math.log(1 + DOC_N / (1 + aux)) / IDF_BASE : 0.3;
    }
    v = Math.max(0.3, Math.min(2.6, v));
    IDF_CACHE.set(word, v);
    return v;
  }
  function inCorpus(word) { return DF.has(word) || AUX_DF.has(word); }

  function entriesForTopic(topicId) {
    return ALL.filter(e => e.topics.some(t => t.id === topicId));
  }

  function getRoute() {
    let m = location.hash.match(/^#\/f\/([\w-]+)$/);
    if (m && BY_ID[m[1]]) return { type: "formula", entry: BY_ID[m[1]] };
    m = location.hash.match(/^#\/list\/([\w-]+)$/);
    if (m && anyList(m[1])) return { type: "list", listId: m[1] };
    if (/^#\/lists$/.test(location.hash)) return { type: "lists" };
    m = location.hash.match(/^#\/problems(?:\/([a-z0-9-]+)\/(\d{4}))?$/);
    if (m) return { type: "problems", fam: m[1] || null, year: m[2] ? +m[2] : null };
    m = location.hash.match(/^#\/problem\/([\w-]+)$/);
    if (m && PROBLEM_BY_SLUG[m[1]]) return { type: "problem", slug: m[1] };
    m = location.hash.match(/^#\/topic\/([\w-]+)$/);
    if (m && TOPICS_BY_ID[m[1]]) return { type: "topic", topicId: m[1] };
    return { type: "home" };
  }

  // Remember where the reader was in the list so "back" from a detail page
  // returns them there instead of jumping to the top.
  let listScrollY = 0;
  function openFormula(id) {
    if (getRoute().type !== "formula") listScrollY = window.scrollY;
    location.hash = "#/f/" + id;
  }

  // ---------- Study lists (named collections, persisted per-browser) ----------
  // One data structure holds every list; "starred" is a built-in list so the
  // one-click star and the named study lists share the same storage. Older
  // installs kept a bare "mq-stars" array — migrate it into the Starred list.
  let lists;
  function loadLists() {
    try { lists = JSON.parse(localStorage.getItem("mq-lists") || "null"); } catch (e) { lists = null; }
    if (!lists || !Array.isArray(lists.items)) {
      let migrated = [];
      try { migrated = JSON.parse(localStorage.getItem("mq-stars") || "[]"); } catch (e) { migrated = []; }
      lists = { items: [{ id: "starred", name: "Starred", ids: migrated, builtin: true }] };
      saveLists();
    }
    if (!lists.items.some(l => l.id === "starred")) {
      lists.items.unshift({ id: "starred", name: "Starred", ids: [], builtin: true });
    }
    // Drop ids that no longer exist in the library (e.g. a renamed formula).
    lists.items.forEach(l => { l.ids = l.ids.filter(id => BY_ID[id]); });
  }
  function saveLists() { try { localStorage.setItem("mq-lists", JSON.stringify(lists)); } catch (e) {} }
  function getList(id) { return lists.items.find(l => l.id === id); }
  function inList(listId, fid) { const l = getList(listId); return !!l && l.ids.indexOf(fid) !== -1; }
  function listCountFor(fid) { return lists.items.reduce((n, l) => n + (l.ids.indexOf(fid) !== -1 ? 1 : 0), 0); }
  function toggleMembership(listId, fid) {
    const l = getList(listId); if (!l) return;
    const i = l.ids.indexOf(fid);
    if (i === -1) l.ids.push(fid); else l.ids.splice(i, 1);
    saveLists();
  }
  function addManyToList(listId, fids) {
    const l = getList(listId); if (!l) return 0;
    let n = 0;
    fids.forEach(f => { if (BY_ID[f] && l.ids.indexOf(f) === -1) { l.ids.push(f); n++; } });
    saveLists();
    return n;
  }
  function createList(name) {
    const id = "l_" + Math.random().toString(36).slice(2, 8);
    lists.items.push({ id, name: (name || "").trim() || "Untitled list", ids: [] });
    saveLists();
    return id;
  }
  function renameList(id, name) { const l = getList(id); if (l && name.trim()) { l.name = name.trim(); saveLists(); } }
  function deleteList(id) { const l = getList(id); if (l && !l.builtin) { lists.items = lists.items.filter(x => x.id !== id); saveLists(); } }

  loadLists();

  // Curated built-in study sets (read-only). These are cross-cutting sets, so they
  // keep the deliberate file order (contest tiers, then methods, then curiosities)
  // rather than being grouped by subject. Unknown ids are dropped at load.
  const BUILTIN_LISTS = (window.MATH_BUILTIN_LISTS || [])
    .map((l, i) => ({ id: l.id, name: l.name, subject: l.subject, ids: (l.ids || []).filter(id => BY_ID[id]), builtinSet: true, _i: i }))
    .filter(l => l.ids.length)
    .sort((a, b) => a._i - b._i);
  const BUILTIN_BY_ID = {};
  BUILTIN_LISTS.forEach(l => { BUILTIN_BY_ID[l.id] = l; });
  function anyList(id) { return getList(id) || BUILTIN_BY_ID[id]; }

  function starBtnHtml(id) {
    const on = inList("starred", id);
    return `<button class="star-btn${on ? " starred" : ""}" data-star="${id}" title="${on ? "Starred" : "Star for later"}">${on ? "★" : "☆"}</button>`;
  }
  // Add-to-list opener: a plain "+".
  function addListBtnHtml(id) {
    return `<button class="addlist-btn" data-addlist="${id}" title="Add to a study list" aria-label="Add to a study list">+</button>`;
  }
  function refreshAddListButtons() { /* the button is a static "+"; nothing to refresh */ }

  // ---------- Add-to-list popover + toast ----------
  let menuEl = null;
  function closeListMenu() {
    if (!menuEl) return;
    menuEl.remove();
    menuEl = null;
    document.removeEventListener("mousedown", onDocDown, true);
    document.removeEventListener("keydown", onMenuKey, true);
  }
  function onDocDown(e) {
    if (menuEl && !menuEl.contains(e.target) && !e.target.closest("[data-addlist],[data-bulkadd]")) closeListMenu();
  }
  function onMenuKey(e) { if (e.key === "Escape") closeListMenu(); }

  // Plain text glyphs, never emoji: gold star for the built-in Starred list, a
  // small accent diamond for every other list.
  function listGlyph(l) {
    return l.id === "starred" ? `<span class="list-star">&#9733;</span>` : `<span class="list-ico">&#9670;</span>`;
  }
  // Add-to-list popover for one formula: membership checkboxes + create-new.
  // (Bulk selections create their own new list instead of piling into an existing one.)
  function openListMenu(anchor, fid) {
    const wasOpen = menuEl && menuEl._anchor === anchor;
    closeListMenu();
    if (wasOpen) return;   // a second click on the same opener closes it
    const rows = lists.items.map(l =>
      `<li><label class="lm-row"><input type="checkbox" data-lm-toggle="${l.id}"${inList(l.id, fid) ? " checked" : ""}><span class="lm-emoji">${listGlyph(l)}</span><span class="lm-name">${escapeAttr(l.name)}</span></label></li>`
    ).join("");
    menuEl = document.createElement("div");
    menuEl.className = "listmenu";
    menuEl._anchor = anchor; menuEl._fid = fid;
    menuEl.innerHTML = `
      <div class="lm-title">Add to study list</div>
      <ul class="lm-list">${rows}</ul>
      <form class="lm-new"><input type="text" placeholder="New list name&hellip;" maxlength="40" autocomplete="off"><button type="submit">Create</button></form>`;
    document.body.appendChild(menuEl);
    positionMenu(menuEl, anchor);
    menuEl.addEventListener("change", onMenuChange);
    menuEl.addEventListener("submit", onMenuSubmit);
    setTimeout(() => {
      document.addEventListener("mousedown", onDocDown, true);
      document.addEventListener("keydown", onMenuKey, true);
    }, 0);
  }
  function positionMenu(el, anchor) { positionFloat(el, anchor, 244); }
  // Clamps on both axes. `preferAbove` puts the box over the anchor, which is what a hover
  // preview wants so it never covers the text you are still reading; it falls back to below
  // when there is no room up there. The add-to-list menu keeps the opposite preference.
  function positionFloat(el, anchor, w, preferAbove) {
    const r = anchor.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    el.style.width = w + "px";
    let left = r.left + window.scrollX;
    if (left + w > window.scrollX + vw - 8) left = window.scrollX + vw - w - 8;
    el.style.left = Math.max(8 + window.scrollX, left) + "px";
    const h = el.offsetHeight || 160;
    const fitsAbove = r.top - 6 - h >= 8;
    const fitsBelow = r.bottom + 6 + h <= vh - 8;
    const above = preferAbove ? (fitsAbove || !fitsBelow) : !fitsBelow && fitsAbove;
    el.style.top = (above ? Math.max(8 + window.scrollY, r.top + window.scrollY - h - 6)
                          : r.bottom + window.scrollY + 6) + "px";
  }
  function syncStarButtons(fid) {
    const on = inList("starred", fid);
    document.querySelectorAll(`.star-btn[data-star="${fid}"]`).forEach(b => {
      b.classList.toggle("starred", on); b.textContent = on ? "★" : "☆";
      b.title = on ? "Starred" : "Star for later";
    });
  }
  function onMenuChange(e) {
    const cb = e.target.closest("[data-lm-toggle]");
    if (!cb || !menuEl) return;
    const fid = menuEl._fid;
    toggleMembership(cb.dataset.lmToggle, fid);   // toggle = can never add twice
    refreshAddListButtons(fid);
    syncStarButtons(fid);
  }
  function onMenuSubmit(e) {
    e.preventDefault();
    if (!menuEl) return;
    const inp = menuEl.querySelector(".lm-new input");
    const name = inp ? inp.value.trim() : "";
    if (!name) { if (inp) inp.focus(); return; }
    const fid = menuEl._fid;
    const id = createList(name);
    const l = getList(id);
    addManyToList(id, [fid]);
    refreshAddListButtons(fid);
    toast(`Created ${listGlyph(l)} ${escapeAttr(l.name)} &middot; added 1`);
    closeListMenu();
    const rt = getRoute();
    if (rt.type === "list" || rt.type === "lists") render();
  }

  let toastTimer = null;
  function toast(msg) {
    let t = document.getElementById("mq-toast");
    if (!t) { t = document.createElement("div"); t.id = "mq-toast"; t.className = "toast"; document.body.appendChild(t); }
    t.innerHTML = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 1900);
  }

  // Entries whose formula line is hard to parse without the picture — these
  // show their diagram on the preview card, not just the detail page.
  const CARD_DIAGRAM_IDS = new Set([
    "altitude-hypotenuse", "incircle-tangent-lengths", "shared-angle-area-ratio", "exradii",
    "angle-bisector-theorem", "angle-bisector-length", "stewarts-theorem", "cevas-theorem",
    "menelaus-theorem", "ratio-lemma", "apollonius-theorem", "rouths-theorem", "trig-ceva",
    "symmedian-lemoine", "harmonic-quadrilateral", "lemoine-point",
    "stars-and-bars", "grid-paths", "catalan-numbers", "am-gm", "jensens-inequality",
    "roots-of-unity", "floor-basics", "absolute-value-rules", "lattice-points-gcd",
    "incenter-excenter-lemma", "orthocenter-properties", "fermat-point",
    "simson-line", "butterfly-theorem", "radical-axis", "miquels-theorem", "ptolemys-theorem",
    "cyclic-quad-diagonals", "varignons-theorem", "van-aubel", "napoleons-theorem",
    "trapezoid-special-segments", "intercept-theorem", "british-flag-theorem", "mass-points",
    "reflection-shortest-path", "rotation-trick", "spiral-similarity", "de-guas-theorem",
    "skew-lines-distance", "circular-segment", "feuerbach-theorem", "nine-point-circle",
    "common-tangent-lengths", "angle-chord-secant", "tangent-chord-angle",
    "centroid-division", "cevian-area-ratio",
    "midsegment-theorem", "euler-line-ratio", "euler-distance-theorem", "tangent-facts",
    "law-of-sines", "circumradius-area", "angle-chasing",
    "pedal-triangle", "orthic-triangle", "medial-triangle", "contact-triangle", 
    "pole-polar", "directed-angles", "complete-quadrilateral-miquel", "morleys-theorem", 
    "equal-chords-arcs"
  ]);

  function stripHash() {
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  }

  function sectionCount(section) {
    return section.subsections.reduce((n, sub) => n + sub.formulas.length, 0);
  }

  function passesLevel(f) {
    const entry = BY_ID[f.id];
    const sf = entry ? state.sectionFilters[entry.section.id] : null;
    if (!sf) return true;
    const levelOk = sf.levels.size === 0 || f.level.some(l => sf.levels.has(l));
    const impOk = sf.rarities.has(f.importance);
    return levelOk && impOk;
  }

  // ---------- Search ----------

  // BM25F pseudo term-frequency for one token against one card.
  //
  // Exact hits count fully; prefix, substring and edit-distance hits count for
  // less. Field contributions combine as STRONGEST + a fraction of the rest.
  //
  // Textbook BM25F sums the fields, but that is only sound when each field
  // contributes a real term count. With binary word sets, plain summing lets a
  // card that mentions a word in five weak fields outscore the card that has it
  // in its NAME — measured: "nine point circle" returned Medial Triangle first
  // and the Nine-Point Circle third. The previous scorer avoided this by taking
  // only the max field, which threw away corroboration instead. Taking the max
  // plus a discounted remainder keeps the field hierarchy intact while still
  // letting agreement across fields break ties.
  //
  // Also returns the indexed word that actually matched, so rarity is taken from
  // what matched rather than what was typed: "circum" against "circumradius"
  // should inherit how rare "circumradius" is.
  const EXACT = 1, PREFIX = 0.6, SUBSTR = 0.4, FUZZ = 0.5;
  let CORROB = 0.15;                    // credit given to fields beyond the strongest
  // BM25 returns a score per token bounded by that token's IDF (about 0.3-2.6), so
  // a whole query totals roughly 1-8. The whole-query bonuses below (exact name,
  // tag phrase) and mathMatchScore were calibrated against the previous scorer,
  // whose per-token scores ran 4-51. Left unscaled, any bonus that fired buried
  // everything else and any card without one was ranked on near-flat noise —
  // which is how "factor x^4 + 4" stopped returning its own card. Scaling the
  // token sum back into the original range keeps every one of those constants
  // meaningful instead of re-tuning them all.
  let SCALE = 70;

  function fieldTf(entry, tok) {
    let sum = 0, max = 0, best = null, bestScore = 0, exact = false;
    const add = (c, w, matched) => {
      sum += c;
      if (c > max) max = c;
      if (w > bestScore) { bestScore = w; best = matched; }
    };
    for (let i = 0; i < FIELDS.length; i++) {
      const set = entry[FIELDS[i].key];
      if (set && set.has(tok)) {
        exact = true;
        add(FIELDS[i].w * EXACT / entry.fieldNorm[i], FIELDS[i].w, tok);
      }
    }
    if (exact) return { tf: max + CORROB * (sum - max), word: best };
    if (tok.length < 3) return { tf: 0, word: tok };
    // Nothing matched exactly, so fall back to the looser matchers — but only on
    // the authored fields. Scanning the detail body word by word for every query
    // token would dominate the cost of a query, for the weakest evidence there is.
    for (let i = 0; i < FIELDS.length; i++) {
      const f = FIELDS[i];
      if (f.key === "bodyWords") continue;
      const set = entry[f.key];
      if (!set || !set.size) continue;
      let q = 0, matched = null;
      for (const w of set) if (w.startsWith(tok)) { q = PREFIX; matched = w; break; }
      if (!q) for (const w of set) {
        if (w.length > tok.length && w.indexOf(tok) !== -1) { q = SUBSTR; matched = w; break; }
      }
      if (!q && tok.length >= 4) for (const w of set) if (fuzzy(w, tok)) { q = FUZZ; matched = w; break; }
      if (!q) continue;
      add(f.w * q / entry.fieldNorm[i], f.w * q, matched);
    }
    return { tf: max + CORROB * (sum - max), word: best || tok };
  }

  // Levenshtein distance with an early-exit cap (returns cap+1 once exceeded).
  function levBounded(a, b, cap) {
    const m = a.length, n = b.length;
    if (Math.abs(m - n) > cap) return cap + 1;
    let prev = []; for (let j = 0; j <= n; j++) prev[j] = j;
    for (let i = 1; i <= m; i++) {
      const cur = [i]; let best = i;
      for (let j = 1; j <= n; j++) {
        const c = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + c);
        if (cur[j] < best) best = cur[j];
      }
      if (best > cap) return cap + 1;
      prev = cur;
    }
    return prev[n];
  }

  // Typo tolerance: the first letter must agree and the edit budget scales with
  // word length (short words get 1 edit, long words up to 3), so "stewert"→
  // "stewart", "recurrance"→"recurrence", "triangel"→"triangle" and
  // "bretschinder"→"bretschneider" all match without pulling in unrelated words.
  function fuzzy(a, b) {
    if (a.length < 4 || b.length < 4) return false;
    if (a[0] !== b[0]) return false;
    const longest = Math.max(a.length, b.length);
    if (longest < 8 && a.slice(0, 2) !== b.slice(0, 2)) return false;   // short words: share a 2-char prefix
    const cap = longest >= 9 ? 3 : longest >= 6 ? 2 : 1;
    return levBounded(a, b, cap) <= cap;
  }

  function expandToken(tok) {
    return SYNONYMS[tok] ? [tok, ...SYNONYMS[tok].map(normWord)] : [tok];
  }

  // Grid-searched against tools/eval-queries.json AND a separate 78-query probe set
  // written by imagining how a reader would describe a theorem without knowing its
  // name. Phrase matching was the single biggest win of the whole rebuild:
  // eval top-1 144 -> 152, probe top-1 49 -> 53. Both channels had been failing on
  // plainly-worded questions because every individual word in them is common; the
  // word PAIR is what carries the intent.
  let BIGRAM_W = 50;

  function scoreEntry(entry, queryLower, tokens, mathForms, queryBigrams) {
    let total = 0;
    // Coverage replaces the old weak-link penalty AND the dead-word slack rule
    // with a single number: what share of the query's *information* this card
    // accounts for, measured in IDF rather than in word count. Failing to match
    // "triangle" costs almost nothing; failing to match "frobenius" is fatal.
    // That is the same intent the two old heuristics had, without them being able
    // to compound into each other unpredictably.
    let covered = 0, demand = 0;

    for (const tok of tokens) {
      let bestTf = 0, bestWord = tok;
      for (const t of expandToken(tok)) {
        const r = fieldTf(entry, t);
        if (r.tf > bestTf) { bestTf = r.tf; bestWord = r.word; }
      }
      const idf = idfOf(bestTf > 0 ? bestWord : tok);
      demand += idf;
      if (bestTf > 0) {
        covered += idf;
        total += SCALE * idf * bestTf / (K1 + bestTf);   // BM25 saturation
      }
    }
    const coverage = demand > 0 ? covered / demand : 0;
    // Prefer cards that explain more of the query, but as a smooth factor rather
    // than the old hard strict/loose pool split. That split discarded every
    // partial match the moment any single card cleared the bar, which is how
    // "reflect a point to shorten a path" fell from rank 1 to off the list.
    total *= 0.25 + 0.75 * coverage;

    // Phrase bonus. Each shared adjacent pair is weighted by how rare that pair is,
    // so "three sides" earns real credit while "of the" earns none. This is what
    // separates a card from its topical neighbours when every individual word in the
    // query is common.
    if (queryBigrams && queryBigrams.length) {
      let bg = 0;
      for (const b of queryBigrams) if (entry.bigrams.has(b)) bg += bigramIdf(b);
      total += BIGRAM_W * bg;
    }

    // Whole-query bonuses: exact name, name containing the query, exact tag phrase.
    if (entry.nameLower === queryLower) total += 80;
    else if (entry.nameLower.includes(queryLower) && queryLower.length >= 4) {
      // Scale by how much of the name the query actually covers. A flat bonus made
      // every card whose name merely CONTAINS the word tie with the card the word
      // names: searching "telescoping" put Arctangent Addition & Telescoping above
      // Telescoping Sums, and "circle area" put Inradius Formula above Circle Basics.
      // Covering most of the name is strong evidence; being one word of four is not.
      total += 30 * (queryLower.length / entry.nameLower.length);
    }
    if (entry.tagPhrases.includes(queryLower)) total += 40;

    // Typed-formula match against the entry's own math.
    const mScore = mathMatchScore(entry, mathForms);
    total += mScore;

    return { total, matchedAll: coverage >= COVERAGE_MIN || mScore >= 30, coverage };
  }

  // RRF constants. K damps the difference between adjacent ranks (60 is the
  // standard choice); the two weights set how much say each channel has.
  // Each channel has its own rank-decay constant, though both measured best at 60.
  // Shrinking RRF_K_SEM lets the semantic side rescue a card the lexical channel
  // buried, which sounds right and does lift the `hard` group (12 -> 16 at K = 12),
  // but it costs more than it gains: `paraphrase` fell 48 -> 41 and top-1 dropped.
  // Kept as a separate knob because the two channels genuinely could want
  // different decay, but do not lower it without re-running the eval.
  let RRF_K = 60, RRF_K_SEM = 60, RRF_LEX = 1.0, RRF_SEM = 0.30,
      RRF_MARGIN = 0.25, RRF_MIN_TOKENS = 3, RRF_SIM_LO = 0.35, RRF_SIM_HI = 0.55;

  const IMP_RANK = { high: 0, medium: 1, low: 2, lower: 3, lowest: 4 };

  function searchFormulas(rawQuery) {
    let raw = rawQuery.trim();
    if (ABBREV[raw.toLowerCase()]) raw = ABBREV[raw.toLowerCase()];   // whole query is an abbreviation
    const queryLower = raw.toLowerCase();
    let tokens = wordsOf(queryLower).filter(t => !STOPWORDS.has(t));
    if (!tokens.length) tokens = wordsOf(queryLower);
    // expand any abbreviation that appears as its own token (mixed queries)
    tokens = tokens.flatMap(t => ABBREV[t] ? wordsOf(ABBREV[t]).filter(w => !STOPWORDS.has(w)) : [t]);
    // A token that appears on no card anywhere cannot narrow anything down; all
    // it can do is stop every card from matching the whole query. Filler like
    // "made" or "basically" is exactly this, and long plainly-worded questions
    // are full of it. (Kept if it would empty the query, so a search for a word
    // the library simply lacks still reports honestly rather than silently
    // searching for something else.)
    // Repair typos before pruning: an unknown token gets one chance to resolve to
    // a real corpus word. Only then are the still-unknown ones (genuine filler
    // like "made" or "basically") dropped, since a word on no card cannot narrow
    // anything down and would otherwise stop every card from covering the query.
    tokens = tokens.map(t => {
      if (inCorpus(t)) return t;
      return correctToken(t) || t;
    });
    // The semantic channel wants the words the lexical one is about to throw away:
    // "connecting" sits on no card, so inCorpus drops it, yet it is precisely the
    // word that should reach a card saying "joining the side midpoints".
    const semanticTokens = tokens.slice();
    const meaningful = tokens.filter(inCorpus);
    if (meaningful.length) tokens = meaningful;
    const mathForms = queryMathForms(rawQuery);
    if (!tokens.length && !mathForms) return { results: [], partial: false };
    // Query phrases, built the same way the index was so the two line up.
    const queryBigrams = Array.from(bigramsOf(queryLower));

    const scored = [];
    let anyFull = false;
    // A text search is global: it ignores the per-section level/importance
    // filters, which are local to each of the four category pages, not to search.
    for (const entry of ALL) {
      const { total, matchedAll } = scoreEntry(entry, queryLower, tokens, mathForms, queryBigrams);
      if (total <= 0) continue;
      if (matchedAll) anyFull = true;
      scored.push({ entry, score: total });
    }

    // Prefer entries matching every keyword; fall back to partial matches.
    // Ties break toward higher-importance formulas, then names.
    const cmp = (a, b) => b.score - a.score ||
      IMP_RANK[a.entry.formula.importance] - IMP_RANK[b.entry.formula.importance] ||
      a.entry.formula.name.localeCompare(b.entry.formula.name);
    let pool = scored;
    pool.sort(cmp);

    // ---------- Reciprocal Rank Fusion ----------
    // Combine the lexical and semantic rankings by RANK, not by score. The two
    // produce numbers on unrelated scales, and normalizing them against each other
    // is fragile — a query where one channel happens to score large would swamp
    // the other. RRF sidesteps calibration entirely: each channel contributes
    // w/(K + rank), so a card the lexical side already ranks first cannot be
    // displaced by a semantic guess, while a card only the semantic side knows
    // about can still climb into view. That is what lets semantics be added
    // without putting the existing behaviour at risk.
    const SEM = window.MathSemantic;
    if (SEM && SEM.ready() && semanticTokens.length) {
      const sem = SEM.rank(semanticTokens, 40);
      if (sem && sem.length) {
        // Gate the semantic channel on how sure the lexical one is.
        //
        // Measured on the eval set, the two channels are not equals: lexical gets
        // 134/148 top-1, semantic 100/148. Blending them everywhere therefore lets
        // the weaker one disturb answers the stronger one already had right —
        // "triangle inequality" fell from 1st to 4th, "denesting radicals" to 9th.
        // But on queries where lexical is merely guessing, semantics is exactly
        // what is needed: it is what finally puts Medial Triangle first for
        // "area of triangle formed by connecting midpoints of the sides".
        //
        // The relative gap between the top two lexical scores separates those two
        // situations. A decisive winner (exact name match, a rare term) leads by a
        // wide margin and is left alone; a flat top means the lexical channel has
        // no real opinion, so semantics gets its full say.
        // Query length is the second signal. A one- or two-word query is nearly
        // always a name or a piece of contest shorthand ("denesting radicals",
        // "triangle inequality"), where the lexical channel is authoritative and
        // there is no paraphrase to bridge. Long, plainly-worded questions are the
        // opposite. Every casualty of ungated fusion was a short query; every
        // beneficiary was a long one.
        const s1 = pool.length ? pool[0].score : 0;
        const s2 = pool.length > 1 ? pool[1].score : 0;
        const margin = s1 > 0 ? (s1 - s2) / s1 : 0;
        // Third signal, and the only calibrated one available: the semantic
        // channel's own top cosine. BM25 scores mean nothing in absolute terms,
        // but a cosine does — around 0.6 the match is genuinely close, around 0.3
        // it is noise. So let the semantic side speak up when it is actually sure
        // and stand down when it is guessing, instead of always contributing the
        // same fixed share.
        const sim = sem[0].score;
        const conf = Math.max(0, Math.min(1, (sim - RRF_SIM_LO) / (RRF_SIM_HI - RRF_SIM_LO)));
        const semW = semanticTokens.length < RRF_MIN_TOKENS
          ? 0
          : RRF_SEM * conf * (1 - Math.min(1, margin / RRF_MARGIN));
        const fused = new Map();
        for (let i = 0; i < pool.length; i++) {
          fused.set(pool[i].entry.formula.id,
            { entry: pool[i].entry, score: RRF_LEX / (RRF_K + i + 1) });
        }
        for (let i = 0; i < sem.length; i++) {
          const bump = semW / (RRF_K_SEM + i + 1);
          const hit = fused.get(sem[i].id);
          if (hit) hit.score += bump;
          else if (BY_ID[sem[i].id]) fused.set(sem[i].id, { entry: BY_ID[sem[i].id], score: bump });
        }
        pool = Array.from(fused.values());
        pool.sort(cmp);
      }
    } else if (SEM && SEM.status() === "idle") {
      SEM.load();          // warm it for the next keystroke; this query stays lexical
    }
    // Trim the weak tail: keep the clearly-relevant matches (always at least the
    // top handful), then drop entries scoring far below the leader so a growing
    // library doesn't bury the answer under near-misses.
    const topScore = pool.length ? pool[0].score : 0;
    const kept = pool.filter((r, i) => i < 6 || r.score >= topScore * 0.3);
    return {
      results: kept.slice(0, 60).map(r => r.entry),
      partial: !anyFull && pool.length > 0
    };
  }

  // ---------- Sorting ----------

  // The "Show" dropdown filters by importance tier rather than reordering;
  // curated order (or search relevance) is always preserved.
  function sortEntries(entries) {
    return entries;
  }

  // ---------- Rendering ----------

  // Split a multi-formula latex string into its separate formulas.
  // Separators: any "\qquad", or "\quad" directly after a comma/semicolon.
  function splitLatexParts(latex) {
    return latex
      .split(/\s*(?:[,;]\s*\\q?quad|\\qquad)\s*/)
      .map(p => p.trim())
      .filter(Boolean);
  }

  // Stack a multi-formula string into rows instead of one long row (for display).
  function toDisplayLatex(latex) {
    const parts = splitLatexParts(latex);
    if (parts.length < 2) return latex;
    return "\\begin{gathered}" + parts.join(" \\\\[0.55em] ") + "\\end{gathered}";
  }

  // The exact LaTeX the reader sees, formatted for the clipboard: single-formula
  // cards copy as-is; multi-formula cards copy the same stacked `gathered`
  // environment that's rendered, with real newlines for readability.
  function toCopyLatex(latex) {
    const parts = splitLatexParts(latex);
    if (parts.length < 2) return latex;
    return "\\begin{gathered}\n" + parts.join(" \\\\[0.55em]\n") + "\n\\end{gathered}";
  }

  function renderMath(container) {
    container.querySelectorAll(".formula-display[data-latex]").forEach(el => {
      try {
        katex.render(toDisplayLatex(el.dataset.latex), el, { throwOnError: false, displayMode: true });
      } catch (err) {
        el.textContent = el.dataset.latex;
      }
    });
    if (window.renderMathInElement) {
      container.querySelectorAll(".card-desc, .card-name, .card-example, .detail-body, .key-forms, .related-item, .problem-q, .problem-sol, .strat-name, .prob-strategy, .prob-strategy-box, .cp-head, .cp-desc").forEach(el => {
        renderMathInElement(el, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      });
    }
    tidyDiagrams(container);
  }

  // ---------- Diagram legibility pass ----------
  // Computed SVG figures are geometrically exact but can crowd: point dots
  // hidden under strokes and (in dense figures) labels overlapping each other.
  // This runs once per render and, without touching the geometry, raises dots
  // and labels above the lines, then nudges apart labels that actually overlap.
  function tidyDiagrams(container) {
    container.querySelectorAll(".diagram svg").forEach(svg => {
      try {
        tidyDiagram(svg);
        // Only the at-a-glance figures on the scrolling card list get cropped. Detail pages
        // have room to breathe; the card list is where an over-tall canvas costs real scroll.
        if (svg.closest(".card-glance")) cropDiagramHeight(svg);
      } catch (e) { /* getBBox can throw if the svg isn't laid out */ }
    });
  }

  // Trim the empty band above and below the drawing. Only the vertical extent of the
  // viewBox changes: x and width are left alone, so the horizontal scale, and therefore the
  // rendered size of the figure itself, is untouched. Several diagrams were composed on a
  // canvas far taller than their content (AM-GM used 57% of its height on nothing), which
  // read as a large empty box around a small picture. Runs after tidyDiagram so that labels
  // it has just moved are inside the measured bounds.
  function cropDiagramHeight(svg) {
    const vb = (svg.getAttribute("viewBox") || "").trim().split(/\s+/).map(Number);
    if (vb.length !== 4 || !vb.every(isFinite)) return;
    const bb = svg.getBBox();
    if (!bb || !isFinite(bb.height) || bb.height <= 0) return;
    const pad = 12;                                   // room for stroke width and descenders
    const top = Math.max(vb[1], bb.y - pad);
    const bottom = Math.min(vb[1] + vb[3], bb.y + bb.height + pad);
    const h = bottom - top;
    if (h > 20 && h < vb[3] - 6) svg.setAttribute("viewBox", vb[0] + " " + top.toFixed(1) + " " + vb[2] + " " + h.toFixed(1));
  }

  function tidyDiagram(svg) {
    const texts = [...svg.querySelectorAll("text")];
    if (!texts.length) return;

    // raise point dots (small filled circles) above the lines, then labels on top
    svg.querySelectorAll("circle").forEach(c => {
      const r = parseFloat(c.getAttribute("r") || "0");
      const fill = (c.getAttribute("fill") || "").toLowerCase();
      if (r > 0 && r <= 7 && fill && fill !== "none") svg.appendChild(c);
    });
    texts.forEach(t => svg.appendChild(t));

    // (3) push apart labels that genuinely overlap (SVG y-down coordinates)
    const badges = [...svg.querySelectorAll("circle")].map(c => ({
      cx: +c.getAttribute("cx"), cy: +c.getAttribute("cy"), r: parseFloat(c.getAttribute("r") || "0"),
      fill: (c.getAttribute("fill") || "").toLowerCase()
      // A mass-point weight badge is a small disk filled in the card colour. The
      // old test — any filled circle of radius 9 or more — also caught the main
      // circles of a figure, so every label inside one was flung out to its rim,
      // stacking three labels on the same spot in Apollonius, inversion and
      // Descartes.
    })).filter(c => c.r >= 9 && c.r <= 15 && /bg-card/.test(c.fill));
    const L = texts.map(t => {
      const b = t.getBBox();
      const o = { t, w: b.width, h: b.height, x: b.x + b.width / 2, y: b.y + b.height / 2, dx: 0, dy: 0 };
      o.fixed = /^\d+$/.test((t.textContent || "").trim()) &&
        badges.some(c => Math.hypot(o.x - c.cx, o.y - c.cy) < c.r * 0.7);   // a weight centered in a badge — leave put
      return o;
    }).filter(o => o.w > 0);
    // Relax every overlapping pair at once, pushing both halves apart. Moving one
    // label at a time could not untangle a three-way pile-up: each fix recreated
    // an overlap with the label handled just before it.
    function separateLabels() {
      for (let it = 0; it < 30; it++) {
        let worst = 0;
        for (let i = 0; i < L.length; i++) {
          for (let j = i + 1; j < L.length; j++) {
            const a = L[i], b = L[j];
            if (a.fixed && b.fixed) continue;
            const ox = (a.w + b.w) / 2 + 2 - Math.abs((a.x + a.dx) - (b.x + b.dx));
            const oy = (a.h + b.h) / 2 - Math.abs((a.y + a.dy) - (b.y + b.dy));
            if (ox <= 0 || oy <= Math.min(a.h, b.h) * 0.35) continue;
            worst = Math.max(worst, oy);
            let vx = (a.x + a.dx) - (b.x + b.dx), vy = (a.y + a.dy) - (b.y + b.dy);
            if (!vx && !vy) { vx = (i % 2) ? 1 : -1; vy = 1; }
            const n = Math.hypot(vx, vy) || 1;
            const step = Math.min(oy, Math.min(a.h, b.h) * 0.55) * 0.6;
            const wa = b.fixed ? 1 : 0.5, wb = a.fixed ? 1 : 0.5;
            if (!a.fixed) { a.dx += vx / n * step * (wa * 2); a.dy += vy / n * step * (wa * 2); }
            if (!b.fixed) { b.dx -= vx / n * step * (wb * 2); b.dy -= vy / n * step * (wb * 2); }
          }
        }
        if (worst === 0) break;
      }
    }

    // (4) push labels off any line drawn through them. Label-vs-label was already
    // handled above, but a segment running under a label cut straight through the
    // glyphs, which is the more common and more damaging collision.
    // Every drawn outline, not just <line>. Only straight segments were considered before,
    // which left 40% of the collisions untouched: a label could sit squarely on a triangle
    // edge (<polygon>), a circle, or an arc and nothing would move it. Curved and polygonal
    // outlines are flattened into short segments so the same push-off maths applies.
    const segs = [];
    // `vertex` marks a real endpoint of a drawn segment. A label sitting near one is
    // usually labelling that very point, so the push-off below leaves it alone. Samples taken
    // along a flattened curve have no such meaning: every one of their endpoints is near the
    // label, which silently exempted whole circles from the pass.
    const addSeg = (p, q, vertex) => {
      if (isFinite(p[0]) && isFinite(p[1]) && isFinite(q[0]) && isFinite(q[1]) &&
          (p[0] !== q[0] || p[1] !== q[1])) segs.push({ p, q, vertex: !!vertex });
    };
    svg.querySelectorAll("line").forEach(l =>
      addSeg([+l.getAttribute("x1"), +l.getAttribute("y1")], [+l.getAttribute("x2"), +l.getAttribute("y2")], true));
    svg.querySelectorAll("polygon, polyline").forEach(el => {
      const pts = (el.getAttribute("points") || "").trim().split(/\s+/)
        .map(t => t.split(",").map(Number)).filter(p => p.length === 2 && p.every(isFinite));
      for (let k = 0; k + 1 < pts.length; k++) addSeg(pts[k], pts[k + 1], true);
      if (el.tagName.toLowerCase() === "polygon" && pts.length > 2) addSeg(pts[pts.length - 1], pts[0], true);
    });
    // Curves and circle outlines: sample the path into a polyline. Filled shapes are skipped,
    // since a label sitting on a shaded region is fine; it is the stroke that cuts glyphs.
    svg.querySelectorAll("path, circle, ellipse").forEach(el => {
      const fill = (el.getAttribute("fill") || "none").toLowerCase();
      const stroke = (el.getAttribute("stroke") || "").toLowerCase();
      if (el.tagName.toLowerCase() !== "path" && fill !== "none" && fill !== "") return;
      if (stroke === "none") return;
      let len = 0;
      try { len = el.getTotalLength ? el.getTotalLength() : 0; } catch (e) { return; }
      if (!len || !isFinite(len)) return;
      const n = Math.max(8, Math.min(160, Math.round(len / 6)));
      let prev = null;
      for (let k = 0; k <= n; k++) {
        let pt;
        try { pt = el.getPointAtLength(len * k / n); } catch (e) { return; }
        const cur = [pt.x, pt.y];
        if (prev) addSeg(prev, cur);
        prev = cur;
      }
    });
    function clearLines() {
      if (!segs.length) return;
      for (const o of L) {
        if (o.fixed) continue;
        for (let it = 0; it < 4; it++) {
          const cx = o.x + o.dx, cy = o.y + o.dy;
          const hw = o.w / 2 + 1.5, hh = o.h / 2 + 1.5;
          let best = null;
          for (const sg of segs) {
            if (sg.vertex) {
              const near = Math.min(Math.hypot(sg.p[0] - cx, sg.p[1] - cy),
                                    Math.hypot(sg.q[0] - cx, sg.q[1] - cy));
              if (near < Math.max(20, o.h * 1.6)) continue;   // it is labelling that endpoint
            }
            const vx = sg.q[0] - sg.p[0], vy = sg.q[1] - sg.p[1];
            const len2 = vx * vx + vy * vy; if (!len2) continue;
            let t = ((cx - sg.p[0]) * vx + (cy - sg.p[1]) * vy) / len2;
            t = Math.max(0, Math.min(1, t));
            const fx = sg.p[0] + vx * t, fy = sg.p[1] + vy * t;
            let nx = cx - fx, ny = cy - fy;
            const d = Math.hypot(nx, ny);
            const reach = (Math.abs(nx) * hw + Math.abs(ny) * hh) / (d || 1);
            const need = reach - d + 1.5;
            if (need <= 0) continue;
            if (!best || need > best.need) {
              if (d < 0.01) { nx = -vy; ny = vx; }
              const n = Math.hypot(nx, ny) || 1;
              best = { need, ux: nx / n, uy: ny / n };
            }
          }
          if (!best) break;
          o.dx += best.ux * best.need; o.dy += best.uy * best.need;
        }
      }
    }

    // The two passes can undo one another (clearing a line can shove a label onto
    // its neighbour), so alternate them. Label-on-label is the worse defect —
    // overlapping glyphs are unreadable, while a line grazing a label is only
    // untidy — so the separation pass runs last and gets the final say.
    // Clamp inside the loop, not after it: capping a label's travel at the very
    // end could drop it back on top of a neighbour the separation pass had just
    // resolved.
    function capMoves() {
      L.forEach(o => {
        const cap = o.h * 2.6, d = Math.hypot(o.dx, o.dy);
        if (d > cap) { o.dx *= cap / d; o.dy *= cap / d; }
      });
    }
    for (let round = 0; round < 4; round++) { clearLines(); capMoves(); separateLabels(); }
    capMoves(); separateLabels();

    const vb = (svg.getAttribute("viewBox") || "0 0 400 300").split(/\s+/).map(Number);
    const ctr = [(vb[2] || 400) / 2, (vb[3] || 300) / 2];
    L.forEach(o => {
      // keep letter labels off weight-badge disks (badges sit outside the figure,
      // so push the label inward, toward the figure's center, until it clears)
      if (!o.fixed) {
        for (const c of badges) {
          if (Math.hypot(o.x + o.dx - c.cx, o.y + o.dy - c.cy) < c.r + o.h * 0.35) {
            let ix = ctr[0] - c.cx, iy = ctr[1] - c.cy; const n = Math.hypot(ix, iy) || 1;
            o.dx = c.cx + ix / n * (c.r + o.h * 0.6) - o.x;
            o.dy = c.cy + iy / n * (c.r + o.h * 0.6) - o.y;
          }
        }
      }
      if (Math.abs(o.dx) > 0.5 || Math.abs(o.dy) > 0.5) {
        const x = parseFloat(o.t.getAttribute("x") || "0"), y = parseFloat(o.t.getAttribute("y") || "0");
        o.t.setAttribute("x", (x + o.dx).toFixed(1));
        o.t.setAttribute("y", (y + o.dy).toFixed(1));
      }
    });
  }

  const IMPORTANCE_LABELS = {
    high: ["HIGH", "High importance — core: you could solve most problems at this level with these"],
    medium: ["MED", "Medium importance — builds on the core to greatly simplify or speed up solutions"],
    low: ["LOW", "Low importance — rarely necessary, but does turn up sometimes"],
    lower: ["LOWER", "Lower importance — almost never used on contests; here for reference"],
    lowest: ["LOWEST", "Lowest importance — essentially never used; the lowest of the low, kept only for completeness"]
  };

  function badgeHtml(f) {
    const kind = f.type === "method" ? `<span class="badge badge-method">METHOD</span>`
              : f.type === "pattern" ? `<span class="badge badge-pattern">PATTERN</span>` : "";
    return kind + f.level.map(l => `<span class="badge badge-${l}">${LEVEL_LABELS[l]}</span>`).join("");
  }

  // Importance sits beside the title, separate from the level badges on the right.
  function impBadgeHtml(f) {
    const lab = IMPORTANCE_LABELS[f.importance];
    return lab ? `<span class="badge badge-imp-${f.importance}" title="${lab[1]}">${lab[0]}</span>` : "";
  }

  function tagRowHtml(f, queryTokens, topics) {
    const tchips = (topics || []).map(t =>
      `<span class="topic-chip" data-topic="${escapeAttr(t.id)}" title="Browse everything tagged &ldquo;${escapeAttr(t.label)}&rdquo;">${escapeAttr(t.label)}</span>`);
    const tags = f.keywords.slice(0, 6).map(k => {
      const hit = queryTokens && queryTokens.some(tok =>
        wordsOf(k).some(w => w === tok || (tok.length >= 3 && w.startsWith(tok))));
      return `<span class="tag${hit ? " tag-hit" : ""}" data-tag="${escapeAttr(k)}">${escapeAttr(k)}</span>`;
    });
    return `<div class="tag-row">${tchips.join("")}${tags.join("")}</div>`;
  }

  function cardHtml(entry, showCrumb, queryTokens) {
    const f = entry.formula;
    const crumb = showCrumb
      ? `<span class="card-crumb">${entry.section.title} &rsaquo; ${entry.subsection.title}</span>`
      : "";
    return `
      <article class="card" data-id="${f.id}" id="f-${f.id}">
        <div class="card-head">
          <h4 class="card-name">${f.name}</h4>
          ${impBadgeHtml(f)}
          ${crumb}
          <span class="badges">${badgeHtml(f)}</span>
          ${starBtnHtml(f.id)}
          ${addListBtnHtml(f.id)}
          <button class="copy-btn" data-latex="${escapeAttr(f.latex)}" title="Copy LaTeX">copy tex</button>
        </div>
        <div class="formula-display" data-latex="${escapeAttr(f.latex)}"></div>
        <p class="card-desc">${f.description}</p>
        ${extraHtml(f)}
        ${tagRowHtml(f, queryTokens, entry.topics)}
        <div class="more-hint">open full page &rsaquo;</div>
      </article>`;
  }

  // Cards preview only the diagram; examples and questions live on the detail
  // page. Only cards in CARD_DIAGRAM_IDS — configuration-heavy figures where the
  // picture is worth a glance — borrow their first detail diagram at a reduced
  // size; formula-obvious cards stay text-only on the card face.
  function extraHtml(f) {
    const glance = CARD_DIAGRAM_IDS.has(f.id) ? ((window.MATH_DIAGRAMS || {})[f.id] || [])[0] : null;
    const dia = f.diagram || glance;
    if (!dia) return "";
    return `
      <div class="card-extra">
        <div class="diagram${glance && !f.diagram ? " card-glance" : ""}">${dia}</div>
      </div>`;
  }

  function practiceHtml(f) {
    // Uniform format: numbered examples, each a question with a hidden solution.
    // MATH_EXAMPLES holds { q, s } pairs; legacy inline strings are a fallback.
    const items = [];
    const lead = (window.MATH_EXAMPLES || {})[f.id];
    if (lead && lead.q) items.push(lead);
    else if (f.example) items.push({ q: f.example, s: null });
    ((window.MATH_PROBLEMS || {})[f.id] || []).forEach(p => items.push(p));
    if (!items.length) return "";
    const blocks = items.map((p, i) => `
      <div class="problem">
        <p class="problem-q"><strong>Example ${i + 1}.</strong> ${p.q}</p>
        ${p.s ? `<button class="sol-toggle" data-target="sol-${f.id}-${i}">Show solution</button>
        <div class="problem-sol" id="sol-${f.id}-${i}" hidden>${p.s}</div>` : ""}
      </div>`);
    return `<div class="practice"><h4>Examples</h4>${blocks.join("")}</div>`;
  }

  // A contest reference like "2007 AIME II, Problem 15" maps deterministically
  // to its Art of Problem Solving wiki page, where the full solution lives.
  // "1997 AIME, Problem 1"      -> .../1997_AIME_Problems/Problem_1
  // "2021 Fall AMC 12B, Prob 23"-> .../2021_Fall_AMC_12B_Problems/Problem_23
  function aopsUrl(ref) {
    const m = ref.match(/^(.*),\s*Problem\s+(\d+)\s*$/);
    if (!m) return null;
    const slug = m[1].trim().replace(/\s+/g, "_") + "_Problems/Problem_" + m[2];
    return "https://artofproblemsolving.com/wiki/index.php/" + slug;
  }

  // ---------- Problem database (tags + link only) ----------
  function problemSlug(ref) {
    return ref.toLowerCase().replace(/,?\s*problem\s+/, "-").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  function refShort(ref) { return ref.replace(/,\s*Problem\s+/, " #"); }
  function yearOf(ref) { const m = ref.match(/^(\d{4})/); return m ? +m[1] : 0; }
  // Parse a ref into { year, cname (contest incl. A/B/I/II/season), fam (family), num }.
  function parseRef(ref) {
    const m = ref.match(/^(\d{4})\s+(.*?),\s*Problem\s+(\d+)$/);
    if (!m) return { year: 0, cname: ref, fam: ref, num: 0 };
    const year = +m[1], cname = m[2].trim(), num = +m[3];
    const core = cname.replace(/^(Fall|Spring)\s+/i, "");
    let fam, fm;
    if (/AIME/i.test(core)) fam = "AIME";
    else if ((fm = core.match(/AMC\s*(8|10|12)/i))) fam = "AMC " + fm[1];
    else if (/Putnam/i.test(core)) fam = "Putnam";
    else if (/HMMT/i.test(core)) fam = "HMMT";
    else fam = core.replace(/\s*[AB]$|\s*I{1,3}$/, "").trim() || core;
    return { year, cname, fam, num };
  }
  function famSlug(f) { return f.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
  // Types for a problem: manual `types` (topic ids) unioned with the topics carried
  // by its tagged formulas, so type filtering works even before any manual tagging.
  function problemTypes(entry) {
    const seen = {}, out = [];
    const push = t => { if (t && !seen[t.id]) { seen[t.id] = 1; out.push(t); } };
    (entry.types || []).forEach(id => push(TOPICS_BY_ID[id]));
    (entry.formulas || []).forEach(fid => { const e = BY_ID[fid]; if (e) e.topics.forEach(push); });
    return out;
  }
  const PROBLEM_DB = (window.MATH_PROBLEM_DB || []).map(e => {
    const formulas = (e.formulas || []).filter(fid => BY_ID[fid]);
    const pr = parseRef(e.ref);
    return {
      ref: e.ref, slug: problemSlug(e.ref), url: aopsUrl(e.ref),
      formulas, types: problemTypes(e), strategy: e.strategy || "",
      year: pr.year, cname: pr.cname, fam: pr.fam, num: pr.num
    };
  }).filter(p => p.formulas.length);
  const PROBLEM_BY_SLUG = {};
  const PROBLEMS_BY_FORMULA = {};
  PROBLEM_DB.forEach(p => {
    PROBLEM_BY_SLUG[p.slug] = p;
    p.formulas.forEach(fid => (PROBLEMS_BY_FORMULA[fid] = PROBLEMS_BY_FORMULA[fid] || []).push(p));
  });
  Object.keys(PROBLEMS_BY_FORMULA).forEach(fid => PROBLEMS_BY_FORMULA[fid].sort((a, b) => b.year - a.year || a.ref.localeCompare(b.ref)));

  // Competition → year → problems tree for the Database sidebar navigator.
  const DB_TREE = {};
  PROBLEM_DB.forEach(p => { (DB_TREE[p.fam] = DB_TREE[p.fam] || {}); (DB_TREE[p.fam][p.year] = DB_TREE[p.fam][p.year] || []).push(p); });
  const FAM_ORDER = ["AMC 8", "AMC 10", "AMC 12", "AIME", "Putnam", "HMMT"];
  const FAMILIES = Object.keys(DB_TREE).sort((a, b) => {
    const ia = FAM_ORDER.indexOf(a), ib = FAM_ORDER.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
  });
  const FAM_BY_SLUG = {}; FAMILIES.forEach(f => { FAM_BY_SLUG[famSlug(f)] = f; });
  const famCount = f => Object.keys(DB_TREE[f]).reduce((n, y) => n + DB_TREE[f][y].length, 0);
  const DEFAULT_FAM = FAMILIES.slice().sort((a, b) => famCount(b) - famCount(a))[0] || null;

  // Contest problems that use this formula — newest first, each opening a Database
  // detail view and linking out to its AoPS wiki page for the statement.
  // Cards for the common formulas can carry dozens of tagged problems, which
  // buries whatever follows them. Show the first few and keep the rest one
  // click away.
  const PROB_PREVIEW = 5;

  function contestHtml(f) {
    const probs = PROBLEMS_BY_FORMULA[f.id] || [];
    if (!probs.length) return "";
    const items = probs.map((p, i) =>
      `<li class="prob-row${i >= PROB_PREVIEW ? " prob-extra" : ""}">
         <a class="prob-open" href="#/problem/${p.slug}">${refShort(p.ref)}</a>
         ${p.url ? `<a class="ref-ext-link" href="${escapeAttr(p.url)}" target="_blank" rel="noopener noreferrer" title="Open on AoPS">AoPS <span aria-hidden="true">&#8599;</span></a>` : ""}
       </li>`).join("");
    const hidden = probs.length - PROB_PREVIEW;
    return `
      <div class="practice contest-refs">
        <h4>Practice problems <span class="practice-note">${probs.length}</span></h4>
        <ul class="prob-list">${items}</ul>
        ${hidden > 0 ? `<button type="button" class="show-more-btn prob-more" aria-expanded="false">Show ${hidden} more</button>` : ""}
      </div>`;
  }

  // ---------- Asymptote export ----------
  // The geometry figures are exact computed SVG; this reconstructs equivalent
  // Asymptote so a reader can drop the figure into AoPS/Overleaf and tweak it.
  // SVG is y-down, Asymptote is y-up, so every y flips through the viewBox
  // height. Stroke/fill colors are resolved (through CSS vars) and carried over;
  // fonts are sized proportionally (as in the SVG) and labels de-overlapped so
  // Asymptote's fixed-size text does not collide the way the SVG's scaled text
  // never does.
  function svgToAsy(svg) {
    const vb = (svg.getAttribute("viewBox") || "0 0 300 300").split(/\s+/).map(Number);
    const W = vb[2] || 300, H = vb[3] || 300;
    const u = Math.round((300 / W) * 1000) / 1000;   // pt per SVG unit (~300pt figure)
    const r1 = v => Math.round(v * 10) / 10;
    const c3 = v => Math.round(v * 1000) / 1000;
    const fx = x => r1(+x), fy = y => r1(H - +y);
    const P = (x, y) => `(${fx(x)},${fy(y)})`;
    const nums = s => (s.match(/-?\d*\.?\d+(?:e-?\d+)?/g) || []).map(Number);
    const rootStyle = getComputedStyle(document.documentElement);
    const out = [];

    // ----- color: resolve a stroke/fill (possibly a CSS var) to an asy pen -----
    function rawColor(el, prop) {
      let c = getComputedStyle(el)[prop];
      if (!c || /var\(/.test(c)) {
        let raw = el.getAttribute(prop) || c || "";
        const vm = raw.match(/var\((--[\w-]+)\)/);
        if (vm) raw = rootStyle.getPropertyValue(vm[1]).trim();
        c = raw;
      }
      return c;
    }
    function parseColor(c) {
      c = (c || "").trim();
      let m = c.match(/rgba?\(([^)]+)\)/);
      if (m) { const p = m[1].split(",").map(parseFloat); return { r: p[0], g: p[1], b: p[2], a: p.length >= 4 ? p[3] : 1 }; }
      m = c.match(/^#([0-9a-f]{3})$/i);
      if (m) { const h = m[1]; return { r: parseInt(h[0] + h[0], 16), g: parseInt(h[1] + h[1], 16), b: parseInt(h[2] + h[2], 16), a: 1 }; }
      m = c.match(/^#([0-9a-f]{6})$/i);
      if (m) { const h = m[1]; return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: 1 }; }
      return null;
    }
    // { expr:"rgb(..)"|"" (""=black default), a:alpha, none:true if invisible }
    function pen(el, prop) {
      const col = parseColor(rawColor(el, prop));
      if (!col || col.a === 0) return { expr: "", a: 0, none: true };
      const black = col.r === 0 && col.g === 0 && col.b === 0;
      return { expr: black ? "" : `rgb(${c3(col.r / 255)},${c3(col.g / 255)},${c3(col.b / 255)})`, a: col.a, none: false };
    }
    const dashed = el => el.getAttribute("stroke-dasharray") ? "dashed" : "";
    function strokeSuffix(el) {
      const s = pen(el, "stroke"), parts = [s.expr, dashed(el)].filter(Boolean);
      return parts.length ? ", " + parts.join("+") : "";
    }
    // a fillable shape: fill / draw / filldraw depending on which are visible
    function shape(pathStr, el, canFill) {
      const s = pen(el, "stroke"), f = pen(el, "fill");
      const strokeVisible = !s.none, fillVisible = canFill && !f.none;
      const strokePen = [s.expr, dashed(el)].filter(Boolean).join("+");
      const fillPen = fillVisible ? (f.expr || "black") + (f.a < 1 ? `+opacity(${c3(f.a)})` : "") : "";
      if (fillVisible && strokeVisible) return `filldraw(${pathStr}, ${fillPen}, ${strokePen || "black"});`;
      if (fillVisible) return `fill(${pathStr}, ${fillPen});`;
      if (strokeVisible) return strokePen ? `draw(${pathStr}, ${strokePen});` : `draw(${pathStr});`;
      return null;
    }

    // ----- label text -> LaTeX so Asymptote can typeset it -----
    // Unicode sub/superscripts become _{..}/^{..}; degree signs are dropped;
    // other math glyphs map to LaTeX macros; anything unmapped is dropped so it
    // can never break the compile.
    const SUB = { "₀":"0","₁":"1","₂":"2","₃":"3","₄":"4","₅":"5","₆":"6","₇":"7","₈":"8","₉":"9","₊":"+","₋":"-","ₐ":"a","ᵢ":"i","ⱼ":"j","ₖ":"k","ₘ":"m","ₙ":"n","ₚ":"p" };
    const SUP = { "⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","ⁿ":"n" };
    const SYM = {
      "−":"-", "·":" \\cdot ", "×":" \\times ", "√":"\\sqrt ", "′":"'", "″":"''",
      "½":"1/2", "⅓":"1/3", "⅔":"2/3", "¼":"1/4", "¾":"3/4", "⁄":"/",
      "θ":"\\theta ", "π":"\\pi ", "α":"\\alpha ", "β":"\\beta ", "γ":"\\gamma ",
      "φ":"\\varphi ", "ω":"\\omega ", "Δ":"\\Delta ", "Ω":"\\Omega ", "Σ":"\\Sigma ",
      "ℓ":"\\ell ", "∠":"\\angle ", "⊥":"\\perp ", "∥":"\\parallel ", "∩":"\\cap ",
      "∪":"\\cup ", "△":"\\triangle ", "⇒":"\\Rightarrow ", "⟺":"\\iff ", "→":"\\to ",
      "≥":"\\ge ", "≤":"\\le ", "≈":"\\approx ", "≠":"\\ne ", "—":"-", "–":"-"
    };
    function mathText(s) {
      let o = "", i = 0;
      while (i < s.length) {
        const ch = s[i];
        if (ch === "°" || ch === "​") { i++; continue; }               // drop degree / zero-width
        if (SUB[ch]) { let g = ""; while (i < s.length && SUB[s[i]]) g += SUB[s[i++]]; o += g.length > 1 ? `_{${g}}` : `_${g}`; continue; }
        if (SUP[ch]) { let g = ""; while (i < s.length && SUP[s[i]]) g += SUP[s[i++]]; o += g.length > 1 ? `^{${g}}` : `^${g}`; continue; }
        if (SYM[ch]) { o += SYM[ch]; i++; continue; }
        if (ch.charCodeAt(0) > 127) { i++; continue; }                      // drop anything else non-ASCII
        o += ch; i++;
      }
      return o.replace(/"/g, "").replace(/\s+/g, " ").trim();
    }

    // SVG arc (equal radii, no rotation) -> asy arc(center, r, a1, a2) minor arc.
    function arcCmd(S, E, r, la, sw) {
      const [x1, y1] = S, [x2, y2] = E;
      const hx = (x2 - x1) / 2, hy = (y2 - y1) / 2, d2 = hx * hx + hy * hy;
      let R = r; if (d2 > R * R) R = Math.sqrt(d2);
      const h = Math.sqrt(Math.max(0, R * R - d2));
      let ux = -hy, uy = hx; const ul = Math.hypot(ux, uy) || 1; ux /= ul; uy /= ul;
      const sign = (la !== sw) ? 1 : -1;
      const cx = (x1 + x2) / 2 + sign * h * ux, cy = (y1 + y2) / 2 + sign * h * uy;
      const cX = fx(cx), cY = fy(cy);
      let a1 = Math.atan2(fy(y1) - cY, fx(x1) - cX) * 180 / Math.PI;
      let a2 = Math.atan2(fy(y2) - cY, fx(x2) - cX) * 180 / Math.PI;
      while (a2 - a1 > 180) a2 -= 360;
      while (a1 - a2 > 180) a2 += 360;
      return `arc((${cX},${cY}), ${r1(R)}, ${r1(Math.min(a1, a2))}, ${r1(Math.max(a1, a2))})`;
    }

    function pathCmds(d, suffix) {
      const t = d.match(/[MLAZmlaz]|-?\d*\.?\d+/g) || [];
      let i = 0, cur = null, start = null, run = [];
      const flush = () => { if (run.length >= 2) out.push(`draw(${run.join("--")}${suffix});`); run = []; };
      while (i < t.length) {
        const c = t[i++];
        if (c === "M" || c === "m") { flush(); const x = +t[i++], y = +t[i++]; cur = [x, y]; start = [x, y]; run = [P(x, y)]; }
        else if (c === "L" || c === "l") { const x = +t[i++], y = +t[i++]; cur = [x, y]; run.push(P(x, y)); }
        else if (c === "A" || c === "a") {
          const rr = +t[i++]; i++; i++; const la = +t[i++], sw = +t[i++], x = +t[i++], y = +t[i++];
          flush(); out.push(`draw(${arcCmd(cur, [x, y], rr, la, sw)}${suffix});`); cur = [x, y]; run = [P(x, y)];
        } else if (c === "Z" || c === "z") { if (start) run.push(P(start[0], start[1])); flush(); cur = start; }
      }
      flush();
    }

    const labels = [];
    svg.querySelectorAll("line,polyline,polygon,rect,circle,ellipse,path,text").forEach(el => {
      const tag = el.tagName.toLowerCase();
      if (tag === "line") {
        out.push(`draw(${P(el.getAttribute("x1"), el.getAttribute("y1"))}--${P(el.getAttribute("x2"), el.getAttribute("y2"))}${strokeSuffix(el)});`);
      } else if (tag === "polyline" || tag === "polygon") {
        const n = nums(el.getAttribute("points")), pts = [];
        for (let i = 0; i + 1 < n.length; i += 2) pts.push(P(n[i], n[i + 1]));
        if (pts.length < 2) return;
        if (tag === "polyline") out.push(`draw(${pts.join("--")}${strokeSuffix(el)});`);
        else { const st = shape(`${pts.join("--")}--cycle`, el, true); if (st) out.push(st); }
      } else if (tag === "rect") {
        const x = +el.getAttribute("x"), y = +el.getAttribute("y"), w = +el.getAttribute("width"), h = +el.getAttribute("height");
        const st = shape(`${P(x, y)}--${P(x + w, y)}--${P(x + w, y + h)}--${P(x, y + h)}--cycle`, el, true);
        if (st) out.push(st);
      } else if (tag === "circle") {
        const cx = +el.getAttribute("cx"), cy = +el.getAttribute("cy"), r = +el.getAttribute("r");
        const f = pen(el, "fill");
        if (!f.none && r <= 6) out.push(`dot(${P(cx, cy)}${f.expr ? ", " + f.expr : ""});`);
        else { const st = shape(`shift(${P(cx, cy)})*scale(${r1(r)})*unitcircle`, el, true); if (st) out.push(st); }
      } else if (tag === "ellipse") {
        const cx = +el.getAttribute("cx"), cy = +el.getAttribute("cy"), rx = +el.getAttribute("rx"), ry = +el.getAttribute("ry");
        const st = shape(`shift(${P(cx, cy)})*scale(${r1(rx)},${r1(ry)})*unitcircle`, el, true);
        if (st) out.push(st);
      } else if (tag === "path") {
        pathCmds(el.getAttribute("d") || "", strokeSuffix(el));
      } else if (tag === "text") {
        const text = mathText((el.textContent || "").trim());
        if (!text) return;
        labels.push({
          x: +el.getAttribute("x"), y: H - +el.getAttribute("y"),
          fs: parseFloat(el.getAttribute("font-size")) || 13,
          pen: pen(el, "fill").expr, text
        });
      }
    });

    // Estimated label boxes, then nudge overlapping labels apart. The SVG never
    // overlaps because its text scales with the drawing; Asymptote's text does
    // not, so equal figures can collide — separate them in figure space.
    labels.forEach(L => {
      const vis = (L.text.replace(/\\[a-zA-Z]+/g, "x").replace(/[\\^_{}]/g, "")) || "x";
      L.w = vis.length * L.fs * 0.6; L.h = L.fs;
    });
    for (let i = 0; i < labels.length; i++) {
      const a = labels[i];
      for (let iter = 0; iter < 16; iter++) {
        let hit = false;
        for (let j = 0; j < labels.length; j++) {
          if (j === i) continue;
          const b = labels[j];
          const ox = (a.w + b.w) / 2 - Math.abs(a.x - b.x), oy = (a.h + b.h) / 2 - Math.abs(a.y - b.y);
          if (ox > 0.5 && oy > 0.5) {
            hit = true;
            let dx = a.x - b.x, dy = a.y - b.y;
            if (!dx && !dy) dy = 1;
            const Ln = Math.hypot(dx, dy) || 1, step = a.fs * 0.4;
            a.x += dx / Ln * step; a.y += dy / Ln * step;
          }
        }
        if (!hit) break;
      }
    }
    labels.forEach(L => {
      const size = `fontsize(${r1(L.fs * u)}pt)`;
      out.push(`label("$${L.text}$", (${r1(L.x)},${r1(L.y)}), ${L.pen ? `${L.pen}+${size}` : size});`);
    });

    return `// Asymptote for this figure - generated by Competition Math Reference.\n`
      + `// Coordinates are exact; paste into an Asymptote-enabled editor (e.g. AoPS).\n`
      + `unitsize(${u}pt);\ndefaultpen(fontsize(${r1(13 * u)}pt));\n\n` + out.join("\n") + "\n";
  }

  // ---------- Detail pages ----------

  function relatedEntries(entry, max) {
    const scored = [];
    for (const other of ALL) {
      if (other === entry) continue;
      let score = 0;
      for (const w of other.tagWords) if (entry.tagWords.has(w)) score += 2;
      if (other.subsection === entry.subsection) score += 3;
      else if (other.section === entry.section) score += 1;
      if (score >= 3) scored.push({ other, score });
    }
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, max).map(r => r.other);
  }

  // Pull a "## Key forms" block (older cards may still say "Key ideas" or
  // "Key formulas") out of a detail body so it can render as its own subsection
  // just under the description. Key forms is for METHOD cards only: it lists the
  // common shapes the method is applied in. Formula cards have their formulas
  // enumerated in the big box already, so they carry no such block. Each item may
  // carry a small explanation after " — ", shown on its own line beneath the
  // formula. Returns { formsHtml, rest }.
  function splitKeyForms(body) {
    if (!body) return { formsHtml: () => "", rest: "" };
    const blocks = body.split(/\n\s*\n/);
    let formLines = null;
    const rest = [];
    for (const block of blocks) {
      const lines = block.replace(/\s+$/, "").split("\n");
      while (lines.length && !lines[0].trim()) lines.shift();
      if (formLines === null && lines.length && /^##\s+key\s+(ideas?|form(s|ulas?))\s*$/i.test(lines[0].trim())) {
        formLines = lines.slice(1);
      } else {
        rest.push(block);
      }
    }
    if (formLines === null) return { formsHtml: () => "", rest: body };
    const items = formLines.map(l => l.trim()).filter(l => l.startsWith("- ")).map(l => l.slice(2).trim());
    if (!items.length) return { formsHtml: () => "", rest: body };
    const li = items.map(it => {
      const idx = it.indexOf(" — ");
      return idx !== -1
        ? `<li>${linkifyCards(it.slice(0, idx))}<span class="kf-note">${linkifyCards(it.slice(idx + 3))}</span></li>`
        : `<li>${linkifyCards(it)}</li>`;
    }).join("");
    return {
      formsHtml: heading => `<div class="key-forms"><h4>${heading}</h4><ul class="detail-list">${li}</ul></div>`,
      rest: rest.join("\n\n")
    };
  }

  // Details are plain text blocks separated by blank lines; a block may start
  // with a "## Heading" line — only that first line is the heading, the rest
  // of the block is an ordinary paragraph.
  // ---------- Card cross-links ----------
  // Wiki-style [[card-id]] or [[card-id|display text]] inside a write-up. Only the terms a
  // reader plausibly does not know should be linked; linking every word that happens to have
  // a card is the failure mode. Splitting on $...$ first means a bracket inside math is
  // never touched, and an unresolvable id renders visibly broken so it is caught in review
  // rather than silently dropping the text.
  function linkifyCards(text) {
    if (!text || text.indexOf("[[") === -1) return text;
    return String(text).split(/(\$[^$]*\$)/).map((part, i) => {
      if (i % 2) return part;
      return part.replace(/\[\[([\w-]+)(?:\|([^\]]*))?\]\]/g, (m, id, label) => {
        const e = BY_ID[id];
        if (!e) return `<span class="card-link-broken" title="no card with id &ldquo;${escapeAttr(id)}&rdquo;">${escapeAttr(label || id)}</span>`;
        return `<a class="card-link" href="#/f/${escapeAttr(id)}" data-card="${escapeAttr(id)}">${label || e.formula.name}</a>`;
      });
    }).join("");
  }

  // Trim to whole sentences. The old fixed-length cut sliced bulky opening paragraphs
  // mid-clause, and splitting naively on "." would also break inside $...$ and after an
  // abbreviation, so sentence ends are only taken outside math and when followed by a
  // capital. At least one sentence always survives, however long it is.
  function leadSentences(text, budget) {
    const src = String(text || "").trim();
    if (src.length <= budget) return src;
    const parts = src.split(/(\$[^$]*\$)/);
    let flat = "", marks = [];
    parts.forEach((p, i) => {
      if (i % 2) { flat += p; return; }
      for (let k = 0; k < p.length; k++) {
        flat += p[k];
        if (/[.!?]/.test(p[k]) && /^\s+[A-Z(]/.test(p.slice(k + 1, k + 3) + "X")) marks.push(flat.length);
      }
    });
    if (!marks.length) return src.slice(0, budget).replace(/\s+\S*$/, "");
    let cut = marks[0];
    for (const m of marks) { if (m <= budget) cut = m; else break; }
    const out = flat.slice(0, cut).trim();
    return out;
  }

  // Hover preview, the way a wiki shows a lead paragraph. Delayed so that sweeping the
  // pointer across a paragraph of links does not flash a stack of cards.
  let cpEl = null, cpTimer = 0, cpHide = 0, cpFor = null;
  function hideCardPreview() {
    clearTimeout(cpTimer); clearTimeout(cpHide);
    if (cpEl) { cpEl.remove(); cpEl = null; cpFor = null; }
  }
  // Leaving the link does not dismiss immediately: the pointer needs a moment to cross the
  // gap into the preview, and entering the preview cancels the pending hide outright.
  function scheduleHideCardPreview() {
    clearTimeout(cpTimer); clearTimeout(cpHide);
    cpHide = setTimeout(hideCardPreview, 260);
  }
  function showCardPreview(a) {
    const e = BY_ID[a.dataset.card];
    if (!e || cpFor === a) return;
    hideCardPreview();
    cpFor = a;
    const f = e.formula;
    const kind = f.type === "method" ? `<span class="badge badge-method">METHOD</span>`
               : f.type === "pattern" ? `<span class="badge badge-pattern">PATTERN</span>` : "";
    const desc = leadSentences(f.description, 200);
    const panels = (window.MATH_DIAGRAMS || {})[f.id];
    const thumb = panels && panels[0]
      ? `<div class="cp-thumb">${String(panels[0]).replace(/<div class="diagram-cap">[\s\S]*?<\/div>/, "")}</div>`
      : "";
    clearTimeout(cpHide);
    cpEl = document.createElement("div");
    cpEl.className = "card-preview";
    cpEl.addEventListener("mouseenter", () => clearTimeout(cpHide));
    cpEl.addEventListener("mouseleave", hideCardPreview);
    // The box is a second target for the same link, so reading the summary and deciding to
    // go there does not mean travelling back to the word.
    cpEl.addEventListener("click", () => {
      const id = a.dataset.card;
      hideCardPreview();
      location.hash = "#/f/" + id;
      window.scrollTo({ top: 0 });
    });
    if (thumb) cpEl.classList.add("cp-has-thumb");
    cpEl.innerHTML = thumb +
      `<div class="cp-head">${f.name}${kind}</div><div class="cp-desc">${desc}</div>` +
      `<div class="cp-crumb">${escapeAttr(e.section.title)} &rsaquo; ${escapeAttr(e.subsection.title)}</div>` +
      `<span class="cp-arrow"></span>`;
    document.body.appendChild(cpEl);
    // Typeset BEFORE measuring. Positioning above the word needs the final height, and KaTeX
    // (and the thumbnail's SVG) change it after the fact; measuring first is what left a gap
    // above the word, and only above, since the below branch pins the top edge instead.
    renderMath(cpEl);
    const place = () => {
      if (!cpEl) return;
      positionFloat(cpEl, a, thumb ? 420 : 330, true);
      const ar = a.getBoundingClientRect(), br = cpEl.getBoundingClientRect();
      const arrow = cpEl.querySelector(".cp-arrow");
      // Point the arrow at the word itself, which may sit anywhere along the box's width.
      arrow.style.left = Math.min(Math.max(ar.left + ar.width / 2 - br.left, 14), br.width - 14) + "px";
      cpEl.classList.toggle("cp-below", br.top > ar.top);
    };
    place();
    requestAnimationFrame(place);          // the thumbnail's SVG can resolve a frame later
  }

  function detailBodyHtml(body) {
    // Render the remaining lines of a block: an enumerated list when every line
    // starts with "- ", otherwise a paragraph. Enables explicit formula lists.
    const chunk = lines => {
      const items = lines.map(l => l.trim()).filter(Boolean);
      if (!items.length) return "";
      if (items.every(l => l.startsWith("- "))) {
        return `<ul class="detail-list">${items.map(l => `<li>${linkifyCards(l.slice(2).trim())}</li>`).join("")}</ul>`;
      }
      return `<p>${linkifyCards(items.join(" "))}</p>`;
    };
    // A "## Full proof" section is rendered collapsed behind a button. Some
    // results (the mean chain, Newton's inequalities) have a derivation worth
    // keeping in full, but printing it inline would bury the short explanation
    // most readers came for.
    let inProof = false;
    const out = body.split(/\n\s*\n/).map(block => {
      const lines = block.replace(/\s+$/, "").split("\n");
      while (lines.length && !lines[0].trim()) lines.shift();
      if (!lines.length) return "";
      let html = "";
      if (lines[0].trim().startsWith("## ")) {
        const title = lines.shift().trim().slice(3).trim();
        const isProof = /^full proof$/i.test(title);
        if (inProof && !isProof) { html += "</div></div>"; inProof = false; }
        if (isProof) {
          inProof = true;
          html += `<div class="full-proof"><button type="button" class="show-more-btn proof-toggle" aria-expanded="false">Show full proof</button><div class="proof-body">`;
        } else {
          html += `<h4>${title}</h4>`;
        }
      }
      return html + chunk(lines);
    }).join("");
    return out + (inProof ? "</div></div>" : "");
  }

  function renderDetail(entry) {
    const f = entry.formula;
    state.activeSectionId = entry.section.id;
    state.openGroup = null;
    const body = (window.MATH_DETAILS || {})[f.id];
    // Key forms is a method-card feature: it lists the shapes a technique is
    // applied in. A formula card already enumerates its formulas in the big box,
    // so any stray block on one is dropped rather than rendered.
    // Only method and pattern cards render a Key forms block. On any other card the
    // block must be left in the body instead of being split out, or its content would be
    // stripped and never shown (this was silently happening on eleven formula cards).
    const isKeyFormsCard = f.type === "method" || f.type === "pattern";
    const split = isKeyFormsCard ? splitKeyForms(body) : { formsHtml: () => "", rest: body };
    // Patterns will read "Recognize it" (what tips you off that you are looking at this
    // problem) once those blocks are rewritten; until then the existing content really is
    // key forms, so it keeps the honest heading.
    const formsHtml = split.formsHtml("Key forms");
    const rest = split.rest;
    const related = relatedEntries(entry, 6);
    const hasDiagram = !!(f.diagram || ((window.MATH_DIAGRAMS || {})[f.id] || []).length);
    const asyBtn = entry.section.id === "geometry" && hasDiagram
      ? `<button class="copy-btn copy-asy-btn" title="Copy Asymptote code for the figure">copy asy</button>`
      : "";
    $content.innerHTML = `
      <div class="detail">
        <a class="back-link" href="#">&larr; Back to ${entry.section.title}</a>
        <p class="detail-crumb">${entry.section.title} &rsaquo; ${entry.subsection.title}</p>
        <div class="detail-head">
          <h2 class="card-name">${f.name}</h2>
          ${impBadgeHtml(f)}
          <span class="badges">${badgeHtml(f)}</span>
          ${starBtnHtml(f.id)}
          ${addListBtnHtml(f.id)}
          <button class="copy-btn" data-latex="${escapeAttr(f.latex)}" title="Copy LaTeX">copy tex</button>
          ${asyBtn}
        </div>
        <div class="formula-display detail-formula" data-latex="${escapeAttr(f.latex)}"></div>
        <p class="card-desc detail-summary">${f.description}</p>
        ${formsHtml}
        ${f.diagram ? `<div class="diagram">${f.diagram}</div>` : ""}
        ${(() => {
          const panels = (window.MATH_DIAGRAMS || {})[f.id] || [];
          if (!panels.length) return "";
          const inner = panels.map(d => `<div class="diagram detail-diagram">${d}</div>`).join("");
          return `<div class="detail-diagrams dd-${Math.min(panels.length, 3)}">${inner}</div>`;
        })()}
        ${rest && rest.trim() ? `<div class="detail-body">${detailBodyHtml(rest)}</div>` : ""}
        ${(window.MATH_WIDGETS || {})[f.id] ? `<div class="interactive"><h4>Interactive</h4><div id="formula-widget"></div></div>` : ""}
        ${practiceHtml(f)}
        ${contestHtml(f)}
        ${related.length ? `
          <div class="related">
            <h4>Related</h4>
            <div class="related-grid">
              ${related.map(r => `<a class="related-item" href="#/f/${r.formula.id}">${r.formula.name}</a>`).join("")}
            </div>
          </div>` : ""}
        ${tagRowHtml(f, null, entry.topics)}
      </div>`;
    renderMath($content);
    var wdg = (window.MATH_WIDGETS || {})[f.id];
    if (wdg) { try { wdg.mount(document.getElementById("formula-widget")); } catch (e) { if (window.console) console.warn("widget error:", f.id, e); } }
    try { decorateNumberInputs(document.getElementById("formula-widget")); } catch (e) {}
    wireProblemToggle($content);
    wireProofToggles($content);
  }

  // Replace the browser's default (light) number-input spinner with themed ▲▼ arrows
  // that sit inside the field, so they match the dark UI instead of standing out.
  function decorateNumberInputs(root) {
    if (!root) return;
    var inputs = root.querySelectorAll('input[type="number"]:not([data-stepped])');
    for (var i = 0; i < inputs.length; i++) {
      (function (inp) {
        inp.setAttribute("data-stepped", "1");
        var wrap = document.createElement("span");
        wrap.className = "num-stepper";
        inp.parentNode.insertBefore(wrap, inp);
        wrap.appendChild(inp);
        var btns = document.createElement("span");
        btns.className = "num-btns";
        btns.innerHTML = '<button type="button" tabindex="-1" aria-label="increase">▲</button><button type="button" tabindex="-1" aria-label="decrease">▼</button>';
        wrap.appendChild(btns);
        function step(dir) {
          var st = parseFloat(inp.step) || 1, v = parseFloat(inp.value);
          if (isNaN(v)) v = 0;
          v = Math.round((v + dir * st) * 1e9) / 1e9;
          if (inp.min !== "" && v < parseFloat(inp.min)) v = parseFloat(inp.min);
          if (inp.max !== "" && v > parseFloat(inp.max)) v = parseFloat(inp.max);
          inp.value = v;
          inp.dispatchEvent(new Event("input", { bubbles: true }));
          inp.dispatchEvent(new Event("change", { bubbles: true }));
        }
        btns.children[0].addEventListener("click", function () { step(1); });
        btns.children[1].addEventListener("click", function () { step(-1); });
      })(inputs[i]);
    }
  }

  function wireProofToggles(root) {
    (root || document).querySelectorAll(".proof-toggle").forEach(btn => {
      btn.addEventListener("click", () => {
        const box = btn.closest(".full-proof");
        const open = box.classList.toggle("proof-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        btn.textContent = open ? "Hide full proof" : "Show full proof";
      });
    });
  }

  function wireProblemToggle(root) {
    const btn = (root || document).querySelector(".prob-more");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const box = btn.closest(".contest-refs");
      const open = box.classList.toggle("probs-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open
        ? "Show fewer"
        : `Show ${box.querySelectorAll(".prob-extra").length} more`;
    });
  }

  function escapeAttr(s) {
    return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }

  // Ids of the formulas in the current list-style view (used for the empty check).
  let shownIds = [];

  function renderSection(section) {
    const parts = [];
    parts.push(`
      <div class="section-header">
        <h2>${section.title}</h2>
        <p>${section.blurb}</p>
      </div>`);

    shownIds = [];
    const subParts = [];
    section.subsections.forEach((sub, i) => {
      const visible = sortEntries(sub.formulas.filter(passesLevel).map(f => BY_ID[f.id]));
      if (!visible.length) return;
      visible.forEach(e => shownIds.push(e.formula.id));
      subParts.push(`
        <div class="subsection" id="sub-${section.id}-${i}">
          <h3>${sub.title}</h3>
          <div class="cards">
            ${visible.map(e => cardHtml(e, false, null)).join("")}
          </div>
        </div>`);
    });

    if (!shownIds.length) {
      parts.push(`<div class="empty-state"><div class="big">&#8709;</div>No ${section.title} formulas match the selected level filters.</div>`);
    } else {
      parts.push(subParts.join(""));
    }
    $content.innerHTML = parts.join("");
    renderMath($content);
  }

  function renderSearchResults() {
    const { results, partial } = searchFormulas(state.query);
    const sorted = sortEntries(results);
    const queryTokens = wordsOf(state.query.toLowerCase());
    const levelNote = "";
    const partialNote = partial
      ? ` <em>(no formula matched every keyword &mdash; showing closest matches)</em>`
      : "";
    shownIds = sorted.map(e => e.formula.id);
    const parts = [];
    parts.push(`<p class="results-meta"><strong>${sorted.length}</strong> result${sorted.length === 1 ? "" : "s"} for &ldquo;<strong>${escapeAttr(state.query.trim())}</strong>&rdquo;${levelNote}${partialNote}</p>`);
    if (!sorted.length) {
      parts.push(`<div class="empty-state"><div class="big">&#8709;</div>No matches. Try broader keywords &mdash; e.g. &ldquo;area&rdquo;, &ldquo;mod&rdquo;, &ldquo;roots&rdquo;, &ldquo;probability&rdquo; &mdash; or click a tag on any card.</div>`);
    } else {
      parts.push(`<div class="cards">${sorted.map(e => cardHtml(e, true, queryTokens)).join("")}</div>`);
    }
    $content.innerHTML = parts.join("");
    renderMath($content);
  }

  // ---------- Advanced search: browse by tag ----------
  // A precise tag picker. Choose one or more tags and see every formula that carries
  // them, ranked by how many of the chosen tags each one matches. It complements the
  // main search bar (which handles free text) rather than duplicating it.

  // Does this card carry the tag label `L` (a raw keyword or a topic label)?
  function entryHasTag(entry, L) {
    return entry.tagPhrases.indexOf(L) !== -1 ||
      entry.topics.some(t => t.label === L) ||
      (entry.groupTags || []).indexOf(L) !== -1 ||
      entry.tagPhrases.some(p => p.indexOf(L) !== -1);
  }

  // Entries carrying at least one of the given tag labels, ranked by hit count
  // (cards matching more of the chosen tags come first), then importance, then name.
  function tagMatches(tags) {
    const scored = [];
    for (const entry of ALL) {
      let hits = 0;
      for (const L of tags) if (entryHasTag(entry, L)) hits++;
      if (hits) scored.push({ entry, hits });
    }
    scored.sort((a, b) => b.hits - a.hits ||
      IMP_RANK[a.entry.formula.importance] - IMP_RANK[b.entry.formula.importance] ||
      a.entry.formula.name.localeCompare(b.entry.formula.name));
    return scored;
  }

  function renderAdvancedResults() {
    const adv = state.adv || {};
    const tags = adv.tags ? [...adv.tags] : [];
    shownIds = [];
    const parts = [];
    parts.push(`<p class="results-meta adv-meta"><strong>Tagged</strong> ${tags.length ? escapeAttr(tags.join(", ")) : "&mdash;"} <span class="adv-actions"><button class="adv-link" id="adv-edit">Edit tags</button><button class="adv-link" id="adv-clear">Clear</button></span></p>`);
    if (!tags.length) {
      parts.push(`<div class="empty-state"><div class="big">&#9906;</div>Pick one or more tags to see every formula that carries them.</div>`);
    } else {
      const scored = tagMatches(tags);
      shownIds = scored.map(x => x.entry.formula.id);
      if (!scored.length) {
        parts.push(`<div class="empty-state"><div class="big">&#8709;</div>No formulas carry ${tags.length === 1 ? "that tag" : "those tags"}.</div>`);
      } else {
        parts.push(`<p class="results-hint"><strong>${scored.length}</strong> formula${scored.length === 1 ? "" : "s"}${tags.length > 1 ? " &mdash; the ones matching the most tags come first" : ""}.</p>`);
        parts.push(`<div class="cards">${scored.map(x => cardHtml(x.entry, true, null)).join("")}</div>`);
      }
    }
    $content.innerHTML = parts.join("");
    renderMath($content);
    const eb = document.getElementById("adv-edit"); if (eb) eb.addEventListener("click", openAdvanced);
    const cb = document.getElementById("adv-clear"); if (cb) cb.addEventListener("click", () => { state.adv = null; render(); window.scrollTo({ top: 0 }); });
  }

  // Tag universe for the advanced-search tag picker: every keyword and topic label
  // that appears on any card, weighted by the importance of the cards carrying it,
  // so the most consequential tags surface first.
  const TAG_W = { high: 5, medium: 4, low: 3, lower: 2, lowest: 1 };
  let ALL_TAGS_CACHE = null;
  function allTags() {
    if (ALL_TAGS_CACHE) return ALL_TAGS_CACHE;
    const m = new Map();
    const add = (label, w, kind) => {
      const key = String(label).toLowerCase().trim();
      if (!key) return;
      const e = m.get(key) || { label: key, weight: 0, kind: kind };
      e.weight += w;
      if (kind === "topic") e.kind = "topic";
      m.set(key, e);
    };
    for (const entry of ALL) {
      const w = TAG_W[entry.formula.importance] || 1;
      entry.formula.keywords.forEach(k => add(k, w, "tag"));
      entry.topics.forEach(t => add(t.label, w + 2, "topic"));
      // Curated groups sort above raw keywords, since building a list is what they are for.
      (entry.groupTags || []).forEach(g => add(g, w + 4, "group"));
    }
    ALL_TAGS_CACHE = [...m.values()];
    return ALL_TAGS_CACHE;
  }
  function suggestTags(q, selected, limit) {
    q = (q || "").toLowerCase().trim();
    const pool = allTags().filter(t => !selected.has(t.label));
    let cand;
    if (!q) {
      cand = pool.slice();
      cand.sort((a, b) => b.weight - a.weight || a.label.localeCompare(b.label));
    } else {
      cand = pool.filter(t => t.label.indexOf(q) !== -1);
      cand.sort((a, b) =>
        (a.label.startsWith(q) ? 0 : 1) - (b.label.startsWith(q) ? 0 : 1) ||
        b.weight - a.weight || a.label.localeCompare(b.label));
    }
    return cand.slice(0, limit || 12);
  }
  const advTagChipHtml = t => `<button class="adv-tag-chip${t.kind === "topic" ? " adv-tag-topic" : t.kind === "group" ? " adv-tag-group" : ""}" data-adv-tag="${escapeAttr(t.label)}">${escapeAttr(t.label)}</button>`;
  const advTagSelHtml = l => `<button class="filter-chip active adv-tag-sel" data-adv-tag-remove="${escapeAttr(l)}">${escapeAttr(l)} <span class="adv-tag-x">&times;</span></button>`;
  // How many cards carry at least one of the currently-drafted tags.
  function advTagCount() {
    const tags = [...advDraft.tags];
    if (!tags.length) return 0;
    let n = 0;
    for (const entry of ALL) { for (const L of tags) { if (entryHasTag(entry, L)) { n++; break; } } }
    return n;
  }
  // Re-render the picker: selected chips, the (scroll-isolated) tag grid, and the
  // apply button's live match count. No floating dropdown — the grid is the surface.
  function refreshAdvTags() {
    if (!advEl) return;
    const inp = advEl.querySelector("#adv-tag-search");
    const grid = advEl.querySelector("#adv-tag-grid");
    const sel = advEl.querySelector("#adv-tag-selected");
    const selWrap = advEl.querySelector("#adv-selected-wrap");
    const label = advEl.querySelector("#adv-grid-label");
    const q = inp ? inp.value.trim() : "";
    if (sel) sel.innerHTML = advDraft.tags.size ? [...advDraft.tags].map(advTagSelHtml).join("") : "";
    if (selWrap) selWrap.hidden = advDraft.tags.size === 0;
    if (label) label.textContent = q ? "Matching tags" : "Popular tags";
    if (grid) {
      const opts = suggestTags(q, advDraft.tags, 160);
      grid.innerHTML = opts.length ? opts.map(advTagChipHtml).join("") : `<div class="adv-tag-empty">No matching tags.</div>`;
    }
    const apply = advEl.querySelector("#adv-apply");
    if (apply) {
      const empty = advDraft.tags.size === 0;
      apply.disabled = empty;
      const n = advTagCount();
      apply.textContent = empty ? "Select tags" : `Show ${n} formula${n === 1 ? "" : "s"}`;
    }
  }

  // ---------- Advanced search modal ----------
  let advEl = null;
  let advDraft = null;
  function onAdvKey(e) { if (e.key === "Escape") closeAdvanced(); }
  function closeAdvanced() {
    if (!advEl) return;
    advEl.remove(); advEl = null;
    document.removeEventListener("keydown", onAdvKey, true);
  }
  function openAdvanced() {
    if (advEl) { closeAdvanced(); return; }
    const src = state.adv || {};
    advDraft = { tags: new Set(src.tags || []) };
    advEl = document.createElement("div");
    advEl.className = "modal-overlay";
    advEl.innerHTML = `
      <div class="modal adv-modal adv-tagmodal" role="dialog" aria-label="Browse formulas by tag">
        <div class="modal-head">
          <h3>Browse by tag</h3>
          <button class="modal-close" aria-label="Close">&times;</button>
        </div>
        <div class="adv-tagpick">
          <input class="adv-tag-search" id="adv-tag-search" type="search" placeholder="Search tags&hellip; (e.g. &ldquo;circle&rdquo;, &ldquo;modular&rdquo;, &ldquo;recursion&rdquo;)" aria-label="Search tags" autocomplete="off">
          <div class="adv-selected-wrap" id="adv-selected-wrap" hidden>
            <div class="adv-pick-label">Selected</div>
            <div class="adv-tag-selected" id="adv-tag-selected"></div>
          </div>
          <div class="adv-pick-label" id="adv-grid-label">Popular tags</div>
          <div class="adv-tag-grid" id="adv-tag-grid"></div>
        </div>
        <div class="settings-actions adv-modal-actions">
          <button class="settings-reset" id="adv-reset">Clear</button>
          <button class="adv-apply" id="adv-apply" disabled>Select tags</button>
        </div>
      </div>`;
    document.body.appendChild(advEl);
    advEl.addEventListener("click", onAdvClick);
    const tf = advEl.querySelector("#adv-tag-search");
    if (tf) {
      tf.addEventListener("input", refreshAdvTags);
      tf.addEventListener("keydown", e => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        const first = suggestTags(tf.value, advDraft.tags, 1)[0];
        if (first) { advDraft.tags.add(first.label); tf.value = ""; refreshAdvTags(); }
      });
    }
    refreshAdvTags();
    if (tf) setTimeout(() => tf.focus(), 0);
    setTimeout(() => document.addEventListener("keydown", onAdvKey, true), 0);
  }
  function onAdvClick(e) {
    if (e.target === advEl || e.target.closest(".modal-close")) { closeAdvanced(); return; }
    const tagOpt = e.target.closest("[data-adv-tag]");
    if (tagOpt) { advDraft.tags.add(tagOpt.dataset.advTag); refreshAdvTags(); return; }
    const tagRem = e.target.closest("[data-adv-tag-remove]");
    if (tagRem) { advDraft.tags.delete(tagRem.dataset.advTagRemove); refreshAdvTags(); return; }
    if (e.target.closest("#adv-reset")) {
      advDraft.tags.clear();
      const ts = advEl.querySelector("#adv-tag-search"); if (ts) ts.value = "";
      refreshAdvTags();
      return;
    }
    if (e.target.closest("#adv-apply")) {
      if (!advDraft.tags.size) return;
      state.adv = { tags: advDraft.tags };
      state.query = ""; $search.value = "";
      state.starredOnly = false;
      stripHash();
      closeAdvanced();
      render();
      window.scrollTo({ top: 0 });
    }
  }

  // The "★ Starred" filter chip narrows the currently selected section down
  // to just its starred formulas — it's a filter within the section, not a
  // separate cross-section page.
  function renderStarred(section) {
    const entries = [];
    section.subsections.forEach(sub => sub.formulas.forEach(f => {
      if (inList("starred", f.id) && passesLevel(f)) entries.push(BY_ID[f.id]);
    }));
    $content.innerHTML = `
      <div class="section-header">
        <h2>${section.title} &mdash; Starred</h2>
        <p class="section-blurb">${section.blurb}</p>
      </div>
      ${entries.length
        ? `<div class="cards">${entries.map(e => cardHtml(e, false, null)).join("")}</div>`
        : `<div class="empty-state"><div class="big">&#9734;</div>Nothing starred in this section yet. Click the &#9734; on any card, and it'll be waiting here.</div>`}`;
    renderMath($content);
  }

  // ---------- Topic view: every formula tagged with a topic, across sections ----------
  function renderTopic(topicId) {
    const topic = TOPICS_BY_ID[topicId];
    const entries = entriesForTopic(topicId).filter(e => passesLevel(e.formula));
    shownIds = entries.map(e => e.formula.id);
    const parts = [`
      <div class="section-header">
        <a class="back-link" href="#/lists">&larr; Study lists</a>
        <h2>${escapeAttr(topic.label)}</h2>
        <p>Every formula tagged <strong>${escapeAttr(topic.label)}</strong>. To turn a topic into a study list, use the filter builder under Study Lists.</p>
      </div>`];
    if (!entries.length) {
      parts.push(`<div class="empty-state"><div class="big">&#8709;</div>No formulas match this topic at the current level filter.</div>`);
    } else {
      parts.push(`<div class="cards">${entries.map(e => cardHtml(e, true, null)).join("")}</div>`);
    }
    $content.innerHTML = parts.join("");
    renderMath($content);
  }

  // ---------- Lists overview: built-in sets + your lists + a filter builder ----------
  function listPreview(l) {
    return l.ids.slice(0, 3).map(id => BY_ID[id] && BY_ID[id].formula.name).filter(Boolean).join(", ");
  }
  function subjectClass(s) { return (s || "").toLowerCase().replace(/[^a-z]+/g, "-"); }

  function listCardHtml(l) {
    const preview = listPreview(l);
    return `
      <a class="list-card" href="#/list/${l.id}">
        <div class="list-card-top">
          <span class="list-emoji">${listGlyph(l)}</span>
          <span class="list-name">${escapeAttr(l.name)}</span>
          ${l.builtin ? `<span class="list-builtin">built-in</span>` : ""}
        </div>
        <div class="list-card-count">${l.ids.length} formula${l.ids.length === 1 ? "" : "s"}</div>
        ${preview ? `<div class="list-card-preview">${escapeAttr(preview)}${l.ids.length > 3 ? "&hellip;" : ""}</div>` : `<div class="list-card-preview empty">Empty &mdash; add formulas with the &ldquo;+ list&rdquo; button.</div>`}
      </a>`;
  }
  function builtinCardHtml(l) {
    const preview = listPreview(l);
    return `
      <a class="list-card builtin-card" href="#/list/${l.id}">
        <div class="list-card-top">
          <span class="list-name">${escapeAttr(l.name)}</span>
          <span class="list-subject sub-${subjectClass(l.subject)}">${escapeAttr(l.subject)}</span>
        </div>
        <div class="list-card-count">${l.ids.length} formulas</div>
        ${preview ? `<div class="list-card-preview">${escapeAttr(preview)}${l.ids.length > 3 ? "&hellip;" : ""}</div>` : ""}
      </a>`;
  }
  function renderLists() {
    shownIds = [];
    const userCards = lists.items.map(listCardHtml).join("");
    const curatedCards = BUILTIN_LISTS.map(builtinCardHtml).join("");
    $content.innerHTML = `
      <div class="section-header">
        <h2>Study Lists</h2>
        <p>A few cross-cutting curated sets, plus your own saved collections. Star any formula, or hit &ldquo;Save these results&rdquo; on a search to build a list in one click.</p>
      </div>

      <section class="lists-section">
        <h3 class="lists-subhead">Curated sets</h3>
        <p class="lists-subnote">Cross-cutting collections you can&rsquo;t get by browsing one section &mdash; contest-tier essentials, ways of thinking, and surprising facts.</p>
        <div class="list-grid" id="builtin-grid">${curatedCards}</div>
      </section>

      <section class="lists-section">
        <h3 class="lists-subhead">Your lists</h3>
        <div class="lists-toolbar">
          <form class="lists-new" id="lists-new-form">
            <input type="text" id="lists-new-name" placeholder="Name a new list&hellip;" maxlength="40" autocomplete="off">
            <button type="submit">Create list</button>
          </form>
        </div>
        <div class="list-grid">${userCards}</div>
      </section>`;
    renderMath($content);
  }

  // Adding a card to a list used to be possible only from the card's own "+" button, which
  // meant building a list from its own page was impossible. This searches the same index the
  // top bar does and toggles membership through the same path the "+" menu uses.
  function renderListAddResults(box, listId, q) {
    const results = box.querySelector(".list-add-results");
    const query = (q || "").trim();
    if (!query) { results.hidden = true; results.innerHTML = ""; return; }
    const l = getList(listId);
    const inThisList = id => !!l && l.ids.indexOf(id) !== -1;
    // Anything already added drops out of the results rather than sitting there with a tick,
    // so the next candidate moves up and a run of additions needs no re-reading.
    const all = (searchFormulas(query).results || []).filter(e => !inThisList(e.formula.id));
    const hits = all.slice(0, 8);
    results.hidden = false;
    results.innerHTML = hits.length
      ? hits.map(e => `<button class="list-add-row" data-list-add-id="${escapeAttr(e.formula.id)}">
            <span class="lar-plus">+</span>
            <span class="lar-name">${e.formula.name}</span>
            <span class="lar-crumb">${escapeAttr(e.section.title)}</span>
          </button>`).join("")
      : `<div class="list-add-empty">${(searchFormulas(query).results || []).length
            ? "Everything matching that is already in this list."
            : "No formula matches that."}</div>`;
    renderMath(results);
  }

  function renderListDetail(listId) {
    const userL = getList(listId);
    const l = userL || BUILTIN_BY_ID[listId];
    if (!l) { location.hash = "#/lists"; return; }
    const isBuiltin = !userL;
    const entries = l.ids.map(id => BY_ID[id]).filter(Boolean);
    shownIds = entries.map(e => e.formula.id);
    const tools = isBuiltin ? "" : `
      <div class="list-detail-tools">
        ${l.builtin ? "" : `<button class="list-tool" data-list-rename="${l.id}">Rename</button>`}
        ${entries.length ? `<button class="list-tool danger" data-list-clear="${l.id}">Clear</button>` : ""}
        ${l.builtin ? "" : `<button class="list-tool danger" data-list-delete="${l.id}">Delete list</button>`}
      </div>
      <div class="list-add" data-list-add="${l.id}">
        <input type="search" class="list-add-input" placeholder="Search formulas to add&hellip;" autocomplete="off" aria-label="Search formulas to add to this list">
        <div class="list-add-results" hidden></div>
      </div>`;
    const glyph = isBuiltin ? `<span class="list-ico">&#9670;</span>` : `<span class="list-emoji">${listGlyph(l)}</span>`;
    $content.innerHTML = `
      <div class="detail">
        <a class="back-link" href="#/lists">&larr; All study lists</a>
        <div class="list-detail-head">
          <h2>${glyph} ${escapeAttr(l.name)}</h2>
          <span class="list-detail-count">${entries.length} formula${entries.length === 1 ? "" : "s"}</span>
          ${isBuiltin ? `<span class="list-subject sub-${subjectClass(l.subject)}">${escapeAttr(l.subject)}</span>` : ""}
        </div>
        ${isBuiltin ? `<p class="detail-crumb builtin-note">Built-in study set &mdash; hit &ldquo;+ list&rdquo; on any card to copy it into one of your own lists.</p>` : ""}
        ${tools}
        ${entries.length
          ? `<div class="cards">${entries.map(e => cardHtml(e, true, null)).join("")}</div>`
          : `<div class="empty-state"><div class="big">${glyph}</div>This list is empty. Open any formula and hit &ldquo;+ list&rdquo;, or use the builder in <a href="#/lists">Study Lists</a>.</div>`}
      </div>`;
    renderMath($content);
  }

  // ---------- Problem Database: competition/year navigator + per-problem detail ----------
  let dbQuery = "";
  let dbActiveFam = null, dbActiveYear = null;
  function problemRowHtml(p, compact) {
    const typeChips = p.types.slice(0, 4).map(t => `<span class="ptype-chip">${escapeAttr(t.label)}</span>`).join("");
    const label = compact ? ("Problem " + p.num) : refShort(p.ref);
    return `
      <a class="prob-card" href="#/problem/${p.slug}">
        <div class="prob-card-top">
          <span class="prob-ref">${label}</span>
          <span class="prob-formula-count">${p.formulas.length} formula${p.formulas.length === 1 ? "" : "s"}</span>
        </div>
        ${typeChips ? `<div class="ptype-row">${typeChips}</div>` : ""}
        ${p.strategy ? `<div class="prob-strategy">${p.strategy}</div>` : ""}
      </a>`;
  }
  function dbNavHtml(fam, year) {
    const active = !dbQuery.trim();
    return FAMILIES.map(f => {
      const years = Object.keys(DB_TREE[f]).map(Number).sort((a, b) => b - a);
      const open = active && f === fam;
      const yearItems = years.map(y =>
        `<a class="db-year${(open && y === year) ? " active" : ""}" href="#/problems/${famSlug(f)}/${y}">${y}<span class="db-count">${DB_TREE[f][y].length}</span></a>`).join("");
      return `<div class="db-fam${open ? " open" : ""}">
          <a class="db-fam-btn${(active && f === fam) ? " active" : ""}" href="#/problems/${famSlug(f)}/${years[0]}">${escapeAttr(f)}<span class="db-count">${famCount(f)}</span></a>
          <div class="db-years">${yearItems}</div>
        </div>`;
    }).join("");
  }
  function dbMainHtml(fam, year) {
    const q = dbQuery.trim().toLowerCase();
    if (q) {
      // Token search: every query word must match, in any order. Two token kinds:
      //   - a pure number ("5", "2024") must equal a WHOLE number in the contest ref
      //     (year or problem number), so "problem 5" hits #5 but not #15 or a stray
      //     "5" in a strategy;
      //   - any other word matches as a substring of the punctuation/space-stripped
      //     haystack (ref + strategy + topic labels + formula names/keywords), so
      //     "amc10a" matches "AMC 10A", and "ptolemy" / "power of a point" find
      //     problems by the formulas they use.
      const toks = q.split(/\s+/).filter(Boolean);
      const strip = s => s.replace(/[^a-z0-9]+/g, "");
      const matches = PROBLEM_DB.filter(p => {
        const ref = p.ref.toLowerCase();
        const collapsed = strip((ref + " " + (p.strategy || "") + " " +
          p.types.map(t => t.label).join(" ") + " " +
          p.formulas.map(fid => BY_ID[fid]
            ? BY_ID[fid].formula.name + " " + (BY_ID[fid].formula.keywords || []).join(" ")
            : "").join(" ")).toLowerCase());
        return toks.every(t => {
          if (/^\d+$/.test(t)) return new RegExp("(?:^|\\D)" + t + "(?:\\D|$)").test(ref);
          const ct = strip(t);
          return ct === "" || collapsed.indexOf(ct) !== -1;
        });
      }).sort((a, b) => b.year - a.year || a.cname.localeCompare(b.cname) || a.num - b.num);
      return `<h2 class="db-main-title">Search &ldquo;${escapeAttr(dbQuery.trim())}&rdquo;</h2>
        <p class="results-hint">${matches.length} problem${matches.length === 1 ? "" : "s"} across all competitions</p>
        <div class="prob-grid">${matches.length ? matches.map(p => problemRowHtml(p, false)).join("") : `<div class="empty-state"><div class="big">&#8709;</div>No problems match.</div>`}</div>`;
    }
    if (!fam || !DB_TREE[fam] || !DB_TREE[fam][year]) return `<div class="empty-state"><div class="big">&#9906;</div>Pick a competition and year from the left.</div>`;
    const groups = {};
    DB_TREE[fam][year].forEach(p => { (groups[p.cname] = groups[p.cname] || []).push(p); });
    const body = Object.keys(groups).sort().map(gn => {
      const ps = groups[gn].sort((a, b) => a.num - b.num);
      return `<div class="db-group"><h3 class="db-group-title">${escapeAttr(gn)}</h3><div class="prob-grid">${ps.map(p => problemRowHtml(p, true)).join("")}</div></div>`;
    }).join("");
    return `<h2 class="db-main-title">${escapeAttr(fam)} <span class="db-main-year">${year}</span></h2>${body}`;
  }
  function refreshDbMain() {
    const main = $content.querySelector(".db-main");
    if (main) { main.innerHTML = dbMainHtml(dbActiveFam, dbActiveYear); renderMath(main); }
    const nav = $content.querySelector(".db-fam-list");
    if (nav) nav.classList.toggle("searching", !!dbQuery.trim());
  }
  function renderProblems(route) {
    shownIds = [];
    let fam = route && route.fam && FAM_BY_SLUG[route.fam] ? FAM_BY_SLUG[route.fam] : null;
    if (!fam) fam = DEFAULT_FAM;
    let year = route && route.year && fam && DB_TREE[fam] && DB_TREE[fam][route.year] ? route.year : null;
    if (!year && fam && DB_TREE[fam]) year = Math.max.apply(null, Object.keys(DB_TREE[fam]).map(Number));
    dbActiveFam = fam; dbActiveYear = year;
    $content.innerHTML = `
      <div class="db-layout">
        <aside class="db-nav">
          <input id="db-q" class="db-search" type="search" placeholder="Search all problems&hellip;" value="${escapeAttr(dbQuery)}" autocomplete="off">
          <div class="db-fam-list${dbQuery.trim() ? " searching" : ""}">${dbNavHtml(fam, year)}</div>
        </aside>
        <div class="db-main">${dbMainHtml(fam, year)}</div>
      </div>`;
    renderMath($content);
    const q = document.getElementById("db-q");
    if (q) q.addEventListener("input", () => { dbQuery = q.value; refreshDbMain(); });
    const nav = $content.querySelector(".db-fam-list");
    if (nav) nav.addEventListener("click", e => { if (e.target.closest("a")) dbQuery = ""; });
  }
  function renderProblemDetail(slug) {
    const p = PROBLEM_BY_SLUG[slug];
    if (!p) { location.hash = "#/problems"; return; }
    shownIds = [];
    const types = p.types.map(t => `<a class="ptype-chip" href="#/topic/${t.id}">${escapeAttr(t.label)}</a>`).join("");
    const formulas = p.formulas.map(fid => {
      const e = BY_ID[fid]; if (!e) return "";
      return `<li><a class="strat-link" href="#/f/${fid}"><span class="strat-name">${e.formula.name}</span><span class="strat-crumb">${e.section.title} &rsaquo; ${e.subsection.title}</span></a></li>`;
    }).join("");
    $content.innerHTML = `
      <div class="detail">
        <a class="back-link" href="#/problems">&larr; All problems</a>
        <div class="detail-head">
          <h2 class="card-name">${refShort(p.ref)}</h2>
        </div>
        ${types ? `<div class="ptype-row">${types}</div>` : ""}
        ${p.strategy ? `<div class="prob-strategy-box"><h4>Strategy</h4><p>${p.strategy}</p></div>` : ""}
        <div class="prob-detail-section">
          <h4>Formulas</h4>
          <ul class="strat-list">${formulas || "<li class=\"strat-empty\">Not yet tagged.</li>"}</ul>
        </div>
        <p class="prob-note">The full statement and solution live on the Art of Problem Solving wiki.</p>
        ${p.url ? `<a class="aops-btn" href="${escapeAttr(p.url)}" target="_blank" rel="noopener noreferrer">Open on AoPS <span aria-hidden="true">&#8599;</span></a>` : ""}
      </div>`;
    renderMath($content);
  }

  function render() {
    const route = getRoute();
    const section = SECTIONS.find(s => s.id === state.activeSectionId) || SECTIONS[0];
    closeListMenu();
    if (route.type === "formula") {
      renderDetail(route.entry);
    } else if (route.type === "topic") {
      renderTopic(route.topicId);
    } else if (route.type === "lists") {
      renderLists();
    } else if (route.type === "list") {
      renderListDetail(route.listId);
    } else if (route.type === "problems") {
      renderProblems(route);
    } else if (route.type === "problem") {
      renderProblemDetail(route.slug);
    } else if (state.adv) {
      renderAdvancedResults();
    } else if (state.starredOnly) {
      if (section) renderStarred(section);
    } else if (state.query.trim()) {
      renderSearchResults();
    } else {
      if (section) renderSection(section);
    }
    // The level/importance filters are local to the four category pages, so hide
    // them (and thereby "reset" their apparent effect) during search, advanced
    // search, topic, list, and detail views — none of which they apply to.
    const filtersApply = route.type === "home" && !state.query.trim() && !state.adv;
    if ($filtersRow) $filtersRow.style.display = filtersApply ? "" : "none";
    const filtersBtn = document.getElementById("settings-btn");
    if (filtersBtn) filtersBtn.style.display = filtersApply ? "" : "none";
    // The section sidebar is meaningless on the Database and Lists surfaces —
    // drop it there and let the content run full width (desktop only; on mobile it
    // stays the hamburger drawer).
    const noSidebar = ["problems", "problem", "lists", "list"].indexOf(route.type) !== -1;
    const $layout = document.querySelector(".layout");
    if ($layout) $layout.classList.toggle("no-sidebar", noSidebar);
    updateNavActive();
    syncFilterChips();
    syncSortSelect();
    updateGearActive();
  }

  // ---------- Sidebar ----------

  function buildSidebar() {
    // The sidebar reads as two books, and only one is unfolded at a time: opening
    // Formulas folds Patterns away entirely, and the reverse. Sections nest inside
    // their group so the whole block collapses as one.
    const order = [];
    const byGroup = new Map();
    SECTIONS.forEach(section => {
      const g = groupOf(section);
      if (!byGroup.has(g)) { byGroup.set(g, []); order.push(g); }
      byGroup.get(g).push(section);
    });
    $sidebar.innerHTML = order.map(group => `
      <div class="nav-group" data-group="${group}">
        <button class="nav-group-btn" data-group="${group}" aria-expanded="false">
          <span class="nav-group-label">${GROUP_LABELS[group] || group}</span>
          <span class="nav-group-caret" aria-hidden="true"></span>
        </button>
        <div class="nav-group-body"><div class="nav-group-inner">
          ${byGroup.get(group).map(section => `
      <div class="nav-section" data-section="${section.id}">
        <button class="nav-section-btn" data-section="${section.id}">
          <span>${section.title}</span>
          <span class="nav-count">${sectionCount(section)}</span>
        </button>
        <div class="nav-subs"><div class="nav-subs-inner">
          ${section.subsections.map((sub, i) =>
            `<a class="nav-sub-link" data-section="${section.id}" data-sub="${i}">${sub.title}</a>`
          ).join("")}
        </div></div>
      </div>`).join("")}
        </div></div>
      </div>`).join("");

    $sidebar.addEventListener("click", e => {
      const groupBtn = e.target.closest(".nav-group-btn");
      if (groupBtn) {
        state.openGroup = groupBtn.dataset.group;
        updateNavActive();
        return;
      }
      const btn = e.target.closest(".nav-section-btn");
      const link = e.target.closest(".nav-sub-link");
      // In the mobile drawer, the first tap on a section opens it (revealing its
      // sub-subjects) and keeps the drawer up; tapping that same (already-open)
      // section again takes you to its main page and closes the drawer. A
      // sub-subject tap always jumps there and closes.
      if (link) closeDrawer();
      if (btn) {
        const secId = btn.dataset.section;
        const onSection = getRoute().type === "home" && !state.query.trim() && !state.starredOnly;
        const alreadyOpen = document.body.classList.contains("nav-open") && onSection && state.activeSectionId === secId;
        if (alreadyOpen) { closeDrawer(); window.scrollTo({ top: 0 }); return; }
        clearSearch();
        clearStarredFilter();
        stripHash();
        state.activeSectionId = secId;
        state.openGroup = null;
        render();
        window.scrollTo({ top: 0 });
      } else if (link) {
        clearSearch();
        clearStarredFilter();
        stripHash();
        state.activeSectionId = link.dataset.section;
        state.openGroup = null;
        // Cancel any smooth scroll still animating from a previous click before the
        // content is swapped. Otherwise that animation keeps running toward an offset
        // measured against the OLD section, and if the new one is shorter (Geometry is
        // 184 cards, Number Theory 89) it can strand you past the end of the new page
        // on a blank screen. Scrolling to the current position instantly is enough to
        // stop it without moving anything.
        window.scrollTo({ top: window.scrollY, behavior: "instant" });
        render();
        const target = document.getElementById(`sub-${link.dataset.section}-${link.dataset.sub}`);
        if (target) target.scrollIntoView({ block: "start" });
      }
    });
  }

  function updateNavActive() {
    const onHome = getRoute().type === "home";
    const open = openGroupId();
    $sidebar.querySelectorAll(".nav-group").forEach(el => {
      const mine = el.dataset.group === open;
      el.classList.toggle("open", mine);
      el.querySelector(".nav-group-btn").setAttribute("aria-expanded", mine ? "true" : "false");
    });
    $sidebar.querySelectorAll(".nav-section").forEach(el => {
      const isActive = onHome && !state.query.trim() && !state.starredOnly && !state.adv
                       && el.dataset.section === state.activeSectionId;
      el.classList.toggle("open", isActive);
      el.querySelector(".nav-section-btn").classList.toggle("active", isActive);
    });
  }

  function clearSearch() {
    state.query = "";
    $search.value = "";
    state.adv = null;
  }

  function clearStarredFilter() {
    if (!state.starredOnly) return;
    state.starredOnly = false;
    syncFilterChips();
  }

  // ---------- Level filter chips (multi-select) + Starred chip ----------

  function syncFilterChips() {
    if (!$levelFilters) return;
    const lv = activeFilter().levels;
    $levelFilters.querySelectorAll(".level-chip").forEach(c => {
      const l = c.dataset.level;
      const on = l === "All" ? (lv.size === 0 && !state.starredOnly)
        : l === "Starred" ? state.starredOnly
        : lv.has(l);
      c.classList.toggle("active", on);
    });
  }

  function buildLevelFilters() {
    if (!$levelFilters) return;
    const chips = [`<button class="level-chip active" data-level="All">All Levels</button>`]
      .concat(LEVELS.map(l => `<button class="level-chip" data-level="${l}">${LEVEL_LABELS[l]}</button>`))
      .concat([`<button class="level-chip star-chip" data-level="Starred">&#9733; Starred</button>`]);
    $levelFilters.innerHTML = chips.join("");

    $levelFilters.addEventListener("click", e => {
      const chip = e.target.closest(".level-chip");
      if (!chip) return;
      const level = chip.dataset.level;
      const lv = activeFilter().levels;
      if (level === "All") {
        lv.clear();
        state.starredOnly = false;
      } else if (level === "Starred") {
        state.starredOnly = !state.starredOnly;
      } else {
        if (lv.has(level)) lv.delete(level);
        else lv.add(level);
      }
      saveSettings();
      syncFilterChips();
      if (state.starredOnly || level === "Starred") stripHash();
      render();
      window.scrollTo({ top: 0 });
    });
  }

  // ---------- Events ----------

  let searchTimer = null;
  $search.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.query = $search.value;
      if (state.query.trim()) { state.adv = null; stripHash(); }
      render();
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 120);
  });

  // Enter in the search box just commits the query and leaves the field (blurs);
  // it stays on the results list rather than jumping into the top hit.
  $search.addEventListener("keydown", e => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    clearTimeout(searchTimer);
    state.query = $search.value;
    if (state.query.trim()) { state.adv = null; stripHash(); }
    render();
    window.scrollTo({ top: 0, behavior: "instant" });
    $search.blur();
  });

  // Brand → back to the start (top of the first section).
  const $brand = document.getElementById("brand-home");
  if ($brand) $brand.addEventListener("click", () => {
    clearSearch();
    clearStarredFilter();
    stripHash();
    state.activeSectionId = SECTIONS[0].id;
    state.openGroup = null;
    render();
    window.scrollTo({ top: 0 });
  });

  // Mobile section drawer: the hamburger slides the sidebar in over a backdrop.
  const $navToggle = document.getElementById("nav-toggle");
  const $navBackdrop = document.getElementById("nav-backdrop");
  function openDrawer() {
    document.body.classList.add("nav-open");
    if ($navBackdrop) $navBackdrop.hidden = false;
  }
  function closeDrawer() {
    if (!document.body.classList.contains("nav-open")) return;
    document.body.classList.remove("nav-open");
    if ($navBackdrop) $navBackdrop.hidden = true;
  }
  if ($navToggle) $navToggle.addEventListener("click", () => {
    if (document.body.classList.contains("nav-open")) closeDrawer(); else openDrawer();
  });
  if ($navBackdrop) $navBackdrop.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeDrawer(); });

  // Lists → the study-lists overview.
  const $listsBtn = document.getElementById("lists-btn");
  if ($listsBtn) $listsBtn.addEventListener("click", () => {
    clearSearch();
    clearStarredFilter();
    if (getRoute().type === "lists") return;
    if (location.hash === "#/lists") render(); else location.hash = "#/lists";
    window.scrollTo({ top: 0 });
  });

  // Database → the problem-database browse page.
  const $dbBtn = document.getElementById("db-btn");
  if ($dbBtn) $dbBtn.addEventListener("click", () => {
    clearSearch();
    clearStarredFilter();
    if (getRoute().type === "problems") return;
    if (location.hash === "#/problems") render(); else location.hash = "#/problems";
    window.scrollTo({ top: 0 });
  });

  // Light / dark theme toggle (persisted; default dark). The early inline script
  // in index.html applies the saved choice before paint to avoid a flash.
  const $theme = document.getElementById("theme-btn");
  function syncThemeBtn() {
    if (!$theme) return;
    const light = document.documentElement.getAttribute("data-theme") === "light";
    $theme.textContent = light ? "☀" : "☾";   // ☀ in light mode, ☾ in dark
    $theme.title = light ? "Switch to dark theme" : "Switch to light theme";
  }
  if ($theme) {
    syncThemeBtn();
    $theme.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
      syncThemeBtn();
    });
  }

  // ---------- Settings / filters popup ----------
  // Importance counts within the currently-active section (filters are per-section).
  function impCounts() {
    const c = { high: 0, medium: 0, low: 0, lower: 0, lowest: 0 };
    ALL.forEach(e => { if (e.section.id === state.activeSectionId) c[e.formula.importance] = (c[e.formula.importance] || 0) + 1; });
    return c;
  }
  function updateGearActive() {
    const g = document.getElementById("settings-btn");
    if (!g) return;
    const af = activeFilter();
    g.classList.toggle("has-filters", af.rarities.size < IMP_TIERS.length || af.levels.size > 0 || state.starredOnly);
  }
  // Keep the quick "Show" dropdown in step with the active section's rarity set:
  // all tiers -> Curated; exactly one -> that tier; anything else -> Custom.
  function syncSortSelect() {
    if (!$sortSelect) return;
    const rr = activeFilter().rarities;
    $sortSelect.value = rr.size === IMP_TIERS.length ? "default"
      : rr.size === 1 ? [...rr][0] : "custom";
  }
  let settingsEl = null;
  function onSettingsKey(e) { if (e.key === "Escape") closeSettings(); }
  function closeSettings() {
    if (!settingsEl) return;
    settingsEl.remove(); settingsEl = null;
    document.removeEventListener("keydown", onSettingsKey, true);
    updateGearActive();
  }
  function refreshSettingsControls() {
    if (!settingsEl) return;
    const af = activeFilter();
    settingsEl.querySelectorAll("[data-rarity]").forEach(b => b.classList.toggle("active", af.rarities.has(b.dataset.rarity)));
    settingsEl.querySelectorAll("#s-levels [data-level]").forEach(b => b.classList.toggle("active", af.levels.has(b.dataset.level)));
    const sb = settingsEl.querySelector("#s-starred");
    if (sb) sb.classList.toggle("active", state.starredOnly);
  }
  function afterFilterChange() {
    saveSettings(); syncSortSelect(); syncFilterChips(); render(); refreshSettingsControls();
  }
  function openSettings() {
    if (settingsEl) { closeSettings(); return; }
    const counts = impCounts();
    const af = activeFilter();
    const sec = SECTIONS.find(s => s.id === state.activeSectionId) || SECTIONS[0];
    const RLAB = { high: "High", medium: "Medium", low: "Low", lower: "Lower", lowest: "Lowest" };
    const rarityChips = IMP_TIERS.map(t =>
      `<button class="filter-chip${af.rarities.has(t) ? " active" : ""}" data-rarity="${t}">${RLAB[t]} <span class="fc-count">${counts[t]}</span></button>`).join("");
    const levelChips = LEVELS.map(l =>
      `<button class="filter-chip${af.levels.has(l) ? " active" : ""}" data-level="${l}">${LEVEL_LABELS[l]}</button>`).join("");
    settingsEl = document.createElement("div");
    settingsEl.className = "modal-overlay";
    settingsEl.innerHTML = `
      <div class="modal settings-modal" role="dialog" aria-label="Filters and settings">
        <div class="modal-head">
          <h3>Filters &amp; settings</h3>
          <button class="modal-close" aria-label="Close">&times;</button>
        </div>
        <div class="settings-body">
          <div class="settings-group">
            <div class="settings-group-title">View</div>
            <div class="filter-chips"><button class="filter-chip${state.starredOnly ? " active" : ""}" id="s-starred">&#9733; Starred only</button></div>
          </div>
          <div class="settings-group">
            <div class="settings-group-title">Importance &mdash; ${escapeAttr(sec.title)}</div>
            <div class="filter-chips" id="s-rarity">${rarityChips}</div>
          </div>
          <div class="settings-group">
            <div class="settings-group-title">Contest level &mdash; ${escapeAttr(sec.title)}</div>
            <div class="filter-chips" id="s-levels">${levelChips}</div>
            <p class="settings-hint">Filters apply to <strong>${escapeAttr(sec.title)}</strong> only &mdash; each section keeps its own. Select no level to show all.</p>
          </div>
          <div class="settings-actions"><button class="settings-reset" id="s-reset">Reset ${escapeAttr(sec.title)} filters</button></div>
        </div>
      </div>`;
    document.body.appendChild(settingsEl);
    settingsEl.addEventListener("click", onSettingsClick);
    setTimeout(() => document.addEventListener("keydown", onSettingsKey, true), 0);
  }
  function onSettingsClick(e) {
    if (e.target === settingsEl || e.target.closest(".modal-close")) { closeSettings(); return; }
    const af = activeFilter();
    if (e.target.closest("#s-starred")) {
      state.starredOnly = !state.starredOnly;
      stripHash();
      afterFilterChange(); return;
    }
    const rc = e.target.closest("[data-rarity]");
    if (rc) {
      const t = rc.dataset.rarity;
      if (af.rarities.has(t)) { if (af.rarities.size > 1) af.rarities.delete(t); }
      else af.rarities.add(t);
      afterFilterChange(); return;
    }
    const lc = e.target.closest("#s-levels [data-level]");
    if (lc) {
      const l = lc.dataset.level;
      if (af.levels.has(l)) af.levels.delete(l); else { af.levels.add(l); state.starredOnly = false; }
      afterFilterChange(); return;
    }
    if (e.target.closest("#s-reset")) {
      af.rarities = new Set(IMP_TIERS); af.levels.clear();
      state.starredOnly = false;
      afterFilterChange(); return;
    }
  }
  const $settings = document.getElementById("settings-btn");
  if ($settings) $settings.addEventListener("click", openSettings);
  const $adv = document.getElementById("adv-btn");
  if ($adv) $adv.addEventListener("click", openAdvanced);

  // Quick "Show" dropdown drives the active section's rarity set; "Custom…" opens the popup.
  if ($sortSelect) $sortSelect.addEventListener("change", () => {
    const v = $sortSelect.value;
    if (v === "custom") { syncSortSelect(); openSettings(); return; }
    activeFilter().rarities = v === "default" ? new Set(IMP_TIERS) : new Set([v]);
    afterFilterChange();
  });
  syncSortSelect();
  updateGearActive();

  document.addEventListener("keydown", e => {
    if (e.key === "/" && document.activeElement !== $search) {
      e.preventDefault();
      $search.focus();
      $search.select();
    } else if (e.key === "Escape" && document.activeElement === $search) {
      clearSearch();
      render();
      $search.blur();
    }
  });

  // Hover previews for [[card links]]. mouseenter does not bubble, so delegate on
  // mouseover/mouseout and gate on which element the pointer actually crossed into.
  $content.addEventListener("mouseover", e => {
    const a = e.target.closest(".card-link");
    if (!a) return;
    clearTimeout(cpTimer); clearTimeout(cpHide);
    if (cpFor === a) return;
    cpTimer = setTimeout(() => showCardPreview(a), 400);
  });
  $content.addEventListener("mouseout", e => {
    const a = e.target.closest(".card-link");
    if (!a) return;
    if (e.relatedTarget && (a.contains(e.relatedTarget) || (cpEl && cpEl.contains(e.relatedTarget)))) return;
    scheduleHideCardPreview();
  });
  window.addEventListener("scroll", hideCardPreview, { passive: true });
  // Clicking the link navigates natively, so without these the box outlives the page it
  // belonged to and reappears at its old page coordinates in the corner of the new one.
  $content.addEventListener("click", e => { if (e.target.closest(".card-link")) hideCardPreview(); });
  window.addEventListener("hashchange", hideCardPreview);

  $content.addEventListener("click", e => {
    const asyBtn = e.target.closest(".copy-asy-btn");
    if (asyBtn) {
      const svg = $content.querySelector(".detail .diagram svg");
      if (svg) {
        navigator.clipboard.writeText(svgToAsy(svg)).then(() => {
          asyBtn.textContent = "copied!";
          asyBtn.classList.add("copied");
          setTimeout(() => {
            asyBtn.textContent = "copy asy";
            asyBtn.classList.remove("copied");
          }, 1200);
        });
      }
      return;
    }
    const btn = e.target.closest(".copy-btn");
    if (btn) {
      navigator.clipboard.writeText(toCopyLatex(btn.dataset.latex)).then(() => {
        btn.textContent = "copied!";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = "copy tex";
          btn.classList.remove("copied");
        }, 1200);
      });
      return;
    }
    const starBtn = e.target.closest(".star-btn");
    if (starBtn) {
      const id = starBtn.dataset.star;
      toggleMembership("starred", id);
      const route = getRoute();
      if (state.starredOnly || route.type === "list" || route.type === "lists") {
        render();
      } else {
        syncStarButtons(id);
        refreshAddListButtons(id);
      }
      return;
    }
    const sol = e.target.closest(".sol-toggle");
    if (sol) {
      const panel = document.getElementById(sol.dataset.target);
      panel.hidden = !panel.hidden;
      sol.textContent = panel.hidden ? "Show solution" : "Hide solution";
      return;
    }
    const tag = e.target.closest(".tag");
    if (tag) {
      $search.value = tag.dataset.tag;
      state.query = tag.dataset.tag;
      stripHash();
      render();
      window.scrollTo({ top: 0 });
      return;
    }
    const addlistBtn = e.target.closest(".addlist-btn");
    if (addlistBtn) { openListMenu(addlistBtn, addlistBtn.dataset.addlist); return; }
    const addRow = e.target.closest("[data-list-add-id]");
    if (addRow) {
      const box = addRow.closest("[data-list-add]");
      const listId = box.dataset.listAdd, fid = addRow.dataset.listAddId;
      toggleMembership(listId, fid);
      const q = box.querySelector(".list-add-input").value;
      // Re-render the list so the count and the card grid pick the change up, then put the
      // search box back the way it was so several cards can be added in one go.
      renderListDetail(listId);
      const box2 = $content.querySelector("[data-list-add]");
      if (box2) {
        const input = box2.querySelector(".list-add-input");
        input.value = q;
        renderListAddResults(box2, listId, q);
        input.focus();
      }
      return;
    }
    const topicChip = e.target.closest(".topic-chip");
    if (topicChip) { location.hash = "#/topic/" + topicChip.dataset.topic; window.scrollTo({ top: 0 }); return; }
    const rn = e.target.closest("[data-list-rename]");
    if (rn) {
      const l = getList(rn.dataset.listRename);
      if (l) { const name = prompt("Rename list:", l.name); if (name && name.trim()) { renameList(l.id, name); render(); } }
      return;
    }
    const del = e.target.closest("[data-list-delete]");
    if (del) {
      const l = getList(del.dataset.listDelete);
      if (l && confirm(`Delete the list “${l.name}”? The formulas themselves are not affected.`)) { deleteList(l.id); location.hash = "#/lists"; }
      return;
    }
    const clr = e.target.closest("[data-list-clear]");
    if (clr) {
      const l = getList(clr.dataset.listClear);
      if (l && confirm(`Remove all ${l.ids.length} formulas from “${l.name}”?`)) { l.ids = []; saveLists(); render(); }
      return;
    }
    if (e.target.closest("a")) return; // let real links (related items, back link) navigate
    const card = e.target.closest(".card[data-id]");
    if (card) {
      openFormula(card.dataset.id);
    }
  });

  let listAddTimer = 0;
  $content.addEventListener("input", e => {
    const box = e.target.closest("[data-list-add]");
    if (!box) return;
    clearTimeout(listAddTimer);
    const q = e.target.value;
    listAddTimer = setTimeout(() => renderListAddResults(box, box.dataset.listAdd, q), 140);
  });

  $content.addEventListener("submit", e => {
    const nf = e.target.closest("#lists-new-form");
    if (nf) {
      e.preventDefault();
      const inp = document.getElementById("lists-new-name");
      const name = inp ? inp.value.trim() : "";
      if (!name) { if (inp) inp.focus(); return; }
      location.hash = "#/list/" + createList(name);
    }
  });

  window.addEventListener("hashchange", () => {
    const route = getRoute();
    render();
    // Detail pages start at the top; returning to the list restores the
    // reader's previous scroll position.
    window.scrollTo({ top: route.type === "formula" ? 0 : listScrollY });
  });

  // ---------- Init ----------

  // We manage scroll position ourselves (see hashchange), so stop the browser
  // from also restoring scroll on back/forward and fighting us.
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  buildSidebar();
  buildLevelFilters();
  render();

  // ---------- Debug / evaluation hook ----------
  // The search internals are otherwise sealed inside this IIFE, which meant every
  // relevance measurement so far was taken by hand-patching a temporary export in
  // and out of this file. tools/search-eval.html needs a stable, synchronous entry
  // point (the UI path is debounced, and a background tab throttles its timers),
  // so expose one — gated on ?debug=1 so nothing is added to the normal page.
  if (/[?&]debug=1\b/.test(location.search)) {
    window.__mathSearch = {
      searchFormulas,
      entries: ALL,
      byId: BY_ID,
      scoreEntry,
      bigramsOf,
      spokenLatex,
      idfOf,
      // Grid-search support: override K1 / COVERAGE weighting / field boosts and
      // recompute the cached per-field length divisors, without reloading.
      fields: FIELDS,
      semantic: function () { return window.MathSemantic; },
      tune(cfg) {
        if (cfg.k1 != null) K1 = cfg.k1;
        if (cfg.corrob != null) CORROB = cfg.corrob;
        if (cfg.scale != null) SCALE = cfg.scale;
        if (cfg.rrfK != null) RRF_K = cfg.rrfK;
        if (cfg.rrfKSem != null) RRF_K_SEM = cfg.rrfKSem;
        if (cfg.rrfLex != null) RRF_LEX = cfg.rrfLex;
        if (cfg.rrfSem != null) RRF_SEM = cfg.rrfSem;
        if (cfg.rrfMargin != null) RRF_MARGIN = cfg.rrfMargin;
        if (cfg.rrfMinTokens != null) RRF_MIN_TOKENS = cfg.rrfMinTokens;
        if (cfg.rrfSimLo != null) RRF_SIM_LO = cfg.rrfSimLo;
        if (cfg.rrfSimHi != null) RRF_SIM_HI = cfg.rrfSimHi;
        if (cfg.bigramW != null) BIGRAM_W = cfg.bigramW;
        if (cfg.w) FIELDS.forEach(f => { if (cfg.w[f.key] != null) f.w = cfg.w[f.key]; });
        if (cfg.b) FIELDS.forEach(f => { if (cfg.b[f.key] != null) f.b = cfg.b[f.key]; });
        ALL.forEach(e => {
          e.fieldNorm = FIELDS.map(f => {
            const size = e[f.key] ? e[f.key].size : 0;
            return 1 - f.b + f.b * (size / f.avg);
          });
        });
        return { k1: K1, fields: FIELDS.map(f => ({ key: f.key, w: f.w, b: f.b })) };
      },
      // Rank of a card id for a query, 1-based; 0 when it does not appear.
      rankOf(query, id) {
        const r = searchFormulas(query).results || [];
        for (let i = 0; i < r.length; i++) {
          const e = r[i].entry || r[i];
          if ((e.formula ? e.formula.id : e.id) === id) return i + 1;
        }
        return 0;
      },
      topIds(query, n) {
        return (searchFormulas(query).results || []).slice(0, n || 10)
          .map(r => { const e = r.entry || r; return e.formula ? e.formula.id : e.id; });
      }
    };
  }
})();
