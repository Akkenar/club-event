import React from 'react';
import { useContext } from 'react';
import { Form, Header, Message } from 'semantic-ui-react';
import getKey from '../../core/intl/getKey';
import LanguageContext from '../../core/intl/LanguageContext';
import { Registration } from '../register.type';
import QuantitySelector, { SetQuantityType } from './QuantitySelector';
import environment from '../../environment/environment';

export interface ProductsProps {
  setQuantity: SetQuantityType;
  state: Registration;
  total: number;
}

const Products = ({ state, setQuantity, total }: ProductsProps) => {
  const { messages } = useContext(LanguageContext);
  const isFoodRegistrationEnabled = environment.registration.tier1.enabled;

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
      <Message warning={true} visible={!isFoodRegistrationEnabled}>
        {getKey('register.form.food.disabled', messages)}
      </Message>
      <Form.Group widths="equal">
        <QuantitySelector
          state={state}
          name="dinner"
          setQuantity={setQuantity}
          disabled={!isFoodRegistrationEnabled}
        />
        <QuantitySelector
          state={state}
          name="vegetarian"
          setQuantity={setQuantity}
          disabled={!isFoodRegistrationEnabled}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <QuantitySelector
          state={state}
          name="dinnerKid"
          setQuantity={setQuantity}
          disabled={!isFoodRegistrationEnabled}
        />
        <QuantitySelector
          state={state}
          name="vegetarianKid"
          setQuantity={setQuantity}
          disabled={!isFoodRegistrationEnabled}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <QuantitySelector
          state={state}
          name="breakfast"
          setQuantity={setQuantity}
        />
        <QuantitySelector
          state={state}
          name="picknick"
          setQuantity={setQuantity}
        />
      </Form.Group>
      <Header dividing={true} as="h3">
        {getKey('register.form.accommodation', messages)}
      </Header>
      <p>{getKey('register.form.accommodation.description', messages)}</p>
      <Form.Group widths="equal">
        <QuantitySelector
          state={state}
          name="sleepingAtGym"
          setQuantity={setQuantity}
        />
        <QuantitySelector
          state={state}
          name="camping"
          setQuantity={setQuantity}
        />
      </Form.Group>
      <Message
        data-testid="total-error"
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
