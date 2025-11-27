---
title: "Jujutsu (jj)"
---

I'm experimenting with using jj for version control. At the moment I don't see a strong benefit over git for my typical use-cases. In some aspects it does feel more ergonomic. Rebasing and splitting commits seem to be easier done as well using jj, but there's a paradigm shift between git vs jj, and I'm yet unsure if it's worth the cognitive effort to learn jj.

I expect I'll continue to experiment with it occassionally. In an effort to persist that learning effort, I'll jot down some notes in this page as I go along.

## Bookmarks ("branches")

In jj, bookmarks are references to specific revisions (which may be a commit). It is somewhat analogous to branches in git, but not quite the same. In git, we checkout a branch, and any commit made while a branch is checked out, is added to that branch. In jj, new commits are not associated with a bookmark. To illustrate:

```bash
# git
git checkout my-branch
git commit -m "commit 1"
git push -u origin my-branch # this pushes the branch to the remote
git commit -m "commit 2"

# jj
jj new master # start a new working copy from the master branch
jj commit -m "commit 1"
jj bookmark create my-branch -r @- # @- refers to the parent of the working copy commit
jj git push --allow-new
jj commit -m "commit 2"
jj bookmark move my-branch --to @-
jj git push
```

The jj workflow seems less convenient than git. I'm not sure if there is a more efficient or intuitive way of doing this. The `jj bookmark move --help` page mentions an alias that pulls the nearest bookmark to the working-copy parent, which I've aliased to `tug`. So the above example can be simplified to:

```
jj commit -m "commit 2"
jj tug
jj git push
```

## Other notes

- I also use `jjui`, a TUI for performing jj operations.
- The @ expression refers to the working copy commit in the current workspace. For other symbols or operations on such symbols, see: https://docs.jj-vcs.dev/latest/revsets/
- The fact that every jj operation is logged and visible in `jj op log`, as well as being revertable is extremely powerful.
- The `jj log` output is noisier than I'm used to. I wonder if there's a way to only show direct ancestors of my working copy commit.
