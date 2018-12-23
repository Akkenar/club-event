import React, { Fragment, useContext } from 'react';
import LanguageContext from '../../core/intl/LanguageContext';
import getKey from '../../core/intl/getKey';
import { Segment } from 'semantic-ui-react';

import './OrderRecap.scss';

const OrderRecap = ({
  firstName,
  lastName,
  club,
  total,
  street,
  no,
  npa,
  locality,
  products,
}) => {
  const { messages } = useContext(LanguageContext);

  const productContent = Object.keys(products).map(name => {
    return (
      <Fragment key={name}>
        <dd className="OrderRecap__title">
          {getKey(`register.form.counts.${name}`, messages)}
        </dd>
        <dt className="OrderRecap__value">{products[name]}</dt>
      </Fragment>
    );
  });

  return (
    <Segment raised className="OrderRecap">
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
      </dl>
      <dl className="OrderRecap__container">{productContent}</dl>
    </Segment>
  );
};

export default OrderRecap;
