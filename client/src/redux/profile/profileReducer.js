import initialState from './initialState';
import { DATA_UPDATE } from './type';

const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DATA_UPDATE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
