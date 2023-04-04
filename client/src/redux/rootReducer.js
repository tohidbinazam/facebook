import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import friendReducer from './friend/friendReducer';
import loadReducer from './loading/loadReducer';
import profileReducer from './profile/profileReducer';
import postReducer from './post/postReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  progress: loadReducer,
  user: profileReducer,
  friend: friendReducer,
  post: postReducer,
});

export default rootReducer;
