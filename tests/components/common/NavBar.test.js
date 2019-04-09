import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import {
  NavBar,
  mapDispatchToProps
} from "../../../src/components/common/NavBar";

const props = {
  logout: jest.fn(),
  user: {
    id: 1,
    role: "admin"
  }
};
const wrapper = shallow(<NavBar {...props} />);

describe("NavBar Component test", () => {
  it("render navbar without crashing", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("handlelogout should call props.logout", () => {
    const handleLogoutSpy = jest.spyOn(wrapper.instance(), "handleLogout");
    handleLogoutSpy();
    expect(wrapper.instance().props.logout).toBeCalled();
  });

  it("mapdispatch to props should call logout", () => {
    const dispatchSpy = sinon.spy();
    const dispatchResult = mapDispatchToProps(dispatchSpy);

    dispatchResult.logout();
    expect(dispatchSpy.callCount).toEqual(1);
  });

  it("should redirect when role is user role is admin", () => {
    wrapper.setProps({
      user: {
        role: "admin"
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
