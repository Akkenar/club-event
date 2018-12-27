import * as React from 'react';
import { Fragment, useContext } from 'react';
import { Segment } from 'semantic-ui-react';
import getKey from '../../core/intl/getKey';
import LanguageContext from '../../core/intl/LanguageContext';
import { Products } from '../../register-page/register-form/register.type';

import './OrderRecap.scss';

export interface OrderRecapProps {
  firstName: string;
  lastName: string;
  club: string;
  total: string;
  street: string;
  no: string;
  npa: string;
  locality: string;
  products: Products;
}

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
}: OrderRecapProps) => {
  const { messages } = useContext(LanguageContext);

  const productContent =
    products &&
    Object.keys(products).map(name => {
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
      </dl>
      <dl className="OrderRecap__container">{productContent}</dl>
    </Segment>
  );
};

export default OrderRecap;