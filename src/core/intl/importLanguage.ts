import { IntlType } from './intl.type';

export function importLanguage(
  language: string
): Promise<{ default: IntlType }> {
  switch (language) {
    case 'en':
      return import(/* webpackChunkName: 'en' */ './languages/en');
    case 'de':
      return import(/* webpackChunkName: 'de' */ './languages/de');
    case 'fr':
      return import(/* webpackChunkName: 'fr' */ './languages/fr');
    case 'it':
      return import(/* webpackChunkName: 'it' */ './languages/it');
    default:
      return Promise.reject(`${language} not supported`);
  }
}
