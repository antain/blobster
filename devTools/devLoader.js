
(function () {

    function load() {
        if (!window.ontando_scriptLoader) {
            setTimeout(load, 500);
        } else {
            var loadRemoteAsync = window.ontando_scriptLoader.loadRemoteAsync;

            // Loading tools
            loadRemoteAsync("devTools/loaderConfig.js");
        }
    }

    $(document).ready(load);

})();
