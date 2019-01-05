<?php

// In CHF. Must match what's in the front in prices.js
$prices = array(
  'dinner' => 45,
  'vegetarian' => 45,
  'sleeping' => 15,
  'breakfast' => 10,
  'camping' => 10,
  'picknick' => 10
);

function getTotal($data, $prices)
{
  $products = $data['products'];

  // Food
  $dinner = getTotalForItem($products, $prices, 'dinner');
  $vegetarian = getTotalForItem($products, $prices, 'vegetarian');
  $picknick = getTotalForItem($products, $prices, 'picknick');
  $breakfast = getTotalForItem($products, $prices, 'breakfast');

  // Accommodation
  $camping = getTotalForItem($products, $prices, 'camping');
  $sleeping = getTotalForItem($products, $prices, 'sleeping');

  return $dinner + $vegetarian + $sleeping + $camping + $picknick + $breakfast;
}

function getTotalForItem($data, $prices, $itemName)
{
  if (!array_key_exists($itemName, $data)) {
    return 0;
  }

  return intval($data[$itemName]) * $prices[$itemName];
}
