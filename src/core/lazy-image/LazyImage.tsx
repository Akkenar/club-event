import * as React from 'react';
import Image from './Image';
import Placeholder from './Placeholder';

import './LazyImage.scss';

const OBSERVER_OPTIONS = {
  rootMargin: '0px 0px 0px 50px',
};

export interface LazyImageState {
  isDisplayed: boolean;
}

export interface LazyImageProps {
  src: any;
  srcwebp: any;
  width?: number;
  height?: number;
  alt: string;
  className?: string;
}

class LazyImage extends React.Component<LazyImageProps, LazyImageState> {
  private readonly observer: IntersectionObserver;

  constructor(props: LazyImageProps) {
    super(props);

    this.state = {
      isDisplayed: false,
    };

    this.observer = new IntersectionObserver(
      this.handleIntersect.bind(this),
      OBSERVER_OPTIONS
    );

    this.handleRef = this.handleRef.bind(this);
  }

  public handleIntersect(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.setState({
          isDisplayed: true,
        });

        if (this.observer) {
          this.observer.unobserve(entry.target);
        }
      }
    });
  }

  public handleRef(element: HTMLElement) {
    if (!element) {
      return;
    }

    // Don't bother observing anything if the image is already displayed.
    const { isDisplayed } = this.state;
    if (isDisplayed) {
      return;
    }

    this.observer.observe(element);
  }

  public componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  public render() {
    const { isDisplayed } = this.state;
    const { src, srcwebp, width, height, alt, className } = this.props;

    if (!isDisplayed) {
      return (
        <Placeholder
          className={`LazyImage ${className || ''}`}
          src={src}
          height={height}
          width={width}
          alt={alt}
          handleRef={this.handleRef}
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
  }
}

export default LazyImage;
