import React from "react";
import { shallow } from "enzyme";
import Footer from "../../../src/components/common/Footer";

describe("Footer Component test", () => {
  it("render footer without crashing", () => {
    expect(shallow(<Footer />)).toMatchSnapshot();
  });
});
