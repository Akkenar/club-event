import React from 'react';
import { useContext, useEffect } from 'react';
import { Button, Header } from 'semantic-ui-react';
import * as img from '../assets/Zsolt-Sarkozi-Grottes-aux-Fees-17.jpg';
import getKey from '../core/intl/getKey';
import LanguageContext from '../core/intl/LanguageContext';
import LazyImage from '../core/lazy-image/LazyImage';
import OrderRecap from '../core/order-recap/OrderRecap';
import { setPageTitle } from '../core/page.lib';
import { getSimpleStore } from '../core/simpleStore';

import './ConfirmationPage.scss';

function format(
  confirmation: string,
  total: number | null,
  reference: string,
): string {
  if (!confirmation) {
    return confirmation;
  }

  return confirmation
    .replace('%TOTAL%', (total || '').toString())
    .replace('%REFERENCE%', reference);
}

function printPage() {
  window.print();
}

function supportsPrint() {
  return typeof window.print === 'function';
}

const ConfirmationPage = () => {
  const { messages, confirmation } = useContext(LanguageContext);
  useEffect(() => {
    setPageTitle(getKey('confirmation.page.title', messages));
  });

  // From the register form.
  const registration = getSimpleStore();
  const { total = null, reference = '' } = registration || {};
  const confirmationMessage = format(confirmation, total, reference);

  return (
    <div className="ConfirmationPage">
      <Header as="h1" data-testid="main-title">
        {getKey('confirmation.page.title', messages)}
      </Header>
      <div dangerouslySetInnerHTML={{ __html: confirmationMessage }} />
      <Header as="h2">
        {getKey('confirmation.page.recap.title', messages)}
      </Header>
      {registration ? <OrderRecap registration={registration} /> : null}
      <Button
        disabled={!supportsPrint()}
        color="green"
        onClick={printPage}
        className="ConfirmationPage__print"
      >
        {getKey('confirmation.page.print', messages)}
      </Button>
      <LazyImage
        className="no-print"
        width={320}
        height={400}
        src={img}
        alt={'Photo: Zsolt Sarkozi'}
      />
    </div>
  );
};

export default ConfirmationPage;
