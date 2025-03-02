---
title: "LibreOffice with LanguageTool"
---

> 2025 update: I've replaced LanguageTool with LLMs.

Some quick notes about getting LibreOffice configured to use a local LanguageTool server.

---

Download LibreOffice from https://www.libreoffice.org/download/download-libreoffice/.

Download LanguageTool from https://languagetool.org/download/.

Start the server using:

```bash
java -cp languagetool-server.jar org.languagetool.server.HTTPServer --port 8081 --public --config config.propertie
```

Configure LibreOffice using this post: https://languagetool.org/insights/post/product-libreoffice/

Do NOT install the LanguageTool extension.

`Shift+F7` to enable automatic checking.
