---
title: "Kobo"
---

## Why Kobo

I use a [Kobo Aura One](https://us.kobobooks.com/products/kobo-aura-one) for
reading. Previously I had a Kindle Paperwhite 2. The Paperwhite was fine, but
after moving to my Kobo I can't imagine going back to Kindles.

Here's a quick list of reasons why I love my Kobo:

1. It supports open formats like EPUB. With Kindles, you need to either buy
   ebooks from Amazon, or convert your ebooks to Amazon's [proprietary Kindle
   formats](https://en.wikipedia.org/wiki/Kindle_File_Format).
2. It has a larger screen. The Aura One model I have is 7.8". I find it _much_
   more comfortable to read with larger fonts. At the time I got it, the Kindle
   Paperwhite had a 6" screen size. The Kindle Oasis had a 7" screen with a
   square aspect ratio.
3. It has a warm-colored frontlight. Kindles didn't have this back then, though
   I've noticed they've added this to their latest models.
4. It's hackable. I use a custom firmware called [koreader](https://github.com/koreader/koreader).

The Kobo's openness and hackability is its biggest strength to me. I'm sure the
stock firmware is just fine -- I have a friend who's happy with a stock Kobo.  

What I like most are the formatting options. I have my device set to ignore all
publisher page margins and line heights. Without these settings, ebooks don't
tend to be consistently formatted. Most times the differences are subtle, but
sometimes books just have awful defaults. There are also other tweaks I
sometimes enable, like ignoring publisher font families/sizes and paragraph
spacing/indentation. The level of customizability has spoiled me; Kindles just
can't compete.

The device can display the cover of the book you're reading when the device is
off. It's such a basic feature, but Kindles didn't support this. I'm unsure if
they've added support since.

There are a bunch of other features, like integration with third-party
services, support for RSS feeds, Calibre sync over wifi, and so on. I don't
really use any of these though.

That said, I wouldn't recommend a Kobo to the average person. Kindles are more
user-friendly. I'm not a fan of Amazon's dominance of books and ebooks, but
most people don't care about that. I'm not a fan of the closed formats, but
again, people don't care about that.

Kindles make the happy path for the regular, non-technical user very
convenient, and so is still my default recommendation. For people with strong
opinions about how they want to read their books, I'd advise considering other
brands before deciding.

## Calibre "on device" column empty after restart

> Unless you are allowing Nickel to run so the books gets imported after calibre has sent them, they will not be in the database and will not show on the next connect. [...] For Kobo ereaders, the On Device comes from the database. The database records are created during the book import process after you safely disconnect.
> - https://www.mobileread.com/forums/showthread.php?t=361916

## Disable kepub conversation

```
Configure this device > Collections, covers & uploads > uncheck "Use Kobo viewer for EPUB books"
```
