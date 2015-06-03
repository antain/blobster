if (!window.install) { // Must be here (in all modules), cause it's hard to validate order of script loading.
    window.install = [];
}

/**
 * Pushing script description to 'window.install' requests your module to be loaded.
 */
window.install.push({
    /**
     * Script, from where module were loaded.
     *
     * If you loading from GreaseMonkey, you can't get script. Then you can put something like:
     * {
     *      src : "GreaseMonkey:someText.js",
     *      override : 15
     * }
     */
    script : document.currentScript,
    /**
     * Your name here.
     */
    author : "example",
    /**
     * Your script unique id.
     */
    name : "module",
    /**
     * Display name of the module, which user will see.
     *
     * Optional parameter.
     */
    displayName : "Example module (module)",
    /**
     * Your module initializer function. Put all your code here.
     */
    init : function() {}
});
