import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SearchContainer from './SearchContainer';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import NavBar from '../components/NavBar';


class MainContainer extends Component {
  state = {
    user: null
  }

  loginUser = (email, password) => {
    console.log('in loginUser', email, password);
    fetch(process.env.REACT_APP_USER_URL).then(r=>r.json()).then(data=> this.setState({user: data[0]}))
  }

  signupUser = ({email, firstName, lastName, password}) => {
    console.log('in signupUser', email, firstName, lastName, password);
  }

  render() {
    return (
      <Router>
        <div id="MainContainer">
          <header className="App-header">
            <h1>Campgrounds</h1>
            <NavBar />
          </header>
          <Route exact path="/" component={SearchContainer}/>
          <Route exact path="/signup" render={routerProps => <SignupForm signupUser={this.signupUser} {...routerProps}/>}/>
          <Route exact path="/login" render={routerProps => <LoginForm loginUser={this.loginUser} {...routerProps}/>}/>
        </div>
      </Router>
    )
  }

} // end MainContainer

export default MainContainer;
