import React, { Fragment, useContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import HeaderAsync from './core/header/HeaderAsync';
import RegisterPageAsync from './register-page/RegisterPageAsync';
import HomePageAsync from './home-page/HomePageAsync';
import LanguageContext from './core/intl/LanguageContext';
import ConfirmationPageAsync from './confirmation-page/ConfirmationPageAsync';
import FooterAsync from './core/footer/FooterAsync';

import './App.scss';
import './style/semantic.scss';
import './style/main.scss';

import provideLanguage from './core/intl/provideLanguage';

const App = () => {
  const { language } = useContext(LanguageContext);
  return (
    <Fragment>
      <div id="top" tabIndex="-1" className="visually-hidden">
        Top
      </div>
      <BrowserRouter>
        <div className="App">
          <header className="App__Header no-print">
            <HeaderAsync />
          </header>
          <main className="App__Main">
            <div className="App__MainContainer">
              <Switch>
                <Route path={`/${language}/home`} component={HomePageAsync} />
                <Route
                  path={`/${language}/register`}
                  component={RegisterPageAsync}
                />
                <Route
                  path={`/${language}/confirmation`}
                  component={ConfirmationPageAsync}
                />
                <Redirect to={`/${language}/home`} />
              </Switch>
            </div>
          </main>
          <footer className="App__Footer no-print">
            <FooterAsync />
          </footer>
        </div>
      </BrowserRouter>
    </Fragment>
  );
};

export default provideLanguage(App);
