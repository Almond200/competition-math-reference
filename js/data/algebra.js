// Algebra formulas: polynomials, identities, series, inequalities, logs, complex numbers, trig.
window.MATH_SECTIONS = window.MATH_SECTIONS || [];

window.MATH_SECTIONS.push({
  id: "algebra",
  title: "Algebra",
  blurb: "Polynomials, factoring tricks, series, inequalities, logarithms, complex numbers, and trigonometry.",
  subsections: [
    {
      title: "Polynomials & Equations",
      formulas: [
        {
          id: "quadratic-formula",
          name: "Quadratic Formula & Discriminant",
          latex: String.raw`x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}, \qquad \Delta = b^2 - 4ac`,
          description: String.raw`Roots are real and distinct if $\Delta > 0$, repeated if $\Delta = 0$, complex conjugates if $\Delta < 0$. Rational roots need $\Delta$ to be a perfect square.`,
          keywords: ["roots", "discriminant", "real solutions", "perfect square"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "vietas-quadratic",
          name: "Vieta's Formulas (Quadratic)",
          latex: String.raw`r + s = -\frac{b}{a}, \qquad rs = \frac{c}{a}`,
          description: String.raw`Sum and product of the roots of $ax^2 + bx + c = 0$. Also useful: $r^2 + s^2 = (r+s)^2 - 2rs$.`,
          keywords: ["sum of roots", "product of roots", "vieta"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "vietas-general",
          name: "Vieta's Formulas (General Degree)",
          latex: String.raw`e_k(r_1, \dots, r_n) = (-1)^k \frac{a_{n-k}}{a_n}, \qquad x^3 + bx^2 + cx + d: \;\; r+s+t = -b, \quad rs+rt+st = c, \quad rst = -d`,
          description: String.raw`For $a_n x^n + \cdots + a_0$: the sum of roots is $-\frac{a_{n-1}}{a_n}$, sum of pairwise products is $\frac{a_{n-2}}{a_n}$, and the product of all roots is $(-1)^n \frac{a_0}{a_n}$.`,
          example: String.raw`$x^3 - 6x^2 + 11x - 6$ has roots $1, 2, 3$: sum $= 6$, pairwise products $1{\cdot}2 + 1{\cdot}3 + 2{\cdot}3 = 11$, product $= 6$ — reading the coefficients with alternating signs.`,
          keywords: ["symmetric functions", "cubic", "sum of roots", "product of roots", "coefficients"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "factor-remainder-theorem",
          name: "Remainder & Factor Theorems",
          latex: String.raw`P(x) = (x - a)Q(x) + P(a)`,
          description: String.raw`The remainder of $P(x)$ divided by $x - a$ is $P(a)$; so $x - a$ is a factor iff $P(a) = 0$. Remainder mod $(x-a)(x-b)$ is the line through $(a, P(a))$ and $(b, P(b))$.`,
          keywords: ["remainder", "polynomial division", "root", "factor"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "rational-root-theorem",
          name: "Rational Root Theorem",
          latex: String.raw`x = \frac{p}{q} \implies p \mid a_0, \; q \mid a_n`,
          description: String.raw`Any rational root of an integer polynomial (in lowest terms) has numerator dividing the constant term and denominator dividing the leading coefficient.`,
          keywords: ["rational roots", "integer polynomial", "candidates"],
          importance: "high",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "coefficient-extraction",
          name: "Coefficient Sums",
          latex: String.raw`P(1) = \sum a_i, \qquad \frac{P(1) + P(-1)}{2} = \sum_{\text{even } i} a_i, \qquad \frac{P(1) - P(-1)}{2} = \sum_{\text{odd } i} a_i`,
          description: String.raw`Plugging in special values extracts coefficient information without expanding: $P(1)$ is the sum of coefficients, $P(0)$ the constant term, $P(-1)$ the alternating sum. Works on any generating polynomial, e.g. $(1 + x + x^2)^{10}$.`,
          example: String.raw`Sum of the even-position coefficients of $(1 + x)^5$: $\frac{2^5 + 0}{2} = 16 = \binom{5}{0} + \binom{5}{2} + \binom{5}{4}$. ✓`,
          keywords: ["sum of coefficients", "plug in 1", "alternating sum", "even coefficients", "generating polynomial"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "int-poly-divisibility",
          name: "Integer Polynomial Divisibility",
          latex: String.raw`a, b \in \mathbb{Z} \implies (a - b) \mid P(a) - P(b)`,
          description: String.raw`For any polynomial with integer coefficients — because $a^k - b^k$ is always divisible by $a - b$. The go-to tool for "no such polynomial exists" proofs and for pinning down $P(n)$ from a few given values.`,
          example: String.raw`No integer polynomial has $P(1) = 2$ and $P(3) = 5$: it would need $3 - 1 = 2$ to divide $5 - 2 = 3$. ✗`,
          keywords: ["integer polynomial", "divides difference", "impossible polynomial", "P(a) P(b)"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "newtons-sums",
          name: "Newton's Sums",
          latex: String.raw`p_k = e_1 p_{k-1} - e_2 p_{k-2} + \cdots + (-1)^{k-1} k\, e_k, \qquad p_1 = e_1, \qquad p_2 = e_1 p_1 - 2e_2, \qquad p_3 = e_1 p_2 - e_2 p_1 + 3e_3`,
          description: String.raw`Relates power sums $p_k = \sum r_i^k$ of a polynomial's roots to the elementary symmetric polynomials $e_i$ (from Vieta). E.g. $p_2 = e_1 p_1 - 2e_2$, $p_3 = e_1 p_2 - e_2 p_1 + 3e_3$.`,
          example: String.raw`For $x^2 - 3x + 2$ (roots $1, 2$): $e_1 = 3$, $e_2 = 2$, so $p_1 = 3$ and $p_2 = e_1 p_1 - 2e_2 = 9 - 4 = 5 = 1^2 + 2^2$. ✓ No need to find the roots at all.`,
          keywords: ["power sums", "sum of squares of roots", "sum of cubes of roots", "symmetric"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "conjugate-root-theorems",
          name: "Conjugate Root Theorems",
          latex: String.raw`a + bi \text{ a root} \implies a - bi \text{ a root}; \qquad a + b\sqrt{d} \implies a - b\sqrt{d}`,
          description: String.raw`Real-coefficient polynomials have complex roots in conjugate pairs; rational-coefficient polynomials have irrational roots in radical-conjugate pairs.`,
          keywords: ["complex conjugate", "radical conjugate", "pairs of roots"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "palindromic-polynomials",
          name: "Palindromic Polynomials",
          latex: String.raw`x^4 + ax^3 + bx^2 + ax + 1 = 0 \;\xrightarrow{\div x^2}\; y^2 + ay + (b - 2) = 0, \quad y = x + \tfrac{1}{x}`,
          description: String.raw`When coefficients read the same forwards and backwards, roots come in pairs $r, \frac{1}{r}$. Divide by the middle power of $x$ and substitute $y = x + \frac{1}{x}$ (using $x^2 + \frac{1}{x^2} = y^2 - 2$) to halve the degree.`,
          example: String.raw`$x^4 + x^3 - 4x^2 + x + 1 = 0$: dividing by $x^2$ gives $y^2 + y - 6 = 0$ with $y = x + \frac{1}{x}$, so $y = 2$ or $-3$ — then solve two quadratics.`,
          keywords: ["palindromic", "reciprocal polynomial", "x plus 1 over x", "symmetric coefficients"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "vertex-form",
          name: "Vertex of a Parabola",
          latex: String.raw`x = -\frac{b}{2a}, \qquad y = c - \frac{b^2}{4a}`,
          description: String.raw`Extremum of $y = ax^2 + bx + c$. Minimized/maximized at the average of the roots — quadratics are symmetric about $x = -\frac{b}{2a}$.`,
          keywords: ["vertex", "maximum", "minimum", "parabola", "axis of symmetry"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "lagrange-interpolation",
          name: "Lagrange Interpolation",
          latex: String.raw`P(x) = \sum_{i} y_i \prod_{j \ne i} \frac{x - x_j}{x_i - x_j}`,
          description: String.raw`The unique degree-$\le n{-}1$ polynomial through $n$ given points. Also: the finite-difference trick — a degree-$n$ polynomial has constant $n$-th differences.`,
          example: String.raw`Through $(1,1), (2,4), (3,9)$: $P(x) = 1\cdot\frac{(x-2)(x-3)}{(1-2)(1-3)} + 4\cdot\frac{(x-1)(x-3)}{(2-1)(2-3)} + 9\cdot\frac{(x-1)(x-2)}{(3-1)(3-2)}$, which simplifies to $x^2$ — each basis term is $1$ at its own point and $0$ at the others.`,
          keywords: ["interpolation", "points determine polynomial", "finite differences"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "descartes-rule-signs",
          name: "Descartes' Rule of Signs",
          latex: String.raw`\#\{\text{positive roots}\} = \#\{\text{sign changes of } P(x)\} - 2k, \quad k \ge 0`,
          description: String.raw`Count sign changes between consecutive nonzero coefficients: the number of positive real roots equals that count or falls short of it by an even number. For negative roots, apply the same rule to $P(-x)$.`,
          example: String.raw`$P(x) = x^3 - 3x^2 + 4x + 5$ has signs $+,-,+,+$: two changes, so $2$ or $0$ positive roots. $P(-x) = -x^3 - 3x^2 - 4x + 5$ has one change: exactly $1$ negative root.`,
          keywords: ["sign changes", "positive roots", "negative roots", "real roots count"],
          importance: "low",
          level: ["AMC12", "AIME"]
        },
        {
          id: "root-transformations",
          name: "Transforming the Roots of a Polynomial",
          latex: String.raw`\text{roots } r_i + k: P(x - k); \qquad \text{roots } kr_i: P\!\left(\tfrac{x}{k}\right); \qquad \text{roots } \tfrac{1}{r_i}: x^n P\!\left(\tfrac{1}{x}\right)`,
          description: String.raw`To build the polynomial whose roots are a function of the old roots, substitute the inverse function into $P$. Reversing the coefficients gives reciprocal roots; for squared roots, compute $P(\sqrt{x})P(-\sqrt{x})$ (or pair Vieta with Newton's sums).`,
          example: String.raw`$P(x) = x^2 - 5x + 6$ (roots $2, 3$): reciprocal roots — reverse coefficients to $6x^2 - 5x + 1$ (roots $\frac{1}{2}, \frac{1}{3}$ ✓); roots shifted by $1$ — $P(x-1) = x^2 - 7x + 12$ (roots $3, 4$ ✓).`,
          keywords: ["shift roots", "scale roots", "reciprocal roots", "reverse coefficients", "substitute"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "completing-the-square",
          name: "Completing the Square",
          latex: String.raw`x^2 + bx + c = \left( x + \tfrac{b}{2} \right)^2 + c - \tfrac{b^2}{4}`,
          description: String.raw`Rewrite any quadratic as a perfect square plus a constant. This one move derives the quadratic formula, locates the vertex $\left( -\frac{b}{2}, \, c - \frac{b^2}{4} \right)$, proves a min or max without calculus, and turns a general circle $x^2 + y^2 + Dx + Ey + F = 0$ into center–radius form.`,
          keywords: ["completing the square", "perfect square", "vertex", "minimum", "circle center radius"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        }
      ]
    },
    {
      title: "Factorizations & Identities",
      formulas: [
        {
          id: "difference-of-squares",
          name: "Difference of Squares & Cubes",
          latex: String.raw`a^2 - b^2 = (a-b)(a+b), \qquad a^3 \pm b^3 = (a \pm b)(a^2 \mp ab + b^2)`,
          description: String.raw`The most-used factorizations in competition math.`,
          keywords: ["factoring", "sum of cubes", "difference of cubes"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "an-minus-bn",
          name: "General $a^n - b^n$ and $a^n + b^n$",
          latex: String.raw`a^n - b^n = (a-b)(a^{n-1} + a^{n-2}b + \cdots + b^{n-1}), \qquad a^3 \pm b^3 = (a \pm b)(a^2 \mp ab + b^2)`,
          description: String.raw`Always divisible by $a - b$. For odd $n$, $a^n + b^n$ is divisible by $a + b$. Key for number theory divisibility arguments too.`,
          keywords: ["divisibility", "factor", "geometric sum", "odd exponent"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "sophie-germain",
          name: "Sophie Germain Identity",
          latex: String.raw`a^4 + 4b^4 = (a^2 + 2b^2 - 2ab)(a^2 + 2b^2 + 2ab)`,
          description: String.raw`Factors the deceptively prime-looking $a^4 + 4b^4$. Classic use: showing $n^4 + 4$ is composite for $n > 1$.`,
          example: String.raw`$5^4 + 4 = 629$ looks prime-ish, but with $a = 5, b = 1$: $(25 + 2 - 10)(25 + 2 + 10) = 17 \cdot 37 = 629$.`,
          keywords: ["fourth power", "composite", "factoring trick"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "sfft",
          name: "Simon's Favorite Factoring Trick (SFFT)",
          latex: String.raw`xy + ax + by + ab = (x + b)(y + a)`,
          description: String.raw`Add a constant to complete a product. Standard for solving $xy + ax + by = c$ over integers: factor and enumerate divisor pairs.`,
          example: String.raw`Solve $xy + 3x + 2y = 18$ over positive integers: add $6$ to both sides to get $(x+2)(y+3) = 24$. Factor pairs of $24$ with $x + 2 \ge 3$, $y + 3 \ge 4$: $(3,8), (4,6), (6,4)$ give $(x,y) = (1,5), (2,3), (4,1)$.`,
          keywords: ["sfft", "complete the rectangle", "integer solutions", "diophantine"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "cubes-minus-3abc",
          name: "$a^3 + b^3 + c^3 - 3abc$",
          latex: String.raw`a^3+b^3+c^3-3abc = (a+b+c)(a^2+b^2+c^2-ab-bc-ca)`,
          description: String.raw`So $a + b + c = 0 \implies a^3 + b^3 + c^3 = 3abc$. The second factor is $\frac{1}{2}[(a-b)^2+(b-c)^2+(c-a)^2] \ge 0$.`,
          keywords: ["sum of cubes", "three variables", "symmetric identity"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "square-of-sum",
          name: "Expansions of $(a+b+c)^2$",
          latex: String.raw`(a+b+c)^2 = a^2+b^2+c^2 + 2(ab+bc+ca), \qquad (a+b)^2 + (a-b)^2 = 2(a^2+b^2), \qquad (a+b)^2 - (a-b)^2 = 4ab`,
          description: String.raw`Converts between the three fundamental symmetric quantities. The sum/difference-of-squares pair turns $a \pm b$ data into $a^2 + b^2$ and $ab$ instantly. Also $(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$ and $x^2 + \frac{1}{x^2} = \left(x + \frac{1}{x}\right)^2 - 2$.`,
          keywords: ["symmetric sums", "expand", "x plus 1 over x"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "binomial-theorem",
          name: "Binomial Theorem",
          latex: String.raw`(x + y)^n = \sum_{k=0}^{n} \binom{n}{k} x^{n-k} y^k, \qquad (x+y)^n = x^n + \binom{n}{1}x^{n-1}y + \binom{n}{2}x^{n-2}y^2 + \cdots + y^n`,
          description: String.raw`Expansion coefficients are the binomial coefficients — row $n$ of Pascal's triangle.`,
          keywords: ["expansion", "pascal", "binomial coefficients", "powers"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "brahmagupta-fibonacci",
          name: "Brahmagupta–Fibonacci Identity",
          latex: String.raw`(a^2+b^2)(c^2+d^2) = (ac-bd)^2 + (ad+bc)^2`,
          description: String.raw`The product of two sums of two squares is itself a sum of two squares — the norm-multiplicativity of complex numbers $|zw| = |z||w|$ in disguise.`,
          keywords: ["sum of two squares", "product", "norms", "complex"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "sos-identity",
          name: "The SOS Identity",
          latex: String.raw`x^2 + y^2 + z^2 - xy - yz - zx = \frac{1}{2}\left[(x-y)^2 + (y-z)^2 + (z-x)^2\right]`,
          description: String.raw`The sum-of-squares form of the fundamental symmetric expression: instantly nonnegative, and zero exactly when $x = y = z$. Yields $x^2+y^2+z^2 \ge xy+yz+zx$ for all reals, powers the factor analysis of $x^3+y^3+z^3-3xyz$, and converts many "prove nonneg / find equality case" problems into a one-line rewrite.`,
          example: String.raw`If $x^2+y^2+z^2 = xy+yz+zx$, then $\frac{1}{2}\sum(x-y)^2 = 0$ forces $x = y = z$ — the standard opening of many symmetric-system problems.`,
          keywords: ["sum of squares", "sos", "x2 y2 z2 minus xy", "equality all equal", "nonnegative"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "useful-factorizations",
          name: "More Factorizations Worth Knowing",
          latex: String.raw`a^4 + a^2b^2 + b^4 = (a^2+ab+b^2)(a^2-ab+b^2), \qquad (a+b+c)^3 - a^3 - b^3 - c^3 = 3(a+b)(b+c)(c+a)`,
          description: String.raw`Two "won't factor... wait, yes it does" identities. The first is a disguised difference of squares: $(a^2+b^2)^2 - (ab)^2$ — the $x^4+x^2+1$ family. The second pairs with $(a+b)(b+c)(c+a) = (a+b+c)(ab+bc+ca) - abc$, converting between products and symmetric sums.`,
          example: String.raw`$x^4 + x^2 + 1 = (x^2+x+1)(x^2-x+1)$ — set $a = x, b = 1$. Numerically: $3^4 + 9 + 1 = 91 = 13 \cdot 7$, matching $(9+3+1)(9-3+1)$. ✓`,
          keywords: ["x4 x2 1", "hidden difference of squares", "cube of sum minus cubes", "product of pairwise sums", "weird factorizations"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Sequences & Series",
      formulas: [
        {
          id: "arithmetic-series",
          name: "Arithmetic Sequence & Series",
          latex: String.raw`a_n = a_1 + (n-1)d, \qquad S_n = \frac{n(a_1 + a_n)}{2}`,
          description: String.raw`Sum = number of terms times the average of the first and last. Number of terms from $a$ to $b$ step $d$: $\frac{b-a}{d} + 1$.`,
          keywords: ["arithmetic", "common difference", "sum", "average", "gauss", "triangular numbers", "1+2+3"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "geometric-series",
          name: "Geometric Series",
          latex: String.raw`a_n = a\,r^{n-1}, \qquad S_n = a\,\frac{1 - r^n}{1 - r}, \qquad S_\infty = \frac{a}{1 - r} \;\; (|r| < 1)`,
          description: String.raw`First term $a$, ratio $r$. Infinite sum converges only for $|r| < 1$.`,
          keywords: ["geometric", "common ratio", "infinite sum", "converge"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "power-sums",
          name: "Sums of Powers of Integers",
          latex: String.raw`\sum_{k=1}^n k = \frac{n(n+1)}{2}, \quad \sum k^2 = \frac{n(n+1)(2n+1)}{6}, \quad 1^3 + 2^3 + \cdots + n^3 = (1 + 2 + \cdots + n)^2`,
          description: String.raw`The sum of cubes equals the square of the sum: $\sum k^3 = \left(\frac{n(n+1)}{2}\right)^2$ — Nicomachus's identity, worth remembering on its own. Sum of the first $n$ odd numbers $= n^2$; sum of the first $n$ even numbers $= n(n+1)$.`,
          keywords: ["sum of squares", "sum of cubes", "square of the sum", "nicomachus", "triangular numbers", "odd numbers"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "telescoping",
          name: "Telescoping Sums",
          latex: String.raw`\frac{1}{k(k+1)} = \frac{1}{k} - \frac{1}{k+1} \implies \sum_{k=1}^{n} \frac{1}{k(k+1)} = 1 - \frac{1}{n+1}`,
          description: String.raw`Partial fractions collapse the sum. General tool: write each term as $f(k) - f(k+1)$; everything cancels except the ends.`,
          keywords: ["telescope", "partial fractions", "collapse", "cancel"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "arithmetico-geometric",
          name: "Arithmetico-Geometric Sum",
          latex: String.raw`\sum_{k=1}^{\infty} k x^k = \frac{x}{(1-x)^2} \quad (|x| < 1)`,
          description: String.raw`Derived by differentiating the geometric series, or by the shift trick $S - xS$. Finite version handles sums like $\sum k \cdot 2^k$.`,
          example: String.raw`$S = \frac{1}{2} + \frac{2}{4} + \frac{3}{8} + \cdots$: with $x = \frac{1}{2}$, $S = \frac{1/2}{(1/2)^2} = 2$. Or shift: $S - \frac{1}{2}S = \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \cdots = 1$, so $S = 2$.`,
          keywords: ["k times x to k", "weighted geometric", "expected value sums", "derivative trick"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "binets-formula",
          name: "Binet's Formula",
          latex: String.raw`F_n = \frac{\varphi^n - \psi^n}{\sqrt{5}}, \quad \varphi = \frac{1+\sqrt5}{2},\ \psi = \frac{1-\sqrt5}{2}, \qquad F_{n-1}F_{n+1} - F_n^2 = (-1)^n, \qquad \gcd(F_m, F_n) = F_{\gcd(m,n)}`,
          description: String.raw`Useful identities: $F_1 + \cdots + F_n = F_{n+2} - 1$, Cassini's $F_{n-1}F_{n+1} - F_n^2 = (-1)^n$, and $\gcd(F_m, F_n) = F_{\gcd(m,n)}$.`,
          keywords: ["fibonacci", "binet", "cassini", "golden ratio", "gcd", "lucas numbers"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "linear-recurrence",
          name: "Solving Linear Recurrences",
          latex: String.raw`a_n = c_1 a_{n-1} + c_2 a_{n-2} \implies x^2 = c_1 x + c_2, \qquad a_n = A r_1^n + B r_2^n \;\; (r_1 \ne r_2), \qquad a_n = (A + Bn) r^n \;\; (\text{double root})`,
          description: String.raw`Roots $r_1, r_2$ of the characteristic equation give $a_n = A r_1^n + B r_2^n$ (or $(A + Bn)r^n$ for a double root), with $A, B$ from initial terms.`,
          keywords: ["recurrence", "characteristic equation", "closed form"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "finite-differences",
          name: "Method of Finite Differences",
          latex: String.raw`\Delta a_n = a_{n+1} - a_n; \qquad \deg P = k \iff \Delta^k P \text{ is a nonzero constant}`,
          description: String.raw`A degree-$k$ polynomial has constant $k$-th differences (and the constant is $k! \cdot$ leading coefficient). Given consecutive values $P(1), P(2), \dots$, build the difference table and extend it rightward to evaluate further values — no interpolation formula needed.`,
          example: String.raw`Values $2, 3, 10, 29, 66$: differences $1, 7, 19, 37$; second differences $6, 12, 18$; third $6, 6$ — constant, so the source is a cubic, and extending the table gives the next value $66 + (37 + 24) = 127$.`,
          keywords: ["difference table", "constant differences", "extend sequence", "polynomial degree"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "periodic-sequences",
          name: "Periodicity in Recursive Sequences",
          latex: String.raw`\text{compute terms until they repeat, then } a_n = a_{n \bmod p \,(\text{adjusted})}`,
          description: String.raw`Nonlinear recursions built from a fixed rational rule (like $t_n = \frac{5t_{n-1}+1}{25t_{n-2}}$ or $a_{n+1} = |a_n| - a_{n-1}$) are very often periodic: iterate by hand until the initial pair reappears, confirm one full extra cycle, then reduce the target index modulo the period. Watch for pre-periods (a few irregular terms before the cycle starts).`,
          example: String.raw`$a_{n+1} = \frac{1}{1 - a_n}$ with $a_1 = 2$: the terms run $2, -1, \frac{1}{2}, 2, -1, \dots$ — period $3$. Since $2024 \equiv 2 \pmod 3$, $a_{2024} = a_2 = -1$.`,
          keywords: ["periodic", "cycle", "recursion repeats", "index mod period", "iterate"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "factorial-telescoping",
          name: "Factorial Telescoping Sums",
          latex: String.raw`\sum_{k=1}^{n} k \cdot k! = (n+1)! - 1, \qquad \sum_{k=1}^{n} \frac{k}{(k+1)!} = 1 - \frac{1}{(n+1)!}`,
          description: String.raw`Both collapse by rewriting the term as a difference: $k \cdot k! = (k+1)! - k!$ and $\frac{k}{(k+1)!} = \frac{1}{k!} - \frac{1}{(k+1)!}$. The factorial cousins of partial-fraction telescoping.`,
          example: String.raw`$1\cdot1! + 2\cdot2! + 3\cdot3! = 1 + 4 + 18 = 23 = 4! - 1$. ✓`,
          keywords: ["k times k factorial", "telescoping factorial", "factorial sums"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "first-order-recurrence",
          name: "First-Order Recurrence $a_n = r a_{n-1} + d$",
          latex: String.raw`L = \frac{d}{1 - r} \;\; (r \ne 1), \qquad a_n - L = r^n (a_0 - L), \qquad a_n = r^n (a_0 - L) + L`,
          description: String.raw`Find the fixed point $L$ (solve $L = rL + d$); measured from $L$, the sequence is purely geometric, so it converges to $L$ when $|r| < 1$ and explodes otherwise. If $r = 1$ the recurrence is just an arithmetic sequence, $a_n = a_0 + nd$.`,
          keywords: ["first order recurrence", "fixed point", "a_n = r a_{n-1} + d", "geometric plus constant", "steady state", "dilution", "compound interest"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Inequalities",
      formulas: [
        {
          id: "am-gm",
          name: "AM–GM Inequality",
          latex: String.raw`\frac{a_1 + a_2 + \cdots + a_n}{n} \ge \sqrt[n]{a_1 a_2 \cdots a_n}`,
          description: String.raw`For nonnegative reals; equality iff all equal. Two-variable form $a + b \ge 2\sqrt{ab}$ handles most AMC optimization problems.`,
          example: String.raw`Minimize $x + \frac{16}{x}$ for $x > 0$: AM–GM gives $x + \frac{16}{x} \ge 2\sqrt{16} = 8$, with equality when $x = \frac{16}{x}$, i.e. $x = 4$.`,
          keywords: ["arithmetic mean", "geometric mean", "optimization", "minimum", "maximum"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "mean-chain",
          name: "QM–AM–GM–HM Chain",
          latex: String.raw`\sqrt{\frac{\sum a_i^2}{n}} \;\ge\; \frac{\sum a_i}{n} \;\ge\; \sqrt[n]{\prod a_i} \;\ge\; \frac{n}{\sum \frac{1}{a_i}}`,
          description: String.raw`Quadratic mean $\ge$ arithmetic $\ge$ geometric $\ge$ harmonic, for positive reals; all equalities iff all values equal.`,
          keywords: ["root mean square", "harmonic mean", "power mean", "chain"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "cauchy-schwarz",
          name: "Cauchy–Schwarz Inequality",
          latex: String.raw`\left(\sum a_i b_i\right)^2 \le \left(\sum a_i^2\right)\left(\sum b_i^2\right), \qquad \sum \frac{x_i^2}{y_i} \ge \frac{\left(\sum x_i\right)^2}{\sum y_i} \;\;(\text{Titu}), \qquad (a_1 b_1 + a_2 b_2)^2 \le (a_1^2 + a_2^2)(b_1^2 + b_2^2)`,
          description: String.raw`Equality iff the sequences are proportional. Engel form (Titu's Lemma): $\sum \frac{x_i^2}{y_i} \ge \frac{(\sum x_i)^2}{\sum y_i}$ for positive $y_i$.`,
          example: String.raw`If $a + b = 1$ with $a, b > 0$, then by Titu: $\frac{1}{a} + \frac{1}{b} = \frac{1^2}{a} + \frac{1^2}{b} \ge \frac{(1+1)^2}{a+b} = 4$, with equality at $a = b = \frac{1}{2}$.`,
          keywords: ["cauchy", "titu", "engel form", "dot product", "vectors"],
          importance: "medium",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "rearrangement",
          name: "Rearrangement Inequality",
          latex: String.raw`\sum a_i b_i \;\text{(sorted same)} \;\ge\; \sum a_i b_{\sigma(i)} \;\ge\; \sum a_i b_i \;\text{(sorted opposite)}`,
          description: String.raw`Pairing two sorted sequences in the same order maximizes the sum of products; opposite order minimizes it. Chebyshev's sum inequality follows.`,
          keywords: ["sorted", "pairing", "maximize product sum", "chebyshev"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "trivial-inequality",
          name: "The Trivial Inequality",
          latex: String.raw`x^2 \ge 0`,
          description: String.raw`Squares are nonnegative — the source of nearly every classical inequality. Completing the square on the given expression is often the whole solution.`,
          keywords: ["square nonnegative", "complete the square", "smoothing"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "abs-triangle-inequality",
          name: "Absolute Value Triangle Inequality",
          latex: String.raw`|a + b| \le |a| + |b|, \qquad |a - b| \ge \big||a| - |b|\big|`,
          description: String.raw`Holds for reals, complex numbers, and vectors. Equality when the terms point the same way.`,
          keywords: ["absolute value", "modulus", "bound"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "jensens-inequality",
          name: "Jensen's Inequality",
          latex: String.raw`f \text{ convex} \implies f\!\left(\frac{x_1 + \cdots + x_n}{n}\right) \le \frac{f(x_1) + \cdots + f(x_n)}{n}`,
          description: String.raw`Convex ($f'' \ge 0$): chords lie above the graph, so the average of values beats the value at the average. Reversed for concave $f$. The weighted version $f\left(\sum \lambda_i x_i\right) \le \sum \lambda_i f(x_i)$ (with $\sum \lambda_i = 1$) generalizes it; AM–GM is Jensen applied to the concave $\ln x$.`,
          keywords: ["jensen", "convex", "concave", "chord above graph", "weighted average", "second derivative"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "schurs-inequality",
          name: "Schur's Inequality",
          latex: String.raw`x, y, z \ge 0,\; t > 0: \quad x^t(x-y)(x-z) + y^t(y-x)(y-z) + z^t(z-x)(z-y) \ge 0, \qquad t = 1: \;\; x^3 + y^3 + z^3 + 3xyz \ge xy(x+y) + yz(y+z) + zx(z+x)`,
          description: String.raw`The $t = 1$ case expands to $x^3 + y^3 + z^3 + 3xyz \ge xy(x+y) + yz(y+z) + zx(z+x)$ — the classic degree-3 symmetric inequality that AM–GM and Muirhead cannot reach. Equality when $x = y = z$, or when two are equal and the third is $0$.`,
          keywords: ["schur", "symmetric inequality", "three variables", "t equals 1", "degree 3"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "muirheads-inequality",
          name: "Muirhead's Inequality",
          latex: String.raw`(a_1, a_2, a_3) \succ (b_1, b_2, b_3) \implies \sum_{\text{sym}} x^{a_1} y^{a_2} z^{a_3} \;\ge\; \sum_{\text{sym}} x^{b_1} y^{b_2} z^{b_3}`,
          description: String.raw`For positive reals, where $\succ$ is majorization: $a_1 \ge b_1$, $a_1 + a_2 \ge b_1 + b_2$, equal total sums, both sorted decreasing. "More spread-out exponents win" — the rigorous version of bunching. E.g. $(2,0,0) \succ (1,1,0)$ gives $\sum_{\text{sym}} x^2 \ge \sum_{\text{sym}} xy$. Only valid for full symmetric sums (all $3! = 6$ permutation terms).`,
          keywords: ["muirhead", "majorization", "bunching", "symmetric sum", "exponents"],
          importance: "low",
          level: ["Olympiad"]
        }
      ]
    },
    {
      title: "Exponents & Logarithms",
      formulas: [
        {
          id: "log-rules",
          name: "Logarithm Rules",
          latex: String.raw`\log(xy) = \log x + \log y, \quad \log \frac{x}{y} = \log x - \log y, \quad \log x^n = n \log x`,
          description: String.raw`With $\log_b b^x = x$ and $b^{\log_b x} = x$. Valid for positive arguments and base $b > 0$, $b \neq 1$.`,
          keywords: ["log properties", "product rule", "power rule", "exponent"],
          importance: "high",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "change-of-base",
          name: "Change of Base",
          latex: String.raw`\log_b a = \frac{\log_c a}{\log_c b} = \frac{1}{\log_a b}`,
          description: String.raw`Also the chain rule: $\log_a b \cdot \log_b c = \log_a c$, which telescopes products of logs.`,
          keywords: ["change of base", "reciprocal", "telescoping logs"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "log-swap-identity",
          name: "The Exponent–Log Swap",
          latex: String.raw`a^{\log_b c} = c^{\log_b a}`,
          description: String.raw`Take $\log_b$ of both sides to verify. Turns awkward towers like $2^{\log_3 5}$ into friendlier ones like $5^{\log_3 2}$.`,
          keywords: ["swap", "tower", "trick identity"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "exponent-laws",
          name: "Exponent Laws",
          latex: String.raw`a^m a^n = a^{m+n}, \quad (a^m)^n = a^{mn}, \quad a^{-n} = \frac{1}{a^n}, \quad a^{1/n} = \sqrt[n]{a}`,
          description: String.raw`To solve $a^x = b^y$ type equations, write both sides over a common base and equate exponents.`,
          keywords: ["powers", "radicals", "common base", "rules"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        }
      ]
    },
    {
      title: "Complex Numbers",
      formulas: [
        {
          id: "complex-basics",
          name: "Modulus, Conjugate & $i$ Powers",
          latex: String.raw`|z|^2 = z\bar{z} = a^2 + b^2, \qquad i^2 = -1,\; i^4 = 1, \qquad \frac{1}{z} = \frac{\bar{z}}{|z|^2}`,
          description: String.raw`For $z = a + bi$: $\bar{z} = a - bi$, $\frac{1}{z} = \frac{\bar z}{|z|^2}$, and $|zw| = |z||w|$. Powers of $i$ cycle with period 4.`,
          keywords: ["imaginary", "modulus", "conjugate", "cycle", "magnitude"],
          importance: "high",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "eulers-formula",
          name: "Euler's Formula & Polar Form",
          latex: String.raw`e^{i\theta} = \cos\theta + i\sin\theta, \qquad z = re^{i\theta}`,
          description: String.raw`Multiplication multiplies moduli and adds angles — complex multiplication is rotation plus scaling. $e^{i\pi} + 1 = 0$.`,
          keywords: ["polar form", "cis", "rotation", "argument"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "de-moivre",
          name: "De Moivre's Theorem",
          latex: String.raw`(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta`,
          description: String.raw`Expand the left side with the binomial theorem and compare parts to derive multiple-angle formulas like $\cos 3\theta = 4\cos^3\theta - 3\cos\theta$.`,
          keywords: ["de moivre", "powers", "multiple angle"],
          importance: "high",
          level: ["AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Roots of Unity & Filters",
      formulas: [
        {
          id: "roots-of-unity",
          name: "Roots of Unity",
          latex: String.raw`z^n = 1 \iff z = e^{2\pi i k / n}, \quad k = 0, 1, \dots, n-1`,
          description: String.raw`The $n$ vertices of a regular $n$-gon on the unit circle. Their sum is $0$ (for $n > 1$), their product is $(-1)^{n+1}$, and $x^n - 1 = \prod (x - \omega^k)$.`,
          keywords: ["unit circle", "regular polygon", "sum zero", "omega", "nth roots"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "roots-of-unity-filter",
          name: "Roots of Unity Filter",
          latex: String.raw`\sum_{k \equiv r \,(\mathrm{mod}\, n)} \binom{m}{k} = \frac{1}{n} \sum_{j=0}^{n-1} \omega^{-jr} (1 + \omega^j)^m, \qquad \binom{m}{0} + \binom{m}{3} + \binom{m}{6} + \cdots = \frac{2^m + 2\cos(m\pi/3)}{3}`,
          description: String.raw`Extracts every $n$-th coefficient of a generating function using $\omega = e^{2\pi i/n}$. E.g. $\binom{m}{0} + \binom{m}{3} + \binom{m}{6} + \cdots = \frac{2^m + 2\cos(m\pi/3)}{3}$.`,
          keywords: ["roots of unity filter", "filter", "every third", "generating function", "coefficient extraction", "extract coefficients"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "roots-unity-distance-product",
          name: "Distance Products over Roots of Unity",
          latex: String.raw`\prod_{k=1}^{n-1} \left|1 - \omega^k\right| = n, \qquad \prod_{k=1}^{n-1} \sin\frac{k\pi}{n} = \frac{n}{2^{n-1}}`,
          description: String.raw`Factor $\frac{x^n - 1}{x - 1} = \prod_{k=1}^{n-1}(x - \omega^k)$ and plug in $x = 1$. Geometrically: the product of distances from one vertex of a regular $n$-gon (on a unit circle) to all other vertices is exactly $n$.`,
          example: String.raw`Regular hexagon on a unit circle: distances from one vertex to the rest are $1, \sqrt3, 2, \sqrt3, 1$, and $1 \cdot \sqrt3 \cdot 2 \cdot \sqrt3 \cdot 1 = 6$. ✓`,
          keywords: ["product of distances", "regular polygon vertices", "sine product", "roots of unity", "chord products"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        }
      ]
    },
    {
      title: "Trigonometric Identities",
      formulas: [
        {
          id: "pythagorean-identities",
          name: "Pythagorean Identities",
          latex: String.raw`\sin^2\theta + \cos^2\theta = 1, \quad 1 + \tan^2\theta = \sec^2\theta, \quad 1 + \cot^2\theta = \csc^2\theta`,
          description: String.raw`The second two follow from dividing the first by $\cos^2$ or $\sin^2$.`,
          keywords: ["sin squared", "identity", "sec", "csc"],
          importance: "high",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "angle-addition",
          name: "Angle Addition & Subtraction",
          latex: String.raw`\sin(a \pm b) = \sin a \cos b \pm \cos a \sin b, \qquad a\sin\theta + b\cos\theta = \sqrt{a^2+b^2}\,\sin(\theta + \varphi)`,
          description: String.raw`And $\tan(a \pm b) = \frac{\tan a \pm \tan b}{1 \mp \tan a \tan b}$. The source of double- and half-angle formulas.`,
          keywords: ["sum formula", "sin a plus b", "tangent addition", "harmonic addition", "max of a sin plus b cos"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "double-angle",
          name: "Double Angle Formulas",
          latex: String.raw`\sin 2\theta = 2\sin\theta\cos\theta, \quad \cos 2\theta = \cos^2\theta - \sin^2\theta = 2\cos^2\theta - 1 = 1 - 2\sin^2\theta`,
          description: String.raw`The three forms of $\cos 2\theta$ let you pick whichever variable you want to keep.`,
          keywords: ["double angle", "sin 2x", "cos 2x"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "half-angle",
          name: "Half Angle Formulas",
          latex: String.raw`\sin^2\frac{\theta}{2} = \frac{1 - \cos\theta}{2}, \qquad \cos^2\frac{\theta}{2} = \frac{1 + \cos\theta}{2}, \qquad \tan\frac{\theta}{2} = \frac{\sin\theta}{1 + \cos\theta} = \frac{1 - \cos\theta}{\sin\theta}`,
          description: String.raw`Also $\tan\frac{\theta}{2} = \frac{\sin\theta}{1 + \cos\theta} = \frac{1 - \cos\theta}{\sin\theta}$.`,
          keywords: ["half angle", "power reduction", "tan half angle inradius"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "product-sum",
          name: "Product-to-Sum & Sum-to-Product",
          latex: String.raw`\sin a \sin b = \tfrac{1}{2}[\cos(a-b) - \cos(a+b)], \quad \sin a + \sin b = 2\sin\tfrac{a+b}{2}\cos\tfrac{a-b}{2}`,
          description: String.raw`The full families convert between products and sums — essential for telescoping trig sums and products on AIME.`,
          keywords: ["product to sum", "sum to product", "telescoping trig"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "special-trig-values",
          name: "Special Values Worth Memorizing",
          latex: String.raw`\sin 15^\circ = \frac{\sqrt{6} - \sqrt{2}}{4}, \qquad \cos 36^\circ = \frac{1 + \sqrt{5}}{4}, \qquad \sin 18^\circ = \frac{\sqrt{5} - 1}{4}, \qquad \cos 36^\circ = \frac{1 + \sqrt{5}}{4}, \qquad \sin 18^\circ = \frac{\sqrt{5} - 1}{4}, \qquad \tan 15^\circ = 2 - \sqrt{3}`,
          description: String.raw`Note $\cos 36^\circ = \frac{\varphi}{2}$ and $\sin 18^\circ = \frac{\varphi - 1}{2}$ where $\varphi$ is the golden ratio. Also $\tan 15^\circ = 2 - \sqrt{3}$ and $\tan 75^\circ = 2 + \sqrt{3}$. Pentagon and 15-75-90 problems reduce to these.`,
          keywords: ["15 degrees", "18 degrees", "36 degrees", "golden ratio", "exact values"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "triple-angle",
          name: "Triple Angle Formulas",
          latex: String.raw`\sin 3\theta = 3\sin\theta - 4\sin^3\theta, \qquad \cos 3\theta = 4\cos^3\theta - 3\cos\theta`,
          description: String.raw`Related gem: $\sin\theta \sin(60^\circ - \theta) \sin(60^\circ + \theta) = \frac{\sin 3\theta}{4}$, and the same with cosines.`,
          keywords: ["triple angle", "sin 3x", "cos 3x"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "trig-telescoping-product",
          name: "Telescoping Cosine Products",
          latex: String.raw`\prod_{k=0}^{n-1} \cos(2^k \theta) = \frac{\sin(2^n \theta)}{2^n \sin\theta}`,
          description: String.raw`Repeatedly apply $\sin 2x = 2\sin x \cos x$ from the inside out: each doubling absorbs one cosine. The standard weapon for products like $\cos 20^\circ \cos 40^\circ \cos 80^\circ$.`,
          example: String.raw`$\cos 20^\circ \cos 40^\circ \cos 80^\circ = \frac{\sin 160^\circ}{2^3 \sin 20^\circ} = \frac{\sin 20^\circ}{8 \sin 20^\circ} = \frac{1}{8}$.`,
          keywords: ["cosine product", "doubling angles", "sin 2x telescoping", "product of cosines"],
          importance: "low",
          level: ["AMC12", "AIME"]
        },
        {
          id: "arctan-telescoping",
          name: "Arctangent Addition & Telescoping",
          latex: String.raw`\arctan a - \arctan b = \arctan\frac{a - b}{1 + ab}`,
          description: String.raw`Read right-to-left: a term $\arctan\frac{a-b}{1+ab}$ splits into a difference, so sums of arctangents telescope. Trigger: denominators like $1 + n(n+1)$, i.e. $n^2 + n + 1$.`,
          example: String.raw`Since $\frac{1}{n^2+n+1} = \frac{(n+1) - n}{1 + n(n+1)}$, each term is $\arctan(n{+}1) - \arctan n$, so $\sum_{n=1}^{\infty} \arctan\frac{1}{n^2+n+1} = \frac{\pi}{2} - \arctan 1 = \frac{\pi}{4}$.`,
          keywords: ["arctan sum", "telescoping arctangent", "inverse tangent", "tan difference"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "sin-cos-ap-sum",
          name: "Sum of Sines/Cosines in Arithmetic Progression",
          latex: String.raw`\sum_{k=0}^{n-1} \sin(a + kd) = \frac{\sin\frac{nd}{2}}{\sin\frac{d}{2}} \sin\!\left(a + \frac{(n-1)d}{2}\right)`,
          description: String.raw`Same formula with cosine on the right for cosine sums. Proof: multiply by $2\sin\frac{d}{2}$ and telescope with product-to-sum. Handles sums like $\cos 1^\circ + \cos 2^\circ + \cdots$ and vertex sums of regular polygons.`,
          example: String.raw`$\sin 20^\circ + \sin 40^\circ + \cdots + \sin 160^\circ$ ($n = 8$, $d = 20^\circ$): $\frac{\sin 80^\circ}{\sin 10^\circ}\sin 90^\circ = \frac{\cos 10^\circ}{\sin 10^\circ} = \cot 10^\circ$.`,
          keywords: ["sum of sines", "sum of cosines", "arithmetic progression angles", "dirichlet kernel"],
          importance: "low",
          level: ["AIME"]
        },
        {
          id: "triangle-angle-identities",
          name: "Identities for Angles Summing to 180°",
          latex: String.raw`\tan A + \tan B + \tan C = \tan A \tan B \tan C, \qquad \cos A + \cos B + \cos C = 1 + \frac{r}{R}, \qquad \sin A + \sin B + \sin C = \frac{s}{R}, \qquad \sin 2A + \sin 2B + \sin 2C = 4\sin A \sin B \sin C`,
          description: String.raw`Valid whenever $A + B + C = 180^\circ$. Companions: $\sin A + \sin B + \sin C = \frac{s}{R}$, $\;\sin 2A + \sin 2B + \sin 2C = 4\sin A \sin B \sin C$, and $\cot A \cot B + \cot B \cot C + \cot C \cot A = 1$. The tangent identity comes from expanding $\tan(A + B) = \tan(180^\circ - C)$.`,
          example: String.raw`$45^\circ + 60^\circ + 75^\circ = 180^\circ$: $\tan 45 + \tan 60 + \tan 75 = 1 + \sqrt3 + (2+\sqrt3) = 3 + 2\sqrt3$, and the product $1 \cdot \sqrt3 \cdot (2+\sqrt3) = 2\sqrt3 + 3$. Equal. ✓`,
          keywords: ["tan sum product", "angles sum 180", "cos sum r over R", "triangle identities"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "weierstrass-substitution",
          name: "Weierstrass Substitution",
          latex: String.raw`t = \tan\tfrac{\theta}{2}: \quad \sin\theta = \frac{2t}{1 + t^2}, \quad \cos\theta = \frac{1 - t^2}{1 + t^2}, \quad \tan\theta = \frac{2t}{1 - t^2}`,
          description: String.raw`One substitution turns every trig function of $\theta$ into a rational function of $t = \tan\frac{\theta}{2}$, converting a trig equation into a polynomial one. The triple $(1 - t^2, \, 2t, \, 1 + t^2)$ is also a Pythagorean-triple generator.`,
          keywords: ["weierstrass substitution", "half angle t", "tan theta over 2", "rationalize trig", "pythagorean triple"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        }
      ]
    },
    {
      title: "Floors, Radicals & Misc",
      formulas: [
        {
          id: "floor-basics",
          name: "Floor & Fractional Part",
          latex: String.raw`x = \lfloor x \rfloor + \{x\}, \qquad 0 \le \{x\} < 1`,
          description: String.raw`$\lfloor x + n \rfloor = \lfloor x \rfloor + n$ for integers $n$, and $\lfloor x \rfloor + \lfloor -x \rfloor = -1$ unless $x$ is an integer (then $0$).`,
          keywords: ["floor function", "fractional part", "greatest integer"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "hermite-identity",
          name: "Hermite's Identity",
          latex: String.raw`\lfloor nx \rfloor = \lfloor x \rfloor + \left\lfloor x + \tfrac{1}{n} \right\rfloor + \cdots + \left\lfloor x + \tfrac{n-1}{n} \right\rfloor`,
          description: String.raw`Splits $\lfloor nx \rfloor$ into $n$ shifted floors. Handy for floor-sum problems and proving floor identities.`,
          keywords: ["hermite", "floor sum", "nx"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "denesting-radicals",
          name: String.raw`Denesting $\sqrt{a \pm \sqrt{b}}$`,
          latex: String.raw`\sqrt{a \pm \sqrt{b}} = \sqrt{\frac{a + \sqrt{a^2 - b}}{2}} \pm \sqrt{\frac{a - \sqrt{a^2 - b}}{2}}`,
          description: String.raw`Works cleanly when $a^2 - b$ is a perfect square. E.g. $\sqrt{3 + 2\sqrt2} = 1 + \sqrt2$ — guess $(\sqrt x + \sqrt y)^2$ and match.`,
          keywords: ["nested radical", "denest", "simplify square root"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "infinite-nest",
          name: "Infinite Nested Expressions",
          latex: String.raw`x = \sqrt{a + x} \implies x^2 - x - a = 0`,
          description: String.raw`For $\sqrt{a + \sqrt{a + \cdots}}$, continued fractions $a + \cfrac{1}{a + \cdots}$, or infinite power towers: name the expression $x$, use self-similarity, solve, and keep the valid root.`,
          keywords: ["self similar", "continued fraction", "power tower", "converge"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "rationalizing",
          name: "Rationalizing & Conjugates",
          latex: String.raw`\frac{1}{\sqrt{a} + \sqrt{b}} = \frac{\sqrt{a} - \sqrt{b}}{a - b}`,
          description: String.raw`Multiplying by the conjugate telescopes sums like $\sum \frac{1}{\sqrt{k} + \sqrt{k+1}} = \sum (\sqrt{k+1} - \sqrt{k})$. Conjugate pairs also make $(3+\sqrt5)^n + (3-\sqrt5)^n$ an integer — the key to fractional-part-of-surd-power problems.`,
          keywords: ["conjugate", "rationalize denominator", "telescoping radicals"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "absolute-value-rules",
          name: "Absolute Value Rules",
          latex: String.raw`|x| < a \iff -a < x < a, \qquad |x| > a \iff x < -a \text{ or } x > a, \qquad \sqrt{x^2} = |x|`,
          description: String.raw`Split on the sign inside. $|x - c|$ is the distance from $x$ to $c$ on the number line, so $|x - c| = d$ marks the two points $d$ away from $c$. Also $|x| = |y| \iff x = \pm y$, $\;|xy| = |x||y|$, and the triangle inequality $|x + y| \le |x| + |y|$.`,
          keywords: ["absolute value", "distance on number line", "split cases", "sqrt x squared", "modulus"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        }
      ]
    },    {
      title: "Rates, Work & Mixtures",
      formulas: [
        {
          id: "work-rates",
          name: "Combined Work Rates",
          latex: String.raw`\frac{1}{t_{\text{together}}} = \frac{1}{t_1} + \frac{1}{t_2} + \cdots`,
          description: String.raw`Rates add, times don't: convert every worker/pipe/hose to jobs-per-hour, add, and invert at the end. Two workers taking $a$ and $b$ hours finish together in $\frac{ab}{a+b}$ hours.`,
          example: String.raw`One pipe fills a pool in $4$ hours, another in $6$: together $\frac{1}{4} + \frac{1}{6} = \frac{5}{12}$ pool per hour, so $\frac{12}{5} = 2.4$ hours.`,
          keywords: ["work rate", "together", "pipes fill", "jobs per hour", "combined time"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "average-speed",
          name: "Average Speed",
          latex: String.raw`v_{\text{avg}} = \frac{\text{total distance}}{\text{total time}}; \qquad \text{equal distances at } v_1, v_2: \; v_{\text{avg}} = \frac{2v_1v_2}{v_1+v_2}`,
          description: String.raw`Average speed is never the plain average of speeds unless the times are equal. Over equal distances it is the harmonic mean — always closer to the slower speed. Compute total distance over total time and nothing can go wrong.`,
          example: String.raw`Drive somewhere at $30$ mph and return at $60$ mph: average speed $\frac{2 \cdot 30 \cdot 60}{90} = 40$ mph, not $45$.`,
          keywords: ["average speed", "harmonic mean", "round trip", "total distance over time"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "relative-motion",
          name: "Relative Motion",
          latex: String.raw`\text{closing speed} = v_1 + v_2 \;(\text{toward}), \quad v_1 - v_2 \;(\text{chasing}); \qquad \text{current: } v_{\text{net}} = v_{\text{still}} \pm v_{\text{stream}}`,
          description: String.raw`Work in the frame of one mover: gaps close at the sum (head-on) or difference (chase) of speeds, so time = gap ÷ closing speed. Rivers, moving walkways, and wind add or subtract a drift vector — for crossing problems, split the velocity into across-stream and along-stream components.`,
          example: String.raw`Runner at $8$ m/s chasing one at $5$ m/s with a $60$ m head start: catches up in $\frac{60}{3} = 20$ seconds.`,
          keywords: ["relative speed", "catch up", "head start", "river current", "upstream downstream", "closing speed"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "weighted-average",
          name: "Weighted Averages & Mixtures",
          latex: String.raw`\bar{x} = \frac{w_1x_1 + w_2x_2}{w_1 + w_2}; \qquad \text{mixing ratio } \frac{w_1}{w_2} = \frac{x_2 - \bar{x}}{\bar{x} - x_1}`,
          description: String.raw`A mixture's concentration (or a combined class average) is the weight-weighted mean of the parts, and it always lies between them — the weights are inversely proportional to the distances (the "alligation" seesaw). Track the amount of pure substance before and after.`,
          example: String.raw`Mixing $30\%$ acid with $70\%$ acid to get $45\%$: ratio $\frac{70 - 45}{45 - 30} = \frac{25}{15} = \frac{5}{3}$ — five parts weak to three parts strong.`,
          keywords: ["weighted mean", "mixture", "concentration", "alligation", "class average"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        }
      ]
    },
    {
      title: "Problem-Solving Methods",
      formulas: [
        {
          id: "fx-pairing",
          name: "The $f(x) + f(1-x)$ Pairing Trick",
          type: "method",
          latex: String.raw`f(x) + f(1 - x) = \text{constant} \implies \sum_{k=1}^{n-1} f\!\left(\tfrac{k}{n}\right) = \frac{n-1}{2} \cdot \text{const}`,
          description: String.raw`When a sum's arguments pair up symmetrically ($x$ with $1-x$, or $k$ with $n-k$), test whether $f(x) + f(1-x)$ simplifies to a constant — then the whole sum collapses to (number of pairs) × constant. The Gauss pairing idea, upgraded to functions.`,
          example: String.raw`$f(x) = \frac{9^x}{9^x + 3}$ satisfies $f(x) + f(1-x) = 1$ (multiply the second fraction by $\frac{9^x}{3}$). So $f\!\left(\frac{1}{1001}\right) + \cdots + f\!\left(\frac{1000}{1001}\right) = 500$.`,
          keywords: ["pairing", "f(x) f(1-x)", "symmetric sum", "gauss trick", "method"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "trig-substitution",
          name: "Trigonometric Substitution",
          type: "method",
          latex: String.raw`|x| \le 1 \Rightarrow x = \cos\theta, \qquad \sqrt{1 - x^2} = \sin\theta, \qquad 2x^2 - 1 = \cos 2\theta`,
          description: String.raw`When a problem lives on $[-1, 1]$, involves $\sqrt{1 - x^2}$, or iterates $x \mapsto 2x^2 - 1$, substitute $x = \cos\theta$: radicals vanish and iteration becomes angle doubling. Nested radicals $\sqrt{2 + \sqrt{2 + \cdots}}$ become half-angle cosines via $\sqrt{2 + 2\cos\theta} = 2\cos\frac{\theta}{2}$.`,
          example: String.raw`$\underbrace{\sqrt{2 + \sqrt{2 + \cdots + \sqrt{2}}}}_{n \text{ radicals}} = 2\cos\frac{\pi}{2^{n+1}}$ — e.g. $\sqrt{2} = 2\cos\frac{\pi}{4}$, $\sqrt{2+\sqrt2} = 2\cos\frac{\pi}{8}$.`,
          keywords: ["substitute cosine", "sqrt 1 minus x squared", "angle doubling", "nested radicals", "chebyshev", "method"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "functional-substitution",
          name: "Functional Equation Substitution",
          type: "method",
          latex: String.raw`\text{try } (0,0), \; (x, 0), \; (x, x), \; (x, -x), \; (x, 1) \text{ in order}`,
          description: String.raw`For an equation holding for all reals, plug in structured values: $(0,0)$ pins $f(0)$; $(x, 0)$ relates $f(x)$ to constants; $(x, x)$ and $(x, -x)$ produce doubling laws and parity. Cosine-flavored equations like $f(a+b) + f(a-b) = 2f(a)f(b)$ (2023 AMC 12B #22) yield to exactly this sequence.`,
          example: String.raw`For $f(a+b) + f(a-b) = 2f(a)f(b)$, not identically zero: $a = b = 0$ gives $2f(0) = 2f(0)^2$, so $f(0) \in \{0, 1\}$; if $f(0) = 0$, setting $b = 0$ gives $2f(a) = 0$ for all $a$ — excluded. So $f(0) = 1$, and $a = 0$ then gives $f(b) + f(-b) = 2f(b)$: $f$ is even. (Solutions behave like $\cos kx$ and $\cosh kx$.)`,
          keywords: ["functional equation", "plug in zero", "substitution", "f(x+y)", "parity", "method"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "cauchy-functional-equations",
          name: "Cauchy's Functional Equations",
          latex: String.raw`f(x+y) = f(x)+f(y) \Rightarrow cx; \quad f(x+y) = f(x)f(y) \Rightarrow c^x; \quad f(xy) = f(x)+f(y) \Rightarrow \log; \quad f(xy) = f(x)f(y) \Rightarrow x^c`,
          description: String.raw`The four classical templates: additive → linear, additive-to-multiplicative → exponential, multiplicative-to-additive → logarithmic, multiplicative → power (each assuming continuity, monotonicity, or boundedness — contest problems always supply enough regularity). Recognizing the template usually solves the problem outright.`,
          example: String.raw`If $f(x+y) = f(x)f(y)$ for all reals and $f(2) = 9$ with $f$ positive, then $f(x) = c^x$ with $c^2 = 9$: $f(x) = 3^x$, so $f(5) = 243$.`,
          keywords: ["cauchy equation", "additive", "multiplicative", "exponential form", "standard solutions"],
          importance: "low",
          level: ["AMC12", "AIME"]
        },
        {
          id: "piecewise-graph-counting",
          name: "Counting Solutions by Graphing",
          type: "method",
          latex: String.raw`\#\text{solutions of } f(x) = c \;=\; \#\text{crossings of } y = f(x) \text{ with } y = c`,
          description: String.raw`For nested absolute values and piecewise functions, don't solve — draw. Build the graph by transformations (each $|\cdot|$ folds the picture upward; each subtraction shifts it), then slide the horizontal line and count crossings as the parameter varies. Corner heights tell you exactly where the count jumps.`,
          example: String.raw`$||x| - 2| = c$: the W-shaped graph has valleys at height $0$ ($x = \pm2$) and a local peak at height $2$ ($x = 0$). So: $4$ solutions for $0 < c < 2$, $3$ at $c = 2$, $2$ for $c > 2$ or $c = 0$.`,
          keywords: ["absolute value graph", "count solutions", "W shape", "fold", "parameter", "method"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "sp-substitution",
          name: "Symmetric Substitution",
          type: "method",
          latex: String.raw`s = x + y, \; p = xy: \qquad x^2 + y^2 = s^2 - 2p, \qquad x^3 + y^3 = s^3 - 3sp, \qquad (x - y)^2 = s^2 - 4p`,
          description: String.raw`Any symmetric system or expression in two variables collapses to the sum and product. Solve for $s$ and $p$, then recover $x, y$ as the roots of $t^2 - st + p = 0$ — Vieta run in reverse. For three variables the same game uses $e_1, e_2, e_3$ with Newton's sums.`,
          keywords: ["symmetric substitution", "sum and product", "x plus y xy", "collapse system", "s p", "method"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "partial-fractions",
          name: "Partial Fractions",
          type: "method",
          latex: String.raw`\frac{1}{(x + a)(x + b)} = \frac{1}{b - a}\left( \frac{1}{x + a} - \frac{1}{x + b} \right)`,
          description: String.raw`Break a rational function into a sum of simpler pieces, one per denominator factor. This is the engine behind telescoping sums — the split above collapses $\sum \frac{1}{k(k+1)}$ — and behind pulling coefficients out of a generating function once its denominator is factored.`,
          keywords: ["partial fractions", "decompose rational", "telescoping", "cover up", "generating function coefficients", "method"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "solving-recurrences",
          name: "Solving Recurrences",
          type: "method",
          latex: String.raw`\text{classify} \to \text{characteristic roots} \to \text{particular} + \text{homogeneous} \to \text{fit the initial terms}`,
          description: String.raw`A decision tree for turning a recursive definition into a closed form. First-order linear ($a_n = ra_{n-1} + d$): shift to the fixed point and it becomes geometric. Homogeneous linear with constant coefficients: solve the characteristic polynomial, then $a_n = \sum A_i r_i^n$, with $(A + Bn)r^n$ for a double root. Non-homogeneous: add a particular solution matched to the right-hand side. Non-linear: substitute ($b_n = \frac{1}{a_n}$, $b_n = \log a_n$, $b_n = a_n - L$), telescope, or test for periodicity.`,
          keywords: ["solving recurrences", "closed form", "general form of a recursive sequence", "characteristic equation", "particular solution", "substitution recurrence", "method"],
          importance: "high",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "normalization",
          name: "Normalization \& Homogenization",
          type: "method",
          latex: String.raw`\text{homogeneous problem} \implies \text{WLOG set } a + b + c = 1 \text{ (or } abc = 1, \text{ or a side } = 1)`,
          description: String.raw`When an expression or inequality is homogeneous (scaling all variables by $t$ scales both sides the same way), you may impose one convenient constraint for free — normalize the sum, the product, or one length to $1$ — killing a degree of freedom without loss of generality. The reverse move, homogenizing, multiplies the low-degree terms of a constrained problem by the constraint to make every term the same degree, so tools like Muirhead and Schur apply.`,
          keywords: ["normalization", "homogenize", "wlog scale", "set sum to 1", "degree of freedom", "homogeneous inequality", "method"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        }
      ]
    }
  ]
});
