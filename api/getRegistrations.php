<?php

include_once './core/error.php';
include_once './core/database.php';

// Critical.
exitIfNotAuthorized();

// Let the frontend deal with the format.
echo json_encode(getAllRegistration());
exit();

function exitIfNotAuthorized()
{
  session_start();

  if ($_SESSION['group'] !== 'admin') {
    error('Not authorized for group=' . $_SESSION['group'], 'unauthorized');
  }
}

function getAllRegistration()
{
  connectDb();

  $sql = "SELECT * from inscriptions";
  $response = sendRequestDB($sql);

  $data = array();
  while (($row = $response->fetch_assoc())) {
    // To avoid the nesting of JSON (a json as a string in a JSON)
    $row['products'] = json_decode($row['products']);
    $data[] = $row;
  }

  // Cleanup before leaving
  disconnectDB();
  return $data;
}
