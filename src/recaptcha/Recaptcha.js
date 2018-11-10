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

const Recaptcha = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (loaded) {
      return;
    }

    // In case the script is already loaded.
    if (document.getElementById(SCRIPT_ID)) {
      setLoaded(true);
      return;
    }

    // Global callback hooked to the recaptcha script src.
    window.onloadCallback = () => {
      console.log('done');
      setLoaded(true);

      // Render the captcha
      grecaptcha.render(CONTAINER_ID, {
        sitekey: '6LeZ23kUAAAAALdlAuJg3X0MTmPelUzvJ4dAMpK-',
      });
    };

    // Append the script.
    appendRecaptchaScript();
  });

  if (!loaded) {
    return null;
  }

  return <div id={CONTAINER_ID} className="g-recaptcha" />;
};

export default Recaptcha;
