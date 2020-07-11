---
layout: post
title: "Sparse PCA"
description: "A brief note on sparse PCA."
category: blog
tags: [statistics, optimization]
comments: true
share: false
image: page-pca.png
---

I recently sat in on the applied probability topics seminar at MIT, which will spend the semester covering some very modern topics in statistics (in particular: sparse PCA, matrix completion, and community detection). This past Friday, two students gave a very nice overview of the statistical and computational aspects of the semidefinite relaxation developed in [d'Aspremont, El Ghaoui, Jordan, Lanckriet 2007](http://arxiv.org/abs/cs/0406021). As a brief addendum to my previous post on [relaxations](/blog/optimization-relaxations), and as a reminder to myself, I'd like to review sparse principal component analysis (PCA), or at least the basic problem formulation.

Recall the setup of PCA. For $n$ observations with $p$ features, denote the data matrix by $X \in \mathbb{R}^{n\times p}$, and the sample covariance by

$$ S = \frac{1}{n} X^T X - \frac{1}{n^2} X^T \mathbb{1}_n \mathbb{1}_n^T X \in \mathbb{R}^{p\times p}, $$

where $\mathbb{1}_n$ is the $n\times 1$ vector of ones. The notion behind (classical) PCA is to find an orthonormal subset of vectors which will "explain" much of the data. To be precise, for $j=1,\cdots, p$, the $j$-th principal component is defined as follows:

$$ v_j = \arg \max_{\substack{ v \in \mathbb{R}^p \\ \text{s.t. } \| v\|_2 = 1, \\ v \perp v_1, \cdots, v_{j-1} } } v^T S v.$$

For some intuition on the objective function, note that $v^T S v$ is the empirical variance of $X v$, the $n$ samples projected onto the vector $v$. By selecting vectors to maximize empirical variance, we are finding the most influential aspects of the data. From one perspective, this optimization problem is already somewhat hard, since it is doubly non-convex: we are asked to maximize a convex function $v\mapsto v^T S v$, and we are optimizing over the sphere $\\|v \\|_2 = 1$, a non-convex set. On the other hand, if we combine the unit normal constraint with the objective function, this problem becomes one of maximizing the Rayleigh quotient. That is, the $j$-th principal component is the eigenvector associated with $\lambda_j$, the $j$-th largest eigenvalue of $S$, so PCA becomes a problem of eigenvalue decomposition [^psd]. Note that the "total variance" of the data can be written as $\text{tr} (S) = \lambda_1 + \cdots + \lambda_p$.

[^psd]: Note that since $S$ is a symmetric and positive semi-definite real matrix, the eigenvalues are all real and non-negative.

We would like to use PCA not only for dimension reduction (i.e., by projecting onto $p' \ll p$ dimensions which capture much of the variance of the data), but also for interpretation of the $p$ factors. The trouble is that in general, each principal component $v_i$ has non-zero elements at each coordinate. What if we would like to have only $k \ll p$ non-zeros? Then, for the first principal component, we would like to solve:

$$
\begin{align*} \tag{$\star$}
\text{ max } \, & v^T S v \\
\text{ s.t. } & \|v\|_2 = 1\\
              & \text{card}(v) \le k.
\end{align*}
$$

The cardinality constraint makes this problem even more difficult due to the additional combinatorial aspect involved. Note that we can rewrite $v^T S v = \text{tr}(Svv^T)$, which inspires the following rewrite of $(\star)$, which is more conducive to a semidefinite relaxation:

$$
\begin{align*} \tag{$\dagger$}
\text{ max } \,& \text{tr}(SV) \\
\text{ s.t. } & V \succeq 0\\
   & \text{tr}(V) = 1\\
   & \text{card}(V) \le k^2\\
   & \text{rank}(V) = 1.
\end{align*}
$$

Note that this formulation is already quite nice: the objective is linear in $V$ instead of quadratic in $v$, and the constraint $\\|v\\|_2=1$ has been changed into  linear constraints on $V$ (positive semi-definiteness and trace = 1). However, the cardinality and rank constraints are still combinatorial in nature. To this end,  since $\text{tr}(V) = 1$ and $\text{rank}(V) = 1$, note that the cardinality constraint $\text{card}(V) \le k^2$ implies

$$
\mathbb{1}_p^T |V| \mathbb{1}_p = \|\text{vec}(V)\|_1  \le k \|\text{vec}(V)\|_2 = k\|V\|_F = k.
$$

As for the rank constraint, simply drop it to obtain the relaxation:

$$
\begin{align*} \tag{$\ddagger$}
\text{ max } & \text{tr}(SV) \\
\text{ s.t. } & V \succeq 0\\
   & \text{tr}(V) = 1\\
   & \mathbb{1}_p^T |V| \mathbb{1}_p \le k.
\end{align*}
$$

Note that $(\ddagger)$ is an SDP, with variable $V \in \mathbb{S}^p$. The optimal value achieved by this optimization problem acts as an upper bound to the solution of the original problem $(\star)$.


Such is the problem setup. There are several questions one can ask regarding this problem, none of which I will go into in detail:

1. Does solving this relaxed problem produce feasible solutions (i.e., sparse vectors)? Numerical experiments suggest that this is frequently the case.
2. What if instead of the constrained problem, we analyze the penalized problem, with objective $v^T S v - \rho \,\text{card}(V)$? It turns out that the dual of the relaxed penalized problem can be interpreted as a "worst-case" computation of the maximum eigenvalue of a perturbed version of $S$.
3. How can we actually solve the associated SDP? One might immediately turn to interior point methods, but the $O(p^2)$ constraints make Newton's method too costly. On the other hand, first-order methods have cheap iterations, low memory requirements, and lend themselves to parallelization. The cost is that they converge slowly (typically something like $O(1/\epsilon)$ for $\epsilon$ precision); but  this cost is somewhat artificial since the statistical nature of this problem means that we only care about achieving computational error up to some statistical threshold.