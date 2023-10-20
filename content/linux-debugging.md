---
title: "Linux debugging"
---

## Shutdown reboots instead

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
