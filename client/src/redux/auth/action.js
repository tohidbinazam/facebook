import axios from "axios";
import Cookies from "js-cookie";
import numOrEmail from "../../utility/numOrEmail";
import toaster from "../../utility/toaster";
import { loadStart } from "../loading/action";
import { DATA_ADD, LOGGED_IN, LOGGED_OUT, REASON_ADD } from "./types";


// Add reason to redux store
export const reasonAdd = (payload) => ({
      type: REASON_ADD,
      payload,
})

// Add data to redux store
export const dataAdd = (payload) => ({
      type: DATA_ADD,
      payload,
})

// Add loggedIn user data to redux store
export const loggedIn = (payload) => ({
    type: LOGGED_IN,
    payload
})

// Set loggedOut in redux store
export const loggedOut = () => ({
    type: LOGGED_OUT
})

// User login
// If login user is not verified then sent to code check page
export const login = (all_data, navigate) => async (dispatch) => {

  const isData = numOrEmail(all_data.auth);
  if (!isData) {
    return toaster("Invalid email or phone number");
  }

  try {
    dispatch(loadStart())
    const { data } = await axios.post('/api/v1/auth/login', all_data);

    if (!data.isVerified) {
      dispatch(dataAdd({ ...data, reason: 'verify-account' }));
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

// Check token data and sent to redux store
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

// New user registration
export const register = (all_data, setShow, navigate) => async (dispatch) => {

  const isData = numOrEmail(all_data.auth);
  if (!isData) {
    return toaster("Invalid email or phone number");
  }

  try {
    const { data } = await axios.post(`/api/v1/auth/register/${isData}`, all_data);

    dispatch(dataAdd(data));
    toaster("Registration successful", "success");
    navigate('/code-check');
    setShow(false);

  } catch (error) {
    toaster(error.response.data.message);
  }
};

// Sent and Resend verification code in mobile or email(with verification link) for account verification, forgot password etc
export const resendCode = (reason) => async (dispatch, getState) => {

  const { email, mobile } = getState().auth.user;
  const auth = email ?? mobile;

  try {
    const { data } = await axios.post(`/api/v1/auth/resend/${ email ? 'email' : 'mobile' }`, {
      auth,
      reason
    });
    toaster( data, "success");

  } catch (error) {
    toaster(error.response.data.message);
  }
};

// Verify code for account account verification, forgot password etc
export const verifyCode = (code, navigate) => async (dispatch, getState) => {

  const { user, reason } = getState().auth;

  try {
    const { data } = await axios.post(`/api/v1/auth/verify-code`, {
      _id: user._id,
      code
    });
    toaster('Code verify successfully', "success");

    dispatch(reasonAdd(data));
    if (reason === 'verify-account') {
      navigate('/');
    }
    if (reason === 'forgot-password') {
      // setTimeout(() => {
      //   navigate(`/${data}`);
      // }, 10);
      navigate(`/${data}`);
    }

  } catch (error) {
    toaster(error.response.data.message);
  }
};

// Find user by email or mobile
export const findUser = (data, navigate) => async (dispatch) => {
  
  await axios.post('/api/v1/auth/find-user', { data })
    .then(({ data }) => {
      dispatch(dataAdd(data));
      navigate('/user-account');
      
    }).catch(({ response }) => {
      toaster(response.data.message);
    })
}

// Set new password
export const resetPassword = (pass, navigate) => async (dispatch, getState) => {

  const { user, reason } = getState().auth;

  try {
    const { data } = await axios.patch('/api/v1/auth/reset-password', { _id: user._id, pass, reason })
    toaster( 'Password Change Successfully', "success" );
    dispatch(reasonAdd(data));
    navigate('/');

  } catch ({ response }) {
    toaster(response.data.message);
  }
}

// User logout
export const logout = () => async (dispatch) => {

  const token = Cookies.get('fbstk')

  if (!token) {
    return dispatch(loggedOut());
  }
  try {
    dispatch(loadStart())
    const { data } = await axios.get('/api/v1/auth/logout', {
      headers : {
        authorization : token
      }
    });
    dispatch(loggedOut())
    toaster( data, "success" );

  } catch ({ response }) {
    toaster(response.data.message);
  }
}
