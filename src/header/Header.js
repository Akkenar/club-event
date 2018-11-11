import React, { useContext, useEffect } from 'react';

import { Dropdown, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import getKey from '../intl/getKey';
import { setPageDescription } from '../page.lib';

import './Header.scss';
import logo from '../assets/logo.svg';
import LanguageContext from '../intl/LanguageContext';

const Nav = props => <NavLink {...props} activeClassName={'active'} />;

const Header = () => {
  const { language, messages } = useContext(LanguageContext);

  // Not the best place, but works fine
  useEffect(() => {
    setPageDescription(getKey('description', messages));
  });

  return (
    <Menu>
      <Nav to={'/home/' + language}>
        <img
          className="Header__logo"
          alt={getKey('logo.alt', messages)}
          src={logo}
          width={60}
          height={45}
        />
      </Nav>
      <Menu.Item as={Nav} name="home" to={'/home/' + language}>
        {getKey('header.information', messages)}
      </Menu.Item>

      <Menu.Item as={Nav} name="register" to={'/register/' + language}>
        {getKey('header.register', messages)}
      </Menu.Item>
    </Menu>
  );
};

export default Header;
