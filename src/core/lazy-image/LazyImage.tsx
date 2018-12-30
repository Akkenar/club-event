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
  const [isDisplayed, handleRef] = useIntersectionObserver();

  if (!handleRef) {
    // While the observer is created.
    return null;
  }

  if (!isDisplayed) {
    return (
      <Placeholder
        className={`LazyImage ${className || ''}`}
        src={src}
        height={height}
        width={width}
        alt={alt}
        handleRef={handleRef}
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
