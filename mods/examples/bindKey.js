if (!window.install) {
    window.install = [];
}

window.install.push({
    script : document.currentScript,
    author : "example",
    name : "bindKey",
    displayName : "Example module (bindKey)",
    init : function() {

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
    }
});
