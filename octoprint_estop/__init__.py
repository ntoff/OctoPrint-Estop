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
			dict(type="sidebar", name="Emergency STOP!", icon="fa fa-times", template="estop_sidebar.jinja2", styles=["display: none"], data_bind="visible: loginState.isUser")
			]
        
__plugin_name__ = "Emergency Stop Button"
__plugin_implementation__ = EstopPlugin()

	