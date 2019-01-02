/*
 * Simple store. No need to bother with Redux/Flux with such a simple usecase.
 * */

import { Registration } from '../register-page/register.type';

let registration: Registration | null = null;

export function setSimpleStore(newRegistration: Registration) {
  registration = newRegistration ? { ...newRegistration } : null;
}

export function getSimpleStore(): Registration | null {
  return registration;
}
