import React, { useContext, useEffect } from 'react';
import SignupFormContainer from './signup-form/SignupFormContainer';
import { Header } from 'semantic-ui-react';
import getKey from '../core/intl/getKey';
import { goToTop, setPageTitle } from '../page.lib';
import LanguageContext from '../core/intl/LanguageContext';

const SignupPage = () => {
  const { messages } = useContext(LanguageContext);

  useEffect(() => {
    setPageTitle(getKey('register.page.title', messages));
    goToTop();
  });

  return (
    <div>
      <Header as="h1">{getKey('register.page.title', messages)}</Header>
      <SignupFormContainer />
    </div>
  );
};

export default SignupPage;
