import React, { Fragment, useContext, useEffect } from 'react';
import logo from '../assets/logo.svg';
import getKey from '../intl/getKey';
import LanguageContext from '../intl/LanguageContext';
import { setPageTitle } from '../page.lib';
import { Header } from 'semantic-ui-react';

import './ConfirmationPage.scss';

function format(confirmation, total, reference) {
  return confirmation
    .replace('%TOTAL%', total)
    .replace('%REFERENCE%', reference);
}

const ConfirmationPage = () => {
  const { messages } = useContext(LanguageContext);
  useEffect(() => {
    setPageTitle(getKey('confirmation.page.title', messages));
  });

  const confirmationMessage = format(
    messages.confirmation,
    '10',
    'ABCD-123123'
  );

  return (
    <Fragment>
      <Header as="h1">{getKey('confirmation.page.title', messages)}</Header>
      <div dangerouslySetInnerHTML={{ __html: confirmationMessage }} />
      <img
        className="Confirmation__logo"
        src={logo}
        alt={getKey('header.logo', messages)}
      />
    </Fragment>
  );
};

export default ConfirmationPage;
