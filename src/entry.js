import React from 'react';
import ReactDOM from 'react-dom';
// IE sucks...
import 'es6-promise/auto';

import App from './App';

function renderApp() {
  const AppWithStore = () => <App />;

  ReactDOM.render(<AppWithStore />, document.getElementById('root'));
}

// Simple way to detect whether the browser needs polyfill.
if (typeof window.fetch === 'function') {
  renderApp();
} else {
  import(/* webpackChunkName: 'polyfill' */ './polyfill').then(() => {
    renderApp();
  });
}
