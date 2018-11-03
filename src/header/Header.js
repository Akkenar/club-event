import React from 'react';

import './Header.css';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const Nav = props => <NavLink {...props} activeClassName={'active'} />;
  return (
    <Menu>
      <Menu.Item as={Nav} name="home" to="/home">
        Information
      </Menu.Item>

      <Menu.Item as={Nav} name="register" to="/register">
        Register
      </Menu.Item>
    </Menu>
  );
};

export default Header;
