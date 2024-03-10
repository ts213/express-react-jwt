import { $api } from '../http';
import { AxiosResponse } from 'axios';
import { UserT } from '../types/UserT';

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<UserT[]>> {
    return $api.get<UserT[]>('/users');
  }
}
