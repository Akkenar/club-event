import * as confirmation from '../../../translations/de/confirmation.md';
import * as information from '../../../translations/de/information.md';
import * as messages from '../../../translations/de/messages.json';
import { IntlType } from './intl.type';

const intl: IntlType = {
  confirmation,
  information,
  messages: (messages as any).default,
};

export default intl;
