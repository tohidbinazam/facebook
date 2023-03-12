import axios from 'axios';
import { FIND_FRIEND, FRIEND_REQUEST, PROFILE_FRIEND } from './types';

export const profileFriend = (id) => (dispatch) => {
  axios.get(`/api/v1/user/friend/${id}`).then((res) => {
    dispatch({
      type: PROFILE_FRIEND,
      payload: res.data,
    });
  });
};

export const friendRequest = () => (dispatch, getState) => {
  const { _id } = getState().user;
  axios.get(`/api/v1/user/friend-request/${_id}`).then((res) => {
    dispatch({
      type: FRIEND_REQUEST,
      payload: res.data,
    });
  });
};
export const findFriend = () => (dispatch, getState) => {
  const { _id, follower, following, friend_list } = getState().user;

  const excludedIds = [_id, ...follower, ...following, ...friend_list];
  axios
    .post('/api/v1/user/find-friend', { excludedIds: excludedIds })
    .then((res) => {
      dispatch({
        type: FIND_FRIEND,
        payload: res.data,
      });
    });
};
