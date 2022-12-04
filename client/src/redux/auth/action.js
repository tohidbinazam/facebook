import axios from "axios";
import numOrEmail from "../../utility/numOrEmail";
import toaster from "../../utility/toaster";
import { LOGGED_IN, LOGGED_OUT, REGISTER } from "./types";


export const register = (all_data, setShow, navigate) => async (dispatch) => {

  const isData = numOrEmail(all_data.auth);
  if (!isData) {
    return toaster("Invalid email or phone number", "error");
  }

  try {
    const { data } = await axios.post(`/api/v1/auth/register-${isData}`, all_data);

    dispatch({
      type: REGISTER,
      payload: data,
    });
    toaster("Registration successful", "success");
    navigate('/code-check');
    setShow(false);

  } catch (error) {
    toaster(error.response.data.message, "error");
  }
};

export const resendCode = () => async (dispatch, getState) => {

  const { email, mobile } = getState().auth.user;
  const data_is = email || mobile;

  try {
    const { data } = await axios.post(`/api/v1/auth/resend-${ email ? 'email' : 'number' }`, {
      data_is
    });
    toaster( data, "success");

  } catch (error) {
    toaster(error.response.data.message, "error");
  }
};





export const isLoggedIn = (token) => async (dispatch) => {
    if (token) {
      
      await axios.get('/api/v1/auth/me',{
        headers : {
            authorization : token
        }
      }).then(res => {
        dispatch(loggedIn(res.data))
      })
      .catch(() => {
        dispatch(loggedOut())
      })
      
    }else{
      dispatch(loggedOut())
    }
    
}

export const loggedIn = (payload) => ({
    type: LOGGED_IN,
    payload
})

export const loggedOut = () => ({
    type: LOGGED_OUT
})
