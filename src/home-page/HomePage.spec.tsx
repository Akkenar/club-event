import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { act, render, waitForElement, wait } from '@testing-library/react';
import { mockInterestObservable } from '../test-utils/intersectObservable-utils.lib';
import { forceLoadImage } from '../test-utils/test-utils.lib';
import HomePage from './HomePage';

const HomePageWithRouter = () => (
  <BrowserRouter>
    <HomePage />
  </BrowserRouter>
);

forceLoadImage();

describe('HomePage', () => {
  let showAsyncElements: () => void;
  beforeEach(() => {
    showAsyncElements = mockInterestObservable();
  });

  it('should match the snapshot', async () => {
    const wrapper = render(<HomePageWithRouter />);

    act(() => {
      showAsyncElements();
    });

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

  it('should navigate with the page menu', async () => {
    window.scrollTo = jest.fn();
    const wrapper = render(<HomePageWithRouter />);

    act(() => {
      showAsyncElements();
    });

    // One of the menu item.
    await wrapper.getByTestId('home.menu.register').click();

    await wait(() => {
      // The focus should be on the element.
      expect(document.activeElement?.innerHTML).toEqual('home.page.register');
      expect(window.scrollTo).toHaveBeenCalledTimes(1);
    });
  });
});
