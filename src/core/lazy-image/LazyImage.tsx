import * as React from 'react';
import Image from './Image';

import { Fragment } from 'react';
import { useIntersectionObserver } from '../useIntersectionObserver';
import './LazyImage.scss';
import Placeholder from './Placeholder';

interface LazyImageProps {
  src: any;
  width?: number;
  height?: number;
  alt: string;
  className?: string;
}

const LazyImage = ({ src, width, height, alt, className }: LazyImageProps) => {
  const { isDisplayed, startObserving } = useIntersectionObserver();

  if (!startObserving) {
    // While the observer is created.
    return null;
  }

  if (!isDisplayed) {
    return (
      <Placeholder
        className={`LazyImage ${className || ''}`}
        height={height}
        width={width}
        alt={alt}
        handleRef={startObserving}
      />
    );
  }

  return (
    <div className={`LazyImage no-print ${className || ''}`}>
      <Image
        className="LazyImage__Image"
        src={src}
        height={height}
        width={width}
        alt={alt}
      />
      <div className="LazyImage__Legend" aria-hidden="true">
        {alt}
      </div>
    </div>
  );
};

export default LazyImage;
