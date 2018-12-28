<?php
/**
 * @param $message
 */
function error($message, $type = 'error')
{
  http_response_code(500);
  error_log($message, 0);
  $result = [];
  $result['result'] = $type;
  $result['message'] = $message;
  echo json_encode($result);
  exit();
}
