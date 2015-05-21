// ==UserScript==
// @name         agario_bonus-tabs
// @namespace    ontando.io.agar
// @version      0.1
// @description  Adar.io Bonus tabs with data
// @author       ontando (angal)
// @match        agar.io
// @grant        GM_setClipboard
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==
if (!unsafeWindow.install) {
    unsafeWindow.install = [];
}

unsafeWindow.install.push(["ontando", "bonus-tabs", function() {
    jQuery("body").prepend(
        '<div style="position: absolute; left: 0px; right: 0px; top: 0px; z-index: 3; display: block;">'
        + '<div style="height: 50px; width: 500px; margin: 3px auto;">'
        + '<div style="height: 50px; width: 240px; float:left; background-color: #FFFFFF; margin: 0px 5px; border-radius: 15px; padding: 5px 15px 5px 15px;">'
        + 'Ontando Blobster mod | Version : ' + this.version.main + ' (' + this.version.script + ')'
        + '<br /> '
        + '</div>'
        + '<div style="height: 50px; width: 240px; float:left; background-color: #FFFFFF; margin: 0px 5px; border-radius: 15px; padding: 5px 15px 5px 15px;">'
        + 'IP: <b id="angal_server">None</b> <br /> '
        + '<a id="angal_server_reconnect">Reconnect</a> || <a id="angal_server_change">Change</a> || <a id="angal_server_copy">Copy</a>'
        + '</div>'
        + '</div>'
        + '</div>'
    );
    jQuery("#helloDialog").prepend(
        '<div style="height: 1px; position: absolute; left: 0px; right: 0px; top: 0px; z-index: 1; display: block;">'
          + '<div style="height: 1px; width: 950px; margin: 100px auto;">'
            + '<div style="height: 50px; width: 200px; float:left; background-color: #FFFFFF; margin: 0px 5px; border-radius: 15px; padding: 5px 15px 5px 15px;">'
              + 'Agar.io client by <br /><b>angal</b> and <b>DiaLight</b>'
            + '</div>'
          + '</div>'
        + '</div>'
       
        + '<div style="height: 1px; position: absolute; left: 0px; right: 0px; top: 0px; z-index: 1; display: block;">'
          + '<div style="height: 1px; width: 950px; margin: 100px auto;">'
            + '<div style="height: 500px; width: 250px; float:right; background-color: #FFFFFF; margin: 0px 5px; border-radius: 15px; padding: 5px 15px 5px 15px;">'
              + 'Last servers: <br /> '
              + '<ol id="angal_serverList"></ol>'
            + '</div>'
          + '</div>'
        + '</div>'
    );
    jQuery("#angal_server_copy").click(function() {
        GM_setClipboard(unsafeWindow.angal_data.server.name, "text");
    });
    jQuery("#angal_server_change").click(function() {
        var name = prompt("Server Ip:", unsafeWindow.angal_data.server.name);
        if (name == null) {
            return;
        }
        unsafeWindow.angal_connectDirect(name);
    });
    jQuery("#angal_server_reconnect").click(function() {
        unsafeWindow.angal_connectDirect(unsafeWindow.angal_data.server.name);
    });
}]);
