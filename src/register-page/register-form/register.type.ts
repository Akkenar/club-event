export interface Products {
  breakfast?: number | string;
  camping?: number | string;
  dinner?: number | string;
  itemSize1?: number | string;
  itemSize2?: number | string;
  itemSize3?: number | string;
  itemSize4?: number | string;
  picknick?: number | string;
  sleeping?: number | string;
  vegetarian?: number | string;
  [key: string]: number | string | undefined;
}

export interface Errors {
  [key: string]: boolean;
}

export interface Registration {
  language: string;
  recaptcha: string;
  club: string;
  email: string;
  firstName: string;
  lastName: string;
  locality: string;
  no: string;
  npa: string;
  products: Products;
  sending: boolean;
  street: string;
  errors?: Errors;
}
