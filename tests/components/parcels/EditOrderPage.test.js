import React from "react";
import { shallow } from "enzyme";
import { EditOrder } from "../../../src/components/parcels/EditOrderPage";

describe("EditOrder Component Test", () => {
  const setUp = () => {
    const props = {
      updateParcelOrder: jest.fn(() => Promise.resolve()),
      getSingleParcel: jest.fn(() => Promise.resolve()),
      processing: false,
      user: {
        id: 1,
        role: "admin"
      },
      parcel: {},
      error: "",
      history: {
        push: jest.fn()
      },
      match: {
        params: {
          id: 3
        }
      }
    };
    const state = {
      pickupLocation: "",
      destination: "",
      recipientName: "",
      recipientPhone: ""
    };
    return {
      shallowWrapper: shallow(<EditOrder {...props} />),
      state,
      props
    };
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

  it("should display <Spinner /> component when `isProcessing` is set to true", () => {
    const { shallowWrapper, props } = setUp();
    shallowWrapper.setProps({
      ...props,
      processing: true
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

  it("invokes handleEditOrder method", () => {
    const { shallowWrapper } = setUp();
    const handleEditOrderSpy = jest.spyOn(
      shallowWrapper.instance(),
      "handleEditOrder"
    );
    shallowWrapper.instance().handleEditOrder(event);
    expect(handleEditOrderSpy).toHaveBeenCalledWith(event);
  });
});
