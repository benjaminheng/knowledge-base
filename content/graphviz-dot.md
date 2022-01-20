---
title: Dot (Graphviz)
category: tech
toc: true
---

## Resources

- [Docs](https://graphviz.org/documentation/)

## Directed graph

![render-8d72883a4e16ed44fa98b1d93100219d.svg](/resource/diagrams/render-8d72883a4e16ed44fa98b1d93100219d.svg)

```dot render
digraph G {
    A -> B;
    B -> C -> D;
    B -> E;
}
```

## Undirected graph

![render-82c0164539fd0da1368fb1baba659882.svg](/resource/diagrams/render-82c0164539fd0da1368fb1baba659882.svg)

```dot render
graph G {
    A -- B;
    B -- C -- D;
    B -- E;
}
```

## Edge labels

![render-0ca3a594460f7edc26db04a243993f1b.svg](/resource/diagrams/render-0ca3a594460f7edc26db04a243993f1b.svg)

```dot render
digraph G {
    A -> B [label="goes to"];
}
```

## Fork shorthand

The `{ }` is shorthand for describing a fork.

![render-482a0d19e7cdaf12f04f1b145bd90801.svg](/resource/diagrams/render-482a0d19e7cdaf12f04f1b145bd90801.svg)

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

![render-6bb5b1de0802bc9fc5ecec59ad9118fe.svg](/resource/diagrams/render-6bb5b1de0802bc9fc5ecec59ad9118fe.svg)

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

![render-471f402c2e13550fc2a7e6bcc13369b0.svg](/resource/diagrams/render-471f402c2e13550fc2a7e6bcc13369b0.svg)

```dot render
digraph G {
    A1 [label="A"];
    A2 [label="A"];

    A1 -> B -> A2;
}
```

## Left-to-right direction

![render-32455c4fc3bf7fc9a6c67d15f4cfd869.svg](/resource/diagrams/render-32455c4fc3bf7fc9a6c67d15f4cfd869.svg)

```dot render
digraph G {
    rankdir=LR;
    A -> B -> C;
}
```
