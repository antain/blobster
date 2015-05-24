// ==UserScript==
// @name         agario_example
// @namespace    ontando.io.agar
// @version      0.1
// @description  Adar.io Example module (aka Documentation)
// @author       ontando (angal)
// @match        agar.io
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

if (!unsafeWindow.install) { // Must be here (in all modules), couse it's hard to validate order of script loading.
    unsafeWindow.install = [];
}

// unsafeWindow.install.push([(String) author, (String) name, (function) initializer, <(int) priority : optional>]);
// Registers your module in main script, so it can handle it, create, invoke events and so.
// Pair of author and name should be unique.
// Priority is optional. Modules with less priority loades first.

unsafeWindow.install.push(["ontando", "config-save", function() {
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
    
    this.entities.all                                   // List of all entities
    this.entities.me                                    // List of current player entities
    
    this.tmp_renderData == {x : 0, y : 0, scale : 1}    // Temporary data. Rendering. 'x' and 'y' of screen center and current 'scale'.
    
    this.action;                                        // Functions, to invoke original script.
    this.action.connect("ip");                          // Connects to specified ip, or to random one, with no arguments.
    
    this.gameConfig;                                    // Game configs.
    this.gameConfig.name;                               // Player name.
    var name = this.gameConfig.name.get();              // Get
    this.gameConfig.name.set(name);                     // Set
    
    this.gameConfig.options;                            // Game options (see ENUM Options below)
    var option = this.constants.Options.SKINS;
    var value = this.gameConfig.name.get(option);       // Get
    this.gameConfig.name.set(option, value);            // Set
    
    
    this.onNameChangeEvent(function(e) {
        GM_setValue("ontando.config-save.name", e.name);
    });
    var value = GM_getValue("ontando.config-save.name");
    if (value !== undefined) {
        this.game_config.name.set(value);
    }
    
    this.onNameChangeEvent(function(e) {
        var name = e.name;                              // Name, set by player
        e.name = "Cool name";                           // Name set to player, by you
    });
    this.onOptionChangeEvent(function(e) {
        var option = e.option;                          // Option were changed (see ENUM Options below)
        var value = e.value;                            // Value, it was changed to (see ENUM again)
        // Soon will be ability to change player selection... Or not soon...
    });
    this.onConnectingStartEvent(function(e) {
        var ip = e.ip;                                  // IP, this connection will be estabilished
        e.ip = "ws://127.0.0.1:443";                    // Your faworit server, this client will be connected to. 
    });
    this.onRenderCompleteEvent(function(e) {
        var 2d = e.canvasContext2D;                  // Render context. See this: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    });
}]);
