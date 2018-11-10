<?php
require_once 'lib/recaptcha-1.2.1/src/autoload.php';

$config = parse_ini_file('credentials.properties');

$recaptcha = new \ReCaptcha\ReCaptcha($config['recaptcha.key']);
$resp = $recaptcha->setExpectedHostname('ad-sss.speleo-lausanne.ch')
  ->verify($gRecaptchaResponse, $remoteIp);
if ($resp->isSuccess()) {
  // Verified!
} else {
  $errors = $resp->getErrorCodes();
}
?>