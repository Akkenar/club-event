import React, { useContext, useEffect } from 'react';

import { Dropdown, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import getKey from '../intl/getKey';
import { setPageDescription } from '../page.lib';

import './Header.scss';
import logo from '../logo.svg';
import LanguageContext from '../intl/LanguageContext';

const Nav = props => <NavLink {...props} activeClassName={'active'} />;

const Header = () => {
  const { handleChangeLanguage, language, messages } = useContext(
    LanguageContext
  );

  // Not the best place, but works fine
  useEffect(() => {
    setPageDescription(getKey('description', messages));
  });

  return (
    <Menu>
      <Nav to={'/home/' + language}>
        <img
          className="Header__logo"
          alt={getKey('header.logo', messages)}
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
      <Dropdown
        className="link item right Header__language-switcher"
        text={getKey('header.current.language', messages)}
      >
        <Dropdown.Menu>
          <Dropdown.Item
            title="Français"
            as={Nav}
            to="fr"
            onClick={() => handleChangeLanguage('fr')}
          >
            FR
          </Dropdown.Item>
          <Dropdown.Item
            title="Deutsch"
            as={Nav}
            to="de"
            onClick={() => handleChangeLanguage('de')}
          >
            DE
          </Dropdown.Item>
          <Dropdown.Item
            title="Italianno"
            as={Nav}
            to="it"
            onClick={() => handleChangeLanguage('it')}
          >
            IT
          </Dropdown.Item>
          <Dropdown.Item
            title="English"
            as={Nav}
            to="en"
            onClick={() => handleChangeLanguage('en')}
          >
            EN
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
};

export default Header;
