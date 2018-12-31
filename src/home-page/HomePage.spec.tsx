import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-testing-library';
import HomePage from './HomePage';

const HomePageWithRouter = () => (
  <BrowserRouter>
    <HomePage />
  </BrowserRouter>
);

describe('HomePage', () => {
  it('should match the snapshot', () => {
    const wrapper = render(<HomePageWithRouter />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should set the page title', () => {
    // Will be set by side effect through a hook
    render(<HomePageWithRouter />);
    expect(document.title).toEqual('home.page.title');
  });
});
