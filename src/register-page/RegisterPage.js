import React, { useContext, useEffect } from 'react';
import RegisterFormContainer from './register-form/RegisterFormContainer';
import { Header } from 'semantic-ui-react';
import getKey from '../core/intl/getKey';
import { goToTop, setPageTitle } from '../page.lib';
import LanguageContext from '../core/intl/LanguageContext';

const RegisterPage = () => {
  const { messages } = useContext(LanguageContext);

  useEffect(() => {
    setPageTitle(getKey('register.page.title', messages));
    goToTop();
  });

  return (
    <div>
      <Header as="h1">{getKey('register.page.title', messages)}</Header>
      <RegisterFormContainer />
    </div>
  );
};

export default RegisterPage;
