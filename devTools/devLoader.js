window.ontando = {};

(function() {
    
    $(document).ready(function() {
        var loadDefault = window.ontando_scriptLoader.loadDefault;
        var loadLocal = window.ontando_scriptLoader.loadLocal;
        
        // Loading tools
        loadDefault("devTools/loaderConfig.js");
        
        // Loading module providers
        loadLocal("localLoader.js");
    
    });
    
    
}) ();