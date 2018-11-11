import React, { Fragment, useContext, useEffect } from 'react';
import logo from '../assets/logo.svg';
import getKey from '../intl/getKey';
import LanguageContext from '../intl/LanguageContext';
import { setPageTitle } from '../page.lib';
import { Header } from 'semantic-ui-react';

import './ConfirmationPage.scss';
import { getSimpleStore } from '../simpleStore';

function format(confirmation, total, reference) {
  return confirmation
    .replace('%DISPLAY_PAYMENT%', total ? 'block' : 'none')
    .replace('%TOTAL%', total)
    .replace('%REFERENCE%', reference);
}

const ConfirmationPage = () => {
  const { messages } = useContext(LanguageContext);
  useEffect(() => {
    setPageTitle(getKey('confirmation.page.title', messages));
  });

  // From the signup form.
  const { total, reference } = getSimpleStore();
  const confirmationMessage = format(messages.confirmation, total, reference);

  return (
    <Fragment>
      <Header as="h1">{getKey('confirmation.page.title', messages)}</Header>
      <div dangerouslySetInnerHTML={{ __html: confirmationMessage }} />
      <img
        className="Confirmation__logo"
        src={logo}
        alt={getKey('logo.alt', messages)}
      />
    </Fragment>
  );
};

export default ConfirmationPage;
