// import isEmpty from "is-empty";
import actionTypes from "../actions/actionTypes";

const initialState = {
  // isProcessing: false,
  userData: {},
  // isAuthenticated: false,
  userError: ""
  // data: {},
  // errors: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_AUTH_SUCCESS:
      // console.log("actionuser", action.user);
      return { ...state, userData: action.user, userError: "" }
    // return Object.assign({}, state, { data: action.payload, errors: [] });
    case actionTypes.SET_USER_ERROR:
      // console.log("actionerror", action.error)
      return {
        ...state, userError: action.error, userData: {}
      }
    // return Object.assign({}, state, {
    //   errors: state.errors.concat(action.payload.msg),
    //   data: {},
    // });
    // return {
    //   ...state,
    //   user: action.user,
    //   isAuthenticated: !isEmpty(action.user)
    // }
    // case actionTypes.SIGNUP_USER_SUCCESS:
    //   return Object.assign({}, state, {
    //     data: action.payload,
    //     errors: [],
    //   });
    // case actionTypes.SIGNUP_USER_FAILURE:
    //   if (!state.errors.includes(action.payload.msg)) {
    //     state.errors.push(action.payload.msg);
    //   }
    //   return JSON.parse(JSON.stringify(state));
    default:
      return state;
  }
};
