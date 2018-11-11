import React, { Component } from 'react';
import Loader from '../loader/Loader';
import { setPageLanguage } from '../page.lib';
import LanguageContext from './LanguageContext';

export const DEFAULT_LANGUAGE = 'de';
const SUPPORTED_LANGUAGES = ['fr', 'en', 'it', DEFAULT_LANGUAGE];

function getDefaultLanguage() {
  try {
    const [langFromUrl] = window.location.href.split('/').reverse();
    if (SUPPORTED_LANGUAGES.indexOf(langFromUrl) > -1) {
      return langFromUrl;
    }

    const locale =
      (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      navigator.userLanguage;

    if (!locale) {
      return DEFAULT_LANGUAGE;
    }

    const language = locale.split('-')[0];
    if (SUPPORTED_LANGUAGES.indexOf(language) === -1) {
      return DEFAULT_LANGUAGE;
    }

    return language;
  } catch (e) {
    // In case something really goes wrong.
    return DEFAULT_LANGUAGE;
  }
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

export function withIntlManager(Component) {
  return class IntlManager extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        language: null,
        messages: {},
        confirmation: null,
        information: null,
      };

      this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
      this.handleChangeLanguage(getDefaultLanguage());
    }

    handleChangeLanguage(lang) {
      // For a11y reasons
      setPageLanguage(lang);

      // Code splitting
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

      const { messages, language } = this.state;

      return (
        <LanguageContext.Provider
          value={{
            messages,
            language,
            handleChangeLanguage: this.handleChangeLanguage,
          }}
        >
          <Component />
        </LanguageContext.Provider>
      );
    }
  };
}
