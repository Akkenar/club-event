import React from 'react';

import './Header.css';
import { Menu } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';

const Nav = props => <NavLink {...props} activeClassName={'active'} />;

const Header = ({ intl, handleChangeLocale }) => {
  const { locale } = intl;
  return (
    <Menu>
      <Menu.Item as={Nav} name="home" to={'/home/' + locale}>
        Information
      </Menu.Item>

      <Menu.Item as={Nav} name="register" to={'/register/' + locale}>
        Register
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item as={Nav} to="fr" onClick={() => handleChangeLocale('fr')}>
          FR
        </Menu.Item>
        <Menu.Item as={Nav} to="de" onClick={() => handleChangeLocale('de')}>
          DE
        </Menu.Item>
        <Menu.Item as={Nav} to="it" onClick={() => handleChangeLocale('it')}>
          IT
        </Menu.Item>
        <Menu.Item as={Nav} to="en" onClick={() => handleChangeLocale('en')}>
          EN
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default injectIntl(Header);
