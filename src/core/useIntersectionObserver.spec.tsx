import * as React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { mockGlobalProperty } from '../test-utils/test-utils.lib';
import { useIntersectionObserver } from './useIntersectionObserver';

const fakeElements = [{ isIntersecting: true }, { isIntersecting: false }];

class IntersectionObserverMock {
  public constructor(cb: any) {
    // Hack to invoke the triggering of the intersection when we want it.
    setTimeout(() => cb(fakeElements), 100);
  }

  public observe() {
    // Nothing.
  }

  public unobserve() {
    // Nothing.
  }

  public disconnect() {
    // Nothing.
  }
}

class IntersectionObserverEntryMock {
  public intersectionRatio() {
    // Nothing.
  }

  public isIntersecting() {
    // Nothing.
  }
}

const TestComponent = () => {
  const { isDisplayed, startObserving } = useIntersectionObserver();
  if (!isDisplayed) {
    return <div ref={startObserving} />;
  }

  return <div data-testid="result" />;
};

describe('useIntersectionObserver', () => {
  beforeEach(() => {
    mockGlobalProperty(window)('IntersectionObserver')(
      IntersectionObserverMock,
    );
    mockGlobalProperty(window)('IntersectionObserverEntry')(
      IntersectionObserverEntryMock,
    );
  });

  it('should display the element when in the viewport', async () => {
    const wrapper = render(<TestComponent />);
    await waitForElement(() => wrapper.getByTestId('result'));
    expect(wrapper.getByTestId('result')).toBeTruthy();
  });
});
