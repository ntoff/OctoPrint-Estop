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
		return [dict(type="sidebar", name="Emergency STOP!", icon="fa fa-times")]
        
__plugin_name__ = "Emergency Stop Button"

def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = EstopPlugin()

	