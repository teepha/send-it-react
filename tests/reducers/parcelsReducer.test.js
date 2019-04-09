import parcelsReducer from "../../src/reducers/parcelsReducer";
import actionTypes from "../../src/actions/actionTypes";

describe("AuthReducer test", () => {
  const initialState = {
    data: [],
    error: "",
    isLoading: false
  };
  it("should return the initial state ", () => {
    expect(parcelsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle IS_LOADING", () => {
    const action = {
      type: actionTypes.IS_LOADING,
      bool: true
    };
    const newState = parcelsReducer(initialState, action);
    expect(newState.isLoading).toEqual(true);
    expect(newState.error).toEqual("");
    expect(newState.data).toEqual([]);
  });

  it("should handle CREATE_PARCEL_SUCCESS", () => {
    const action = {
      type: actionTypes.CREATE_PARCEL_SUCCESS,
      parcel: { id: 2 }
    };
    const newState = parcelsReducer(initialState, action);
    expect(newState.isLoading).toEqual(false);
    expect(newState.error).toEqual("");
    expect(newState.data).toEqual([{ id: 2 }]);
  });

  it("should handle SET_PARCEL_ERROR", () => {
    const action = {
      type: actionTypes.SET_PARCEL_ERROR,
      error: { msg: "some errors here" }
    };
    const newState = parcelsReducer(initialState, action);
    expect(newState.isLoading).toEqual(false);
    expect(newState.error).toEqual("some errors here");
    expect(newState.data).toEqual([]);
  });

  it("should handle GET_PARCELS_SUCCESS", () => {
    const action = {
      type: actionTypes.GET_PARCELS_SUCCESS,
      parcels: [{ id: 2 }, { id: 3 }]
    };
    const newState = parcelsReducer(initialState, action);
    expect(newState.isLoading).toEqual(false);
    expect(newState.error).toEqual("");
    expect(newState.data).toEqual([{ id: 2 }, { id: 3 }]);
  });

  it("should handle GET_SINGLE_PARCEL_SUCCESS", () => {
    const action = {
      type: actionTypes.GET_SINGLE_PARCEL_SUCCESS,
      parcel: { id: 2 }
    };
    const newState = parcelsReducer(initialState, action);
    expect(newState.isLoading).toEqual(false);
    expect(newState.error).toEqual("");
    expect(newState.data).toEqual([{ id: 2 }]);
  });

  it("should handle GET_PARCELS_SUCCESS", () => {
    const action = {
      type: actionTypes.GET_PARCELS_SUCCESS,
      parcels: [{ id: 2 }, { id: 3 }]
    };
    const newState = parcelsReducer(initialState, action);
    expect(newState.isLoading).toEqual(false);
    expect(newState.error).toEqual("");
    expect(newState.data).toEqual([{ id: 2 }, { id: 3 }]);
  });

  it("should handle GET_SINGLE_PARCEL_SUCCESS if state.data is not empty", () => {
    initialState.data = [
      {
        id: 2,
        destination: "15 Bode Jones"
      },
      { id: 3, destination: "Amity, Mende" }
    ];
    const action = {
      type: actionTypes.GET_SINGLE_PARCEL_SUCCESS
    };
    const newState = parcelsReducer(initialState, action);
    expect(newState.isLoading).toEqual(false);
    expect(newState.error).toEqual("");
    expect(newState.data).toEqual([
      {
        id: 2,
        destination: "15 Bode Jones"
      },
      { id: 3, destination: "Amity, Mende" }
    ]);
  });

  it("should handle UPDATE_PARCEL_SUCCESS", () => {
    initialState.data = [
      {
        id: 2,
        destination: "15 Bode Jones"
      },
      { id: 3, destination: "Amity, Mende" }
    ];
    const action = {
      type: actionTypes.UPDATE_PARCEL_SUCCESS,
      parcel: { id: 3, destination: "235 Abiola way" }
    };
    const newState = parcelsReducer(initialState, action);
    expect(newState.isLoading).toEqual(false);
    expect(newState.error).toEqual("");
    expect(newState.data).toEqual([
      {
        id: 2,
        destination: "15 Bode Jones"
      },
      { id: 3, destination: "235 Abiola way" }
    ]);
  });
});
