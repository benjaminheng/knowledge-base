---
title: "darktable"
---

## Fix font rendering in Windows

By default, darktable uses a light font, which renders awfully on Windows. Fix it by applying the following CSS tweaks in Preferences > General.

```
combobox, combobox *, togglebutton, togglebutton *, notebook, notebook *, notebook tab, notebook tab *,
table, table *, row, row *, frame, frame *, filechooser, filechooser *, filechooserdialog, filechooserdialog *,
alignment, entry, entry *, textview, textview *, dialog, dialog *, colorswatch, colorswatch *, stack, stack *,
scrollbar, scrollbar *, scale, scale *, button, button *, treeview, treeview *, menu, menu *, separator,
eventbox, eventbox *, box, box *
{
  font-family: Segoe UI;
  font-size: 1em; /* avoid changing this settings or you will made the UI quite awful (too big or too small) */
}
```
