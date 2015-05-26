// ==UserScript==
// @name         mainLoader
// @namespace    ontando.io.agar
// @version      0.1
// @description  Arag.IO script group loader
// @author       ontando (angal)
// @match        agar.io
// @grant        GM_setClipboard
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function(w, $) {
    //var script = document.createElement('script');
    //script.src = "https://raw.githubusercontent.com/antain/AgarIOMods/master/agario_base.js";
    //document.head.appendChild(script);
    
    $("head").append("<script type='text/javascript' src='https://rawgit.com/antain/AgarIOMods/master/core/base.js?_=" + new Date().getTime() + "'></script>");
    $("head").append("<script type='text/javascript' src='https://rawgit.com/antain/AgarIOMods/master/core/mod_api.js?_=" + new Date().getTime() + "'></script>");
    var localhost = "localhost:8000";
    $("head").append("<script type='text/javascript' src='http://" + localhost + "/core/base.js?_=" + new Date().getTime() + "'></script>");
    $("head").append("<script type='text/javascript' src='http://" + localhost + "/core/mod_api.js?_=" + new Date().getTime() + "'></script>");
    w.ontando_mainLoader_load = function(){
        w.ontando.gm_handler.init(GM_setClipboard, GM_getValue, GM_setValue);
    };
}) (unsafeWindow, jQuery);
