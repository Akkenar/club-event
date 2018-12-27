import * as confirmation from '../../../translations/fr/confirmation.md';
import * as information from '../../../translations/fr/information.md';
import * as messages from '../../../translations/fr/messages.json';
import { IntlType } from './intl.type';

const intl: IntlType = {
  confirmation,
  information,
  messages: (messages as any).default,
};

export default intl;
