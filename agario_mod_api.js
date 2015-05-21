// ==UserScript==
// @name         agario_mod_api
// @namespace    ontando.io.agar
// @version      0.1
// @description  Adar.io Modular Mods API
// @author       ontando (angal)
// @match        agar.io
// @grant        GM_setClipboard
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

var ENUM = {};
var v = {main : "0.1", script : "502"};

function Module(author, name, initializer, type) {
    this.author = author;
    this.name = name;
    this.init = initializer;
    this.enabled = GM_getValue("ontando.module." + author + "." + name + ".enabled");
    if (this.enabled === undefined) {
        this.enabled = true;
    }
    if (type == "core") {
        this.type = -2;
    } else if (type == "api") {
        this.type = -1;
    } else {
        this.type = parseInt(type);
        if (this.type !== this.type) {
            this.type = 0;
        }
        if (this.type > 1000 || this.type < 0) {
            this.type = 1000;
        }
    }
}

Module.prototype = {
    version : v,
    constants : ENUM,
    action : {
        connect : function (ip) {
            if (ip) {
                unsafeWindow.ontando.script.connectDirect(ip);
            }
        }
    },
    game_config : {
        name : {
            get : function() {
                return data.gameConfig.name;
            },
            set : function(name) {
                data.gameConfig.name = name;
                jQuery("#nick").val(name);
            }
        },
        options : {
            get : function(option) {
                return data.gameConfig.options[option];
            },
            set : function(option, value) {
                data.gameConfig.options[option] = value;
                switch (option) {
                    case 0:
                        $(jQuery("#settings input")[0]).prop("checked", value == ENUM.Options.data[ENUM.Options.SKINS].values.DISABLED);
                        break;
                    case 1:
                        $(jQuery("#settings input")[1]).prop("checked", value == ENUM.Options.data[ENUM.Options.NAMES].values.DISABLED);
                        break;
                    case 2:
                        $(jQuery("#settings input")[2]).prop("checked", value == ENUM.Options.data[ENUM.Options.THEME].values.DARK);
                        break;
                    case 3:
                        $(jQuery("#settings input")[3]).prop("checked", value == ENUM.Options.data[ENUM.Options.COLORS].values.DISABLED);
                        break;
                    case 4:
                        $(jQuery("#settings input")[4]).prop("checked", value == ENUM.Options.data[ENUM.Options.MASS].values.ENABLED);
                        break;
                    case 5:
                        break;
                }
            }
        }
    },
    onNameChangeEvent : function(handler, priority) {
        events.onNameChange.add(new EventHandler(handler, priority));
    },
    onOptionChangeEvent : function(handler, priority) {
        events.onOptionChange.add(new EventHandler(handler, priority));
    },
    onConnectingStartEvent : function(handler, priority) {
        events.onConnectingStart.add(new EventHandler(handler, priority));
    }
};

function EventPool() {
    this.pool = [];
}

EventPool.prototype = {
    add : function(eh) {
        this.pool.push(eh);
    },
    apply : function(e) {
        for (var i = 0; i < this.pool.length; i++) {
            this.pool[i].handle(e);
        }
    }
};

function EventHandler(handler, priority) {
    this.handle = handler;
    this.priority = priority;
}

function NameChangeEvent(name) {
    this.name = name;
}

function OptionChangeEvent(option, value) {
    this.option = option;
    this.value = value;
}

function ConnectingStartEvent(ip) {
    this.ip = ip;
}

ENUM.Options = {
    SKINS : 0,
    NAMES : 1,
    THEME : 2,
    COLORS : 3,
    MASS : 4,
    GAME_MODE : 5,
    size : 6,
    data : {
        0 : { values : {DISABLED : 0, ENABLED : 1}},
        1 : { values : {DISABLED : 0, ENABLED : 1}},
        2 : { values : {LIGHT : 0, DARK : 1}},
        3 : { values : {DISABLED : 0, ENABLED : 1}},
        4 : { values : {DISABLED : 0, ENABLED : 1}},
        5 : { values : {FFA : 0, TEAMS : 1}}
    }
}



var data = {
    gameConfig : {
        name : "",
        options : [
            ENUM.Options.data[ENUM.Options.SKINS].values.ENABLED, 
            ENUM.Options.data[ENUM.Options.NAMES].values.ENABLED, 
            ENUM.Options.data[ENUM.Options.THEME].values.LIGHT,
            ENUM.Options.data[ENUM.Options.COLORS].values.ENABLED,
            ENUM.Options.data[ENUM.Options.MASS].values.DISABLED,
        ]
    }
};

var events = {
    onNameChange : new EventPool(),
    onOptionChange : new EventPool(),
    onConnectingStart : new EventPool()
};
unsafeWindow.dbg_e = events;

unsafeWindow.ontando = {};
unsafeWindow.ontando.module = {
    list : [],
    register : function(author, name, initializer, type) {
        this.list.push(new Module(author, name, initializer, type));
    }
};
unsafeWindow.ontando.core = {
    init : function() {
        var install = unsafeWindow.install;
        var list = unsafeWindow.ontando.module.list;
        for (var j = 0; j < install.length; j++) {
            list.push(new Module(install[j][0], install[j][1], install[j][2], undefined));
        }

        for (var lvl = -2; lvl <= 1000; lvl++) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].type == lvl && list[i].enabled == true) {
                    list[i].init();
                }
            }
        }
    },
    connecting : function(ip) {
        var e = new ConnectingStartEvent(ip);
        events.onConnectingStart.apply(e);
        return e.ip;
    },
    options : {
        setNick : function(name) {
            var e = new NameChangeEvent(name);
            events.onNameChange.apply(e);
            return e.name;
        },
        setSkins : function(showSkins) {
            var value = showSkins ? ENUM.Options.data[ENUM.Options.SKINS].values.ENABLED : ENUM.Options.data[ENUM.Options.SKINS].values.DISABLED;
            events.onOptionChange.apply(new OptionChangeEvent(ENUM.Options.SKINS, value));
            data.gameConfig.options[ENUM.Options.SKINS] = value;
        },
        setNames : function(showNames) {
            var value = showNames ? ENUM.Options.data[ENUM.Options.NAMES].values.ENABLED : ENUM.Options.data[ENUM.Options.NAMES].values.DISABLED;
            events.onOptionChange.apply(new OptionChangeEvent(ENUM.Options.NAMES, value));
            data.gameConfig.options[ENUM.Options.NAMES] = value;
            
        },
        setDarkTheme : function(darkTheme) {
            var value = darkTheme ? ENUM.Options.data[ENUM.Options.THEME].values.DARK : ENUM.Options.data[ENUM.Options.THEME].values.LIGHT;
            events.onOptionChange.apply(new OptionChangeEvent(ENUM.Options.THEME, value));
            data.gameConfig.options[ENUM.Options.THEME] = value;
            
        },
        setColors : function(colorTheme) {
            var value = colorTheme ? ENUM.Options.data[ENUM.Options.COLORS].values.DISABLED : ENUM.Options.data[ENUM.Options.COLORS].values.ENABLED;
            events.onOptionChange.apply(new OptionChangeEvent(ENUM.Options.COLORS, value));
            data.gameConfig.options[ENUM.Options.COLORS] = value;
            
        },
        setShowMass : function(showMass) {
            var value = showMass ? ENUM.Options.data[ENUM.Options.MASS].values.ENABLED : ENUM.Options.data[ENUM.Options.MASS].values.DISABLED;
            events.onOptionChange.apply(new OptionChangeEvent(ENUM.Options.MASS, value));
            data.gameConfig.options[ENUM.Options.MASS] = value;
            
        },
        setGameMode : function(gameMode) {
            var value = gameMode ? ENUM.Options.data[ENUM.Options.GAME_MODE].values.TEAMS : ENUM.Options.data[ENUM.Options.GAME_MODE].values.FFA;
            events.onOptionChange.apply(new OptionChangeEvent(ENUM.Options.GAME_MODE, value));
            data.gameConfig.options[ENUM.Options.GAME_MODE] = value;
        }
    }
};

unsafeWindow.ontando.script = {
    connectDirect : "This function should connect to server send as first parameter"
};
