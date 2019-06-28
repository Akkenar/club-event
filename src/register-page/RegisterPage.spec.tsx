import * as React from 'react';
import { render } from '@testing-library/react';
import { mockInterestObservable } from '../test-utils/intersectObservable-utils.lib';
import { mockGrecaptcha } from '../test-utils/test-utils.lib';
import RegisterPage from './RegisterPage';

mockGrecaptcha();

describe('RegisterPage', () => {
  beforeEach(() => {
    mockInterestObservable();
  });

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
