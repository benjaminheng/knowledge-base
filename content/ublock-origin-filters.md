---
title: uBlock Origin filters
toc: true
---

## [YouTube] Remove end cards

The end cards that YouTube shows at the end of videos will block video content
if the author doesn't specifically add an additional few seconds of buffer to
their video. Regardless of whether the author accounts for these end cards, the
experience on YouTube is much better without the end cards.

```
www.youtube.com##.ytp-ce-element-show
```

## [YouTube] Remove bullshit from search results

When searching for something, YouTube insists on interspersing the search
results with a bunch of completely unrelated videos. These are the sections
for:

1. **Previously watched** -- I've already watched these videos, why is YouTube
   showing them to me when I've clearly displayed intent to watch something
   else?
2. **People also watch** -- Why would I care what other people are watching? I
   want to watch the thing that I've just searched for.
3. **For you** -- You know what would be best for me right now? Showing me the
   search results for the query I just entered.

To remove these bullshit sections from the search results:

```
www.youtube.com##ytd-shelf-renderer:has-text(/Previously watched/)
www.youtube.com##ytd-shelf-renderer:has-text(/People also watched/)
www.youtube.com##ytd-shelf-renderer:has-text(/For you/)
www.youtube.com##ytd-horizontal-card-list-renderer:has-text(/People also search for/)
```

## [YouTube] Remove shorts from subscriptions feed

```
##ytd-grid-video-renderer.ytd-grid-renderer.style-scope:has-text(/SHORTS/)
```

## [Google] Block copycat github/stackoverflow sites from search results

https://github.com/quenhus/uBlock-Origin-dev-filter

## [Carousell] Remove spotlight search results

```
www.carousell.sg##[data-testid*="listing-card-"]:has(p:has-text(/Spotlight/))
```
