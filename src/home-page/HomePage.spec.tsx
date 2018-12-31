import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, waitForElement } from 'react-testing-library';
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
    await waitForElement(() => wrapper.queryByTitle('logo.alt'));
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should set the page title', () => {
    // Will be set by side effect through a hook
    render(<HomePageWithRouter />);
    expect(document.title).toEqual('home.page.title');
  });
});
