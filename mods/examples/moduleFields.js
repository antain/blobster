if (!window.install) {
    window.install = [];
}

window.install.push({
    script : document.currentScript,
    author : "example",
    name : "moduleFields",
    displayName : "Example module (moduleFields)",
    init : function() {
    
        /**
         * Current module data
        */
        {
            /**
             * Your name.
             *
             * In this module: "example"
             */
            this.author;
            /**
             * Module's name.
             *
             * In this module: "moduleFields"
             */
            this.name;
            /**
             * Module's display name.
             *
             * In this module: "Example module (moduleFields)"
             */
            this.displayName;

            /**
             * Handler, which will invoked, after completion of loading process.
             */
            this.loadCompleteHandler = function () {};
        }
        /**
         * Global data
         */
        {
            /**
             * Version data
             */
            this.version; {
                /**
                 * Version of blobster
                 */
                this.version.main;
                /**
                 * Version of Zeach's script, we are based on.
                 */
                this.version.script;
            }
            /**
             * Constants/Enums
             *
             * Enums, used in API.
             *
             * 'this.constants.<name>.size'                     - amount of entries in Enum
             * 'this.constants.<name>.data[<constant>]'         - data of enum entry <constant>
             */
            this.constants; {

                /**
                 * Module config data type.
                 * See: mods/examples/moduleConfig.js
                 */
                this.constants.ConfigType;
                /**
                 * Text data
                 */
                this.constants.ConfigType.STRING;
                /**
                 * Integer number data
                 */
                this.constants.ConfigType.INTEGER;
                /**
                 * Boolean data
                 */
                this.constants.ConfigType.BOOLEAN;
                /**
                 * Pressable key
                 *
                 * Stored as keyCode (number)
                 */
                this.constants.ConfigType.KEY;
                /**
                 * Color.
                 * Stored as string with RGB, prefixed with #
                 */
                this.constants.ConfigType.COLOR;

                /**
                 * Game (agar.io) options.
                 * 'this.constants.GameOptions.data[<constant>].values' - ENUM: values, this option can switch to
                 *
                 * See: mods/examples/gameOptions.js
                 */
                this.constants.GameOptions;
                /**
                 * Shouuld be skins shown?
                 *
                 * values: {DISABLED, ENABLED}.
                 * Default value: ENABLED.
                 */
                this.constants.GameOptions.SKINS;
                /**
                 * Shouuld be names shown?
                 *
                 * values: {DISABLED, ENABLED}.
                 * Default value: ENABLED.
                 */
                this.constants.GameOptions.NAMES;
                /**
                 * Selected theme?
                 *
                 * values: {LIGHT, DARK}.
                 * Default value: LIGHT.
                 */
                this.constants.GameOptions.THEME;
                /**
                 * Use random colors?
                 *
                 * values: {DISABLED, ENABLED}.
                 * Default value: ENABLED.
                 */
                this.constants.GameOptions.COLORS;
                /**
                 * Shom mass?
                 * values: {DISABLED, ENABLED}.
                 * Default value: DISABLED.
                 */
                this.constants.GameOptions.MASS;
                /**
                 * Game mode?
                 *
                 * values: {FFA, TEAMS}.
                 * Default value: FFA.
                 */
                this.constants.GameOptions.GAME_MODE;
            }
            /**
             * Entities
             * See: mods/examples/entities.js
             */
            this.entities;

            /**
             * API for rendering some stuff on game canvas
             * See: mods/examples/renderTools.js
             */
            this.renderTools;

            /**
             * Functions, to invoke custom game actions
             */
            this.action; {
                /**
                 * Connects to specified IP.
                 * If called without argument, connecting to random.
                 *
                 * @param String ip : ip to connect to (optional)
                 */
                this.action.connect("ip");
                /**
                 * Shoots projectile in looking direction
                 *
                 * After change direction, you need wait some time, to shoot there.
                 */
                this.action.game.shootForward();
                /**
                 * Change direction, you move, look and shoot to
                 *
                 * @param int x : X coordinate, where to move
                 * @param int y : Y coordinate, where to move
                 */
                this.action.game.changeDirectionTo(0, 0);
                /**
                 * Split half of your mass in looking direction
                 *
                 * After change direction, you need wait some time, to split there.
                 */
                this.action.game.splitForward();

            }

            /**
             * Game (agar.io) configurations.
             * See: mods/examples/gameOptions.js
             */
            this.gameOptions;

            /**
             * Module config manager
             * See: mods/examples/moduleConfig.js
             */
            this.moduleConfig;

            /**
             * Module data manager
             * See: mods/examples/moduleData.js
             */
            this.moduleData;
        }

        /**
         * Other accessible elements
         */
        {
            /**
             * Key binding
             * See: mods/examples/bindKey.js
             */
            this.bindKey;

            /**
             * Events
             * See: mods/examples/events.js
             */
            this.onNameChangeEvent;
            this.onOptionChangeEvent;
            // this.on*Event();
        }
    }
});
