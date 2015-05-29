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
            this.moduleConfig.register(this.constants.ConfigType.KEY, "Button", 69);
            this.bindKey(69).onPress(function(e) {        
                this.module.action.game.shootForward();
                return true;
            });
            
            // Test code by DebugMonkey
            var suspendMouseUpdates = false;
            var msDelayBetweenShots = 50;
            var sendMouseUpdate = this.action.game.changeDirectionTo;
            var A = this.action.game.shootForward;
            
            this.onTargetLocationSelecionEvent(function(e) {
                e.suppress |= suspendMouseUpdates;
            });
            
            this.bindKey(82).onPress(function(e) {
                var x = this.module.tmp_renderData.x + 100, y = this.module.tmp_renderData.y;
                suspendMouseUpdates = true;
                sendMouseUpdate(x + Math.random(), y + Math.random());
                window.setTimeout(function () { sendMouseUpdate(x + Math.random(), y + Math.random()); }, 25);

                for (var shotsFired = 0 ; shotsFired < 5; shotsFired++){
                    window.setTimeout(function () { sendMouseUpdate(x + Math.random(), y + Math.random()); A(); }, 
                                      msDelayBetweenShots *(shotsFired+1));  
                }
                window.setTimeout(function () { suspendMouseUpdates = false;}, msDelayBetweenShots *(shotsFired+1));
            });
        }
    });
})();