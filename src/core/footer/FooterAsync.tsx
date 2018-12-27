import * as React from 'react';
import { Suspense } from 'react';

const Lazy = React.lazy(() =>
  import(/* webpackChunkName: 'footer', webpackPrefetch: true */ './Footer')
);

function HomePageAsync() {
  return (
    <div>
      <Suspense fallback={null}>
        <Lazy />
      </Suspense>
    </div>
  );
}

export default HomePageAsync;
