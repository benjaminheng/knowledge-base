---
title: pprof
toc: true
---
## pprof commands

### Profile CPU

CPU profile. You can specify the duration in the seconds GET parameter. After
you get the profile file, use the go tool pprof command to investigate the
profile.

```
go tool pprof -http=:8080 http://localhost:9284/debug/pprof/profile\?seconds\=5
```

### Profile heap (memory)

A sampling of memory allocations of live objects. You can specify the gc GET
parameter to run GC before taking the heap sample.

```
go tool pprof -http=:8080 http://localhost:9284/debug/pprof/heap
```

### Profile blocks

Stack traces that led to blocking on synchronization primitives

```
go tool pprof -http=:8080 http://localhost:9284/debug/pprof/block
```

### Visualize execution trace

```
curl http://localhost:9284/debug/pprof/trace\?seconds\=10 > /tmp/pprof && go tool trace -http=:8080 /tmp/pprof
```

## Articles

- - https://medium.com/@arash.cordi/how-we-optimized-our-dns-server-using-go-tools-d753e1a5e709
