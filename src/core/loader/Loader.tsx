import * as React from 'react';
import { Dimmer, Loader as SemanticLoader } from 'semantic-ui-react';
import { goToTop } from '../page.lib';
import './Loader.scss';

const BODY_HAS_DIMMER_CLASS = 'has-dimmer';

class Loader extends React.Component {
  constructor(props: any) {
    super(props);

    this.show();
  }

  public show() {
    document.body.classList.add(BODY_HAS_DIMMER_CLASS);
    goToTop();
  }

  public componentWillUnmount() {
    document.body.classList.remove(BODY_HAS_DIMMER_CLASS);
  }

  public render() {
    return (
      <div className="Loader" data-testid="loader">
        <Dimmer active={true}>
          <SemanticLoader />
        </Dimmer>
      </div>
    );
  }
}

export default Loader;
