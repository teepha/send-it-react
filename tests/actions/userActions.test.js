import moxios from "moxios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { authUserRequest, logoutUser } from "../../src/actions/userActions";
import actionTypes from "../../src/actions/actionTypes";
import userData from "../mockData/userData";

const middleware = [thunk];
const storeMock = configureMockStore(middleware);

describe("user authentication actions", () => {
  let store;
  beforeEach(() => {
    moxios.install();
    store = storeMock({});
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should logoutUser user", () => {
    const expectedActions = [
      {
        type: actionTypes.USER_LOG_OUT
      }
    ];
    store.dispatch(logoutUser());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should call the signup success dispatch function", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: userData.authResponse
      });
    });

    const expectedActions = [
      {
        type: actionTypes.IS_LOADING,
        bool: true
      },
      {
        type: actionTypes.USER_AUTH_SUCCESS,
        user: userData.newUser
      },
      {
        type: actionTypes.IS_LOADING,
        bool: false
      }
    ];

    await store.dispatch(authUserRequest(userData.userRequestData));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it("should call the signup error dispatch function", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: userData.userErrorResponse
      });
    });

    const expectedActions = [
      {
        type: actionTypes.IS_LOADING,
        bool: true
      },
      {
        type: actionTypes.SET_USER_ERROR,
        error: userData.userErrorResponse.msg
      },
      {
        type: actionTypes.IS_LOADING,
        bool: false
      }
    ];

    await store.dispatch(authUserRequest(userData.invalidRequestData));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});
