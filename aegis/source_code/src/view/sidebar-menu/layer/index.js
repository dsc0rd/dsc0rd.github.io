import React from 'react'

import PencilIcon from '../../../res/edit.svg'

import EyeIconHidden from '../../../res/view-1.svg'
import EyeIconVisible from '../../../res/view.svg'

import MoreIcon from '../../../res/more-1.svg'

import { connect } from 'react-redux'

import store from '../../../redux/store.js'

import {sendEditorTitle, toggleEditorState} from '../../../redux/actions/editor'


const toProps = state => ({
  mapObject: state.commonReducer.mapObject,
  editorState: state.commonReducer.editorState
})

class Layer extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      icon: this.props.icon,
      name: this.props.name,
      layer: this.props.layer
    }
  }

  toggleLayerVisibility(){
    var visibility = this.props.mapObject.getLayoutProperty(this.state.layer, 'visibility');

    if (visibility === 'visible' || visibility === undefined) {
      this.props.mapObject.setLayoutProperty(this.state.layer, 'visibility', 'none');
      this.setState({...this.state, visibility: false})
    } else {
      this.props.mapObject.setLayoutProperty(this.state.layer, 'visibility', 'visible');
      this.setState({...this.state, visibility: true})
    }
  }

  toggleLayerEditor(){
    this.props.sendEditorTitle(this.state.layer)
    this.props.toggleEditorState(!this.props.editorState)
  }

  render(){

    let vis = this.props.mapObject.getLayoutProperty(this.state.layer, 'visibility')


    console.log('visibility for', this.state.layer, 'is', vis);

    return(
      <>
      <div className='layerButton'>
        <div className='layerType'>
        <img src={this.state.icon}/>
        </div>
        <p className="layerName">{this.state.name}</p>
        <div className="layerEditButton">
          <img src={PencilIcon}/>
        </div>
        <div className='layerVisibilityButton' onClick={()=>
            this.toggleLayerVisibility()
          }>
          <img src = {vis==='visible' || vis===undefined ? EyeIconVisible: EyeIconHidden}/>
        </div>
        <div className="layerParamsButton" onClick={()=>
            this.toggleLayerEditor()
          }>
          <img src={MoreIcon}/>
        </div>
      </div>
      </>
    )
  }
}


export default connect(toProps, {sendEditorTitle, toggleEditorState})(Layer);
