import axios from "axios";
import numOrEmail from "../../utility/numOrEmail";
import toaster from "../../utility/toaster";
import { DATA_ADD, LOGGED_IN, LOGGED_OUT } from "./types";


export const login = (all_data, navigate) => async (dispatch) => {

  const isData = numOrEmail(all_data.auth);
  if (!isData) {
    return toaster("Invalid email or phone number");
  }

  try {
    const { data } = await axios.post('/api/v1/auth/login', all_data);

    if (!data.isVerified) {
      toaster("Please verify your account", "info");
      dispatch({
        type: DATA_ADD,
        payload: data,
      });
      dispatch(resendCode())
      navigate('/code-check')
      return
    }
    toaster("Login successful", "success");
    dispatch(loggedIn(data));

  } catch (error) {
    toaster(error.response.data.message);
  }
}

export const isLoggedIn = (token) => async (dispatch) => {
    
  try {  
    
    const { data } = await axios.get('/api/v1/auth/me', {
      headers : {
        authorization : token
      }
    });
    dispatch({
      type: DATA_ADD,
      payload: data,
    });
    
  } catch ({ response }) {
    // toaster(response.data.message);
  }    
    
}

export const register = (all_data, setShow, navigate) => async (dispatch) => {

  const isData = numOrEmail(all_data.auth);
  if (!isData) {
    return toaster("Invalid email or phone number");
  }

  try {
    const { data } = await axios.post(`/api/v1/auth/register-${isData}`, all_data);

    dispatch({
      type: DATA_ADD,
      payload: data,
    });
    toaster("Registration successful", "success");
    navigate('/code-check');
    setShow(false);

  } catch (error) {
    toaster(error.response.data.message);
  }
};

export const resendCode = () => async (dispatch, getState) => {

  const { email, mobile } = getState().auth.user;
  const data_is = email ?? mobile;

  try {
    const { data } = await axios.post(`/api/v1/auth/resend-${ email ? 'email' : 'number' }`, {
      data_is
    });
    toaster( data, "success");

  } catch (error) {
    toaster(error.response.data.message);
  }
};


export const verifyCode = (code, navigate) => async (dispatch, getState) => {

  const { _id } = getState().auth.user;

  try {
    const { data } = await axios.post(`/api/v1/auth/verify-code`, {
      _id,
      code
    });
    toaster('Code verify successfully', "success" );
    dispatch(loggedIn(data));
    navigate('/');

  } catch (error) {
    toaster(error.response.data.message);
  }
};


export const loggedIn = (payload) => ({
    type: LOGGED_IN,
    payload
})

export const loggedOut = () => ({
    type: LOGGED_OUT
})
