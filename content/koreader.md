---
title: "koreader"
---

## Remap both page turn buttons to forward

See: https://github.com/koreader/koreader/wiki/Keymapping

In `.adds/koreader/settings/event_map.lua`, add:

```lua
return {
    [194] = "RPgFwd",
    [193] = "RPgFwd",
}
```

## Disable hardware buttons being swapped after rotation

Here is a [user patch](https://github.com/koreader/koreader/wiki/User-patches) to prevent the hardware buttons from swapping after a rotation. Normally after a rotation, `RPgFwd` gets replaced by `RPgBack`, and vice versa. The following script resets this.

In `koreader/patches/2-disable-hw-button-rotation.lua`:

```lua
local logger = require("logger")
local Device = require("device")
local framebuffer = require("ffi/framebuffer")
-- Disable hardware button remapping of page turn buttons during rotation.
-- `rotation_map` is originally defined in `frontend/device/input.lua`.
if Device.input.rotation_map then
    Device.input.rotation_map[framebuffer.DEVICE_ROTATED_UPSIDE_DOWN].RPgFwd = "RPgFwd"
    Device.input.rotation_map[framebuffer.DEVICE_ROTATED_UPSIDE_DOWN].RPgBack = "RPgBack"
    Device.input.rotation_map[framebuffer.DEVICE_ROTATED_CLOCKWISE].RPgFwd = "RPgFwd"
    Device.input.rotation_map[framebuffer.DEVICE_ROTATED_CLOCKWISE].RPgBack = "RPgBack"
end
logger.info("Hardware button rotation disabled by user patch")
```

## Dictionaries

https://github.com/koreader/koreader/wiki/Dictionary-support

Recommended dictionaries:

- [Wiktionary](https://github.com/BoboTiG/ebook-reader-dict/releases/tag/en)
- Shorter Oxford English Dictionary (SOED). Not openly available.
