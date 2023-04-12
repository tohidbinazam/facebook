import axios from 'axios';
import {
  SET_MY_POST,
  GET_DATA,
  SET_FRI_POST,
  ADD_MY_POST,
  DELETE_POST,
  // UPDATE_COMMENT,
  SET_COMMENTS,
  POST_PHOTOS,
  SINGLE_POST,
} from './type';

import toaster from '../../utility/toaster';
import replaceData from '../../utility/replaceData/replaceData';

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

// complete
export const getSinglePost = (postId) => async (dispatch) => {
  try {
    dispatch(sentRequest());
    const res = await axios.get(`/api/v1/post/single/${postId}`);
    dispatch({
      type: SINGLE_POST,
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

// complete
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/post/single/${postId}`).then((res) => {
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

// complete
export const addRemoveLike =
  (postId, userId, method) => async (dispatch, getState) => {
    try {
      const { my_post, friends_post } = getState().post;
      const res = await axios({
        method: method,
        url: `/api/v1/post/like/${postId}`,
        data: { userId },
      });
      if (userId === res.data.userId._id) {
        const data = replaceData(my_post, res.data);
        dispatch({
          type: SET_MY_POST,
          payload: data,
        });
      } else {
        const data = replaceData(friends_post, res.data);
        dispatch({
          type: SET_FRI_POST,
          payload: data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

// complete
export const addCommentLike = (postId, data) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/v1/post/comment/like/${postId}`, data);
    dispatch({
      type: SET_COMMENTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// complete
export const removeCommentLike = (postId, data) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/v1/post/comment/like/${postId}`, data);
    dispatch({
      type: SET_COMMENTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// complete
export const getComment = (id) => async (dispatch) => {
  try {
    dispatch(sentRequest());
    const res = await axios.get(`/api/v1/post/comment/${id}`);
    dispatch({
      type: SET_COMMENTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// complete
export const postComment = (id, comment) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/v1/post/comment/${id}`, comment);
    dispatch({
      type: SET_COMMENTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// complete
export const postPhotos = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/post/photos/${userId}`);
    dispatch({
      type: POST_PHOTOS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
