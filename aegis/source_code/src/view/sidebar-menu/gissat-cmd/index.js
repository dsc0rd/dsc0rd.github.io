import React from 'react'

import RunCommand from '../../../res/paper-plane-1.svg'

import MoreIcon from '../../../res/more-1.svg'

import { connect } from 'react-redux'

import store from '../../../redux/store.js'

import {sendCustomMessage} from '../../../redux/actions/gissat'


const toProps = state => ({
  mapObject: state.commonReducer.mapObject,
  editorState: state.commonReducer.editorState
})

class GissatCommand extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      icon: this.props.icon,
      name: this.props.name,
      command: this.props.command
    }
  }

  callGissat(command, args){
    let link = "http://localhost:3001/run?"

    link+= command!=""&&command!=undefined?"c="+command:""
    link+= args!=""&&args!=undefined?"a="+args:""
    fetch(link)
    .then(res=>res.json())
    .then(res=>{
      this.props.sendCustomMessage(res.title[0], res.content)
    });
  }


  render(){
    return(
      <>
      <div className='layerButton'>
        <div className='layerType'>
        <img src={this.state.icon}/>
        </div>
        <p className="layerName">{this.state.name}</p>
        <div className="layerEditButton" onClick={()=>{
          this.callGissat(this.state.command, "")
        }}>
          <img src={RunCommand}/>
        </div>
      </div>
      </>
    )
  }
}


export default connect(toProps, {sendCustomMessage})(GissatCommand);
