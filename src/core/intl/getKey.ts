import { IntlKey } from './intl.type';

function getKey(key: string, messages: IntlKey): string {
  if (!messages) {
    return key;
  }

  return messages[key] || key;
}

export default getKey;
