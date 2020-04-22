---
title: Distributed tracing
---
## Articles

- [Pinterest - Analyzing distributed trace data](https://medium.com/pinterest-engineering/analyzing-distributed-trace-data-6aae58919949)
- :star: [Distributed Tracing — we’ve been doing it wrong](https://medium.com/@copyconstruct/distributed-tracing-weve-been-doing-it-wrong-39fc92a857df)
    - Spans are too low-level a construct for effective root cause analysis
    - More high level visualizations would better benefit RCA. For instance, dynamically generaeted service topology graphs or aggregation of trace data to surface anomalous flows.
- [Twitter thread on how distributed tracing products don't provide enough value](https://twitter.com/mattklein123/status/1049813546077323264)
- [Lessons from Building Observability Tools at Netflix](https://netflixtechblog.com/lessons-from-building-observability-tools-at-netflix-7cfafed6ab17)
    - "In summary, the key learnings from our effort are that tying multiple request traces into a logical concept, a playback session in this case, and providing additional context based on constituent traces enables our users to quickly determine the root cause of a streaming issue that may involve multiple systems."

## Misc

- [The OpenTracing Semantic Specification](https://opentracing.io/specification/)

## Reading queue

- [Uber - Distributed Tracing](https://eng.uber.com/distributed-tracing/)
- [Canopy: Scalable Distributed Tracing & Analysis @ Facebook (49m video)](https://www.infoq.com/presentations/canopy-scalable-tracing-analytics-facebook/)
- [Distributed Tracing: Impact on Engineering Organizations](https://medium.com/@dm03514/distributed-tracing-impact-on-engineering-organizations-d2f775e94aae)
- [Salesforce - Anomaly Detection in Zipkin Trace Data](https://engineering.salesforce.com/anomaly-detection-in-zipkin-trace-data-87c8a2ded8a1)
