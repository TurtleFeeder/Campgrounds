import React, { Component } from 'react';
import SearchForm from '../components/SearchForm';
import Results from './Results';

class SearchContainer extends Component {

  render() {
    return (
      <div id="Search-Container">
        <SearchForm />
        <Results />
      </div>
    )
  }
}

export default SearchContainer;
