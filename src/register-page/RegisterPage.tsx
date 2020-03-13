import React from 'react';
import { useContext, useEffect } from 'react';
import { Header } from 'semantic-ui-react';
import getKey from '../core/intl/getKey';
import LanguageContext from '../core/intl/LanguageContext';
import { goToTop, setPageTitle } from '../core/page.lib';
import RegisterFormContainer from './register-form/RegisterFormContainer';

const RegisterPage = () => {
  const { messages } = useContext(LanguageContext);

  useEffect(() => {
    setPageTitle(getKey('register.page.title', messages));
    goToTop();
  });

  return (
    <div>
      <Header as="h1" data-testid="main-title">
        {getKey('register.page.title', messages)}
      </Header>
      <RegisterFormContainer />
    </div>
  );
};

export default RegisterPage;
