---
title: "Tmux"
category: tech
toc: true
---

## Copy tmux pane contents to a file

```
tmux capture-pane -b <buffer_name>
tmux save-buffer -b <buffer_name> /tmp/tmux.log
```

## Copy tmux pane contents to file (with ANSI color codes)

Call `capture-pane` with the `-e` flag to capture color codes.

```
tmux capture-pane -e -b <buffer_name>
tmux save-buffer -b <buffer_name> /tmp/tmux.log
```

Use [ansi2html](https://github.com/pycontribs/ansi2html) to render the output
to HTML.

```
$ cat /tmp/tmux.log | ansi2html > /tmp/output.html
```
