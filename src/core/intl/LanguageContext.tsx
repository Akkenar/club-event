import * as React from 'react';
import { IntlContext } from './intl.type';

const LanguageContext = React.createContext<IntlContext>({
  confirmation: '',
  handleChangeLanguage: () => {
    /* noop */
  },
  information: '',
  messages: {},
});

export default LanguageContext;
