import { SignInStatus } from "../reducers/states";

export const appReducer = (state = {}, action) => {
  switch (action.type) {
    case "StartSignin":
      return { ...state, signinStatus: SignInStatus.InProgress };
    case "UpdateUserAccount":
      if (action.account) {
        return { ...state, signinStatus: SignInStatus.Completed };
      }
      return { ...state };
    case "SignInComplete":
      return { ...state, signinStatus: action.payload };
    case "StartSignout":
      return { ...state, signOutStatus: SignInStatus.InProgress };
    default:
      return state;
  }
};

export const consentReducer = (state = {}, action) => {
  switch (action.type) {
    case "UpdateAdminConsentState":
      return { ...state, ConsentCompleted: action.consentState };
    default:
      return state;
  }
};

export const userAccountReducer = (state = {}, action) => {
  switch (action.type) {
    case "UpdateUserAccount":
      return {
        ...state,
        environment: action.account ? action.account.environment : "",
        homeAccountId: action.account ? action.account.homeAccountId : "",
        name: action.account ? action.account.name : "",
        tenantId: action.account ? action.account.tenantId : "",
        username: action.account ? action.account.username : " ",
      };
    case "updatePhotoUrl":
      return {
        ...state,
        photoUrl: action.payload,
      };
    default:
      return state;
  }
};
