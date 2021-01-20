import { combineReducers } from "redux";
import { appReducer, consentReducer, userAccountReducer } from "./reducers";

export const rootReducer = combineReducers({
  app: appReducer,
  consent: consentReducer,
  userAccount: userAccountReducer,
});
