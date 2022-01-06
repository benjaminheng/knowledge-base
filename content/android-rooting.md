---
title: Android Rooting
category: tech
---

## Thoughts about rooting

Since 2021 November I've reverted back to an unrooted phone. This is the first
time I've gone unrooted in a decade, since I got my first phone. Unfortunately
the reality is that rooting is getting more troublesome, and I get fewer
benefits out of doing so.

When the Android ecosystem was still new, custom ROMs added a ton of new and
interesting functionality. For a while I used Paranoid Android ROMs, which
introduced a unique gesture navigations and floating bubbles. They were several
years ahead of official iOS and Android implementations of the same, and even
then, the ROM's implementation had more functionality.

ROMs with such levels of customizability seem to have waned though. Likely
because such features involved deep changes into the system, which would
frequently get broken by new updates. Frankly as I get older, I'm not too
interested being on the bleeding edge anymore. System stability is more
important to me now.

For the past few years, the only reason I still rooted my phone was to get
system-wide adblock. The least intrusive method for this is simply to update
the `/etc/hosts` file on the system.

Recently apps have been detecting root in increasingly sophisticated ways.
Google also introduced [hardware
attestation](https://www.xda-developers.com/safetynet-hardware-attestation-feature-here-to-stay/)
to further prevent users from hiding their rooted status from apps. Bypassing
these checks is no longer trivial. Furthermore, some apps -- notably banking
apps -- are now outright blocking users who are rooted.

In light of the new restrictions on rooted phones, I've decided to revert back
to an unrooted phone. I'm not ready to give up on system-wide adblock however.
I'm using the free version of [Blokada](https://blokada.org/) to do so. The
free version runs a VPN on your phone and performs DNS based host blocking,
which is similar to editing the `/etc/hosts` file. It works pretty well.

I trust Blokada a reasonable amount to use it. Though when I have more time I'd
like to fork [DNS66](https://github.com/julian-klode/dns66) or some other
open-source VPN adblocker and build it myself, so I can vet the code for
assurance that the app isn't harvesting my browsing data.

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


