import React, { useContext } from 'react';
import getKey from '../intl/getKey';
import { Form } from 'semantic-ui-react';
import LanguageContext from '../intl/LanguageContext';
import { PRICES } from './SignupFormContainer';

const BookingField = ({ name, handleChange, state, error }) => {
  const { messages } = useContext(LanguageContext);
  const itemPrice = PRICES[name];

  const getOption = index => (
    <option value={index}>
      {index} (CHF {index * itemPrice})
    </option>
  );

  return (
    <Form.Field required error={error}>
      <label htmlFor={name}>
        {getKey(`register.form.counts.${name}`, messages)} (CHF {itemPrice})
      </label>
      <select
        id={name}
        name={name}
        value={state[name]}
        onChange={handleChange}
        required
        aria-invalid={error}
        data-errorname="counts"
      >
        <option value="0">0</option>
        {getOption(2)}
        {getOption(3)}
        {getOption(4)}
        {getOption(5)}
        {getOption(6)}
        {getOption(7)}
        {getOption(8)}
        {getOption(9)}
        {getOption(10)}
      </select>
    </Form.Field>
  );
};

export default BookingField;
