// tslint:disable object-literal-sort-keys
const toDateTimeOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false,
  timeZone: 'Europe/Paris',
};

const DEFAULT_LOCALE = 'fr-CH';

export function formatDate(date: string | undefined): string {
  if (!date || typeof Intl === 'undefined') {
    return date || '';
  }

  try {
    return Intl.DateTimeFormat(DEFAULT_LOCALE, toDateTimeOptions).format(
      new Date(date)
    );
  } catch (e) {
    return date;
  }
}
