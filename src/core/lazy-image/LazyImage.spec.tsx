import * as React from 'react';
import { render, waitForElement } from 'react-testing-library';
import { mockGlobalProperty } from '../../test-utils/test-utils.lib';
import LazyImage from './LazyImage';

const fakeElements = [{ isIntersecting: true }, { isIntersecting: false }];

/* tslint:disable */
class IntersectionObserverMock {
  constructor(cb: any) {
    // Hack to invoke the triggering of the intersection when we want it.
    setTimeout(() => cb(fakeElements), 100);
  }

  observe() {
    // Nothing.
  }

  unobserve() {
    // Nothing.
  }

  disconnect() {
    // Nothing.
  }
}

class IntersectionObserverEntryMock {
  intersectionRatio() {
    // Nothing.
  }

  isIntersecting() {
    // Nothing.
  }
}
/* tslint:enable */

describe('LazyImage', () => {
  beforeEach(() => {
    mockGlobalProperty(window)('IntersectionObserver')(
      IntersectionObserverMock
    );
    mockGlobalProperty(window)('IntersectionObserverEntry')(
      IntersectionObserverEntryMock
    );
  });

  it('should match snapshot with placeholder', async () => {
    const wrapper = render(
      <LazyImage src="foo" srcwebp="bar" alt="al" className="test" />
    );
    await waitForElement(() => wrapper.getByTestId('lazyloaded-placeholder'));
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should match snapshot with image', async () => {
    const wrapper = render(
      <LazyImage src="foo" srcwebp="bar" alt="alt" className="test" />
    );
    await waitForElement(() => wrapper.getByTestId('lazyloaded-image'));
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
