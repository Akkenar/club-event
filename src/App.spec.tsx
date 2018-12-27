import * as React from 'react';
import { render, waitForElement } from 'react-testing-library';
import App from './App';

// jsdom doesn't support loading of async modules. Thus mocking is required.
jest.mock('./core/intl/importLanguage', () => ({
  importLanguage: () => Promise.resolve({ default: { messages: {} } }),
}));

// Mock with a test id so we can use `queryByTestId` to wait for the page to be rendered
jest.mock('./home-page/HomePageAsync', () => () => <div data-testid="mock" />);
jest.mock('./core/header/HeaderAsync', () => () => <div />);
jest.mock('./core/footer/FooterAsync', () => () => <div />);

describe('App', () => {
  it('should match the snapshot', async () => {
    const wrapper = render(<App />);
    // Wait for the mock Home Page to be rendered to have a good overview of the App component.
    await waitForElement(() => wrapper.queryByTestId('mock'));
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
