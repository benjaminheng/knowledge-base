---
title: Elasticsearch
---

- [Deleting records](https://www.elastic.co/guide/en/elasticsearch/reference/5.1/docs-delete-by-query.html)
- Query for records in a time range:
    ```
    curl -XPOST 'http://<host_port>/<index_name>/_search' -d '{ "query": { "range": { "time_created": { "gte": "2015-11-01", "lte": "2020-11-30" } } } }'
    ```
- Cloning an index:
    - Cloning using a reindex:
        - https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html
        - https://stackoverflow.com/questions/25144034/how-to-copy-some-elasticsearch-data-to-a-new-index
    - Snapshot and restore
