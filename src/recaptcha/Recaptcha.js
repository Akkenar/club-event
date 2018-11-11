import React, { useEffect, useState } from 'react';

const CONTAINER_ID = 'recaptcha-container';
const SCRIPT_ID = 'recaptcha-script';

function appendRecaptchaScript() {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.id = SCRIPT_ID;
  script.src =
    'https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit';
  document.head.appendChild(script);
}

function renderCaptcha() {
  // Render the captcha
  grecaptcha.render(CONTAINER_ID, {
    sitekey: '6LeZ23kUAAAAALdlAuJg3X0MTmPelUzvJ4dAMpK-',
  });
}

const Recaptcha = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    // In case the script is not loaded.
    if (!document.getElementById(SCRIPT_ID)) {
      // Global callback hooked to the recaptcha script src to only render
      // the captcha when the script is loaded.
      window.onloadCallback = () => {
        renderCaptcha();
        setLoaded(true);
      };

      // Append the script.
      appendRecaptchaScript();
    } else if (!loaded) {
      // Direct render.
      renderCaptcha();
      setLoaded(true);
    }
  });

  return <div id={CONTAINER_ID} className="g-recaptcha" />;
};

export default Recaptcha;
