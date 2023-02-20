import axios from 'axios';
import toaster from '../../utility/toaster';
import { DATA_UPDATE } from './type';

export const updateData = (payload) => ({
  type: DATA_UPDATE,
  payload,
});

export const updateProfile = (id, data) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/v1/user/${id}`, data);
    dispatch(updateData(res.data));
    toaster('Profile updated', 'success');
  } catch (err) {
    console.log(err);
  }
};

export const addFeatured = (data) => async (dispatch, getState) => {
  const id = getState().user._id;

  try {
    const res = await axios.post(`/api/v1/user/featured/${id}`, data);
    dispatch(updateData(res.data));
    toaster('Featured Add Successfully', 'success');
  } catch (err) {
    console.log(err);
  }
};
