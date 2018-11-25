import React from 'react';
import Image from './Image';
import Placeholder from './Placeholder';

const OBSERVER_OPTIONS = {
  rootMargin: '0px 0px 0px 50px',
};

class LazyImage extends React.Component {
  constructor(props) {
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

  handleIntersect(entries) {
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

  handleRef(element) {
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

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  render() {
    const { isDisplayed } = this.state;
    const { src, srcwebp, width, height, alt } = this.props;

    if (!isDisplayed) {
      return (
        <Placeholder
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
