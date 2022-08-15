---
title: "Vim - debugger integration"
toc: true
category: tech
---

Setting up vim for debugging was more annoyingly complicated than I expected.
I've gotten it working now. This post documents the required setup for
posterity. This post assumes neovim is being used instead of vim.

## Go (simple setup)

I can generally get by with using delve's CLI for most tasks. I find setting up
breakpoints using the CLI to be the most tedious, so I see breakpoint-setting
as the primary value that an editor-integrated debugger can provide.

[vim-delve](https://github.com/sebdah/vim-delve) provides a simple
interface for managing breakpoints, while deferring the actual debugging to
delve's CLI. I quite like this approach because it's simple. It's also
portable, in the sense that you're still just interacting with delve directly,
which is editor agnostic.

The `:DlvConnect <hostport>` command can be used for remote debugging, while
the `:DlvDebug [flags]` is used for local debugging.

## Go (complex setup)

My complex debugger setup involves:

- [nvim-dap](https://github.com/mfussenegger/nvim-dap)
- [nvim-dap-ui](https://github.com/rcarriga/nvim-dap-ui)

nvim-dap provides a language agnostic debugger interface. Adaptors for each
language are configured declaratively. It uses the Debug Adaptor Protocol.

nvim-dap-ui provides the debugger user interface you would expect from an IDE;
with panes for breakpoints, watch expressions, and variable values.

Here's the configuration I use for launching a local or remote debug session.

```lua
local dap = require('dap')
dap.adapters.go = {
  type = 'server',
  port = '${port}',
  executable = {
    command = 'dlv',
    args = {'dap', '-l', '127.0.0.1:${port}'},
  }
}
dap.adapters.goremote = {
  type = "server",
  host = "127.0.0.1",
  port = 4000,
}

dap.configurations.go = {
  {
    type = "go",
    name = "Debug package",
    request = "launch",
    program = "${fileDirname}"
  },
  {
    type = "goremote",
    request = "attach",
    mode = "remote",
    name = "Remote debugger",
    cwd = vim.fn.getcwd(),
    substitutePath = {
        {
            from = "/go/src",
            to = "/Users/ben/dev",
        },
        {
            from = "/Users/ben/dev",
            to = "/go/src/",
        },
    },
  }
}
```

Note the `substitutePath` config. This seems to be an undocumented part of
delve's DAP interface, or at least I wasn't able to find the official
documentation for it. I lifted it from someone else's github repository
instead.

`substitutePath` is generally required for remote debugging, since the remote
file path is likely different from your local file path. In this example, my
code is mounted in a docker container at `/go/src/path/to/file.go`, and locally
at `~/dev/path/to/file.go`. With this config, when the DAP client (vim) tells
the DAP server (delve) to set a breakpoint at `~/dev/file.go`, the DAP server
translates the path to `/go/src/file.go`.

In my docker container, I use either the `dlv debug` or dlv exec` command. The
former will first compile the code while the latter executes a precompiled
binary.

```bash
dlv debug /go/src/path/to/file.go --headless --accept-multiclient --log --listen 0.0.0.0:4000
dlv exec /go/bin/server --headless --accept-multiclient --log --listen 0.0.0.0:4000
```

## Keybindings

The actual commands will vary depending on which package you use. For my
keybinds, I like to prefix groups of commands with the `<leader>` key followed
by a prefix. In this case I use `<leader>d`, where the `d` indicates debugger keybinds.

- `<leader>db`: set breakpoint
- `<leader>dB`: set conditional breakpoint
- `<leader>dC`: clear all breakpoints
- `<leader>dt`: debug test
- `<leader>dT`: debug test under cursor
