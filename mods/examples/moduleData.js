if (!window.install) {
    window.install = [];
}

window.install.push({
    script : document.currentScript,
    author : "example",
    name : "moduleData",
    displayName : "Example module (moduleData)",
    init : function() {

        // ================
        // Module data manager
        // Provides tools to save numbers, strings and booleans in module storage
        // ================


        // Saves "value" under name "key"
        this.moduleData.save("key", "value");

        // Loads value by name "key"
        this.moduleData.load("key");

    }
});
