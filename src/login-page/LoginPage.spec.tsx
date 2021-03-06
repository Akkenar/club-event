import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { render, wait, waitForElement } from '@testing-library/react';
import { Results } from '../core/api.type';
import { mockInterestObservable } from '../test-utils/intersectObservable-utils.lib';
import {
  mockGrecaptcha,
  mockResponse,
  setValidInputData,
} from '../test-utils/test-utils.lib';
import LoginPage from './LoginPage';

mockGrecaptcha();

const LoginPageWithRouter = () => {
  // Simulate a navigation.
  document.location.assign('#/de/login');

  return (
    <HashRouter>
      <Switch>
        <Route path="/de/login" component={LoginPage} />
        <Route
          path="/de/registrations"
          component={() => <div>Registrations</div>}
        />
      </Switch>
    </HashRouter>
  );
};

describe('LoginPage', () => {
  beforeEach(() => {
    mockInterestObservable();
  });

  it('should match snapshot', () => {
    const wrapper = render(<LoginPageWithRouter />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should set the page title', () => {
    // Will be set by side effect through a hook
    render(<LoginPageWithRouter />);
    expect(document.title).toEqual('login.page.title');
  });

  it('should submit the login', async () => {
    const wrapper = render(<LoginPageWithRouter />);
    mockResponse(Results.SUCCESS);
    setValidInputData({ username: 'Foo', password: 'Bar' }, wrapper);

    // Submit the form!
    wrapper.queryByText('login.form.submit').click();

    // First wait for the loader to be displayed
    await waitForElement(() => wrapper.queryByTestId('loader'));

    // Wait for the loader to be dismissed
    await wait(() =>
      expect(wrapper.queryByTestId('loader')).not.toBeInTheDocument(),
    );

    // Should have been redirected.
    expect(document.location.hash).toContain('registrations');
  });

  it('should handle login error', async () => {
    const wrapper = render(<LoginPageWithRouter />);
    mockResponse({ result: Results.ERROR, message: 'Error' });
    setValidInputData({ username: 'Foo', password: 'Bar' }, wrapper);

    // Submit the form!
    wrapper.queryByText('login.form.submit').click();

    // First wait for the loader to be displayed
    await waitForElement(() => wrapper.queryByTestId('loader'));

    // Wait for the loader to be dismissed
    await wait(() =>
      expect(wrapper.queryByTestId('loader')).not.toBeInTheDocument(),
    );

    expect(wrapper.queryByTestId('backend-error')).toHaveClass('visible');
  });
});
