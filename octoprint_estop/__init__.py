# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin

class EstopPlugin(octoprint.plugin.AssetPlugin,
                     octoprint.plugin.TemplatePlugin):

	def get_assets(self):
		return dict(
			js=["js/estop.js"],
			css=["css/estop.css"]
		)
	def get_template_configs(self):
		return [
			dict(type="sidebar", name="Emergency STOP!", icon="fa icon-print", template="estop_sidebar.jinja2", styles=["display: none"], data_bind="visible: loginState.isUser")
			]
            
    def get_update_information(self):
		
		return dict(
			skeleton=dict(
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