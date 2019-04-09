import React from "react";
import { shallow } from "enzyme";
import { UserProfile } from "../../../../src/components/parcels/dashboards/UserPage";
import { parcelData } from "../../../mockData/testData";

describe("LoginPage Component Test", () => {
  const setUp = () => {
    const props = {
      getUserParcels: jest.fn(() => Promise.resolve()),
      getSingleParcel: jest.fn(() => Promise.resolve()),
      cancelParcelOrder: jest.fn(() => Promise.resolve()),
      loading: false,
      user: {},
      parcels: [],
      error: "",
      history: {
        push: jest.fn()
      }
    };
    const state = {
      parcels: [],
      noParcelsErrMsg: "",
      cancelModalIsOpen: "",
      search: "",
      parcelsCopy: [],
      viewModalIsOpen: false,
      parcelToView: {},
      cancelModalIsOpen: false,
      parcelToCancelId: ""
    };
    return {
      shallowWrapper: shallow(<UserProfile {...props} />),
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

  it("invokes handleCancelOrder method", () => {
    const { shallowWrapper, state } = setUp();
    const handleCancelOrderSpy = jest.spyOn(
      shallowWrapper.instance(),
      "handleCancelOrder"
    );
    shallowWrapper.instance().handleCancelOrder(event);
    expect(handleCancelOrderSpy).toHaveBeenCalled();

    shallowWrapper.setState({
      ...state,
      parcels: parcelData.parcels
    });
    shallowWrapper.instance().handleCancelOrder(event);
    expect(handleCancelOrderSpy).toHaveBeenCalled();
  });

  it("invokes handleCloseCancelModal method", () => {
    const { shallowWrapper } = setUp();
    const handleCloseCancelModalSpy = jest.spyOn(
      shallowWrapper.instance(),
      "handleCloseCancelModal"
    );
    shallowWrapper.instance().handleCloseCancelModal();
    expect(handleCloseCancelModalSpy).toHaveBeenCalled();
  });

  it("invokes handleOpenCancelModal method", () => {
    const { shallowWrapper, state } = setUp();
    const handleOpenCancelModalSpy = jest.spyOn(
      shallowWrapper.instance(),
      "handleOpenCancelModal"
    );
    shallowWrapper.instance().handleOpenCancelModal(event);
    expect(handleOpenCancelModalSpy).toHaveBeenCalled();
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
