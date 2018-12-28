import * as React from 'react';
import { render, waitForElement } from 'react-testing-library';
import mockRegistrations from '../../mocks/registrations.json';
import { mockGrecaptcha, mockResponse } from '../test-utils/test-utils.lib';
import RegistrationsPage from './RegistrationsPage';

mockGrecaptcha();
mockResponse(mockRegistrations);

describe('RegistrationsPage', () => {
  it('should match the snapshot', async () => {
    const wrapper = render(<RegistrationsPage />);
    await waitForElement(() => wrapper.queryByTestId('registrations-total'));
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should set the page title', () => {
    // Will be set by side effect through a hook
    render(<RegistrationsPage />);
    expect(document.title).toEqual('registrations.page.title');
  });

  it('should show the details', async () => {
    const wrapper = render(<RegistrationsPage />);
    await waitForElement(() => wrapper.queryByTestId('details-1'));

    wrapper.queryByTestId('details-1').click();
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
