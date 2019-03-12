/* eslint-disable import/prefer-default-export */
import { BASE_API_URL } from "../config";
import { PARCEL_SUCCESS, PARCEL_FAILURE } from "./actionTypes";

const userParcelSuccess = parcels => ({
  type: PARCEL_SUCCESS,
  payload: parcels,
});

const userParcelFailure = err => ({
  type: PARCEL_FAILURE,
  payload: err,
});

export const getParcels = () => (dispatch) => {
  const userId = localStorage.getItem("userId");
  fetch(`${BASE_API_URL}/api/v1/users/${userId}/parcels`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
    .then(res => res.json())
    .then((data) => {
      if (!data.length) {
        console.log("dataameassage", data);
        //dispatch err
      } else {
        data.sort((a, b) => a.id - b.id); // research why we cant reassign value in sort
        dispatch(userParcelSuccess(data));
      }
    })
    .catch((err) => {
      console.log("some errors", err);
      dispatch(userParcelFailure(err));
    });
};
