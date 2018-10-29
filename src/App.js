import React, { Component } from 'react';
import HeaderContainer from './header/Header';

import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './home-page/HomePage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <HeaderContainer />
          </header>
          <main>
            <Route exact path="/" component={HomePage} />
            <Route path={'/home'} component={HomePage} />
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
