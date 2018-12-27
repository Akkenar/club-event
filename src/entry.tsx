import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Because IE doesn't support promises, we need to load this polyfill
// in all cases as our strategy for loading the file depends on promises.
import 'es6-promise/auto';

import App from './App';

function renderApp() {
  ReactDOM.render(<App />, document.getElementById('root'));
}

// Simple way to detect whether the browser needs polyfill.
const requiresPolyfill =
  typeof window.fetch !== 'function' ||
  typeof (window as any).IntersectionObserver !== 'function';

if (!requiresPolyfill) {
  renderApp();
} else {
  import(/* webpackChunkName: 'polyfill' */ './polyfill').then(() => {
    renderApp();
  });
}
