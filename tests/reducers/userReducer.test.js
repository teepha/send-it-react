import userReducer from "../../src/reducers/userReducer";
import actionTypes from "../../src/actions/actionTypes";

describe("AuthReducer test", () => {
  const initialState = {
    isLoading: false,
    userData: {},
    userError: ""
  };
  it("should return the initial state ", () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle IS_LOADING", () => {
    const action = {
      type: actionTypes.IS_LOADING,
      bool: true
    };
    const newState = userReducer(initialState, action);
    expect(newState.isLoading).toEqual(true);
    expect(newState.userData).toEqual({});
    expect(newState.userError).toEqual("");
  });

  it("should handle USER_AUTH_SUCCESS", () => {
    const action = {
      type: actionTypes.USER_AUTH_SUCCESS,
      user: { firstName: "userdata" }
    };
    const newState = userReducer(initialState, action);
    expect(newState.userData).toEqual({ firstName: "userdata" });
    expect(newState.isLoading).toEqual(false);
    expect(newState.userError).toEqual("");
  });

  it("should handle SET_USER_ERROR", () => {
    const action = {
      type: actionTypes.SET_USER_ERROR,
      error: "some errors here"
    };
    const newState = userReducer(initialState, action);
    expect(newState.userError).toEqual("some errors here");
    expect(newState.isLoading).toEqual(false);
    expect(newState.userData).toEqual({});
  });

  it("should handle USER_LOG_OUT", () => {
    const action = {
      type: actionTypes.USER_LOG_OUT
    };
    const newState = userReducer(initialState, action);
    expect(newState.userError).toEqual("");
    expect(newState.isLoading).toEqual(false);
    expect(newState.userData).toEqual({});
  });
});
