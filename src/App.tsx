import * as React from 'react';
import { useContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import ConfirmationPageAsync from './confirmation-page/ConfirmationPageAsync';
import FooterAsync from './core/footer/FooterAsync';
import HeaderAsync from './core/header/HeaderAsync';
import LanguageContext from './core/intl/LanguageContext';
import provideLanguage from './core/intl/provideLanguage';
import HomePageAsync from './home-page/HomePageAsync';
import LoginPageAsync from './login-page/LoginPageAsync';
import RegisterPageAsync from './register-page/RegisterPageAsync';

import './App.scss';
import './style/main.scss';
import './style/semantic.scss';

// TODO to implement.
const RegistrationsPageAsync = () => <div className="RegistrationsPage" />;

const AppContainer = () => {
  const { language } = useContext(LanguageContext);
  return (
    <React.Fragment>
      <div id="top" tabIndex={-1} className="visually-hidden">
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
                <Route path={`/${language}/login`} component={LoginPageAsync} />
                <Route
                  path={`/${language}/registrations`}
                  component={RegistrationsPageAsync}
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
    </React.Fragment>
  );
};

const App = provideLanguage(AppContainer);

export default App;
