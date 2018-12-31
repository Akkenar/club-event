import { useEffect, useState } from 'react';

/**
 * Provide a boolean that indicates whether an image is loaded.
 *
 * Typically used to display a placeholder whilst the image is loading
 *
 * @param src - The url of the image.
 */
export function useImageLoading(src: string): boolean {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      return;
    }

    const image = new Image();
    image.onload = () => setIsLoaded(true);
    image.src = src;
  });

  return isLoaded;
}
