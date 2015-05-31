(function() {
    var script_file_name = "enum";
    if (document.currentScript.override < window["ontando_core_" + script_file_name + "_override"] ) {
        console.log("Ignoring '" + script_file_name + "' from " + document.currentScript.src);
    } else {
        console.log("Loading '" + script_file_name + "' from " + document.currentScript.src);
        window["ontando_core_" + script_file_name + "_override"] = document.currentScript.override;
        
        if (window.ontando.ENUM == undefined) {
            window.ontando.ENUM = {};
        }
        var ENUM = window.ontando.ENUM;
        
        ENUM.ConfigType = {
            STRING : 0,
            INTEGER : 1,
            BOOLEAN : 2,
            KEY : 3,
            COLOR : 4,
            size : 5,
            data : [{}, {}, {}, {}, {}]
        };

        ENUM.Options = {
            SKINS : 0,
            NAMES : 1,
            THEME : 2,
            COLORS : 3,
            MASS : 4,
            GAME_MODE : 5,
            size : 6,
            data : [
                {
                    values : {
                    DISABLED : 0, 
                    ENABLED : 1
                    }
                },
                {
                    values : {
                    DISABLED : 0,
                    ENABLED : 1
                    }
                },
                {
                    values : {
                    LIGHT : 0, 
                    DARK : 1
                    }
                },
                { 
                    values : {
                    DISABLED : 0,
                    ENABLED : 1
                    }
                },
                { 
                    values : {
                    DISABLED : 0,
                    ENABLED : 1
                    }
                },
                { 
                    values : {
                    FFA : 0,
                    TEAMS : 1
                    }
                }
            ]
        };
    }
})();