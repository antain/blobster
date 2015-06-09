// ==UserScript==
// @name         devToolsLoader
// @namespace    ontando.io.agar.devTools
// @updateURL    https://rawgit.com/antain/blobster/master/gm/devToolsLoader.user.js
// @downloadURL  https://rawgit.com/antain/blobster/master/gm/devToolsLoader.user.js
// @version      0.1.2
// @description  Arag.IO script group loader
// @author       ontando (angal)
// @include      http://agar.io/
// @include      http://agar.io/*
// @include      http://*.agar.io/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function(w) {
    var pushScript = function(src) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = src;
        document.head.appendChild(script);
    };
    
    pushScript("https://rawgit.com/antain/blobster/master/devTools/devLoader.js?_=" + new Date().getTime());
    
}) (unsafeWindow);
