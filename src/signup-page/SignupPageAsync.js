import React, { Suspense } from 'react';
import Loader from '../loader/Loader';

const Lazy = React.lazy(() =>
  import(/* webpackChunkName: 'signup' */ './SignupPage')
);

function SignupPageAsync() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Lazy />
      </Suspense>
    </div>
  );
}

export default SignupPageAsync;
