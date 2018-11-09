import React from 'react';
import ReactDOM from 'react-dom';

import './index.critical.scss';

import App from './App';

const AppWithStore = () => <App />;

ReactDOM.render(<AppWithStore />, document.getElementById('root'));
