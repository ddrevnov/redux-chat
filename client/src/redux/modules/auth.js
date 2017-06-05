export const SIGNUP_USER = 'auth/SIGNUP_USER';
export const SIGNUP_USER_SUCCESS = 'auth/SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAIL = 'auth/SIGNUP_USER_FAIL';

export const SIGNIN_USER = 'auth/SIGNIN_USER';
export const SIGNIN_USER_SUCCESS = 'auth/SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAIL = 'auth/SIGNIN_USER_FAIL';

export const LOGOUT = 'auth/LOGOUT';

const defaultState = {
  isAuth: localStorage.getItem('token') ? true : false,
  loading: false,
  error: false,
};

export default function authReducer(state = defaultState, action) {
  switch (action.type) {
    case SIGNUP_USER:
    case SIGNIN_USER:
      return { ...state, error: null, loading: true, isAuth: false };
    case SIGNUP_USER_SUCCESS:
    case SIGNIN_USER_SUCCESS:
      return { ...state, error: null, loading: false, isAuth: true };
    case SIGNUP_USER_FAIL:
    case SIGNIN_USER_FAIL:
      return { ...state, error: true, loading: false, isAuth: false };
    case LOGOUT:
      return { ...state, isAuth: false };

    default:
      return state;
  }
}

export function signupUser(data) {
  return { type: SIGNUP_USER, payload: data };
}

export function signinUser(data) {
  return { type: SIGNIN_USER, payload: data };
}

export function logoutUser() {
  return { type: LOGOUT };
}
