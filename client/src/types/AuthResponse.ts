import { UserT } from './UserT';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserT;
}
