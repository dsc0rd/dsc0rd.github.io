import React from 'react';
import SidebarMenu from './view/sidebar-menu'
import Map from './view/map'
import './App.css';

import { Provider } from 'react-redux'
import store from './redux/store'

class App extends React.Component{

  render(){
    return (
      <Provider store={store}>
        <div>
          <SidebarMenu/>
          <Map/>
        </div>
      </Provider>
    )
  }
}

export default App;
