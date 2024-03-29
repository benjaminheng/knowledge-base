---
title: Python
toc: true
---

## [Python 2] UTF-8 decoder in Python 2 accepts surrogate pairs

[Surrogate characters](https://unicodebook.readthedocs.io/unicode_encodings.html#utf-16-surrogate-pairs)
(`0xD800` to `0xDFFF`) are reserved for UTF-16. [Python 2 does not comply with
the unicode spec and accepts surrogate characters as valid
UTF-8](https://bugs.python.org/issue26260). Python 3 does not accept surrogate
characters by default, unless specified. To strictly validate UTF-8 in Python
2, the following snippet can be used ([source](https://unicodebook.readthedocs.io/guess_encoding.html#is-utf-8)):

```python
# For Python 2 only.
#
# Args:
# - `data` -> type `unicode`
def is_utf8_strict(data):
    for ch in data:
        if 0xD800 <= ord(ch) <= 0xDFFF:
            return False
    return True
```

## [Python 2] Unicode representation depends on whether Python was compiled with UCS-2 or UCS-4

The Universal Coded Character Set (UCS) determines the largest supported code
point for a unicode character. UCS-2 and UCS-4 supports 16-bit and 32-bit code
points respectively.

In Python 2, unicode representation of code points larger than 2 bytes depends
on whether Python was compiled with UCS-2 or UCS-4 support. The UCS version can
be checked using
[`sys.maxunicode`](https://docs.python.org/3.1/library/sys.html#sys.maxunicode).

> `sys.maxunicode`
> An integer giving the largest supported code point for a Unicode character.
> The value of this depends on the configuration option that specifies whether
> Unicode characters are stored as UCS-2 or UCS-4.

For example the "🇺🇸" flag emoji comprises the unicode code points `🇺` (`U+1f1fa`) and `🇸` (`U+1f1f8`). Here's how Python represents this flag emoji.

In Python 2 compiled with UCS-2:

```python
>>> import sys
>>> sys.maxunicode
65535
>>> message = u'\U0001f1fa\U0001f1f8'
>>> len(message)
4
>>> [hex(ord(i)) for i in message]
['0xd83c', '0xddfa', '0xd83c', '0xddf8']
```

If Python 2 compiled with UCS-4:

```python
>>> import sys
>>> sys.maxunicode
1114111
>>> message = u'\U0001f1fa\U0001f1f8'
>>> len(message)
2
>>> [hex(ord(i)) for i in message]
['0x1f1fa', '0x1f1f8']
```

Notice that when compiled with UCS-4, Python can represent each code point as 3
bytes. With UCS-2, the 3-byte code points are instead decomposed into surrogate
pairs. These surrogate pairs are only valid in UTF-16 and do not comply with
the UTF-8 spec.

## [Django] View raw SQL queries being run

`DEBUG` must first set to `True`. Queries will only be shown for the current
process. This is useful when debugging in the python shell.

```python
>>> from django.db import connection
>>> connection.queries

>>> from django.db import connections
>>> connections['my_db_alias'].queries

>>> from django.db import reset_queries
>>> reset_queries()
```

## Install openai-whisper with a AMD 7800 XT

```
$ python -m venv ~/dev/python-virtualenvs/whisper
$ source ~/dev/python-virtualenvs/whisper/bin/activate
$ pip3 install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/rocm5.6/
$ pip3 install openai-whisper
$ HSA_OVERRIDE_GFX_VERSION=11.0.0 whisper <args>
```

`HSA_OVERRIDE_GFX_VERSION=11.0.0` forces pytorch to treat the card as a 7900XTX.
