import * as React from 'react';
import { useContext } from 'react';
import { match as matchType, NavLink, withRouter } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import getKey from '../intl/getKey';
import LanguageContext from '../intl/LanguageContext';

import './LanguageSwitcher.scss';

interface LanguageSwitcherProps {
  match: matchType<{ page: string }>;
}

const LanguageSwitcher = ({ match }: LanguageSwitcherProps) => {
  const { messages } = useContext(LanguageContext);
  const { page } = match.params;

  return (
    <Dropdown
      className="link item right LanguageSwitcher"
      text={getKey('current.language', messages)}
    >
      <Dropdown.Menu>
        <Dropdown.Item title="Français" as={NavLink} to={`/fr/${page}`}>
          FR
        </Dropdown.Item>
        <Dropdown.Item title="Deutsch" as={NavLink} to={`/de/${page}`}>
          DE
        </Dropdown.Item>
        <Dropdown.Item title="Italianno" as={NavLink} to={`/it/${page}`}>
          IT
        </Dropdown.Item>
        <Dropdown.Item title="English" as={NavLink} to={`/en/${page}`}>
          EN
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default withRouter(LanguageSwitcher);
