import React from 'react';

import './Header.css';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import getKey from '../intl/getKey';

const Nav = props => <NavLink {...props} activeClassName={'active'} />;

const Header = props => {
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
      <Menu.Menu position="right">
        <Menu.Item
          title="Français"
          as={Nav}
          to="fr"
          onClick={() => handleChangeLocale('fr')}
        >
          FR
        </Menu.Item>
        <Menu.Item
          title="Deutsch"
          as={Nav}
          to="de"
          onClick={() => handleChangeLocale('de')}
        >
          DE
        </Menu.Item>
        <Menu.Item
          title="Italianno"
          as={Nav}
          to="it"
          onClick={() => handleChangeLocale('it')}
        >
          IT
        </Menu.Item>
        <Menu.Item
          title="English"
          as={Nav}
          to="en"
          onClick={() => handleChangeLocale('en')}
        >
          EN
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default injectIntl(Header);
