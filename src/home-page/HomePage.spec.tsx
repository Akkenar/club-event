import 'jest-dom/extend-expect';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, waitForElement } from 'react-testing-library';
import environment from '../environment/environment';
import { forceLoadImage } from '../test-utils/test-utils.lib';
import HomePage from './HomePage';

const HomePageWithRouter = () => (
  <BrowserRouter>
    <HomePage />
  </BrowserRouter>
);

forceLoadImage();

describe('HomePage', () => {
  it('should match the snapshot', async () => {
    const wrapper = render(<HomePageWithRouter />);

    // Wait for the logo.
    await waitForElement(() => wrapper.queryByTitle('logo.alt'));

    // Wait for the iframe.
    await waitForElement(() => wrapper.getByTitle('Vallorbe'));

    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should set the page title', () => {
    // Will be set by side effect through a hook
    render(<HomePageWithRouter />);
    expect(document.title).toEqual('home.page.title');
  });

  it('should disable the button if the registrations are not open', () => {
    environment.registration.enabled = false;
    const wrapper = render(<HomePageWithRouter />);
    expect(wrapper.getByTestId('register-button')).toHaveClass('disabled');
  });
});
