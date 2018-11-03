import React, { Suspense } from 'react';

const Lazy = React.lazy(() => import('./HomePage'));

function HomePageAsync() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Lazy />
      </Suspense>
    </div>
  );
}

export default HomePageAsync;
