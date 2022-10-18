import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers/rootReducer.js";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunkMiddleware];

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);
