import React from 'react';
import { render } from 'react-testing-library';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('should match the snapshot', () => {
    const wrapper = render(<HomePage />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should set the page title', () => {
    // Will be set by side effect through a hook
    render(<HomePage />);
    expect(document.title).toEqual('home.page.title');
  });
});
