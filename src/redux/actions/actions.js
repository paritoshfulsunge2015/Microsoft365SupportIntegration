export const updateAdminConsentState = (consentState) => {
  return { type: "UpdateAdminConsentState", consentState: consentState };
};

export const updateUserAccountAction = (account) => {
  return {
    type: "UpdateUserAccount",
    account: account,
  };
};

export const startSigninProcessAction = () => {
  return {
    type: "StartSignin",
  };
};

export const signInCompleteAction = (state) => {
  return {
    type: "SignInComplete",
    payload: state,
  };
};

export const startSignoutProcessAction = () => {
  return {
    type: "StartSignout",
  };
};

export const updatePhotoUrlAction = (url) => {
  return {
    type: "updatePhotoUrl",
    payload: url,
  };
};
