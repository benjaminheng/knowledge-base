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

## Task management

Get task:

```bash
curl http://localhost:9200/_tasks/$task_id
```

Cancel task:

```bash
curl -X POST "http://localhost:9200/_tasks/$task_id/_cancel"
```

Rethrottle task:

```bash
curl -X POST "http://localhost:9200/_update_by_query/$task_id/_rethrottle?requests_per_second=100"
```

Get running tasks, sorted by duration:

```bash
curl -s http://localhost:9200/_tasks/ | gron | grep running_time_in_nanos | sort --numeric-sort --reverse -k 3
```

## Add a new multi-field to an existing field

Update mapping

```bash
curl -X PUT "http://localhost:9200/chat_offers" -H 'Content-Type: application/json' -d'
{
  "properties": {
    "listing_title": {
      "type": "text",
      "fields": {
        "ngrams": {
          "type": "text",
          "analyzer": "my_custom_ngram_analyzer"
        }
      }
    }
  }
}
'
```

Call `_update_by_query` to reindex documents.

```bash
curl -X POST "http://localhost:9200/chat_offers/_update_by_query?conflicts=proceed&wait_for_completion=false&requests_per_second=50"
```
