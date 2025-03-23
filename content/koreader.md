---
title: "koreader"
---

## Personal setup

List of things for me to configure. Useful in case I need to reapply my settings on a new device:

- Home:
    - Set home directory
    - Set item display mode: list with metadata, no images
    - Set sort order
- Frontlight to 10%, warmth to 2
- Screen:
    - Wallpaper to cover image
    - Cover stretch to 16%
    - Disable all wallpaper overlays
    - Rotation: lock auto rotation to current orientation
- Taps and gestures: Disable auto-show bottom menu
- Status bar:
    - Settings > show all at once
    - Settings > Item style: compact
    - Progress bar: disabled
    - Enabled items: current page, progress percentage
- Book settings:
    - Style tweaks:
        - Typography rules > hyphenation, soft hyphens only, set as default
        - Ignore publisher page margins, set as default
        - Ignore publisher line heights, set as default
    - L/R/T/B margins, set to 3
    - Line spacing, set to 105%, set as default
    - Font size, set to 22

## Remap both page turn buttons to forward

Here is a [user patch](https://github.com/koreader/koreader/wiki/User-patches) to rebind the back button to page forward.

In `koreader/patches/2-rebind-back-btn-to-forward.lua`:

```lua
local logger = require("logger")
local Device = require("device")
local framebuffer = require("ffi/framebuffer")

-- Rebind the 'page back' button to 'page forward' instead, regardless of
-- device rotation. `rotation_map` is originally defined in
-- `frontend/device/input.lua`.
if Device.input.rotation_map then
    Device.input.rotation_map[framebuffer.DEVICE_ROTATED_UPRIGHT].RPgFwd = "RPgFwd"
    Device.input.rotation_map[framebuffer.DEVICE_ROTATED_UPRIGHT].RPgBack = "RPgFwd"

    Device.input.rotation_map[framebuffer.DEVICE_ROTATED_CLOCKWISE].RPgFwd = "RPgFwd"
    Device.input.rotation_map[framebuffer.DEVICE_ROTATED_CLOCKWISE].RPgBack = "RPgFwd"

    Device.input.rotation_map[framebuffer.DEVICE_ROTATED_UPSIDE_DOWN].RPgFwd = "RPgFwd"
    Device.input.rotation_map[framebuffer.DEVICE_ROTATED_UPSIDE_DOWN].RPgBack = "RPgFwd"

    Device.input.rotation_map[framebuffer.DEVICE_ROTATED_COUNTER_CLOCKWISE].RPgFwd = "RPgFwd"
    Device.input.rotation_map[framebuffer.DEVICE_ROTATED_COUNTER_CLOCKWISE].RPgBack = "RPgFwd"
end
logger.info("Back button rebound to Forward by user patch")
```

## Dictionaries

https://github.com/koreader/koreader/wiki/Dictionary-support

Recommended dictionaries:

- [Wiktionary](https://github.com/BoboTiG/ebook-reader-dict/releases/tag/en)
- Shorter Oxford English Dictionary (SOED). Not openly available.

## Remove Adobe DRM from .acsm file

- AUR: https://aur.archlinux.org/packages/gourou
- Homepage: https://forge.soutade.fr/soutade/libgourou/

```
acsmdownloader <acsm-file>
adept_remove <downloaded-epub>
```
