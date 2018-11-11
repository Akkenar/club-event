/*
 * Simple store. No need to bother with Redux/Flux with such a simple usecase.
 * */

let simpleState = {};

export function setSimpleStore(newState) {
  simpleState = Object.assign({}, simpleState, newState);
}

export function getSimpleStore() {
  return simpleState;
}
