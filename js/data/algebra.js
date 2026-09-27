// Algebra formulas: polynomials, identities, series, inequalities, logs, complex numbers, trig.
window.MATH_SECTIONS = window.MATH_SECTIONS || [];

window.MATH_SECTIONS.push({
  id: "algebra",
  group: "formulas",
  title: "Algebra",
  blurb: "Polynomials, factoring tricks, series, inequalities, logarithms, complex numbers, trigonometry, and the matrix and linear-system notation the rest of the library leans on.",
  subsections: [
    {
      title: "Polynomials & Equations",
      formulas: [
        {
          id: "cauchy-functional-equations",
          name: "Cauchy's Functional Equations",
          latex: String.raw`f(x+y) = f(x)+f(y) \Rightarrow cx; \quad f(x+y) = f(x)f(y) \Rightarrow c^x; \quad f(xy) = f(x)+f(y) \Rightarrow \log; \quad f(xy) = f(x)f(y) \Rightarrow x^c`,
          description: String.raw`The four classical templates: additive → linear, additive-to-multiplicative → exponential, multiplicative-to-additive → logarithmic, multiplicative → power (each assuming continuity, monotonicity, or boundedness — contest problems always supply enough regularity). Recognizing the template usually solves the problem outright.`,
          keywords: ["cauchy equation", "additive", "multiplicative", "exponential form", "standard solutions"],
          importance: "low",
          level: ["AMC12", "AIME"]
        },
        {
          id: "quadratic-formula",
          name: "Quadratic Formula & Discriminant",
          latex: String.raw`x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}, \qquad \Delta = b^2 - 4ac`,
          description: String.raw`The quadratic formula gives the solutions of any quadratic equation $ax^2 + bx + c = 0$ with $a \ne 0$: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$. The number under the square root, the discriminant $\Delta = b^2 - 4ac$, decides what kind of roots there are without finding them: two real roots if $\Delta \gt 0$, one repeated root if $\Delta = 0$, and two complex conjugate roots if $\Delta \lt 0$. For a quadratic with integer coefficients the roots are rational exactly when $\Delta$ is a perfect square. Before using the formula, check whether the quadratic factors, or whether [[vietas-quadratic|Vieta's Formulas]] already answer the question.`,
          keywords: ["roots", "discriminant", "real solutions", "perfect square"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "vietas-quadratic",
          name: "Vieta's Formulas (Quadratic)",
          latex: String.raw`r + s = -\frac{b}{a}, \qquad rs = \frac{c}{a}, \qquad r^2 + s^2 = (r+s)^2 - 2rs, \qquad \frac{1}{r} + \frac{1}{s} = \frac{r+s}{rs}, \qquad |r - s| = \frac{\sqrt{\Delta}}{|a|}`,
          description: String.raw`Vieta's Formulas for a quadratic give the sum and product of its roots straight from the coefficients: the roots $r$ and $s$ of $ax^2 + bx + c = 0$ satisfy $r + s = -\frac ba$ and $rs = \frac ca$. Any symmetric expression in the two roots then follows without solving, such as $r^2 + s^2 = (r + s)^2 - 2rs$ and $\frac1r + \frac1s = \frac{r + s}{rs}$. They also run in reverse: two numbers with sum $p$ and product $q$ are the roots of $x^2 - px + q = 0$, which solves a system like $x + y = 7$, $xy = 12$ at once.`,
          keywords: ["sum of roots", "product of roots", "vieta", "vietas formulas", "roots sum and product", "quadratic root relations"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "vietas-general",
          name: "Vieta's Formulas (General Degree)",
          latex: String.raw`e_k(r_1, \dots, r_n) = (-1)^k \frac{a_{n-k}}{a_n}, \qquad x^3 + bx^2 + cx + d: \;\; r+s+t = -b, \quad rs+rt+st = c, \quad rst = -d`,
          description: String.raw`Vieta's Formulas express the sum of a polynomial's roots, the sum of their products two at a time, and so on up to their product, in terms of its coefficients. Reach for them whenever a question is about the roots but never asks for one, which describes most AIME polynomial problems: the roots are usually impossible to find and never needed. For $a_nx^n + a_{n-1}x^{n-1} + \cdots + a_0$ the sum of the roots is $-\frac{a_{n-1}}{a_n}$, the sum of products two at a time is $\frac{a_{n-2}}{a_n}$, and the product of all $n$ roots is $(-1)^n\frac{a_0}{a_n}$, the signs alternating as the products get longer. Roots are counted with multiplicity, and complex roots count too.`,
          keywords: ["symmetric functions", "cubic", "sum of roots", "product of roots", "coefficients"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "fundamental-theorem-algebra",
          name: "Fundamental Theorem of Algebra",
          latex: String.raw`\deg P = n \ge 1 \implies P(x) = a_n\prod_{k=1}^{n}(x - r_k), \quad r_k \in \mathbb{C}`,
          latexPlain: String.raw`\deg P = n \ge 1 \implies P(x) = a_n(x - r_1)(x - r_2)\cdots(x - r_n), \quad r_k \in \mathbb{C}`,
          description: String.raw`Every degree-$n$ polynomial with complex coefficients has exactly $n$ complex roots counted with multiplicity, so it factors completely into $n$ linear factors over $\mathbb{C}$. Corollaries: a polynomial of degree $\le n$ with $n+1$ roots is identically zero, any $n+1$ values determine it uniquely (interpolation), and a real polynomial splits into real linear and irreducible-quadratic factors — so odd degree forces a real root.`,
          keywords: ["fundamental theorem of algebra", "fta", "complex roots", "n roots with multiplicity", "factors completely", "number of roots"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "factor-remainder-theorem",
          name: "Remainder & Factor Theorems",
          latex: String.raw`P(x) = (x - a)Q(x) + P(a), \qquad a, b \in \mathbb{Z} \implies (a - b) \mid P(a) - P(b)`,
          description: String.raw`The Remainder Theorem says that dividing a polynomial $P(x)$ by $x - a$ leaves the remainder $P(a)$, and the Factor Theorem is the special case: $x - a$ divides $P(x)$ exactly when $P(a) = 0$. So remainders come from evaluating rather than dividing, and more generally the remainder on division by $(x - a)(x - b)$ is the line through $(a, P(a))$ and $(b, P(b))$. For polynomials with integer coefficients the same idea gives $(a - b) \mid P(a) - P(b)$ for all integers $a$ and $b$, the standard tool for proving that no such polynomial exists.`,
          keywords: ["remainder", "polynomial division", "root", "factor", "remainder theorem", "factor theorem", "integer polynomial", "divides difference", "impossible polynomial", "P(a) P(b)", "integer polynomial divisibility"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "rational-root-theorem",
          name: "Rational Root Theorem",
          latex: String.raw`x = \frac{p}{q} \implies p \mid a_0, \; q \mid a_n`,
          description: String.raw`The Rational Root Theorem says that if a polynomial with integer coefficients has a rational root $\frac pq$ in lowest terms, then $p$ divides the constant term and $q$ divides the leading coefficient. It turns the search for rational roots into a finite list of candidates, which is the standard first step in factoring a cubic or a quartic. For a monic polynomial $q$ must be $1$, so every rational root is an integer that divides the constant term.`,
          keywords: ["rational roots", "integer polynomial", "candidates", "rational root test", "possible rational roots", "p over q roots"],
          importance: "high",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "coefficient-extraction",
          name: "Coefficient Sums",
          latex: String.raw`P(1) = \sum a_i, \qquad \frac{P(1) + P(-1)}{2} = \sum_{\text{even } i} a_i, \qquad \frac{P(1) - P(-1)}{2} = \sum_{\text{odd } i} a_i`,
          latexPlain: String.raw`P(1) = a_0 + a_1 + a_2 + \cdots, \qquad \frac{P(1) + P(-1)}{2} = a_0 + a_2 + a_4 + \cdots, \qquad \frac{P(1) - P(-1)}{2} = a_1 + a_3 + a_5 + \cdots`,
          description: String.raw`Coefficient sums are sums of a polynomial's coefficients, read off by evaluating the polynomial instead of expanding it: $P(1)$ is the sum of all the coefficients, $P(-1)$ their alternating sum, and $P(0)$ the constant term. It is the first move whenever a question asks about the coefficients of a product or power too large to multiply out, such as $(1 + x + x^2)^{10}$. Averaging $P(1)$ and $P(-1)$ separates the even-index coefficients from the odd ones.`,
          keywords: ["sum of coefficients", "plug in 1", "alternating sum", "even coefficients", "generating polynomial"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "conjugate-root-theorems",
          name: "Conjugate Root Theorems",
          latex: String.raw`a + bi \text{ a root} \implies a - bi \text{ a root}; \qquad a + b\sqrt{d} \implies a - b\sqrt{d}`,
          description: String.raw`The Conjugate Root Theorems say that the non-real roots of a polynomial with real coefficients come in conjugate pairs, $a + bi$ and $a - bi$, and that for a polynomial with rational coefficients, a root $a + b\sqrt d$, with $\sqrt d$ irrational, comes paired with $a - b\sqrt d$. Each pair multiplies to a quadratic factor with the same kind of coefficients as the polynomial. So one given root is really two, which is often exactly the missing information in a problem about a polynomial.`,
          keywords: ["complex conjugate", "radical conjugate", "pairs of roots", "conjugate roots", "irrational roots in pairs", "imaginary roots in pairs"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "vertex-form",
          name: "Vertex of a Parabola",
          latex: String.raw`x = -\frac{b}{2a}, \qquad y = c - \frac{b^2}{4a}`,
          description: String.raw`The vertex of the parabola $y = ax^2 + bx + c$ is its turning point, at $x = -\frac{b}{2a}$ with height $c - \frac{b^2}{4a}$: a minimum when $a \gt 0$ and a maximum when $a \lt 0$. It answers every maximize-or-minimize question about a quadratic without calculus. The parabola is symmetric about the vertical line through the vertex, so any two points at equal heights, the two roots in particular, sit symmetrically about $x = -\frac{b}{2a}$.`,
          keywords: ["vertex", "maximum", "minimum", "parabola", "axis of symmetry"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "descartes-rule-signs",
          name: "Descartes' Rule of Signs",
          latex: String.raw`\#\{\text{positive roots}\} = \#\{\text{sign changes of } P(x)\} - 2k, \quad k \ge 0`,
          description: String.raw`Count sign changes between consecutive nonzero coefficients: the number of positive real roots equals that count or falls short of it by an even number. For negative roots, apply the same rule to $P(-x)$.`,
          keywords: ["sign changes", "positive roots", "negative roots", "real roots count"],
          importance: "low",
          level: ["AMC12", "AIME"]
        },
        {
          id: "cardano-cubic",
          name: "Cardano's Cubic Formula",
          latex: String.raw`t^3 + pt + q = 0 \;\Rightarrow\; t = \sqrt[3]{-\tfrac{q}{2} + \sqrt{\tfrac{q^2}{4} + \tfrac{p^3}{27}}} + \sqrt[3]{-\tfrac{q}{2} - \sqrt{\tfrac{q^2}{4} + \tfrac{p^3}{27}}}, \qquad \Delta = -4p^3 - 27q^2`,
          description: String.raw`Solve any cubic by first depressing it: $ax^3 + bx^2 + cx + d = 0$ becomes $t^3 + pt + q = 0$ under $x = t - \frac{b}{3a}$. Cardano's formula then gives a real root as a sum of two cube roots. The discriminant $\Delta$ decides the shape: $\Delta > 0$ gives three distinct real roots (the "casus irreducibilis," where the cube roots are complex), $\Delta = 0$ a repeated root, $\Delta \lt  0$ one real and two complex. On contests you almost always factor via the [[rational-root-theorem|Rational Root Theorem]] instead — this is the fallback when no nice root exists.`,
          keywords: ["cardano formula", "cubic formula", "depressed cubic", "solve cubic", "discriminant cubic", "cube roots"],
          importance: "lower",
          level: ["Olympiad"]
        },
        {
          id: "eisenstein-criterion",
          name: "Eisenstein's Irreducibility Criterion",
          latex: String.raw`p \mid a_0, a_1, \ldots, a_{n-1}, \quad p \nmid a_n, \quad p^2 \nmid a_0 \;\Rightarrow\; \textstyle\sum a_i x^i \text{ is irreducible over } \mathbb{Q}`,
          latexPlain: String.raw`p \mid a_0, a_1, \ldots, a_{n-1}, \quad p \nmid a_n, \quad p^2 \nmid a_0 \;\Rightarrow\; a_nx^n + \cdots + a_1x + a_0 \text{ is irreducible over } \mathbb{Q}`,
          description: String.raw`If some prime $p$ divides every coefficient except the leading one, and $p^2$ does not divide the constant term, the integer polynomial cannot factor into lower-degree rational polynomials. It's the standard certificate of irreducibility beyond the Rational Root Theorem (which only rules out linear factors). Often applied after a substitution $x \mapsto x+1$ that exposes an Eisenstein prime — the classic proof that $1 + x + \cdots + x^{p-1}$ (the $p$-th cyclotomic polynomial) is irreducible.`,
          keywords: ["eisenstein criterion", "irreducibility", "irreducible polynomial", "prime divides coefficients", "cyclotomic irreducible", "shift substitution"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "chebyshev-polynomials",
          name: "Chebyshev Polynomials",
          latex: String.raw`T_n(\cos\theta) = \cos n\theta, \qquad U_n(\cos\theta) = \frac{\sin(n+1)\theta}{\sin\theta}, \qquad T_{n+1} = 2x\,T_n - T_{n-1}`,
          description: String.raw`$T_n$ is the unique polynomial with $\cos n\theta = T_n(\cos\theta)$ — the machine that turns a cosine of a multiple angle into a polynomial in $\cos\theta$, and (via $x=\cos\theta$) back again. It also carries a minimax property that makes it the tool for "minimize the largest value" polynomial problems.`,
          keywords: ["chebyshev polynomial", "chebyshev", "T_n", "U_n", "cos n theta", "multiple angle polynomial", "minimax", "equioscillation", "first kind", "second kind", "minimal polynomial cosine"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "resultant-discriminant",
          name: "Resultant & Discriminant",
          latex: String.raw`\operatorname{Res}(f, g) = a_m^{\,n} b_n^{\,m} \prod_{i, j}(\alpha_i - \beta_j), \qquad \Delta_f = \frac{(-1)^{n(n-1)/2}}{a_n}\operatorname{Res}(f, f') = a_n^{2n-2}\!\!\prod_{i<j}(r_i - r_j)^2`,
          latexPlain: String.raw`\operatorname{Res}(f, g) = a_m^{\,n} b_n^{\,m} (\alpha_1 - \beta_1)(\alpha_1 - \beta_2)\cdots(\alpha_m - \beta_n), \qquad \Delta_f = \frac{(-1)^{n(n-1)/2}}{a_n}\operatorname{Res}(f, f') = a_n^{2n-2}(r_1 - r_2)^2(r_1 - r_3)^2\cdots(r_{n-1} - r_n)^2`,
          description: String.raw`The resultant $\operatorname{Res}(f,g)$ (the determinant of the Sylvester matrix) vanishes exactly when $f$ and $g$ share a root — so setting it to $0$ eliminates a variable from two polynomial equations. The discriminant is the resultant of $f$ with its derivative $f'$ (up to a constant): $\Delta_f = 0$ iff $f$ has a repeated root, and its sign counts real vs. complex roots. Generalizes the familiar $b^2-4ac$ (degree 2) and the cubic discriminant to any degree, and is the clean way to state tangency/double-root conditions.`,
          keywords: ["resultant", "discriminant", "repeated root", "double root", "common root", "eliminate variable", "sylvester matrix", "product of differences", "tangency condition"],
          importance: "lowest",
          level: ["Olympiad"]
        }
      ]
    },
    {
      title: "Matrices, Determinants & Linear Systems",
      formulas: [
        {
          id: "determinant-basics",
          name: "Determinant of a Small Matrix",
          latex: String.raw`\begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc, \qquad \begin{vmatrix} a & b & c \\ d & e & f \\ g & h & i \end{vmatrix} = aei + bfg + cdh - ceg - bdi - afh`,
          description: String.raw`One number attached to a square array. The $3 \times 3$ expansion above is Sarrus's rule, three downward diagonals minus three upward ones, and it does not extend to larger sizes. The properties carry the weight: swapping two rows flips the sign, adding a multiple of one row to another changes nothing, scaling a row scales the determinant, and $\det(AB) = \det A \cdot \det B$. A determinant is zero exactly when the rows are dependent, which is the form most contest uses take.`,
          keywords: ["determinant", "2x2 determinant", "3x3 determinant", "sarrus rule", "ad minus bc", "row operations on a determinant", "determinant zero dependent rows", "det AB"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "determinant-geometric",
          name: "The Determinant as Signed Area",
          latex: String.raw`\begin{vmatrix} u_1 & u_2 \\ v_1 & v_2 \end{vmatrix} = \pm[\text{parallelogram on } \vec u, \vec v], \qquad [ABC] = \frac{1}{2}\begin{vmatrix} x_B - x_A & y_B - y_A \\ x_C - x_A & y_C - y_A \end{vmatrix}`,
          description: String.raw`A $2 \times 2$ determinant is the signed area of the parallelogram spanned by its rows, and a $3 \times 3$ one is the signed volume of the parallelepiped; the sign records orientation. Three points are therefore collinear exactly when that determinant vanishes, and four points are coplanar under the same test one dimension up. The same number says what a linear map does to area: every region's area is multiplied by $\lvert \det \rvert$.`,
          keywords: ["determinant area", "signed area", "collinearity test", "coplanarity test", "parallelepiped volume", "orientation sign", "area scale factor of a linear map", "cross product determinant"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "matrix-multiplication",
          name: "Matrix Multiplication & Powers",
          latex: String.raw`(AB)_{ij} = \sum_{k} a_{ik} b_{kj}, \qquad AB \ne BA \text{ in general}, \qquad (A^n)_{ij} = \#\{\text{walks } i \to j \text{ of length } n\}`,
          latexPlain: String.raw`(AB)_{ij} = a_{i1}b_{1j} + a_{i2}b_{2j} + \cdots + a_{im}b_{mj}, \qquad AB \ne BA \text{ in general}, \qquad (A^n)_{ij} = \#\{\text{walks } i \to j \text{ of length } n\}`,
          description: String.raw`Entry $(i,j)$ of $AB$ pairs row $i$ of $A$ against column $j$ of $B$, so the product is defined only when the inner sizes agree. Multiplication is associative and distributive but not commutative, and $I$ is the identity. The counting reading is the one contests use: if $A$ is the adjacency matrix of a graph, $(A^n)_{ij}$ counts walks of length $n$ from $i$ to $j$, because the sum above is exactly "choose the intermediate vertex".`,
          keywords: ["matrix multiplication", "matrix product", "matrix power", "adjacency matrix walks", "identity matrix", "not commutative", "row times column", "counting walks"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "cramers-rule",
          name: "Cramer's Rule",
          latex: String.raw`A\mathbf{x} = \mathbf{b}, \quad \det A \ne 0 \implies x_i = \frac{\det A_i}{\det A}, \qquad A_i = A \text{ with column } i \text{ replaced by } \mathbf{b}`,
          description: String.raw`Solves a square linear system one unknown at a time, without eliminating the others, which is what makes it worth knowing when a problem asks for a single variable out of three. The condition $\det A \ne 0$ is the whole solvability story: nonzero gives exactly one solution, while zero gives either none or infinitely many, and which of the two depends on whether $\mathbf{b}$ is consistent with the dependent rows.`,
          keywords: ["cramers rule", "solve a linear system", "unique solution", "determinant nonzero", "one variable at a time", "no solution or infinitely many", "square system", "consistency"],
          importance: "low",
          level: ["AIME"]
        },
        {
          id: "eigenvalues-characteristic",
          name: "Eigenvalues & the Characteristic Polynomial",
          latex: String.raw`A\mathbf{v} = \lambda \mathbf{v} \iff \det(A - \lambda I) = 0, \qquad \sum_i \lambda_i = \operatorname{tr} A, \qquad \prod_i \lambda_i = \det A`,
          latexPlain: String.raw`A\mathbf{v} = \lambda \mathbf{v} \iff \det(A - \lambda I) = 0, \qquad \lambda_1 + \lambda_2 + \cdots + \lambda_n = \operatorname{tr} A, \qquad \lambda_1\lambda_2\cdots\lambda_n = \det A`,
          description: String.raw`An eigenvector is a direction the matrix only stretches, and $\lambda$ is the stretch factor; they exist exactly where $A - \lambda I$ is singular, which is the characteristic polynomial. Its coefficients are visible without solving it: the roots sum to the trace and multiply to the determinant. Since $A^n$ has eigenvalues $\lambda_i^n$ on the same eigenvectors, this is how a matrix power turns into a closed form and how a [[transfer-matrix-method|transfer matrix]] produces its [[linear-recurrence|linear recurrence]].`,
          keywords: ["eigenvalue", "eigenvector", "characteristic polynomial", "det A minus lambda I", "trace equals sum of eigenvalues", "diagonalization", "matrix power closed form", "spectrum"],
          importance: "lower",
          level: ["Olympiad"]
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
          description: String.raw`A difference of squares is an expression of the form $a^2 - b^2$, and it always factors as $(a - b)(a + b)$; a sum or difference of two cubes factors too, as $a^3 \pm b^3 = (a \pm b)(a^2 \mp ab + b^2)$. These are the most-used factorizations in competition math because they turn a subtraction into a product, and a product can be counted, cancelled or bounded: $x^2 - y^2 = n$ becomes a question about the [[factor-pair-counting|factor pairs]] of $n$. They also clear square roots from denominators and turn $99 \cdot 101$ into $100^2 - 1$. A sum of two squares, $a^2 + b^2$, does not factor over the real numbers.`,
          keywords: ["factoring", "sum of cubes", "difference of cubes", "difference of two squares", "factor a^2-b^2", "sum and difference of cubes"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "an-minus-bn",
          name: "General $a^n - b^n$ and $a^n + b^n$",
          latex: String.raw`a^n - b^n = (a-b)(a^{n-1} + a^{n-2}b + \cdots + b^{n-1}), \qquad a^3 \pm b^3 = (a \pm b)(a^2 \mp ab + b^2)`,
          description: String.raw`Always divisible by $a - b$. For odd $n$, $a^n + b^n$ is divisible by $a + b$. Key for number theory divisibility arguments too.`,
          keywords: ["divisibility", "factor", "geometric sum", "odd exponent"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "sophie-germain",
          name: "Sophie Germain Identity",
          latex: String.raw`a^4 + 4b^4 = (a^2 + 2b^2 - 2ab)(a^2 + 2b^2 + 2ab)`,
          description: String.raw`Factors the deceptively prime-looking $a^4 + 4b^4$. Classic use: showing $n^4 + 4$ is composite for $n > 1$.`,
          keywords: ["fourth power", "composite", "factoring trick", "sophie germain identity", "factor a^4+4b^4", "fourth power factoring"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "cubes-minus-3abc",
          name: "$a^3 + b^3 + c^3 - 3abc$",
          latex: String.raw`a^3+b^3+c^3-3abc = (a+b+c)(a^2+b^2+c^2-ab-bc-ca)`,
          description: String.raw`So $a + b + c = 0 \implies a^3 + b^3 + c^3 = 3abc$. The second factor is $\frac{1}{2}[(a-b)^2+(b-c)^2+(c-a)^2] \ge 0$.`,
          keywords: ["sum of cubes", "three variables", "symmetric identity", "a^3+b^3+c^3-3abc", "sum of cubes identity", "factor three cubes"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "square-of-sum",
          name: "Expansions of $(a+b+c)^2$",
          latex: String.raw`(a+b+c)^2 = a^2+b^2+c^2 + 2(ab+bc+ca), \qquad (a+b)^2 + (a-b)^2 = 2(a^2+b^2), \qquad (a+b)^2 - (a-b)^2 = 4ab`,
          description: String.raw`Squaring a sum of three terms gives each square once and each product of two different terms twice: $(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)$. That makes it a converter between the sum $a + b + c$, the sum of the squares and the sum of the pairwise products: any two determine the third. Two relatives do the same job for two variables, $(a + b)^2 + (a - b)^2 = 2(a^2 + b^2)$ and $(a + b)^2 - (a - b)^2 = 4ab$, and one more climbs the powers of $x + \frac1x$: $x^2 + \frac{1}{x^2} = \left(x + \frac1x\right)^2 - 2$.`,
          keywords: ["symmetric sums", "expand", "x plus 1 over x", "(a+b)^2 expansion", "perfect square of a sum", "recover a^2+b^2"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "binomial-theorem",
          name: "Binomial Theorem",
          latex: String.raw`(x + y)^n = \sum_{k=0}^{n} \binom{n}{k} x^{n-k} y^k, \qquad (x+y)^n = x^n + \binom{n}{1}x^{n-1}y + \binom{n}{2}x^{n-2}y^2 + \cdots + y^n`,
          latexPlain: String.raw`(a+b)^n = a^n + \binom{n}{1}a^{n-1}b + \binom{n}{2}a^{n-2}b^2 + \cdots + \binom{n}{n-1}ab^{n-1} + b^n`,
          description: String.raw`The Binomial Theorem expands a power of a sum: $(x + y)^n = \sum_{k=0}^{n}\binom nk x^{n-k}y^k$, so the coefficient of $x^{n-k}y^k$ is the binomial coefficient $\binom nk$, and the coefficients form row $n$ of Pascal's triangle. It turns a power into a sum you can read coefficients from, and in reverse it turns a sum of binomial coefficients into a power. Substituting values collapses whole rows: $x = y = 1$ gives $\sum_k\binom nk = 2^n$, and $x = 1$, $y = -1$ gives an alternating sum of $0$. It is also the quick route to remainders of powers such as $9^{100} = (10 - 1)^{100}$.`,
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
          importance: "lowest",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "lagranges-identity",
          name: "Lagrange's Identity",
          latex: String.raw`\left(\sum a_i^2\right)\!\left(\sum b_i^2\right) - \left(\sum a_i b_i\right)^2 = \sum_{i \lt j} (a_i b_j - a_j b_i)^2, \qquad (a^2+b^2)(c^2+d^2) = (ac-bd)^2 + (ad+bc)^2`,
          latexPlain: String.raw`(a_1^2 + \cdots + a_n^2)(b_1^2 + \cdots + b_n^2) - (a_1b_1 + \cdots + a_nb_n)^2 = (a_1b_2 - a_2b_1)^2 + (a_1b_3 - a_3b_1)^2 + \cdots + (a_{n-1}b_n - a_nb_{n-1})^2, \qquad (a^2+b^2)(c^2+d^2) = (ac-bd)^2 + (ad+bc)^2`,
          description: String.raw`The exact amount by which [[cauchy-schwarz|Cauchy–Schwarz]] falls short: the product of the sums of squares minus the squared [[vector-dot-product|dot product]] equals a sum of squared $2\times 2$ minors. Since the right side is a sum of squares it is $\ge 0$, which is Cauchy–Schwarz; equality forces every $a_i b_j - a_j b_i = 0$, i.e. proportional sequences. The two-term case is the [[brahmagupta-fibonacci|Brahmagupta–Fibonacci Identity]].`,
          keywords: ["lagrange identity", "cauchy schwarz gap", "sum of squares", "cross terms", "minors", "cross product", "brahmagupta generalization"],
          importance: "lower",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "sos-identity",
          name: "The SOS Identity",
          latex: String.raw`x^2 + y^2 + z^2 - xy - yz - zx = \frac{1}{2}\left[(x-y)^2 + (y-z)^2 + (z-x)^2\right]`,
          description: String.raw`The sum-of-squares form of the fundamental symmetric expression: instantly nonnegative, and zero exactly when $x = y = z$. Yields $x^2+y^2+z^2 \ge xy+yz+zx$ for all reals, powers the factor analysis of $x^3+y^3+z^3-3xyz$, and converts many "prove nonneg / find equality case" problems into a one-line rewrite.`,
          keywords: ["sum of squares", "sos", "x2 y2 z2 minus xy", "equality all equal", "nonnegative"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "useful-factorizations",
          name: "More Factorizations Worth Knowing",
          latex: String.raw`a^4 + a^2b^2 + b^4 = (a^2+ab+b^2)(a^2-ab+b^2), \qquad (a+b+c)^3 - a^3 - b^3 - c^3 = 3(a+b)(b+c)(c+a)`,
          description: String.raw`Two "won't factor... wait, yes it does" identities. The first is a disguised [[difference-of-squares|difference of squares]]: $(a^2+b^2)^2 - (ab)^2$ — the $x^4+x^2+1$ family. The second pairs with $(a+b)(b+c)(c+a) = (a+b+c)(ab+bc+ca) - abc$, converting between products and symmetric sums.`,
          keywords: ["x4 x2 1", "hidden difference of squares", "cube of sum minus cubes", "product of pairwise sums", "weird factorizations"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "pairwise-sum-product",
          name: "Product of Pairwise Sums",
          latex: String.raw`(x+y)(y+z)(z+x) = (x+y+z)(xy+yz+zx) - xyz`,
          description: String.raw`The product of the three pairwise sums collapses onto the elementary symmetric polynomials: with $e_1 = x+y+z$, $e_2 = xy+yz+zx$, $e_3 = xyz$, it is exactly $e_1 e_2 - e_3$. Companion identity: $(x+y+z)^3 - x^3 - y^3 - z^3 = 3(x+y)(y+z)(z+x)$. Both convert a product of binomials into Vieta-ready symmetric-sum data, and back.`,
          keywords: ["pairwise sums", "elementary symmetric polynomials", "product of sums", "vieta", "x+y y+z z+x", "symmetric"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "antisymmetric-factorization",
          name: "Antisymmetric $(a-b)(b-c)(c-a)$ Factorizations",
          latex: String.raw`a^2(b-c) + b^2(c-a) + c^2(a-b) = -(a-b)(b-c)(c-a)`,
          description: String.raw`A cyclic sum that vanishes whenever two variables are equal must carry the factor $(a-b)(b-c)(c-a)$; the remaining degree fixes the rest. The degree-2 sum above is exactly $-(a-b)(b-c)(c-a)$, while the degree-3 sum $a^3(b-c) + b^3(c-a) + c^3(a-b) = -(a-b)(b-c)(c-a)(a+b+c)$.`,
          keywords: ["antisymmetric", "cyclic factorization", "a-b b-c c-a", "vanishing factor", "vandermonde", "symmetric"],
          importance: "medium",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "sum-zero-identities",
          name: "When $a+b+c=0$",
          latex: String.raw`a+b+c = 0 \implies a^3+b^3+c^3 = 3abc, \qquad a^2+b^2+c^2 = -2(ab+bc+ca)`,
          description: String.raw`The sum-zero identities are what symmetric expressions in $a$, $b$ and $c$ reduce to when $a + b + c = 0$; the two most used are $a^3 + b^3 + c^3 = 3abc$ and $a^2 + b^2 + c^2 = -2(ab + bc + ca)$. They apply whenever three quantities are forced to sum to zero, such as the roots of a cubic with no $x^2$ term, or the differences $a - b$, $b - c$ and $c - a$. The higher power sums follow as well: $a^4 + b^4 + c^4 = \frac12(a^2 + b^2 + c^2)^2$, and $\frac{a^5 + b^5 + c^5}{5} = \frac{a^3 + b^3 + c^3}{3} \cdot \frac{a^2 + b^2 + c^2}{2}$.`,
          keywords: ["conditional identity", "sum zero", "a+b+c=0", "a3+b3+c3=3abc", "power sums", "newton sums", "vanishing sum"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "reciprocal-power-sums",
          name: "Powers of $x + 1/x$",
          latex: String.raw`x^2 + \tfrac{1}{x^2} = t^2 - 2, \qquad x^3 + \tfrac{1}{x^3} = t^3 - 3t \qquad (t = x + \tfrac{1}{x})`,
          description: String.raw`With $t = x + \frac{1}{x}$, every symmetric power $s_n = x^n + \frac{1}{x^n}$ is a polynomial in $t$ from the recurrence $s_n = t\,s_{n-1} - s_{n-2}$ (with $s_0 = 2,\; s_1 = t$): $s_2 = t^2 - 2$, $s_3 = t^3 - 3t$, $s_4 = t^4 - 4t^2 + 2$. The identical recurrence produces $2\cos n\theta$ from $2\cos\theta$ (Chebyshev) and $a^n + b^n$ whenever $ab = 1$.`,
          keywords: ["x plus 1 over x", "reciprocal power", "recurrence", "chebyshev", "x^n + 1/x^n", "symmetric power"],
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
          latex: String.raw`a_n = a_1 + (n-1)d, \qquad n = \frac{a_n - a_1}{d} + 1, \qquad S_n = \frac{n(a_1 + a_n)}{2}`,
          description: String.raw`An arithmetic sequence changes by the same amount $d$ from each term to the next, so its $n$th term is $a_n = a_1 + (n-1)d$. Its sum is the number of terms times the average of the first and last terms, $S_n = \frac{n(a_1 + a_n)}{2}$, which turns any run of evenly spaced numbers into a single multiplication. The number of terms from $a$ to $b$ in steps of $d$ is $\frac{b-a}{d} + 1$, and forgetting that $+1$ is the most common mistake.`,
          keywords: ["arithmetic", "common difference", "sum", "average", "gauss", "triangular numbers", "1+2+3"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "triangular-numbers",
          name: "Triangular Numbers",
          latex: String.raw`T_n = \frac{n(n+1)}{2} = \binom{n+1}{2}, \qquad T_{n-1} + T_n = n^2, \qquad 8T_n + 1 = (2n+1)^2`,
          description: String.raw`The triangular numbers $1, 3, 6, 10, 15, \ldots$ count the dots in a triangular array, and the $n$th one is $T_n = 1 + 2 + \cdots + n = \frac{n(n + 1)}{2} = \binom{n + 1}{2}$, so they also count the pairs that can be chosen from $n + 1$ objects. Two consecutive triangular numbers add to a perfect square, $T_{n-1} + T_n = n^2$. A number $T$ is triangular exactly when $8T + 1$ is an odd perfect square, which is the fastest test.`,
          keywords: ["triangular number", "figurate numbers", "sum of the first n integers", "consecutive triangular numbers sum to a square", "8T+1 square test", "handshake count"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "geometric-series",
          name: "Geometric Series",
          latex: String.raw`a_n = a\,r^{n-1}, \qquad S_n = a\,\frac{1 - r^n}{1 - r}, \qquad S_\infty = \frac{a}{1 - r} \;\; (|r| < 1)`,
          description: String.raw`A geometric sequence is one where each term is the previous term multiplied by the same number $r$, the common ratio, so its terms are $a, ar, ar^2, \ldots$ and the $n$th term is $ar^{n-1}$. The sum of its first $n$ terms is $a\frac{1 - r^n}{1 - r}$, and when $|r| \lt 1$ the terms shrink fast enough that the sum of all of them is finite, $\frac{a}{1 - r}$. That is what makes an endless process, a bouncing ball, a repeated dissection or a repeating decimal, add up to a number. Check $|r| \lt 1$ before summing forever; for $|r| \ge 1$ the infinite sum does not exist.`,
          keywords: ["geometric", "common ratio", "infinite sum", "converge"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "power-sums",
          name: "Sums of Powers of Integers",
          latex: String.raw`\sum_{k=1}^{n} k = \frac{n(n+1)}{2}, \quad \sum_{k=1}^{n} k^2 = \frac{n(n+1)(2n+1)}{6}, \quad \sum_{k=1}^{n} k^3 = \left(\frac{n(n+1)}{2}\right)^2, \quad \sum_{k=1}^{n} (2k-1) = n^2, \quad \sum_{k=1}^{n} 2k = n(n+1)`,
          latexPlain: String.raw`1 + 2 + \cdots + n = \tfrac{n(n+1)}{2}, \quad 1^2 + 2^2 + \cdots + n^2 = \tfrac{n(n+1)(2n+1)}{6}, \quad 1^3 + 2^3 + \cdots + n^3 = \left(\tfrac{n(n+1)}{2}\right)^2, \quad 1 + 3 + \cdots + (2n-1) = n^2, \quad 2 + 4 + \cdots + 2n = n(n+1)`,
          description: String.raw`The power sum formulas give the sums of the first $n$ positive integers, of their squares and of their cubes in closed form: $\sum k = \frac{n(n+1)}{2}$, $\sum k^2 = \frac{n(n+1)(2n+1)}{6}$ and $\sum k^3 = \left(\frac{n(n+1)}{2}\right)^2$, each summed from $k = 1$ to $n$. With them, any polynomial summed over a range reduces to a formula in $n$. The sum of the cubes is the square of the sum of the numbers, a fact worth knowing on its own. The first $n$ odd numbers add to $n^2$ and the first $n$ even numbers to $n(n+1)$; the number of terms is $n$, so the even numbers up to $100$ have $n = 50$.`,
          keywords: ["sum of squares", "sum of cubes", "square of the sum", "sum of the first n cubes", "sum of the first n squares", "1 cubed plus 2 cubed", "nicomachus", "triangular numbers", "odd numbers"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "arithmetico-geometric",
          name: "Arithmetico-Geometric Sum",
          latex: String.raw`\sum_{k=1}^{\infty} k x^k = \frac{x}{(1-x)^2}, \qquad \sum_{k=1}^{\infty} k^2 x^k = \frac{x(1+x)}{(1-x)^3} \quad (|x| < 1)`,
          latexPlain: String.raw`x + 2x^2 + 3x^3 + \cdots = \frac{x}{(1-x)^2}, \qquad x + 4x^2 + 9x^3 + \cdots = \frac{x(1+x)}{(1-x)^3} \quad (|x| < 1)`,
          description: String.raw`Derived by differentiating the [[geometric-series|geometric series]], or by the shift trick $S - xS$. Finite version handles sums like $\sum k \cdot 2^k$.`,
          keywords: ["k times x to k", "weighted geometric", "expected value sums", "derivative trick"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "binets-formula",
          name: "Binet's Formula",
          latex: String.raw`F_n = \frac{\varphi^n - \psi^n}{\sqrt{5}}, \quad \varphi = \frac{1+\sqrt5}{2},\ \psi = \frac{1-\sqrt5}{2}, \qquad F_{n-1}F_{n+1} - F_n^2 = (-1)^n, \qquad \gcd(F_m, F_n) = F_{\gcd(m,n)}, \qquad F_{m+n} = F_mF_{n+1} + F_{m-1}F_n, \qquad \sum_{i=1}^{n} F_i^2 = F_nF_{n+1}`,
          latexPlain: String.raw`F_n = \frac{\varphi^n - \psi^n}{\sqrt{5}}, \quad \varphi = \frac{1+\sqrt5}{2},\ \psi = \frac{1-\sqrt5}{2}, \qquad F_{n-1}F_{n+1} - F_n^2 = (-1)^n, \qquad \gcd(F_m, F_n) = F_{\gcd(m,n)}, \qquad F_{m+n} = F_mF_{n+1} + F_{m-1}F_n, \qquad F_1^2 + F_2^2 + \cdots + F_n^2 = F_nF_{n+1}`,
          description: String.raw`Binet's Formula writes the $n$th Fibonacci number in closed form: $F_n = \frac{\varphi^n - \psi^n}{\sqrt5}$, with $\varphi = \frac{1 + \sqrt5}{2}$ and $\psi = \frac{1 - \sqrt5}{2}$. Since $|\psi| \lt 1$, $F_n$ is simply the nearest integer to $\frac{\varphi^n}{\sqrt5}$, which gives its growth rate and digit count at once. The card also collects the Fibonacci identities that do most of the contest work: $F_1 + \cdots + F_n = F_{n+2} - 1$, Cassini's $F_{n-1}F_{n+1} - F_n^2 = (-1)^n$, and $\gcd(F_m, F_n) = F_{\gcd(m, n)}$.`,
          keywords: ["fibonacci", "binet", "cassini", "golden ratio", "gcd", "lucas numbers"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "linear-recurrence",
          name: "Solving Linear Recurrences",
          latex: String.raw`a_n = c_1 a_{n-1} + \cdots + c_k a_{n-k} \implies x^k = c_1 x^{k-1} + \cdots + c_k, \qquad a_n = \sum_i A_i r_i^{\,n}, \qquad a_n = (A + Bn) r^n \;\; (\text{double root}), \qquad a_n = \rho^n (A\cos n\phi + B\sin n\phi) \;\; (\rho e^{\pm i\phi})`,
          latexPlain: String.raw`a_n = c_1 a_{n-1} + \cdots + c_k a_{n-k} \implies x^k = c_1 x^{k-1} + \cdots + c_k, \qquad a_n = A_1 r_1^{\,n} + A_2 r_2^{\,n} + \cdots + A_k r_k^{\,n}, \qquad a_n = (A + Bn) r^n \;\; (\text{double root}), \qquad a_n = \rho^n (A\cos n\phi + B\sin n\phi) \;\; (\rho e^{\pm i\phi})`,
          description: String.raw`A linear recurrence with constant coefficients is a sequence in which each term is a fixed combination of the terms before it, $a_n = c_1a_{n-1} + \cdots + c_ka_{n-k}$, and it is solved through its characteristic equation $x^k = c_1x^{k-1} + \cdots + c_k$. Each root $r$ of that equation contributes a geometric term $Ar^n$, so with distinct roots $a_n = \sum_i A_ir_i^{\,n}$, and the $k$ initial terms fix the constants. A repeated root $r$ contributes $(A + Bn)r^n$, and a complex pair $\rho e^{\pm i\phi}$ contributes the oscillation $\rho^n(A\cos n\phi + B\sin n\phi)$. For a rule with an extra term $f(n)$, add a particular solution shaped like $f(n)$.`,
          keywords: ["recurrence", "recursion", "recursive", "recursive sequence", "characteristic equation", "closed form", "solving recurrences", "general form of a recursive sequence", "particular solution", "non-homogeneous recurrence", "repeated root", "complex roots oscillation", "substitution recurrence"],
          importance: "medium",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "factorial-telescoping",
          name: "Factorial Telescoping Sums",
          latex: String.raw`\sum_{k=1}^{n} k \cdot k! = (n+1)! - 1, \qquad \sum_{k=1}^{n} \frac{k}{(k+1)!} = 1 - \frac{1}{(n+1)!}`,
          latexPlain: String.raw`1 \cdot 1! + 2 \cdot 2! + \cdots + n \cdot n! = (n+1)! - 1, \qquad \frac{1}{2!} + \frac{2}{3!} + \cdots + \frac{n}{(n+1)!} = 1 - \frac{1}{(n+1)!}`,
          description: String.raw`Both collapse by rewriting the term as a difference: $k \cdot k! = (k+1)! - k!$ and $\frac{k}{(k+1)!} = \frac{1}{k!} - \frac{1}{(k+1)!}$. The factorial cousins of partial-fraction telescoping.`,
          keywords: ["k times k factorial", "telescoping factorial", "factorial sums", "telescoping factorial sum", "k times k factorial", "factorial series"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "first-order-recurrence",
          name: "First-Order Recurrence $a_n = r a_{n-1} + d$",
          latex: String.raw`L = \frac{d}{1 - r} \;\; (r \ne 1), \qquad a_n - L = r^n (a_0 - L), \qquad a_n = r^n (a_0 - L) + L`,
          description: String.raw`A first-order recurrence $a_n = ra_{n-1} + d$ builds each term from the one before by multiplying by $r$ and adding $d$, and it is solved through its fixed point $L = \frac{d}{1 - r}$: measured from $L$ the sequence is geometric, $a_n - L = r^n(a_0 - L)$. It is the model behind mixing, dilution, interest with deposits and population questions. The terms approach $L$ when $|r| \lt 1$ and run away otherwise; if $r = 1$ there is no fixed point and the sequence is arithmetic, $a_n = a_0 + nd$.`,
          keywords: ["first order recurrence", "recursion", "recursive", "recursive sequence", "fixed point", "a_n = r a_{n-1} + d", "geometric plus constant", "steady state", "dilution", "compound interest"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12", "AIME"]
        },
        {
          id: "generalized-binomial-series",
          name: "Generalized Binomial Series",
          latex: String.raw`(1 + x)^{\alpha} = \sum_{n \ge 0} \binom{\alpha}{n} x^n, \quad \binom{\alpha}{n} = \frac{\alpha(\alpha-1)\cdots(\alpha-n+1)}{n!}, \qquad \frac{1}{(1 - x)^{k}} = \sum_{n \ge 0} \binom{n + k - 1}{k - 1} x^n`,
          latexPlain: String.raw`(1 + x)^{\alpha} = 1 + \alpha x + \binom{\alpha}{2} x^2 + \binom{\alpha}{3} x^3 + \cdots, \quad \binom{\alpha}{n} = \frac{\alpha(\alpha-1)\cdots(\alpha-n+1)}{n!}, \qquad \frac{1}{(1 - x)^{k}} = 1 + kx + \binom{k+1}{k-1} x^2 + \binom{k+2}{k-1} x^3 + \cdots`,
          description: String.raw`Newton's Binomial Theorem for any real exponent $\alpha$ (valid for $|x| \lt  1$). The special case $\alpha = -k$ is what makes [[generating-function-method|generating functions]] usable: $\frac{1}{(1-x)^k}$ expands with the stars-and-bars coefficients $\binom{n+k-1}{k-1}$, so a product of such factors reads off a convolution count. Sets $k = 1$ ($\frac{1}{1-x} = \sum x^n$) and $k = 2$ ($\frac{1}{(1-x)^2} = \sum (n+1) x^n$) are the ones to know cold.`,
          keywords: ["generalized binomial", "negative binomial series", "newton binomial", "generating function expansion", "stars and bars coefficients", "1/(1-x)^k", "power series"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "abel-summation",
          name: "Abel Summation (Summation by Parts)",
          latex: String.raw`\sum_{k=1}^{n} a_k b_k = A_n b_n - \sum_{k=1}^{n-1} A_k (b_{k+1} - b_k), \qquad A_k = a_1 + \cdots + a_k`,
          latexPlain: String.raw`a_1b_1 + a_2b_2 + \cdots + a_nb_n = A_n b_n - \big[A_1(b_2 - b_1) + A_2(b_3 - b_2) + \cdots + A_{n-1}(b_n - b_{n-1})\big], \qquad A_k = a_1 + \cdots + a_k`,
          description: String.raw`The discrete analogue of integration by parts: replace a sum of products by the partial sums $A_k$ of one factor against the differences of the other. It's the tool for sums like $\sum k x^k$ or $\sum k \binom{n}{k}$ where one factor telescopes or has a known partial sum, and it's the backbone of the proofs of [[chebyshev-sum-inequality|Chebyshev's]] and [[karamata-inequality|Karamata's]] inequalities. Especially powerful when $b_k$ is monotone (the differences keep one sign).`,
          keywords: ["abel summation", "summation by parts", "partial summation", "discrete integration by parts", "partial sums", "telescoping products"],
          importance: "lower",
          level: ["AIME", "Olympiad"]
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
          description: String.raw`The AM–GM inequality says that the arithmetic mean of nonnegative numbers is at least their geometric mean: $\frac{a_1 + \cdots + a_n}{n} \ge \sqrt[n]{a_1 \cdots a_n}$, with equality exactly when all the numbers are equal. Its two-number form, $a + b \ge 2\sqrt{ab}$, handles most AMC optimization: a sum of positive terms whose product is fixed is smallest when the terms are equal, and a product with a fixed sum is largest then. The equality condition is what locates the minimum or maximum, so it must be achievable within the problem's constraints.`,
          keywords: ["arithmetic mean", "geometric mean", "optimization", "minimum", "maximum"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "max-product-fixed-sum",
          name: "Maximizing a Product with a Fixed Sum",
          latex: String.raw`n = 3q + r:\quad \max\prod = \begin{cases} 3^q & r = 0 \\ 4\cdot 3^{q-1} & r = 1 \\ 2\cdot 3^q & r = 2 \end{cases}`,
          latexPlain: String.raw`n = 3q + r:\quad \max_{a_1 + \cdots + a_k = n} a_1a_2\cdots a_k = \begin{cases} 3^q & r = 0 \\ 4\cdot 3^{q-1} & r = 1 \\ 2\cdot 3^q & r = 2 \end{cases}`,
          description: String.raw`To break a positive integer $n$ into positive integers with the largest possible product, use as many $3$'s as possible — never a $1$, and at most two $2$'s. The continuous version is pure AM–GM: for a fixed sum the product is largest when the parts are equal, and among integers $3$ (nearest to $e\approx 2.718$) beats $2$.`,
          keywords: ["maximize product", "fixed sum", "break into threes", "use 3s", "partition maximize product", "largest product", "split integer", "optimization", "am-gm application"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "mean-chain",
          name: "QM–AM–GM–HM Chain",
          latex: String.raw`\sqrt{\frac{\sum a_i^2}{n}} \;\ge\; \frac{\sum a_i}{n} \;\ge\; \sqrt[n]{\prod a_i} \;\ge\; \frac{n}{\sum \frac{1}{a_i}}`,
          latexPlain: String.raw`\sqrt{\frac{a_1^2 + \cdots + a_n^2}{n}} \;\ge\; \frac{a_1 + \cdots + a_n}{n} \;\ge\; \sqrt[n]{a_1 a_2 \cdots a_n} \;\ge\; \frac{n}{\frac{1}{a_1} + \cdots + \frac{1}{a_n}}`,
          description: String.raw`Quadratic mean $\ge$ arithmetic $\ge$ geometric $\ge$ harmonic, for positive reals; all equalities iff all values equal.`,
          keywords: ["root mean square", "harmonic mean", "power mean", "chain"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "cauchy-schwarz",
          name: "Cauchy–Schwarz Inequality",
          latex: String.raw`\left(\sum a_i b_i\right)^2 \le \left(\sum a_i^2\right)\left(\sum b_i^2\right), \qquad \sum \frac{x_i^2}{y_i} \ge \frac{\left(\sum x_i\right)^2}{\sum y_i}`,
          latexPlain: String.raw`(a_1b_1 + a_2b_2 + \cdots + a_nb_n)^2 \le (a_1^2 + a_2^2 + \cdots + a_n^2)(b_1^2 + b_2^2 + \cdots + b_n^2), \qquad \frac{x_1^2}{y_1} + \frac{x_2^2}{y_2} + \cdots + \frac{x_n^2}{y_n} \ge \frac{(x_1 + x_2 + \cdots + x_n)^2}{y_1 + y_2 + \cdots + y_n}`,
          description: String.raw`The Cauchy–Schwarz Inequality says that $\left(\sum a_ib_i\right)^2 \le \left(\sum a_i^2\right)\left(\sum b_i^2\right)$ for real numbers, with equality exactly when the two sequences are proportional. It is the default tool for bounding a sum of products, or a linear sum under a constraint on squares, and in vector language it is the bound $|\mathbf a \cdot \mathbf b| \le \lVert\mathbf a\rVert\,\lVert\mathbf b\rVert$. Its Engel form, Titu's lemma, handles squares over positive denominators: $\sum \frac{x_i^2}{y_i} \ge \frac{\left(\sum x_i\right)^2}{\sum y_i}$.`,
          keywords: ["cauchy", "titu", "engel form", "dot product", "vectors"],
          importance: "high",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "rearrangement",
          name: "Rearrangement Inequality",
          latex: String.raw`\sum a_i b_i \;\text{(sorted same)} \;\ge\; \sum a_i b_{\sigma(i)} \;\ge\; \sum a_i b_i \;\text{(sorted opposite)}`,
          latexPlain: String.raw`a_1 \le \cdots \le a_n,\ \ b_1 \le \cdots \le b_n:\quad a_1b_1 + \cdots + a_nb_n \;\ge\; a_1b_{\sigma(1)} + \cdots + a_nb_{\sigma(n)} \;\ge\; a_1b_n + a_2b_{n-1} + \cdots + a_nb_1`,
          description: String.raw`Pairing two sorted sequences in the same order maximizes the sum of products; opposite order minimizes it. [[chebyshev-sum-inequality|Chebyshev's Sum Inequality]] follows.`,
          keywords: ["sorted", "pairing", "maximize product sum", "chebyshev"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "trivial-inequality",
          name: "The Trivial Inequality",
          latex: String.raw`x^2 \ge 0, \qquad a^2+b^2+c^2 \ge ab+bc+ca, \qquad a^2+b^2 \ge 2ab`,
          description: String.raw`The trivial inequality says that the square of a real number is never negative, $x^2 \ge 0$, with equality only at $x = 0$. Nearly every classical inequality is built from it, usually by rewriting an expression as a sum of squares plus a constant. Adding three such squares gives the symmetric form $a^2 + b^2 + c^2 \ge ab + bc + ca$.`,
          keywords: ["square nonnegative", "complete the square", "smoothing", "square is nonnegative", "x^2 nonnegative", "am-gm base case"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "abs-triangle-inequality",
          name: "Absolute Value Triangle Inequality",
          latex: String.raw`|a + b| \le |a| + |b|, \qquad |a - b| \ge \big||a| - |b|\big|`,
          description: String.raw`Holds for reals, complex numbers, and vectors. Equality when the terms point the same way.`,
          keywords: ["absolute value", "modulus", "bound", "triangle inequality for absolute value", "modulus inequality", "reverse triangle inequality"],
          importance: "medium",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "bernoulli-inequality",
          name: "Bernoulli's Inequality",
          latex: String.raw`(1+x)^n \ge 1 + nx \qquad (x \ge -1,\ n \ge 1)`,
          description: String.raw`A linear lower bound on a power, valid for real $x \ge -1$ and any real $n \ge 1$ (in particular all positive integers). For a fractional exponent $0 \le r \le 1$ it flips: $(1+x)^r \le 1 + rx$, which bounds roots from above (e.g. $\sqrt{1+x} \le 1 + \tfrac{x}{2}$). Equality only at $x = 0$ (or $n = 0, 1$). It is exactly the tangent line to $(1+x)^n$ at $x = 0$.`,
          keywords: ["bernoulli", "1+x to the n", "power bound", "linear bound", "tangent line inequality", "growth estimate", "compound"],
          importance: "medium",
          level: ["AMC12", "AIME", "Olympiad"]
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
          description: String.raw`The $t = 1$ case expands to $x^3 + y^3 + z^3 + 3xyz \ge xy(x+y) + yz(y+z) + zx(z+x)$ — the classic degree-3 symmetric inequality that AM–GM and [[muirheads-inequality|Muirhead]] cannot reach. Equality when $x = y = z$, or when two are equal and the third is $0$.`,
          keywords: ["schur", "symmetric inequality", "three variables", "t equals 1", "degree 3"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "muirheads-inequality",
          name: "Muirhead's Inequality",
          latex: String.raw`(a_1, a_2, a_3) \succ (b_1, b_2, b_3) \implies \sum_{\text{sym}} x^{a_1} y^{a_2} z^{a_3} \;\ge\; \sum_{\text{sym}} x^{b_1} y^{b_2} z^{b_3}`,
          latexPlain: String.raw`(a_1, a_2, a_3) \succ (b_1, b_2, b_3) \implies x^{a_1}y^{a_2}z^{a_3} + x^{a_1}y^{a_3}z^{a_2} + \cdots \;(\text{all 6 orders}) \;\ge\; x^{b_1}y^{b_2}z^{b_3} + x^{b_1}y^{b_3}z^{b_2} + \cdots \;(\text{all 6 orders})`,
          description: String.raw`For positive reals, where $\succ$ is [[karamata-inequality|majorization]]: $a_1 \ge b_1$, $a_1 + a_2 \ge b_1 + b_2$, equal total sums, both sorted decreasing. "More spread-out exponents win" — the rigorous version of bunching. E.g. $(2,0,0) \succ (1,1,0)$ gives $\sum_{\text{sym}} x^2 \ge \sum_{\text{sym}} xy$. Only valid for full symmetric sums (all $3! = 6$ permutation terms).`,
          keywords: ["muirhead", "majorization", "bunching", "symmetric sum", "exponents"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "maclaurin-inequality",
          name: "Newton's & Maclaurin's Inequalities",
          latex: String.raw`p_1 \ge \sqrt{p_2} \ge \sqrt[3]{p_3} \ge \cdots \ge \sqrt[n]{p_n}, \qquad p_k = \frac{e_k}{\binom{n}{k}}`,
          description: String.raw`For nonnegative reals, average each elementary symmetric polynomial into $p_k = e_k / \binom{n}{k}$. Maclaurin's inequality chains them as above — a refinement of AM–GM, since $p_1 = \frac{\sum x_i}{n}$ is the AM and $\sqrt[n]{p_n} = \sqrt[n]{\prod x_i}$ is the GM. The local step is Newton's inequality $p_k^2 \ge p_{k-1}p_{k+1}$ (log-concavity of the $p_k$). Equality throughout iff all $x_i$ are equal.`,
          keywords: ["maclaurin inequality", "newton inequality", "symmetric means", "refinement of am-gm", "elementary symmetric", "log-concave"],
          importance: "lower",
          level: ["Olympiad"]
        },
        {
          id: "holders-inequality",
          name: "Hölder's Inequality",
          latex: String.raw`\Big(\sum a_i^p\Big)^{1/p}\Big(\sum b_i^q\Big)^{1/q} \ge \sum a_i b_i \;\; \big(\tfrac1p+\tfrac1q=1\big), \qquad \big(\textstyle\sum a_i\big)\big(\sum b_i\big)\big(\sum c_i\big) \ge \big(\sum \sqrt[3]{a_i b_i c_i}\big)^3`,
          latexPlain: String.raw`(a_1^p + \cdots + a_n^p)^{1/p}(b_1^q + \cdots + b_n^q)^{1/q} \ge a_1b_1 + \cdots + a_nb_n \;\; \big(\tfrac1p+\tfrac1q=1\big), \qquad (a_1 + \cdots + a_n)(b_1 + \cdots + b_n)(c_1 + \cdots + c_n) \ge \big(\sqrt[3]{a_1b_1c_1} + \cdots + \sqrt[3]{a_nb_nc_n}\big)^3`,
          description: String.raw`For conjugate exponents $p, q > 1$ with $\frac1p + \frac1q = 1$, the sum $\sum a_i b_i$ is bounded by the product of the $p$- and $q$-norms — Cauchy–Schwarz is exactly the case $p = q = 2$. The three-sequence form (right, and its $k$-sequence generalization) is the olympiad workhorse: it splits a cyclic sum into a product of simpler sums, and is the standard route to bounds like $\sum \frac{a}{b+c} \ge \frac32$. Equality when the sequences are proportional.`,
          keywords: ["holder inequality", "holders inequality", "conjugate exponents", "cyclic sum bound", "generalizes cauchy schwarz", "three sequences", "power norms"],
          importance: "low",
          level: ["Olympiad"]
        },
        {
          id: "chebyshev-sum-inequality",
          name: "Chebyshev's Sum Inequality",
          latex: String.raw`a_1 \le \cdots \le a_n,\ \ b_1 \le \cdots \le b_n:\quad n\sum_{i=1}^{n} a_i b_i \ge \Big(\sum a_i\Big)\Big(\sum b_i\Big), \qquad \text{opposite order} \Rightarrow \le`,
          latexPlain: String.raw`a_1 \le \cdots \le a_n,\ \ b_1 \le \cdots \le b_n:\quad n(a_1b_1 + \cdots + a_nb_n) \ge (a_1 + \cdots + a_n)(b_1 + \cdots + b_n), \qquad \text{opposite order} \Rightarrow \le`,
          description: String.raw`When $(a_i)$ and $(b_i)$ are sorted the same way, the aligned sum $\sum a_i b_i$ beats the "scrambled" average; sorted oppositely it loses. Dividing by $n^2$: the average of the products is at least the product of the averages for similarly-sorted sequences. It follows from the Rearrangement inequality and is the clean tool whenever a sum pairs a sequence with another that moves monotonically with it.`,
          keywords: ["chebyshev sum inequality", "sorted sequences", "similarly sorted", "average of products", "rearrangement corollary"],
          importance: "lower",
          level: ["Olympiad"]
        },
        {
          id: "minkowski-inequality",
          name: "Minkowski's Inequality",
          latex: String.raw`\Big(\sum |a_i + b_i|^p\Big)^{1/p} \le \Big(\sum |a_i|^p\Big)^{1/p} + \Big(\sum |b_i|^p\Big)^{1/p} \quad (p \ge 1), \qquad \sqrt{a^2+b^2} + \sqrt{c^2+d^2} \ge \sqrt{(a+c)^2 + (b+d)^2}`,
          latexPlain: String.raw`\big(|a_1 + b_1|^p + \cdots + |a_n + b_n|^p\big)^{1/p} \le \big(|a_1|^p + \cdots + |a_n|^p\big)^{1/p} + \big(|b_1|^p + \cdots + |b_n|^p\big)^{1/p} \quad (p \ge 1), \qquad \sqrt{a^2+b^2} + \sqrt{c^2+d^2} \ge \sqrt{(a+c)^2 + (b+d)^2}`,
          description: String.raw`The triangle inequality for the $p$-norm: the norm of a sum is at most the sum of the norms. The case $p = 2$ (right) is literally $|\vec u| + |\vec v| \ge |\vec u + \vec v|$ — add the vectors tip to tail — and is the algebraic form of the reflection / shortest-path trick: a sum $\sum \sqrt{x_i^2 + y_i^2}$ is minimized by making the pieces collinear, giving $\sqrt{(\sum x_i)^2 + (\sum y_i)^2}$.`,
          keywords: ["minkowski inequality", "triangle inequality norm", "sum of square roots", "vector length", "shortest path algebraic", "reflection minimize"],
          importance: "lower",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "karamata-inequality",
          name: "Karamata's Inequality (Majorization)",
          latex: String.raw`x_1 \ge \cdots \ge x_n,\ \ y_1 \ge \cdots \ge y_n,\ \ \textstyle\sum_{i=1}^{k} x_i \ge \sum_{i=1}^{k} y_i,\ \ \sum x_i = \sum y_i \qquad \Longrightarrow\ \sum f(x_i) \ge \sum f(y_i)\ \ (f \text{ convex})`,
          latexPlain: String.raw`x_1 \ge \cdots \ge x_n,\ \ y_1 \ge \cdots \ge y_n,\ \ x_1 + \cdots + x_k \ge y_1 + \cdots + y_k \text{ for each } k,\ \ x_1 + \cdots + x_n = y_1 + \cdots + y_n \qquad \Longrightarrow\ f(x_1) + \cdots + f(x_n) \ge f(y_1) + \cdots + f(y_n)\ \ (f \text{ convex})`,
          description: String.raw`If the sorted sequence $(x_i)$ majorizes $(y_i)$ — equal totals, but every partial sum of the larger-sorted $x$'s is at least that of the $y$'s — then a convex $f$ spreads the $x$'s further apart and yields a larger sum. It is the master convexity inequality: Jensen is the special case where every $y_i$ equals the common mean, and AM–GM, power-mean, and many symmetric-sum bounds drop out as corollaries. Reverse the inequality for concave $f$.`,
          keywords: ["karamata inequality", "majorization", "convex function sum", "generalizes jensen", "hardy littlewood polya", "spreads apart"],
          importance: "lower",
          level: ["Olympiad"]
        },
        {
          id: "power-mean-inequality",
          name: "Power Mean Inequality",
          latex: String.raw`M_p = \left(\frac{1}{n}\sum_{i=1}^n a_i^{\,p}\right)^{1/p} \text{ is nondecreasing in } p, \qquad M_{-1} \le M_0 \le M_1 \le M_2 \quad (\text{HM} \le \text{GM} \le \text{AM} \le \text{QM})`,
          latexPlain: String.raw`M_p = \left(\frac{a_1^{\,p} + a_2^{\,p} + \cdots + a_n^{\,p}}{n}\right)^{1/p} \text{ is nondecreasing in } p, \qquad M_{-1} \le M_0 \le M_1 \le M_2 \quad (\text{HM} \le \text{GM} \le \text{AM} \le \text{QM})`,
          description: String.raw`The general statement behind the [[mean-chain|QM–AM–GM–HM chain]]: for positive reals, the power mean $M_p$ increases with the exponent $p$, with $M_0$ (the $p\to0$ limit) equal to the geometric mean. This one inequality delivers every mean comparison at once and, for any two exponents $p \lt  q$, gives $\left(\frac1n\sum a_i^p\right)^{1/p} \le \left(\frac1n\sum a_i^q\right)^{1/q}$. Equality throughout iff all $a_i$ are equal.`,
          keywords: ["power mean inequality", "generalized mean", "qm am gm hm", "M_p nondecreasing", "mean inequality chain", "exponent mean"],
          importance: "medium",
          level: ["AMC12", "AIME", "Olympiad"]
        },
        {
          id: "weighted-am-gm",
          name: "Weighted AM–GM",
          latex: String.raw`\sum_{i=1}^n w_i a_i \ge \prod_{i=1}^n a_i^{\,w_i}, \qquad \sum w_i = 1, \; w_i > 0, \; a_i > 0`,
          latexPlain: String.raw`w_1a_1 + w_2a_2 + \cdots + w_na_n \ge a_1^{\,w_1}a_2^{\,w_2}\cdots a_n^{\,w_n}, \qquad w_1 + \cdots + w_n = 1, \; w_i > 0, \; a_i > 0`,
          description: String.raw`AM–GM with arbitrary positive weights summing to $1$: the weighted arithmetic mean dominates the weighted geometric mean. Choosing rational weights recovers plain AM–GM (repeat each term); choosing weights to cancel exponents is the standard way to prove tailored bounds like $a^3 + a^3 + b^3 \ge 3a^2 b$. It is the engine behind [[holders-inequality|Hölder]] and Young's inequality, and equality holds iff all $a_i$ are equal.`,
          keywords: ["weighted am gm", "weighted arithmetic geometric mean", "weights sum to one", "young inequality", "tangent weights", "engine of holder"],
          importance: "medium",
          level: ["AIME", "Olympiad"]
        }
      ]
    },
    {
      title: "Exponents & Logarithms",
      formulas: [
        {
          id: "log-rules",
          name: "Logarithm Rules",
          latex: String.raw`\log_b(xy) = \log_b x + \log_b y, \quad \log_b \frac{x}{y} = \log_b x - \log_b y, \quad \log_b x^n = n \log_b x, \quad \log_{b^m} x^n = \frac{n}{m}\log_b x, \quad b^{\log_b x} = x`,
          description: String.raw`A logarithm is an exponent: $\log_b x$ is the power you must raise $b$ to in order to get $x$, so $\log_2 8 = 3$ because $2^3 = 8$. Because logs are exponents, their rules are the exponent laws read backwards, and they turn multiplication into addition, which makes an equation that is nonlinear in $x$ linear in $\log x$. The log of a product is the sum of the logs, the log of a quotient is the difference, and a power comes out front as a multiplier, $\log_b x^n = n\log_b x$. They hold for positive arguments and a positive base $b \ne 1$, and when $0 \lt b \lt 1$ the logarithm is decreasing, which reverses inequalities.`,
          keywords: ["log properties", "product rule", "power rule", "exponent", "logarithm rules", "log of a product", "log of a power", "power in the base", "log base to a power", "log inequality direction", "decreasing logarithm"],
          importance: "high",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "change-of-base",
          name: "Change of Base",
          latex: String.raw`\log_b a = \frac{\log_c a}{\log_c b} = \frac{1}{\log_a b}, \qquad \log_a b \cdot \log_b c \cdot \log_c d = \log_a d`,
          description: String.raw`The change-of-base formula rewrites a logarithm in any other base: $\log_b a = \frac{\log_c a}{\log_c b}$, so every logarithm is a ratio of logarithms in whatever base is convenient. Its most useful consequences are the reciprocal rule $\log_b a = \frac{1}{\log_a b}$ and the chain rule $\log_a b \cdot \log_b c = \log_a c$, under which a product of logarithms telescopes to the outermost base and the innermost argument. It is the first move in nearly every log problem, since the other rules apply only once everything shares one base.`,
          keywords: ["change of base", "reciprocal", "telescoping logs", "log base change formula", "logarithm change of base", "convert log base", "logarithm chain rule", "chain rule for logs", "product of logarithms telescopes", "log a b times log b c"],
          importance: "high",
          level: ["AMC10", "AMC12", "AIME"]
        },
        {
          id: "log-swap-identity",
          name: "The Exponent–Log Swap",
          latex: String.raw`a^{\log_b c} = c^{\log_b a}, \qquad \log_a b = \frac{1}{\log_b a}`,
          description: String.raw`Take $\log_b$ of both sides to verify. Turns awkward towers like $2^{\log_3 5}$ into friendlier ones like $5^{\log_3 2}$.`,
          keywords: ["swap", "tower", "trick identity", "exponent log swap", "a to the log b equals b to the log a", "log tower trick"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "exponent-laws",
          name: "Exponent Laws",
          latex: String.raw`a^m a^n = a^{m+n}, \quad (a^m)^n = a^{mn}, \quad a^{-n} = \frac{1}{a^n}, \quad a^{1/n} = \sqrt[n]{a}`,
          description: String.raw`The exponent laws say how powers combine: $a^ma^n = a^{m + n}$, $\frac{a^m}{a^n} = a^{m - n}$, $(a^m)^n = a^{mn}$ and $(ab)^n = a^nb^n$, with $a^0 = 1$, $a^{-n} = \frac1{a^n}$ and $a^{1/n} = \sqrt[n]a$. The main contest use is to write both sides of an equation over a common base and compare exponents, as in $4^x = 8^y$, which becomes $2^{2x} = 2^{3y}$. A tower $a^{b^c}$ means $a^{(b^c)}$, not $(a^b)^c$.`,
          keywords: ["powers", "radicals", "common base", "rules"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        }
      ]
    },
    {
      title: "Complex Numbers & Roots of Unity",
      formulas: [
        {
          id: "complex-basics",
          name: "Modulus, Conjugate & $i$ Powers",
          latex: String.raw`|z|^2 = z\bar{z} = a^2 + b^2, \qquad i^2 = -1,\; i^4 = 1, \qquad \frac{1}{z} = \frac{\bar{z}}{|z|^2}`,
          description: String.raw`A complex number is $z = a + bi$, where $a$ and $b$ are real and $i$ is a number with $i^2 = -1$; its conjugate is $\bar z = a - bi$, and its modulus $|z| = \sqrt{a^2 + b^2}$ is its distance from $0$ in the plane. The three are tied together by $z\bar z = |z|^2$, which is what makes division possible: $\frac1z = \frac{\bar z}{|z|^2}$. Moduli multiply, $|zw| = |z||w|$, and powers of $i$ repeat every four steps: $i, -1, -i, 1$. On the unit circle the conjugate is the reciprocal, $\bar z = \frac1z$, the substitution behind most $|z| = 1$ problems.`,
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
          description: String.raw`De Moivre's Theorem says that raising $\cos\theta + i\sin\theta$ to the $n$th power multiplies the angle by $n$: $(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta$. More generally, a complex number of modulus $r$ and angle $\theta$ has an $n$th power of modulus $r^n$ and angle $n\theta$, which makes large powers such as $(1 + i)^{20}$ immediate. Run backwards, expanding the left side with the [[binomial-theorem|Binomial Theorem]] and comparing real and imaginary parts produces the multiple-angle formulas, such as $\cos 3\theta = 4\cos^3\theta - 3\cos\theta$.`,
          keywords: ["de moivre", "powers", "multiple angle", "de moivre's theorem", "cis form power", "polar form powers"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "roots-of-unity",
          name: "Roots of Unity",
          latex: String.raw`z^n = 1 \iff z = e^{2\pi i k / n}, \quad k = 0, 1, \dots, n-1, \qquad z^n - 1 = \prod_{k=0}^{n-1}\left(z - \omega^k\right)`,
          latexPlain: String.raw`z^n = 1 \iff z = e^{2\pi i k / n}, \quad k = 0, 1, \dots, n-1, \qquad z^n - 1 = (z - 1)(z - \omega)(z - \omega^2)\cdots(z - \omega^{n-1})`,
          description: String.raw`The $n$th roots of unity are the $n$ complex numbers $z$ with $z^n = 1$: $\omega^k = \cos\frac{2\pi k}{n} + i\sin\frac{2\pi k}{n}$ for $k = 0, 1, \ldots, n - 1$, the vertices of a regular $n$-gon on the unit circle with one vertex at $1$. They are exactly the roots of $x^n - 1$, so $x^n - 1 = \prod_{k=0}^{n-1}(x - \omega^k)$, and reading that factorization with [[vietas-general|Vieta's Formulas]] gives their sum, $0$ for $n \gt 1$, and their product, $(-1)^{n+1}$. Powers of a root repeat with period $n$, so exponents can be reduced modulo $n$, and summing a power over all the roots kills every term except those whose exponent is a multiple of $n$.`,
          keywords: ["unit circle", "regular polygon", "sum zero", "omega", "nth roots"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "roots-unity-distance-product",
          name: "Distance Products over Roots of Unity",
          latex: String.raw`\prod_{k=1}^{n-1} \left|1 - \omega^k\right| = n, \qquad \prod_{k=1}^{n-1} \sin\frac{k\pi}{n} = \frac{n}{2^{n-1}}`,
          latexPlain: String.raw`|1 - \omega|\,|1 - \omega^2| \cdots |1 - \omega^{n-1}| = n, \qquad \sin\frac{\pi}{n}\,\sin\frac{2\pi}{n}\cdots\sin\frac{(n-1)\pi}{n} = \frac{n}{2^{n-1}}`,
          description: String.raw`Distance products over roots of unity multiply the distances from one $n$th root of unity to all the others, and the answer is always $n$: $|1 - \omega|\,|1 - \omega^2| \cdots |1 - \omega^{n-1}| = n$, where $\omega = e^{2\pi i/n}$. It turns the product of all the chords from one vertex of a regular $n$-gon into a single number, $nR^{n-1}$ on a circle of radius $R$. Since each chord is $2\sin\frac{k\pi}{n}$, it also evaluates the sine product $\sin\frac{\pi}{n}\sin\frac{2\pi}{n}\cdots\sin\frac{(n-1)\pi}{n} = \frac{n}{2^{n-1}}$.`,
          keywords: ["product of distances", "regular polygon vertices", "sine product", "roots of unity", "chord products"],
          importance: "lower",
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
          description: String.raw`The Pythagorean identities are $\sin^2\theta + \cos^2\theta = 1$ and the two forms derived from it, $1 + \tan^2\theta = \sec^2\theta$ and $1 + \cot^2\theta = \csc^2\theta$. The first is the [[pythagorean-theorem|Pythagorean Theorem]] for the point $(\cos\theta, \sin\theta)$ on the unit circle, and the other two come from dividing it by $\cos^2\theta$ or by $\sin^2\theta$. They convert one trigonometric function into another: given one value they give the rest up to sign, and they turn an equation in several functions into a polynomial in one.`,
          keywords: ["sin squared", "identity", "sec", "csc"],
          importance: "high",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "common-angle-values",
          name: "Common Angle Values",
          latex: String.raw`\begin{array}{c|ccccc} & 0^\circ & 30^\circ & 45^\circ & 60^\circ & 90^\circ \\ \hline \sin & 0 & \tfrac{1}{2} & \tfrac{\sqrt2}{2} & \tfrac{\sqrt3}{2} & 1 \\ \cos & 1 & \tfrac{\sqrt3}{2} & \tfrac{\sqrt2}{2} & \tfrac{1}{2} & 0 \\ \tan & 0 & \tfrac{\sqrt3}{3} & 1 & \sqrt3 & \text{—} \end{array}`,
          description: String.raw`The common angle values are the exact sines, cosines and tangents of $0^\circ$, $30^\circ$, $45^\circ$, $60^\circ$ and $90^\circ$, such as $\sin 30^\circ = \frac12$, $\cos 45^\circ = \frac{\sqrt2}{2}$ and $\tan 60^\circ = \sqrt3$, with $\tan 90^\circ$ undefined. Knowing them on sight turns most trigonometry on the AMC into arithmetic. Every other multiple of $30^\circ$ or $45^\circ$ reduces to one of them through its reference angle, with the sign fixed by the quadrant.`,
          keywords: ["special angles", "sin cos tan table", "30 45 60 90", "unit circle values", "reference angle", "exact values", "astc"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "reduction-identities",
          name: "Cofunction, Sign & Periodicity Identities",
          latex: String.raw`\sin(90^\circ - \theta) = \cos\theta, \qquad \cos(90^\circ - \theta) = \sin\theta, \qquad \sin(-\theta) = -\sin\theta, \qquad \cos(-\theta) = \cos\theta, \qquad \sin(180^\circ - \theta) = \sin\theta, \qquad \cos(180^\circ - \theta) = -\cos\theta`,
          description: String.raw`Cofunctions swap sin/cos across complementary angles (likewise tan/cot, sec/csc). $\sin$ and $\tan$ are odd, $\cos$ is even. Supplementary angles keep $\sin$ but flip $\cos$ (and $\tan$). Periods: $\sin, \cos$ repeat every $360^\circ$, $\tan$ every $180^\circ$ — so any angle reduces to a first-quadrant reference angle plus a sign.`,
          keywords: ["cofunction", "negative angle", "odd even", "supplementary angle", "periodicity", "reference angle", "reduction identities"],
          importance: "medium",
          level: ["AMC10", "AMC12"]
        },
        {
          id: "angle-addition",
          name: "Angle Addition & Subtraction",
          latex: String.raw`\sin(a \pm b) = \sin a \cos b \pm \cos a \sin b, \qquad \cos(a \pm b) = \cos a \cos b \mp \sin a \sin b, \qquad \tan(a \pm b) = \frac{\tan a \pm \tan b}{1 \mp \tan a \tan b}, \qquad \cot(a \pm b) = \frac{\cot a \cot b \mp 1}{\cot b \pm \cot a}`,
          description: String.raw`The angle-addition formulas expand the sine and cosine of a sum of two angles, or of their difference, in terms of the sines and cosines of the two angles: $\sin(a \pm b) = \sin a\cos b \pm \cos a\sin b$ and $\cos(a \pm b) = \cos a\cos b \mp \sin a\sin b$, with $\tan(a \pm b) = \frac{\tan a \pm \tan b}{1 \mp \tan a\tan b}$ following from them. Almost every other trigonometric identity comes from these: setting $a = b$ gives the [[double-angle|double-angle formula]]s, and the half-angle and product-to-sum formulas follow. They give exact values at angles like $15^\circ$ and $75^\circ$, and read backwards they combine $a\sin\theta + b\cos\theta$ into a single wave, $\sqrt{a^2 + b^2}\sin(\theta + \varphi)$ with $\tan\varphi = \frac ba$.`,
          keywords: ["sum formula", "sin a plus b", "cos a plus b", "tan a plus b", "cot a plus b", "tan a minus b", "tangent of a sum", "tan sum formula", "sine addition", "cosine addition", "tangent addition"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "harmonic-addition",
          name: "Harmonic Addition (Linear Combination)",
          latex: String.raw`a\sin\theta + b\cos\theta = R\sin(\theta + \varphi), \qquad R = \sqrt{a^2 + b^2}, \qquad \tan\varphi = \frac{b}{a}`,
          description: String.raw`Any linear combination of $\sin\theta$ and $\cos\theta$ is a single shifted sine wave of amplitude $R = \sqrt{a^2+b^2}$, so the whole expression ranges over $[-R, R]$ — which is what makes its maximum and minimum immediate without calculus. The phase shift satisfies $\tan\varphi = \frac{b}{a}$, with the quadrant fixed by the signs of $a$ and $b$.`,
          keywords: ["harmonic addition", "linear combination of sine and cosine", "a sin plus b cos", "amplitude and phase", "auxiliary angle method", "max of a sin x plus b cos x", "range of a sin plus b cos", "R sin theta plus phi"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        },
        {
          id: "double-angle",
          name: "Double Angle Formulas",
          latex: String.raw`\sin 2\theta = 2\sin\theta\cos\theta, \quad \cos 2\theta = \cos^2\theta - \sin^2\theta = 2\cos^2\theta - 1 = 1 - 2\sin^2\theta, \quad \tan 2\theta = \frac{2\tan\theta}{1-\tan^2\theta}`,
          description: String.raw`The double angle formulas give the sine, cosine and tangent of $2\theta$ in terms of those of $\theta$: $\sin 2\theta = 2\sin\theta\cos\theta$, $\cos 2\theta = \cos^2\theta - \sin^2\theta$ and $\tan 2\theta = \frac{2\tan\theta}{1 - \tan^2\theta}$. They are the [[angle-addition|angle addition formulas]] with both angles equal, and they are the tool whenever a problem has an angle and its double, as an inscribed and a central angle do. The cosine formula has three forms, $\cos^2\theta - \sin^2\theta = 2\cos^2\theta - 1 = 1 - 2\sin^2\theta$, so you can keep whichever function you want. Read backwards they are the power-reduction formulas $\cos^2\theta = \frac{1 + \cos 2\theta}{2}$ and $\sin^2\theta = \frac{1 - \cos 2\theta}{2}$.`,
          keywords: ["double angle", "sin 2x", "cos 2x", "double angle formula", "sin 2 theta", "tan 2x", "power reduction"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "half-angle",
          name: "Half Angle Formulas",
          latex: String.raw`\sin^2\tfrac{\theta}{2} = \frac{1 - \cos\theta}{2}, \qquad \cos^2\tfrac{\theta}{2} = \frac{1 + \cos\theta}{2}, \qquad \tan\tfrac{\theta}{2} = \frac{\sin\theta}{1 + \cos\theta} = \frac{1 - \cos\theta}{\sin\theta}`,
          description: String.raw`The half angle formulas give the sine, cosine and tangent of $\frac\theta2$ from $\cos\theta$: $\sin^2\frac\theta2 = \frac{1 - \cos\theta}{2}$, $\cos^2\frac\theta2 = \frac{1 + \cos\theta}{2}$, and $\tan\frac\theta2 = \frac{\sin\theta}{1 + \cos\theta} = \frac{1 - \cos\theta}{\sin\theta}$. They are the double angle formulas read backwards. The tangent forms have no square roots, which makes them the ones to use in geometry, and in a triangle $\tan\frac A2 = \frac{r}{s - a}$ ties the half angle to the incircle.`,
          keywords: ["half angle", "power reduction", "tan half angle inradius", "half angle formula", "sin and cos half", "tan half angle"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "product-sum",
          name: "Product-to-Sum & Sum-to-Product",
          latex: String.raw`2\sin a\cos b = \sin(a{+}b)+\sin(a{-}b), \quad 2\cos a\cos b = \cos(a{+}b)+\cos(a{-}b), \quad 2\sin a\sin b = \cos(a{-}b)-\cos(a{+}b), \quad \sin a\pm\sin b = 2\sin\tfrac{a\pm b}{2}\cos\tfrac{a\mp b}{2}, \quad \cos a+\cos b = 2\cos\tfrac{a+b}{2}\cos\tfrac{a-b}{2}, \quad \cos a-\cos b = -2\sin\tfrac{a+b}{2}\sin\tfrac{a-b}{2}`,
          description: String.raw`The product-to-sum formulas rewrite a product of sines and cosines as a sum, such as $2\sin a\cos b = \sin(a + b) + \sin(a - b)$, and the sum-to-product formulas run the other way, such as $\sin a + \sin b = 2\sin\frac{a + b}{2}\cos\frac{a - b}{2}$. Products become sums when you want terms to telescope or cancel, and sums become products when you want to factor an equation. All of them come from adding or subtracting two angle addition formulas.`,
          keywords: ["product to sum", "sum to product", "telescoping trig", "factor sines", "cos plus cos", "sin plus sin"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "special-trig-values",
          name: "Special Values Worth Memorizing",
          latex: String.raw`\sin 15^\circ = \frac{\sqrt{6} - \sqrt{2}}{4}, \qquad \cos 36^\circ = \frac{1 + \sqrt{5}}{4}, \qquad \sin 18^\circ = \frac{\sqrt{5} - 1}{4}, \qquad \tan 15^\circ = 2 - \sqrt{3}, \qquad \tan 75^\circ = 2 + \sqrt{3}`,
          description: String.raw`Note $\cos 36^\circ = \frac{\varphi}{2}$ and $\sin 18^\circ = \frac{\varphi - 1}{2}$ where $\varphi$ is the [[golden-ratio-pentagon|golden ratio]]. Also $\tan 15^\circ = 2 - \sqrt{3}$ and $\tan 75^\circ = 2 + \sqrt{3}$. Pentagon and 15-75-90 problems reduce to these.`,
          keywords: ["15 degrees", "18 degrees", "36 degrees", "golden ratio", "exact values"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "triple-angle",
          name: "Triple Angle Formulas",
          latex: String.raw`\sin 3\theta = 3\sin\theta - 4\sin^3\theta, \qquad \cos 3\theta = 4\cos^3\theta - 3\cos\theta, \qquad \tan 3\theta = \frac{3\tan\theta - \tan^3\theta}{1 - 3\tan^2\theta}`,
          description: String.raw`Related gem: $\sin\theta \sin(60^\circ - \theta) \sin(60^\circ + \theta) = \frac{\sin 3\theta}{4}$, and the same with cosines.`,
          keywords: ["triple angle", "sin 3x", "cos 3x", "triple angle formula", "sin 3 theta", "cos 3 theta"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "even-power-sin-cos-sums",
          name: "High-Power Sine and Cosine Sums",
          latex: String.raw`\sin^4\theta + \cos^4\theta = 1 - \tfrac{1}{2}\sin^2 2\theta, \qquad \sin^6\theta + \cos^6\theta = 1 - \tfrac{3}{4}\sin^2 2\theta`,
          description: String.raw`Squaring or cubing $\sin^2\theta + \cos^2\theta = 1$ leaves a single correction term built from $\sin\theta\cos\theta = \tfrac12\sin 2\theta$. Both reduce a symmetric even-power expression to one double angle, which is what makes them time-savers.`,
          keywords: ["pythagorean identity squared", "sin^4 + cos^4", "sin^6 + cos^6", "fourth powers of sine and cosine", "sixth powers", "even power trig sum", "reduce to double angle"],
          importance: "low",
          level: ["AMC12", "AIME"]
        },
        {
          id: "cosecant-cotangent-square-sums",
          name: "Finite Sums of Squared Cosecants and Cotangents",
          latex: String.raw`\sum_{k=1}^{n-1}\csc^2\!\left(\frac{k\pi}{n}\right) = \frac{n^2-1}{3}, \qquad \sum_{k=1}^{n-1}\cot^2\!\left(\frac{k\pi}{n}\right) = \frac{(n-1)(n-2)}{3}`,
          latexPlain: String.raw`\csc^2\frac{\pi}{n} + \csc^2\frac{2\pi}{n} + \cdots + \csc^2\frac{(n-1)\pi}{n} = \frac{n^2-1}{3}, \qquad \cot^2\frac{\pi}{n} + \cot^2\frac{2\pi}{n} + \cdots + \cot^2\frac{(n-1)\pi}{n} = \frac{(n-1)(n-2)}{3}`,
          description: String.raw`Summing over the $n-1$ nontrivial $n$th [[roots-of-unity|roots of unity]]. The two differ by exactly $n-1$ because $\csc^2 = \cot^2 + 1$, so proving either one gives the other for free.`,
          keywords: ["sum of csc squared", "sum of cot squared", "roots of unity trig sum", "cosecant squared sum", "cotangent squared sum", "k pi over n", "finite trigonometric sum"],
          importance: "lower",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "trig-telescoping-product",
          name: "Telescoping Cosine Products",
          latex: String.raw`\prod_{k=0}^{n-1} \cos(2^k \theta) = \frac{\sin(2^n \theta)}{2^n \sin\theta}`,
          latexPlain: String.raw`\cos\theta\,\cos 2\theta\,\cos 4\theta \cdots \cos(2^{n-1}\theta) = \frac{\sin(2^n \theta)}{2^n \sin\theta}`,
          description: String.raw`Repeatedly apply $\sin 2x = 2\sin x \cos x$ from the inside out: each doubling absorbs one cosine. The standard weapon for products like $\cos 20^\circ \cos 40^\circ \cos 80^\circ$.`,
          keywords: ["cosine product", "doubling angles", "sin 2x telescoping", "product of cosines"],
          importance: "lowest",
          level: ["AMC12", "AIME"]
        },
        {
          id: "arctan-telescoping",
          name: "Arctangent Addition & Telescoping",
          latex: String.raw`\arctan a - \arctan b = \arctan\frac{a - b}{1 + ab}`,
          description: String.raw`Read right-to-left: a term $\arctan\frac{a-b}{1+ab}$ splits into a difference, so sums of arctangents telescope. Trigger: denominators like $1 + n(n+1)$, i.e. $n^2 + n + 1$.`,
          keywords: ["arctan sum", "telescoping arctangent", "inverse tangent", "tan difference"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "sin-cos-ap-sum",
          name: "Sum of Sines/Cosines in Arithmetic Progression",
          latex: String.raw`\sum_{k=0}^{n-1} \sin(a + kd) = \frac{\sin\frac{nd}{2}}{\sin\frac{d}{2}} \sin\!\left(a + \frac{(n-1)d}{2}\right)`,
          latexPlain: String.raw`\sin a + \sin(a + d) + \cdots + \sin\big(a + (n-1)d\big) = \frac{\sin\frac{nd}{2}}{\sin\frac{d}{2}} \sin\!\left(a + \frac{(n-1)d}{2}\right)`,
          description: String.raw`Same formula with cosine on the right for cosine sums. Proof: multiply by $2\sin\frac{d}{2}$ and telescope with product-to-sum. Handles sums like $\cos 1^\circ + \cos 2^\circ + \cdots$ and vertex sums of regular polygons.`,
          keywords: ["sum of sines", "sum of cosines", "arithmetic progression angles", "dirichlet kernel"],
          importance: "lowest",
          level: ["AIME"]
        },
        {
          id: "triangle-angle-identities",
          name: "Identities for Angles Summing to 180°",
          latex: String.raw`\tan A + \tan B + \tan C = \tan A \tan B \tan C, \qquad \cos A + \cos B + \cos C = 1 + \frac{r}{R}, \qquad \sin A + \sin B + \sin C = \frac{s}{R}, \qquad \sin 2A + \sin 2B + \sin 2C = 4\sin A \sin B \sin C`,
          description: String.raw`Valid whenever $A + B + C = 180^\circ$. Companions: $\sin A + \sin B + \sin C = \frac{s}{R}$, $\;\sin 2A + \sin 2B + \sin 2C = 4\sin A \sin B \sin C$, and $\cot A \cot B + \cot B \cot C + \cot C \cot A = 1$. The tangent identity comes from expanding $\tan(A + B) = \tan(180^\circ - C)$.`,
          keywords: ["tan sum product", "angles sum 180", "cos sum r over R", "triangle identities"],
          importance: "medium",
          level: ["AIME"]
        },
        {
          id: "triangle-square-identities",
          name: "Triangle Squared-Angle Identities",
          latex: String.raw`\cos^2 A + \cos^2 B + \cos^2 C + 2\cos A\cos B\cos C = 1, \qquad \sin^2 A + \sin^2 B + \sin^2 C = 2 + 2\cos A\cos B\cos C, \qquad \tan\tfrac{A}{2}\tan\tfrac{B}{2} + \tan\tfrac{B}{2}\tan\tfrac{C}{2} + \tan\tfrac{C}{2}\tan\tfrac{A}{2} = 1`,
          description: String.raw`The identities everyone eventually memorizes for a triangle ($A+B+C=180^\circ$). The star is $\cos^2 A + \cos^2 B + \cos^2 C + 2\cos A\cos B\cos C = 1$, which collapses a symmetric pile of squared cosines into one relation; the sine version follows from $\cos^2 = 1-\sin^2$. Corollary: $\cos^2 A+\cos^2 B+\cos^2 C = 1$ exactly when the triangle is right.`,
          keywords: ["triangle trig identity", "cos squared identity", "cos^2 A + cos^2 B + cos^2 C", "2 cos A cos B cos C", "triangle squared angles", "sin squared sum triangle", "half angle tangent product", "aime cos squared angles", "right triangle test"],
          importance: "low",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "evenly-spaced-angle-products",
          name: "Evenly-Spaced Angle Products",
          latex: String.raw`\prod_{k=0}^{n-1}\sin\!\Big(\theta+\tfrac{k\pi}{n}\Big)=\frac{\sin n\theta}{2^{\,n-1}}, \qquad \sin\theta\,\sin(60^\circ\!-\theta)\,\sin(60^\circ\!+\theta)=\tfrac14\sin 3\theta, \qquad \prod_{k=1}^{n-1}\sin\frac{k\pi}{n}=\frac{n}{2^{\,n-1}}`,
          latexPlain: String.raw`\sin\theta\,\sin\!\Big(\theta+\tfrac{\pi}{n}\Big)\cdots\sin\!\Big(\theta+\tfrac{(n-1)\pi}{n}\Big)=\frac{\sin n\theta}{2^{\,n-1}}, \qquad \sin\theta\,\sin(60^\circ\!-\theta)\,\sin(60^\circ\!+\theta)=\tfrac14\sin 3\theta, \qquad \sin\frac{\pi}{n}\,\sin\frac{2\pi}{n}\cdots\sin\frac{(n-1)\pi}{n}=\frac{n}{2^{\,n-1}}`,
          description: String.raw`Products of sines taken at equally spaced angles collapse to a single sine. The $n=3$ case is the pretty $\sin\theta\,\sin(60^\circ-\theta)\,\sin(60^\circ+\theta)=\tfrac14\sin 3\theta$ — with the same shape for cosines, and $\tan\theta\,\tan(60^\circ-\theta)\,\tan(60^\circ+\theta)=\tan 3\theta$. Taking the nonzero multiples of $\pi/n$ gives $\prod_{k=1}^{n-1}\sin\frac{k\pi}{n}=\frac{n}{2^{n-1}}$, the product hiding inside the roots of unity.`,
          keywords: ["product of sines", "evenly spaced angles", "sin 60 minus theta", "triple product identity", "roots of unity product", "prod sin k pi over n", "tan triple product", "morrie"],
          importance: "lowest",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "cot-tan-telescoping",
          name: "Cotangent–Tangent Telescoping",
          latex: String.raw`\cot\theta-\cot 2\theta=\csc 2\theta, \qquad \tan\theta=\cot\theta-2\cot 2\theta, \qquad \sum_{k=0}^{n-1}2^{k}\tan\!\big(2^{k}\theta\big)=\cot\theta-2^{\,n}\cot\!\big(2^{\,n}\theta\big)`,
          latexPlain: String.raw`\cot\theta-\cot 2\theta=\csc 2\theta, \qquad \tan\theta=\cot\theta-2\cot 2\theta, \qquad \tan\theta + 2\tan 2\theta + 4\tan 4\theta + \cdots + 2^{n-1}\tan\!\big(2^{n-1}\theta\big)=\cot\theta-2^{\,n}\cot\!\big(2^{\,n}\theta\big)`,
          description: String.raw`Two doubling relations that turn trig sums into telescopes. From $\cot\theta-\cot 2\theta=\csc 2\theta$, a sum of cosecants at doubling angles collapses; from $\tan\theta=\cot\theta-2\cot 2\theta$, the weighted sum $\sum 2^{k}\tan(2^{k}\theta)$ telescopes to $\cot\theta-2^{n}\cot(2^{n}\theta)$. The go-to move for an "evaluate this trig sum" problem built on angle doubling.`,
          keywords: ["cotangent telescoping", "cot theta minus cot 2theta", "csc doubling sum", "tan doubling telescope", "trig sum telescope", "half angle doubling"],
          importance: "lowest",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "inverse-trig-identities",
          name: "Inverse Trig Identities & Ranges",
          latex: String.raw`\arcsin x + \arccos x = \tfrac{\pi}{2}, \qquad \arctan x + \arctan \tfrac1x = \tfrac{\pi}{2}\,\operatorname{sgn}(x), \qquad \arctan x + \arctan y = \arctan\tfrac{x+y}{1-xy} \; (\pm\pi\text{ if } xy>1)`,
          description: String.raw`The reflection/complement identities plus the ranges that trip people up: $\arcsin, \arctan$ return values in $[-\tfrac\pi2, \tfrac\pi2]$ and $\arccos$ in $[0, \pi]$. So $\arctan x + \arctan\frac1x$ is $+\tfrac\pi2$ for $x>0$ but $-\tfrac\pi2$ for $x\lt 0$, and the arctan addition formula needs a $\pm\pi$ correction once $xy > 1$ pushes the true sum outside the principal range. Getting the branch right is the whole game.`,
          keywords: ["inverse trig", "arcsin arccos", "arctan identity", "principal value range", "arctan addition branch", "complementary angles"],
          importance: "medium",
          level: ["AMC12", "AIME"]
        }
      ]
    },
    {
      title: "Floors, Radicals & Absolute Value",
      formulas: [
        {
          id: "floor-basics",
          name: "Floor & Fractional Part",
          latex: String.raw`x = \lfloor x \rfloor + \{x\}, \qquad 0 \le \{x\} < 1, \qquad \left\lfloor \frac{n}{ab} \right\rfloor = \left\lfloor \frac{\lfloor n/a \rfloor}{b} \right\rfloor`,
          description: String.raw`The floor of a real number $x$, written $\lfloor x \rfloor$, is the greatest integer less than or equal to $x$, and its fractional part $\{x\} = x - \lfloor x \rfloor$ is what is left over, always at least $0$ and less than $1$. So $\lfloor 3.7 \rfloor = 3$ and $\{3.7\} = 0.7$, but $\lfloor -3.7 \rfloor = -4$ and $\{-3.7\} = 0.3$, because the floor always rounds down. Floors count things: the number of multiples of $d$ from $1$ to $n$ is $\left\lfloor \frac nd \right\rfloor$. Integers pass through a floor unchanged, $\lfloor x + n \rfloor = \lfloor x \rfloor + n$, and $\lfloor x \rfloor + \lfloor -x \rfloor$ is $-1$ unless $x$ is an integer, when it is $0$.`,
          keywords: ["floor function", "fractional part", "greatest integer", "greatest integer function", "integer and fractional part", "brackets notation"],
          importance: "high",
          level: ["AMC12", "AIME"]
        },
        {
          id: "hermite-identity",
          name: "Hermite's Identity",
          latex: String.raw`\lfloor nx \rfloor = \lfloor x \rfloor + \left\lfloor x + \tfrac{1}{n} \right\rfloor + \cdots + \left\lfloor x + \tfrac{n-1}{n} \right\rfloor`,
          description: String.raw`Splits $\lfloor nx \rfloor$ into $n$ shifted floors. Handy for floor-sum problems and proving floor identities.`,
          keywords: ["hermite", "floor sum", "nx", "hermite identity", "sum of floors", "floor of nx as a sum"],
          importance: "lowest",
          level: ["AIME", "Olympiad"]
        },
        {
          id: "ramanujan-nested-radical",
          name: "Golden & Ramanujan Nested Radicals",
          latex: String.raw`\sqrt{1 + \sqrt{1 + \sqrt{1 + \cdots}}} = \varphi, \qquad \sqrt{1 + 2\sqrt{1 + 3\sqrt{1 + 4\sqrt{\cdots}}}} = 3`,
          description: String.raw`Two famous exact nested radicals. The all-ones radical is the golden ratio: $x = \sqrt{1+x}$ gives $x = \varphi = \frac{1+\sqrt5}{2}$. Ramanujan's telescoping radical equals $3$, from the identity $n+2 = \sqrt{1 + (n+1)(n+3)} = \sqrt{1 + (n+1)\sqrt{1 + (n+2)(n+4)}}$; unrolling at $n=1$ gives $3 = \sqrt{1 + 2\sqrt{1 + 3\sqrt{1 + \cdots}}}$. Mostly a party trick, but the "$x+2 = \sqrt{1 + (x+1)f(x+1)}$" unrolling idea occasionally cracks a contest radical.`,
          keywords: ["ramanujan nested radical", "golden ratio radical", "sqrt 1 + 2 sqrt 1 + 3", "equals 3", "telescoping radical", "denest infinite", "party trick"],
          importance: "lowest",
          level: ["AMC12", "AIME"]
        },
        {
          id: "absolute-value-identities",
          name: "Absolute Value Identities",
          latex: String.raw`|ab| = |a||b|, \quad \left|\tfrac{a}{b}\right| = \tfrac{|a|}{|b|}, \quad |a^n| = |a|^n, \quad |a|^2 = a^2, \quad |ax + b| = |a|\left|x + \tfrac{b}{a}\right|`,
          description: String.raw`Absolute value passes straight through products, quotients and powers, which is what lets you pull a coefficient out of the bars: $|ax + b| = |a|\,|x + b/a|$ turns any linear expression into a distance, so $|3x - 12| = 3|x - 4|$ reads as three times the distance from $x$ to $4$. The outside factor is $|a|$, never $a$ — with $a = -2$ the identity gives $2|x - 2|$, and dropping the bars would make the whole expression negative. It does not pass through sums: $|a + b|$ only obeys the triangle inequality. Also $|-a| = |a|$, $\bigl||a|\bigr| = |a|$, and $|a - b| = |b - a|$, the last of which says distance does not care which end you start from.`,
          keywords: ["absolute value identities", "absolute value of a product", "abs of product equals product of abs", "factor out of absolute value", "pull coefficient out of absolute value", "|ax+b|", "|a||b| = |ab|", "absolute value of a power", "modulus is multiplicative", "distance form"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "absolute-value-rules",
          name: "Absolute Value Rules",
          latex: String.raw`|x| < a \iff -a < x < a, \qquad |x| > a \iff x < -a \text{ or } x > a, \qquad \sqrt{x^2} = |x|`,
          description: String.raw`The absolute value $|x|$ is the distance from $x$ to $0$ on the number line, so $|x - c|$ is the distance from $x$ to $c$. That one reading gives the rules: $|x - c| \lt d$ is the interval $c - d \lt x \lt c + d$, $|x - c| \gt d$ is the two rays outside it, and $|x - c| = d$ is the two points $c \pm d$. The algebraic rules follow as well: $|xy| = |x||y|$, $|x| = |y|$ exactly when $x = \pm y$, $\sqrt{x^2} = |x|$ rather than $x$, and the triangle inequality $|x + y| \le |x| + |y|$.`,
          keywords: ["absolute value", "distance on number line", "split cases", "sqrt x squared", "modulus"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        }
      ]
    },
    {
      title: "Rates, Work & Mixtures",
      formulas: [
        {
          id: "work-rates",
          name: "Combined Work Rates",
          latex: String.raw`\frac{1}{t_{\text{together}}} = \frac{1}{t_1} + \frac{1}{t_2} + \cdots`,
          description: String.raw`Work-rate problems combine workers, pipes or machines that each finish a job in a known time, and the rule is to add their rates, not their times. A worker who takes $t$ hours does $\frac1t$ of the job per hour, so a team working together does $\frac1{t_1} + \frac1{t_2} + \cdots$ of it per hour and finishes in the reciprocal of that. Two workers taking $a$ and $b$ hours together take $\frac{ab}{a + b}$ hours, and a drain or a leak is a negative rate.`,
          keywords: ["work rate", "together", "pipes fill", "jobs per hour", "combined time"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "average-speed",
          name: "Average Speed",
          latex: String.raw`v_{\text{avg}} = \frac{\text{total distance}}{\text{total time}}; \qquad \text{equal distances at } v_1, v_2: \; v_{\text{avg}} = \frac{2v_1v_2}{v_1+v_2}`,
          description: String.raw`Average speed is total distance divided by total time, and it is never the plain average of the speeds unless equal times are spent at each. Over two equal distances at speeds $v_1$ and $v_2$ it is the harmonic mean $\frac{2v_1v_2}{v_1 + v_2}$, which always lies closer to the slower speed. Computing total distance over total time is the one method that cannot go wrong.`,
          keywords: ["average speed", "harmonic mean", "round trip", "total distance over time"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "relative-motion",
          name: "Relative Motion",
          latex: String.raw`\text{closing speed} = v_1 + v_2 \;(\text{toward}), \quad v_1 - v_2 \;(\text{chasing}); \qquad \text{circular track: } \text{same way} \Rightarrow \text{faster gains } 1 \text{ lap}, \quad \text{opposite} \Rightarrow 1 \text{ lap between them}`,
          description: String.raw`Relative motion is the motion of one object as seen from another moving object: in the frame of the second, the first moves at the difference of their velocities. So the gap between two movers closes at the sum of their speeds when they approach head-on and at the difference when one chases the other, and the time until they meet is the gap divided by that closing speed. On a circular track the gap wraps around: runners going the same way meet each time the faster gains a full lap, and runners going opposite ways meet each time their distances add up to a lap. A current, wind or moving walkway adds a constant drift, so a boat with still-water speed $v$ moves at $v - c$ upstream and $v + c$ downstream.`,
          keywords: ["relative speed", "catch up", "head start", "river current", "upstream downstream", "closing speed", "circular track", "two runners", "laps", "same direction opposite direction", "when do they meet again", "running around a track"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        },
        {
          id: "weighted-average",
          name: "Weighted Averages & Mixtures",
          latex: String.raw`\bar{x} = \frac{w_1x_1 + w_2x_2}{w_1 + w_2}; \qquad \text{mixing ratio } \frac{w_1}{w_2} = \frac{x_2 - \bar{x}}{\bar{x} - x_1}`,
          description: String.raw`A weighted average combines values $x_1$ and $x_2$ in proportion to their weights $w_1$ and $w_2$: $\bar x = \frac{w_1x_1 + w_2x_2}{w_1 + w_2}$. It is what a mixture's concentration, a combined class average or an overall speed actually is, and it always lies between the two values, closer to the heavier one. The weights are inversely proportional to the distances from the average, $\frac{w_1}{w_2} = \frac{x_2 - \bar x}{\bar x - x_1}$, which answers mixing questions in one line. The reliable way to set up any mixture is to track the amount of pure substance before and after.`,
          keywords: ["weighted mean", "mixture", "concentration", "alligation", "class average"],
          importance: "high",
          level: ["MATHCOUNTS", "AMC10"]
        },
        {
          id: "proportion-properties",
          name: "Addendo, Componendo & Dividendo",
          latex: String.raw`\frac{a_1}{b_1}=\frac{a_2}{b_2}=\cdots=\frac{a_n}{b_n}=k \;\Longrightarrow\; \frac{a_1+a_2+\cdots+a_n}{b_1+b_2+\cdots+b_n}=k, \qquad \frac{a}{b}=\frac{c}{d} \Longrightarrow \frac{a+b}{a-b}=\frac{c+d}{c-d}`,
          description: String.raw`Addendo, componendo and dividendo are the rules for combining equal ratios. Addendo says that if several fractions all equal $k$, then the sum of their numerators over the sum of their denominators is also $k$, and each pair may be scaled by any weight first. On a single proportion $\frac ab = \frac cd$, componendo gives $\frac{a+b}{b} = \frac{c+d}{d}$, dividendo gives $\frac{a-b}{b} = \frac{c-d}{d}$, and together they give $\frac{a+b}{a-b} = \frac{c+d}{c-d}$, which clears a sum-and-difference form in one step. They save introducing a parameter on ratio and proportion problems.`,
          keywords: ["addendo", "componendo", "dividendo", "componendo dividendo", "componendo et dividendo", "invertendo", "alternendo", "equal ratios", "ratio and proportion", "proportion property", "sum of numerators over sum of denominators", "mediant", "adding equal fractions"],
          importance: "medium",
          level: ["MATHCOUNTS", "AMC10", "AMC12"]
        }
      ]
    }
  ]
});
