import * as React from 'react';
import {
  BrowserRouter,
  match as matchType,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { getDefaultLanguage } from './getDefaultLanguage';
import LanguageContext from './LanguageContext';
import { useTranslations } from './useTranslations';

export const BASE_URL_WITH_LANG = '/:language([a-z]{2})';

interface ProvideMessagesProps {
  match: matchType<{ language: string }>;
}

export default function provideTranslations(
  Component: React.ComponentType<any>,
) {
  /**
   * The provided, depends on the routing and the language.
   * @param match
   * @constructor
   */
  const TranslationsProvider = ({ match }: ProvideMessagesProps) => {
    const targetLanguage = match.params.language;
    const value = useTranslations(targetLanguage);

    return (
      <LanguageContext.Provider value={value}>
        <Component />
      </LanguageContext.Provider>
    );
  };

  // Wrap the translation provider in a router.
  return () => (
    <BrowserRouter>
      <Switch>
        <Route
          path={`${BASE_URL_WITH_LANG}/:page`}
          component={TranslationsProvider}
        />
        <Redirect to={`/${getDefaultLanguage()}/home`} />
      </Switch>
    </BrowserRouter>
  );
}
