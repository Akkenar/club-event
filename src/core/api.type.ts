export enum Results {
  SUCCESS = 'success',
  ERROR = 'error',
  UNAUTHORIZED = 'unauthorized',
}

export interface ApiResponse {
  result?: Results;
  message?: string;
}
