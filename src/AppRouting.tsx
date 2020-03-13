import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ConfirmationPageAsync from './confirmation-page/ConfirmationPageAsync';
import { BASE_URL_WITH_LANG } from './core/intl/provideTranslations';
import HomePageAsync from './home-page/HomePageAsync';
import LoginPageAsync from './login-page/LoginPageAsync';
import RegisterPageAsync from './register-page/RegisterPageAsync';
import RegistrationsPageAsync from './registrations-page/RegistrationsPageAsync';

/**
 * List all the pages in the application.
 * @constructor
 */
const AppRouting = () => {
  const page = (pageName: string): string =>
    `${BASE_URL_WITH_LANG}/${pageName}`;
  return (
    <Switch>
      <Route path={page('home')} component={HomePageAsync} />
      <Route path={page('register')} component={RegisterPageAsync} />
      <Route path={page('confirmation')} component={ConfirmationPageAsync} />
      <Route path={page('login')} component={LoginPageAsync} />
      <Route path={page('registrations')} component={RegistrationsPageAsync} />
    </Switch>
  );
};

export default AppRouting;
