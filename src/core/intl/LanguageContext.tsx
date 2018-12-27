import * as React from 'react';
import { IntlContext } from './intl.type';
import { DEFAULT_LANGUAGE } from './provideLanguageInRoute';

const LanguageContext = React.createContext<IntlContext>({
  language: DEFAULT_LANGUAGE,
  messages: {},
});

export default LanguageContext;
