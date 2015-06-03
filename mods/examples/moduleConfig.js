if (!window.install) {
    window.install = [];
}

window.install.push({
    script : document.currentScript,
    author : "example",
    name : "moduleConfig",
    displayName : "Example module (moduleConfig)",
    init : function() {
        
        
        // ================
        // Config manager
        // Config values stay same betwin page reloaded, if registered. Default value used only onse, when module loaded first time.
        // Handlers invokes on each value update (via gui or from code) and may modify value as they like.
        // You can access current module in all handler lamdas through: 'this.module'
        // ================
        this.moduleConfig.register;

        // Registers string option with name "TestString", without update handler and default value
        this.moduleConfig.register(this.constants.ConfigType.STRING, "TestString");

        // Registers integer option with name "int", without update handler and with default value '0'
        this.moduleConfig.register(this.constants.ConfigType.INTEGER, "int", 0);

        // Registers boolean option with name "boolean", with update handler and default value
        this.moduleConfig.register(this.constants.ConfigType.BOOLEAN, "boolean", function (a) {console.log(a); return a;});

        // Registers key option with name "key", with update handler and default value '69'
        this.moduleConfig.register(this.constants.ConfigType.KEY, "key", function (a) {console.log(a); return a;}, 69);

        // Registers color option with name "color", with update handler and default value
        this.moduleConfig.register(this.constants.ConfigType.COLOR, "color", function (a) {return "#FF0000";}, "#FF0000");

        this.moduleConfig.data;

        // Get value of option
        this.moduleConfig.data["int"].getValue();

        // Set value to option (this will invoke set handler);
        this.moduleConfig.data["boolean"].setValue(true);
    }
});
