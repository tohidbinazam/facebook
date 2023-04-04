import axios from 'axios';
import {
  SET_MY_POST,
  GET_DATA,
  SET_FRI_POST,
  SET_COMMENT,
  ADD_MY_POST,
  DELETE_POST,
  ADD_POST_LIKE,
} from './type';

import toaster from '../../utility/toaster';

const sentRequest = () => ({
  type: GET_DATA,
});

// compleat
export const createPost = (id, data) => async (dispatch) => {
  try {
    dispatch(sentRequest());
    const res = await axios.post(`/api/v1/post/${id}`, data);
    dispatch({
      type: SET_MY_POST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// complete
export const getMyPost = (id) => async (dispatch) => {
  try {
    dispatch(sentRequest());
    const res = await axios.get(`/api/v1/post/${id}`);
    dispatch({
      type: SET_MY_POST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const editPost = () => async (dispatch) => {
  try {
    const res = await axios.patch('/api/v1/post/me');
    dispatch({
      type: ADD_MY_POST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete('/api/v1/post/me').then((res) => {
      toaster(res.data, 'success');
      dispatch({
        type: DELETE_POST,
        payload: postId,
      });
    });
  } catch (err) {
    console.log(err);
  }
};

// complete
export const getFriendPost = (id) => async (dispatch) => {
  try {
    dispatch(sentRequest());
    const res = await axios.get(`/api/v1/post/all/${id}`);
    dispatch({
      type: SET_FRI_POST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addPostLike = () => async (dispatch, getState) => {
  const post = getState().post.my_post;
  try {
    const res = await axios.post('/api/v1/post/me');
    const index = post.findIndex((post) => post._id === res.data._id);
    post[index] = res.data;
    dispatch({
      type: ADD_POST_LIKE,
      payload: post,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getComment = () => async (dispatch) => {
  try {
    dispatch(sentRequest());
    const res = await axios.get('/api/v1/post/me');
    dispatch({
      type: SET_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const postComment = () => async (dispatch) => {
  try {
    const res = await axios.post('/api/v1/post/me');
    dispatch({
      type: SET_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
