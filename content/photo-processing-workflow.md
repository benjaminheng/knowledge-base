---
title: "Photo processing workflow"
---

> NOTE: This document is a work in progress. It's just a braindump at the moment.

## Review and process

Directory structure:

```
photos/
  staging/
  archive/
    2023/
      raw/
```

Transfer images from camera to the staging directory.

Open darktable. Darktable automatically applies a 1 star rating to newly imported photos.

Apply search filters:

- Staging directory
- Show images with 1 star rating

Review each image. If an image should proceed to the next step, bump its rating to 2 stars.

Apply search filter to show images with 2 stars rating.

Review each image again, and bump to 3 stars if needed.

Apply search filter to show images with 3 stars rating.

Review each image. Process images if necessary. Apply a green label if image is ready to be exported.

## Archive images

Copy all 3 star raw images to the `archive/*/raw` directory.

Export all raw images marked with the green label to jpeg. Place the jpegs in `archive/*/`.

Copy all 3 star jpegs marked with the green label to `archive/*/`.

## Tag images

Open DigiKam. Tag all newly added jpegs in the `archive/*/` directory.
