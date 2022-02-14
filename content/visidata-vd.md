---
title: "VisiData (vd)"
category: tech
toc: true
---

See `man vd` for all options. This page is a reference for features I commonly use.

## Adjust column width

- `_` toggle between full and default
- `z_ <number>` set column width

## Set column datatype

- `~` str; `#` int; `%` float; `$` currency; `@` date; `z#` length

## Sorting

- `[` / `]`      -- sort ascending/descending by current column; replace any existing sort criteria
- `g[` / `g]`     -- sort ascending/descending by all key columns; replace any existing sort criteria
- `z[` / `z]`     -- sort ascending/descending by current column; add to existing sort criteria
- `gz[` / `gz]`    -- sort ascending/descending by all key columns; add to existing sort criteria

## Select rows

- `| <regex>`       -- Select rows matching regex in current column
- `g| <regex>`      -- Select rows matching regex in all columns
- `\ <regex>`       -- Unselect rows
- `gs` / `gt` / `gu`     -- Select/toggle/unselect all rows

Tip: To select rows not matching a pattern, first select all rows with `gs`
then unselect the pattern with `\ <regex>`.

## Filtering rows

1. Select rows
2. `"` to open selected rows in new sheet

## Sheet management

- `Shift+S` to view sheets.
- `d` to remove sheets

## Copying to clipboard

- `Y` / `gY`      -- yank (copy) current/all selected row(s) to system clipboard
- `zY` / `gzY`    -- yank (copy) contents of current column for current/selected row(s) to system clipboard

## Histogram

- `Shift+F` to show a histogram of values in the selected column

## Save session (cmdlog)

- Save cmdlog with `CTRL+D`
- Replay cmdlog with the CLI flags `-p <cmdlog>` or `--play <cmdlog>`

## Convert to X format

```bash
vd input.csv -b -o output.json
vd input.csv -b -o output.html
vd input.csv -b -o output.md
vd input.csv -b --save-filetype json -o - # Output json to stdout
```

Tip: Convert to JSON and use `jq` to explore.
