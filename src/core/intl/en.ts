import * as confirmation from '../../../translations/en/confirmation.md';
import * as information from '../../../translations/en/information.md';
import * as messages from '../../../translations/en/messages.json';
import { IntlType } from './intl.type';

const intl: IntlType = {
  confirmation,
  information,
  messages: (messages as any).default,
};

export default intl;
