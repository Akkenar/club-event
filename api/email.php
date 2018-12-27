<?php

require_once './vendor/phpmailer/phpmailer/PHPMailerAutoload.php';
require_once './class.template.php';
require_once './config.php';

$globalTPL = new Template('../translations');

function sendEmail($email, $total, $reference, $language, $data)
{
  if (!$email) {
    error_log('Missing email address', 0);
    return;
  }

  $config = readConfig();

  if ($config['email.ignore']) {
    error_log('No email send, disabled by configuration', 0);
    // By configuration
    return;
  }

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

  $mail->Subject = utf8_decode("AD SSS 2019 - Zahlung/Payment");
  $mail->Body = $message;

  if (!$mail->send()) {
    http_response_code(500);
    error_log($mail->ErrorInfo, 0);
    die('Mailer Error: ' . $mail->ErrorInfo);
  }
}

function getBody($total, $reference, $language, $data)
{
  global $globalTPL;
  $globalTPL->set_file('email', $language . '/confirmation_email.html');

  // Computed fields by the backend
  $globalTPL->set_var('total', $total);
  $globalTPL->set_var('reference', $reference);

  // Data send by the frontend
  $globalTPL->set_var('firstName', $data['firstName']);
  $globalTPL->set_var('lastName', $data['lastName']);
  $globalTPL->set_var('club', $data['club']);
  $globalTPL->set_var('street', $data['street']);
  $globalTPL->set_var('no', $data['no']);
  $globalTPL->set_var('npa', $data['npa']);
  $globalTPL->set_var('locality', $data['locality']);

  $products = $data['products'];
  $globalTPL->set_var('dinner', $products['dinner']);
  $globalTPL->set_var('vegetarian', $products['vegetarian']);
  $globalTPL->set_var('sleeping', $products['sleeping']);
  $globalTPL->set_var('camping', $products['camping']);
  $globalTPL->set_var('picknick', $products['picknick']);
  $globalTPL->set_var('breakfast', $products['breakfast']);
  $globalTPL->set_var('itemSize1', $products['itemSize1']);
  $globalTPL->set_var('itemSize2', $products['itemSize2']);
  $globalTPL->set_var('itemSize3', $products['itemSize3']);
  $globalTPL->set_var('itemSize4', $products['itemSize4']);

  return $globalTPL->finish($globalTPL->parse('email', 'email', true));
}
?>
