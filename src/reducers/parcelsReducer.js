import {
  GET_PARCEL_SUCCESS, GET_PARCEL_FAILURE,
} from "../actions/actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case GET_PARCEL_SUCCESS:
      return action.payload;
    case GET_PARCEL_FAILURE:
      return action.payload;
    default:
      return state;
  }
};
