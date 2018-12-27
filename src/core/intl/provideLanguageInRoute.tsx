import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

export const DEFAULT_LANGUAGE = 'de';
const SUPPORTED_LANGUAGES = ['fr', 'en', 'it', DEFAULT_LANGUAGE];

function getDefaultLanguage() {
  try {
    const locale =
      (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      (navigator as any).userLanguage;

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

export function provideLanguageInRoute(Component: any) {
  return class LanguageInRoute extends React.Component {
    public render() {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/:language([a-z]{2})" component={Component} />
            <Redirect to={`/${getDefaultLanguage()}`} />
          </Switch>
        </BrowserRouter>
      );
    }
  };
}
