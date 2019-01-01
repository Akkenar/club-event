import * as React from 'react';

export interface ImageProps {
  src: string;
  height?: number;
  width?: number;
  alt: string;
  className?: string;
}

const Image = ({ src, width, height, alt, className }: ImageProps) => {
  // By convention the source if the fallback.
  const fallbackUrl = src;

  // Hacky, but works for now. It would be better to have Webpack returning
  // an object with all the urls, one per version.
  const webpUrl = src.replace('.jpg', '.webp');

  return (
    <picture>
      <source type="image/webp" srcSet={webpUrl} />
      <img
        data-testid="lazyloaded-image"
        className={className}
        title={alt}
        src={fallbackUrl}
        width={width}
        height={height}
        alt={alt}
      />
    </picture>
  );
};

export default Image;
