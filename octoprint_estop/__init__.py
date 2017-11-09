# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin

class EstopPlugin(octoprint.plugin.StartupPlugin,
				octoprint.plugin.AssetPlugin,
				octoprint.plugin.TemplatePlugin,
				octoprint.plugin.SettingsPlugin):

	def get_settings_defaults(self):
		return dict(estopCommand = "M112")

	def on_after_startup(self):
		self.estopCommand = self._settings.get(["estopCommand"])
		if (self.estopCommand != "M112"):
			self._logger.warn("WARNING! EMERGENCY STOP COMMAND HAS BEEN CHANGED FROM DEFAULT \"M112\" TO \"" + self.estopCommand + "\"")

	def get_assets(self):
		return dict(
			js=["js/estop.js"],
			css=["css/estop.css"]
		)
	def get_template_configs(self):
		return [
			dict(type="sidebar", name="Emergency STOP!", icon="fa fa-print", template="estop_sidebar.jinja2", styles=["display: none"], data_bind="visible: loginState.isUser"),
			dict(type="settings", name="E-Stop Settings", template="estop_settings.jinja2", custom_bindings=False)
			]

	def get_update_information(self):
		return dict(
			estop=dict(
				displayName="Emergency Stop Button",
				displayVersion=self._plugin_version,

				# version check: github repository
				type="github_release",
				user="ntoff",
				repo="OctoPrint-Estop",
				current=self._plugin_version,

				# update method: pip
				pip="https://github.com/ntoff/OctoPrint-Estop/archive/{target_version}.zip"
			)
		)

__plugin_name__ = "Emergency Stop Button"

def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = __plugin_implementation__ = EstopPlugin()

	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
	}