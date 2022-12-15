import axios from "axios";
import numOrEmail from "../../utility/numOrEmail";
import toaster from "../../utility/toaster";
import { DATA_ADD, LOGGED_IN, LOGGED_OUT, REASON_ADD } from "./types";


export const login = (all_data, navigate) => async (dispatch) => {

  const isData = numOrEmail(all_data.auth);
  if (!isData) {
    return toaster("Invalid email or phone number");
  }

  try {
    const { data } = await axios.post('/api/v1/auth/login', all_data);

    if (!data.isVerified) {
      toaster("Please verify your account", "info");
      dispatch(dataAdd(data));
      navigate('/code-check')
      dispatch(resendCode('verify-account'))
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
    dispatch(dataAdd(data));
    
  } catch ({ response }) {
    dispatch(loggedOut());
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

    dispatch(dataAdd(data));
    toaster("Registration successful", "success");
    navigate('/code-check');
    setShow(false);

  } catch (error) {
    toaster(error.response.data.message);
  }
};

export const resendCode = (reason) => async (dispatch, getState) => {

  const { email, mobile } = getState().auth.user;
  const data_is = email ?? mobile;

  try {
    const { data } = await axios.post(`/api/v1/auth/resend-${ email ? 'email' : 'number' }`, {
      data_is,
      reason
    });
    toaster( data, "success");
    dispatch(reasonAdd(reason))

  } catch (error) {
    toaster(error.response.data.message);
  }
};


export const verifyCode = (code, navigate) => async (dispatch, getState) => {

  const { user, reason } = getState().auth;

  try {
    const { data } = await axios.post(`/api/v1/auth/verify-code`, {
      _id: user._id,
      code
    });
    toaster('Code verify successfully', "success" );

    if (reason === 'verify-account') {
      dispatch(loggedIn(data));
      navigate('/');
    }
    if (reason === 'forgot-password') {
      navigate('/reset-password');
    }

  } catch (error) {
    toaster(error.response.data.message);
  }
};
export const findUser = (data, navigate) => async (dispatch) => {
  
  await axios.post('/api/v1/auth/find-user', { data })
    .then(({ data }) => {
      dispatch(dataAdd(data));
      navigate('/user-account');
      
    }).catch(({ response }) => {
      toaster(response.data.message);
    })
}

export const resetPassword = (pass, navigate) => async (dispatch, getState) => {

  const { user, reason } = getState().auth;

  try {
    const { data } = await axios.patch('/api/v1/auth/reset-password', { _id: user._id, pass, reason })
    toaster( 'Password Change Successfully', "success" );
    dispatch(loggedIn(data));
    navigate('/');

  } catch ({ response }) {
    toaster(response.data.message);
  }
}

export const reasonAdd = (payload) => ({
      type: REASON_ADD,
      payload,
})

export const dataAdd = (payload) => ({
      type: DATA_ADD,
      payload,
})

export const loggedIn = (payload) => ({
    type: LOGGED_IN,
    payload
})

export const loggedOut = () => ({
    type: LOGGED_OUT
})
