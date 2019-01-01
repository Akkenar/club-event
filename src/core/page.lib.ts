export function setPageTitle(pageTitle: string) {
  document.title = pageTitle;
}

export function setPageDescription(description: string) {
  const element = document.querySelector('meta[name=description]');
  if (element) {
    element.setAttribute('content', description);
  }
}

export function setPageLanguage(lang: string) {
  const html = document.querySelector('html');
  if (html) {
    html.setAttribute('lang', lang);
  }
}

export function goToTop() {
  const top = document.getElementById('top');
  if (top) {
    top.focus();
  }
}

export function setFocusOnError() {
  setTimeout(() => {
    const element: HTMLElement | null =
      document.querySelector('*[aria-invalid="true"]') ||
      document.querySelector('button[type=submit]');

    if (element) {
      element.focus();
    }
  }, 0);
}

export function hideSSRHeader() {
  const ssr = document.getElementById('ssr-header');
  if (ssr) {
    ssr.remove();
  }
}
