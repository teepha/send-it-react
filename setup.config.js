import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import moxios from "moxios";
import toJson from "enzyme-to-json";

global.moxios = moxios;
global.toJson = toJson;
global.mount = mount;

Enzyme.configure({ adapter: new Adapter() });
