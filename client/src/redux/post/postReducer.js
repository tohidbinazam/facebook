import initialState from './initialState';
import {
  UPDATE_COMMENT,
  DELETE_POST,
  GET_DATA,
  SET_COMMENTS,
  SET_FRI_POST,
  SET_MY_POST,
  POST_PHOTOS,
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
    case UPDATE_COMMENT:
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
    case SET_COMMENTS:
      return {
        ...state,
        comments: payload,
        loading: false,
      };
    case POST_PHOTOS:
      return {
        ...state,
        post_photos: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default postReducer;
