import * as React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { mockGlobalProperty } from '../../test-utils/test-utils.lib';
import LazyImage from './LazyImage';

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

describe('LazyImage', () => {
  beforeEach(() => {
    mockGlobalProperty(window)('IntersectionObserver')(
      IntersectionObserverMock,
    );
    mockGlobalProperty(window)('IntersectionObserverEntry')(
      IntersectionObserverEntryMock,
    );
  });

  it('should match snapshot with placeholder', async () => {
    const wrapper = render(
      <LazyImage src="foo.jpg" alt="al" className="test" />,
    );
    await waitForElement(() => wrapper.getByTestId('lazyloaded-placeholder'));
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should match snapshot with image', async () => {
    const wrapper = render(
      <LazyImage src="foo.jpg" alt="alt" className="test" />,
    );
    await waitForElement(() => wrapper.getByTestId('lazyloaded-image'));
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
