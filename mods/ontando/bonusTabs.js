
if (!window.install) {
    window.install = [];
}

window.install.push({
    script : document.currentScript,
    author : "ontando", 
    name : "bonusTabs",
    displayName : "Bonus tabes (core)",
    init : function() {
        jQuery("body").prepend(
        '<div class="ontando_bonusTabs" style="height: 1px; position: absolute; left: 0px; right: 0px; top: 0px; z-index: 300; display: block;">'
            + '<div style="height: 50px; width: 500px; margin: 3px auto;">'
                + '<div style="height: 50px; width: 240px; float:left; background-color: #FFFFFF; margin: 0px 5px; border-radius: 15px; padding: 5px 15px 5px 15px;">'
                    + 'Ontando Blobster mod'
                    + '<br /> '
                    + 'Version : ' + this.version.main + ' (' + this.version.script + ')'
                + '</div>'
                + '<div style="height: 50px; width: 240px; float:left; background-color: #FFFFFF; margin: 0px 5px; border-radius: 15px; padding: 5px 15px 5px 15px;">'
                    + 'IP: <b id="angal_server">None</b> <br /> '
                    + '<a id="angal_server_reconnect">Reconnect</a> || <a id="angal_server_change">Change</a> || <u id="angal_server_copy">Copy</u>'
                + '</div>'
            + '</div>'
        + '</div>'
        );
        jQuery("body").prepend(
        '<div class="ontando_bonusTabs" style="height: 1px; position: absolute; left: 0px; right: 0px; top: 0px; z-index: 300; display: block;">'
            + '<div style="height: 1px; width: 950px; margin: 100px auto;">'
                + '<div style="height: 500px; width: 250px; float:left; background-color: #FFFFFF; margin: 0px 5px; border-radius: 15px; padding: 5px 15px 5px 15px;">'
                    + 'Modules:'
                    + '<p id="ontando_bonusTabs_moduleList"></p>'
                + '</div>'
            + '</div>'
        + '</div>'
           
        + '<div class="ontando_bonusTabs" style="height: 1px; position: absolute; left: 0px; right: 0px; top: 0px; z-index: 300; display: block;">'
            + '<div style="height: 1px; width: 950px; margin: 100px auto;">'
                + '<div style="height: 500px; width: 250px; float:right; background-color: #FFFFFF; margin: 0px 5px; border-radius: 15px; padding: 5px 15px 5px 15px;">'
                    + 'Options: <br /> '
                    + '<select id="ontando_bonusTabs_module" class="form-control" onchange="ontando_bonusTabs_selectModule($(this).val());">'
                        + '<option selected value="-1">Global options</option>'
                    + '</select>'
                    + '<ol id="angal_serverList"></ol>'
                + '</div>'
            + '</div>'
        + '</div>'
        );
        
        this.onMenuHideEvent(function(e) {
            jQuery(".ontando_bonusTabs").hide();
        });
        this.onMenuShowEvent(function(e) {
            jQuery(".ontando_bonusTabs").fadeIn(3000);
        });
        this.bindKey(27).onDown(function(e) {
            jQuery(".ontando_bonusTabs").fadeIn(3000);
            return false;
        });
        
        var ip = "";
        var action = this.action;
        jQuery("#angal_server_copy").click(function() {
            alert("Not updated!");
            //GM_setClipboard(ip, "text");
        });
        jQuery("#angal_server_change").click(function() {
            var name = prompt("Server Ip:", ip);
            if (name == null) {
                return;
            }
            action.connect(name);
        });
        jQuery("#angal_server_reconnect").click(function() {
            action.connect(ip);
        });
        this.onConnectingStartEvent(function(e) {
            ip = e.ip;
            jQuery("#angal_server").html(ip);
        });
        var modules = window.ontando.module.list;
        for (var i = 0; i < modules.length; i++) {
            var m = modules[i];
            var state = m.enabled ? "<b style='color:#008800'>" : "<b style='color:#880000'>";
            var newState = m.willEnabled == m.enabled ? (!m.willEnabled ? "Enable" : "Disable") : (m.willEnabled ? "Will Enabled" : "Will Disabled");
            $("#ontando_bonusTabs_moduleList").append(
                i + ") " 
                + state // "<b ...>"
                    + m.displayName
                    + " <a style='font-size:8;' onClick='window.ontando_bonusTabs_togleModule(" + i + ")'>"
                        + "["
                            + "<u id='ontando_bonusTabs_moduleList_e" + i + "'>" + newState + "</u>"
                        + "]"
                    + "</a> " 
                + "</b>"
                + "<br />"
            );
            $('#ontando_bonusTabs_moduleOptions').append(
                '<option value="' + i + '">' + m.author + ":" + m.name +'</option>'
            );
        }
        window.ontando_bonusTabs_togleModule = function(id) {
            var m = modules[id];
            m.togleState();
            $("#ontando_bonusTabs_moduleList_e" + id).html(m.willEnabled == m.enabled ? (!m.willEnabled ? "Enable" : "Disable") : (m.willEnabled ? "Will Enabled" : "Will Disabled"));
        };
        
        window.ontando_bonusTabs_selectModule = function(id) {
            var m = modules[id];
            //m.renderOptions(jQuery("#ontando_bonusTabs_moduleOptions" + id)
        };
    }
});
