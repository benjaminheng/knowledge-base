---
title: "Linux desktop"
---

> This page contains various bits and bobs I've used when setting up my desktop.

## System reboots instead of shutting down

https://wiki.archlinux.org/title/Wake-on-LAN#Fix_by_Kernel_quirks

## Disable secondary monitor during sddm

Add the following to `/usr/share/sddm/scripts/Xsetup`:

```
xrandr --output DisplayPort-1 --off
```

To identify your monitors, use:

```
xrandr | grep -w connected
```

## journalctl

- Show logs from last boot: `-b-1`
- Show only kernel messages `-k`
