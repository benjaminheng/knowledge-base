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
