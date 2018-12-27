<?php
require_once 'config.php';

function connectDB()
{
  $config = readConfig();
  $host = $config['db.host'];
  $user = $config['db.user'];
  $password = $config['db.password'];
  $name = $config['db.name'];
  $port = $config['db.port'];

  global $db;
  $db = new mysqli($host, $user, $password, $name, $port);
  $db->query("SET lc_time_names = 'fr_CH';");
  return $db;
}

function disconnectDB()
{
  global $db;
  $db->close();
}

function sendRequestDB($request, $line = __LINE__, $file = __FILE__)
{
  global $db;
  $rep = $db->query($request);
  if (!$rep) {
    http_response_code(500);
    error_log($request, 0);
    die(manageSQLError($line, $file, $db->error, $request));
  }
  return $rep;
}

function fieldNames($result)
{
  return mysqli_fetch_fields($result);
}

function fieldName($result, $field_offset)
{
  $properties = mysqli_fetch_field_direct($result, $field_offset);
  return is_object($properties) ? $properties->name : null;
}

function manageSQLError($line, $file, $error, $request)
{
  echo '<div class="sqlerror"><p>SQL Error at line <b>' .
    $line .
    '</b> in file
        <b>' .
    $file .
    '</b></p><p>' .
    $error .
    '</p><pre>' .
    $request .
    '</pre></div>';
}
?>
