import * as React from 'react';
import { render } from 'react-testing-library';
import { setSimpleStore } from '../simpleStore';
import ConfirmationPage from './ConfirmationPage';

describe('ConfirmationPage', () => {
  it('should match the snapshot', () => {
    setSimpleStore({
      products: {
        breakfast: 1,
        camping: 1,
        dinner: 4,
        itemSize1: 2,
        itemSize2: 2,
        itemSize3: 2,
        itemSize4: 2,
        picknick: 1,
        sleeping: 1,
        vegetarian: 4,
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
