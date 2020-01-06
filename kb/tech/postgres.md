---
title: PostgreSQL
---

- [Useful PostgreSQL Queries and Commands](https://gist.github.com/rgreenjr/3637525)
- [Disk Usage](https://wiki.postgresql.org/wiki/Disk_Usage)

# General

## Show running queries (pre 9.2):

```
SELECT procpid, age(clock_timestamp(), query_start), usename, current_query 
FROM pg_stat_activity 
WHERE current_query != '<IDLE>' AND current_query NOT ILIKE '%pg_stat_activity%' 
ORDER BY query_start desc;
```

## Show running queries (9.2)

```
SELECT pid, age(clock_timestamp(), query_start), usename, query 
FROM pg_stat_activity 
WHERE query != '<IDLE>' AND query NOT ILIKE '%pg_stat_activity%' 
ORDER BY query_start desc;
```

## Kill running query

```
SELECT pg_cancel_backend(procpid);
```

# pg_stat_statements

## Cache hit rate

```
SELECT query, calls, total_time, rows, 100.0 * shared_blks_hit /
    nullif(shared_blks_hit + shared_blks_read, 0) AS hit_percent
    FROM pg_stat_statements ORDER BY total_time DESC;
```

# Concepts

## Buffers (shared/local blocks)

https://www.postgresql.org/docs/10/sql-explain.html

> Shared blocks contain data from regular tables and indexes; local blocks
> contain data from temporary tables and indexes; while temp blocks contain
> short-term working data used in sorts, hashes, Materialize plan nodes, and
> similar cases. The number of blocks dirtied indicates the number of
> previously unmodified blocks that were changed by this query; while the
> number of blocks written indicates the number of previously-dirtied blocks
> evicted from cache by this backend during query processing.
