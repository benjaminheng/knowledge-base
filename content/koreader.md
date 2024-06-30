---
title: "koreader"
---

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
