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
            visible : true,
            getText : function() {
                return this.text;
            }
        };
        function Line(x, y, size, color, check) {
            x &&(this.x = x);
            y &&(this.y = y);
            size &&(this.size = size);
            color &&(this.color = color);
            check &&(this.check = check);
            this.text = [];
        }

        Line.prototype = {
            x : 0,
            y : 0,
            size : 1,
            color : "#0000FF",
            getX : function() {
                return this.x;
            },
            getY : function() {
                return this.y;
            },
            check : function() {
                return true;
            }
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
                var text = new Text(options.text, options.size, options.sizeModifier, options.color, options.borderColor);
                if (options.textProvider !== undefined) {
                    text.getText = options.textProvider;
                }
                return text;
            },
            newLine : function(options) {
                var line = new Line(options.x, options.y, options.size, options.color, options.check);
                if (options.entity !== undefined) {
                    line.getX = function() { return options.entity.renderX; };
                    line.getY = function() { return options.entity.renderY; };

                    if (options.check !== undefined) {
                        line.check = function() {
                            return options.entity.isAlive && options.check();
                        }
                    } else {
                        line.check = function() {
                            return options.entity.isAlive;
                        }
                    }
                }
                return line;
            },
            renderLine : function(sourceX, sourceY, line, size) {
                this.canvasContext2D.beginPath();
                this.canvasContext2D.strokeStyle = line.color;
                this.canvasContext2D.lineWidth = line.size;
                var targetX = line.getX();
                var targetY = line.getY();
                this.canvasContext2D.moveTo(sourceX, sourceY);
                this.canvasContext2D.lineTo(targetX, targetY);
                this.canvasContext2D.stroke();

                this.renderTexts(sourceX + (targetX - sourceX) / 5, sourceY + (targetY - sourceY) / 5, line.text, size);
            },
            renderTexts : function(x, y, texts, size) {
                if (texts.length <= 0) {
                    return;
                }
                var t = 0;
                if (texts[0] != undefined && texts[0].visible) {
                    t = this.renderText(x, y, texts[0], size, -0.5, -0.5)[1];
                }
                var upY = y - t / 2 - 4;
                var downY = y + t / 2 + 4;
                var up = false;
                for (var i = 1; i < texts.length; i++) {
                    var text = texts[i];
                    if (text != undefined && text.visible) {
                        if (up) {
                            upY = upY - this.renderText(x, upY, text, size, -0.5, -1)[1] - 4;
                        } else {
                            downY = downY + this.renderText(x, downY, text, size, -0.5, 0)[1] + 4;
                        }
                    }
                    up = !up;
                }
            },
            renderText : function(centerX, centerY, text, size, moveX, moveY) {
                if (text.cache == undefined) {
                    text.cache = new this.docCreator();
                }
                var doc = text.cache;
                
                    //setStroke: function(a) {
                    //    this._stroke != a && (this._stroke = a, this._dirty = !0)
                    //},
                
                doc.setValue(text.getText());
                doc.setColor(text.color);
                doc.setStrokeColor(text.borderColor);
                
                doc.setSize(text.size < 0 ? size * text.sizeModifier : text.size);
                c = Math.ceil(10 * this.scale) / 10;
                doc.setScale(c);
                var d = doc.render(),
                    f = ~~(d.width / c),
                    g = ~~(d.height / c);
                this.canvasContext2D.drawImage(d, ~~centerX + ~~(moveX * f), centerY + ~~(moveY * g), f, g);
                return [f, g];
            }
        }
    })();
}