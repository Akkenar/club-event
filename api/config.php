<?php
function readConfig()
{
  $serverName = trim($_SERVER['SERVER_NAME']);

  // Docker sets the server name to "php" per docker-compose configuration
  if ($serverName === 'php') {
    return parse_ini_file('./credentials.ci.properties');
  }

  // Localhost
  if ($serverName === 'localhost') {
    return parse_ini_file('./credentials.local.properties');
  }

  // Prod
  return parse_ini_file('./credentials.properties');
}
?>
