import * as React from 'react';
import { useContext, useEffect } from 'react';
import { Button, Header } from 'semantic-ui-react';
import * as img from '../assets/Zsolt-Sarkozi-Grottes-aux-Fees-17.jpg';
import * as imgwebp from '../assets/Zsolt-Sarkozi-Grottes-aux-Fees-17.webp';
import getKey from '../core/intl/getKey';
import LanguageContext from '../core/intl/LanguageContext';
import LazyImage from '../core/lazy-image/LazyImage';
import OrderRecap from '../core/order-recap/OrderRecap';
import { setPageTitle } from '../core/page.lib';
import { getSimpleStore } from '../core/simpleStore';

import './ConfirmationPage.scss';

function format(
  confirmation: string,
  total: string,
  reference: string
): string {
  if (!confirmation) {
    return confirmation;
  }

  return confirmation
    .replace('%TOTAL%', total)
    .replace('%REFERENCE%', reference);
}

function printPage() {
  window.print();
}

function supportsPrint() {
  return typeof window.print === 'function';
}

const ConfirmationPage = () => {
  const { messages } = useContext(LanguageContext);
  useEffect(() => {
    setPageTitle(getKey('confirmation.page.title', messages));
  });

  // From the register form.
  const registration = getSimpleStore();
  const { total, reference } = registration;
  const confirmationMessage = format(messages.confirmation, total, reference);

  const printButton = supportsPrint() ? (
    <Button
      color="green"
      onClick={printPage}
      className="ConfirmationPage__print"
    >
      {getKey('confirmation.page.print', messages)}
    </Button>
  ) : null;

  return (
    <div className="ConfirmationPage">
      <Header as="h1">{getKey('confirmation.page.title', messages)}</Header>
      <div dangerouslySetInnerHTML={{ __html: confirmationMessage }} />
      <Header as="h2">
        {getKey('confirmation.page.recap.title', messages)}
      </Header>
      <OrderRecap registration={registration} />
      {printButton}
      <LazyImage
        className="no-print"
        width={320}
        height={400}
        src={img}
        srcwebp={imgwebp}
        alt={'Photo: Zsolt Sarkozi'}
      />
    </div>
  );
};

export default ConfirmationPage;
