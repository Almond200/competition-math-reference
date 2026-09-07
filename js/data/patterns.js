// Problem patterns: recurring problem formats with an intended solution, sorted by
// the shape of the question rather than by subject. Cards keep a `subject` field so
// their topic chips and concept rules still resolve against their home subject.
window.MATH_SECTIONS = window.MATH_SECTIONS || [];

window.MATH_SECTIONS.push({
  id: "pat-games",
  group: "patterns",
  title: "Games & Processes",
  blurb: "Take-away games and moving-token problems, where the whole answer is a rule for which positions are already lost for whoever has to move.",
  subsections: [
    {
      title: "Take-Away Games",
      formulas: [
        {
          id: "losing-positions",
          name: "Losing Positions",
          type: "pattern",
          subject: "counting",
          latex: String.raw`L = \{\,n : \text{every move leads to a winning position}\,\}`,
          description: String.raw`In a take-away game, a position is losing (for the player to move) exactly when every available move hands the opponent a winning position. Compute $L$/$W$ labels upward from $0$ — the pattern is eventually periodic with period related to the move sizes — then count or exploit the cycle.`,
          example: String.raw`(2024 AIME I #3) Players remove $1$ or $4$ tokens; last token wins. Labeling from $n = 0$: the losing positions are $n \equiv 0, 2 \pmod 5$. The second player wins exactly at those $n$, and there are $404 + 405 = 809$ such $n \le 2024$.`,
          keywords: ["game", "nim", "p positions", "winning strategy", "periodic pattern", "take away", "method", "game analysis"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        }
      ]
    }
  ]
});

window.MATH_SECTIONS.push({
  id: "pat-optimization",
  group: "patterns",
  title: "Optimization & Shortest Paths",
  blurb: "Problems asking for the smallest total distance, the shortest route across a surface, or the best placement of a point. Nearly all of them are a straight line in disguise.",
  subsections: [
    {
      title: "Shortest Paths & Reflections",
      formulas: [
        {
          id: "reflection-shortest-path",
          name: "Reflection for Shortest Paths",
          type: "pattern",
          subject: "geometry",
          latex: String.raw`\min_{P \in \ell}\, (AP + PB) = A'B, \quad A' = \text{reflection of } A \text{ over } \ell`,
          description: String.raw`To minimize a broken path touching a line (or several), reflect an endpoint across the line and measure straight. Bounce problems (billiards, light rays, ant-on-a-box) unfold the same way — reflect the room instead of bending the path.`,
          example: String.raw`$A = (0, 3)$, $B = (6, 1)$, $P$ on the $x$-axis: reflect $A$ to $(0, -3)$; the minimum of $AP + PB$ is $\sqrt{6^2 + 4^2} = \sqrt{52} = 2\sqrt{13}$, achieved where segment $A'B$ crosses the axis.`,
          keywords: ["reflection", "shortest path", "minimize distance", "billiard", "unfold", "method"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "surface-shortest-path",
          name: "Shortest Path on a Surface (Unfold the Net)",
          type: "pattern",
          subject: "geometry",
          latex: String.raw`\text{box } a\le b\le c,\ \text{opposite corners}:\quad \min = \sqrt{(a+b)^2 + c^2}`,
          description: String.raw`A path forced to stay on a solid's surface is straightened by unfolding (developing) the surface into a plane — the shortest surface path becomes a straight segment, measured with the distance formula. A box unfolds several ways, so try each pairing and keep the smallest: for opposite corners of an $a\le b\le c$ box the minimum is $\sqrt{(a+b)^2+c^2}$. A cylinder unrolls into a rectangle (a helix becomes a straight line) and a cone into a circular sector. It is the 3D cousin of reflecting to straighten a wall-bouncing path.`,
          example: String.raw`A $1\times 2\times 3$ box, corner to opposite corner across the faces: the three unfoldings give $\sqrt{(1+2)^2+3^2}=\sqrt{18}=3\sqrt2$, $\sqrt{(1+3)^2+2^2}=\sqrt{20}$, and $\sqrt{(2+3)^2+1^2}=\sqrt{26}$; the shortest is $3\sqrt2\approx4.24$ (the through-space diagonal $\sqrt{14}$ is not allowed on the surface).`,
          keywords: ["shortest path surface", "unfold", "net", "spider and fly", "ant on a box", "geodesic", "develop surface", "cylinder unroll", "cone sector", "shortest route on a box", "method"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "rotation-trick",
          name: "The Rotation Trick",
          type: "pattern",
          subject: "geometry",
          latex: String.raw`\text{rotate } 60^\circ \text{ (equilateral) or } 90^\circ \text{ (square) about a vertex}`,
          description: String.raw`Given the distances from an interior point to the vertices of an equilateral triangle or square, rotate the figure about a vertex: one distance carries to a new position, creating an equilateral (or isosceles right) triangle from two of the distances — and a triangle whose sides are all three known lengths.`,
          example: String.raw`$P$ inside equilateral $\triangle ABC$ with $PA = 3, PB = 4, PC = 5$: rotating $60^\circ$ about $B$ produces a $3$-$4$-$5$ right triangle plus an equilateral one, revealing $\angle APB = 150^\circ$ — from which the side and area of $ABC$ follow.`,
          keywords: ["rotation", "point inside square", "point inside equilateral", "distances to vertices", "method", "distances from a special point"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Minimizing a Sum",
      formulas: [
        {
          id: "median-minimizes-abs",
          name: "Minimizing a Sum of $|x - a_i|$ (Median Trick)",
          type: "pattern",
          subject: "algebra",
          latex: String.raw`\sum_{i} |x - a_i| \text{ is minimized at } x = \operatorname{median}(a_1, \dots, a_n)`,
          description: String.raw`To minimize the total distance $\sum_i |x - a_i|$, place $x$ at the median of the $a_i$ (with an even count, anywhere between the two middle values ties for the minimum). The weighted sum $\sum_i w_i\,|x - a_i|$ is minimized at the weighted median — the $a_i$ at which the running weight, added in sorted order, first reaches half of $\sum w_i$. By contrast, squared distances $\sum (x - a_i)^2$ are minimized at the mean.`,
          keywords: ["median", "minimize sum of absolute values", "weighted median", "sum of distances", "minimize |x-a|", "L1 optimization"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        }
      ]
    }
  ]
});

window.MATH_SECTIONS.push({
  id: "pat-counting",
  group: "patterns",
  title: "Restricted Counting",
  blurb: "Counting arrangements that must obey a restriction: items forced together or kept apart, paths that must avoid a boundary, colorings counted only once up to symmetry.",
  subsections: [
    {
      title: "Adjacency Restrictions",
      formulas: [
        {
          id: "gap-method",
          name: "The Gap Method (No Two Adjacent)",
          type: "pattern",
          subject: "counting",
          latex: String.raw`\text{seat the } n \text{ others first} \Rightarrow n+1 \text{ gaps} \Rightarrow \text{drop the } k \text{ special items into distinct gaps: } \binom{n+1}{k}`,
          description: String.raw`For "arrange so that certain items are never adjacent," place the unrestricted items first, then slot the restricted ones into the gaps between and around them — at most one per gap guarantees no two touch. With $n$ others there are $n+1$ gaps, so choosing $k$ of them gives $\binom{n+1}{k}$ (times $k!$ and the others' arrangements when everything is distinct). The same move handles "at least $d$ apart" (pre-place the required spaces) and, with a small fix for the wrap-around, circular seatings.`,
          keywords: ["gap method", "no two adjacent", "non-adjacent arrangement", "insert into gaps", "spacing constraint", "seat no two together", "at least one apart", "method"],
          importance: "low",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "counting-blocks",
          name: "Grouping Method",
          type: "pattern",
          subject: "counting",
          latex: String.raw`\text{glue a must-stay-together group into one block, then arrange inside it}`,
          description: String.raw`For "A and B must sit together": treat them as one unit ($(n-1)!$ arrangements) times orderings within the block ($2!$). Separations use gap-placement: arrange the rest, then choose gaps.`,
          keywords: ["together", "adjacent", "glue", "gap method", "not adjacent", "block method", "arrangements"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        }
      ]
    },
    {
      title: "Paths & Digit Strings",
      formulas: [
        {
          id: "reflection-principle",
          name: "The Reflection Principle",
          type: "pattern",
          subject: "counting",
          latex: String.raw`\#\{\text{paths crossing the barrier}\} = \#\{\text{paths to the reflected endpoint}\}`,
          description: String.raw`To count lattice paths (or $\pm1$ walks) that must avoid a boundary, count the bad ones instead: reflect the portion of each barrier-touching path after its first touch, giving a bijection with unrestricted paths to a mirrored endpoint. Subtract. This one bijection generates the Catalan numbers and the ballot theorem.`,
          example: String.raw`Paths $(0,0) \to (5,3)$ in unit R/U steps that never go strictly above $y = x$: total $\binom{8}{3} = 56$ minus bad ones $\binom{8}{2} = 28$ (reflect across $y = x + 1$, landing at the mirror of the endpoint), leaving $28$.`,
          keywords: ["reflection", "bad paths", "barrier", "bijection", "catalan proof", "ballot", "method"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "digit-counting",
          name: "Digit Counting",
          type: "pattern",
          subject: "counting",
          latex: String.raw`\text{count by digit position, not by listing}`,
          description: String.raw`To count integers with a digit rule — "no digit $7$", "digits strictly increasing", "digit sum $=k$" — build the number position by position instead of listing. Fixed length: multiply the independent choices per slot (the leading digit avoids $0$). Up to a bound $N$: sweep leading digits strictly below $N$'s (the rest are free), then fix $N$'s prefix and recurse on the tail — the "digit DP" idea. Complementary counting (total minus the ones that do contain a $7$) is often the shortest route.`,
          keywords: ["digit counting", "count numbers with a digit property", "no digit 7", "digit sum", "digit dp", "count by position", "complementary counting digits", "how many numbers", "method"],
          importance: "low",
          level: ["AMC10", "AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Colorings Up to Symmetry",
      formulas: [
        {
          id: "burnsides-lemma",
          name: "Burnside's Lemma",
          type: "pattern",
          subject: "counting",
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
          type: "pattern",
          subject: "counting",
          latex: String.raw`\#\text{colorings up to } G = Z_G(m, m, \ldots) = \frac{1}{|G|}\sum_{g \in G} m^{\,c(g)}, \qquad Z_G = \frac{1}{|G|}\sum_{g} \prod_k t_k^{\,c_k(g)}`,
          description: String.raw`The refinement of Burnside's lemma that tracks how many of each color are used, via the group's cycle index $Z_G$ (average over group elements of $\prod t_k^{c_k}$, where $c_k$ counts $k$-cycles). Substituting $t_k = x^k + y^k + \cdots$ produces a generating function whose coefficients count colorings with a prescribed color distribution — necklaces with "3 red, 2 blue," and the like. Plain Burnside is $t_k \mapsto m$.`,
          keywords: ["polya enumeration", "cycle index", "burnside refinement", "necklace coloring", "color distribution", "counting up to symmetry"],
          importance: "lowest",
          level: ["Olympiad"]
        }
      ]
    }
  ]
});

window.MATH_SECTIONS.push({
  id: "pat-expressions",
  group: "patterns",
  title: "Nasty Expressions & Closed Forms",
  blurb: "An expression that looks impossible to evaluate, and the standard move that collapses it: a nested radical, a self-referential tower, a sum over every third term.",
  subsections: [
    {
      title: "Radicals & Nested Forms",
      formulas: [
        {
          id: "denesting-radicals",
          name: String.raw`Denesting $\sqrt{a \pm \sqrt{b}}$`,
          type: "pattern",
          subject: "algebra",
          latex: String.raw`\sqrt{a \pm \sqrt{b}} = \sqrt{\frac{a + \sqrt{a^2 - b}}{2}} \pm \sqrt{\frac{a - \sqrt{a^2 - b}}{2}}`,
          description: String.raw`Works cleanly when $a^2 - b$ is a perfect square. E.g. $\sqrt{3 + 2\sqrt2} = 1 + \sqrt2$ — guess $(\sqrt x + \sqrt y)^2$ and match.`,
          keywords: ["nested radical", "denest", "simplify square root", "denest a nested radical", "simplify sqrt of a plus sqrt b", "unnest radical"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "infinite-nest",
          name: "Infinite Nested Expressions",
          type: "pattern",
          subject: "algebra",
          latex: String.raw`x = \sqrt{a + x} \implies x^2 - x - a = 0`,
          description: String.raw`For $\sqrt{a + \sqrt{a + \cdots}}$, continued fractions $a + \cfrac{1}{a + \cdots}$, or infinite power towers: name the expression $x$, use self-similarity, solve, and keep the valid root.`,
          keywords: ["self similar", "continued fraction", "power tower", "converge"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "sqrt-approximation",
          name: "Approximating Square Roots",
          type: "pattern",
          subject: "algebra",
          latex: String.raw`\sqrt{a^2+b} \approx a + \frac{b}{2a}, \qquad \sqrt{a^2+b} \approx a + \cfrac{b}{2a + \cfrac{b}{2a}}, \qquad a + \frac{b}{2a+1} \le \sqrt{a^2+b} \le a + \frac{b}{2a}`,
          description: String.raw`Write the number as $a^2+b$ with $a$ the nearest integer below the root. Then $\sqrt{a^2+b}=a+\frac{b}{a+\sqrt{a^2+b}}$, and feeding the estimate back into itself gives successively better values: $a+\frac{b}{2a}$ to first order, then $a+\frac{b}{2a+b/(2a)}$, which is usually correct to four or five digits. The two one-step estimates $a+\frac{b}{2a+1}$ and $a+\frac{b}{2a}$ bracket the true value whenever $0 \le b \le 2a+1$.`,
          keywords: ["approximate square root", "estimate a square root", "square root approximation", "sqrt estimate", "nearest integer to a square root", "babylonian method", "newton's method for roots", "which is closer", "estimate a radical", "bounding a square root", "method"],
          importance: "low",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Collapsing a Sum",
      formulas: [
        {
          id: "fx-pairing",
          name: "The $f(x) + f(1-x)$ Pairing Trick",
          type: "pattern",
          subject: "algebra",
          latex: String.raw`f(x) + f(1 - x) = \text{constant} \implies \sum_{k=1}^{n-1} f\!\left(\tfrac{k}{n}\right) = \frac{n-1}{2} \cdot \text{const}`,
          description: String.raw`When a sum's arguments pair up symmetrically ($x$ with $1-x$, or $k$ with $n-k$), test whether $f(x) + f(1-x)$ simplifies to a constant — then the whole sum collapses to (number of pairs) × constant. The Gauss pairing idea, upgraded to functions.`,
          example: String.raw`$f(x) = \frac{9^x}{9^x + 3}$ satisfies $f(x) + f(1-x) = 1$ (multiply the second fraction by $\frac{9^x}{3}$). So $f\!\left(\frac{1}{1001}\right) + \cdots + f\!\left(\frac{1000}{1001}\right) = 500$.`,
          keywords: ["pairing", "f(x) f(1-x)", "symmetric sum", "gauss trick", "method"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "roots-of-unity-filter",
          name: "Roots of Unity Filter",
          type: "pattern",
          subject: "algebra",
          latex: String.raw`\sum_{k \equiv r \,(\mathrm{mod}\, n)} \binom{m}{k} = \frac{1}{n} \sum_{j=0}^{n-1} \omega^{-jr} (1 + \omega^j)^m, \qquad \binom{m}{0} + \binom{m}{3} + \binom{m}{6} + \cdots = \frac{2^m + 2\cos(m\pi/3)}{3}`,
          description: String.raw`Extracts every $n$-th coefficient of a generating function using $\omega = e^{2\pi i/n}$. E.g. $\binom{m}{0} + \binom{m}{3} + \binom{m}{6} + \cdots = \frac{2^m + 2\cos(m\pi/3)}{3}$.`,
          keywords: ["roots of unity filter", "filter", "every third", "generating function", "coefficient extraction", "extract coefficients"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        }
      ]
    },
    {
      title: "Structured Polynomials",
      formulas: [
        {
          id: "palindromic-polynomials",
          name: "Palindromic Polynomials",
          type: "pattern",
          subject: "algebra",
          latex: String.raw`x^4 + ax^3 + bx^2 + ax + 1 = 0 \;\xrightarrow{\div x^2}\; y^2 + ay + (b - 2) = 0, \quad y = x + \tfrac{1}{x}`,
          description: String.raw`When coefficients read the same forwards and backwards, roots come in pairs $r, \frac{1}{r}$. Divide by the middle power of $x$ and substitute $y = x + \frac{1}{x}$ (using $x^2 + \frac{1}{x^2} = y^2 - 2$) to halve the degree.`,
          example: String.raw`$x^4 + x^3 - 4x^2 + x + 1 = 0$: dividing by $x^2$ gives $y^2 + y - 6 = 0$ with $y = x + \frac{1}{x}$, so $y = 2$ or $-3$ — then solve two quadratics.`,
          keywords: ["palindromic", "reciprocal polynomial", "x plus 1 over x", "symmetric coefficients"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "shifted-polynomial-construction",
          name: "Building a Polynomial from Equal Values",
          type: "pattern",
          subject: "algebra",
          latex: String.raw`f(a_i) = k \;\forall i \implies f(x) = c\prod_i (x-a_i) + k, \qquad f(a_i) = g(a_i) \;\forall i \implies f(x) = \left(\prod_i (x-a_i)\right)Q(x) + g(x)`,
          description: String.raw`If a polynomial agrees with something simple at several points, subtract that thing. When $f$ takes the same value $k$ at $a_1,\dots,a_m$, the polynomial $f(x)-k$ vanishes at all of them, so it carries the factors $(x-a_i)$. The same works against any $g$: if $f(a_i) = g(a_i)$ for each $i$, then $f - g$ has those roots, so $f(x) = \left(\prod (x-a_i)\right)Q(x) + g(x)$.`,
          keywords: ["equal values", "same value at several points", "f(a) = f(b)", "subtract the constant", "shifted polynomial", "construct the polynomial", "known roots plus constant", "f(x) - k has roots", "reconstruct a polynomial", "f(a) = g(a)", "agrees with another polynomial", "subtract the interpolating polynomial", "f minus g has roots", "method"],
          importance: "high",
          level: ["AMC12", "AIME"]
        }
      ]
    }
  ]
});

window.MATH_SECTIONS.push({
  id: "pat-cycles",
  group: "patterns",
  title: "Far-Out Terms & Cycles",
  blurb: "Asked for the 2024th term, or the last three digits of something enormous. The values repeat; find the period and reduce the index.",
  subsections: [
    {
      title: "Finding a Distant Term",
      formulas: [
        {
          id: "periodicity-mod-m",
          name: "Periodicity mod m (Cycle-Hunting)",
          type: "pattern",
          subject: "number-theory",
          latex: String.raw`a_n \bmod m \text{ is eventually periodic} \implies a_N \equiv a_{\,n_0 + ((N - n_0)\,\bmod\,T)} \pmod m`,
          description: String.raw`To find a far-out term's remainder — the last digits of $7^{2024}$, the $2015$th Fibonacci number mod $1000$, a recurrence's term mod $m$ — list the values mod $m$ until they repeat. There are only finitely many possible states (one residue for a power, or a fixed-length tuple of residues for a linear recurrence), so the sequence must cycle; find the period $T$ (and any pre-period), then reduce the index $N$ modulo $T$. Powers cycle with the multiplicative order of the base; linear recurrences cycle with the Pisano-style period of their state vector.`,
          keywords: ["periodicity mod m", "find the cycle", "remainder of a huge term", "last digits of a power", "pisano period", "eventually periodic", "reduce the exponent", "order", "cycle hunting", "method"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "periodic-sequences",
          type: "pattern",
          subject: "algebra",
          name: "Periodicity in Recursive Sequences",
          latex: String.raw`a_n \text{ eventually repeats with period } p:\ \ a_n = a_{\,n \bmod p}`,
          description: String.raw`Nonlinear recursions built from a fixed rational rule (like $t_n = \frac{5t_{n-1}+1}{25t_{n-2}}$ or $a_{n+1} = |a_n| - a_{n-1}$) are very often periodic: iterate by hand until the initial pair reappears, confirm one full extra cycle, then reduce the target index modulo the period. Watch for pre-periods (a few irregular terms before the cycle starts).`,
          example: String.raw`$a_{n+1} = \frac{1}{1 - a_n}$ with $a_1 = 2$: the terms run $2, -1, \frac{1}{2}, 2, -1, \dots$ — period $3$. Since $2024 \equiv 2 \pmod 3$, $a_{2024} = a_2 = -1$.`,
          keywords: ["periodic", "cycle", "recursion repeats", "index mod period", "iterate", "periodic recurrence", "period of recursion", "cyclic sequence", "lyness cycle", "mobius map order", "recurrence period", "tan addition recurrence", "1/(1-x)", "recursive", "todd equation", "period 8 recurrence", "x_n over x_{n-1}", "multiplicative periodic recurrence", "period 6 cycle"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        }
      ]
    }
  ]
});

window.MATH_SECTIONS.push({
  id: "pat-digits",
  group: "patterns",
  title: "Digit & Numeral Puzzles",
  blurb: "Problems stated in terms of the digits themselves, attacked column by column with carries, or by writing the number as $100a + 10b + c$.",
  subsections: [
    {
      title: "Letter & Digit Puzzles",
      formulas: [
        {
          id: "cryptarithms",
          name: "Cryptarithms (Alphametics)",
          type: "pattern",
          subject: "number-theory",
          latex: String.raw`\overline{TWO} + \overline{TWO} = \overline{FOUR}: \quad \text{distinct digits, leading digit} \ne 0, \text{ carry } 0\text{ or }1 \text{ per column}`,
          description: String.raw`The puzzles where letters stand for distinct digits ($\text{TWO}+\text{TWO}=\text{FOUR}$). Definitive attack: work column by column from the right, carrying only $0$ or $1$ in an addition; no leading letter may be $0$; each letter is a distinct digit $0$–$9$. The carry bounds pin the high letters immediately — a four-letter sum of two three-letter numbers forces the leading letter to be $1$ (two three-digit numbers total under $2000$) — and from there each column is a small constraint you propagate.`,
          keywords: ["cryptarithm", "alphametic", "verbal arithmetic", "letters are digits", "carry column by column", "distinct digits", "method"],
          importance: "low",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "digit-manipulation",
          name: "Digit Manipulation",
          type: "pattern",
          subject: "number-theory",
          latex: String.raw`\overline{ab} = 10a + b, \qquad \overline{ab} + \overline{ba} = 11(a + b), \qquad \overline{ab} - \overline{ba} = 9(a - b)`,
          description: String.raw`Write digit conditions as equations in the digits themselves ($\overline{abc} = 100a + 10b + c$), then solve the tiny Diophantine system with the bounds $1 \le a \le 9$, $0 \le b, c \le 9$. Reversal sums always factor through $11$; reversal differences through $9$.`,
          keywords: ["digits", "two digit number", "reversed digits", "10a plus b", "digit equation", "method"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10"]
        }
      ]
    }
  ]
});

window.MATH_SECTIONS.push({
  id: "pat-existence",
  group: "patterns",
  title: "Existence & Solution Counts",
  blurb: "Show that no solution can exist, that exactly one does, or count how many there are, all without finding them.",
  subsections: [
    {
      title: "Impossibility Arguments",
      formulas: [
        {
          id: "squeeze-between-squares",
          name: "Squeezing Between Consecutive Powers",
          type: "pattern",
          subject: "number-theory",
          latex: String.raw`n^2 < N < (n+1)^2 \implies N \text{ is not a perfect square, and } \lfloor \sqrt{N} \rfloor = n`,
          description: String.raw`To show an expression is never a perfect square (or cube), trap it strictly between consecutive squares of a well-chosen $n$ — usually the obvious near-square-root, like $n^2 + n$ for a quartic. The same squeeze pins down integer parts of roots exactly.`,
          keywords: ["between consecutive squares", "not a perfect square", "bounding", "squeeze", "floor of sqrt", "method"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "vieta-jumping",
          name: "Vieta Jumping",
          type: "pattern",
          subject: "number-theory",
          latex: String.raw`x^2 - kbx + (b^2 - N) = 0 \text{ has roots } a, \; a' = kb - a = \frac{b^2 - N}{a}`,
          description: String.raw`For a symmetric Diophantine condition quadratic in each variable: fix the constant, view one variable as the unknown, and use Vieta to flip a solution $(a, b)$ to a smaller one $(b, kb - a)$. Take a minimal solution and jump — either you contradict minimality, or you land on a degenerate base case that reveals the constant. Infinite descent, run through quadratics.`,
          keywords: ["vieta jumping", "root flipping", "infinite descent", "minimal solution", "symmetric diophantine", "method"],
          importance: "low",
          level: ["Olympiad"]
        }
      ]
    },
    {
      title: "Tangency & Unique Solutions",
      formulas: [
        {
          id: "tangency-condition",
          name: "Unique Solution ⟹ Tangency",
          type: "pattern",
          subject: "geometry",
          latex: String.raw`\text{distance(center, line)} = r \qquad\text{or}\qquad \Delta = 0`,
          description: String.raw`When a system "has exactly one solution" and its pieces are a circle and a line (or two circles, or a curve and a line), uniqueness means tangency: set the distance from the center to the line equal to the radius, or set the discriminant of the combined equation to zero, and solve for the parameter.`,
          example: String.raw`(2025 AIME I #8) $|25 + 20i - z| = 5$ is a circle at $(25, 20)$; $|z - 4 - k| = |z - 3i - k|$ is the perpendicular bisector of two points depending on $k$. Exactly one solution forces the line tangent: distance $= \frac{|8k - 73|}{10} = 5$, so $k = \frac{123}{8}$ or $\frac{23}{8}$, summing to $\frac{73}{4}$ — answer $77$.`,
          keywords: ["tangent", "unique solution", "discriminant zero", "distance equals radius", "exactly one intersection", "method"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "cross-section-method",
          name: "3D Tangency via Cross-Sections",
          type: "pattern",
          subject: "geometry",
          latex: String.raw`\text{slice through the axis of symmetry} \Rightarrow \text{2D circles and lines}`,
          description: String.raw`Spheres, cylinders, cones, and tori that are tangent to each other become tangent circles and lines in the plane through their common axis of symmetry. Solve the 2D picture (center distances = sums/differences of radii, similar triangles), then rotate back.`,
          example: String.raw`(2024 AIME II #8) A torus (tube radius $3$, center-circle radius $6$) rests inside a sphere of radius $11$: in the axial cross-section the tube center sits at distance $11 - 3 = 8$ from the sphere's center, so by similar triangles the tangency circle has radius $6 \cdot \frac{11}{8} = \frac{33}{4}$; resting outside gives $6 \cdot \frac{11}{14} = \frac{33}{7}$. The difference is $\frac{99}{28}$, answer $127$.`,
          keywords: ["cross section", "torus", "sphere tangent", "axial slice", "3d to 2d", "method"],
          importance: "medium",
          level: ["AIME"]
        }
      ]
    },
    {
      title: "Counting Solutions",
      formulas: [
        {
          id: "piecewise-graph-counting",
          name: "Counting Solutions by Graphing",
          type: "pattern",
          subject: "algebra",
          latex: String.raw`\#\text{solutions of } f(x) = c \;=\; \#\text{crossings of } y = f(x) \text{ with } y = c`,
          description: String.raw`For nested absolute values and piecewise functions, don't solve — draw. Build the graph by transformations (each $|\cdot|$ folds the picture upward; each subtraction shifts it), then slide the horizontal line and count crossings as the parameter varies. Corner heights tell you exactly where the count jumps.`,
          example: String.raw`$||x| - 2| = c$: the W-shaped graph has valleys at height $0$ ($x = \pm2$) and a local peak at height $2$ ($x = 0$). So: $4$ solutions for $0 < c < 2$, $3$ at $c = 2$, $2$ for $c > 2$ or $c = 0$.`,
          keywords: ["absolute value graph", "count solutions", "W shape", "fold", "parameter", "method"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        }
      ]
    }
  ]
});

window.MATH_SECTIONS.push({
  id: "pat-continuous",
  group: "patterns",
  title: "Random & Continuous Choice",
  blurb: "A point or a time is chosen uniformly at random from a continuous range, so the probability becomes a ratio of areas.",
  subsections: [
    {
      title: "Geometric Probability",
      formulas: [
        {
          id: "geometric-probability",
          name: "Geometric Probability",
          type: "pattern",
          subject: "counting",
          latex: String.raw`P = \dfrac{\text{favorable length / area / volume}}{\text{total length / area / volume}}`,
          description: String.raw`For continuous uniform choices, draw the region. Classic: two points in $[0,1]$ are within $d$ of each other with probability $1 - (1-d)^2$; "broken stick makes a triangle" is $\frac{1}{4}$.`,
          keywords: ["area probability", "continuous", "uniform random", "broken stick", "meet", "two people arrive", "waiting time problem", "unit square probability", "method"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        }
      ]
    }
  ]
});
