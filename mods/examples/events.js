if (!window.install) {
    window.install = [];
}

window.install.push({
    script : document.currentScript,
    author : "example",
    name : "events",
    displayName : "Example module (events)",
    init : function() {
        /**
         * Events handlering
         * Lamda send to this functions will invoked at specifed event.
         * You can access current module in all event lamdas through: 'this.module'
         */
        {


            this.onNameChangeEvent(function (e) {                // Invoked before starting game, when name requested by original script
                var name = e.name;                              // Name, set by player
                e.name = "Cool name";                           // Name set to player, by you
            });
            this.onOptionChangeEvent(function (e) {              // Invoked when player changes option
                var option = e.option;                          // Option were changed (see ENUM Options below)
                var value = e.value;                            // Value, it was changed to (see ENUM again)
                // Soon will be ability to change player selection... Or not soon...
            });


            this.onConnectingStartEvent(function (e) {           // Invoked before connection to game server started
                var ip = e.ip;                                  // IP, this connection will be estabilished
                e.ip = "ws://127.0.0.1:443";                    // Your faworit server, this client will be connected to.
            });

            this.onUpdateCompleteEvent();
            this.onRenderCompleteEvent(function (e) {            // Invoked after each render loop

            });

            this.onTargetLocationSelecionEvent();

            this.onEntityShouldRenderEvent(function (e) {       // Invokes when selecting if entity should be rendered.
                var entity = e.entity;                          // Entity this color belong to
                var render = this.render;                       // If entity should rendered
                this.render = false;                            // Do not render them, if you wish
            });
            this.onEntityRenderColorSelectedEvent(function (e) {      // Invokes in each render tick (soon should be better implementation)
                var entity = e.entity;                          // Entity this color belong to
                var originalColor = this.fillColor;             // Color, entity should render with
                var originalBorder = this.borderColor;          // Color, entity border should render with
                this.fillColor = "white";                       // Your awesome color
                this.borderColor = "blue";                      // Your awesome border color
            });
            /**
             * Invokes, when skin selecting to render.
             */
            this.onEntitySkinRenderEvent(function(e) {
                /**
                 * Entity skin selecing for.
                 */
                e.entity;
                /**
                 * Skin id.
                 * Default : entity.name.toLowerCase()
                 */
                e.skinId;
                /**
                 * If scin should render.
                 * Default: true if entity is not projectile and gamemode is FFA and skin rendering enabled
                 */
                e.shouldRender;
            });
            /**
             * Invokes, when new skin requested.
             */
            this.onSkinURLCreatedEvent(function(e) {
                /**
                 * Skin id, url required for.
                 */
                e.skinId;
                /**
                 * Skin url.
                 */
                e.url;
            });

            this.onPlayerSpawnEvent(function (e) {                  // Invokes when main menu hiden
            });
            this.onPlayerDeathEvent(function (e) {                  // Invokes when main menu shown
            });

            this.onTargetLocationSelecionEvent(function (e) {    // Invokes when location to move determines
                var x = e.x;                                    // Current target x (set by mouse or other module)
                var y = e.y;                                    // Current target y (set by mouse or other module)
                e.x = 0;                                        // Your smart target x
                e.y = 0;                                        // Your smart target y
                e.suppress = e.suppress | true;                 // Suppress this update
            });
            this.onUpdateCompleteEvent(function (e) {            // Invokes, when data received from server and hndlered

            });
        }
    }
});
