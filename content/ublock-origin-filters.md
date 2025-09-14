---
title: uBlock Origin filters
toc: true
---

## YouTube

YouTube has loads of bullshit to fix.

```
! remove end cards
www.youtube.com##.ytp-ce-element-show

! remove crap in search results
www.youtube.com##ytd-shelf-renderer:has-text(/Previously watched/)
www.youtube.com##ytd-shelf-renderer:has-text(/People also watched/)
www.youtube.com##ytd-shelf-renderer:has-text(/For you/)
www.youtube.com##ytd-horizontal-card-list-renderer:has-text(/People also search for/)
www.youtube.com##ytd-shelf-renderer:has-text(/Results for similar searches/)
www.youtube.com##ytd-shelf-renderer:has-text(/Channels new to you/)
www.youtube.com##ytd-shelf-renderer:has-text(/From related searches/)
www.youtube.com##ytd-shelf-renderer.ytd-item-section-renderer.style-scope:has(> .ytd-shelf-renderer.style-scope:has-text(/Explore more/))

! remove shorts
www.youtube.com##ytd-reel-shelf-renderer.ytd-item-section-renderer.style-scope:has( > .ytd-reel-shelf-renderer.style-scope:has-text(/Shorts/))
www.youtube.com##ytd-rich-item-renderer:has(ytd-thumbnail-overlay-time-status-renderer:has-text(/SHORTS/))
www.youtube.com##ytd-video-renderer.ytd-item-section-renderer.style-scope:has(#time-status:has-text(/SHORTS/))
www.youtube.com##ytd-reel-shelf-renderer.ytd-item-section-renderer.style-scope:has-text(/Shorts/)
www.youtube.com##grid-shelf-view-model:has(.ytSectionHeaderViewModelHost:has-text(/Shorts/))

! annoying banner in home feed
www.youtube.com##.ytd-rich-section-renderer:has-text(/Tell us what you like/)
www.youtube.com###star-survey

! block the live-updating likes count animation
https://www.youtube.com/youtubei/v1/updated_metadata*

! Remove AI generated video summary
www.youtube.com###expandable-metadata > .ytd-watch-flexy.style-scope:has(#expanded-title:has-text(/AI-generated video summary/))

! Compact video list. Display 4 videos per row. Reduce title font size.
youtube.com##ytd-rich-grid-row, #contents.ytd-rich-grid-row:style(display:contents !important;)
youtube.com##ytd-rich-grid-renderer, html:style(--ytd-rich-grid-items-per-row: 4 !important;)
youtube.com##ytd-rich-grid-renderer, html:style(--ytd-rich-grid-posts-per-row: 4 !important;)
youtube.com##ytd-rich-grid-media #video-title:style(font-size: 14px !important;)
```

## Carousell

```
! remove google sign in prompt
www.carousell.sg###credential_picker_container
! remove spotlight search results
www.carousell.sg##div:has(> [data-testid*="listing-card-"]:has(p:has-text(/Spotlight/)))
www.carousell.sg##div:has(> div > div > div > div > span:has-text(/Promoted content/))
||sl3-cdn.karousell.com/components/bulky-delivery-banner-t2d.png$image
www.carousell.sg##div:has(>div > p:has-text(/Expert search tips/))
www.carousell.sg###credential_picker_container
```

## Shopee

```
shopee.sg##shopee-banner-popup-stateful
shopee.sg##body:style(overflow:auto!important)
shopee.sg###modal:has(section#HomePagePopupBannerSection)
```

## Reddit

```
! remove likes count, I don't care about likes
www.reddit.com##.likes.entry > .tagline > .likes.score

! remove the sidebar
www.reddit.com##.grippy
www.reddit.com##.initialized.listing-chooser

! remove the orange banner prompting the user to use the new layout
www.reddit.com###sr-header-area > .width-clip > .redesign-beta-optin
```

## [StackExchange] Remove cookie consent banner

Normally if you use the element picker mode to remove the banner whenever you
come across it, it'll only get removed for that particular subdomain. There are
so many StackExchange subdomains that you'll probably encounter it again.
Remove the banner for all subdomains with this.

```
stackexchange.com##.js-consent-banner
```

