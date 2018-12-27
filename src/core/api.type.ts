export enum Results {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ApiResponse {
  result?: Results;
  message?: string;
}
