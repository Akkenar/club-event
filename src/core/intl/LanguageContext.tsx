import * as React from 'react';
import { IntlType } from './intl.type';

const LanguageContext = React.createContext<IntlType>({
  confirmation: '',
  information: '',
  messages: {},
});

export default LanguageContext;
