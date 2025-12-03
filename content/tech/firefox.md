---
title: Firefox
---

## Disable "ask AI chatbot" option in right click menu

Set `browser.ml.chat.enabled` to `false`.

## Disable tab hover preview

Set `browser.tabs.hoverPreview.enabled` to `false`.

## Keep browser open when closing last tab

Set `browser.tabs.closeWindowWithLastTab` to `false`.

## Remove Firefox logo from new tab page

Set `browser.newtabpage.activity-stream.newtabLayouts.variant-b` to `false`.

## Disable URL trimming

Set `browser.urlbar.trimURLs` to `false`.

## Android: Fix PWA UI issues

With a recent update, opening an installed PWA causes the Firefox app to open
first, showing a blank homepage. Also the PWA now has a bar at the bottom, like
the normal Android Custom Tabs UI. Previously this bar was hidden, and the PWA
took up the full screen.

Revert to the previous behavior by disabling `Secret Settings > "Enable Homepage as a New Tab"`.

You may need to enable the secret settings. Go to `About > About Firefox Nightly` and tap on the logo until it unlocks.
