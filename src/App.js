import React, { Fragment, useContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Header from './header/Header';

import SignupPageAsync from './signup-page/SignupPageAsync';
import HomePageAsync from './home-page/HomePageAsync';
import { provideLanguageInRoute } from './intl/provideLanguageInRoute';
import LanguageContext from './intl/LanguageContext';
import ConfirmationPageAsync from './confirmation-page/ConfirmationPageAsync';
import FooterAsync from './footer/FooterAsync';

import './App.scss';
import './semantic.scss';
import provideLanguage from './intl/provideLanguage';

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
                <Route path={`/${language}/home`} component={HomePageAsync} />
                <Route
                  path={`/${language}/register`}
                  component={SignupPageAsync}
                />
                <Route
                  path={`/${language}/confirmation`}
                  component={ConfirmationPageAsync}
                />
                <Redirect to={`/${language}/home`} />
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

export default provideLanguage(App);
