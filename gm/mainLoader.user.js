// ==UserScript==
// @name         mainLoader
// @namespace    ontando.io.agar
// @updateURL    https://rawgit.com/antain/blobster/master/gm/mainLoader.user.js
// @downloadURL  https://rawgit.com/antain/blobster/master/gm/mainLoader.user.js
// @version      0.2.30
// @description  Arag.io blobster modding api loader
// @author       ontando (angal)
// @include      http://agar.io/
// @include      http://agar.io/*
// @include      http://*.agar.io/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function(w) {
    var data = {};

    data.loadLocals = GM_getValue("mainLoader:loadLocals");
    data.localhost = GM_getValue("mainLoader:localhost");
    data.branch = GM_getValue("mainLoader:branch");
    data.customScripts = [];
    var customScripts = GM_getValue("mainLoader:customScripts");
    for (var i = 0; i < customScripts; i++) {
        data.customScripts.push(GM_getValue("mainLoader:customScripts:" + i));
    }

    (data.loadLocals === undefined || data.loadLocals === null) && (data.loadLocals = false);
    (data.localhost === undefined || data.localhost === null) && (data.localhost = "http://localhost:8000/blobster");
    (data.branch === undefined || data.branch === null) && (data.branch = "master");

    data.updateOptions = function () {
        GM_setValue("mainLoader:loadLocals", w.ontando_blobster_mainLoader.loadLocals);
        GM_setValue("mainLoader:localhost", w.ontando_blobster_mainLoader.localhost);
        GM_setValue("mainLoader:branch", w.ontando_blobster_mainLoader.branch);
        var j = 0;
        for (var i = 0; i < w.ontando_blobster_mainLoader.customScripts.length; i++) {
            var src = w.ontando_blobster_mainLoader.customScripts[i];
            if (!src || src === null || src === undefined || src == "") {
                continue;
            }
            GM_setValue("mainLoader:customScripts:" + (j++), src);
        }
        GM_setValue("mainLoader:customScripts", j);
    };
    data.load = function () {
        w.ontando.gm_handler.init(
            function (key) { return GM_getValue("blobster:" + key); },
            function (key, value) { GM_setValue("blobster:" + key, value); }
        );
    };

    if (!!w.chrome) {
        w.ontando_blobster_mainLoader = data;
    } else {
        console.log("We are not on Chrome. :( Assuming we are on FF");

        w.ontando_blobster_mainLoader = cloneInto(data, w, {cloneFunctions: true});
        exportFunction(data.load, w.ontando_blobster_mainLoader, {
            defineAs: "load",
            allowCallbacks: true,
            allowCrossOriginArguments: true
        });
    }
    
    var pushScript = function(src) {
        var script = w.document.createElement('script');
        script.type = "text/javascript";
        script.src = src;
        w.document.head.appendChild(script);
    };
    
    pushScript("https://rawgit.com/antain/blobster/master/core/coreLoader.js?_=" + new Date().getTime());
    
}) (unsafeWindow);
