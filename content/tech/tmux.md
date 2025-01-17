---
title: "Tmux"
toc: true
---

## Copy tmux pane contents to a file

```
tmux capture-pane -b <buffer_name>
tmux save-buffer -b <buffer_name> /tmp/tmux.log
```

## Copy tmux pane contents to a file (with ANSI color codes)

Call `capture-pane` with the `-e` flag to capture color codes.

```
tmux capture-pane -e -b <buffer_name>
tmux save-buffer -b <buffer_name> /tmp/tmux.log
```

Use [ansi2html](https://github.com/pycontribs/ansi2html) to render the output
to HTML.

```
cat /tmp/tmux.log | ansi2html > /tmp/output.html
```

I use a little [wrapper script](https://github.com/benjaminheng/dotfiles/blob/master/bin/bin/tmuxpane2html)
to capture the terminal content shown in this blog post: [Exploring my listen history with
VisiData](https://hbenjamin.com/post/exploring-my-listen-history-with-visidata/).

## Set environment variable for all new panes

Because there are certain env vars I need to be set, but might have forgotten to do so before creating the tmux session.

```
tmux set-environment -g ENV_VAR value
```
