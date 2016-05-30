/*'use strict';
const Launchpad = require( 'launchpad-mini' ),
      pad = new Launchpad();

pad.connect().then( () => {     // Auto-detect Launchpad
    pad.reset( 2 );             // Make Launchpad glow yellow
    pad.on( 'key', k => {
        pad.col( pad.red, k );  // Turn on buttons on press
    } );
} );*/

var midi = require('midi');

// Set up a new input.
var input = new midi.input();
var launch = new midi.output();

// Count the available input ports.
var i = input.getPortCount()

for(a=0;a<i;a++){
  console.log(input.getPortName(a));
}

launch.openPort(1);

input.openPort(6);

// Configure a callback.
input.on('message', function(deltaTime, message) {
  // The message is an array of numbers corresponding to the MIDI bytes:
  //   [status, data1, data2]
  // https://www.cs.cf.ac.uk/Dave/Multimedia/node158.html has some helpful
  // information interpreting the messages.
  console.log('m:' + message + ' d:' + deltaTime);
  launch.sendMessage(message);
});
