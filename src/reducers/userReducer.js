import actionTypes from "../actions/actionTypes";

const initialState = {
  isProcessing: false,
  userData: {},
  userError: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.IS_PROCESSING:
      return { ...state, isLoading: action.bool }

    case actionTypes.USER_AUTH_SUCCESS:
      return { ...state, userData: action.user, userError: "" }

    case actionTypes.SET_USER_ERROR:
      return {
        ...state, userError: action.error, userData: {}
      }

    case actionTypes.USER_LOG_OUT:
      return initialState;

    default:
      return state;
  }
};
