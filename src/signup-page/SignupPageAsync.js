import React, { Suspense } from 'react';

const Lazy = React.lazy(() =>
  import(/* webpackChunkName: 'signup', webpackPrefetch: true */ './SignupPage')
);

function SignupPageAsync() {
  return (
    <div>
      <Suspense fallback={null}>
        <Lazy />
      </Suspense>
    </div>
  );
}

export default SignupPageAsync;
