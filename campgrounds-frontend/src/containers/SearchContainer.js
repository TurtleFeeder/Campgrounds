import React, { Component } from 'react';
import SearchForm from '../components/SearchForm';
import Results from './Results';
import {Loader, Dimmer, Segment} from 'semantic-ui-react';

class SearchContainer extends Component {
  state = {
    facilities: null,
    searchStates: null,
    selectedStateAbbr: null,
    isLoading: false
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_STATES_URL).then(r=>r.json()).then(data => this.setState({searchStates: data},()=>console.log('%c in SearchContainer componentDidMount after states fetch','color: yellow',this.state)))
  }

  componentDidUpdate() {
    console.log('%c in SearchContainer componentDidUpdate props','color: yellow', this.props);
    console.log('%c in SearchContainer componentDidUpdate state','color: yellow', this.state);
    if (localStorage.getItem('jwt') && this.props.loggedIn === false && this.props.authenticatingUser === false) {
      this.props.getUser()
    }
  }

  handleSubmit = (result) => {
    this.setState({isLoading: true}, ()=> {
      fetch(process.env.REACT_APP_FACILITIES_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json; charset=utf-8",},
        body: JSON.stringify(result)
      })
      .then(r=>r.json())
      .then(data => this.setState({facilities: data, selectedStateAbbr: result.abbrev, isLoading: false}))
    })
  } // end handleSubmit

  render() {
    return (
      <div id="Search-Container">
        <div id="Form-Container" className="form-container">
          <SearchForm
          searchStates={this.state.searchStates}
          handleSubmit={this.handleSubmit}
          />
        </div>

        {this.state.isLoading ?
          <div className="loader-parent">
            <div className="loader-child">
                <Loader active size={'big'} content={'Searching for campground'} inverted/>
            </div>
          </div>
          :
          null
        }
        {this.state.facilities ?
          <Results
          facilities={this.state.facilities}
          searchStates={this.state.searchStates}
          selectedStateAbbr={this.state.selectedStateAbbr}
          loggedIn={this.props.loggedIn}
          />
          :
          null
        }
      </div>
    )
  }
}

export default SearchContainer;
