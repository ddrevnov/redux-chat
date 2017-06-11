import * as api from '../../api/messages';

export const CREATE_MESSAGE = 'messages/CREATE_MESSAGE';
export const CREATE_MESSAGE_SUCCESS = 'messages/CREATE_MESSAGE_SUCCESS';
export const CREATE_MESSAGE_FAIL = 'messages/CREATE_MESSAGE_FAIL';
export const FETCH_MESSAGES = 'messages/FETCH_MESSAGES';
export const FETCH_MESSAGES_SUCCESS = 'messages/FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAIL = 'messages/FETCH_MESSAGES_FAIL';

const defaultState = {
  messages: [],
  loading: false,
  error: false,
};

export default function messagesReducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        messages: action.result,
      };
    case CREATE_MESSAGE:
    case FETCH_MESSAGES:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        messages: [...state.messages, action.result]
      };
    case CREATE_MESSAGE_FAIL:
    case FETCH_MESSAGES_FAIL:
      return { ...state, error: true, loading: false };

    default:
      return state;
  }
}

export function createMessage(data) {
  return {
    types: [
      CREATE_MESSAGE,
      CREATE_MESSAGE_SUCCESS,
      CREATE_MESSAGE_FAIL,
    ],
    promise: api.createMessage(data),
  };
}

export function fetchMessagesByRoomId(id) {
  return {
    types: [
      FETCH_MESSAGES,
      FETCH_MESSAGES_SUCCESS,
      FETCH_MESSAGES_FAIL,
    ],
    promise: api.fetchMessagesByRoomId(id),
  };
}
