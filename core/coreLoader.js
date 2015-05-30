(function(localhost, core_name) {
    
    var pushScript = function(src, override) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.override = override;
        script.src = src;
        document.head.appendChild(script);
    };
    window.ontando_scriptLoader = {};
    window.ontando_scriptLoader.github = function (name) { 
        pushScript("https://rawgit.com/antain/blobster/master/" + name + "?_=" + new Date().getTime(), 0);
    };
    window.ontando_scriptLoader.local = function (name) {
        pushScript("http://" + localhost + "/" + name + "?_=" + new Date().getTime(), 10);
    };
    window.ontando_scriptLoader.localDefault = function (name) {
        pushScript("http://" + localhost + "/" + core_name + "/" + name + "?_=" + new Date().getTime(), 10);
    };
    
    window.ontando_scriptLoader.github("core/base.js");
    window.ontando_scriptLoader.github("core/modAPI.js");
    window.ontando_scriptLoader.github("core/renderTools.js");
    window.ontando_scriptLoader.github("mods/githubLoader.js");

    window.ontando_scriptLoader.localDefault("core/base.js");
    window.ontando_scriptLoader.localDefault("core/modAPI.js");
    window.ontando_scriptLoader.localDefault("core/renderTools.js");
    window.ontando_scriptLoader.localDefault("mods/modsLoader.js");
    window.ontando_scriptLoader.local("localLoader.js");
    
}) (window.ontando_mainLoader_localhost, window.ontando_mainLoader_core_name);