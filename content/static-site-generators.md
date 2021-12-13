---
title: Static site generators
---

I use [Hugo](https://gohugo.io/) (Go) for both my website and this knowledge
base. In the past I've used [Jekyll](https://jekyllrb.com/) (Ruby) as well as
[Pelican](https://blog.getpelican.com/) (Python).

For the more technical folk, my general recommendation is to use a static site
generator written in a language that you're familiar in. In particular I think
generators written in JavaScript are the most flexible, and probably the best
option if you intend to stray off the happy path.

Hugo is simple if you stay on their happy path. However once you stray off it
and start wanting to implement more complicated layouts or functionality, you
find yourself having to write code using Go templates. I use Go on a daily
basis, I enjoy writing Go, but even I think that the Go template syntax is a
giant pain to write complex logic in. I'm somewhat familiar with the syntax so
I can get by, but it's not pleasant.

For JavaScript I quite like the look of [Eleventy](https://www.11ty.dev/).
Unlike other JS static site generators (e.g. Gatsby), Eleventy doesn't depend
on any client-side JS. It being JS also means you can easily build complex
components, since you have a proper programming language, rather than having to
wrestle with a DSL like Go text templates.

For non-technical folk... well first I'd recommend a blogging platform like
Wordpress. However if you're dead set on a static site generator, I'd recommend
[Jekyll](https://jekyllrb.com/). It being supported natively by [GitHub
Pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll)
makes deployment extremely simple, plus you get a reasonable looking domain for
free (`{username}.github.io`)..
