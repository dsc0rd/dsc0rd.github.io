import React from 'react'
import mapboxgl from 'mapbox-gl'

import { connect } from 'react-redux'
import {sendMapObject} from '../../redux/actions/mapObject'

const toProps = state => ({

})

class Map extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      lng: 71.43,
      lat: 51.15,
      zoom: 10
    }
  }

  componentDidMount() {

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [
        this.state.lng, this.state.lat
      ],
      zoom: this.state.zoom
    });

    this.props.sendMapObject(map)

    map.on('load', function() {
      map.addSource('osm_full', {
        'type': 'vector',
        'scheme': 'tms',
        'tiles': ["http://172.17.0.2:8080/geoserver/gwc/service/tms/1.0.0/sf:osm@EPSG:900913@pbf/{z}/{x}/{y}.pbf"],
        'minzoom': 0,
        'maxzoom': 22
      });

      map.addLayer({
        'id': 'osm_line',
        'type': 'line',
        'source': 'osm_full',
        'source-layer': 'planet_osm_line',
        'paint': {
          'line-opacity': 0.6,
          'line-color': 'rgb(53,175,109)'
        }
      });

      map.addLayer({
        'id': 'osm_poly',
        'type': 'fill',
        'source': 'osm_full',
        'source-layer': 'planet_osm_polygon',
        'paint': {
          'fill-opacity': 0.6,
          'fill-color': 'rgb(0,0,255)',
          'fill-outline-color': 'rgb(12,12,12)'
        }
      });

      map.addLayer({
        'id': 'osm_point',
        'type': 'circle',
        'source': 'osm_full',
        'source-layer': 'planet_osm_point',
        'paint': {
          'circle-opacity': 0.6,
          'circle-color': '#FFFFFF'
        },
        'minzoom': 13
      })

      map.addLayer({
        'id': 'osm_roads',
        'type': 'line',
        'source': 'osm_full',
        'source-layer': 'planet_osm_roads',
        'paint': {
          'line-opacity': 0.6,
          'line-color': '#FF00AF',
          'line-width': 4
        },
        'minzoom': 13
      })
    });
  }

  render(){
    return (
      <div className='mapContainer' ref = {el => this.mapContainer = el}/>
    )
  }

}

export default connect(toProps, {sendMapObject})(Map)
