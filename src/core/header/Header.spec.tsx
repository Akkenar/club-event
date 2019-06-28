import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import { render, waitForElement } from '@testing-library/react';
import { forceLoadImage } from '../../test-utils/test-utils.lib';
import Header from './Header';

const HeaderWithRouter = () => (
  <HashRouter>
    <Header />
  </HashRouter>
);

forceLoadImage();

describe('Header', () => {
  it('should match snapshot without registration', async () => {
    const wrapper = render(<HeaderWithRouter />);
    await waitForElement(() => wrapper.getByTestId('logo'));
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
