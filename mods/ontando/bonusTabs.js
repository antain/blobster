
if (!window.install) {
    window.install = [];
}

window.install.push({
    script : document.currentScript,
    author : "ontando", 
    name : "bonusTabs",
    displayName : "Bonus tabes (core)",
    init : function() {
        
        var ConfigType = this.constants.ConfigType;
        var ip = "";
        var action = this.action;
        var modules = window.ontando.module.list;
        
        this.moduleConfig.register(this.constants.ConfigType.STRING, "STRING", function(a) { console.log(a); return a; }, "Hi!");
        this.moduleConfig.register(this.constants.ConfigType.INTEGER, "INTEGER", function(a) { console.log(a); return a; }, 1);
        this.moduleConfig.register(this.constants.ConfigType.BOOLEAN, "BOOLEAN", function(a) { console.log(a); return a; }, true);
        this.moduleConfig.register(this.constants.ConfigType.KEY, "KEY", function(a) { console.log(a); return a; }, 69);
        this.moduleConfig.register(this.constants.ConfigType.COLOR, "COLOR", function(a) { console.log(a); return a; }, "#FF0000");
        
        
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
                    + '<select id="ontando_bonusTabs_moduleOptions" class="form-control" onchange="ontando_bonusTabs_selectModule($(this).val());">'
                        + '<option selected value="-1">Global options</option>'
                    + '</select>'
                    + '<div id="ontando_bonusTabs_moduleOptions_group"></div>'
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
        
        this.loadCompleteHandler = function() {
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
                var str = '<div id="ontando_bonusTabs_moduleOptions_e' + i + '">';
                var tmp = m.moduleConfig.handlers;
                for (var j in tmp) {
                    var h = m.moduleConfig.handlers[j];
                    str += '<div>'
                        + '<div style="vertical-align: middle; height: 35px; width: 75px; float:left; background-color: #FFFFAA; margin: 5px 0px; border-radius: 5px; padding: 5px 5px 5px 5px;">'
                            + h.name
                        + '</div>'
                        + '<div style="vertical-align: middle; height: 35px; width: 120px; float:left; background-color: #FFFFAA; margin: 5px 10px; border-radius: 5px; padding: 5px 5px 5px 5px;">'
                            
                            switch (h.type) {
                                case ConfigType.STRING:
                                case ConfigType.COLOR:
                                    str += "<input "
                                                + "id='ontando_bonusTabs_moduleOptions_e" + i + "_c" + j + "' "
                                                + "style='height: 25px; width: 110px;' "
                                                + "class='form-control' "
                                                + "onblur='window.ontando_bonusTabs_changeOption(" + i + ", " + j + ", jQuery(\"#ontando_bonusTabs_moduleOptions_e" + i + "_c" + j + "\").val())' "
                                                + "value='" + h.getValue() + "' "
                                        + "/>";
                                break;
                                case ConfigType.INTEGER:
                                    str += "<button "
                                                + "style='height: 25px; width: 25px; float: left; padding: 0px;'"
                                                + "onclick='window.ontando_bonusTabs_changeOption(" + i + ", " + j + ", jQuery(\"#ontando_bonusTabs_moduleOptions_e" + i + "_c" + j + "\").val() - 1)' "
                                                + "class='btn btn-info'"
                                        + ">"
                                            + "-"
                                        +"</button>";
                                    str += "<input "
                                                + "id='ontando_bonusTabs_moduleOptions_e" + i + "_c" + j + "' "
                                                + "style='height: 25px; width: 50px; float: left; margin: 0px 5px;' "
                                                + "class='form-control' "
                                                + "onblur='window.ontando_bonusTabs_changeOption(" + i + ", " + j + ", jQuery(\"#ontando_bonusTabs_moduleOptions_e" + i + "_c" + j + "\").val())' "
                                                + "value='" + h.getValue() + "' "
                                        + "/>";
                                    str += "<button "
                                                + "style='height: 25px; width: 25px; float: left; padding: 0px;'"
                                                + "onclick='window.ontando_bonusTabs_changeOption(" + i + ", " + j + ", jQuery(\"#ontando_bonusTabs_moduleOptions_e" + i + "_c" + j + "\").val() + 1)' "
                                                + "class='btn btn-info'"
                                        + ">"
                                            + "+"
                                        +"</button>";
                                break;
                                case ConfigType.BOOLEAN:
                                    str += "<span id='ontando_bonusTabs_moduleOptions_e" + i + "_c" + j + "'>"
                                        str += h.getValue() ? "enabled" : "disabled";
                                    str += "</span>"
                                    str += "<button style='height: 25px; width: 50px; float: right; padding: 0px;' onclick='window.ontando_bonusTabs_changeOption(" + i + ", " + j + ")' class='btn btn-info'>" 
                                            + "toggle"
                                        + "</bitton>";
                                break;
                                case ConfigType.KEY:
                                    str += "<input "
                                                + "id='ontando_bonusTabs_moduleOptions_e" + i + "_c" + j + "' "
                                                + "style='height: 25px; width: 45px; float: left; margin: 0px 5px;' "
                                                + "class='form-control' "
                                                + "onblur='window.ontando_bonusTabs_changeOption(" + i + ", " + j + ", jQuery(\"#ontando_bonusTabs_moduleOptions_e" + i + "_c" + j + "\").val())' "
                                                + "value='" + h.getValue() + "' "
                                        + "/>";
                                    str += "<button style='height: 25px; width: 50px; float: right; padding: 0px;' onclick='return false;window.ontando_bonusTabs_changeOption(" + i + ", " + j + ")' class='btn btn-info'>"
                                            + "change"
                                        + "</bitton>";
                                break;
                            }
                        str += '</div>'
                    + '</div>';
                }
                str += '</div>';
                $('#ontando_bonusTabs_moduleOptions_group').append(str);
                jQuery("#ontando_bonusTabs_moduleOptions_group > div").hide();
            }
        }
        window.ontando_bonusTabs_togleModule = function(id) {
            var m = modules[id];
            m.togleState();
            $("#ontando_bonusTabs_moduleList_e" + id).html(m.willEnabled == m.enabled ? (!m.willEnabled ? "Enable" : "Disable") : (m.willEnabled ? "Will Enabled" : "Will Disabled"));
        };
        
        window.ontando_bonusTabs_selectModule = function(id) {
            jQuery("#ontando_bonusTabs_moduleOptions_group > div").hide();
            jQuery("#ontando_bonusTabs_moduleOptions_e" + id).show();
        };
        
        window.ontando_bonusTabs_changeOption = function (mid, oid, value) {
            var m = modules[mid];
            var h = m.moduleConfig.handlers[oid];
            switch (h.type) {
                case ConfigType.STRING:
                    h.setValue(value);
                    jQuery("#ontando_bonusTabs_moduleOptions_e" + mid + "_c" + oid).val(h.getValue());
                break;
                case ConfigType.INTEGER:
                    h.setValue(value);
                    jQuery("#ontando_bonusTabs_moduleOptions_e" + mid + "_c" + oid).val(h.getValue());
                break;
                case ConfigType.BOOLEAN:
                    h.setValue(!h.getValue());
                    jQuery("#ontando_bonusTabs_moduleOptions_e" + mid + "_c" + oid).html(h.getValue() ? "enabled" : "disabled");
                break;
                case ConfigType.KEY:
                    h.setValue(value);
                    jQuery("#ontando_bonusTabs_moduleOptions_e" + mid + "_c" + oid).val(h.getValue());
                break;
            }
        }
    }
});
