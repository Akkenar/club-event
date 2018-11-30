import React, { useContext } from 'react';
import LanguageContext from '../intl/LanguageContext';
import getKey from '../intl/getKey';

import './OrderRecap.scss';
import { Segment } from 'semantic-ui-react';

const OrderRecap = ({
  firstName,
  lastName,
  club,
  dinner,
  sleeping,
  camping,
  picknick,
  breakfast,
  total,
  street,
  no,
  npa,
  locality,
}) => {
  const { messages } = useContext(LanguageContext);

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
      <dl className="OrderRecap__container">
        <dd className="OrderRecap__title">
          {getKey('register.form.counts.dinner', messages)}
        </dd>
        <dt className="OrderRecap__value">{dinner}</dt>

        <dd className="OrderRecap__title">
          {getKey('register.form.counts.picknick', messages)}
        </dd>
        <dt className="OrderRecap__value">{picknick}</dt>

        <dd className="OrderRecap__title">
          {getKey('register.form.counts.breakfast', messages)}
        </dd>
        <dt className="OrderRecap__value">{breakfast}</dt>

        <dd className="OrderRecap__title">
          {getKey('register.form.counts.sleeping', messages)}
        </dd>
        <dt className="OrderRecap__value">{sleeping}</dt>

        <dd className="OrderRecap__title">
          {getKey('register.form.counts.camping', messages)}
        </dd>
        <dt className="OrderRecap__value">{camping}</dt>
      </dl>
    </Segment>
  );
};

export default OrderRecap;
