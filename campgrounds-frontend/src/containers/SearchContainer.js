import React, { Component } from 'react';
import SearchForm from '../components/SearchForm';
import Results from './Results';



class SearchContainer extends Component {
  state = {
    facilities: null,
    searchStates: null,
    selectedStateAbbr: null
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_STATES_URL).then(r=>r.json()).then(data => this.setState({searchStates: data},()=>console.log('in SearchContainer componentDidMount after states fetch',this.state)))
  }

  handleSubmit = (result) => {
    fetch(process.env.REACT_APP_FACILITIES_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json; charset=utf-8",},
      body: JSON.stringify(result)
    })
    .then(r=>r.json())
    .then(data => this.setState({facilities: data, selectedStateAbbr: result.abbrev},()=>console.log('in SearchContainer handleSubmit after facilities fetch',this.state)))
  }

  render() {
    return (
      <div id="Search-Container">
        <div id="Form-Container" className="form-container">
          <SearchForm
          searchStates={this.state.searchStates}
          handleSubmit={this.handleSubmit}
          />
        </div>
        {this.state.facilities ?
          <Results
            facilities={this.state.facilities}
            searchStates={this.state.searchStates}
            selectedStateAbbr={this.state.selectedStateAbbr}
          />
           :
           null
        }
      </div>
    )
  }
}

export default SearchContainer;
