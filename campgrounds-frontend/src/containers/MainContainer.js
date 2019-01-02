import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import SearchContainer from './SearchContainer';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import NavBar from '../components/NavBar';
import ReservationForm from '../components/ReservationForm';
import Profile from '../components/Profile';
import withAuth from '../hocs/withAuth';

class MainContainer extends Component {
  state = {
    user: null,
    loggedIn: false,
    authenticatingUser: false,
    failedLogin: false,
    error: null,
    createUserErrorMsg: null
  }

  loginUser = (email, password) => {

    fetch(process.env.REACT_APP_LOGIN_URL, {
      method: 'POST',
      headers: {"Content-Type": "application/json; charset=utf-8",},
      body: JSON.stringify({
        user: {
          email: email,
          password: password
        }
      })
    })
      .then(resp => {
        if (resp.ok) {
          return resp.json()
        } else {
          throw resp
        }
      })
      .then(JSONResponse => {
        console.log('in loginUser JSONResponse',JSONResponse)
        localStorage.setItem('jwt', JSONResponse.jwt)
        this.setState({
          user: JSONResponse.user,
          loggedIn: true,
          authenticatingUser: false,
          failedLogin: false,
          error: null,
          createUserErrorMsg: null
        })
      })
      .catch(r => r.json().then(e => {
        console.log('in loginUser catch', e)
        this.setState({failedLogin: true, error: e.message, authenticatingUser: false})
      }))
  }

  logoutUser = () => {
    // clear user token from localStorage
    localStorage.removeItem('jwt')
    this.setState({
      user: null,
      loggedIn: false,
      authenticatingUser: false,
      failedLogin: false,
      error: null,
      createUserErrorMsg: null
    })
  }

  signupUser = ({email, firstName, lastName, password}) => {

    fetch(process.env.REACT_APP_USER_URL, {
      method: 'POST',
      headers: {"Content-Type": "application/json; charset=utf-8",},
      body: JSON.stringify({
        user: {
          email: email,
          first_name: firstName,
          last_name: lastName,
          password: password
        }
      })
    })
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      } else {
        throw resp
      }
    })
      .then(JSONResponse => {
        console.log('in loginUser JSONResponse',JSONResponse)
        localStorage.setItem('jwt', JSONResponse.jwt)
        this.setState({
          user: JSONResponse.user,
          loggedIn: true,
          authenticatingUser: false,
          failedLogin: false,
          error: null,
          createUserErrorMsg: null
        })
      })
      .catch(r => r.json().then(e => {
        console.log('in signupUser catch', e)
        this.setState({createUserErrorMsg: e.error})
      }))
  }

  getUser = () => {
      fetch(process.env.REACT_APP_USER_PROFILE_URL, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(r => r.json())
      .then(JSONResponse => this.setState({
        user: JSONResponse.user,
        loggedIn: true,
        authenticatingUser: false,
        failedLogin: false,
        error: null,
        createUserErrorMsg: null
      }))
  }

  updateUser = (reservationJSON, action) => {
    console.log('%c in updateUser reservationJSON', 'color: red', reservationJSON)
    console.log('%c in updateUser state', 'color: red', this.state)
    switch (action) {
      case 'addReservation':
        this.setState(prevState => ({user: {...prevState.user, reservations: [...prevState.user.reservations, reservationJSON]}}))
        break;
        case 'deleteReservation':
        this.setState(prevState => ({user: {...prevState.user, reservations: prevState.user.reservations.filter(r=> r.id !== reservationJSON.id)}}))
        break;
    }
  }

  render() {
    return (
      <Router>
        <div id="MainContainer">
          <header className="App-header">
            <h1>Campgrounds</h1>
            <NavBar
            loggedIn={this.state.loggedIn}
            logoutUser={this.logoutUser}
            />
          </header>
          <Switch>
            <Route exact path="/" render={routerProps=> <SearchContainer
              loggedIn={this.state.loggedIn}
              getUser={this.getUser}
              {...routerProps}/>}/>
            <Route path="/signup" render={routerProps => <SignupForm
              signupUser={this.signupUser}
              loggedIn={this.state.loggedIn}
              createUserErrorMsg={this.state.createUserErrorMsg}
              {...routerProps}/>}
              />
            <Route path="/login" render={routerProps => <LoginForm loginUser={this.loginUser}
            loggedIn={this.state.loggedIn}
            authenticatingUser={this.state.authenticatingUser}
            failedLogin={this.state.failedLogin}
            error={this.state.error}
            {...routerProps}
             />}/>
             <Route path="/reservation" render={routerProps=> <ReservationForm
               getUser={this.getUser}
               updateUser={this.updateUser}
               loggedIn={this.state.loggedIn}
               user={this.state.user}
               {...routerProps}/>}/>
             <Route path="/profile" render={routerProps=> <Profile
               getUser={this.getUser}
               updateUser={this.updateUser}
               loggedIn={this.state.loggedIn}
               user={this.state.user}
               {...routerProps}/>}/>
          </Switch>
        </div>
      </Router>
    )
  }

} // end MainContainer

// <Route path="/reservation" render={routerProps => (
  //   localStorage.getItem('jwt') ?
  //   (this.getUser(routerProps))
  //   :
  //   (<Redirect to="/login"/>)
  // )}/>

// <Route path="/reservation" render={routerProps => <ReservationForm loggedIn={this.state.loggedIn} {...routerProps}/>}/>

export default MainContainer;
