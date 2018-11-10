import React, { useContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Header from './header/Header';

import SignupPageAsync from './signup-page/SignupPageAsync';
import HomePageAsync from './home-page/HomePageAsync';
import { withIntlManager } from './intl/provideIntlManager';
import LanguageContext from './intl/LanguageContext';

// CSS dependencies
import './App.critical.scss';
import './index.critical.scss';
import './index.scss';

const App = () => {
  const { language } = useContext(LanguageContext);

  return (
    <BrowserRouter>
      <div className="App">
        <div id="top" tabIndex="-1" className="visually-hidden">
          Top
        </div>
        <header className="App-header">
          <Header />
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
