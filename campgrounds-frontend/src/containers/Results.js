import React, { Component } from 'react';
import FacilityCard from '../components/FacilityCard';
import Map from '../components/Map';

const BASE_URL = 'http://localhost:3000/api/v1/'
const FACILITIES_URL = BASE_URL+'facilities'

class Results extends Component {
  state = {
    facilities: null
  }

  componentDidMount() {
    fetch(FACILITIES_URL).then(r=>r.json()).then(data => this.setState({facilities: data},()=>console.log('in componentDidMount',this.state)))
  }

  render() {
    return (
      <div id="Results" className="row">
          <div id="Map" className="column left">
            <h1>MAP SPACE</h1>
            <Map facilities={this.state.facilities}/>
          </div>
          <div id="Facilities-Container" className="column right facility-container-style">
            {this.state.facilities ? this.state.facilities.map(f=> <FacilityCard  key={f.FacilityID} facility={f}/>) : null}
          </div>
      </div>
    );
  }
}

export default Results;
