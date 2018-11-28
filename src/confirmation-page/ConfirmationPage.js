import React, { Fragment, useContext, useEffect } from 'react';
import getKey from '../intl/getKey';
import LanguageContext from '../intl/LanguageContext';
import { setPageTitle } from '../page.lib';
import { Header } from 'semantic-ui-react';

import { getSimpleStore } from '../simpleStore';
import LazyImage from '../lazy-image/LazyImage';

import img from '../assets/Zsolt-Sarkozi-Grottes-aux-Fees-17.jpg';
import imgwebp from '../assets/Zsolt-Sarkozi-Grottes-aux-Fees-17.webp';

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

  // From the register form.
  const { total, reference } = getSimpleStore();
  const confirmationMessage = format(messages.confirmation, total, reference);

  return (
    <Fragment>
      <Header as="h1">{getKey('confirmation.page.title', messages)}</Header>
      <div dangerouslySetInnerHTML={{ __html: confirmationMessage }} />
      <LazyImage
        width={320}
        src={img}
        srcwebp={imgwebp}
        alt={'Photo: Zsolt Sarkozi'}
      />
    </Fragment>
  );
};

export default ConfirmationPage;
