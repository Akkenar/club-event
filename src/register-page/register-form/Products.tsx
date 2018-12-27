import * as React from 'react';
import { useContext } from 'react';
import { Form, Header, Message } from 'semantic-ui-react';
import getKey from '../../core/intl/getKey';
import LanguageContext from '../../core/intl/LanguageContext';
import { Registration } from '../register.type';
import QuantitySelector from './QuantitySelector';

export interface ProductsProps {
  handleChange: any;
  state: Registration;
  total: number;
}

const Products = ({ state, handleChange, total }: ProductsProps) => {
  const { messages } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <Header dividing={true} as="h2">
        {getKey('register.form.counts', messages)}
      </Header>
      <p>{getKey('register.form.counts.description', messages)}</p>
      <Header dividing={true} as="h3">
        {getKey('register.form.food', messages)}
      </Header>
      <p>{getKey('register.form.food.description', messages)}</p>
      <Form.Group widths="equal">
        <QuantitySelector
          state={state}
          name="dinner"
          handleChange={handleChange}
        />
        <QuantitySelector
          state={state}
          name="vegetarian"
          handleChange={handleChange}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <QuantitySelector
          state={state}
          name="breakfast"
          handleChange={handleChange}
        />
        <QuantitySelector
          state={state}
          name="picknick"
          handleChange={handleChange}
        />
      </Form.Group>
      <Header dividing={true} as="h3">
        {getKey('register.form.accommodation', messages)}
      </Header>
      <p>{getKey('register.form.accommodation.description', messages)}</p>
      <Form.Group widths="equal">
        <QuantitySelector
          state={state}
          name="sleeping"
          handleChange={handleChange}
        />
        <QuantitySelector
          state={state}
          name="camping"
          handleChange={handleChange}
        />
      </Form.Group>
      <Header dividing={true} as="h3">
        {getKey('register.form.goodies', messages)}
      </Header>
      <p>{getKey('register.form.goodies.description', messages)}</p>
      <Form.Group widths="equal">
        <QuantitySelector
          state={state}
          name="itemSize1"
          handleChange={handleChange}
        />
        <QuantitySelector
          state={state}
          name="itemSize2"
          handleChange={handleChange}
        />
        <QuantitySelector
          state={state}
          name="itemSize3"
          handleChange={handleChange}
        />
        <QuantitySelector
          state={state}
          name="itemSize4"
          handleChange={handleChange}
        />
      </Form.Group>
      <Message
        error={true}
        visible={state.errors && state.errors.total}
        content={getKey('register.form.error.total', messages)}
      />
      <div className="RegisterForm__total-price">
        {getKey('register.form.counts.total', messages)} : CHF {total}
      </div>
    </React.Fragment>
  );
};

export default Products;
