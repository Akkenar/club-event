<?php
require_once './config.php';

function connectDB()
{
  $config = readConfig();
  $host = $config['db.host'];
  $user = $config['db.user'];
  $password = $config['db.password'];
  $name = $config['db.name'];

  global $db;
  $db = new mysqli($host, $user, $password, $name, 3306);
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
    die(manageSQLError($line, $file, $db->error, $request));
  }
  return $rep;
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
