import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ConfirmationPageAsync from './confirmation-page/ConfirmationPageAsync';
import HomePageAsync from './home-page/HomePageAsync';
import LoginPageAsync from './login-page/LoginPageAsync';
import RegisterPageAsync from './register-page/RegisterPageAsync';
import RegistrationsPageAsync from './registrations-page/RegistrationsPageAsync';

interface AppRoutingProps {
  language: string;
}

const AppRouting = ({ language }: AppRoutingProps) => {
  const page = (pageName: string): string => `/${language}/${pageName}`;
  return (
    <Switch>
      <Route path={page('home')} component={HomePageAsync} />
      <Route path={page('register')} component={RegisterPageAsync} />
      <Route path={page('confirmation')} component={ConfirmationPageAsync} />
      <Route path={page('login')} component={LoginPageAsync} />
      <Route path={page('registrations')} component={RegistrationsPageAsync} />
      <Redirect to={page('home')} />
    </Switch>
  );
};

export default AppRouting;
