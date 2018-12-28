import * as React from 'react';
import { Suspense } from 'react';

const Lazy = React.lazy(() =>
  import(/* webpackChunkName: 'registrations', webpackPrefetch: true */ './RegistrationsPage')
);

function RegistrationsPageAsync() {
  return (
    <div>
      <Suspense fallback={null}>
        <Lazy />
      </Suspense>
    </div>
  );
}

export default RegistrationsPageAsync;
