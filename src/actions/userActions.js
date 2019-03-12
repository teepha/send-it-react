import { toast } from "react-toastify";
import { BASE_API_URL } from "../config";
import { capitalizeStatus } from "../utils";
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
} from "./actionTypes";

const loginUserSuccess = userInfo => ({
  type: LOGIN_USER_SUCCESS,
  payload: userInfo,
});

const loginUserFailure = err => ({
  type: LOGIN_USER_FAILURE,
  payload: err,
});

const signupUserSuccess = userInfo => ({
  type: SIGNUP_USER_SUCCESS,
  payload: userInfo,
});

const signupUserFailure = err => ({
  type: SIGNUP_USER_FAILURE,
  payload: err,
});

export const loginUser = (email, password) => (dispatch) => {
  return fetch(`${BASE_API_URL}/api/v1/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(res => res.json())
    .then((loginRes) => {
      if (!loginRes.token) {
        dispatch(loginUserFailure(loginRes));
        return loginRes;
      }
      localStorage.setItem("token", loginRes.token);
      localStorage.setItem("userId", loginRes.userId);
      toast.success(loginRes.msg);

      return fetch(`${BASE_API_URL}/api/v1/me`, {
        headers: {
          Authorization: loginRes.token,
        },
      })
        .then(res => res.json())
        .then((data) => {
          dispatch(loginUserSuccess(data));
          return data;
        })
        .catch((err) => {
          dispatch(loginUserFailure(err));
          toast.error("Sorry a server error occured!");
          return err;
        });
    })
    .catch((err) => {
      dispatch(loginUserFailure(err));
      toast.error("Sorry a server error occured!");
      return err;
    });
};

export const registerUser = (
  firstName,
  lastName,
  phoneNumber,
  email,
  password,
) => (dispatch) => {
  return fetch(`${BASE_API_URL}/api/v1/auth/signup`, {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(res => res.json())
    .then((res) => {
      if (!res.token) {
        signupUserFailure(res);
        toast.warn(`${capitalizeStatus(res.errors[0].param)} ${res.errors[0].msg}`);
        return res;
      }
      signupUserSuccess(res);
      toast.success(res.msg);
      return res;
    })
    .catch((err) => {
      signupUserFailure(err);
      toast.error("Sorry a server error occured!");
      return err;
    });
};
