import { combineReducers, createStore } from 'redux';

import authReducer from './reducers/auth';
import dataUserReducer from './reducers/dataUser';
import JwtAuthreducer from './reducers/jwtAuth';
import roleReducer from './reducers/role';

const reducers = combineReducers({
  auth: authReducer,
  user: dataUserReducer,
  role: roleReducer,
  jwtAUth: JwtAuthreducer,
});

const store = createStore(
  reducers,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
