import { addLocaleData } from 'react-intl';

import messages from './en/messages.en.json';
import confirmation from './en/confirmation-email.en.md';
import information from './en/information.en.md';
import en from 'react-intl/locale-data/en';

addLocaleData([...en]);

const intl = {
  messages,
  confirmation,
  information,
};

export default intl;
