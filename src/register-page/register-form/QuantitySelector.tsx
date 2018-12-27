import * as React from 'react';
import { useContext } from 'react';
import { Form } from 'semantic-ui-react';
import getKey from '../../core/intl/getKey';
import LanguageContext from '../../core/intl/LanguageContext';
import { PRICES } from './prices';
import { Registration } from './register.type';

export interface QuantitySelectorProps {
  name: string;
  handleChange: any;
  state: Registration;
}

const QuantitySelector = ({
  name,
  handleChange,
  state,
}: QuantitySelectorProps) => {
  const { messages } = useContext(LanguageContext);
  const itemPrice = PRICES[name] as number;

  const getOption = (index: number) => (
    <option value={index}>
      {index} (CHF {index * itemPrice})
    </option>
  );

  return (
    <Form.Field>
      <label htmlFor={name}>
        {getKey(`register.form.counts.${name}`, messages)} (CHF {itemPrice})
      </label>
      <select
        id={name}
        name={name}
        value={state.products[name]}
        onChange={handleChange}
        data-testid={name}
      >
        <option value="0">0</option>
        {getOption(1)}
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

export default QuantitySelector;
