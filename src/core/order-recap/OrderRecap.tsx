import * as React from 'react';
import { Fragment, useContext } from 'react';
import { Segment } from 'semantic-ui-react';
import { PRICES } from '../../register-page/prices';
import { Products, Registration } from '../../register-page/register.type';
import getKey from '../intl/getKey';
import LanguageContext from '../intl/LanguageContext';

import './OrderRecap.scss';

export interface OrderRecapProps {
  registration: Registration;
}

const OrderRecap = ({ registration }: OrderRecapProps) => {
  const { messages } = useContext(LanguageContext);

  const {
    firstName,
    lastName,
    club,
    total,
    street,
    no,
    npa,
    locality,
    products,
  } = registration;

  const getProductLabel = (productName: string) => {
    const label = getKey(`register.form.counts.${productName}`, messages);
    const price = PRICES[productName];

    return `${label} (CHF ${price})`;
  };

  const productContent =
    products &&
    Object.keys(products).map(name => {
      return (
        <Fragment key={name}>
          <dd className="OrderRecap__title">{getProductLabel(name)}</dd>
          <dt className="OrderRecap__value">{products[name]}</dt>
        </Fragment>
      );
    });

  return (
    <Segment raised={true} className="OrderRecap">
      <dl className="OrderRecap__container">
        <dd className="OrderRecap__title">
          {getKey('register.form.firstName', messages)}
        </dd>
        <dt className="OrderRecap__value">{firstName}</dt>

        <dd className="OrderRecap__title">
          {getKey('register.form.lastName', messages)}
        </dd>
        <dt className="OrderRecap__value">{lastName}</dt>

        <dd className="OrderRecap__title">
          {getKey('register.form.club', messages)}
        </dd>
        <dt className="OrderRecap__value">{club}</dt>

        <dd className="OrderRecap__title">
          {getKey('register.form.address', messages)}
        </dd>
        <dt className="OrderRecap__value">
          <address>
            <div>
              {street} {no}
            </div>
            <div>
              {npa} {locality}
            </div>
          </address>
        </dt>

        <dd className="OrderRecap__title">
          {getKey('register.form.counts.total', messages)}
        </dd>
        <dt className="OrderRecap__value">CHF {total}</dt>
        {productContent}
      </dl>
    </Segment>
  );
};

export default OrderRecap;
