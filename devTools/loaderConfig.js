(function() {
    var script_file_name = "devTools_loaderConfig";
    if (document.currentScript.override <= window["ontando_core_" + script_file_name + "_override"] ) {
        console.log("Ignoring '" + script_file_name + "' from " + document.currentScript.src);
    } else {
        console.log("Loading '" + script_file_name + "' from " + document.currentScript.src);
        window["ontando_core_" + script_file_name + "_override"] = document.currentScript.override;
        window.ontando_scriptLoader.loadContent("devTools/html/loaderConfig.html", {
            dataType : "html",
            success : function(data, textStatus, jqXHR) {
                console.log("DevTools: Loaded '" + "html/loaderConfig.html" + "': " + textStatus);
                $("body").append(data);


                var configWindow = $("#ontando_devTools_loaderConfig_config");
                var configButton = $("#ontando_devTools_loaderConfig_button");


                configWindow.fadeOut(100);
                var state = false;
                configButton.click(function() {
                    state = !state;
                    if (state) {
                        configWindow.fadeIn(100);
                    } else {
                        configWindow.fadeOut(100);
                    }
                });
                $("#ontando_devTools_loaderConfig_config_close").click(function() {
                    configWindow.fadeOut(100);
                    configButton.fadeOut(100);
                });

                function addLine(value) {
                    $("#ontando_devTools_loaderConfig_config_customScripts").append(
                        '<div style="height: 30px; width: 200px; ">'
                        + '<input class="ontando_devTools_loaderConfig_config_customScripts_entry" style="width: 190px; float:right;" value="' + value + '">'
                        + '</div>'
                    )
                }
                $("#ontando_devTools_loaderConfig_config_customScripts_add").click(function() {
                    addLine("");
                });

                $("#ontando_devTools_loaderConfig_config_branch").val(window.ontando_blobster_mainLoader.branch);
                $("#ontando_devTools_loaderConfig_config_localRepo_enabled").prop('checked', window.ontando_blobster_mainLoader.loadLocals);
                $("#ontando_devTools_loaderConfig_config_localRepo_host").val(window.ontando_blobster_mainLoader.localhost);

                for (var i = 0; i < window.ontando_blobster_mainLoader.customScripts.length; i++) {
                    var src = window.ontando_blobster_mainLoader.customScripts[i];
                    addLine(src);
                }

                $("#ontando_devTools_loaderConfig_config_save").click(function() {
                    window.ontando_blobster_mainLoader.branch = $("#ontando_devTools_loaderConfig_config_branch").val();
                    window.ontando_blobster_mainLoader.loadLocals = $("#ontando_devTools_loaderConfig_config_localRepo_enabled").prop('checked');
                    window.ontando_blobster_mainLoader.localhost = $("#ontando_devTools_loaderConfig_config_localRepo_host").val();

                    window.ontando_blobster_mainLoader.customScripts = [];
                    var customs = $('#ontando_devTools_loaderConfig_config_customScripts')
                        .find('.ontando_devTools_loaderConfig_config_customScripts_entry');
                    for (var i = 0; i < customs.length; i++) {
                        window.ontando_blobster_mainLoader.customScripts.push(customs[i].value);
                    }

                    window.ontando_blobster_mainLoader.updateOptions();
                })
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("DevTools: Failed to load '" + "html/loaderConfig.html" + "': " + textStatus);
                console.error("DevTools: Error: " + errorThrown);

            }
        });
    }
})();