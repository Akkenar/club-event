import * as React from 'react';
import { useContext } from 'react';
import { match as matchType, NavLink, withRouter } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import getKey from '../intl/getKey';
import { preloadAllLanguages } from '../intl/importLanguage';
import { LANGUAGE } from '../intl/intl.type';
import LanguageContext from '../intl/LanguageContext';

import './LanguageSwitcher.scss';

interface LanguageSwitcherProps {
  match: matchType<{ page: string }>;
}

const LanguageSwitcher = ({ match }: LanguageSwitcherProps) => {
  const { messages } = useContext(LanguageContext);
  const { page = 'home' } = match.params;

  // To speed up any language change.
  const onOpenHandler = () => {
    return preloadAllLanguages();
  };

  const to = (lang: LANGUAGE) => `/${lang.toString()}/${page}`;
  return (
    <Dropdown
      data-testid="language-switcher"
      onOpen={onOpenHandler}
      className="link item right LanguageSwitcher"
      text={getKey('current.language', messages)}
    >
      <Dropdown.Menu>
        <Dropdown.Item title="Français" as={NavLink} to={to(LANGUAGE.FR)}>
          FR
        </Dropdown.Item>
        <Dropdown.Item title="Deutsch" as={NavLink} to={to(LANGUAGE.DE)}>
          DE
        </Dropdown.Item>
        <Dropdown.Item title="Italianno" as={NavLink} to={to(LANGUAGE.IT)}>
          IT
        </Dropdown.Item>
        <Dropdown.Item title="English" as={NavLink} to={to(LANGUAGE.EN)}>
          EN
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default withRouter(LanguageSwitcher);
