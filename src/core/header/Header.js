import React, { useContext, useEffect } from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import getKey from '../intl/getKey';
import { setPageDescription } from '../../page.lib';
import configuration from '../../configuration';
import LanguageContext from '../intl/LanguageContext';
import Logo from '../logo/Logo';
import LanguageSwitcher from '../language-switcher/LanguageSwitcher';

import './Header.scss';

const Nav = props => <NavLink {...props} activeClassName={'active'} />;

const Header = () => {
  const { language, messages } = useContext(LanguageContext);

  // Not the best place, but works fine
  useEffect(() => {
    setPageDescription(getKey('description', messages));
  });

  const getUrlWithLanguage = url => {
    return `/${language}/${url}`;
  };

  return (
    <Menu inverted className="Header">
      <Nav to={getUrlWithLanguage('home')} color="white">
        <Logo className="Header__logo" width={60} height={45} inverted />
      </Nav>

      {configuration.registration.enabled ? (
        <Menu.Item as={Nav} name="register" to={getUrlWithLanguage('register')}>
          {getKey('header.register', messages)}
        </Menu.Item>
      ) : null}

      <LanguageSwitcher />
    </Menu>
  );
};

export default Header;
