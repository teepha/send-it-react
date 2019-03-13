/* eslint-disable import/prefer-default-export */
import { toast } from "react-toastify";
import { BASE_API_URL } from "../config";
import {
  GET_PARCEL_SUCCESS,
  GET_PARCEL_FAILURE,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_FAILURE,
} from "./actionTypes";

const getParcelsSuccess = parcels => ({
  type: GET_PARCEL_SUCCESS,
  payload: parcels,
});

const getParcelsFailure = err => ({
  type: GET_PARCEL_FAILURE,
  payload: err,
});

const updateStatusSucess = parcel => ({
  type: UPDATE_STATUS_SUCCESS,
  payload: parcel,
});

const updateStatusFailure = err => ({
  type: UPDATE_STATUS_FAILURE,
  payload: err,
});

export const getUserParcels = () => (dispatch) => {
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

export const getAllParcels = () => (dispatch) => {
  return fetch(`${BASE_API_URL}/api/v1/parcels`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
    .then(res => res.json())
    .then((data) => {
      if (!data.length) {
        return data;
      }
      data.sort((a, b) => a.id - b.id);
      dispatch(getParcelsSuccess(data));
      return data;
    })
    .catch((err) => {
      dispatch(getParcelsFailure(err));
    });
};

export const updateParcelStatus = (id, value) => (dispatch) => {
  return fetch(`${BASE_API_URL}/api/v1/parcels/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({
      status: value,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  })
    .then(res => res.json())
    .then((res) => {
      if (!res.id) {
        toast.warn(res.msg);
        return res;
      }
      dispatch(updateStatusSucess(res));
      toast.success("Status Updated Successfully!");
      return res;
    })
    .catch((err) => {
      dispatch(updateStatusFailure(err));
      toast.err("Sorry a server error occured!");
      return err;
    });
};
