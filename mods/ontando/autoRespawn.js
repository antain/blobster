if (!window.install) {
    window.install = [];
}

window.install.push({
    script : document.currentScript,
    author : "ontando", 
    name : "autoRespawn",
    displayName : "Auto respawn",
    init : function() {
        this.onMenuShowEvent(function(e) {
            setTimeout(this.module.action.game.spawn, 1000);
        });
    }
});