import {
  goToTop,
  hideSSRHeader,
  setFocusOnError,
  setPageDescription,
  setPageLanguage,
  setPageTitle,
} from './page.lib';

function mockDocument() {
  document.head.innerHTML = '<meta name="description" content="" />';
  document.body.innerHTML =
    '<div id="ssr-header"></div>' +
    '<div id="top" tabindex="-1">' +
    '<input id="input" aria-invalid="true"/>' +
    '</div>';
}

describe('page.lib', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
    document.body.innerHTML = '';
  });

  it('should set the page title', () => {
    setPageTitle('title');
    expect(document.title).toEqual('title');
  });

  it('should got to top', () => {
    mockDocument();

    goToTop();
    const element = document.activeElement;
    expect(element && element.getAttribute('id')).toEqual('top');
  });

  it('should not crash if the element is not in the DOM', () => {
    goToTop();
  });

  it('should focus on the first error', done => {
    mockDocument();
    setFocusOnError();

    // The implementation of the setFocusOnError relies on being executed at the end of the
    // event queue.
    setTimeout(() => {
      const element = document.activeElement;
      expect(element && element.getAttribute('id')).toEqual('input');
      done();
    }, 0);
  });

  it('should set the page description', () => {
    mockDocument();

    setPageDescription('testDescription');
    expect(document.head.innerHTML).toContain('testDescription');
  });

  it('should not set the page description if the element is not in the DOM', () => {
    setPageDescription('testDescription');
    expect(document.head.innerHTML).not.toContain('testDescription');
  });

  it('should set the page language', () => {
    mockDocument();
    setPageLanguage('fr');
    const html = document.querySelector('html');
    expect(html && html.getAttribute('lang')).toBe('fr');
  });

  it('should hide the ssr header', () => {
    mockDocument();
    expect(document.getElementById('ssr-header')).toBeTruthy();

    hideSSRHeader();
    expect(document.getElementById('ssr-header')).toBeFalsy();
  });
});
