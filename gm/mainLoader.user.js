// ==UserScript==
// @name         mainLoader
// @namespace    ontando.io.agar
// @updateURL    https://rawgit.com/antain/blobster/master/gm/mainLoader.user.js
// @downloadURL  https://rawgit.com/antain/blobster/master/gm/mainLoader.user.js
// @version      0.1.3
// @description  Arag.IO script group loader
// @author       ontando (angal)
// @include     http://agar.io/
// @include     http://agar.io/*
// @include     http://*.agar.io/*
// @include     https://agar.io/
// @include     https://agar.io/*
// @include     https://*.agar.io/*
// @grant        GM_setClipboard
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function(w) {
    var localhost = "localhost:8000";
    w.ontando_mainLoader_localhost = localhost;
    w.ontando_mainLoader_load = function() {
        w.ontando.gm_handler.init(GM_setClipboard, GM_getValue, GM_setValue);
    };
    
    var pushScript = function(src, override) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.override = override;
        script.src = src;
        document.head.appendChild(script);
    };
    
    var github = function (name) { 
        pushScript("https://rawgit.com/antain/blobster/master/" + name + "?_=" + new Date().getTime(), 0);
    };
    var local = function (name) {
        pushScript("http://" + localhost + "/" + name + "?_=" + new Date().getTime(), 1);
    };
    
    github("core/base.js");
    github("core/modAPI.js");
    github("mods/githubLoader.js");

    local("blobster/core/base.js");
    local("blobster/core/modAPI.js");
    local("blobster/mods/modsLoader.js");
    local("localLoader.js");
    
}) (unsafeWindow);
