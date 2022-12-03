---
title: "Analyzing Sentry events"
---

I'll walk through a rather contrived example, but the point is to demonstrate
techniques I use to analyze Sentry events in more detail than the Sentry UI
affords.

In this example we'll assume we have an issue with our order system. This issue
has many events, and each event has some additional context data. The context
data contains two keys, `event_type` and `order_id`. Let's see what we can do to
analyze our events.

**1\. Generate an auth token with the `event:read` scope.** If using a self-hosted
Sentry instance, the URL path is `/settings/account/api/auth-tokens/`.

**2\. Download event data with the following API request.** Replace `{IssueID}` with the issue
ID you want to get events for.

```
curl "https://sentry.example.com/api/0/issues/{IssueID}/events/?limit=200" -H "authorization: Bearer $(cat /tmp/sentry-token)" > /tmp/events.json
```

**3\. Let's find all the order IDs that have errored.** The JSON is quite deeply
nested, so we first need to find the path to the field that contains the order
ID. To do so we can utilize `gron` and `grep`.

First let's get a known order ID that is failing, and use that to find the JSON path.

```
$ cat /tmp/events.json | gron | grep 5dc03a66-1bfd-47c1-8901-a3eb5140ee68
json[0].context["*foo_proto.StripePaymentWebhook"].order_id = "5dc03a66-1bfd-47c1-8901-a3eb5140ee68";
```

Now we know that the JSON path to the `order_id` field is `[].context["*foo_proto.StripePaymentWebhook"].order_id`.

**4\. To get all the order IDs from the events, we can then do:**

```
$ cat /tmp/events.json | jq -r '[].context["*foo_proto.StripePaymentWebhook"].order_id'
56bf121c-73e6-4746-bff1-526c643d0c56
a2795f9c-31a8-4b57-98c5-c809504d9aaa
7e79f46c-c53e-4807-9374-45cbda69321d
e1726835-e43d-44b5-8de2-3f0f9ee29b97
43372179-dcdd-4f07-b372-d217a2948afb
```

**5\. Next we want to look at the `event_type` field.** Let's say we want to know
what event types are failing, and how many events of each type there are.

We can do the same steps as above to extract all the `event_type` values, then
use a combination of `sort` and `uniq` to count occurrences.

```
$ cat /tmp/events.json | jq -r '[].context["*foo_proto.StripePaymentWebhook"].event_type' | sort | uniq -c
```

**6\. Let's see how we can use VisiData to perform the previous tasks
instead.** Previously we used jq, gron, and various other shell commands to
explore our data. Another tool I like to use for data exploration is
[VisiData](/visidata-vd).

First open the JSON file with VisiData:

```
vd /tmp/events.json
```

These are the operations we can perform to get the data we need.

1. `(` to expand the `context` column so we can view the column containing our order IDs.
2. `gs` to select all rows
3. Select the column containing order IDs. `gsY` to copy the values of the selected column in selected rows to the
   system clipboard. **We have now obtained the order IDs.**
4. Select the column containing event types. `Shift+F` to open a histogram
   view. **We have now obtained a breakdown of event types.**
5. In the histogram view, we can hit `<Enter>` on an event type to drill down
   into the events with that event type.

VisiData is an _excellent_ tool for data exploration. I've only just scratched
the surface for it. Also bear in mind that this is a rather contrived example.
It's worth taking a look at [VisiData's
tutorial](https://jsvine.github.io/intro-to-visidata/index.html), because this
tool is an indispensible resource for any engineer.
