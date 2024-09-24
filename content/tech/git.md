---
title: "Git"
---

## Ignore certain files during a `git diff`

```
g diff origin/master -- ':!*.pb.go'
```

## Show commits that touched files in a specific directory

```
git log --name-status -10 path/to/dir
```

The `-10` flag shows the last 10 commits.

