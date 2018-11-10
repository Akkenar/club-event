import React, { Suspense } from 'react';
import Loader from '../loader/Loader';

const Lazy = React.lazy(() =>
  import(/* webpackChunkName: 'confirmation', webpackPrefetch: true */ './ConfirmationPage')
);

function ConfirmationPageAsync() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Lazy />
      </Suspense>
    </div>
  );
}

export default ConfirmationPageAsync;
