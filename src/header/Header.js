import React, { useEffect } from 'react';

import './Header.css';
import { Dropdown, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import getKey from '../intl/getKey';
import { setPageDescription } from '../page.lib';

const Nav = props => <NavLink {...props} activeClassName={'active'} />;

const Header = props => {
  // Not the best place, but works fine
  useEffect(() => {
    setPageDescription(getKey('description', props));
  });

  const { intl, handleChangeLocale } = props;
  const { locale } = intl;
  return (
    <Menu>
      <Menu.Item as={Nav} name="home" to={'/home/' + locale}>
        {getKey('header.information', props)}
      </Menu.Item>

      <Menu.Item as={Nav} name="register" to={'/register/' + locale}>
        {getKey('header.register', props)}
      </Menu.Item>
      <Dropdown
        className="link item right"
        text={getKey('header.current.language', props)}
      >
        <Dropdown.Menu>
          <Dropdown.Item
            title="Français"
            as={Nav}
            to="fr"
            onClick={() => handleChangeLocale('fr')}
          >
            FR
          </Dropdown.Item>
          <Dropdown.Item
            title="Deutsch"
            as={Nav}
            to="de"
            onClick={() => handleChangeLocale('de')}
          >
            DE
          </Dropdown.Item>
          <Dropdown.Item
            title="Italianno"
            as={Nav}
            to="it"
            onClick={() => handleChangeLocale('it')}
          >
            IT
          </Dropdown.Item>
          <Dropdown.Item
            title="English"
            as={Nav}
            to="en"
            onClick={() => handleChangeLocale('en')}
          >
            EN
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
};

export default injectIntl(Header);
