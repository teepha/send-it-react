import axios from "axios";
import { BASE_API_URL } from "../utils";
import actionTypes from "./actionTypes";

const isLoading = bool => ({
  type: actionTypes.IS_LOADING,
  bool
});

const createParcelSuccess = parcel => ({
  type: actionTypes.CREATE_PARCEL_SUCCESS,
  parcel
});

const getParcelsSuccess = parcels => ({
  type: actionTypes.GET_PARCELS_SUCCESS,
  parcels
});

const getSingleParcelSuccess = parcel => ({
  type: actionTypes.GET_SINGLE_PARCEL_SUCCESS,
  parcel
});

const updateParcelSuccess = parcel => ({
  type: actionTypes.UPDATE_PARCEL_SUCCESS,
  parcel
});

const parcelsFailure = error => ({
  type: actionTypes.SET_PARCEL_ERROR,
  error
});

export const createParcelOrder = (userId, data) => async dispatch => {
  const headers = {
    Authorization: localStorage.getItem("token")
  };

  try {
    dispatch(isLoading(true));
    const response = await axios.post(
      `${BASE_API_URL}/api/v1/parcels`,
      { ...data, userId },
      { headers }
    );
    dispatch(createParcelSuccess(response.data));
  } catch (error) {
    dispatch(parcelsFailure(error.response.data));
  } finally {
    dispatch(isLoading(false));
  }
};

export const updateParcelOrder = (id, data) => async dispatch => {
  const headers = {
    Authorization: localStorage.getItem("token")
  };
  try {
    dispatch(isLoading(true));
    const response = await axios.put(
      `${BASE_API_URL}/api/v1/parcels/${id}`,
      { ...data },
      { headers }
    );
    dispatch(updateParcelSuccess(response.data));
  } catch (error) {
    dispatch(parcelsFailure(error.response.data));
  } finally {
    dispatch(isLoading(false));
  }
};

export const getSingleParcel = id => async dispatch => {
  const headers = {
    Authorization: localStorage.getItem("token")
  };

  try {
    const response = await axios.get(`${BASE_API_URL}/api/v1/parcels/${id}`, {
      headers
    });
    dispatch(getSingleParcelSuccess(response.data));
  } catch (error) {
    dispatch(parcelsFailure(error.response.data));
  }
};

export const getUserParcels = userId => async dispatch => {
  const headers = {
    Authorization: localStorage.getItem("token")
  };

  try {
    dispatch(isLoading(true));
    const response = await axios.get(
      `${BASE_API_URL}/api/v1/users/${userId}/parcels`,
      { headers }
    );
    const sortedData = response.data.sort((a, b) => a.id - b.id);
    dispatch(getParcelsSuccess(sortedData));
  } catch (error) {
    dispatch(parcelsFailure(error.response.data));
  } finally {
    dispatch(isLoading(false));
  }
};

export const getAllParcels = () => async dispatch => {
  const headers = {
    Authorization: localStorage.getItem("token")
  };

  try {
    dispatch(isLoading(true));
    const response = await axios.get(`${BASE_API_URL}/api/v1/parcels`, {
      headers
    });
    const sortedData = response.data.sort((a, b) => a.id - b.id);
    dispatch(getParcelsSuccess(sortedData));
  } catch (error) {
    dispatch(parcelsFailure(error.response.data));
  } finally {
    dispatch(isLoading(false));
  }
};

export const updateParcelStatus = (id, value) => async dispatch => {
  const headers = {
    Authorization: localStorage.getItem("token")
  };

  try {
    const response = await axios.put(
      `${BASE_API_URL}/api/v1/parcels/${id}/status`,
      { status: value },
      { headers }
    );

    dispatch(updateParcelSuccess(response.data));
  } catch (error) {
    dispatch(parcelsFailure(error.response.data));
  }
};

export const updateParcelLocation = (id, newLocation) => async dispatch => {
  const headers = {
    Authorization: localStorage.getItem("token")
  };

  try {
    const response = await axios.put(
      `${BASE_API_URL}/api/v1/parcels/${id}/presentLocation`,
      { presentLocation: newLocation },
      { headers }
    );

    dispatch(updateParcelSuccess(response.data));
  } catch (error) {
    dispatch(parcelsFailure(error.response.data));
  }
};

export const cancelParcelOrder = id => async dispatch => {
  const headers = {
    Authorization: localStorage.getItem("token")
  };

  try {
    const response = await axios.put(
      `${BASE_API_URL}/api/v1/parcels/${id}/cancel`,
      {},
      { headers }
    );

    dispatch(updateParcelSuccess(response.data));
  } catch (error) {
    dispatch(parcelsFailure(error.response.data));
  }
};
