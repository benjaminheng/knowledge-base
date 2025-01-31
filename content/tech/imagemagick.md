---
title: ImageMagick
---

## Basic

- Describe an image: `magick identify image.jpg`
- Remove exif metadata: `exiftool -all= image.jpg`

## Image manipulation

- Geometry docs: http://www.imagemagick.org/script/command-line-processing.php#geometry
    - `width`: Width given, height automagically selected to preserve aspect ratio.
    - `xheight`: Height given, width automagically selected to preserve aspect ratio.
    - `widthxheight`: Maximum values of height and width given, aspect ratio preserved.

### Resize image

```
mogrify -strip -auto-orient -resize 1200x1200 -quality 75 *.jpg
```
