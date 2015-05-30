if (!window.install) { // Must be here (in all modules), couse it's hard to validate order of script loading.
    window.install = [];
}

// unsafeWindow.install.push([(String) author, (String) name, (function) initializer, <(int) priority : optional>]);
// Registers your module in main script, so it can handle it, create, invoke events and so.
// Pair of author and name should be unique.
// Priority is optional. Modules with less priority loades first.

window.install.push({
    script : document.currentScript,
    author : "ontando", 
    name : "example",
    displayName : "Example module", // Optional paraneter
    init : function() {
    
        // ================
        // Data, available from current object
        // ================
        
        this.author;                                        // Your name
        this.name;                                          // Script name
        
        // ================
        // Data, available from prototype object
        // ================
        
        
        this.version.main;                                  // Version of the main script
        this.version.script;                                // Version of Agar.io script we are based at
        
        this.constants;                                     // ENUMs used in events. 
                                                            // 'this.constants.<name>.size' - amount of entries;
                                                            // 'this.constants.<name>.data[<constant>]' - data of entry <constant> 
        
        this.constants.ConfigType;                          // Config data type
        this.constants.ConfigType.STRING;                   // Text data
        this.constants.ConfigType.NUMBER;                   // Number data
        this.constants.ConfigType.BOOLEAN;                  // true or false
        this.constants.ConfigType.KEY;                      // keyCode (number)
        this.constants.ConfigType.COLOR;                    // color (RGB text with hash at front)
        
        this.constants.Options;                             // Game options
                                                            // 'this.constants.Options.data[<constant>].values' - ENUM: values, this option can switch to.
        this.constants.Options.SKINS;                       // Shouuld be skins shown? values: {DISABLED, ENABLED}. Default ENABLED.
        this.constants.Options.NAMES;                       // Shouuld be names shown? values: {DISABLED, ENABLED}. Default ENABLED.
        this.constants.Options.THEME;                       // Selected theme? values: {LIGHT, DARK}. Default LIGHT.
        this.constants.Options.COLORS;                      // Use random colors? values: {DISABLED, ENABLED}. Default ENABLED.
        this.constants.Options.MASS;                        // Shom mass? values: {DISABLED, ENABLED}. Default DISABLED.
        this.constants.Options.GAME_MODE;                   // Game mode? values: {FFA, TEAMS}. Default FFA.
        
        this.entities.allAmount;                            // Amount of all entities
        this.entities.meAmount;                             // Amount of current player entities
        this.entities.all;                                  // List of all entities (Entity description at the bottom)
        this.entities.me;                                   // List of current player entities
        
        this.tmp_renderData == {x : 0, y : 0, scale : 1}    // Temporary data. Rendering. 'x' and 'y' of screen center and current 'scale'.
        
        this.action;                                        // Functions, to invoke original script.
        this.action.connect("ip");                          // Connects to specified ip, or to random one, with no arguments.
        this.action.game.shootForward();                    // Shoots projectile in looking direction
        this.action.game.changeDirectionTo(0, 0);           // Change look/move/shoot location to specified
        this.action.game.splitForward();                    // Splits in looking direction
        
        this.gameConfig;                                    // Game configs.
        this.gameConfig.name;                               // Player name.
        var name = this.gameConfig.name.get();              // Get
        this.gameConfig.name.set(name);                     // Set
        
        this.gameConfig.options;                            // Game options (see ENUM Options below)
        var option = this.constants.Options.SKINS;
        var value = this.gameConfig.name.get(option);       // Get
        this.gameConfig.name.set(option, value);            // Set
        
        this.loadCompleteHandler = function () {            // Invokes, when all modules loaded
            console.log("Ой, всё!");
        };
        
        
        // ================
        // Config manager
        // Config values stay same betwin page reloaded, if registered. Default value used only onse, when module loaded first time.
        // Handlers invokes on each value update (via gui or from code) and may modify value as they like.
        // You can access current module in all handler lamdas through: 'this.module'
        // ================
        
        this.moduleConfig.register(this.constants.ConfigType.STRING, "TestString");
                                                            // Registers string option with name "TestString", without update handler and default value
        
        this.moduleConfig.register(this.constants.ConfigType.INTEGER, "int", 0);
                                                            // Registers integer option with name "int", without update handler and with default value '0'
        
        this.moduleConfig.register(this.constants.ConfigType.BOOLEAN, "boolean", function (a) {console.log(a); return a;});
                                                            // Registers boolean option with name "boolean", with update handler and default value
        
        this.moduleConfig.register(this.constants.ConfigType.KEY, "key", function (a) {console.log(a); return a;}, 69);
                                                            // Registers key option with name "key", with update handler and default value '69'
        
        this.moduleConfig.register(this.constants.ConfigType.COLOR, "color", function (a) {return "#FF0000";}, "#FF0000");
                                                            // Registers color option with name "color", with update handler and default value
        
        this.moduleConfig.data["int"].getValue();           // Get value of option
        this.moduleConfig.data["boolean"].setValue(true);   // Set value to option (this will invoke set handler);
        
        // ================
        // Module data manager
        // Provides tools to save numbers, strings and booleans in module storage
        // ================
        
        this.moduleData.save("key", "value");               // Saves "value" under name "key"
        this.moduleData.load("key");                        // Loads value by name "key"
        
        // ================
        // Key binding tools
        // Provides tools to bind key actions.
        // You can access current module in all handler lamdas through: 'this.module'
        // ================
        
        this.bindKey({
            key : 69,                                       // Bind '69' key to specified action
            onDown : function(e) {                          // Bind key initial press
                return true;                                // Suppress default action
            },
            onPress : function(e) {                         // Bind continious button pressing
                return false;                               // Keep default action
            },
            onUp : function(e) {                            // Bind button release action
                                                            // Keep default action
            }
        });
        
        this.bindKey({
            config : "key",                                 // Bind key decribed by module config 'key' to specified action. This bind will be synchronised to changes of binded key
            onDown : function(e) {                          // Bind key initial press
                return true;                                // Suppress default action
            },
            onPress : function(e) {                         // Bind continious button pressing
                return false;                               // Keep default action
            },
            onUp : function(e) {                            // Bind button release action
                                                            // Keep default action
            }
        });
        
        // ================
        // Events handlering
        // Lamda send to this functions will invoked at specifed event.
        // You can access current module in all event lamdas through: 'this.module'
        // ================
        
        this.onNameChangeEvent(function(e) {                // Invoked before starting game, when name requested by original script
            var name = e.name;                              // Name, set by player
            e.name = "Cool name";                           // Name set to player, by you
        });
        this.onOptionChangeEvent(function(e) {              // Invoked when player changes option
            var option = e.option;                          // Option were changed (see ENUM Options below)
            var value = e.value;                            // Value, it was changed to (see ENUM again)
            // Soon will be ability to change player selection... Or not soon...
        });
        this.onConnectingStartEvent(function(e) {           // Invoked before connection to game server started
            var ip = e.ip;                                  // IP, this connection will be estabilished
            e.ip = "ws://127.0.0.1:443";                    // Your faworit server, this client will be connected to. 
        });
        this.onRenderCompleteEvent(function(e) {            // Invoked after each render loop
            var 2d = e.canvasContext2D;                     // Render context. See this: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        });
        this.onEntityShouldRenderEvent(function (e) {       // Invokes when selecting if entity should be rendered.
            var entity = e.entity;                          // Entity this color belong to
            var render = this.render;                       // If entity should rendered
            this.render = false;                            // Do not render them, if you wish
        });
        this.onEntityRenderColorSelected(function(e) {      // Invokes in each render tick (soon should be better implementation)
            var entity = e.entity;                          // Entity this color belong to
            var originalColor = this.fillColor;             // Color, entity should render with
            var originalBorder = this.borderColor;          // Color, entity border should render with
            this.fillColor = "white";                       // Your awesome color
            this.borderColor = "blue";                      // Your awesome border color
        });
        this.onMenuHideEvent(function(e) {                  // Invokes when main menu hiden
        });
        this.onMenuShowEvent(function(e) {                  // Invokes when main menu shown
        });
        this.onTargetLocationSelecionEvent(function(e) {    // Invokes when location to move determines
            var x = e.x;                                    // Current target x (set by mouse or other module)
            var y = e.y;                                    // Current target y (set by mouse or other module)
            e.x = 0;                                        // Your smart target x
            e.y = 0;                                        // Your smart target y
            e.suppress = e.suppress | true;                 // Suppress this update
        });
        
        // ================
        // Entity structure
        // ================
        for (var i in this.entities.all) {
            var ent = this.entities.all[i];
            ent.id;                                         // Entity UUID
            ent.x = 0;                                      // Entity X location
            ent.y = 0;                                      // Entity Y location
            ent.size = 0;                                   // Entity render size
            ent.mass = 0;                                   // Entity mass
            ent.color = "#FFFFFF";                          // Entity color, specified by server
            ent.isVirus = false;                            // Is this entity virus
            ent.isFood = false;                             // Is this entity food
            ent.isMe = false;                               // Is this entity controled by current player
            ent.name = name;                                // Player name of current entity
        }
    }
});
