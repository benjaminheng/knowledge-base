---
title: "Photography"
---

## General

- [Street photography tips](https://jamesmaherphotography.com/street_photography/what-is-street-photography/)
- [Shooting fireworks](https://www.reddit.com/r/AnalogCommunity/comments/w683ap/fireworks_on_120_slide_film_a_surprising_success/): Make use of something to block off the light to cut off the exposure quickly (a card or something) if using T mode, simply lift up the card when a firework is up, and cover the lens back up when the fireworks die down, repeat up to maybe 4-5 fireworks before cycling to the next shot.

## Stores

Film cameras:

- Local Leica seller: Drew & Barry, [carousell](https://www.carousell.sg/u/leicaphilia/), [instagram](https://www.instagram.com/DREWANDBARRY/)
- https://kamerastore.com
- Yahoo Auctions via Buyee

## Tech resources

- [fgallery](https://www.thregr.org/%7Ewavexx/software/fgallery/) -- Static photo gallery generator
- [nanogallery2](https://nanogallery2.nanostudio.org/) -- Lightbox JS library
- [PhotoSwipe](https://photoswipe.com/) -- Lightbox JS library

## B&W film developers

- In general: Ilford DD-X or Kodal Xtol.
- Ilford DD-X is expensive. It is also not reusable. Recommended dilution is
  1:4. Reports suggest that dilution does not have a noticeable impact. 1:7 to
  1:9 works as well, though development times have to be adjusted.
- D-76 is toxic. Xtol is not as toxic as it. Also D-76 comes in a fine powder,
  so care has to be taken when mixing. Generally Xtol is safer. If considering
  between Xtol and D-76, go with Xtol.
- [Other notes about Rodinal vs HC110 vs DD-X](https://www.reddit.com/r/Darkroom/comments/w3g14o/alternatives_to_ddx/igwsvsb/)
- [DIY caffenol](https://www.caffenol.org/recipes/) - Fun little DIY developer

## Products

- https://ninjageisha.com/ -- Handmade camera straps, pricey
- https://www.cameradactyl.com -- 3D printed stuff for cameras, including a 4x5 camera.
- https://ondupinhole.com -- Wooden pinhole cameras.

## CLI commands

Tag film photos:

```
exiftool -ISO=400 -Make=Konica -Model="Konica C35 FD" *
exiftool -delete_original *
```

## Camera repair

### Adjust Leica CL rangefinder

- Remove the small plastic plug near the hotshoe. Use this [tip from joel\_matherson](https://www.photo.net/forums/topic/34892-leica-cl-rangefinder-adjustment/)
- [Diagram of the adjustment screws](https://www.photrio.com/forum/threads/leica-minolta-cl-rangefinder-adjustment.171412/)
- Inner screw adjusts the vertical alignment, outer screw adjusts the
  horizontal. No need for a U-shaped screwdriver because the outer screw is
  raised, so you can just use a flathead screwdriver.

## B&W film development notes

Dilutions:

See https://www.digitaltruth.com/devchart.php for more details. Timings here
are extracted for personal reference.

- HP5+, 800 ISO, 1:9 dilution: 13min
- HP5+, 1600 ISO, 1:9 dilution: 16min

Ilford Rapid Fixer should be diluted 1:4.

Steps:

1. Prepare developer. 300ml for one 35mm roll, 500ml for two 35mm rolls or one 120 roll.
2. Load film into tank.
3. Add developer.
4. Agitate: Invert 4 times during first 10 seconds. Tap to get rid of bubbles.
5. Every minute, agitate again. Tap to get rid of bubbles after each agitation sequence.
6. Pour out developer for disposal (DD-X is a one-shot developer).
7. Rinse with water. Add water, agitate for 30s, pour out, repeat once more.
8. Add fixer, 600ml to be sure the rolls are covered. Agitate for the first 10 seconds and every minute thereafter.
9. Return fixer to bottle for re-use.
10. Rinse with water. Add, agitate, repeat 3 to 5 times.
11. Add wetting agent for a final rinse.
12. Hang to dry.
