import { createStore, applyMiddleware, compose } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

import { rootReducer } from "./reducers";
import { appInitialState } from "./reducers/states";

export const configureStore = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    appInitialState,
    composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
  );
};
