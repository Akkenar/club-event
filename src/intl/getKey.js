function getKey(key, props) {
  if (!props) {
    return key;
  }
  const { messages } = props.intl;

  if (!messages) {
    return key;
  }

  return messages[key] || key;
}

export default getKey;
