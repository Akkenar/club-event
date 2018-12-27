<?php
require_once 'config.php';
require_once __DIR__ . '/../vendor/google/recaptcha/src/autoload.php';

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
    $result = [];
    $result['result'] = 'error';
    $result['reason'] = $errors;
    $result['message'] = 'Captcha invalide';
    $error_json = json_encode($result);
    syslog(LOG_ERR, $error_json);
    echo $error_json;
    die();
  }
}
