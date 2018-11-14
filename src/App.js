import React, { Fragment, useContext, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Header from './header/Header';

import SignupPageAsync from './signup-page/SignupPageAsync';
import HomePageAsync from './home-page/HomePageAsync';
import { withIntlManager } from './intl/provideIntlManager';
import LanguageContext from './intl/LanguageContext';
import ConfirmationPageAsync from './confirmation-page/ConfirmationPageAsync';
import FooterAsync from './footer/FooterAsync';

import './App.critical.scss';
import './index.critical.scss';
import './index.scss';

const App = () => {
  const { language } = useContext(LanguageContext);

  return (
    <Fragment>
      <div id="top" tabIndex="-1" className="visually-hidden">
        Top
      </div>
      <BrowserRouter>
        <div className="App">
          <header className="App__Header">
            <Header />
          </header>
          <main className="App__Main">
            <div className="App__MainContainer">
              <Switch>
                <Redirect exact={true} from="/" to={`home/${language}`} />
                <Route path="/home/:locale" component={HomePageAsync} />
                <Route path="/register/:locale" component={SignupPageAsync} />
                <Route
                  path="/confirmation/:locale"
                  component={ConfirmationPageAsync}
                />
              </Switch>
            </div>
          </main>
          <footer className="App__Footer">
            <FooterAsync />
          </footer>
        </div>
      </BrowserRouter>
    </Fragment>
  );
};

export default withIntlManager(App);
