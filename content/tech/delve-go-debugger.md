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