import React from 'react';
import { Suspense } from 'react';

const Lazy = React.lazy(() =>
  import(
    /* webpackChunkName: 'register', webpackPrefetch: true */ './RegisterPage'
  ),
);

function RegisterPageAsync() {
  return (
    <div>
      <Suspense fallback={null}>
        <Lazy />
      </Suspense>
    </div>
  );
}

export default RegisterPageAsync;
