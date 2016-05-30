import React,{Component} from "react"

import LaunchpadMK2 , {searchForLaunchpad,portsFromWebMidi} from "./launchpadmk2.js"

import colors from "./colors";
import times from "lodash.times";
import update from "react-addons-update"

import "./style.css";

const Status = ({launchpad}) => {
  console.log(launchpad);
  const text = launchpad ? `launchpad found on port ${launchpad.input.id}` : "no launchpad MK2 found";
  return (
    <div className="status">
      <h3>Status : </h3>
      <div>{text}</div>
    </div>
    )
}


class Grid extends Component {
  constructor(props){
    super(props);
    this.isDraw = false;
  }
  handleRightClick(pad,e){
    e.preventDefault();
    this.props.onErase(pad);
  }
  handlePadChange(pad){
    this.isDraw = true;
    this.props.onChange(pad)
  }
  render(){
    const {grid} = this.props;
    return <div className="grid">
            {grid.map((row,ir)=>(
              <div className="row" key={ir} onMouseUp={() => this.isDraw = false}>
              {row.map((pad,ip)=><div className="pad" key={ip}
                style={{backgroundColor:`rgb(${colors[pad.color].join(",")})`}}
                onMouseDown={this.handlePadChange.bind(this,pad)}
                onMouseOver={() => this.isDraw ? this.props.onChange(pad) : null}
                onContextMenu={this.handleRightClick.bind(this,pad)}
                >
                </div>
              )}
              </div>
            ))}
          </div>
  }
}

const ColorPicker = ({onSelect, currentColorIndex}) => (
  <div className="colorpicker">
    {colors.map((color,i) => <div key={i} className={"coloritem" + (currentColorIndex === i ? " coloritem--selected" : "")}
      style={{backgroundColor:`rgb(${color.join(",")})`}}
      onClick={() => onSelect(i)}
      ></div>)}
  </div>
)

export default class App extends Component {
  constructor(props){
    super(props);


    const launchpadMIDIPorts = searchForLaunchpad(portsFromWebMidi(this.props.midiAccess));
    this.state = {
      grid : times(8).map((row) => times(8).map((column) => ({row:7-row,column,color:3}))),
      currentColorIndex : 3,
      launchpad : launchpadMIDIPorts ? new LaunchpadMK2(launchpadMIDIPorts.input,launchpadMIDIPorts.output,true) : null,
      launchpadMIDIPorts
    }

  }
  componentWillMount(){

    this.props.midiAccess.onstatechange = () => {
      const launchpadMIDIPorts = searchForLaunchpad(portsFromWebMidi(this.props.midiAccess));
      this.setState({
        grid : times(8).map((row) => times(8).map((column) => ({row:7-row,column,color:3}))),
        currentColorIndex : 3,
        launchpad : launchpadMIDIPorts ? new LaunchpadMK2(launchpadMIDIPorts.input,launchpadMIDIPorts.output,true) : null,
        launchpadMIDIPorts
      });
    }
  }

  handleClear(){
    this.state.launchpad.clear()
    this.setState({
      grid : times(8).map((row) => times(8).map((column) => ({row:7-row,column,color:3}))),
    })
  }

  handlePadChange(pad,erase = false){
    console.log(pad);
    this.state.launchpad.setLightOn(pad.row,pad.column,erase ? 0 : this.state.currentColorIndex);
    this.setState(update(this.state,{
      grid : { [7-pad.row] : { [pad.column] : {color : {$set: erase ? 3 : this.state.currentColorIndex}}}}
    }));
  }

  render(){
    return <div className="launchpad-sketch">
            <Status launchpad={this.state.launchpadMIDIPorts} />
            {this.state.launchpad ? <div>
              <button onClick={() => this.handleClear()}>Clear</button>
              <button onClick={() => times(8,(i) => this.state.launchpad.setLightTopBar(i,this.state.currentColorIndex))}>Turn on top bar</button>
              <button onClick={() => times(8,(i) => this.state.launchpad.setLightRightBar(i,this.state.currentColorIndex))}>Turn on right bar</button>
              <div>
                <Grid grid={this.state.grid} onErase={(pad) => this.handlePadChange(pad,true)} onChange={(pad) => this.handlePadChange(pad)}/>
                <ColorPicker currentColorIndex={this.state.currentColorIndex} onSelect={(colorIndex) => this.setState({currentColorIndex:colorIndex})}/>
              </div>
            </div> : null}
          </div>
  }
}