<?php

// In CHF. Must match what's in the front in prices.js
$prices = array(
  'dinner' => 45,
  'vegetarian' => 45,
  'dinnerKid' => 20,
  'vegetarianKid' => 20,
  'sleeping' => 15,
  'breakfast' => 10,
  'camping' => 10,
  'picknick' => 0,
);

function getTotal($data)
{
  $products = $data['products'];

  // Food
  $dinner = getTotalForItem($products, 'dinner');
  $vegetarian = getTotalForItem($products, 'vegetarian');
  $dinnerKid = getTotalForItem($products, 'dinnerKid');
  $vegetarianKid = getTotalForItem($products, 'vegetarianKid');
  $picknick = getTotalForItem($products, 'picknick');
  $breakfast = getTotalForItem($products, 'breakfast');

  // Accommodation
  $camping = getTotalForItem($products, 'camping');
  $sleeping = getTotalForItem($products, 'sleeping');

  return $dinner +
    $vegetarian +
    $dinnerKid +
    $vegetarianKid +
    $sleeping +
    $camping +
    $picknick +
    $breakfast;
}

function getTotalForItem($data, $itemName)
{
  if (!array_key_exists($itemName, $data)) {
    return 0;
  }

  return intval($data[$itemName]) * getPriceFor($itemName);
}

/**
 * @param $itemName
 *
 * @return mixed
 */
function getPriceFor($itemName)
{
  global $prices;
  return $prices[$itemName];
}
