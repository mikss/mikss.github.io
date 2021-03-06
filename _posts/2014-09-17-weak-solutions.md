---
layout: post
title: "Weak solutions of SDE"
description: "The classical examples of SDEs with a weak solution but no strong solution."
category: blog
tags: [stochastics]
comments: true
share: false
image: page-inputoutput.png
---

1. Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Background

Let $b:[0,\infty)\times\mathbb{R}^d \rightarrow \mathbb{R}^d$ and $\sigma:[0,\infty)\times\mathbb{R}^d \rightarrow \mathbb{R}^{d\times r}$ be Borel-measurable functions. We would like to "solve" the following SDE,

$$ dX_t = b(t,X_t) dt + \sigma(t, X_t) dW_t,\quad 0\le t < \infty, \tag{$\star$} $$

where $W$ is an $r$-dimensional Brownian motion, and $X$ is a suitable stochastic process with continuous sample paths and values in $\mathbb{R}^d$ is the "solution" to the equation.

### Strong solution

Fix a filtered probability space $(\Omega,\mathcal{F},\\{\mathcal{F}_t\\}, P)$[^usual]. Recall that a *strong solution* to $(\star)$ w.r.t. fixed Brownian motion $W$ and initial condition $\xi$ is a process $X$ with continuous sample paths such that:

[^usual]: In order to avoid dealing with completions or augmentations of any kind, we will always assume the usual conditions on any filtration discussed. That is, the filtration $\\{\mathcal{F}_t\\}$ is right-continuous and $\mathcal{F}_0$ contains all $P$-null sets in $\mathcal{F}$.

1. $X$ is $\\{\mathcal{F}_t\\}$-adapted;
2. $P(X_0 = \xi) = 1$;
3. for every $1 \le i \le d$, $1\le j \le r$, and $0\le t < \infty$, 
$$ P\left( \int_0^t \left\{ \lvert b_i(s,X_s)\rvert + \sigma_{ij}^2 (s, X_s)\right\} ds < \infty\right) =1; $$

4. the integral version of $(\star)$ holds -- that is, $P$-a.s.

$$ X_t = X_0 + \int_0^t b(s,X_s) ds + \int_0^t \sigma(s,X_s) dW_s; \quad 0\le t< \infty. $$

The key to this definition is the adaptedness condition 1., which says that $X_t$ depends only on $W_s$ for $s$ up to time $t$. On the other hand, there is an alternative notion of solution which is in some sense less "pathwise" and more "distributional".


### Weak solution

A *weak solution* to $(\star)$ is a pairing of $(X,W)$ and  $(\Omega,\mathcal{F},\\{\mathcal{F}_t\\}, P)$ such that:

1. $(\Omega,\mathcal{F},\\{\mathcal{F}_t\\}, P)$ is a filtered probability space satisfying the usual conditions;
2. $X$ is a continuous, adapted $\mathbb{R}^d$-valued proess and $W$ is an $r$-dimensional Brownian motion;
3. (see 3. for strong solutions);
4. (see 4. for strong solutions).

Note that for the case of strong solutions, a probability space was *given*; on the other hand, for the case of weak solutions, a probability space must be provided as part of the solution! 

### Simple example

An application of Girsanov's theorem provides a nice example of a weak solution. Suppose we would like to find a solution to the SDE 

$$ dX_t = b(t,X_t)dt + dW_t , \quad 0\le t \le T \tag{$\dagger$} $$

where $T < \infty$ is a fixed positive number and $b:\mathbb{R}^d\rightarrow \mathbb{R}^d$ is a measurable function with sublinear growth

$$ \|b(t,x)\| \le K(1+ \|x\|); \quad 0\le t \le T, \, x\in\mathbb{R}^d. $$

Let $(\Omega,\mathcal{F},P)$ be a probability space which supports a Brownian motion $X$, and let $\\{\mathcal{F}_t\\}$ be the (augmented) Brownian filtration (generated by $X$). Define the process $Z$ as

$$ Z_t := \exp\left( \int_0^t b(s,X_s) dX_s - \tfrac{1}{2} \int_0^t \|b(s,X_s)\|^2 ds \right), \quad 0\le t \le T.$$

Due to the Benes condition (see, Karatzas & Shreve, Corollary 3.5.16), $Z$ is a martingale under $P$. Define the measure $Q$ via its Radon-Nikodym derivative $\frac{dQ}{dP} = Z_T$. By applying the Girsanov theorem, the process $W$ as defined by 

$$ W_t := X_t - X_0 - \int_0^t b(s,X_s)ds, \quad 0\le t \le T $$

is a Brownian motion with $Q(W_0 = 0) = 1$. It is easy to check that $(X,W)$ and $(\Omega,\mathcal{F}, \\{\mathcal{F}_t\\}, Q)$ constitute a weak solution to $(\dagger)$. 

This example demonstrates the peculiarity of adaptedness. For a strong solution, we require $X_t$ to be $\\{\mathcal{F}_t^W\\} = \sigma(W_s;s\le t)$-measurable. On the other hand, the weak solution constructed above gives the "opposite" in some sense; here, $W_t$ is $\\{\mathcal{F}_t^X\\} = \sigma(X_s;s\le t)$-measurable. This distinction is  important, and it leads to different interpretations of solutions. Weak solutions provide a very probabilistic interpretation, since to provide a weak solution is essentially to construct a measure. On the other hand, strong solutions allow us to make parallels to deterministic dynamical systems. That is, if an SDE has a strong solution, it can reasonably be interpreted as "an ODE with noise", and Wong-Zakai type approximations should hold.




## Weak but not strong

Given that we have two notions of solution, we should have some examples which explicitly demonstrate that they are in fact distinct. There is also an important philosophical question of what it means to be a weak solution; that is, if the randomness of $X$ cannot be explained entirely through $W$, then where is this "extra randomness" coming from, and how should we interpret it? 


### Tanaka example

Consider the SDE with drift $b(x) \equiv 0$ and diffusion $\sigma(x) = \text{sgn}(x)$. That is,

$$ X_t = \int_0^t \text{sgn}(X_s) dW_s. \tag{$\ddagger$} $$

Note that the quadratic variation is $\langle X \rangle_t = t$, so by Lévy's characterization of Brownian motion, $X$ is a Brownian motion. Then, define $W$ as:

$$ W_t = \int_0^t \text{sgn}(X_s) dX_s. $$

It is apparent that $(X,W)$ and $(\Omega,\mathcal{F}, \\{\mathcal{F}_t^X\\}, P)$ form a weak solution to $(\ddagger)$. Note that as in the case of weak solutions formed by Girsanov theorem, $\mathcal{F}_t^W \subset \mathcal{F}_t^X$.

In fact, $(\ddagger)$ admits no strong solution at all! Suppose it did. First, recall the *Tanaka formula* for local time (at zero). For a Brownian motion $B$ starting at zero, where $L_t^B$ is its local time at 0,

$$ 2L_t^B = |B_t| - \int_0^t \text{sgn}(B_s) dB_s; \quad 0\le t < \infty. $$

Then, since $X$ is a Brownian motion started at zero,

$$
\begin{align*}
W_t &= \int_0^t \text{sgn}(X_s) dX_s \\
    &= |X_t| - 2L_t^X\\
    &= |X_t| - \lim_{\epsilon\downarrow 0} \frac{1}{2\epsilon} \text{meas} \{ 0\le s \le t: \lvert X_s \rvert \le \epsilon \}; \quad 0\le t < \infty, P-\text{a.s.}
\end{align*}
$$

Combined with the adaptedness condition for strong solutions, this implies 

$$\mathcal{F}_t^X \subset \mathcal{F}_t^W \subset \mathcal{F}_t^{|X|},$$ 

which is a contradiction.


### Tsirelson Example 

One might think that if the coefficients $b$ and $\sigma$ are sufficiently well-behaved, then one can obtain a weak solution using Girsanov theorem, and then somehow prove pathwise uniqueness to show that such a solution is in fact strong. In principle, this is true, but let's consider an example where $\sigma \equiv 1$ (avoiding the issue of the sign function) and $b$ is bounded (which would presumably prevent any sort of explosion), except now we let $b:[0,\infty)\times C([0,\infty);\mathbb{R})\rightarrow \mathbb{R}$ progressively measurable, meaning the drift depends on the entire past history of $X$ instead of just on a single point $X_t$. That is, we wish to solve the functional SDE:

$$ dX_t = b(t,X) dt + dW_t,\quad 0\le t < \infty. \tag{$\S$}$$

The following discussion is taken from Yor, Revuz p.392. Let $$(t_k)_{k\in -\mathbb{N}}$$ be a strictly increasing sequence such that $0 < t_k < 1$ for $k <0$, $t_0 = 1$, and $\lim_{k\rightarrow -\infty} t_k = 0$. Then, set

$$ 
\begin{align*}
\tau (t,z) &= \left[ \frac{ z(t_k) - z(t_{k-1}) }{ t_k - t_{k-1} } \right] \quad \text{ if } t_k < t\le t_{k+1} \\
   &= 0 \quad \text{ if } t= 0 \text{ or } t > 1,
\end{align*}
$$ 

where $[x]$ indicates the fractional part of a real number $x$. Let $(X,W)$ denote a solution to  $(\S)$ with $b= \tau$. For $$t_k < t \le t_{k+1}$$, let $$\eta_t = \frac{X_t - X_{t_k}}{t - t_k}$$ and let $$\epsilon_t = \frac{W_t - W_{t_k}}{t- t_k}$$. Then,

$$ \eta_t = \epsilon_t + [\eta_{t_k}]. $$

Note that $\mathcal{F}_t^X = \sigma([\eta_t]) \vee \mathcal{F}_t^W$. The lack of a strong solution follows from the following claim, which can be proved through from some elementary calculations involving conditional expectation and characteristic functions:

> **Lemma.** For $t\in [0,1]$, the random variable $[\eta_t]$ is uniformly distributed on $[0,1]$, and independent of  $\mathcal{F}_1^W$.



### Discrete time analog

In this section, we analyze a discrete-time version of the Tanaka example, for which a "strong solution" does exist! We proceed as in [Warren 1999](http://arxiv.org/abs/math.PR/9911115/). Let $$X=(X_n)_{n\in\mathbb{N}_0}$$ be the symmetric nearest neighbor random walk on $\mathbb{Z}$, and define $$W= (W_n)_{n\in\mathbb{N}_0}$$ by setting $W_0 = 0$ and

$$ W_{n+1} - W_n = \text{sgn}(X_n)(X_{n+1} - X_n). $$

Note that $W$ is also a symmetric nearest neighbor random walk on $\mathbb{W}$, and we can write

$$ X_n = \sum_{k=0}^{n-1} \text{sgn}(X_k) (W_{k+1} - W_k), \tag{$\parallel$}$$

the discrete version of the SDE $(\ddagger)$. Moreover, we can obtain discrete versions of the Tanaka formula. Let $L_0=0$ and define $$L_n = \sum_{k=0}^{n-1} \mathbb{1}_{\{X_k,X_{k+1} \in \{0,-1\}\}}$$. Then,

$$
\begin{align*}
|X_n + \tfrac{1}{2}| - \tfrac{1}{2} &= \sum_{k=0}^{n-1} \text{sgn}(X_k) (X_{k+1} - X_k) + L_n\\
    &= W_n + \sup_{k\le n} (-W_k).
\end{align*}
$$

In light of this formula, we can show that in the discrete setting, $X$ is fully determined by $W$.To do so, it remains to show that $\text{sgn}(X_n + \tfrac{1}{2})$ can be determined from $\\{W_k\\}_{k\le n}$. For $n\in\mathbb{N}$, define

$$  m_n := \sup \left\{ m \in \{0,1,\cdots, n\} : W_m = -\sup_{k \le m} (-W_k)  \right\} .$$

Note that $$X_{m_n} \in \{0, -1\}$$, and for all $ m_n < \ell \le n$, we know $$W_\ell > - \sup_{k\le \ell} (-W_k)$$, meaning $$\lvert X_\ell + \tfrac{1}{2}\rvert > \tfrac{1}{2}$$. This implies that
 
$$
\begin{align*}
X_{m_n} + \tfrac{1}{2} = +\tfrac{1}{2}  &\quad \Rightarrow \quad   X_\ell + \tfrac{1}{2} > 0, \\
X_{m_n} + \tfrac{1}{2} =  -\tfrac{1}{2} &\quad \Rightarrow \quad  X_\ell + \tfrac{1}{2} < 0.
\end{align*}
$$

Thus, $X_n$ is measurable with respect to $\mathcal{F}_n^W = \sigma(W_k : k \le n)$. That is, this adaptedness property gives us a "strong solution" to $(\parallel)$, even though no such strong solution exists for the SDE $(\ddagger)$!

One interpretation of this phenomenon is that there is some connection between the "loss of information" about the sign, and the fact that $x\mapsto \text{sgn}(x)$ is "noise sensitive". As described by Warren, suppose we have a pair of random walks $W$ and $W'$ such that the step sizes have correlation $\rho \in (0,1)$. From this pair of noises, define $X$ and $X'$ as in $(\parallel)$. In the asymptotic limit as $n$ grows large, it is possible to show that $\text{sgn}(X_n)$ and $\text{sgn}(X_n')$ are uncorrelated, regardless of the correlation $\rho \in (0,1)$, indicating that the sign function is asymptotically sensitive to any non-zero perturbation of the noise $W$. 


The fundamental question is: *What is happening the scaling limit?!* Questions of this nature  are discussed in brief in the Warren paper, and can also be found in some works of [Tsirelson](http://arxiv.org/abs/math/0301237).
