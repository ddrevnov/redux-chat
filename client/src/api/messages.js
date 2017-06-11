import request from './apiClient';

export function createMessage(data) {
  return request.post(`/api/messages`, data);
}

export function fetchMessagesByRoomId(id) {
  return request.get(`/api/messages/room/${id}`);
}
