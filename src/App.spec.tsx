import * as React from 'react';
import { Fragment } from 'react';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import { act, render, fireEvent } from '@testing-library/react';
import App, { AppContainer } from './App';
import { Results } from './core/api.type';
import LanguageContext from './core/intl/LanguageContext';
import { BASE_URL_WITH_LANG } from './core/intl/provideTranslations';
import { mockInterestObservable } from './test-utils/intersectObservable-utils.lib';
import { mockResponse } from './test-utils/test-utils.lib';

// It's easier to mock the languages so we don't have to change the tests
// if we change the wording.
jest.mock('./core/intl/importLanguage', () => ({
  importLanguage: () => Promise.resolve({ default: { messages: {} } }),
}));

// A fake menu to access the pages in the route.
const Menu = () => {
  return (
    <Fragment>
      <NavLink data-testid="goto-home" to="/en/home">
        Home
      </NavLink>
      <NavLink data-testid="goto-register" to="/en/register">
        Register
      </NavLink>
      <NavLink data-testid="goto-login" to="/en/login">
        Login
      </NavLink>
      <NavLink data-testid="goto-confirmation" to="/en/confirmation">
        Confirmation
      </NavLink>
      <NavLink data-testid="goto-registrations" to="/en/registrations">
        Registrations
      </NavLink>
    </Fragment>
  );
};

const mockLanguageContext = {
  confirmation: '',
  information: '',
  schedule: '<table></table>',
  language: 'en',
  messages: {},
};

const AppWithMockLanguageAndRoute = () => (
  <LanguageContext.Provider value={mockLanguageContext}>
    <BrowserRouter>
      <Fragment>
        <Route path={BASE_URL_WITH_LANG} component={AppContainer} />
        <Menu />
      </Fragment>
    </BrowserRouter>
  </LanguageContext.Provider>
);

describe('App', () => {
  let showAsyncElements: () => void;
  beforeEach(() => {
    showAsyncElements = mockInterestObservable();
  });

  it('should render the home page by default', async () => {
    const { findByTestId, baseElement } = render(<App />);
    act(() => {
      showAsyncElements();
    });

    // Wait for the mock Home Page to be rendered to have a good overview of the App component.
    await findByTestId('main-title');
    expect(baseElement).toMatchSnapshot();
  });

  it('should render the home page', async () => {
    const { findByTestId, getByTestId } = render(
      <AppWithMockLanguageAndRoute />,
    );
    fireEvent.click(getByTestId('goto-home'));

    act(() => {
      showAsyncElements();
    });

    const element = await findByTestId('main-title');
    expect(element.innerHTML).toContain('home.page.title');
  });

  it('should render the register page', async () => {
    const { getByTestId, findByTestId } = render(
      <AppWithMockLanguageAndRoute />,
    );
    fireEvent.click(getByTestId('goto-register'));

    act(() => {
      showAsyncElements();
    });

    const element = await findByTestId('main-title');
    expect(element.innerHTML).toEqual('register.page.title');
  });

  it('should render the confirmation page', async () => {
    const { getByTestId, findByTestId } = render(
      <AppWithMockLanguageAndRoute />,
    );
    fireEvent.click(getByTestId('goto-confirmation'));

    act(() => {
      showAsyncElements();
    });

    const element = await findByTestId('main-title');
    expect(element.innerHTML).toEqual('confirmation.page.title');
  });

  it('should render the login page', async () => {
    const { getByTestId, findByTestId } = render(
      <AppWithMockLanguageAndRoute />,
    );
    fireEvent.click(getByTestId('goto-login'));

    act(() => {
      showAsyncElements();
    });

    const element = await findByTestId('main-title');
    expect(element.innerHTML).toEqual('login.page.title');
  });

  it('should render the registrations page', async () => {
    // Because the page fetches the data upon arrival.
    mockResponse(Results.SUCCESS);

    const { findByTestId, getByTestId } = render(
      <AppWithMockLanguageAndRoute />,
    );
    fireEvent.click(getByTestId('goto-registrations'));

    act(() => {
      showAsyncElements();
    });

    const element = await findByTestId('main-title');

    expect(element.innerHTML).toEqual('registrations.page.title');
  });
});
