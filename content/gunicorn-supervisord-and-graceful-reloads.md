---
title: "Gunicorn, supervisord, and graceful reloads"
---

// TODO: this page is a WIP.

## Background

// TODO

## How gunicorn handles SIGHUP

When we send SIGHUP to gunicorn, new requests will be blocked until the new
worker processes are ready to serve requests. How long requests are blocked is
determined by how long it takes your application to start up.

In [gunicorn’s signal handling
documentation](https://docs.gunicorn.org/en/19.x/signals.html) this is how
SIGHUP is described:

> HUP: Reload the configuration, start the new worker processes with a new
> configuration and gracefully shutdown older workers. If the application is
> not preloaded (using the --preload option), Gunicorn will also load the new
> version of it.

When "configuration" is mentioned, gunicorn is refering to its own
configuration, not your application. Gunicorn also has a different definition
of a graceful shutdown – when gunicorn mentions graceful shutdown, it means
that in-flight requests will complete. Graceful does not mean that there will
be no application downtime.

To illustrate, this is what happens when gunicorn receives SIGHUP:

**Step 1: Requests go to the worker processes.**

![gunicorn-sighup-handling-1.svg](/resource/diagrams/gunicorn-sighup-handling-1.svg)

<!--
```dot render{"mode": "code-hidden", "filename": "gunicorn-sighup-handling-1.svg"}
digraph G {
    client -> "master A";
    "master A" -> "worker A.1";
    "master A" -> "worker A.2";
    "master A" -> "worker A.3";
    "master A" -> "worker A.4";
    "master A" -> "worker A.5";
}
```
-->

**Step 2: New workers are spawned. Requests start getting routed to the new
workers. The new workers are not yet initialized and so can't process
requests.**

![gunicorn-sighup-handling-2.svg](/resource/diagrams/gunicorn-sighup-handling-2.svg)

<!--
```dot render{"mode": "code-hidden", "filename": "gunicorn-sighup-handling-2.svg"}
digraph G {
    client -> "master A";
    "master A" -> "worker A.1";
    "master A" -> "worker A.2";
    "master A" -> "worker A.3";
    "master A" -> "worker A.4";
    "master A" -> "worker A.5";

    "worker A.6" [style=filled fillcolor=red];
    "worker A.7" [style=filled fillcolor=red];
    "worker A.8" [style=filled fillcolor=red];
    "worker A.9" [style=filled fillcolor=red];
    "worker A.10" [style=filled fillcolor=red];
    "master A" -> "worker A.6";
    "master A" -> "worker A.7";
    "master A" -> "worker A.8";
    "master A" -> "worker A.9";
    "master A" -> "worker A.10";
}
```
-->

**Step 3: Old workers are gracefully shut down and finish processing in-flight
requests. No new requests are going to old workers. New requests are still
going to the yet uninitialized new workers.**

![gunicorn-sighup-handling-3.svg](/resource/diagrams/gunicorn-sighup-handling-3.svg)

<!--
```dot render{"mode": "code-hidden", "filename": "gunicorn-sighup-handling-3.svg"}
digraph G {
    client -> "master A";
    "worker A.1";
    "worker A.2";
    "worker A.3";
    "worker A.4";
    "worker A.5";

    "worker A.6" [style=filled fillcolor=red];
    "worker A.7" [style=filled fillcolor=red];
    "worker A.8" [style=filled fillcolor=red];
    "worker A.9" [style=filled fillcolor=red];
    "worker A.10" [style=filled fillcolor=red];
    "master A" -> "worker A.6";
    "master A" -> "worker A.7";
    "master A" -> "worker A.8";
    "master A" -> "worker A.9";
    "master A" -> "worker A.10";
}
```
-->

**Step 4: Old workers finish shutting down. New workers are not yet
initialized.**

![gunicorn-sighup-handling-4.svg](/resource/diagrams/gunicorn-sighup-handling-4.svg)

<!--
```dot render{"mode": "code-hidden", "filename": "gunicorn-sighup-handling-4.svg"}
digraph G {
    client -> "master A";
    "worker A.6" [style=filled fillcolor=red];
    "worker A.7" [style=filled fillcolor=red];
    "worker A.8" [style=filled fillcolor=red];
    "worker A.9" [style=filled fillcolor=red];
    "worker A.10" [style=filled fillcolor=red];
    "master A" -> "worker A.6";
    "master A" -> "worker A.7";
    "master A" -> "worker A.8";
    "master A" -> "worker A.9";
    "master A" -> "worker A.10";
}
```
-->

**Step 5: After about 20 seconds, the new workers are initialized. Requests are
now getting processed again.**

![gunicorn-sighup-handling-5.svg](/resource/diagrams/gunicorn-sighup-handling-5.svg)

<!--
```dot render{"mode": "code-hidden", "filename": "gunicorn-sighup-handling-5.svg"}
digraph G {
    client -> "master A";
    "master A" -> "worker A.6";
    "master A" -> "worker A.7";
    "master A" -> "worker A.8";
    "master A" -> "worker A.9";
    "master A" -> "worker A.10";
}
```
-->

## Solution

// TODO
