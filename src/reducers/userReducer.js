import {
  LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  data: {},
  errors: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, { data: action.payload, errors: [] });
    case LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        errors: state.errors.concat(action.payload.msg),
        data: {},
      });
    case SIGNUP_USER_SUCCESS:
      return Object.assign({}, state, {
        data: action.payload,
        errors: [],
      });
    case SIGNUP_USER_FAILURE:
      if (!state.errors.includes(action.payload.msg)) {
        state.errors.push(action.payload.msg);
      }
      return JSON.parse(JSON.stringify(state));
    default:
      return state;
  }
};
