function getKey(key: string, messages: any): string {
  if (!messages) {
    return key;
  }

  return messages[key] || key;
}

export default getKey;
