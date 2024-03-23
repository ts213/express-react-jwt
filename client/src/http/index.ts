import axios from 'axios';
import { AuthResponse } from '../types/AuthResponse';
import { userStore } from '../store/userStore';

export const API_URL = 'http://localhost:8000/api';

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    if (error.response.status === 401) {
      try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
        localStorage.setItem('token', response.data.accessToken);
        return $api.request(error.config);
      } catch (e) {
        userStore.logout();
        throw e;
      }
    }
  }
);
