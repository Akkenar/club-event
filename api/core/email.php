<?php

require_once __DIR__ . '/../vendor/autoload.php';
require_once 'config.php';
require_once 'products.php';

$globalTPL = new HTML_Template_PHPLIB(__DIR__ . '/../../translations', 'keep');

function sendEmail($email, $total, $reference, $language, $data)
{
  if (!$email) {
    error_log('Missing email address', 0);
    return;
  }

  $config = readConfig();

  // Sujet et message.
  $message = getBody($total, $reference, $language, $data);

  // Envoi du mail.
  $mail = new PHPMailer();

  // UTF-8 Charset
  $mail->CharSet = 'UTF-8';

  // Set mailer to use SMTP
  $mail->isSMTP();
  // Specify main and backup server
  $mail->Host = $config['email.host'];
  $mail->Port = 587;
  // Enable SMTP authentication
  $mail->SMTPAuth = true;
  // SMTP username
  $mail->Username = $config['email.username'];
  // SMTP password
  $mail->Password = $config['email.password'];

  $mail->From = 'ad-sss-info@speleo-lausanne.ch';
  $mail->FromName = 'AD SSS Valorbe 2019';
  // Add a recipient
  $mail->addAddress($email, $email);

  // Set email format to HTML
  $mail->isHTML(true);

  $mail->Subject = utf8_decode('AD SSS 2019 - Zahlung/Paiement');
  $mail->Body = $message;

  if ($config['email.ignore']) {
    error_log('No email send, disabled by configuration. ' . $message, 0);
    // By configuration
    return;
  }

  if (!$mail->send()) {
    http_response_code(500);
    error_log($mail->ErrorInfo, 0);
    die('Mailer Error: ' . $mail->ErrorInfo);
  }
}

function getBody($total, $reference, $language, $data)
{
  global $globalTPL;
  $globalTPL->setFile('email', $language . '/confirmation_email.html');

  // Computed fields by the backend
  $globalTPL->setVar('total', $total);
  $globalTPL->setVar('reference', $reference);

  // Data send by the frontend
  $globalTPL->setVar('firstName', $data['firstName']);
  $globalTPL->setVar('lastName', $data['lastName']);
  $globalTPL->setVar('club', $data['club']);
  $globalTPL->setVar('street', $data['street']);
  $globalTPL->setVar('no', $data['no']);
  $globalTPL->setVar('npa', $data['npa']);
  $globalTPL->setVar('locality', $data['locality']);

  $products = $data['products'];
  setProductVariable($globalTPL, $products, 'dinner');
  setProductVariable($globalTPL, $products, 'vegetarian');
  setProductVariable($globalTPL, $products, 'dinnerKid');
  setProductVariable($globalTPL, $products, 'vegetarianKid');
  setProductVariable($globalTPL, $products, 'sleeping');
  setProductVariable($globalTPL, $products, 'camping');
  setProductVariable($globalTPL, $products, 'picknick');
  setProductVariable($globalTPL, $products, 'breakfast');

  return $globalTPL->finish($globalTPL->parse('email', 'email', true));
}

function setProductVariable($globalTPL, $products, $productName)
{
  // Product name
  if (array_key_exists($productName, $products)) {
    $globalTPL->setVar($productName, $products[$productName]);
  } else {
    $globalTPL->setVar($productName, '0');
  }

  // Product price
  $globalTPL->setVar($productName . '-price', getPriceFor($productName));
}
?>
