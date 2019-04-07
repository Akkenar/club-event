import 'jest-dom/extend-expect';
import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { render, wait, waitForElement } from 'react-testing-library';
import { mockInterestObservable } from '../../test-utils/intersectObservable-utils.lib';
import {
  mockGrecaptcha,
  mockResponse,
  setValidInputData,
} from '../../test-utils/test-utils.lib';
import RegisterFormContainer from './RegisterFormContainer';

mockGrecaptcha();

const validData = {
  breakfast: '1',
  camping: '1',
  club: 'Club',
  dinner: '1',
  dinnerKid: '1',
  email: 'foo@bar.ch',
  firstName: 'Foo',
  lastName: 'Bar',
  locality: 'Lausanne',
  no: '1',
  npa: '1018',
  picknick: '1',
  sleepingAtGym: '1',
  street: 'Rue de Lausanne',
  vegetarian: '1',
  vegetarianKid: '1',
};

const ContainerWithRouter = () => {
  // Simulate a navigation.
  document.location.assign('#/de/registrations');

  return (
    <HashRouter>
      <Switch>
        <Route path="/de/registrations" component={RegisterFormContainer} />
        <Route
          path="/de/confirmation"
          component={() => <div>Confirmation</div>}
        />
      </Switch>
    </HashRouter>
  );
};

describe('RegisterFormContainer', () => {
  beforeEach(() => {
    mockInterestObservable();
  });

  it('should add errors to all fields when the form is empty', () => {
    const wrapper = render(<RegisterFormContainer />);

    expect(wrapper.queryByTestId('validation-error')).not.toHaveClass(
      'visible',
    );
    wrapper.queryByText('register.form.submit').click();
    expect(wrapper.queryByTestId('validation-error')).toHaveClass('visible');
  });

  it('should send the form to the backend if valid', async () => {
    mockResponse('success');
    const wrapper = render(<ContainerWithRouter />);

    // Set data in the fields.
    setValidInputData(validData, wrapper);

    // Submit the form!
    wrapper.queryByText('register.form.submit').click();

    // First wait for the loader to be displayed
    await waitForElement(() => wrapper.queryByTestId('loader'));

    // Wait for the loader to be dismissed
    await wait(() =>
      expect(wrapper.queryByTestId('loader')).not.toBeInTheDocument(),
    );

    // Should have been redirected.
    expect(window.location.hash).toContain('confirmation');
  });

  it('should handle backend error', async () => {
    mockResponse('error');
    const wrapper = render(<ContainerWithRouter />);

    // Set data in the fields.
    setValidInputData(validData, wrapper);

    // Submit the form!
    wrapper.queryByText('register.form.submit').click();

    // First wait for the loader to be displayed
    await waitForElement(() => wrapper.queryByTestId('loader'));

    // Wait for the loader to be dismissed
    await wait(() =>
      expect(wrapper.queryByTestId('loader')).not.toBeInTheDocument(),
    );

    expect(wrapper.queryByTestId('backend-error')).toHaveClass('visible');
  });

  it('should display an error if there are no products selected', () => {
    const wrapper = render(<ContainerWithRouter />);

    wrapper.queryByText('register.form.submit').click();

    expect(wrapper.queryByTestId('total-error')).toHaveClass('visible');
  });

  it('should display not an error if only pick-nic is selected', () => {
    const wrapper = render(<ContainerWithRouter />);

    // Set data in the fields.
    setValidInputData(
      {
        picknick: 2,
      },
      wrapper,
    );

    wrapper.queryByText('register.form.submit').click();

    expect(wrapper.queryByTestId('total-error')).not.toHaveClass('visible');
  });
});
