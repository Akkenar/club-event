import * as React from 'react';
import { render, waitForElement } from 'react-testing-library';
import { forceLoadImage } from '../test-utils/test-utils.lib';
import { useImageLoading } from './useImageLoading';

const TEST_URL = '../assets/logo.svg';

const TestComponent = () => {
  const isLoaded = useImageLoading(TEST_URL);
  if (!isLoaded) {
    return null;
  }

  return <div data-testid="result" />;
};

describe('useIntersectionObserver', () => {
  it('should display the element when loaded', async () => {
    forceLoadImage();
    const wrapper = render(<TestComponent />);

    await waitForElement(() => wrapper.getByTestId('result'));
    expect(wrapper.getByTestId('result')).toBeTruthy();
  });
});
