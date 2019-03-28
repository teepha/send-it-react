import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { BASE_API_URL } from "../utils";
import actionTypes from "./actionTypes";

const userAuthSuccess = user => ({
  type: actionTypes.USER_AUTH_SUCCESS,
  user,
});

const userAuthFailure = error => ({
  type: actionTypes.SET_USER_ERROR,
  error
});


export const loginUser = (email, password) => async dispatch => {
  try {
    const response = await axios.post(`${BASE_API_URL}/api/v1/auth/login`, { email, password });
    const { token } = response.data;
    const user = (jwtDecode(token)).userInfo;

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem("token", token)
    dispatch(userAuthSuccess(user));
  } catch (error) {
    dispatch(userAuthFailure(error.response.data.msg));
  }
};

export const registerUser = (
  firstName,
  lastName,
  phoneNumber,
  email,
  password,
) => async dispatch => {

  try {
    const response = await axios.post(`${BASE_API_URL}/api/v1/auth/signup`, {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    });
    // console.log("signupresss", response);
    const { token } = response.data;
    const user = (jwtDecode(token)).userInfo;

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem("token", token)
    dispatch(userAuthSuccess(user));
  } catch (error) {
    // console.log('cerrrttt', error.response.data);
    dispatch(userAuthFailure(error.response.data.msg));
  }

  // fetch(`${BASE_API_URL}/api/v1/auth/signup`, {
  //   method: "POST",
  //   body: JSON.stringify({
  //     firstName,
  //     lastName,
  //     phoneNumber,
  //     email,
  //     password,
  //   }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then(res => res.json())
  //   .then((signupRes) => {
  //     if (!signupRes.token) {
  //       dispatch(signupUserFailure(signupRes));
  //     } else {
  //       localStorage.setItem("token", signupRes.token);
  //       localStorage.setItem("userId", signupRes.userId);

  //       fetch(`${BASE_API_URL}/api/v1/me`, {
  //         headers: {
  //           Authorization: signupRes.token,
  //         },
  //       })
  //         .then(res => res.json())
  //         .then((data) => {
  //           dispatch(signupUserSuccess(data));
  //           // console.log(">>>>", data);
  //         })
  //         .catch((err) => {
  //           dispatch(signupUserFailure(error));
  //         });
  //     }
  //   })
  //   .catch((err) => {
  //     dispatch(signupUserFailure(error));
  //   });
};
