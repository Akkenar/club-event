import React from 'react';
import { render } from 'react-testing-library';
import SignupPage from './SignupPage';

// Mock the Google recaptcha
window.grecaptcha = {
  render: jest.fn(),
};

describe('SignupPage', () => {
  it('should match the snapshot', () => {
    const wrapper = render(<SignupPage />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should set the page title', () => {
    // Will be set by side effect through a hook
    render(<SignupPage />);
    expect(document.title).toEqual('register.page.title');
  });
});
