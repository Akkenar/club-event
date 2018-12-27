/*
 * Simple store. No need to bother with Redux/Flux with such a simple usecase.
 * */

let simpleState: any = {};

export function setSimpleStore(newState: any) {
  simpleState = { ...simpleState, ...newState };
}

export function getSimpleStore(): any {
  return simpleState;
}
