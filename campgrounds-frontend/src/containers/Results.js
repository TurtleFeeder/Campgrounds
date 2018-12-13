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
      <div className="Results">
        <span id="Map">
        <h1>MAP SPACE</h1>
          <Map facilities={this.state.facilities}/>
        </span>
        <span id="Facilities-Container">
        {this.state.facilities ? this.state.facilities.map(f=> <FacilityCard  key={f.FacilityID} facility={f}/>) : null}
        </span>
      </div>
    );
  }
}

export default Results;
