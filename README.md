<h1 align="center">Launchpad MKII midi canvas experiment</h1>

This is an experiment used as a POC wich use webmidi to control the Novation Launchpad MKII.

![LP](http://maxlab.fr/img/LP.jpg)

## What it does ##
This boilerplate allows you to **experiment quickly** and focus on your project rather than loose time to configure it.

It follows the patterns described in [this tutorial](https://cesiumjs.org/2016/01/26/Cesium-and-Webpack/#using-the-source) to setup a minimal working environment and add some tasks to improve your workflow.

You get a functionnal and distributable cesium application with a unique entry point.

## How to use it ##

```
git clone https://github.com/maxdow/launchpad-canvas-experiment
cd launchpad-canvas-experiment
npm install
npm start
```

Then open localhost:3000 and connect your launchpad . You can draw on it as a 8x8 canvas .

:warning: don't use it as this! The Component made with react is tightly coupled and there is no API design for the launchpad lib.