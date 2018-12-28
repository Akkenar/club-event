import { getApi } from '../api';
import { getData } from '../core/data.lib';
import { Registration } from '../register-page/register.type';

export function getRegistrations(): Promise<Registration[]> {
  return getData<Registration[]>(getApi().registrations);
}
