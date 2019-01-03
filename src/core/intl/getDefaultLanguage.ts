import { LANGUAGE } from './intl.type';

export const DEFAULT_LANGUAGE = LANGUAGE.DE;

export function getDefaultLanguage(): LANGUAGE {
  try {
    const locale: string =
      (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      (navigator as any).userLanguage;

    if (!locale) {
      return DEFAULT_LANGUAGE;
    }

    const language = locale.split('-')[0];
    return (LANGUAGE as any)[language.toUpperCase()] || DEFAULT_LANGUAGE;
  } catch (e) {
    // In case something really goes wrong.
    return DEFAULT_LANGUAGE;
  }
}
