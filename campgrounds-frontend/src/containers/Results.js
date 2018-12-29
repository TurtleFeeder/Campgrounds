import React, { Component } from 'react';
import FacilityCard from '../components/FacilityCard';
import Map from '../components/Map';

class Results extends Component {

  selectedStateObj = () => {
    return this.props.searchStates.find(s => s.abbrev === this.props.selectedStateAbbr)
  }

  render() {
    return (
      <div id="Results" className="flex-grid">
          <div id="Map" className="col-left">
            <Map facilities={this.props.facilities} selectedState={this.selectedStateObj()}/>
          </div>
          <div id="Facilities-Container" className="col-right facility-container-style">
            {this.props.facilities.map(f=> <FacilityCard  key={f.FacilityID} facility={f}/>)}
          </div>
      </div>
    );
  }
}

export default Results;
