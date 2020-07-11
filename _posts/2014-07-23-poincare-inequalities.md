---
layout: post
title: "Poincaré Inequalities"
description: "A survey of Poincaré inequalities appearing outside of PDE."
category: blog
tags: [probability, analysis, geometry, statistics]
comments: true
image: page-isoperim2.jpg
---

1. Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## The (classical) Poincaré inequality

In functional analysis, Sobolev inequalities and Morrey's inequalities are a collection of useful estimates which quantify the tradeoff between integrability and smoothness. The ability to compare such properties is particularly useful when studying regularity of PDEs, or when attempting to show boundedness in a particular space in order to apply the direct method in the calculus of variations. 

The Poincaré inequality is an example of this kind of estimate. Let $1\le p \le \infty$ and $U$ a bounded, connected, open subset of $\mathbb{R}^n$, with $C^1$ boundary.  For $f:U\rightarrow\mathbb{R}$, denote by $(f)_U = \frac{1}{\vert U\vert} \int_U f(x)\,dx$  the average of $f$ over $U$.

> **Theorem.**  There exists a constant $c=c(n,p,U)$ such that
> 
> $$ \lVert f - (f)_U\rVert_{L^p(U)} \le c \, \lVert\nabla f\rVert_{L^p(U)}, $$
>
> for all $f \in W^{1,p}(U)$.
 
A simple case is when $n=1$, $p=2$, $f \in C^1$, and $U=[-r,r]$. Using the intermediate value theorem, the fundamental theorem of calculus and Hölder's inequality, one can easily prove the result with the constant $c= 2r$. For a proof of the general result, see Evans §5.8.1.

One way to interpret the Poincaré inequality is as an isoperimetric inequality applied to the level sets of $f$. That is, just as one can control the area of a set via its perimeter (for example, a circle is the unique maximizer of area for a given perimeter), one can control the norm of $f$ via the norm of $\nabla f$. For a discussion of how one might obtain the Poincaré inequality from isoperimetry, see [Nick Alger's blog](http://maze5.net/?page_id=790). To see how to recover the isoperimetric inequality from the Poincaré inequality, see [Peter Luthy's blog post](http://cornellmath.wordpress.com/2008/05/16/two-cute-proofs-of-the-isoperimetric-inequality/).

### The Poincaré constant

Aside from the trivial $n=1$ case, what can we say about the constant $c$? When can we recover the *optimal* constant? Consider the case $p=2$, so the right-hand side  of the Poincaré inequality is the Dirichlet energy of $f$. The min-max principle says that the first eigenvalue of the negative Laplacian on $H_0^1(U)$ minimizes the Rayleigh quotient. That is, where $0 < \lambda_1 \le \lambda_2 \le \cdots$ are the eigenvalues of $-\Delta$,

$$ \lambda_1 = \inf_{f \ne 0} \frac{\int_U \vert \nabla f\vert^2 dx}{\int_U \vert f \vert^2 dx}. $$

This recovers a Poincaré-type inequality with (optimal) constant $\lambda_1^{-1}$.  

Note that $\lambda_1$ is related to the [Cheeger constant](http://en.wikipedia.org/wiki/Cheeger_constant), so we have yet another way to make the connection to isoperimetry. For an exposition of this connection in the (relatively) simple case of graphs, see §2.3 of Chung's book on [Spectral Graph Theory](http://www.math.ucsd.edu/~fan/research/cb/ch2.pdf).


## Probabilistic Poincaré inequality

What if we want to prove a Poincaré-type inequality, except we would like to integrate over a measure $\mu$ other than Lebesgue measure? In the PDE and numerical analysis literature, one can find references to "weighted Poincaré inequalities", where $d\mu(x)=w(x)dx$ is absolutely continuous with respect to Lebesgue measure with density (or "weight") $w$ on some bounded domain. Typically, these estimates follow from analytical methods. 

Instead, let's try a probabilistic approach. Let $(M,d)$ be a metric space,  $\mu$  a  probability measure on its Borel sets. Consider the case $p=2$, so that the $L^p$ norm of a measurable function $f$ is just the variance (of the random variable $f$). For some class of measurable functions $f$ on $(M,d)$, we'd like to show that there exists a constant $C$ such that

$$
\begin{equation} \label{mupoinc}
 \textrm{Var}_\mu (f) \le  C\,\mathbb{E}_\mu \vert \nabla f \vert^2 .
 \end{equation}
$$

This inequality claims that the fluctuations of $f$ are controlled by how quickly $f$ can change. In particular, if $f$ is Lipschitz, then the variance is bounded by a constant! Analogous to the PDE case, "regularity" or "smoothness" (via the first derivative) gives an energy bound which restricts the possible behaviors of the system/function $f$.

Bounds on variance can be manipulated to develop *concentration inequalities* which bound the probability of $f$ deviating too far from its mean/median. Such estimates are a fundamental tool in statistics and machine learning (e.g., PAC learning, VC theory). 


## Gaussian Poincaré inequality

> **Theorem (GPI).**
> Let $\mu$ be the standard Gaussian measure on $M=\mathbb{R}^n$. Assume $f:\mathbb{R}^n\rightarrow\mathbb{R}$ is  $C^1$. Then, \eqref{mupoinc} holds with $C=1$. 

Note that this inequality is tight! Consider $f(x) = x_1 + x_2 + \cdots + x_n$ and note that $\mu$ is a product measure so there is no covariance between cross terms.

**Applications:**

1. Consider the $(1+1)$-dimensional Gaussian polymer model. The variance of the ground state energy (the minimum of sums of Gaussians) is bounded by $n+1$, which is surprising given that the expected size grows linearly in $n$. 
2. Consider the Sherrington-Kirkpatrick model with inverse temperature $\beta$. The variance of its free energy (the normalized log partition function) is bounded by $C(\beta)n$.
3. Let $(g_1,\cdots,g_n)$ be jointly Gaussian (possibly correlated). Then the variance of the maximum of $(g_i)$ is bounded by the maximum of the variances.

For these examples and others, the bounds produced by Gaussian Poincaré inequality are known to be suboptimal. For more on when/why this occurs, take a look at these notes on [superconcentration](http://cims.nyu.edu/~nica/CPSS_2012_Notes.pdf).



### Proof by Efron-Stein inequality

We first prove the Efron-Stein inequality, which will allow us to analyze the variability of $f$ in a coordinate-wise manner. Extending a result from one dimension to arbitrary dimension is an example of "tensorization".

Let $X_1,\cdots,X_n$ be independent random variables such that $X_k$ takes values in some space $\mathcal{X}_k$, and $f:\prod_k \mathcal{X}_k \rightarrow\mathbb{R}$ a measurable function. Let $\mathbb{E}_i$ denote the expectation with respect to the $i$-th coordinate; that is, 

$$\mathbb{E}_i f(X) = \mathbb{E}[f(X) \vert X_1,\cdots, X_{i-1}, X_{i+1}, \cdots, X_n],$$

and let $\textrm{Var}_i$ denote the conditional variance,

$$ \textrm{Var}_i f(X) = \mathbb{E}_i \left[ (f(X) - \mathbb{E}_i f(X))^2 \right] .$$

> **Theorem.**
>
> $$ \textrm{Var} \,f(X) \le \mathbb{E} \sum_{i=1}^n \textrm{Var}_i f(X)$$

**Proof.** First note that if $f(x) = \sum_{i=1}^n x_i$, we have an exact equality  since $X_i - \mathbb{E} X_i$ are orthogonal in $L^2$. More generally, we'd like to bound the variance of $f$ by expressing $f(X) - \mathbb{E} f(X)$ as the sum of martingale differences, and somehow exploit the orthogonality of those differences.

Let $Z = f(X)$,  $Y = Z - \mathbb{E}Z$, and 

$$ Y_i = \mathbb{E}_{(i+1):n} Z - \mathbb{E}_{i:n} Z $$

for $i=1,\cdots, n$. Then,

$$ \textrm{Var} Z = \mathbb{E}\,Y^2 = \sum_{i=1}^n \mathbb{E}\, Y_i^2 + \sum_{i \ne j} \mathbb{E} Y_i Y_j $$

The cross terms evaluate to zero due to elementary properties of conditional expectation. As for the first sum, by Jensen's inequality,

$$ Y_i^2 =  ( \mathbb{E}_{(i+1):n} ( Z -\mathbb{E}_{i} Z) )^2 \le \mathbb{E}_{(i+1):n} [ (Z - \mathbb{E}_{i} Z)^2] $$

$ \square$


**Proof of GPI.**

Suppose $X \sim \mu$ such that $$\textrm{Var}_\mu(f) = \textrm{Var} f(X)$$. Let $\mathbb{E} \lvert \nabla f(X) \rvert^2 < \infty$, since otherwise the result holds trivially. It is sufficient to consider the case $n=1$ since the Efron-Stein inequality allows us to analyze each coordinate separately. Also, suppose $f$ has compact support and is $C^2$ -- otherwise, just approximate. 

The key insight here is that a Gaussian random variable $X$ is just the scaling limit of a sum of mean 0 variance 1 random variables. Thus, to study the variance of a function of $X$, we can try to study the variance of a function of finite sums. To this end, let $\epsilon_1,\cdots,\epsilon_n$ be independent Rademacher random variables, and let $S_n = \frac{1}{\sqrt{n}} \sum_{j=1}^n \epsilon_j$. For all $i$,

$$
\textrm{Var}_i f(S_n) = \tfrac{1}{4} \left[ f( S_n - \tfrac{\epsilon_i}{\sqrt{n}} + \tfrac{1}{\sqrt{n}} ) -  f( S_n- \tfrac{\epsilon_i}{\sqrt{n}} - \tfrac{1}{\sqrt{n}}  )\right]^2.
 $$
 
 Apply Efron-Stein to get
 
$$ \textrm{Var} f(S_n) \le \tfrac{1}{4}\sum_{i=1}^n \mathbb{E}\left[ f( S_n - \tfrac{\epsilon_i}{\sqrt{n}} + \tfrac{1}{\sqrt{n}} ) -  f( S_n- \tfrac{\epsilon_i}{\sqrt{n}} - \tfrac{1}{\sqrt{n}}  )\right]^2 .$$

 The central limit theorem says $S_n \Rightarrow N(0,1)$, so $\textrm{Var} f(S_n) \rightarrow \textrm{Var} f(X)$.  Let $K=\sup_x \vert f"(x)\vert$. By Taylor's theorem,
 
 $$ \left\vert f( S_n - \tfrac{\epsilon_i}{\sqrt{n}} + \tfrac{1}{\sqrt{n}} )  - ( S_n - \tfrac{\epsilon_i}{\sqrt{n}} - \tfrac{1}{\sqrt{n}} )  \right\vert \le \tfrac{2}{\sqrt{n}} \vert f'(S_n)\vert  + \tfrac{2K}{n} . $$
 
 Then apply the CLT again,

 $$ \limsup_{n\rightarrow\infty}\tfrac{1}{4}\sum_{i=1}^n \mathbb{E}\left[ \left( f( S_n - \tfrac{\epsilon_i}{\sqrt{n}} + \tfrac{1}{\sqrt{n}} ) -  f( S_n- \tfrac{\epsilon_i}{\sqrt{n}} - \tfrac{1}{\sqrt{n}}  ) \right)^2\right]  \le \mathbb{E}[f'(X)^2] .$$
 
$\square$

This proof (along with several related results) can be found in the book by [Boucheron, Lugosi, Massart](http://books.google.com/books/about/Concentration_Inequalities.html?id=koNqWRluhP0C).

### Proof by Markov semigroups

For a proof of a rather different flavor, we take a more dynamical view, and think of the Gaussian measure $\mu$ as the invariant measure of some system.

Let $(X_t)$ be a Markov process in some state space, $P_t$ its semigroup, $L$ its generator, $f$ an element of some appropriate domain of test functions. Suppose $(X_t)$ has an invariant measure $\mu$. Note that $\mu$ defines a natural $L^2$ space and an inner product, but we can define another bilinear form $\mathcal{E}$, the *Dirichlet form*:

$$ \mathcal{E}(f,g) := -(f,Lg) = -\int f Lg \, d\mu. $$

If $L$ is self-adjoint (with respect to $\mu$ inner-product), the Dirichlet form is symmetric. Note that $L$ is self-adjoint when the Markov process $(X_t)$ is reversible. A related bilinear form is the covariance,

$$ \mathrm{Cov}_\mu(f,g) := \int fg\,d\mu - \int f\,d\mu \, \int g\,d\mu $$

> **Covariance Lemma.**
> Let $f,g\in L^2(\mu)$. Suppose when differentiating $(f,P_tg)$ with respect to $t$, we can move the derivative inside. Also, assume the "heat equation" $\partial_t P_t g = L P_t g$ holds. Then,
>
> $$ \mathrm{Cov}_\mu(f,g) = \int_0^\infty \mathcal{E}(f,P_tg)\,dt .$$


**Proof.**
Note that $P_tg$ tends to $\mathbb{E}_\mu g$ in $L^2$ as $t\rightarrow\infty$. Thus,

$$
\begin{align*}
\mathrm{Cov}_\mu(f,g) &= (f,g) - (f,\mathbb{E}_\mu g)\\
    &= \lim_{t\rightarrow\infty}\left[ (f,P_0g) - (f,P_tg)\right] \\
    &= - \int_0^\infty  \partial_t  (f,P_tg)\, dt\\
    &= - \int_0^\infty (f,\partial_t P_tg) \,dt\\
    &= - \int_0^\infty (f,L P_tg)\,dt \\
    &= \int_0^\infty \mathcal{E}(f,P_tg)\,dt
\end{align*}
$$
    
$\square$
    
    
What does $\mathcal{E}$ look like? Consider gradient diffusions. That is, for some potential $V$,

$$ Lf = \nabla V \cdot \nabla f  +  \Delta f $$

One can show that this is the generator for the diffusion $dX_t = \nabla V(X_t) dt + \sqrt{2} dB_t$, and has invariant measure $\gamma(dx) = e^{V(x)}\,dx$. That is, $\int Lf \, e^V \,dx = 0$ for all $f$, or $L^\star e^V =0$. Using integration by parts (assuming appropriate boundary conditions on $f,g$),

$$
\begin{align*}
\mathcal{E}(f,g) &= - (f, Lg)_\gamma\\
   &= -(f, \nabla V \cdot \nabla g + \Delta g)_\gamma\\
   &= -(f,\nabla V \cdot \nabla g)_\gamma + (\nabla f + (\nabla V)f, \nabla g)_\gamma\\
   &= -(f,\nabla V \cdot \nabla g)_\gamma + (f, \nabla V \cdot \nabla g)_\gamma + (\nabla f , \nabla g)_\gamma\\
   &= (\nabla f, \nabla g)_\gamma
\end{align*}
$$

**Proof of GPI**

Consider the example of the OU operator, $L= -x \cdot \nabla + \Delta$. Then, the stationary distribution is the standard Gaussian $\mu$. Note that we can explicitly write the semigroup as $P_t f(x)  = \mathbb{E}[f(e^{-t}x + \sqrt{1-e^{-2t}}Z)]$, so $\nabla P_t f = e^{-t} P_t \nabla f$. By the covariance lemma,

$$
\begin{align*}
\textrm{Var}_{\mu} f &= \int_0^\infty \mathcal{E}(f,P_tf) \,dt\\
   &= \int_0^\infty  (\nabla f , \nabla P_t f)_\mu\,dt \\
   &= \int_0^\infty e^{-t} \mathbb{E}_{\mu} (\nabla f \cdot P_t \nabla f)\, dt\\
(\text{Cauchy-Schwarz}) &\le  \int_0^\infty e^{-t} \mathbb{E}_{\mu} \vert\nabla f\vert\,  \vert P_t \nabla f\vert\, dt\\
(\text{Hölder})  &\le  \int_0^\infty e^{-t} \left(\mathbb{E}_{\mu} \vert\nabla f\vert^2 \, \mathbb{E}_{\mu} \vert P_t \nabla f\vert^2\right)^{1/2}dt \\
(\text{Jensen on } P_t) &\le \int_0^\infty e^{-t} \left(\mathbb{E}_{\mu} \vert\nabla f\vert^2 \, \mathbb{E}_{\mu} P_t \vert\nabla f\vert^2\right)^{1/2}dt\\
   &=\mathbb{E}_{\mu}\vert\nabla f\vert^2  \int_0^\infty e^{-t} dt \\
   &= \mathbb{E}_{\mu}\vert\nabla f\vert^2 
\end{align*}
$$

$\square$


## Other Poincaré inequalities

Earlier, we claimed that we want to prove \eqref{mupoinc} for certain measures $\mu$. The GPI is one example, but it could be more useful to think of it as a special case of an inequality like

\begin{equation} \label{genpoinc}
\textrm{Var}_\mu f \le C \, \mathcal{E}(f,f)
\end{equation}
where $\mathcal{E}$ is the Dirichlet form associated with some Markov process with invariant measure $\mu$. 

For example, in the  case of finite-state Markov chains, one can analyze the constant $C$ using the *canonical paths* method. For Poincaré inequalities on Markov random fields, see [Wu AoP 2006](http://projecteuclid.org/euclid.aop/1163517230).

It is possible to prove that $-L$ is positive semi-definite, so it is reasonable to ask whether its spectrum $\lambda_0 \le \lambda_1 \le \cdots $ encodes nice properties. Note that constant functions are in the null space of $L$, and in fact one can prove that the eigenspace of $\lambda_0= 0$ is one-dimensional. Using Plancherel identity in $L^2(\mu)$, one can show that a Poincaré inequality \eqref{genpoinc} holds iff $\lambda_1$ is strictly positive, in which case the optimal constant is $C = \frac{1}{\lambda_1}$. 

The persistent appearance of the spectral gap $\lambda_1$ is suggestive of the deep connection between *concentration* and *ergodicity*. In some sense, both notions encode some sort of rigidity of a system. For example,

> **Theorem.** Let $P_t$ be a Markov semigroup with stationary measure $\mu$. Let $f$ in the domain of $L$, and $C> 0$. The following are equivalent:
>
> 1. *(Poincaré inequality)* $\mu$ satisfies \eqref{genpoinc} with constant $C$.
> 2. *(Exponential decay)* For all $t$,
>
> $$ \left\lVert P_tf - \mathbb{E}_\mu f \right \rVert_{L^2(\mu)} \le e^{- t/C} \lVert f - \mathbb{E}_\mu f\rVert_{L^2(\mu)}.$$

**Proof.**

Assume 1. Then, 

$$\frac{d}{dt}\textrm{Var}_\mu (P_tf ) = -2\mathcal{E}(P_tf,P_tf) \le -\frac{2}{C} \textrm{Var}_\mu (P_tf) $$

where the first equality comes from the definition of Dirichlet form and stationary measure $\mu$, and the second is the Poincare inequality. Thus, $$\textrm{Var}_\mu (P_t f) \le e^{-2t/C} \textrm{Var}_\mu f$$, and note that $$\mathbb{E}_\mu f = \mathbb{E}_\mu P_tf$$.

Assume 2. Then, using the equality from the previous part again at time $t=0$,

$$ 2 \mathcal{E}(f,f) = - \lim_{t\downarrow 0} \frac{\textrm{Var}_\mu(P_tf) - \textrm{Var}_\mu f }{t} \ge \textrm{Var}_\mu f \, \lim_{t\downarrow 0} \frac{1 - e^{-2t/C}}{t} = \frac{2}{C}  \textrm{Var}_\mu f$$

$\square$.

For more on this connection, see [Liggett AoP 1989](http://projecteuclid.org/download/pdf_1/euclid.aop/1176991408). For a more recent paper on this interplay, see [Röckner, Wang JFA 2001](http://www.sciencedirect.com/science/article/pii/S0022123601937760) or [Bakry, Cattiaux, Guillin JFA 2008](http://www.sciencedirect.com/science/article/pii/S0022123607004259).

A great overall reference is the recent book by [Bakry, Gentil, Ledoux](http://link.springer.com/book/10.1007%2F978-3-319-00227-9).