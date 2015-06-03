if (!window.install) {
    window.install = [];
}

window.install.push({
    script : document.currentScript,
    author : "yourName", 
    name : "scriptName",
    displayName : "<u style='font-color:#FF0000'>Fancy</u> Script name",
    init : function() {
        console.log("Я сделяль!");
    }
});