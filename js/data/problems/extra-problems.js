// Additional, harder practice problems for the cards built/enriched this session.
// Each entry is appended (not overwritten) to window.MATH_PROBLEMS[id] as { q, s },
// so they render as extra numbered Examples beneath the lead example.
(function () {
  const P = window.MATH_PROBLEMS = window.MATH_PROBLEMS || {};
  const add = function (id) {
    const probs = Array.prototype.slice.call(arguments, 1);
    P[id] = (P[id] || []).concat(probs);
  };

  // ---------- Remainder & factor theorems (integer half, from the merge) ----------
  add("factor-remainder-theorem",
    { q: String.raw`Can a polynomial with integer coefficients satisfy $P(1) = 2$ and $P(3) = 5$?`,
      s: String.raw`No. For integer $a, b$ the factor theorem forces $(a-b) \mid P(a) - P(b)$, so $3 - 1 = 2$ would have to divide $P(3) - P(1) = 3$. It does not, so no such polynomial exists.` },
    { q: String.raw`$P$ has integer coefficients, $P(2) = 3$ and $P(7) = 8$. Find all possible values of $P(12)$ modulo $5$.`,
      s: String.raw`From $(7-2) \mid P(7)-P(2)$ we get $5 \mid 5$, consistent. For $P(12)$: $(12-2) \mid P(12)-3$ and $(12-7) \mid P(12)-8$, so $P(12) \equiv 3 \pmod{10}$ and $P(12) \equiv 8 \equiv 3 \pmod 5$. Hence $P(12) \equiv 3 \pmod 5$ always.` });

  // ---------- Linear recurrences (absorbed from the merged method card) ----------
  add("linear-recurrence",
    { q: String.raw`Solve $a_n = 5a_{n-1} - 6a_{n-2}$ with $a_0 = 3$, $a_1 = 8$.`, s: String.raw`Characteristic equation $x^2 = 5x - 6$ gives $x = 2, 3$, so $a_n = A \cdot 2^n + B \cdot 3^n$. From $A + B = 3$ and $2A + 3B = 8$: $B = 2$, $A = 1$. Thus $a_n = 2^n + 2 \cdot 3^n$ (check $a_2 = 4 + 18 = 22 = 5 \cdot 8 - 6 \cdot 3$ ✓).` },
    { q: String.raw`Solve $a_n = 4a_{n-1} - 4a_{n-2}$ with $a_0 = 1$, $a_1 = 6$.`,
      s: String.raw`The characteristic equation $x^2 - 4x + 4 = 0$ has the repeated root $x = 2$, so the general solution is $a_n = (A + Bn)2^n$. From $a_0 = A = 1$ and $a_1 = (1+B)\cdot 2 = 6$ we get $B = 2$, giving $a_n = (1 + 2n)2^n$. Check: $a_2 = 5\cdot4 = 20 = 4\cdot6 - 4\cdot1$ ✓ — the $n$ factor is what a repeated root always contributes.` },
    { q: String.raw`Solve the non-homogeneous recurrence $a_n = 3a_{n-1} + 2^n$ with $a_0 = 1$.`,
      s: String.raw`The homogeneous part gives $A\cdot3^n$. For the particular solution try $C\cdot2^n$: substituting gives $C2^n = 3C2^{n-1} + 2^n$, so $2C = 3C + 2$ and $C = -2$. Then $a_n = A3^n - 2^{n+1}$, and $a_0 = A - 2 = 1$ forces $A = 3$, so $a_n = 3^{n+1} - 2^{n+1}$. Check: $a_1 = 9 - 4 = 5 = 3\cdot1 + 2$ ✓.` });

  // ---------- Balls in boxes ----------
  add("balls-boxes-table",
    { q: String.raw`How many ways are there to put $15$ identical balls into $4$ distinct boxes with each box holding between $1$ and $6$?`,
      s: String.raw`Give each box its minimum $1$ (uses $4$), leaving $11$ balls into $4$ boxes each $\le 5$. Stars and bars: $\binom{14}{3}=364$; subtract a box $\ge 6$ (hand it $6$, distribute $5$): $4\binom{8}{3}=224$; two boxes $\ge 6$ needs $12>11$, impossible. Total $364-224=\mathbf{140}$.` },
    { q: String.raw`In how many ways can $6$ distinct books be given to $3$ distinct students with no student left empty?`,
      s: String.raw`Surjections: $3!\,S(6,3)=6\cdot 90=540$, or by inclusion–exclusion $3^6-3\cdot2^6+3\cdot1^6=729-192+3=\mathbf{540}$.` }
  );

  // ---------- Recurring-style methods ----------
  add("cryptarithms",
    { q: String.raw`Find digits $A,B,C$ with $\overline{AA}+\overline{BB}+\overline{CC}=\overline{ABC}$.`,
      s: String.raw`$11(A+B+C)=100A+10B+C \Rightarrow 89A=B+10C$. Since $B+10C\le 99$, we need $A=1$ and $B+10C=89$, so $C=8,\,B=9$. Check: $11+99+88=198=\overline{ABC}$.` }
  );
  add("periodicity-mod-m",
    { q: String.raw`Find the remainder of the $100$th Fibonacci number $F_{100}$ modulo $8$.`,
      s: String.raw`Fibonacci mod $8$ is periodic with Pisano period $12$: $0,1,1,2,3,5,0,5,5,2,7,1,\dots$. Since $100\equiv 4\pmod{12}$, $F_{100}\equiv F_4=\mathbf{3}\pmod 8$.` }
  );
  add("gap-method",
    { q: String.raw`In how many ways can $5$ identical red balls and $8$ identical blue balls be arranged in a row so that no two red balls are adjacent?`,
      s: String.raw`Lay down the $8$ blue balls first; they create $9$ gaps. Choose $5$ of the gaps for the reds: $\binom{9}{5}=\mathbf{126}$.` }
  );
  add("constructive-counting",
    { q: String.raw`How many integers from $1$ to $9999$ have strictly increasing digits (left to right)?`,
      s: String.raw`A strictly increasing number is determined by which digits it uses — any nonempty subset of $\{1,\dots,9\}$ (a $0$ could only lead, which is disallowed) written in order. With lengths $1$–$4$: $\binom91+\binom92+\binom93+\binom94=9+36+84+126=\mathbf{255}$.` },
    { q: String.raw`How many integers from $1$ to $999$ contain no digit $7$?`,
      s: String.raw`View each as a 3-digit string (leading zeros allowed) over the $9$ digits $\{0,\dots,9\}\setminus\{7\}$: $9^3 = 729$ strings, minus $000$, gives $\mathbf{728}$.` }
  );
  add("sos-method",
    { q: String.raw`Prove $2(a^3+b^3+c^3)\ge a^2b+ab^2+b^2c+bc^2+c^2a+ca^2$ for nonnegative reals.`,
      s: String.raw`The difference is $\sum_{\text{cyc}}\big(a^3+b^3-a^2b-ab^2\big)=\sum_{\text{cyc}}(a-b)^2(a+b)\ge 0$, since each $(a-b)^2(a+b)\ge 0$. Equality iff $a=b=c$.` }
  );
  add("smoothing-method",
    { q: String.raw`For nonnegative reals with $a+b+c=10$, find the maximum and minimum of $ab+bc+ca$.`,
      s: String.raw`Since $ab+bc+ca=\frac{(a+b+c)^2-(a^2+b^2+c^2)}{2}$, it is largest when $a^2+b^2+c^2$ is smallest — smoothing to $a=b=c=\tfrac{10}{3}$ gives $\frac{100-100/3}{2}=\frac{100}{3}$. Pushing to the boundary $a=10,\,b=c=0$ gives the minimum $\mathbf{0}$.` }
  );
  add("transfer-matrix-method",
    { q: String.raw`Count length-$n$ strings over $\{A,B,C\}$ with no two adjacent letters equal.`,
      s: String.raw`Transfer matrix $M=\begin{pmatrix}0&1&1\\1&0&1\\1&1&0\end{pmatrix}$ ($1$ where a letter may follow another). The total is $\mathbf 1^{\top}M^{\,n-1}\mathbf 1=3\cdot 2^{\,n-1}$: three choices for the first letter, two for each next.` }
  );

  // ---------- Derived triangles ----------
  add("orthic-triangle",
    { q: String.raw`Find the perimeter of the orthic triangle of the $13$-$14$-$15$ triangle.`,
      s: String.raw`Perimeter $=\frac{2[ABC]}{R}$. Here $[ABC]=84$ and $R=\frac{abc}{4[ABC]}=\frac{2730}{336}=\frac{65}{8}$, so the perimeter is $\frac{2\cdot84}{65/8}=\frac{1344}{65}\approx 20.7$.` }
  );
  add("medial-triangle",
    { q: String.raw`The medial triangle of the medial triangle of $\triangle ABC$ has area $3$. Find $[ABC]$.`,
      s: String.raw`Each medial step scales area by $\frac14$, so two steps give $\frac1{16}$; thus $[ABC]=16\cdot 3=\mathbf{48}$.` }
  );
  add("contact-triangle",
    { q: String.raw`Show the contact triangle of an equilateral triangle is its medial triangle, and give the area ratio.`,
      s: String.raw`For an equilateral triangle $r=\tfrac R2$, so $[\text{contact}]=\frac{r}{2R}[ABC]=\frac14[ABC]$ — and the incircle touches the sides at their midpoints, i.e. the contact triangle is the medial triangle.` }
  );
  add("excentral-triangle",
    { q: String.raw`A triangle has $R=8$ and $r=3$. Find its excentral triangle's circumradius and its area relative to $[ABC]$.`,
      s: String.raw`Circumradius $=2R=16$; area $=\frac{2R}{r}[ABC]=\frac{16}{3}[ABC]$.` }
  );
  add("pedal-triangle",
    { q: String.raw`A point $P$ lies at distance $OP=5$ from the circumcenter of a triangle with $R=8$ and area $48$. Find the area of the pedal triangle of $P$.`,
      s: String.raw`$[\text{pedal}]=\frac{|R^2-OP^2|}{4R^2}[ABC]=\frac{|64-25|}{256}\cdot 48=\frac{39}{256}\cdot 48=\frac{117}{16}\approx 7.31$.` }
  );
  add("same-base-area-ratio",
    { q: String.raw`In quadrilateral $ABCD$ the diagonals meet at $P$ with $[APB]=10$, $[BPC]=15$, $[APD]=8$. Find $[CPD]$.`,
      s: String.raw`Triangles sharing diagonal $BD$ give $\frac{AP}{PC}=\frac{[APB]}{[CPB]}=\frac{[APD]}{[CPD]}$, so $\frac{10}{15}=\frac{8}{[CPD]}\Rightarrow[CPD]=\mathbf{12}$ (equivalently $[APB]\cdot[CPD]=[BPC]\cdot[APD]$).` }
  );
  add("perp-to-angle-bisector",
    { q: String.raw`In $\triangle ABC$ with $AB=13$, $AC=15$, let $P$ be the foot of the perpendicular from $B$ to the bisector of $\angle A$ and $M$ the midpoint of $BC$. Find $PM$.`,
      s: String.raw`Reflect $B$ over the bisector to $B'\in AC$ with $AB'=13$; then $B'C=15-13=2$. Since $PM$ is a midline of $\triangle BB'C$, $PM=\frac{B'C}{2}=\mathbf{1}$.` }
  );

  // ---------- Projective geometry ----------
  add("brianchon-theorem",
    { q: String.raw`A hexagon $ABCDEF$ is circumscribed about a circle, and diagonals $AD$ and $BE$ meet at $P$. Must $CF$ pass through $P$?`,
      s: String.raw`Yes. Brianchon's theorem says the three main diagonals of a hexagon circumscribed about a conic concur, so $CF$ passes through $P=AD\cap BE$.` }
  );
  add("desargues-theorem",
    { q: String.raw`Triangles $ABC$ and $A'B'C'$ are perspective from a point. $AB\cap A'B'=X$ and $BC\cap B'C'=Y$. Where must $CA\cap C'A'$ lie?`,
      s: String.raw`On line $XY$: by Desargues, perspective-from-a-point forces perspective-from-a-line, so the three side-intersections are collinear on the axis $XY$.` }
  );
  add("cross-ratio",
    { q: String.raw`Four concurrent lines through $O$ are cut by one transversal in points with cross-ratio $-1$. A second transversal meets them at $P,Q,R,S$. Find $(P,Q;R,S)$.`,
      s: String.raw`$-1$. Projection from $O$ (a perspectivity) preserves the cross-ratio, so every transversal of the pencil gives the same value.` }
  );
  add("harmonic-bundle",
    { q: String.raw`On a line, $A=0$, $B=12$, $C=8$. Find the point $D$ with $(A,B;C,D)=-1$.`,
      s: String.raw`$C$ divides $AB$ internally in ratio $AC:CB=8:4=2:1$, so the harmonic conjugate $D$ divides $AB$ externally in $2:1$: $D=24$. (Check the signed cross-ratio: $\frac{AC}{BC}\big/\frac{AD}{BD}=\frac{8}{-4}\big/\frac{24}{12}=-1$.)` }
  );
  add("inversion-properties",
    { q: String.raw`Inversion has center $O$ and radius $r=6$. Points $P,Q$ satisfy $OP=4$, $OQ=9$, $PQ=7$. Find $P^*Q^*$.`,
      s: String.raw`$P^*Q^*=\frac{r^2\,PQ}{OP\cdot OQ}=\frac{36\cdot 7}{4\cdot 9}=\frac{252}{36}=\mathbf{7}$ (clean because $OP\cdot OQ=36=r^2$).` }
  );

  // ---------- Number theory ----------
  add("jacobi-symbol",
    { q: String.raw`Is $30$ a quadratic residue modulo the prime $53$?`,
      s: String.raw`$\left(\frac{30}{53}\right)=\left(\frac{2}{53}\right)\left(\frac{3}{53}\right)\left(\frac{5}{53}\right)$. Since $53\equiv 5\pmod 8$, $\left(\frac{2}{53}\right)=-1$; reciprocity gives $\left(\frac{3}{53}\right)=\left(\frac{53}{3}\right)=\left(\frac{2}{3}\right)=-1$ and $\left(\frac{5}{53}\right)=\left(\frac{53}{5}\right)=\left(\frac{3}{5}\right)=-1$. Product $=-1$, so $30$ is a non-residue.` }
  );
  add("gauss-lemma-qr",
    { q: String.raw`Use Gauss's lemma to compute $\left(\frac{3}{11}\right)$.`,
      s: String.raw`The residues of $3\cdot1,\dots,3\cdot5$ are $3,6,9,1,4\pmod{11}$; those exceeding $\tfrac{11}{2}$ are $6,9$, so $\mu=2$ and $\left(\frac{3}{11}\right)=(-1)^2=+1$ (indeed $5^2\equiv 3$).` }
  );
  add("dirichlet-convolution",
    { q: String.raw`Starting from $\sum_{d\mid n}\varphi(d)=n$, use Möbius inversion to recover a formula for $\varphi$.`,
      s: String.raw`The identity is $\mathrm{id}=\varphi*\mathbf 1$, so $\varphi=\mathrm{id}*\mu$: $\varphi(n)=\sum_{d\mid n}\mu(d)\,\frac{n}{d}=n\prod_{p\mid n}\Big(1-\frac1p\Big)$.` }
  );
  add("chevalley-warning",
    { q: String.raw`Show that a system of homogeneous polynomials over $\mathbb{F}_p$ in $n$ variables with total degree sum $< n$ has a nonzero common root.`,
      s: String.raw`Homogeneous polynomials vanish at $\mathbf 0$, so it is one common root. Chevalley–Warning makes the number of common roots $\equiv 0\pmod p$, hence at least $p\ge 2$; beyond $\mathbf 0$ there is another — a nonzero solution.` }
  );

  // ---------- Algebra ----------
  add("chebyshev-polynomials",
    { q: String.raw`Solve $8x^4-8x^2+1=\tfrac12$ on $[-1,1]$.`,
      s: String.raw`The left side is $T_4(x)=\cos 4\theta$ with $x=\cos\theta$. $\cos4\theta=\tfrac12$ gives $4\theta\in\{\tfrac{\pi}{3},\tfrac{5\pi}{3},\tfrac{7\pi}{3},\tfrac{11\pi}{3}\}$, so $x=\cos15^\circ,\cos75^\circ,\cos105^\circ,\cos165^\circ$ — four roots.` }
  );
  add("resultant-discriminant",
    { q: String.raw`For which real $k$ does $x^3-3x+k$ have a repeated root?`,
      s: String.raw`The cubic discriminant of $x^3+px+q$ is $-4p^3-27q^2$. With $p=-3,\,q=k$: $108-27k^2=0\Rightarrow k=\pm 2$. (At $k=2$, $x^3-3x+2=(x-1)^2(x+2)$.)` }
  );
  add("ramanujan-nested-radical",
    { q: String.raw`Evaluate $\sqrt{2+\sqrt{2+\sqrt{2+\cdots}}}$ and $\sqrt{2-\sqrt{2-\sqrt{2-\cdots}}}$.`,
      s: String.raw`Let $x$ be the first: $x^2=2+x\Rightarrow x=2$. Let $y$ be the second: $y^2=2-y\Rightarrow y=1$. (These match $\sqrt{2+2\cos\theta}=2\cos\tfrac\theta2$ at $\theta=0$ and $\theta=\tfrac{2\pi}{3}$.)` }
  );
  add("exponential-generating-functions",
    { q: String.raw`Use EGFs to get a formula for the Bell numbers $B_n$ (partitions of $[n]$ into any number of nonempty blocks).`,
      s: String.raw`One nonempty block has EGF $e^x-1$; a set of blocks (the exponential formula) has EGF $\exp(e^x-1)$. Hence $\sum_n B_n\frac{x^n}{n!}=e^{e^x-1}$, so $B_n=n!\,[x^n]\,e^{e^x-1}$.` }
  );

  // ---------- Advanced counting ----------
  add("lgv-lemma",
    { q: String.raw`With unit right/up steps, count pairs of non-intersecting lattice paths $a_1=(0,0)\!\to\!b_1=(2,1)$ and $a_2=(0,1)\!\to\!b_2=(2,2)$.`,
      s: String.raw`Single-path counts $M_{ij}=\#(a_i\to b_j)$: $M=\begin{pmatrix}3&6\\1&3\end{pmatrix}$. The number of non-intersecting pairs is $\det M=9-6=\mathbf{3}$.` }
  );
  add("matrix-tree-theorem",
    { q: String.raw`How many spanning trees does the cycle graph $C_5$ have?`,
      s: String.raw`Deleting any single edge of the cycle leaves a spanning tree, so there are $\mathbf{5}$. (Matrix–Tree agrees: any $C_n$ has exactly $n$ spanning trees.)` }
  );
  add("zeckendorf-theorem",
    { q: String.raw`Find the Zeckendorf representation of $2024$.`,
      s: String.raw`Greedily subtract the largest Fibonacci $\le$ the remainder: $2024=1597+377+34+13+3$ ($F_{16}+F_{13}+F_{8}+F_{6}+F_{3}$) — no two consecutive.` }
  );
  add("moser-circle",
    { q: String.raw`Six points on a circle are joined by all chords (no three meeting inside). How many interior intersection points and chord pieces are there, and how do they give the $31$ regions?`,
      s: String.raw`Interior crossings: $\binom64=15$. The $\binom62=15$ chords are cut into $15+2\cdot15=45$ pieces. With the $6$ boundary arcs, Euler's $V-E+F=2$ ($V=6+15=21$, $E=45+6=51$) gives $F=32$ — the $31$ interior regions plus the outer face.` }
  );

  // ---------- Cool facts ----------
  add("freshmans-dream",
    { q: String.raw`Prove $\binom{p}{k}\equiv 0\pmod p$ for $0\lt k\lt p$ (prime $p$), and deduce $(1+x)^p\equiv 1+x^p\pmod p$.`,
      s: String.raw`$\binom pk=\frac{p!}{k!\,(p-k)!}$ carries a factor of $p$ in the numerator that nothing in $k!\,(p-k)!$ (all factors $\lt p$) cancels, so $p\mid\binom pk$. Every middle term of $(1+x)^p=\sum\binom pk x^k$ then vanishes mod $p$, leaving $1+x^p$.` }
  );
  add("power-minus-self",
    { q: String.raw`Show $n^7\equiv n\pmod{42}$ for every integer $n$.`,
      s: String.raw`$42=2\cdot3\cdot7$, and for each prime $p\in\{2,3,7\}$ the value $p-1\in\{1,2,6\}$ divides $6=7-1$, so Fermat gives $n^7\equiv n\pmod p$. Combining the three via CRT yields $n^7\equiv n\pmod{42}$.` }
  );
  add("consecutive-product-factorial",
    { q: String.raw`Prove $\dfrac{(2n)!}{2^n\,n!}$ is an odd integer for every $n\ge 1$.`,
      s: String.raw`$\frac{(2n)!}{2^n n!}=\frac{(2n)!}{2\cdot4\cdots(2n)}=1\cdot3\cdot5\cdots(2n-1)$, the product of the first $n$ odd numbers — an integer, and odd since every factor is odd.` }
  );
  add("base10-curiosities",
    { q: String.raw`Compute $142857^2$ and split the result into its last six digits plus the rest. What happens?`,
      s: String.raw`$142857^2=20408122449$. Splitting: $122449+20408=142857$ — the cyclic number reappears (a "cast-out" quirk of numbers built from $\tfrac{10^k-1}{q}$).` }
  );
  add("trig-substitution",
    { q: String.raw`Let $x_0=\cos 12^\circ$ and $x_{n+1}=2x_n^2-1$. Express $x_3$ as a single cosine.`,
      s: String.raw`The map $x\mapsto 2x^2-1$ is $\cos\theta\mapsto\cos 2\theta$, so $x_n=\cos(2^n\cdot 12^\circ)$. Hence $x_3=\cos(8\cdot 12^\circ)=\cos 96^\circ$.` },
    { q: String.raw`Positive reals satisfy $a+b+c=abc$. Show that $a,b,c$ are the tangents of the angles of a triangle.`,
      s: String.raw`Set $a=\tan A,\ b=\tan B,\ c=\tan C$ with $A,B,C\in(0,\tfrac\pi2)$. The identity $\tan A+\tan B+\tan C=\tan A\tan B\tan C$ holds precisely when $A+B+C=\pi$, which the hypothesis $a+b+c=abc$ forces — so $A,B,C$ are the angles of a triangle.` }
  );
})();
