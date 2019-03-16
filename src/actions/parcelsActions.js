import { toast } from "react-toastify";
import { BASE_API_URL } from "../config";
import { capitalizeStatus } from "../utils";
import {
  CREATE_PARCEL_SUCCESS,
  CREATE_PARCEL_FAILURE,
  GET_PARCEL_SUCCESS,
  GET_PARCEL_FAILURE,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_FAILURE,
  EDIT_PARCEL_SUCCESS,
  EDIT_PARCEL_FAILURE,
} from "./actionTypes";

const createParcelSuccess = parcel => ({
  type: CREATE_PARCEL_SUCCESS,
  payload: parcel,
});

const createParcelFailure = err => ({
  type: CREATE_PARCEL_FAILURE,
  payload: err,
});

const editParcelSuccess = parcel => ({
  type: EDIT_PARCEL_SUCCESS,
  payload: parcel,
});

const editParcelFailure = err => ({
  type: EDIT_PARCEL_FAILURE,
  payload: err,
});

const getParcelsSuccess = parcels => ({
  type: GET_PARCEL_SUCCESS,
  payload: parcels,
});

const getParcelsFailure = err => ({
  type: GET_PARCEL_FAILURE,
  payload: err,
});

const getSingleParcelSuccess = parcel => ({
  type: GET_PARCEL_SUCCESS,
  payload: parcel,
});

const getSingleParcelFailure = err => ({
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

export const createParcelOrder = (
  pickupLocation,
  destination,
  recipientName,
  recipientPhone,
) => (dispatch) => {
  const userId = localStorage.getItem("userId");
  return fetch(`${BASE_API_URL}/api/v1/parcels`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      pickupLocation,
      destination,
      recipientName,
      recipientPhone,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  })
    .then(res => res.json())
    .then((res) => {
      if (!res.id) {
        createParcelFailure(res);
        toast.warn(
          `${capitalizeStatus(res.errors[0].param)} ${res.errors[0].msg}`,
        );
        return res;
      }
      createParcelSuccess(res);
      toast.success("Parcel Order Created Successfully!");
      return res;
    })
    .catch((err) => {
      createParcelFailure(err);
      toast.error("Sorry a server error occured!");
      return err;
    });
};

export const editParcelOrder = (
  pickupLocation,
  newDestination,
  recipientName,
  recipientPhone,
) => (dispatch) => {
  const userId = localStorage.getItem("userId");
  // const id = localStorage.getItem("parcelToEdit");
  return fetch(`${BASE_API_URL}/api/v1/parcels/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      userId,
      pickupLocation,
      newDestination,
      recipientName,
      recipientPhone,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  })
    .then(res => res.json())
    .then((res) => {
      console.log("resssss....", res);
      // if (!res.id) {
      //   editParcelFailure(res);
      //   toast.warn(
      //     `${capitalizeStatus(res.errors[0].param)} ${res.errors[0].msg}`,
      //   );
      //   return res;
      // }
      // editParcelSuccess(res);
      // toast.success("Parcel Order Created Successfully!");
      return res;
    })
    .catch((err) => {
      console.log("errrrrrr", err);
      // editParcelFailure(err);
      // toast.error("Sorry a server error occured!");
      return err;
    });
};

export const getSingleParcel = id => (dispatch) => {
  // console.log()
  return fetch(`${BASE_API_URL}/api/v1/parcels/${id}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
    .then(res => res.json())
    .then((data) => {
      dispatch(getSingleParcelSuccess(data));
      return data;
    })
    .catch((err) => {
      console.log("err occured", err);
      dispatch(getSingleParcelFailure(err));
      return err;
    });
};

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
      data.sort((a, b) => a.id - b.id);
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
