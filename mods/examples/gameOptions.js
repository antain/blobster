if (!window.install) {
    window.install = [];
}

window.install.push({
    script : document.currentScript,
    author : "example",
    name : "gameOptions",
    displayName : "Example module (gameOptions)",
    init : function() {

        /**
         * Options provided in original game (agar.io) to players.
         */
        this.gameOptions;
        /**
         * Name of current player.
         */
        this.gameOptions.name;
        var name = this.gameOptions.name.get();
        this.gameOptions.name.set(name);

        /**
         * All switchable options.
         */
        this.gameOptions.options;
        var option = this.constants.gameOptions.SKINS;
        var value = this.gameOptions.name.get(option);
        this.gameOptions.name.set(option, value);

    }
});
