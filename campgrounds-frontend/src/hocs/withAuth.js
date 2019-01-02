import React from 'react';
import { Redirect } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  console.log('%c in withAuth', 'color: orange', WrappedComponent);
  class AuthorizedComponent extends React.Component {
    componentDidMount() {
      console.log('%c in withAuth WrappedComponent', 'color: orange', WrappedComponent)
      console.log('%c in withAuth WrappedComponent props', 'color: orange', this.props)
      if (localStorage.getItem('jwt') && this.props.loggedIn === false) {
        this.props.getUser()
      }
    }

    // using getUser fn passed from MainContainer instead of fetchCurrentUser
    fetchCurrentUser = () => {
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

    render() {
      console.log('%c INSIDE RENDER FOR HOC the props', 'color: green', this.props)

      if (localStorage.getItem('jwt') && this.props.loggedIn) {
        return <WrappedComponent {...this.props}/>
      } else {
        return <Redirect to='/login'/>
      }
    }

  } // end AuthorizedComponent class

  return AuthorizedComponent
} // end withAuth fn

export default withAuth;
