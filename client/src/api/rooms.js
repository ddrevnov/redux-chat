import request from './apiClient';

export function createRoom(data) {
  return request.post(`/api/rooms`, data);
}

export function fetchRooms(offset, limit) {
  return request.get(`/api/rooms?offset=${offset}&limit=${limit}`);
}
