---
title: "VisiData (vd)"
toc: true
---

See `man vd` for all options. This page is a reference for features I commonly use.

## Column manipulation

| Shortcut      | Description                                  |
| ---           | ---                                          |
| `_`           | toggle between full and default width        |
| `z_ <number>` | set column width                             |
| `^`           | rename column                                |
| `i`           | add column with incremental values           |
| `: <regex>`   | add new columns from regex split             |
| `; <regex>`   | add new columns from capture groups of regex |
| `-`           | hide current column                          |
| `gv`          | unhide all columns                           |
| `C`           | go to Columns sheet                          |
| `(` / `)`     | expand/collapse nested column                |
| `g(` / `g)`   | expand/collapse all _visible_ columns        |

## Change column data type

| Shortcut | Description                                                 |
| ---      | ---                                                         |
| `~`      | string                                                      |
| `#`      | int                                                         |
| `%`      | float                                                       |
| `$`      | currency (this is just a dirty float with 2 decimal places) |
| `@`      | date                                                        |
| `z#`     | length                                                      |

## Search

| Shortcut   | Description                            |
| ---        | ---                                    |
| `/` / `g/` | search forward in current/all columns  |
| `?` / `g?` | search backward in current/all columns |

## Sorting

| Shortcut      | Description                                                                      |
| ---           | ---                                                                              |
| `[` / `]`     | sort ascending/descending by current column; replace any existing sort criteria  |
| `g[` / `g]`   | sort ascending/descending by all key columns; replace any existing sort criteria |
| `z[` / `z]`   | sort ascending/descending by current column; add to existing sort criteria       |
| `gz[` / `gz]` | sort ascending/descending by all key columns; add to existing sort criteria      |

## Select rows

| Shortcut              | Description                                                       |
| ---                   | ---                                                               |
| `\|` / `g\|`          | select rows matching regex in current/all columns                 |
| `\` / `g\`            | unselect rows matching regex in current/all columns               |
| `z\|` / `z\`          | select/unselect rows matching a Python expr in any visible column |
| `s` / `t` / `u`       | select/toggle/unselect current row                                |
| `gs` / `gt` / `gu`    | select/toggle/unselect all rows                                   |
| `,`                   | select all rows where the current column matches the current cell |
| `g,`                  | select all rows where any column matches the current cell         |

- To select all rows except a pattern, first select the pattern using `|
  <regex>`, then `gt` to invert the selection.

## Filtering rows

1. Select rows
2. `"` to open selected rows in new sheet

## Editing

| Shortcut             | Description                                                                        |
| ---                  | ---                                                                                |
| `e`                  | edit contents of current cell                                                      |
| `ge <text>`          | set contents of current column for selected rows to _text_                         |
| `g* <regex>/<subst>` | replace matching _regex_ in current column for selected rows with _subst_          |
| `g= <expr>`          | evaluate Python _expr_ over each selected row and set current column to the result |

Tip: Columns can be renamed in bulk in the Columns sheet `Shift+C`. `g*` is
particularly useful here.

## Sheet management

- `Shift+S` to view sheets.
- `d` to remove sheets
- `e` to rename sheet (`e` generally edits a column)

## Copying to clipboard

| Shortcut     | Description                                                                            |
| ---          | ---                                                                                    |
| `Y` / `gY`   | yank (copy) current/all selected row(s) to system clipboard                            |
| `zY` / `gzY` | yank (copy) contents of current column for current/selected row(s) to system clipboard |

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

## Filter by date

1. `z|` to filter a column by a Python expression
2. `COLNAME > datetime.date(2022, 1, 1)` as the expression.

## Join datasets

[https://www.visidata.org/docs/join/](https://www.visidata.org/docs/join/)

Open the datasets in VisiData. Two options to do so:

- `vd d1.tsv d2.tsv`
- Press o and enter a filepath for each file.

To join:

- Press `S` to open up the Sheets Sheet. Through here, you can navigate to every sheet by pressing `Enter` on the row it is referenced in.
- Navigate to the sheets you want the join, and set their shared columns as key columns with `!`.
- Press `S` to return to the Sheets sheet. Select the sheets you want to merge with `s`.
- Optional: If performing a left outer join, use `Shift+J` or `Shift+K` to reorder the sheets. The first sheet will be the one for whom all rows will be retained.
- Type `&` to open the join-chooser, and select your desired join type with `Enter`.

## Append (concatenate) datasets

- Open the datasets with VisiData.
- Press `Shift+S` to open the Sheets sheet.
- Use `s` or `t` to select the sheets to merge.
- Type `&` and press `Enter` on append to concatenate the selected datasets.
