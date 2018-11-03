import React, { Suspense } from 'react';

const Lazy = React.lazy(() => import('./SignupPage'));

function SignupPageAsync() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Lazy/>
      </Suspense>
    </div>
  );
}

export default SignupPageAsync;