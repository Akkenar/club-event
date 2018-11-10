export function setPageTitle(pageTitle) {
  document.querySelector('title').innerHTML = pageTitle;
}

export function setPageDescription(description) {
  document
    .querySelector('meta[name=description]')
    .setAttribute('content', description);
}

export function setPageLanguage(lang) {
  document.querySelector('html').setAttribute('lang', lang);
}

export function goToTop() {
  document.getElementById('top').focus();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}
