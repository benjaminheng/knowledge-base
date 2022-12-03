---
title: ffmpeg
---

## Concatenate files (MPEG-TS or other formats)

Create file containing paths to the parts you wish to combine.

```
file '/path/to/file1.ts'
file '/path/to/file2.ts'
file '/path/to/file3.ts'
```

Here's a bash loop to generate the file.

```
for f in *.ts; do echo "file '$f'" >> mylist.txt; done
```

Concatenate using the following. Replace the output file's extension depending on your desired output format.

```
ffmpeg -f concat -safe 0 -i filelist.txt -c copy output.mp4
```

## Ripping DVDs

1. Rip to .mkv files using [MakeMKV](https://www.makemkv.com/) to strip DRM.
2. Pass the output .mkv files to [Handbrake](https://handbrake.fr/) for encoding and compression.

## Change aspect ratio

On one occasion I've had a property agent send me a 9:16 portrait video
stretched to 4:3. May simply be a mistake, or perhaps maliciously done to make
the apartment seem bigger than it is. Here's a command to change a video's
aspect ratio.

```
ffmpeg -i "input.mp4" -c copy -aspect 16:9 "output.mp4"
```
