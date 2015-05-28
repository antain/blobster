if (document.currentScript.override < window.ontando_core_modAPI_override) {
    console.log("Ignoring modAPI from " + document.currentScript.src);
} else {
    console.log("Loading modAPI from " + document.currentScript.src);
    window.ontando_core_modAPI_override = document.currentScript.override;
    
}