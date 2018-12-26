<?php
error_reporting(0);
openlog('Register', LOG_CONS | LOG_NDELAY | LOG_PID, LOG_USER | LOG_PERROR);
require_once './lib/recaptcha-1.2.1/src/autoload.php';
include_once './database.php';
include_once './email.php';
require_once './config.php';

// In CHF. Must match what's in the front in prices.js
$prices = array(
  'dinner' => 45,
  'vegetarian' => 45,
  'sleeping' => 15,
  'breakfast' => 10,
  'camping' => 10,
  'picknick' => 10
);

// We need the Db asap.
$db = connectDb();

// Data from the post.
$DATA = json_decode(file_get_contents('php://input'), true);
$email = $DATA['email'];
$language = $DATA['language'];

// This will break if the captcha isn't valid.
validateCaptcha($DATA['recaptcha']);

// Compute the total based on the prices
$total = getTotal($DATA, $prices);

// Generate a reference number based on the last name to ease payment reconciliation
$reference = getUniqId($DATA['lastName']);

// Save the data
saveData($db, $DATA, $reference, $total);
syslog(LOG_INFO, "Data saved for " . $reference);

// At this stage we don't need the Db anymore
disconnectDB();

// Confirm the registration to the user
sendEmail($email, $total, $reference, $language, $DATA);
syslog(LOG_INFO, "Email send for " . $reference);

// Success!
echo '{"result": "success", "reference": "' .
  $reference .
  '", "total": "' .
  $total .
  '", "email": "' .
  $email .
  '"}';

syslog(LOG_INFO, "Registration successful for " . $reference);
closelog();

function validateCaptcha($recaptchaResponse)
{
  $config = readConfig();
  if ($config['recaptcha.ignore'] && $recaptchaResponse === 'no-captcha') {
    syslog(LOG_INFO, "Ignoring captcha");
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

function getTotal($data, $prices)
{
  $dinner = getTotalForItem($data, $prices, 'dinner');
  $vegetarian = getTotalForItem($data, $prices, 'vegetarian');
  $sleeping = getTotalForItem($data, $prices, 'sleeping');
  $camping = getTotalForItem($data, $prices, 'camping');
  $picknick = getTotalForItem($data, $prices, 'picknick');
  $breakfast = getTotalForItem($data, $prices, 'breakfast');

  return $dinner + $vegetarian + $sleeping + $camping + $picknick + $breakfast;
}

function getTotalForItem($data, $prices, $itemName)
{
  return intval($data[$itemName]) * $prices[$itemName];
}

function saveData($db, $data, $reference, $total)
{
  $firstName = $db->real_escape_string($data['firstName']);
  $lastName = $db->real_escape_string($data['lastName']);
  $club = $db->real_escape_string($data['club']);
  $email = $db->real_escape_string($data['email']);
  $street = $db->real_escape_string($data['street']);
  $no = $db->real_escape_string($data['no']);
  $npa = $db->real_escape_string($data['npa']);
  $locality = $db->real_escape_string($data['locality']);
  $dinner = $db->real_escape_string($data['dinner']);
  $vegetarian = $db->real_escape_string($data['vegetarian']);
  $sleeping = $db->real_escape_string($data['sleeping']);
  $camping = $db->real_escape_string($data['camping']);
  $picknick = $db->real_escape_string($data['picknick']);
  $breakfast = $db->real_escape_string($data['breakfast']);

  $sql = "INSERT INTO inscriptions (
    reference,
    total,
    firstName,
    lastName,
    club,
    email,
    street,
    no,
    npa,
    locality,
    dinner,
    vegetarian,
    sleeping,
    camping,
    picknick,
    breakfast
  ) VALUES(
    \"$reference\",
    \"$total\",
    \"$firstName\",
    \"$lastName\",
    \"$club\",
    \"$email\",
    \"$street\",
    \"$no\",
    \"$npa\",
    \"$locality\",
    \"$dinner\",
    \"$vegetarian\",
    \"$sleeping\",
    \"$camping\",
    \"$picknick\",
    \"$breakfast\"
  )";
  sendRequestDB($sql);
}

function getUniqId($lastName)
{
  $prefix = substr($lastName, 0, 3);
  $id = substr(uniqid(), 0, 7);
  return strtoupper($prefix . '-' . $id);
}
?>
