import { useContext } from 'react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import getKey from '../intl/getKey';
import LanguageContext from '../intl/LanguageContext';
import { useIntersectionObserver } from '../useIntersectionObserver';

const CONTAINER_ID = 'recaptcha-container';
const SCRIPT_ID = 'recaptcha-script';
const CAPTCHA_SIZE = { height: 78, width: 302 };

function appendRecaptchaScript(language: string) {
  const src = `https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit&hl=${language}`;

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.id = SCRIPT_ID;
  script.src = src;
  document.head.appendChild(script);
}

function renderCaptcha() {
  const { grecaptcha } = window as any;
  if (!grecaptcha) {
    // On the unlikely case google.com couldn't be reached
    return;
  }

  // Render the captcha
  grecaptcha.render(CONTAINER_ID, {
    sitekey: '6LeZ23kUAAAAALdlAuJg3X0MTmPelUzvJ4dAMpK-',
  });
}

const Recaptcha = () => {
  const [loaded, setLoaded] = useState(false);
  const { isDisplayed, startObserving } = useIntersectionObserver();
  const { messages, language } = useContext(LanguageContext);

  useEffect(() => {
    if (!isDisplayed) {
      return;
    }

    // In case the script is not loaded.
    if (!document.getElementById(SCRIPT_ID)) {
      // Global callback hooked to the recaptcha script src to only render
      // the captcha when the script is loaded.
      (window as any).onloadCallback = () => {
        renderCaptcha();
        setLoaded(true);
      };

      // Append the script.
      appendRecaptchaScript(language);
    } else if (!loaded) {
      // Direct render.
      renderCaptcha();
      setLoaded(true);
    }
  });

  if (!isDisplayed) {
    return (
      <div style={CAPTCHA_SIZE} ref={startObserving}>
        {getKey('loading', messages)}
      </div>
    );
  }

  return (
    <div style={CAPTCHA_SIZE} id={CONTAINER_ID} className="g-recaptcha">
      {getKey('loading', messages)}
    </div>
  );
};

export default Recaptcha;
