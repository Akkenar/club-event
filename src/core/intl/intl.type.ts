export interface IntlKey {
  [key: string]: string;
}

export interface IntlType {
  confirmation: string;
  messages: IntlKey;
  information: string;
  // Could be null or undefined when the page initially loads.
  // When the application starts, no language is loaded. This might be an issue
  // because it delays the initial rendering by the time it takes to fetch and
  // load the language bundle.
  language?: string;
}
