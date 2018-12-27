import 'jest-dom/extend-expect';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, wait, waitForElement } from 'react-testing-library';
import { Results } from '../core/api.type';
import {
  mockGrecaptcha,
  mockResponse,
  setValidInputData,
} from '../test-utils/test-utils.lib';
import LoginPage from './LoginPage';

mockGrecaptcha();

const LoginPageWithRouter = () => {
  return (
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );
};

describe('LoginPage', () => {
  it('should match snapshot', () => {
    const wrapper = render(<LoginPageWithRouter />);
    expect(wrapper.baseElement).toMatchSnapshot();
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
      expect(wrapper.queryByTestId('loader')).not.toBeInTheDocument()
    );

    // Should have been redirected.
  });

  it('should handle login error', async () => {
    const wrapper = render(<LoginPageWithRouter />);
    mockResponse(Results.ERROR, 'Error');
    setValidInputData({ username: 'Foo', password: 'Bar' }, wrapper);

    // Submit the form!
    wrapper.queryByText('login.form.submit').click();

    // First wait for the loader to be displayed
    await waitForElement(() => wrapper.queryByTestId('loader'));

    // Wait for the loader to be dismissed
    await wait(() =>
      expect(wrapper.queryByTestId('loader')).not.toBeInTheDocument()
    );

    expect(wrapper.queryByTestId('backend-error')).toHaveClass('visible');
  });
});
