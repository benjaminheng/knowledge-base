---
title: "Google Cloud Logging"
category: tech
---

Web UI: https://console.cloud.google.com/logs

## CLI: Get log names

```
$ gcloud --project <project> logging logs list
```

## CLI: Read logs

```
$ gcloud --project <project> logging read 'logName="<name>"' --limit 10
```

## Filter by log name

```
logName="<name>"
```

## Filter by log text content

```
textPayload:"some text"
```

## Filter by timestamp

Timestamps use the RFC3339 format.

```
timestamp >= "2022-10-28T14:30:00+08:00" AND timestamp <= "2022-10-28T15:00:00+08:00"
```

## Comparators

```
=           -- equal
!=          -- not equal
> < >= <=   -- numeric ordering
:           -- "has" matches any substring in the log entry field
=~          -- regular expression search for a pattern
!~          -- regular expression search not for a pattern
```
