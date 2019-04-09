import React from "react";
import { shallow } from "enzyme";
import { LoginPage } from "../../../src/components/authentication/LoginPage";

jest.mock("../../../src/utils/verifyToken");

describe("LoginPage Component Test", () => {
  const setUp = () => {
    const props = {
      login: jest.fn(() => Promise.resolve()),
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
      email: "",
      password: ""
    };
    return {
      shallowWrapper: shallow(<LoginPage {...props} />),
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

  it("invokes handleLogin method", () => {
    const { shallowWrapper, props } = setUp();
    const handleLoginSpy = jest.spyOn(shallowWrapper.instance(), "handleLogin");
    shallowWrapper.instance().handleLogin(event);
    expect(handleLoginSpy).toHaveBeenCalledWith(event);

    shallowWrapper.setProps({
      ...props,
      user: {
        ...props.user,
        role: "member"
      }
    });
    shallowWrapper.instance().handleLogin(event);
    expect(handleLoginSpy).toHaveBeenCalledWith(event);
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

  it("should login user when all validations are met", () => {
    const { shallowWrapper, state } = setUp();

    shallowWrapper.setState({
      ...state,
      email: "seyi@email.com",
      password: "password"
    });
    shallowWrapper.find("form").simulate("submit", event);
    expect(shallowWrapper.instance().props.error).toEqual("");
  });
});
