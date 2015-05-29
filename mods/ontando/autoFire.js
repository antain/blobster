(function() {
    if (!window.install) {
        window.install = [];
    }

    window.install.push({
        script : document.currentScript,
        author : "ontanod", 
        name : "autoFire",
        displayName : "Auto fire (press e)",
        init : function() {
            this.moduleConfig.register(this.constants.ConfigType.KEY, "Button", function(c) {console.log(c); return c;}, 69);
            this.bindKey({
                config : "Button",
                onPress : function(e) {
                    console.log(e.keyCode);
                    this.module.action.game.shootForward();
                    return true;
                }
            });
        }
    });
})();