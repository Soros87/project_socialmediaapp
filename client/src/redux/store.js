import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";
import { thunk } from "redux-thunk";

const loggerMiddleware = createLogger();
const middleware = [loggerMiddleware, thunk];

// For Redux Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware))
  );
}
