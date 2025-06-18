---
title: "GitHub"
---

## Find users with admin access for a repository.

Assuming you have push permissions, use the collaborators API to find those with admin permissions.

```
gh api repos/ORG/REPO/collaborators | jq '[ .[] | select(.permissions.admin == true) | .login ]'
```
