---
title: "Bash"
category: tech
toc: true
---

## Tools

- [ts](https://linux.die.net/man/1/ts) -- Prepend timestamp to bash stdin.
  Useful for logging.
- [ts](https://manpages.ubuntu.com/manpages/xenial/man1/tsp.1.html)
  (non-stdlib) -- A task spooler. Queue commands or scripts to be executed
  sequentially.

## Snippets

### Hex string to binary

```
echo 'abcdef12' | xxd -r -p
```
