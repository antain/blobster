if (!window.install) {
    window.install = [];
}

window.install.push({
    script : document.currentScript,
    author : "example",
    name : "entities",
    displayName : "Example module (entities)",
    init : function() {
        /**
         * Plugin container data
         */
        {
            /**
             * Amount of all entities
             */
            this.entities.allAmount;
            /**
             * Amount of current player entities
             */
            this.entities.meAmount;
            /**
             * All entities blob
             *
             * Keys - entity id. It shouldn't story anything, except entities.
             */
            this.entities.all;
            /**
             * Player controlled entities blob
             *
             * Keys - entity id. It shouldn't story anything, except entities.
             */
            this.entities.me;
            /**
             * Enemies entities blob
             *
             * Keys - entity id. It shouldn't story anything, except entities.
             */
            this.entities.enemies;
            /**
             * Food (also known as pellets) entities blob
             *
             * Keys - entity id. It shouldn't story anything, except entities.
             */
            this.entities.food;
            /**
             * Viruses entities blob
             *
             * Keys - entity id. It shouldn't story anything, except entities.
             */
            this.entities.viruses;
        }
        /**
         * Entity structure
         */
        {
            var id;
            var ent = this.entities.all[id];
            /**
             * Entity data
             *
             * Changing this variables won't affect game in any way, except might broke some modules
             */
            {
                /**
                 * Entity UUID
                 */
                ent.id;
                /**
                 * Entity X coord
                 * @type {number}
                 */
                ent.x;
                /**
                 * Entity Y coord
                 * @type {number}
                 */
                ent.y;
                /**
                 * Entity mass
                 * @type {number}
                 */
                ent.mass;
                /**
                 * Time in milliseconds, when entity first appear in visible zone.
                 * @type {number}
                 */
                ent.appearTime;

                /**
                 * Entity render X coord
                 * @type {number}
                 */
                ent.renderX;
                /**
                 * Entity render Y coord
                 * @type {number}
                 */
                ent.renderY;
                /**
                 * Entity render size
                 * @type {number}
                 */
                ent.size;
                /**
                 * Entity color, specified by server
                 */
                ent.color;

                /**
                 * If current entity virus
                 * @type {boolean}
                 */
                ent.isVirus = false;
                /**
                 * If current entity food (mass < 9)
                 * @type {boolean}
                 */
                ent.isFood = false;
                /**
                 * If entity controlled by player
                 * @type {boolean}
                 */
                ent.isMe = false;
                /**
                 * Player name of current entity
                 * @type {string}
                 */
                ent.name;
            }
            /**
             * Entity rendering API
             * See: mods/example/renderTools.js
             */
            {
                /**
                 * Array of texts, shown on entity.
                 *
                 * Text with id 0 shown at middle.
                 * Texts with negatives id's appends at bottom.
                 * Texts with positive id's appends at top.
                 *
                 * See: mods/example/renderTools.js
                 */
                ent.text;

                /**
                 * Object of lines, started at current entity.
                 *
                 * See: mods/example/renderTools.js
                 */
                ent.lines;
            }
        }
    }
});
