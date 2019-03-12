import {
  LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE,
} from "../actions/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return action.payload;
    case LOGIN_USER_FAILURE:
      return action.payload;
    case SIGNUP_USER_SUCCESS:
      return action.payload;
    case SIGNUP_USER_FAILURE:
      return action.payload;
    default:
      return state;
  }
};
