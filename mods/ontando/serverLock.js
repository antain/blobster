if (!window.install) {
    window.install = [];
}

window.install.push({
    script : document.currentScript,
    author : "ontando",
    name : "serverLock",
    displayName : "Lock server to specified",
    init : function() {
        var ip;
        this.moduleConfig.register(this.constants.ConfigType.STRING, "Ip", function(a){this.ip = a; return a;}, "ws://127.0.0.1:443");
        ip = this.moduleConfig.data["Ip"].getValue();
        this.onConnectingStartEvent(function(e) {
            e.ip = ip;
        })
    }
});