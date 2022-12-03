---
title: Javascript
---

## Load JS script on demand

This is useful for pulling in additional scripts only when needed.

Ref: https://stackoverflow.com/questions/16839698/jquery-getscript-alternative-in-native-javascript/55451823#55451823

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
