import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import reducers from './modules';
import apiMiddleware from './middleware/api';
import sagas from './sagas';

export const history = createHistory();
const middlewareRouter = routerMiddleware(history);

const create = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [
    middlewareRouter,
    apiMiddleware,
    sagaMiddleware
  ];

  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware)),
  );

  sagaMiddleware.run(sagas);

  return store;
};

export default create();
