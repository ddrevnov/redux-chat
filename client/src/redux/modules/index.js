import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import rooms from './rooms';

export default combineReducers({
  router: routerReducer,
  form: formReducer,
  auth,
  rooms,
});