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
better done by scrolling through the sidebar. The search is more so regular
users (me) can quickly jump to certain posts.

### Hugo template to generate the search index

[source](https://github.com/benjaminheng/knowledge-base/blob/aee2b20853c479368dfa75540ccfdc2e06c5d983/layouts/partials/search-index)

Writing template code for Hugo is such a pain. This script recursively
generates a flattened list of pages.


```go-text-template
{{ $index := slice }}
{{ $index = partial "search-index-recurse" (dict "index" $index "page" .Site "parents" slice "rootPagesOnly" true) }}
{{ $index | jsonify }}
{{ return $index }}

{{ define "partials/search-index-recurse" }}
    {{ $index := .index }}
    {{ $parents := .parents }}

    {{ range .page.Sections }}
        {{ $parents := $parents | append (slice .Title) }}
        {{ $sectionIndex := slice }}
        {{ $result := (partial "search-index-recurse" (dict "index" $sectionIndex "page" . "parents" $parents)) }}
        {{ $index = $index | append $result }}
    {{ end }}

    {{ $parentsPath := (delimit $parents " > ") }}

    {{ $pages := .page.Pages }}
    {{ if .rootPagesOnly }}
        {{ $pages = (where .page.Pages "Section" "") }}
    {{ end }}

    {{ range $pages }}
        {{ if eq (len .Sections) 0 }}
            {{ $title := (.Title | plainify) }}
            {{ $entry := dict "permalink" .RelPermalink "title" $title }}
            {{ $rawText := $title }}

            {{ if not (eq $parentsPath "") }}
                {{ $entry = merge $entry (dict "parents" $parentsPath) }}
                {{ $rawText = print (delimit $parents " > ") " > " $title }}
            {{ end }}

            {{ $entry = merge $entry (dict "raw_text" $rawText ) }}
            {{ $index = $index | append $entry }}
        {{ end }}
    {{ end }}
    {{ return $index }}
{{ end }}
```

### HTML snippet for the search box

[source](https://github.com/benjaminheng/knowledge-base/blob/aee2b20853c479368dfa75540ccfdc2e06c5d983/layouts/partials/search.html)

```html
<form id="search-form" class="search-form" role="search" style="display:none;" tabindex="0">
  <div id="search-results">
  </div>
  <label for="search-input"></label>
  <input type="search" id="search-input" class="search-input" placeholder="search" autocomplete="off">
</form>
<script>
  window.searchIndex = {{ partial "search-index" . }};
</script>
<script src="{{ "/js/search.js" | relURL }}"></script>
```

### JS implementation

[source](https://github.com/benjaminheng/knowledge-base/blob/aee2b20853c479368dfa75540ccfdc2e06c5d983/static/js/search.js)

I don't use any search libraries like Lunr.js or Fuse.js, since those will be
overkill for a simple file filter. After all, I'm only searching against post
titles, not their contents.

I'm happy with how my up/down keyboard navigation turned out. I had to take
care of a few edge cases, but the end result is quite pleasing.
