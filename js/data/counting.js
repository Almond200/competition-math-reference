// Counting & probability: combinatorics basics, binomial identities, distributions, advanced counting, probability, pigeonhole.
window.MATH_SECTIONS = window.MATH_SECTIONS || [];

window.MATH_SECTIONS.push({
  id: "counting",
  group: "formulas",
  title: "Counting & Probability",
  blurb: "Permutations, combinations, stars and bars, PIE, Catalan numbers, expected value, and probability.",
  subsections: [
    {
      title: "Counting Basics",
      formulas: [
        {
          id: "permutations-combinations",
          name: "Permutations & Combinations",
          latex: String.raw`P(n, k) = \frac{n!}{(n-k)!}, \qquad \binom{n}{k} = \frac{n!}{k!(n-k)!}`,
          description: String.raw`Ordered vs. unordered selection of $k$ from $n$. They differ by the $k!$ orderings: $P(n,k) = k!\binom{n}{k}$.`,
          keywords: ["choose", "arrange", "order matters", "factorial", "nCk", "nPk", "in a row", "line up", "n factorial"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "multiset-permutations",
          name: "Arrangements with Repeated Objects",
          latex: String.raw`\frac{n!}{n_1!\, n_2! \cdots n_k!}`,
          description: String.raw`Arrangements of $n$ objects where $n_i$ are identical of type $i$. E.g. MISSISSIPPI: $\frac{11!}{4!\,4!\,2!}$. This is the multinomial coefficient.`,
          keywords: ["identical objects", "mississippi", "multinomial", "repeated letters"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "circular-permutations",
          name: "Circular Arrangements",
          latex: String.raw`(n - 1)! \qquad \text{necklaces (flips allowed): } \frac{(n-1)!}{2}`,
          description: String.raw`Seat $n$ people around a round table where only relative order matters. Divide by 2 more if reflections are considered identical.`,
          keywords: ["round table", "necklace", "rotation", "circular"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "grid-paths",
          name: "Lattice Grid Paths",
          latex: String.raw`\#\text{paths } (0,0) \to (m, n) = \binom{m + n}{m}`,
          description: String.raw`Right/up paths: choose which $m$ of the $m+n$ steps go right. With forbidden points, subtract paths through them; paths avoiding the diagonal lead to Catalan numbers.`,
          keywords: ["lattice paths", "grid walking", "right up", "block"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "rectangles-in-grid",
          name: "Rectangles in a Grid",
          latex: String.raw`\#\text{rectangles in } m \times n \text{ grid} = \binom{m+1}{2}\binom{n+1}{2}`,
          description: String.raw`Choose 2 of the $m+1$ vertical lines and 2 of the $n+1$ horizontal lines. Squares in an $n \times n$ grid: $\sum_{k=1}^{n} k^2$.`,
          keywords: ["count rectangles", "count squares", "grid lines", "count rectangles in a grid", "choose two horizontal two vertical lines", "grid rectangles and squares"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "handshakes-diagonals",
          name: "Handshakes, Games, Diagonals & Triangles",
          latex: String.raw`\text{pairs} = \binom{n}{2} = \frac{n(n-1)}{2}, \qquad \text{diagonals} = \frac{n(n-3)}{2}, \qquad \text{triangles} = \binom{n}{3}`,
          description: String.raw`Handshakes among $n$ people or games in a round-robin are $\binom{n}{2}$; an $n$-gon has $\binom{n}{2} - n$ diagonals; $n$ points (no 3 collinear) determine $\binom{n}{3}$ triangles. In convex position the diagonals cross at $\binom{n}{4}$ interior points — each choice of four vertices gives exactly one crossing.`,
          keywords: ["handshakes", "round robin", "diagonals", "pairs", "points determine", "diagonal intersections", "n choose 4"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "counting-functions",
          name: "Counting Functions & Injections",
          latex: String.raw`\#\text{functions } [n] \to [k] = k^n, \qquad \#\text{injections} = k(k-1)\cdots(k-n+1)`,
          description: String.raw`Each of $n$ inputs independently picks among $k$ outputs; injections forbid reuse. Subsets of an $n$-set: $2^n$ (each element in or out).`,
          keywords: ["functions", "injective", "one to one", "subsets", "independent choices"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "subset-sum-facts",
          name: "Subset-Sum Facts",
          latex: String.raw`\sum_{S\subseteq A}\ \sum_{x\in S} x \;=\; 2^{\,n-1}\sum_{x\in A} x`,
          description: String.raw`An $n$-element set has $2^n$ subsets, and each element lies in exactly half of them ($2^{n-1}$), so the sum of all subset sums is $2^{n-1}$ times the total of $A$. If $A$ has at least one odd element, exactly half the subsets ($2^{n-1}$) have an even sum — pairing each subset with its symmetric difference against that odd element is a bijection between even-sum and odd-sum subsets. (The separate subset-size parity fact — equally many even- and odd-sized subsets — is the $x=1,\,y=-1$ binomial identity.)`,
          keywords: ["subset sums", "sum over all subsets", "even sum subsets", "power set", "sum of subset sums", "number of subsets", "each element in half"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Binomial Coefficient Identities",
      formulas: [
        {
          id: "pascals-identity",
          name: "Pascal's Identity & Symmetry",
          latex: String.raw`\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}, \qquad \binom{n}{k} = \binom{n}{n-k}`,
          description: String.raw`Pascal's rule builds the triangle; combinatorially, split on whether the first element is chosen.`,
          keywords: ["pascal triangle", "recursive", "symmetry", "pascal's rule", "binomial coefficient recurrence", "add two entries above"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "binomial-row-sums",
          name: "Row Sums & Alternating Sums",
          latex: String.raw`\sum_{k=0}^{n} \binom{n}{k} = 2^n, \qquad \sum_{k=0}^{n} (-1)^k \binom{n}{k} = 0`,
          description: String.raw`Set $x = y = 1$ (or $x = 1, y = -1$) in the binomial theorem. Consequence: a set has as many even-sized subsets as odd-sized ones ($2^{n-1}$ each).`,
          keywords: ["subsets", "2 to n", "alternating", "even odd subsets"],
          importance: "high",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "hockey-stick",
          name: "Hockey Stick Identity",
          latex: String.raw`\sum_{i=r}^{n} \binom{i}{r} = \binom{n+1}{r+1}, \qquad \binom{r}{r} + \binom{r+1}{r} + \binom{r+2}{r} + \cdots + \binom{n}{r} = \binom{n+1}{r+1}`,
          description: String.raw`Summing down a diagonal of Pascal's triangle. Proof: repeatedly absorb terms with Pascal's rule.`,
          keywords: ["hockey stick", "diagonal sum", "christmas stocking", "hockey stick identity", "christmas stocking identity", "diagonal sum in pascal"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "vandermonde",
          name: "Vandermonde's Identity",
          latex: String.raw`\sum_{k=0}^{r} \binom{m}{k}\binom{n}{r-k} = \binom{m+n}{r}, \qquad \binom{m}{0}\binom{n}{r} + \binom{m}{1}\binom{n}{r-1} + \cdots + \binom{m}{r}\binom{n}{0} = \binom{m+n}{r}`,
          description: String.raw`Choose $r$ from a group of $m + n$ by splitting on how many come from the first group. Special case: $\sum_k \binom{n}{k}^2 = \binom{2n}{n}$.`,
          keywords: ["vandermonde", "convolution", "sum of squares of binomials", "central binomial"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "alternating-squared-binomials",
          name: "Alternating Sum of Squared Binomial Coefficients",
          latex: String.raw`\sum_{k=0}^{2n} (-1)^k \binom{2n}{k}^2 = (-1)^n \binom{2n}{n}, \qquad \sum_{k=0}^{m} (-1)^k \binom{m}{k}^2 = 0 \;\;(m \text{ odd})`,
          description: String.raw`The alternating companion to $\sum_k \binom{n}{k}^2 = \binom{2n}{n}$. Both come from reading off one coefficient of $(1-x)^m(1+x)^m = (1-x^2)^m$: for even $m = 2n$ the middle term survives with a sign, and for odd $m$ there is no middle term at all, so the sum vanishes.`,
          keywords: ["alternating sum of squared binomials", "alternating binomial squares", "minus one to the k binomial squared", "central binomial with sign", "1 minus x squared expansion", "vanishes for odd n"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "committee-chair",
          name: "Committee–Chair Identity",
          latex: String.raw`k\binom{n}{k} = n\binom{n-1}{k-1}, \qquad \sum_{k=0}^{n} k\binom{n}{k} = n \cdot 2^{n-1}`,
          description: String.raw`Pick a committee with a chair two ways: committee first or chair first. Differentiating $(1+x)^n$ gives the sum version.`,
          keywords: ["absorption", "k choose", "weighted sum", "committee"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "multinomial-theorem",
          name: "Multinomial Theorem",
          latex: String.raw`(x_1 + \cdots + x_m)^n = \sum_{k_1 + \cdots + k_m = n} \binom{n}{k_1, \dots, k_m} x_1^{k_1} \cdots x_m^{k_m}`,
          description: String.raw`Where $\binom{n}{k_1, \dots, k_m} = \frac{n!}{k_1! \cdots k_m!}$. Coefficient extraction for trinomial expansions and beyond.`,
          keywords: ["multinomial", "trinomial expansion", "coefficient", "multinomial expansion", "multinomial coefficient", "trinomial theorem"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "pascal-parity",
          name: "Odd Entries in a Row of Pascal's Triangle",
          latex: String.raw`\#\{k : \binom{n}{k} \text{ odd}\} = 2^{s_2(n)}`,
          description: String.raw`Where $s_2(n)$ counts the 1-bits of $n$ in binary (a consequence of Lucas' Theorem). Row $2^m - 1$ is all odd; Pascal's triangle mod 2 is the Sierpinski triangle.`,
          keywords: ["parity", "odd binomial", "binary digits", "sierpinski", "lucas"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "weighted-binomial-sums",
          name: "Weighted Binomial Sums",
          latex: String.raw`\sum_{k=0}^{n} k\binom{n}{k} = n \cdot 2^{n-1}, \qquad \sum_{k=0}^{n} k^2\binom{n}{k} = n(n+1)2^{n-2}, \qquad \sum_k k(k-1)\binom{n}{k} = n(n-1)2^{n-2}`,
          description: String.raw`Differentiate $(1+x)^n$ once (then set $x = 1$) for the first sum; differentiate twice, or split $k^2 = k(k-1) + k$ and absorb twice, for the second. The same machinery evaluates $\sum k(k-1)\binom{n}{k} = n(n-1)2^{n-2}$ and beyond.`,
          keywords: ["k squared binomial", "derivative trick", "weighted sum", "absorption twice"],
          importance: "lower",
          level: ["AIME"]
        }
      ]
    },
    {
      title: "Stars & Bars / Distributions",
      formulas: [
        {
          id: "stars-and-bars",
          name: "Stars and Bars",
          latex: String.raw`x_1 + \cdots + x_k = n: \quad \binom{n + k - 1}{k - 1} \;\text{(} x_i \ge 0\text{)}, \qquad \binom{n - 1}{k - 1} \;\text{(} x_i \ge 1\text{)}`,
          description: String.raw`Nonnegative or positive integer solutions; equivalently distributing $n$ identical balls into $k$ labeled boxes. For $x_i \ge a_i$, substitute $y_i = x_i - a_i$ first.`,
          keywords: ["identical balls", "boxes", "integer solutions", "distribute", "sticks and stones"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "stars-bars-upper-bound",
          name: "Stars and Bars with Upper Bounds",
          latex: String.raw`x_i \le m:\ \ \text{stars and bars, then subtract (PIE) the cases } x_i \ge m+1`,
          description: String.raw`Count all solutions, subtract those violating one bound ($\binom{k}{1}$ ways to pick which, shift by $m{+}1$), add back double violations, etc.`,
          keywords: ["bounded", "at most", "inclusion exclusion", "capped"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "balls-boxes-table",
          name: "Balls in Boxes (The Twelvefold Way)",
          latex: String.raw`\begin{array}{l|cc} \textbf{balls}\to\textbf{boxes} & \textbf{any} & \textbf{no empty box} \\ \hline \text{dist}\to\text{dist} & k^n & k!\,S(n,k) \\ \text{ident}\to\text{dist} & \dbinom{n+k-1}{k-1} & \dbinom{n-1}{k-1} \\ \text{dist}\to\text{ident} & \sum_{j=1}^{k} S(n,j) & S(n,k) \\ \text{ident}\to\text{ident} & p_{\le k}(n) & p_k(n) \end{array}`,
          description: String.raw`The complete map for distributing $n$ balls into $k$ boxes, the Twelvefold Way, split by whether the balls are distinguishable, whether the boxes are, and whether empty boxes are allowed. Each of the twelve cells is a formula you already know under a different name.`,
          keywords: ["twelvefold way", "balls in boxes", "distributions", "distinguishable", "indistinguishable", "identical objects", "stars and bars", "stirling numbers second kind", "bell number", "integer partitions", "surjections onto", "minimum per box", "upper bound cap per box", "inclusion exclusion distribution", "at most one per box", "no empty box", "distribute objects"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Advanced Counting",
      formulas: [
        {
          id: "derangements",
          name: "Derangements",
          latex: String.raw`D_n = n! \sum_{k=0}^{n} \frac{(-1)^k}{k!} = \left[\frac{n!}{e}\right] \;(\text{nearest integer})`,
          description: String.raw`Permutations with no fixed point. $D_1 = 0, D_2 = 1, D_3 = 2, D_4 = 9, D_5 = 44$; recurrence $D_n = (n-1)(D_{n-1} + D_{n-2})$. As $n \to \infty$, $P(\text{derangement}) \to \frac{1}{e}$.`,
          keywords: ["no fixed point", "hat check", "wrong envelopes", "subfactorial", "exactly k fixed points"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "surjections",
          name: "Counting Surjections",
          latex: String.raw`\#\text{surjections } [n] \twoheadrightarrow [k] = \sum_{i=0}^{k} (-1)^i \binom{k}{i} (k - i)^n`,
          description: String.raw`PIE over which outputs get missed; equals $k!\, S(n, k)$. This is the "every box nonempty, distinct balls, distinct boxes" distribution count.`,
          keywords: ["onto", "surjective", "every box nonempty", "inclusion exclusion functions", "onto functions"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "non-adjacent-selection",
          name: "Choosing Non-Adjacent Objects",
          latex: String.raw`\text{in a row: } \binom{n-k+1}{k}, \qquad \text{in a circle: } \frac{n}{n-k}\binom{n-k}{k}`,
          description: String.raw`Ways to choose $k$ of $n$ positions with no two adjacent. Row proof: place the $n - k$ unchosen objects, then drop the $k$ chosen ones into the $n - k + 1$ gaps.`,
          keywords: ["no two adjacent", "nonadjacent", "gap method", "circular selection", "spacing"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "catalan-numbers",
          name: "Catalan Numbers",
          latex: String.raw`C_n = \frac{1}{n+1}\binom{2n}{n} = \binom{2n}{n} - \binom{2n}{n+1}`,
          description: String.raw`$1, 1, 2, 5, 14, 42, 132, \dots$ Counts balanced parenthesizations, monotone lattice paths not crossing the diagonal, triangulations of an $(n{+}2)$-gon, and binary trees. Recurrence: $C_{n+1} = \sum C_i C_{n-i}$.`,
          keywords: ["catalan", "balanced parentheses", "dyck paths", "triangulations", "ballot"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "ballot-problem",
          name: "The Ballot Problem",
          latex: String.raw`P(A \text{ always strictly ahead}) = \frac{a - b}{a + b}`,
          description: String.raw`If A gets $a$ votes and B gets $b \lt  a$, this is the probability A leads throughout the count. Proved by the reflection principle — the same trick behind Catalan path-counting.`,
          keywords: ["ballot", "reflection principle", "always ahead", "random walk"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "exponential-generating-functions",
          name: "Exponential Generating Functions (EGF)",
          latex: String.raw`\hat A(x) = \sum_{n \ge 0} a_n \frac{x^n}{n!}, \qquad \widehat{A \cdot B}(x) = \hat A(x)\,\hat B(x) \;\Rightarrow\; c_n = \sum_k \binom{n}{k} a_k\, b_{n-k}`,
          description: String.raw`The tool for labeled structures, where ordinary GFs fail. Dividing by $n!$ makes multiplication carry the binomial coefficient automatically, so the product of two EGFs is the "labeled product" (choose which labels go to each part). Dictionary: $e^x$ = one set (all present), $e^x - 1$ = nonempty set, $\frac{1}{1-x}$ = a sequence/list, and the exponential formula $\hat{\text{whole}} = \exp(\hat{\text{connected}})$ counts structures built from connected pieces (permutations by cycle type, set partitions, labeled graphs).`,
          keywords: ["exponential generating function", "egf", "labeled structures", "exponential formula", "labeled product", "e^x set", "cycle index", "derangements egf"],
          importance: "lower",
          level: ["Olympiad"]
        },
        {
          id: "moser-circle",
          name: "Moser's Circle (Regions from Chords)",
          latex: String.raw`R(n) = \binom{n}{4} + \binom{n}{2} + 1 = 1,\ 2,\ 4,\ 8,\ 16,\ \mathbf{31},\ 57,\ \ldots`,
          description: String.raw`The famous "powers of 2" trap. Put $n$ points on a circle and draw all $\binom n2$ chords (with no three crossing at one interior point); the number of regions is $\binom n4 + \binom n2 + 1$, not $2^{n-1}$. It agrees — $1, 2, 4, 8, 16$ — right up to $n = 5$, then breaks to $\mathbf{31}$ (not $32$) at $n = 6$. The count drops out of Euler's $V - E + F = 2$: each set of $4$ points gives one interior crossing ($\binom n4$ vertices). The perfect cautionary tale against extrapolating a pattern from five cases.`,
          keywords: ["euler formula regions", "moser circle", "regions from chords", "points on a circle", "1 2 4 8 16 31", "not powers of two", "chord regions", "pattern trap"],
          importance: "low",
          level: ["MATHCOUNTS", "AMC12", "AIME"]
        },
        {
          id: "plane-regions",
          name: "Regions from Lines and Circles",
          latex: String.raw`R_{\text{lines}} = \frac{n^2 + n + 2}{2}, \qquad R_{\text{circles}} = n^2 - n + 2`,
          description: String.raw`Maximum regions from $n$ lines (no two parallel, no three concurrent) or $n$ circles (each pair meeting twice). Incremental principle: each new curve adds one region per crossing plus one — which is also how region-counting problems with expected values decompose.`,
          keywords: ["regions", "lazy caterer", "pancake", "lines divide plane", "circles divide plane"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Symmetry, Partitions & Posets",
      formulas: [
        {
          id: "necklace-formula",
          name: "Necklace Counting Formula",
          latex: String.raw`\#\text{necklaces} = \frac{1}{n} \sum_{d \mid n} \varphi(d)\, k^{n/d}`,
          description: String.raw`Colorings of $n$ beads with $k$ colors up to rotation — Burnside applied to the cyclic group, grouped by rotation order $d$. Allowing flips too (bracelets) adds reflection terms.`,
          keywords: ["necklace", "rotation", "beads", "burnside application", "totient"],
          importance: "lowest",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "partitions",
          name: "Partitions and Compositions",
          latex: String.raw`p(n): \; 1, 2, 3, 5, 7, 11, 15, 22, 30, 42, \dots, \qquad \#\{\text{compositions of } n\} = 2^{n-1}`,
          description: String.raw`Ways to write $n$ as an unordered sum of positive integers. Partitions into odd parts = partitions into distinct parts (Euler). Compositions (ordered sums) of $n$: $2^{n-1}$.`,
          keywords: ["partition", "unordered sum", "compositions", "distinct parts"],
          importance: "low",
          level: ["AIME"]
        },
        {
          id: "stirling-bell",
          name: "Stirling Numbers of the Second Kind & Bell Numbers",
          latex: String.raw`S(n, k) = k \cdot S(n-1, k) + S(n-1, k-1), \qquad B_n = \sum_k S(n, k)`,
          description: String.raw`$S(n,k)$ = ways to partition $n$ labeled objects into $k$ nonempty unlabeled groups; $B_n$ = all set partitions ($1, 1, 2, 5, 15, 52, 203, \dots$). Surjections $n \to k$: $k!\, S(n,k)$.`,
          keywords: ["set partitions", "stirling", "bell", "surjections", "onto functions"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "permutation-cycle-structure",
          name: "Permutation Cycle Structure & Order",
          latex: String.raw`f^{\,k} = \mathrm{id} \iff \text{every cycle length divides } k, \qquad \operatorname{ord}(f) = \operatorname{lcm}(\text{cycle lengths})`,
          description: String.raw`Take any bijection $f$ from a finite set to itself and follow one element: $x, f(x), f(f(x)), \dots$ must eventually return to $x$, so the set breaks into disjoint cycles, and that picture is what almost every question about $f$ is really about. Repeatedly applying $f$ rotates each cycle independently, so $f$ returns everything to its start after $\operatorname{lcm}$ of the cycle lengths steps, and $f^{\,k} = \mathrm{id}$ exactly when every cycle length divides $k$. Counting is by cycle type: the number with $m_c$ cycles of each length $c$ is $\frac{n!}{\prod_c c^{m_c} m_c!}$.`,
          keywords: ["cycle structure", "cycle type", "order of a permutation", "disjoint cycle decomposition", "iterating a function returns to start", "f composed with itself k times is the identity", "lcm of cycle lengths", "counting permutations by cycle type", "self-inverse function", "involution"],
          importance: "medium",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "stirling-first-kind",
          name: "Stirling Numbers of the First Kind",
          latex: String.raw`x(x+1)(x+2)\cdots(x+n-1) = \sum_{k} \begin{bmatrix} n \\ k \end{bmatrix} x^k`,
          description: String.raw`$\begin{bmatrix} n \\ k \end{bmatrix}$ counts permutations of $n$ elements with exactly $k$ cycles; recurrence $\begin{bmatrix} n \\ k \end{bmatrix} = (n-1)\begin{bmatrix} n-1 \\ k \end{bmatrix} + \begin{bmatrix} n-1 \\ k-1 \end{bmatrix}$. Probability a random permutation is one big cycle: $\frac{1}{n}$.`,
          keywords: ["cycles", "permutation cycle count", "rising factorial", "stirling numbers of the first kind", "permutation cycle count", "unsigned stirling"],
          importance: "lowest",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "dilworths-theorem",
          name: "Dilworth's Theorem",
          latex: String.raw`\text{min chains covering a poset} = \text{size of the largest antichain}`,
          description: String.raw`In any finite partially ordered set, the fewest chains (totally ordered subsets) needed to cover everything equals the largest antichain (pairwise-incomparable subset). Its dual (Mirsky's theorem) swaps the roles. Erdős–Szekeres is the classic corollary: order points by first coordinate and compare by second — a long chain is an increasing subsequence, a long antichain a decreasing one.`,
          keywords: ["dilworth theorem", "chains antichains", "poset cover", "mirsky dual", "partial order", "erdos szekeres corollary"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "sperners-theorem",
          name: "Sperner's Theorem",
          latex: String.raw`\text{largest antichain in } 2^{[n]} = \binom{n}{\lfloor n/2 \rfloor}`,
          description: String.raw`The most subsets of an $n$-element set you can choose with none containing another is $\binom{n}{\lfloor n/2\rfloor}$ — achieved by taking all subsets of the middle size. The proof partitions the subset lattice into $\binom{n}{\lfloor n/2\rfloor}$ symmetric chains (or uses the LYM inequality $\sum \binom{n}{|A|}^{-1} \le 1$ over an antichain). A cornerstone of extremal set theory.`,
          keywords: ["sperner theorem", "antichain", "subset lattice", "lym inequality", "middle binomial", "extremal set theory"],
          importance: "low",
          level: ["Olympiad"]
        }
      ]
    },
    {
      title: "Combinatorial Game Theory",
      formulas: [
        {
          id: "sprague-grundy",
          name: "Nim & the Sprague–Grundy Theorem",
          latex: String.raw`(n_1, \ldots, n_k)\ \text{is a loss} \iff n_1 \oplus \cdots \oplus n_k = 0, \qquad g(\text{pos}) = \operatorname{mex}\{\, g(\text{options}) \,\}, \qquad g(G_1 + \cdots + G_m) = g(G_1) \oplus \cdots \oplus g(G_m)`,
          description: String.raw`In Nim (several piles; a move removes any positive number from one pile; last move wins) the position is a loss for the player to move exactly when the binary XOR ("Nim-sum") of the pile sizes is $0$; otherwise you can always move to make it $0$. Sprague–Grundy extends this to every impartial game: each position gets a Grundy value $g = \operatorname{mex}$ of its options' values (the smallest nonnegative integer not among them), a position is losing iff $g = 0$, and a sum of independent games has Grundy value the XOR of the parts — so any collection of impartial games plays exactly like a single Nim heap.`,
          keywords: ["nim", "sprague grundy", "grundy value", "mex minimum excludant", "xor nim sum", "impartial game", "game theory", "combinatorial game"],
          importance: "lower",
          level: ["AIME", "Olympiad"]
        }
      ]
    },
    {
      title: "Probability",
      formulas: [
        {
          id: "basic-probability",
          name: "Basic Probability & Union",
          latex: String.raw`P(A) = \frac{\#\text{favorable}}{\#\text{total}}, \qquad P(A \cup B) = P(A) + P(B) - P(A \cap B)`,
          description: String.raw`Equally likely outcomes. Complement: $P(\bar{A}) = 1 - P(A)$.`,
          keywords: ["favorable outcomes", "union", "complement", "probability basics", "favorable over total", "addition rule probability"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "conditional-probability",
          name: "Conditional Probability & Bayes",
          latex: String.raw`P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \qquad P(A \mid B) = \frac{P(B \mid A)\,P(A)}{P(B)}`,
          description: String.raw`Restrict the sample space to $B$. Independence means $P(A \cap B) = P(A)P(B)$, i.e. $P(A \mid B) = P(A)$.`,
          keywords: ["given that", "bayes", "independent", "restrict sample space"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "binomial-probability",
          name: "Binomial Probability",
          latex: String.raw`P(k \text{ successes in } n \text{ trials}) = \binom{n}{k} p^k (1-p)^{n-k}`,
          description: String.raw`Independent trials with success probability $p$. Expected number of successes: $np$.`,
          keywords: ["coin flips", "repeated trials", "exactly k", "bernoulli"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "expected-value",
          name: "Expected Value & Linearity",
          latex: String.raw`E[X] = \sum x_i\, p_i, \qquad E[X + Y] = E[X] + E[Y] \;\;\textbf{always}`,
          description: String.raw`Linearity needs no independence — the key to hard expected-value problems. Decompose $X$ into indicator variables: $E[X] = \sum P(\text{event}_i)$.`,
          keywords: ["expectation", "linearity", "indicator variables", "average"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "tail-sum-expectation",
          name: "Tail-Sum Formula for Expectation",
          latex: String.raw`E[X] = \sum_{k=1}^{\infty} P(X \ge k) \;\;(X \in \mathbb{Z}_{\ge 0}), \qquad E[X] = \int_0^{\infty} P(X > t)\, dt \;\;(X \ge 0)`,
          description: String.raw`For a nonnegative-integer $X$, the expectation is the sum of the tail probabilities $P(X \ge k)$ — often far easier than $\sum k\, P(X = k)$ because the "$\ge k$" event is simple. The continuous analog integrates the survival function $P(X > t)$.`,
          keywords: ["tail sum", "survival function", "expected value", "sum of probabilities", "layer cake", "expected maximum"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "markovs-inequality",
          name: "Markov's Inequality",
          latex: String.raw`X \ge 0, \; a \gt 0 \implies P(X \ge a) \le \frac{E[X]}{a}`,
          description: String.raw`A nonnegative random variable cannot often be much larger than its mean: at most a $\frac{1}{t}$ fraction of the time can it reach $t$ times its average. Applying it to $(X-\mu)^2$ gives Chebyshev's inequality, $P(|X-\mu| \ge k\sigma) \le \frac{1}{k^2}$.`,
          keywords: ["markov inequality", "tail bound", "probability at least", "nonnegative random variable", "chebyshev inequality", "concentration", "expected value bound", "at most one over t"],
          importance: "lower",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "geometric-distribution",
          name: "Waiting for Success",
          latex: String.raw`E[\text{trials until first success}] = \frac{1}{p}, \qquad E[\text{collect all } n \text{ types}] = nH_n = n\left(1 + \tfrac{1}{2} + \cdots + \tfrac{1}{n}\right)`,
          description: String.raw`E.g. expected rolls to see a 6 is 6. Solve via the self-similar equation $E = 1 + (1-p)E$. Coupon collector (all $n$ types): $E = n\left(1 + \frac{1}{2} + \cdots + \frac{1}{n}\right)$.`,
          keywords: ["first success", "geometric", "coupon collector", "expected wait", "dice until"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "turn-based-games",
          name: "Turn-Based Game Probabilities",
          latex: String.raw`P(\text{first player wins}) = \frac{p}{p + q - pq}`,
          description: String.raw`Players alternate turns; the first succeeds with probability $p$ per turn, the second with $q$. Either sum the geometric series $p + (1-p)(1-q)p + \cdots$ or condition on the first round. With $q = p$: $\frac{1}{2-p}$ — the first player always has the edge.`,
          keywords: ["alternating turns", "first player wins", "geometric series game", "coin game", "dice game"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "hypergeometric",
          name: "Hypergeometric Distribution",
          latex: String.raw`P(k \text{ special in a draw of } n) = \frac{\binom{K}{k}\binom{N-K}{n-k}}{\binom{N}{n}}`,
          description: String.raw`From $N$ objects of which $K$ are special, draw $n$ without replacement. The standard "exactly $k$ red balls / face cards / defective parts" setup.`,
          keywords: ["without replacement", "exactly k", "cards", "balls from urn", "drawing without replacement"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "variance-independence",
          name: "Variance & Products of Independent Variables",
          latex: String.raw`\operatorname{Var}(X) = E[X^2] - E[X]^2, \qquad E[XY] = E[X]\,E[Y] \;\;(X, Y \text{ indep.})`,
          description: String.raw`Unlike expectation, $E[XY] = E[X]E[Y]$ and $\operatorname{Var}(X + Y) = \operatorname{Var}(X) + \operatorname{Var}(Y)$ do require independence.`,
          keywords: ["variance", "independent product", "second moment", "variance of a sum", "variance adds when independent", "independent variance"],
          importance: "lower",
          level: ["AMC12", "AIME"]
        },
        {
          id: "expected-fixed-points",
          name: "Expected Fixed Points & Exactly-k Formula",
          latex: String.raw`E[\#\text{fixed points}] = 1, \qquad P(\text{exactly } k) = \frac{\binom{n}{k} D_{n-k}}{n!}`,
          description: String.raw`Linearity with indicators: each position is fixed with probability $\frac{1}{n}$, so the expectation is exactly 1 for every $n$. The exact distribution uses derangement numbers $D_{n-k}$.`,
          keywords: ["fixed points", "matching hats", "indicator", "derangement distribution"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "coprime-probability",
          name: "Probability Two Random Integers Are Coprime",
          latex: String.raw`P(\gcd = 1) = \frac{6}{\pi^2}`,
          description: String.raw`The density $\frac{1}{\zeta(2)} \approx 60.8\%$: each prime $p$ fails to divide both with probability $1 - \frac{1}{p^2}$, and the product over primes is $\frac{6}{\pi^2}$. Same constant governs squarefree density.`,
          keywords: ["coprime probability", "zeta", "squarefree density", "6 over pi squared"],
          importance: "lowest",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "order-statistics",
          name: "Order Statistics on $[0, 1]$",
          latex: String.raw`E[\max] = \frac{n}{n+1}, \qquad E[\min] = \frac{1}{n+1}, \qquad E[\text{gap}] = \frac{1}{n+1}, \qquad P(\max \le x) = x^n, \qquad E[\max - \min] = \frac{n - 1}{n + 1}, \qquad \text{discrete: } k \text{ draws from } \{1, \dots, n\} \Rightarrow E[\max] = \frac{k(n+1)}{k+1}`,
          description: String.raw`Choose $n$ numbers independently and uniformly from $[0,1]$: sorted, they sit on average at $\frac{1}{n+1}, \frac{2}{n+1}, \dots, \frac{n}{n+1}$ — the $n+1$ gaps are exchangeable, so each expects $\frac{1}{n+1}$. Also $P(\max \le x) = x^n$ and $E[\max - \min] = \frac{n-1}{n+1}$.`,
          keywords: ["expected maximum", "expected minimum", "uniform random", "sorted", "gaps", "spacings", "expected range"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "total-expectation",
          name: "Law of Total Expectation",
          latex: String.raw`E[X] = \sum_i P(A_i)\, E[X \mid A_i], \qquad E[\text{total}] = E[N] \cdot E[X]`,
          description: String.raw`Partition the sample space into cases $A_i$: the overall expectation is the probability-weighted average of the case expectations. For a random number $N$ of i.i.d. contributions, Wald's identity gives $E[\text{total}] = E[N] \cdot E[X]$.`,
          keywords: ["conditional expectation", "tower rule", "casework expectation", "weighted average", "first step", "wald"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "bayes-theorem",
          name: "Bayes' Theorem",
          latex: String.raw`P(A \mid B) = \frac{P(B \mid A)\,P(A)}{P(B)}, \qquad P(B) = \sum_i P(B \mid A_i)\,P(A_i)`,
          description: String.raw`Reverses a conditional: it converts "chance of the evidence given the cause" into "chance of the cause given the evidence." The denominator is the total probability of $B$, summed over all disjoint scenarios $A_i$. The heart of "the test is $99\%$ accurate — what's the chance you actually have it?" problems, where the base rate dominates.`,
          keywords: ["bayes theorem", "conditional probability reversed", "posterior", "total probability", "false positive"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "probability-generating-functions",
          name: "Probability Generating Functions",
          latex: String.raw`G_X(s) = E[s^X] = \sum_k P(X=k)\,s^k, \qquad E[X] = G_X'(1), \quad \operatorname{Var}(X) = G_X''(1) + G_X'(1) - G_X'(1)^2, \qquad G_{X+Y} = G_X G_Y`,
          description: String.raw`Package a nonnegative-integer distribution into a power series $G_X(s) = E[s^X]$. Derivatives at $s=1$ read off the moments ($G'(1) = E[X]$, and $G''(1) = E[X(X-1)]$ gives the variance), and independent sums multiply their PGFs — so a sum of dice or coins has PGF a product, and its distribution is one polynomial expansion. The coefficient of $s^k$ recovers $P(X=k)$.`,
          keywords: ["probability generating function", "pgf", "expected value derivative", "variance from pgf", "sum of independent", "moment"],
          importance: "lower",
          level: ["AIME", "Olympiad"]
        }
      ]
    },
    {
      title: "Pigeonhole & Double Counting",
      formulas: [
        {
          id: "pigeonhole",
          name: "Pigeonhole Principle",
          latex: String.raw`n \text{ objects in } k \text{ boxes} \implies \text{some box holds} \ge \left\lceil \tfrac{n}{k} \right\rceil \text{ and some holds} \le \left\lfloor \tfrac{n}{k} \right\rfloor, \qquad n > k(r-1) \implies \text{some box holds} \ge r`,
          description: String.raw`If $n$ objects go into $k$ boxes, some box holds at least $\lceil n/k \rceil$ (and some holds at most $\lfloor n/k \rfloor$). The whole difficulty is choosing the boxes: residues mod $m$, pairs summing to a target, sub-regions of a shape, or the averaging form ("some term is at least the mean"). Generalization: more than $km$ objects force some box to exceed $m$.`,
          keywords: ["pigeonhole", "boxes", "guarantee", "at least two", "ceiling", "at least one shared", "residues", "averaging argument", "dirichlet"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME", "Olympiad"]
        },
        {
          id: "handshake-lemma",
          name: "Handshake Lemma",
          latex: String.raw`\sum_{v} \deg(v) = 2E`,
          description: String.raw`Every edge contributes two degree-endpoints, so the total degree is even — hence the number of odd-degree vertices is even. The prototype double-count.`,
          keywords: ["graph", "degrees", "edges", "double counting", "handshakes"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "ramsey-33",
          name: "Ramsey Number $R(3,3) = 6$",
          latex: String.raw`R(3, 3) = 6`,
          description: String.raw`Among any 6 people, some 3 are mutual friends or mutual strangers — and 6 is minimal. Proof: pigeonhole on one person's 5 relationships.`,
          keywords: ["ramsey", "friends strangers", "party problem", "coloring edges"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "erdos-szekeres",
          name: "Erdős–Szekeres Theorem",
          latex: String.raw`mn+1 \text{ distinct terms} \Rightarrow \text{a monotone run of length } m+1 \text{ or } n+1`,
          description: String.raw`A pigeonhole gem: label each term with the pair (longest increasing run ending there, longest decreasing run ending there). Distinct terms force distinct labels, so with only $m \cdot n$ possible labels among $mn+1$ terms two would collide — impossible — hence some coordinate reaches $m+1$ or $n+1$. Taking $m = n$: any $n^2 + 1$ distinct reals contain a monotone subsequence of length $n + 1$. The natural companion to the Pigeonhole Principle for "there must exist a long monotone run" problems.`,
          keywords: ["erdos szekeres", "monotone subsequence", "increasing decreasing", "pigeonhole application", "longest run"],
          importance: "low",
          level: ["Olympiad"]
        }
      ]
    },
    {
      title: "Graph Theory",
      formulas: [
        {
          id: "cayleys-formula",
          name: "Cayley's Formula",
          latex: String.raw`\#\{\text{trees on } n \text{ labeled vertices}\} = n^{\,n-2}`,
          description: String.raw`The number of distinct trees (connected, cycle-free networks) on $n$ distinguishable vertices. Proved by the Prüfer bijection: each tree corresponds to a unique sequence of $n-2$ vertex labels, and vice versa.`,
          keywords: ["labeled trees", "cayley", "prufer", "spanning trees", "networks"],
          importance: "lower",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "eulerian-paths",
          name: "Eulerian Paths & Circuits",
          latex: String.raw`\text{circuit} \iff \text{all degrees even}; \quad \text{path} \iff \text{exactly two odd}`,
          description: String.raw`For a connected graph: a route tracing every edge exactly once and returning to the start exists iff every vertex has even degree; a one-way trace exists iff exactly two vertices are odd (they must be the endpoints). The classic "draw without lifting your pencil" criterion.`,
          keywords: ["eulerian", "trace without lifting", "even degree", "bridges", "draw one stroke"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "planar-graph-bound",
          name: "Planar Graph Edge Bound",
          latex: String.raw`e \le 3v - 6 \quad (v \ge 3), \qquad e \le 2v - 4 \ \text{ (triangle-free / bipartite)}`,
          description: String.raw`A corollary of Euler's formula $v - e + f = 2$ (see Euler's Polyhedron Formula, under Geometry): each face of a simple planar graph is bounded by $\ge 3$ edges and each edge borders $2$ faces, so $2e \ge 3f$; substituting bounds the edges. It is the fast non-planarity test: $K_5$ has $v=5, e=10 > 3(5)-6 = 9$, and $K_{3,3}$ (triangle-free) has $e = 9 > 2(6)-4 = 8$ — so neither can be drawn without crossings.`,
          keywords: ["planar graph", "edge bound", "euler formula corollary", "non-planar", "k5 k33", "3v-6", "faces edges"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "halls-marriage",
          name: "Hall's Marriage Theorem",
          latex: String.raw`\text{a matching saturates } X \iff |N(S)| \ge |S| \text{ for every } S \subseteq X`,
          description: String.raw`A set of "applicants" $X$ can each be matched to a distinct "job" they're connected to iff no group of applicants collectively wants fewer jobs than its size — Hall's condition. The obstruction is always a single deficient set $S$ with $|N(S)| \lt  |S|$. It is the go-to existence tool for systems of distinct representatives, Latin-square completions, and "can we pair these up?" problems; a regular bipartite graph always satisfies it, so it has a perfect matching.`,
          keywords: ["halls theorem", "marriage theorem", "bipartite matching", "system of distinct representatives", "hall condition", "perfect matching"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "konigs-theorem",
          name: "Kőnig's Theorem",
          latex: String.raw`\text{bipartite: max matching} = \text{min vertex cover}`,
          description: String.raw`In bipartite graphs the largest set of independent edges equals the smallest set of vertices touching every edge — a min-max duality that is the dual of Hall's theorem (and a special case of max-flow/min-cut). Its complement form (Kőnig–Egerváry): the maximum independent set equals $n$ minus the maximum matching. The go-to tool for covering/packing problems on grids and bipartite structures — e.g. the fewest lines covering all the rooks / marked cells of a board.`,
          keywords: ["konig theorem", "max matching min vertex cover", "bipartite duality", "egervary", "cover marked cells", "lines covering board"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "turans-theorem",
          name: "Turán's Theorem",
          latex: String.raw`K_{r+1}\text{-free graph on } n \text{ vertices} \;\Rightarrow\; e \le \left(1 - \frac{1}{r}\right)\frac{n^2}{2}`,
          description: String.raw`The maximum number of edges in a graph with no $(r{+}1)$-clique, achieved uniquely by the Turán graph — the complete $r$-partite graph with parts as equal as possible. The case $r = 2$ (triangle-free) is Mantel's theorem: at most $\lfloor n^2/4\rfloor$ edges, the balanced complete bipartite graph. The foundational result of extremal graph theory.`,
          keywords: ["turan theorem", "extremal graph theory", "clique free", "mantel theorem", "triangle free max edges", "turan graph"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "graph-coloring",
          name: "Graph Coloring Bounds",
          latex: String.raw`\chi(G) \le \Delta + 1 \ (\text{greedy}), \qquad G \text{ bipartite} \iff \chi = 2 \iff \text{no odd cycle}, \qquad G \text{ planar} \Rightarrow \chi \le 4`,
          description: String.raw`The chromatic number $\chi(G)$ is the fewest colors for a proper vertex coloring. The greedy bound $\chi \le \Delta + 1$ (order the vertices, color each with the least free color) is tight only for complete graphs and odd cycles (Brooks' theorem rules out equality otherwise). Two colors suffice exactly when there's no odd cycle (bipartite), and every planar graph is $4$-colorable (the Four Color Theorem).`,
          keywords: ["graph coloring", "chromatic number", "greedy bound delta plus one", "bipartite two color", "odd cycle", "four color theorem", "brooks"],
          importance: "low",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "matrix-tree-theorem",
          name: "Matrix–Tree Theorem (Kirchhoff)",
          latex: String.raw`\#\{\text{spanning trees}\} = \text{any cofactor of } L, \qquad L = D - A`,
          description: String.raw`The number of spanning trees of a graph equals any cofactor of its Laplacian $L = D - A$ (degree matrix minus adjacency matrix) — equivalently $\frac{1}{n}\lambda_1\lambda_2\cdots\lambda_{n-1}$, the product of the nonzero Laplacian eigenvalues over $n$. It turns a hard enumeration into one determinant, and specializing to $K_n$ recovers Cayley's $n^{n-2}$.`,
          keywords: ["matrix tree theorem", "kirchhoff", "spanning trees", "laplacian", "cofactor determinant", "degree minus adjacency", "eigenvalues"],
          importance: "lower",
          level: ["Olympiad"]
        },
        {
          id: "lgv-lemma",
          name: "Lindström–Gessel–Viennot Lemma",
          latex: String.raw`\#\{\text{non-intersecting path systems } a_i \to b_i\} = \det\big[\, M_{ij} \,\big], \quad M_{ij} = \#\{\text{paths } a_i \to b_j\}`,
          description: String.raw`In a directed acyclic graph, the signed count of families of pairwise non-intersecting paths from sources $a_i$ to sinks $b_i$ equals the determinant of the matrix of single-path counts $M_{ij}$. When the only non-crossing configuration matches sources to sinks in order, the determinant is the plain count — the standard route to product formulas for plane partitions, Young tableaux, and non-crossing lattice paths.`,
          keywords: ["lindstrom gessel viennot", "lgv lemma", "non-intersecting paths", "determinant of paths", "lattice paths", "plane partitions", "young tableaux"],
          importance: "lower",
          level: ["Olympiad"]
        }
      ]
    }
  ]
});
