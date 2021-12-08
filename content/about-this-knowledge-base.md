---
title: About this knowledge base
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
ease of navigation.  typography.

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

## Link archive

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

## Search

// TODO

