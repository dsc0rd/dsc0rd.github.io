import React from 'react'

import MoreIcon from '../../../res/more-1.svg'

class CatalogItem extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      icon: this.props.icon,
      name: this.props.name,
      desc: this.props.desc
    }
  }

  render () {

  //TODO Add Onclick

    return(<>
      <div className="catalogItem">
        <img className="catalogItemImage" src={this.state.icon}/>
        <div className="catalogDataContainer">
          <p className="catalogItemName">{this.state.name}</p>
          <div className="catalogMoreButton">
            <img src={MoreIcon}/>
          </div>
        </div>
        <p className="catalogItemDescription">{this.state.desc}</p>
      </div>
    </>)
  }
}

export default CatalogItem;
