import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';


class Map extends Component {
  state = {
    lng: -73.8858333,
    lat: 40.5958333,
    zoom: 6
  }

  // figure out how to change state lng & lat when implementing the search functionality - i want the lng & lat to be the first facility of the searched state so that the map would be loaded to center on there
  
    // const startingFacility = this.props.facilities.find(f => !!f.FacilityLongitude && !!f.FacilityLatitude)
    // console.log('in Map componentDidUpdate',startingFacility);
    //
    // this.setState({lng: startingFacility.FacilityLongitude, lat: startingFacility.FacilityLatitude}, ()=>console.log('set state to startingFacility', this.state))

  componentDidMount() {
    console.log('in Map componentDidMount');

    mapboxgl.accessToken = process.env.REACT_APP_MAP_TOKEN
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/outdoors-v10',
        center: [lng, lat],
        zoom
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());

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
            "icon": "campsite-15",
            "facilityId": f.FacilityID,
            "title": f.FacilityName,
            "lng": f.FacilityLongitude,
            "lat": f.FacilityLatitude
          }
        }
      }) // end geoData

      console.log('in map.on load filtered geoData',geoData)

      map.addSource('facilities', {
        type: 'geojson',
        data: {
          "type": "FeatureCollection",
          "features": geoData
        }
      })

      map.addLayer({
        'id': "facilities",
        'interactive': true,
        'type': "symbol",
        "source": "facilities",
        "layout": {
          "icon-image": "campsite-15",
        }
      }) // end map.addLayer

      map.on('click', (e) => {
        const features = map.queryRenderedFeatures(e.point, {'layers': ['facilities']})
        console.log('in map.on click features', features);

        if (!features.length) {
          return;
        }

        const feature = features[0];
        console.log('in map.on click features[0]', feature);

        const popup = new mapboxgl.Popup({offset: 25})
          .setLngLat(feature.geometry.coordinates)
          .setHTML('<h3>'+ feature.properties.title + '</h3>')
          .setLngLat(feature.geometry.coordinates)
          .addTo(map);

          map.flyTo({center: feature.geometry.coordinates, zoom: 9});

      }) // end map.on click

      map.on('mousemove', (e) => {
        const features = map.queryRenderedFeatures(e.point, {layers: ['facilities']})
        // console.log('in map.on mousemove', features);
        map.getCanvas().style.cursor = features.length ? 'pointer' : '';
      })

    }) // end map.on load


  } // end componentDidMount fn

  render() {
    return (
      <div ref={el => this.mapContainer = el} className='map-style'></div>
    )
  }

} // end Map class

export default Map;
