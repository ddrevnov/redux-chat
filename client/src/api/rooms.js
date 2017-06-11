import request from './apiClient';

export function createRoom(data) {
  return request.post(`/api/rooms`, data);
}

export function fetchRooms() {
  return request.get(`/api/rooms`);
}
