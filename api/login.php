<?php

include_once './core/database.php';
include_once './core/captcha.php';

$DATA = json_decode(file_get_contents('php://input'), true);

// This will break if the captcha isn't valid.
validateCaptcha($DATA['recaptcha']);

// We need the Db as soon as we know the request is legit.
$db = connectDb();

// Read data
$username = $db->real_escape_string($DATA['username']);
$password = $db->real_escape_string($DATA['password']);

if (!$username || !$password) {
  error('Missing fields');
}

// Exit the script if the login is not valid.
checkLoginOrDie($username, $password);

// PHP Session
session_start();

// In case the user is already logged in
session_destroy();

// Set the session data if the script reaches this point
$_SESSION['group'] = "admin";
$_SESSION['username'] = $username;

// Cleanup before exiting.
session_write_close();
disconnectDB();

// Success.
$result = [];
$result['result'] = 'success';
echo json_encode($result);
exit();

/**
 * @param $message
 */
function error($message)
{
  http_response_code(500);
  error_log($message, 0);
  $result = [];
  $result['result'] = 'error';
  $result['message'] = $message;
  echo json_encode($result);
  exit();
}

/**
 * @param $username
 * @param $password
 */
function checkLoginOrDie($username, $password)
{
  $sql = "SELECT 1
    FROM users 
    WHERE username LIKE \"$username\"
    AND password LIKE PASSWORD(\"$password\")";

  $response = sendRequestDB($sql);
  if ($response->num_rows === 0) {
    error('Mot de passe invalide');
  }
}
