import React from 'react';

const Image = ({ src, srcwebp, width, height, alt, className }) => {
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
