import React from 'react';
import { Dimmer, Loader as SemanticLoader } from 'semantic-ui-react';

import './Loader.scss';

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };

    this.showAfterDelay();
  }

  showAfterDelay() {
    this.timeout = setTimeout(() => {
      this.setState({
        active: true,
      });
    }, this.props.delay || 150);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  render() {
    return (
      <div className="Loader">
        <Dimmer active={this.state.active}>
          <SemanticLoader />
        </Dimmer>
      </div>
    );
  }
}

export default Loader;
