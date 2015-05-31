window.ontando = {};

(function(localhost, core_name) {
    
    function pushScript(src, override, async) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.override = override;
        script.src = src;
        script.async = async;
        document.head.appendChild(script);
    };
    window.ontando_scriptLoader = {};
    window.ontando_scriptLoader.github = function (name) { 
        pushScript("https://rawgit.com/antain/blobster/master/" + name + "?_=" + new Date().getTime(), 0, true);
    };
    window.ontando_scriptLoader.localDefault = function (name) {
        pushScript("http://" + localhost + "/" + core_name + "/" + name + "?_=" + new Date().getTime(), 10, true);
    };
    window.ontando_scriptLoader.local = function (name) {
        pushScript("http://" + localhost + "/" + name + "?_=" + new Date().getTime(), 20, true);
    };
    
    function githubSync(name) { 
        pushScript("https://rawgit.com/antain/blobster/master/" + name + "?_=" + new Date().getTime(), 0, false);
    };
    function localDefaultSync(name) {
        pushScript("http://" + localhost + "/" + core_name + "/" + name + "?_=" + new Date().getTime(), 10, false);
    };
    
    function loadDefault(name, async) {
        if (async === true) {
            window.ontando_scriptLoader.github(name);
            if (ontando_mainLoader_loadLocals) {
                window.ontando_scriptLoader.localDefault(name);
            }
            
        } else {
            githubSync(name);
            if (ontando_mainLoader_loadLocals) {
                localDefaultSync(name);
            }
        }
    }
    
    // Loading core
    loadDefault("core/base.js");
    loadDefault("core/renderTools.js");
    loadDefault("core/enum.js");
    loadDefault("core/modAPI.js");
    
    // Loading module providers
    window.ontando_scriptLoader.github("mods/githubLoader.js");
    if (ontando_mainLoader_loadLocals) {
        window.ontando_scriptLoader.localDefault("mods/modsLoader.js");
        window.ontando_scriptLoader.local("localLoader.js");
    }
    
}) (window.ontando_mainLoader_localhost, window.ontando_mainLoader_core_name);