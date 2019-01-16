import * as React from 'react';
import { useContext } from 'react';
import { Segment, Table } from 'semantic-ui-react';
import getKey from '../core/intl/getKey';
import LanguageContext from '../core/intl/LanguageContext';
import { PRICES } from '../register-page/prices';
import { Registration } from '../register-page/register.type';

import './RegistrationsProducts.scss';

interface RegistrationsProductsProps {
  registrations: Registration[];
}

function getProductCount(
  productName: string,
  registrations: Registration[]
): number {
  return (
    registrations
      // Only look in the products for each registration.
      .map(regs => regs.products)
      // Sum all the counts for a given product.
      .reduce((total, products) => {
        const productCount = products[productName];
        if (!productCount) {
          return total;
        }

        // To support both number and string because the Registration
        // type is bullshit.
        return total + parseInt(productCount.toString(), 10);
      }, 0)
  );
}

const RegistrationsProducts = ({
  registrations,
}: RegistrationsProductsProps) => {
  const { messages } = useContext(LanguageContext);
  const getProduct = (productName: string) =>
    getProductCount(productName, registrations);

  const getProductLabel = (productName: string) => {
    const label = getKey(`register.form.counts.${productName}`, messages);
    const price = PRICES[productName];

    return `${label} (CHF ${price})`;
  };

  return (
    <Segment className="RegistrationsProducts">
      <Table
        className="RegistrationsProducts__Table"
        basic="very"
        celled={true}
        collapsing={true}
      >
        <Table.Body>
          <Table.Row>
            <Table.Cell>{getProductLabel('dinner')}</Table.Cell>
            <Table.Cell>{getProduct('dinner')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{getProductLabel('vegetarian')}</Table.Cell>
            <Table.Cell>{getProduct('vegetarian')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{getProductLabel('dinnerKid')}</Table.Cell>
            <Table.Cell>{getProduct('dinnerKid')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{getProductLabel('vegetarianKid')}</Table.Cell>
            <Table.Cell>{getProduct('vegetarianKid')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{getProductLabel('breakfast')}</Table.Cell>
            <Table.Cell>{getProduct('breakfast')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{getProductLabel('picknick')}</Table.Cell>
            <Table.Cell>{getProduct('picknick')}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Table
        className="RegistrationsProducts__Table"
        basic="very"
        celled={true}
        collapsing={true}
      >
        <Table.Body>
          <Table.Row>
            <Table.Cell>{getProductLabel('sleeping')}</Table.Cell>
            <Table.Cell>{getProduct('sleeping')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{getProductLabel('camping')}</Table.Cell>
            <Table.Cell>{getProduct('camping')}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default RegistrationsProducts;
