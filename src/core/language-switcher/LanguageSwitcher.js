import React, { useContext } from 'react';
import getKey from '../intl/getKey';
import { Dropdown } from 'semantic-ui-react';
import LanguageContext from '../intl/LanguageContext';
import { NavLink } from 'react-router-dom';

import './LanguageSwitcher.scss';

const LanguageSwitcher = () => {
  const { handleChangeLanguage, messages } = useContext(LanguageContext);

  return (
    <Dropdown
      className="link item right LanguageSwitcher"
      text={getKey('current.language', messages)}
    >
      <Dropdown.Menu>
        <Dropdown.Item
          title="Français"
          as={NavLink}
          to="/fr"
          onClick={() => handleChangeLanguage('fr')}
        >
          FR
        </Dropdown.Item>
        <Dropdown.Item
          title="Deutsch"
          as={NavLink}
          to="/de"
          onClick={() => handleChangeLanguage('de')}
        >
          DE
        </Dropdown.Item>
        <Dropdown.Item
          title="Italianno"
          as={NavLink}
          to="/it"
          onClick={() => handleChangeLanguage('it')}
        >
          IT
        </Dropdown.Item>
        <Dropdown.Item
          title="English"
          as={NavLink}
          to="/en"
          onClick={() => handleChangeLanguage('en')}
        >
          EN
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
