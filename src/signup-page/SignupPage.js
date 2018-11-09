import React, { useContext, useEffect } from 'react';
import SignupFormContainer from '../signup-form/SignupFormContainer';
import { Header } from 'semantic-ui-react';
import getKey from '../intl/getKey';
import { setPageTitle } from '../page.lib';
import LanguageContext from '../intl/LanguageContext';

const SignupPage = () => {
  const { messages } = useContext(LanguageContext);

  useEffect(() => {
    setPageTitle(getKey('register.page.title', messages));
  });

  return (
    <div>
      <Header as="h1">{getKey('register.page.title', messages)}</Header>
      <SignupFormContainer />
    </div>
  );
};

export default SignupPage;
