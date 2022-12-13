---
title: "Fly.io"
---

## Copy files

**Option 1**: Use `fly sftp shell` to open a sftp shell, then copy using sftp commands.

```
$ fly sftp shell
> get /data
```

**Option 2**: Use scp copy files. This will not work if `scp` is not available
on the remote VM.

In separate terminals:

```
$ fly proxy 10022:22
```

```
$ scp -P 10002 root@localhost:/data
```
