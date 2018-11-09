import React, { useEffect } from 'react';
import SignupForm from '../signup-form/SignupForm';
import { Header } from 'semantic-ui-react';
import getKey from '../intl/getKey';
import { injectIntl } from 'react-intl';
import { setPageTitle } from '../page.lib';

const SignupPage = props => {
  useEffect(() => {
    setPageTitle(getKey('register.page.title', props));
  });

  return (
    <div>
      <Header as="h2">{getKey('register.page.header', props)}</Header>
      <SignupForm />
    </div>
  );
};

export default injectIntl(SignupPage);
