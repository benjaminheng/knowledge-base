---
title: About this knowledge base
toc: true
---

Hello, this is my knowledge base! However it might be more accurately described
as a [digital garden](https://nesslabs.com/digital-garden-set-up). This site
isn't just a collection of links or code snippets, but also where I record my
thoughts and ideas.

Unlike blog posts, each page here is evergreen -- constantly changing and being
updated. This gives me some additional freedom in what I publish. The site is
also intentionally public! I hope you, dear reader, find some of my posts
useful.

The source of my knowledge base is also publicly available at
[github.com/benjaminheng/knowledge-base](https://github.com/benjaminheng/knowledge-base).

## Design philosophy

This site has a somewhat brutalist design. I'm not interested in an overly
stylized design. Link stylings are left to the browser's default. Most my
styles are typography related. I did however make a concession to add a sidebar for
ease of navigation.

I try to minimize unnecessary network calls. This means no images, unless
they're part of a post. I also only use system fonts, to avoid having to fetch
external fonts.

I don't support dark mode. I figure people who prefer dark mode will have
opinions on what makes a good dark mode. I know I feel this way. I don't like
how many sites implement dark mode -- often they have too low contrast.
Therefore for people who prefer dark mode, use your browser's [reader
mode](https://support.mozilla.org/en-US/kb/firefox-reader-view-clutter-free-web-pages)
or addons like [Dark Reader](https://addons.mozilla.org/en-US/firefox/addon/darkreader/). You'll get
a more consistent dark mode tailored to your preference, rather than relying on
site owners to implement dark mode in usable manner.

## Note taking philosophy

Notes are stored on the filesystem as a flat list. Search is the preferred
method for navigation. However since I also publish my knowledge base on the
web, I loosely categorize notes into a single category. The categorization
makes the web browsing experience a little easier. At the time of writing I
have categories for Tech, Fitness, and Games. Notes are categorized using a
frontmatter param, rather than directories on the filesystem.

I don't use many backlinks. I know lots of people swear by them, but personally
I don't find them particularly useful. I prefer having a [single post about a
topic](/postgres/), with headings to break up the content, rather than
multiple small notes all backlinked together. Between my editor's file, text,
and tag search capabilities, I have no trouble jumping to a specific place in a
specific note.  Furthermore, knowledge bases that make liberal use of backlinks
don't end up being very browseable when published on the web. Ultimately I want
to share my knowledge, and I think it's easier for readers when the knowledge
base doesn't have each topic splintered across dozens of interlinked notes.

## Archiving links

My knowledge base has a lot of links. In order to preserve their content, I
regularly archive them into this repository:
[github.com/benjaminheng/link-archive](https://github.com/benjaminheng/link-archive).
The script I use can be found at:
[github.com/benjaminheng/archiver](https://github.com/benjaminheng/archiver).

What this script does is:

1. Walk through markdown files in the knowledge base
2. Extract URLs
3. Run the URLs through a [readability preprocessor](https://github.com/mozilla/readability)
4. Output into a HTML file

This happens on a best-effort basis, since not all URLs can be parsed by the
readability library. Only text content is archived, while images remain as
external links within the archive. A known limitation is that images and videos
may become dead links in the future. I'm fine with this, since most content I
link to are textual.

## CLI tooling

My development environment is tmux + vim, so naturally I spend most of my time
in a terminal. It comes as no surprise then that I normally view pages in my
knowledge base from vim. 

As for the entry point into a page, I wrote a program called
[kb](https://github.com/benjaminheng/kb). `kb` opens a
[fzf](https://github.com/junegunn/fzf) window containing the posts in my
knowledge base. Using fuzzy search, I can very quickly jump to a specific post.

I've written about [CLI
tools](https://hbenjamin.com/post/build-cli-tools-for-common-tasks/) on my
blog, and `kb` is one example of the sort of tools I write for making my life
easier.

## Rendering diagrams

My knowledge base may contain diagrams and graphs, most notably in my reference
pages for [PlantUML](plantuml) and [Graphviz](graphviz-dot). I wrote a tool
called [md-code-renderer](https://github.com/benjaminheng/md-code-renderer)
that renders `dot` and `plantuml` code blocks into images, then inlines the
image next to the code block. This allows me to easily add and modify diagrams
in pages.

## Deployment

The knowledge base is built using [Hugo](https://gohugo.io/). It's version
controlled using Git and hosted on GitHub. I deploy it on
[Vercel](https://vercel.com/). Vercel also handles automatic deployment
whenever I push to master.

## Search

The search feature is undocumented, since it's mostly for myself. It can be
accessed either with `CTRL+K` or `,f`. I added `,f` since that's my vim
shortcut for `:Files` (by [fzf.vim](https://github.com/junegunn/fzf.vim)). In
fact the search feature is modelled after how it behaves in vim. I usually
access my knowledge base in vim, but on occassions where I do so in a browser,
I'm able to quickly jump to a post in much the same way.

The search currently consists of a simple substring match, though I'd like to
implement a rudimentary fuzzy search algorithm in the future.

The search is not documented because it's not meant for discovery. Discovery is
better done by scrolling through the sidebar. The search is more so users like
me, who already know which post they want to view, can quickly jump to it.

- [Generating the search index](https://github.com/benjaminheng/knowledge-base/blob/368b77174b9b9dc18d2f9623f25803b5e98b92eb/layouts/partials/search-index)
- [Search JS](https://github.com/benjaminheng/knowledge-base/blob/368b77174b9b9dc18d2f9623f25803b5e98b92eb/static/js/search.js)
