<?php
require_once './config.php';
require_once './lib/recaptcha-1.2.1/src/autoload.php';

function validateCaptcha($recaptchaResponse)
{
  $config = readConfig();
  if ($config['recaptcha.ignore'] && $recaptchaResponse === 'no-captcha') {
    error_log("Ignoring captcha", 0);
    // By configuration.
    return;
  }

  // Recaptcha utils
  $recaptcha = new \ReCaptcha\ReCaptcha($config['recaptcha.key']);

  // Validate the recaptcha
  $resp = $recaptcha->verify($recaptchaResponse);
  if (!$resp->isSuccess()) {
    $errors = $resp->getErrorCodes();
    http_response_code(500);
    $error_json =
      '{"result": "error", "reason": "' . json_encode($errors) . '"}';
    syslog(LOG_ERR, $error_json);
    echo $error_json;
    die();
  }
}
