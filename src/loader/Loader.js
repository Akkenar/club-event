import React from 'react';
import { goToTop } from '../page.lib';
import { Dimmer, Loader as SemanticLoader } from 'semantic-ui-react';
import './Loader.scss';

const BODY_HAS_DIMMER_CLASS = 'has-dimmer';

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
      <div className="Loader">
        <Dimmer active={true}>
          <SemanticLoader />
        </Dimmer>
      </div>
    );
  }
}

export default Loader;
