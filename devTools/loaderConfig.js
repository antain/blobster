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

                $("#ontando_devTools_loaderConfig_config").fadeOut(100);
                var state = false;
                $("#ontando_devTools_loaderConfig_button").click(function() {
                    state = !state;
                    if (state) {
                        $("#ontando_devTools_loaderConfig_config").fadeIn(100);
                    } else {
                        $("#ontando_devTools_loaderConfig_config").fadeOut(100);
                    }
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

                $("#ontando_devTools_loaderConfig_config_branch").val(window.ontando_mainLoader_branch);
                $("#ontando_devTools_loaderConfig_config_localRepo_enabled").prop('checked', window.ontando_mainLoader_loadLocals);
                $("#ontando_devTools_loaderConfig_config_localRepo_host").val(window.ontando_mainLoader_localhost);
                $("#ontando_devTools_loaderConfig_config_localRepo_home").val(window.ontando_mainLoader_core_name);

                for (var i = 0; i < window.ontando_mainLoader_customScripts.length; i++) {
                    var src = window.ontando_mainLoader_customScripts[i];
                    addLine(src);
                }

                $("#ontando_devTools_loaderConfig_config_save").click(function() {
                    window.ontando_mainLoader_branch = $("#ontando_devTools_loaderConfig_config_branch").val();
                    window.ontando_mainLoader_loadLocals = $("#ontando_devTools_loaderConfig_config_localRepo_enabled").prop('checked');
                    window.ontando_mainLoader_localhost = $("#ontando_devTools_loaderConfig_config_localRepo_host").val();
                    window.ontando_mainLoader_core_name = $("#ontando_devTools_loaderConfig_config_localRepo_home").val();

                    window.ontando_mainLoader_customScripts = [];
                    $('#ontando_devTools_loaderConfig_config_customScripts').find('.ontando_devTools_loaderConfig_config_customScripts_entry').each(function() {
                        window.ontando_mainLoader_customScripts.push($(this).val());

                    })

                    window.ontando_mainLoader_updateOptions();
                })
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("DevTools: Failed to load '" + "html/loaderConfig.html" + "': " + textStatus);
                console.error("DevTools: Error: " + errorThrown);

            }
        });
    }
})();