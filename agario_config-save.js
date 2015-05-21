// ==UserScript==
// @name         agario_config-save
// @namespace    ontando.io.agar
// @version      0.1
// @description  Adar.io Confoig auto save
// @author       ontando (angal)
// @match        agar.io
// @grant        GM_setClipboard
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==
if (!unsafeWindow.install) {
    unsafeWindow.install = [];
}

unsafeWindow.install.push(["ontando", "config-save", function() {
    this.onNameChangeEvent(function(e) {
        GM_setValue("ontando.config-save.name", e.name);
    });
    var value = GM_getValue("ontando.config-save.name");
    if (value !== undefined) {
        this.game_config.name.set(value);
    }
    
    this.onOptionChangeEvent(function(e) {
        GM_setValue("ontando.config-save.option." + e.option, e.value);
    });
    
    for (var i = 0; i < this.constants.Options.size; i++) {
        var value = GM_getValue("ontando.config-save.option." + i);
        if (value !== undefined) {
            this.game_config.options.set(i, value)
        }
    }
    
}]);
