import initialState from './initialState';
import {
  ADD_POST_LIKE,
  DELETE_POST,
  GET_DATA,
  SET_COMMENT,
  SET_FRI_POST,
  SET_MY_POST,
} from './type';

const postReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_MY_POST:
      return {
        ...state,
        my_post: payload,
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        my_post: state.my_post.filter((post) => post._id !== payload),
      };
    case ADD_POST_LIKE:
      return {
        ...state,
        my_post: payload,
      };
    case SET_FRI_POST:
      return {
        ...state,
        friends_post: payload,
        loading: false,
      };
    case SET_COMMENT:
      return {
        ...state,
        comment: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default postReducer;
