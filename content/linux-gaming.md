---
title: "Linux gaming"
---

## Trails in the Sky FC

- Proton 9.x
- Run using directx 8

## Trails in the Sky SC

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
