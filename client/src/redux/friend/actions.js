import axios from 'axios';
import { FIND_FRIEND, FRIEND_REQUEST, PROFILE_FRIEND } from './types';
import { DATA_UPDATE } from '../profile/type';
import toaster from '../../utility/toaster';

export const profileFriend = (id) => (dispatch) => {
  try {
    axios.get(`/api/v1/user/friend/${id}`).then((res) => {
      dispatch({
        type: PROFILE_FRIEND,
        payload: res.data,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const friendRequest = () => (dispatch, getState) => {
  const { _id } = getState().user;

  try {
    axios.get(`/api/v1/user/friend-request/${_id}`).then((res) => {
      dispatch({
        type: FRIEND_REQUEST,
        payload: res.data,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
export const findFriend = () => (dispatch, getState) => {
  const { _id, follower, following, friend_list, blocked } = getState().user;

  const excludedIds = [
    _id,
    ...follower,
    ...following,
    ...friend_list,
    ...blocked,
  ];
  try {
    axios
      .post('/api/v1/user/find-friend', { excludedIds: excludedIds })
      .then((res) => {
        dispatch({
          type: FIND_FRIEND,
          payload: res.data,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

export const addFriend = (id) => (dispatch, getState) => {
  const { _id } = getState().user;
  try {
    axios.patch(`/api/v1/user/friend/${_id}`, { id }).then((res) => {
      toaster('Request Sent Successfully', 'success');
      dispatch({ type: DATA_UPDATE, payload: res.data });
      dispatch(findFriend());
    });
  } catch (error) {
    console.log(error);
  }
};

export const confirmFriend = (id) => (dispatch, getState) => {
  const { _id } = getState().user;
  try {
    axios.post(`/api/v1/user/friend/${_id}`, { id }).then((res) => {
      toaster('Friend Add Successfully', 'success');
      dispatch({ type: FRIEND_REQUEST, payload: res.data.follower });
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeFriend = (id) => (dispatch, getState) => {
  const { _id } = getState().user;
  try {
    axios.post(`/api/v1/user/remove-friend/${_id}`, { id }).then((res) => {
      toaster('Friend Remove Successfully', 'success');
      dispatch({ type: DATA_UPDATE, payload: res.data });
      dispatch(findFriend());
    });
  } catch (error) {
    console.log(error);
  }
};
