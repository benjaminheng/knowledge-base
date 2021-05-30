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