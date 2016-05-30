
export function searchForLaunchpad({inputs,outputs}){

  const LaunchpadInput = inputs.find((MIDIInput)=>MIDIInput.name.includes("Launchpad MK2"));
  const LaunchpadOutput = outputs.find((MIDIOutput)=>MIDIOutput.name.includes("Launchpad MK2"));

  return LaunchpadInput && LaunchpadOutput ? {input:LaunchpadInput,output:LaunchpadOutput} : null ;

}

export function portsFromWebMidi(midiAccess){
  return {
    inputs : [...midiAccess.inputs.values()],
    outputs : [...midiAccess.outputs.values()]
  }
}

export default function LaunchpadMK2(input,output,debug=false) {

  const _debug = debug;

  //set session mode
  send([240,0, 32, 41, 2, 24, 34, 0,247]);

  input.onmidimessage = function(message){
    console.log("input =>",message.data);
  }

  function send(value){
    if(_debug){
      console.log("send => ",value);
    }

    output.send(value);
  }

  this.clear = () => {
    send(lightAll(0));
    return this;
  }

  this.setLightTopBar = (buttonNumber,color) => {
    if(buttonNumber>7) {
      buttonNumber = 7;
    }
    send([176, 104+buttonNumber, color]);
    return this;
  }

  this.setLightRightBar = (buttonNumber,color) => {
    if(buttonNumber>7) {
      buttonNumber = 7;
    }
    send([144, 19+10*buttonNumber, color]);
    return this;
  }

  this.setLightOn = (row,column,color) => {
    send([240, 0, 32, 41, 2, 24, 10, row*10 + 11 + column, color, 247]);
    return this;
  }

  this.setPulse = (row, column, color) => {
    send([146, row*10 + 11 + column, color]);
    return this;
  }
  this.setFlash = (row, column, color) => {
    send([145, row*10 + 11 + column,color]);
    return this;
  }
}

function lightAll(color) {
  return [240, 0, 32, 41, 2, 24, 14, color,247]
}