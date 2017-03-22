/*
 * Author: ntoff
 * License: AGPLv3
 */
$(function() {
    function EstopViewModel(parameters) {
        var self = this;
		//see if we're logged in and the printer is operational (for en/disable of button)
        self.loginState = parameters[0];
        self.terminal = parameters[1];
        
		self.sendEstopCommand = function () {
            OctoPrint.control.sendGcode("M112"); //should this ever be a variable? M112 universal?
        };
    }

	OCTOPRINT_VIEWMODELS.push({
        construct: EstopViewModel,
        dependencies: [
			"loginStateViewModel", 
			"terminalViewModel",
			],
        elements: ["#sidebar_plugin_estop"]
    });
});
