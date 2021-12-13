---
title: Vim
toc: true
category: tech
---

## My vim config

My vim config and other dotfiles can be found here:
https://github.com/benjaminheng/dotfiles/tree/master/nvim/.config/nvim

## `:cdo` and `:cfdo`

[`:cdo`](https://vimhelp.org/quickfix.txt.html#%3Acdo) executes a command on
each entry in the quickfix list, whereas `:cfdo` executes a command for each
file in the quickfix list.

This can be useful for refactoring if you have a way to quickly populate
entries in the quickfix list. Since I use
[fzf.vim](https://github.com/junegunn/fzf.vim), I normally do so with `:Ag`.

As an example, let's say we have the following lines in a number of different files:

```go
// foo.go
func DoThingX() {}

// bar.go
func bar() {
    DoThingX()
}

// baz.go
func baz() {
    DoThingX()
}
```

Using `:Ag DoThingX` and selecting the results we put the following into our
quickfix list:

```vim
bar.go|4 col 2| DoThingX()
baz.go|4 col 2| DoThingX()
foo.go|9 col 6| func DoThingX() {}
```

If we wanted to rename `DoThingX` to `DoThingY` across these files, we can do
so using `:cdo s/DoThingX/DoThingY/ | update`.

Other resources: [Vim's new :cdo
command](https://chrisarcand.com/vims-new-cdo-command/).

## `\zs` and `\ze`

[`\zs`](https://vimhelp.org/pattern.txt.html#%2F%5Czs) and `\ze` are regex
patterns that allow matching a substring of a total regex match. `\zs`
indicates the start of the match, and `\ze` the end.

This is useful when matching against a long string, but you only want to
replace a substring of it. For instance given the following piece of code:

```
func DoThingX() error {}

func foo() {
    err := DoThingX()
}
```

We change `DoThingX` to return two values `(v string, err error)`, and we want
to update the callsites with the new function signature. `err := DoThingX()`
needs to be changed to `_, err := DoThingX()`.

Without `\zs` and `\ze` we might do something like `:s/err := DoThingX/_, err
:= DoThingX/`.

With `\zs` and `\ze` we can instead match a substring within the full regex
match, and replace only the substring. We can do `:s/\zs\zeerr := DoThingX/_, /g`.

Breaking it down, we're still matching against `err := DoThingX`, but the
`\zs\ze` at the beginning indicates where our replacement will be applied. In
this case, our replacement is inserted at the beginning of the match.

## Execute a macro in buffers using `:bufdo` or `:argdo`

`:bufdo` executes a macro in all open buffers. `:argdo` executes a macro in all
files in the arglist (`:args`).

```
:bufdo execute "normal! @a" | update
:argdo execute "normal! @a" | update
```

## Common errors

### Tab key not working in insert mode with UltiSnips, neovim

Make sure the python3 binary is properly referenced:

```
let g:python_host_prog='/usr/bin/python'
let g:python3_host_prog='/Users/benheng/.pyenv/shims/python3'
```

### ALE lint markers not appearing in Go files

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
