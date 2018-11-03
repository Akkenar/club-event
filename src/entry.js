import React from 'react';
import ReactDOM from 'react-dom';

// CSS dependencies
import './index.scss';
import 'semantic-ui-css/semantic.min.css';

import App from './App';

const AppWithStore = () => <App />;

ReactDOM.render(<AppWithStore />, document.getElementById('root'));
