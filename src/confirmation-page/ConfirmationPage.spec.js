import React from 'react';
import { render } from 'react-testing-library';
import ConfirmationPage from './ConfirmationPage';
import { setSimpleStore } from '../simpleStore';

describe('ConfirmationPage', () => {
  it('should match the snapshot', () => {
    setSimpleStore({
      products: {
        dinner: 4,
        vegetarian: 4,
        sleeping: 1,
        breakfast: 1,
        camping: 1,
        picknick: 1,
        itemSize1: 2,
        itemSize2: 2,
        itemSize3: 2,
        itemSize4: 2,
      },
    });
    const wrapper = render(<ConfirmationPage />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should set the page title', () => {
    // Will be set by side effect through a hook
    render(<ConfirmationPage />);
    expect(document.title).toEqual('confirmation.page.title');
  });
});
