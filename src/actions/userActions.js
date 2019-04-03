import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { toast } from "react-toastify";
import { BASE_API_URL } from "../utils";
import actionTypes from "./actionTypes";

const isProcessing = bool => ({
  type: actionTypes.IS_PROCESSING,
  bool
});

export const userAuthSuccess = user => ({
  type: actionTypes.USER_AUTH_SUCCESS,
  user,
});

const userAuthFailure = error => ({
  type: actionTypes.SET_USER_ERROR,
  error
});

const userLogoutSuccess = () => ({
  type: actionTypes.USER_LOG_OUT,
});

export const authUserRequest = user => async dispatch => {
  let path = "login";
  if (typeof user.firstName !== 'undefined') path = "signup";
  
  try {
    dispatch(isProcessing(true));
    const response = await axios.post(`${BASE_API_URL}/api/v1/auth/${path}`, { ...user });
    const { token, msg } = response.data;
    const userData = (jwtDecode(token)).userInfo;
    localStorage.setItem("token", token);
    
    toast.success(msg);
    dispatch(userAuthSuccess(userData));
  } catch (error) {
    toast.error(error.response.data.msg);
    dispatch(userAuthFailure(error.response.data.msg));
  } finally {
    dispatch(isProcessing(false));
  }
};

export const logoutUser = () => dispatch => {
  try {
    localStorage.clear();
    dispatch(userLogoutSuccess());
  } catch (error) {
    dispatch(userAuthFailure(error));
  }
};
