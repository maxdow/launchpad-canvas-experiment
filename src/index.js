import React from "react";
import ReactDOM from "react-dom"
import App from "./app.component.js"


if(navigator.requestMIDIAccess){
    connect()
    .then(connectLaunchpad,(err) => ReactDOM.render(err,document.getElementById("root")))
} else {
    ReactDOM.render("your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim",document.getElementById("root"))
}



function connect(){
    return navigator.requestMIDIAccess({ sysex: true })
    .then(
        (midiAccess) => midiAccess,
        (error) => "No access to MIDI devices " + error
    );
}




function connectLaunchpad(midiAccess){
    ReactDOM.render(<App midiAccess={midiAccess}/>,document.getElementById("root"))
}





/*


function testpulse(){

}

function getRandomColor(){
    return  Math.floor(Math.random() * colors.length) ;
}

function testColors(Launchpad){
    var row = 0 ;
    var column = 0 ;



    function go(){
        if(column<8){
            Launchpad.setLightOn(row,column,getRandomColor());
            row= row+1;
            if(row>7){
                row = 0;
                column = column+1;
            }
            setTimeout(() => go(),50)
        }
    }
    go();
}

function play(Launchpad) {
    console.log("play");

    Launchpad.clear();

    var row = 0 ;
    var column = 0 ;

    function go(){
        if(column<8){
            Launchpad.setLightOn(row,column,127);
            row= row+1;
            if(row>7){
                row = 0;
                column = column+1;
            }
            setTimeout(() => go(),50)
        } else {
            row = column = 0;
            go2()
        }
    }

    function go2(){
        if(row<8){
            Launchpad.setFlash(row,column,40);
            column++;
            if(column>7){
                column = 0;
                row++;
            }
            setTimeout(() => go2(),Math.floor(Math.random() * 10) + 50  )
        } else {
            testColors(Launchpad);
        }
    }


    go();
}

*/