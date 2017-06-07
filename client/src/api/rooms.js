import request from './apiClient';

export function createRoom(data) {
  return request.post(`/api/rooms`, data)
    .then(result => result.data);
}
