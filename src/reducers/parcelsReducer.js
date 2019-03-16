import {
  CREATE_PARCEL_SUCCESS,
  CREATE_PARCEL_FAILURE,
  GET_PARCEL_SUCCESS,
  GET_PARCEL_FAILURE,
  EDIT_PARCEL_SUCCESS,
  EDIT_PARCEL_FAILURE,
} from "../actions/actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case CREATE_PARCEL_SUCCESS:
      return action.payload;
    case CREATE_PARCEL_FAILURE:
      return action.payload;
    case GET_PARCEL_SUCCESS:
      return action.payload;
    case GET_PARCEL_FAILURE:
      return action.payload;
    case EDIT_PARCEL_SUCCESS:
      return action.payload;
    case EDIT_PARCEL_FAILURE:
      return action.payload;
    default:
      return state;
  }
};
