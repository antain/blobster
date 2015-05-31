(function() {
    var script_file_name = "name_here"; alert("Change core name!!!");
    if (document.currentScript.override < window["ontando_core_" + script_file_name + "_override"] ) {
        console.log("Ignoring '" + script_file_name + "' from " + document.currentScript.src);
    } else {
        console.log("Loading '" + script_file_name + "' from " + document.currentScript.src);
        window["ontando_core_" + script_file_name + "_override"] = document.currentScript.override;
        
    }
})();