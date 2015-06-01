// ==UserScript==
// @name         mainLoader
// @namespace    ontando.io.agar
// @updateURL    https://rawgit.com/antain/blobster/master/gm/mainLoader.user.js
// @downloadURL  https://rawgit.com/antain/blobster/master/gm/mainLoader.user.js
// @version      0.2.6
// @description  Arag.IO script group loader
// @author       ontando (angal)
// @include      http://agar.io/
// @include      http://agar.io/*
// @include      http://*.agar.io/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function(w) {
    
    w.ontando_mainLoader_loadLocals = GM_getValue("mainLoader:loadLocals");
    w.ontando_mainLoader_localhost = GM_getValue("mainLoader:localhost");
    w.ontando_mainLoader_core_name = GM_getValue("mainLoader:core_name");
    
    (w.ontando_mainLoader_loadLocals === undefined) && (w.ontando_mainLoader_loadLocals = false);
    (w.ontando_mainLoader_localhost === undefined) && (w.ontando_mainLoader_localhost = "localhost:8000");
    (w.ontando_mainLoader_core_name === undefined) && (w.ontando_mainLoader_core_name = "blobster");
    
    w.ontando_mainLoader_updateOptions = function(loadLocals, localhost, core_name) {
        (loadLocals === undefined) || GM_setValue("mainLoader:loadLocals", loadLocals);
        (localhost === undefined) || GM_setValue("mainLoader:localhost", localhost);
        (core_name === undefined) || GM_setValue("mainLoader:core_name", core_name);
    }
    w.ontando_mainLoader_load = function() {
        w.ontando.gm_handler.init(
                function (key) { return GM_getValue("blobster:" + key); },
                function (key, value) { GM_setValue("blobster:" + key, value); }
        );
    };
    
    
    var pushScript = function(src) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = src;
        document.head.appendChild(script);
    };
    
    pushScript("https://rawgit.com/antain/blobster/master/core/coreLoader.js?_=" + new Date().getTime());
    
}) (unsafeWindow);
