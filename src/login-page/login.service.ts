import { ApiResponse } from '../core/api.type';
import { postData } from '../core/data.lib';
import { Credentials } from './login.type';

export function login(credentials: Credentials): Promise<ApiResponse> {
  return postData<ApiResponse>('/api/login.php', credentials);
}
