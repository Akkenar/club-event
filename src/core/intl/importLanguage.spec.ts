import { importLanguage, preloadAllLanguages } from './importLanguage';

jest.mock('./languages/en', () => ({}));
jest.mock('./languages/fr', () => ({}));
jest.mock('./languages/it', () => ({}));
jest.mock('./languages/de', () => ({}));

const expectedLanguageObject = { default: {} };

describe('importLanguage', () => {
  it('should import en', done => {
    const language = importLanguage('en');
    language.then(data => {
      expect(data).toEqual(expectedLanguageObject);
      done();
    });
  });

  it('should import fr', done => {
    const language = importLanguage('fr');
    language.then(data => {
      expect(data).toEqual(expectedLanguageObject);
      done();
    });
  });

  it('should import it', done => {
    const language = importLanguage('it');
    language.then(data => {
      expect(data).toEqual(expectedLanguageObject);
      done();
    });
  });

  it('should import de', done => {
    const language = importLanguage('de');
    language.then(data => {
      expect(data).toEqual(expectedLanguageObject);
      done();
    });
  });

  it('should throw an error if the language is not supported', done => {
    importLanguage('zz').catch(e => {
      expect(e).toEqual('zz not supported');
      done();
    });
  });

  it('should preload all the languages', done => {
    preloadAllLanguages().then(data => {
      expect(data).toEqual([
        expectedLanguageObject,
        expectedLanguageObject,
        expectedLanguageObject,
        expectedLanguageObject,
      ]);
      done();
    });
  });
});
