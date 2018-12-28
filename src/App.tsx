import * as React from 'react';
import { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouting from './AppRouting';
import FooterAsync from './core/footer/FooterAsync';
import HeaderAsync from './core/header/HeaderAsync';
import LanguageContext from './core/intl/LanguageContext';
import provideLanguage from './core/intl/provideLanguage';

import './App.scss';
import './style/main.scss';
import './style/semantic.scss';

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
              <AppRouting language={language} />
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
