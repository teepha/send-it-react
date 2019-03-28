import axios from "axios"
import { BASE_API_URL } from "../utils";
import actionTypes from "./actionTypes";

const createParcelSuccess = parcel => ({
  type: actionTypes.CREATE_PARCEL_SUCCESS,
  parcel,
});

const createParcelFailure = error => ({
  type: actionTypes.SET_PARCEL_ERROR,
  error,
});

const getParcelsSuccess = parcels => ({
  type: actionTypes.GET_PARCELS_SUCCESS,
  parcels,
});

const getParcelsFailure = error => ({
  type: actionTypes.SET_PARCEL_ERROR,
  error,
});

const updateStatusSucess = parcel => ({
  type: actionTypes.UPDATE_PARCEL_SUCCESS,
  parcel,
});

const updateParcelSuccess = parcel => ({
  type: actionTypes.UPDATE_PARCEL_SUCCESS,
  payload: parcel,
});

const updateParcelFailure = err => ({
  type: actionTypes.UPDATE_PARCEL_FAILURE,
  payload: err,
});



const getSingleParcelSuccess = parcel => ({
  type: actionTypes.GET_SINGLE_PARCEL_SUCCESS,
  payload: parcel,
});

const getSingleParcelFailure = err => ({
  type: actionTypes.GET_SINGLE_PARCEL_FAILURE,
  payload: err,
});



const cancelParcelSuccess = parcel => ({
  type: actionTypes.UPDATE_PARCEL_SUCCESS,
  payload: parcel,
});

const cancelParcelFailure = err => ({
  type: actionTypes.UPDATE_PARCEL_FAILURE,
  payload: err,
});

export const createParcelOrder = (
  pickupLocation,
  destination,
  recipientName,
  recipientPhone,
) => async dispatch => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": localStorage.getItem("token"),
  }

  try {
    const response = await axios.post(`${BASE_API_URL}/api/v1/parcels`, {
      userId,
      pickupLocation,
      destination,
      recipientName,
      recipientPhone,
    }, {
        "headers": headers,
      });
    console.log("resp", response.data);
    dispatch(createParcelSuccess(response.data));
  } catch (error) {
    console.log("catach", error.response.data.errors[0]);
    dispatch(createParcelFailure(error.response.data));
  }
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

export const getUserParcels = () => async dispatch => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": localStorage.getItem("token"),
  }

  try {
    const response = await axios.get(`${BASE_API_URL}/api/v1/users/${userId}/parcels`, { "headers": headers });
    dispatch(getParcelsSuccess(response.data));
  } catch (error) {
    dispatch(getParcelsFailure(error.response.data));
  }
};

export const getAllParcels = () => async dispatch => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": localStorage.getItem("token"),
  }

  try {
    const response = await axios.get(`${BASE_API_URL}/api/v1/parcels`, { "headers": headers });
    dispatch(getParcelsSuccess(response.data));
  } catch (error) {
    dispatch(getParcelsFailure(error.response.data));
  }
};

export const updateParcelStatus = (id, value) => async dispatch => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": localStorage.getItem("token"),
  }

  try {
    const response = await axios.put(`${BASE_API_URL}/api/v1/parcels/${id}/status`,
      { status: value }, { "headers": headers});

    dispatch(updateStatusSucess(response.data));
  } catch (error) {
    dispatch(getParcelsFailure(error.response.data));
  }
};

export const cancelParcelOrder = id => (dispatch) => {
  fetch(`${BASE_API_URL}/api/v1/parcels/${id}/cancel`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }
  }).then(res => res.json())
    .then(res => {
      if (!res.id) {
        dispatch(cancelParcelFailure(res));
      } else {
        dispatch(cancelParcelSuccess(res))
      }
    })
    .catch((err) => {
      dispatch(cancelParcelFailure(err))
    })
}

export const updateParcelLocation = (id, newLocation) => (dispatch) => {
  fetch(`${BASE_API_URL}/api/v1/parcels/${id}/presentLocation`, {
    method: 'PUT',
    body: JSON.stringify({
      presentLocation: newLocation
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }
  }).then(res => res.json())
    .then(res => {
      dispatch(updateParcelSuccess(res));
    }).catch((err) => {
      dispatch(updateParcelFailure(err));
    })
}
