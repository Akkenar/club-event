import React, { useContext, useEffect } from 'react';

import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import getKey from '../intl/getKey';
import { setPageDescription } from '../page.lib';
import configuration from '../configuration';
import LanguageContext from '../intl/LanguageContext';

import './Header.scss';
import Logo from '../logo/Logo';

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
        <Logo className="Header__logo" width={60} height={45} inverted />
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
