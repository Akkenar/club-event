import React from 'react';
import ReactDOM from 'react-dom';

// CSS dependencies
import './index.scss';
import 'semantic-ui-css/components/header.min.css';
import 'semantic-ui-css/components/menu.min.css';
import 'semantic-ui-css/components/form.min.css';
import 'semantic-ui-css/components/button.min.css';

import App from './App';

const AppWithStore = () => <App />;

ReactDOM.render(<AppWithStore />, document.getElementById('root'));
