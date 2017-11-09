/*
 * Author: ntoff
 * License: AGPLv3
 */
$(function() {
    function EstopViewModel(parameters) {
        var self = this;
		
        self.loginState = parameters[0];
        self.printerState = parameters[1];
        self.settings = parameters[2];

        self.estopCommand = ko.observable("M112");

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

        self.buttonTitle = ko.pureComputed(function() {
            self.estopCommand(self.settings.settings.plugins.estop.estopCommand());
            return gettext("Sends " + self.estopCommand() + " to the printer IMMEDIATELY");
        });

        self.onBeforeBinding = function () {
            //self.estopCommand(self.settings.settings.plugins.estop.estopCommand());
        }
		self.sendEstopCommand = function () {
			if (self.enableEstop()) {
                self.estopCommand(self.settings.settings.plugins.estop.estopCommand());
                OctoPrint.control.sendGcode(self.estopCommand());
			};
        };
    }

	OCTOPRINT_VIEWMODELS.push({
        construct: EstopViewModel,
        dependencies: [
			"loginStateViewModel", 
			"printerStateViewModel",
			"settingsViewModel"],
        elements: ["#sidebar_plugin_estop_wrapper"]
    });
});
