---
title: "Makefiles"
category: tech
toc: true
---

## Default value for a variable

```makefile
target:
	echo "$(or $(MSG), hello world)"
```
