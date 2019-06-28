import { Fragment, useState } from 'react';
import * as React from 'react';
import { fireEvent, render, waitForElement } from '@testing-library/react';
import QuantitySelector from './QuantitySelector';

const StatefulWrapper = () => {
  const [stateQuantity, setStateQuantity] = useState(0);

  const setQuantity = (name: string, quantity: number) => {
    setStateQuantity(quantity);
  };

  const state: any = {
    products: {
      test: stateQuantity,
    },
  };

  return (
    <Fragment>
      <QuantitySelector name="test" setQuantity={setQuantity} state={state} />
      <div data-testid="value">{stateQuantity}</div>
    </Fragment>
  );
};

describe('QuantitySelector', () => {
  it('should accept custom valid quantities', async () => {
    const wrapper = render(<StatefulWrapper />);

    fireEvent.change(wrapper.queryByTestId('test'), {
      target: { value: '10' },
    });

    expect(wrapper.getByTestId('value').innerHTML).toEqual('10');
  });

  it('should reject custom text quantities', () => {
    const wrapper = render(<StatefulWrapper />);

    fireEvent.change(wrapper.queryByTestId('test'), {
      target: { value: 'NOT VALID' },
    });

    expect(wrapper.getByTestId('value').innerHTML).toEqual('0');
  });

  it('should handle custom null quantities', () => {
    const wrapper = render(<StatefulWrapper />);

    fireEvent.change(wrapper.queryByTestId('test'), {
      target: { value: null },
    });

    expect(wrapper.getByTestId('value').innerHTML).toEqual('0');
  });

  it('should handle custom empty quantities', async () => {
    const wrapper = render(<StatefulWrapper />);
    await waitForElement(() => wrapper.queryByTestId('test'));

    fireEvent.change(wrapper.queryByTestId('test'), {
      target: { value: '' },
    });

    expect(wrapper.getByTestId('value').innerHTML).toEqual('0');
  });

  it('should increase and decrease the value', () => {
    const wrapper = render(<StatefulWrapper />);

    wrapper.queryByTestId('test-plus').click();
    expect(wrapper.getByTestId('value').innerHTML).toEqual('1');

    wrapper.queryByTestId('test-minus').click();
    expect(wrapper.getByTestId('value').innerHTML).toEqual('0');
  });

  it('should clear the value', () => {
    const wrapper = render(<StatefulWrapper />);

    wrapper.queryByTestId('test-plus').click();
    expect(wrapper.getByTestId('value').innerHTML).toEqual('1');

    wrapper.queryByTestId('test-clear').click();
    expect(wrapper.getByTestId('value').innerHTML).toEqual('0');
  });
});
