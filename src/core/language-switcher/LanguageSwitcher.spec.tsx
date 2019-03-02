import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { render } from 'react-testing-library';
import { IntlType } from '../intl/intl.type';
import LanguageContext from '../intl/LanguageContext';
import { BASE_URL_WITH_LANG } from '../intl/provideTranslations';
import LanguageSwitcher from './LanguageSwitcher';

jest.mock('../intl/importLanguage', () => ({
  preloadAllLanguages: jest.fn(),
}));

import { preloadAllLanguages } from '../intl/importLanguage';

const context: IntlType = {
  confirmation: '',
  information: '',
  schedule: '',
  language: 'en',
  messages: {},
};

const LanguageSwitcherWithRouter = () => {
  const Component = () => (
    <LanguageContext.Provider value={context}>
      <LanguageSwitcher />
    </LanguageContext.Provider>
  );

  return (
    <BrowserRouter>
      <Switch>
        <Route path={`${BASE_URL_WITH_LANG}/:page`} component={Component} />
        <Redirect path="/" exact={true} to="/en/home" />
      </Switch>
    </BrowserRouter>
  );
};

describe('LanguageSwitcher', () => {
  it('should match snapshot', () => {
    const wrapper = render(<LanguageSwitcherWithRouter />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should preload all the languages when opening', () => {
    const wrapper = render(<LanguageSwitcherWithRouter />);
    expect(preloadAllLanguages).toHaveBeenCalledTimes(0);

    wrapper.getByTestId('language-switcher').click();
    expect(preloadAllLanguages).toHaveBeenCalledTimes(1);
  });
});
