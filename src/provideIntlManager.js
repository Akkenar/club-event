import React, { Component } from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import de from 'react-intl/locale-data/de';
import it from 'react-intl/locale-data/it';

addLocaleData([...en, ...fr, ...de, ...it]);

const DEFAULT_LANGUAGE = 'de';
const SUPPORTED_LANGUAGES = ['fr', 'en', 'it', DEFAULT_LANGUAGE];

function getDefaultLanguage() {
  const locale =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage;

  if (!locale) {
    return DEFAULT_LANGUAGE;
  }

  const language = locale.split('-')[0];
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    return DEFAULT_LANGUAGE;
  }

  return language;
}

const messages = {};

function withIntlManager(Component) {
  return class IntlManager extends React.Component {
    constructor(props) {
      super(props);

      this.state = { language: getDefaultLanguage() };

      this.handleChangeLocale = this.handleChangeLocale.bind(this);
    }

    handleChangeLocale(lang) {
      this.setState({
        language: lang,
      });
    }

    render() {
      return (
        <IntlProvider locale={this.state.language} messages={messages}>
          <Component
            handleChangeLocale={this.handleChangeLocale}
            language={this.state.language}
          />
        </IntlProvider>
      );
    }
  };
}

export default withIntlManager;
