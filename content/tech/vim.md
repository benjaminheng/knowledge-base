---
title: Vim
toc: true
---
## Tab key not working in insert mode with UltiSnips, neovim

Make sure the python3 binary is properly referenced:

```
let g:python_host_prog='/usr/bin/python'
let g:python3_host_prog='/Users/benheng/.pyenv/shims/python3'
```

## ALE lint markers not appearing in Go files

Patch the following handler to detect `go vet` output:

```diff
diff --git a/autoload/ale/handlers/go.vim b/autoload/ale/handlers/go.vim
index f17cd862..cada0890 100644
--- a/autoload/ale/handlers/go.vim
+++ b/autoload/ale/handlers/go.vim
@@ -8,7 +8,8 @@
 " Description: moved to generic Golang file from govet

 function! ale#handlers#go#Handler(buffer, lines) abort
-    let l:pattern = '\v^([a-zA-Z]?:?[^:]+):(\d+):?(\d+)?:? ?(.+)$'
+    let l:pattern = '\v^%(vet:\s*)?([a-zA-Z]?:?[^:]+):(\d+):?(\d+)?:? ?(.+)$'
     let l:output = []
     let l:dir = expand('#' . a:buffer . ':p:h')
```