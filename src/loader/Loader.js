import React, { Suspense } from 'react';
import { goToTop } from '../page.lib';

const BODY_HAS_DIMMER_CLASS = 'has-dimmer';

const Lazy = React.lazy(() =>
  import(/* webpackChunkName: 'loader', webpackPrefetch: true */ './LoaderAsync'),
);

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };

    this.showAfterDelay();
  }

  showAfterDelay() {
    this.timeout = setTimeout(() => {
      document.body.classList.add(BODY_HAS_DIMMER_CLASS);
      goToTop();

      this.setState({
        active: true,
      });
    }, this.props.delay || 150);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    document.body.classList.remove(BODY_HAS_DIMMER_CLASS);
  }

  render() {
    if (!this.state.active) {
      return null;
    }

    return (
      <Suspense fallback={null}>
        <Lazy/>
      </Suspense>
    );
  }
}

export default Loader;
