---
layout: plugin

id: estop
title: Emergency STOP! button
description: Adds an emergency stop (gcode M112) button to the sidebar.
author: ntoff
license: AGPLv3

date: 2017-03-23

homepage: https://github.com/ntoff/OctoPrint-Estop
source: https://github.com/ntoff/OctoPrint-Estop
archive: https://github.com/ntoff/OctoPrint-Estop/archive/master.zip

follow_dependency_links: false

tags:
- emergency stop
- M112


screenshots:
- /assets/img/plugins/estop/enabled.PNG
  alt: enabled
  caption: Enabled (logged in and operational)
- /assets/img/plugins/estop/disabled.PNG
  alt: disabled
  caption: Disabled (logged out or non operational)


featuredimage: /assets/img/plugins/estop/enabled.PNG

compatibility:
  octoprint:
  - 1.2.0

  
  os:
  - linux
  - windows
  - macos
---

Adds a nice big emergency stop button that sends M112 to the printer in the case of an emergency.