import * as React from 'react';

export interface ImageProps {
  src: string;
  srcwebp: string;
  height?: number;
  width?: number;
  alt: string;
  className?: string;
}

const Image = ({ src, srcwebp, width, height, alt, className }: ImageProps) => {
  return (
    <picture>
      <source type="image/webp" srcSet={srcwebp} />
      <img
        className={className}
        title={alt}
        src={src}
        width={width}
        height={height}
        alt={alt || ''}
      />
    </picture>
  );
};

export default Image;
