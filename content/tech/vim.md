---
title: Vim
---
Patch `go vet` ALE linter:

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