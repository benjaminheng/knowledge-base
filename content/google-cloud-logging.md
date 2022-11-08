---
title: "Google Cloud Logging"
category: tech
---

Log explorer: https://console.cloud.google.com/logs

## CLI: Get services

```
$ gcloud --project <project> logging logs list
```

## CLI: Read logs

```
$ gcloud --project <project> logging read 'logName="<service>"' --limit 10
```

## Filter by service

```
logName="<service>"
```

## Filter by log text content

```
textPayload=~"some text"
```

## Filter by timestamp

```
timestamp >= "2022-10-28T14:30:00+08:00" AND timestamp <= "2022-10-28T15:00:00+08:00"
```

## Negative filters

To do a `NOT` query, enclose the filter with `-(<filter>)`. For example, to filter out logs containing `hystrix: timeout`:

```
-(textPayload=~"hystrix: timeout")
```
