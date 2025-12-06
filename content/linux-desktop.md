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

## Display brightness getting reset after switching monitor inputs

My fix is to disable the brightness control from KDE. Brightness can be set on
the monitor directly instead. To do so, first edit the plasma-powerdevil config
with: `systemctl --user edit plasma-powerdevil.service`

Add the following:

```
[Service]
Environment=POWERDEVIL_NO_DDCUTIL=1
```

## Firefox

### :hover event removed before mousedown

In about:config, set `widget.gtk.ignore-bogus-leave-notify` to `1` (default `2`). See https://bugzilla.mozilla.org/show_bug.cgi?id=1820405.

## Set up printers

Specifically these instructions are for setting up a Brother HL-1210W printer. The initial steps are common for all printers, and the later ones are model specific. Any packages referenced here are Arch packages, installed using pacman.

1. Install `print-manager`. This provides the KDE Plasma interface for configuring printers.
2. Install `system-config-printer`. This is needed by print manager interface.
3. Install `cups`. This provides the backend for interacting with printers.
4. `sudo systemctl enable cups`. Start cups service on boot.
5. Install HL-1210W driver (instructions from comments in [aur package](https://aur.archlinux.org/packages/brother-hl1210w):
    1. Clone `https://aur.archlinux.org/brother-hl1210w.git`
    2. Verify the URLs inside PKGBUILD. Personally I verified that the URLs given by the [official site](https://support.brother.com/g/b/downloadlist.aspx?c=sg&lang=en&prod=hl1210w_eu_as&os=127) were the same as what existed in PKGBUILD.
    3. `makepkg -si`. This will also install the drivers into `/usr/lib/cups/filter/brother_lpdwrapper_HL1210W`. Verify that that file exists.
6. Open the print manager in the system settings.
7. Add a printer. The driver should be automatically detected.

