import * as React from 'react';
import { useContext, useEffect } from 'react';
import getKey from '../core/intl/getKey';
import LanguageContext from '../core/intl/LanguageContext';
import { goToTop, setPageTitle } from '../core/page.lib';
import LoginForm from './LoginForm';

const LoginPage = () => {
  const { messages } = useContext(LanguageContext);

  useEffect(() => {
    setPageTitle(getKey('login.page.title', messages));
    goToTop();
  });

  return (
    <div className="LoginPage">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
