import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useParams,
} from 'react-router-dom';
import { getDefaultLanguage } from './getDefaultLanguage';
import LanguageContext from './LanguageContext';
import { useTranslations } from './useTranslations';

export const BASE_URL_WITH_LANG = '/:language([a-z]{2})';

export default function provideTranslations(
  Component: React.ComponentType<any>,
) {
  /**
   * The provided, depends on the routing and the language.
   * @constructor
   */
  const TranslationsProvider = () => {
    const { language } = useParams();
    const value = useTranslations(language);

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
        <Route path={`${BASE_URL_WITH_LANG}/:page`}>
          <TranslationsProvider />
        </Route>
        <Redirect to={`/${getDefaultLanguage()}/home`} />
      </Switch>
    </BrowserRouter>
  );
}
