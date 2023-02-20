import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import loadReducer from './loading/loadReducer';
import profileReducer from './profile/profileReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  progress: loadReducer,
  user: profileReducer,
});

export default rootReducer;
