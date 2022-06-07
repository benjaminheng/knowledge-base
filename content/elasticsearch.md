---
title: Elasticsearch
category: tech
---

- [Deleting records](https://www.elastic.co/guide/en/elasticsearch/reference/5.1/docs-delete-by-query.html)
- Query for records in a time range:
    ```
    curl -XPOST 'http://<host_port>/<index_name>/_count' -d '{ "query": { "range": { "time_created": { "gte": "2020-11-01", "lte": "2020-11-30" } } } }'
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

Reindex a range of documents

```
curl -X POST "http://localhost:9200/chat_offers/_update_by_query?conflicts=proceed&wait_for_completion=false&requests_per_second=50" -H 'Content-Type: application/json' -d '{
    "query": {
        "range": {
            "offer_updated_at": {
                "gte": "2021-01-01",
                "lte": "2021-04-07"
            }
        }
    }
}'
```

## Find long running tasks

A few times I've encountered an issue where a system was constantly retrying a
ES query. This query would take a second or so, which isn't enough time to
manually query for the latest task, copy the task ID, and run another query to
get the task details. This script automates this process.

The longest running task on a particular ES node is fetched, and its task
details are fetched.

```
#!/bin/bash

task=$(curl -s http://localhost:9200/_tasks/ | gron | grep running_time_in_nanos | sort --numeric-sort --reverse -k 3 | head -n 1 | gron -u | jq -r '.nodes[].tasks | keys | .[0]')
echo $task
curl http://localhost:9200/_tasks/$task
```
