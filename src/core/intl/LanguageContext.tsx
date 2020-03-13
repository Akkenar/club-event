import React from 'react';
import { IntlType } from './intl.type';

const LanguageContext = React.createContext<IntlType>({
  confirmation: '',
  information: '',
  schedule: '',
  messages: {},
});

export default LanguageContext;
