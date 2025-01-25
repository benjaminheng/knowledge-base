---
title: "Photo processing workflow"
---

## Directory structure

```
photos/
  staging/
  raw/
    2023/
  archive/
    2023/
```

## Culling workflow

1. Transfer photos from camera to the staging directory.
2. Open darktable. Darktable automatically applies a 1 star rating to newly imported photos.
3. Apply search filters:
    - Staging directory
    - Show photos with 1 star rating
4. Review each photo. If an photo should proceed to the next step, set its rating to 2 stars.
5. Apply search filter to show photos with 2 stars rating.
6. Review each photo again, set their rating to 3 stars if needed.
7. Apply search filter to show photos with 3 stars rating. These photos are the ones we'll keep.
8. Move all photos (RAW, JPEG) with 3 stars to the `raw/{year}` directory.
9. Select the `raw/{year}` directory.
10. Review each photo and apply color labels where appropriate:
    - Orange: Photo needs editing.
    - Blue: Copy photo to the archive as-is (usually only used for JPGs).
    - Green: Export photo as JPEG to the archive.
11. Copy or export photos, based on the labels:
    - Blue + JPEG: Copy
    - Green: Export

## Tag images

In DigiKam, tag all newly added JPEGs in the `archive/{year}/` directory. Basic tags are the country or city, followed by tags for known people appearing in the photos.

## Backup images

I Backblaze B2 for cloud backups, and [rclone](https://rclone.org/) for synchronization. I have a script to automatically backup photos (among other things).

```
rclone-backup photos
```
