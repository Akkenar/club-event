<?php

require_once './lib/phpmailer/PHPMailerAutoload.php';
require_once './class.template.php';
require_once './config.php';

$globalTPL = new Template('../translations');

function sendEmail($email, $total, $reference, $language, $data)
{
  if (!$email) {
    return;
  }

  $config = readConfig();

  if ($config['email.disable']) {
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

  $mail->From = 'webmaster@speleo-lausanne.ch';
  $mail->FromName = 'AD SSS 2019';
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
  $globalTPL->set_var('dinner', $data['dinner']);
  $globalTPL->set_var('vegetarian', $data['vegetarian']);
  $globalTPL->set_var('sleeping', $data['sleeping']);
  $globalTPL->set_var('camping', $data['camping']);
  $globalTPL->set_var('picknick', $data['picknick']);
  $globalTPL->set_var('breakfast', $data['breakfast']);

  return $globalTPL->finish($globalTPL->parse('email', 'email', true));
}
?>
