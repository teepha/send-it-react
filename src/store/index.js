import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import indexReducer from "../reducers";

const env = process.env.NODE_ENV || 'development';

let middleware = compose(applyMiddleware(thunk,
  reduxImmutableStateInvariant()), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

if (env === 'production') {
  middleware = applyMiddleware(thunk);
}

const store = createStore(
  indexReducer,
  middleware
);

export default store;