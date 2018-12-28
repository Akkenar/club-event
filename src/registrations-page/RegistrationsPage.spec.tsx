import * as React from 'react';
import { render } from 'react-testing-library';
import { Results } from '../core/api.type';
import { mockGrecaptcha, mockResponse } from '../test-utils/test-utils.lib';
import RegistrationsPage from './RegistrationsPage';

mockGrecaptcha();
mockResponse(Results.ERROR);

describe('RegistrationsPage', () => {
  it('should match the snapshot', () => {
    const wrapper = render(<RegistrationsPage />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should set the page title', () => {
    // Will be set by side effect through a hook
    render(<RegistrationsPage />);
    expect(document.title).toEqual('registrations.page.title');
  });
});
