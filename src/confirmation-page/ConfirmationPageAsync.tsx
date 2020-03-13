import React from 'react';
import { Suspense } from 'react';

const Lazy = React.lazy(() =>
  import(
    /* webpackChunkName: 'confirmation', webpackPrefetch: true */ './ConfirmationPage'
  ),
);

function ConfirmationPageAsync() {
  return (
    <div>
      <Suspense fallback={null}>
        <Lazy />
      </Suspense>
    </div>
  );
}

export default ConfirmationPageAsync;
