import actionTypes from "../actions/actionTypes";

const initalState = {
  data: [],
  error: "",
};

export default (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_PARCEL_SUCCESS:
      return { ...state, data: state.data.concat(action.parcel), error: "" }

    case actionTypes.SET_PARCEL_ERROR:
      console.log("actionError", action.error);
      return {
        ...state, error: action.error.msg, data: []
      }

    case actionTypes.GET_PARCELS_SUCCESS:
      return { ...state, data: action.parcels, error: "" }

    case actionTypes.UPDATE_PARCEL_SUCCESS:
      console.log("action here", action.parcel)
      const parcelIndex = state.data.findIndex(
        parcel => parcel.id === action.parcel.id,
      );
      state.data.splice(parcelIndex, 1, action.parcel);
      return state;

    case actionTypes.GET_SINGLE_PARCEL_SUCCESS:
      if (!state.data.length) {
        return Object.assign({}, state, {
          data: state.data.concat(action.payload),
        });
      }
      return JSON.parse(JSON.stringify(state));
    // case actionTypes.GET_SINGLE_PARCEL_FAILURE:
    //   return Object.assign({}, state, {
    //     errors: state.errors.concat(action.payload.msg),
    //   });

    default:
      return state;
  }
};
