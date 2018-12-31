import React from 'react';
import { Redirect } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  console.log('in withAuth', WrappedComponent);
  class AuthorizedComponent extends React.Component {
    componentDidMount() {
      console.log('in withAuth WrappedComponent', WrappedComponent)
      console.log('in withAuth WrappedComponent props', this.props)
      if (localStorage.getItem('jwt') && this.props.loggedIn === false) {
        console.log('in withAuth AuthorizedComponent componentDidMount props', this.props)
        console.log('in withAuth AuthorizedComponent componentDidMount props', localStorage.getItem('jwt'))

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
      console.log('%c INSIDE RENDER FOR HOC', 'color: green')
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
