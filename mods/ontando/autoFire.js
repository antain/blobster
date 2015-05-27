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
            this.bindKey(69).onPress(function(e) {        
                this.module.action.game.shootForward();
                return true;
            });
        }
    });
})();