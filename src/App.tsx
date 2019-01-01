import * as React from 'react';
import { useContext } from 'react';

import './App.scss';
import AppRouting from './AppRouting';
import FooterAsync from './core/footer/FooterAsync';
import HeaderAsync from './core/header/HeaderAsync';
import LanguageContext from './core/intl/LanguageContext';
import provideTranslations from './core/intl/provideTranslations';
import './style/font.scss';
import './style/main.scss';
import './style/semantic.scss';

const AppContainer = () => {
  const { language } = useContext(LanguageContext);
  return (
    <React.Fragment>
      <div id="top" tabIndex={-1} className="visually-hidden">
        Top
      </div>
      <div className="App">
        <header className="App__Header no-print">
          <HeaderAsync />
        </header>
        <main className="App__Main">
          <div className="App__MainContainer">
            {language ? <AppRouting /> : null}
          </div>
        </main>
        <footer className="App__Footer no-print">
          <FooterAsync />
        </footer>
      </div>
    </React.Fragment>
  );
};

const App = provideTranslations(AppContainer);

export default App;
