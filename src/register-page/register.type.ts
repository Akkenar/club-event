import { ApiResponse } from '../core/api.type';

export interface Products {
  breakfast?: number | string;
  camping?: number | string;
  dinner?: number | string;
  dinnerKid?: number | string;
  picknick?: number | string;
  sleeping?: number | string;
  vegetarian?: number | string;
  vegetarianKid?: number | string;
  [key: string]: number | string | undefined;
}

export interface Errors {
  [key: string]: boolean;
}

export interface Registration {
  id?: string;
  reference?: string;
  date?: string;
  total?: number;
  language?: string;
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

export interface RegistrationResult extends ApiResponse {
  total: number;
  reference: string;
}
