import * as React from 'react';
import { DEFAULT_LANGUAGE } from './getDefaultLanguage';
import { IntlContext } from './intl.type';

const LanguageContext = React.createContext<IntlContext>({
  handleChangeLanguage: () => ({}),
  language: DEFAULT_LANGUAGE,
  messages: {},
});

export default LanguageContext;
