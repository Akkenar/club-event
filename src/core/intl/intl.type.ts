export interface IntlKey {
  [key: string]: string;
}

export interface IntlType {
  confirmation: string;
  messages: IntlKey;
  information: string;
}

export interface IntlContext {
  language: string;
  messages: IntlKey;
  handleChangeLanguage: (language: string) => void;
}
