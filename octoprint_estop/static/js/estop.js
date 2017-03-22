/*
 * Author: ntoff
 * License: AGPLv3
 */
$(function() {
    function EstopViewModel(parameters) {
        var self = this;
		//see if we're logged in and the printer is operational (for en/disable of button)
        self.loginState = parameters[0];
        self.printerState = parameters[1];
 		
		self.enableEstop = ko.pureComputed(function() {
            return self.printerState.isOperational() && self.loginState.isUser();
        });
		
		self.sendEstopCommand = function () {
			if (self.enableEstop()) {
				OctoPrint.control.sendGcode("M112"); 
			};
        };
    }

	OCTOPRINT_VIEWMODELS.push({
        construct: EstopViewModel,
        dependencies: [
			"loginStateViewModel", 
			"printerStateViewModel",
			],
        elements: ["#sidebar_plugin_estop"]
    });
});
