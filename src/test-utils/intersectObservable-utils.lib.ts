import { mockGlobalProperty } from './test-utils.lib';

const allObservers: IntersectionObserverMock[] = [];

class IntersectionObserverMock {
  private readonly cb: any;
  public constructor(cb: any) {
    this.cb = cb;

    // To allow global triggering.
    allObservers.push(this);
  }

  public trigger() {
    this.cb([{ isIntersecting: true }]);
  }

  public observe() {
    // Nothing
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

export function mockInterestObservable(): () => void {
  // Reset all the mocks
  allObservers.slice(0);

  mockGlobalProperty(window)('IntersectionObserver')(IntersectionObserverMock);
  mockGlobalProperty(window)('IntersectionObserverEntry')(
    IntersectionObserverEntryMock,
  );

  // Trigger all.
  return () => {
    allObservers.forEach((observer: IntersectionObserverMock) => {
      observer.trigger();
    });
  };
}
