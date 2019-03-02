import { Menu } from 'semantic-ui-react';
import * as React from 'react';
import { useContext } from 'react';
import getKey from '../core/intl/getKey';
import { normalizeTitle } from '../core/scrollable-anchor/scrollable-anchor.lib';
import LanguageContext from '../core/intl/LanguageContext';

const PageMenu = () => {
  const { messages } = useContext(LanguageContext);

  const getMenuItem = (labelKey: string, targetTitle: string) => {
    const targetTitleLabel = getKey(targetTitle, messages);
    const goTo = () => {
      const element = document.getElementById(normalizeTitle(targetTitleLabel));
      if (element) {
        element.focus();
        element.scrollTo();
      }
    };

    return (
      <Menu.Item as="button" name={getKey(labelKey, messages)} onClick={goTo} />
    );
  };

  return (
    <Menu as="nav" pointing secondary fluid widths={3}>
      {getMenuItem('home.menu.schedule', 'home.page.schedule')}
      {getMenuItem('home.menu.sponsors', 'home.page.sponsors')}
      {getMenuItem('home.menu.register', 'home.page.register')}
    </Menu>
  );
};

export default PageMenu;
