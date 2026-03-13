---
title: "MacOS"
---

Various things needed to make MacOS bearable.

## A checklist of miscellaneous things

Stuff that is not too difficult to find in the settings, so I'll just mention them at a high level.

- Drag recents smart folder from finder into dock
- In finder, View > show path bar
- Settings > Apple Intelligence: Disable apple intelligence, siri, and other AI features
- Settings > Menu Bar: Remove Siri and other unwanted icons from the menu bar
- Settings > Spotlight:
    - Disable telemetry
    - Remove all unwanted result types
- Settings > Lock screen: Tweak timeouts
- Settings > Keyboard:
    - Max key repeat rate
    - Increase delay until repeat (set to 1 tick from max)
- Settings > Mouse:
    - Disable natural scrolling
    - Advanced > disable mouse acceleration


## Workaround for the workspace switching lag

There's a persistent bug where switching workspaces using ctrl + arrow keys will incur a 1+ second lag before input is transferred to the window in the newly selected workspace. This is such a prominent bug, and so widely reported, and yet has remained unfixed for over a decade that I have to assume that for some ungodly reason, this delay is intentional.

Here's a workaround. It's not perfect, and it relies on having a setup with exactly two workspaces. One for my terminal and another for everything else. The terminal workspace is on the left.

- Install flashspace
- Configure two workspaces:
	- Terminal: contains only the terminal
	- Everything Else: add all other apps
- In settings > keyboard > shortcuts > mission control, disable ctrl+left and ctrl+right shortcuts
- In flashspace, configure ctrl+left to switch to Terminal workspace, ctrl+right to switch to the Everything Else workspace

## Disable ctrl+enter os interception

MacOS intercepts this key bind. To remove: settings > keyboard > keyboard shortcuts > keyboard > disable "show contextual menu".

## Remove apps lingering in the dock after being closed

Settings > Desktop & Dock > disable "Show suggested and recent apps in dock".

## Restore opaque menu bar

Most other settings to configure the new liquid glass display is located in the Appearance section of the settings. This one is located in Accessibility settings, for some reason.

Settings > Accessibility > Display > enable "reduce transparency".
