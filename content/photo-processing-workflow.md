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

Move all images (RAW, JPEG) with 3 stars to the `archive/{year}/raw` directory.

Select the `archive/{year}/raw` directory.

Review each image. Apply a blue label if image should be exported.

Move and export labelled images according to the following rules:

- JPEGs with blue label will be **moved** to the `archive/{year}/` directory.
- RAWs with blue label will be **exported** as JPEG to the `archive/{year}/` directory.

## Tag images

Open DigiKam. Tag all newly added jpegs in the `archive/{year}/` directory.
