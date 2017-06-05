import request from './apiClient';

export function signUp(data) {
  return request.post(`/api/users/signup`, data)
    .then(result => result.data);
}

export function signIn(data) {
  return request.post(`/api/users/login`, data)
    .then(result => result.data);
}