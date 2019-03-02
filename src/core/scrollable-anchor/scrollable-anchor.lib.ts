const CHAR_TO_REPLACE = new RegExp('[^a-zA-Z0-9-]', 'g');

export function normalizeTitle(title: string): string {
  if (!title) {
    return '';
  }

  return title.toLocaleLowerCase().replace(CHAR_TO_REPLACE, '_');
}
