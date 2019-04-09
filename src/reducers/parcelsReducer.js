import actionTypes from "../actions/actionTypes";

const initalState = {
  data: [],
  error: "",
  isLoading: false
};

export default (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.IS_LOADING:
      return { ...state, isLoading: action.bool };

    case actionTypes.CREATE_PARCEL_SUCCESS:
      return { ...state, data: [...state.data, action.parcel], error: "" };

    case actionTypes.SET_PARCEL_ERROR:
      return {
        ...state,
        error: action.error.msg,
        data: []
      };

    case actionTypes.GET_PARCELS_SUCCESS:
      return { ...state, data: action.parcels, error: "" };

    case actionTypes.UPDATE_PARCEL_SUCCESS:
      const mappedData = state.data.map((parcel) => {
        if (parcel.id === action.parcel.id) {
          parcel = action.parcel;
        }
        return parcel;
      });
      return {
        ...state,
        data: mappedData
      };

    case actionTypes.GET_SINGLE_PARCEL_SUCCESS:
      if (!state.data.length) {
        return { ...state, data: state.data.concat(action.parcel), error: "" };
      }
      return JSON.parse(JSON.stringify(state));

    default:
      return state;
  }
};
