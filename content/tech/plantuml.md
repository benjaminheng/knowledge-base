---
title: PlantUML
toc: true
---

## Resources

- [PlantUML](https://plantuml.com/)
    - [Visualize JSON](https://plantuml.com/json)
    - [Sequence diagrams](https://plantuml.com/sequence-diagram)
    - [Component diagrams](https://plantuml.com/component-diagram)
- [Create diagrams with code using Graphviz](https://ncona.com/2020/06/create-diagrams-with-code-using-graphviz/)
- [Hitchhiker's Guide to PlantUML](https://crashedmind.github.io/PlantUMLHitchhikersGuide/)
- [PlantUML - real world examples](https://real-world-plantuml.com/)
- [Graphviz visual examples](https://renenyffenegger.ch/notes/tools/Graphviz/examples/index)

## Component diagrams

### Shapes

![render-3027250163c300488ff5d52f4f038c11.svg](/resource/diagrams/render-3027250163c300488ff5d52f4f038c11.svg)

<details><summary>Source</summary>

```plantuml render{"mode": "code-collapsed"}
@startuml
actor actor
agent agent
artifact artifact
boundary boundary
card card
circle circle
cloud cloud
collections collections
component component
control control
database database
entity entity
file file
folder folder
frame frame
interface interface
node node
package package
queue queue
rectangle rectangle
stack stack
storage storage
usecase usecase
hexagon hexagon
label label
person person
@enduml
```

</details>

Components have a shorthand: `[X]` is shorthand for `component X`.

### Tree

More information can be found at https://plantuml.com/creole (CTRL+F "tree").

![render-c87ca4fb20c3a1dab063b9314a7d09e4.svg](/resource/diagrams/render-c87ca4fb20c3a1dab063b9314a7d09e4.svg)

<details><summary>Source</summary>

```plantuml render{"mode": "code-collapsed"}
@startuml
skinparam titleFontSize 14

title
  Fieldset
  |_ **Screen**
    |_ **Group**
      |_ **Field**{label=<color:green>"Listing title"</color>, component=<color:green>"text_input"</color>}
      |_ **Field**{label=<color:green>"Category"</color>, component=<color:green>"category_picker"</color>}
      |_ **Field**{label=<color:green>"Photo"</color>, component=<color:green>"photo_picker"</color>}
    |_ **Group**{title=<color:green>"About the item"</color>}
      |_ **Field**{label=<color:green>"Condition"</color>, component=<color:green>"single_picker"</color>}
      |_ **Field**{label=<color:green>"Price"</color>, component=<color:green>"single_picker"</color>}
      |_ **Field**{label=<color:green>""</color>, component=<color:green>"numeric_input"</color>}
      |_ **Field**{label=<color:green>"Description"</color>, component=<color:green>"text_input"</color>}
      |_ **Field**{label=<color:green>"Brand"</color>, component=<color:green>"single_picker"</color>}
      |_ **Field**{label=<color:green>"Size"</color>, component=<color:green>"single_picker"</color>}
    |_ **Group**{title=<color:green>"Optional details"</color>}
      |_ **Field**{label=<color:green>"Colour"</color>, component=<color:green>"single_picker"</color>}
      |_ **Field**{label=<color:green>"Chest"</color>, component=<color:green>"numeric_input"</color>}
      |_ **Field**{label=<color:green>"Length"</color>, component=<color:green>"numeric_input"</color>}
      |_ **Field**{label=<color:green>"Multiple quantities"</color>, component=<color:green>"checkbox"</color>}
end title

@enduml
```

</details>

### Aliases

The `as` keyword defines aliases. This is useful if a component has a
long name and you plan on reusing the component in your diagram.

![render-0a524db8a86964c26d0f50bddcfb2512.svg](/resource/diagrams/render-0a524db8a86964c26d0f50bddcfb2512.svg)

```plantuml render
@startuml
[/api/1.1/user/roles/] as RolesAPI
[foo-service] -> RolesAPI
[bar-service] -> RolesAPI
@enduml
```

### Links and arrows

Links between elements are made using combinations of dotted line (`..`),
straight line (`--`), and arrows (`-->`) symbols. 

Double dashes (or dots) orient the link vertically while a single dash orients the link horizontally.

![render-8a1e6dc8e45c652570867bef06d79e6c.svg](/resource/diagrams/render-8a1e6dc8e45c652570867bef06d79e6c.svg)

```plantuml render
@startuml
[A] -> [B]
[B] .> [C]
[C] --> [D]
@enduml
```

### Arrow labels

Use `: <label>` as a suffix to add labels to arrows and relationships between objects.

![render-93ecc564228d6be2035b7f2ca31372f7.svg](/resource/diagrams/render-93ecc564228d6be2035b7f2ca31372f7.svg)

```plantuml render
@startuml
[foo-service] -> [bar-service] : DoSomething RPC
@enduml
```

### Stereotypes or object annotations

Stereotypes can be thought of as an annotation within an object. It is
specified using `<<` and `>>`.

![render-56885d78b1e2ec02d2fe3607c79f7980.svg](/resource/diagrams/render-56885d78b1e2ec02d2fe3607c79f7980.svg)

```plantuml render
@startuml
queue "events-v1" <<kafka topic>> as MessageQueue
[foo-service] -> MessageQueue : publish event
@enduml
```

### Notes

You can use the `note left of`, `note right of`, `note top of`, `note bottom
of` keywords to define notes related to a single object.

![render-43e4b612af241fdeab271b43c34e3d47.svg](/resource/diagrams/render-43e4b612af241fdeab271b43c34e3d47.svg)

```plantuml render
@startuml
note left of HTTP : Web Service only

note right of [First Component]
  A note can also
  be on several lines
end note

HTTP - [First Component]
@enduml
```

### Grouping components

You can use several keywords to group components and interfaces together: package, node, folder, frame, cloud, database.

![render-9a25cbd35ea7367486ecf3dbd42d62a7.svg](/resource/diagrams/render-9a25cbd35ea7367486ecf3dbd42d62a7.svg)

```plantuml render
@startuml
package "Foo service" {
    [First component] as foo.A
    [Second component] as foo.B
}

database "foo-db" {
    [some table] as foo.table.A
    [another table] as foo.table.B
}

foo.A --> foo.table.A
@enduml
```

### Colors

Colors can be applied using a variety of syntax. One method is
`<color:red>Text</color>`. See https://plantuml.com/color for more information.

![render-2fb55c3f9bc55ff0d94de1986a0d3339.svg](/resource/diagrams/render-2fb55c3f9bc55ff0d94de1986a0d3339.svg)

<details><summary>Source</summary>

```plantuml render{"mode": "code-collapsed"}
@startuml
colors
@enduml
```

</details>

### Comments

```plantuml
@startuml
' This is a comment

/' This is a
block comment
'/
@enduml
```

### Emphasized text

![render-61b131e5e39c9e93bfddca8cc788440c.svg](/resource/diagrams/render-61b131e5e39c9e93bfddca8cc788440c.svg)

```plantuml render
@startuml
component Foo
note left
  This is **bold**
  This is //italics//
  This is ""monospaced""
  This is --stricken-out--
  This is __underlined__
  This is ~~wave-underlined~~
end note
@enduml
```

## Sequence diagrams

Documentation: https://plantuml.com/sequence-diagram

### Basic example

- `->` renders an arrow between participants.
- `-->` renders a dotted arrow. I like to use this to denote returns.
- `++` activates a bar on the target participant.
- `--` deactivates a bar on the source participant.
- `--++` can be used to mix activations and deactivations.
- `\n` can be used for multiline messages

![render-e804b11fd7b6db8e058041dbd5a78347.svg](/resource/diagrams/render-e804b11fd7b6db8e058041dbd5a78347.svg)

```plantuml render
@startuml
actor Client as Client
participant "Foo service" as Foo
participant "Bar service" as Bar

Client -> Foo ++ : **GET /foo/:id/**
    Foo -> Foo : Do something\nwith data
    Foo -> Bar ++ : **GET /bar/:id/**
    Foo <-- Bar --
Client <-- Foo --
@enduml
```

### Participants

![render-1b538797a697f265fb68f0b75399bd38.svg](/resource/diagrams/render-1b538797a697f265fb68f0b75399bd38.svg)

```plantuml render
@startuml
participant Participant as Foo
actor       Actor       as Foo1
boundary    Boundary    as Foo2
control     Control     as Foo3
entity      Entity      as Foo4
database    Database    as Foo5
collections Collections as Foo6
queue       Queue       as Foo7
Foo -> Foo1 : To actor
Foo -> Foo2 : To boundary
Foo -> Foo3 : To control
Foo -> Foo4 : To entity
Foo -> Foo5 : To database
Foo -> Foo6 : To collections
Foo -> Foo7: To queue
@enduml
```

### Group participants

![render-4605f1fc7670c59f0647fe7c8ea35add.svg](/resource/diagrams/render-4605f1fc7670c59f0647fe7c8ea35add.svg)

```plantuml render
@startuml
actor Client as Client
box "Internal services" #LightBlue
    participant "Foo service" as Foo
    participant "Bar service" as Bar
end box

Client -> Foo ++ : **GET /foo/:id/**
    Foo -> Foo : Do something
    Foo -> Bar ++ : **GET /bar/:id/**
    Foo <-- Bar --
Client <-- Foo --
@enduml
```

### Group part of the diagram

![render-27fdff4e1572b222227d8a70a33af535.svg](/resource/diagrams/render-27fdff4e1572b222227d8a70a33af535.svg)

```plantuml render
@startuml
actor Client as Client
participant "Foo service" as Foo
participant "Bar service" as Bar

Client -> Foo ++ : **GET /foo/:id/**
Foo -> Foo : Do something
Foo -> Bar ++ : **GET /bar/:id/**
Foo <-- Bar --
Client <-- Foo --

group "async flow"
    Bar -> Bar : Do something
end group
@enduml
```

### Title, header, and footer

![render-776a81fa47cdd118a114588cf36e0ac6.svg](/resource/diagrams/render-776a81fa47cdd118a114588cf36e0ac6.svg)

```plantuml render
@startuml
title Example Title
header Page Header
footer Page %page% of %lastpage%

Alice -> Bob : message 1
Alice -> Bob : message 2
@enduml
```

### Notes

![render-86bab5cf8dae4390bfb41a89448ba0dd.svg](/resource/diagrams/render-86bab5cf8dae4390bfb41a89448ba0dd.svg)

```plantuml render
@startuml
Alice->Bob : hello
note left: this is a first note

Bob->Alice : ok
note right: this is another note

Bob->Bob : I am thinking
note left
a note
can also be defined
on several lines
end note
@enduml
```

## CLI

### Make target to render diagrams

When adding documentation to a repo, I usually have the .plantuml files as
siblings to the documentation file. I'll then add the following to my
`Makefile`. I then generate diagrams using `make diagrams`. The
`-checkmetadata` flag will only render images where the source doesn't match
the previously-generated image.

```
diagrams:
    plantuml -metadata -checkmetadata -progress -tsvg ./docs/*.plantuml
```
