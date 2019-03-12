import {
  PARCEL_SUCCESS, PARCEL_FAILURE,
} from "../actions/actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case PARCEL_SUCCESS:
      return action.payload;
    case PARCEL_FAILURE:
      return action.payload;
    default:
      return state;
  }
};
