import { IntlType, LANGUAGE } from './intl.type';

export function importLanguage(
  language: string,
): Promise<{ default: IntlType }> {
  switch (language) {
    case LANGUAGE.EN:
      return import(/* webpackChunkName: 'en' */ './languages/en');
    case LANGUAGE.DE:
      return import(/* webpackChunkName: 'de' */ './languages/de');
    case LANGUAGE.FR:
      return import(/* webpackChunkName: 'fr' */ './languages/fr');
    case LANGUAGE.IT:
      return import(/* webpackChunkName: 'it' */ './languages/it');
    default:
      return Promise.reject(`${language} not supported`);
  }
}

export function preloadAllLanguages(): Promise<any> {
  return Promise.all(
    Object.keys(LANGUAGE).map(lang => importLanguage((LANGUAGE as any)[lang])),
  );
}
