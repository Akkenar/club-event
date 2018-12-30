import { useEffect, useState } from 'react';
import * as React from 'react';
import { match as matchType } from 'react-router-dom';
import { setPageLanguage } from '../page.lib';
import { importLanguage } from './importLanguage';
import { IntlType } from './intl.type';
import LanguageContext from './LanguageContext';
import LanguageInRoute from './LanguageInRoute';

interface ProvideMessagesState extends IntlType {
  language: string | null;
}

interface ProvideMessagesProps {
  match: matchType<{ language: string }>;
}

const INITIAL_STATE: ProvideMessagesState = {
  confirmation: '',
  information: '',
  language: null,
  messages: {},
};

const changeLanguage = (
  lang: string,
  currentLanguage: string | null,
  setState: (
    cb: (previousState: ProvideMessagesState) => ProvideMessagesState
  ) => void
) => {
  if (!lang || lang === currentLanguage) {
    // No need to change anything if the language is already the one we want.
    return;
  }

  // For a11y reasons
  setPageLanguage(lang);

  // Code splitting
  importLanguage(lang).then(module => {
    const { messages, confirmation, information } = module.default;
    const newState = {
      language: lang,
      messages: { ...messages, confirmation, information },
    };
    setState(previousState => ({ ...previousState, ...newState }));
  });
};

export default function provideTranslations(
  Component: React.ComponentType<any>
) {
  const TranslationsProvider = ({ match }: ProvideMessagesProps) => {
    const [state, setState] = useState(INITIAL_STATE);
    const { language, messages } = state;

    // Because we'll pass this function to the language switcher
    const handleChangeLanguage = (nextLang: string) =>
      changeLanguage(nextLang, language, setState);

    useEffect(() => {
      // Initial value from the route, if required.
      if (!language) {
        handleChangeLanguage(match.params.language);
      }
    });

    if (!language) {
      // While the page is loading
      return null;
    }

    const value = {
      handleChangeLanguage,
      language,
      messages,
    };

    return (
      <LanguageContext.Provider value={value}>
        <Component />
      </LanguageContext.Provider>
    );
  };

  return () => <LanguageInRoute component={TranslationsProvider} />;
}
