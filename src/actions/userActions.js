import { BASE_API_URL } from "../config";
import {
  LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE,
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
        loginUserFailure(err);
        return loginRes;
      }
      localStorage.setItem("token", loginRes.token);
      localStorage.setItem("userId", loginRes.userId);

      return fetch(`${BASE_API_URL}/api/v1/me`, {
        headers: {
          Authorization: loginRes.token,
        },
      })
        .then(res => res.json())
        .then((data) => {
          loginUserSuccess(data);
          return data;
        })
        .catch((err) => {
          loginUserFailure(err);
          return err;
        });
    })
    .catch((err) => {
      loginUserFailure(err);
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
        return res;
      }
      signupUserSuccess(res);
      return res;
    })
    .catch((err) => {
      signupUserFailure(err);
      return err;
    });
};
