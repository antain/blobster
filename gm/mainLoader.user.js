// ==UserScript==
// @name         mainLoader
// @namespace    ontando.io.agar
// @updateURL    https://rawgit.com/antain/blobster/master/gm/mainLoader.user.js
// @downloadURL  https://rawgit.com/antain/blobster/master/gm/mainLoader.user.js
// @version      0.2.11
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
    w.ontando_mainLoader_branch = GM_getValue("mainLoader:branch");
    var customScripts = GM_getValue("mainLoader:customScripts");
    w.ontando_mainLoader_customScripts = [];
    for (var i = 0; i < customScripts; i++) {
        w.ontando_mainLoader_customScripts.push(GM_getValue("mainLoader:customScripts:" + i));
    }
    
    (w.ontando_mainLoader_loadLocals === undefined) && (w.ontando_mainLoader_loadLocals = false);
    (w.ontando_mainLoader_localhost === undefined) && (w.ontando_mainLoader_localhost = "http://localhost:8000/blobster");
    (w.ontando_mainLoader_branch === undefined) && (w.ontando_mainLoader_branch = "master");
    
    w.ontando_mainLoader_updateOptions = function() {
        GM_setValue("mainLoader:loadLocals", w.ontando_mainLoader_loadLocals);
        GM_setValue("mainLoader:localhost", w.ontando_mainLoader_localhost);
        GM_setValue("mainLoader:branch", w.ontando_mainLoader_branch);
        var j = 0;
        for (var i = 0; i < w.ontando_mainLoader_customScripts.length; i++) {
            var src = w.ontando_mainLoader_customScripts[i];
            if (!src || src === null || src === undefined || src == "") {
                continue;
            }
            GM_setValue("mainLoader:customScripts:" + (j++), src);
        }
        GM_setValue("mainLoader:customScripts", j);
    };

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
