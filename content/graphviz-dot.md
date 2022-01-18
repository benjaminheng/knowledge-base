---
title: Dot (Graphviz)
category: tech
toc: true
---

## Resources

- [Docs](https://graphviz.org/documentation/)

## Directed graph

```dot
digraph G {
    A -> B;
    B -> C -> D;
    B -> E;
}
```

## Undirected graph

```dot
graph G {
    A -- B;
    B -- C -- D;
    B -- E;
}
```

## Edge labels

```dot
digraph G {
    A -> B [label="goes to"];
}
```

## Fork shorthand

The `{ }` is shorthand for describing a fork.

```dot
digraph G
    # Equivalent to:
    #   A -> B
    #   A -> C
    A -> {B C}
}
```

## Shapes

Full list of shapes: https://graphviz.org/doc/info/shapes.html

```dot
digraph G {
    B [shape=cylinder];

    A -> B;
}
```

## Preventing cyclic dependencies

Consider a graph `A -> B -> A`. Normally the render engine will render a cyclic
graph with two nodes, `A` and `B`, where `A` points to `B` and `B` points back
to `A`.

What we want instead is an acyclic graph with three nodes, where two of the
nodes share the same name, `A`. To do so we can create two nodes with different
names but similar labels.

```dot
digraph G {
    A1 [label="A"];
    A2 [label="A"];

    A1 -> B -> A2;
}
```
