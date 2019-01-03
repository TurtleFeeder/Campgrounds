import React from 'react';
import {NavLink} from 'react-router-dom';
import {Button, Icon} from 'semantic-ui-react';

const linkStyle = {
  padding: '12px',
  margin: '0 6px 6px',
  background: 'grey',
  textDecoration: 'none',
  color: 'white',
}

const activeLink = {background: 'darkblue'}

const NavBar = ({loggedIn, logoutUser}) => {
  return (
    <div>
      <Button.Group color={'grey'}>
        <NavLink to="/">
          <Button animated='vertical' size='small'>
            <Button.Content hidden>Search</Button.Content>
            <Button.Content visible><Icon name='search'/></Button.Content>
          </Button>
        </NavLink>
        {loggedIn ? (
          <React.Fragment>
            <NavLink to="/profile">
              <Button animated='vertical' size='small'>
                <Button.Content hidden>Profile</Button.Content>
                <Button.Content visible><Icon name='user'/></Button.Content>
              </Button>
            </NavLink>
            <NavLink to="/login">
              <Button animated='vertical' size='small' onClick={logoutUser}>
                <Button.Content hidden>Logout</Button.Content>
                <Button.Content visible><Icon name='log out'/></Button.Content>
              </Button>
            </NavLink>
          </React.Fragment>
        ):(
          <React.Fragment>
            <NavLink to="/login">
              <Button size='small'>
                <Button.Content visible>Login</Button.Content>
              </Button>
            </NavLink>
            <NavLink to="/signup">
              <Button size='small'>
                <Button.Content visible>Sign Up</Button.Content>
              </Button>
            </NavLink>
          </React.Fragment>
        )}
      </Button.Group>
    </div>
  )
}

export default NavBar;
