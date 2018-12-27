import { postData } from '../../core/data.lib';
import { Registration } from './register.type';

export function sendData(data: Registration) {
  return postData('/api/register.php', data);
}
