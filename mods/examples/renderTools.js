if (!window.install) {
    window.install = [];
}

window.install.push({
    script : document.currentScript,
    author : "example",
    name : "renderTools",
    displayName : "Example module (renderTools)",
    init : function() {
        var entity, text, line;

        this.renderTools;

        text = this.renderTools.newText({
            test : "",
            textProvider : function() {
                return this.text;
            },
            size : -1,
            sizeModifier : 1,
            color : "#FFFFFF",
            borderColor : "#FF0000"
        });
        line = this.renderTools.newLine({
            entity : entity,
            x : 0,
            y : 0,
            size : 1,
            color : "#FFFFFF",
            check : function() {
                return true;
            }
        });
        line.text.push(text);

        this.onRenderCompleteEvent(function(e) {
            this.module.renderTools.renderText(x, y, text, ???, 0.5, 0.5);
            this.module.renderTools.renderTexts(x, y, [text], ???);
            this.module.renderTools.renderLine(x, y, line, ???);
        })
    }
});