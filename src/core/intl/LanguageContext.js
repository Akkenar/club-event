import React from 'react';
import { DEFAULT_LANGUAGE } from './provideLanguageInRoute';

const LanguageContext = React.createContext({
  messages: {},
  language: DEFAULT_LANGUAGE,
});

export default LanguageContext;
