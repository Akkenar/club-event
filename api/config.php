<?php
function readConfig()
{
  $serverName = trim($_SERVER['SERVER_NAME']);

  // Docker sets the server name to "php" per docker-compose configuration
  if ($serverName === 'localhost' || $serverName === 'php') {
    return parse_ini_file('./credentials.local.properties');
  }

  return parse_ini_file('./credentials.properties');
}
?>
