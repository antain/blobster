if (document.currentScript.override < window.ontando_core_modAPI_override) {
    console.log("Ignoring modAPI from " + document.currentScript.src);
} else {
    console.log("Loading modAPI from " + document.currentScript.src);
    window.ontando_core_modAPI_override = document.currentScript.override;

    (function() {
        if (window.install === undefined) {
            window.install = [];
        }
        var ENUM = {};
        var v = {main : "0.1.1", script : "507"};
        var GM_setClipboard = function(){}, GM_getValue = function(){}, GM_setValue = function(){};
        var keybindings = {};

        function Module(data) {
            this.script = data.script;
            this.author = data.author;
            this.name = data.name;
            this.displayName = data.displayName;
            if (!this.displayName) {
                this.displayName = this.author + ':' + this.name;
            }
            this.init = data.init;
            this.enabled = GM_getValue("ontando.module." + this.author + "." + this.name + ".enabled") == true;
            this.willEnabled = this.enabled;
            if (data.priority == "core") {
            this.type = -2;
            } else if (data.priority == "api") {
            this.type = -1;
            } else {
            this.type = parseInt(data.priority);
            if (this.type !== this.type) {
                this.type = 0;
            }
            if (this.type > 1000 || this.type < 0) {
                this.type = 1000;
            }
            }
        }
        var ent = {
            amount : 0,
            meAmount : 0,
            all : {
            },
            me : {
            }
        };
        var renderData = {
            x : 0, y : 0, scale : 1
        };
        Module.prototype = {
            // Inner API
            togleState : function() {
                var state = !GM_getValue("ontando.module." + this.author + "." + this.name + ".enabled");
                GM_setValue("ontando.module." + this.author + "." + this.name + ".enabled", state)
                this.willEnabled = state;
            },
            // Public API
            version : v,
            constants : ENUM,
            entities : ent,
            tmp_renderData : renderData,
            moduleData : {
                save : function(key, value) {
                    GM_setValue("module:" + this.author + ":" + this.name + ":" + key, value); 
                },
                load : function(key, value) {
                    return GM_getValue("module:" + this.author + ":" + this.name + ":" + key, value); 
                }
            },
            action : {
                connect : function (ip) {
                    if (ip) {
                        window.ontando.script.connectDirect(ip);
                    }
                },
                game : {
                    shootForward : function () {
                        window.ontando.script.sendActionPacket(21);
                    },
                    splitForward : function () {
                        window.ontando.script.sendActionPacket(17);
                    },
                }
            },
            gameConfig : {
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
                            case 0: //SKINS
                                value = (value == ENUM.Options.data[ENUM.Options.SKINS].values.DISABLED);
                                $(jQuery("#settings input")[0]).prop("checked", value);
                                window.setSkins(!value);
                            break;
                            case 1: //NAMES
                                value = (value == ENUM.Options.data[ENUM.Options.NAMES].values.DISABLED);
                                $(jQuery("#settings input")[1]).prop("checked", value);
                                window.setNames(!value);
                            break;
                            case 2: //THEME
                                value = (value == ENUM.Options.data[ENUM.Options.THEME].values.DARK);
                                $(jQuery("#settings input")[2]).prop("checked", value);
                                window.setDarkTheme(value);
                            break;
                            case 3: //COLORS
                                value = (value == ENUM.Options.data[ENUM.Options.COLORS].values.DISABLED);
                                $(jQuery("#settings input")[3]).prop("checked", value);
                                window.setColors(value);
                            break;
                            case 4: //MASS
                                value = (value == ENUM.Options.data[ENUM.Options.MASS].values.ENABLED);
                                $(jQuery("#settings input")[4]).prop("checked", value);
                                window.setShowMass(value);
                            break;
                            case 5: //GAME_MODE
                            break;
                        }
                    }
                }
            },
            bindKey : function(keyCode) {
                var m = this;
                return {
                    onDown : function(handler) {
                        if (keybindings[keyCode] === undefined) {
                            keybindings[keyCode] = new KeyBinding(keyCode);
                        }
                        keybindings[keyCode].downHandler.push(new KeyBindingHandler(m, handler));
                    },
                    onPress : function(handler) {
                        console.log(m);
                        if (keybindings[keyCode] === undefined) {
                            keybindings[keyCode] = new KeyBinding(keyCode);
                        }
                        keybindings[keyCode].downHandler.push(new KeyBindingHandler(m, handler));
                        keybindings[keyCode].pressedHandler.push(new KeyBindingHandler(m, handler));
                    },
                    onUp : function(handler) {
                        if (keybindings[keyCode] === undefined) {
                            keybindings[keyCode] = new KeyBinding(keyCode);
                        }
                        keybindings[keyCode].upHandler.push(new KeyBindingHandler(m, handler));
                    },
                    custom : function(handlerDown, handlerPressed, handlerUp) {
                        if (keybindings[keyCode] === undefined) {
                            keybindings[keyCode] = new KeyBinding(keyCode);
                        }
                        keybindings[keyCode].downHandler.push(new KeyBindingHandler(m, handlerDown));
                        keybindings[keyCode].pressedHandler.push(new KeyBindingHandler(m, handlerPressed));
                        keybindings[keyCode].upHandler.push(new KeyBindingHandler(m, handlerUp));
                    },
                };
            },
            onNameChangeEvent : function(handler, priority) {
                events.onNameChange.add(new EventHandler(this, handler, priority));
            },
            onOptionChangeEvent : function(handler, priority) {
                events.onOptionChange.add(new EventHandler(this, handler, priority));
            },
            onConnectingStartEvent : function(handler, priority) {
                events.onConnectingStart.add(new EventHandler(this, handler, priority));
            },
            onRenderCompleteEvent : function(handler, priority) {
                events.onRenderComplete.add(new EventHandler(this, handler, priority));
            },
            onEntityRenderColorSelectedEvent : function(handler, priority) {
                events.onEntityRenderColorSelected.add(new EventHandler(this, handler, priority));
            },
            onMenuHideEvent : function(handler, priority) {
                events.onMenuHide.add(new EventHandler(this, handler, priority));
            },
            onMenuShowEvent : function(handler, priority) {
                events.onMenuShow.add(new EventHandler(this, handler, priority));
            },
        };
        
        function KeyBinding(keyCode) {
            this.keyCode = keyCode;
            this.downHandler = [];
            this.pressedHandler = [];
            this.upHandler = [];
            this.state = false;
        }
        
        KeyBinding.prototype = {
            down : function(/*IHTMLEventObj*/ event) {
                var suppress = false;
                if (this.state) {
                    for (var i = 0; i < this.pressedHandler.length; i++) {
                        var f = this.pressedHandler[i];
                        suppress |= f.handle(event);
                    }
                } else {
                    for (var i = 0; i < this.downHandler.length; i++) {
                        var f = this.downHandler[i];
                        suppress |= f.handle(event);
                    }
                    this.state = true;
                }
                return suppress;
            },
            up : function(/*IHTMLEventObj*/ event) {
                var suppress = false;
                for (var i = 0; i < this.upHandler.length; i++) {
                    var f = this.upHandler[i];
                    suppress |= f.handle(event);
                }
                this.state = false;
                return suppress;
            }
        }
        
        function KeyBindingHandler(module, handler) {
            this.module = module;
            this.handle = handler;
        }

        function Entity(id, x, y, size, color, isVirus, name) {
            this.id = id;
            this.x = 0;
            this.y = 0;
            this.size = 0;
            this.mass = 0;
            this.color = "#FFFFFF";
            this.isVirus = false;
            this.isFood = false;
            this.isMe = false;
            this.name = name;
            this.update(x, y, size, color, isVirus, name);
            this.list.all[id] = this;
            this.list.amount++;
        }
        Entity.prototype = {
            list : ent,
            update : function(x, y, size, color, isVirus, name) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.mass = this.size * this.size / 100;
                this.color = color;
                this.isVirus = isVirus;
                this.isFood = this.mass < 9;
                this.name = name;
            },
            setMe : function () {
                this.isMe = true;
                this.list.me[this.id] = this;
                this.list.meAmount++;
            },
            destroy : function() {
                delete this.list.all[this.id];
                this.list.amount--;
                
                if (this.isMe) {
                    delete this.list.me[this.id];
                    this.list.meAmount--;
                }
                this.id = undefined;
            }
        }


        function EventPool() {
            this.pool = [];
        }

        EventPool.prototype = {
            add : function(eh) {
                this.pool.push(eh);
            },
            apply : function(e) {
                for (var i = 0; i < this.pool.length; i++) {
                    var handler = this.pool[i];
                    handler.handle(e);
                }
            }
        };

        function EventHandler(module, handler, priority) {
            this.module = module;
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

        function RenderCompleteEvent(canvasContext2D) {
            this.canvasContext2D = canvasContext2D;
        }

        function EntityRenderColorSelectedEvent(fillColor, borderColor) {
            this.fillColor = fillColor;
            this.borderColor = borderColor;
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
            0 : {
                values : {
                DISABLED : 0, 
                ENABLED : 1
                }
            },
            1 : {
                values : {
                DISABLED : 0,
                ENABLED : 1
                }
            },
            2 : {
                values : {
                LIGHT : 0, 
                DARK : 1
                }
            },
            3 : { 
                values : {
                DISABLED : 0,
                ENABLED : 1
                }
            },
            4 : { 
                values : {
                DISABLED : 0,
                ENABLED : 1
                }
            },
            5 : { 
                values : {
                FFA : 0,
                TEAMS : 1
                }
            }
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
                ENUM.Options.data[ENUM.Options.MASS].values.DISABLED
            ]
            }
        };

        var events = {
            onNameChange : new EventPool(),
            onOptionChange : new EventPool(),
            onConnectingStart : new EventPool(),
            onRenderComplete : new EventPool(),
            onEntityRenderColorSelected : new EventPool(),
            onMenuHide : new EventPool(),
            onMenuShow : new EventPool()
        };
        window.dbg_e = events;

        window.ontando = {
        };
        window.ontando.module = {
            list : []
        };
        window.ontando.gm_handler = {
            init : function (_GM_setClipboard, _GM_getValue, _GM_setValue) {
                GM_setClipboard = _GM_setClipboard;
                GM_getValue = _GM_getValue;
                GM_setValue = _GM_setValue;
            }
        }
        window.ontando.core = {
            newEntity : Entity,
            init : function() {
                var forceLoad = true;
                if (GM_getValue("core.installed") != 1) {
                    console.log("Initial execution. All mods are force enabled");
                    GM_setValue("core.installed", 1);
                    forceLoad;
                }
                var install = window.install;
                var list = window.ontando.module.list;
                var mmap = {}
                for (var j = 0; j < install.length; j++) {
                    var m = new Module(install[j]);
                    console.log(
                        "Found module '" + m.displayName + "' (" + m.author + ":" + m.name + ")."
                        + " override: " + m.script.override + ", type: " + m.type + ", src: " + m.script.src
                    );
                    if (mmap[m.author] === undefined) {
                        mmap[m.author] = {};
                    }
                    if (!mmap[m.author][m.name] || m.script.override > mmap[m.author][m.name].script.override) {
                        console.log("Stored module '" + m.displayName + "' (" + m.author + ":" + m.name + ")");
                        mmap[m.author][m.name] = m;
                    }
                }
                for (var author in mmap) {
                    for (var name in mmap[author]) {
                        var m = mmap[author][name];
                        console.log("Installed module '" + m.displayName + "' (" + m.author + ":" + m.name + ") src: " + m.script.src);
                        if (forceLoad && !m.enabled) {
                            console.log("Forsed enabling '" + m.displayName + "' (" + m.author + ":" + m.name + ")");
                            m.togleState();
                            m.enabled = true;
                        }
                        list.push(m);
                    }
                }

                for (var lvl = -2; lvl <= 1000; lvl++) {
                    for (var i = 0; i < list.length; i++) {
                        var m = list[i];
                        if (m.type == lvl && m.enabled == true) {
                            console.log("Loaded module '" + m.displayName + "' (" + m.author + ":" + m.name + ") type: " + m.type);
                            m.init();
                        }
                    }
                }
            },
            keybinding : {
                down : function(/*IHTMLEventObj*/ event) {
                    if (keybindings.hasOwnProperty(event.keyCode)) {
                        var bind = keybindings[event.keyCode];
                        return bind.down(event);
                    }
                    return false;
                },
                up : function(/*IHTMLEventObj*/ event) {
                    if (keybindings.hasOwnProperty(event.keyCode)) {
                        var bind = keybindings[event.keyCode];
                        return bind.up(event);
                    }
                    return false;
                }
            },
            hideMenu : function() {
            events.onMenuHide.apply({});
            },
            showMenu : function() {
            events.onMenuShow.apply({});
            },
            connecting : function(ip) {
            var e = new ConnectingStartEvent(ip);
            events.onConnectingStart.apply(e);
            return e.ip;
            },
            preRender : function (xCenter, yCenter, scale) {
            renderData.x = xCenter;
            renderData.y = yCenter;
            renderData.scale = scale;
            return [xCenter, yCenter, scale];
            },
            postRender : function (canvasContext2D) {
            events.onRenderComplete.apply(new RenderCompleteEvent(canvasContext2D));
            },
            postUpdate : function () {
            
            },
            entity : {
            renderColor : function (fillColor, borderColor) {
                var e = new EntityRenderColorSelectedEvent(fillColor, borderColor);
                events.onEntityRenderColorSelected.apply(e);
                return [e.fillColor, e.borderColor];
            }
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

        window.ontando.script = {
            connectDirect : "This function should connect to server send as first parameter",
            newDocument : "Creates document for text render",
            sendActionPacket : "Sends packet with id given as first parameter: 17 = split, 18 = keepApart (unused), 21 = shoot"
        };

        window.ontando_mainLoader_load();
    })();
}