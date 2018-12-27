export function getCaptchaResponse(): string {
  const noCaptcha = window.location.href.includes('ignoreCaptcha');
  const { grecaptcha } = window as any;
  if (noCaptcha || !grecaptcha) {
    return 'no-captcha';
  }
  return grecaptcha.getResponse();
}

export function resetCaptcha() {
  const { grecaptcha } = window as any;
  if (grecaptcha) {
    grecaptcha.reset();
  }
}
