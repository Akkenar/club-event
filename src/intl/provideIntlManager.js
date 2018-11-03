import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import Loader from '../loader/Loader';

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

function importLocale(locale) {
  switch (locale) {
    case 'en':
      return import(/* webpackChunkName: 'en' */ './en');
    case 'de':
      return import(/* webpackChunkName: 'de' */ './de');
    case 'fr':
      return import(/* webpackChunkName: 'fr' */ './fr');
    case 'it':
      return import(/* webpackChunkName: 'it' */ './it');
    default:
      throw new Error(`${locale} not supported`);
  }
}

function withIntlManager(Component) {
  return class IntlManager extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        language: null,
        messages: {},
        confirmation: null,
        information: null,
      };

      this.handleChangeLocale = this.handleChangeLocale.bind(this);

      this.handleChangeLocale(getDefaultLanguage());
    }

    handleChangeLocale(lang) {
      importLocale(lang).then(module => {
        const { messages, confirmation, information } = module.default;
        this.setState({
          language: lang,
          messages: Object.assign({}, messages, {
            confirmation,
            information,
          }),
        });
      });
    }

    render() {
      if (!this.state.language) {
        return <Loader />;
      }

      return (
        <IntlProvider
          locale={this.state.language}
          messages={this.state.messages}
        >
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
