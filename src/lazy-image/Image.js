import React from 'react';

const Image = ({ src, srcwebp, width, height, alt }) => {
  return (
    <picture>
      <source type="image/webp" srcSet={srcwebp} />
      <img src={src} width={width} height={height} alt={alt || ''} />
    </picture>
  );
};

export default Image;
