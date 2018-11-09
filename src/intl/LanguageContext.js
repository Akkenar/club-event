import React from 'react';
import { DEFAULT_LANGUAGE } from './provideIntlManager';

const LanguageContext = React.createContext({
  messages: {},
  language: DEFAULT_LANGUAGE,
});

export default LanguageContext;
