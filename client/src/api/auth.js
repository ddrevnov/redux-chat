import request from './apiClient';

export function signUp(data) {
  return request.post(`/api/users/signup`, data);
}