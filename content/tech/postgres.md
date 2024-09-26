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
- [WAL write amplification from UUID indexes](https://www.2ndquadrant.com/en/blog/on-the-impact-of-full-page-writes/)
- [Lesser Known PostgreSQL Features](https://hakibenita.com/postgresql-unknown-features)
- :star: [The Internals of PostgreSQL](https://www.interdb.jp/pg/index.html)
- [SQL tips and tricks](https://github.com/ben-n93/SQL-tips-and-tricks)

## Queries

### Show running queries (pre 9.2):

```sql
SELECT procpid, age(clock_timestamp(), query_start), usename, client_addr, current_query 
FROM pg_stat_activity 
WHERE current_query != '<IDLE>' AND current_query NOT ILIKE '%pg_stat_activity%' 
ORDER BY query_start ASC;
```

### Show running queries (9.2)

```sql
SELECT pid, age(clock_timestamp(), query_start), usename, client_addr, query 
FROM pg_stat_activity 
WHERE query != '<IDLE>' AND query NOT ILIKE '%pg_stat_activity%' 
ORDER BY query_start ASC;
```

### Kill running query

```sql
SELECT pg_cancel_backend(procpid);
```

### Show currently-held locks

```sql
SELECT l.relation::regclass, l.mode, l.locktype, l.pid, age(clock_timestamp(), a.query_start) as age
FROM pg_locks l, pg_stat_activity a
WHERE l.GRANTED and l.pid = a.pid;
```

### Show when autovacuum last ran

```sql
SELECT relname, last_vacuum, last_autovacuum FROM pg_stat_user_tables ORDER BY last_autovacuum;
```

### Get an estimated count of rows in a table

https://wiki.postgresql.org/wiki/Count_estimate

```sql
SELECT reltuples AS estimate FROM pg_class WHERE relname = 'table_name';
```

### (Disk usage) Show size of relations

```sql
SELECT nspname || '.' || relname AS "relation",
    pg_size_pretty(pg_relation_size(C.oid)) AS "size"
  FROM pg_class C
  LEFT JOIN pg_namespace N ON (N.oid = C.relnamespace)
  WHERE nspname NOT IN ('pg_catalog', 'information_schema')
  ORDER BY pg_relation_size(C.oid) DESC
  LIMIT 20;
```

### (Disk usage) Show size of tables

```sql
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

### (Disk usage) Show size of column on disk

Warning: expensive query on large tables.

```sql
select
    pg_size_pretty(sum(pg_column_size(column_name))) as total_size,
    pg_size_pretty(avg(pg_column_size(column_name))) as average_size,
    sum(pg_column_size(column_name)) * 100.0 / pg_total_relation_size('table_name') as percentage
from table_name;
```

### (Indexes) Show index usage

Source: https://www.cybertec-postgresql.com/en/get-rid-of-your-unused-indexes/

```sql
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

### (pg\_stat\_statements) Get query statistics

```sql
SELECT
    calls, total_time, rows,
    100.0 * shared_blks_hit / nullif(shared_blks_hit + shared_blks_read, 0) AS hit_percent,
    round((100 * total_time / sum(total_time::numeric) OVER ())::numeric, 2) AS percentage_cpu,
    query
FROM pg_stat_statements ORDER BY total_time DESC LIMIT 100;
```

## Guides

### Select latest row in each group

If we have a table containing multiple groups, and we want to get the latest row in each group, we can use the `DISTINCT ON` clause. In other databases, this would be done with a window function or joins instead.

As an example, assume we have the following table:

```
id | key | timestamp
-- | --- | ----------
1  | a   | 1000
2  | b   | 1002
3  | c   | 1003
4  | a   | 1004
5  | c   | 1005
```

We want to retrieve the row with the latest timestamp grouped by key. We can do:

```sql
SELECT DISTINCT ON (key) id, key, timestamp FROM tbl ORDER BY key, timestamp DESC;
```

Which will produce the following result:

```
id | key | timestamp
-- | --- | ----------
2  | b   | 1002
4  | a   | 1004
5  | c   | 1005
```

### Identity columns

In PostgreSQL 10, autoincrementing columns should be defined as [identity columns](https://www.2ndquadrant.com/en/blog/postgresql-10-identity-columns/) instead of using the `SERIAL` data type.

```sql
CREATE TABLE test_old (
    id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    payload text
);
```

Also consider using `GENERATED ALWAYS` instead of `GENERATED BY DEFAULT` to prevent
the value of an autogenerated key from being manually set.

### `FILTER` clause

An aggregate function can be extended with a `FILTER (WHERE filter_clause)`
expression. If `FILTER` is specified, then only the input rows for which the
filter clause evaluates to true are fed to the aggregate function; other rows
are discarded. 

For example:

```
SELECT
    count(*) as total_jobs,
    count(*) filter (where state=active) as active_jobs,
    count(*) filter (where state=inactive) as inactive_jobs
FROM jobs;
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

## Autovacuuum

Regular autovacuum processes will be automatically interrupted when the process detects
that it is blocking another operation. For instance when executing DDLs like
`ALTER TABLE` that would acquire a `SHARE UPDATE EXCLUSIVE` lock.

The exception is if the autovacuum process is being triggered by wraparound
protection. In this mode, the autovauum query will show `(to prevent
wraparound)`. This process will not be automatically interrupted, and will
block any DDL statements requiring a lock.

## Performance analysis

I've had good results with
[pg\_stat\_statements](https://www.postgresql.org/docs/current/pgstatstatements.html)
in the past. It does require restarting the database however. It can be enabled
gracefully on a slave by taking it out of rotation, applying the config change,
then putting it back into rotation. I did not observe any performance impact to
having this setting enabled.

[pgBadger](https://pgbadger.darold.net/) is another option. It does require
updating log-related configuration. Typically I have logs for slow queries
enabled, and pgBadger can be used to aggregate and analyze those.
