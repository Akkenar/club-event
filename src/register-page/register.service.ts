import { postData } from '../core/data.lib';
import { Registration, RegistrationResult } from './register.type';

export function sendData(data: Registration): Promise<RegistrationResult> {
  return postData<RegistrationResult>('/api/register.php', data);
}
