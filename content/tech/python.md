---
title: Python
---

## UTF-8 decoder in Python 2 accepts surrogate pairs

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
