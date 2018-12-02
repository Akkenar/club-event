import React from 'react';
import { render } from 'react-testing-library';
import ConfirmationPage from './ConfirmationPage';

describe('ConfirmationPage', () => {
  it('should match the snapshot', () => {
    const wrapper = render(<ConfirmationPage />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should set the page title', () => {
    // Will be set by side effect through a hook
    render(<ConfirmationPage />);
    expect(document.title).toEqual('confirmation.page.title');
  });
});
