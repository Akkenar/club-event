<?php
include_once './database.php';

function protectWithPassword()
{
  $realm = 'Restricted area';

  if (empty($_SERVER['PHP_AUTH_DIGEST'])) {
    header('HTTP/1.1 401 Unauthorized');
    header(
      'WWW-Authenticate: Digest realm="' .
        $realm .
        '",qop="auth",nonce="' .
        uniqid() .
        '",opaque="' .
        md5($realm) .
        '"'
    );

    die('Aborted');
  }

  $data = parseHttpAuthHeader($_SERVER['PHP_AUTH_DIGEST']);

  if ($data['response'] != getValidResponse($data['username'], $realm, $data)) {
    die('Wrong Credentials!');
  }
}

function getHash($username)
{
  $db = connectDb();

  $safeUsername = $db->real_escape_string($username);
  $sql = "SELECT password FROM users WHERE username = \"$safeUsername\"";
  $records = sendRequestDB($sql);
  disconnectDB();

  if ($records->num_rows > 0) {
    $row = $records->fetch_array();
    return md5($row["password"]);
  } else {
    die('Wrong Credentials!');
  }
}

function getValidResponse($username, $realm, $data)
{
  // generate the valid response
  $A1 = md5($username . ':' . $realm . ':' . getHash($username));
  $A2 = md5($_SERVER['REQUEST_METHOD'] . ':' . $data['uri']);
  return md5(
    $A1 .
      ':' .
      $data['nonce'] .
      ':' .
      $data['nc'] .
      ':' .
      $data['cnonce'] .
      ':' .
      $data['qop'] .
      ':' .
      $A2
  );
}

function parseHttpAuthHeader($txt)
{
  // protect against missing data
  $needed_parts = array(
    'nonce' => 1,
    'nc' => 1,
    'cnonce' => 1,
    'qop' => 1,
    'username' => 1,
    'uri' => 1,
    'response' => 1
  );
  $data = array();
  $keys = implode('|', array_keys($needed_parts));

  preg_match_all(
    '@(' . $keys . ')=(?:([\'"])([^\2]+?)\2|([^\s,]+))@',
    $txt,
    $matches,
    PREG_SET_ORDER
  );

  foreach ($matches as $m) {
    $data[$m[1]] = $m[3] ? $m[3] : $m[4];
    unset($needed_parts[$m[1]]);
  }

  return $needed_parts ? false : $data;
}
