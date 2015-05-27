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
        this.constants.Options;                             // Game options
                                                            // 'this.constants.Options.data[<constant>].values' - ENUM: values, this option can switch to.
        this.constants.Options.SKINS;                       // Shouuld be skins shown? values: {DISABLED, ENABLED}. Default ENABLED.
        this.constants.Options.NAMES;                       // Shouuld be names shown? values: {DISABLED, ENABLED}. Default ENABLED.
        this.constants.Options.THEME;                       // Selected theme? values: {LIGHT, DARK}. Default LIGHT.
        this.constants.Options.COLORS;                      // Use random colors? values: {DISABLED, ENABLED}. Default ENABLED.
        this.constants.Options.MASS;                        // Shom mass? values: {DISABLED, ENABLED}. Default DISABLED.
        this.constants.Options.GAME_MODE;                   // Game mode? values: {FFA, TEAMS}. Default FFA.
        
        this.entities.all;                                  // List of all entities (Entity description at the bottom)
        this.entities.me;                                   // List of current player entities
        
        this.tmp_renderData == {x : 0, y : 0, scale : 1}    // Temporary data. Rendering. 'x' and 'y' of screen center and current 'scale'.
        
        this.action;                                        // Functions, to invoke original script.
        this.action.connect("ip");                          // Connects to specified ip, or to random one, with no arguments.
        this.action.game.shootForward();                    // Shoots projectile in looking direction
        this.action.game.splitForward();                    // Splits in looking direction
        
        this.gameConfig;                                    // Game configs.
        this.gameConfig.name;                               // Player name.
        var name = this.gameConfig.name.get();              // Get
        this.gameConfig.name.set(name);                     // Set
        
        this.gameConfig.options;                            // Game options (see ENUM Options below)
        var option = this.constants.Options.SKINS;
        var value = this.gameConfig.name.get(option);       // Get
        this.gameConfig.name.set(option, value);            // Set
        
        this.bindKey(69).onDown(function(e) {               // Bind '69' key press to this action
            return true;                                    // Supress defult behaviout
        });
        this.bindKey(70).onPress(function(e) {              // Bind '70' key continious pressing to this action
            return false;                                   // Keep defult behaviout
            
        });
        this.bindKey(71).onUp(function(e) {                 // Bind '71' key release to this action
            return false;                                   // Keep defult behaviout
        });
        this.bindKey(71).custom(function(e) {               // Bind '71' key press, continious pressing and release to this actions
            return false;                                   // Keep defult behaviout
        },
        function(e) {
            return false;                                   // Keep defult behaviout
        },
        function(e) {                                       // This action would be called in pair with 'this.bindKey(71).onUp', so you can bind few actions on same button
            return false;                                   // Keep defult behaviout
        });
        
        
        // ================
        // Events handlering
        // Lamda send to this functions will invoked at specifed event.
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
        this.onEntityRenderColorSelected(function(e) {      // Invokes in each render tick (soon should be better implementation)
            var originalColor = this.fillColor;             // Color, entity should render with
            var originalBorder = this.borderColor;          // Color, entity border should render with
            this.fillColor = "white";                       // Your awesome color
            this.borderColor = "blue";                      // Your awesome border color
        });
        this.onMenuHideEvent(function(e) {                  // Invokes when main menu hiden
        });
        this.onMenuShowEvent(function(e) {                  // Invokes when main menu shown
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
