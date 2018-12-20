import React, { Component } from 'react';
import FacilityCard from '../components/FacilityCard';
import Map from '../components/Map';

// const BASE_URL = 'http://localhost:3000/api/v1/'
// const FACILITIES_URL = BASE_URL+'facilities'
// const STATES_URL = BASE_URL+'states'


class Results extends Component {
  // state = {
  //   facilities: null
  // }
  //
  // componentDidMount() {
  //   fetch(process.env.REACT_APP_FACILITIES_URL).then(r=>r.json()).then(data => this.setState({facilities: data},()=>console.log('in Result componentDidMount',this.state)))
  // }
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


// class Results extends Component {
//   state = {
//     facilities: null
//   }
//
//   componentDidMount() {
//     fetch(process.env.REACT_APP_FACILITIES_URL).then(r=>r.json()).then(data => this.setState({facilities: data},()=>console.log('in Result componentDidMount',this.state)))
//   }
//
//   render() {
//     return (
//       <div id="Results" className="flex-grid">
//           <div id="Map" className="col-left">
//             <Map facilities={this.state.facilities}/>
//           </div>
//           <div id="Facilities-Container" className="col-right facility-container-style">
//             {this.state.facilities ? this.state.facilities.map(f=> <FacilityCard  key={f.FacilityID} facility={f}/>) : null}
//           </div>
//       </div>
//     );
//   }
// }

export default Results;
