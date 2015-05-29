if (!window.install) {
    window.install = [];
}

window.install.push({
    script : document.currentScript,
    author : "yourName", 
    name : "scriptName",
    displayName : "Auto respawn",
    init : function() {
        this.onMenuShowEvent(function(e) {
            setTimeout(this.module.action.game.spawn, 1000);
        });
    }
});