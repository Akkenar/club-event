import React, { useContext, useEffect } from 'react';

import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import getKey from '../intl/getKey';
import { setPageDescription } from '../page.lib';
import configuration from '../configuration';

import logo from '../assets/logo.svg';
import LanguageContext from '../intl/LanguageContext';

import './Header.scss';

const Nav = props => <NavLink {...props} activeClassName={'active'} />;

const Header = () => {
  const { language, messages } = useContext(LanguageContext);

  // Not the best place, but works fine
  useEffect(() => {
    setPageDescription(getKey('description', messages));
  });

  return (
    <Menu inverted className="Header">
      <Nav to={'/home/' + language} color="white">
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

      {configuration.registration.enabled ? (
        <Menu.Item as={Nav} name="register" to={'/register/' + language}>
          {getKey('header.register', messages)}
        </Menu.Item>
      ) : null}
    </Menu>
  );
};

export default Header;
