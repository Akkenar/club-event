import * as React from 'react';
import { render } from 'react-testing-library';
import { mockGrecaptcha } from '../test-utils/test-utils.lib';
import RegisterPage from './RegisterPage';

mockGrecaptcha();

describe('RegisterPage', () => {
  it('should match the snapshot', () => {
    const wrapper = render(<RegisterPage />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should set the page title', () => {
    // Will be set by side effect through a hook
    render(<RegisterPage />);
    expect(document.title).toEqual('register.page.title');
  });
});
