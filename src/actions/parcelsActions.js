/* eslint-disable import/prefer-default-export */
import { BASE_API_URL } from "../config";
import { GET_PARCEL_SUCCESS, GET_PARCEL_FAILURE } from "./actionTypes";

const getParcelsSuccess = parcels => ({
  type: GET_PARCEL_SUCCESS,
  payload: parcels,
});

const getParcelsFailure = err => ({
  type: GET_PARCEL_FAILURE,
  payload: err,
});

export const getParcels = () => (dispatch) => {
  const userId = localStorage.getItem("userId");
  return fetch(`${BASE_API_URL}/api/v1/users/${userId}/parcels`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
    .then(res => res.json())
    .then((data) => {
      if (!data.length) {
        return data;
      }
      data.sort((a, b) => a.id - b.id); // research why we cant reassign value in sort
      dispatch(getParcelsSuccess(data));
      return data;
    })
    .catch((err) => {
      dispatch(getParcelsFailure(err));
    });
};
