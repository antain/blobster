// ==UserScript==
// @name         mainLoader
// @namespace    ontando.io.agar
// @updateURL    https://rawgit.com/antain/blobster/master/gm/mainLoader.user.js
// @downloadURL  https://rawgit.com/antain/blobster/master/gm/mainLoader.user.js
// @version      0.2.1
// @description  Arag.IO script group loader
// @author       ontando (angal)
// @include      http://agar.io/
// @include      http://agar.io/*
// @include      http://*.agar.io/*
// @include      https://agar.io/
// @include      https://agar.io/*
// @include      https://*.agar.io/*
// @grant        GM_setClipboard
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function(w) {
    
    w.ontando_mainLoader_localhost = "localhost:8000";
    w.ontando_mainLoader_core_name = "blobster";
    w.ontando_mainLoader_load = function() {
        w.ontando.gm_handler.init(GM_setClipboard, GM_getValue, GM_setValue);
    };
    
    
    var pushScript = function(src) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = src;
        document.head.appendChild(script);
    };
    
    pushScript("https://rawgit.com/antain/blobster/master/core/coreLoader.js?_=" + new Date().getTime());
    
}) (unsafeWindow);
