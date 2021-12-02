---
title: PC builds
---

## Periodic stuttering

I faced this when using an AMD B450 Tomahawk Max motherboard. Every 15 seconds
or so my system would freeze for about 500ms, during which even the cursor
would be unresponsive. The freezing wouldn't occur if I were playing a game,
only when the system was relatively idle, like when web browsing. This seemed
to indicate some sort of power optimization during idle loads. Indeed, the
solution for me was to disable [AMD's
Cool'n'Quiet](https://en.wikipedia.org/wiki/Cool%27n%27Quiet) feature in the
BIOS. This feature scales CPU frequencies dynamically based on load.

During my research I found others with what they described as stuttering
issues. Here are some of the solutions suggested:

- [Disable AMD Cool'n'Quiet](https://old.reddit.com/r/Amd/comments/cej558/new_users_caution_with_amd_cool_n_quiet/) - This one worked for me
- [Disable fTPM](https://linustechtips.com/topic/1353904-amd-ftpm-causing-random-stuttering/).
- [Use Windows SATA device drivers instead of AMD ones](https://linustechtips.com/topic/1177546-windows-10-micro-stutters-with-ryzen/)
- Update BIOS
