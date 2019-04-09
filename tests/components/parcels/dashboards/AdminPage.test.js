import React from "react";
import { shallow } from "enzyme";
import { AdminProfile } from "../../../../src/components/parcels/dashboards/AdminPage";
import { parcelData } from "../../../mockData/testData";

describe("LoginPage Component Test", () => {
  const setUp = () => {
    const props = {
      getAllParcels: jest.fn(() => Promise.resolve()),
      updateParcelStatus: jest.fn(() => Promise.resolve()),
      updateParcelLocation: jest.fn(() => Promise.resolve()),
      loading: false,
      parcels: [],
      error: "",
      history: {
        push: jest.fn()
      }
    };
    const state = {
      parcels: [],
      noParcelsErrMsg: "",
      search: "",
      parcelsCopy: [],
      viewModalIsOpen: false,
      parcelToView: {},
      locationModalIsOpen: false,
      parcelToUpdate: {},
      parcelToUpdateId: "",
      newLocation: "",
      presentLocation: ""
    };
    return {
      shallowWrapper: shallow(<AdminProfile {...props} />),
      state,
      props
    };
  };
  const nextProps = {
    parcels: [],
    error: ""
  };
  const event = {
    target: {
      value: ""
    },
    preventDefault: jest.fn()
  };

  it("render without crashing", () => {
    const { shallowWrapper } = setUp();
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it("should display <Spinner /> component when `isLoading` is set to true", () => {
    const { shallowWrapper, props } = setUp();
    shallowWrapper.setProps({
      ...props,
      loading: true
    });
    expect(shallowWrapper.find("MDSpinner")).toHaveLength(1);
  });

  it("invokes handleInputChange method", () => {
    const { shallowWrapper, state } = setUp();
    const handleInputChangeSpy = jest.spyOn(
      shallowWrapper.instance(),
      "handleInputChange"
    );
    shallowWrapper.instance().handleInputChange(event);
    expect(handleInputChangeSpy).toHaveBeenCalled();

    shallowWrapper.setState({
      ...state,
      parcelsCopy: parcelData.parcels
    });
    shallowWrapper.instance().handleInputChange(event);
    expect(handleInputChangeSpy).toHaveBeenCalled();
  });

  it("invokes handleLocationInputChange method", () => {
    const { shallowWrapper } = setUp();
    const handleLocationInputChangeSpy = jest.spyOn(
      shallowWrapper.instance(),
      "handleLocationInputChange"
    );
    shallowWrapper.instance().handleLocationInputChange(event);
    expect(handleLocationInputChangeSpy).toHaveBeenCalled();
  });

  it("invokes  handleLocationUpdate method", () => {
    const { shallowWrapper, props } = setUp();
    const handleLocationUpdateSpy = jest.spyOn(
      shallowWrapper.instance(),
      "handleLocationUpdate"
    );
    shallowWrapper.instance().handleLocationUpdate(event);
    expect(handleLocationUpdateSpy).toHaveBeenCalled();

    shallowWrapper.setProps({
      ...props,
      parcelToUpdateId: "2",
      newLocation: "Mende"
    });
    shallowWrapper.instance().handleLocationUpdate(event);
    expect(handleLocationUpdateSpy).toHaveBeenCalled();
  });

  it("invokes handleOpenLocationModal method", () => {
    const { shallowWrapper, state } = setUp();
    const handleOpenLocationModalSpy = jest.spyOn(
      shallowWrapper.instance(),
      "handleOpenLocationModal"
    );
    shallowWrapper.instance().handleOpenLocationModal(event);
    expect(handleOpenLocationModalSpy).toHaveBeenCalled();

    shallowWrapper.setState({
      ...state,
      parcels: parcelData.parcels
    });
    shallowWrapper.instance().handleOpenLocationModal(event);
    expect(handleOpenLocationModalSpy).toHaveBeenCalled();
  });

  it("invokes handleCloseLocationModal method", () => {
    const { shallowWrapper } = setUp();
    const handleCloseLocationModalSpy = jest.spyOn(
      shallowWrapper.instance(),
      "handleCloseLocationModal"
    );
    shallowWrapper.instance().handleCloseLocationModal();
    expect(handleCloseLocationModalSpy).toHaveBeenCalled();
  });

  it("invokes handleOpenViewModal method", () => {
    const { shallowWrapper, state } = setUp();
    const handleOpenViewModalSpy = jest.spyOn(
      shallowWrapper.instance(),
      "handleOpenViewModal"
    );
    shallowWrapper.instance().handleOpenViewModal(event);
    expect(handleOpenViewModalSpy).toHaveBeenCalled();

    shallowWrapper.setState({
      ...state,
      parcels: parcelData.parcels
    });
    shallowWrapper.instance().handleOpenViewModal(event);
    expect(handleOpenViewModalSpy).toHaveBeenCalled();
  });

  it("invokes handleCloseViewModal method", () => {
    const { shallowWrapper } = setUp();
    const handleCloseViewModalSpy = jest.spyOn(
      shallowWrapper.instance(),
      "handleCloseViewModal"
    );
    shallowWrapper.instance().handleCloseViewModal();
    expect(handleCloseViewModalSpy).toHaveBeenCalled();
  });

  it("invokes handleStatusChange method", () => {
    const { shallowWrapper } = setUp();
    const handleStatusChangeSpy = jest.spyOn(
      shallowWrapper.instance(),
      "handleStatusChange"
    );
    shallowWrapper.instance().handleStatusChange(event);
    expect(handleStatusChangeSpy).toHaveBeenCalled();
  });

  it("invokes shouldComponentUpdate method", () => {
    const { shallowWrapper } = setUp();
    const shouldComponentUpdateSpy = jest.spyOn(
      shallowWrapper.instance(),
      "shouldComponentUpdate"
    );

    shallowWrapper.setProps({
      ...nextProps,
      error: parcelData.parcelsErrorResponse
    });
    shallowWrapper.instance().shouldComponentUpdate(nextProps);
    expect(shouldComponentUpdateSpy).toHaveBeenCalled();

    shallowWrapper.setProps({
      ...nextProps,
      parcels: parcelData.parcels
    });
    shallowWrapper.instance().shouldComponentUpdate(nextProps);
    expect(shouldComponentUpdateSpy).toHaveBeenCalled();
  });
});
