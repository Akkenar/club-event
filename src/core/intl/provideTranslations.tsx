import * as React from 'react';
import { useEffect, useState } from 'react';
import { match as matchType } from 'react-router-dom';
import { setPageLanguage } from '../page.lib';
import { importLanguage } from './importLanguage';
import { IntlContext, IntlType } from './intl.type';
import LanguageContext from './LanguageContext';
import LanguageInRoute from './LanguageInRoute';

interface ProvideMessagesProps {
  match: matchType<{ language: string }>;
}

const INITIAL_STATE: IntlType = {
  confirmation: '',
  information: '',
  messages: {},
};

const changeLanguage = (
  language: string | null,
  currentLanguage: string | null | undefined,
  setState: (cb: (previousState: IntlType) => IntlType) => void
) => {
  if (!language || language === currentLanguage) {
    // No need to change anything if the language is already the one we want.
    return;
  }

  // For a11y reasons
  setPageLanguage(language);

  // Code splitting
  importLanguage(language).then(module => {
    const { messages, confirmation, information } = module.default;
    const newState: IntlType = {
      confirmation,
      information,
      language,
      messages,
    };
    setState(previousState => ({ ...previousState, ...newState }));
  });
};

export default function provideTranslations(
  Component: React.ComponentType<any>
) {
  const TranslationsProvider = ({ match }: ProvideMessagesProps) => {
    const [state, setState] = useState<IntlType>(INITIAL_STATE);
    const { language, messages, information, confirmation } = state;

    // Because we'll pass this function to the language switcher
    const handleChangeLanguage = (nextLang: string) =>
      changeLanguage(nextLang, language, setState);

    useEffect(() => {
      if (!language) {
        // Initial value from the route, if required.
        handleChangeLanguage(match.params.language);
      }
    });

    const value: IntlContext = {
      confirmation,
      handleChangeLanguage,
      information,
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
