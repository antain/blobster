if (!window.install) {
    window.install = [];
}

window.install.push({
	script : document.currentScript,
	author : "ontando", 
	name : "configAutoSave",
	displayName : "Config Saver",
	init : function() {
		this.onNameChangeEvent(function(e) {
			this.module.moduleData.save("config.name", e.name);
		});
		var value = this.moduleData.load("config.name");
		if (value !== undefined) {
			this.gameConfig.name.set(value);
		}
	    
		this.onOptionChangeEvent(function(e) {
			this.module.moduleData.save("config.option." + e.option, e.value);
		});
	    
		for (var i = 0; i < this.constants.Options.size; i++) {
			var value = this.moduleData.load("config.option." + i);
			if (value !== undefined) {
				this.gameConfig.options.set(i, value)
			}
		}
	}
});
