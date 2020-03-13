import { useEffect, useState } from 'react';

const SCRIPT_ID = 'recaptcha-script';
const CONTAINER_ID = 'recaptcha-container';

declare global {
  interface Window {
    onloadCallback: any;
    grecaptcha?: any;
  }
}

function appendRecaptchaScript(language: string) {
  const src = `https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit&hl=${language}`;

  // Clean the existing script, in case it has been added for the wrong language.
  const existingScript = document.getElementById(SCRIPT_ID);
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.id = SCRIPT_ID;
  script.src = src;
  document.head.appendChild(script);
}

function renderCaptcha() {
  const { grecaptcha } = window;
  if (!grecaptcha) {
    // On the unlikely case google.com couldn't be reached
    return;
  }

  // Render the captcha
  grecaptcha.render(CONTAINER_ID, {
    sitekey: '6LeZ23kUAAAAALdlAuJg3X0MTmPelUzvJ4dAMpK-',
  });
}

export interface UseCaptchaScriptType {
  isLoaded: boolean;
  isScriptAdded: boolean;
  containerId: string;
}

export function useCaptchaScript(
  language: string | null | undefined,
  // To make sure we don't have any conditional hooks
  loadCaptcha: boolean,
): UseCaptchaScriptType {
  const [loadedForLanguage, setLoaded] = useState<string | null>(null);
  const [scriptAddedForLanguage, setScriptAdded] = useState<string | null>(
    null,
  );

  // To make sure we only render the captcha when there is a language and
  // when the caller says we can (e.g. lazy loading).
  const shouldLoadCaptcha = loadCaptcha && !!language;
  const languageOrDefault = language || '';

  useEffect(() => {
    const loadRecaptcha = () => {
      if (shouldLoadCaptcha) {
        renderCaptcha();
        setLoaded(languageOrDefault);
      }
    };

    if (!shouldLoadCaptcha || scriptAddedForLanguage === languageOrDefault) {
      return;
    }

    // Global callback hooked to the recaptcha script src to only render
    // the captcha when the script is loaded.
    window.onloadCallback = loadRecaptcha;

    // Append the script.
    appendRecaptchaScript(languageOrDefault);

    setScriptAdded(languageOrDefault);
  }, [
    shouldLoadCaptcha,
    scriptAddedForLanguage,
    languageOrDefault,
    loadCaptcha,
    setScriptAdded,
    setLoaded,
  ]);

  return {
    containerId: CONTAINER_ID,
    isLoaded: loadedForLanguage === language && loadCaptcha,
    isScriptAdded: scriptAddedForLanguage === language && loadCaptcha,
  };
}
