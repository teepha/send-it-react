import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import {
  NavBar,
  mapDispatchToProps
} from "../../../src/components/common/NavBar";

const setUp = () => {
  const props = {
    logout: jest.fn(),
    user: {
      id: 1,
      role: "admin"
    }
  };
  const state = {
    showHambugger: false
  };
  return {
    shallowWrapper: shallow(<NavBar {...props} />),
    state,
    props
  };
};

describe("NavBar Component test", () => {
  it("render navbar without crashing", () => {
    const { shallowWrapper } = setUp();
    expect(shallowWrapper).toMatchSnapshot();
  });

  it("handlelogout should call props.logout", () => {
    const { shallowWrapper } = setUp();
    const handleLogoutSpy = jest.spyOn(
      shallowWrapper.instance(),
      "handleLogout"
    );
    handleLogoutSpy();
    expect(shallowWrapper.instance().props.logout).toBeCalled();
  });

  it("mapdispatch to props should call logout", () => {
    const dispatchSpy = sinon.spy();
    const dispatchResult = mapDispatchToProps(dispatchSpy);

    dispatchResult.logout();
    expect(dispatchSpy.callCount).toEqual(1);
  });

  it("should redirect when role is user role is admin", () => {
    const { shallowWrapper } = setUp();
    shallowWrapper.setProps({
      user: {
        role: "admin"
      }
    });
    expect(shallowWrapper).toMatchSnapshot();
  });

  it("invokes handleNavbarClick method", () => {
    const { shallowWrapper } = setUp();
    const handleNavbarClickSpy = jest.spyOn(
      shallowWrapper.instance(),
      "handleNavbarClick"
    );
    shallowWrapper.instance().handleNavbarClick();
    expect(handleNavbarClickSpy).toHaveBeenCalledWith();
  });
});
