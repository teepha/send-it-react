import {
  CREATE_PARCEL_SUCCESS,
  CREATE_PARCEL_FAILURE,
  GET_SINGLE_PARCEL_SUCCESS,
  GET_SINGLE_PARCEL_FAILURE,
  UPDATE_PARCEL_SUCCESS,
  UPDATE_PARCEL_FAILURE,
  GET_PARCELS_SUCCESS,
  GET_PARCELS_FAILURE
} from "../actions/actionTypes";

const initalState = {
  data: [],
  errors: [],
};

export default (state = initalState, action) => {
  switch (action.type) {
    case CREATE_PARCEL_SUCCESS:
      return Object.assign({}, state, {
        data: state.data.concat(action.payload),
      });
    case CREATE_PARCEL_FAILURE:
      return Object.assign({}, state, {
        errors: state.errors.concat(action.payload.errors),
      });
    case GET_PARCELS_SUCCESS:
      return JSON.parse(JSON.stringify({ errors: [], data: action.payload }));
    case GET_PARCELS_FAILURE:
      return Object.assign({}, state, {
        errors: state.errors.concat(action.payload.msg),
      });
    case GET_SINGLE_PARCEL_SUCCESS:
      if (!state.data.length) {
        return Object.assign({}, state, {
          data: state.data.concat(action.payload),
        });
      }
      return JSON.parse(JSON.stringify(state));
    case GET_SINGLE_PARCEL_FAILURE:
      return Object.assign({}, state, {
        errors: state.errors.concat(action.payload.msg),
      });
    case UPDATE_PARCEL_SUCCESS:
      const parcelIndex = state.data.findIndex(
        parcel => parcel.id === action.payload.id,
      );
      state.data.splice(parcelIndex, 1, action.payload);
      return JSON.parse(JSON.stringify(state));
    case UPDATE_PARCEL_FAILURE:
      return Object.assign({}, state, {
        errors: state.errors.concat(action.payload.errors),
      });
    default:
      return state;
  }
};
