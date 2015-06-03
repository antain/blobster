if (!window.install) {
    window.install = [];
}

window.install.push({
    script : document.currentScript,
    author : "ontando", 
    name : "renderTestSlow",
    displayName : "Test Render Tools",
    init : function() {


        var sizes_splitEatHandler = function (a) {
            sizes_splitEat = a / 1000.0;
            if (sizes_splitEat <= 0 || sizes_splitEat !== sizes_splitEat) {
                sizes_splitEat = 0.37;
                return 370;
            }
            return a;
        };
        var sizes_eatHandler = function (a) {
            sizes_eat = a / 1000.0;
            if (sizes_eat <= 0 || sizes_eat !== sizes_eat) {
                sizes_eat = 0.74;
                return 740;
            }
            return a;
        };
        var sizes_fearHandler = function (a) {
            sizes_fear = a / 1000.0;
            if (sizes_fear <= 0 || sizes_fear !== sizes_fear) {
                sizes_fear = 1.33;
                return 1330;
            }
            return a;
        };
        var sizes_splitFearHandler = function (a) {
            sizes_splitFear = a / 1000.0;
            if (sizes_splitFear <= 0 || sizes_splitFear !== sizes_splitFear) {
                sizes_splitFear = 2.66;
                return 2660;
            }
            return a;
        };
        this.moduleConfig.register(this.constants.ConfigType.INTEGER, "sizes_splitEat", sizes_splitEatHandler, sizes_splitEatHandler(-1));
        this.moduleConfig.register(this.constants.ConfigType.INTEGER, "sizes_eat", sizes_eatHandler, sizes_eatHandler(-1));
        this.moduleConfig.register(this.constants.ConfigType.INTEGER, "sizes_fear", sizes_fearHandler, sizes_fearHandler(-1));
        this.moduleConfig.register(this.constants.ConfigType.INTEGER, "sizes_splitFear", sizes_splitFearHandler, sizes_splitFearHandler(-1));

        this.moduleConfig.register(this.constants.ConfigType.COLOR, "color_splitEat", function (a) {color_splitEat = a; return a;}, "#00FF00");
        this.moduleConfig.register(this.constants.ConfigType.COLOR, "color_eat", function (a) {color_eat = a ; return a;}, "#8888FF");
        this.moduleConfig.register(this.constants.ConfigType.COLOR, "color_same", function (a) {color_same = a ; return a;}, "#888888");
        this.moduleConfig.register(this.constants.ConfigType.COLOR, "color_fear", function (a) {color_fear = a ; return a;}, "#FF8800");
        this.moduleConfig.register(this.constants.ConfigType.COLOR, "color_splitFear", function (a) {color_splitFear = a ; return a;}, "#FF0000");

        this.moduleConfig.register(this.constants.ConfigType.BOOLEAN, "renderMap", function (a) {renderMap = a; return a;}, true);
        this.moduleConfig.register(this.constants.ConfigType.BOOLEAN, "renderLines", function (a) {renderLines = a; return a;}, true);

        var sizes_splitEat;
        sizes_splitEatHandler(this.moduleConfig.data["sizes_splitEat"].getValue());
        var sizes_eat;
        sizes_eatHandler(this.moduleConfig.data["sizes_eat"].getValue());
        var sizes_fear;
        sizes_fearHandler(this.moduleConfig.data["sizes_fear"].getValue());
        var sizes_splitFear;
        sizes_splitFearHandler(this.moduleConfig.data["sizes_splitFear"].getValue());

        var color_splitEat = this.moduleConfig.data["color_splitEat"].getValue();
        var color_eat = this.moduleConfig.data["color_eat"].getValue();
        var color_same = this.moduleConfig.data["color_same"].getValue();
        var color_fear = this.moduleConfig.data["color_fear"].getValue();
        var color_splitFear = this.moduleConfig.data["color_splitFear"].getValue();

        var renderMap = this.moduleConfig.data["renderMap"].getValue();
        var renderLines = this.moduleConfig.data["renderLines"].getValue();
        console.log(
            sizes_splitEat, sizes_eat, sizes_fear, sizes_splitFear,
            color_splitEat, color_eat, color_same, color_fear, color_splitFear,
            renderMap, renderLines
        );

        var Document = window.ontando.script.newDocument;
        var doc = new Document();
        this.onRenderCompleteEvent(function (e) {
            if (!renderMap) {
                return;
            }
            var context = e.canvasContext2D;
            var l = $(context.canvas).innerWidth();
            var h = $(context.canvas).innerHeight();
            doRenderMap(context, this.module.tmp_renderData.x, this.module.tmp_renderData.y, l, h, this.module.tmp_renderData.scale, doc);
        });
        this.onUpdateCompleteEvent(function(e) {
            if (!renderLines) {
                return;
            }
            if (this.module.entities.amount == 0 || this.module.entities.meAmount == 0) {
                return;
            }
            doRenderLines(this.module.renderTools, this.module.entities.enemies, this.module.entities.me);

        });

        function doRenderMap(g, locX, locY, length, height, scale, doc) {
            //var ad = unsafeWindow.angal_data;
            var fieldSize = 11185;
            g.save(); //push matrix
            g.scale(scale, scale);
           
            g.strokeStyle = "#F20000";
            g.lineWidth = 10;
            g.globalAlpha = 0.8;
            g.strokeRect(-locX + length / scale / 2, -locY + height / scale / 2, fieldSize, fieldSize);
           
            g.resetTransform();
            g.strokeStyle = "#B0B000";
            g.fillStyle = "#B0B000";
            g.lineWidth = 1;
            g.globalAlpha = 0.9;
            var x = 5;
            var y = 5;
            var dx = 200;
            var dy = 200;
            var lx = locX / fieldSize * dx;
            var ly = locY / fieldSize * dy;
            g.strokeRect(x, y, dx, dy);
            g.fillRect(x + lx - 3, y + ly - 3, 6, 6);
           
            doc.setColor("gray");
            doc.setSize(20);
            doc.setValue("x: " + (locX/100).toFixed(0)); g.drawImage(doc.render(), x + dx + 10, 10);
            doc.setValue("y: " + (locY/100).toFixed(0)); g.drawImage(doc.render(), x + dx + 10, 30);
            doc.setValue("scale: " +(1 / scale).toFixed(2)); g.drawImage(doc.render(), x + dx + 10, 50);
            //doc.setValue("Total mass: " +(ad.entities.me.total).toFixed(0)); g.drawImage(doc.render(), x + dx + 10, 70);
            //doc.setValue("Max part mass: " +(ad.entities.me.max).toFixed(0)); g.drawImage(doc.render(), x + dx + 10, 90);
            g.restore(); //pop matrix
        }

        function doRenderLines(renderTools, entities, me) {
            var curEnt, curMe, entSkipSize = 0, meSkipSize, curMin, dif, dx, dy, minMe;
                
            var max = 0;
            for(var j in me) {
                entSkipSize += me[j].mass;
                if (max < me[j].mass) {
                    max = me[j].mass;
                }
            }
            //var ad = unsafeWindow.angal_data;
            //ad.entities.me.total = entSkipSize;
            //ad.entities.me.max = max;
            //meSkipSize = entSkipSize / me.length * 0.6; //30% from full
            //entSkipSize /= me.length * 10; //10% from middle
            entSkipSize = 10;
            for(var i in entities) {
                curEnt = entities[i];
                if(false /*|| curEnt.mass < entSkipSize*/) continue;
                curMin = 1000000000;
                for(var j in me) {
                    curMe = me[j];
                    //if(curMe.mass < meSkipSize) continue;
                    dx = curMe.x - curEnt.x;
                    dy = curMe.y - curEnt.y;
                    dif = dx * dx + dy * dy;
                    if(dif < curMin) {
                        curMin = dif;
                        minMe = curMe;
                    }
                }
                
                var r1 = curEnt.mass / minMe.mass;
                if (r1 < 0.27) { // 0.15
                    delete minMe.lines["rt:" + curEnt.id];
                    continue;
                }

                var line = minMe.lines["rt:" + curEnt.id];
                if (!line) {
                    line = renderTools.newLine({entity : curEnt, check : function() {return renderLines}});
                    line.text[0] = renderTools.newText({sizeModifier : 1});
                    minMe.lines["rt:" + curEnt.id] = line;
                }
                var text = line.text[0];
                line.size = 1;
                text.text = r1.toFixed(2);
                if(r1 < sizes_splitEat) {
                    line.color = color_splitEat;
                    text.color = color_splitEat;

                    var splitRange_me = Math.sqrt(curMin) / minMe.size;
                    if(splitRange_me < 4.5) { //splitRange_old < 40
                        line.size = 3;
                    }
                } else if (r1 < sizes_eat) {
                    line.color = color_eat;
                    text.color = color_eat;
                } else if(r1 < sizes_fear) {
                    line.color = color_same;
                    text.color = color_same;
                } else if (r1 < sizes_splitFear){
                    line.color = color_fear;
                    text.color = color_fear;
                } else {
                    text.text = r1.toFixed(0);
                    line.color = color_splitFear;
                    text.color = color_splitFear;

                    var splitRange_en = Math.sqrt(curMin) / curEnt.size;
                    if(splitRange_en < 6) { //splitRange_old < 45
                        line.size = 3;
                    }
                }
            }
        }
    }
});