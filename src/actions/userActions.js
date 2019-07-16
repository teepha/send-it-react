import jwtDecode from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_API_URL } from "../utils";
import actionTypes from "./actionTypes";

const isLoading = bool => ({
  type: actionTypes.IS_LOADING,
  bool
});

export const userAuthSuccess = user => ({
  type: actionTypes.USER_AUTH_SUCCESS,
  user
});

const userAuthFailure = error => ({
  type: actionTypes.SET_USER_ERROR,
  error
});

const userLogoutSuccess = () => ({
  type: actionTypes.USER_LOG_OUT
});

export const authUserRequest = user => async dispatch => {
  let path = "login";
  if (typeof user.firstName !== "undefined") path = "signup";

  dispatch(isLoading(true));
  try {
    const response = await axios.post(`${BASE_API_URL}/api/v1/auth/${path}`, {
      ...user
    });
    const { token, msg } = response.data;
    const userData = jwtDecode(token).userInfo;
    localStorage.setItem("token", token);

    toast.success(msg);
    dispatch(userAuthSuccess(userData));
  } catch (error) {
    if (error.response === undefined) {
      toast.error("Sorry, an error occured. Please try again in a few minutes");
    } else {
      toast.error(error.response.data.msg);
      dispatch(userAuthFailure(error.response.data.msg));
    }
  } finally {
    dispatch(isLoading(false));
  }
};

export const logoutUser = () => dispatch => {
  localStorage.clear();
  dispatch(userLogoutSuccess());
};
