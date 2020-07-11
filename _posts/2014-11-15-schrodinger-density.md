---
layout: post
title: "Random Schrodinger Operators"
description: "Some aspects of one-dimensional discrete Schrodinger operators."
category: blog
tags: [matrices, ergodic]
comments: true
share: false
image: page-anderson.jpg
---

Consider the one-dimensional, discrete Schrodinger operator on $\ell^2(\mathbb{Z})$:

$$
(Hu)(n) := u(n+1) + u(n-1) + V(n) u(n) \, , \quad n \in \mathbb{Z}.
$$

This is a toy model for the behavior of an electron in a large domain. In order to model electron dynamics in the presence of random disordered environment, we can place assumptions on the randomness of the *potential* $V$. From the point of view of matrices, $H$ is an infinite Jacobi matrix with random elements along the diagonal. While this model is very simplified, random Schrodinger operators and their spectra turn out to have many interesting mathematical properties, including the prediction/replication of physically observed phenomena -- see Chapter 9 of [Cycon, Froese, Kirsch, Simon](http://books.google.com/books/about/Schrödinger_Operators.html?id=HR_-P2mxkSkC) for an introduction which is fairly gentle, aside from a few typos. I will focus on two nice results: the *integrated density of states* and the *Thouless formula*.


## Integrated Density of States

Let $(\Omega,\mathcal{F},\mathbb{P})$ be the canonical probability space associated with $V$, and suppose the potential $V$ is *stationary* and [*ergodic*](http://en.wikipedia.org/wiki/Measure-preserving_dynamical_system). For a given outcome $\omega\in\Omega$, let $$V_\omega$$ denote the potential, and $$H_\omega$$ the associated operator.

By elementary manipulations and applications of the ergodic property, it is possible to show that $\sigma(H_\omega)$, the spectrum of $$H_\omega$$, equals a deterministic set, call it $\Sigma$, $\mathbb{P}$-a.s. However, it is interesting to ask how the spectrum is distributed along this set $\Sigma$. Let $\delta_0\in \ell^2(\mathbb{Z})$ be the unit vector with value 1 in the 0th coordinate, and 0 elsewhere. Define the measure $dk$ by

$$ \int_\mathbb{R} f(\lambda) dk(\lambda)  := \mathbb{E} [\langle \delta_0, f(H_\omega) \delta_0 \rangle ]. $$

> **Theorem.** The support of $dk$ is $\Sigma$.

From just this definition and claim above, it is not clear why $dk$ is in any way related to the "distribution" of the spectrum. Note that the spectrum of $$H_\omega$$ is an infinite set, so it is not possibly to naively bucket and histogram to describe the distribution... but it essentially is! That is, we will restrict $$H_\omega$$ to a finite interval $[-L,L]$, compute the empirical density of the eigenvalues in this interval, and then see what happens as we take $L\rightarrow\infty$.

Let $$\{\mathcal{E}_\Delta(\omega)\}_{\Delta\subset\mathbb{R}}$$  represent the family of spectral projections associated with $$H_\omega$$, let $\chi_L$ be the indicator function of $[-L,L]$, and define the measure $dk_L$ by

$$ \int_A dk_L := \frac{1}{2L+1} \text{dim Range}(\chi_L \mathcal{E}_A(\omega) \chi_L) = \frac{1}{2L+1} \text{tr}(\mathcal{E}_A(\omega)\chi_L). $$

> **Theorem.** As $L\rightarrow\infty$, $dk_L$ converges vaguely to $dk$, $\mathbb{P}$-a.s.

*Idea of Proof.* First, prove that for a *given* bounded measurable function $f$, then $\int f dk_L \rightarrow \int f dk$, $\mathbb{P}$-a.s. To do so requires an application of Birkhoff's ergodic theorem. Then, for each bounded measurable function $f$, we have a set $\Omega_f$ of measure 1 on which the desired behavior occurs. The conclusion of the proof is a classical approximation argument which exploits the separability of $C_0$ to stitch together countably many $\Omega_f$ to get a set of measure 1 on which the statement is true for all $f\in C_0$. $\square$.

Note that the prelimit measures $dk_L$ are random, so it is *not* a priori obvious (at least, to me) that $dk$ *should* be a deterministic measure! This offers a nice parallel to other results in random matrix theory, where taking the limit of empirical spectral distributions can give an unexpectedly explicit (and universal!) limiting measure -- e.g., the semicircle law for Wigner matrices, or the circular law for matrices with iid elements.


## Thouless Formula

Part of the joy of the one-dimensional assumption is that solutions to the eigenvalue problem $(H-E)u=0$ can be written in terms of $2\times 2$ *transfer matrices* since any solution is determined by its value at two adjacent points in $\mathbb{Z}$. That is, let $\mathbf{u}(n) = (u(n+1), u(n))$, and define

$$
A_n(E,\omega) := \begin{pmatrix} E - V_\omega(n) & -1 \\ 1 & 0 \end{pmatrix}
$$

Then,

$$
\begin{array}{c}
u(n+1) + u(n-1) + (V_\omega(n) - E) u(n) = 0\\
\Updownarrow\\
\mathbf{u}(n+1) = A_{n+1}(E,\omega) \mathbf{u}(n).
\end{array}
$$

Note that $\mathbf{u}(n)$ can be written in terms of the product of the random matrices $$A_n(E)$$ applied to some initial condition. Then, Furstenberg's theorem tells us that for $E\in\mathbb{R}$ and $\mathbb{P}$-a.s. $\omega\in\Omega$, there exists $\gamma(E)$ such that

$$ 
\gamma(E) := \lim_{N\rightarrow \pm \infty} \frac{1}{|N|} \log \left\| \prod_{i=0}^N A_i(E,\omega) \right\|
$$

> **Theorem.** 
> $$\gamma(E) = \int \log |E - E'| dk(E') $$.

To me, this relationship is incredible! Unfortunately, I don't have much intuition as to *why* it should be true, but the proof involves showing that a similar result holds in the finite $N$ case, and then exploiting the subharmonicity of $\gamma$. Moreover, this is not merely a nice connection between $\gamma$ and $k$, but also a fundamental ingredient of the proof that under certain conditions on $V$, the spectrum $\sigma(H_\omega)$ has no absolutely continuous part.