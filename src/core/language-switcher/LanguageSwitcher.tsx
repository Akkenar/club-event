import * as React from 'react';
import { useContext } from 'react';
import { Dropdown } from 'semantic-ui-react';
import getKey from '../intl/getKey';
import LanguageContext from '../intl/LanguageContext';

import './LanguageSwitcher.scss';

const Button = (props: any) => (
  <button
    {...props}
    className={`${props.className || ''} LanguageSwitcher__button`}
  />
);

const LanguageSwitcher = () => {
  const { handleChangeLanguage, messages } = useContext(LanguageContext);

  // So we don't use a Lambda in the jsx.
  const changeLanguage = (language: string) => () =>
    handleChangeLanguage(language);

  return (
    <Dropdown
      className="link item right LanguageSwitcher"
      text={getKey('current.language', messages)}
    >
      <Dropdown.Menu>
        <Dropdown.Item
          title="Français"
          as={Button}
          onClick={changeLanguage('fr')}
        >
          FR
        </Dropdown.Item>
        <Dropdown.Item
          title="Deutsch"
          as={Button}
          onClick={changeLanguage('de')}
        >
          DE
        </Dropdown.Item>
        <Dropdown.Item
          title="Italianno"
          as={Button}
          onClick={changeLanguage('it')}
        >
          IT
        </Dropdown.Item>
        <Dropdown.Item
          title="English"
          as={Button}
          onClick={changeLanguage('en')}
        >
          EN
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
