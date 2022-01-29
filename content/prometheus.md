---
title: "Prometheus"
category: tech
---

## Limit query to specific hours

We can use the
[`hour()`](https://prometheus.io/docs/prometheus/latest/querying/functions/#hour)
function to limit a query to a specific time range. I've used this to define
alerts with different thresholds at different times of the day.

```
http_requests_total{job="foo"} and on() hour() >= 0 < 12
```

Note the use of `and on()` instead of simply `and`. `vector1 and vector2`
results in a vector consisting of the elements of `vector1` for which there are
elements in `vector2` with _exactly matching label sets_. However because
`hour()` is a vector with no labels, simply doing `and hour() >= 0` will not
return any results. Instead we add the `on()` operator to ignore all labels
when performing the join.
