import * as api from '../../api/rooms';

export const CREATE_ROOM = 'rooms/CREATE_ROOM';
export const CREATE_ROOM_SUCCESS = 'rooms/CREATE_ROOM_SUCCESS';
export const CREATE_ROOM_FAIL = 'rooms/CREATE_ROOM_FAIL';

export const FETCH_ROOMS = 'rooms/FETCH_ROOMS';
export const FETCH_ROOMS_SUCCESS = 'rooms/FETCH_ROOMS_SUCCESS';
export const FETCH_ROOMS_FAIL = 'rooms/FETCH_ROOMS_FAIL';

export const SELECT_ROOM = 'rooms/SELECT_ROOM';

const defaultState = {
  rooms: [],
  offset: 0,
  limit: 10,
  total: 0,
  room: {},
  loading: false,
  error: false,
};

export default function roomsReducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_ROOMS_SUCCESS:
      return {
        ...state,
        offset: state.offset + 10,
        total: action.payload.total,
        error: null,
        loading: false,
        rooms: [...state.rooms, ...action.payload.docs],
      };
    case CREATE_ROOM:
    case FETCH_ROOMS:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case CREATE_ROOM_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        rooms: [...state.rooms, action.payload]
      };
    case CREATE_ROOM_FAIL:
    case FETCH_ROOMS_FAIL:
      return { ...state, error: true, loading: false };

    case SELECT_ROOM:
      return { ...state, room: action.room };

    default:
      return state;
  }
}

export function createRoom(data) {
  return {
    types: [
      CREATE_ROOM,
      CREATE_ROOM_SUCCESS,
      CREATE_ROOM_FAIL,
    ],
    promise: api.createRoom({ name: data }),
  };
}

export function fetchRooms(offset, limit) {
  return { type: FETCH_ROOMS, offset, limit };
}

export function selectRoom(room) {
  return {
    type: SELECT_ROOM,
    room
  };
}
