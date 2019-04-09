import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { MemoryRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Routes from "../../src/components/Routes";
import HomePage from "../../src/components/HomePage";
import LoginPage from "../../src/components/authentication/LoginPage";
import SignupPage from "../../src/components/authentication/SignupPage";
import UserPage from "../../src/components/parcels/dashboards/UserPage";
import AdminPage from "../../src/components/parcels/dashboards/AdminPage";
import CreateOrder from "../../src/components/parcels/CreateOrderPage";
import EditOrder from "../../src/components/parcels/EditOrderPage";

const middleware = [thunk];
const storeMock = configureMockStore(middleware);

const store = () =>
  storeMock({
    user: { userData: {} },
    parcels: { data: [] }
  });

const renderRoutes = path =>
  mount(
    <MemoryRouter initialEntries={[path]}>
      <Provider store={store()}>
        <Routes />
        <ToastContainer />
      </Provider>
    </MemoryRouter>
  );

describe("<Routes /> Component test", () => {
  it("should render <HomePage /> component", () => {
    const component = renderRoutes("/");

    expect(component.find(HomePage)).toHaveLength(1);
  });

  it("should render <LoginPage /> component", () => {
    const component = renderRoutes("/login");

    expect(component.find(LoginPage)).toHaveLength(1);
  });

  it("should render <SignupPage /> component", () => {
    const component = renderRoutes("/register");

    expect(component.find(SignupPage)).toHaveLength(1);
  });

  it("should render <UserPage /> component", () => {
    const component = renderRoutes("/user-profile");

    expect(component.find(UserPage)).toHaveLength(1);
  });

  it("should render <AdminPage /> component", () => {
    const component = renderRoutes("/admin-profile");

    expect(component.find(AdminPage)).toHaveLength(1);
  });

  it("should render <CreateOrder /> component", () => {
    const component = renderRoutes("/create-order");

    expect(component.find(CreateOrder)).toHaveLength(1);
  });

  it("should render <EditOrder /> component", () => {
    const component = renderRoutes("/parcels/:id");

    expect(component.find(EditOrder)).toHaveLength(1);
  });
});
