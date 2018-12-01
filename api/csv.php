<?php

$value_separator = "\t";
$line_separator = "\n";

function getHeaderLineFromQuery($records)
{
  $header = '';
  global $value_separator;

  $fields = fieldNames($records);
  for ($i = 0; $i < count($fields); $i++) {
    $header .= fieldName($records, $i) . $value_separator;
  }

  return $header;
}

function getBodyLinesFromQuery($records)
{
  $data = '';
  global $value_separator;
  global $line_separator;

  foreach ($records->fetch_all() as $row) {
    $line = '';
    foreach ($row as $value) {
      if (!isset($value) || $value == "") {
        $value = $value_separator;
      } else {
        $value = str_replace('"', '""', $value);
        $value = '"' . $value . '"' . $value_separator;
      }
      $line .= $value;
    }
    $data .= trim($line) . $line_separator;
  }
  return str_replace("\r", "", $data);
}
