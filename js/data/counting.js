// Counting & probability: combinatorics basics, binomial identities, distributions, advanced counting, probability, pigeonhole.
window.MATH_SECTIONS = window.MATH_SECTIONS || [];

window.MATH_SECTIONS.push({
  id: "counting",
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
          id: "complementary-counting",
          name: "Complementary Counting",
          type: "method",
          latex: String.raw`\#(\text{good}) = \#(\text{total}) - \#(\text{bad})`,
          description: String.raw`When "at least one" or a messy condition appears, count the opposite. The probability version: $P(\text{at least one}) = 1 - P(\text{none})$.`,
          keywords: ["at least one", "complement", "opposite", "total minus bad"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "counting-blocks",
          name: "Grouping Method",
          latex: String.raw`\text{glue a must-stay-together group into one block, then arrange inside it}`,
          description: String.raw`For "A and B must sit together": treat them as one unit ($(n-1)!$ arrangements) times orderings within the block ($2!$). Separations use gap-placement: arrange the rest, then choose gaps.`,
          keywords: ["together", "adjacent", "glue", "gap method", "not adjacent", "block method"],
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
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "subset-sum-facts",
          name: "Subset-Sum Facts",
          latex: String.raw`\sum_{S\subseteq A}\ \sum_{x\in S} x \;=\; 2^{\,n-1}\sum_{x\in A} x`,
          description: String.raw`An $n$-element set has $2^n$ subsets, and each element lies in exactly half of them ($2^{n-1}$), so the sum of all subset sums is $2^{n-1}$ times the total of $A$. If $A$ has at least one odd element, exactly half the subsets ($2^{n-1}$) have an even sum — pairing each subset with its symmetric difference against that odd element is a bijection between even-sum and odd-sum subsets. (The separate subset-size parity fact — equally many even- and odd-sized subsets — is the $x=1,\,y=-1$ binomial identity.)`,
          example: String.raw`$A=\{1,2,3\}$: the sum of all subset sums is $2^{2}(1+2+3)=24$, and exactly $2^{2}=4$ of the $8$ subsets have an even sum ($\varnothing,\ \{2\},\ \{1,3\},\ \{1,2,3\}$).`,
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
          example: String.raw`$\binom{2}{2} + \binom{3}{2} + \binom{4}{2} + \binom{5}{2} = 1 + 3 + 6 + 10 = 20 = \binom{6}{3}$ — the triangular numbers stack into a tetrahedral number.`,
          keywords: ["hockey stick", "diagonal sum", "christmas stocking", "hockey stick identity", "christmas stocking identity", "diagonal sum in pascal"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "vandermonde",
          name: "Vandermonde's Identity",
          latex: String.raw`\sum_{k=0}^{r} \binom{m}{k}\binom{n}{r-k} = \binom{m+n}{r}, \qquad \binom{m}{0}\binom{n}{r} + \binom{m}{1}\binom{n}{r-1} + \cdots + \binom{m}{r}\binom{n}{0} = \binom{m+n}{r}`,
          description: String.raw`Choose $r$ from a group of $m + n$ by splitting on how many come from the first group. Special case: $\sum_k \binom{n}{k}^2 = \binom{2n}{n}$.`,
          example: String.raw`Pick 3 people from 5 men and 4 women. Split by the number of men chosen: $$\binom{5}{0}\binom{4}{3} + \binom{5}{1}\binom{4}{2} + \binom{5}{2}\binom{4}{1} + \binom{5}{3}\binom{4}{0} = 4 + 30 + 40 + 10 = 84 = \binom{9}{3}.$$ Every committee is counted exactly once on each side.`,
          keywords: ["vandermonde", "convolution", "sum of squares of binomials", "central binomial"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "committee-chair",
          name: "Committee–Chair Identity",
          latex: String.raw`k\binom{n}{k} = n\binom{n-1}{k-1}, \qquad \sum_{k=0}^{n} k\binom{n}{k} = n \cdot 2^{n-1}`,
          description: String.raw`Pick a committee with a chair two ways: committee first or chair first. Differentiating $(1+x)^n$ gives the sum version.`,
          example: String.raw`$n = 4$: $\;1\binom{4}{1} + 2\binom{4}{2} + 3\binom{4}{3} + 4\binom{4}{4} = 4 + 12 + 12 + 4 = 32 = 4 \cdot 2^3$. ✓`,
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
          example: String.raw`$n = 3$: $\;\sum k^2\binom{3}{k} = 0 + 1\cdot3 + 4\cdot3 + 9\cdot1 = 24 = 3 \cdot 4 \cdot 2^{1}$. ✓`,
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
          example: String.raw`$x + y + z = 5$ with $x, y, z \ge 0$: $\binom{5+2}{2} = 21$. Each solution is a row of 5 stars and 2 bars, e.g. $\star\star\,|\,\star\,|\,\star\star \leftrightarrow (2,1,2)$ — and there are $\binom{7}{2}$ ways to place the bars among 7 symbols.`,
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
          description: String.raw`The complete map for distributing $n$ balls into $k$ boxes (the "Twelvefold Way"), split by whether the balls are distinguishable, whether the boxes are, and whether empty boxes are allowed. Here $S(n,k)$ is the Stirling number of the second kind, $B_n=\sum_j S(n,j)$ the Bell number, and $p_k(n)$ / $p_{\le k}(n)$ count partitions of $n$ into exactly / at most $k$ positive parts. Reading the table: dist→dist any assignment is $k^n$, onto (no box empty) is the surjection count $k!\,S(n,k)=\sum_{i=0}^{k}(-1)^i\binom{k}{i}(k-i)^n$; ident→dist is stars and bars $\binom{n+k-1}{k-1}$, each box $\ge 1$ is $\binom{n-1}{k-1}$; dist→ident is $S(n,k)$ (exactly $k$ nonempty groups) or the Bell number $B_n$ (any number of boxes); ident→ident is integer partitions, which have no closed form — enumerate. To handle constraints: a minimum $m_i$ per box — hand out the minimums first and distribute the remaining $n-\sum m_i$ with no restriction (substitute $x_i\mapsto x_i-m_i$); an upper cap $x_i\le c$ — inclusion–exclusion, subtracting cases where a box overflows (give it $c+1$ first, then alternate signs); at most one ball per box — just choose the boxes, $\binom{k}{n}$ (identical balls) or $\binom{k}{n}n!=k(k-1)\cdots(k-n+1)$ (distinct balls).`,
          keywords: ["twelvefold way", "balls in boxes", "distributions", "distinguishable", "indistinguishable", "identical objects", "stars and bars", "stirling numbers second kind", "bell number", "integer partitions", "surjections onto", "minimum per box", "upper bound cap per box", "inclusion exclusion distribution", "at most one per box", "no empty box", "distribute objects"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Advanced Counting",
      formulas: [
        {
          id: "pie",
          name: "Principle of Inclusion-Exclusion (PIE)",
          type: "method",
          latex: String.raw`|A_1 \cup \cdots \cup A_n| = \sum |A_i| - \sum |A_i \cap A_j| + \sum |A_i \cap A_j \cap A_k| - \cdots`,
          description: String.raw`Two sets: $|A \cup B| = |A| + |B| - |A \cap B|$. Three sets: add singles, subtract pairs, add the triple.`,
          example: String.raw`How many of $1, \dots, 30$ are divisible by 2, 3, or 5? $\;15 + 10 + 6 - 5 - 3 - 2 + 1 = 22$ (subtract the pairwise overlaps $6, 10, 15$; add back multiples of $30$).`,
          keywords: ["inclusion exclusion", "union", "overlap", "venn"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "derangements",
          name: "Derangements",
          latex: String.raw`D_n = n! \sum_{k=0}^{n} \frac{(-1)^k}{k!} = \left[\frac{n!}{e}\right] \;(\text{nearest integer})`,
          description: String.raw`Permutations with no fixed point. $D_1 = 0, D_2 = 1, D_3 = 2, D_4 = 9, D_5 = 44$; recurrence $D_n = (n-1)(D_{n-1} + D_{n-2})$. As $n \to \infty$, $P(\text{derangement}) \to \frac{1}{e}$.`,
          example: String.raw`$n = 3$: of the $6$ orderings of $123$, only $231$ and $312$ move every element. Formula: $3!\left(1 - 1 + \frac{1}{2} - \frac{1}{6}\right) = 2$. ✓`,
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
          example: String.raw`Choose 3 of 8 chairs in a row, no two adjacent: $\binom{6}{3} = 20$. Around a circular table: $\frac{8}{5}\binom{5}{3} = 16$.`,
          keywords: ["no two adjacent", "nonadjacent", "gap method", "circular selection", "spacing"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "catalan-numbers",
          name: "Catalan Numbers",
          latex: String.raw`C_n = \frac{1}{n+1}\binom{2n}{n} = \binom{2n}{n} - \binom{2n}{n+1}`,
          description: String.raw`$1, 1, 2, 5, 14, 42, 132, \dots$ Counts balanced parenthesizations, monotone lattice paths not crossing the diagonal, triangulations of an $(n{+}2)$-gon, and binary trees. Recurrence: $C_{n+1} = \sum C_i C_{n-i}$.`,
          example: String.raw`$C_3 = \frac{1}{4}\binom{6}{3} = 5$: the five ways to balance 3 pairs of parentheses are ((())), (()()), (())(), ()(()), ()()().`,
          keywords: ["catalan", "balanced parentheses", "dyck paths", "triangulations", "ballot"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "ballot-problem",
          name: "The Ballot Problem",
          latex: String.raw`P(A \text{ always strictly ahead}) = \frac{a - b}{a + b}`,
          description: String.raw`If A gets $a$ votes and B gets $b < a$, this is the probability A leads throughout the count. Proved by the reflection principle — the same trick behind Catalan path-counting.`,
          example: String.raw`$a = 2, b = 1$: the three count orders are AAB (A always ahead ✓), ABA (tied after two votes ✗), BAA (✗). Probability $\frac{1}{3} = \frac{2-1}{2+1}$. ✓`,
          keywords: ["ballot", "reflection principle", "always ahead", "random walk"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "reflection-principle",
          name: "The Reflection Principle",
          type: "method",
          latex: String.raw`\#\{\text{paths crossing the barrier}\} = \#\{\text{paths to the reflected endpoint}\}`,
          description: String.raw`To count lattice paths (or $\pm1$ walks) that must avoid a boundary, count the bad ones instead: reflect the portion of each barrier-touching path after its first touch, giving a bijection with unrestricted paths to a mirrored endpoint. Subtract. This one bijection generates the Catalan numbers and the ballot theorem.`,
          example: String.raw`Paths $(0,0) \to (5,3)$ in unit R/U steps that never go strictly above $y = x$: total $\binom{8}{3} = 56$ minus bad ones $\binom{8}{2} = 28$ (reflect across $y = x + 1$, landing at the mirror of the endpoint), leaving $28$.`,
          keywords: ["reflection", "bad paths", "barrier", "bijection", "catalan proof", "ballot", "method"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "fibonacci-tilings",
          name: "Tiling Recurrences",
          latex: String.raw`a_n = a_{n-1} + a_{n-2}`,
          description: String.raw`Tilings of a $1 \times n$ strip with $1 \times 1$ and $1 \times 2$ tiles are Fibonacci; binary strings with no two consecutive 1s likewise. Condition on the last piece to build a recurrence — the standard attack for structured sequences.`,
          keywords: ["tilings", "recursion", "no two adjacent", "binary strings", "states", "state counting"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "generating-functions",
          name: "Generating Functions",
          latex: String.raw`\frac{1}{(1-x)^k} = \sum_{n \ge 0} \binom{n + k - 1}{k - 1} x^n, \qquad \frac{1}{1-x} = 1 + x + x^2 + \cdots, \qquad \frac{1}{(1-x)^2} = 1 + 2x + 3x^2 + \cdots`,
          description: String.raw`Encode choices as polynomial factors and multiply: the coefficient of $x^n$ counts ways to total $n$. Dice sums use $(x + x^2 + \cdots + x^6)^2$; coin/stamp problems use $\frac{1}{1 - x^a}$ factors. The identity shown is stars and bars in disguise.`,
          keywords: ["generating function", "coefficient of x^n", "dice sums", "encode choices"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "exponential-generating-functions",
          name: "Exponential Generating Functions (EGF)",
          latex: String.raw`\hat A(x) = \sum_{n \ge 0} a_n \frac{x^n}{n!}, \qquad \widehat{A \cdot B}(x) = \hat A(x)\,\hat B(x) \;\Rightarrow\; c_n = \sum_k \binom{n}{k} a_k\, b_{n-k}`,
          description: String.raw`The tool for labeled structures, where ordinary GFs fail. Dividing by $n!$ makes multiplication carry the binomial coefficient automatically, so the product of two EGFs is the "labeled product" (choose which labels go to each part). Dictionary: $e^x$ = one set (all present), $e^x - 1$ = nonempty set, $\frac{1}{1-x}$ = a sequence/list, and the exponential formula $\hat{\text{whole}} = \exp(\hat{\text{connected}})$ counts structures built from connected pieces (permutations by cycle type, set partitions, labeled graphs).`,
          keywords: ["exponential generating function", "egf", "labeled structures", "exponential formula", "labeled product", "e^x set", "cycle index", "derangements egf"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "zeckendorf-theorem",
          name: "Zeckendorf's Theorem",
          latex: String.raw`n = F_{k_1} + F_{k_2} + \cdots + F_{k_r}, \qquad k_1 \gg k_2 \gg \cdots \;(k_i \ge k_{i+1} + 2)`,
          description: String.raw`Every positive integer has a unique representation as a sum of non-consecutive Fibonacci numbers (no two adjacent $F_i$). You build it greedily: repeatedly subtract the largest Fibonacci number $\le n$. This gives a canonical "Fibonacci base," underlies Fibonacci nim and Wythoff's game, and turns "represent $n$ with Fibonacci numbers" counting problems into digit arguments on the Zeckendorf string.`,
          keywords: ["zeckendorf", "fibonacci representation", "non consecutive fibonacci", "fibonacci base", "greedy fibonacci", "wythoff", "unique representation"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "moser-circle",
          name: "Moser's Circle (Regions from Chords)",
          latex: String.raw`R(n) = \binom{n}{4} + \binom{n}{2} + 1 = 1,\ 2,\ 4,\ 8,\ 16,\ \mathbf{31},\ 57,\ \ldots`,
          description: String.raw`The famous "powers of 2" trap. Put $n$ points on a circle and draw all $\binom n2$ chords (with no three crossing at one interior point); the number of regions is $\binom n4 + \binom n2 + 1$, not $2^{n-1}$. It agrees — $1, 2, 4, 8, 16$ — right up to $n = 5$, then breaks to $\mathbf{31}$ (not $32$) at $n = 6$. The count drops out of Euler's $V - E + F = 2$: each set of $4$ points gives one interior crossing ($\binom n4$ vertices). The perfect cautionary tale against extrapolating a pattern from five cases.`,
          keywords: ["moser circle", "regions from chords", "points on a circle", "1 2 4 8 16 31", "not powers of two", "chord regions", "euler formula regions", "pattern trap"],
          importance: "low",
          level: ["AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Symmetry, Partitions & Posets",
      formulas: [
        {
          id: "burnsides-lemma",
          name: "Burnside's Lemma",
          type: "method",
          latex: String.raw`\#\text{orbits} = \frac{1}{|G|} \sum_{g \in G} |\mathrm{Fix}(g)|`,
          description: String.raw`Distinct colorings under symmetry = average number of colorings fixed by each symmetry. E.g. colorings of a cube's faces with $k$ colors: $\frac{k^6 + 3k^4 + 12k^3 + 8k^2}{24}$.`,
          example: String.raw`2-color the corners of a square, rotations only. Fixed colorings: identity $2^4 = 16$; rotations by $90^\circ$ and $270^\circ$ fix $2$ each; $180^\circ$ fixes $2^2 = 4$. Answer: $\frac{16 + 2 + 4 + 2}{4} = 6$ distinct colorings.`,
          keywords: ["burnside", "symmetry", "orbits", "colorings", "rotations", "necklace"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "polya-enumeration",
          name: "Pólya Enumeration Theorem",
          type: "method",
          latex: String.raw`\#\text{colorings up to } G = Z_G(m, m, \ldots) = \frac{1}{|G|}\sum_{g \in G} m^{\,c(g)}, \qquad Z_G = \frac{1}{|G|}\sum_{g} \prod_k t_k^{\,c_k(g)}`,
          description: String.raw`The refinement of Burnside's lemma that tracks how many of each color are used, via the group's cycle index $Z_G$ (average over group elements of $\prod t_k^{c_k}$, where $c_k$ counts $k$-cycles). Substituting $t_k = x^k + y^k + \cdots$ produces a generating function whose coefficients count colorings with a prescribed color distribution — necklaces with "3 red, 2 blue," and the like. Plain Burnside is $t_k \mapsto m$.`,
          keywords: ["polya enumeration", "cycle index", "burnside refinement", "necklace coloring", "color distribution", "counting up to symmetry"],
          importance: "lowest",
          level: ["Olympiad"]
        },
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
          name: "Integer Partitions",
          latex: String.raw`p(n): \; 1, 2, 3, 5, 7, 11, 15, 22, 30, 42, \dots, \qquad \#\{\text{compositions of } n\} = 2^{n-1}`,
          description: String.raw`Ways to write $n$ as an unordered sum of positive integers. Partitions into odd parts = partitions into distinct parts (Euler). Compositions (ordered sums) of $n$: $2^{n-1}$.`,
          keywords: ["partition", "unordered sum", "compositions", "distinct parts"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "stirling-bell",
          name: "Stirling Numbers of the Second Kind & Bell Numbers",
          latex: String.raw`S(n, k) = k \cdot S(n-1, k) + S(n-1, k-1), \qquad B_n = \sum_k S(n, k)`,
          description: String.raw`$S(n,k)$ = ways to partition $n$ labeled objects into $k$ nonempty unlabeled groups; $B_n$ = all set partitions ($1, 1, 2, 5, 15, 52, 203, \dots$). Surjections $n \to k$: $k!\, S(n,k)$.`,
          example: String.raw`$S(3,2) = 3$: split $\{1,2,3\}$ into two nonempty groups as $\{1,2\}\{3\}$, $\{1,3\}\{2\}$, or $\{2,3\}\{1\}$. Then $B_3 = S(3,1) + S(3,2) + S(3,3) = 1 + 3 + 1 = 5$.`,
          keywords: ["set partitions", "stirling", "bell", "surjections", "onto functions"],
          importance: "low",
          level: ["AIME", "Olympiad"]
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
          id: "losing-positions",
          name: "Losing Positions",
          type: "method",
          latex: String.raw`L = \{\,n : \text{every move leads to a winning position}\,\}`,
          description: String.raw`In a take-away game, a position is losing (for the player to move) exactly when every available move hands the opponent a winning position. Compute $L$/$W$ labels upward from $0$ — the pattern is eventually periodic with period related to the move sizes — then count or exploit the cycle.`,
          example: String.raw`(2024 AIME I #3) Players remove $1$ or $4$ tokens; last token wins. Labeling from $n = 0$: the losing positions are $n \equiv 0, 2 \pmod 5$. The second player wins exactly at those $n$, and there are $404 + 405 = 809$ such $n \le 2024$.`,
          keywords: ["game", "nim", "p positions", "winning strategy", "periodic pattern", "take away", "method", "game analysis"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
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
          example: String.raw`Expected number of fixed points of a random permutation of $n$ items: each position is fixed with probability $\frac{1}{n}$, so $E = n \cdot \frac{1}{n} = 1$ — regardless of $n$, even though the events are dependent.`,
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
          example: String.raw`Alternating die rolls, first 6 wins: $p = q = \frac{1}{6}$ gives $P = \frac{1/6}{1/6 + 1/6 - 1/36} = \frac{6}{11}$ for the player who rolls first.`,
          keywords: ["alternating turns", "first player wins", "geometric series game", "coin game", "dice game"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "geometric-probability",
          name: "Geometric Probability",
          latex: String.raw`P = \dfrac{\text{favorable length / area / volume}}{\text{total length / area / volume}}`,
          description: String.raw`For continuous uniform choices, draw the region. Classic: two points in $[0,1]$ are within $d$ of each other with probability $1 - (1-d)^2$; "broken stick makes a triangle" is $\frac{1}{4}$.`,
          keywords: ["area probability", "continuous", "uniform random", "broken stick", "meet"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "states-recursion-prob",
          name: "Probability States / First-Step Analysis",
          latex: String.raw`p_{\text{state}} = \sum_{\text{moves}} P(\text{move}) \cdot p_{\text{next state}}`,
          description: String.raw`Name a probability variable per state, write one equation per state by conditioning on the first step, and solve the linear system. Handles random walks, games to $n$ wins, and gambler's ruin ($P = \frac{a}{a+b}$ for a fair walk).`,
          keywords: ["markov", "random walk", "recursive probability", "gambler's ruin", "first step"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "symmetry-probability",
          name: "Symmetry Arguments",
          latex: String.raw`\text{by symmetry every position is equally likely}`,
          description: String.raw`In a random arrangement, any particular position is equally likely to hold any particular item — ignore the reveal order. Many "conditional" setups collapse instantly under symmetry.`,
          keywords: ["by symmetry", "equally likely", "random order", "shortcut"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
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
          id: "birthday-collision",
          name: "Birthday-Style Collision Probability",
          latex: String.raw`P(\text{all } k \text{ distinct}) = \prod_{i=0}^{k-1} \frac{n - i}{n} = \frac{n(n-1)\cdots(n-k+1)}{n^k}`,
          description: String.raw`Probability that $k$ independent uniform choices among $n$ options are all different; collision probability is the complement. With $n = 365$, it drops below $\frac{1}{2}$ at $k = 23$.`,
          keywords: ["birthday problem", "all different", "collision", "at least two share"],
          importance: "medium",
          level: ["AMC10", "AMC12"]
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
          importance: "lower",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "order-statistics",
          name: "Order Statistics on $[0, 1]$",
          latex: String.raw`E[\max] = \frac{n}{n+1}, \qquad E[\min] = \frac{1}{n+1}, \qquad E[\text{gap}] = \frac{1}{n+1}, \qquad P(\max \le x) = x^n, \qquad E[\max - \min] = \frac{n - 1}{n + 1}, \qquad \text{discrete: } k \text{ draws from } \{1, \dots, n\} \Rightarrow E[\max] = \frac{k(n+1)}{k+1}`,
          description: String.raw`Choose $n$ numbers independently and uniformly from $[0,1]$: sorted, they sit on average at $\frac{1}{n+1}, \frac{2}{n+1}, \dots, \frac{n}{n+1}$ — the $n+1$ gaps are exchangeable, so each expects $\frac{1}{n+1}$. Also $P(\max \le x) = x^n$ and $E[\max - \min] = \frac{n-1}{n+1}$.`,
          example: String.raw`Three random reals in $[0,1]$: the expected largest is $\frac{3}{4}$, the expected smallest $\frac{1}{4}$, and the expected middle one $\frac{2}{4} = \frac{1}{2}$.`,
          keywords: ["expected maximum", "expected minimum", "uniform random", "sorted", "gaps", "spacings", "expected range"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "total-expectation",
          name: "Law of Total Expectation",
          latex: String.raw`E[X] = \sum_i P(A_i)\, E[X \mid A_i], \qquad E[\text{total}] = E[N] \cdot E[X]`,
          description: String.raw`Partition the sample space into cases $A_i$: the overall expectation is the probability-weighted average of the case expectations. For a random number $N$ of i.i.d. contributions, Wald's identity gives $E[\text{total}] = E[N] \cdot E[X]$.`,
          example: String.raw`Roll a die, then flip that many coins: $E[\text{heads}] = \sum_{k=1}^{6}\frac{1}{6}\cdot\frac{k}{2} = \frac{1}{2}\cdot\frac{7}{2} = \frac{7}{4}$.`,
          keywords: ["conditional expectation", "tower rule", "casework expectation", "weighted average", "first step", "wald"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "polyhedron-walks",
          name: "Random Walks on a Graph (State Collapse)",
          latex: String.raw`\text{cube corner} \to \text{opposite: } E[\text{steps}] = 10; \quad \text{tetrahedron return: } \tfrac14 + \tfrac34\left(-\tfrac13\right)^n`,
          description: String.raw`A particle hops to a random neighbor each step (a Markov chain on the graph). The universal move is to collapse symmetric vertices into a few states, then write one linear equation per state: condition on the first step for a probability, or add $1$ per step for an expected hitting/return time. On a cube, group the $8$ vertices by distance from the start ($0,1,2,3$ edges away) into $4$ states; on a tetrahedron the return probability even has the closed form above. Two cube facts worth knowing: a walk from a corner reaches the opposite corner in an expected $10$ steps, and the expected return time to the start is $8$ (for any regular graph the mean return time to a vertex is $\frac{2|E|}{\deg}$). First-step analysis is the same idea for general state problems.`,
          example: String.raw`Cube, expected steps to the opposite corner: let $e_k$ be the expectation from distance $k$. Then $e_3=0$, $e_2=1+\tfrac23 e_1$, $e_1=1+\tfrac13 e_0+\tfrac23 e_2$, $e_0=1+e_1$. Solving gives $e_1=3+\tfrac35 e_0$ and $e_0=4+\tfrac35 e_0$, so $e_0=\mathbf{10}$.`,
          keywords: ["random walk", "markov chain", "ant on a cube", "expected steps", "hitting time", "expected return time", "cube vertices", "tetrahedron", "return probability", "states symmetry", "random walk on a graph"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "gamblers-ruin",
          name: "Gambler's Ruin",
          latex: String.raw`P(\text{reach } N \text{ from } a) = \frac{a}{N} \;\text{(fair)}, \qquad \frac{1 - (q/p)^a}{1 - (q/p)^N} \;\text{(win prob } p, \text{ lose } q)`,
          description: String.raw`A walker at $a$ steps $+1$ with probability $p$ and $-1$ with probability $q = 1-p$, stopping at $0$ or $N$. Fair play makes the success chance proportional to the bankroll ($\frac{a}{N}$), with expected duration $a(N-a)$ steps; biased play replaces linearity with a geometric profile in $\frac{q}{p}$. Both come from solving the one-step recursion.`,
          example: String.raw`$p = \frac{2}{3}$ (so $\frac{q}{p} = \frac{1}{2}$), start $a = 1$, target $N = 3$: $P = \frac{1 - \frac{1}{2}}{1 - \frac{1}{8}} = \frac{4}{7}$.`,
          keywords: ["gamblers ruin", "biased walk", "reach target", "absorbing barriers", "bankroll", "expected duration"],
          importance: "lower",
          level: ["AIME"]
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
          latex: String.raw`n + 1 \text{ pigeons in } n \text{ holes} \implies \text{some hole has} \ge 2; \quad \text{general: some hole has} \ge \left\lceil \frac{m}{n} \right\rceil`,
          description: String.raw`Existence proofs from counting. Classic setups: residues mod $n$ as holes, or pairing $\{1, 2\}, \{3, 4\}, \dots$ as holes.`,
          keywords: ["pigeonhole", "boxes", "guarantee", "at least two", "ceiling"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
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
          id: "double-counting",
          name: "Double Counting",
          latex: String.raw`\text{count one set two ways, then equate}`,
          description: String.raw`Count incidences by rows and by columns. E.g. in any tournament, $\sum \binom{w_i}{2}$ counts "dominated pairs" — comparing to $\binom{n}{3}$ counts cyclic triangles.`,
          keywords: ["count two ways", "incidence", "tournament", "rows columns", "committee counting"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
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
          example: String.raw`$n = 4$: $4^2 = 16$ labeled trees — the $4$ star-shaped ones plus the $12$ paths ($\frac{4!}{2}$ orderings up to reversal). ✓`,
          keywords: ["labeled trees", "cayley", "prufer", "spanning trees", "networks"],
          importance: "lower",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "eulerian-paths",
          name: "Eulerian Paths & Circuits",
          latex: String.raw`\text{circuit} \iff \text{all degrees even}; \quad \text{path} \iff \text{exactly two odd}`,
          description: String.raw`For a connected graph: a route tracing every edge exactly once and returning to the start exists iff every vertex has even degree; a one-way trace exists iff exactly two vertices are odd (they must be the endpoints). The classic "draw without lifting your pencil" criterion.`,
          example: String.raw`The Königsberg bridge graph has four odd-degree vertices, so no walk crosses every bridge exactly once. A five-pointed star traces in one closed stroke because every vertex has even degree (points have degree 2, crossings degree 4).`,
          keywords: ["eulerian", "trace without lifting", "even degree", "bridges", "draw one stroke"],
          importance: "medium",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "plane-regions",
          name: "Regions from Lines and Circles",
          latex: String.raw`R_{\text{lines}} = \frac{n^2 + n + 2}{2}, \qquad R_{\text{circles}} = n^2 - n + 2`,
          description: String.raw`Maximum regions from $n$ lines (no two parallel, no three concurrent) or $n$ circles (each pair meeting twice). Incremental principle: each new curve adds one region per crossing plus one — which is also how region-counting problems with expected values decompose.`,
          example: String.raw`$n = 4$ lines: $\frac{16 + 4 + 2}{2} = 11$ regions; $4$ circles: $16 - 4 + 2 = 14$ regions.`,
          keywords: ["regions", "lazy caterer", "pancake", "lines divide plane", "circles divide plane"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
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
          description: String.raw`A set of "applicants" $X$ can each be matched to a distinct "job" they're connected to iff no group of applicants collectively wants fewer jobs than its size — Hall's condition. The obstruction is always a single deficient set $S$ with $|N(S)| < |S|$. It is the go-to existence tool for systems of distinct representatives, Latin-square completions, and "can we pair these up?" problems; a regular bipartite graph always satisfies it, so it has a perfect matching.`,
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
    },
    {
      title: "Problem-Solving Methods",
      formulas: [
        {
          id: "casework-method",
          name: "Casework",
          type: "method",
          latex: String.raw`\#(\text{total}) = \#(\text{case } 1) + \#(\text{case } 2) + \cdots \quad (\text{disjoint and exhaustive})`,
          description: String.raw`Split on a decisive feature — the largest element, the leading digit, the position of the special object, a parity. The two failure modes are overlapping cases (double count) and missed cases (undercount); choose the splitting feature so each object lands in exactly one case. Switch to complementary counting when the cases explode.`,
          keywords: ["casework", "split into cases", "disjoint", "exhaustive", "organize the count", "method"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "pigeonhole-principle",
          name: "Pigeonhole Principle",
          type: "method",
          latex: String.raw`n \text{ objects in } k \text{ boxes} \implies \text{some box holds} \ge \left\lceil \tfrac{n}{k} \right\rceil`,
          description: String.raw`If $n$ objects go into $k$ boxes, some box holds at least $\lceil n/k \rceil$ (and some holds at most $\lfloor n/k \rfloor$). The whole difficulty is choosing the boxes: residues mod $m$, pairs summing to a target, sub-regions of a shape, or the averaging form ("some term is at least the mean"). Generalization: more than $km$ objects force some box to exceed $m$.`,
          keywords: ["pigeonhole", "boxes", "at least one shared", "residues", "averaging argument", "dirichlet", "method"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME", "Olympiad"]
        },
        {
          id: "constructive-counting",
          name: "Constructive Counting",
          type: "method",
          latex: String.raw`\#(\text{objects}) = (\text{choices for step } 1) \times (\text{choices for step } 2) \times \cdots`,
          description: String.raw`Build the object one decision at a time and multiply the choice counts — valid only when every step has the same number of options regardless of earlier picks. Start with the most restricted slot (last digit of an even number, the seat of the picky person); if a step's count depends on history, split into cases or subtract overcounts. Divide at the end by symmetries you didn't intend to distinguish.`,
          keywords: ["constructive counting", "multiplication principle", "build step by step", "most restricted first", "overcount divide", "method"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "bijection-method",
          name: "Bijections",
          type: "method",
          latex: String.raw`\text{hard set} \;\xleftrightarrow{\;1 : 1\;}\; \text{easy set} \implies \text{same count}`,
          description: String.raw`Recount the same objects in friendlier clothing: strictly increasing sequences $\leftrightarrow$ subsets, sums $\leftrightarrow$ stars-and-bars arrangements, paths $\leftrightarrow$ letter words, "at most" $\leftrightarrow$ complements via $k \leftrightarrow n - k$. If a clean formula counts the target, some bijection to a known family is usually hiding.`,
          keywords: ["bijection", "one to one correspondence", "recount", "transform the problem", "same count", "method"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "recursive-counting",
          name: "Recursive Counting",
          type: "method",
          latex: String.raw`a_n = c_1 a_{n-1} + c_2 a_{n-2} + \cdots \quad (\text{classify by the final choice})`,
          description: String.raw`Classify arrangements by their last step or last block, express $a_n$ in terms of smaller cases, then compute forward from tiny $n$. The workhorse for strings avoiding patterns, tilings, and seatings; with several interacting constraints, track one sequence per state and update them together.`,
          keywords: ["recursion", "count by last step", "state counting", "build up", "strings avoiding pattern", "method", "build up by last step"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "indicator-variables",
          name: "Indicator Variables & Linearity of Expectation",
          type: "method",
          latex: String.raw`X = X_1 + X_2 + \cdots + X_n \implies E[X] = \sum_i P(\text{event } i \text{ happens})`,
          description: String.raw`To find an expected count, write it as a sum of $0/1$ indicators — one per potential occurrence — and add their probabilities. Linearity needs no independence whatsoever, which is the whole magic: dependent, overlapping events sum just as easily. Turns most "expected number of ..." problems into one-line computations.`,
          keywords: ["indicator variables", "linearity of expectation", "expected number", "no independence needed", "sum of probabilities", "method"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "invariants-coloring",
          name: "Invariants & Coloring Arguments",
          type: "method",
          latex: String.raw`\text{invariant unchanged by every move} \ne \text{target} \Rightarrow \text{impossible}`,
          description: String.raw`To prove a process can never reach a state or a tiling can never exist, find a quantity every legal move preserves — a parity, a sum mod $n$, a checkerboard color count — and show start and target disagree on it. Monovariants (quantities that only increase or decrease) prove termination the same way.`,
          keywords: ["invariant", "coloring argument", "checkerboard", "parity argument", "impossible tiling", "monovariant", "method"],
          importance: "medium",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "generating-function-method",
          name: "The Generating Function Method",
          type: "method",
          latex: String.raw`\text{each choice} \to \text{a polynomial factor}, \quad \text{multiply}, \quad [x^N] \text{ counts the ways}`,
          description: String.raw`Encode each independent decision as a polynomial or series whose exponents are its possible values, multiply the factors, and read the coefficient of $x^N$. Dice sums use $(x + \cdots + x^6)^k$; coin and stamp combinations use $\prod \frac{1}{1 - x^{a_i}}$; bounded parts use truncated factors. Then extract: set $x = 1$ for a total, differentiate for a weighted sum, or apply a roots-of-unity filter for a residue class.`,
          keywords: ["generating function method", "encode as polynomial", "coefficient extraction", "dice sums", "coin combinations", "method"],
          importance: "medium",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "extremal-principle",
          name: "The Extremal Principle",
          type: "method",
          latex: String.raw`\text{take the extreme object (largest / smallest / closest)}`,
          description: String.raw`Point at an extreme element — the largest value, the closest pair, the longest chain, the minimal counterexample — and exploit that nothing beats it. Often the extreme object cannot have a neighbor that would extend or improve it (or it would not have been extremal), which forces the structure you want or contradicts the assumption. The finite, combinatorial form of infinite descent.`,
          keywords: ["extremal principle", "largest smallest", "minimal counterexample", "closest pair", "consider the extreme", "well ordering", "method"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "probabilistic-method",
          name: "The Probabilistic Method",
          type: "method",
          latex: String.raw`E[X] \ge c \implies \exists \text{ outcome with } X \ge c; \qquad P(\text{bad}) < 1 \implies \exists \text{ a good object}`,
          description: String.raw`Prove something exists by showing a random construction produces it with positive probability. Two forms: the first-moment argument — since some outcome is at least the average, $E[X] \ge c$ guarantees an outcome with $X \ge c$ (and one with $X \le c$); and the union-bound argument — if the total probability of all "bad" events is below $1$, a choice avoiding all of them must exist. It's linearity of expectation repurposed from computing to guaranteeing.`,
          keywords: ["probabilistic method", "first moment", "expectation existence", "union bound", "random construction", "exists better than average", "method"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "transfer-matrix-method",
          name: "The Transfer Matrix Method",
          type: "method",
          latex: String.raw`a_n = \mathbf{u}^{\top} M^{\,n} \mathbf{v}, \qquad M_{ij} = \#\{\text{allowed transitions state } i \to j\}`,
          description: String.raw`To count length-$n$ sequences (tilings, walks, strings) obeying a local adjacency rule, build a transfer matrix $M$ whose $(i,j)$ entry marks the allowed transitions state $i \to j$; the count is then an entry of $M^n$. Diagonalizing $M$ yields a closed form and the governing linear recurrence $\det(xI - M) = 0$ — the engine behind "count the tilings / no-two-adjacent / walks on a small graph" problems.`,
          keywords: ["transfer matrix", "matrix power counting", "adjacency matrix walks", "state transitions", "tilings", "linear recurrence from matrix", "M^n", "method"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "gap-method",
          name: "The Gap Method (No Two Adjacent)",
          type: "method",
          latex: String.raw`\text{seat the } n \text{ others first} \Rightarrow n+1 \text{ gaps} \Rightarrow \text{drop the } k \text{ special items into distinct gaps: } \binom{n+1}{k}`,
          description: String.raw`For "arrange so that certain items are never adjacent," place the unrestricted items first, then slot the restricted ones into the gaps between and around them — at most one per gap guarantees no two touch. With $n$ others there are $n+1$ gaps, so choosing $k$ of them gives $\binom{n+1}{k}$ (times $k!$ and the others' arrangements when everything is distinct). The same move handles "at least $d$ apart" (pre-place the required spaces) and, with a small fix for the wrap-around, circular seatings.`,
          keywords: ["gap method", "no two adjacent", "non-adjacent arrangement", "insert into gaps", "spacing constraint", "seat no two together", "at least one apart", "method"],
          importance: "low",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "digit-counting",
          name: "Digit Counting",
          type: "method",
          latex: String.raw`\text{count by digit position, not by listing}`,
          description: String.raw`To count integers with a digit rule — "no digit $7$", "digits strictly increasing", "digit sum $=k$" — build the number position by position instead of listing. Fixed length: multiply the independent choices per slot (the leading digit avoids $0$). Up to a bound $N$: sweep leading digits strictly below $N$'s (the rest are free), then fix $N$'s prefix and recurse on the tail — the "digit DP" idea. Complementary counting (total minus the ones that do contain a $7$) is often the shortest route.`,
          keywords: ["digit counting", "count numbers with a digit property", "no digit 7", "digit sum", "digit dp", "count by position", "complementary counting digits", "how many numbers", "method"],
          importance: "low",
          level: ["AMC10", "AMC12", "AIME"]
        }
      ]
    }
  ]
});
