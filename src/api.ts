import environment from './environment/environment';

export function getApi(): any {
  // Depending on whether the file is replaced by Webpack, the api URLs
  // will change based on the type of build. See `environment.ts` and
  // `environment.prod.ts` for more details.
  return environment.api;
}
