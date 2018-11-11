<?php
function readConfig()
{
  $serverName = $_SERVER['SERVER_NAME'];
  if ($serverName === 'localhost') {
    return parse_ini_file('./credentials.local.properties');
  }

  return parse_ini_file('./credentials.properties');
}
?>
