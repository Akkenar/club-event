import React from 'react';
import SignupForm from '../signup-form/SignupForm';
import { Header } from 'semantic-ui-react';
import getKey from '../intl/getKey';
import { injectIntl } from 'react-intl';

const SignupPage = props => {
  return (
    <div>
      <Header as="h2">{getKey('register.page.header', props)}</Header>
      <SignupForm />
    </div>
  );
};

export default injectIntl(SignupPage);
