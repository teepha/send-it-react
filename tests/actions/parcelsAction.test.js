import moxios from "moxios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {
  getSingleParcel,
  getUserParcels,
  getAllParcels,
  createParcelOrder,
  updateParcelOrder,
  updateParcelStatus,
  updateParcelLocation,
  cancelParcelOrder
} from "../../src/actions/parcelsActions";
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

  it("should create a parcel delivery order by a user", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: userData.parcels[0]
      });
    });
    const expectedActions = [
      {
        type: actionTypes.IS_LOADING,
        bool: true
      },
      {
        type: actionTypes.CREATE_PARCEL_SUCCESS,
        parcel: userData.parcels[0]
      },
      {
        type: actionTypes.IS_LOADING,
        bool: false
      }
    ];
    await store.dispatch(
      createParcelOrder(userData.newUser.id, userData.createParcelRequestData)
    );
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it("should call create parcel error dispatch function", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 422,
        response: userData.createParcelErrorResponse
      });
    });
    const expectedActions = [
      {
        type: actionTypes.IS_LOADING,
        bool: true
      },
      {
        type: actionTypes.SET_PARCEL_ERROR,
        error: userData.createParcelErrorResponse
      },
      {
        type: actionTypes.IS_LOADING,
        bool: false
      }
    ];
    await store.dispatch(
      createParcelOrder(userData.newUser.id, userData.invalidCreateParcelData)
    );
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it("should update the details of a parcel delivery order", async done => {
    const parcelId = userData.parcels[0].id;
    const data = userData.updateParcelRequestData;
    const response = userData.updateParcelResponse;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response
      });
    });
    const expectedActions = [
      {
        type: actionTypes.IS_LOADING,
        bool: true
      },
      {
        type: actionTypes.UPDATE_PARCEL_SUCCESS,
        parcel: response
      },
      {
        type: actionTypes.IS_LOADING,
        bool: false
      }
    ];
    await store.dispatch(updateParcelOrder(parcelId, data));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it("should call update parcel deails error dispatch function", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 422,
        response: userData.createParcelErrorResponse
      });
    });
    const expectedActions = [
      {
        type: actionTypes.IS_LOADING,
        bool: true
      },
      {
        type: actionTypes.SET_PARCEL_ERROR,
        error: userData.createParcelErrorResponse
      },
      {
        type: actionTypes.IS_LOADING,
        bool: false
      }
    ];
    await store.dispatch(
      updateParcelOrder(userData.newUser.id, userData.invalidCreateParcelData)
    );
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it("should update the status of a parcel delivery order", async done => {
    const parcelId = userData.parcels[0].id;
    const value = "in-transit";
    const response = userData.updateStatusResponse;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response
      });
    });
    const expectedActions = [
      {
        type: actionTypes.UPDATE_PARCEL_SUCCESS,
        parcel: response
      }
    ];
    await store.dispatch(updateParcelStatus(parcelId, value));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it("should call update parcel status error dispatch function", async done => {
    const parcelId = userData.parcels[3].id;
    const value = "delivered";
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: userData.updateStatusErrorResponse
      });
    });
    const expectedActions = [
      {
        type: actionTypes.SET_PARCEL_ERROR,
        error: userData.updateStatusErrorResponse
      }
    ];
    await store.dispatch(updateParcelStatus(parcelId, value));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it("should update the present location of a parcel delivery order", async done => {
    const parcelId = userData.parcels[0].id;
    const newLocation = "Victoria Island";
    const response = userData.updateStatusResponse;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response
      });
    });
    const expectedActions = [
      {
        type: actionTypes.UPDATE_PARCEL_SUCCESS,
        parcel: response
      }
    ];
    await store.dispatch(updateParcelLocation(parcelId, newLocation));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it("should call update parcel location error dispatch function", async done => {
    const parcelId = userData.parcels[0].id;
    const newLocation = "";
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 422,
        response: userData.updateLocationErrorResponse
      });
    });
    const expectedActions = [
      {
        type: actionTypes.SET_PARCEL_ERROR,
        error: userData.updateLocationErrorResponse
      }
    ];
    await store.dispatch(
      updateParcelLocation(
        parcelId,
        newLocation
      )
    );
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it("should cancel a parcel delivery order", async done => {
    const parcelId = userData.parcels[4].id;
    const response = userData.cancelledParcelResponse;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response
      });
    });
    const expectedActions = [
      {
        type: actionTypes.UPDATE_PARCEL_SUCCESS,
        parcel: response
      }
    ];
    await store.dispatch(cancelParcelOrder(parcelId));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it("should call cancel parcel error dispatch function", async done => {
    const parcelId = userData.parcels[2].id;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: userData.cancelParcelErrorResponse
      });
    });
    const expectedActions = [
      {
        type: actionTypes.SET_PARCEL_ERROR,
        error: userData.cancelParcelErrorResponse
      }
    ];
    await store.dispatch(cancelParcelOrder(parcelId));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });


  it("should get a single parcel by a user", async done => {
    const parcelId = userData.parcels[0].id;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: userData.parcels[0]
      });
    });
    const expectedActions = [
      {
        type: actionTypes.GET_SINGLE_PARCEL_SUCCESS,
        parcel: userData.parcels[0]
      }
    ];
    await store.dispatch(getSingleParcel(parcelId));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it("should get all parcels by a single user", async done => {
    const userId = userData.newUser.id;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: userData.parcels
      });
    });
    const expectedActions = [
      {
        type: actionTypes.IS_LOADING,
        bool: true
      },
      {
        type: actionTypes.GET_PARCELS_SUCCESS,
        parcels: userData.parcels
      },
      {
        type: actionTypes.IS_LOADING,
        bool: false
      }
    ];
    await store.dispatch(getUserParcels(userId));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it("should get all parcels by all users for the admin", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: userData.parcels
      });
    });
    const expectedActions = [
      {
        type: actionTypes.IS_LOADING,
        bool: true
      },
      {
        type: actionTypes.GET_PARCELS_SUCCESS,
        parcels: userData.parcels
      },
      {
        type: actionTypes.IS_LOADING,
        bool: false
      }
    ];
    await store.dispatch(getAllParcels());
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});
