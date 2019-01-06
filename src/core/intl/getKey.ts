import { IntlKey } from './intl.type';

function replaceAll(value: string, placeholders?: { [key: string]: string }) {
  if (!placeholders) {
    return value;
  }

  return Object.keys(placeholders).reduce((result, key) => {
    const valueToReplace = placeholders[key];
    return result.replace(new RegExp(`\\{${key}\\}`, 'g'), valueToReplace);
  }, value);
}

function getKey(
  key: string,
  messages: IntlKey,
  placeholders?: { [key: string]: string }
): string {
  if (!messages) {
    return key;
  }

  const value = messages[key] || key;

  return replaceAll(value, placeholders);
}

export default getKey;
