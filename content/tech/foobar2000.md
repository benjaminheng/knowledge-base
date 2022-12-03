---
title: foobar2000
---
## Tweaks

**Fix default sorting in Columns UI's playlist view**

In `Preferences > Display > Columns UI > Filter`, change `sort incoming files by:` option:

```diff
- %path_sort%
+ %ALBUM ARTIST% - %DATE% - %ALBUM% - %DISCNUMBER% - %TRACKNUMBER% - %TITLE%
```

**Fix grouping in Columns UI's playlist view**

In `Preferences > Display > Columns UI > Playlist View > Grouping`, change sort value to:

```
$if2(%album artist%,$if2(%artist%,<no artist>))[ / %album%]
```
