import { signUp } from '../../api/auth';

export const AUTH_USER = 'users/AUTH_USER';
export const AUTH_USER_SUCCESS = 'users/AUTH_USER_SUCCESS';
export const AUTH_USER_FAIL = 'users/AUTH_USER_FAIL';
export const UNAUTH_USER = 'users/UNAUTH_USER';

const defaultState = {
  isAuth: false,
  loading: false,
  error: null,
};

export default function authReducer(state = defaultState, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: null, loading: true, isAuth: true };
    case AUTH_USER_SUCCESS:
      return { ...state, error: null, loading: false, isAuth: true };
    case AUTH_USER_FAIL:
      return { ...state, error: action.message, loading: false, isAuth: false };
    case UNAUTH_USER:
      return { ...state, isAuth: false };

    default:
      return state;
  }
}

export function signupUser(data) {
  return {
    types: [
      AUTH_USER,
      AUTH_USER_SUCCESS,
      AUTH_USER_FAIL,
    ],
    promise: signUp(data),
  };
}
