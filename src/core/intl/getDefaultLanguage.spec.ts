import { DEFAULT_LANGUAGE, getDefaultLanguage } from './getDefaultLanguage';

const defineLanguages = (value: any) =>
  Object.defineProperty(navigator, 'languages', { value, configurable: true });

const defineLanguage = (value: any) =>
  Object.defineProperty(navigator, 'language', { value, configurable: true });

describe('getDefaultLanguage', () => {
  it('should provide a default language based on the navigator language', () => {
    defineLanguages(['fr']);
    expect(getDefaultLanguage()).toEqual('fr');
  });

  it('should provide a default language based on the navigator language as locale', () => {
    defineLanguages(['fr-CH']);
    expect(getDefaultLanguage()).toEqual('fr');
  });

  it('should fallback to the default language', () => {
    defineLanguages([]);
    defineLanguage('');
    expect(getDefaultLanguage()).toEqual(DEFAULT_LANGUAGE);
  });

  it('should fallback to the default language if the language of the navigator is not supported', () => {
    defineLanguages(['zz']);
    defineLanguage('');
    expect(getDefaultLanguage()).toEqual(DEFAULT_LANGUAGE);
  });

  it('should fallback to the default language if something goes fanward', () => {
    defineLanguages([
      {
        // Trick the internal implementation
        indexOf: () => {
          throw new Error('boom');
        },
      },
    ]);
    expect(getDefaultLanguage()).toEqual(DEFAULT_LANGUAGE);
  });
});
