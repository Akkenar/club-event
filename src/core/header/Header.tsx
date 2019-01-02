import * as React from 'react';
import { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import environment from '../../environment/environment';
import { DEFAULT_LANGUAGE } from '../intl/getDefaultLanguage';
import getKey from '../intl/getKey';
import LanguageContext from '../intl/LanguageContext';
import LanguageSwitcher from '../language-switcher/LanguageSwitcher';
import Logo from '../logo/Logo';
import { hideSSRHeader, setPageDescription } from '../page.lib';

import './Header.scss';

const Nav = (props: any) => <NavLink {...props} activeClassName={'active'} />;

const Header = () => {
  // Only at this state we can hide the SSR. Doing it before will introduce a flicker.
  hideSSRHeader();
  const { language, messages } = useContext(LanguageContext);

  useEffect(() => {
    // Not the best place, but works fine
    setPageDescription(getKey('description', messages));
  });

  const getUrlWithLanguage = (url: string) => {
    return `/${language || DEFAULT_LANGUAGE}/${url}`;
  };

  return (
    <Menu inverted={true} className="Header">
      <Nav to={getUrlWithLanguage('home')} color="white">
        <Logo className="Header__logo" width={60} height={45} inverted={true} />
      </Nav>

      {environment.registration.enabled ? (
        <Menu.Item as={Nav} name="register" to={getUrlWithLanguage('register')}>
          {getKey('header.register', messages)}
        </Menu.Item>
      ) : null}

      <LanguageSwitcher />
    </Menu>
  );
};

export default Header;
