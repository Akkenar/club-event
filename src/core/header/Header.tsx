import * as React from 'react';
import { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import * as configuration from '../../configuration.json';
import getKey from '../intl/getKey';
import LanguageContext from '../intl/LanguageContext';
import LanguageSwitcher from '../language-switcher/LanguageSwitcher';
import Logo from '../logo/Logo';
import { hideSSRHeader, setPageDescription } from '../page.lib';

import './Header.scss';

const Nav = (props: any) => <NavLink {...props} activeClassName={'active'} />;

const Header = () => {
  const { language, messages } = useContext(LanguageContext);

  // Not the best place, but works fine
  useEffect(() => {
    setPageDescription(getKey('description', messages));
    // Only at this state we can hide the SSR. Doing it before will introduce a flicker.
    hideSSRHeader();
  });

  const getUrlWithLanguage = (url: string) => {
    return `/${language}/${url}`;
  };

  return (
    <Menu inverted={true} className="Header">
      <Nav to={getUrlWithLanguage('home')} color="white">
        <Logo className="Header__logo" width={60} height={45} inverted={true} />
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
