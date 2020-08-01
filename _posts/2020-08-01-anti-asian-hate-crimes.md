---
layout: post
title: "Anti-Asian Hate Crimes"
description: "A growing problem in the time of COVID-19"
category: blog
tags: [urban]
comments: true
share: false
---

During the COVID-19 pandemic, the Asian-American community has experienced an increasing level of racially motivated harassment, seemingly linked to the fact that the outbreak was first identified in China. This collective pain has been reported on by [Human Rights Watch](https://www.hrw.org/news/2020/05/12/covid-19-fueling-anti-asian-racism-and-xenophobia-worldwide), [the Anti-Defamation League (ADL)](https://www.adl.org/blog/reports-of-anti-asian-assaults-harassment-and-hate-crimes-rise-as-coronavirus-spreads), and [PBS](https://www.pbs.org/newshour/nation/we-have-been-through-this-before-why-anti-asian-hate-crimes-are-rising-amid-coronavirus). 

These reports from the media are specific and painful, but incomplete; indeed, it is difficult to find concrete and timely data. Some relevant examples include:

1. The Bureau of Justice Statistics publishes a [Criminal Victimization](https://www.bjs.gov/content/pub/pdf/cv18.pdf) report that can lag actual events by months.
1. The Federal Bureau of Investigation hosts a [Crime Data Explorer](https://crime-data-explorer.fr.cloud.gov) to improve access to general law enforcement data.
1. New York City publishes a trove of data from city agencies, including [NYPD Complaint Data](https://data.cityofnewyork.us/Public-Safety/NYPD-Complaint-Data-Current-Year-To-Date-/5uac-w243)[^arrests], which is sufficiently fine-grained as to allow analysis across demographics and police districts.
1. Through a heroic data collection effort, [A3PCON](http://www.asianpacificpolicyandplanningcouncil.org/stop-aapi-hate/) has spun up a database to record racist incidents not limited to those that pass through the justice system.

[^arrests]: An arrest is always preceded by a complaint, but there does not seem to be an obvious key to allow for joins with [arrests data](https://data.cityofnewyork.us/Public-Safety/NYPD-Arrest-Data-Year-to-Date-/uip8-fykc).

A deeper look into option 3 above reveals that the story may be more complicated. If we translate the ADL's observation

> Since January 2020, there have been a significant number of reports of AAPI individuals being threatened and harassed on the street

into the consideration of `2020-01-01` as a potential [changepoint](https://en.wikipedia.org/wiki/Change_detection), then one crude exercise is to compare the level of anti-Asian incidents before and after that date. Specifically, we can use [rudimentary data exploration tools](https://github.com/mikss/nypdcd) to:

* retrieve NYPD complaints data (filtering to data with no obvious errors in their dates);
* filter to inter-race crimes, where the suspect and victim are of different races;
* filter to after `2017-01-01`, a somewhat arbitrary date chosen so as to limit the effects of long-term demographic change;
* and observe the level of anti-Asian crime over time (normalized relative to the total amount of crime).

We observe

|      |       n |     p |
| ---- | ------- | ----- |
|  pre | 812,373 | 7.12% |
| post | 102,607 | 7.52% |

which yields a two-sample[^samples] test statistic value of **4.7**, which suggests that the difference in 2020 compared to history may be small in magnitude, but significant. However, a closer look at complaint rate over time suggests that this difference may not be due to COVID-19; note, for example, the lack of obvious change associated with, say, the first case in New York State on `2020-03-01`, or the NYS PAUSE order on `2020-03-20`. Instead, the change over time suggests a longer-term shift, which in a way is even more sad. An optimistic explanation might point to demographic shift even between 2017 and 2020, such as due to an increase in raw Asian population or a decrease in residential segregation. Please see [github.com/mikss/nypdcd](https://github.com/mikss/nypdcd) for details on this data analysis.

[^samples]: The "two samples" are simply the ranges before and after the proposed changepoint of `2020-01-01`. We test against the null hypothesis of equality of Binomial distribution parameters.

<iframe id="igraph" scrolling="no" style="border:none;" seamless="seamless" src="/images/aa_plt.html" height="400" width="100%"></iframe>
