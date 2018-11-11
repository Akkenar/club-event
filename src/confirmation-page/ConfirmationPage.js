import React, { Fragment, useContext, useEffect } from 'react';
import getKey from '../intl/getKey';
import LanguageContext from '../intl/LanguageContext';
import { setPageTitle } from '../page.lib';
import { Header } from 'semantic-ui-react';

import { getSimpleStore } from '../simpleStore';
import Logo from '../logo/Logo';

function format(confirmation, total, reference) {
  return confirmation
    .replace('%DISPLAY_PAYMENT%', +total ? 'block' : 'none')
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
      <Logo big />
    </Fragment>
  );
};

export default ConfirmationPage;
