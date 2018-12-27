<?php
error_reporting(0);
openlog('Register', LOG_CONS | LOG_NDELAY | LOG_PID, LOG_USER | LOG_PERROR);

include_once './database.php';
include_once './email.php';
include_once './products.php';
include_once './captcha.php';

syslog(LOG_INFO, 'Registering an event');

// We need the Db asap.
$db = connectDb();
syslog(LOG_INFO, 'Db connected');

// Data from the post.
$DATA = json_decode(file_get_contents('php://input'), true);
$email = $DATA['email'];
$language = $DATA['language'];
syslog(LOG_INFO, 'Language: ' . $language);

// This will break if the captcha isn't valid.
validateCaptcha($DATA['recaptcha']);
syslog(LOG_INFO, 'captcha validated');

// Compute the total based on the prices
$total = getTotal($DATA, $prices);
syslog(LOG_INFO, 'Total: ' . $total);

// Generate a reference number based on the last name to ease payment reconciliation
$reference = getUniqId($DATA['lastName']);
syslog(LOG_INFO, 'Reference: ' . $reference);

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
  $products = $db->real_escape_string(json_encode($data['products']));

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
    products
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
    \"$products\"
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
