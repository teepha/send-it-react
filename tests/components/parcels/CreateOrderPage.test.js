import React from "react";
import { shallow } from "enzyme";
import { CreateOrder } from "../../../src/components/parcels/CreateOrderPage";

describe("CreateOrder Component Test", () => {
  const setUp = () => {
    const props = {
      createParcelOrder: jest.fn(() => Promise.resolve()),
      processing: false,
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
    parcels: [{
      userId: 1,
      pickupLocation: "Amity, Mende",
      destination: "Arowojobe",
      recipientName: "Tiku",
      recipientPhone: "08123456789"
        }],
    error: ""
  };
  const event = {
    target: {
      pickupLocation: "",
      destination: "",
      recipientName: "",
      recipientPhone: ""
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

  it("invokes handleCreateOrder method", () => {
    const { shallowWrapper } = setUp();
    const handleCreateOrderSpy = jest.spyOn(
      shallowWrapper.instance(),
      "handleCreateOrder"
    );
    shallowWrapper.instance().handleCreateOrder(event);
    expect(handleCreateOrderSpy).toHaveBeenCalledWith(event);
  });

  // it("invokes shouldComponentUpdate method", () => {
  //   const { shallowWrapper, props } = setUp();
  //   const shouldComponentUpdateSpy = jest.spyOn(
  //     shallowWrapper.instance(),
  //     "shouldComponentUpdate"
  //   );
  //   // shallowWrapper.instance().shouldComponentUpdate(nextProps);
  //   // expect(shouldComponentUpdateSpy).toHaveBeenCalled(nextProps);

  //   shallowWrapper.setProps({
  //     ...props,
  //     parcels: {
  //       ...props.parcels,
  //       // data: {
  //         userId: 1,
  //         pickupLocation: "Amity, Mende",
  //         destination: "Arowojobe",
  //         recipientName: "Tiku",
  //         recipientPhone: "08123456789"
  //       // }
  //     }
  //   });
  //   shallowWrapper.instance().shouldComponentUpdate();
  //   expect(shouldComponentUpdateSpy).toHaveBeenCalled();
  // });
});
