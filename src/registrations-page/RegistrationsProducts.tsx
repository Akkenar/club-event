import * as React from 'react';
import { useContext } from 'react';
import { Segment, Table } from 'semantic-ui-react';
import getKey from '../core/intl/getKey';
import LanguageContext from '../core/intl/LanguageContext';
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

  if (!registrations || !registrations.length) {
    return null;
  }

  const getProduct = (productName: string) =>
    getProductCount(productName, registrations);

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
            <Table.Cell>
              {getKey('register.form.counts.dinner', messages)}
            </Table.Cell>
            <Table.Cell>{getProduct('dinner')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {getKey('register.form.counts.vegetarian', messages)}
            </Table.Cell>
            <Table.Cell>{getProduct('vegetarian')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {getKey('register.form.counts.breakfast', messages)}
            </Table.Cell>
            <Table.Cell>{getProduct('breakfast')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {getKey('register.form.counts.picknick', messages)}
            </Table.Cell>
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
            <Table.Cell>
              {getKey('register.form.counts.sleeping', messages)}
            </Table.Cell>
            <Table.Cell>{getProduct('sleeping')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {getKey('register.form.counts.camping', messages)}
            </Table.Cell>
            <Table.Cell>{getProduct('camping')}</Table.Cell>
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
            <Table.Cell>
              {getKey('register.form.counts.itemSize1', messages)}
            </Table.Cell>
            <Table.Cell>{getProduct('itemSize1')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {getKey('register.form.counts.itemSize2', messages)}
            </Table.Cell>
            <Table.Cell>{getProduct('itemSize2')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {getKey('register.form.counts.itemSize3', messages)}
            </Table.Cell>
            <Table.Cell>{getProduct('itemSize3')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {getKey('register.form.counts.itemSize4', messages)}
            </Table.Cell>
            <Table.Cell>{getProduct('itemSize4')}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default RegistrationsProducts;
