import * as confirmation from '../../../translations/it/confirmation.md';
import * as information from '../../../translations/it/information.md';
import * as messages from '../../../translations/it/messages.json';
import { IntlType } from './intl.type';

const intl: IntlType = {
  confirmation,
  information,
  messages: (messages as any).default,
};

export default intl;
