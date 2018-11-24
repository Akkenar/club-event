<?php

require_once './lib/phpmailer/PHPMailerAutoload.php';
require_once './class.template.php';
require_once './config.php';

$globalTPL = new Template('templates');

function sendEmail($email, $total, $reference, $language)
{
  if (!$email) {
    die("Email missing");
  }

  $config = readConfig();

  // Sujet et message.
  $message = getBody($total, $reference, $language);

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
    die('Mailer Error: ' . $mail->ErrorInfo);
  }
}

function getBody($total, $reference, $language)
{
  global $globalTPL;
  $globalTPL->set_file('email', 'confirmation_email_' . $language . '.html');

  $globalTPL->set_var('total', $total);
  $globalTPL->set_var('reference', $reference);

  return $globalTPL->finish($globalTPL->parse('email', 'email', true));
}
?>
