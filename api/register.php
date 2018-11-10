<?php
require_once './lib/recaptcha-1.2.1/src/autoload.php';

// Config
$config = parse_ini_file('./credentials.properties');

// Recaptcha utils
$recaptcha = new \ReCaptcha\ReCaptcha($config['recaptcha.key']);

// Read the JSON as array from the client
$DATA = json_decode(file_get_contents('php://input'), true);
$recaptchaResponse = $DATA['recaptcha'];

// Validate the recaptcha
$resp = $recaptcha->verify($recaptchaResponse);
if (!$resp->isSuccess()) {
  $errors = $resp->getErrorCodes();
  //echo print_r($errors);
  http_response_code(500);
  echo '{"result": "error"}';
  die();
}

// Save the data
// TODO

// Success!
echo '{"result": "success"}';
?>