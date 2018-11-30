import React, { Fragment, useContext, useEffect } from 'react';
import getKey from '../intl/getKey';
import LanguageContext from '../intl/LanguageContext';
import { setPageTitle } from '../page.lib';
import { Button, Header } from 'semantic-ui-react';

import { getSimpleStore } from '../simpleStore';
import LazyImage from '../lazy-image/LazyImage';

import img from '../assets/Zsolt-Sarkozi-Grottes-aux-Fees-17.jpg';
import imgwebp from '../assets/Zsolt-Sarkozi-Grottes-aux-Fees-17.webp';
import OrderRecap from '../order-recap/OrderRecap';

import './ConfirmationPage.scss';

function format(confirmation, total, reference) {
  return confirmation
    .replace('%TOTAL%', total)
    .replace('%REFERENCE%', reference);
}

function printPage() {
  window.print();
}

function supportsPrint() {
  return window.print === 'function';
}

const ConfirmationPage = () => {
  const { messages } = useContext(LanguageContext);
  useEffect(() => {
    setPageTitle(getKey('confirmation.page.title', messages));
  });

  // From the register form.
  const data = getSimpleStore();
  const { total, reference } = data;
  const confirmationMessage = format(messages.confirmation, total, reference);

  const printButton = typeof supportsPrint() ? (
    <Button
      color="green"
      onClick={printPage}
      className="ConfirmationPage__print"
    >
      {getKey('confirmation.page.print', messages)}
    </Button>
  ) : null;

  return (
    <Fragment>
      <Header as="h1">{getKey('confirmation.page.title', messages)}</Header>
      <div dangerouslySetInnerHTML={{ __html: confirmationMessage }} />
      <OrderRecap {...data} />
      {printButton}
      <LazyImage
        className="no-print"
        width={320}
        src={img}
        srcwebp={imgwebp}
        alt={'Photo: Zsolt Sarkozi'}
      />
    </Fragment>
  );
};

export default ConfirmationPage;
