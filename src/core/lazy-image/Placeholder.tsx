import * as React from 'react';

export interface PlaceholderProps {
  src: string;
  height?: number;
  width?: number;
  alt: string;
  handleRef: any;
  className?: string;
}

const Placeholder = ({
  src,
  height,
  width,
  alt,
  handleRef,
  className,
}: PlaceholderProps) => {
  return (
    <svg
      data-testid="lazyloaded-placeholder"
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
