---
title: Python
---

## UTF-8 decoder in Python 2 accepts surrogate pairs

[Surrogate characters](https://unicodebook.readthedocs.io/unicode_encodings.html#utf-16-surrogate-pairs)
(0xD800 to 0xDFFF) are reserved for UTF-16. However the UTF-8 decoder in Python
2 accepts these characters as valid UTF-8. To strictly validate UTF-8 in Python
2, the following snippet can be used
([source](https://unicodebook.readthedocs.io/guess_encoding.html#is-utf-8)):

```python
# arg `data` is of type `str`
def is_utf8_strict(data):
    try:
        decoded = data.decode('UTF-8')
    except UnicodeDecodeError:
        return False
    else:
        for ch in decoded:
            if 0xD800 <= ord(ch) <= 0xDFFF:
                return False
        return True
```
