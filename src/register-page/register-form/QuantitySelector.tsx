import * as React from 'react';
import { ChangeEvent, useContext } from 'react';
import { Button, Form, Icon, Segment } from 'semantic-ui-react';
import getKey from '../../core/intl/getKey';
import LanguageContext from '../../core/intl/LanguageContext';
import { PRICES } from '../prices';
import { Registration } from '../register.type';

import './QuantitySelector.scss';

export type SetQuantityType = (name: string, quantity: number) => void;

export interface QuantitySelectorProps {
  name: string;
  setQuantity: SetQuantityType;
  state: Registration;
}

function parseProduct(state: Registration, name: string): number {
  const value = state.products[name];
  if (!value) {
    return 0;
  }
  return parseInt(value.toString(), 10);
}

const QuantitySelector = ({
  name,
  setQuantity,
  state,
}: QuantitySelectorProps) => {
  const { messages } = useContext(LanguageContext);
  const itemPrice = PRICES[name] as number;
  const quantity = parseProduct(state, name);

  const addOne = () => setQuantity(name, quantity + 1);
  const removeOne = () => setQuantity(name, quantity - 1);
  const removeAll = () => setQuantity(name, 0);
  const setCustom = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setQuantity(name, value);
    }
  };

  return (
    <Form.Field className="QuantitySelector full-width">
      <Segment className="QuantitySelector__Container">
        <label className="QuantitySelector__Label" htmlFor={name}>
          {getKey(`register.form.counts.${name}`, messages)} (CHF {itemPrice})
        </label>
        <div className="QuantitySelector__Controls">
          <Button
            type="button"
            className="QuantitySelector__Button QuantitySelector__Button--minus"
            icon={true}
            data-testid={`${name}-minus`}
            onClick={removeOne}
            title="Minus"
            disabled={quantity === 0}
          >
            <Icon name="minus" />
          </Button>
          {quantity ? (
            <button
              onClick={removeAll}
              type="button"
              title="Remove"
              className="QuantitySelector__Clear"
              data-testid={`${name}-clear`}
            >
              <Icon name="remove" />
            </button>
          ) : null}
          <input
            type="number"
            pattern="[0-9]*"
            min={0}
            max={100}
            data-testid={name}
            id={name}
            className="QuantitySelector__Quantity"
            value={quantity || ''}
            onChange={setCustom}
            minLength={1}
            maxLength={3}
          />
          <Button
            type="button"
            className="QuantitySelector__Button QuantitySelector__Button--plus"
            icon={true}
            data-testid={`${name}-plus`}
            onClick={addOne}
            title="Plus"
          >
            <Icon name="plus" />
          </Button>
        </div>
      </Segment>
    </Form.Field>
  );
};

export default QuantitySelector;
