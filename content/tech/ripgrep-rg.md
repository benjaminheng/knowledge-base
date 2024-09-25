---
title: "ripgrep"
---

## Grep for multiple patterns

```
rg -f <pattern_file> <file>`
```

## Bulk replace strings in files

```
rg -l "<string>" | xargs -n1 sed -i '' 's|<string>|<replacement>|g'
```

## Show file, line number, and match on same line

```
rg --no-header
```
