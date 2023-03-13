import initialState from './initialState';
import { DATA_UPDATE, LOGOUT } from './type';

const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DATA_UPDATE:
      return {
        ...state,
        ...payload,
      };
    case LOGOUT:
      return null;
    default:
      return state;
  }
};

export default profileReducer;
