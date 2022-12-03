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
- Setting `config substitution-path` doesn't take effect immediately. Need to run `config -save` then restart the CLI client. Is this intended? Possible to have it take effect immediately? Something to ask in the mailing list.
- vscode-go doesn't use `config substitute-path`, but translates local <-> remote paths in the plugin layer.
- Possible to use a similar approach with vscode-go, but ideally we should leverage dlv's `config substitute-path` option.
- Might not be possible to do use the `substitute-path` option. It's probably the CLI client that is performing the translations, not the server. If that's the case then the vim-go plugin needs to be responsible for path substitution. Check with the mailing list.
- Might also consider trying to automatically infer local and remote paths like [vscode-go#45](https://github.com/golang/vscode-go/issues/45). But for the first pass we should prioritize a simple user-defined replacement. 
