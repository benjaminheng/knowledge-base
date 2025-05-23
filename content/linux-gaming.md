---
title: "Linux gaming"
---

## General tips

- To debug crashes, add `PROTON_LOG=1 %command%` to the game's launch options. A log file will be written to `~/steam-<appid>.log`.
- If an old game fails to launch, it might be due to it being a 32-bit application, and your system might not have the required drivers. For AMD, I needed `lib32-vulkan-radeon`. See also: https://wiki.archlinux.org/title/AMDGPU
- If using a third party controller connected in xinput mode, but it's not detected by the OS, check if the `xpad` kernel module is enabled. If using `xone` (only for Xbox One controllers, not Xbox 360), it will disable `xpad`. To use `xone` while retaining Xbox 360 controller support, install `xpad-noone`.

## Games

### Trails in the Sky FC

- Proton 9.x
- Run using directx 8

### Trails in the Sky SC

Old fix for black screen in configuration tool:

- Proton 9.x
- Run dx8 configuration tool. Will have a black screen. Hit enter to start the game. It's probably triggering the "start" game button in the UI that we can't see.
- Subsequently the game can be launched by selecting "run using dx8".
- Resolution will probably be initialized to 640x480. Since we can't use the configuration tool, and the resolution can't be changed in game, we have to update the resolution in the config file.

New fix for black screen in configuration tool:

- Go to the game properties > Betas > Beta participation.
- Select the 2022-02-24 version or lower.
- Configuration tool will work in these versions. Make your config changes. Either continue playing the game on the old version, or select "None" in the version selection to go back to the latest.

Misc:

- Save games stored in `~/.steam/steam/userdata/44445982/251150/remote/SC`
- If using voice mod, add `WINEDLLOVERRIDES="dinput8.dll=n,b" %command%` to launch options. Avoids needing to use protontricks.

### Gothic 1

- Enable workshop beta: settings > betas > workshop beta
- Subscribe to following mods: GD3D11 renderer, Union, Gothic 1 Community Patch
- Launch game using the Mod Launcher. Music probably does not work.
- To fix music:
    - Install protontricks: `yay -S protontricks`
    - Install directmusic for the game's wineprefix: `protontricks 65540 directmusic`

### Shapez 2

- Blueprints are stored in `~/.config/unity3d/tobspr Games/shapez 2/blueprints/`
