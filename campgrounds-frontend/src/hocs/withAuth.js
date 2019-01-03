import React from 'react';
import {Redirect} from 'react-router-dom';
import {Loader} from 'semantic-ui-react';

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
