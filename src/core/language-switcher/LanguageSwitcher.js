import React, { useContext } from 'react';
import getKey from '../intl/getKey';
import { Dropdown } from 'semantic-ui-react';
import LanguageContext from '../intl/LanguageContext';

import './LanguageSwitcher.scss';

const Button = props => (
  <button
    {...props}
    className={`${props.className} LanguageSwitcher__button`}
  />
);

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
          as={Button}
          onClick={() => handleChangeLanguage('fr')}
        >
          FR
        </Dropdown.Item>
        <Dropdown.Item
          title="Deutsch"
          as={Button}
          onClick={() => handleChangeLanguage('de')}
        >
          DE
        </Dropdown.Item>
        <Dropdown.Item
          title="Italianno"
          as={Button}
          onClick={() => handleChangeLanguage('it')}
        >
          IT
        </Dropdown.Item>
        <Dropdown.Item
          title="English"
          as={Button}
          onClick={() => handleChangeLanguage('en')}
        >
          EN
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
