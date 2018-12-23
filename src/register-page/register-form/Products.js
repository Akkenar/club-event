import React, { useContext } from 'react';
import { Header, Form, Message } from 'semantic-ui-react';
import getKey from '../../core/intl/getKey';
import QuantitySelector from './QuantitySelector';
import LanguageContext from '../../core/intl/LanguageContext';

const Products = ({ state, handleChange, total }) => {
  const { messages } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <Header dividing as="h2">
        {getKey('register.form.counts', messages)}
      </Header>
      <p>{getKey('register.form.counts.description', messages)}</p>
      <Header dividing as="h3">
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
      <Header dividing as="h3">
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
      <Header dividing as="h3">
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
        error
        visible={state.errors.total}
        content={getKey('register.form.error.total', messages)}
      />
      <div className="RegisterForm__total-price">
        {getKey('register.form.counts.total', messages)} : CHF {total}
      </div>
    </React.Fragment>
  );
};

export default Products;
