---
title: "jq"
---

## Interactive query using jq + fzf

[Script in my dotfiles](https://github.com/benjaminheng/dotfiles/blob/master/bin/bin/jqfzf)

```
cat /tmp/1.json | jqfzf
```

## Assign to variable in a pipeline

The `as` keyword can be used to assign a value to a variable for later use in a
pipeline.

As a contrived example, assume a JSON document of the following schema:

```json
[
    {
        "sender_id": 1,
        "chat_participants": [
            {"user_id": 1},
            {"user_id": 2}
        ]
    }
]
```

The order of `chat_participants` is not fixed, meaning to say that the sender
isn't necessarily always the first element. We want to find the user IDs of all
the recipients, not the sender. We can do:

```
.[] | .sender_id as $sender_id | .chat_participants.user_id | select(. != $sender_id)
```

## Construct a JSON object by referencing a nested field

Given the following source JSON:

```json
[{
    "timestamp": 1,
    "labels": {
        "method": "xxx"
    },
    "payload": "text"
}]
```

Constructing a JSON object would normally take the form of `.[] | {payload}`, which gives us:

```json
{"payload": "text"}
```

If we wanted to select the `.labels.method` field, naturally we might expect jq
syntax to be `{labels.method}`. This does not work. Instead the syntax is `.[]
| {"method": .labels.method}`

So with this contrived example, if we wanted to select timestamp and the
method, the jq filter would be `.[] | {timestamp, "method": .labels.method}`, which gives us:

```json
{"timestamp": 1, "method": "xxx"}
```

## Search for value at an arbitrarily deep nested key

```
.. | objects | select(.id == "x")
```

1. `..` is a recursive descent ([ref](https://jqlang.github.io/jq/manual/#recursive-descent)). It produces every value.
2. `objects` filters for only objects ([ref](https://jqlang.github.io/jq/manual/#arrays-objects-iterables-booleans-numbers-normals-finites-strings-nulls-values-scalars))
