import React, { Component } from 'react';
import HeaderContainer from './header/Header';

import { BrowserRouter, Route } from 'react-router-dom';
import SignupPageAsync from './signup-page/SignupPageAsync';
import HomePageAsync from './home-page/HomePageAsync';

import './App.scss';

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
              <Route exact path="/" component={HomePageAsync} />
              <Route path={'/home'} component={HomePageAsync} />
              <Route path={'/register'} component={SignupPageAsync} />
            </div>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
