if (!window.install) {
    window.install = [];
}

window.install.push({
    script : document.currentScript,
    author : "ontando", 
    name : "renderTestSlow",
    displayName : "Test Render Tools",
    init : function() {
        
        var sizes_splitEat = 0.375;
        var sizes_eat = 0.74;
        var sizes_fear = 1.33;
        var sizes_splitFear = 2.66;
        
        
        this.moduleConfig.register(this.constants.ConfigType.NUMBER, "sizes_splitEat", function (a) {sizes_splitEat = a / 1000.0; return a;}, 375);
        this.moduleConfig.register(this.constants.ConfigType.NUMBER, "sizes_eat", function (a) {sizes_eat = a / 1000.0; return a;}, 740);
        this.moduleConfig.register(this.constants.ConfigType.NUMBER, "sizes_fear", function (a) {sizes_fear = a / 1000.0; return a;}, 1330);
        this.moduleConfig.register(this.constants.ConfigType.NUMBER, "sizes_splitFear", function (a) {sizes_splitFear = a / 1000.0; return a;}, 2660);
        
        var Document = window.ontando.script.newDocument;
        var doc = new Document();
        this.onRenderCompleteEvent(function (e) {
            var context = e.canvasContext2D;
            var l = $(context.canvas).innerWidth();
            var h = $(context.canvas).innerHeight();
            renderMap(context, this.module.tmp_renderData.x, this.module.tmp_renderData.y, l, h, this.module.tmp_renderData.scale, doc);
            if (this.module.entities.amount == 0 || this.module.entities.meAmount == 0) {
                return;
            }
            renderInfo(context, this.module.tmp_renderData.x, this.module.tmp_renderData.y, l, h, this.module.tmp_renderData.scale, this.module.entities.all, this.module.entities.me, doc);
        });
        
        function renderMap(g, locX, locY, length, height, scale, doc) {
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

        function renderInfo(g, locX, locY, length, height, scale, entities, me, doc) {
            g.save(); //push matrix
            g.resetTransform();
            g.globalAlpha = 0.8;
           
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
                if(curEnt.isFood || curEnt.isMe || curEnt.isVirus /*|| curEnt.mass < entSkipSize*/) continue;
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
                    continue;
                }
                doc.setValue(r1.toFixed(2));
                if(r1 < sizes_splitEat) {
                    doc.setValue(r1.toFixed(2));
                    var splitRange_me = Math.sqrt(curMin) / minMe.size;
                    if(splitRange_me < 4.5) { //splitRange_old < 40
                        g.lineWidth = 3;
                    }
                    drawLine(curEnt, minMe, 'green');
                } else if (r1 < sizes_eat) {
                    drawLine(curEnt, minMe, 'blue');
                } else if(r1 < sizes_fear) {
                    drawLine(curEnt, minMe, 'gray');
                } else if (r1 < sizes_splitFear){
                    drawLine(curEnt, minMe, 'orange');
                } else {
                    doc.setValue(r1.toFixed(0));
                    var splitRange_en = Math.sqrt(curMin) / curEnt.size;
                    if(splitRange_en < 6) { //splitRange_old < 45
                        g.lineWidth = 3;
                    }
                    drawLine(curEnt, minMe, 'red');
                }
            }
           
            g.restore(); //push matrix
            
            function drawLine(from, to, color) {
                g.beginPath();
                g.strokeStyle = color;
                var fx = length / 2 + (from.renderX - locX) * scale;
                var fy = height / 2 + (from.renderY - locY) * scale;
                var tx = length / 2 + (to.renderX - locX) * scale;
                var ty = height / 2 + (to.renderY - locY) * scale;
                g.moveTo(fx, fy);
                g.lineTo(tx - (tx - fx) / 20, ty - (ty - fy) / 20);
                g.stroke();
               
                doc.setColor(color);
                g.drawImage(doc.render(), tx - (tx - fx) / 5, ty - (ty - fy) / 5);
            }
        }
    }
});