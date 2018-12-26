<?php
function readConfig()
{
  $serverName = trim($_SERVER['SERVER_NAME']);
  $basePath = './configuration/';

  // Docker sets the server name to "php" per docker-compose configuration
  if ($serverName === 'php') {
    return parseFile($basePath . 'configuration.ci.properties');
  }

  // Localhost
  if ($serverName === 'localhost') {
    return parseFile($basePath . 'configuration.local.properties');
  }

  // Prod
  return parseFile($basePath . 'configuration.properties');
}

function parseFile($filename)
{
  $value = parse_ini_file($filename);

  if (!$value) {
    http_response_code(500);
    error_log($filename . ' not a valid configuration file', 0);
    die();
  }

  return $value;
}
?>
