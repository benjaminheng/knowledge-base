---
title: GPD Pocket 3 Linux setup
---

This document documents solutions to various issues I encountered when setting up my GPD Pocket 3. This is the Intel 7505 model. For the most part I followed the [Arch installation guide](https://wiki.archlinux.org/title/Installation_guide).

## Wireless card not detected

Plug into mains power before booting. https://wiki.archlinux.org/title/Network_configuration/Wireless#Cause_#6

## Small font size in installation media

`setfont -d` to double font size

## Screen is rotated

The Pocket 3 uses a screen with a default portrait orientation. During installation, run the following command to temporarily fix the orientation:

```
`echo 1 > /sys/class/graphics/fbcon/rotate_all`
```

Post-installation, add the following kernel parameters:

```
fbcon=rotate:1 video=DSI-1:panel_orientation=right_side_up
```

## Connect to wifi in installation media

```
# iwctl
> station list
> station wlan0 get-networks
> station wlan0 connection {ssid}
```

## SDDM login screen is rotated

Add the following to `/usr/share/sddm/scripts/Xsetup`:

```
xrandr --output DSI-1 --rotate right
```

## Bluetooth module not detected

Install `bluez` and `bluez-utils`. Enable the bluetooth service with `systemctl enable bluetooth`.

## Mount encrypted partition in recovery media

1. Unencrypt with `cryptsetup open /dev/nvme0n1p3 root`
2. Mount with `mount /dev/mapper/root /mnt`
