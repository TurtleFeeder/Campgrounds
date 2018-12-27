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

const NavBar = () => {
  return (
    <div>
      <Button.Group>
        <NavLink to="/">
          <Button animated='vertical' size='small'>
            <Button.Content hidden>Search</Button.Content>
            <Button.Content visible><Icon name='search'/></Button.Content>
          </Button>
        </NavLink>
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
      </Button.Group>
    </div>
  )
}

export default NavBar;
