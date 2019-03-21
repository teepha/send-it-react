import { BASE_API_URL } from "../config";
import { capitalizeStatus } from "../utils";
import {
  CREATE_PARCEL_SUCCESS,
  CREATE_PARCEL_FAILURE,
  GET_SINGLE_PARCEL_SUCCESS,
  GET_SINGLE_PARCEL_FAILURE,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_FAILURE,
  UPDATE_PARCEL_SUCCESS,
  UPDATE_PARCEL_FAILURE,
  GET_PARCELS_SUCCESS,
  GET_PARCELS_FAILURE,
} from "./actionTypes";

const createParcelSuccess = parcel => ({
  type: CREATE_PARCEL_SUCCESS,
  payload: parcel,
});

const createParcelFailure = err => ({
  type: CREATE_PARCEL_FAILURE,
  payload: err,
});

const updateParcelSuccess = parcel => ({
  type: UPDATE_PARCEL_SUCCESS,
  payload: parcel,
});

const updateParcelFailure = err => ({
  type: UPDATE_PARCEL_FAILURE,
  payload: err,
});

const getParcelsSuccess = parcels => ({
  type: GET_PARCELS_SUCCESS,
  payload: parcels,
});

const getParcelsFailure = err => ({
  type: GET_PARCELS_FAILURE,
  payload: err,
});

const getSingleParcelSuccess = parcel => ({
  type: GET_SINGLE_PARCEL_SUCCESS,
  payload: parcel,
});

const getSingleParcelFailure = err => ({
  type: GET_SINGLE_PARCEL_FAILURE,
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
  fetch(`${BASE_API_URL}/api/v1/parcels`, {
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
        dispatch(createParcelFailure(res));
      } else {
        dispatch(createParcelSuccess(res));
      }
    })
    .catch((err) => {
      dispatch(createParcelFailure(err));
    });
};

export const updateParcelOrder = (
  id,
  pickupLocation,
  destination,
  recipientName,
  recipientPhone,
) => (dispatch) => {
  const userId = localStorage.getItem("userId");
  fetch(`${BASE_API_URL}/api/v1/parcels/${id}`, {
    method: "PUT",
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
        dispatch(updateParcelFailure(res));
      } else {
        dispatch(updateParcelSuccess(res));
      }
    })
    .catch((err) => {
      dispatch(updateParcelFailure(err));
    });
};

export const getSingleParcel = id => (dispatch) => {
  fetch(`${BASE_API_URL}/api/v1/parcels/${id}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
    .then(res => res.json())
    .then((res) => {
      if (!res.id) {
        dispatch(getSingleParcelFailure(res));
      } else {
        dispatch(getSingleParcelSuccess(res));
      }
    })
    .catch((err) => {
      dispatch(getSingleParcelFailure(err));
    });
};

export const getUserParcels = () => (dispatch) => {
  const userId = localStorage.getItem("userId");
  fetch(`${BASE_API_URL}/api/v1/users/${userId}/parcels`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
    .then(res => res.json())
    .then((data) => {
      if (!data.length) {
        dispatch(getParcelsFailure(data));
      } else {
        data.sort((a, b) => a.id - b.id);
        dispatch(getParcelsSuccess(data));
      }
    })
    .catch((err) => {
      dispatch(getParcelsFailure(err));
    });
};

export const getAllParcels = () => (dispatch) => {
  fetch(`${BASE_API_URL}/api/v1/parcels`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
    .then(res => res.json())
    .then((data) => {
      if (!data.length) {
        dispatch(getParcelsFailure(data));
      } else {
        data.sort((a, b) => a.id - b.id);
        dispatch(getParcelsSuccess(data));
      }
    })
    .catch((err) => {
      dispatch(getParcelsFailure(err));
    });
};

export const updateParcelStatus = (id, value) => (dispatch) => {
  fetch(`${BASE_API_URL}/api/v1/parcels/${id}/status`, {
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
        dispatch(updateStatusFailure(res.msg));
      } else {
        dispatch(updateStatusSucess(res));
      }
    })
    .catch((err) => {
      dispatch(updateStatusFailure(err));
    });
};
