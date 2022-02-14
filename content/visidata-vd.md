---
title: "VisiData (vd)"
category: tech
toc: true
---

See `man vd` for all options. This page is a reference for features I commonly use.

## Column manipulation

- `_`           -- toggle between full and default width
- `z_ <number>` -- set column width
- `^`           -- rename column
- `i`           -- add column with incremental values
- `: <regex>`   -- add new columns from regex split
- `; <regex>`   -- add new columns from capture groups of regex
- `-`           -- hide current column
- `gv`          -- unhide all columns
- Change data type: `~` str; `#` int; `%` float; `$` currency; `@` date; `z#` length
- Delete a column:  `C` to go to Columns sheet, `d` to delete columns

## Sorting

- `[` / `]`      -- sort ascending/descending by current column; replace any existing sort criteria
- `g[` / `g]`     -- sort ascending/descending by all key columns; replace any existing sort criteria
- `z[` / `z]`     -- sort ascending/descending by current column; add to existing sort criteria
- `gz[` / `gz]`    -- sort ascending/descending by all key columns; add to existing sort criteria

## Select rows

- `| <regex>`       -- select rows matching regex in current column (`g` prefix for all columns)
- `\ <regex>`       -- unselect rows matching regex in current column (`g` prefix for all columns)
- `s` / `t` / `u`   -- select/toggle/unselect current row (`g` prefix for all rows)
- `,`               -- select rows matching display value of current cell in current column

Tip: To select rows not matching a pattern, first select all rows with `gs`
then unselect the pattern with `\ <regex>`.

## Filtering rows

1. Select rows
2. `"` to open selected rows in new sheet

## Sheet management

- `Shift+S` to view sheets.
- `d` to remove sheets
- `e` to rename sheet (`e` generally edits a column)

## Copying to clipboard

- `Y` / `gY`      -- yank (copy) current/all selected row(s) to system clipboard
- `zY` / `gzY`    -- yank (copy) contents of current column for current/selected row(s) to system clipboard

## Histogram

- `Shift+F` to show a histogram of values in the selected column
- `<Enter>` on a histogram bin to view rows with that value

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

Tip: Convert CSV files to JSON and use `jq` to explore.

## Explore fixed width data

Many CLI programs output fixed width data. `vd` can be used to easily explore the output of these programs

```bash
kubectl get pods | vd -f fixed -
```
