---
title: "Redis"
category: tech
toc: true
---

## Find keys given a pattern

The [SCAN](https://redis.io/commands/scan/) command can be safely used in
production. This may be a little slow (few hundred per second), but may be
sufficient depending on how many keys you're expecting to find.

`redis-cli` has command line flags to automatically iterate through the SCAN
results. The `-i` flag can be passed to throttle the SCAN commands, reducing
CPU usage on the server.

```
redis-cli -i 0.01 --scan --pattern 'user:*'
```

An alternative is to use
[redis-rdb-tools](https://github.com/sripathikrishnan/redis-rdb-tools), if you
have access to the RDB dump.

```
rdb --command justkeys --key "user:.*"
```

With redis-rdb-tools, you can create custom filters, for instance to find all
non-expiring keys.
