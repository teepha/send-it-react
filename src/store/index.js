import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import indexReducer from "../reducers";

const env = process.env.NODE_ENV || "development";
const middleware = [thunk, reduxImmutableStateInvariant()];

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

let enhancer = composeEnhancers(applyMiddleware(...middleware));

if (env === "production") {
  enhancer = applyMiddleware(thunk);
}

const store = createStore(indexReducer, enhancer);

export default store;
