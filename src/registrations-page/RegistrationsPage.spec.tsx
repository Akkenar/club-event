import 'jest-dom/extend-expect';
import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { render, wait, waitForElement } from '@testing-library/react';
import mockRegistrations from '../../mocks/registrations.json';
import { Results } from '../core/api.type';
import { mockGrecaptcha, mockResponse } from '../test-utils/test-utils.lib';
import RegistrationsPage from './RegistrationsPage';

mockGrecaptcha();

describe('RegistrationsPage', () => {
  it('should match the snapshot', async () => {
    mockResponse(mockRegistrations);
    const wrapper = render(<RegistrationsPage />);
    await waitForElement(() => wrapper.queryByTestId('registrations-total'));
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should handle no registrations', async () => {
    mockResponse([]);
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
    mockResponse(mockRegistrations);

    const wrapper = render(<RegistrationsPage />);
    await waitForElement(() => wrapper.queryByTestId('details-1'));

    wrapper.queryByTestId('details-1').click();
    expect(wrapper.queryByTestId('details-for-1')).toBeTruthy();
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should show and hide the details', async () => {
    mockResponse(mockRegistrations);

    const wrapper = render(<RegistrationsPage />);
    await waitForElement(() => wrapper.queryByTestId('details-1'));

    wrapper.queryByTestId('details-1').click();
    expect(wrapper.queryByTestId('details-for-1')).toBeTruthy();

    wrapper.queryByTestId('details-1').click();
    expect(wrapper.queryByTestId('details-for-1')).toBeFalsy();
  });

  it('should show the products', async () => {
    mockResponse(mockRegistrations);

    const wrapper = render(<RegistrationsPage />);
    await waitForElement(() => wrapper.queryByTestId('toggle-products'));

    wrapper.queryByTestId('toggle-products').click();
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should redirect to the login page if not authorized', async () => {
    mockResponse({
      result: Results.UNAUTHORIZED,
    });

    // A fake routing with a few pages to better represent the use case
    const RegistrationsPageWithRouter = () => (
      <HashRouter>
        <Switch>
          <Route path="/de/registrations" component={RegistrationsPage} />
          <Route path="/de/login" component={() => <div>Test</div>} />
        </Switch>
      </HashRouter>
    );

    const wrapper = render(<RegistrationsPageWithRouter />);

    // Simulate a navigation.
    document.location.assign('#/de/registrations');

    // First wait for the loader to be displayed
    await waitForElement(() => wrapper.queryByTestId('loader'));

    // Wait for the loader to be dismissed
    await wait(() =>
      expect(wrapper.queryByTestId('loader')).not.toBeInTheDocument(),
    );

    // Checks that the browser has been redirected properly.
    expect(window.location.href).toEqual('http://localhost/#/de/login');
  });
});
