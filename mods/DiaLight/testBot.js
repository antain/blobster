if (!window.install) {
	window.install = [];
}

window.install.push({
	script : document.currentScript,
	author : "DiaLihgt",
	name : "testBot",
	displayName : "Test bot (press q)",
	init : function() {
		var run = false;
		this.bindKey(81).onPress(function(e) {        
			run = !run;
			return true;
		});
		var document = window.ontando.script.newDocument;

		var vx, vy;
		var sacrifice = undefined, big_me;

		this.onTargetLocationSelecionEvent(function(e) {
			if (run) {
				e.x = vx;
				e.y = vy;
			}
		});
		this.onRenderCompleteEvent(function(e) {
			if (!run) {
				return;
			}
			var ctx_2d = e.canvasContext2D;
			if(sacrifice) {
				ctx_2d.save(); //push matrix
				ctx_2d.resetTransform();
				ctx_2d.globalAlpha = 0.8;


				drawLine(big_me, sacrifice, 'red');

				ctx_2d.restore(); //push matrix
				if(!sacrifice.id) {
					sacrifice = undefined;
				}
				return;
			}
			if(this.module.entities.meAmount !== 1) return;
			if(this.module.entities.amount === 0) return;

			var scale = this.module.tmp_renderData.scale;
			var locX = this.module.tmp_renderData.x;
			var locY = this.module.tmp_renderData.y;
			var length = $(ctx_2d.canvas).innerWidth();
			var height = $(ctx_2d.canvas).innerHeight();
			var key;

			var big_mass = 0, me;
			for (key in this.module.entities.me) {
				me = this.module.entities.me[key];
				if (me.mass > big_mass) {
					big_mass = me.mass;
					big_me = me;
				}
			}

			var dx, dy, diff, min_diff = 100000000, nearest_entity, entity;
			for (key in this.module.entities.all) {
				entity = this.module.entities.all[key];
				if(!entity.isFood) continue;
				dx = big_me.x - entity.x;
				dy = big_me.y - entity.y;
				diff = dx*dx + dy*dy;
				if(diff < min_diff) {
					min_diff = diff;
					nearest_entity = entity;
				}
			}

			if(big_me && nearest_entity) {
				sacrifice = nearest_entity;
			}

			function drawLine(from, to, color) {
				ctx_2d.beginPath();
				ctx_2d.strokeStyle = color;
				var dx = (from.x - locX) * scale;
				var dy = (from.y - locY) * scale;
				var fx = length / 2 + dx;
				var fy = height / 2 + dy;
				var tx = length / 2 + (to.x - from.x) * scale + dx;
				var ty = height / 2 + (to.y - from.y) * scale + dy;

				vx = to.x;
				vy = to.y;
				ctx_2d.moveTo(fx, fy);
				ctx_2d.lineTo(tx - (tx - fx) / 20, ty - (ty - fy) / 20);
				ctx_2d.stroke();

				//var doc = new document();
				//doc.setColor(color);
				//doc.setValue(tx.toFixed(0) + " " + ty.toFixed(0));
				//ctx_2d.drawImage(doc.render(), 50, 50);
			}
		});
	}
});