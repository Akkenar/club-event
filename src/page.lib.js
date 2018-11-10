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
  const top = document.getElementById('top');
  if (top) {
    top.focus();
  }
}
