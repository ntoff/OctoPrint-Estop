# Emergency Stop

Add a big ugly emergency stop to your sidebar. It's big, it's yellow, it's red, it's impossible to miss. That's the point.

## THIS BUTTON DOES NOT CONFIRM BEFORE SENDING! 

That's the point of an EMERGENCY stop!

![](/extras/assets/img/plugins/estop/enabled.PNG)
## Setup

Install via the bundled [Plugin Manager](https://github.com/foosel/OctoPrint/wiki/Plugin:-Plugin-Manager)
or manually using this URL:

    https://github.com/ntoff/OctoPrint-Estop/archive/master.zip

## Position

Once installed, you may wish to move the button to the top of the sidebar, you can do so by modifying the [config.yaml](http://docs.octoprint.org/en/master/configuration/config_yaml.html) file as follows:

Find the "appearance" section, and add the plugin to the top of the sidebar order. If no other components have been previously rearranged, you may end up with only the plugin in the order list, this  is fine, you don't need to add every item to the list (not adding them  won't stop them from showing up).

	appearance:
	  color: violet
	  components:
		order:
		  sidebar:
		  - plugin_estop

Please note: White spaces are critical inside the config.yaml file, special care must be taken when adding or removing entries that the correct layout is maintained. For more information on config.yaml and its appearance section, see here: http://docs.octoprint.org/en/master/configuration/config_yaml.html#appearance
