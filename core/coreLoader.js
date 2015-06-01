window.ontando = {};

(function() {
    var loadLocals = window.ontando_mainLoader_loadLocals;
    var localhost = window.ontando_mainLoader_localhost;
    var core_name = window.ontando_mainLoader_core_name;
    var brunch = window.ontando_mainLoader_brunch;
    
    function pushScript(src, override) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.override = override;
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    }
    function getGitHubLocation(name) {
        return "https://rawgit.com/antain/blobster/" + brunch + "/" + name;
    }
    function getLocalLocation(name) {
        return "http://" + localhost + "/" + core_name + "/" + name;
    }
    function getLocalCustomLocation(name) {
        return "http://" + localhost + "/" + "/" + name;
    }
    window.ontando_scriptLoader = {};
    window.ontando_scriptLoader.github = function (name) { 
        pushScript(getGitHubLocation(name) + "?_=" + new Date().getTime(), 0);
    };
    window.ontando_scriptLoader.localDefault = function (name) {
        pushScript(getLocalLocation(name) + "?_=" + new Date().getTime(), 10);
    };
    window.ontando_scriptLoader.local = function (name) {
        pushScript(getLocalCustomLocation(name) + "?_=" + new Date().getTime(), 20);
    };
    
    
    function loadDefault(name) {
        window.ontando_scriptLoader.github(name);
        if (loadLocals) {
            window.ontando_scriptLoader.localDefault(name);
        }
    }
    window.ontando_scriptLoader.loadDefault = loadDefault;
    window.ontando_scriptLoader.loadLocal = window.ontando_scriptLoader.local;
    window.ontando_scriptLoader.loadContent = function(content, options) {
        if (loadLocals) {
            function T() {
                this.error = function(jqXHR, textStatus, errorThrown) {
                    console.error("CoreLoader: Failed to load content locally '" + content + "': " + textStatus);
                    console.error("CoreLoader: Error: " + errorThrown);
                    console.error("CoreLoader: Trying to load from GitHub");
                    delete this.error;
                    $.ajax(getGitHubLocation(content), this);
                }
            }
            T.prototype = options;
            options = new T();
            $.ajax(getLocalLocation(content), options);
        } else {
            $.ajax(getGitHubLocation(content), options);
        }
    };
    
    // Loading core
    loadDefault("core/base.js");
    loadDefault("core/renderTools.js");
    loadDefault("core/enum.js");
    loadDefault("core/modAPI.js");
    
    // Loading module providers
    window.ontando_scriptLoader.github("mods/githubLoader.js");
    if (window.ontando_mainLoader_loadLocals) {
        window.ontando_scriptLoader.localDefault("mods/modsLoader.js");
        window.ontando_scriptLoader.local("localLoader.js");
    }
    
}) ();