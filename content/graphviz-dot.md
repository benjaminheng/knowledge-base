---
title: Dot (Graphviz)
category: tech
toc: true
---

## Resources

- [Docs](https://graphviz.org/documentation/)

## Directed graph

![render-34d8458eb066b9b3ac396fd5aee4c068.svg](/resource/diagrams/render-34d8458eb066b9b3ac396fd5aee4c068.svg)

```dot render
digraph G {
    A -> B;
    B -> C -> D;
    B -> E;
}
```

## Undirected graph

![render-5b9297952b1eda00ba80b40bface8431.svg](/resource/diagrams/render-5b9297952b1eda00ba80b40bface8431.svg)

```dot render
graph G {
    A -- B;
    B -- C -- D;
    B -- E;
}
```

## Edge labels

![render-e0901508d58e2c30ae2798e4cb05011c.svg](/resource/diagrams/render-e0901508d58e2c30ae2798e4cb05011c.svg)

```dot render
digraph G {
    A -> B [label="goes to"];
}
```

## Fork shorthand

The `{ }` is shorthand for describing a fork.

![render-a3dd0f719961a10734dcd251184e4ecf.svg](/resource/diagrams/render-a3dd0f719961a10734dcd251184e4ecf.svg)

```dot render
digraph G {
    # Equivalent to:
    #   A -> B
    #   A -> C
    A -> {B C}
}
```

## Shapes

Full list of shapes: https://graphviz.org/doc/info/shapes.html

![render-1cc0073efcdfe5ecaa84f74a19bea43c.svg](/resource/diagrams/render-1cc0073efcdfe5ecaa84f74a19bea43c.svg)

```dot render
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

![render-6f28f1dabbd32b299f21116bb6ec3eb5.svg](/resource/diagrams/render-6f28f1dabbd32b299f21116bb6ec3eb5.svg)

```dot render
digraph G {
    A1 [label="A"];
    A2 [label="A"];

    A1 -> B -> A2;
}
```