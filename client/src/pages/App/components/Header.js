import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { push } from 'react-router-redux';
import { NavLink } from 'react-router-dom';
import store  from '../../../redux/store';

export default class Header extends Component {

  handleItemClick = (e, { name }) => {
    store.dispatch(push(`/${name}`));
  };

  render() {
    return (
      <Menu>
        <Menu.Item
          name=""
          as={NavLink}
          exact
          to="/"
          activeClassName="active"
          onClick={this.handleItemClick}
        >
          Chat
        </Menu.Item>

        <Menu.Item
          name="about"
          as={NavLink}
          to="/about"
          activeClassName="active"
          onClick={this.handleItemClick}
        >
          About
        </Menu.Item>
        <Menu.Item
          name="signup"
          as={NavLink}
          to="/signup"
          activeClassName="active"
          onClick={this.handleItemClick}
        >
          SignUp
        </Menu.Item>
      </Menu>
    )
  }
};
