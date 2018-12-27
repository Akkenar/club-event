export interface IntlKey {
  [key: string]: string;
}

export interface IntlType {
  confirmation: any;
  messages: any;
  information: any;
}

export interface IntlContext {
  language: string;
  messages: IntlKey;
  // TODO add proper type
  handleChangeLanguage?: any;
}
