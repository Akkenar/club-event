import { addLocaleData } from 'react-intl';

import messages from './de/messages.de.json';
import confirmation from './de/confirmation-email.de.md';
import information from './de/information.de.md';
import de from 'react-intl/locale-data/de';

addLocaleData([...de]);

const intl = {
  messages,
  confirmation,
  information,
};

export default intl;
