import React, { Component } from 'react';
import SearchForm from '../components/SearchForm';
import Results from './Results';

class SearchContainer extends Component {
  state = {
    facilities: null
  }

  // move the fetch logic here - add logic to only display Results if there's facilities in the state - after the search submission causes the state to be updated, then the results should show up with the updated state.


  render() {
    return (
      <div id="Search-Container">
        <div id="Form-Container" className="form-container">
          <SearchForm />
        </div>
        <Results />
      </div>
    )
  }
}

export default SearchContainer;
