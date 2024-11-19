---
title: "Linux desktop"
---

> This page contains various bits and bobs I've used when setting up my desktop.

## System reboots instead of shutting down

https://wiki.archlinux.org/title/Wake-on-LAN#Fix_by_Kernel_quirks might work.

NOTE: None of the fixes I tried worked for me. Eventually it was solved by a kernel update.

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

## Clipboard stops working after upgrading to Plasma 6

Plasma 6 defaults to Wayland. xclip and xsel will not work in Wayland. Install `wl-clipboard` instead.

## Disable autoconnect for Wireguard connections imported using NetworkManager

Wireguard connections imported from a config file can't be updated using the UI
for some reason. The connection is imported with the setting to automatically
connect set to true. To disable, the config file needs to be edited manually.

```
sudo vim /etc/NetworkManager/system-connections/<connName>.nmconnection
```

Add `autoconnect=false` to the `[connection]` section.

## KIO Error: terminal konsole not found

Error occured for me when using Obsidian's "open in default app" command. Seems like obsidian doesn't respect my default terminal application configured in the KDE settings app. To fix, specify the terminal application in `~/.config/kdeglobals`:

```
[General]
TerminalApplication=alacritty
```

## Firefox

### :hover event removed before mousedown

In about:config, set `widget.gtk.ignore-bogus-leave-notify` to `1` (default `2`). See https://bugzilla.mozilla.org/show_bug.cgi?id=1820405.
