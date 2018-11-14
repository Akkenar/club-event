import React from 'react';
import { Dimmer, Loader as SemanticLoader } from 'semantic-ui-react';

import './Loader.scss';

const LoaderAsync = () => {
  return (
    <div className="Loader">
      <Dimmer active={true}>
        <SemanticLoader />
      </Dimmer>
    </div>
  );
};

export default LoaderAsync;
