---
title: "Gunicorn, supervisord, and graceful reloads"
category: tech
toc: true
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

**Step 1**: Requests go to the worker processes.

![gunicorn-sighup-handling-1.svg](/resource/diagrams/gunicorn-sighup-handling-1.svg) <!-- hash:e954a769 -->

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

**Step 2**: New workers are spawned. Requests start getting routed to the new
workers. The new workers are not yet initialized and so can't process
requests.

![gunicorn-sighup-handling-2.svg](/resource/diagrams/gunicorn-sighup-handling-2.svg) <!-- hash:3559fcbb -->

<!--
```dot render{"mode": "code-hidden", "filename": "gunicorn-sighup-handling-2.svg"}
digraph G {
    client -> "master A";
    "master A" -> "worker A.1";
    "master A" -> "worker A.2";
    "master A" -> "worker A.3";
    "master A" -> "worker A.4";
    "master A" -> "worker A.5";

    "worker A.6" [style=filled fillcolor=lightcoral];
    "worker A.7" [style=filled fillcolor=lightcoral];
    "worker A.8" [style=filled fillcolor=lightcoral];
    "worker A.9" [style=filled fillcolor=lightcoral];
    "worker A.10" [style=filled fillcolor=lightcoral];
    "master A" -> "worker A.6" [label="X - request blocked" fillcolor=red];
    "master A" -> "worker A.7" [label="X" fillcolor=red];
    "master A" -> "worker A.8" [label="X" fillcolor=red];
    "master A" -> "worker A.9" [label="X" fillcolor=red];
    "master A" -> "worker A.10" [label="X" fillcolor=red];
}
```
-->

**Step 3**: Old workers are gracefully shut down and finish processing in-flight
requests. No new requests are going to old workers. New requests are still
going to the yet uninitialized new workers.

![gunicorn-sighup-handling-3.svg](/resource/diagrams/gunicorn-sighup-handling-3.svg) <!-- hash:6bd7461d -->

<!--
```dot render{"mode": "code-hidden", "filename": "gunicorn-sighup-handling-3.svg"}
digraph G {
    client -> "master A";
    "worker A.1";
    "worker A.2";
    "worker A.3";
    "worker A.4";
    "worker A.5";

    "worker A.6" [style=filled fillcolor=lightcoral];
    "worker A.7" [style=filled fillcolor=lightcoral];
    "worker A.8" [style=filled fillcolor=lightcoral];
    "worker A.9" [style=filled fillcolor=lightcoral];
    "worker A.10" [style=filled fillcolor=lightcoral];
    "master A" -> "worker A.6" [label="X - request blocked" fillcolor=red];
    "master A" -> "worker A.7" [label="X" fillcolor=red];
    "master A" -> "worker A.8" [label="X" fillcolor=red];
    "master A" -> "worker A.9" [label="X" fillcolor=red];
    "master A" -> "worker A.10" [label="X" fillcolor=red];
}
```
-->

**Step 4**: Old workers finish shutting down. New workers are not yet
initialized.

![gunicorn-sighup-handling-4.svg](/resource/diagrams/gunicorn-sighup-handling-4.svg) <!-- hash:460394dd -->

<!--
```dot render{"mode": "code-hidden", "filename": "gunicorn-sighup-handling-4.svg"}
digraph G {
    client -> "master A";
    "worker A.6" [style=filled fillcolor=lightcoral];
    "worker A.7" [style=filled fillcolor=lightcoral];
    "worker A.8" [style=filled fillcolor=lightcoral];
    "worker A.9" [style=filled fillcolor=lightcoral];
    "worker A.10" [style=filled fillcolor=lightcoral];
    "master A" -> "worker A.6" [label="X - request blocked" fillcolor=red];
    "master A" -> "worker A.7" [label="X" fillcolor=red];
    "master A" -> "worker A.8" [label="X" fillcolor=red];
    "master A" -> "worker A.9" [label="X" fillcolor=red];
    "master A" -> "worker A.10" [label="X" fillcolor=red];
}
```
-->

**Step 5**: After about 20 seconds, the new workers are initialized. Requests are
now getting processed again.

![gunicorn-sighup-handling-5.svg](/resource/diagrams/gunicorn-sighup-handling-5.svg) <!-- hash:7609d11a -->

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

## Graceful reloading with SIGUSR2

To properly gracefully reload an application without blocking requests, we can
send the SIGUSR2 signal to gunicorn. [SIGUSR2 is designed for upgrading the
gunicorn binary](https://docs.gunicorn.org/en/stable/signals.html#upgrading-to-a-new-binary-on-the-fly),
so we are misappropriating it a little here.

SIGUSR2 will cause gunicorn to spawn a new master process while leaving the old
master process running. After a warm-up period, the new master process is up
and serving requests, and we can terminate the old master process by sending
SIGTERM to it.

To illustrate:

**Step 1**: Before receiving the signal, gunicorn has one master process.

![gunicorn-sigusr2-1.svg](/resource/diagrams/gunicorn-sigusr2-1.svg) <!-- hash:e954a769 -->

<!--
```dot render{"mode": "code-hidden", "filename": "gunicorn-sigusr2-1.svg"}
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

**Step 2**: Sending SIGUSR2 to the master process will cause it to spawn a new
one. The new master process starts to initialize its workers.

![gunicorn-sigusr2-2.svg](/resource/diagrams/gunicorn-sigusr2-2.svg) <!-- hash:3389e72c -->

<!--
```dot render{"mode": "code-hidden", "filename": "gunicorn-sigusr2-2.svg"}
digraph G {
    client -> "master A";
    "master A" -> "worker A.1";
    "master A" -> "worker A.2";
    "master A" -> "worker A.3";
    "master A" -> "worker A.4";
    "master A" -> "worker A.5";

    "worker B.1" [style=filled fillcolor=lightcoral];
    "worker B.2" [style=filled fillcolor=lightcoral];
    "worker B.3" [style=filled fillcolor=lightcoral];
    "worker B.4" [style=filled fillcolor=lightcoral];
    "worker B.5" [style=filled fillcolor=lightcoral];
    "master B" -> "worker B.1";
    "master B" -> "worker B.2";
    "master B" -> "worker B.3";
    "master B" -> "worker B.4";
    "master B" -> "worker B.5";
}
```
-->

**Step 3**: After the workers in the new master process are initialized,
requests will start getting served by both masters.

![gunicorn-sigusr2-3.svg](/resource/diagrams/gunicorn-sigusr2-3.svg) <!-- hash:c1595b4a -->

<!--
```dot render{"mode": "code-hidden", "filename": "gunicorn-sigusr2-3.svg"}
digraph G {
    client -> "master A";
    "master A" -> "worker A.1";
    "master A" -> "worker A.2";
    "master A" -> "worker A.3";
    "master A" -> "worker A.4";
    "master A" -> "worker A.5";

    client -> "master B";
    "master B" -> "worker B.1";
    "master B" -> "worker B.2";
    "master B" -> "worker B.3";
    "master B" -> "worker B.4";
    "master B" -> "worker B.5";
}
```
-->

**Step 4**: Sending SIGTERM to the old master process will cause it to
gracefully shut down its workers. The workers will finish processing the
in-flight requests. The old master process will exit once all workers have
exited. Only the new master remains.

![gunicorn-sigusr2-4.svg](/resource/diagrams/gunicorn-sigusr2-4.svg) <!-- hash:7599318c -->

<!--
```dot render{"mode": "code-hidden", "filename": "gunicorn-sigusr2-4.svg"}
digraph G {
    client -> "master B";
    "master B" -> "worker B.1";
    "master B" -> "worker B.2";
    "master B" -> "worker B.3";
    "master B" -> "worker B.4";
    "master B" -> "worker B.5";
}
```
-->

## With supervisor

Unfortunately the SIGUSR2 approach to gracefully reloading applications does
not play nice with supervisor. The new gunicorn master process isn't owned by
supervisor. When the old master process is terminated, supervisor will attempt
to restart gunicorn. This results in there being two master processes.

What we can do instead is wrap the gunicorn master processes with a script.
Supervisor will manage this wrapper script, not the gunicorn master processes.
The script will handle sending SIGUSR2/SIGTERM to reload gunicorn gracefully.
The script will present itself to supervisor with a consistent PID to insulate
supervisor from the changing PIDs of the currently-active gunicorn master process.

In the main loop of the script, we start gunicorn if it hasn't been started
yet. If the gunicorn process is externally killed or otherwise does not exist,
then we exit the script. When the script exits, supervisor will handle
restarting it.

```bash
gunicorn_args=("$@")
gunicorn_pidfile="/run/gunicorn.pid"

function start_gunicorn() {
    log "Starting gunicorn"
    gunicorn "${gunicorn_args[@]}" &
}

function gunicorn_exists() {
    [ -f "$gunicorn_pidfile" ] && ps -p "$(cat "$gunicorn_pidfile")" &> /dev/null
}

# Start gunicorn if not yet started
if ! gunicorn_exists; then
    start_gunicorn
fi

# Loop to keep the script alive
while true; do
    sleep 5
    if ! gunicorn_exists; then
        # If somehow gunicorn has stopped, exit this script.
        exit 0
    fi
done
```

When the script receives SIGTERM, we propagate the signal to the gunicorn
process and wait for it to exit, before the script itself exits.

```bash
trap shutdown SIGTERM

function log() {
    echo "[$(date --rfc-3339=seconds)] [gunicorn-wrapper] $1"
}

function shutdown() {
    if [ -f "$gunicorn_pidfile" ]; then
        pid=$(cat $gunicorn_pidfile)
        log "Shutting down. Sending SIGTERM to $pid"
        kill -s SIGTERM "$pid"
        wait_pid "$pid"
    fi
    exit
}

function wait_pid() {
    pid=$1
    tail --pid="$pid" -f /dev/null
}
```

When the script receives SIGHUP, we gracefully reload gunicorn using the
SIGUSR2+SIGTERM approach. The new gunicorn master process is given 30 seconds
to warm up. This warm up period depends on how long it takes your application
to start.

```bash
trap queue_for_reload SIGHUP

should_reload=0

function queue_for_reload() {
    eval should_reload=1
}

function reload_gunicorn() {
    if [ ! -f "$gunicorn_pidfile" ]; then
        return
    fi

    old_gunicorn_pid=$(cat $gunicorn_pidfile)

    # If existing pid doesn't exist, do nothing
    if ! ps -p "$old_gunicorn_pid" &> /dev/null; then
        return
    fi

    # Signal gunicorn to fork the master process
    log "Sending SIGUSR2 to $old_gunicorn_pid"
    kill -s SIGUSR2 "$old_gunicorn_pid"

    # Give the new master process 30s to start up
    sleep 30

    # Gracefully terminate the old master process
    log "Sending SIGTERM to $old_gunicorn_pid"
    kill -s SIGTERM "$old_gunicorn_pid"
    wait_pid "$old_gunicorn_pid"
    log "Gunicorn pid $old_gunicorn_pid shutdown complete"
    sleep 2
    log "New gunicorn pid is $(cat $gunicorn_pidfile)"
}

while true; do
    sleep 5
    if [ "$should_reload" -ne "0" ]; then
        reload_gunicorn
        should_reload=0
    fi
done
```

This is the full source of the script:

<details>
<summary>Click to view source</summary>

```bash
#!/bin/bash

trap queue_for_reload SIGHUP
trap shutdown SIGTERM

gunicorn_pidfile="/run/gunicorn.pid"
gunicorn_args=("$@")

should_reload=0

function log() {
    echo "[$(date --rfc-3339=seconds)] [gunicorn-wrapper] $1"
}

function shutdown() {
    if [ -f "$gunicorn_pidfile" ]; then
        pid=$(cat $gunicorn_pidfile)
        log "Shutting down. Sending SIGTERM to $pid"
        kill -s SIGTERM "$pid"
        wait_pid "$pid"
    fi
    exit
}

function queue_for_reload() {
    eval should_reload=1
}

function reload_gunicorn() {
    if [ ! -f "$gunicorn_pidfile" ]; then
        return
    fi

    old_gunicorn_pid=$(cat $gunicorn_pidfile)

    # If existing pid doesn't exist, do nothing
    if ! ps -p "$old_gunicorn_pid" &> /dev/null; then
        return
    fi

    # Signal gunicorn to fork the master process
    log "Sending SIGUSR2 to $old_gunicorn_pid"
    kill -s SIGUSR2 "$old_gunicorn_pid"

    # Give the new master process 30s to start up
    sleep 30

    # Gracefully terminate the old master process
    log "Sending SIGTERM to $old_gunicorn_pid"
    kill -s SIGTERM "$old_gunicorn_pid"
    wait_pid "$old_gunicorn_pid"
    log "Gunicorn pid $old_gunicorn_pid shutdown complete"
    sleep 2
    log "New gunicorn pid is $(cat $gunicorn_pidfile)"
}

function wait_pid() {
    pid=$1
    tail --pid="$pid" -f /dev/null
}

function start_gunicorn() {
    log "Starting gunicorn"
    gunicorn "${gunicorn_args[@]}" &
}

function gunicorn_exists() {
    [ -f "$gunicorn_pidfile" ] && ps -p "$(cat "$gunicorn_pidfile")" &> /dev/null
}


# Start gunicorn if not yet started
if ! gunicorn_exists; then
    start_gunicorn
fi

# Loop to keep the script alive
while true; do
    sleep 5
    if [ "$should_reload" -ne "0" ]; then
        reload_gunicorn
        should_reload=0
    elif ! gunicorn_exists; then
        # If somehow gunicorn has stopped, exit this script.
        exit 0
    fi
done
```

</details>

This wrapper script is a drop-in replacement for gunicorn in your supervisor config.

```diff
[program:app]
- command=gunicorn
+ command=gunicorn-wrapper
    --pid /run/gunicorn.pid
    --chdir=/opt/code
    wsgi:application 
stopsignal=TERM
```

You can then trigger a hot reload of your application by sending SIGHUP to the
program managed by supervisor.

```bash
kill -s SIGHUP $(supervisorctl pid app)
```

In Carousell we trigger these hot reloads using
[consul-template](https://github.com/hashicorp/consul-template) whenever there
is a configuration update. Our service will reload and pick up the
configuration changes.
