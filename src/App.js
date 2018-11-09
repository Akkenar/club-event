import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Header from './header/Header';

import SignupPageAsync from './signup-page/SignupPageAsync';
import HomePageAsync from './home-page/HomePageAsync';
import withIntlManager from './intl/provideIntlManager';
import { setPageDescription } from './page.lib';
import getKey from './intl/getKey';

import './App.scss';

const App = props => {
  const { handleChangeLocale, language } = props;
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Header handleChangeLocale={handleChangeLocale} />
        </header>
        <main className="App__Main">
          <div className="App__MainContainer">
            <Switch>
              <Redirect exact={true} from="/" to={`home/${language}`} />
              <Route path="/home/:locale" component={HomePageAsync} />
              <Route path="/register/:locale" component={SignupPageAsync} />
            </Switch>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default withIntlManager(App);
