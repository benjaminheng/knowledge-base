---
title: "Rockbox"
---

The RockboxUtility GUI tool didn't manage to install the bootloader for me. Steps I took instead:

1. Mount iPod
2. Use RockboxUtility to install the Rockbox, fonts, plugin data, manual. I think this can also be done by copying the `.rockbox` directory manually to the disk.
3. Unmount iPod
5. Proceed with manual installation for the bootloader. Steps here: https://download.rockbox.org/daily/manual/rockbox-ipod6g/rockbox-buildch2.html#x4-130002.2.2
4. Run `./mks5lboot –dfuscan -l 1` to scan for DFU devices
5. Restart iPod by holding SELECT+MENU, should take about 8 seconds. Stop when the previous command shows that a DFU device is detected.
6. Create the DFU image: `./mks5lboot.x86_64 --mkdfu-inst bootloader-ipod6g.ipod bootloader.dfu`
7. Send the DFU image: `./mks5lboot.x86_64 --dfusend bootloader.dfu`

After a few seconds the command should terminate. The device should emit a single beep to indicate success. We manually build and send the DFU image because for some reason, `--bl-inst` doesn't work. Under the hood this is what the `--bl-inst` command does anyway.
