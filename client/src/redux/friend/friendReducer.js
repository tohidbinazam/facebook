import initialState from './initialState';
import {
  ADD_FRIEND,
  PROFILE_FRIEND,
  CONFIRM_FRIEND,
  FIND_FRIEND,
  FRIEND_REQUEST,
  REMOVE_FRIEND,
} from './types';

const friendReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PROFILE_FRIEND:
      return { ...payload };
    case FRIEND_REQUEST:
      return {
        ...state,
        follower: payload,
      };
    case FIND_FRIEND:
      return {
        ...state,
        find_friend: payload,
      };
    case ADD_FRIEND:
      return {
        ...state,
        follower: payload,
      };
    case CONFIRM_FRIEND:
      return {
        ...state,
        friend_list: payload,
      };
    case REMOVE_FRIEND:
      return {
        ...state,
        following: payload,
      };
    default:
      return state;
  }
};

export default friendReducer;
