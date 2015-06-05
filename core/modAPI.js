if (document.currentScript.override < window.ontando_core_modAPI_override) {
    console.log("Ignoring modAPI from " + document.currentScript.src);
} else {
    console.log("Loading modAPI from " + document.currentScript.src);
    window.ontando_core_modAPI_override = document.currentScript.override;

    (function() {
        function doNothig() { return false; }
        function returnParam(a) { return a; }
        
        if (window.install === undefined) {
            window.install = [];
        }
        if (window.ontando.ENUM == undefined) {
            window.ontando.ENUM = {};
        }
        var ENUM = window.ontando.ENUM;
        var v = {main : "0.1.3", script : "???"};
        var GM_getValue = function(){}, GM_setValue = function(){};
        var keybindings = {};
        var keyBindingUUID = 0;

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
            this.loadCompleteHandler = doNothig;
            
            var m = this;
            var moduleConfigHandlers = new Object();
            this.moduleConfig = {
                register : function (type, name, opt_handler, opt_default) {
                    var handler, defaultValue;
                    if (typeof(opt_handler) == "function") {
                        handler = opt_handler;
                        defaultValue = opt_default;
                    } else {
                        handler = returnParam;
                        defaultValue = opt_handler;
                    }
                    
                    moduleConfigHandlers[name] = new ConfigHandler(m, type, name, handler, defaultValue);
                    this.handlers.push(moduleConfigHandlers[name]);
                },
                handlers : [],
                data : moduleConfigHandlers
            };
            this.moduleData = {
                save : function(key, value) {
                    GM_setValue("module:" + m.author + ":" + m.name + ":data:" + key, value); 
                },
                load : function(key) {
                    return GM_getValue("module:" + m.author + ":" + m.name + ":data:" + key); 
                }
            };
            
        }
        var ent = {
            amount : 0,
            meAmount : 0,
            all : {},
            enemies : {},
            me : {},
            viruses : {},
            food : {}
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
            renderTools : undefined,
            version : v,
            constants : ENUM,
            entities : ent,
            tmp_renderData : renderData, // Deprecated. Use Module::renderTools
            action : {
                connect : function (ip) {
                    if (ip) {
                        window.ontando.script.connectDirect(ip);
                    }
                },
                game : {
                    spawn : function () {
                        window.setNick();
                    },
                    shootForward : function () {
                        window.ontando.script.sendActionPacket(21);
                    },
                    changeDirectionTo : function (x, y) {
                        return window.ontando.script.changeDirectionTo(x, y);
                    },
                    splitForward : function () {
                        window.ontando.script.sendActionPacket(17);
                    }
                }
            },
            gameOptions : {
                name : {
                    get : function() {
                        return data.gameOptions.name;
                    },
                    set : function(name) {
                        data.gameOptions.name = name;
                        jQuery("#nick").val(name);
                    }
                },
                options : {
                    get : function(option) {
                        return data.gameOptions.options[option];
                    },
                    set : function(option, value) {
                        data.gameOptions.options[option] = value;
                        switch (option) {
                            case 0: //SKINS
                                value = (value == ENUM.GameOptions.data[ENUM.GameOptions.SKINS].values.DISABLED);
                                $($("#settings input")[0]).prop("checked", value);
                                window.setSkins(!value);
                            break;
                            case 1: //NAMES
                                value = (value == ENUM.GameOptions.data[ENUM.GameOptions.NAMES].values.DISABLED);
                                $($("#settings input")[1]).prop("checked", value);
                                window.setNames(!value);
                            break;
                            case 2: //THEME
                                value = (value == ENUM.GameOptions.data[ENUM.GameOptions.THEME].values.DARK);
                                $($("#settings input")[2]).prop("checked", value);
                                window.setDarkTheme(value);
                            break;
                            case 3: //COLORS
                                value = (value == ENUM.GameOptions.data[ENUM.GameOptions.COLORS].values.DISABLED);
                                $($("#settings input")[3]).prop("checked", value);
                                window.setColors(value);
                            break;
                            case 4: //MASS
                                value = (value == ENUM.GameOptions.data[ENUM.GameOptions.MASS].values.ENABLED);
                                $($("#settings input")[4]).prop("checked", value);
                                window.setShowMass(value);
                            break;
                            case ENUM.GameOptions.GAME_MODE: //GAME_MODE
                                switch (value) {
                                    case ENUM.GameOptions.data[ENUM.GameOptions.GAME_MODE].values.FFA:
                                        $("#gamemode option")[0].selected = true;
                                        window.setGameMode("");
                                        break;
                                    case ENUM.GameOptions.data[ENUM.GameOptions.GAME_MODE].values.TEAMS:
                                        $("#gamemode option")[1].selected = true;
                                        window.setGameMode(":teams");
                                        break;
                                    default:
                                        window.setGameMode("");
                                        break;
                                }
                            break;
                        }
                    }
                }
            },
            bindKey : function(keyCode) {
                var m = this;
                if (typeof(keyCode) == "object") {
                    var code = keyCode.keyCode;
                    var option = keyCode.config;
                    var onDown = keyCode.onDown;
                    var onPress = keyCode.onPress;
                    var onUp = keyCode.onUp;
                    var uuid = keyBindingUUID++;
                    
                    if (option != undefined) {
                        code = this.moduleConfig.data[option].getValue();
                        this.moduleConfig.data[option].bindChangeHandler.push(function(oldCode, newCode) {
                            if (oldCode == newCode) {
                                return;
                            }
                            var b = keybindings[oldCode];
                            var newB = keybindings[newCode];
                            if (b == undefined) {
                                return;
                            }
                            if (newB === undefined) {
                                newB = new KeyBinding(code);
                            }
                            var tmp_i = 0;
                            for (var i = 0; i < b.downHandler.length; i++) {
                                tmp_i++;
                                if (tmp_i > 10000) {
                                    return;
                                }
                                if (b.downHandler[i].module == m) {
                                    if (uuid == b.downHandler[i].uuid) {
                                        newB.downHandler.push(b.downHandler[i]);
                                        b.downHandler.splice(i, 1);
                                        i--;
                                    }
                                }
                            }
                            for (var i = 0; i < b.pressedHandler.length; i++) {
                                tmp_i++;
                                if (tmp_i > 10000) {
                                    return;
                                }
                                if (b.pressedHandler[i].module == m) {
                                    if (uuid == b.pressedHandler[i].uuid) {
                                        newB.pressedHandler.push(b.pressedHandler[i]);
                                        b.pressedHandler.splice(i, 1);
                                        i--;
                                    }
                                }
                            }
                            for (var i = 0; i < b.upHandler.length; i++) {
                                tmp_i++;
                                if (tmp_i > 10000) {
                                    return;
                                }
                                if (b.upHandler[i].module == m) {
                                    if (uuid == b.upHandler[i].uuid) {
                                        newB.upHandler.push(b.upHandler[i]);
                                        b.upHandler.splice(i, 1);
                                        i--;
                                    }
                                }
                            }
                        });
                    }
                    
                    if (keybindings[code] === undefined) {
                        keybindings[code] = new KeyBinding(code);
                    }
                    onDown === undefined || keybindings[code].downHandler.push(new KeyBindingHandler(m, uuid, onDown));
                    onPress === undefined || keybindings[code].pressedHandler.push(new KeyBindingHandler(m, uuid, onPress));
                    onUp === undefined || keybindings[code].upHandler.push(new KeyBindingHandler(m, uuid, onUp));
                    
                    return uuid;
                }
                return {
                    onDown : function(handler) {
                        if (keybindings[keyCode] === undefined) {
                            keybindings[keyCode] = new KeyBinding(keyCode);
                        }
                        keybindings[keyCode].downHandler.push(new KeyBindingHandler(m, -1, handler));
                    },
                    onPress : function(handler) {
                        if (keybindings[keyCode] === undefined) {
                            keybindings[keyCode] = new KeyBinding(keyCode);
                        }
                        keybindings[keyCode].downHandler.push(new KeyBindingHandler(m, -1, handler));
                        keybindings[keyCode].pressedHandler.push(new KeyBindingHandler(m, -1, handler));
                    },
                    onUp : function(handler) {
                        if (keybindings[keyCode] === undefined) {
                            keybindings[keyCode] = new KeyBinding(keyCode);
                        }
                        keybindings[keyCode].upHandler.push(new KeyBindingHandler(m, -1, handler));
                    },
                    custom : function(handlerDown, handlerPressed, handlerUp) {
                        if (keybindings[keyCode] === undefined) {
                            keybindings[keyCode] = new KeyBinding(keyCode);
                        }
                        keybindings[keyCode].downHandler.push(new KeyBindingHandler(m, -1, handlerDown));
                        keybindings[keyCode].pressedHandler.push(new KeyBindingHandler(m, -1, handlerPressed));
                        keybindings[keyCode].upHandler.push(new KeyBindingHandler(m, -1, handlerUp));
                    },
                };
            },
            
            // Event handler redistrators
            
            onNameChangeEvent : function(opt_priority, handler) {
                var priority;
                if (typeof(opt_priority) == "function") {
                    handler = opt_priority;
                } else {
                    priority = opt_priority;
                }
                events.onNameChange.add(new EventHandler(this, handler, priority));
            },
            onOptionChangeEvent : function(opt_priority, handler) {
                var priority;
                if (typeof(opt_priority) == "function") {
                    handler = opt_priority;
                } else {
                    priority = opt_priority;
                }
                events.onOptionChange.add(new EventHandler(this, handler, priority));
            },
            onConnectingStartEvent : function(opt_priority, handler) {
                var priority;
                if (typeof(opt_priority) == "function") {
                    handler = opt_priority;
                } else {
                    priority = opt_priority;
                }
                events.onConnectingStart.add(new EventHandler(this, handler, priority));
            },
            onRenderCompleteEvent : function(opt_priority, handler) {
                var priority;
                if (typeof(opt_priority) == "function") {
                    handler = opt_priority;
                } else {
                    priority = opt_priority;
                }
                events.onRenderComplete.add(new EventHandler(this, handler, priority));
            },
            onEntityShouldRenderEvent : function(opt_priority, handler) {
                var priority;
                if (typeof(opt_priority) == "function") {
                    handler = opt_priority;
                } else {
                    priority = opt_priority;
                }
                events.onEntityShouldRender.add(new EventHandler(this, handler, priority));
            },
            onEntityRenderColorSelectedEvent : function(opt_priority, handler) {
                var priority;
                if (typeof(opt_priority) == "function") {
                    handler = opt_priority;
                } else {
                    priority = opt_priority;
                }
                events.onEntityRenderColorSelected.add(new EventHandler(this, handler, priority));
            },
            onEntitySkinRenderEvent : function(opt_priority, handler) {
                var priority;
                if (typeof(opt_priority) == "function") {
                    handler = opt_priority;
                } else {
                    priority = opt_priority;
                }
                events.onEntityRenderColorSelected.add(new EventHandler(this, handler, priority));
            },
            onSkinURLCreatedEvent : function(opt_priority, handler) {
                var priority;
                if (typeof(opt_priority) == "function") {
                    handler = opt_priority;
                } else {
                    priority = opt_priority;
                }
                events.onSkinURLCreated.add(new EventHandler(this, handler, priority));
            },
            onMenuHideEvent : function(opt_priority, handler) {
                var priority;
                if (typeof(opt_priority) == "function") {
                    handler = opt_priority;
                } else {
                    priority = opt_priority;
                }
                events.onMenuHide.add(new EventHandler(this, handler, priority));
            },
            onMenuShowEvent : function(opt_priority, handler) {
                var priority;
                if (typeof(opt_priority) == "function") {
                    handler = opt_priority;
                } else {
                    priority = opt_priority;
                }
                events.onMenuShow.add(new EventHandler(this, handler, priority));
            },
            onTargetLocationSelecionEvent : function(opt_priority, handler) {
                var priority;
                if (typeof(opt_priority) == "function") {
                    handler = opt_priority;
                } else {
                    priority = opt_priority;
                }
                events.onTargetLocationSelecion.add(new EventHandler(this, handler, priority));
            },
            onUpdateCompleteEvent : function(opt_priority, handler) {
                var priority;
                if (typeof(opt_priority) == "function") {
                    handler = opt_priority;
                } else {
                    priority = opt_priority;
                }
                events.onUpdateComplete.add(new EventHandler(this, handler, priority));
            },
            onPlayerDeathEvent : function(opt_priority, handler) {
                var priority;
                if (typeof(opt_priority) == "function") {
                    handler = opt_priority;
                } else {
                    priority = opt_priority;
                }
                events.onPlayerDeath.add(new EventHandler(this, handler, priority));
            },
            onPlayerSpawnEvent : function(opt_priority, handler) {
                var priority;
                if (typeof(opt_priority) == "function") {
                    handler = opt_priority;
                } else {
                    priority = opt_priority;
                }
                events.onPlayerSpawn.add(new EventHandler(this, handler, priority));
            }
        };
        Module.prototype.gameConfig = Module.prototype.gameOptions;


//=================================================
//          Module config management
//=================================================

        function ConfigHandler(module, type, name, handler, defaultValue) {
            this.module = module;
            this.type = type;
            this.name = name;
            this.handler = handler;
            this.defaultValue = defaultValue;
            this.value = this.getValue();
            this.bindChangeHandler = [];
        }

        ConfigHandler.prototype = {
            getValue : function() {
                var value = GM_getValue("module:" + this.module.author + ":" + this.module.name + ":config:" + this.name);
                if (value === undefined) {
                    return this.defaultValue;
                }
                return value;
            },
            setValue : function(value) {
                switch (this.type) {
                    case ENUM.ConfigType.INTEGER:
                    case ENUM.ConfigType.KEY:
                        value = parseInt(value);
                    break;
                    case ENUM.ConfigType.BOOLEAN:
                        value = (value == true);
                    break;
                }
                value = this.handler(value);
                for( var i = 0; i < this.bindChangeHandler.length; i++) {
                    this.bindChangeHandler[i](this.value, value);
                }
                this.value = value;
                GM_setValue("module:" + this.module.author + ":" + this.module.name + ":config:" + this.name, value);
            }
        };


//=================================================
//          Key Binding management
//=================================================


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
        };
        
        function KeyBindingHandler(module, uuid, handler) {
            this.module = module;
            this.uuid = uuid;
            this.handle = handler;
        }

//=================================================
//          Entity management
//=================================================


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
            this.isAlive = true;
            this.name = name;
            this.appearTime = new Date().getTime();
            this.text = [];
            this.lines = {};

            this.update(x, y, size, color, isVirus, name);
            this.list.all[id] = this;
            this.list.amount++;
            this.list.allAmount++;

            var that = this;
            if (!this.isVirus && !this.isFood) {
                this.text.push(Module.prototype.renderTools.newText(
                    {
                        text : name,
                        sizeModifier : 1.0,
                        borderColor : "#000000"
                    }
                ));
                this.text.push(Module.prototype.renderTools.newText(
                    {
                        textProvider : function() {return that.mass.toFixed()},
                        sizeModifier : 0.5,
                        borderColor : this.color
                    }
                ));
            }
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

                if (this.isVirus) {
                    this.list.viruses[this.id] = this;
                } else {
                    delete this.list.viruses[this.id];
                }
                if (this.isVirus) {
                    this.list.food[this.id] = this;
                } else {
                    delete this.list.food[this.id];
                }

                if (this.isFood || this.isVirus || this.isMe) {
                    delete this.list.enemies[this.id];
                } else {
                    this.list.enemies[this.id] = this;
                }
            },
            setMe : function () {
                delete this.list.enemies[this.id];
                this.isMe = true;
                this.list.me[this.id] = this;
                this.list.meAmount++;
            },
            destroy : function() {
                this.isAlive = false;
                delete this.list.all[this.id];
                this.list.amount--;
                this.list.allAmount++;
                
                if (this.isMe) {
                    delete this.list.me[this.id];
                    this.list.meAmount--;
                }

                if (this.isVirus) {
                    delete this.list.viruses[this.id];
                }
                if (this.isVirus) {
                    delete this.list.food[this.id];
                }

                this.id = undefined;
            },
            // Inner API
            renderLines : function(size) {
                for (var i in this.lines) {
                    if (!this.lines.hasOwnProperty(i)) {
                        continue;
                    }
                    var line = this.lines[i];
                    if (line != undefined) {
                        if (!line.check()) {
                            delete this.lines[i];
                            continue;
                        }
                        Module.prototype.renderTools.renderLine(this.renderX, this.renderY, line, size);
                    }
                }
            },
            renderText : function(size) {
                Module.prototype.renderTools.renderTexts(this.renderX, this.renderY, this.text, size);
            }
        };

//=================================================
//          Events management
//=================================================


        function EventPool() {
            this.pool = [];
        }

        EventPool.prototype = {
            add : function(eh) {
                this.pool.push(eh);
                this.pool.sort(function (a, b) { return a.priority - b.priority; });
            },
            apply : function(e) {
                for (var i = 0; i < this.pool.length; i++) {
                    var handler = this.pool[i];
                    handler.handle(e);
                }
            }
        };

        function EventHandler(module, handler, priority) {
            if (typeof(handler) != "function") {
                throw "Handler should be function";
            }
            this.module = module;
            this.handle = handler;
            this.priority = priority === undefined ? 0 : priority;
        }

//=================================================
//          Events constructors
//=================================================


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

        function EntityRenderColorSelectedEvent(entity, fillColor, borderColor) {
            this.entity = entity;
            this.fillColor = fillColor;
            this.borderColor = borderColor;
        }
        
        function EntitySholdRenderEvent(entity, defaultBehaviour) {
            this.entity = entity;
            this.render = defaultBehaviour;
        }

        function TargetLocationSelecionEvent(x, y) {
            this.x = x;
            this.y = y;
            this.suppress = false;
        }


//=================================================
//          Game configs
//=================================================

        var data = {
            gameOptions : {
                name : "",
                options : [
                    ENUM.GameOptions.data[ENUM.GameOptions.SKINS].values.ENABLED,
                    ENUM.GameOptions.data[ENUM.GameOptions.NAMES].values.ENABLED,
                    ENUM.GameOptions.data[ENUM.GameOptions.THEME].values.LIGHT,
                    ENUM.GameOptions.data[ENUM.GameOptions.COLORS].values.ENABLED,
                    ENUM.GameOptions.data[ENUM.GameOptions.MASS].values.DISABLED
                ]
            }
        };

//=================================================
//          Events pools
//=================================================

        var events = {
            onNameChange : new EventPool(),
            onOptionChange : new EventPool(),
            onConnectingStart : new EventPool(),
            onRenderComplete : new EventPool(),
            onEntityRenderColorSelected : new EventPool(),
            onEntitySkinRender : new EventPool(),
            onSkinURLCreated : new EventPool(),
            onEntitySholdRender : new EventPool(),
            onMenuHide : new EventPool(),
            onMenuShow : new EventPool(),
            onTargetLocationSelecion : new EventPool(),
            onUpdateComplete : new EventPool(),
            onPlayerDeath : new EventPool(),
            onPlayerSpawn : new EventPool()
        };

//=================================================
//          Debug data
//=================================================

        window.dbg_e = events;
        window.dbg_k = keybindings;


//=================================================
//          Enabled modules data
//=================================================

        window.ontando.module = {
            list : []
        };
        

//=================================================
//          GreaseMonkeys scripts event handlers
//=================================================

        window.ontando.gm_handler = {
            init : function (_GM_getValue, _GM_setValue) {
                GM_getValue = _GM_getValue;
                GM_setValue = _GM_setValue;
            }
        }


//=================================================
//          Core game event handlers
//=================================================

        
        window.ontando.core = {
            newEntity : Entity,
            init : function(canvas, canvasContext2D) {

                v.script = window.ontando_agario_original_version;

                Module.prototype.renderTools = new window.ontando.RenderTools(canvas, canvasContext2D, window.ontando.script.newDocument);
                var forceLoad = false;
                if (GM_getValue("core.installed") != 1) {
                    console.log("Initial execution. All mods are force enabled");
                    GM_setValue("core.installed", 1);
                    forceLoad = true;
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
                var tmp = [];
                for (var lvl = -2; lvl <= 1000; lvl++) {
                    for (var i = 0; i < list.length; i++) {
                        var m = list[i];
                        if (m.type == lvl && m.enabled == true) {
                            console.log("Loaded module '" + m.displayName + "' (" + m.author + ":" + m.name + ") type: " + m.type);
                            m.init();
                            tmp.push(m);
                        }
                    }
                }
                for (var i = 0; i < tmp.length; i++) {
                    tmp[i].loadCompleteHandler();
                }
            },
            targetLocation : function(x, y) {
                var e = new TargetLocationSelecionEvent(x, y);
                events.onTargetLocationSelecion.apply(e);
                return [e.x, e.y, e.suppress];
                
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
            spawn : function() {
                events.onMenuHide.apply({});
                events.onPlayerSpawn.apply({});
            },
            death : function() {
                events.onMenuShow.apply({});
                events.onPlayerDeath.apply({});
            },
            connecting : function(ip) {
                var i;
                ent.amount = 0;
                ent.allAmount = 0;
                ent.meAmount = 0;
                for (i in ent.all) {
                    if (ent.all.hasOwnProperty(i)) {
                        delete ent.all[i];
                    }
                    if (ent.enemies.hasOwnProperty(i)) {
                        delete ent.enemies[i];
                    }
                    if (ent.me.hasOwnProperty(i)) {
                        delete ent.me[i];
                    }
                    if (ent.viruses.hasOwnProperty(i)) {
                        delete ent.viruses[i];
                    }
                    if (ent.food.hasOwnProperty(i)) {
                        delete ent.food[i];
                    }
                }
                var e = new ConnectingStartEvent(ip);
                events.onConnectingStart.apply(e);
                return e.ip;
            },
            preRender : function (xCenter, yCenter, scale) {
                if (Module.prototype.renderTools === undefined) {
                    return [xCenter, yCenter, scale];
                }
                Module.prototype.renderTools.x = xCenter;
                Module.prototype.renderTools.y = yCenter;
                Module.prototype.renderTools.scale = scale;
                renderData.x = xCenter;
                renderData.y = yCenter;
                renderData.scale = scale;
                return [xCenter, yCenter, scale];
            },
            postRender : function (canvasContext2D) {
                events.onRenderComplete.apply(new RenderCompleteEvent(canvasContext2D));
            },
            postUpdate : function () {
                events.onUpdateComplete.apply({});
            },
            entity : {
                shouldRender : function (entity, defaultBehaviour) {
                    var e = new EntitySholdRenderEvent(entity.api, defaultBehaviour);
                    events.onEntitySholdRender.apply(e);
                    return e.render;
                },
                renderColor : function (entity, fillColor, borderColor) {
                    var e = new EntityRenderColorSelectedEvent(entity.api, fillColor, borderColor);
                    events.onEntityRenderColorSelected.apply(e);
                    return [e.fillColor, e.borderColor];
                },
                getSkinId : function(entity, skinId, shouldRender) {
                    var e = {entity : entity, skinId : skinId, shouldRender : shouldRender};
                    events.onEntitySkinRender.apply(e);
                    return [e.skinId, e.shouldRender];
                },
                getSkinURL : function(skinId, original) {
                    var e = {skinId : skinId, originalURL : original};
                    events.onSkinURLCreated.apply(e);
                    return e.originalURL;
                }
            },
            options : {
                setNick : function(name) {
                    var e = new NameChangeEvent(name);
                    events.onNameChange.apply(e);
                    return e.name;
                },
                setSkins : function(showSkins) {
                    var value = showSkins ? ENUM.GameOptions.data[ENUM.GameOptions.SKINS].values.ENABLED : ENUM.GameOptions.data[ENUM.GameOptions.SKINS].values.DISABLED;
                    events.onOptionChange.apply(new OptionChangeEvent(ENUM.GameOptions.SKINS, value));
                    data.gameOptions.options[ENUM.GameOptions.SKINS] = value;
                },
                setNames : function(showNames) {
                    var value = showNames ? ENUM.GameOptions.data[ENUM.GameOptions.NAMES].values.ENABLED : ENUM.GameOptions.data[ENUM.GameOptions.NAMES].values.DISABLED;
                    events.onOptionChange.apply(new OptionChangeEvent(ENUM.GameOptions.NAMES, value));
                    data.gameOptions.options[ENUM.GameOptions.NAMES] = value;
                    
                },
                setDarkTheme : function(darkTheme) {
                    var value = darkTheme ? ENUM.GameOptions.data[ENUM.GameOptions.THEME].values.DARK : ENUM.GameOptions.data[ENUM.GameOptions.THEME].values.LIGHT;
                    events.onOptionChange.apply(new OptionChangeEvent(ENUM.GameOptions.THEME, value));
                    data.gameOptions.options[ENUM.GameOptions.THEME] = value;
                    
                },
                setColors : function(colorTheme) {
                    var value = colorTheme ? ENUM.GameOptions.data[ENUM.GameOptions.COLORS].values.DISABLED : ENUM.GameOptions.data[ENUM.GameOptions.COLORS].values.ENABLED;
                    events.onOptionChange.apply(new OptionChangeEvent(ENUM.GameOptions.COLORS, value));
                    data.gameOptions.options[ENUM.GameOptions.COLORS] = value;
                    
                },
                setShowMass : function(showMass) {
                    var value = showMass ? ENUM.GameOptions.data[ENUM.GameOptions.MASS].values.ENABLED : ENUM.GameOptions.data[ENUM.GameOptions.MASS].values.DISABLED;
                    events.onOptionChange.apply(new OptionChangeEvent(ENUM.GameOptions.MASS, value));
                    data.gameOptions.options[ENUM.GameOptions.MASS] = value;
                    
                },
                setGameMode : function(gameMode) {
                    var value = gameMode ? ENUM.GameOptions.data[ENUM.GameOptions.GAME_MODE].values.TEAMS : ENUM.GameOptions.data[ENUM.GameOptions.GAME_MODE].values.FFA;
                    events.onOptionChange.apply(new OptionChangeEvent(ENUM.GameOptions.GAME_MODE, value));
                    data.gameOptions.options[ENUM.GameOptions.GAME_MODE] = value;
                }
            }
        };


//=================================================
//          Script functions accessors
//=================================================

        window.ontando.script = {
            connectDirect : "This function should connect to server send as first parameter",
            newDocument : "Creates document for text render",
            sendActionPacket : "Sends packet with id given as first parameter: 17 = split, 18 = keepApart (unused), 21 = shoot",
            spawn : "Spawns the player"
        };


//=================================================
//          Saying mainLoader, that we are ready, to receive access to GreaseMonkey storage
//=================================================

        window.ontando_mainLoader_load();
    })();
}