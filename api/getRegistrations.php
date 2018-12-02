<?php
include_once './database.php';
include_once './csv.php';
include_once './password.php';

protectWithPassword();

$db = connectDb();

$sql = 'SELECT * FROM inscriptions';
$records = sendRequestDB($sql);
$header = getHeaderLineFromQuery($records);
$data = getBodyLinesFromQuery($records);

disconnectDB();

header("Content-type: application/octet-stream");
header(
  "Content-Disposition: attachment; filename=inscriptions-ad-sss-2018.xls"
);
header("Pragma: no-cache");
header("Expires: 0");
print "$header\n$data";
?>
