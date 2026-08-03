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
          latex: String.raw`\#(\text{good}) = \#(\text{total}) - \#(\text{bad})`,
          description: String.raw`When "at least one" or a messy condition appears, count the opposite. The probability version: $P(\text{at least one}) = 1 - P(\text{none})$.`,
          keywords: ["at least one", "complement", "opposite", "total minus bad"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "counting-blocks",
          name: "Grouping Method",
          latex: String.raw`\text{people together} \Rightarrow \text{glue into one block, arrange, then arrange inside}`,
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
          keywords: ["count rectangles", "count squares", "grid lines"],
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
          keywords: ["pascal triangle", "recursive", "symmetry"],
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
          keywords: ["hockey stick", "diagonal sum", "christmas stocking"],
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
          keywords: ["multinomial", "trinomial expansion", "coefficient"],
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
          importance: "low",
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
          latex: String.raw`x_i \le m: \;\; \text{use PIE, subtracting cases where some } x_i \ge m + 1`,
          description: String.raw`Count all solutions, subtract those violating one bound ($\binom{k}{1}$ ways to pick which, shift by $m{+}1$), add back double violations, etc.`,
          keywords: ["bounded", "at most", "inclusion exclusion", "capped"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "balls-boxes-table",
          name: "Balls in Boxes",
          latex: String.raw`\text{distinct} \to \text{distinct}: k^n; \quad \text{ident} \to \text{distinct}: \binom{n+k-1}{k-1}; \quad \text{distinct} \to \text{ident}: \text{Stirling}`,
          description: String.raw`The four basic cases of $n$ balls into $k$ boxes: distinguishable-to-distinguishable is $k^n$; identical-to-distinguishable is stars and bars; distinguishable-to-identical sums Stirling numbers; identical-to-identical is integer partitions.`,
          keywords: ["twelvefold", "distinguishable", "indistinguishable", "distribute cases", "twelvefold way"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Advanced Counting",
      formulas: [
        {
          id: "pie",
          name: "Principle of Inclusion-Exclusion (PIE)",
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
          id: "catalan-numbers",
          name: "Catalan Numbers",
          latex: String.raw`C_n = \frac{1}{n+1}\binom{2n}{n} = \binom{2n}{n} - \binom{2n}{n+1}`,
          description: String.raw`$1, 1, 2, 5, 14, 42, 132, \dots$ Counts balanced parenthesizations, monotone lattice paths not crossing the diagonal, triangulations of an $(n{+}2)$-gon, and binary trees. Recurrence: $C_{n+1} = \sum C_i C_{n-i}$.`,
          example: String.raw`$C_3 = \frac{1}{4}\binom{6}{3} = 5$: the five ways to balance 3 pairs of parentheses are ((())), (()()), (())(), ()(()), ()()().`,
          keywords: ["catalan", "balanced parentheses", "dyck paths", "triangulations", "ballot"],
          importance: "medium",
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
          id: "losing-positions",
          name: "Losing Positions",
          type: "method",
          latex: String.raw`L = \{\,n : \text{every move from } n \text{ leads to } W\,\}, \qquad \text{find } L \text{ by small cases, then spot the period}`,
          description: String.raw`In a take-away game, a position is losing (for the player to move) exactly when every available move hands the opponent a winning position. Compute $L$/$W$ labels upward from $0$ — the pattern is eventually periodic with period related to the move sizes — then count or exploit the cycle.`,
          example: String.raw`(2024 AIME I #3) Players remove $1$ or $4$ tokens; last token wins. Labeling from $n = 0$: the losing positions are $n \equiv 0, 2 \pmod 5$. The second player wins exactly at those $n$, and there are $404 + 405 = 809$ such $n \le 2024$.`,
          keywords: ["game", "nim", "p positions", "winning strategy", "periodic pattern", "take away", "method", "game analysis"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "reflection-principle",
          name: "The Reflection Principle",
          type: "method",
          latex: String.raw`\#\{\text{paths touching the barrier}\} = \#\{\text{paths to the reflected endpoint}\}`,
          description: String.raw`To count lattice paths (or $\pm1$ walks) that must avoid a boundary, count the bad ones instead: reflect the portion of each barrier-touching path after its first touch, giving a bijection with unrestricted paths to a mirrored endpoint. Subtract. This one bijection generates the Catalan numbers and the ballot theorem.`,
          example: String.raw`Paths $(0,0) \to (5,3)$ in unit R/U steps that never go strictly above $y = x$: total $\binom{8}{3} = 56$ minus bad ones $\binom{8}{2} = 28$ (reflect across $y = x + 1$, landing at the mirror of the endpoint), leaving $28$.`,
          keywords: ["reflection", "bad paths", "barrier", "bijection", "catalan proof", "ballot", "method"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "burnsides-lemma",
          name: "Burnside's Lemma",
          latex: String.raw`\#\text{orbits} = \frac{1}{|G|} \sum_{g \in G} |\mathrm{Fix}(g)|`,
          description: String.raw`Distinct colorings under symmetry = average number of colorings fixed by each symmetry. E.g. colorings of a cube's faces with $k$ colors: $\frac{k^6 + 3k^4 + 12k^3 + 8k^2}{24}$.`,
          example: String.raw`2-color the corners of a square, rotations only. Fixed colorings: identity $2^4 = 16$; rotations by $90^\circ$ and $270^\circ$ fix $2$ each; $180^\circ$ fixes $2^2 = 4$. Answer: $\frac{16 + 2 + 4 + 2}{4} = 6$ distinct colorings.`,
          keywords: ["burnside", "symmetry", "orbits", "colorings", "rotations", "necklace"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
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
          id: "fibonacci-tilings",
          name: "Tiling Recurrences",
          latex: String.raw`a_n = a_{n-1} + a_{n-2}`,
          description: String.raw`Tilings of a $1 \times n$ strip with $1 \times 1$ and $1 \times 2$ tiles are Fibonacci; binary strings with no two consecutive 1s likewise. Condition on the last piece to build a recurrence — the standard attack for structured sequences.`,
          keywords: ["tilings", "recursion", "no two adjacent", "binary strings", "states", "state counting"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
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
          id: "partitions",
          name: "Integer Partitions",
          latex: String.raw`p(n): \; 1, 2, 3, 5, 7, 11, 15, 22, 30, 42, \dots, \qquad \#\{\text{compositions of } n\} = 2^{n-1}`,
          description: String.raw`Ways to write $n$ as an unordered sum of positive integers. Partitions into odd parts = partitions into distinct parts (Euler). Compositions (ordered sums) of $n$: $2^{n-1}$.`,
          keywords: ["partition", "unordered sum", "compositions", "distinct parts"],
          importance: "medium",
          level: ["AIME"]
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
          id: "stirling-first-kind",
          name: "Stirling Numbers of the First Kind",
          latex: String.raw`x(x+1)(x+2)\cdots(x+n-1) = \sum_{k} \begin{bmatrix} n \\ k \end{bmatrix} x^k`,
          description: String.raw`$\begin{bmatrix} n \\ k \end{bmatrix}$ counts permutations of $n$ elements with exactly $k$ cycles; recurrence $\begin{bmatrix} n \\ k \end{bmatrix} = (n-1)\begin{bmatrix} n-1 \\ k \end{bmatrix} + \begin{bmatrix} n-1 \\ k-1 \end{bmatrix}$. Probability a random permutation is one big cycle: $\frac{1}{n}$.`,
          keywords: ["cycles", "permutation cycle count", "rising factorial"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "necklace-formula",
          name: "Necklace Counting Formula",
          latex: String.raw`\#\text{necklaces} = \frac{1}{n} \sum_{d \mid n} \varphi(d)\, k^{n/d}`,
          description: String.raw`Colorings of $n$ beads with $k$ colors up to rotation — Burnside applied to the cyclic group, grouped by rotation order $d$. Allowing flips too (bracelets) adds reflection terms.`,
          keywords: ["necklace", "rotation", "beads", "burnside application", "totient"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "generating-functions",
          name: "Generating Functions",
          latex: String.raw`\frac{1}{(1-x)^k} = \sum_{n \ge 0} \binom{n + k - 1}{k - 1} x^n, \qquad \frac{1}{1-x} = 1 + x + x^2 + \cdots, \qquad \frac{1}{(1-x)^2} = 1 + 2x + 3x^2 + \cdots`,
          description: String.raw`Encode choices as polynomial factors and multiply: the coefficient of $x^n$ counts ways to total $n$. Dice sums use $(x + x^2 + \cdots + x^6)^2$; coin/stamp problems use $\frac{1}{1 - x^a}$ factors. The identity shown is stars and bars in disguise.`,
          keywords: ["generating function", "coefficient of x^n", "dice sums", "encode choices"],
          importance: "medium",
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
          keywords: ["favorable outcomes", "union", "complement"],
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
          latex: String.raw`P = \frac{\text{favorable length/area/volume}}{\text{total length/area/volume}}`,
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
          latex: String.raw`P(\text{specific card is the ace}) = \frac{1}{n} \text{ regardless of position}`,
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
          keywords: ["variance", "independent product", "second moment"],
          importance: "low",
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
          importance: "low",
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
          name: "Random Walks on Polyhedra",
          latex: String.raw`\text{tetrahedron: } P(\text{back at start after } n) = \frac{1}{4} + \frac{3}{4}\left(-\frac{1}{3}\right)^n`,
          description: String.raw`A particle hops along edges at random. On a tetrahedron the return probability has the closed form above (check: $P(0)=1$, $P(1)=0$). On a cube, group vertices by distance from the start ($0,1,2,3$ edges away) and run a four-state recursion — symmetry collapses $8$ vertices to $4$ states.`,
          example: String.raw`Tetrahedron, $n = 2$: $P = \frac{1}{4} + \frac{3}{4}\cdot\frac{1}{9} = \frac{1}{3}$ — sensible, since from any neighbor one of three edges returns home.`,
          keywords: ["random walk", "cube vertices", "tetrahedron", "return probability", "states symmetry"],
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
          importance: "low",
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
          latex: String.raw`\text{count pairs } (x, y) \text{ two ways and equate}`,
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
        }
      ]
    },
    {
      title: "Graphs & Regions",
      formulas: [
        {
          id: "cayleys-formula",
          name: "Cayley's Formula",
          latex: String.raw`\#\{\text{trees on } n \text{ labeled vertices}\} = n^{\,n-2}`,
          description: String.raw`The number of distinct trees (connected, cycle-free networks) on $n$ distinguishable vertices. Proved by the Prüfer bijection: each tree corresponds to a unique sequence of $n-2$ vertex labels, and vice versa.`,
          example: String.raw`$n = 4$: $4^2 = 16$ labeled trees — the $4$ star-shaped ones plus the $12$ paths ($\frac{4!}{2}$ orderings up to reversal). ✓`,
          keywords: ["labeled trees", "cayley", "prufer", "spanning trees", "networks"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "eulerian-paths",
          name: "Eulerian Paths & Circuits",
          latex: String.raw`\text{circuit} \iff \text{all degrees even}, \qquad \text{path} \iff \text{exactly two odd degrees}`,
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
          id: "constructive-counting",
          name: "Constructive Counting",
          type: "method",
          latex: String.raw`\#(\text{objects}) = (\text{choices for step } 1) \times (\text{choices for step } 2) \times \cdots`,
          description: String.raw`Build the object one decision at a time and multiply the choice counts — valid only when every step has the *same* number of options regardless of earlier picks. Start with the most restricted slot (last digit of an even number, the seat of the picky person); if a step's count depends on history, split into cases or subtract overcounts. Divide at the end by symmetries you didn't intend to distinguish.`,
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
          latex: String.raw`\text{quantity preserved by every move} \ne \text{target value} \implies \text{impossible}`,
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
          latex: String.raw`\text{take the largest / smallest / closest object} \implies \text{nothing beats it}`,
          description: String.raw`Point at an extreme element — the largest value, the closest pair, the longest chain, the minimal counterexample — and exploit that nothing beats it. Often the extreme object cannot have a neighbor that would extend or improve it (or it would not have been extremal), which forces the structure you want or contradicts the assumption. The finite, combinatorial form of infinite descent.`,
          keywords: ["extremal principle", "largest smallest", "minimal counterexample", "closest pair", "consider the extreme", "well ordering", "method"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        }
      ]
    }
  ]
});
