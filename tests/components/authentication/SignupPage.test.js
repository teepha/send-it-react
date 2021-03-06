import React from "react";
import { shallow } from "enzyme";
import { SignupPage } from "../../../src/components/authentication/SignupPage";

jest.mock("../../../src/utils/verifyToken");

describe("LoginPage Component Test", () => {
  const setUp = () => {
    const props = {
      authUserRequest: jest.fn(() => Promise.resolve()),
      loading: false,
      user: {
        id: 1,
        role: "admin"
      },
      error: "",
      history: {
        push: jest.fn()
      }
    };
    const state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: ""
    };
    return {
      shallowWrapper: shallow(<SignupPage {...props} />),
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

  it("invokes handleSignup method and push to admin page", () => {
    const { shallowWrapper, props } = setUp();
    const handleSignupSpy = jest.spyOn(
      shallowWrapper.instance(),
      "handleSignup"
    );

    shallowWrapper.setProps({
      ...props,
      user: {
        ...props.user,
        role: "admin"
      }
    });
    shallowWrapper.instance().handleSignup(event);
    expect(handleSignupSpy).toHaveBeenCalledWith(event);
  });

  it("invokes handleSignup method and push to user page", () => {
    const { shallowWrapper, props } = setUp();
    const handleSignupSpy = jest.spyOn(
      shallowWrapper.instance(),
      "handleSignup"
    );

    shallowWrapper.setProps({
      ...props,
      user: {
        ...props.user,
        role: "member"
      }
    });
    shallowWrapper.instance().handleSignup(event);
    expect(handleSignupSpy).toHaveBeenCalledWith(event);
  });

  it("invokes componentDidMount method", () => {
    const { shallowWrapper, props } = setUp();
    const componentDidMountSpy = jest.spyOn(
      shallowWrapper.instance(),
      "componentDidMount"
    );
    shallowWrapper.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalled();

    shallowWrapper.setProps({
      ...props,
      user: {
        ...props.user,
        role: "member"
      }
    });
    shallowWrapper.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalled();
  });
});
