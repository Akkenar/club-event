import { useEffect, useState } from 'react';

const OBSERVER_OPTIONS = {
  rootMargin: '0px 0px 0px 50px',
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

export function useIntersectionObserver(): UseIntersectionObserver {
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  const handleIntersect = (
    entries: IntersectionObserverEntry[],
    currentObserver: IntersectionObserver,
  ) => changeStateOnIntersect(entries, currentObserver, setIsDisplayed);

  useEffect(() => {
    if (isDisplayed || !!observer) {
      return;
    }

    const observerInstance = new IntersectionObserver(
      handleIntersect,
      OBSERVER_OPTIONS,
    );

    setObserver(observerInstance);
  });

  // Return the callback to invoke on the element.
  return {
    isDisplayed,
    startObserving: observer
      ? (element: HTMLElement) => startObserving(isDisplayed, observer, element)
      : null,
  };
}
