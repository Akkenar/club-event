import React from 'react';

const Placeholder = ({ src, height, width, alt, handleRef, className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      aria-label={alt}
      height={height}
      width={width}
      ref={handleRef}
    >
      <path d="" />
    </svg>
  );
};

export default Placeholder;
