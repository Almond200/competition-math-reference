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
    adv: null                    // advanced search: { sections:Set, subs:Set, topics:Set, desc:string } or null
  };
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
    if (w.length > 3 && w.endsWith("es")) w = w.slice(0, -2);
    else if (w.length > 3 && w.endsWith("s")) w = w.slice(0, -1);
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

  const ALL = [];
  const BY_ID = {};
  SECTIONS.forEach(section => {
    section.subsections.forEach(sub => {
      sub.formulas.forEach(f => {
        const entry = { formula: f, section, subsection: sub };
        if (EXTRA_TAGS[f.id]) f.keywords = f.keywords.concat(EXTRA_TAGS[f.id].filter(k => f.keywords.indexOf(k) === -1));
        entry.nameWords = new Set(indexWordsOf(f.name));
        entry.tagWords = new Set(f.keywords.flatMap(indexWordsOf));
        entry.tagPhrases = f.keywords.map(k => k.toLowerCase());
        entry.ctxWords = new Set(indexWordsOf(sub.title + " " + section.title));
        entry.descWords = new Set(indexWordsOf(f.description));
        entry.latexWords = new Set(latexTokens(f.latex));
        entry.mathFrags = mathFragments(f.latex);
        entry.nameLower = f.name.toLowerCase();
        const hay = (f.name + " " + f.keywords.join(" ") + " " + sub.title).toLowerCase();
        entry.topics = TOPIC_RULES.filter(t =>
          (!t.sec || t.sec.indexOf(section.id) !== -1) && t.re && t.re.test(hay));
        if (f.type === "method") entry.topics = entry.topics.concat(METHODS_TOPIC);
        ALL.push(entry);
        BY_ID[f.id] = entry;
      });
    });
  });
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
  function positionMenu(el, anchor) {
    const r = anchor.getBoundingClientRect();
    const w = 244, vw = document.documentElement.clientWidth;
    let left = r.left + window.scrollX;
    if (left + w > window.scrollX + vw - 8) left = window.scrollX + vw - w - 8;
    el.style.width = w + "px";
    el.style.top = (r.bottom + window.scrollY + 6) + "px";
    el.style.left = Math.max(8 + window.scrollX, left) + "px";
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
    "symmedian-lemoine", "incenter-excenter-lemma", "orthocenter-properties", "fermat-point",
    "simson-line", "butterfly-theorem", "radical-axis", "miquels-theorem", "ptolemys-theorem",
    "cyclic-quad-diagonals", "varignons-theorem", "van-aubel", "napoleons-theorem",
    "trapezoid-special-segments", "intercept-theorem", "british-flag-theorem", "mass-points",
    "reflection-shortest-path", "rotation-trick", "spiral-similarity", "de-guas-theorem",
    "skew-lines-distance", "circular-segment", "feuerbach-theorem", "nine-point-circle",
    "common-tangent-lengths", "angle-chord-secant", "centroid-division", "cevian-area-ratio",
    "midsegment-theorem", "euler-line-ratio", "euler-distance-theorem", "tangent-facts",
    "law-of-sines", "circumradius-area", "angle-chasing",
    "pedal-triangle", "orthic-triangle", "medial-triangle", "contact-triangle", "isogonal-conjugate",
    "pole-polar", "directed-angles", "complete-quadrilateral-miquel", "morleys-theorem", "pascals-theorem",
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

  // Each query token must match the entry somewhere (AND semantics).
  // Returns a positive score if the token hits, 0 if it misses.
  function tokenScore(entry, tok) {
    let score = 0;
    if (entry.nameWords.has(tok)) score += 22;
    if (entry.tagWords.has(tok)) score += 16;
    if (entry.ctxWords.has(tok)) score += 8;
    if (entry.latexWords.has(tok)) score += 7;
    if (entry.descWords.has(tok)) score += 5;
    if (score === 0 && tok.length >= 3) {
      // Prefix matching: "circum" hits "circumradius", "tan" hits "tangent".
      for (const w of entry.nameWords) if (w.startsWith(tok)) { score += 11; break; }
      for (const w of entry.tagWords) if (w.startsWith(tok)) { score += 9; break; }
      if (score === 0) {
        for (const w of entry.ctxWords) if (w.startsWith(tok)) { score += 5; break; }
        for (const w of entry.descWords) if (w.startsWith(tok)) { score += 3; break; }
      }
    }
    if (score === 0 && tok.length >= 3) {
      // Substring (contains) matching: "sphere" hits "insphere", "gon" hits
      // "polygon", "cyclic" hits "cyclotomic" — looser than prefix, weighted lower.
      for (const w of entry.nameWords) if (w.indexOf(tok) !== -1) { score += 8; break; }
      if (score === 0) for (const w of entry.tagWords) if (w.indexOf(tok) !== -1) { score += 6; break; }
      if (score === 0) for (const w of entry.ctxWords) if (w.indexOf(tok) !== -1) { score += 3; break; }
      if (score === 0) for (const w of entry.descWords) if (w.indexOf(tok) !== -1) { score += 2; break; }
    }
    if (score === 0 && tok.length >= 4) {
      // Typo tolerance: allow small edits ("stewert"→Stewart, "recurrance"→recurrence).
      for (const w of entry.nameWords) if (fuzzy(w, tok)) { score += 9; break; }
      if (score === 0) for (const w of entry.tagWords) if (fuzzy(w, tok)) { score += 7; break; }
      if (score === 0) for (const w of entry.ctxWords) if (fuzzy(w, tok)) { score += 4; break; }
      if (score === 0) for (const w of entry.descWords) if (fuzzy(w, tok)) { score += 2; break; }
    }
    return score;
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

  function scoreEntry(entry, queryLower, tokens, mathForms) {
    let total = 0;
    let hits = 0;
    let allInNameOrTags = tokens.length > 0;

    for (const tok of tokens) {
      const variants = expandToken(tok);
      const best = Math.max(...variants.map(t => tokenScore(entry, t)));
      if (best > 0) hits++;
      total += best;
      if (!variants.some(t => entry.nameWords.has(t) || entry.tagWords.has(t))) allInNameOrTags = false;
    }

    // Longer descriptive queries tolerate one dead word — otherwise a single
    // word the entry never uses ("people", "thing") exiles the best match.
    let matchedAll = hits === tokens.length || (tokens.length >= 4 && hits >= tokens.length - 1);

    // Precision bonus: every word hit the name or tags directly — this is
    // what the entry is *about*, not a stray mention in its description.
    if (allInNameOrTags && tokens.length >= 2) total += 25;

    // Whole-query bonuses: exact name or exact tag phrase.
    if (entry.nameLower === queryLower) total += 80;
    else if (entry.nameLower.includes(queryLower) && queryLower.length >= 4) total += 30;
    if (entry.tagPhrases.includes(queryLower)) total += 40;

    // Typed-formula match against the entry's own math.
    const mScore = mathMatchScore(entry, mathForms);
    total += mScore;
    if (mScore >= 30) matchedAll = true;

    return { total, matchedAll };
  }

  const IMP_RANK = { high: 0, medium: 1, low: 2, lower: 3, lowest: 4 };

  function searchFormulas(rawQuery) {
    let raw = rawQuery.trim();
    if (ABBREV[raw.toLowerCase()]) raw = ABBREV[raw.toLowerCase()];   // whole query is an abbreviation
    const queryLower = raw.toLowerCase();
    let tokens = wordsOf(queryLower).filter(t => !STOPWORDS.has(t));
    if (!tokens.length) tokens = wordsOf(queryLower);
    // expand any abbreviation that appears as its own token (mixed queries)
    tokens = tokens.flatMap(t => ABBREV[t] ? wordsOf(ABBREV[t]).filter(w => !STOPWORDS.has(w)) : [t]);
    const mathForms = queryMathForms(rawQuery);
    if (!tokens.length && !mathForms) return { results: [], partial: false };

    const strict = [];
    const loose = [];
    // A text search is global: it ignores the per-section level/importance
    // filters, which are local to each of the four category pages, not to search.
    for (const entry of ALL) {
      const { total, matchedAll } = scoreEntry(entry, queryLower, tokens, mathForms);
      if (total <= 0) continue;
      (matchedAll ? strict : loose).push({ entry, score: total });
    }

    // Prefer entries matching every keyword; fall back to partial matches.
    // Ties break toward higher-importance formulas, then names.
    const cmp = (a, b) => b.score - a.score ||
      IMP_RANK[a.entry.formula.importance] - IMP_RANK[b.entry.formula.importance] ||
      a.entry.formula.name.localeCompare(b.entry.formula.name);
    const pool = strict.length ? strict : loose;
    pool.sort(cmp);
    // Trim the weak tail: keep the clearly-relevant matches (always at least the
    // top handful), then drop entries scoring far below the leader so a growing
    // library doesn't bury the answer under near-misses.
    const topScore = pool.length ? pool[0].score : 0;
    const kept = pool.filter((r, i) => i < 6 || r.score >= topScore * 0.3);
    return {
      results: kept.slice(0, 60).map(r => r.entry),
      partial: !strict.length && loose.length > 0
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
      container.querySelectorAll(".card-desc, .card-name, .card-example, .detail-body, .key-forms, .related-item, .problem-q, .problem-sol, .strat-name, .prob-strategy, .prob-strategy-box").forEach(el => {
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
      try { tidyDiagram(svg); } catch (e) { /* getBBox can throw if the svg isn't laid out */ }
    });
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
    })).filter(c => c.r >= 9 && c.fill && c.fill !== "none");
    const L = texts.map(t => {
      const b = t.getBBox();
      const o = { t, w: b.width, h: b.height, x: b.x + b.width / 2, y: b.y + b.height / 2, dx: 0, dy: 0 };
      o.fixed = /^\d+$/.test((t.textContent || "").trim()) &&
        badges.some(c => Math.hypot(o.x - c.cx, o.y - c.cy) < c.r * 0.7);   // a weight centered in a badge — leave put
      return o;
    }).filter(o => o.w > 0);
    for (let i = 0; i < L.length; i++) {
      if (L[i].fixed) continue;
      for (let it = 0; it < 12; it++) {
        let moved = false;
        for (let j = 0; j < L.length; j++) {
          if (i === j) continue;
          const a = L[i], b = L[j];
          const ox = (a.w + b.w) / 2 - Math.abs((a.x + a.dx) - (b.x + b.dx));
          const oy = (a.h + b.h) / 2 - Math.abs((a.y + a.dy) - (b.y + b.dy));
          if (ox > 2 && oy > Math.min(a.h, b.h) * 0.4) {      // real overlap only
            moved = true;
            let vx = (a.x + a.dx) - (b.x + b.dx), vy = (a.y + a.dy) - (b.y + b.dy);
            if (!vx && !vy) vy = 1;
            const n = Math.hypot(vx, vy) || 1, step = Math.min(oy, a.h * 0.5);
            a.dx += vx / n * step; a.dy += vy / n * step;
          }
        }
        if (!moved) break;
      }
    }
    const vb = (svg.getAttribute("viewBox") || "0 0 400 300").split(/\s+/).map(Number);
    const ctr = [(vb[2] || 400) / 2, (vb[3] || 300) / 2];
    L.forEach(o => {
      const cap = o.h * 1.7, d = Math.hypot(o.dx, o.dy);
      if (d > cap) { o.dx *= cap / d; o.dy *= cap / d; }
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
    const method = f.type === "method" ? `<span class="badge badge-method">METHOD</span>` : "";
    return method + f.level.map(l => `<span class="badge badge-${l}">${LEVEL_LABELS[l]}</span>`).join("");
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
  function contestHtml(f) {
    const probs = PROBLEMS_BY_FORMULA[f.id] || [];
    if (!probs.length) return "";
    const items = probs.map(p =>
      `<li class="prob-row">
         <a class="prob-open" href="#/problem/${p.slug}">${refShort(p.ref)}</a>
         ${p.url ? `<a class="ref-ext-link" href="${escapeAttr(p.url)}" target="_blank" rel="noopener noreferrer" title="Open on AoPS">AoPS <span aria-hidden="true">&#8599;</span></a>` : ""}
       </li>`).join("");
    return `
      <div class="practice contest-refs">
        <h4>Practice problems <span class="practice-note">${probs.length}</span></h4>
        <ul class="prob-list">${items}</ul>
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

  // Pull a "## Key forms" (or legacy "## Key formulas") block out of a detail
  // body so it can render as a dedicated blue-box list directly under the big
  // formula box. Each item may carry a small explanation after " — ", shown on
  // its own line beneath the formula. Returns { formsHtml, rest }.
  function splitKeyForms(body) {
    if (!body) return { formsHtml: "", rest: "" };
    const blocks = body.split(/\n\s*\n/);
    let formLines = null;
    const rest = [];
    for (const block of blocks) {
      const lines = block.replace(/\s+$/, "").split("\n");
      while (lines.length && !lines[0].trim()) lines.shift();
      if (formLines === null && lines.length && /^##\s+key\s+form(s|ulas?)\s*$/i.test(lines[0].trim())) {
        formLines = lines.slice(1);
      } else {
        rest.push(block);
      }
    }
    if (formLines === null) return { formsHtml: "", rest: body };
    const items = formLines.map(l => l.trim()).filter(l => l.startsWith("- ")).map(l => l.slice(2).trim());
    if (!items.length) return { formsHtml: "", rest: body };
    const li = items.map(it => {
      const idx = it.indexOf(" — ");
      return idx !== -1
        ? `<li>${it.slice(0, idx)}<span class="kf-note">${it.slice(idx + 3)}</span></li>`
        : `<li>${it}</li>`;
    }).join("");
    return {
      formsHtml: `<div class="key-forms"><div class="kf-label">Key forms</div><ul class="detail-list">${li}</ul></div>`,
      rest: rest.join("\n\n")
    };
  }

  // Details are plain text blocks separated by blank lines; a block may start
  // with a "## Heading" line — only that first line is the heading, the rest
  // of the block is an ordinary paragraph.
  function detailBodyHtml(body) {
    // Render the remaining lines of a block: an enumerated list when every line
    // starts with "- ", otherwise a paragraph. Enables explicit formula lists.
    const chunk = lines => {
      const items = lines.map(l => l.trim()).filter(Boolean);
      if (!items.length) return "";
      if (items.every(l => l.startsWith("- "))) {
        return `<ul class="detail-list">${items.map(l => `<li>${l.slice(2).trim()}</li>`).join("")}</ul>`;
      }
      return `<p>${items.join(" ")}</p>`;
    };
    return body.split(/\n\s*\n/).map(block => {
      const lines = block.replace(/\s+$/, "").split("\n");
      while (lines.length && !lines[0].trim()) lines.shift();
      if (!lines.length) return "";
      let html = "";
      if (lines[0].trim().startsWith("## ")) {
        html += `<h4>${lines.shift().trim().slice(3).trim()}</h4>`;
      }
      return html + chunk(lines);
    }).join("");
  }

  function renderDetail(entry) {
    const f = entry.formula;
    state.activeSectionId = entry.section.id;
    const body = (window.MATH_DETAILS || {})[f.id];
    const { formsHtml, rest } = splitKeyForms(body);
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
        ${formsHtml}
        <p class="card-desc detail-summary">${f.description}</p>
        ${f.diagram ? `<div class="diagram">${f.diagram}</div>` : ""}
        ${((window.MATH_DIAGRAMS || {})[f.id] || []).map(d => `<div class="diagram detail-diagram">${d}</div>`).join("")}
        ${rest && rest.trim() ? `<div class="detail-body">${detailBodyHtml(rest)}</div>` : ""}
        ${practiceHtml(f)}
        ${(window.MATH_WIDGETS || {})[f.id] ? `<div class="interactive"><h4>Interactive</h4><div id="formula-widget"></div></div>` : ""}
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
  const advTagChipHtml = t => `<button class="adv-tag-chip${t.kind === "topic" ? " adv-tag-topic" : ""}" data-adv-tag="${escapeAttr(t.label)}">${escapeAttr(t.label)}</button>`;
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
    $sidebar.innerHTML = SECTIONS.map(section => `
      <div class="nav-section" data-section="${section.id}">
        <button class="nav-section-btn" data-section="${section.id}">
          <span>${section.title}</span>
          <span class="nav-count">${sectionCount(section)}</span>
        </button>
        <div class="nav-subs">
          ${section.subsections.map((sub, i) =>
            `<a class="nav-sub-link" data-section="${section.id}" data-sub="${i}">${sub.title}</a>`
          ).join("")}
        </div>
      </div>`).join("");

    $sidebar.addEventListener("click", e => {
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
        render();
        window.scrollTo({ top: 0 });
      } else if (link) {
        clearSearch();
        clearStarredFilter();
        stripHash();
        state.activeSectionId = link.dataset.section;
        render();
        const target = document.getElementById(`sub-${link.dataset.section}-${link.dataset.sub}`);
        if (target) target.scrollIntoView({ block: "start" });
      }
    });
  }

  function updateNavActive() {
    const onHome = getRoute().type === "home";
    $sidebar.querySelectorAll(".nav-section").forEach(el => {
      const isActive = onHome && !state.query.trim() && !state.starredOnly && el.dataset.section === state.activeSectionId;
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
    $search.blur();
  });

  // Brand → back to the start (top of the first section).
  const $brand = document.getElementById("brand-home");
  if ($brand) $brand.addEventListener("click", () => {
    clearSearch();
    clearStarredFilter();
    stripHash();
    state.activeSectionId = SECTIONS[0].id;
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
})();
