export function setPageTitle(pageTitle) {
  document.querySelector('title').innerHTML = pageTitle;
}

export function setPageDescription(description) {
  document
    .querySelector('meta[name=description]')
    .setAttribute('content', description);
}

export function setPageLangage(lang) {
  document.querySelector('html').setAttribute('lang', lang);
}
