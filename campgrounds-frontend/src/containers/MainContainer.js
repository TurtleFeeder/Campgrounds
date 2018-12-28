import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SearchContainer from './SearchContainer';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import NavBar from '../components/NavBar';


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
    console.log('in loginUser', email, password);
    // fetch(process.env.REACT_APP_USER_URL).then(r=>r.json()).then(data=> this.setState({user: data.find(u=> u.email === email)}))
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
          authenticatingUser: false
        })
      })
      .catch(r => r.json().then(e => {
        console.log('in loginUser catch', e)
        this.setState({failedLogin: true, error: e.message, authenticatingUser: false})
      }))
  }

  signupUser = ({email, firstName, lastName, password}) => {
    console.log('in signupUser', email, firstName, lastName, password);
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
          authenticatingUser: false
        })
      })
      .catch(r => r.json().then(e => {
        console.log('in signupUser catch', e)
        this.setState({createUserErrorMsg: e.error})
      }))
  }

  render() {
    return (
      <Router>
        <div id="MainContainer">
          <header className="App-header">
            <h1>Campgrounds</h1>
            <NavBar />
          </header>
          <Switch>
            <Route exact path="/" component={SearchContainer}/>
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
          </Switch>
        </div>
      </Router>
    )
  }

} // end MainContainer

export default MainContainer;
