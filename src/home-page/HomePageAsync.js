import React, { Suspense } from 'react';
import Loader from '../loader/Loader';

const Lazy = React.lazy(() =>
  import(/* webpackChunkName: 'home' */ './HomePage')
);

function HomePageAsync() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Lazy />
      </Suspense>
    </div>
  );
}

export default HomePageAsync;
