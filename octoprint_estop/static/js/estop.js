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
        self.estopReconnect = ko.observable(false);
        self.emergencyCalled = ko.observable(false);

        self.enableEstop = ko.pureComputed(function() {
            return self.printerState.isOperational() && self.loginState.isUser();
        });

        self.estopState = ko.pureComputed(function() {
            return self.loginState.isUser() > 0 ? "estop_sidebar" : "estop_sidebar_disabled";
        });
        
        self.reconnect = ko.pureComputed(function() {
            return self.estopReconnect() && self.emergencyCalled();
            
        })

        self.buttonText = ko.pureComputed(function() {
            if (self.enableEstop()) {
                return gettext("EMERGENCY STOP"); 
            } 
            else if (self.reconnect()) {
                return gettext("Reconnecting...")
            }
            else if (!self.enableEstop()) {
                return gettext("Offline"); 
            }
            else {
                return gettext("Unknown Status");
            }
        });

        self.buttonTitle = ko.pureComputed(function() {
            self.estopCommand(self.settings.settings.plugins.estop.estopCommand());
            return gettext("Sends " + self.estopCommand() + " to the printer IMMEDIATELY");
        });

        self.onBeforeBinding = function () {
            self.updateSettingsValues();
        }
        self.onSettingsHidden = function () {
            self.updateSettingsValues();
        }

        self.updateSettingsValues = function () {
            self.estopCommand(self.settings.settings.plugins.estop.estopCommand());
            self.estopReconnect(self.settings.settings.plugins.estop.estopReconnect());
        }
        
        self.sendEstopCommand = function () {
            if (self.enableEstop()) {
                self.estopCommand(self.settings.settings.plugins.estop.estopCommand());
                OctoPrint.control.sendGcode(self.estopCommand());
                
                if (self.estopReconnect()) {
                    self.emergencyCalled(true);
                    OctoPrint.connection.disconnect();
                    self.onEventDisconnected = function () {
                        self.timedReconnect = setTimeout(function() {
                            self.emergencyCalled(false);
                            delete self.onEventDisconnected;
                            OctoPrint.connection.connect();
                                
                        }, 3*1000); //3 seconds
                    }
                }
            }
        }
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
