import React from 'react'

class Instrument extends React.Component {

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
      <div className="instrument">
        <img src={this.state.icon} className="instrumentIcon"/>
        <div className="instrumentTextContainer">
          <p className="instrumentName">{this.state.name}</p>
          <p className="instrumentDescription">{this.state.desc}</p>
        </div>
      </div>
    </>)
  }
}

export default Instrument;
