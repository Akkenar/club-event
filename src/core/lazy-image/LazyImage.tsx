import React from 'react';
import Image from './Image';
import { useIntersectionObserver } from '../useIntersectionObserver';
import Placeholder from './Placeholder';

import './LazyImage.scss';

interface LazyImageProps {
  src: any;
  width?: number;
  height?: number;
  alt: string;
  className?: string;
  withLegend?: boolean;
}

const LazyImage = ({
  src,
  width,
  height,
  alt,
  className,
  withLegend = true,
}: LazyImageProps) => {
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
      {withLegend ? (
        <div className="LazyImage__Legend" aria-hidden="true">
          {alt}
        </div>
      ) : null}
    </div>
  );
};

export default LazyImage;
