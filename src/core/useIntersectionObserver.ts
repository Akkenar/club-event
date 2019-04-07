import { useEffect, useRef, useState } from 'react';

const OBSERVER_OPTIONS = {
  rootMargin: '0px 0px 0px 150px',
};

function changeStateOnIntersect(
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
  setState: (state: boolean) => void,
) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setState(true);

      if (observer) {
        observer.unobserve(entry.target);
      }
    }
  });
}

function startObserving(
  isDisplayed: boolean,
  observer: IntersectionObserver,
  element: HTMLElement,
) {
  if (!element || isDisplayed) {
    return;
  }

  observer.observe(element);
}

export interface UseIntersectionObserver {
  isDisplayed: boolean;
  startObserving: ((element: HTMLElement | any) => void) | null;
}

/**
 * Provides a boolean `isDisplayed` and a function to start observing
 * a DOMElement.
 */
export function useIntersectionObserver(): UseIntersectionObserver {
  // Internal state
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);

  let isCancelled = useRef(false);

  // Closed function to encapsulate the state
  const handleIntersect = (
    entries: IntersectionObserverEntry[],
    currentObserver: IntersectionObserver,
  ) => {
    // Ensures that the set isn't updated on an unmounted component.
    if (!isCancelled.current) {
      changeStateOnIntersect(entries, currentObserver, setIsDisplayed);
    }
  };

  // Share the same instance of IntersectionObserver between renders.
  const observer = useRef(
    new IntersectionObserver(handleIntersect, OBSERVER_OPTIONS),
  );

  // Cleanup routine
  useEffect(() => {
    const currentObserver = observer.current;
    return () => {
      isCancelled.current = true;
      currentObserver.disconnect();
    };
  }, [observer]);

  // Return the callback to invoke on the element.
  return {
    isDisplayed,
    startObserving: observer
      ? (element: HTMLElement) =>
          startObserving(isDisplayed, observer.current, element)
      : null,
  };
}
