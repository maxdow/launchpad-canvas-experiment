<h1 align="center">Launchpad MKII midi canvas experiment</h1>

This is an experiment used as a POC wich use webmidi to control the Novation Launchpad MKII.

![LP](http://maxlab.fr/img/LP.jpg)

## How to use it ##

Play with the [**DEMO**](https://maxdow.github.io/launchpad-canvas-experiment/)

Or

```
git clone https://github.com/maxdow/launchpad-canvas-experiment
cd launchpad-canvas-experiment
npm install
npm start
```

Then open localhost:3000 and connect your launchpad . You can draw on it as a 8x8 canvas .

:warning: don't use it as this! The Component made with react is tightly coupled and there is no API design for the launchpad lib.
