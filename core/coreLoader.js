window.ontando = {};
window.ontando_scriptLoader = {};

(function() {

    var loadLocals = window.ontando_blobster_mainLoader.loadLocals;
    var localhost = window.ontando_blobster_mainLoader.localhost;
    var branch = window.ontando_blobster_mainLoader.branch;
    var customScripts = window.ontando_blobster_mainLoader.customScripts;
    
    function pushScript(src, override, async) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.override = override;
        script.src = src;
        script.async = async;
        document.head.appendChild(script);
    }
    function getGitHubLocation(name) {
        return "https://rawgit.com/antain/blobster/" + branch + "/" + name;
    }
    function getLocalLocation(name) {
        return localhost + "/" + name;
    }
    var github = function (name) {
        pushScript(getGitHubLocation(name) + "?_=" + new Date().getTime(), 0, false);
    };
    var local = function (name) {
        pushScript(getLocalLocation(name) + "?_=" + new Date().getTime(), 10, false);
    };

    function loadRemoteAsync(name) {
        pushScript(getGitHubLocation(name) + "?_=" + new Date().getTime(), 0, true);
    }
    
    function loadDefault(name) {
        if (loadLocals) {
            local(name);
        } else {
            github(name);
        }
    }

    function loadContent(content, options) {
        $.ajax(getGitHubLocation(content), options);
    }

    window.ontando_scriptLoader.load = loadDefault;
    window.ontando_scriptLoader.loadRemoteAsync = loadRemoteAsync;
    window.ontando_scriptLoader.loadContent = loadContent;
    
    // Loading core
    loadDefault("core/base.js");
    loadDefault("core/renderTools.js");
    loadDefault("core/enum.js");
    loadDefault("core/modAPI.js");
    
    // Loading module providers
    loadDefault("mods/modsLoader.js");

    for (var i = 0; i < customScripts.length; i++) {
        var src = customScripts[i];
        pushScript(src, 20, true);
    }
    
}) ();