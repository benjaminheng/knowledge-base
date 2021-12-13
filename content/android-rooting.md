---
title: Android Rooting
category: tech
---

## Rooting Pixel 3a

- [TWRP can't be installed on Android 10+](https://forum.xda-developers.com/pixel-3a/development/twrp-3-3-1-pixel-3a-t3943413/post82928369#post82928369) without first downgrading to Android 9

To install magisk, [patch the boot image](https://topjohnwu.github.io/Magisk/install.html#boot-image-patching) instead.

1. [Download the factory image](https://developers.google.com/android/images)
2. Extract `boot.img` from the factory image
3. Transfer `boot.img` to your device
4. In Magisk Manager, select `Install > Install > Select and patch a file`
5. Magisk Manager will patch the image, and store it in `[Internal Storage]/Download/magisk_patched.img`
6. Copy the patched image to your PC
7. Boot into fastboot by first powering off the phone, then booting it while holding Power + Volume Down.
8. Flash the patched boot image using `fastboot flash boot /path/to/magisk_patched.img`

## Installing OTAs

**Skip the normal `uninstall magisk > install ota > install magisk to inactive slot` flow**, it's inconsistent at best. Just use the sideload method.

1. Download the factory image from https://developers.google.com/android/images
2. Download the OTA image from https://developers.google.com/android/ota
3. Extract `boot.img` from the factory image
4. Transfer `boot.img` to your phone
5. In Magisk Manager, patch `boot.img` (assuming the output file is `magisk_patched.img` for the remaining steps)
6. Transfer `magisk_patched.img` back to your computer
7. Boot into recovery (e.g. `adb reboot recovery`)
8. Sideload the OTA with `adb sideload ./path/to/OTA.zip`
9. Boot into fastboot
10. Apply the patched boot image with `fastboot flash boot ./magisk_patched.img`
11. Reboot

## Common issues

**Stuck in fastboot loop:**

- `boot.img` might be malformed. Try flashing the stock boot image.
- Device might be trying to boot from the wrong A/B partition. Change the active partition with `fastboot --set-active=[a/b]`

**Magisk patched boot.img does not work**

- Magisk stable channel might not be updated yet. Use the [canary app](https://github.com/topjohnwu/magisk_files/tree/canary), select the canary channel and try again.


