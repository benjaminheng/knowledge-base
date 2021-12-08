---
title: Javascript
---

## Load JS script on demand

```js
function loadScript(url) {
    return new Promise(function(resolve, reject) {
        let script = document.createElement("script");
        script.onerror = reject;
        script.onload = resolve;
        if (document.currentScript) {
            document.currentScript.parentNode.insertBefore(script, document.currentScript);
        }
        else {
            document.head.appendChild(script)
        }
        script.src = url;
    });
}
```
