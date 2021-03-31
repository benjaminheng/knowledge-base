---
title: PostgreSQL
toc: true
---
## Resources

- [Useful PostgreSQL Queries and Commands](https://gist.github.com/rgreenjr/3637525)
- [Disk Usage](https://wiki.postgresql.org/wiki/Disk_Usage)
- [Lock Monitoring](https://wiki.postgresql.org/wiki/Lock_Monitoring)
- [Things I Wished More Developers Knew About Databases](https://medium.com/@rakyll/things-i-wished-more-developers-knew-about-databases-2d0178464f78)
- [pgbadger](https://github.com/darold/pgbadger) - Analyze and generate reports from logs.

## General

### Show running queries (pre 9.2):

```
SELECT procpid, age(clock_timestamp(), query_start), usename, client_addr, current_query 
FROM pg_stat_activity 
WHERE current_query != '<IDLE>' AND current_query NOT ILIKE '%pg_stat_activity%' 
ORDER BY query_start ASC;
```

### Show running queries (9.2)

```
SELECT pid, age(clock_timestamp(), query_start), usename, client_addr, query 
FROM pg_stat_activity 
WHERE query != '<IDLE>' AND query NOT ILIKE '%pg_stat_activity%' 
ORDER BY query_start ASC;
```

### Kill running query

```
SELECT pg_cancel_backend(procpid);
```

### Show currently-held locks

```
SELECT l.relation::regclass, l.mode, l.locktype, l.pid, age(clock_timestamp(), a.query_start) as age
FROM pg_locks l, pg_stat_activity a
WHERE l.GRANTED and l.pid = a.pid;
```

### Show when autovacuum last ran

```
SELECT relname, last_vacuum, last_autovacuum FROM pg_stat_user_tables ORDER BY last_autovacuum;
```

## Disk usage

### Show size of relations

```
SELECT nspname || '.' || relname AS "relation",
    pg_size_pretty(pg_relation_size(C.oid)) AS "size"
  FROM pg_class C
  LEFT JOIN pg_namespace N ON (N.oid = C.relnamespace)
  WHERE nspname NOT IN ('pg_catalog', 'information_schema')
  ORDER BY pg_relation_size(C.oid) DESC
  LIMIT 20;
```

### Show size of tables

```
SELECT nspname || '.' || relname AS "relation",
    pg_size_pretty(pg_total_relation_size(C.oid)) AS "total_size"
  FROM pg_class C
  LEFT JOIN pg_namespace N ON (N.oid = C.relnamespace)
  WHERE nspname NOT IN ('pg_catalog', 'information_schema')
    AND C.relkind <> 'i'
    AND nspname !~ '^pg_toast'
  ORDER BY pg_total_relation_size(C.oid) DESC
  LIMIT 20;
```

### Show size of column on disk

Warning: expensive query on large tables.

```
select
    pg_size_pretty(sum(pg_column_size(column_name))) as total_size,
    pg_size_pretty(avg(pg_column_size(column_name))) as average_size,
    sum(pg_column_size(column_name)) * 100.0 / pg_total_relation_size('table_name') as percentage
from table_name;
```

## Indexes

### Show index usage

Source: https://www.cybertec-postgresql.com/en/get-rid-of-your-unused-indexes/

```
SELECT s.schemaname,
       s.relname AS tablename,
       s.indexrelname AS indexname,
       pg_size_pretty(pg_relation_size(s.indexrelid)) AS index_size
FROM pg_catalog.pg_stat_user_indexes s
   JOIN pg_catalog.pg_index i ON s.indexrelid = i.indexrelid
WHERE s.idx_scan = 0      -- has never been scanned
  AND 0 <>ALL (i.indkey)  -- no index column is an expression
  AND NOT i.indisunique   -- is not a UNIQUE index
  AND NOT EXISTS          -- does not enforce a constraint
         (SELECT 1 FROM pg_catalog.pg_constraint c
          WHERE c.conindid = s.indexrelid)
ORDER BY pg_relation_size(s.indexrelid) DESC;
```

## pg_stat_statements

### Cache hit rate

```
SELECT
    calls, total_time, rows,
    100.0 * shared_blks_hit / nullif(shared_blks_hit + shared_blks_read, 0) AS hit_percent,
    round((100 * total_time / sum(total_time::numeric) OVER ())::numeric, 2) AS percentage_cpu,
    query
FROM pg_stat_statements ORDER BY total_time DESC LIMIT 100;
```

## Concepts

### Buffers (shared/local blocks)

https://www.postgresql.org/docs/10/sql-explain.html

> Shared blocks contain data from regular tables and indexes; local blocks
> contain data from temporary tables and indexes; while temp blocks contain
> short-term working data used in sorts, hashes, Materialize plan nodes, and
> similar cases. The number of blocks dirtied indicates the number of
> previously unmodified blocks that were changed by this query; while the
> number of blocks written indicates the number of previously-dirtied blocks
> evicted from cache by this backend during query processing.

## psql customizations

- [Thoughtbot - Improving the Command-Line Postgres Experience ](https://thoughtbot.com/blog/improving-the-command-line-postgres-experience)

Separate histories for different remote hosts:

```
\set HISTFILE ~/.config/psql/history/.psql_history_ :HOST _ :DBNAME
```

More information in the psql prompt:

```
\set PROMPT1 '%[%033[37m%][%M] %n@%/%R%#%x %[%033[0m%]%'
```
