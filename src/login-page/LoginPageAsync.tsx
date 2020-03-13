import React from 'react';
import { Suspense } from 'react';

const Lazy = React.lazy(() =>
  import(/* webpackChunkName: 'login', webpackPrefetch: true */ './LoginPage'),
);

function LoginPageAsync() {
  return (
    <div>
      <Suspense fallback={null}>
        <Lazy />
      </Suspense>
    </div>
  );
}

export default LoginPageAsync;
