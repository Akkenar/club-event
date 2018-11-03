import React, { Component } from 'react';
import HeaderContainer from './header/Header';

import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './home-page/HomePage';

import './App.scss';
import SignupPage from './signup-page/SignupPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <HeaderContainer />
          </header>
          <main className="App__Main">
            <div className="App__MainContainer">
              <Route exact path="/" component={HomePage} />
              <Route path={'/home'} component={HomePage} />
              <Route path={'/register'} component={SignupPage} />
            </div>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
