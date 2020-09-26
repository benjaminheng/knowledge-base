---
title: Android Rooting
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

