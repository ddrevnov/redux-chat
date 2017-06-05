import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const Header = ({ logout, isAuth }) => {

  return (
    <Menu pointing secondary>
      <Menu.Item
        as={NavLink}
        exact
        to="/"
        activeClassName="active"
      >
        Chat
      </Menu.Item>

      <Menu.Item
        as={NavLink}
        to="/about"
        activeClassName="active"
      >
        About
      </Menu.Item>

      <Menu.Menu position='right'>
        {!isAuth &&
        <Menu.Item
          as={NavLink}
          to="/signup"
          activeClassName="active"
        >
          Sign Up
        </Menu.Item>
        }

        {!isAuth &&
        <Menu.Item
          as={NavLink}
          to="/signin"
          activeClassName="active"
        >
          <Icon name='sign in' title="sign in" />
        </Menu.Item>
        }

        {isAuth &&
        <Menu.Item
          onClick={logout}
        >
          <Icon name='sign out' title="sign out" />
        </Menu.Item>
        }
      </Menu.Menu>
    </Menu>
  )
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default Header;
