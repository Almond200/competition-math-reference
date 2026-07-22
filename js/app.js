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
    touch: ["tangent", "tangency"]
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

  const state = {
    query: "",
    levels: new Set(),           // empty set = all levels
    starredOnly: false,          // ★ chip: show only starred within the active section
    sort: "default",             // "Show" dropdown: default (all) | high | medium | low importance
    activeSectionId: SECTIONS.length ? SECTIONS[0].id : null
  };

  const $sidebar = document.getElementById("sidebar");
  const $content = document.getElementById("content");
  const $search = document.getElementById("search-input");
  const $levelFilters = document.getElementById("level-filters");
  const $sortSelect = document.getElementById("sort-select");

  // ---------- Search index ----------

  function normWord(w) {
    w = w.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (w.length > 3 && w.endsWith("es")) w = w.slice(0, -2);
    else if (w.length > 3 && w.endsWith("s")) w = w.slice(0, -1);
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

  const ALL = [];
  const BY_ID = {};
  SECTIONS.forEach(section => {
    section.subsections.forEach(sub => {
      sub.formulas.forEach(f => {
        const entry = { formula: f, section, subsection: sub };
        entry.nameWords = new Set(indexWordsOf(f.name));
        entry.tagWords = new Set(f.keywords.flatMap(indexWordsOf));
        entry.tagPhrases = f.keywords.map(k => k.toLowerCase());
        entry.ctxWords = new Set(indexWordsOf(sub.title + " " + section.title));
        entry.descWords = new Set(indexWordsOf(f.description));
        entry.latexWords = new Set(latexTokens(f.latex));
        entry.mathFrags = mathFragments(f.latex);
        entry.nameLower = f.name.toLowerCase();
        ALL.push(entry);
        BY_ID[f.id] = entry;
      });
    });
  });

  function getRoute() {
    const m = location.hash.match(/^#\/f\/([\w-]+)$/);
    if (m && BY_ID[m[1]]) return { type: "formula", entry: BY_ID[m[1]] };
    return { type: "home" };
  }

  // Remember where the reader was in the list so "back" from a detail page
  // returns them there instead of jumping to the top.
  let listScrollY = 0;
  function openFormula(id) {
    if (getRoute().type !== "formula") listScrollY = window.scrollY;
    location.hash = "#/f/" + id;
  }

  // ---------- Stars (bookmarks, persisted per-browser) ----------

  let stars;
  try { stars = new Set(JSON.parse(localStorage.getItem("mq-stars") || "[]")); }
  catch (e) { stars = new Set(); }
  function saveStars() {
    try { localStorage.setItem("mq-stars", JSON.stringify([...stars])); } catch (e) {}
  }
  function starBtnHtml(id) {
    const on = stars.has(id);
    return `<button class="star-btn${on ? " starred" : ""}" data-star="${id}" title="Star for later">${on ? "★" : "☆"}</button>`;
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
    "law-of-sines", "circumradius-area", "angle-chasing"
  ]);

  function stripHash() {
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  }

  function sectionCount(section) {
    return section.subsections.reduce((n, sub) => n + sub.formulas.length, 0);
  }

  function passesLevel(f) {
    const levelOk = state.levels.size === 0 || f.level.some(l => state.levels.has(l));
    const impOk = state.sort === "default" || f.importance === state.sort;
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
    if (score === 0 && tok.length >= 5) {
      // Typo tolerance: allow one edit ("stewert" still finds Stewart).
      for (const w of entry.nameWords) if (editClose(w, tok)) { score += 8; break; }
      if (score === 0) for (const w of entry.tagWords) if (editClose(w, tok)) { score += 6; break; }
    }
    return score;
  }

  // True when a and b are within one insertion, deletion, or substitution.
  function editClose(a, b) {
    const la = a.length, lb = b.length;
    if (Math.abs(la - lb) > 1) return false;
    let i = 0, j = 0, edits = 0;
    while (i < la && j < lb) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++edits > 1) return false;
      if (la > lb) i++;
      else if (lb > la) j++;
      else { i++; j++; }
    }
    return edits + (la - i) + (lb - j) <= 1;
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

  const IMP_RANK = { high: 0, medium: 1, low: 2 };

  function searchFormulas(rawQuery) {
    const queryLower = rawQuery.trim().toLowerCase();
    let tokens = wordsOf(queryLower).filter(t => !STOPWORDS.has(t));
    if (!tokens.length) tokens = wordsOf(queryLower);
    const mathForms = queryMathForms(rawQuery);
    if (!tokens.length && !mathForms) return { results: [], partial: false };

    const strict = [];
    const loose = [];
    for (const entry of ALL) {
      if (!passesLevel(entry.formula)) continue;
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
    return {
      results: pool.slice(0, 60).map(r => r.entry),
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
      container.querySelectorAll(".card-desc, .card-name, .card-example, .detail-body, .related-item, .problem-q, .problem-sol").forEach(el => {
        renderMathInElement(el, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      });
    }
  }

  const IMPORTANCE_LABELS = {
    high: ["HIGH", "High importance — core: you could solve most problems at this level with these"],
    medium: ["MED", "Medium importance — builds on the core to greatly simplify or speed up solutions"],
    low: ["LOW", "Low importance — rarely necessary; almost never the intended solution"]
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

  function tagRowHtml(f, queryTokens) {
    const tags = f.keywords.slice(0, 6).map(k => {
      const hit = queryTokens && queryTokens.some(tok =>
        wordsOf(k).some(w => w === tok || (tok.length >= 3 && w.startsWith(tok))));
      return `<span class="tag${hit ? " tag-hit" : ""}" data-tag="${escapeAttr(k)}">${escapeAttr(k)}</span>`;
    });
    return `<div class="tag-row">${tags.join("")}</div>`;
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
          <button class="copy-btn" data-latex="${escapeAttr(f.latex)}" title="Copy LaTeX">copy tex</button>
        </div>
        <div class="formula-display" data-latex="${escapeAttr(f.latex)}"></div>
        <p class="card-desc">${f.description}</p>
        ${extraHtml(f)}
        ${tagRowHtml(f, queryTokens)}
        <div class="more-hint">open full page &rsaquo;</div>
      </article>`;
  }

  // Cards preview only the diagram; examples and questions live on the detail
  // page. Entries in CARD_DIAGRAM_IDS borrow their first detail diagram at a
  // reduced size so the statement is parseable at a glance.
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

  // Contest problems that use this formula. Each links out to its AoPS wiki
  // page — the site teaches the idea, then hands you off to practice it there.
  function contestHtml(f) {
    const refs = (window.MATH_CONTEST || {})[f.id] || [];
    if (!refs.length) return "";
    const items = refs.map(r => {
      const url = aopsUrl(r);
      return url
        ? `<li><a class="ref-link" href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">${r}<span class="ref-ext" aria-hidden="true">&#8599;</span></a></li>`
        : `<li>${r}</li>`;
    }).join("");
    return `
      <div class="practice contest-refs">
        <h4>Practice problems</h4>
        <ul class="ref-list">${items}</ul>
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

  // Details are plain text blocks separated by blank lines; a block may start
  // with a "## Heading" line — only that first line is the heading, the rest
  // of the block is an ordinary paragraph.
  function detailBodyHtml(body) {
    return body.split(/\n\s*\n/).map(block => {
      block = block.trim();
      if (!block) return "";
      if (block.startsWith("## ")) {
        const nl = block.indexOf("\n");
        if (nl === -1) return `<h4>${block.slice(3)}</h4>`;
        return `<h4>${block.slice(3, nl).trim()}</h4><p>${block.slice(nl + 1).trim()}</p>`;
      }
      return `<p>${block}</p>`;
    }).join("");
  }

  function renderDetail(entry) {
    const f = entry.formula;
    state.activeSectionId = entry.section.id;
    const body = (window.MATH_DETAILS || {})[f.id];
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
          <button class="copy-btn" data-latex="${escapeAttr(f.latex)}" title="Copy LaTeX">copy tex</button>
          ${asyBtn}
        </div>
        <div class="formula-display detail-formula" data-latex="${escapeAttr(f.latex)}"></div>
        <p class="card-desc detail-summary">${f.description}</p>
        ${f.diagram ? `<div class="diagram">${f.diagram}</div>` : ""}
        ${((window.MATH_DIAGRAMS || {})[f.id] || []).map(d => `<div class="diagram detail-diagram">${d}</div>`).join("")}
        ${body ? `<div class="detail-body">${detailBodyHtml(body)}</div>` : ""}
        ${practiceHtml(f)}
        ${contestHtml(f)}
        ${related.length ? `
          <div class="related">
            <h4>Related</h4>
            <div class="related-grid">
              ${related.map(r => `<a class="related-item" href="#/f/${r.formula.id}">${r.formula.name}</a>`).join("")}
            </div>
          </div>` : ""}
        ${tagRowHtml(f, null)}
      </div>`;
    renderMath($content);
  }

  function escapeAttr(s) {
    return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }

  function renderSection(section) {
    const parts = [];
    parts.push(`
      <div class="section-header">
        <h2>${section.title}</h2>
        <p>${section.blurb}</p>
      </div>`);

    let shown = 0;
    section.subsections.forEach((sub, i) => {
      const visible = sortEntries(
        sub.formulas.filter(passesLevel).map(f => ({ formula: f, section, subsection: sub }))
      );
      if (!visible.length) return;
      shown += visible.length;
      parts.push(`
        <div class="subsection" id="sub-${section.id}-${i}">
          <h3>${sub.title}</h3>
          <div class="cards">
            ${visible.map(e => cardHtml(e, false, null)).join("")}
          </div>
        </div>`);
    });

    if (!shown) {
      parts.push(`<div class="empty-state"><div class="big">&#8709;</div>No ${section.title} formulas match the selected level filters.</div>`);
    }
    $content.innerHTML = parts.join("");
    renderMath($content);
  }

  function renderSearchResults() {
    const { results, partial } = searchFormulas(state.query);
    const sorted = sortEntries(results);
    const queryTokens = wordsOf(state.query.toLowerCase());
    const levelNote = state.levels.size === 0
      ? ""
      : ` &middot; levels: <strong>${[...state.levels].map(l => LEVEL_LABELS[l]).join(", ")}</strong>`;
    const partialNote = partial
      ? ` <em>(no formula matched every keyword &mdash; showing closest matches)</em>`
      : "";
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

  // The "★ Starred" filter chip narrows the currently selected section down
  // to just its starred formulas — it's a filter within the section, not a
  // separate cross-section page.
  function renderStarred(section) {
    const entries = [];
    section.subsections.forEach(sub => sub.formulas.forEach(f => {
      if (stars.has(f.id) && passesLevel(f)) entries.push(BY_ID[f.id]);
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

  function render() {
    const route = getRoute();
    const section = SECTIONS.find(s => s.id === state.activeSectionId) || SECTIONS[0];
    if (route.type === "formula") {
      renderDetail(route.entry);
    } else if (state.starredOnly) {
      if (section) renderStarred(section);
    } else if (state.query.trim()) {
      renderSearchResults();
    } else {
      if (section) renderSection(section);
    }
    updateNavActive();
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
      if (btn) {
        clearSearch();
        clearStarredFilter();
        stripHash();
        state.activeSectionId = btn.dataset.section;
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
    $sidebar.querySelectorAll(".nav-section").forEach(el => {
      const isActive = !state.query.trim() && !state.starredOnly && el.dataset.section === state.activeSectionId;
      el.classList.toggle("open", isActive);
      el.querySelector(".nav-section-btn").classList.toggle("active", isActive);
    });
  }

  function clearSearch() {
    state.query = "";
    $search.value = "";
  }

  function clearStarredFilter() {
    if (!state.starredOnly) return;
    state.starredOnly = false;
    syncFilterChips();
  }

  // ---------- Level filter chips (multi-select) + Starred chip ----------

  function syncFilterChips() {
    $levelFilters.querySelectorAll(".level-chip").forEach(c => {
      const l = c.dataset.level;
      const on = l === "All" ? (state.levels.size === 0 && !state.starredOnly)
        : l === "Starred" ? state.starredOnly
        : state.levels.has(l);
      c.classList.toggle("active", on);
    });
  }

  function buildLevelFilters() {
    const chips = [`<button class="level-chip active" data-level="All">All Levels</button>`]
      .concat(LEVELS.map(l => `<button class="level-chip" data-level="${l}">${LEVEL_LABELS[l]}</button>`))
      .concat([`<button class="level-chip star-chip" data-level="Starred">&#9733; Starred</button>`]);
    $levelFilters.innerHTML = chips.join("");

    $levelFilters.addEventListener("click", e => {
      const chip = e.target.closest(".level-chip");
      if (!chip) return;
      const level = chip.dataset.level;
      if (level === "All") {
        state.levels.clear();
        state.starredOnly = false;
      } else if (level === "Starred") {
        state.starredOnly = !state.starredOnly;
      } else {
        if (state.levels.has(level)) state.levels.delete(level);
        else state.levels.add(level);
      }
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
      if (state.query.trim()) stripHash();
      render();
    }, 120);
  });

  $sortSelect.addEventListener("change", () => {
    state.sort = $sortSelect.value;
    render();
  });

  // Enter in the search box jumps straight to the top hit's full page.
  $search.addEventListener("keydown", e => {
    if (e.key !== "Enter") return;
    const q = $search.value.trim();
    if (!q) return;
    state.query = q;
    const { results } = searchFormulas(q);
    const sorted = sortEntries(results);
    if (sorted.length) openFormula(sorted[0].formula.id);
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

  // Top → smooth-scroll back to the top of the current page.
  const $top = document.getElementById("top-btn");
  if ($top) $top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Random → a random formula's detail page.
  const $random = document.getElementById("random-btn");
  if ($random) $random.addEventListener("click", () => {
    const pick = ALL[Math.floor(Math.random() * ALL.length)];
    openFormula(pick.formula.id);
    window.scrollTo({ top: 0 });
  });

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
      if (stars.has(id)) stars.delete(id); else stars.add(id);
      saveStars();
      if (state.starredOnly) {
        render();
      } else {
        document.querySelectorAll(`.star-btn[data-star="${id}"]`).forEach(b => {
          b.classList.toggle("starred", stars.has(id));
          b.textContent = stars.has(id) ? "★" : "☆";
        });
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
    if (e.target.closest("a")) return; // let real links (related items, back link) navigate
    const card = e.target.closest(".card[data-id]");
    if (card) {
      openFormula(card.dataset.id);
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
