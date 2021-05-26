---
title: Delve - Go debugger
---
## Remote debugging (CLI)

For remote debugging, you'll likely need to set up path substitutions if the remote path is different from your local path.

```
(dlv) config substitute-path <from> <to>
(dlv) config -save
```

Connect using:

```
dlv connect <host>:<port>
```

## Remote debugging (Vim)

vim-go currently only half supports remote debugging. `:GoDebugConnect` works, but there's no path substitution so breakpoints can't be set. Most other things won't work without path substitution.

## Braindump

Brain dump in preparation of updating vim-go to support path substitution in remote delve sessions.

- vim-go creates a raw TCP connection to the dlv debugger.
- dlv accepts API requests using [JSON-RPC](https://en.wikipedia.org/wiki/JSON-RPC)
- Mailing list: https://groups.google.com/g/delve-dev
    - Ask about setting `config substitution-path` in a session and having it take effect immediately. Using the CLI interface we have to set it in the config then reload the session before it takes effect.
- vscode-go doesn't use `config substitute-path`, but translates local <-> remote paths in the plugin layer.
- Possible to use a similar approach with vscode-go, but ideally we should leverage dlv's `config substitute-path` option.