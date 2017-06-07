import * as api from '../../api/rooms';

export const CREATE_ROOM = 'rooms/CREATE_ROOM';
export const CREATE_ROOM_SUCCESS = 'rooms/CREATE_ROOM_SUCCESS';
export const CREATE_ROOM_FAIL = 'rooms/CREATE_ROOM_FAIL';

const defaultState = {
  rooms: [],
  loading: false,
  error: false,
};

export default function roomsReducer(state = defaultState, action) {
  switch (action.type) {
    case CREATE_ROOM:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case CREATE_ROOM_SUCCESS:
      return { ...state,
        error: null,
        loading: false,
        rooms: [...action.payload]
      };
    case CREATE_ROOM_FAIL:
      return { ...state, error: true, loading: false };

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
    promise: api.createRoom(data),
  };
}
