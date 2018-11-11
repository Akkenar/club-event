import React, { useContext } from 'react';
import getKey from '../intl/getKey';
import { Dropdown, Menu } from 'semantic-ui-react';
import LanguageContext from '../intl/LanguageContext';
import { NavLink } from 'react-router-dom';

import './Footer.scss';

const Footer = () => {
  const { handleChangeLanguage, messages } = useContext(LanguageContext);

  return (
    <Menu inverted className="Footer">
      <Menu.Item>&#169; GSL 2019</Menu.Item>
      <Menu.Item>
        <a href="mailto:info@speleo-lausanne.ch">Contact</a>
      </Menu.Item>
      <Dropdown
        className="link item right Footer__language-switcher"
        text={getKey('current.language', messages)}
        upward
      >
        <Dropdown.Menu>
          <Dropdown.Item
            title="Français"
            as={NavLink}
            to="fr"
            onClick={() => handleChangeLanguage('fr')}
          >
            FR
          </Dropdown.Item>
          <Dropdown.Item
            title="Deutsch"
            as={NavLink}
            to="de"
            onClick={() => handleChangeLanguage('de')}
          >
            DE
          </Dropdown.Item>
          <Dropdown.Item
            title="Italianno"
            as={NavLink}
            to="it"
            onClick={() => handleChangeLanguage('it')}
          >
            IT
          </Dropdown.Item>
          <Dropdown.Item
            title="English"
            as={NavLink}
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

export default Footer;
