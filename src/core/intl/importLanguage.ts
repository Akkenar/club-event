export function importLanguage(language: string) {
  switch (language) {
    case 'en':
      return import(/* webpackChunkName: 'en' */ './en');
    case 'de':
      return import(/* webpackChunkName: 'de' */ './de');
    case 'fr':
      return import(/* webpackChunkName: 'fr' */ './fr');
    case 'it':
      return import(/* webpackChunkName: 'it' */ './it');
    default:
      throw new Error(`${language} not supported`);
  }
}
