import { addLocaleData } from 'react-intl';

import messages from './fr/messages.fr.json';
import confirmation from './fr/confirmation-email.fr.md';
import information from './fr/information.fr.md';
import fr from 'react-intl/locale-data/fr';

addLocaleData([...fr]);

const intl = {
  messages,
  confirmation,
  information,
};

export default intl;
