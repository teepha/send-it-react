import { combineReducers } from "redux";
import userReducer from "./userReducer";
import parcelsReducer from "./parcelsReducer";

export default combineReducers({
  user: userReducer,
  parcels: parcelsReducer,
});
