if (document.currentScript.override < window.ontando_core_renderTools_override) {
    console.log("Ignoring renderTools from " + document.currentScript.src);
} else {
    console.log("Loading renderTools from " + document.currentScript.src);
    window.ontando_core_renderTools_override = document.currentScript.override;

    (function() {
        function Text(text, size, sizeModifier, color, borderColor) {
            text && (this.text = text);
            size && (this.size = size);
            sizeModifier && (this.sizeModifier = sizeModifier);
            color && (this.color = color);
            borderColor && (this.borderColor = borderColor);
            this.cache = undefined;
        }
        Text.prototype = {
            text : "",
            size : -1,
            sizeModifier : 1,
            color : "#FFFFFF",
            borderColor : "#000000",
            visible : true
        };
        
        window.ontando.RenderTools = function(canvas, canvasContext2D, docCreator) {
            this.canvas = canvas;
            this.canvasContext2D = canvasContext2D;
            this.docCreator = docCreator;
            this.x = 0;
            this.y = 0;
            this.scale = 1;
        }
        window.ontando.RenderTools.prototype = {
            newText : function(options) {
                var text = typeof(options.text) == "function" ? options.text : function() { return options.text };
                return new Text(text, options.size, options.sizeModifier, options.color, options.borderColor);
            },
            renderText : function(centerX, centerY, text, size) {
                if (text.cache == undefined) {
                    text.cache = new this.docCreator();
                }
                var doc = text.cache;
                
                    //setStroke: function(a) {
                    //    this._stroke != a && (this._stroke = a, this._dirty = !0)
                    //},
                
                doc.setValue(text.text());
                doc.setColor(text.color);
                doc.setStrokeColor(text.borderColor);
                
                doc.setSize(text.size < 0 ? size * text.sizeModifier : text.size);
                c = Math.ceil(10 * this.scale) / 10;
                doc.setScale(c);
                var d = doc.render(),
                    f = ~~(d.width / c),
                    g = ~~(d.height / c);
                this.canvasContext2D.drawImage(d, ~~centerX - ~~(f / 2), centerY - ~~(g / 2), f, g);
                return d.height / 2 / c + 4
            }
        }
    })();
}