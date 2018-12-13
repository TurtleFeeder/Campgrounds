import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';


class Map extends Component {
  state = {
    lng: -118.16162,
    lat: 35.8439,
    zoom: 6
  }

  componentDidMount() {
    mapboxgl.accessToken = process.env.REACT_APP_MAP_TOKEN
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/outdoors-v10',
        center: [lng, lat],
        zoom
    });

    map.on('move', () => {
      const { lng, lat } = map.getCenter();
      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    map.on('load', () => {
      const geoData = this.props.facilities.filter(f => f.GEOJSON.COORDINATES !== null).map(f => {
        return {
            "type": "Feature",
            "geometry": {
                "type": f.GEOJSON.TYPE,
                "coordinates": f.GEOJSON.COORDINATES
            },
            "properties": {
                "icon": "campsite-15"
            }
        }
      }) // end geoData

      console.log('in map.on load filtered',geoData)

      map.addLayer({
        'id': "points",
        'type': "symbol",
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": geoData
          }
        },
        "layout": {
          "icon-image": "campsite-15",
        }
      }) // end map.addLayer

    }); // end map.on load

  } // end componentDidMount fn

  render() {
    return (
      <div ref={el => this.mapContainer = el} style={{width: '100vw',height: '60vh'}}><div>x</div></div>
    )
  }

} // end Map class

export default Map;
