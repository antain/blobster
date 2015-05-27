(function(localhost) {
	var pushScript = function(src, override) {
		var script = document.createElement('script');
		script.type = "text/javascript";
		script.override = override;
		script.src = src;
		document.head.appendChild(script);
	};
    
	var github = function (name) { 
		pushScript("https://rawgit.com/antain/blobster/master/" + name + "?_=" + new Date().getTime(), 0);
	};
	var local = function (name) {
		pushScript("http://" + localhost + "/" + name + "?_=" + new Date().getTime(), 1);
	};

	local("blobster/mods/ontando/bonusTabs.js");
	local("blobster/mods/ontando/configAutoSave.js");
	local("blobster/mods/ontando/renderTestSlow.js");
	local("blobster/mods/ontando/autoFire.js");
	
})(window.ontando_mainLoader_localhost);