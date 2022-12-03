---
title: Git aliases
---

Several Git aliases I use. This list may not be exhaustive. See my dotfiles for more.

## FZF enhanced

Common git commands I use, enhanced with FZF for selection. I suffix the
commands with `f` to denote the FZF-enhanced version. I use `git checkoutf` and
`git fixup` very often.

```
[alias]
    branchf = !git branch --sort=-committerdate | fzf
    checkoutf = !git checkout $(git branchf)
    mergef = !git merge $(git branchf)
    fixup = !git commit --fixup $(git log --oneline --color=always | fzf --ansi | awk '{print $1}')
```

## Fix merge conflicts

Open a vim instance with the merge conflicts as buffers.

```
[alias]
    fix-conflicts = !git diff --name-only | uniq | xargs nvim
```

## Browse git history

Browse the git history. Being able to interactively search a repository's
history is really useful. Selecting an entry runs `git show` on the commit,
which displays the commit's diff.

This alias depends on an external script from my dotfiles:
[git-fzflog](https://github.com/benjaminheng/dotfiles/blob/78d951eaefec2de6a2c0a74342a598a2a263f262/bin/bin/git-fzflog).

```
[alias]
    logf = !git-fzflog
```
