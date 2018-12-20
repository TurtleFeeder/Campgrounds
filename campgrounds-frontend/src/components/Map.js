import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';


const isElementOnScreen = (facility, container) => {
  const element = document.getElementById(facility.FacilityID);
  const bounds = element.getBoundingClientRect();
  return bounds.top < container.offsetHeight && bounds.bottom > 0;
}

const setActiveFeature = (facility, facilityInViewId, map) => {
  if (facility.facilityID === facilityInViewId) return;
  map.flyTo({center: facility.GEOJSON.COORDINATES, zoom: 8, speed: 0.4, curve: 0.9})
}


class Map extends Component {
  state = {
    selectedStateAbbrev: this.props.selectedState.abbrev,
    lng: this.props.selectedState.longitude,
    lat: this.props.selectedState.latitude,
    zoom: 6,
    facilityInViewId: null,
    map: null,
    popupActive: false
  }

    componentDidUpdate(prevProps) {
      if (this.props.selectedState.abbrev !== prevProps.selectedState.abbrev) {
        this.setState({
          selectedStateAbbrev: this.props.selectedState.abbrev,
          lng: this.props.selectedState.longitude,
          lat: this.props.selectedState.latitude,
          zoom: 6,
          facilityInViewId: null
        }, ()=> {
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

          // const container = document.getElementById("Facilities-Container")
          // container.scrollTop = 0;
          const map = this.state.map

          map.getSource('facilities').setData({
            "type": "FeatureCollection",
            "features": geoData
          })

          const stateCenterCoord = [this.state.lng, this.state.lat]
          map.flyTo({center: stateCenterCoord, zoom: 6, speed: 0.4, curve: 0.9});
        }) // end setState
      }
    }

  componentDidMount() {

    mapboxgl.accessToken = process.env.REACT_APP_MAP_TOKEN
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/outdoors-v10?optimize=true',
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

        const popup = new mapboxgl.Popup({offset: 25})
          .setLngLat(feature.geometry.coordinates)
          .setHTML('<h4>'+ feature.properties.title + '</h4>')
          .setLngLat(feature.geometry.coordinates)
          .addTo(map);

          map.flyTo({center: feature.geometry.coordinates, zoom: 8, speed: 0.4, curve: 0.9});

          document.getElementById(feature.properties.facilityId).scrollIntoView({behavior: 'smooth'})

      }) // end map.on click

      map.on('mousemove', (e) => {
        const features = map.queryRenderedFeatures(e.point, {layers: ['facilities']})
        map.getCanvas().style.cursor = features.length ? 'pointer' : '';
      })

      const container = document.getElementById("Facilities-Container")
      container.onscroll = () => {
        const facilities = this.props.facilities.filter(f => f.GEOJSON.COORDINATES !== null)
        for (var i = 0; i < facilities.length; i++) {
          let feat = facilities[i];
          if (isElementOnScreen(feat, container)) {
            this.setState({facilityInViewId: feat.FacilityID}, () => setActiveFeature(feat, this.state.facilityInViewId, map))
          }
        }
      }

      this.setState({map: map}, ()=> console.log('added map to state in componentDidMount', this.state))
    }) // end map.on load


  } // end componentDidMount fn

  render() {
    return (
      <div id="Mapbox-Map" ref={el => this.mapContainer = el} className='map-style'></div>
    )
  }

} // end Map class

export default Map;
