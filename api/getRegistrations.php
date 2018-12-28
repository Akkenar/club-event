<?php

include_once './core/error.php';

session_start();

if ($_SESSION['group'] !== 'admin') {
  error('Not authorized for group=' . $_SESSION['group'], 'unauthorized');
}

$results = [];
echo json_encode($results);
