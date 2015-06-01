(function() {
    window.ontando_scriptLoader.loadContent("devTools/html/loaderConfig.html", {
        dataType : "html",
        success : function(data, textStatus, jqXHR) {
            console.log("DevTools: Loaded '" + "html/loaderConfig.html" + "': " + textStatus);
            $("body").append(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("DevTools: Failed to load '" + "html/loaderConfig.html" + "': " + textStatus);
            console.error("DevTools: Error: " + errorThrown);

        }
    });

})();