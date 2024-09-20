import React from 'react'
import UserIcon from '../../res/user.svg'
import LayersIcon from '../../res/layers.svg'
import InstrumentsIcon from '../../res/instruments.svg'
import NeuralIcon from '../../res/neural_network.svg'
import CatalogIcon from '../../res/catalog.svg'
import InfoIcon from '../../res/info.svg'
import ShareIcon from '../../res/share-1.svg'
import PropertiesIcon from '../../res/props.svg'
import BackIcon from '../../res/back.svg'
import PlusIcon from '../../res/add-1.svg'

import PencilIcon from '../../res/edit.svg'
import EyeIcon from '../../res/view.svg'
import MoreIcon from '../../res/more-1.svg'

import PolygonIcon from '../../res/polygon.svg'
import PolylineIcon from '../../res/Polyline.svg'
import PointIcon from '../../res/wireless-internet.svg'

import BufferIcon from '../../res/map-location.svg'
import IsochroneIcon from '../../res/network.svg'
import AggregateIcon from '../../res/route.svg'
import GeomIcon from '../../res/layers-1.svg'
import PlaceholderImage from '../../res/locked.svg'

import Menu3Image from '../../res/menu-3.svg'
import HelpIcon from '../../res/help.svg'

import Layer from './layer/'
import Instrument from './instrument'
import CatalogItem from './catalog-item'
import GissatCommand from './gissat-cmd'

import { connect } from 'react-redux'

import store from '../../redux/store.js'

import {toggleEditorState} from '../../redux/actions/editor'
import {toggleViewerState} from '../../redux/actions/gissat'


const toProps = state => ({
  editorTitle: state.commonReducer.editorTitle,
  editorState: state.commonReducer.editorState,
  viewerState: state.commonReducer.viewerState,
  customMessage: state.commonReducer.customMessage
})

class SidebarMenu extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        isDrawerOpen: false,
        isCabinetOpen: false,
        isEditorOpen: this.props.editorState,
        viewerState: this.props.viewerState,
        currentCustomMessageTitle: "",
        currentCustomMessageContent: ""
      }

      this.PHD = {
        user: {
          headerTitleText: "User drawer",
          headerDescriptionText: "user DraWsErD test test hahahahah"
        },
        layers: {
          headerTitleText: "Map name",
          headerDescriptionText: "description",
          content:  [
            (<>
              <div className='contentHeader'>
                <p className="contentName">Слои</p>
                <div className='newLayerButton'>
                  <img src={PlusIcon}/>
                </div>
              </div>
              <div className='contentContainer'>
                <Layer icon={PolygonIcon} name={"Полигональный слой"} layer="osm_poly"/>
                <Layer icon={PointIcon} name={"Точечный слой"} layer="osm_point" />
                <Layer icon={PolylineIcon} name={"Линейный слой"} layer="osm_roads" />
              </div>
              </>
            )
          ]
        },
        instruments: {
          headerTitleText: "Map name",
          headerDescriptionText: "Desc text",
          content: [
            (<>
              <div className="contentHeader">
                <p className="contentName">Инструменты</p>
              </div>
              <div className="contentContainer">
                <Instrument icon={BufferIcon} name={"Построить буфер"} desc={"Строит буферную зону вокруг объекта"}/>
                <Instrument icon={IsochroneIcon} name={"Построить изохроны"} desc={"Строит зону транспортной доступности"}/>
                <Instrument icon={AggregateIcon} name={"Аггрегировать данные"} desc={"Строит буферную зону вокруг объекта"}/>
                <Instrument icon={GeomIcon} name={"Выборка геометрии"} desc={"Выборка точек из пересекающихся полигонов"}/>
              </div>
            </>)
          ]
        },
        neural: {
          headerTitleText: "Neural Network drawer",
          headerDescriptionText: "qiwe",
          content: [
            (
              <>
                <div className="contentHeader">
                  <div className="toggleGSViewerButton" onClick={()=>{
                      this.props.toggleViewerState()
                    }}>
                    <img src={Menu3Image} alt="toggle neural network content viewer"></img>
                  </div>
                </div>

                <div className='contentContainer'>
                  <GissatCommand icon={HelpIcon} name={"Помощь"} command="info" />
                </div>
              </>
            )
          ]
        },
        catalog: {
          header: [
            (<>
              <div className="catalogHeader">
                <div className="catalogNav">
                  <p className="catalogNavItem">Проекты</p>
                  <p className="catalogNavItem">Данные</p>
                  <p className="catalogNavItem">Магазин</p>
                </div>
                <div className="catalogTools">
                  <input type="text" placeholder="Search.."/>
                  <div className="catalogButtonNewItem">Новый проект</div>
                </div>
              </div>
            </>)
          ],
          content: [
            (<>
              <div className="catalogContent">
                <div className="catalogGrid">
                  <CatalogItem icon={PlaceholderImage} name={"Карта ЛЭП"} desc={"Карта содержит полилинии ЛЭП и аттрибутивную информацию к столбам"}/>
                  <CatalogItem icon={PlaceholderImage} name={"Карта ЛЭП"} desc={"Карта содержит полилинии ЛЭП и аттрибутивную информацию к столбам"}/>
                  <CatalogItem icon={PlaceholderImage} name={"Карта ЛЭП"} desc={"Карта содержит полилинии ЛЭП и аттрибутивную информацию к столбам"}/>
                  <CatalogItem icon={PlaceholderImage} name={"Карта ЛЭП"} desc={"Карта содержит полилинии ЛЭП и аттрибутивную информацию к столбам"}/>
                </div>
              </div>
            </>)
          ]
        }
      }
      this.buttons = {
        user: {
          action: () => {
            this.setDrawerData(true, this.PHD.user.headerTitleText, this.PHD.user.headerDescriptionText)
          },
          icon: UserIcon
        },
        layers: {
          action: () => {
            this.setDrawerData(true, this.PHD.layers.headerTitleText, this.PHD.layers.headerDescriptionText, this.PHD.layers.content)
          },
          icon: LayersIcon
        },
        instruments: {
          action: () => {
            this.setDrawerData(true, this.PHD.instruments.headerTitleText, this.PHD.instruments.headerDescriptionText, this.PHD.instruments.content)
          },
          icon: InstrumentsIcon
        },
        catalog: {
          action: () => {
            this.setCabinetData(true, this.PHD.catalog.header, this.PHD.catalog.content)
          },
          icon: CatalogIcon
        },
        neural: {
          action: () => {
            this.setDrawerData(true, this.PHD.neural.headerTitleText, this.PHD.neural.headerDescriptionText, this.PHD.neural.content)
          },
          icon: NeuralIcon
        },
        space: {
          size: 4
        },
        info: {
          action: () => {},
          icon: InfoIcon
        },
        about_us: {
          action: () => {}
          // icon: AboutIcon
        }
      }
      this.drawerHeaderButtons = [{
          icon: ShareIcon,
          name: "share",
          action: () => {}
        },
        {
          icon: PropertiesIcon,
          name: "props",
          action: () => {}
        },
        {
          icon: BackIcon,
          name: "back",
          action: () => {
            this.setDrawerData(false)
          }
        },
        {
          icon: MoreIcon,
          name: "more",
          action: () => {}
        }
      ]
    }

  setDrawerData(open, header, desc, content ) {
    this.setState({
      ...this.state,
      isDrawerOpen: open,
      isCabinetOpen: this.state.isCabinetOpen ? false : false,
      currentDrawerHeaderTitle: header,
      currentDrawerHeaderDescription: desc,
      currentDrawerContent: content
    })
  }

  setDrawerOpen(v){
    this.setState({
      ...this.state,
      isDrawerOpen: v
    })
  }

  setCabinetData(open, header, content){
    this.setState({
      ...this.state,
      isDrawerOpen: this.state.isDrawerOpen ? false : false,
      isCabinetOpen: open,
      currentCabinetHeader: header,
      currentCabinetContent: content
    })
  }


  render(){
    let buttons = []

    for(let key in this.buttons){
      let cur = this.buttons[key]
      if(cur.size)
        for (let s = 0; s < cur.size; s++)
            buttons.push(
            <div className="sidebarButton" onClick={cur.action} key={key}>
              <img src={cur.icon}/>
            </div>
          )
      else
        buttons.push(
          <div className="sidebarButton" onClick={cur.action}>
            <img src={cur.icon} alt={key}/>
          </div>
        )
    }

    const drawerClass = `drawer ${ this.state.isDrawerOpen ? "open" : "closed" }`;
    const cabinetClass = `cabinet ${ this.state.isCabinetOpen ? "open" : "closed" }`;
    const layerEditorClass = `layerEditor ${ this.props.editorState ? "open" : "closed"}`
    const gissatViewerClass = `customMessageBox ${this.props.viewerState ? "open" : "closed"}`

    const drawerHeaderButtons = []

    for(let k in this.drawerHeaderButtons){
      let cur = this.drawerHeaderButtons[k]
      drawerHeaderButtons.push(
        <div className="drawerHeaderButton" onClick={cur.action}>
          <img src={cur.icon} alt={k}/>
        </div>
      );
    }

    return (
      <>
        <div className='sidebarMenu'>
          <div className="buttonContainer">
            {buttons}
          </div>
        </div>
        <div className={drawerClass}>
          <div className='drawerHeader'>
          <div className='drawerHeaderTopContainer'>
            <p className='drawerHeaderTitle'>
              {this.state.currentDrawerHeaderTitle}
            </p>
            <div className='drawerHeaderButtonContainer'>
              {drawerHeaderButtons}
            </div>
          </div>
            <p className='drawerHeaderDescription'>
              {this.state.currentDrawerHeaderDescription}
            </p>
          </div>
          <div className='drawerContent'>
            {this.state.currentDrawerContent}
          </div>
        </div>
        <div className={cabinetClass}>
          <div className="cabinetHeader">
            {this.state.currentCabinetHeader}
          </div>
          <div className="cabinetContent">
            {this.state.currentCabinetContent}
          </div>
        </div>
        <div className={layerEditorClass}>
          <div className="layerEditorHeader">
            <p className="layerEditorHeaderTitle">
              Свойства слоя {this.props.editorTitle}
            </p>
            <div className="layerEditorCloseButton" onClick={()=>{
                this.toggleEditorState()
              }}>
            <img src={BackIcon} alt="close layer editor"/></div>
          </div>
          <div className="layerEditorContent">

          </div>
        </div>

        <div className={gissatViewerClass}>
          <p className="messageTitle">
            {this.props.customMessage.title}
          </p>
          <pre className="messageContent">
            {this.props.customMessage.content}
          </pre>
        </div>
      </>
    )
  }
}

export default connect(toProps, {toggleEditorState, toggleViewerState})(SidebarMenu)
