import * as React from 'react';
import Image from './Image';

import { useIntersectionObserver } from '../useIntersectionObserver';
import './LazyImage.scss';
import Placeholder from './Placeholder';

interface LazyImageProps {
  src: any;
  srcwebp: any;
  width?: number;
  height?: number;
  alt: string;
  className?: string;
}

const LazyImage = ({
  src,
  srcwebp,
  width,
  height,
  alt,
  className,
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
    <Image
      className={`LazyImage no-print ${className || ''}`}
      src={src}
      srcwebp={srcwebp}
      height={height}
      width={width}
      alt={alt}
    />
  );
};

export default LazyImage;
