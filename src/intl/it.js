import { addLocaleData } from 'react-intl';

import messages from './it/messages.it.json';
import confirmation from './it/confirmation-email.it.md';
import information from './it/information.it.md';
import it from 'react-intl/locale-data/it';

addLocaleData([...it]);

const intl = {
  messages,
  confirmation,
  information,
};

export default intl;
