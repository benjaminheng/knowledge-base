---
title: Distributed tracing
---

## Links

- [The OpenTracing Semantic Specification](https://opentracing.io/specification/)
- [OpenTelemetry Specification](https://github.com/open-telemetry/opentelemetry-specification)
- [Pinterest - Analyzing distributed trace data](https://medium.com/pinterest-engineering/analyzing-distributed-trace-data-6aae58919949)
- :star: [Distributed Tracing — we’ve been doing it wrong](https://medium.com/@copyconstruct/distributed-tracing-weve-been-doing-it-wrong-39fc92a857df)
    - Spans are too low-level a construct for effective root cause analysis
    - More high level visualizations would better benefit RCA. For instance, dynamically generaeted service topology graphs or aggregation of trace data to surface anomalous flows.
- [Twitter thread on how distributed tracing products don't provide enough value](https://twitter.com/mattklein123/status/1049813546077323264)
- [Lessons from Building Observability Tools at Netflix](https://netflixtechblog.com/lessons-from-building-observability-tools-at-netflix-7cfafed6ab17)
    - "In summary, the key learnings from our effort are that tying multiple request traces into a logical concept, a playback session in this case, and providing additional context based on constituent traces enables our users to quickly determine the root cause of a streaming issue that may involve multiple systems."
- [Distributed Tracing: Impact on Engineering Organizations](https://medium.com/@dm03514/distributed-tracing-impact-on-engineering-organizations-d2f775e94aae)
- [Salesforce - Anomaly Detection in Zipkin Trace Data](https://engineering.salesforce.com/anomaly-detection-in-zipkin-trace-data-87c8a2ded8a1)
    - Using machine learning
    - 1\. Calculating Completeness Metrics on Trace Data (sum of durations for spans within a trace compared to that trace's total duration)
    - 2\. Identifying High Traffic Areas in the Network
    - 3\. Identifying Services with Exponential Latency Growth
- [Uber - Distributed Tracing](https://eng.uber.com/distributed-tracing/)
- :star: [Dan Luu - A simple way to get more value from tracing](https://danluu.com/tracing-analytics/)
- [Netflix - Building Netflix's Distributed Tracing Infrastructure](https://netflixtechblog.com/building-netflixs-distributed-tracing-infrastructure-bb856c319304)
- [Timescale - Promscale and tracing](https://blog.timescale.com/blog/what-are-traces-and-how-sql-yes-sql-and-opentelemetry-can-help-us-get-more-value-out-of-traces-to-build-better-software/)

## Jaeger

- [Jaeger and OpenTelemetry](https://medium.com/jaegertracing/jaeger-and-opentelemetry-1846f701d9f2)
- [Jaeger GitHub Issue - Discuss post-trace (tail-based) sampling](https://github.com/jaegertracing/jaeger/issues/425)
- [Jaeger GitHub Issue - Adaptive Sampling](https://github.com/jaegertracing/jaeger/issues/365)
- [SURVEY: Who is using Jaeger](https://github.com/jaegertracing/jaeger/issues/207)
- [Jaeger using Kubernetes - various deployment configurations](https://github.com/jaegertracing/jaeger-kubernetes)
- :star: [Distributed Tracing Infrastructure with Jaeger on Kubernetes](https://medium.com/@masroor.hasan/tracing-infrastructure-with-jaeger-on-kubernetes-6800132a677)

## Reading queue

- [Canopy: Scalable Distributed Tracing & Analysis @ Facebook (49m video)](https://www.infoq.com/presentations/canopy-scalable-tracing-analytics-facebook/)

