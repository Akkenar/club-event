import * as React from 'react';
import { useContext, useEffect } from 'react';
import { Header } from 'semantic-ui-react';
import getKey from '../core/intl/getKey';
import LanguageContext from '../core/intl/LanguageContext';
import { goToTop, setPageTitle } from '../core/page.lib';
import RegistrationsContainer from './RegistrationsContainer';

const RegistrationsPage = () => {
  const { messages } = useContext(LanguageContext);

  useEffect(() => {
    setPageTitle(getKey('registrations.page.title', messages));
    goToTop();
  });

  return (
    <div className="RegistrationPage">
      <Header as="h1">{getKey('registrations.page.title', messages)}</Header>
      <RegistrationsContainer />
    </div>
  );
};

export default RegistrationsPage;
