import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import { render } from 'react-testing-library';
import Header from './Header';

const HeaderWithRouter = () => (
  <HashRouter>
    <Header />
  </HashRouter>
);

describe('Header', () => {
  it('should match snapshot without registration', () => {
    const wrapper = render(<HeaderWithRouter />);
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
