import React from "react";
import { shallow } from "enzyme";
import { CreateOrder } from "../../../src/components/parcels/CreateOrderPage";
import { parcelData } from "../../mockData/testData";

describe("CreateOrder Component Test", () => {
  const setUp = () => {
    const props = {
      createParcelOrder: jest.fn(() => Promise.resolve()),
      loading: false,
      user: {
        id: 1,
        role: "admin"
      },
      parcels: [],
      error: "",
      history: {
        push: jest.fn()
      }
    };
    const state = {
      pickupLocation: "",
      destination: "",
      recipientName: "",
      recipientPhone: ""
    };
    return {
      shallowWrapper: shallow(<CreateOrder {...props} />),
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
    const { shallowWrapper } = setUp();
    const handleInputChangeSpy = jest.spyOn(
      shallowWrapper.instance(),
      "handleInputChange"
    );
    shallowWrapper.instance().handleInputChange(event);
    expect(handleInputChangeSpy).toHaveBeenCalled();
  });

  it("invokes handleCreateOrder method", () => {
    const { shallowWrapper } = setUp();
    const handleCreateOrderSpy = jest.spyOn(
      shallowWrapper.instance(),
      "handleCreateOrder"
    );
    shallowWrapper.instance().handleCreateOrder(event);
    expect(handleCreateOrderSpy).toHaveBeenCalledWith(event);
  });

  it("invokes shouldComponentUpdate method", () => {
    const { shallowWrapper } = setUp();
    const shouldComponentUpdateSpy = jest.spyOn(
      shallowWrapper.instance(),
      "shouldComponentUpdate"
    );
    shallowWrapper.setProps({
      ...nextProps,
      parcels: parcelData.parcels
    });
    shallowWrapper.instance().shouldComponentUpdate(nextProps);
    expect(shouldComponentUpdateSpy).toHaveBeenCalled();

    shallowWrapper.setProps({
      ...nextProps,
      error: parcelData.createParcelErrorResponse
    });
    shallowWrapper.instance().shouldComponentUpdate(nextProps);
    expect(shouldComponentUpdateSpy).toHaveBeenCalled();
  });
});
