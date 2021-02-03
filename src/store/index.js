import { combineReducers, createStore } from 'redux';

import pageTitleReducer from './reducers/pageTitle';
import authReducer from './reducers/auth';
import dataCompanyReducer from './reducers/dataCompany';
import dataUserReducer from './reducers/dataUser';
import JwtAuthreducer from './reducers/jwtAuth';
import disablebuttonreducer from './reducers/DisabledButton';
import roleReducer from './reducers/role';
import notificationReducer from './reducers/notification';

const reducers = combineReducers({
  title: pageTitleReducer,
  auth: authReducer,
  company: dataCompanyReducer,
  user: dataUserReducer,
  role: roleReducer,
  notification: notificationReducer,
  jwtAUth: JwtAuthreducer,
  disabledButton: disablebuttonreducer,
});

const store = createStore(
  reducers,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
