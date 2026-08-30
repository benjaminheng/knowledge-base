---
title: "Scrivener"
---

## Getting Scrivener working on Linux

> Note that there are other ways of doing so. This is also not the most effective or efficient way. It's just the one that I've found to work, after trying a dozen different combinations.

1. Install Bottles
2. Create a `Custom` bottle
3. Install Scrivener
4. Remove the `texttospeech` folder in the program files. (Fixes the program hanging during startup on the splash screen)
5. Install bottle dependencies: `dotnet48`, `allfonts`. (Fixes license activation)
6. Bottle settings:
    - Components: (Fixes touchscreen support on Wayland)
        - Runner: bult-in wine 11.0
        - Enable D7VK, DXVK, VKD3D
    - Display:
        - Leave native wayland driver disabled
        - In advanced display settings, set screen scaling to 120 DPI

The component settings in particular are what I found I needed in order to get the program to render correctly on Wayland, while still enabling touch. Tried various combinations of soda, protosoda, proton-ge runners, the native wayland driver, and other display settings. All of them either crash, render incorrectly, or don't pass through touch events.
