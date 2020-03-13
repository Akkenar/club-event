import React from 'react';
import { useContext } from 'react';
import getKey from '../intl/getKey';
import LanguageContext from '../intl/LanguageContext';
import { useIntersectionObserver } from '../useIntersectionObserver';
import { useCaptchaScript } from './useCaptchaScript';

const CAPTCHA_SIZE = { height: 78, width: 302 };

const Recaptcha = () => {
  const { isDisplayed, startObserving } = useIntersectionObserver();
  const { messages, language } = useContext(LanguageContext);
  const { isLoaded, isScriptAdded, containerId } = useCaptchaScript(
    language,
    isDisplayed,
  );

  // If no language, don't bother rendering the captcha, just the placeholder
  if (!language) {
    return <div style={CAPTCHA_SIZE}>&nbsp;</div>;
  }

  // Lazy loading, if enabled.
  if (!isDisplayed) {
    return (
      <div
        style={CAPTCHA_SIZE}
        ref={startObserving}
        data-testid="captcha-loading"
      >
        {getKey('loading', messages)}
      </div>
    );
  }

  if (!isScriptAdded) {
    // Nothing, so when we change the language, the element in the DOM is deleted.
    return null;
  }

  // Container for the captcha, the ID matters.
  return (
    <div
      style={CAPTCHA_SIZE}
      id={containerId}
      data-testid={`recaptcha--${isLoaded}`}
    >
      {getKey('loading', messages)}
    </div>
  );
};

export default Recaptcha;
