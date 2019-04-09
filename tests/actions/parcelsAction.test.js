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
import { userData, parcelData } from "../mockData/testData";

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
        response: parcelData.parcels[0]
      });
    });
    const expectedActions = [
      {
        type: actionTypes.IS_LOADING,
        bool: true
      },
      {
        type: actionTypes.CREATE_PARCEL_SUCCESS,
        parcel: parcelData.parcels[0]
      },
      {
        type: actionTypes.IS_LOADING,
        bool: false
      }
    ];
    await store.dispatch(
      createParcelOrder(userData.newUser.id, parcelData.createParcelRequestData)
    );
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it("should call create parcel error dispatch function", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 422,
        response: parcelData.createParcelErrorResponse
      });
    });
    const expectedActions = [
      {
        type: actionTypes.IS_LOADING,
        bool: true
      },
      {
        type: actionTypes.SET_PARCEL_ERROR,
        error: parcelData.createParcelErrorResponse
      },
      {
        type: actionTypes.IS_LOADING,
        bool: false
      }
    ];
    await store.dispatch(
      createParcelOrder(userData.newUser.id, parcelData.invalidCreateParcelData)
    );
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it("should update the details of a parcel delivery order", async done => {
    const parcelId = parcelData.parcels[0].id;
    const data = parcelData.updateParcelRequestData;
    const response = parcelData.updateParcelResponse;
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
        response: parcelData.createParcelErrorResponse
      });
    });
    const expectedActions = [
      {
        type: actionTypes.IS_LOADING,
        bool: true
      },
      {
        type: actionTypes.SET_PARCEL_ERROR,
        error: parcelData.createParcelErrorResponse
      },
      {
        type: actionTypes.IS_LOADING,
        bool: false
      }
    ];
    await store.dispatch(
      updateParcelOrder(userData.newUser.id, parcelData.invalidCreateParcelData)
    );
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it("should update the status of a parcel delivery order", async done => {
    const parcelId = parcelData.parcels[0].id;
    const value = "in-transit";
    const response = parcelData.updateStatusResponse;
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
    const parcelId = parcelData.parcels[3].id;
    const value = "delivered";
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: parcelData.updateStatusErrorResponse
      });
    });
    const expectedActions = [
      {
        type: actionTypes.SET_PARCEL_ERROR,
        error: parcelData.updateStatusErrorResponse
      }
    ];
    await store.dispatch(updateParcelStatus(parcelId, value));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it("should update the present location of a parcel delivery order", async done => {
    const parcelId = parcelData.parcels[0].id;
    const newLocation = "Victoria Island";
    const response = parcelData.updateStatusResponse;
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
    const parcelId = parcelData.parcels[0].id;
    const newLocation = "";
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 422,
        response: parcelData.updateLocationErrorResponse
      });
    });
    const expectedActions = [
      {
        type: actionTypes.SET_PARCEL_ERROR,
        error: parcelData.updateLocationErrorResponse
      }
    ];
    await store.dispatch(updateParcelLocation(parcelId, newLocation));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it("should cancel a parcel delivery order", async done => {
    const parcelId = parcelData.parcels[4].id;
    const response = parcelData.cancelledParcelResponse;
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
    const parcelId = parcelData.parcels[2].id;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: parcelData.cancelParcelErrorResponse
      });
    });
    const expectedActions = [
      {
        type: actionTypes.SET_PARCEL_ERROR,
        error: parcelData.cancelParcelErrorResponse
      }
    ];
    await store.dispatch(cancelParcelOrder(parcelId));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it("should get a single parcel by a user", async done => {
    const parcelId = parcelData.parcels[0].id;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: parcelData.parcels[0]
      });
    });
    const expectedActions = [
      {
        type: actionTypes.GET_SINGLE_PARCEL_SUCCESS,
        parcel: parcelData.parcels[0]
      }
    ];
    await store.dispatch(getSingleParcel(parcelId));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it("should call get single parcel error dispatch function", async done => {
    const parcelId = parcelData.parcels[0].id;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: parcelData.parcelsErrorResponse
      });
    });
    const expectedActions = [
      {
        type: actionTypes.SET_PARCEL_ERROR,
        error: parcelData.parcelsErrorResponse
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
        response: parcelData.parcels
      });
    });
    const expectedActions = [
      {
        type: actionTypes.IS_LOADING,
        bool: true
      },
      {
        type: actionTypes.GET_PARCELS_SUCCESS,
        parcels: parcelData.parcels
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

  it("should call get user parcels error dispatch function", async done => {
    const userId = userData.newUser.id;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: parcelData.parcelsErrorResponse
      });
    });
    const expectedActions = [
      {
        type: actionTypes.IS_LOADING,
        bool: true
      },
      {
        type: actionTypes.SET_PARCEL_ERROR,
        error: parcelData.parcelsErrorResponse
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
        response: parcelData.parcels
      });
    });
    const expectedActions = [
      {
        type: actionTypes.IS_LOADING,
        bool: true
      },
      {
        type: actionTypes.GET_PARCELS_SUCCESS,
        parcels: parcelData.parcels
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

  it("should call get all parcels error dispatch function", async done => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: parcelData.parcelsErrorResponse
      });
    });
    const expectedActions = [
      {
        type: actionTypes.IS_LOADING,
        bool: true
      },
      {
        type: actionTypes.SET_PARCEL_ERROR,
        error: parcelData.parcelsErrorResponse
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
