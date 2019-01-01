import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { render } from 'react-testing-library';
import { IntlType } from '../intl/intl.type';
import LanguageContext from '../intl/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const context: IntlType = {
  confirmation: '',
  information: '',
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
        <Route path="/:language/:page" component={Component} />
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
});
