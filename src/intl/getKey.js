function getKey(key, messages) {
  if (!messages) {
    return key;
  }

  return messages[key] || key;
}

export default getKey;
