/*
 * Author: ntoff
 * License: AGPLv3
 */
$(function() {
    function EstopViewModel(parameters) {
        var self = this;
		
        self.loginState = parameters[0];
        self.printerState = parameters[1];

		self.enableEstop = ko.pureComputed(function() {
            return self.printerState.isOperational() && self.loginState.isUser();
        });

        self.estopState = ko.pureComputed(function() {
            return self.loginState.isUser() > 0 ? "estop_sidebar" : "estop_sidebar_disabled";
        });

        self.buttonText = ko.pureComputed(function() {
            if (self.enableEstop()) {
                return gettext("EMERGENCY STOP"); 
            } else {
                return gettext("Offline"); 
            }
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
        elements: ["#sidebar_plugin_estop_wrapper"]
    });
});
