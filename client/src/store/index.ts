import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers =
  process.env.NODE_ENV === "development" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25,
      })
    : null || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

// Note: this API requires redux@>=3.1.0
const store = createStore(rootReducer, enhancer);

export default store;
