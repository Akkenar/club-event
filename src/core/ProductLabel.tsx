import * as React from 'react';
import { Fragment, useContext } from 'react';
import { PRICES } from '../register-page/prices';
import getKey from './intl/getKey';
import LanguageContext from './intl/LanguageContext';

function formatPrice(
  label: string,
  price: number | string = 0,
  noPriceLabel: string
) {
  const priceNumber = parseInt(price.toString(), 10);
  if (priceNumber > 0) {
    return `${label} (CHF ${price})`;
  }

  return `${label} (${noPriceLabel})`;
}

interface ProductLabelProps {
  name: string;
}

const ProductLabel = ({ name }: ProductLabelProps) => {
  const { messages } = useContext(LanguageContext);

  const getProductLabel = (productName: string) => {
    const label = getKey(`register.form.counts.${productName}`, messages);
    const noPriceLabel = getKey('noprice', messages);
    const price = PRICES[productName];

    return formatPrice(label, price, noPriceLabel);
  };

  return <Fragment>{getProductLabel(name)}</Fragment>;
};

export default ProductLabel;
