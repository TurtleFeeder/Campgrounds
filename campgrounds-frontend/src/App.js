import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Results from './containers/Results';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Campgrounds</h1>
        </header>
        <h1>Main Container</h1>
          <Results />
      </div>
    );
  }
}

export default App;
